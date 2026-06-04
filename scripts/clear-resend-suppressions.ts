/**
 * Elimina de la lista de supresiones de Resend todos los correos
 * de usuarios registrados en Firestore.
 *
 * Uso:
 *   npx tsx scripts/clear-resend-suppressions.ts
 *
 * Requiere en .env:
 *   RESEND_API_KEY
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PROJECT_ID     = process.env.FIREBASE_PROJECT_ID;
const CLIENT_EMAIL   = process.env.FIREBASE_CLIENT_EMAIL;
const PRIVATE_KEY    = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!RESEND_API_KEY || !PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error('❌ Faltan variables de entorno. Verifica RESEND_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY en .env');
  process.exit(1);
}

// ── Firebase ─────────────────────────────────────────────────────────────────
if (!getApps().length) {
  initializeApp({ credential: cert({ projectId: PROJECT_ID, clientEmail: CLIENT_EMAIL, privateKey: PRIVATE_KEY }) });
}
const db = getFirestore();

// ── Resend ────────────────────────────────────────────────────────────────────
const resendHeaders = {
  Authorization: `Bearer ${RESEND_API_KEY}`,
  'Content-Type': 'application/json',
};

async function removeFromSuppression(email: string): Promise<'deleted' | 'not_found' | 'error'> {
  try {
    const res = await fetch(
      `https://api.resend.com/suppressions/${encodeURIComponent(email)}`,
      { method: 'DELETE', headers: resendHeaders }
    );
    if (res.ok)              return 'deleted';
    if (res.status === 404)  return 'not_found';
    const body = await res.text();
    console.warn(`  ⚠️  ${email} → HTTP ${res.status}: ${body}`);
    return 'error';
  } catch (err) {
    console.warn(`  ⚠️  ${email} → error de red:`, err);
    return 'error';
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Obteniendo usuarios desde Firestore...');
  const snap = await db.collection('users').get();

  const emails = snap.docs
    .map(d => (d.data().email as string | undefined)?.trim().toLowerCase())
    .filter((e): e is string => !!e && e.includes('@'));

  const unique = [...new Set(emails)];

  if (unique.length === 0) {
    console.log('⚠️  No se encontraron correos en la colección users.');
    return;
  }

  console.log(`\n📋 ${unique.length} correo(s) de usuarios encontrados:`);
  unique.forEach(e => console.log(`   • ${e}`));

  console.log('\n⏳ Eliminando supresiones en 5 segundos... (Ctrl+C para cancelar)\n');
  await new Promise(r => setTimeout(r, 5000));

  let deleted   = 0;
  let notFound  = 0;
  let errors    = 0;

  for (const email of unique) {
    process.stdout.write(`  ${email} ... `);
    const result = await removeFromSuppression(email);
    if (result === 'deleted')   { process.stdout.write('✅ eliminado\n');       deleted++;  }
    if (result === 'not_found') { process.stdout.write('— no estaba suprimido\n'); notFound++; }
    if (result === 'error')     { process.stdout.write('❌ error\n');            errors++;   }
    await new Promise(r => setTimeout(r, 120)); // respeta rate limit de Resend
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`✅ Eliminados de supresiones : ${deleted}`);
  console.log(`—  Ya no estaban suprimidos  : ${notFound}`);
  console.log(`❌ Errores                   : ${errors}`);
  console.log('─────────────────────────────────────────');
  if (deleted > 0) {
    console.log('\n🎉 Los usuarios eliminados recibirán correos en el próximo envío.');
  }
}

main().catch(err => {
  console.error('❌ Error inesperado:', err);
  process.exit(1);
});
