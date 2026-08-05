'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import * as z from 'zod';
import {
  HALLAZGO_PELIGRO_OPTIONS,
  HALLAZGO_PERSONAL_EXPUESTO_OPTIONS,
} from '@/types';

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

  // `new Date(2026, 12, 32)` no falla: JS desborda al mes/día siguiente. Sin esta
  // comprobación un "32/13/2026" se importaba en silencio como 01/02/2027.
  const build = (year: number, month: number, day: number): Date | null => {
    const d = new Date(year, month - 1, day);
    if (isNaN(d.getTime())) return null;
    const exacto = d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
    return exacto ? d : null;
  };

  // dd/mm/yyyy (con soporte a dd/mm/yyyy hh:mm:ss del export)
  const m1 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m1) {
    const d = build(+m1[3], +m1[2], +m1[1]);
    if (d) return d;
  }

  // yyyy-mm-dd
  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m2) {
    const d = build(+m2[1], +m2[2], +m2[3]);
    if (d) return d;
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
const VALID_RESPONSABILIDAD = ['Directa', 'Corporativa'] as const;
const VALID_TIPO_HALLAZGO = ['Positivo', 'Seguimiento'] as const;

/** Minúsculas sin tildes, para comparar contra los catálogos con tolerancia. */
function fold(s: string): string {
  // ̀-ͯ = marcas diacríticas combinantes (target ES2017: sin \p{...}).
  return s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Normaliza un valor de lista cerrada respetando mayúsculas/minúsculas del catálogo. */
function normalizeOption<T extends string>(
  raw: string | undefined | null,
  options: readonly T[],
): T | undefined {
  const s = raw?.trim();
  if (!s) return undefined;
  return options.find(o => fold(o) === fold(s));
}

/**
 * Normaliza un campo de selección múltiple del formulario de hallazgos.
 *
 * En el Excel las opciones se escriben separadas por coma (o `;` / salto de línea),
 * pero la app las almacena **una por línea**: los selectores de Peligro Inspeccionado
 * y Personal Expuesto parten el valor por `\n`. Sin esta normalización, un
 * "Propio, Contratistas" importado no coincidía con ninguna opción y el campo se
 * veía vacío en el formulario (y se perdía al tocar un chip).
 *
 * @param keepUnknown  true en Peligros (el selector admite texto libre en "Otros");
 *                     false en Personal Expuesto (solo acepta las opciones del catálogo).
 */
function normalizeMultiOption<T extends string>(
  raw: string | undefined | null,
  options: readonly T[],
  keepUnknown: boolean,
): { value: string; unknown: string[] } {
  const parts = (raw ?? '')
    .split(/[,;\n]/)
    .map(p => p.trim())
    .filter(Boolean);

  const matched: string[] = [];
  const unknown: string[] = [];

  for (const part of parts) {
    const opt = options.find(o => fold(o) === fold(part));
    if (opt) {
      if (!matched.includes(opt)) matched.push(opt);
    } else {
      unknown.push(part);
    }
  }

  const value = keepUnknown ? [...matched, ...unknown].join('\n') : matched.join('\n');
  return { value, unknown };
}

/**
 * Parsea la columna "Seguimientos", que admite varios registros en una sola celda.
 * Formato por seguimiento: `fecha | % | observación`; varios separados por `;`.
 * Ej: `05/06/2026 | 50 | Se instaló señalización; 20/06/2026 | 100 | Cerrado en sitio`
 * El `%` y la observación son opcionales: `05/06/2026` o `05/06/2026 | 50` son válidos.
 */
interface ParsedSeguimiento {
  fecha: Date;
  porcentaje?: number;
  observacion?: string;
}

function parseSeguimientos(
  raw: string | undefined | null,
): { seguimientos: ParsedSeguimiento[]; errors: string[] } {
  const errors: string[] = [];
  const seguimientos: ParsedSeguimiento[] = [];

  const bloques = (raw ?? '').split(/[;\n]/).map(b => b.trim()).filter(Boolean);

  bloques.forEach((bloque, i) => {
    const [fechaRaw, pctRaw, ...obsParts] = bloque.split('|').map(p => p.trim());
    const fecha = parseDate(fechaRaw);
    if (!fecha) {
      errors.push(`Seguimiento ${i + 1}: fecha inválida ("${fechaRaw}") — usar dd/mm/aaaa`);
      return;
    }

    const porcentaje = parseNum(pctRaw);
    if (pctRaw && porcentaje === undefined) {
      errors.push(`Seguimiento ${i + 1}: el % debe ser un número`);
      return;
    }
    if (porcentaje !== undefined && (porcentaje < 0 || porcentaje > 100)) {
      errors.push(`Seguimiento ${i + 1}: el % debe estar entre 0 y 100`);
      return;
    }

    const observacion = obsParts.join('|').trim();
    seguimientos.push({
      fecha,
      ...(porcentaje !== undefined ? { porcentaje } : {}),
      ...(observacion ? { observacion } : {}),
    });
  });

  seguimientos.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  return { seguimientos, errors };
}

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

    // Listas cerradas opcionales
    if (raw.responsabilidad?.trim() && !normalizeOption(raw.responsabilidad, VALID_RESPONSABILIDAD)) {
      errors.push('Responsabilidad debe ser: Directa o Corporativa');
    }
    if (raw.tipoHallazgo?.trim() && !normalizeOption(raw.tipoHallazgo, VALID_TIPO_HALLAZGO)) {
      errors.push('Tipo de Hallazgo debe ser: Positivo o Seguimiento');
    }

    // Personal Expuesto: solo admite las opciones del catálogo (el formulario no
    // tiene texto libre en este campo, así que un valor no reconocido se perdería).
    if (raw.personalExpuesto?.trim()) {
      const { value, unknown } = normalizeMultiOption(
        raw.personalExpuesto, HALLAZGO_PERSONAL_EXPUESTO_OPTIONS, false,
      );
      if (unknown.length > 0) {
        errors.push(`Personal Expuesto no reconocido: ${unknown.join(', ')} (usar Propio y/o Contratistas)`);
      } else if (!value) {
        errors.push('Personal Expuesto debe ser: Propio, Contratistas o ambos separados por coma');
      }
    }

    // Seguimientos múltiples
    if (raw.seguimientos?.trim()) {
      parseSeguimientos(raw.seguimientos).errors.forEach(e => errors.push(e));
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
        // Normalizados a "una opción por línea": es el formato que leen los
        // selectores de chips del formulario (el Excel los trae separados por coma).
        peligroInspeccionado: normalizeMultiOption(
          raw.peligroInspeccionado, HALLAZGO_PELIGRO_OPTIONS, true,
        ).value,
        personalExpuesto: normalizeMultiOption(
          raw.personalExpuesto, HALLAZGO_PERSONAL_EXPUESTO_OPTIONS, false,
        ).value,
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
      const responsabilidad = normalizeOption(raw.responsabilidad, VALID_RESPONSABILIDAD);
      if (responsabilidad) docData.responsabilidad = responsabilidad;

      const tipoHallazgo = normalizeOption(raw.tipoHallazgo, VALID_TIPO_HALLAZGO);
      if (tipoHallazgo) docData.tipoHallazgo = tipoHallazgo;

      if (raw.accionInmediata?.trim()) docData.accionInmediata = raw.accionInmediata.trim();
      if (raw.responsable?.trim()) docData.responsable = raw.responsable.trim();
      if (raw.observacion?.trim()) docData.observacion = raw.observacion.trim();

      const lat = parseNum(raw.lat);
      const lng = parseNum(raw.lng);
      if (lat !== undefined && lng !== undefined) {
        docData.geolocalizacion = { lat, lng };
      }

      const pct = parseNum(raw.porcentajeCumplimiento);

      const pctT = parseNum(raw.porcentajeCumplimientoTotal);
      if (pctT !== undefined) docData.porcentajeCumplimientoTotal = pctT;

      const fechaMedida = parseDate(raw.fechaMedidaImplementada);
      if (fechaMedida) docData.fechaMedidaImplementada = Timestamp.fromDate(fechaMedida);

      // Seguimientos: se prefiere la columna multi-registro; si viene vacía se usan
      // las columnas sueltas (plantillas antiguas ya en circulación).
      const { seguimientos } = parseSeguimientos(raw.seguimientos);
      if (seguimientos.length === 0) {
        const fechaSeg = parseDate(raw.fechaSeguimiento1);
        if (fechaSeg) {
          seguimientos.push({
            fecha: fechaSeg,
            ...(pct !== undefined ? { porcentaje: pct } : {}),
          });
        }
      }

      if (seguimientos.length > 0) {
        docData.seguimientos = seguimientos.map(s => ({
          fecha: Timestamp.fromDate(s.fecha),
          ...(s.porcentaje !== undefined ? { porcentaje: s.porcentaje } : {}),
          ...(s.observacion ? { observacion: s.observacion } : {}),
          evidencias: [],
        }));
        // Campos legacy derivados, igual que en el formulario (los usan PDF y export).
        docData.fechaSeguimiento1 = Timestamp.fromDate(seguimientos[0].fecha);
        const ultimoPct = [...seguimientos].reverse()
          .find(s => s.porcentaje !== undefined)?.porcentaje;
        if (ultimoPct !== undefined) docData.porcentajeCumplimiento = ultimoPct;
      } else if (pct !== undefined) {
        // % sin ningún seguimiento asociado: se conserva tal cual.
        docData.porcentajeCumplimiento = pct;
      }

      // Evidencias del plan de acción: URLs ya existentes en Storage, separadas por coma.
      const evidencias = (raw.evidenciasPlanAccion ?? '')
        .split(/[,;\n]/)
        .map(u => u.trim())
        .filter(u => /^https?:\/\//i.test(u));
      if (evidencias.length > 0) docData.evidenciasPlanAccion = evidencias;

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
