'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import * as z from 'zod';
import { calcDiagnosticoAlturaScore } from '@/types/alturas';

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

const rowSchema = z.object({
  empresa: z.string().min(1, 'Empresa requerida'),
  planta:  z.string().min(1, 'Planta requerida'),
  fecha:   z.string().min(1, 'Fecha requerida'),
});

function parseDate(raw: string | undefined | null): string {
  if (!raw) return '';
  const s = raw.trim();
  if (!s) return '';

  const m1 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m1) {
    const d = new Date(+m1[3], +m1[2] - 1, +m1[1]);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m2) return s.slice(0, 10);

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

export async function validateImportRows(rows: RawImportRow[]): Promise<ValidationResult> {
  const results: RowResult[] = rows.map((row, idx) => {
    const result = rowSchema.safeParse({
      empresa: row.empresa ?? '',
      planta:  row.planta  ?? '',
      fecha:   row.fecha   ?? '',
    });
    return {
      rowIndex: idx + 2,
      valid:  result.success,
      errors: result.success ? [] : result.error.errors.map(e => e.message),
      empresa:            row.empresa ?? '',
      planta:             row.planta  ?? '',
      actividadAnalizada: row.actividadAnalizada ?? '',
      fecha:              row.fecha   ?? '',
    };
  });

  return {
    rows:       results,
    validCount: results.filter(r => r.valid).length,
    errorCount: results.filter(r => !r.valid).length,
  };
}

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
        empresa:  row.empresa ?? '',
        planta:   row.planta  ?? '',
        proceso:  row.proceso ?? '',
        fecha:    parseDate(row.fecha) || row.fecha,
        // Información de la actividad
        actividadAnalizada:       row.actividadAnalizada ?? '',
        detalleActividad:         row.detalleActividad ?? '',
        alturaPromedio:           row.alturaPromedio ?? '',
        desarrolladaPor:          splitMulti(row.desarrolladaPor),
        frecuenciaEjecucion:      row.frecuenciaEjecucion ?? '',
        tieneAltoRiesgoAdicional: row.tieneAltoRiesgoAdicional ?? '',
        actividadesAltoRiesgo:    splitMulti(row.actividadesAltoRiesgo),
        evaluadaEnIPER:           row.evaluadaEnIPER ?? '',
        cuentaConProcedimiento:   row.cuentaConProcedimiento ?? '',
        medidasPrevencion:        splitMulti(row.medidasPrevencion),
        // Escaleras y andamios
        escaleraFijaVertical:     splitMulti(row.escaleraFijaVertical),
        escaleraLlana:            splitMulti(row.escaleraLlana),
        escaleraExtension:        splitMulti(row.escaleraExtension),
        escaleraPortatil:         splitMulti(row.escaleraPortatil),
        escaleraTipoAvion:        splitMulti(row.escaleraTipoAvion),
        andamioMultidireccional:  splitMulti(row.andamioMultidireccional),
        elevadorPersonas:         splitMulti(row.elevadorPersonas),
        // Arneses y sistemas
        arnesCuerpoCompleto:      splitMulti(row.arnesCuerpoCompleto),
        estingaPosicionamiento:   splitMulti(row.estingaPosicionamiento),
        estingaConAbsorbedor:     splitMulti(row.estingaConAbsorbedor),
        anclajesFijos:            splitMulti(row.anclajesFijos),
        anclajePortatil:          splitMulti(row.anclajePortatil),
        lvhFija:                  splitMulti(row.lvhFija),
        lvhPortatil:              splitMulti(row.lvhPortatil),
        lvvFija:                  splitMulti(row.lvvFija),
        lvvPortatil:              splitMulti(row.lvvPortatil),
        mosquetones:              splitMulti(row.mosquetones),
        lvAutorretractil:         splitMulti(row.lvAutorretractil),
        // Emergencias y EPP
        equipoRescate:            splitMulti(row.equipoRescate),
        equipoPrimerosAuxilios:   splitMulti(row.equipoPrimerosAuxilios),
        eppUtilizados:            splitMulti(row.eppUtilizados),
        // Cierre
        seHanPresentadoCargos:    row.seHanPresentadoCargos ?? '',
        clienteAceptaInfo:        row.clienteAceptaInfo ?? '',
        nombreSST:                row.nombreSST ?? '',
        nombreResponsable:        row.nombreResponsable ?? '',
        createdById:   userId,
        createdByName: userName,
        status: 'completado' as const,
      };

      const resultados = calcDiagnosticoAlturaScore(data);

      await db.collection('diagnosticosAlturas').add(stripUndefined({
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
