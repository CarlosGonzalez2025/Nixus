/**
 * VERIFICACIÓN (SOLO LECTURA) de los permisos restaurados.
 *
 * Reproduce checkAllRequiredSignaturesComplete() del servidor para confirmar que
 * 'en_ejecucion' es un estado legítimo para cada permiso y no un valor forzado:
 * si el permiso no reúne todas las firmas que su combinación de tipos de trabajo
 * exige, la restauración habría dejado un permiso activo sin respaldo.
 *
 *   npx tsx scripts/verificar-permisos-restaurados.ts
 */

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const sa = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const IDS = ['N1oOwF6dv616Nl5EPiZs', 'sZQaMB3PigXvQCu3L9jE'];

/** Espejo de requiresMaintenanceSignature() en actions.ts */
const requiereMantenimiento = (p: any) =>
  p.controlEnergia === true || p.selectedWorkTypes?.energia === true;

/** Espejo de checkAllRequiredSignaturesComplete() en actions.ts */
function firmasRequeridas(p: any): { rol: string; exigida: boolean; ok: boolean }[] {
  const a = p.approvals ?? {};
  const ap = (r: string) => a[r]?.status === 'aprobado';
  return [
    { rol: 'solicitante', exigida: true, ok: ap('solicitante') },
    { rol: 'autorizante', exigida: true, ok: ap('autorizante') },
    { rol: 'coordinador_alturas', exigida: !!(p.trabajoAlturas || p.selectedWorkTypes?.alturas), ok: ap('coordinador_alturas') },
    { rol: 'supervisor_confinado', exigida: !!(p.espaciosConfinados || p.selectedWorkTypes?.confinado), ok: ap('supervisor_confinado') },
    { rol: 'mantenimiento', exigida: requiereMantenimiento(p), ok: ap('mantenimiento') },
    { rol: 'lider_sst', exigida: !!p.isSSTSignatureRequired, ok: ap('lider_sst') },
  ];
}

(async () => {
  let todoOk = true;

  for (const id of IDS) {
    const snap = await db.collection('permits').doc(id).get();
    const p: any = snap.data();

    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  ${p.number}   (${id})`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  status        : ${p.status}`);
    console.log(`  área / planta : ${p.generalInfo?.area ?? '—'} / ${p.generalInfo?.planta ?? '—'}`);
    console.log(`  tipos trabajo : ${Object.entries<any>(p.selectedWorkTypes ?? {}).filter(([, v]) => v).map(([k]) => k).join(', ') || '—'}`);

    const req = firmasRequeridas(p);
    console.log('  firmas:');
    for (const r of req) {
      const marca = !r.exigida ? '·  no aplica' : r.ok ? '✅ firmada  ' : '❌ FALTA    ';
      console.log(`    ${marca} ${r.rol}`);
    }

    const faltantes = req.filter(r => r.exigida && !r.ok);
    const coherente = p.status === 'en_ejecucion' ? faltantes.length === 0 : true;

    // Integridad de los datos que el retroceso había borrado
    const val = (arr: any[] = []) => arr.filter(v => v?.firma).map(v => `día${v.dia}:${v.nombre}`).join(', ') || '—';
    console.log(`  validación diaria altura   : ${val(p.anexoAltura?.validacion?.responsable)}`);
    console.log(`  validación diaria confinado: resp=[${val(p.anexoConfinado?.validacion?.responsable)}] aut=[${val(p.anexoConfinado?.validacion?.autoridad)}]`);
    console.log(`  trabajadores con firma     : ${(p.workers ?? []).filter((w: any) => w?.firmaApertura).length}/${(p.workers ?? []).length}`);
    console.log(`  ${coherente ? '✅ COHERENTE: el estado se sostiene con las firmas presentes.' : '❌ INCOHERENTE: activo sin las firmas requeridas.'}`);
    console.log('');

    if (!coherente) todoOk = false;
  }

  console.log(todoOk
    ? '✅ Ambos permisos quedaron íntegros y en un estado legítimo.'
    : '❌ Revisar: algún permiso quedó en un estado que su propia regla de negocio no admite.');
  process.exit(todoOk ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
