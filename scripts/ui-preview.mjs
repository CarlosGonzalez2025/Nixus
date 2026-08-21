/**
 * Captura de pantallas de la app para validar cambios de UI sin depender de que
 * alguien las revise a mano.
 *
 * Nace de la sesión 20: se hicieron cambios de responsive y de gráficos que
 * `tsc` y `next build` no pueden verificar — compilan perfecto y aun así la
 * pantalla puede salir rota.
 *
 * USO
 *   1. Levantar el servidor:  npm run dev        (queda en http://localhost:9003)
 *   2. Crear `.env.preview` en la raíz (ya está en .gitignore) con una cuenta de PRUEBA:
 *        PREVIEW_EMAIL=usuario@italcol.com
 *        PREVIEW_PASSWORD=...
 *      También sirven las variables de entorno del mismo nombre.
 *   3. node scripts/ui-preview.mjs
 *
 * Las capturas quedan en `.ui-preview/` (ignorado por git).
 *
 * OJO: el servidor de desarrollo apunta al proyecto Firebase REAL. Este script
 * solo navega y lee; no crea, edita ni borra nada. Aun así, use una cuenta de
 * prueba y no la de un usuario real si puede evitarlo.
 *
 * Sin credenciales el script no falla: captura únicamente las rutas públicas,
 * que ya sirven para revisar el layout y el responsive del shell.
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// `.env.preview` está en .gitignore. Permite guardar las credenciales de prueba en
// disco en vez de pasarlas por la línea de comandos, donde quedarían en el historial.
const ENV_PREVIEW = path.resolve('.env.preview');
if (existsSync(ENV_PREVIEW)) dotenv.config({ path: ENV_PREVIEW });

const BASE = process.env.PREVIEW_BASE_URL ?? 'http://localhost:9003';
const EMAIL = process.env.PREVIEW_EMAIL;
const PASSWORD = process.env.PREVIEW_PASSWORD;
const OUT = path.resolve('.ui-preview');

/** Anchos representativos: móvil, tablet y escritorio. */
const VIEWPORTS = [
  { name: 'movil',      width: 390,  height: 900 },
  { name: 'tablet',     width: 820,  height: 1100 },
  { name: 'escritorio', width: 1440, height: 1200 },
];

/** Rutas que no exigen sesión. */
const RUTAS_PUBLICAS = [
  { slug: 'login', url: '/login' },
  { slug: 'legal', url: '/legal' },
];

/** Rutas detrás del login. `espera` da tiempo a que Firestore hidrate los gráficos. */
const RUTAS_PRIVADAS = [
  { slug: 'dashboard',  url: '/dashboard',  espera: 6000 },
  { slug: 'hallazgos',  url: '/hallazgos',  espera: 4000 },
  { slug: 'work-plans', url: '/work-plans', espera: 3000 },
];

const log = (...a) => console.log('[ui-preview]', ...a);

/**
 * Detecta desbordamiento horizontal — el síntoma exacto que se corrigió en la
 * sesión 20. Se mide contra `documentElement`, que es lo que produce la barra
 * de scroll de la página.
 */
async function medirDesbordamiento(page) {
  return page.evaluate(() => {
    const el = document.documentElement;
    return {
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      desborda: el.scrollWidth > el.clientWidth + 1, // +1: tolerancia de redondeo
    };
  });
}

/**
 * Espera a que la vista termine de cargar datos de Firestore.
 *
 * Capturar con un tiempo fijo produce pantallas llenas de spinners: en un perfil de
 * navegador nuevo no hay caché de IndexedDB y la primera sincronización tarda bastante
 * más que en un navegador ya usado. Se usa el spinner como señal — la app marca todos
 * los estados de carga con `animate-spin`.
 *
 * No es fatal: si el tiempo se agota, se captura igual y el spinner queda visible en la
 * imagen, que es información en sí misma.
 */
async function esperarCarga(page, timeout = 30_000) {
  const inicio = Date.now();
  while (Date.now() - inicio < timeout) {
    const spinners = await page.locator('.animate-spin:visible').count().catch(() => 0);
    if (spinners === 0) {
      await page.waitForTimeout(1200); // margen para que rechart dibuje
      return true;
    }
    await page.waitForTimeout(500);
  }
  log('  ⚠ seguía cargando al agotarse la espera');
  return false;
}

async function capturar(page, slug, viewport, espera = 2500) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.waitForTimeout(espera);

  const overflow = await medirDesbordamiento(page);
  const archivo = path.join(OUT, `${slug}--${viewport.name}.png`);
  await page.screenshot({ path: archivo, fullPage: true });

  log(
    `${slug} @ ${viewport.name} (${viewport.width}px) →`,
    overflow.desborda
      ? `⚠ DESBORDA: ${overflow.scrollWidth}px de contenido en ${overflow.clientWidth}px de viewport`
      : 'ancho OK',
  );
  return overflow.desborda;
}

