/**
 * RESTAURACIÓN de los permisos que savePermitDraft devolvió a 'borrador'.
 *
 * Usa Point-in-Time Recovery de Firestore (habilitado, retención 7 días) para leer
 * el documento tal como estaba justo ANTES del retroceso y reescribirlo completo.
 *
 * Modo seguro por defecto (dry-run): imprime el diff y NO escribe nada.
 *   npx tsx scripts/restaurar-permisos-revertidos.ts
 * Para aplicar de verdad:
 *   npx tsx scripts/restaurar-permisos-revertidos.ts --apply
 *
 * Antes de escribir guarda una copia del documento actual en
 * scripts/backups/<id>-<timestamp>.json por si hubiera que deshacer.
 */

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const keyPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

const APPLY = process.argv.includes('--apply');

/**
 * readTime = último instante verificado con el permiso íntegro.
 * PITR exige minuto exacto para lecturas de más de 1 hora de antigüedad.
 */
const CASES = [
  { id: 'N1oOwF6dv616Nl5EPiZs', readTime: '2026-08-27T13:45:00Z', nota: 'retroceso entre 13:45 y 14:00 UTC; 2ª sobreescritura 20:50' },
  { id: 'sZQaMB3PigXvQCu3L9jE', readTime: '2026-08-27T18:30:00Z', nota: 'retroceso 18:41 UTC' },
];

const resumen = (p: any) => ({
  status: p.status,
  number: p.number,
  aprobados: Object.entries<any>(p.approvals ?? {})
    .filter(([, v]) => v?.status === 'aprobado')
    .map(([k]) => k),
  firmas: Object.entries<any>(p.approvals ?? {})
    .filter(([, v]) => v?.firmaApertura)
    .map(([k]) => k),
  validacionAltura: (p.anexoAltura?.validacion?.responsable ?? [])
    .filter((v: any) => v?.firma).map((v: any) => `dia${v.dia}:${v.nombre}`),
  validacionConfinadoResp: (p.anexoConfinado?.validacion?.responsable ?? [])
    .filter((v: any) => v?.firma).map((v: any) => `dia${v.dia}:${v.nombre}`),
  validacionConfinadoAut: (p.anexoConfinado?.validacion?.autoridad ?? [])
    .filter((v: any) => v?.firma).map((v: any) => `dia${v.dia}:${v.nombre}`),
});

async function main() {
  console.log(APPLY ? '⚠️  MODO APPLY — SE ESCRIBIRÁ EN PRODUCCIÓN\n' : '🔍 DRY-RUN — no se escribe nada. Use --apply para ejecutar.\n');

  const backupDir = path.join(__dirname, 'backups');
  if (APPLY && !fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  for (const c of CASES) {
    const docRef = db.collection('permits').doc(c.id);
    const readTime = admin.firestore.Timestamp.fromDate(new Date(c.readTime));

    const historico = await db.runTransaction(
      async (tx) => tx.get(docRef),
      { readOnly: true, readTime } as any
    );
    if (!historico.exists) {
      console.log(`❌ ${c.id}: no existía en ${c.readTime}`);
      continue;
    }

    const actualSnap = await docRef.get();
    const antes = actualSnap.data() as any;
    const bueno = historico.data() as any;

    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  ${c.id}   (${c.nota})`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  AHORA        :', JSON.stringify(resumen(antes)));
    console.log(`  PITR ${c.readTime}:`, JSON.stringify(resumen(bueno)));

    if (bueno.status === 'borrador') {
      console.log('  ⚠️  El snapshot elegido YA está en borrador. Ajuste readTime antes de aplicar. Se omite.');
      console.log('');
      continue;
    }

    if (APPLY) {
      const backupPath = path.join(backupDir, `${c.id}-${Date.now()}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(antes, null, 2), 'utf8');
      // set() completo: revierte también los campos del formulario que el
      // asistente sobrescribió con su copia obsoleta, no solo status/approvals.
      await docRef.set(bueno);
      console.log(`  ✅ Restaurado. Copia del estado previo en ${path.relative(process.cwd(), backupPath)}`);
    } else {
      console.log('  → Se restauraría el documento COMPLETO a ese snapshot.');
    }
    console.log('');
  }

  console.log('Nota: PT-1776714432270-O1P6JM (20-abr-2026) queda fuera de la ventana');
  console.log('de PITR (earliestVersionTime = 2026-08-20) y no es recuperable por esta vía.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
