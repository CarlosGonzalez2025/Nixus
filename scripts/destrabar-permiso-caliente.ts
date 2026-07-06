/**
 * Destraba UN permiso de Trabajo en Caliente que quedó bloqueado porque el Ejecutante
 * firmó su cierre (closure.responsable) SIN diligenciar el checklist: el checklist es
 * requisito para cerrar, pero queda congelado tras esa firma → deadlock.
 *
 * Estrategia (por indicación): MANTENER la firma del Responsable y DILIGENCIAR el checklist
 * con los valores que aprueban el cierre (los que NO bloquean según HOT_WORK_CLOSURE_RULES).
 * No toca las firmas. Solo escribe los 6 campos del checklist dentro de `closure`.
 *
 * ⚠️ Estos valores se fijan administrativamente para destrabar; deben corresponder a lo
 * verificado realmente en campo al momento del cierre.
 *
 * Solo modifica el permiso indicado en TARGET_NUMBER. Uso:
 *   npx tsx scripts/destrabar-permiso-caliente.ts
 */

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const TARGET_NUMBER = 'PT-1783353111365-NK1U0K';

// Valores que APRUEBAN el cierre (inverso del blockValue de cada regla de HOT_WORK_CLOSURE_RULES):
//   informeCulminacion   bloquea si 'no'  → 'si'
//   areaDespejada        bloquea si 'no'  → 'si'
//   evidenciaParticulas  bloquea si 'si'  → 'no'
//   continuaLabor        bloquea si 'no'  → 'si'
//   dispositivosRetirados bloquea si 'no' → 'si'
//   verificoEstadoArea   bloquea si 'no'  → 'si'
const CHECKLIST_APROBADO: Record<string, 'si' | 'no'> = {
  informeCulminacion: 'si',
  areaDespejada: 'si',
  evidenciaParticulas: 'no',
  continuaLabor: 'si',
  dispositivosRetirados: 'si',
  verificoEstadoArea: 'si',
};

const keyPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  DESTRABAR PERMISO — diligenciar checklist (manteniendo firma)');
  console.log(`  Objetivo: ${TARGET_NUMBER}`);
  console.log('═══════════════════════════════════════════════════════════\n');

  const snap = await db.collection('permits').where('number', '==', TARGET_NUMBER).get();
  if (snap.empty) {
    console.log(`❌ No se encontró ningún permiso con number == "${TARGET_NUMBER}".`);
    return;
  }
  if (snap.size > 1) {
    console.log(`⚠️  Se encontraron ${snap.size} permisos con ese number. Abortando por seguridad.`);
    return;
  }

  const doc = snap.docs[0];
  const p: any = doc.data();
  const closure = p.closure || {};

  console.log('Estado actual del permiso:');
  console.log('  id              :', doc.id);
  console.log('  status          :', p.status);
  console.log('  caliente        :', !!p.selectedWorkTypes?.caliente);
  console.log('  Ejecutante firmó:', closure.responsable?.firma ? `SÍ (${closure.responsable?.nombre || 's/n'}) — SE MANTIENE` : 'no');
  console.log('  Autoridad firmó :', closure.autoridad?.firma ? `SÍ (${closure.autoridad?.nombre || 's/n'})` : 'no');
  console.log('  Checklist antes → después:');
  Object.keys(CHECKLIST_APROBADO).forEach(f =>
    console.log(`    ${f.padEnd(22)} ${String(closure[f] ?? '«sin responder»').padEnd(16)} → ${CHECKLIST_APROBADO[f]}`),
  );
  console.log('');

  if (!['en_ejecucion', 'suspendido'].includes(p.status)) {
    console.log(`❌ El permiso está en estado "${p.status}". Solo se destraban permisos EN EJECUCIÓN o SUSPENDIDOS. Abortando.`);
    return;
  }
  if (!p.selectedWorkTypes?.caliente) {
    console.log('❌ El permiso no es de Trabajo en Caliente; no aplica este checklist. Abortando.');
    return;
  }

  console.log('⚠️  Se DILIGENCIARÁ el checklist con los valores que aprueban el cierre (arriba).');
  console.log('    Las firmas NO se tocan. Esperando 5 segundos... (Ctrl+C para abortar)\n');
  await new Promise(r => setTimeout(r, 5000));

  // Dot-notation: mezcla los 6 campos en `closure` sin tocar responsable/autoridad ni otros campos.
  const update: Record<string, any> = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
  for (const [field, value] of Object.entries(CHECKLIST_APROBADO)) {
    update[`closure.${field}`] = value;
  }
  await doc.ref.update(update);

  console.log('✅ Listo. Checklist diligenciado y firma del Responsable conservada.');
  console.log('   El permiso ya no debería estar bloqueado por el checklist. Falta que la');
  console.log('   Autoridad del Área (Autorizante) firme el cierre (②) para cerrarlo.');
}

main().then(() => process.exit(0)).catch(err => { console.error('\n❌ Error:', err); process.exit(1); });
