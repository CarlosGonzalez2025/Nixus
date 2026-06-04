'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import * as z from 'zod';
import { calcDiagnosticoScore } from '@/types/confinados';

function stripUndefined(obj: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (v !== null && typeof v === 'object' && !Array.isArray(v) && typeof v.toDate !== 'function') {
      const nested = stripUndefined(v);
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type RawImportRow = Record<string, string>;

export interface RowResult {
  rowIndex: number;
  valid: boolean;
  errors: string[];
  empresa: string;
  planta: string;
  actividadAnalizada: string;
  fecha: string;
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

// ── Zod schema ────────────────────────────────────────────────────────────────

const rowSchema = z.object({
  empresa: z.string().min(1, 'Empresa requerida'),
  planta:  z.string().min(1, 'Planta requerida'),
  fecha:   z.string().min(1, 'Fecha requerida'),
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseDate(raw: string | undefined | null): string {
  if (!raw) return '';
  const s = raw.trim();
  if (!s) return '';

  // dd/mm/yyyy
  const m1 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m1) {
    const d = new Date(+m1[3], +m1[2] - 1, +m1[1]);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  // yyyy-mm-dd
  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m2) return s.slice(0, 10);

  // Excel serial
  const num = Number(s);
  if (!isNaN(num) && num > 40000) {
    const excelEpoch = new Date(1899, 11, 30);
    const d = new Date(excelEpoch.getTime() + num * 86400000);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  return s;
}

function splitMulti(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw.split(/[,;|]/).map(v => v.trim()).filter(Boolean);
}

// Note: COLUMN_MAP and mapRowColumns live in page.tsx (client) to avoid
// exporting a non-async function from a 'use server' file.

// ── Validate ───────────────────────────────────────────────────────────────────

export async function validateImportRows(
  rows: RawImportRow[],
): Promise<ValidationResult> {
  const results: RowResult[] = rows.map((row, idx) => {
    const result = rowSchema.safeParse({
      empresa: row.empresa ?? '',
      planta:  row.planta  ?? '',
      fecha:   row.fecha   ?? '',
    });

    return {
      rowIndex: idx + 2,
      valid: result.success,
      errors: result.success ? [] : result.error.errors.map(e => e.message),
      empresa:           row.empresa ?? '',
      planta:            row.planta  ?? '',
      actividadAnalizada: row.actividadAnalizada ?? '',
      fecha:             row.fecha   ?? '',
    };
  });

  return {
    rows: results,
    validCount:  results.filter(r => r.valid).length,
    errorCount:  results.filter(r => !r.valid).length,
  };
}

// ── Execute import ─────────────────────────────────────────────────────────────

export async function executeImport(
  rows: RawImportRow[],
  userId: string,
  userName: string,
): Promise<ExecuteResult> {
  if (!isAdminReady()) {
    return { success: false, imported: 0, failed: rows.length, errors: ['Firebase Admin no disponible'] };
  }

  const db = adminDb!;
  const errors: string[] = [];
  let imported = 0;
  let failed = 0;
  const now = Timestamp.now();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      const data = {
        // Datos Generales
        empresa:   row.empresa ?? '',
        planta:    row.planta  ?? '',
        proceso:   row.proceso ?? '',
        fecha:     parseDate(row.fecha) || row.fecha,
        // Descripción de la Actividad
        actividadAnalizada:        row.actividadAnalizada ?? '',
        detalleActividad:          row.detalleActividad ?? '',
        alturaPromedio:            row.alturaPromedio ?? '',
        desarrolladaPor:           splitMulti(row.desarrolladaPor),
        tipoEjecucion:             row.tipoEjecucion ?? '',
        tieneAltoRiesgoAdicional:  row.tieneAltoRiesgoAdicional ?? '',
        actividadesAltoRiesgo:     splitMulti(row.actividadesAltoRiesgo),
        medidasDeEntradaSalida:    row.medidasDeEntradaSalida ?? '',
        descripcionEspacio:        row.descripcionEspacio ?? '',
        // Facilidades y Evaluación
        facilidades:               splitMulti(row.facilidades),
        evaluadaEnIPER:            row.evaluadaEnIPER ?? '',
        tipoEspacioConfinado:      row.tipoEspacioConfinado ?? '',
        gradoPeligrosidad:         row.gradoPeligrosidad ?? '',
        medidasPrevencion:         splitMulti(row.medidasPrevencion),
        monitoreoPrevioIngreso:    row.monitoreoPrevioIngreso ?? '',
        cuentaConProcedimiento:    row.cuentaConProcedimiento ?? '',
        metodologiaBloqueoEnergias: row.metodologiaBloqueoEnergias ?? '',
        // Equipos y EPP
        escaleraFosaVertical:      splitMulti(row.escaleraFosaVertical),
        escaleraGato:              splitMulti(row.escaleraGato),
        escaleraExtension:         splitMulti(row.escaleraExtension),
        otroTrabajoAlturas:        splitMulti(row.otroTrabajoAlturas),
        arnesCuerpoCompleto:       splitMulti(row.arnesCuerpoCompleto),
        tripodeEquipoRescate:      splitMulti(row.tripodeEquipoRescate),
        autoContenido:             splitMulti(row.autoContenido),
        equipoComunicacion:        splitMulti(row.equipoComunicacion),
        sistemaVentilacionMecanica: splitMulti(row.sistemaVentilacionMecanica),
        sistemaProteccionCaidas:   splitMulti(row.sistemaProteccionCaidas),
        equipoPrimerosAuxilios:    splitMulti(row.equipoPrimerosAuxilios),
        otrosModelosProteccion:    splitMulti(row.otrosModelosProteccion),
        eppUtilizados:             splitMulti(row.eppUtilizados),
        // Cierre
        eventosAccidentesPrevios:  row.eventosAccidentesPrevios ?? '',
        clienteAceptaInfo:         row.clienteAceptaInfo ?? '',
        nombreSST:                 row.nombreSST ?? '',
        nombreResponsable:         row.nombreResponsable ?? '',
        createdById:   userId,
        createdByName: userName,
        status: 'completado' as const,
      };

      const resultados = calcDiagnosticoScore(data);

      await db.collection('diagnosticosConfinados').add(stripUndefined({
        ...data,
        resultados,
        createdAt: now,
        updatedAt: now,
      }));
      imported++;
    } catch (err: any) {
      failed++;
      errors.push(`Fila ${i + 2}: ${err?.message ?? 'Error desconocido'}`);
    }
  }

  return { success: failed === 0, imported, failed, errors };
}

