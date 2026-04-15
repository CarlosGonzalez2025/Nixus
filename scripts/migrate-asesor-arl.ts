/**
 * Script de migración: cambia el rol de usuarios admin de "Nixus Capital"
 * al nuevo rol asesor_arl.
 *
 * IMPORTANTE: Ejecutar SOLO después de que el código con el nuevo rol
 * esté deployado en producción.
 *
 * Uso:
 *   npx tsx scripts/migrate-asesor-arl.ts
 *
 * Requisitos:
 *   - Variables de entorno de Firebase Admin configuradas o serviceAccountKey.json en el root
 *   - npx tsx instalado (npm install -D tsx)
 */

import * as admin from 'firebase-admin';

// Inicializa Firebase Admin (usa Application Default Credentials o ajusta la ruta)
if (!admin.apps.length) {
  admin.initializeApp({
    // Opción 1: Credenciales de servicio — descomenta y ajusta la ruta
    // credential: admin.credential.cert(require('../serviceAccountKey.json')),

    // Opción 2: Application Default Credentials (si ya hiciste `firebase login:ci`)
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

async function migrateToAsesorArl() {
  console.log('🔍 Buscando usuarios admin con empresa "Nixus Capital"...\n');

  const snapshot = await db.collection('users')
    .where('role', '==', 'admin')
    .where('empresa', '==', 'Nixus Capital')
    .get();

  if (snapshot.empty) {
    console.log('✅ No se encontraron usuarios que cumplan el criterio.');
    return;
  }

  console.log(`📋 Encontrados ${snapshot.size} usuario(s) candidatos:\n`);

  const batch = db.batch();
  let migrated = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();

    // Verificar que el usuario tiene hallazgos creados por él
    const hallazgosSnap = await db.collection('hallazgos')
      .where('createdBy', '==', docSnap.id)
      .limit(1)
      .get();

    const tieneHallazgos = !hallazgosSnap.empty;

    console.log(`  👤 ${data.email} (uid: ${docSnap.id})`);
    console.log(`     Hallazgos propios: ${tieneHallazgos ? '✓ Sí' : '✗ No'}`);

    // NOTA: Solo cambiamos el rol a asesor_arl (sin otherRoles: ['admin'])
    // para que pierdan el acceso admin completo.
    // Si quieres mantener acceso admin temporal, agrega:
    //   otherRoles: admin.firestore.FieldValue.arrayUnion('admin')
    batch.update(docSnap.ref, {
      role: 'asesor_arl',
      // Limpiar otherRoles previos relacionados con admin si existían
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`     → Rol cambiado a: asesor_arl\n`);
    migrated++;
  }

  if (migrated === 0) {
    console.log('✅ Ningún usuario requiere migración.');
    return;
  }

  // Confirmar antes de ejecutar
  console.log(`\n⚠️  Se van a migrar ${migrated} usuario(s). ¿Continuar? (Ctrl+C para cancelar)`);
  console.log('   Esperando 5 segundos...\n');
  await new Promise(resolve => setTimeout(resolve, 5000));

  await batch.commit();
  console.log(`\n✅ Migración completada: ${migrated} usuario(s) actualizados a "asesor_arl".`);
  console.log('\n📌 NOTA: Los hallazgos existentes siguen siendo visibles porque el filtro es por "createdBy", no por rol.');
}

migrateToAsesorArl().catch(err => {
  console.error('❌ Error en la migración:', err);
  process.exit(1);
});
