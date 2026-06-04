/**
 * migrate-inventario-ec.mjs
 *
 * Migración masiva: "ESTRUCTURA DE DATOS INVENTARIO CE.xlsx" → Firestore
 * Colección destino: diagnosticosConfinados
 *
 * ── CREDENCIALES Firebase Admin (elige UNA opción) ─────────────────────────
 *
 * OPCIÓN A — serviceAccountKey.json (recomendada para scripts locales):
 *   1. Firebase Console → Configuración del proyecto → Cuentas de servicio
 *   2. Clic en "Generar nueva clave privada" → descarga el JSON
 *   3. Guárdalo como: scripts/serviceAccountKey.json
 *   4. Ejecuta: node scripts/migrate-inventario-ec.mjs
 *
 * OPCIÓN B — Variables de entorno en PowerShell:
 *   $env:FIREBASE_PROJECT_ID   = "tu-project-id"
 *   $env:FIREBASE_CLIENT_EMAIL = "firebase-adminsdk-xxx@proyecto.iam.gserviceaccount.com"
 *   $env:FIREBASE_PRIVATE_KEY  = "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
 *   node scripts/migrate-inventario-ec.mjs
 *
 * OPCIÓN C — Dry-run (sin credenciales, solo valida el Excel):
 *   $env:DRY_RUN="true"; node scripts/migrate-inventario-ec.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Cargar credenciales: prioridad serviceAccountKey.json > .env.local > vars ─

const SA_KEY_FILE = resolve(__dirname, 'serviceAccountKey.json');
const ENV_FILE    = resolve(__dirname, '../.env.local');

// 1. serviceAccountKey.json
if (existsSync(SA_KEY_FILE) && !process.env.FIREBASE_PROJECT_ID) {
  try {
    const sa = JSON.parse(readFileSync(SA_KEY_FILE, 'utf8'));
    process.env.FIREBASE_PROJECT_ID   = sa.project_id;
    process.env.FIREBASE_CLIENT_EMAIL = sa.client_email;
    process.env.FIREBASE_PRIVATE_KEY  = sa.private_key;
    console.log(`[auth] serviceAccountKey.json → proyecto: ${sa.project_id}`);
  } catch (e) {
    console.warn('[auth] No se pudo leer serviceAccountKey.json:', e.message);
  }
}

// 2. .env.local (si existe)
if (existsSync(ENV_FILE) && !process.env.FIREBASE_PROJECT_ID) {
  const lines = readFileSync(ENV_FILE, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  }
  console.log('[auth] .env.local cargado');
}

// ── Importar dependencias ──────────────────────────────────────────────────────

let XLSX, admin;
try {
  XLSX  = (await import('xlsx')).default;
  admin = (await import('firebase-admin')).default;
} catch (e) {
  console.error('\n[ERROR] Dependencias no encontradas. Ejecuta desde la raíz del proyecto.\n', e.message);
  process.exit(1);
}

const DRY_RUN   = process.env.DRY_RUN === 'true';
const BATCH_SIZE = 400; // Firestore limit: 500, usamos 400 para margen
const EXCEL_FILE = resolve(__dirname, '../ESTRUCTURA DE DATOS INVENTARIO CE.xlsx');
const SHEET_NAME = 'INVENTARIO EC';
const COLLECTION = 'diagnosticosConfinados';
const IMPORT_USER = process.env.IMPORT_USER || 'migracion@sistema.com';

// ── Inicializar Firebase Admin ─────────────────────────────────────────────────

function initFirebase() {
  if (admin.apps.length) return admin.firestore();

  const projectId   = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey      = process.env.FIREBASE_PRIVATE_KEY || '';

  if (!projectId || !clientEmail || !rawKey) {
    console.error(`
[ERROR] No se encontraron credenciales de Firebase Admin.

Solución más fácil:
  1. Firebase Console → ⚙️ Configuración del proyecto → Cuentas de servicio
  2. Clic en "Generar nueva clave privada" → descarga el JSON
  3. Guárdalo como:  scripts/serviceAccountKey.json
  4. Vuelve a ejecutar: node scripts/migrate-inventario-ec.mjs

Ver comentarios al inicio del script para más opciones.
`);
    process.exit(1);
  }

  const privateKey = rawKey.trim().replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });

  console.log(`[firebase] Conectado al proyecto: ${projectId}`);
  return admin.firestore();
}

// ── Normalización ──────────────────────────────────────────────────────────────

function normYesNo(raw) {
  if (!raw) return '';
  const s = raw.toString().trim().toUpperCase();
  if (['SI', 'SÍ', 'S', 'YES', 'Y', '1'].includes(s)) return 'Si';
  if (['NO', 'N', '0', 'NA', 'N/A'].includes(s)) return 'No';
  return raw.toString().trim();
}

function normDate(raw) {
  if (!raw) return '';
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  const s = raw.toString().trim();
  // "2024-10-09 11:56:09.955000"
  const m1 = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (m1) return m1[1];
  // dd/mm/yyyy
  const m2 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m2) return `${m2[3]}-${m2[2].padStart(2,'0')}-${m2[1].padStart(2,'0')}`;
  // Excel serial
  const num = Number(s);
  if (!isNaN(num) && num > 40000) {
    const d = new Date(Math.round((num - 25569) * 86400000));
    return d.toISOString().slice(0, 10);
  }
  return s;
}

function normTipoEjecucion(raw) {
  if (!raw) return '';
  const s = raw.toString().trim();
  if (/rutinaria/i.test(s) && /no/i.test(s)) return 'No Rutinaria';
  if (/^rutinaria$/i.test(s))                 return 'Rutinaria';
  if (/periódica|periodica/i.test(s))         return 'Periódica';
  if (/esporádica|esporadica/i.test(s))       return 'Esporádica';
  return s;
}

// Mapeo de valores de equipos (Excel) a nuestros estándares
const EQUIPO_MAP = {
  'están en buen estado':                     'Buen estado',
  'buen estado':                               'Buen estado',
  'se le realiza inspección':                  'Inspección y mantenimiento',
  'se le realiza inspeccion':                  'Inspección y mantenimiento',
  'inspección y mantenimiento':                'Inspección y mantenimiento',
  'inspeccion y mantenimiento':                'Inspección y mantenimiento',
  'mtto':                                      'Inspección y mantenimiento',
  'mantenimiento':                             'Inspección y mantenimiento',
  'se evidencia la inspección anual':          'Inspección y mantenimiento',
  'son certificados':                          'Certificado',
  'están certificado':                         'Certificado',
  'está certificado':                          'Certificado',
  'certificado':                               'Certificado',
  'tienen hoja de vida':                       'Hoja de vida',
  'hoja de vida':                              'Hoja de vida',
  'se utiliza':                                'Se utiliza',
  'no se utiliza':                             'No se utiliza',
  'no aplica':                                 'No aplica',
  'no aplica.':                                'No aplica',
};

function normEquipo(raw) {
  if (!raw) return [];
  const parts = raw.toString().split(',').map(p => p.trim()).filter(Boolean);
  const result = new Set();
  for (const part of parts) {
    const key = part.toLowerCase().trim().replace(/\s+/g, ' ');
    const mapped = EQUIPO_MAP[key];
    if (mapped) {
      result.add(mapped);
    } else {
      // Búsqueda parcial
      let found = false;
      for (const [pattern, standard] of Object.entries(EQUIPO_MAP)) {
        if (key.includes(pattern) || pattern.includes(key)) {
          result.add(standard);
          found = true;
          break;
        }
      }
      if (!found && key.length > 2) result.add(part.trim()); // keep unknown as-is
    }
  }
  return [...result];
}

// Mapeo para "Desarrollada Por"
const DESARROLLADO_MAP = {
  'personal de la empresa':       'Personal de la Empresa',
  'personal propio':              'Personal de la Empresa',
  'personal temporal':            'Personal Temporal',
  'personal contratista':         'Personal Temporal',
  'personal del contratista':     'Personal Temporal',
  'contratista':                  'Personal Temporal',
  'no aplica':                    'No Aplica',
};

function normDesarrolladoPor(raw) {
  if (!raw) return [];
  const parts = raw.toString().split(',').map(p => p.trim().replace(/,$/, '').trim()).filter(Boolean);
  const result = new Set();
  for (const part of parts) {
    const key = part.toLowerCase().trim();
    result.add(DESARROLLADO_MAP[key] ?? part.trim());
  }
  return [...result];
}

function normMulti(raw) {
  if (!raw) return [];
  return raw.toString().split(',').map(p => p.trim()).filter(Boolean);
}

function normStr(raw) {
  if (raw === null || raw === undefined) return '';
  return raw.toString().trim();
}

// ── Score calculation (replica de calcDiagnosticoScore) ───────────────────────

function calcScore(data) {
  const identificacionPeligros = data.evaluadaEnIPER
    ? (data.evaluadaEnIPER === 'Si' ? 2 : 0) : undefined;

  const medidasStr   = (data.medidasPrevencion ?? []).join(', ').toLowerCase().trim();
  const hasMedidas   = medidasStr.length > 0;
  const permisosDeTrabajo       = hasMedidas ? (medidasStr === 'permiso de trabajo' ? 2 : 0) : undefined;
  const gestionMedidasPrevencion = hasMedidas
    ? (medidasStr.includes('permiso de trabajo') && medidasStr !== 'permiso de trabajo' ? 2 : 0)
    : undefined;

  const monitoreoDeLaAtmosfera = data.monitoreoPrevioIngreso
    ? (data.monitoreoPrevioIngreso === 'Si' ? 2 : 0) : undefined;
  const procedimientoEspaciosConfinados = data.cuentaConProcedimiento
    ? (data.cuentaConProcedimiento === 'Si' ? 2 : 0) : undefined;
  const manejoEnergiasPeligrosas = data.metodologiaBloqueoEnergias
    ? (data.metodologiaBloqueoEnergias === 'Si' ? 2 : 0) : undefined;

  const epa = data.equipoPrimerosAuxilios ?? [];
  const planDeEmergencias = epa.length > 0
    ? (epa.some(v => v.toLowerCase().includes('se utiliza')) ? 2 : 0) : undefined;

  const scores = [identificacionPeligros, permisosDeTrabajo, gestionMedidasPrevencion,
    monitoreoDeLaAtmosfera, procedimientoEspaciosConfinados, manejoEnergiasPeligrosas,
    planDeEmergencias].filter(v => v !== undefined);
  const sumaTotal = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) : undefined;

  return {
    identificacionPeligros, permisosDeTrabajo, gestionMedidasPrevencion,
    monitoreoDeLaAtmosfera, procedimientoEspaciosConfinados, manejoEnergiasPeligrosas,
    planDeEmergencias, sumaTotal,
  };
}

// ── Strip undefined (Firestore no acepta undefined) ────────────────────────────

function stripUndefined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const nested = stripUndefined(v);
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}

// ── Mapear fila Excel → DiagnosticoConfinado ───────────────────────────────────

function mapRow(row, headers) {
  const get = (idx) => row[idx - 1]; // 1-based → 0-based

  // Medidas prevención: free text → split by common separators
  const medPrevRaw = normStr(get(30));
  const medidasPrevencion = medPrevRaw
    ? medPrevRaw.split(/[,;+]/).map(s => s.trim()).filter(s => s.length > 0)
    : [];

  // Detectar si contiene "Permiso de trabajo" (case-insensitive)
  const hasPermiso = medidasPrevencion.some(m => /permiso\s+de\s+trabajo/i.test(m));
  if (hasPermiso) {
    // Normalize the permiso entry
    const idx = medidasPrevencion.findIndex(m => /permiso\s+de\s+trabajo/i.test(m));
    medidasPrevencion[idx] = 'Permiso de trabajo';
  }

  const data = {
    // Datos Generales
    empresa:   normStr(get(6)),
    planta:    normStr(get(8)),
    proceso:   normStr(get(10)),
    fecha:     normDate(get(4)),

    // Descripción de la Actividad
    actividadAnalizada:       normStr(get(11)),
    detalleActividad:         normStr(get(12)),
    alturaPromedio:           normStr(get(13)),
    desarrolladaPor:          normDesarrolladoPor(get(14)),
    tipoEjecucion:            normTipoEjecucion(get(15)),
    tieneAltoRiesgoAdicional: normYesNo(get(16)),
    actividadesAltoRiesgo:    normMulti(get(17)),
    medidasDeEntradaSalida:   normStr(get(18)),
    descripcionEspacio:       normStr(get(21)),

    // Facilidades y Evaluación
    facilidades:                normMulti(get(24)),
    evaluadaEnIPER:             normYesNo(get(27)),
    tipoEspacioConfinado:       normStr(get(28)),
    gradoPeligrosidad:          normStr(get(29)),
    medidasPrevencion,
    monitoreoPrevioIngreso:     normYesNo(get(31)),
    cuentaConProcedimiento:     normYesNo(get(32)),
    metodologiaBloqueoEnergias: normYesNo(get(33)),

    // Equipos y EPP
    escaleraFosaVertical:       normEquipo(get(34)),
    escaleraGato:               normEquipo(get(35)),
    escaleraExtension:          normEquipo(get(36)),
    otroTrabajoAlturas:         normEquipo(get(37)),
    arnesCuerpoCompleto:        normEquipo(get(38)),
    tripodeEquipoRescate:       normEquipo(get(39)),
    autoContenido:              normEquipo(get(40)),
    equipoComunicacion:         normEquipo(get(41)),
    sistemaVentilacionMecanica: normEquipo(get(42)),
    sistemaProteccionCaidas:    normEquipo(get(43)),
    equipoPrimerosAuxilios:     normEquipo(get(44)),
    otrosModelosProteccion:     normEquipo(get(45)),
    eppUtilizados:              normMulti(get(46)),

    // Cierre
    eventosAccidentesPrevios: normYesNo(get(47)),
    clienteAceptaInfo:        normYesNo(get(48)),
    nombreSST:                normStr(get(9)),  // Responsable SSTA → nombreSST
    nombreResponsable:        '',

    // Metadata
    createdById:   IMPORT_USER,
    createdByName: normStr(get(3)) || IMPORT_USER,  // email original del usuario
    status:        'completado',

    // Referencia al ID original del Excel
    _origenId: normStr(get(1)),
    _origenFecha: normDate(get(51)), // Marca temporal (AY)
  };

  // Calcular scores
  data.resultados = calcScore(data);

  return stripUndefined(data);
}

// ── Validación mínima ──────────────────────────────────────────────────────────

function validate(doc, rowNum) {
  const errors = [];
  if (!doc.empresa) errors.push('empresa vacía');
  if (!doc.planta)  errors.push('planta vacía');
  if (!doc.fecha)   errors.push('fecha vacía');
  return errors;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═'.repeat(60));
  console.log('  Migración INVENTARIO EC → Firestore');
  console.log(`  Modo: ${DRY_RUN ? '🔍 DRY-RUN (no escribe)' : '🚀 PRODUCCIÓN'}`);
  console.log('═'.repeat(60));

  // 1. Leer Excel
  if (!existsSync(EXCEL_FILE)) {
    console.error(`[ERROR] Archivo no encontrado: ${EXCEL_FILE}`);
    process.exit(1);
  }
  console.log(`\n[excel] Leyendo: ${EXCEL_FILE}`);
  const wb = XLSX.readFile(EXCEL_FILE, { cellDates: false, raw: true });
  if (!wb.SheetNames.includes(SHEET_NAME)) {
    console.error(`[ERROR] Pestaña "${SHEET_NAME}" no encontrada. Disponibles: ${wb.SheetNames.join(', ')}`);
    process.exit(1);
  }
  const ws      = wb.Sheets[SHEET_NAME];
  const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
  const headers = rawRows[0];
  const dataRows = rawRows.slice(1).filter(r => r[0] !== null && r[0] !== undefined);

  console.log(`[excel] ${dataRows.length} registros encontrados`);

  // 2. Mapear y validar
  const valid   = [];
  const invalid = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row    = dataRows[i];
    const rowNum = i + 2; // Excel row number (1=header, 2=first data)
    try {
      const doc    = mapRow(row, headers);
      const errors = validate(doc, rowNum);
      if (errors.length > 0) {
        invalid.push({ rowNum, errors, empresa: doc.empresa, planta: doc.planta });
      } else {
        valid.push(doc);
      }
    } catch (err) {
      invalid.push({ rowNum, errors: [err.message], empresa: String(row[5] ?? ''), planta: String(row[7] ?? '') });
    }
  }

  console.log(`\n[validación] ✅ Válidos: ${valid.length}  ❌ Con errores: ${invalid.length}`);

  if (invalid.length > 0) {
    console.log('\n[errores]');
    for (const inv of invalid.slice(0, 10)) {
      console.log(`  Fila ${inv.rowNum} (${inv.empresa} / ${inv.planta}): ${inv.errors.join(', ')}`);
    }
    if (invalid.length > 10) console.log(`  ... y ${invalid.length - 10} más`);
  }

  if (valid.length === 0) {
    console.log('\n[abort] Sin registros válidos para importar.');
    process.exit(0);
  }

  // 3. Preview de resultados
  console.log('\n[preview] Primeros 3 registros normalizados:');
  for (const doc of valid.slice(0, 3)) {
    console.log(`  → ${doc.empresa} | ${doc.planta} | ${doc.fecha} | score=${doc.resultados?.sumaTotal ?? '?'}`);
    console.log(`    medidas: ${(doc.medidasPrevencion ?? []).join(' | ')}`);
    console.log(`    equipoPrimAux: ${(doc.equipoPrimerosAuxilios ?? []).join(' | ')}`);
  }

  if (DRY_RUN) {
    console.log(`\n[dry-run] Se habrían importado ${valid.length} registros. No se escribió nada.`);
    return;
  }

  // 4. Confirmar
  console.log(`\n⚠️  Se van a escribir ${valid.length} documentos en la colección "${COLLECTION}".`);
  console.log('   Presiona ENTER para continuar o Ctrl+C para cancelar...');
  await new Promise(resolve => {
    process.stdin.setRawMode?.(false);
    process.stdin.resume();
    process.stdin.once('data', () => { process.stdin.pause(); resolve(); });
  });

  // 5. Conectar a Firestore e importar en lotes
  const db  = initFirebase();
  const now = admin.firestore.Timestamp.now();

  let imported = 0;
  let failed   = 0;

  for (let start = 0; start < valid.length; start += BATCH_SIZE) {
    const chunk = valid.slice(start, start + BATCH_SIZE);
    const batch = db.batch();

    for (const doc of chunk) {
      const ref = db.collection(COLLECTION).doc();
      batch.set(ref, {
        ...doc,
        createdAt: now,
        updatedAt: now,
      });
    }

    try {
      await batch.commit();
      imported += chunk.length;
      const pct = Math.round((imported / valid.length) * 100);
      process.stdout.write(`\r[importando] ${imported}/${valid.length} (${pct}%)...`);
    } catch (err) {
      failed += chunk.length;
      console.error(`\n[ERROR] Lote ${start}-${start + chunk.length}: ${err.message}`);
    }
  }

  console.log(`\n\n[resultado] ✅ Importados: ${imported}  ❌ Fallidos: ${failed}`);
  if (invalid.length > 0) {
    console.log(`[resultado] ⚠️  Filas saltadas por error de validación: ${invalid.length}`);
  }
  console.log('\n[listo] Migración completada.');
}

main().catch(err => {
  console.error('\n[FATAL]', err);
  process.exit(1);
});
