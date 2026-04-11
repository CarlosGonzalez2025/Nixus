import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import type { Hallazgo } from '@/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PrintButton } from './print-button';

export const dynamic = 'force-dynamic';

/* ── helpers ────────────────────────────────────────────────────────── */
function safeDate(v: any): Date | null {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  if (typeof v === 'string') return new Date(v);
  if (v && v._seconds) return new Date(v._seconds * 1000);
  return null;
}

function fmt(v: any, pattern = 'dd/MM/yyyy') {
  const d = safeDate(v);
  return d ? format(d, pattern, { locale: es }) : '—';
}

const CLASE_STYLES: Record<string, { label: string; badge: string }> = {
  A: { label: 'A — Intervención Inmediata', badge: 'bg-red-50 text-red-700 border-red-200' },
  B: { label: 'B — Intervención Pronta', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  C: { label: 'C — Intervención Posterior', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const ESTADO_STYLES: Record<string, string> = {
  Pendiente: 'bg-amber-100 text-amber-800',
  'En Progreso': 'bg-blue-100 text-blue-800',
  Completado: 'bg-emerald-100 text-emerald-800',
  Cerrado: 'bg-gray-200 text-gray-800',
};

/* ── page component ─────────────────────────────────────────────────── */
export default async function PublicHallazgoPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  if (!isAdminReady()) {
    return <ErrorCard message="El servidor no está configurado correctamente. Contacte al administrador." />;
  }

  let docData: Record<string, any> | null = null;
  try {
    const snap = await adminDb.collection('hallazgos').doc(id).get();
    if (snap.exists) docData = snap.data() as Record<string, any>;
  } catch (err) {
    console.error('[PublicHallazgo] Error fetching document:', err);
    return <ErrorCard message="Ocurrió un error al consultar el reporte. Intente nuevamente." />;
  }

  if (!docData) {
    return <ErrorCard message="Este documento no existe, la URL es incorrecta o fue eliminado del servidor." />;
  }

  const h = docData;
  const claseKey = h.clase || 'C';
  const clase = CLASE_STYLES[claseKey] ?? CLASE_STYLES['C'];
  const estado = h.cumplimientoEstado || h.estado || 'Pendiente';
  const estadoBadge = ESTADO_STYLES[estado] ?? ESTADO_STYLES['Pendiente'];
  const isClosed = estado === 'Completado' || estado === 'Cerrado';

  // Photos: field is evidenciasFotograficas (string[]) or fotos ({url:string}[])
  const fotos: string[] = Array.isArray(h.evidenciasFotograficas)
    ? h.evidenciasFotograficas
    : Array.isArray(h.fotos)
      ? h.fotos.map((f: any) => typeof f === 'string' ? f : f?.url || '')
      : [];

  return (
    <div className="min-h-screen bg-gray-100 font-sans sm:py-8 print:py-0 print:bg-white flex justify-center">
      <div className="bg-white shadow-lg w-full max-w-4xl mx-auto rounded-lg sm:p-10 p-5 print:shadow-none print:max-w-none print:w-full print:p-6">

        {/* ── Membrete ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-[#3062C8] pb-6 mb-8 gap-4">
          <div>
            <div className="text-3xl font-black text-[#3062C8] tracking-tight">SISTEG</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Gestión de Hallazgos HSEQ</div>
          </div>
          <div className="text-left sm:text-right">
            <h1 className="text-2xl font-bold text-gray-900">Formato de Inspección</h1>
            <p className="text-sm font-mono text-gray-500 mt-1">
              RC-HSEQ-{(h.numero ?? 0).toString().padStart(4, '0')} &bull; ID: {id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* ── Barra de acciones (solo pantalla) ──────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-6 print:hidden">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border shadow-sm mr-auto ${estadoBadge}`}>
            Estado: {estado}
          </span>
          <PrintButton />
        </div>

        {/* ── Metadatos ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-10 text-sm border border-gray-200 rounded-lg p-6 bg-gray-50/50 print:bg-white print:break-inside-avoid">
          <Field label="Empresa / Cliente" value={h.empresaId || h.empresa || 'No registrada'} />
          <div>
            <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Clasificación</span>
            <span className={`inline-flex items-center px-3 py-1 rounded border font-bold text-sm ${clase.badge}`}>
              {clase.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Fecha de Visita" value={fmt(h.fechaVisita || h.fechaIdentificacion)} />
            <Field label="Tipo Actividad" value={h.tipoActividad || '—'} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Planta" value={h.planta || 'Global'} />
            <Field label="Área" value={h.area || '—'} />
          </div>

          <div className="col-span-1 md:col-span-2 pt-4 border-t border-gray-200 mt-2">
            <Field label="Reportado Por" value={`${h.reportadoPorNombre || 'N/A'} — ${h.reportadoPorCargo || ''}`} />
          </div>
        </div>

        {/* ── Contenido textual ──────────────────────────────────── */}
        <div className="space-y-6 mb-10 border-t border-gray-200 pt-8 print:border-none print:pt-2">
          <TextBlock num={1} title="Peligro Inspeccionado" body={h.peligroInspeccionado} />
          <TextBlock num={2} title="Descripción del Hallazgo / Anomalía" body={h.hallazgo} highlight />
          <TextBlock num={3} title="Observaciones / Recomendaciones" body={h.descripcion} />

          {h.accionInmediata && (
            <TextBlock num={4} title="Acción Inmediata Tomada" body={h.accionInmediata} />
          )}
        </div>

        {/* ── Evidencias ─────────────────────────────────────────── */}
        {fotos.length > 0 && (
          <div className="mb-12 print:break-inside-avoid">
            <h3 className="text-sm font-bold uppercase text-[#3062C8] mb-4 tracking-wide border-b pb-1 flex justify-between items-end">
              <span>Evidencia Fotográfica</span>
              <span className="text-xs text-gray-500 font-normal">{fotos.length} adjuntos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fotos.filter(Boolean).map((url, idx) => (
                <div key={idx} className="border border-gray-200 rounded overflow-hidden shadow-sm bg-white print:border-gray-300 print:shadow-none break-inside-avoid">
                  <div className="aspect-[4/3] w-full relative bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Evidencia ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-200 tabular-nums">
                    Evidencia #{(idx + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Evidencias Plan de Acción ───────────────────────────── */}
        {h.evidenciasPlanAccion && h.evidenciasPlanAccion.length > 0 && (
          <div className="mb-12 print:break-inside-avoid">
            <h3 className="text-sm font-bold uppercase text-[#3062C8] mb-4 tracking-wide border-b pb-1 flex justify-between items-end">
              <span>Evidencia de Cierre / Plan de Acción</span>
              <span className="text-xs text-gray-500 font-normal">{h.evidenciasPlanAccion.length} adjuntos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {h.evidenciasPlanAccion.filter(Boolean).map((url: string, idx: number) => (
                <div key={idx} className="border border-emerald-200 rounded overflow-hidden shadow-sm bg-white print:border-gray-300 print:shadow-none break-inside-avoid">
                  <div className="aspect-[4/3] w-full relative bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Cierre ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 bg-emerald-50 text-xs text-emerald-700 border-t border-emerald-200 tabular-nums">
                    Evidencia cierre #{(idx + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Cierre / Estado ────────────────────────────────────── */}
        {isClosed ? (
          <div className="mb-10 bg-emerald-50 border border-emerald-200 rounded-lg p-5 flex items-start gap-4 print:break-inside-avoid">
            <span className="text-3xl shrink-0">✅</span>
            <div>
              <h4 className="font-bold text-emerald-900 mb-1">Cierre de Plan de Acción Confirmado</h4>
              <p className="text-sm text-emerald-800">
                El responsable ha verificado el cumplimiento de las recomendaciones y ha marcado esta condición
                insegura como controlada el día <span className="font-semibold">{fmt(h.fechaCierre || h.updatedAt)}</span>.
              </p>
              {h.observacion && (
                <p className="text-sm text-emerald-700 mt-2 italic">&ldquo;{h.observacion}&rdquo;</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-10 text-center py-6 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 print:hidden mt-8">
            El reporte aún está en estado de gestión. El cierre documentado aparecerá aquí una vez corregido el hallazgo.
          </div>
        )}

        <div className="h-px w-full bg-gray-200 my-10 print:my-6" />

        {/* ── Firmas ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 print:break-inside-avoid mt-8">
          <SignatureBlock name={h.reportadoPorNombre ?? '—'} role="FIRMA REPORTE" signatureUrl={h.firmaReportador} />
          <SignatureBlock
            name={h.responsable || 'Gestión HSEQ'}
            role="FIRMA RESPONSABLE EVALUADOR"
            signatureUrl={h.firmaResponsable}
          />
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className="mt-16 text-center border-t border-gray-100 pt-6 print:mt-10">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Documento Exclusivo de Control de Riesgos &bull; Sistema HSEQ Nixus
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────────────────── */

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full">
        <span className="text-5xl block mb-4">🔒</span>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reporte no encontrado</h1>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">{label}</span>
      <span className="font-medium text-gray-900 text-base">{value}</span>
    </div>
  );
}

function TextBlock({ num, title, body, highlight }: { num: number; title: string; body?: string; highlight?: boolean }) {
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-sm font-bold uppercase text-[#3062C8] mb-2 tracking-wide border-b pb-1">
        {num}. {title}
      </h3>
      <div className={
        highlight
          ? 'bg-gray-50 border border-gray-100 p-4 rounded text-gray-800 whitespace-pre-wrap leading-relaxed shadow-inner print:bg-white print:border-gray-300'
          : 'p-2 text-gray-800 whitespace-pre-wrap leading-relaxed'
      }>
        {body || 'Sin información registrada.'}
      </div>
    </div>
  );
}

function SignatureBlock({ name, role, signatureUrl }: { name: string; role: string; signatureUrl?: string | null }) {
  return (
    <div>
      <div className="h-24 flex items-end justify-center mb-2">
        {signatureUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={signatureUrl} alt={role} className="max-h-full max-w-[200px] object-contain" />
        ) : (
          <div className="h-full w-full border-b border-gray-400 border-dashed" />
        )}
      </div>
      <div className="border-t-2 border-gray-800 pt-2 text-center">
        <p className="font-bold text-gray-900 uppercase text-sm">{name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{role}</p>
      </div>
    </div>
  );
}


