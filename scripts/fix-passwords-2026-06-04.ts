/**
 * fix-passwords-2026-06-04.ts
 *
 * Corrige la contraseña de todos los usuarios creados el 2026-06-04
 * (hora Colombia, UTC-5):
 *   "Italco2026*"  →  "Italcol2026*"
 *
 * El script lista TODOS los usuarios de Firebase Auth (con paginación
 * automática para >1000 usuarios), filtra los creados hoy en hora
 * Colombia y actualiza su contraseña usando el Admin SDK.
 * No es necesario conocer la contraseña actual.
 *
 * ── CREDENCIALES (elige UNA opción) ────────────────────────────────────────
 *
 * OPCIÓN A — serviceAccountKey.json (recomendada para uso local):
 *   Guarda el archivo en scripts/serviceAccountKey.json y ejecuta:
 *   npx tsx scripts/fix-passwords-2026-06-04.ts
 *
 * OPCIÓN B — Variables de entorno (.env en la raíz del proyecto):
 *   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   npx tsx scripts/fix-passwords-2026-06-04.ts
 *
 * ── MODO DRY-RUN (solo muestra usuarios, NO cambia nada) ───────────────────
 *   PowerShell: $env:DRY_RUN="true"; npx tsx scripts/fix-passwords-2026-06-04.ts
 *   bash/zsh  : DRY_RUN=true npx tsx scripts/fix-passwords-2026-06-04.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// ── Config ────────────────────────────────────────────────────────────────────

const TARGET_DATE_LOCAL = '2026-06-04'; // Fecha en hora Colombia (UTC-5)
const COL_OFFSET_MS     = -5 * 60 * 60 * 1000; // UTC-5 en ms
const NEW_PASSWORD       = 'Italcol2026*';
const DRY_RUN            = process.env.DRY_RUN === 'true';

// Rango UTC que cubre TODO el día 2026-06-04 en Colombia (UTC-5):
//   00:00 Colombia = 05:00 UTC del mismo día
//   23:59 Colombia = 04:59 UTC del día siguiente
const RANGE_START_UTC = new Date(`${TARGET_DATE_LOCAL}T00:00:00`).getTime() - COL_OFFSET_MS;
const RANGE_END_UTC   = new Date(`${TARGET_DATE_LOCAL}T23:59:59.999`).getTime() - COL_OFFSET_MS;

// ── Firebase Init ─────────────────────────────────────────────────────────────

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function initFirebase() {
  if (getApps().length) return;

  // Opción A: serviceAccountKey.json
  const keyPath = path.resolve(__dirname, 'serviceAccountKey.json');
  if (fs.existsSync(keyPath)) {
    const sa = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    initializeApp({ credential: cert(sa) });
    console.log('🔑 Credenciales: serviceAccountKey.json\n');
    return;
  }

  // Opción B: variables de entorno
  const projectId   = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.error([
      '❌ No se encontraron credenciales. Opciones:',
      '   A) Coloca scripts/serviceAccountKey.json',
      '   B) Define FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY en .env',
    ].join('\n'));
    process.exit(1);
  }

  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  console.log('🔑 Credenciales: variables de entorno\n');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtLocal(utcMs: number): string {
  const local = new Date(utcMs + COL_OFFSET_MS);
  return local.toISOString().replace('T', ' ').slice(0, 19) + ' COL';
}

function createdOnTargetDay(creationTime: string | undefined): boolean {
  if (!creationTime) return false;
  const ms = new Date(creationTime).getTime();
  if (isNaN(ms)) return false;
  return ms >= RANGE_START_UTC && ms <= RANGE_END_UTC;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  initFirebase();
  const auth = getAuth();

  // ── Banner ──────────────────────────────────────────────────────────────────
  console.log('═'.repeat(60));
  console.log('  Corrección masiva de contraseña — SGTC Nixus');
  console.log('═'.repeat(60));
  if (DRY_RUN) {
    console.log('\n⚠️  MODO DRY-RUN — no se cambiará ninguna contraseña.\n');
  }
  console.log(`  Fecha objetivo (Colombia UTC-5) : ${TARGET_DATE_LOCAL}`);
  console.log(`  Rango UTC buscado               : ${new Date(RANGE_START_UTC).toISOString()} → ${new Date(RANGE_END_UTC).toISOString()}`);
  console.log(`  Contraseña nueva                : ${NEW_PASSWORD}`);
  console.log('');

  // ── Listar todos los usuarios de Firebase Auth (con paginación) ─────────────
  console.log('🔍 Obteniendo usuarios de Firebase Auth...');

  const targets: { uid: string; email: string; displayName: string; creationTime: string }[] = [];
  let totalScanned = 0;
  let pageToken: string | undefined;

  do {
    const result = await auth.listUsers(1000, pageToken);
    totalScanned += result.users.length;
    process.stdout.write(`   Escaneados: ${totalScanned}...\r`);

    for (const user of result.users) {
      if (createdOnTargetDay(user.metadata.creationTime)) {
        targets.push({
          uid:          user.uid,
          email:        user.email ?? '(sin email)',
          displayName:  user.displayName ?? '(sin nombre)',
          creationTime: user.metadata.creationTime ?? '',
        });
      }
    }
    pageToken = result.pageToken;
  } while (pageToken);

  console.log(`\n   Total de usuarios en Auth  : ${totalScanned}`);
  console.log(`   Creados el ${TARGET_DATE_LOCAL} (COL) : ${targets.length}\n`);

  if (targets.length === 0) {
    console.log('ℹ️  No se encontraron usuarios en ese rango de fecha.');
    return;
  }

  // ── Preview ─────────────────────────────────────────────────────────────────
  console.log('─'.repeat(60));
  console.log(`📋 Usuarios que serán afectados (${targets.length}):`);
  console.log('─'.repeat(60));
  targets.forEach((u, i) => {
    const localTime = fmtLocal(new Date(u.creationTime).getTime());
    console.log(`  ${String(i + 1).padStart(3)}. ${u.displayName.substring(0, 28).padEnd(29)} ${u.email}`);
    console.log(`       Creado: ${localTime}`);
  });
  console.log('─'.repeat(60));

  if (DRY_RUN) {
    console.log('\n✅ Dry-run completado. Verifica la lista arriba.');
    console.log('   Para aplicar los cambios, ejecuta sin DRY_RUN=true.\n');
    return;
  }

  // ── Confirmación y countdown ────────────────────────────────────────────────
  console.log(`\n⚠️  Se cambiará la contraseña de ${targets.length} usuario(s) a "${NEW_PASSWORD}".`);
  console.log('   Presiona Ctrl+C en los próximos 5 segundos para cancelar.\n');

  for (let i = 5; i >= 1; i--) {
    process.stdout.write(`   Comenzando en ${i}...\r`);
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('   Aplicando cambios...          \n');

  // ── Aplicar cambios ─────────────────────────────────────────────────────────
  let ok = 0;
  let errors = 0;

  for (const user of targets) {
    const label = `  [${String(ok + errors + 1).padStart(3)}/${targets.length}] ${user.email}`;
    process.stdout.write(`${label} ... `);
    try {
      await auth.updateUser(user.uid, { password: NEW_PASSWORD });
      process.stdout.write('✅\n');
      ok++;
    } catch (err: any) {
      process.stdout.write(`❌ ${err.message}\n`);
      errors++;
    }
  }

  // ── Resumen final ───────────────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(60));
  console.log(`  ✅ Contraseñas actualizadas : ${ok}`);
  if (errors > 0) {
    console.log(`  ❌ Errores                 : ${errors}`);
  }
  console.log('═'.repeat(60));

  if (ok > 0) {
    console.log(`\n🎉 Listo. Los ${ok} usuario(s) ya pueden ingresar con:`);
    console.log(`   Email     → el correo registrado de cada uno`);
    console.log(`   Contraseña → ${NEW_PASSWORD}\n`);
  }
  if (errors > 0) {
    console.log('⚠️  Algunos usuarios no fueron actualizados. Revisa los errores arriba.');
    console.log('   Puedes volver a ejecutar el script — los que ya cambiaron no se afectan.\n');
  }
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err.message ?? err);
  process.exit(1);
});
