import React from 'react';
import { adminDb } from '@/lib/firebase-admin';
import type { Hallazgo } from '@/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const revalidate = 0; // Dynamic rendering

const safeDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  if (typeof v === 'string') return new Date(v);
  if (v && v._seconds) return new Date(v._seconds * 1000);
  return null;
};

const fmt = (v: any, pattern = 'dd/MM/yyyy') => {
  const d = safeDate(v);
  return d ? format(d, pattern, { locale: es }) : '—';
};

const CLASE_INFO: Record<string, { label: string; textClass: string; bgClass: string; icon: React.ReactNode }> = {
  A: { label: 'A — Intervención Inmediata', textClass: 'text-red-700', bgClass: 'bg-red-50 border-red-200', icon: <AlertTriangle className="w-5 h-5" /> },
  B: { label: 'B — Intervención Pronta', textClass: 'text-amber-700', bgClass: 'bg-amber-50 border-amber-200', icon: <Clock className="w-5 h-5" /> },
  C: { label: 'C — Intervención Posterior', textClass: 'text-blue-700', bgClass: 'bg-blue-50 border-blue-200', icon: <Shield className="w-5 h-5" /> },
};

const ESTADOS: Record<string, { label: string, bg: string, text: string }> = {
  'Pendiente': { label: 'Pendiente', bg: 'bg-amber-100', text: 'text-amber-800' },
  'En Progreso': { label: 'En Progreso', bg: 'bg-blue-100', text: 'text-blue-800' },
  'Completado': { label: 'Completado', bg: 'bg-emerald-100', text: 'text-emerald-800' },
  'Cerrado': { label: 'Cerrado', bg: 'bg-gray-100', text: 'text-gray-800' },
};

