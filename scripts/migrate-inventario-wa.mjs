/**
 * migrate-inventario-wa.mjs
 *
 * Migración masiva: "ESTRUCTURA DE DATOS INVENTARIO WA (1).xlsx" → Firestore
 * Colección destino: diagnosticosAlturas
 *
 * ── CREDENCIALES Firebase Admin (elige UNA opción) ─────────────────────────
 *
 * OPCIÓN A — serviceAccountKey.json (recomendada para scripts locales):
 *   1. Firebase Console → Configuración del proyecto → Cuentas de servicio
 *   2. Clic en "Generar nueva clave privada" → descarga el JSON
 *   3. Guárdalo como: scripts/serviceAccountKey.json
 *   4. Ejecuta: node scripts/migrate-inventario-wa.mjs
 *
 * OPCIÓN B — Variables de entorno (.env en la raíz):
 *   Ya están configuradas en el archivo .env del proyecto
 *   Ejecuta: node scripts/migrate-inventario-wa.mjs
 *
 * OPCIÓN C — Dry-run (sin credenciales, solo valida y muestra preview):
 *   node scripts/migrate-inventario-wa.mjs --dry-run
 *
 * OPCIONES:
 *   --dry-run        Valida sin escribir en Firestore
 *   --skip-existing  Omite filas cuyo _origenId ya exista en Firestore
 *   --limit N        Importa solo los primeros N registros
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Cargar credenciales: prioridad serviceAccountKey.json > .env ───────────

const SA_KEY_FILE = resolve(__dirname, 'serviceAccountKey.json');
const ENV_FILE    = resolve(__dirname, '../.env');

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

if (existsSync(ENV_FILE) && !process.env.FIREBASE_PROJECT_ID) {
  const lines = readFileSync(ENV_FILE, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim().replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
      if (!process.env[key]) process.env[key] = val;
    }
  }
  console.log('[auth] .env cargado');
}

// ── Importar dependencias ──────────────────────────────────────────────────

let XLSX, admin;
try {
  XLSX  = (await import('xlsx')).default;
  admin = (await import('firebase-admin')).default;
} catch (e) {
  console.error('\n[ERROR] Dependencias no encontradas. Ejecuta desde la raíz del proyecto.\n', e.message);
  process.exit(1);
}

// ── Parámetros de ejecución ────────────────────────────────────────────────

const ARGS           = process.argv.slice(2);
const DRY_RUN        = ARGS.includes('--dry-run');
const SKIP_EXISTING  = ARGS.includes('--skip-existing');
const LIMIT_IDX      = ARGS.indexOf('--limit');
const LIMIT          = LIMIT_IDX >= 0 ? parseInt(ARGS[LIMIT_IDX + 1], 10) : Infinity;
const BATCH_SIZE     = 400;
const EXCEL_FILE     = resolve(__dirname, '../ESTRUCTURA DE DATOS INVENTARIO WA (1).xlsx');
const SHEET_NAME     = 'INVENTARIO WA';
const COLLECTION     = 'diagnosticosAlturas';
const IMPORT_USER    = 'migracion-wa@sistema.com';

// ── Inicializar Firebase Admin ─────────────────────────────────────────────

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
  4. Vuelve a ejecutar: node scripts/migrate-inventario-wa.mjs
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

// ── Normalización ──────────────────────────────────────────────────────────

function normStr(raw) {
  if (raw === null || raw === undefined) return '';
  return raw.toString().trim();
}

function normYesNo(raw) {
  if (!raw) return '';
  const s = normStr(raw).toUpperCase();
  if (['SI', 'SÍ', 'S', 'YES', 'Y'].includes(s)) return 'Si';
  if (['NO', 'N', '0', 'NA'].includes(s))         return 'No';
  return normStr(raw);
}

function normDate(raw) {
  if (!raw) return '';
  if (typeof raw === 'number' && raw > 40000) {
    // Excel serial date
    const d = new Date(Math.round((raw - 25569) * 86400000));
    return d.toISOString().slice(0, 10);
  }
  const s = normStr(raw);
  const m1 = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (m1) return m1[1];
  const m2 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m2) return `${m2[3]}-${m2[2].padStart(2, '0')}-${m2[1].padStart(2, '0')}`;
  return s;
}

function normMulti(raw) {
  if (!raw) return [];
  return normStr(raw).split(/[,;|]/).map(p => p.trim()).filter(Boolean);
}

// Mapeo completo de valores de equipos del Excel a nuestro catálogo
const EQUIPO_NORM = [
  // "No se utiliza" variants
  [/^no\s+uso$/i,               'No se utiliza'],
  [/^no\s+se\s+utiliza$/i,      'No se utiliza'],
  // "No aplica" variants
  [/^no\s+aplica\.?$/i,         'No aplica'],
  // "Se utiliza" variants (including "Se utiliza el SA")
  [/^se\s+utiliza(\s+el\s+SA)?$/i, 'Se utiliza'],
  // "Inspección anual vigente" variants
  [/se\s+evidencia.*inspecci[oó]n\s+anual/i, 'Inspección anual vigente'],
  [/inspecci[oó]n\s+anual\s+vigente/i,       'Inspección anual vigente'],
  // "Inspección y mantenimiento" variants
  [/se\s+le\s+realiza\s+inspecci[oó]n/i,     'Inspección y mantenimiento'],
  [/inspecci[oó]n\s*[/y]\s*mtto/i,           'Inspección y mantenimiento'],
  [/^inspecci[oó]n\s*y\s*mantenimiento$/i,   'Inspección y mantenimiento'],
  [/^mtto$/i,                                 'Inspección y mantenimiento'],
  // "Hoja de vida" variants
  [/tienen\s+hoja\s+de\s+vida/i,              'Hoja de vida'],
  [/^hoja\s+de\s+vida$/i,                     'Hoja de vida'],
  // "Buen estado" variants
  [/est[aá]n\s+en\s+buen\s+estado/i,         'Buen estado'],
  [/^buen\s+estado$/i,                        'Buen estado'],
  // "Certificado" variants
  [/son\s+certificados/i,                     'Certificado'],
  [/est[aá][ns]?\s+certificado/i,             'Certificado'],
  [/^certificado$/i,                           'Certificado'],
];

function normEquipo(raw) {
  if (!raw) return [];
  const parts = normStr(raw).split(/[,;|]/).map(p => p.trim()).filter(Boolean);
  const result = new Set();
  for (const part of parts) {
    let mapped = false;
    for (const [pattern, standard] of EQUIPO_NORM) {
      if (pattern.test(part)) {
        result.add(standard);
        mapped = true;
        break;
      }
    }
    // Valores no reconocidos que son claramente no-datos: ignorar
    if (!mapped) {
      const lo = part.toLowerCase();
      if (!lo.includes('elemento') && !lo.includes('huecos') && part.length > 1) {
        result.add(part); // conservar valores desconocidos sin pérdida
      }
    }
  }
  return [...result];
}

// Normalización de "Desarrollada por" al catálogo
function normDesarrolladoPor(raw) {
  if (!raw) return [];
  const parts = normStr(raw).split(/[,;|]/).map(p => p.trim().replace(/,\s*$/, '')).filter(Boolean);
  return parts.map(p => {
    const lo = p.toLowerCase();
    if (/personal\s+de\s+la\s+empresa|personal\s+propio/i.test(lo)) return 'Personal de la Empresa';
    if (/personal\s+temporal/i.test(lo))     return 'Personal Temporal';
    if (/contratista/i.test(lo))             return 'Personal de contratista';
    return p;
  }).filter(Boolean);
}

// ── Cálculo de score (replica de calcDiagnosticoAlturaScore) ──────────────

function calcScore(data) {
  // 1. Procedimientos / Identificación de peligros (evaluadaEnIPER)
  const procedimientosGestionAlturas =
    data.evaluadaEnIPER ? (data.evaluadaEnIPER === 'Si' ? 2 : 0) : undefined;

  // 2 & 3. Permisos + Medidas de prevención
  const medidasArr = data.medidasPrevencion ?? [];
  const medidasStr = medidasArr.join(', ').toLowerCase().trim();
  const hasMedidas = medidasArr.length > 0;

  const permisosDeTrabajo = hasMedidas
    ? (medidasStr === 'permiso de trabajo' ? 2 : 0)
    : undefined;

  const gestionMedidasPrevencion = hasMedidas
    ? (medidasStr.includes('permiso de trabajo') && medidasStr !== 'permiso de trabajo' ? 2 : 0)
    : undefined;

  // 4. Gestión documental (cuentaConProcedimiento)
  const gestionDocumental =
    data.cuentaConProcedimiento ? (data.cuentaConProcedimiento === 'Si' ? 2 : 0) : undefined;

  // 5. Gestión del riesgo y control operacional (escaleras y andamios)
  const escalerasVals = [
    ...(data.escaleraFijaVertical ?? []),
    ...(data.escaleraLlana ?? []),
    ...(data.escaleraExtension ?? []),
    ...(data.escaleraPortatil ?? []),
    ...(data.escaleraTipoAvion ?? []),
    ...(data.andamioMultidireccional ?? []),
    ...(data.elevadorPersonas ?? []),
  ];
  const escStr   = escalerasVals.join('|').toLowerCase();
  const hasEsc   = escalerasVals.some(v => v && v !== 'No se utiliza' && v !== 'No aplica');

  let gestionRiesgoControlOperacional;
  if (hasEsc) {
    if (escStr.includes('inspecci') && escStr.includes('mantenimiento')) gestionRiesgoControlOperacional = 2;
    else if (escStr.includes('buen estado'))                             gestionRiesgoControlOperacional = 1;
    else                                                                 gestionRiesgoControlOperacional = 0;
  }

  // 6. Gestión de equipos y sistemas (arneses, líneas de vida)
  const arnesesVals = [
    ...(data.arnesCuerpoCompleto ?? []),
    ...(data.estingaPosicionamiento ?? []),
    ...(data.estingaConAbsorbedor ?? []),
    ...(data.anclajesFijos ?? []),
    ...(data.anclajePortatil ?? []),
    ...(data.lvhFija ?? []),
    ...(data.lvhPortatil ?? []),
    ...(data.lvvFija ?? []),
    ...(data.lvvPortatil ?? []),
    ...(data.mosquetones ?? []),
    ...(data.lvAutorretractil ?? []),
  ];
  const arnStr  = arnesesVals.join('|').toLowerCase();
  const hasArn  = arnesesVals.some(v => v && v !== 'No se utiliza');

  let gestionEquiposSistemas;
  if (hasArn) {
    if (arnStr.includes('anual vigente'))    gestionEquiposSistemas = 2;
    else if (arnStr.includes('buen estado')) gestionEquiposSistemas = 1;
    else                                     gestionEquiposSistemas = 0;
  }

  // 7. Gestión de emergencias (equipo de rescate y primeros auxilios)
  const emergVals = [
    ...(data.equipoRescate ?? []),
    ...(data.equipoPrimerosAuxilios ?? []),
  ];
  const emgStr  = emergVals.join('|').toLowerCase();
  const hasEmg  = emergVals.some(v => v && v !== 'No se utiliza' && v !== 'No aplica');

  let gestionEmergencias;
  if (hasEmg) {
    if (emgStr.includes('se utiliza'))       gestionEmergencias = 2;
    else if (emgStr.includes('buen estado')) gestionEmergencias = 1;
    else                                     gestionEmergencias = 0;
  }

  const scores = [
    procedimientosGestionAlturas, permisosDeTrabajo, gestionMedidasPrevencion,
    gestionDocumental, gestionRiesgoControlOperacional, gestionEquiposSistemas, gestionEmergencias,
  ].filter(v => v !== undefined);

  const sumaTotal = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) : undefined;

  return {
    procedimientosGestionAlturas,
    permisosDeTrabajo,
    gestionMedidasPrevencion,
    gestionDocumental,
    gestionRiesgoControlOperacional,
    gestionEquiposSistemas,
    gestionEmergencias,
    sumaTotal,
  };
}

// ── Strip undefined (Firestore no acepta undefined) ────────────────────────

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

// ── Mapear fila Excel (0-based) → DiagnosticoAltura ───────────────────────
//
// Índices de columnas INVENTARIO WA:
//  0  ID              5  Empresa          9  Proceso
//  2  Usuario         7  Planta          10  Actividad analizada
//  3  Fecha (serial)  8  Resp. SSTA      11  Detalle actividad
// 12  Altura promedio 15  Desarrollada por 16  Frecuencia
// 17  Alto riesgo adicional               18  Actividades alto riesgo
// 19  Evaluada IPER   20  Medidas prev.   21  Procedimiento
// 22-28 Escaleras y andamios
// 30+40 Arnés completo  31-39,41  Arneses y LVH/LVV
// 42  Arrestador caídas  43  Kit de rescate
// 44  EPP  45  Caídas previas  50  Cliente acepta
// 57  Marca temporal (fallback fecha)

function mapRow(row) {
  // Arnés cuerpo completo: col 30 + col 40 (mismo label, union sin duplicados)
  const arnesA = normEquipo(row[30]);
  const arnesB = normEquipo(row[40]);
  const arnesCuerpoCompleto = [...new Set([...arnesA, ...arnesB])];

  // Fecha: preferir col 3 (Fecha), fallback col 57 (Marca temporal)
  const fecha = normDate(row[3]) || normDate(row[57]) || '';

  const data = {
    // Trazabilidad
    _origenId:   normStr(row[0]),
    _origenHoja: SHEET_NAME,

    // GRUPO 1 – Datos Generales
    empresa:  normStr(row[5]),
    planta:   normStr(row[7]),
    proceso:  normStr(row[9]),
    fecha,

    // GRUPO 2 – Información de la Actividad
    actividadAnalizada:        normStr(row[10]),
    detalleActividad:          normStr(row[11]),
    alturaPromedio:            normStr(row[12]),
    desarrolladaPor:           normDesarrolladoPor(row[15]),
    frecuenciaEjecucion:       normStr(row[16]),
    tieneAltoRiesgoAdicional:  normYesNo(row[17]),
    actividadesAltoRiesgo:     normMulti(row[18]),
    evaluadaEnIPER:            normYesNo(row[19]),
    medidasPrevencion:         normMulti(row[20]),
    cuentaConProcedimiento:    normYesNo(row[21]),

    // GRUPO 3 – Escaleras y Andamios
    escaleraFijaVertical:      normEquipo(row[22]),  // tipo gato
    escaleraLlana:             normEquipo(row[23]),  // de tijera en Excel
    escaleraExtension:         normEquipo(row[24]),
    escaleraPortatil:          normEquipo(row[25]),  // un solo cuerpo
    escaleraTipoAvion:         normEquipo(row[26]),
    andamioMultidireccional:   normEquipo(row[27]),
    elevadorPersonas:          normEquipo(row[28]),  // Manlift

    // GRUPO 4 – Arneses y Sistemas de Protección
    arnesCuerpoCompleto,                             // union col 30 + 40
    estingaPosicionamiento:    normEquipo(row[31]),
    estingaConAbsorbedor:      normEquipo(row[32]),
    anclajesFijos:             normEquipo(row[33]),
    anclajePortatil:           normEquipo(row[34]),
    lvhFija:                   normEquipo(row[35]),
    lvhPortatil:               normEquipo(row[36]),
    lvvFija:                   normEquipo(row[37]),
    lvvPortatil:               normEquipo(row[38]),
    mosquetones:               normEquipo(row[39]),
    lvAutorretractil:          normEquipo(row[41]),

    // GRUPO 5 – Emergencias y EPP
    equipoRescate:             normEquipo(row[43]),  // Kit de rescate
    equipoPrimerosAuxilios:    normEquipo(row[42]),  // Arrestador de caídas
    eppUtilizados:             normMulti(row[44]),

    // GRUPO 6 – Cierre
    seHanPresentadoCargos:     normYesNo(row[45]),
    clienteAceptaInfo:         normYesNo(row[50]),
    nombreSST:                 normStr(row[8]),

    // Metadata
    createdByName: normStr(row[2]) || IMPORT_USER,
    createdById:   IMPORT_USER,
    status:        'completado',
  };

  // Limpiar arrays vacíos para no contaminar Firestore
  for (const key of Object.keys(data)) {
    if (Array.isArray(data[key]) && data[key].length === 0) delete data[key];
  }

  return data;
}

// ── Validación mínima ──────────────────────────────────────────────────────

function validate(doc, rowNum) {
  const errors = [];
  if (!doc.empresa) errors.push('empresa vacía');
  if (!doc.planta)  errors.push('planta vacía');
  if (!doc.fecha)   errors.push('fecha vacía');
  return errors;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('═'.repeat(62));
  console.log('  Migración INVENTARIO WA → Firestore (diagnosticosAlturas)');
  console.log(`  Modo: ${DRY_RUN ? '🔍 DRY-RUN (no escribe)' : '🚀 PRODUCCIÓN'}`);
  if (isFinite(LIMIT)) console.log(`  Límite: ${LIMIT} registros`);
  console.log('═'.repeat(62));

  // 1. Leer Excel ─────────────────────────────────────────────────────────
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
  const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const dataRows = rawRows.slice(1)
    .filter(r => r[0] && r[5])   // tiene ID y empresa
    .slice(0, isFinite(LIMIT) ? LIMIT : undefined);

  console.log(`[excel] ${dataRows.length} filas con datos encontradas`);

  // 2. Mapear y validar ────────────────────────────────────────────────────
  const valid   = [];
  const invalid = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row    = dataRows[i];
    const rowNum = i + 2; // 1=header, 2=primera fila de datos
    try {
      const doc    = mapRow(row);
      const errors = validate(doc, rowNum);
      if (errors.length > 0) {
        invalid.push({ rowNum, errors, empresa: doc.empresa, planta: doc.planta });
      } else {
        valid.push(doc);
      }
    } catch (err) {
      invalid.push({ rowNum, errors: [err.message], empresa: normStr(row[5]), planta: normStr(row[7]) });
    }
  }

  console.log(`\n[validación] ✅ Válidos: ${valid.length}  ❌ Con errores: ${invalid.length}`);

  if (invalid.length > 0) {
    console.log('\n[errores de validación]');
    for (const inv of invalid.slice(0, 15)) {
      console.log(`  Fila ${inv.rowNum} (${inv.empresa} / ${inv.planta}): ${inv.errors.join(', ')}`);
    }
    if (invalid.length > 15) console.log(`  ... y ${invalid.length - 15} más`);
  }

  if (valid.length === 0) {
    console.log('\n[abort] Sin registros válidos para importar.');
    process.exit(0);
  }

  // 3. Preview ─────────────────────────────────────────────────────────────
  console.log('\n[preview] Primeros 5 registros mapeados:');
  for (const doc of valid.slice(0, 5)) {
    const score = calcScore(doc);
    console.log(`  → ${doc.empresa.slice(0, 30).padEnd(30)} | ${doc.planta.slice(0, 20).padEnd(20)} | ${doc.fecha} | score=${score.sumaTotal ?? '?'}`);
    console.log(`    actividad: ${doc.actividadAnalizada?.slice(0, 60) ?? ''}`);
    if (doc.escaleraFijaVertical?.length)  console.log(`    escaleraFijaVertical: ${doc.escaleraFijaVertical.join(', ')}`);
    if (doc.arnesCuerpoCompleto?.length)   console.log(`    arnesCuerpoCompleto:  ${doc.arnesCuerpoCompleto.join(', ')}`);
    if (doc.equipoRescate?.length)         console.log(`    equipoRescate:        ${doc.equipoRescate.join(', ')}`);
  }

  // 4. Estadísticas rápidas ────────────────────────────────────────────────
  const empresas = new Set(valid.map(d => d.empresa));
  const plantas  = new Set(valid.map(d => d.planta));
  const scores   = valid.map(d => calcScore(d).sumaTotal).filter(s => s !== undefined);
  const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 'N/A';
  console.log(`\n[stats] ${empresas.size} empresas, ${plantas.size} plantas`);
  console.log(`[stats] Score promedio: ${avgScore} / 14 (${scores.length} registros con score)`);

  if (DRY_RUN) {
    console.log(`\n[dry-run] Se habrían importado ${valid.length} registros. No se escribió nada.`);
    return;
  }

  // 5. Conectar y cargar IDs existentes si --skip-existing ─────────────────
  const db  = initFirebase();
  const now = admin.firestore.Timestamp.now();

  let toImport = valid;
  if (SKIP_EXISTING) {
    console.log('\n[skip-existing] Consultando _origenId ya existentes en Firestore...');
    const snap = await db.collection(COLLECTION).select('_origenId').get();
    const existing = new Set(snap.docs.map(d => d.data()._origenId).filter(Boolean));
    toImport = valid.filter(d => !existing.has(d._origenId));
    console.log(`[skip-existing] ${existing.size} existentes → ${valid.length - toImport.length} omitidos → ${toImport.length} a importar`);
  }

  if (toImport.length === 0) {
    console.log('\n[info] Todos los registros ya existen. Nada que importar.');
    process.exit(0);
  }

  // 6. Confirmación ────────────────────────────────────────────────────────
  console.log(`\n⚠️  Se van a escribir ${toImport.length} documentos en "${COLLECTION}".`);
  console.log('   Presiona ENTER para continuar o Ctrl+C para cancelar...');
  await new Promise(resolve => {
    process.stdin.resume();
    process.stdin.once('data', () => { process.stdin.pause(); resolve(); });
  });

  // 7. Importar en lotes de hasta 400 ─────────────────────────────────────
  let imported = 0;
  let failed   = 0;
  const batchErrors = [];

  for (let start = 0; start < toImport.length; start += BATCH_SIZE) {
    const chunk = toImport.slice(start, start + BATCH_SIZE);
    const batch = db.batch();

    for (const doc of chunk) {
      const resultados = calcScore(doc);
      const ref        = db.collection(COLLECTION).doc();
      batch.set(ref, stripUndefined({
        ...doc,
        resultados,
        createdAt: now,
        updatedAt: now,
      }));
    }

    try {
      await batch.commit();
      imported += chunk.length;
      const pct = Math.round((imported / toImport.length) * 100);
      process.stdout.write(`\r[importando] ${imported}/${toImport.length} (${pct}%)...`);
    } catch (err) {
      failed += chunk.length;
      batchErrors.push(`Lote ${start}–${start + chunk.length}: ${err.message}`);
      console.error(`\n[ERROR lote] ${err.message}`);
    }
  }

  // 8. Resumen final ────────────────────────────────────────────────────────
  console.log('\n');
  console.log('═'.repeat(62));
  console.log(`  ✅  Importados:  ${imported}`);
  console.log(`  ⏭️   Omitidos:   ${valid.length - toImport.length + (SKIP_EXISTING ? 0 : 0)}`);
  console.log(`  ❌  Fallidos:    ${failed}`);
  console.log(`  ⚠️   Inválidos:  ${invalid.length}`);
  if (batchErrors.length > 0) {
    console.log('\n  Errores de lote:');
    batchErrors.forEach(e => console.log(`    ${e}`));
  }
  console.log('═'.repeat(62));
  console.log('\n[listo] Migración completada.');
}

main().catch(err => {
  console.error('\n[FATAL]', err);
  process.exit(1);
});
