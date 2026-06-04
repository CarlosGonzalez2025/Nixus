/**
 * fix-passwords-2026-06-04.ts
 *
 * Corrige la contraseña de todos los usuarios creados el 2026-06-04:
 *   "Italco2026*"  →  "Italcol2026*"
 *
 * El script lista todos los usuarios de Firebase Auth, filtra los creados
 * hoy (2026-06-04) y actualiza su contraseña usando el Admin SDK.
 * No es necesario conocer la contraseña actual — es privilegio del Admin SDK.
 *
 * ── CREDENCIALES (elige UNA opción) ────────────────────────────────────────
 *
 * OPCIÓN A — serviceAccountKey.json (recomendada):
 *   Guarda el archivo en: scripts/serviceAccountKey.json
 *   Ejecuta: npx tsx scripts/fix-passwords-2026-06-04.ts
 *
 * OPCIÓN B — Variables de entorno (.env en la raíz):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 *   Ejecuta: npx tsx scripts/fix-passwords-2026-06-04.ts
 *
 * OPCIÓN C — Dry-run (solo muestra los usuarios afectados, no cambia nada):
 *   DRY_RUN=true npx tsx scripts/fix-passwords-2026-06-04.ts
 *
 * ── USO EN POWERSHELL ───────────────────────────────────────────────────────
 *   $env:DRY_RUN="true"; npx tsx scripts/fix-passwords-2026-06-04.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// ── Config ────────────────────────────────────────────────────────────────────

const TARGET_DATE    = '2026-06-04';           // Usuarios creados este día
const OLD_PASSWORD   = 'Italco2026*';          // Contraseña incorrecta (referencia)
const NEW_PASSWORD   = 'Italcol2026*';         // Contraseña correcta
const DRY_RUN        = process.env.DRY_RUN === 'true';

// ── Firebase Init ─────────────────────────────────────────────────────────────

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function initFirebase() {
  if (getApps().length) return;

  // Opción A: serviceAccountKey.json
  const keyPath = path.resolve(__dirname, 'serviceAccountKey.json');
  if (fs.existsSync(keyPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    initializeApp({ credential: cert(serviceAccount) });
    console.log('🔑 Credenciales: serviceAccountKey.json\n');
    return;
  }

  // Opción B: variables de entorno
  const projectId   = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      '❌ No se encontraron credenciales.\n' +
      '   Opciones:\n' +
      '   A) Coloca scripts/serviceAccountKey.json\n' +
      '   B) Define FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY en .env\n',
    );
    process.exit(1);
  }

  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  console.log('🔑 Credenciales: variables de entorno\n');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Verifica si la fecha de creación del usuario cae en TARGET_DATE (zona local). */
function createdOnTargetDate(creationTime: string | undefined): boolean {
  if (!creationTime) return false;
  const d = new Date(creationTime);
  if (isNaN(d.getTime())) return false;
  // Comparamos en UTC-5 (Colombia). Usamos getUTCFullYear etc. con offset manual.
  // Para mayor robustez comparamos la parte de fecha del ISO string en UTC-5.
  const offsetMs   = -5 * 60 * 60 * 1000;               // UTC-5
  const localMs    = d.getTime() + offsetMs;
  const localDate  = new Date(localMs).toISOString().slice(0, 10); // "YYYY-MM-DD"
  return localDate === TARGET_DATE;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  initFirebase();
  const auth = getAuth();

  if (DRY_RUN) {
    console.log('⚠️  MODO DRY-RUN activo — no se cambiará ninguna contraseña.\n');
  }

  console.log(`🔍 Buscando usuarios creados el ${TARGET_DATE}...`);
  console.log(`   Contraseña incorrecta : "${OLD_PASSWORD}"`);
  console.log(`   Contraseña correcta   : "${NEW_PASSWORD}"\n`);

  // Firebase Auth puede tener >1000 usuarios — paginamos
  const targets: { uid: string; email: string; displayName: string; creationTime: string }[] = [];
  let pageToken: string | undefined;

  do {
    const result = await auth.listUsers(1000, pageToken);
    for (const user of result.users) {
      if (createdOnTargetDate(user.metadata.creationTime)) {
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

  if (targets.length === 0) {
    console.log(`ℹ️  No se encontraron usuarios creados el ${TARGET_DATE}. No hay nada que hacer.`);
    return;
  }

  // Preview
  console.log(`📋 ${targets.length} usuario(s) creados el ${TARGET_DATE}:\n`);
  targets.forEach((u, i) => {
    console.log(`   ${String(i + 1).padStart(2, ' ')}. ${u.displayName.padEnd(30)} ${u.email}`);
    console.log(`       Creado: ${u.creationTime}`);
  });

  if (DRY_RUN) {
    console.log('\n✅ Dry-run completado. Para aplicar los cambios ejecuta sin DRY_RUN=true.\n');
    return;
  }

  console.log('\n⏳ Aplicando cambios en 5 segundos... (Ctrl+C para cancelar)\n');
  await new Promise(r => setTimeout(r, 5000));

  // Actualizar contraseñas
  let ok = 0, errors = 0;

  for (const user of targets) {
    process.stdout.write(`  ${user.email} ... `);
    try {
      await auth.updateUser(user.uid, { password: NEW_PASSWORD });
      process.stdout.write('✅ actualizada\n');
      ok++;
    } catch (err: any) {
      process.stdout.write(`❌ error: ${err.message}\n`);
      errors++;
    }
  }

  console.log('\n──────────────────────────────────────────────────');
  console.log(`✅ Contraseñas actualizadas : ${ok}`);
  if (errors > 0) {
    console.log(`❌ Errores                 : ${errors}`);
  }
  console.log('──────────────────────────────────────────────────');

  if (ok > 0) {
    console.log(`\n🎉 Los ${ok} usuario(s) ya pueden iniciar sesión con:`);
    console.log(`   Contraseña → ${NEW_PASSWORD}\n`);
  }
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err.message ?? err);
  process.exit(1);
});
