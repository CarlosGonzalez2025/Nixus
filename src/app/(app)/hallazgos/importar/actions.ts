'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import * as z from 'zod';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Fila cruda mapeada desde el Excel (campo → string). */
export type RawImportRow = Record<string, string>;

export interface RowResult {
  rowIndex: number;
  valid: boolean;
  errors: string[];
  // Campos de vista previa
  empresa: string;
  planta: string;
  hallazgo: string;
  clase: string;
  fechaVisita: string;
}

export interface ValidationResult {
  rows: RowResult[];
  validCount: number;
  errorCount: number;
}

export interface ExecuteResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
}

// ─── Schema de validación (campos requeridos) ─────────────────────────────────

const rowSchema = z.object({
  empresa: z.string().min(1, 'Empresa requerida'),
  planta: z.string().min(1, 'Planta requerida'),
  area: z.string().min(1, 'Área requerida'),
  tipoActividad: z.enum(['Rutinario', 'No Rutinario'], {
    errorMap: () => ({ message: 'Tipo de Actividad debe ser "Rutinario" o "No Rutinario"' }),
  }),
  fechaVisita: z.string().min(1, 'Fecha de visita requerida'),
  peligroInspeccionado: z.string().min(1, 'Peligro inspeccionado requerido'),
  hallazgo: z.string().min(1, 'Hallazgo (descripción) requerido'),
  clase: z.enum(['A', 'B', 'C'], {
    errorMap: () => ({ message: 'Clase debe ser A, B o C' }),
  }),
  intervencion: z.enum(['Inmediata', 'Pronta', 'Posterior'], {
    errorMap: () => ({ message: 'Intervención debe ser "Inmediata", "Pronta" o "Posterior"' }),
  }),
  descripcion: z.string().min(1, 'Descripción / Recomendaciones requerida'),
  reportadoPorNombre: z.string().min(1, 'Nombre del reportador requerido'),
  reportadoPorCargo: z.string().min(1, 'Cargo del reportador requerido'),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Parsea fechas en formato dd/mm/yyyy, yyyy-mm-dd o ISO. */
function parseDate(raw: string | undefined | null): Date | null {
  if (!raw) return null;
  const s = raw.trim();
  if (!s || s === 'N/A' || s === '-' || s === '—') return null;

  // dd/mm/yyyy (con soporte a dd/mm/yyyy hh:mm:ss del export)
  const m1 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m1) {
    const d = new Date(+m1[3], +m1[2] - 1, +m1[1]);
    if (!isNaN(d.getTime())) return d;
  }

  // yyyy-mm-dd
  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m2) {
    const d = new Date(+m2[1], +m2[2] - 1, +m2[3]);
    if (!isNaN(d.getTime())) return d;
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function parseNum(raw: string | undefined | null): number | undefined {
  if (!raw) return undefined;
  const n = parseFloat(raw.trim().replace(',', '.'));
  return isNaN(n) ? undefined : n;
}

/** Acepta "A", "B", "C", "Clase A", "Clase B", "Clase C". */
function normalizeClase(raw: string): string {
  return raw.trim().replace(/^Clase\s*/i, '').toUpperCase();
}

const VALID_ESTADOS = ['Pendiente', 'En Progreso', 'Completado', 'Cerrado'] as const;

// ─── Server Action: validateImportRows ────────────────────────────────────────

/**
 * Valida un array de filas crudas sin escribir en Firestore.
 * Retorna el resultado fila a fila para mostrar vista previa.
 */
export async function validateImportRows(rows: RawImportRow[]): Promise<ValidationResult> {
  const results: RowResult[] = rows.map((raw, i) => {
    const normalized: Record<string, string> = {
      ...raw,
      clase: normalizeClase(raw.clase || ''),
      cumplimientoEstado: raw.cumplimientoEstado?.trim() || 'Pendiente',
    };

    const errors: string[] = [];

    // Validación de campos requeridos con Zod
    const parsed = rowSchema.safeParse(normalized);
    if (!parsed.success) {
      parsed.error.errors.forEach(e => errors.push(e.message));
    }

    // Fecha de visita (validación extra de parseo real)
    if (normalized.fechaVisita && !parseDate(normalized.fechaVisita)) {
      if (!errors.some(e => e.includes('Fecha'))) {
        errors.push('Fecha de visita inválida (usar formato dd/mm/yyyy)');
      }
    }

    // Geo: si se proporciona una coordenada, la otra es obligatoria
    const lat = parseNum(raw.lat);
    const lng = parseNum(raw.lng);
    if ((lat !== undefined) !== (lng !== undefined)) {
      errors.push('Latitud y Longitud deben proporcionarse juntas o ninguna');
    }
    if (lat !== undefined && (lat < -90 || lat > 90)) {
      errors.push('Latitud fuera de rango (-90 a 90)');
    }
    if (lng !== undefined && (lng < -180 || lng > 180)) {
      errors.push('Longitud fuera de rango (-180 a 180)');
    }

    // Porcentajes
    const pct = parseNum(raw.porcentajeCumplimiento);
    if (pct !== undefined && (pct < 0 || pct > 100)) {
      errors.push('% Cumplimiento debe ser entre 0 y 100');
    }
    const pctT = parseNum(raw.porcentajeCumplimientoTotal);
    if (pctT !== undefined && (pctT < 0 || pctT > 100)) {
      errors.push('% Cumplimiento Total debe ser entre 0 y 100');
    }

    // Estado de cumplimiento
    const estado = normalized.cumplimientoEstado;
    if (estado && !(VALID_ESTADOS as readonly string[]).includes(estado)) {
      errors.push('Estado Cumplimiento debe ser: Pendiente, En Progreso, Completado o Cerrado');
    }

    return {
      rowIndex: i,
      valid: errors.length === 0,
      errors,
      empresa: raw.empresa?.trim() || '',
      planta: raw.planta?.trim() || '',
      hallazgo: (raw.hallazgo?.trim() || '').slice(0, 80),
      clase: normalizeClase(raw.clase || ''),
      fechaVisita: raw.fechaVisita?.trim() || '',
    };
  });

  return {
    rows: results,
    validCount: results.filter(r => r.valid).length,
    errorCount: results.filter(r => !r.valid).length,
  };
}

// ─── Server Action: executeImport ─────────────────────────────────────────────

/**
 * Escribe las filas válidas en Firestore usando Firebase Admin WriteBatch.
 * - Asigna números secuenciales a partir del máximo actual.
 * - Procesa en lotes de 499 (límite Firestore).
 * - NO envía notificaciones de email para no saturar a los destinatarios.
 *
 * @param validRows  Solo las filas que pasaron validación (filtradas por el cliente).
 * @param userId     UID del usuario administrador que ejecuta la importación.
 * @param empresaId  ID de empresa del usuario (para el campo empresaId del documento).
 */
export async function executeImport(
  validRows: RawImportRow[],
  userId: string,
  empresaId: string,
): Promise<ExecuteResult> {
  if (!isAdminReady()) {
    return {
      success: false,
      imported: 0,
      failed: validRows.length,
      errors: ['Firebase Admin SDK no disponible. Verifica la configuración del servidor.'],
    };
  }

  if (validRows.length === 0) {
    return { success: true, imported: 0, failed: 0, errors: [] };
  }

  // Obtener el número más alto actual para asignar secuencialmente
  const lastSnap = await adminDb
    .collection('hallazgos')
    .orderBy('numero', 'desc')
    .limit(1)
    .get();
  const startNumero = ((lastSnap.docs[0]?.data()?.numero as number) ?? 0) + 1;

  const now = Timestamp.now();
  const BATCH_LIMIT = 499;
  const batchErrors: string[] = [];
  let imported = 0;

  for (let offset = 0; offset < validRows.length; offset += BATCH_LIMIT) {
    const chunk = validRows.slice(offset, offset + BATCH_LIMIT);
    const batch = adminDb.batch();

    for (let j = 0; j < chunk.length; j++) {
      const raw = chunk[j];
      const numero = startNumero + offset + j;

      const clase = normalizeClase(raw.clase || 'C') as 'A' | 'B' | 'C';
      const intervencion = (raw.intervencion?.trim() || 'Posterior') as 'Inmediata' | 'Pronta' | 'Posterior';
      const tipoActividad = (raw.tipoActividad?.trim() || 'Rutinario') as 'Rutinario' | 'No Rutinario';
      const cumplimientoEstado = (
        raw.cumplimientoEstado?.trim() || 'Pendiente'
      ) as 'Pendiente' | 'En Progreso' | 'Completado' | 'Cerrado';

      const fechaVisita = parseDate(raw.fechaVisita);

      // Documento base (campos siempre presentes)
      const docData: Record<string, unknown> = {
        numero,
        empresa: raw.empresa?.trim() || '',
        planta: raw.planta?.trim() || '',
        area: raw.area?.trim() || '',
        tipoActividad,
        fechaVisita: fechaVisita ? Timestamp.fromDate(fechaVisita) : now,
        peligroInspeccionado: raw.peligroInspeccionado?.trim() || '',
        personalExpuesto: raw.personalExpuesto?.trim() || '',
        hallazgo: raw.hallazgo?.trim() || '',
        evidenciasFotograficas: [],
        clase,
        intervencion,
        descripcion: raw.descripcion?.trim() || '',
        reportadoPorNombre: raw.reportadoPorNombre?.trim() || '',
        reportadoPorCargo: raw.reportadoPorCargo?.trim() || '',
        cumplimientoEstado,
        empresaId: empresaId || raw.empresa?.trim() || '',
        createdBy: userId,
        createdAt: now,
        updatedAt: now,
        // Marca de auditoría para distinguir registros importados masivamente
        _importadoMasivamente: true,
      };

      // Campos opcionales — solo se agregan si tienen valor
      if (raw.accionInmediata?.trim()) docData.accionInmediata = raw.accionInmediata.trim();
      if (raw.responsable?.trim()) docData.responsable = raw.responsable.trim();
      if (raw.observacion?.trim()) docData.observacion = raw.observacion.trim();

      const lat = parseNum(raw.lat);
      const lng = parseNum(raw.lng);
      if (lat !== undefined && lng !== undefined) {
        docData.geolocalizacion = { lat, lng };
      }

      const pct = parseNum(raw.porcentajeCumplimiento);
      if (pct !== undefined) docData.porcentajeCumplimiento = pct;

      const pctT = parseNum(raw.porcentajeCumplimientoTotal);
      if (pctT !== undefined) docData.porcentajeCumplimientoTotal = pctT;

      const fechaMedida = parseDate(raw.fechaMedidaImplementada);
      if (fechaMedida) docData.fechaMedidaImplementada = Timestamp.fromDate(fechaMedida);

      const fechaSeg = parseDate(raw.fechaSeguimiento1);
      if (fechaSeg) docData.fechaSeguimiento1 = Timestamp.fromDate(fechaSeg);

      const fechaCierreVal = parseDate(raw.fechaCierre);
      if (fechaCierreVal) docData.fechaCierre = Timestamp.fromDate(fechaCierreVal);

      batch.set(adminDb.collection('hallazgos').doc(), docData);
    }

    try {
      await batch.commit();
      imported += chunk.length;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      batchErrors.push(`Error en lote ${Math.floor(offset / BATCH_LIMIT) + 1}: ${msg}`);
    }
  }

  return {
    success: batchErrors.length === 0,
    imported,
    failed: validRows.length - imported,
    errors: batchErrors,
  };
}
