/**
 * DIAGNÓSTICO (SOLO LECTURA): permisos que retrocedieron a 'borrador'
 * después de haber avanzado en el flujo.
 *
 * Detector: un borrador legítimo NUNCA tiene `number` (el número lo asigna
 * createPermit/addSignatureAndNotify al pasar a pendiente_revision).
 * savePermitDraft() escribe status:'borrador' + approvals reseteados pero NO
 * toca `number`, así que un doc con status='borrador' Y number != null es,
 * necesariamente, un permiso revertido.
 *
 * No escribe nada.
 *   npx tsx scripts/diag-permisos-revertidos.ts
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

const FOCO = ['sZQaMB3P', 'N1oOwF6d'];

const d = (v: any): Date | null => {
  if (!v) return null;
  if (v instanceof Date) return v;
  try {
    if (typeof v.toDate === 'function') return v.toDate();
    if (v._seconds) return new Date(v._seconds * 1000);
  } catch { /* noop */ }
  return null;
};
const ts = (v: any): string => {
  const x = d(v);
  return x ? x.toISOString().replace('T', ' ').slice(0, 19) + 'Z' : '—';
};

async function timeline(permitId: string) {
  const snap = await db.collection('notifications').where('permitId', '==', permitId).get();
  const rows = snap.docs
    .map(x => x.data() as any)
    .map(n => ({ at: d(n.createdAt), type: n.type, msg: n.message, by: n.triggeredBy?.displayName ?? '—' }))
    .filter(n => n.at)
    .sort((a, b) => a.at!.getTime() - b.at!.getTime());

  // Colapsa el fan-out (una notificación por destinatario) en un solo evento
  const out: { at: Date; type: string; msg: string; by: string; n: number }[] = [];
  for (const r of rows) {
    const last = out[out.length - 1];
    if (last && last.type === r.type && last.msg === r.msg && last.by === r.by) {
      last.n++;
      continue;
    }
    out.push({ at: r.at!, type: r.type, msg: r.msg, by: r.by, n: 1 });
  }
  return out;
}

async function main() {
  const snap = await db.collection('permits').get();
  console.log(`Total permisos: ${snap.size}\n`);

  const borradores = snap.docs.filter(x => (x.data() as any).status === 'borrador');
  const revertidos = borradores.filter(x => !!(x.data() as any).number);

  console.log('═══════════════════════════════════════════════════════════');
  console.log('  ALCANCE');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  Permisos en 'borrador'                     : ${borradores.length}`);
  console.log(`  De esos, CON número asignado (= revertidos): ${revertidos.length}`);
  console.log('');

  for (const doc of revertidos.sort((a, b) => (d((b.data() as any).updatedAt)?.getTime() ?? 0) - (d((a.data() as any).updatedAt)?.getTime() ?? 0))) {
    const p: any = doc.data();
    const foco = FOCO.some(f => doc.id.startsWith(f));
    console.log('───────────────────────────────────────────────────────────');
    console.log(`  ${doc.id}  ${foco ? '  ★ CASO REPORTADO' : ''}`);
    console.log(`  number     : ${p.number}`);
    console.log(`  solicitante: ${p.user?.displayName ?? '—'} <${p.user?.email ?? '—'}>  uid=${p.createdBy}`);
    console.log(`  planta     : ${p.generalInfo?.planta ?? '—'} / ${p.generalInfo?.empresa ?? '—'}`);
    console.log(`  createdAt  : ${ts(p.createdAt)}`);
    console.log(`  updatedAt  : ${ts(p.updatedAt)}   <- momento del retroceso`);
    const ap = Object.entries<any>(p.approvals ?? {})
      .map(([k, v]) => `${k}=${v?.status ?? '?'}`)
      .join(' ');
    console.log(`  approvals  : ${ap}`);
    const ws = p.workers ?? [];
    console.log(`  workers    : ${ws.length} (firmaApertura: ${ws.filter((w: any) => w?.firmaApertura).length})`);

    const tl = await timeline(doc.id);
    console.log(`  ── timeline (${tl.length} eventos únicos) ──`);
    for (const e of tl) {
      const msg = e.msg.length > 110 ? e.msg.slice(0, 110) + '…' : e.msg;
      console.log(`    ${ts(e.at)}  [${e.type.padEnd(13)}] x${String(e.n).padStart(3)}  ${e.by.padEnd(18)} :: ${msg}`);
    }
    const ultimo = tl[tl.length - 1];
    const upd = d(p.updatedAt);
    if (ultimo && upd) {
      const horas = ((upd.getTime() - ultimo.at.getTime()) / 3600000).toFixed(1);
      console.log(`  ⚠  El retroceso ocurrió ${horas} h DESPUÉS del último evento del flujo,`);
      console.log(`     y NO generó ninguna notificación (savePermitDraft no notifica).`);
    }
    console.log('');
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
