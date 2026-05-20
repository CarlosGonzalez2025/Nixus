/**
 * Script de migración: cambia TODOS los permisos con status "rechazado"
 * al nuevo status "cancelado".
 *
 * Contexto: el status "rechazado" fue eliminado del flujo de negocio.
 * Cualquier permiso detenido (por rechazo o cancelación explícita) pasa a "cancelado".
 *
 * Uso:
 *   npx tsx scripts/migrate-rechazado-to-cancelado.ts
 *
 * Requisitos:
 *   - Variables de entorno en .env: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 */

import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

async function migrate() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  Migración: rechazado → cancelado');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('🔍 Consultando permisos con status "rechazado"...\n');

  const snapshot = await db.collection('permits')
    .where('status', '==', 'rechazado')
    .get();

  if (snapshot.empty) {
    console.log('✅ No existen permisos con status "rechazado". Nada que migrar.');
    return;
  }

  console.log(`📋 Se encontraron ${snapshot.size} permiso(s) con status "rechazado":\n`);

  for (const doc of snapshot.docs) {
    const d = doc.data();
    const razon = d.closure?.razonCancelacion || d.rejectionReason || 'Sin razón registrada';
    const canceladoPor = d.closure?.canceladoPor?.nombre || 'N/A';
    console.log(`   - #${d.number || 'N/A'} | ID: ${doc.id}`);
    console.log(`     Razón: ${razon}`);
    if (canceladoPor !== 'N/A') console.log(`     Cancelado por: ${canceladoPor}`);
  }

  console.log(`\n⚠️  Se van a actualizar ${snapshot.size} permiso(s) de "rechazado" a "cancelado".`);
  console.log('   Esperando 5 segundos... (Ctrl+C para abortar)\n');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Escrituras en lotes de 400 (límite de Firestore = 500 por batch)
  const BATCH_SIZE = 400;
  let totalMigrated = 0;
  const docs = snapshot.docs;

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const chunk = docs.slice(i, i + BATCH_SIZE);
    const batch = db.batch();

    for (const doc of chunk) {
      batch.update(doc.ref, {
        status: 'cancelado',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
    totalMigrated += chunk.length;
    console.log(`   ✓ Lote ${Math.ceil((i + BATCH_SIZE) / BATCH_SIZE)}: ${chunk.length} permisos actualizados (acumulado: ${totalMigrated})`);
  }

  console.log(`\n✅ Migración completada: ${totalMigrated} permiso(s) actualizados a "cancelado".`);
}

migrate().catch(err => {
  console.error('\n❌ Error en la migración:', err);
  process.exit(1);
});