export default async function PublicHallazgoDocument({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const docRef = adminDb.collection('hallazgos').doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full">
          <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reporte no encontrado</h1>
          <p className="text-gray-500">Este documento no existe, la URL es incorrecta o fue eliminado del servidor.</p>
        </div>
      </div>
    );
  }

  const h = docSnap.data() as Partial<Hallazgo>;
  const claseInfo = CLASE_INFO[h.clase || 'A'] || CLASE_INFO['A'];
  const estadoInfo = ESTADOS[h.estado || 'Pendiente'] || ESTADOS['Pendiente'];

  return (
    <div className="min-h-screen content-wrapper bg-gray-100 font-sans sm:py-8 print:py-0 print:bg-white flex justify-center">
      
      {/* Script flotante en cliente para imprimir */}
      <script dangerouslySetInnerHTML={{
          __html: `function doPrint() { window.print() }`
      }} />

      <div className="bg-white shadow-lg w-full max-w-4xl mx-auto rounded-lg sm:p-10 p-5 print:shadow-none print:max-w-none print:w-full print:p-0">
        
        {/* Cabecera / Membrete */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-[#3062C8] pb-6 mb-8 gap-4">
          <div>
            <div className="text-3xl font-black text-[#3062C8] tracking-tight">SISTEG</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Gestión de Hallazgos HSEQ</div>
          </div>
          <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
            <h1 className="text-2xl font-bold text-gray-900">Formato de Inspección</h1>
            <p className="text-sm font-mono text-gray-500 mt-1">RC-HSEQ-{h.numero?.toString().padStart(4, '0')} • ID: {id.slice(0,8).toUpperCase()}</p>
          </div>
        </div>

        {/* Acciones para pantalla (se ocultan al imprimir) */}
        <div className="flex justify-end gap-3 mb-6 print:hidden">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium \${estadoInfo.bg} \${estadoInfo.text} border border-white/20 shadow-sm mr-auto`}>
               Estado Actual: {estadoInfo.label}
            </span>
            <button
                onClick={() => { typeof window !== 'undefined' && window.print(); }}
                type="button" 
                className="bg-[#3062C8] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors flex items-center gap-2"
                //@ts-ignore - native call
                onMouseDown={(e) => e.target.setAttribute("onclick", "doPrint()")}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Imprimir / Guardar PDF
            </button>
        </div>

        {/* Metadatos - Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10 text-sm border border-gray-200 rounded-lg p-6 bg-gray-50/50 print:border-gray-300 print:bg-white print:break-inside-avoid">
          <div>
            <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Empresa / Cliente</span>
            <span className="font-medium text-gray-900 text-base">{h.empresaId || 'No registrada'}</span>
          </div>
          <div>
            <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Clasificación</span>
            <div className={`inline-flex items-center px-3 py-1 rounded border \${claseInfo.bgClass} \${claseInfo.textClass}`}>
              {claseInfo.icon}
              <span className="ml-2 font-bold">{claseInfo.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Fecha Inicial</span>
              <span className="font-medium text-gray-900">{fmt(h.fechaIdentificacion)}</span>
            </div>
            <div>
              <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Hora</span>
              <span className="font-medium text-gray-900">{h.horaReporte || '—'}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Planta</span>
              <span className="font-medium text-gray-900">{h.planta || 'Global'}</span>
            </div>
            <div>
              <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Última Actualización</span>
              <span className="font-medium text-gray-900">{fmt(h.updatedAt)}</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 pt-4 border-t border-gray-200 mt-2">
            <span className="block text-xs uppercase text-gray-500 font-semibold mb-1">Reportado Por</span>
            <span className="font-medium text-gray-900">{h.reportadoPor || h.createdByEmail || 'N/A'}</span>
          </div>
        </div>

        {/* Cuerpos de Texto */}
        <div className="space-y-6 mb-10 border-t border-gray-200 pt-8 print:border-none print:pt-0">
          <div className="print:break-inside-avoid">
            <h3 className="text-sm font-bold uppercase text-[#3062C8] mb-2 tracking-wide border-b pb-1">1. Descripción del Hallazgo / Anomalía</h3>
            <div className="bg-gray-50 border border-gray-100 p-4 rounded text-gray-800 whitespace-pre-wrap leading-relaxed shadow-inner font-serif print:bg-white print:border-gray-300">
              {h.hallazgo || 'Sin descripción detallada.'}
            </div>
          </div>

          {h.accionInmediata && (
            <div className="print:break-inside-avoid mt-6">
              <h3 className="text-sm font-bold uppercase text-[#3062C8] mb-2 tracking-wide border-b pb-1">2. Acción Inmediata Tomada</h3>
              <div className="p-2 text-gray-800 whitespace-pre-wrap leading-relaxed">
                {h.accionInmediata}
              </div>
            </div>
          )}

          {h.recomendaciones && (
            <div className="print:break-inside-avoid mt-6">
              <h3 className="text-sm font-bold uppercase text-[#3062C8] mb-2 tracking-wide border-b pb-1">3. Recomendaciones / Próximos Pasos</h3>
              <div className="p-2 text-gray-800 whitespace-pre-wrap leading-relaxed">
                {h.recomendaciones}
              </div>
            </div>
          )}
        </div>

        {/* Sección de Evidencias */}
        {h.fotos && h.fotos.length > 0 && (
          <div className="mb-12 print:break-inside-avoid">
            <h3 className="text-sm font-bold uppercase text-[#3062C8] mb-4 tracking-wide border-b pb-1 flex justify-between items-end">
              <span>Evidencia Fotográfica</span>
              <span className="text-xs text-gray-500 font-normal">{h.fotos.length} adjuntos</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {h.fotos.map((foto, idx) => (
                <div key={idx} className="border border-gray-200 rounded overflow-hidden shadow-sm bg-white print:border-gray-300 print:shadow-none break-inside-avoid flex flex-col">
                  <div className="aspect-[4/3] w-full relative bg-gray-100 flex-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={foto.url} 
                      alt={`Evidencia ${idx + 1}`} 
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-200 tabular-nums">
                    Evidencia anexada #0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conformidad */}
        {h.estado === 'Completado' || h.estado === 'Cerrado' ? (
           <div className="mb-10 bg-emerald-50 border border-emerald-200 rounded-lg p-5 flex items-start gap-4 print:break-inside-avoid">
             <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
             <div>
               <h4 className="font-bold text-emerald-900 mb-1">Cierre de Plan de Acción Confirmado</h4>
               <p className="text-sm text-emerald-800">
                 El responsable ha verificado el cumplimiento de las recomendaciones y ha marcado esta condición insegura como controlada 
                 el día <span className="font-semibold">{fmt(h.fechaCierre || h.updatedAt)}</span>.
               </p>
             </div>
           </div>
        ) : (
           <div className="mb-10 text-center py-6 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 print:hidden mt-8">
             El reporte aún está en estado de gestión. El cierre documentado ocurrirá aquí una vez corregido el hallazgo.
           </div>
        )}

        <div className="h-px w-full bg-gray-200 my-10 print:my-6" />

        {/* Firmas en pie de documento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 print:break-inside-avoid mt-8">
          <div>
            <div className="h-24 flex items-end justify-center mb-2">
              {h.firmaReportador ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={h.firmaReportador} alt="Firma Reportador" className="max-h-full max-w-[200px] object-contain" />
              ) : (
                <div className="h-full w-full border-b border-gray-400 border-dashed" />
              )}
            </div>
            <div className="border-t-2 border-gray-800 pt-2 text-center">
              <p className="font-bold text-gray-900 uppercase text-sm">{h.reportadoPor || '—'}</p>
              <p className="text-xs text-gray-500 mt-0.5">FIRMA REPORTE</p>
            </div>
          </div>

          <div>
            <div className="h-24 flex items-end justify-center mb-2">
              {h.firmaResponsable ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={h.firmaResponsable} alt="Firma SST" className="max-h-full max-w-[200px] object-contain" />
              ) : (
                <div className="h-full w-full flex items-end justify-center pb-2">
                  <span className="text-gray-300 italic text-sm text-center">Pendiente de firma validación global</span>
                </div>
              )}
            </div>
            <div className="border-t-2 border-gray-800 pt-2 text-center">
              <p className="font-bold text-gray-900 uppercase text-sm">{h.responsable || h.aprobadorNombre || 'Gestión HSEQ'}</p>
              <p className="text-xs text-gray-500 mt-0.5">FIRMA RESPONSABLE EVALUADOR</p>
            </div>
          </div>
        </div>

        {/* Footer legal */}
        <div className="mt-16 text-center border-t border-gray-100 pt-6 print:mt-10">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Documento Exclusivo de Control de Riesgos • Sistema HSEQ Nixus
          </p>
        </div>

      </div>
    </div>
  );
}