/**
 * Escribe en un campo y verifica que el valor se haya quedado.
 *
 * Es necesario porque el formulario usa react-hook-form: si se escribe antes de que
 * React hidrate, el re-render de hidratación borra lo escrito y el formulario se
 * envía vacío — el síntoma es un "Dirección de correo inválida" con el campo en
 * blanco. Se reintenta hasta que el valor persista.
 */
async function escribirCampo(page, selector, valor, intentos = 3) {
  const campo = page.locator(selector);
  await campo.waitFor({ state: 'visible', timeout: 15_000 });

  for (let i = 1; i <= intentos; i++) {
    await campo.click();
    await campo.fill('');
    // `pressSequentially` emite eventos de teclado reales, que react-hook-form sí registra.
    await campo.pressSequentially(valor, { delay: 15 });
    await page.waitForTimeout(250);
    if ((await campo.inputValue()) === valor) return;
    log(`  el campo ${selector} no retuvo el valor (intento ${i}/${intentos}), reintentando…`);
    await page.waitForTimeout(1000);
  }
  throw new Error(`el campo ${selector} no retuvo el valor tras ${intentos} intentos`);
}

async function iniciarSesion(page) {
  log('iniciando sesión…');
  // `networkidle` + espera fija: hay que darle tiempo a la hidratación de React,
  // no basta con que el HTML esté en el DOM.
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await escribirCampo(page, 'input[name="email"]', EMAIL);
  await escribirCampo(page, 'input[name="password"]', PASSWORD);
  await page.click('button[type="submit"]');

  // El login redirige con el router de Next (client-side), que NO dispara un evento
  // de navegación: `waitForURL` se queda esperando un "load" que nunca llega. Se
  // consulta `location` dentro de la página, que sí refleja el cambio de ruta.
  try {
    await page.waitForFunction(
      () => !window.location.pathname.startsWith('/login'),
      null,
      { timeout: 45_000 },
    );
  } catch {
    // Diagnóstico: casi siempre es credencial incorrecta y el error sale en un toast.
    await page.screenshot({ path: path.join(OUT, 'login--fallido.png'), fullPage: true });
    const texto = await page.locator('body').innerText().catch(() => '');
    const pista = texto.split('\n').map(l => l.trim())
      .find(l => /incorrect|inválid|invalid|error|no coincide|credencial/i.test(l));
    throw new Error(
      `no se pudo iniciar sesión${pista ? ` — la página dice: "${pista}"` : ''}. ` +
      `Revise .env.preview. Captura del intento en ${path.join(OUT, 'login--fallido.png')}`,
    );
  }
  log('sesión iniciada →', new URL(page.url()).pathname);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: 'es-CO' });
  const page = await context.newPage();

  // Los errores de consola suelen delatar un gráfico que no montó.
  page.on('pageerror', e => log('✖ error de página:', e.message));

  const desbordes = [];
  const registrar = (slug, vp, desborda) => { if (desborda) desbordes.push(`${slug} @ ${vp.name}`); };

  try {
    for (const ruta of RUTAS_PUBLICAS) {
      await page.goto(`${BASE}${ruta.url}`, { waitUntil: 'networkidle' });
      for (const vp of VIEWPORTS) registrar(ruta.slug, vp, await capturar(page, ruta.slug, vp));
    }

    if (!EMAIL || !PASSWORD) {
      log('⚠ sin PREVIEW_EMAIL / PREVIEW_PASSWORD: se omiten las rutas con sesión.');
    } else {
      await iniciarSesion(page);
      for (const ruta of RUTAS_PRIVADAS) {
        await page.goto(`${BASE}${ruta.url}`, { waitUntil: 'domcontentloaded' });
        await esperarCarga(page);
        for (const vp of VIEWPORTS) {
          // Cambiar de viewport vuelve a montar los gráficos: hay que esperar de nuevo.
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await esperarCarga(page, 15_000);
          registrar(ruta.slug, vp, await capturar(page, ruta.slug, vp, ruta.espera));
        }
      }
    }
  } finally {
    await browser.close();
  }

  log('capturas en', OUT);
  if (desbordes.length > 0) {
    log('⚠ desbordamiento horizontal en:', desbordes.join(', '));
    process.exitCode = 1;
  } else {
    log('✓ ninguna vista desborda horizontalmente');
  }
}

main().catch(err => {
  console.error('[ui-preview] falló:', err);
  process.exitCode = 1;
});
