/**
 * DIAGNÓSTICO (solo lectura): compara el conjunto de permisos que ve un
 * AUTORIZANTE en el Dashboard vs el módulo de Permisos, y valida contra la BD
 * cuántos permisos y en qué estado hay para su empresa/planta/ciudad.
 *
 * No escribe nada. Uso:
 *   npx tsx scripts/diag-permisos-herzon.ts
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

const TARGET_EMAIL = 'herzonvillamizar@italcol.com';

const norm = (s: any) => (s ?? '').toString().trim().toLowerCase();

async function main() {
  // ── 1. Usuario ────────────────────────────────────────────────────────────
  const usersSnap = await db.collection('users').where('email', '==', TARGET_EMAIL).get();
  if (usersSnap.empty) { console.log('❌ Usuario no encontrado:', TARGET_EMAIL); return; }
  const user: any = { uid: usersSnap.docs[0].id, ...usersSnap.docs[0].data() };

  console.log('═══════════════════════════════════════════════════════════');
  console.log('  USUARIO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  uid       :', user.uid);
  console.log('  role      :', user.role);
  console.log('  otherRoles:', user.otherRoles ?? '—');
  console.log('  empresa   :', JSON.stringify(user.empresa));
  console.log('  planta    :', JSON.stringify(user.planta));
  console.log('  ciudad    :', JSON.stringify(user.ciudad));
  console.log('');

  // ── 2. Todos los permisos ──────────────────────────────────────────────────
  const allSnap = await db.collection('permits').get();
  const permits = allSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
  console.log(`Total permisos en la colección: ${permits.length}`);
  const sinCreatedAt = permits.filter(p => !p.createdAt).length;
  console.log(`Permisos SIN campo createdAt (los excluye orderBy): ${sinCreatedAt}`);
  console.log('');

  // ── 3. Valores distintos de empresa / planta / ciudad ──────────────────────
  const empresas = new Map<string, number>();
  const plantas = new Map<string, number>();
  permits.forEach(p => {
    const e = p.generalInfo?.empresa ?? '«vacío»';
    const pl = p.generalInfo?.planta ?? '«vacío»';
    empresas.set(e, (empresas.get(e) || 0) + 1);
    plantas.set(pl, (plantas.get(pl) || 0) + 1);
  });
  console.log('── generalInfo.empresa distintas ──');
  [...empresas.entries()].sort((a, b) => b[1] - a[1]).forEach(([e, n]) => {
    const match = norm(e) === norm(user.empresa) ? '  ✅ == user.empresa' : '';
    console.log(`  ${n.toString().padStart(4)}  ${JSON.stringify(e)}${match}`);
  });
  console.log('── generalInfo.planta distintas ──');
  [...plantas.entries()].sort((a, b) => b[1] - a[1]).forEach(([pl, n]) => {
    const match = norm(pl) === norm(user.planta) ? '  ✅ == user.planta' : '';
    console.log(`  ${n.toString().padStart(4)}  ${JSON.stringify(pl)}${match}`);
  });
  console.log('');

  // ── 4. Filtro del AUTORIZANTE (idéntico en dashboard y permits) ─────────────
  const scoped = permits.filter(p => {
    if (p.status === 'borrador') return p.createdBy === user.uid;
    const matchEmpresa = !user.empresa || !p.generalInfo?.empresa || norm(p.generalInfo.empresa) === norm(user.empresa);
    const matchPlanta = !user.planta || !p.generalInfo?.planta || norm(p.generalInfo.planta) === norm(user.planta);
    return matchEmpresa && matchPlanta;
  });

  const byStatus = new Map<string, number>();
  scoped.forEach(p => byStatus.set(p.status, (byStatus.get(p.status) || 0) + 1));

  console.log('═══════════════════════════════════════════════════════════');
  console.log('  PERMISOS EN EL ALCANCE DEL AUTORIZANTE (empresa+planta)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  Alcance total: ${scoped.length}`);
  console.log('  Desglose por status crudo:');
  [...byStatus.entries()].sort((a, b) => b[1] - a[1]).forEach(([s, n]) => console.log(`    ${s.padEnd(20)} ${n}`));
  console.log('');

  // ── 5. Categorías unificadas (= pestañas y tarjetas) ───────────────────────
  const isActivo = (s: string) => ['aprobado', 'en_ejecucion', 'suspendido'].includes(s);
  const isCancel = (s: string) => ['cancelado', 'rechazado'].includes(s);
  const cat = {
    borrador: scoped.filter(p => p.status === 'borrador').length,
    pendiente: scoped.filter(p => p.status === 'pendiente_revision').length,
    activos: scoped.filter(p => isActivo(p.status)).length,
    cerrado: scoped.filter(p => p.status === 'cerrado').length,
    cancelado: scoped.filter(p => isCancel(p.status)).length,
  };
  console.log('── Categorías unificadas (deben coincidir dashboard == módulo) ──');
  console.log(`  Borrador (propios) : ${cat.borrador}`);
  console.log(`  Pendiente          : ${cat.pendiente}`);
  console.log(`  Activos            : ${cat.activos}`);
  console.log(`  Cerrado            : ${cat.cerrado}`);
  console.log(`  Cancelado          : ${cat.cancelado}`);
  console.log(`  ─────────────────────────`);
  console.log(`  Suma pestañas      : ${cat.borrador + cat.pendiente + cat.activos + cat.cerrado + cat.cancelado}`);
  console.log('');

  // ── 6. ¿Cuántos quedan FUERA del alcance y por qué? ────────────────────────
  const fueraPlanta = permits.filter(p =>
    p.status !== 'borrador' &&
    norm(p.generalInfo?.planta) === norm(user.planta) &&
    !!p.generalInfo?.empresa && norm(p.generalInfo.empresa) !== norm(user.empresa),
  );
  console.log('── Permisos en LOS PATIOS pero de OTRA empresa (excluidos por el filtro de empresa) ──');
  console.log(`  Cantidad: ${fueraPlanta.length}`);
  const otras = new Map<string, number>();
  fueraPlanta.forEach(p => otras.set(p.generalInfo.empresa, (otras.get(p.generalInfo.empresa) || 0) + 1));
  [...otras.entries()].sort((a, b) => b[1] - a[1]).forEach(([e, n]) => console.log(`    ${n.toString().padStart(4)}  ${JSON.stringify(e)}`));
  console.log('');

  // ── 7. SIMULACIÓN: query EXACTA del módulo de Permisos (limit 200 ANTES del filtro) ──
  const ts = (p: any) => {
    const c = p.createdAt;
    if (!c) return 0;
    if (typeof c.toDate === 'function') return c.toDate().getTime();
    if (c._seconds) return c._seconds * 1000;
    return new Date(c).getTime() || 0;
  };
  const top200 = [...permits].sort((a, b) => ts(b) - ts(a)).slice(0, 200);
  const modulo = top200.filter(p => {
    if (p.status === 'borrador') return p.createdBy === user.uid;
    const matchEmpresa = !user.empresa || !p.generalInfo?.empresa || norm(p.generalInfo.empresa) === norm(user.empresa);
    const matchPlanta = !user.planta || !p.generalInfo?.planta || norm(p.generalInfo.planta) === norm(user.planta);
    return matchEmpresa && matchPlanta;
  });
  const mActivos = modulo.filter(p => isActivo(p.status)).length;
  const mCerrado = modulo.filter(p => p.status === 'cerrado').length;
  const mCancel = modulo.filter(p => isCancel(p.status)).length;
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  SIMULACIÓN MÓDULO DE PERMISOS (orderBy createdAt desc + limit 200 → luego filtra)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  De los 34 de Herzon, cuántos caen en los 200 globales más recientes: ${modulo.length}`);
  console.log(`    Activos : ${mActivos}   (real: ${cat.activos})`);
  console.log(`    Cerrado : ${mCerrado}   (real: ${cat.cerrado})`);
  console.log(`    Cancelado: ${mCancel}  (real: ${cat.cancelado})`);
  console.log('');
  console.log(`  ➜ El módulo MUESTRA ${modulo.length} pero DEBERÍA mostrar ${scoped.length}. El limit(200) recorta ${scoped.length - modulo.length}.`);
}

main().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
