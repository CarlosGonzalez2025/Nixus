# HANDOFF — SGTC Móvil
## Sistema de Gestión de Tareas de Alto Riesgo — Italcol / Nixus Capital

> **Repositorio:** https://github.com/CarlosGonzalez2025/Nixus  
> **Rama principal:** `main`  
> **Última actualización de este documento:** 2026-06-10 (Sesión 7)

---

## 1. Información General del Proyecto

| Campo | Valor |
|---|---|
| **Cliente** | Italcol S.A. / Nixus Capital |
| **Sistema** | SGTC Móvil — Sistema de Gestión de Tareas de Alto Riesgo |
| **Inicio del proyecto** | 2025-10-08 |
| **Framework** | Next.js 15.5.9 (App Router + Turbopack) |
| **Base de datos** | Firebase Firestore |
| **Autenticación** | Firebase Auth |
| **Almacenamiento** | Firebase Storage |
| **Hosting** | Firebase App Hosting |
| **Notificaciones** | Resend (email) + Twilio (WhatsApp) + Web Push (VAPID) |
| **PWA** | `@ducanh2912/next-pwa` con Service Worker personalizado |
| **UI** | Tailwind CSS + shadcn/ui + Radix UI |
| **Generación PDF** | jsPDF + html2canvas |
| **IA** | Google Genkit |
| **Puerto de desarrollo** | `9003` (`npm run dev`) |

---

## 2. Stack Técnico

```
Next.js 15 (App Router)
├── Firebase Auth          → autenticación usuarios
├── Firebase Firestore     → base de datos (con caché offline)
├── Firebase Storage       → archivos adjuntos
├── Firebase Admin SDK     → server actions / backend
├── Resend                 → notificaciones por email
├── Twilio                 → notificaciones por WhatsApp
├── Web Push (VAPID)       → notificaciones push nativas en navegador
├── jsPDF + html2canvas    → generación de PDFs de permisos y hallazgos
├── Google Genkit          → flujos de IA
├── React Hook Form + Zod  → formularios y validación
└── next-pwa               → Progressive Web App (modo offline)
```

---

## 3. Roles del Sistema

| Rol | Descripción |
|---|---|
| `admin` | Acceso total — gestión de usuarios, listas y permisos |
| `solicitante` | Crea y cierra permisos de trabajo |
| `autorizante` | Aprueba / rechaza permisos de su empresa y planta |
| `lider_sst` | Firma SST, suspende/reactiva permisos |
| `mantenimiento` | Firma permisos de control de energía |
| `asesor_arl` | Acceso a hallazgos propios; verificaciones de contratistas propias; gestión completa de plantillas (crea todas, edita/elimina solo las propias) y tipos de riesgo |
| `lider_regional` | Supervisión de permisos, verificaciones y hallazgos en un subconjunto de empresas/plantas/ciudades; puede aprobar, cancelar y gestionar permisos dentro de su scope; acceso controlado por `allowedEmpresas`, `allowedPlantas`, `allowedCiudades` y `allowedModules` |

---

## 4. Changelog — Registro de Cambios por Fecha

---

### 2026-06-10 (Sesión 7) — Anexo "Trabajos en Caliente" independiente + reescritura del generador de PDF + fix visibilidad PWA

#### Feat: nuevo Anexo "Trabajos en Caliente" separado del Anexo de Energías

Antes, los "Trabajos en Caliente" eran una sección interna del Anexo de Energías. Por requerimiento del cliente se convirtió en un **anexo independiente**, seleccionable como un tipo de trabajo más, con su propio apartado de datos generales. **No agrega firmas ni altera el flujo de aprobación** — el ciclo de firmas permanece idéntico.

**Archivos modificados:**
- `src/types/index.ts` — nuevo tipo `AnexoCaliente`; campo `caliente` en `SelectedWorkTypes`; campo `anexoCaliente` en `Permit`.
- `src/app/(app)/permits/create/form-context.tsx` — acción `UPDATE_ANEXO_CALIENTE`, estado inicial `anexoCaliente`, caso en reducer y en `SET_ENTIRE_STATE`.
- `src/app/(app)/permits/create/components/GeneralInfoStep.tsx` — nuevo tipo de trabajo "Trabajos en Caliente" en el selector.
- `src/app/(app)/permits/create/components/AnexoCalienteStep.tsx` — **componente nuevo**: datos generales (solo lectura) + contacto de emergencia + lista de verificación A–H + campo "Otro".
- `src/app/(app)/permits/create/components/AnexoEnergiaStep.tsx` — se eliminó la sección "Trabajos en Caliente".
- `src/app/(app)/permits/create/page.tsx` — registro del paso "Anexo Caliente" en el wizard.
- `src/app/(app)/permits/[id]/page.tsx` — bloque de detalle del nuevo anexo.

**Retrocompatibilidad:** los permisos antiguos que guardaron caliente dentro de `anexoEnergias.trabajosEnCaliente` siguen mostrándolo dentro del bloque Energías; solo se oculta allí cuando `selectedWorkTypes.caliente === true` (permisos nuevos). No se requiere migración de datos en Firestore.

#### Fix: reescritura integral del generador de PDF (`src/lib/pdf-generators.ts`)

El cliente reportó que el PDF mostraba información incompleta e ilegible. Se corrigieron tres causas raíz:

1. **Glifos rotos `✓`/`✗`** — jsPDF (Helvetica) solo soporta Latin-1, por lo que los checkmarks salían como apóstrofes basura. Se reemplazaron por texto plano `SI` / `NO` / `N/A` / `—`; la señal visual ahora la da el **color**.
2. **Tablas de Información General vacías** en los anexos (Energías, Izaje, Excavación, Confinado, Caliente) — el encabezado tenía una sola celda mientras el cuerpo tenía 2–4 columnas, por lo que `autoTable` descartaba los valores. Se corrigió declarando el número real de columnas con `colSpan`.
3. **Campos faltantes** — ahora el PDF plasma **todos** los campos del permiso aunque no se hayan diligenciado (se muestran como `NO`/`N/A`/`—`), iterando las definiciones reales de campos (`hazardCategories`, `eppOptions`, `justificacionOptions`, `eppItems`, `emergenciasItems`) en lugar de solo los valores guardados.

**Otros ajustes del PDF:**
- Color de estado unificado vía `colorForStatusText` + `didParseCell` (el `didDrawCell` previo no coloreaba el texto). `SI` en verde; **`NO` y `N/A` en gris (el cliente pidió no usar rojo para `NO`)**.
- Nuevo render `renderAnexoCalienteContent` + wrapper `generateAnexoCalientePDF`; incluido en el PDF unificado y en `handleExportPDF`.
- Información General del permiso ampliada: Ciudad, Reunión de Inicio, ATS Verificado y "Trabajos en Caliente" en tipos de trabajo.
- Estado de herramientas legible (`BUENO`/`MALO`); especificaciones de EPP con guiones bajos limpiados (`SI (clase 1)`).

#### Fix: banner "Actualizar app" invisible + validación de configuración PWA

El botón/banner para actualizar la app cuando se publica una nueva versión era casi invisible (solo se veía un botón gris suelto).

**Causa raíz:** la clase `bg-nixus` se usaba en 4 componentes (`PWAUpdater`, `OfflineBanner`, `PushNotificationPrompt` y un badge de `layout.tsx`) pero **el color `nixus` nunca estuvo definido en Tailwind** → fondo transparente + texto blanco = invisible.

**Archivos modificados:**
- `tailwind.config.ts` — se definió el color de marca `nixus` (`#1DB5C1`, igual al `theme_color` del manifest) con `DEFAULT` + `foreground`. Corrige los 4 componentes de raíz.
- `src/components/PWAUpdater.tsx` — rediseño del banner para máxima visibilidad: fondo turquesa de marca, botón "Actualizar" blanco de alto contraste con ícono, ancho completo centrado en móvil respetando `safe-area-inset-bottom` (notch/home indicator), borde resaltado (`ring`) y `role="alert"` + `aria-live` para accesibilidad. La lógica de actualización (detección de SW `waiting`, `SKIP_WAITING`, recarga con consentimiento, chequeo cada 30 min y al recuperar foco) no se modificó.

**Validación de la configuración PWA (instalación como app nativa):** se revisó y está **correcta** — `manifest.json` enlazado en el layout root con `display: standalone`, íconos 192/512 (`any` + `maskable`, todos presentes en `/public`), `theme_color`/`background_color`, SW registrado por `next-pwa` (Workbox) con fetch handler, soporte iOS (`appleWebApp.capable` + `apple-touch-icon`) y `customWorkerSrc` que maneja `SKIP_WAITING`/`push`/`notificationclick`. La app es instalable en Android/Chrome (prompt nativo) e iOS (Añadir a inicio).

> **Nota:** el SW está deshabilitado en desarrollo (`disable: NODE_ENV === 'development'` en `next.config.ts`), por lo que el banner de actualización **solo aparece en producción** (`npm run build && npm start` o en el deploy), no en `npm run dev`.

---

### 2026-06-10 (Sesión 6) — UX: flujo de firmas de cierre por sesión + mejoras visuales en permisos

#### Feat: validación de sesión en firmas de cierre normal

**Archivos modificados:** `src/app/(app)/permits/actions.ts`, `src/app/(app)/permits/[id]/page.tsx`

El cierre normal de un permiso ahora requiere que cada firma la realice el usuario correcto desde su propia sesión, replicando el comportamiento de las firmas de apertura.

**Flujo resultante:**
```
① Ejecutante (creador del permiso) abre el modal de cierre desde su sesión y firma.
② El sistema envía notificación in-app + correo al Autorizante automáticamente.
③ El Autorizante entra desde su sesión, abre el permiso y firma el cierre.
④ Se habilita "Confirmar Cierre del Permiso".
```

**Cambios en `actions.ts` — validación servidor:**
```typescript
// cierre_responsable: solo el creador del permiso
if (role === 'cierre_responsable') {
    if (permitBeforeData.createdBy !== user.uid && user.role !== 'admin') {
        return { success: false, error: 'Solo el ejecutante del trabajo puede registrar la firma de cierre como Responsable.' };
    }
}
// cierre_autoridad: solo el autorizante
if (role === 'cierre_autoridad') {
    if (user.role !== 'autorizante' && user.role !== 'admin') {
        return { success: false, error: 'Solo el Autorizante del Área puede registrar la firma de cierre.' };
    }
}
```

**Cambios en `[id]/page.tsx` — validación cliente:**
- `openSignatureDialog`: para `cierre_responsable` y `cierre_autoridad` el `signerName` se auto-completa desde `currentUser.displayName` (ya no se pide manualmente).
- `handleSaveSignature`: separado `needsManualName` (coordinador/supervisor/cancelación) de los roles de cierre normal — para cierre se usa siempre el nombre de sesión.
- Diálogo de firma: muestra campo "Firmando como" en modo solo lectura para cierres normales; el input manual queda solo para `coordinador_alturas`, `supervisor_confinado` y `cancelacion`.
- Modal de cierre: botones con tooltips según sesión activa — ejecutante ve habilitado su botón, autorizante ve habilitado el suyo; indicador de flujo en 3 pasos con estados visuales (gris → azul → verde).

**Sin impacto en:** cierre de emergencia, cancelación, firmas de apertura, flujo offline.

---

#### UX: alertas mejoradas en paso Trabajadores para Coordinador de TA y Supervisor de EC

**Archivo modificado:** `src/app/(app)/permits/create/components/WorkersStep.tsx`

Las 4 alertas de advertencia (2 por rol × 2 estados: no registrado / registrado sin firma) ahora explican con precisión qué debe hacer el usuario:

| Estado | Mensaje anterior | Mensaje nuevo |
|---|---|---|
| No registrado | "Se requiere registrar y firmar al Coordinador de TA..." | "Agregue al **Coordinador de Trabajos en Alturas** al equipo, seleccione el rol **'Coordinador de TA'** y capture su firma. Sin esta firma no podrá avanzar a Revisión." |
| Registrado sin firma | "El Coordinador de TA está registrado pero aún no ha firmado." | "El **Coordinador de TA** está registrado pero aún no ha firmado. Edite su registro y capture su firma de apertura para continuar." |

Mismo patrón para el Supervisor de EC. Texto compacto con `text-xs py-2`.

---

#### Feat: bloqueo de navegación al paso Revisión sin firmas de Coordinador/Supervisor

**Archivo modificado:** `src/app/(app)/permits/create/page.tsx`

Se añadieron las validaciones 4 y 5 dentro del bloque `canProceed()` para el paso `'Trabajadores'`:

```typescript
// Si hay trabajo en alturas, el Coordinador de TA debe estar registrado y firmado
if (formData.selectedWorkTypes?.alturas) {
  const hasCoordSigned = otherWorkers.some(w => w.rol === 'Coordinador de TA' && w.firmaApertura);
  if (!hasCoordSigned) → toast destructivo + return false
}
// Si hay espacios confinados, el Supervisor de EC debe estar registrado y firmado
if (formData.selectedWorkTypes?.confinado) {
  const hasSupervisorSigned = otherWorkers.some(w => w.rol === 'Supervisor de EC' && w.firmaApertura);
  if (!hasSupervisorSigned) → toast destructivo + return false
}
```

El usuario no puede avanzar al paso 7 (Revisión) sin cumplir ambos requisitos cuando aplican.

---

#### Feat: alertas informativas en Anexo Altura y Anexo Confinado

**Archivos modificados:** `src/app/(app)/permits/create/components/AnexoAlturaStep.tsx`, `src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx`

Se agregó un `Alert` azul informativo debajo del título de cada anexo, con `text-xs` y `py-2`:

- **Anexo Altura:** *"Firma del Coordinador de Alturas: Debe registrarlo en el paso Gestión de Trabajadores, seleccionar el rol 'Coordinador de TA' y capturar su firma de apertura. Sin este requisito el permiso no podrá avanzar a Revisión."*
- **Anexo Confinado:** mismo patrón para el Supervisor de EC.

`AnexoConfinadoStep.tsx` no tenía `Alert`/`Info` importados — se agregaron.

---

#### UX: modal de cierre con scroll interno y footer fijo

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

Los 3 modales de cierre/cancelación quedaban fuera de pantalla cuando la lista de condiciones pendientes era larga (ej. permisos de varios días con validaciones diarias sin completar).

**Cambios aplicados a los 3 modales:**

| Modal | Cambio |
|---|---|
| Cierre normal | `DialogContent`: `max-h-[90vh] flex flex-col`; contenido: `overflow-y-auto flex-1`; header y footer: `flex-shrink-0`; footer con `border-t` |
| Cierre de emergencia | `AlertDialogContent`: `max-h-[90vh] flex flex-col sm:max-w-md`; lista de razones + textarea dentro de zona scrollable; footer fijo |
| Cancelar permiso | `DialogContent`: `max-h-[90vh] flex flex-col sm:max-w-md`; campos + `SignaturePad` dentro de zona scrollable |

---

#### UX: valores Si/No/N/A como badges en el detalle del permiso

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

En la vista de solo lectura del detalle del permiso, los íconos (✓ verde, ✗ rojo, ○ gris) fueron reemplazados por badges de texto para mayor claridad:

```tsx
// Antes
si: <CheckCircle className="h-5 w-5 text-green-500" />
no: <XCircle className="h-5 w-5 text-red-500" />
na: <Circle className="h-5 w-5 text-gray-400" />

// Después
si: <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-300">Sí</span>
no: <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300">No</span>
na: <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-300">N/A</span>
```

Solo afecta el modo lectura (`iconMap`). El modo edición con RadioGroup no fue modificado.

---

#### Resumen de archivos modificados (Sesión 6)

| Archivo | Cambios |
|---|---|
| `src/app/(app)/permits/actions.ts` | Validación de sesión para `cierre_responsable` y `cierre_autoridad` |
| `src/app/(app)/permits/[id]/page.tsx` | Flujo cierre por sesión; badges Si/No/NA; scroll en 3 modales; indicador de flujo |
| `src/app/(app)/permits/create/page.tsx` | Bloqueo `canProceed` para Coordinador TA y Supervisor EC |
| `src/app/(app)/permits/create/components/WorkersStep.tsx` | Alertas más descriptivas con instrucciones de rol |
| `src/app/(app)/permits/create/components/AnexoAlturaStep.tsx` | Alerta informativa de Coordinador TA |
| `src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx` | Alerta informativa de Supervisor EC + imports |

---

### 2026-06-09 (Sesión 5) — Feat: Módulo Alturas completo + fix Firebase SDK v11.10.0 + migración masiva WA

#### Fix: Firebase SDK v11.10.0 — `INTERNAL ASSERTION FAILED: ca9 / ve:-1`

**Problema:** El cliente Firestore lanzaba `INTERNAL ASSERTION FAILED: Unexpected state (ID: ca9) CONTEXT: {"ve":-1}` de forma intermitente.

**Causa raíz:** Race condition en la capa de transporte `__PRIVATE_PersistentListenStream` (WebChannel/gRPC). El servidor envía un evento RESET después de que el listener JavaScript ya hizo `unsubscribe()`. Al procesar el RESET, `WatchChangeAggregator.forEachTarget` invoca `TargetState.Ue()` sobre targets con contador en 0, bajando a -1 y disparando la assertion fatal. El bug está en el SDK v11.10.0 y no en el código de la app.

**Solución aplicada:** `src/lib/firebase.ts`
- Se mantiene `localCache: memoryLocalCache()` (fix anterior).
- Se agrega `experimentalForceLongPolling: true` — fuerza transporte HTTP long-poll en lugar de WebChannel/gRPC, eludiendo completamente el path `PersistentListenStream` donde reside el bug.

```typescript
db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
  experimentalForceLongPolling: true,
});
```

**Alternativa recomendada (si persiste):** downgrade a `firebase@11.9.0` (`npm install firebase@11.9.0` con dev server apagado, borrando `.next` y limpiando IndexedDB del navegador).

---

#### Feat: Módulo Alturas — implementación completa (12 archivos)

Nuevo módulo `/alturas` con hub de navegación y submódulo Diagnóstico completo, siguiendo la misma arquitectura que el módulo Confinados.

**Archivos creados/modificados:**

| Archivo | Tipo | Descripción |
|---|---|---|
| `src/types/alturas.ts` | Nuevo | Tipos TypeScript, catálogos, lógica de scoring (`calcDiagnosticoAlturaScore`) |
| `src/lib/alturas-service.ts` | Nuevo | CRUD Firestore para `diagnosticosAlturas` |
| `src/hooks/use-diagnosticos-alturas.ts` | Nuevo | Hook real-time con filtros y caché |
| `src/lib/analytics/alturas-analytics.ts` | Nuevo | Motor de análisis: estadísticas, clustering K-Means, tendencias |
| `src/app/(app)/alturas/page.tsx` | Modificado | Hub de navegación — 3 submódulos sin "Pronto" |
| `src/app/(app)/alturas/diagnostico/actions.ts` | Nuevo | Server actions: crear, actualizar, eliminar diagnóstico |
| `src/app/(app)/alturas/diagnostico/page.tsx` | Nuevo | Lista de diagnósticos con filtros |
| `src/app/(app)/alturas/diagnostico/nuevo/page.tsx` | Nuevo | Formulario de nuevo diagnóstico |
| `src/app/(app)/alturas/diagnostico/[id]/page.tsx` | Nuevo | Vista de detalle de un diagnóstico |
| `src/app/(app)/alturas/diagnostico/importar/actions.ts` | Nuevo | Server action para importar desde Excel |
| `src/app/(app)/alturas/diagnostico/importar/page.tsx` | Nuevo | UI de importación masiva |
| `src/app/(app)/alturas/analisis/page.tsx` | Nuevo | Dashboard de análisis y métricas ML |

**Scoring (`calcDiagnosticoAlturaScore`):** 7 criterios, máximo 14 puntos.

| # | Criterio | Puntuación |
|---|---|---|
| 1 | Procedimientos de gestión en alturas | `evaluadaEnIPER === 'Si'` → 2 |
| 2 | Permisos de trabajo | `medidasPrevencion` contiene 'Permiso' → 2 |
| 3 | Gestión de medidas de prevención | otras medidas de prevención → 2 |
| 4 | Gestión documental | `cuentaConProcedimiento === 'Si'` → 2 |
| 5 | Gestión de riesgo operacional | inspección+mantenimiento escaleras → 2, buen estado → 1 |
| 6 | Gestión de equipos y sistemas | inspección anual arneses → 2, buen estado → 1 |
| 7 | Gestión de emergencias | sistema de rescate activo → 2, en uso → 1 |

**Hub:** `src/app/(app)/alturas/page.tsx` — tarjeta "Historial & Seguimiento" habilitada (se eliminó prop `comingSoon` y la insignia "Pronto").

---

#### Feat: Script de migración masiva — `scripts/migrate-inventario-wa.mjs`

Script ESM para importar 1175 registros desde `ESTRUCTURA DE DATOS INVENTARIO WA (1).xlsx` (hoja `INVENTARIO WA`) a la colección `diagnosticosAlturas` de Firestore.

**Características:**
- Credenciales: `serviceAccountKey.json` (prioridad) o `.env`
- Batches de 400 documentos (límite Firestore: 500)
- Flags: `--dry-run`, `--skip-existing`, `--limit N`
- Confirmación interactiva antes de escribir en producción
- Normalización de valores de equipos (10 categorías de texto → 7 valores canónicos)
- Cálculo inline de score (réplica de `calcDiagnosticoAlturaScore`)
- Campos de trazabilidad: `_origenId`, `_origenHoja`
- Parseo de fechas seriales de Excel (época: 1899-12-30)
- Merge de columnas 30 y 40 (ambas "Arnés de cuerpo completo" por error de diseño del formulario)

**Resultado del dry-run:** 1175/1175 válidos, 0 errores, score promedio 7.9/14, 38 empresas, 29 plantas.

**Uso:**
```powershell
node scripts/migrate-inventario-wa.mjs              # producción (pide confirmación)
node scripts/migrate-inventario-wa.mjs --dry-run    # validar sin escribir
node scripts/migrate-inventario-wa.mjs --skip-existing  # re-run idempotente
node scripts/migrate-inventario-wa.mjs --limit 50   # prueba con 50 registros
```

---

#### Feat: Reglas de seguridad Firestore — colección `diagnosticosAlturas`

**Archivos modificados:** `firestore.rules` (raíz, desplegado) y `src/firestore.rules` (copia sincronizada).

Nueva función de scope `canAccessAlturas()`: usuario autenticado con rol `admin`, `lider_regional`, `lider_sst` o `asesor_arl`.

| Operación | Quién puede |
|---|---|
| `get` | `canAccessAlturas()` + (admin/LR, lider_sst, o propietario si asesor_arl/autorizante) |
| `list` | `canAccessAlturas()` |
| `create` | `canAccessAlturas()` + `createdById == request.auth.uid` |
| `update` | `canAccessAlturas()` + (admin/LR, lider_sst, o propietario) |
| `delete` | Solo `isAdminOrLR()` |

Adicionalmente, `src/firestore.rules` fue sincronizado con la versión raíz: se agregaron las funciones `isLiderRegional()` y `isAdminOrLR()` que faltaban, se corrigió el write de `dynamic_lists` y el delete de `hallazgos` para usar `isAdminOrLR()`, y se añadió el bloque completo de `diagnosticosConfinados` que estaba ausente.

---

### 2026-06-05 (Sesión 4) — Feat: Confinados Análisis 100% responsive + corrección etiquetas gases

#### Feat: módulo Confinados Análisis responsivo en mobile

**Archivo modificado:** `src/app/(app)/confinados/analisis/page.tsx`

**Causa raíz:** El módulo tenía anchos fijos en selects, el gráfico donut usaba `width={180}` en `ResponsiveContainer` (causaba overflow), la tabla de organización no tenía scroll horizontal y los badges de tendencia se podían truncar en pantallas pequeñas.

**Cambios aplicados (solo CSS/Tailwind, sin cambios de lógica o datos):**

1. **Sección de filtros** — separada en dos filas: icono + badge en la primera, selects en la segunda con `grid grid-cols-2 sm:flex sm:flex-wrap`. Los selects usan `w-full sm:w-XX` para ocupar ancho completo en mobile y ancho fijo en desktop.

2. **Gráfico donut (PieChart)** — envuelto en `<div className="w-full max-w-[180px] mx-auto sm:mx-0 shrink-0">` y `ResponsiveContainer width="100%"` en lugar de `width={180}` fijo que causaba overflow.

3. **Gráfico de barras horizontales** — padding reducido `px-1 sm:px-2`, margen derecho 48px, margen izquierdo 4px, `YAxis width={80} tick={{ fontSize: 9 }}` para evitar recorte de etiquetas.

4. **Tabla de organizaciones** — añadido `min-w-[640px]` para que el scroll horizontal funcione correctamente en mobile (el contenedor ya tenía `overflow-x-auto`).

5. **Badges de tendencia** — añadido `shrink-0` a badge y spans de estadísticas para evitar truncado en flex-wrap.

**Resultado:** El módulo es completamente usable en mobile sin afectar lógica, cálculos ni datos mostrados.

**Commit:** `41af387`

---

#### Fix: etiquetas de rangos de gases en Anexo Confinado

**Archivo modificado:** `src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx`

**Cambios aplicados:**
- `O2 (19.5-22%)` → `O2 (19.5-23.5%)` — rango superior corregido
- `H2S (0-10 PPM)` → `H2S (1 PPM)` — límite TLV-C correcto

**Commit:** `41af387`

---

### 2026-06-05 (Sesión 3) — Fix: íconos PWA + notificaciones a usuarios inactivos

#### Fix: íconos de la app mostraban logo Nixus en lugar del logo oficial Piloso

**Archivos modificados:** todos los archivos `public/*.png` y `public/*.svg` (16 archivos), `src/app/favicon.ico`

**Causa raíz:** Los íconos oficiales de la app (logo "Piloso — Reglas que salvan vidas") estaban en la raíz del proyecto pero Next.js solo sirve estáticos desde `public/`. Los archivos en `public/` eran el logo de Nixus (copiados erróneamente en la sesión de auditoría PWA).

**Fix:** Se copiaron todos los archivos de ícono desde la raíz del proyecto a `public/`, reemplazando los que mostraban el logo incorrecto:

| Ícono | Antes | Ahora |
|---|---|---|
| `favicon-96x96.png` | Logo Nixus (6.1 KB) | Logo Piloso (6.9 KB) |
| `web-app-manifest-192x192.png` | Logo Nixus (12.5 KB) | Logo Piloso (22.9 KB) |
| `web-app-manifest-512x512.png` | Logo Nixus (37 KB) | Logo Piloso (100.9 KB) |
| `apple-touch-icon.png` | Logo Nixus (11.2 KB) | Logo Piloso (15 KB) |
| `favicon.svg` | SVG Nixus (18.1 KB) | SVG Piloso (238 KB) |
| `icon-*.png` (10 archivos) | Logo Nixus | Logo Piloso |
| `src/app/favicon.ico` | Confirmado correcto | Sin cambio |

**Nota para PWA instalada en móviles:** Android guarda el ícono al momento de la instalación. Para que el nuevo ícono aparezca, el usuario debe **desinstalar** la app del home screen y volver a instalarla desde el navegador después del siguiente deploy.

**Commit:** `94074f6`

---

#### Fix: usuarios inactivos (`disabled: true`) seguían recibiendo notificaciones

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Causa raíz:** Al inactivar un usuario el sistema establece `disabled: true` en Firebase Auth (bloquea login) y en Firestore. Los filtros de rol en `addUsersMatchingPlant` y `getMantenimientoUserIds` sí chequeaban `disabled`, pero `getInvolvedUsers` agregaba directamente `permit.createdBy` y los UIDs de `permit.approvals` sin verificar si esos usuarios estaban desactivados. Esto hacía que un usuario inactivo siguiera recibiendo notificaciones in-app, push y emails de permisos donde había participado anteriormente.

**Cambios aplicados:**

1. **Nueva función `filterActiveUserIds(userIds[])`** — filtra en paralelo (Firestore reads) todos los UIDs recibidos, devuelve solo los que tienen `disabled !== true` y existen en la colección `users`.

```typescript
const filterActiveUserIds = async (userIds: string[]): Promise<string[]> => {
  const checks = await Promise.all(
    userIds.map(async uid => {
      const doc = await adminDb.collection('users').doc(uid).get();
      if (!doc.exists || doc.data()?.disabled === true) return null;
      return uid;
    })
  );
  return checks.filter((uid): uid is string => uid !== null);
};
```

2. **`notifyUsers` actualizada** — aplica `filterActiveUserIds` sobre los destinatarios potenciales antes de crear cualquier notificación (in-app, push y email). Un solo filtro cubre los tres canales.

```typescript
const potentialRecipients = userIds.filter(uid => uid !== excludeUid);
const recipients = await filterActiveUserIds(potentialRecipients); // excluye disabled
```

3. **`getEmailsForNonAdminUsers` actualizada** — agrega `if (data.disabled === true) return null` como red de seguridad adicional (ya que esta función también lee los docs de Firestore).

**Cobertura resultante:**

| Escenario | Antes | Ahora |
|---|---|---|
| Notificaciones por rol (autorizante, lider_sst, etc.) | ✅ Excluía `disabled` | ✅ Sin cambio |
| Permisos creados por el usuario (`createdBy`) | ⚠️ Seguía notificando | ✅ Excluido |
| Permisos firmados por el usuario (`approvals`) | ⚠️ Seguía notificando | ✅ Excluido |
| Emails (red de seguridad) | ⚠️ No chequeaba `disabled` | ✅ Chequea `disabled` |

**Commit:** `c8409db`

---

### 2026-06-05 (Sesión 2) — Fix: regresión dashboard admin + auditoría PWA completa

#### Fix: admin con `mantenimiento` en `otherRoles` veía solo permisos de energía en el dashboard

**Archivo modificado:** `src/app/(app)/dashboard/page.tsx`

**Causa raíz:** El fix del Bug 5 (sesión anterior) añadió `|| (user.otherRoles ?? []).includes('mantenimiento')` a la condición de la vista mantenimiento sin excluir al rol `admin`. Un usuario admin con `mantenimiento` en `otherRoles` (ej. Carlos González) caía en el branch de mantenimiento y veía únicamente permisos de control de energía pendientes de su firma, en lugar de todos los permisos del sistema.

```typescript
// Antes (buggy)
} else if (user.role === 'mantenimiento' || (user.otherRoles ?? []).includes('mantenimiento')) {

// Después (correcto)
} else if (user.role !== 'admin' && (user.role === 'mantenimiento' || (user.otherRoles ?? []).includes('mantenimiento'))) {
  // Guardia user.role !== 'admin': el admin siempre debe ver TODOS los permisos
```

**Commit:** `a39585c`

---

#### Auditoría PWA completa — correcciones de instalación y actualización

**Archivos modificados:** `src/components/PWAUpdater.tsx`, `next.config.ts`, `public/manifest.json`, `public/site.webmanifest`, `src/app/layout.tsx`

**Problema 1 — Double SW registration:**
`register: true` en next-pwa Y `navigator.serviceWorker.register('/sw.js')` en `PWAUpdater.tsx` causaban registro doble del service worker.

**Fix:** Reemplazado `navigator.serviceWorker.register()` por `navigator.serviceWorker.ready` (usa el SW ya registrado por next-pwa sin crear uno adicional).

**Problema 2 — Recarga automática sin consentimiento del usuario:**
El evento `controllerchange` disparaba `window.location.reload()` incondicionalmente, lo que causaba una recarga inesperada al activarse el SW por primera vez (instalación, sin versión anterior).

**Fix:** Patrón `userConsentedRef = useRef(false)`:
```typescript
const handleControllerChange = () => {
  if (userConsentedRef.current) window.location.reload(); // solo si el usuario consintió
};
const handleUpdate = () => {
  userConsentedRef.current = true; // el usuario clickeó "Actualizar"
  waitingWorker.postMessage({ type: 'SKIP_WAITING' });
};
```

**Problema 3 — `skipWaiting: false` no declarado en workboxOptions:**
El SW podía activarse automáticamente en algunos contextos. Se añadió `skipWaiting: false` tanto en el nivel raíz del config como en `workboxOptions`.

**Problema 4 — Íconos en `manifest.json` con `purpose: "any maskable"` combinado:**
Chrome 96+ depreca el valor combinado y lo trata como `maskable`, recortando el logo con máscara segura. Se separaron en dos entradas distintas (`any` y `maskable`).

**Problema 5 — `site.webmanifest` genérico:**
Tenía `name: "MyWebSite"`, `short_name: "MySite"`. Actualizado con datos reales de la app.

**Problema 6 — `layout.tsx` referenciaba íconos vacíos:**
`icon: '/icon-192.png'` apuntaba a un archivo de 0 bytes. Actualizado a `favicon-96x96.png` y `web-app-manifest-192x192.png`.

**Commit:** `1b0a770`

---

### 2026-06-05 — Fix: flujo de firmas del rol Mantenimiento + correcciones de UI

#### Contexto

Se realizó una auditoría completa del flujo de firmas y vistas para el rol `mantenimiento` (Mantenimiento / Aislador Competente). Se identificaron y corrigieron 7 bugs distribuidos en 4 archivos. Adicionalmente el usuario aplicó una simplificación de label en `GeneralInfoStep.tsx`.

---

#### Bug 1 — `hasCorrectRole` ignoraba `otherRoles` en `canSign` (UI)

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

**Causa raíz:** La función cliente `hasCorrectRole` solo comparaba `currentUser.role`, ignorando `currentUser.otherRoles`. Los usuarios con `mantenimiento` como rol secundario veían el botón de firma bloqueado en la UI aunque el servidor sí los autorizaba.

```typescript
// Antes
const hasCorrectRole = (targetRole) => {
  if (currentUser.role === 'admin') return true;
  return Array.isArray(targetRole) ? targetRole.includes(currentUser.role) : currentUser.role === targetRole;
};

// Después
const hasCorrectRole = (targetRole) => {
  if (currentUser.role === 'admin') return true;
  const userRoles = [currentUser.role!, ...(currentUser.otherRoles ?? [])];
  return Array.isArray(targetRole) ? userRoles.some(r => targetRole.includes(r)) : userRoles.includes(targetRole);
};
```

---

#### Bug 2 — Query del Dashboard no cubría `selectedWorkTypes.energia`

**Archivo modificado:** `src/app/(app)/dashboard/page.tsx`

**Causa raíz:** La query Firestore del branch `mantenimiento` solo filtraba `controlEnergia == true`. Los permisos creados con el wizard que usan `selectedWorkTypes.energia` no aparecían en el dashboard.

**Fix:** Dos queries independientes mergeadas con `Map<string, Permit>` para deduplicar:

```typescript
const qMant1 = query(permitsCollection, where('controlEnergia', '==', true));
const qMant2 = query(permitsCollection, where('selectedWorkTypes.energia', '==', true));
// merge via Map — último snapshot gana para actualizaciones en tiempo real
```

---

#### Bug 3 — Firestore Rules `allow read` para mantenimiento no cubría `selectedWorkTypes.energia`

**Archivo modificado:** `firestore.rules`

**Causa raíz:** La regla `allow read` para el rol `mantenimiento` solo evaluaba `resource.data.controlEnergia == true`. Un permiso con `selectedWorkTypes.energia == true` generaba "Permission denied" al abrirlo.

**Fix:** Nueva función helper `requiresMaintenanceSign(data)` que usa la API segura de Firestore Rules para acceder a campos anidados opcionales:

```js
function requiresMaintenanceSign(data) {
  return data.controlEnergia == true ||
    (data.keys().hasAny(['selectedWorkTypes']) &&
     data.selectedWorkTypes.get('energia', false) == true);
}
// En allow read:
(hasRole('mantenimiento') && requiresMaintenanceSign(resource.data))
```

---

#### Bug 4 — Badge lateral (sidebar) no cubría `selectedWorkTypes.energia`

**Archivo modificado:** `src/hooks/use-sidebar-badges.ts`

**Causa raíz:** El badge de permisos pendientes para mantenimiento usaba una sola query con `controlEnergia`, perdiendo permisos del wizard nuevo.

**Fix:** Bloque early-return con dos queries independientes mergeadas con doble `Map` (una por query), recalculando el conteo en cada snapshot:

```typescript
if (role === 'mantenimiento') {
  const map1 = new Map<string, Permit>(); // controlEnergia
  const map2 = new Map<string, Permit>(); // selectedWorkTypes.energia
  const calcPending = () => {
    const merged = new Map([...map1, ...map2]);
    const count = Array.from(merged.values()).filter(permit =>
      permit.status === 'pendiente_revision' &&
      permit.approvals?.mantenimiento?.status === 'pendiente' &&
      permit.approvals?.solicitante?.status === 'aprobado'
    ).length;
    setPendingPermits(count);
  };
  // ... dos onSnapshot + retorno de cleanup
}
```

---

#### Bug 5 — Cambio de vista del Dashboard ignoraba `otherRoles`

**Archivo modificado:** `src/app/(app)/dashboard/page.tsx`

**Causa raíz:** La condición para cargar la vista de mantenimiento en el dashboard era `user.role === 'mantenimiento'`, sin verificar `otherRoles`.

```typescript
// Antes
} else if (user.role === 'mantenimiento') {

// Después
} else if (user.role === 'mantenimiento' || (user.otherRoles ?? []).includes('mantenimiento')) {
```

---

#### Bug 6 — `canSign` permitía `en_ejecucion` pero el servidor lo rechazaba

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

**Causa raíz:** El guard de estado cliente incluía `en_ejecucion` como estado válido para firmas de apertura, pero `validateSignaturePermission` en el servidor solo acepta `pendiente_revision` y `borrador`. El usuario veía el botón habilitado, firmaba, y recibía un error del servidor.

```typescript
// Antes: permitía en_ejecucion
if (status !== 'pendiente_revision' && status !== 'borrador' && status !== 'en_ejecucion') { ... }

// Después: alineado con el servidor
if (status !== 'pendiente_revision' && status !== 'borrador') { ... }
```

---

#### Fix — `simpleUser` no incluía `otherRoles` al llamar al servidor

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

**Causa raíz:** El objeto `simpleUser` construido en `handleSaveSignature` antes de llamar `addSignatureAndNotify` omitía `otherRoles`. El servidor rechazaba la firma de usuarios con `mantenimiento` como rol secundario porque `validateSignaturePermission` no recibía ese campo.

```typescript
// Antes
const simpleUser = { uid, displayName, role, empresa };

// Después
const simpleUser = { uid, displayName, role, empresa, otherRoles: currentUser.otherRoles };
```

---

#### Fix — Write-before-validate en `addSignatureAndNotify` para rol `solicitante`

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Causa raíz:** La validación de prerrequisitos (`coordinador_alturas` aprobado antes del solicitante) ocurría **después** de `await docRef.update(updateData)`. Si la validación fallaba, el error se retornaba pero el documento ya había sido escrito parcialmente en Firestore.

**Fix:** Los checks se movieron **antes** del `await docRef.update()`, usando `permitBeforeData` (ya cargado) en lugar de releer el documento después de escribir. Se eliminó también la lectura redundante `docRef.get()` post-update.

```typescript
// Antes (write → validate → posible corrupción)
await docRef.update(updateData);
const updatedPermit = (await docRef.get()).data();
if (... coordinador_alturas?.status !== 'aprobado') return { success: false, error: '...' }; // tarde

// Después (validate → write)
if (permitBeforeData.approvals?.coordinador_alturas?.status !== 'aprobado') {
  return { success: false, error: 'Se requiere primero la firma del Coordinador Alturas.' };
}
await docRef.update(updateData);
```

---

#### Fix (usuario) — Simplificación de label en campo Ejecutante

**Archivo modificado:** `src/app/(app)/permits/create/components/GeneralInfoStep.tsx`

Se renombró el label del campo `nombreSolicitante` de `"Ejecutante del trabajo / Líder del equipo Ejecutante"` a `"Ejecutante del trabajo"` para simplificar la UI.

---

#### Resumen de archivos modificados

| Archivo | Cambios |
|---|---|
| `firestore.rules` | Helper `requiresMaintenanceSign()` + regla `allow read` para mantenimiento con doble campo |
| `src/app/(app)/dashboard/page.tsx` | Dos queries mergeadas para mantenimiento; condición de vista con `otherRoles` |
| `src/app/(app)/permits/[id]/page.tsx` | `hasCorrectRole` con `otherRoles`; guard de estado en `canSign`; `simpleUser` con `otherRoles` |
| `src/app/(app)/permits/actions.ts` | Write-before-validate corregido en `addSignatureAndNotify('solicitante')` |
| `src/app/(app)/permits/create/components/GeneralInfoStep.tsx` | Label `nombreSolicitante` simplificado |
| `src/hooks/use-sidebar-badges.ts` | Dos queries mergeadas con doble Map para badge de mantenimiento |

---

### 2026-06-04 (Sesión 4) — Script: corrección masiva de contraseñas creadas hoy

#### Script `fix-passwords-2026-06-04.ts` — migración puntual de contraseña

Se detectó un error tipográfico en la contraseña con la que fueron creados los 184 usuarios del día: `"Italco2026*"` en lugar de `"Italcol2026*"` (faltaba la `l`). Se creó un script de uso único para corregirlo en lote sin intervención manual.

**Archivo creado:** `scripts/fix-passwords-2026-06-04.ts`

**Comportamiento:**

1. Inicializa Firebase Admin SDK — soporta dos fuentes de credenciales en orden de prioridad:
   - `scripts/serviceAccountKey.json` (opción recomendada para uso local)
   - Variables de entorno `.env`: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
2. Lista **todos** los usuarios de Firebase Auth con paginación automática (`listUsers(1000, pageToken)`) para cubrir proyectos con más de 1000 usuarios.
3. Filtra por rango UTC exacto que cubre el día `2026-06-04` completo en Colombia (UTC-5):
   - Inicio: `2026-06-04T05:00:00Z` (00:00 COL)
   - Fin: `2026-06-05T04:59:59Z` (23:59 COL)
4. Muestra el listado de usuarios afectados con hora local Colombia antes de aplicar.
5. Countdown de 5 segundos con posibilidad de cancelar con `Ctrl+C`.
6. Actualiza cada contraseña con `auth.updateUser(uid, { password: NEW_PASSWORD })` e imprime progreso `[N/Total]`.
7. Resumen final con conteo de éxitos y errores.

**Modo dry-run** (no aplica cambios, solo muestra la lista):
```powershell
$env:DRY_RUN="true"; npx tsx scripts/fix-passwords-2026-06-04.ts
```

**Ejecución real:**
```powershell
npx tsx scripts/fix-passwords-2026-06-04.ts
```

**Resultado:** 184 usuarios actualizados exitosamente. El script es idempotente — se puede volver a ejecutar sin riesgo si algún usuario falla.

---

### 2026-06-04 (Sesión 3) — Feat: cambio de contraseña de usuarios desde el panel de administración

#### Feat: el administrador puede cambiar la contraseña de cualquier usuario

Se implementó la capacidad para que el rol `admin` cambie la contraseña de cualquier usuario existente directamente desde `/admin/users`, sin necesidad de conocer la contraseña actual (privilegio del Admin SDK de Firebase).

**Archivos modificados:**

| Archivo | Cambio |
|---|---|
| `src/app/(app)/admin/users/actions.ts` | Nueva server action `changeUserPassword(uid, newPassword)` |
| `src/app/(app)/admin/users/page.tsx` | Botón `KeyRound` en tabla + Dialog modal completo |

**Server action `changeUserPassword`** (`actions.ts`):
- Valida longitud mínima de 6 caracteres en el servidor antes de llamar a Firebase
- Usa `auth.updateUser(uid, { password: newPassword })` del Admin SDK — no requiere contraseña actual
- Manejo de error específico para `auth/invalid-password`

**UI en la tabla de usuarios** (`page.tsx`):
- Botón **`KeyRound`** (color ámbar) añadido entre Editar (azul) y Eliminar (rojo), visible al hacer hover sobre la fila
- `changePasswordSchema` (Zod): mínimo 6 caracteres + `.refine()` que valida que ambas contraseñas coincidan
- `passwordForm` con `react-hook-form` + `zodResolver`
- Dialog modal con:
  - Tarjeta de info del usuario (nombre, email, badge de rol) en modo read-only
  - Campo **Nueva contraseña** con toggle Eye/EyeOff
  - Campo **Confirmar contraseña** con toggle Eye/EyeOff
  - Estado de carga en el botón de submit
  - Toast de éxito o error al completar
- Estados locales: `isPasswordModalOpen`, `passwordTargetUser`, `showNewPassword`, `showConfirmPassword`, `isChangingPassword`

---

### 2026-06-04 (Sesión 2) — Submódulo Análisis & Métricas (ML) — Módulo Confinados

#### Feat: nuevo submódulo `/confinados/analisis` con análisis avanzado de datos

Se implementó un dashboard analítico completo que consume los registros de `diagnosticosConfinados` y los procesa con estadística descriptiva, K-Means clustering, regresión lineal y detección de anomalías. El motor de análisis (`confinados-analytics.ts`) ya existía; esta sesión construyó toda la capa de visualización.

**Archivos creados:**

| Archivo | Descripción |
|---|---|
| `src/app/(app)/confinados/analisis/page.tsx` | Página cliente completa del submódulo (~530 líneas) |

**Archivo modificado:**

| Archivo | Cambio |
|---|---|
| `src/app/(app)/confinados/page.tsx` | Añadida tarjeta "Análisis & Métricas" (ícono `Brain`, color `bg-indigo-600`); "Historial & Seguimiento" cambiado a `bg-sky-500` |

**Secciones del dashboard:**

| Sección | Descripción técnica |
|---|---|
| **Barra de filtros** | Filtros reactivos por Organización, Planta/Sede, Año, Estado — filtrado client-side sobre el snapshot de Firestore |
| **KPI Cards (×4)** | Total registros · Cumplimiento promedio (con badge de tendencia) · Alto Riesgo (≤50%) · Cumplen (>70%) |
| **Distribución de Riesgo** | `PieChart` donut (innerRadius 52) con percentiles P25/P75/σ y mini progress bars |
| **Segmentación K-Means** | Visualiza los 3 clusters devueltos por `kMeansCluster()` con centroid heatmap de colores semafóricos por dimensión |
| **Cumplimiento por Dimensión** | `BarChart` horizontal apilado (Cumple vs No cumple) con labels de porcentaje a la derecha |
| **Radar de perfil SST** | `RadarChart` con 7 ejes (una por dimensión de la norma) |
| **Tendencia temporal** | `LineChart` con 3 series: promedio real, media móvil 3m, regresión lineal; muestra pendiente, R² y pronóstico 3m |
| **Clasificación de espacios** | `BarChart` por Tipo (1/2) y Grado (A/B/C) con colores semafóricos (A=rojo, B=ámbar, C=verde) |
| **Equipos críticos & protocolos** | Barras de disponibilidad para 6 equipos; indicadores IPER%, alto riesgo adicional%, completados%; ranking "Desarrollada por" |
| **Comparativa por organización** | Tabla con mini progress-bar, `RiskBadge`, y % por cada dimensión SST con colores semafóricos |
| **Detección de anomalías** | Lista de registros con z-score < −2 (crítico) o > +2 (outlier); muestra empresa, planta, fecha, dimensiones débiles |
| **Recomendaciones prioritarias** | Motor de reglas de `confinados-analytics.ts`; código de colores por prioridad (1=rojo, 2=ámbar, 3=azul) |

**Estado vacío y loading:** skeleton con `Loader2` animado mientras carga Firestore; empty state con opción de limpiar filtros.

**`computeAdditionalStats()`** — función local que calcula métricas extra desde el raw data:
- `tipoEspacio` / `gradoPeligrosidad`: frecuencia por categoría
- `equiposCriticos`: % de registros donde cada equipo tiene `"Se utiliza"` en el array
- `desarrolladaPor`: flatten de arrays + conteo de frecuencia; top 7
- `iperRate`, `altoRiesgoAdicionalRate`, `completadoRate`: porcentajes booleanos

**Acceso al submódulo:** requiere rol `lider_sst`, `asesor_arl`, `autorizante`, `admin` o `lider_regional` (misma regla `canAccessConfinados()` de Firestore).

---

### 2026-06-04 (Sesión 1) — Módulo Confinados: Hub + Submódulo Diagnóstico completo

#### Feat: módulo Confinados con hub de navegación, submódulo Diagnóstico y motor de análisis

Se implementó el módulo completo de espacios confinados desde cero. El módulo sigue el patrón de submódulos del resto del sistema (hub + cards de navegación) y expone un formulario de diagnóstico detallado conforme a la norma GTC 34.

**Archivos creados:**

| Archivo | Descripción |
|---|---|
| `src/types/confinados.ts` | Tipos `DiagnosticoConfinado`, `DiagnosticoResultados`, `calcDiagnosticoScore()` |
| `src/lib/confinados-service.ts` | CRUD Firestore: `createDiagnostico`, `getDiagnostico`, `getDiagnosticos`, `updateDiagnostico`, `deleteDiagnostico` |
| `src/lib/analytics/confinados-analytics.ts` | Motor de análisis ML: K-Means clustering, regresión lineal, Z-score, recomendaciones (612 líneas) |
| `src/hooks/use-diagnosticos.ts` | Hook `useDiagnosticos()` con listener `onSnapshot` en tiempo real |
| `src/hooks/use-dynamic-lists.ts` | Hook para listas dinámicas de Firestore (`dynamic_lists`) |
| `src/app/(app)/confinados/page.tsx` | Hub con cards de navegación a los submódulos |
| `src/app/(app)/confinados/diagnostico/page.tsx` | Lista con búsqueda, ordenamiento y paginación |
| `src/app/(app)/confinados/diagnostico/[id]/page.tsx` | Vista de detalle con score panel, grupos acordeón y firma |
| `src/app/(app)/confinados/diagnostico/nuevo/page.tsx` | Formulario de creación (5 grupos acordeón) |
| `src/app/(app)/confinados/diagnostico/actions.ts` | Server actions: guardar, eliminar, obtener diagnóstico |
| `src/app/(app)/confinados/diagnostico/importar/page.tsx` | UI de importación masiva desde Excel |
| `src/app/(app)/confinados/diagnostico/importar/actions.ts` | Validación de columnas y batch import (XLSX library) |

**Archivos modificados:**

| Archivo | Cambio |
|---|---|
| `src/app/(app)/layout.tsx` | Añadido grupo "Confinados" al sidebar con ítems Diagnóstico, Análisis e Historial |
| `firestore.rules` | Nueva colección `diagnosticosConfinados`: acceso por rol con función `canAccessConfinados()`; asesor_arl ve solo los suyos; lider_sst ve los de su planta; admin/lider_regional acceso total |

**Modelo de datos — `diagnosticosConfinados`:**

| Grupo | Campos clave |
|---|---|
| Metadata | `createdAt`, `createdById`, `createdByName`, `status` (borrador/completado) |
| Datos generales | `fecha`, `planta`, `proceso`, `empresa`, `contratista` |
| Descripción actividad | `actividadAnalizada`, `alturaPromedio`, `desarrolladaPor[]`, `tieneAltoRiesgoAdicional`, `actividadesAltoRiesgo[]` |
| Evaluación | `evaluadaEnIPER`, `tipoEspacioConfinado`, `gradoPeligrosidad`, `medidasPrevencion[]`, `monitoreoPrevioIngreso`, `cuentaConProcedimiento`, `metodologiaBloqueoEnergias` |
| Equipos/EPP | 13 campos `string[]` (escaleraFosaVertical, tripodeEquipoRescate, equipoComunicacion, sistemaVentilacionMecanica, etc.) |
| Firma | `nombreSST`, `firmaSST` (base64 JPEG), `nombreResponsable`, `firmaResponsable` |
| Resultados calculados | `resultados.{identificacionPeligros, permisosDeTrabajo, gestionMedidasPrevencion, monitoreoDeLaAtmosfera, procedimientoEspaciosConfinados, manejoEnergiasPeligrosas, planDeEmergencias, sumaTotal}` |

**Sistema de puntuación (calcDiagnosticoScore):**

Cada dimensión vale 0 o 2 puntos. Máximo 14 pts = 100%.

| Dimensión | Trigger |
|---|---|
| Identificación de Peligros | `evaluadaEnIPER === 'Si'` |
| Permisos de Trabajo | `medidasPrevencion` es exactamente "Permiso de trabajo" |
| Gestión Medidas Prevención | `medidasPrevencion` incluye "Permiso de trabajo" + otros |
| Monitoreo Atmósfera | `monitoreoPrevioIngreso === 'Si'` |
| Procedimiento EC | `cuentaConProcedimiento === 'Si'` |
| Manejo Energías Peligrosas | `metodologiaBloqueoEnergias === 'Si'` |
| Plan de Emergencias | `equipoPrimerosAuxilios` contiene "Se utiliza" |

**Clasificación de riesgo:** Alto (≤50%) · Riesgo Medio (50–70%) · Cumple (>70%)

**Motor de análisis `confinados-analytics.ts` — funciones implementadas:**

| Función | Técnica |
|---|---|
| `kMeansCluster(points, K=3)` | K-Means++ con semilla determinista (0.37 / 0.618 golden ratio), max 150 iteraciones |
| `linearRegression(x, y)` | Regresión por mínimos cuadrados; devuelve slope, intercept, R² |
| `computeTrend()` | Agrupación mensual (YYYY-MM), media móvil 3 meses, predicción lineal, dirección |
| `detectAnomalies()` | Z-Score: crítico si z < −2, outlier_high si z > +2; requiere mínimo 5 registros |
| `generateRecommendations()` | 8 recomendaciones predefinidas por dimensión + recomendación general si >30% en alto riesgo |
| `computeOrgStats()` | Estadísticas por empresa con avg, riskLevel y desglose por dimensión |
| `analyzeConfinados(data)` | Función principal que coordina todo y retorna `AnalyticsResult` |

**Importación Excel:** mapeo de 81+ alias de columnas (insensible a tildes/mayúsculas), validación Zod por fila, preview de errores y batch import vía Admin SDK.

**Seguridad Firestore (`diagnosticosConfinados`):**

```js
function canAccessConfinados() {
  return isSignedIn() && (isAdminOrLR() || hasRole('lider_sst') || hasRole('asesor_arl') || hasRole('autorizante'));
}
// get: asesor_arl solo ve los suyos (createdById == uid); lider_sst ve los de su planta
// create: createdById debe coincidir con request.auth.uid
// update: creador, admin, lider_regional o lider_sst
// delete: solo admin/lider_regional
```

---

### 2026-05-28 (Sesión 2) — Fix: rol mantenimiento no veía permisos en la lista

#### Fix crítico: query Firestore de la lista de permisos no cubría `selectedWorkTypes.energia`

**Archivo modificado:** `src/app/(app)/permits/page.tsx`

**Causa raíz:** La query Firestore en el branch `mantenimiento` del `useEffect` de permisos usaba `where('controlEnergia', '==', true)`. Los permisos creados con el wizard actual guardan el tipo de trabajo en `selectedWorkTypes.energia = true` y dejan `controlEnergia` en `undefined`. Firestore no devolvía esos documentos, así que el usuario de mantenimiento veía la lista vacía aunque hubiera permisos pendientes de su firma.

**Cambios aplicados:**

1. **Query Firestore corregida** — se importó `or` de `firebase/firestore` y se cambió:
   ```typescript
   // Antes (solo permisos legacy)
   query(permitsCollection, where('controlEnergia', '==', true))

   // Después (cubre campo legacy y campo nuevo del wizard)
   query(permitsCollection, or(
     where('controlEnergia', '==', true),
     where('selectedWorkTypes.energia', '==', true),
   ))
   ```

2. **Historial expandido** — `allPermits` para el rol `mantenimiento` ahora incluye todos los permisos de control de energía de su planta (no solo los pendientes de firma). Antes, al firmar un permiso desaparecía de la vista y las tabs Activos / Cerrado / Cancelado siempre mostraban 0.

3. **Filtro de tab "Pendiente" mantenido** — en `filteredPermits` se agregó una condición específica para el rol `mantenimiento`: en la tab "Pendiente" solo se muestran los permisos donde el solicitante ya firmó y mantenimiento aún no, conservando el comportamiento de "bandeja de acciones pendientes".

4. **Borradores ajenos excluidos** — se añadió `.filter(p => p.status !== 'borrador' || p.createdBy === user.uid)` para que los borradores de otros usuarios no aparezcan en la lista del rol mantenimiento.

**Comportamiento resultante por tab:**

| Tab | Antes | Ahora |
|---|---|---|
| Pendiente | Solo permisos legacy (`controlEnergia`) que requieren firma | Todos los permisos de energía que requieren su firma |
| Activos | Siempre 0 | Permisos de energía en ejecución / suspendidos de su planta |
| Cerrado | Siempre 0 | Historial de permisos cerrados |
| Cancelado | Siempre 0 | Historial de permisos cancelados |

---

### 2026-05-28 — Auditoría y corrección completa del pipeline de notificaciones para rol Mantenimiento/Aislador + soporte de doble rol

#### Contexto

Se realizó una auditoría exhaustiva del sistema de notificaciones para el rol `mantenimiento` (Mantenimiento / Aislador Competente). Se identificaron y corrigieron 10 problemas — 2 críticos, 3 altos y 5 de severidad media/baja — que podían dejar permisos en espera de firma sin que ningún usuario de ese rol fuera notificado correctamente. Adicionalmente se implementó soporte completo de **doble rol** (`otherRoles`) en todo el pipeline de notificaciones y validación de firma.

---

#### Fix crítico (NOTIF-001): Regla Firestore para `mantenimiento` no cubría `selectedWorkTypes.energia`

**Archivo modificado:** `src/firestore.rules`

**Causa raíz:** La condición `allow read` para el rol `mantenimiento` solo evaluaba `resource.data.controlEnergia == true`. La función `requiresMaintenanceSignature()` del servidor acepta también `selectedWorkTypes.energia === true`. Si un permiso usaba únicamente `selectedWorkTypes.energia`, el usuario de mantenimiento recibía la notificación pero obtenía "Permission denied" al intentar abrir el permiso.

```js
// Antes
(hasRole('mantenimiento') && resource.data.controlEnergia == true)

// Después
(hasRole('mantenimiento') &&
  (resource.data.controlEnergia == true ||
   resource.data.selectedWorkTypes.energia == true))
```

---

#### Fix crítico (NOTIF-002): `processOfflineQueue` no llamaba a `notifyMantenimientoIfRequired`

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Causa raíz:** Al sincronizar permisos creados/firmados offline, `processOfflineQueue()` solo llamaba `notifyUsers()` con mensaje genérico. El usuario de Mantenimiento/Aislador nunca recibía el correo específico `[SGTC] Firma requerida — Mantenimiento/Aislador`. Impacto crítico en operaciones de campo con red intermitente.

```typescript
// Después: se agrega la llamada específica al reconectar
if (item.type === 'permit_created' || item.type === 'permit_signed') {
  const permitUrl = `${baseUrl}/permits/${permit.id}`;
  await notifyMantenimientoIfRequired(permit, triggeredBy, permitUrl);
}
```

---

#### Feat: Helper `getDocsByRole()` — soporte de doble rol en todo el pipeline

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

Nueva función `getDocsByRole(role)` que ejecuta dos queries en paralelo (`role ==` y `otherRoles array-contains`) y devuelve documentos únicos. Es la fuente única de verdad para todas las consultas de rol en notificaciones.

```typescript
async function getDocsByRole(role): Promise<QueryDocumentSnapshot[]> {
  const [primarySnap, otherSnap] = await Promise.all([
    adminDb.collection('users').where('role', '==', role).get(),
    adminDb.collection('users').where('otherRoles', 'array-contains', role).get(),
  ]);
  // deduplica y retorna array plano
}
```

**Impacto:** usuarios con `role: 'autorizante'` y `otherRoles: ['mantenimiento']` (o cualquier combinación) ahora reciben notificaciones para ambos roles y pueden firmar los slots correspondientes en sus permisos.

---

#### Fix (NOTIF-005 + doble rol): `getMantenimientoUserIds()` reescrita

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

Dos correcciones:
1. Usa `getDocsByRole('mantenimiento')` para incluir usuarios con el rol como secundario.
2. El filtro de empresa ahora se evalúa **independientemente de la planta**. Antes, si el permiso no tenía planta, se incluían todos los usuarios de mantenimiento sin importar empresa (cross-company spam).

---

#### Fix (doble rol): `validateSignaturePermission` — caso `mantenimiento`

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

Un usuario con `otherRoles: ['mantenimiento']` ahora puede firmar el slot de mantenimiento. Se añadió `otherRoles?: UserRole[]` al parámetro `currentUser` de `addSignatureAndNotify` y `validateSignaturePermission`.

```typescript
// Antes
if (currentUser.role !== 'mantenimiento' && currentUser.role !== 'admin') { ... }

// Después
const hasMantenimientoRole =
  currentUser.role === 'mantenimiento' ||
  currentUser.role === 'admin' ||
  (currentUser.otherRoles || []).includes('mantenimiento');
if (!hasMantenimientoRole) { ... }
```

---

#### Fix (doble rol): `getInvolvedUsers()` — todas las queries de rol actualizadas

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

Las cinco queries de rol dentro de `getInvolvedUsers()` (`autorizante`, `lider_sst`, `mantenimiento`, `coordinador_alturas`, `supervisor_confinado`) ahora usan `getDocsByRole()`. `addUsersMatchingPlant` actualizada para recibir `QueryDocumentSnapshot[]`.

---

#### Fix (NOTIF-004): `sendPushToUser` ahora se awaita en `createNotification`

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

La llamada a `sendPushToUser()` pasó de fire-and-forget a `await`. En entornos serverless (Firebase App Hosting / Vercel), una Promise sin await puede perderse antes de que el runtime responda.

---

#### Fix (NOTIF-006/007/008): correcciones múltiples en `notifyMantenimientoIfRequired`

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

| Fix | Cambio |
|---|---|
| NOTIF-007 | Mensaje dinámico según rol real del disparador (antes siempre decía "el ejecutante") |
| NOTIF-008 | `recipientIds` filtrado se usa tanto para in-app como para email (antes el email usaba la lista sin filtrar) |
| NOTIF-006 | Si `sendGroupEmail()` falla, se loguea el error con los destinatarios para trazabilidad |

---

#### Fix (NOTIF-009): `createPermit()` ahora llama a `notifyMantenimientoIfRequired`

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

La server action `createPermit()` (que crea el permiso directamente en `pendiente_revision`) ahora dispara la notificación específica de "firma requerida" para Mantenimiento/Aislador, igualando el comportamiento del flujo principal `savePermitDraft` → `addSignatureAndNotify`.

---

#### Fix (NOTIF-003): `AlertsBell` — query con `isRead: false` + `orderBy`

**Archivo modificado:** `src/components/AlertsBell.tsx`

La query de Firestore ahora filtra directamente `where('isRead', '==', false)` con `orderBy('createdAt', 'desc')` y `limit(30)`. Antes usaba `limit(50)` sin orden, lo que podía excluir notificaciones recientes si el usuario tenía muchos documentos acumulados.

> **Índice requerido:** `notifications` → `userId ASC + isRead ASC + createdAt DESC` (crear manualmente en Firebase Console o se solicita automáticamente la primera ejecución).

---

#### Fix (NOTIF-010): `handleMarkAllAsRead` usa `writeBatch`

**Archivo modificado:** `src/components/AlertsBell.tsx`

Reemplazado `Promise.all(individual updateDoc)` por `writeBatch(db)`. Operación atómica: o todas las notificaciones se marcan como leídas o ninguna, sin riesgo de actualizaciones parciales.

---

#### Resumen de archivos modificados

| Archivo | Cambios |
|---|---|
| `src/firestore.rules` | Regla `allow read` para mantenimiento: agrega `selectedWorkTypes.energia == true` |
| `src/app/(app)/permits/actions.ts` | `getDocsByRole`, `getInvolvedUsers`, `getMantenimientoUserIds`, `createNotification`, `notifyMantenimientoIfRequired`, `validateSignaturePermission`, `addSignatureAndNotify`, `createPermit`, `processOfflineQueue` |
| `src/components/AlertsBell.tsx` | Query Firestore, `handleMarkAllAsRead` |

---

### 2026-05-27 (Sesión 2) — Suspensión/reactivación de permisos con trazabilidad completa

#### Feat: flujo completo de suspensión y reactivación de permisos

El cliente solicitó que el Líder SST (u otros roles autorizados) pudiera suspender temporalmente un permiso en ejecución — por ejemplo, cuando un trabajador no cuenta con el EPP requerido — y reactivarlo una vez resuelto el problema.

**Archivos modificados:** `src/types/index.ts`, `src/app/(app)/permits/actions.ts`, `src/app/(app)/permits/[id]/page.tsx`

**Cambios en `src/types/index.ts`:**
- Nuevo tipo `SuspensionInfo`:
  ```typescript
  export type SuspensionInfo = {
    suspendedBy: { uid: string; displayName: string | null; role: UserRole };
    suspendedAt: Timestamp;
    reason: string;
  };
  ```
- Campo opcional `suspension?: SuspensionInfo` añadido al tipo `Permit`

**Cambios en `src/app/(app)/permits/actions.ts`:**
- En `updatePermitStatus`, al transicionar a `suspendido`:
  - Valida que `reason` no esté vacío (retorna error si falta)
  - Escribe el objeto `suspension` en Firestore con `FieldValue.serverTimestamp()` para `suspendedAt`
- Mensaje de notificación enriquecido: incluye nombre del usuario que suspendió y el motivo

**Cambios en `src/app/(app)/permits/[id]/page.tsx`:**

| Elemento | Descripción |
|---|---|
| `canSuspend` | `true` cuando `status === 'en_ejecucion'` y rol es `lider_sst`, `autorizante`, `admin` o `lider_regional` |
| `canReactivate` | `true` cuando `status === 'suspendido'` y mismo conjunto de roles |
| Botón "Suspender" (naranja) | Aparece en el header cuando `canSuspend`; abre el diálogo de suspensión |
| Botón "Reactivar" (verde) | Aparece en el header cuando `canReactivate`; abre el AlertDialog de confirmación |
| Diálogo de suspensión | Muestra nombre del usuario y fecha/hora actuales (read-only); campo de motivo obligatorio; botón "Confirmar Suspensión" |
| AlertDialog de reactivación | Muestra el motivo original de la suspensión como recordatorio de que el problema debe estar resuelto antes de reactivar |
| Banner naranja informativo | Visible para todos cuando el permiso está suspendido; muestra quién lo suspendió, cuándo y por qué; incluye instrucción de reactivación solo si el usuario tiene el rol adecuado |

**Nota de arquitectura:** Las transiciones de estado `en_ejecucion → suspendido` y `suspendido → en_ejecucion` ya existían en `validateStateTransition` desde la implementación anterior. Esta sesión solo añadió la capa de datos (`SuspensionInfo`) y la UI faltante.

---

#### Fix(UI): tarjeta de firma de Mantenimiento reubicada antes de Autorizante

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

El orden visual de las tarjetas de firma ahora refleja el orden cronológico real de firmas:

```
Solicitante → Líder SST (si aplica) → Mantenimiento (si aplica) → Autorizante
```

Cambio de una línea: intercambiadas las posiciones de `<SignatureCard role="mantenimiento" />` y `<SignatureCard role="autorizante" />` en el JSX. Sin cambios de lógica.

---

### 2026-05-27 — Compresión de firmas, notificaciones de cierre y correcciones de errores

#### Fix: "Error al Guardar - Load failed" al guardar firmas de revalidación diaria y trabajadores

**Causa raíz:** Las firmas exportadas como PNG sin comprimir ocupaban entre 150–300 KB cada una. Con múltiples trabajadores × firmas de apertura y cierre × validaciones diarias de varios anexos, el documento Firestore superaba el límite de 1 MB.

**Archivos modificados:** `src/components/ui/signature-pad.tsx`, `src/lib/pdf-generators.ts`, `src/lib/pdf-hallazgo.ts`

**Cambios:**

1. **`signature-pad.tsx` — compresión JPEG:** `handleSave()` ahora renderiza la firma sobre un canvas con fondo blanco y exporta como JPEG al 50% de calidad (`toDataURL('image/jpeg', 0.5)`). Resultado: ~10–20 KB por firma (reducción ~10–15×). La verificación de canvas en blanco sigue usando PNG (sin cambio).

2. **`pdf-generators.ts` — auto-detección de formato:** `drawSignatureImage()` cambia de `'PNG'` hardcodeado a detección automática:
   ```typescript
   const fmt = signature.startsWith('data:image/jpeg') ? 'JPEG' : 'PNG';
   doc.addImage(signature, fmt, x, y, width, height);
   ```
   Retrocompatible — firmas antiguas en PNG siguen funcionando correctamente.

3. **`pdf-hallazgo.ts` — mismo fix:** misma detección de formato en el generador PDF de hallazgos.

---

#### Fix: "Server Action not found" al guardar firmas de trabajador, validación diaria y cierre diario

**Causa raíz:** Después de varios deploys recientes, los hashes de Server Actions compilados cambiaron. El navegador del usuario tenía cacheado el bundle antiguo con IDs que ya no existen en el servidor. El handler `handleStaleServerActionError` ya existía y funcionaba en `handleSaveSignature` y `handleChangeStatus`, pero no se usaba en los demás handlers de firma.

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

**Cambios:** Se añadió `handleStaleServerActionError` a los tres catch blocks faltantes:

| Handler | Antes | Después |
|---|---|---|
| `handleSaveWorkerSignature` | Toast rojo con mensaje crudo | Detecta stale action → toast azul + recarga automática |
| `handleSaveDailyValidationSignature` | Toast rojo con mensaje crudo | Detecta stale action → toast azul + recarga automática |
| `handleSaveDailyClosureSignature` | Toast rojo con mensaje crudo | Detecta stale action → toast azul + recarga automática |

**Solución inmediata para usuarios afectados:** hard refresh con `Ctrl + Shift + R`.

---

#### Feat: notificación email + in-app a Mantenimiento/Aislador cuando se requiere su firma

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Contexto:** El cliente solicitó que el usuario de Mantenimiento reciba un correo y alerta en la app cuando debe firmar (permisos con Control de Energías). El momento correcto es cuando el solicitante firma y el permiso entra a `pendiente_revision`.

**Cambios:**

1. **Nueva función `getMantenimientoUserIds(permit)`:** consulta usuarios con `role === 'mantenimiento'`, filtra por planta/empresa del permiso usando la misma lógica que `addUsersMatchingPlant` (usuarios sin planta = rol global, siempre incluidos).

2. **Nueva función `notifyMantenimientoIfRequired(permit, triggeredBy, permitUrl)`:**
   - Guarda si `requiresMaintenanceSignature(permit)` es `false` → no notifica
   - Guarda si la firma de mantenimiento ya está `'aprobado'` → idempotente
   - Envía notificación in-app (tipo `'signature'`) a cada usuario de mantenimiento coincidente
   - Envía email agrupado (BCC) con asunto `[SGTC] Firma requerida — Mantenimiento/Aislador — Permiso #XXX`

3. **Punto de disparo:** llamada a `notifyMantenimientoIfRequired` en los dos bloques donde se produce la transición `borrador → pendiente_revision` (firma directa del solicitante y firma previa de coordinador/supervisor).

---

#### Feat: notificación email + in-app a Autoridad del Área cuando debe firmar el cierre

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Contexto:** Al completar el proceso de cierre, el Responsable del Trabajo firma primero (`cierre_responsable`). El Autorizante (Autoridad del Área) no recibía ningún aviso de que debía firmar el cierre.

**Cambios:**

1. **Nueva función `notifyAutorizanteForClosure(permit, triggeredBy, permitUrl)`:**
   - Retorna inmediatamente si `closure.autoridad.firma` ya existe (idempotente)
   - Obtiene el ID del autorizante desde `permit.approvals.autorizante.userId` (el usuario específico que aprobó la apertura)
   - Retorna si el autorizante es el mismo que firmó como responsable (evita auto-notificación)
   - Envía notificación in-app (tipo `'signature'`)
   - Envía email con asunto `[SGTC] Firma de cierre requerida — Autoridad del Área — Permiso #XXX`

2. **Punto de disparo:** llamada a `notifyAutorizanteForClosure` inmediatamente después de `docRef.update(updateData)` dentro del bloque `role === 'cierre_responsable'`.

---

#### Fix: botón "Activar Permiso" visible solo para administradores + banner informativo

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

**Contexto:** El botón "Activar Permiso" aparecía para `autorizante` además de `admin`, generando confusión. En el flujo normal, la auto-transición `pendiente_revision → en_ejecucion` maneja el cambio automáticamente cuando el autorizante firma. El botón es un escape hatch para casos edge (permisos históricos o firmas offline sin sincronización de estado).

**Cambios:**

1. **`canManuallyActivate` restringido a `admin`:**
   ```typescript
   // Antes: currentUser?.role === 'admin' || currentUser?.role === 'autorizante'
   const canManuallyActivate =
     permit?.status === 'pendiente_revision' &&
     currentUser?.role === 'admin' &&
     allRequiredSignaturesComplete();
   ```

2. **Banner ámbar informativo** visible al inicio del detalle del permiso, solo cuando `canManuallyActivate` es `true`:
   - Explica que el permiso tiene todas las firmas completas pero no auto-transitó
   - Describe los dos casos que producen esto: (1) permiso histórico anterior a la auto-transición, (2) firma offline sin sincronización de estado
   - Solo visible para admins — no genera confusión en otros roles

---

### 2026-05-25 — Validaciones de trabajadores antes de firmas finales y persistencia de borrador

#### Fix: firma de mantenimiento no aparecía cuando el trabajo de energías venía de `selectedWorkTypes`

**Problema:** La condición para mostrar la firma de mantenimiento solo evaluaba `permit.controlEnergia`. Si el trabajo de control de energías había sido marcado a través de `permit.selectedWorkTypes.energia` (la ruta más nueva del wizard), la firma no se mostraba en la vista de detalle, no se exigía en `canOpenPermit` y no se registraba como requerida en el servidor.

**Archivos modificados:** `src/app/(app)/permits/[id]/page.tsx`, `src/app/(app)/permits/actions.ts`, `src/lib/offline-permits.ts`

**Cambios:**
- Nueva función helper `requiresMaintenanceSignature(permit)` → `permit.controlEnergia === true || permit.selectedWorkTypes?.energia === true`
- Reemplaza todos los usos directos de `permit.controlEnergia` en las 3 capas: UI (`[id]/page.tsx`), servidor (`actions.ts`) y flujo offline (`offline-permits.ts`)
- Cubre: visibilidad de `<SignatureCard role="mantenimiento">`, bloqueo de `canOpenPermit`, `checkAllRequiredSignaturesComplete` y `validateSignaturePermission`

---

#### Fix: seguridad social (EPS/ARL/Pensión) requerida antes de guardar trabajador y enviar permiso

**Problema:** Era posible agregar un trabajador al formulario sin EPS, ARL o Pensión, y el permiso se podía enviar con esos campos vacíos. El permiso quedaba en Firestore sin los datos de seguridad social del personal expuesto.

**Archivos modificados:** `src/app/(app)/permits/create/page.tsx`, `src/app/(app)/permits/actions.ts`, `src/lib/offline-permits.ts`

**Cambios:**

1. **Validación al guardar trabajador** (`create/page.tsx`): antes de agregar un trabajador al array `workers`, se llama `getMissingSocialSecurityFields(currentWorker)`. Si hay campos faltantes, se muestra un toast destructivo y se bloquea el guardado.

2. **Labels marcados como requeridos** (`create/page.tsx`): los campos EPS, ARL y Pensión ahora muestran `*` rojo en su label.

3. **Validación antes de enviar** (`create/page.tsx`): `handleSubmitPermit()` valida que todos los trabajadores en `normalizedWorkers` tengan EPS/ARL/Pensión completos. Si alguno falta, toast descriptivo que nombra al trabajador y los campos pendientes.

4. **Validación servidor** (`actions.ts`): `addSignatureAndNotify` cuando `role === 'solicitante'` verifica `getWorkersWithMissingSocialSecurity(workersForValidation)` antes de procesar la firma. Retorna `{ success: false, error }` si hay datos incompletos.

5. **Parity offline** (`offline-permits.ts`): misma validación en `addSignatureOffline`.

---

#### Fix: firma del solicitante no se propagaba a `workers[0].firmaApertura`

**Problema:** Al firmar el solicitante en el paso de firma del wizard, la firma se guardaba en `state.solicitanteFirmaApertura` pero **no** en `workers[0].firmaApertura`. Las validaciones posteriores que iteran `workers` para verificar firmas de apertura fallaban porque `workers[0]` siempre aparecía sin firma, bloqueando el envío del permiso.

**Archivos modificados:** `src/app/(app)/permits/create/form-context.tsx`, `src/app/(app)/permits/create/page.tsx`, `src/app/(app)/permits/actions.ts`, `src/lib/offline-permits.ts`

**Cambios:**
- `form-context.tsx`: en el reducer `SET_SOLICITANTE_FIRMA_APERTURA`, además de actualizar `solicitanteFirmaApertura`, copia la firma a `workers[0].firmaApertura` (si existe).
- `create/page.tsx` y `actions.ts`: `handleSubmitPermit()` construye `normalizedWorkers` que aplica la firma del solicitante a `workers[0]` antes de las validaciones y el envío, cubriendo el caso de borradores existentes cargados desde Firestore donde el reducer ya no se re-ejecuta.
- `offline-permits.ts`: `addSignatureOffline` para rol `solicitante` copia igualmente la firma a `workers[0]`.

---

#### Fix: número de trabajadores registrados no coincidía con el campo `numTrabajadores`

**Problema:** Un solicitante podía declarar N trabajadores adicionales en los datos generales pero agregar más o menos en el paso de trabajadores, enviando el permiso con una inconsistencia entre el campo declarado y los trabajadores reales.

**Archivos modificados:** `src/app/(app)/permits/create/page.tsx`, `src/app/(app)/permits/actions.ts`, `src/lib/offline-permits.ts`

**Cambios:**
- Nueva función `getWorkerCountMismatch(workers, numTrabajadores)`: compara `workers.length - 1` (excluyendo al solicitante que es el índice 0) contra `parseInt(numTrabajadores)`.
- Validación cliente en `handleSubmitPermit()`: toast destructivo si hay discrepancia.
- Validación servidor en `addSignatureAndNotify` (rol `solicitante`): retorna `{ success: false, error }` si hay discrepancia.
- Parity offline en `addSignatureOffline`.

---

#### Fix: borrador existente no se persistía antes de las firmas finales

**Problema:** `handleSubmitPermit()` solo llamaba `savePermitDraft()` cuando `!currentPermitId` (permiso nuevo sin ID). Si el usuario había abierto un borrador existente (`?edit=<id>`) y navegado hasta el paso de firma sin guardar manualmente, los cambios realizados en esa sesión (nuevos trabajadores, anexos actualizados, etc.) **no se guardaban** antes de que el permiso transitara a `pendiente_revision`. Firestore quedaba con el estado anterior del borrador.

**Archivo modificado:** `src/app/(app)/permits/create/page.tsx`

**Cambio:** `savePermitDraft()` ahora se llama **siempre** antes de registrar la firma final, tanto para permisos nuevos como para borradores existentes. Se pasa `draftId: currentPermitId || undefined` para actualizar el documento correcto. Si el guardado falla, se lanza error y el proceso se detiene antes de tocar `addSignatureAndNotify`.

```typescript
// Antes: solo guardaba si era nuevo
if (!currentPermitId) {
  const draftResult = await savePermitDraft({ ... });
  ...
}

// Después: siempre guarda el estado completo primero
const draftResult = await savePermitDraft({
  ...normalizedFormData,
  draftId: currentPermitId || undefined,
});
if (!draftResult.success || !draftResult.permitId) {
  throw new Error(draftResult.error || "No se pudo guardar el borrador actualizado.");
}
currentPermitId = draftResult.permitId;
```

---

#### Fix: emails rechazados por cuentas suprimidas en Resend

**Problema:** Cuando un destinatario había marcado un correo como spam o su cuenta estaba en la lista de supresiones de Resend, el envío generaba un error de entregabilidad ("Suppressed"). Esto podía bloquear el envío a todos los destinatarios del grupo o generar errores en los logs del servidor.

**Archivo modificado:** `src/lib/email.ts`

**Cambios:**
- Nueva función `fetchSuppressedEmails()`: consulta `GET https://api.resend.com/suppressions` con caché en memoria de 10 minutos (`SUPPRESSION_CACHE_TTL_MS = 10 * 60 * 1000`). Si el API falla retorna `Set` vacío (fail-safe: se envía sin filtrar en lugar de bloquear).
- Nueva función `filterSuppressed(emails[])`: separa destinatarios en `valid[]` (enviar) y `suppressed[]` (omitir con `console.warn`).
- `sendPermitUpdateEmail()` y `sendGroupEmail()` llaman `filterSuppressed()` antes de ejecutar el envío. Si todos los destinatarios están suprimidos → retorna `{ success: true }` (no es error del sistema).

**Comportamiento:**
- El caché de 10 minutos evita llamadas repetidas al API de Resend por cada envío.
- Un correo suprimido se omite silenciosamente con log — no bloquea ni genera error visible.
- Si el API de supresiones no responde, se envía a todos sin filtrar (comportamiento previo como fallback).

---

#### Fix de encoding: caracteres especiales corruptos en mensajes de error

**Problema:** Los strings con tildes (`ó`, `ú`, `á`) en las funciones nuevas fueron guardados con encoding incorrecto (`PensiÃ³n`, `nÃºmero`, `vÃ¡lido`), lo que causaría que los mensajes de error se mostraran corruptos al usuario.

**Archivos corregidos:** `src/app/(app)/permits/actions.ts`, `src/app/(app)/permits/create/page.tsx`, `src/lib/offline-permits.ts`

**Correcciones aplicadas:**
- `'PensiÃ³n'` → `'Pensión'` (3 instancias en 2 archivos)
- `'El nÃºmero de trabajadores no es vÃ¡lido.'` → `'El número de trabajadores no es válido.'` (3 instancias en 3 archivos)
- `'NÃºmero de Trabajadores no Coincide'` → `'Número de Trabajadores no Coincide'` (1 instancia)

---

### 2026-05-25 (Sesión 2) — Refactor completo del generador de PDFs

#### Refactor: rediseño del generador de PDFs de permisos de trabajo

**Archivo modificado:** `src/lib/pdf-generators.ts` (~311 inserciones, ~263 eliminaciones)

**Cambios principales:**

1. **Paleta de colores unificada:** `ITALCOL_ORANGE = SYSTEM_PRIMARY = [0, 34, 72]` (azul marino `#002248`, coincide con `--primary` CSS del sistema). Se mantiene `ITALCOL_ORANGE` como alias de compatibilidad — todo el código existente hereda el nuevo color automáticamente.

2. **Nuevas funciones helper:**
   - `formatKey(key)` → convierte camelCase/snake_case a etiqueta legible en mayúsculas
   - `selectedMapLabels(value)` → extrae ítems seleccionados de objetos `{key: boolean}`
   - `objectStatusRows(value)` → construye filas `[label, símbolo]` para tablas de estado
   - `renderStatusTable(doc, yPos, rows)` → renderiza tabla de estado genérica con estilo unificado
   - `drawSignatureImage(doc, signature, x, y, w, h)` → dibuja imagen de firma con manejo de errores
   - `formatAnyDate(value)` → convierte timestamps Firestore o strings ISO a `dd/MM/yyyy HH:mm`

3. **`isWorkTypeSelected(permit, legacyKey, selectedKey)`:** evalúa `permit[legacyKey] === true || permit.selectedWorkTypes?.[selectedKey] === true`. Cubre ambas rutas del wizard, en paridad con `requiresMaintenanceSignature()` del servidor (`actions.ts`).

4. **`generateUnifiedPDF()`:** usa `isWorkTypeSelected()` para incluir solo los anexos marcados (alturas, confinado, energía, izaje, excavaciones).

5. **`drawSignatures()`:** layout de tarjetas 2 columnas con imágenes de firma embebidas, auto page-break al alcanzar el margen inferior.

6. **Tabla de trabajadores:** columnas F.APE / F.CIE renderizan imágenes de firma reales via callback `didDrawCell`.

7. **`drawFooter()`:** pie de página con número de página en todas las hojas.

**Correcciones adicionales aplicadas:**
- **EPP duplicado eliminado:** `renderPermitContent()` renderizaba `eppEmergencias.epp` y `eppEmergencias.emergencias` dos veces (secciones 4+5 con nuevo estilo y secciones 7+8 con código antiguo). Se eliminaron las secciones 7+8 (código muerto).
- **Logo local:** `ITALCOL_LOGO_URL` cambiado de `https://i.postimg.cc/VsZBSkmH/Italcol.png` a `/logo-italcol-full.png` (archivo local en `public/`), consistente con el fix de logos del 2026-04-28.

---

### 2026-05-22 (Sesión 2) — Formulario nuevo siempre en blanco y guard de navegación

#### Fix: "Nuevo Permiso" mostraba datos del último permiso editado

**Problema:** `PermitFormProvider` guardaba el estado del formulario en `localStorage` bajo `permitFormDraft_${userId}` y lo cargaba automáticamente en cada visita a `/permits/create`, sin importar si era un permiso nuevo o la edición de un borrador. Al hacer clic en "Nuevo Permiso" el formulario aparecía con datos de la sesión anterior.

**Archivos modificados:** `src/app/(app)/permits/create/form-context.tsx`, `src/app/(app)/permits/create/page.tsx`

**Cambios:**
- `PermitFormProvider` recibe nuevo prop `isNewPermit?: boolean`. Cuando es `true`, la `storageKey` se fija en `null`, deshabilitando lectura y escritura en `localStorage` para esa sesión.
- `CreatePermitPage` (componente raíz) lee `useSearchParams()` y pasa `isNewPermit={!searchParams.get('edit')}` al provider.
- **Regla resultante:** formulario en blanco siempre que la URL no tenga `?edit=<id>`; solo se cargan datos previos al abrir desde estado borrador.

---

#### Feat: guard de navegación al salir del formulario con datos sin guardar

**Problema:** Si el usuario tenía un permiso en edición y navegaba a otra sección (sidebar, botón atrás) perdía su trabajo sin advertencia.

**Archivo modificado:** `src/app/(app)/permits/create/form-context.tsx`, `src/app/(app)/permits/create/page.tsx`

**Cambios en `form-context.tsx`:**
- Se añadió `isFormDirty: boolean` al contexto. El dispatch envuelto activa `isFormDirty = true` en cualquier acción de usuario (`UPDATE_*`, `SET_WORKERS`, etc.) y lo resetea a `false` en `RESET_FORM`.
- `INITIALIZE_WITH_USER` y `SET_ENTIRE_STATE` no marcan el formulario como sucio (son inicializaciones del sistema, no ediciones del usuario).

**Cambios en `CreatePermitWizard`:**
- `handleSaveDraft` retorna `Promise<boolean>` para que la lógica de salida sepa si el guardado fue exitoso.
- Dos efectos nuevos que se activan cuando `isFormDirty && !showSuccessDialog`:
  - **`beforeunload`**: avisa al browser (refresh, cierre de tab, botón atrás nativo).
  - **`pushState` intercept**: cuando Next.js intenta navegar in-app, almacena los argumentos pendientes y abre el dialog en lugar de ejecutar la navegación.
- Nuevo `Dialog` "¿Salir sin guardar?" con dos opciones:
  - **"Guardar borrador y salir"**: llama `handleSaveDraft()` y, si tiene éxito, ejecuta la navegación pendiente.
  - **"Salir sin guardar"**: ejecuta la navegación pendiente directamente.
  - **Cancelar (X)**: descarta la navegación pendiente y cierra el dialog.
- El guard se desactiva automáticamente cuando el permiso se envía (`showSuccessDialog = true`).

---

### 2026-05-22 — Exclusión de administradores de correos de permisos

#### Fix: admins excluidos de las notificaciones por email del proceso de permisos de trabajo

**Problema:** Los administradores recibían correos electrónicos cuando un permiso pasaba al estado `en_ejecucion` (vía `getAdminUserIds()`). Se requería excluirlos de **todas** las notificaciones por email de permisos, manteniendo intactas sus notificaciones in-app, push y los correos del resumen diario de hallazgos.

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Cambios aplicados:**

1. **Nueva función `getEmailsForNonAdminUsers(userIds[])`** — reemplaza `getEmailsForUsers` en el pipeline de email de `notifyUsers`. Hace una sola lectura de Firestore por usuario, verifica el campo `role`, y excluye a los que tengan `'admin'`. Retorna únicamente los correos de usuarios no-admin.

2. **`notifyUsers` actualizada** — reemplaza `getEmailsForUsers(recipients)` por `getEmailsForNonAdminUsers(recipients)`. Al estar centralizado en esta función, el cambio cubre **todos los flujos** de forma automática: creación, firmas, cambios de estado, activación automática a `en_ejecucion`, cierre, etc.

3. **Import limpiado** — se eliminó `getEmailsForUsers` de los imports de `@/lib/email` ya que no se usa más directamente.

**Alcance del cambio:**

| Proceso | Comportamiento para admins |
|---|---|
| Permisos de trabajo — cualquier evento | ✅ Excluidos del correo (corrección aplicada) |
| Notificaciones in-app de permisos | Sin cambio — siguen llegando normalmente |
| Notificaciones push de permisos | Sin cambio — siguen llegando normalmente |
| Hallazgos — notificación inmediata | Sin cambio — solo notifica a `lider_sst` (admins nunca estuvieron en ese flujo) |
| Hallazgos — resumen diario (cron) | Sin cambio — sigue enviando **exclusivamente a admins** |

---

### 2026-05-20 (Sesión 3) — Visibilidad de borradores, ownership en guardado y compatibilidad Edge

#### Fix: borradores ajenos visibles para `autorizante`, `lider_sst` y `lider_regional`

**Problema:** Los roles `autorizante`, `lider_sst` y `lider_regional` podían ver los borradores de otros usuarios en la lista de permisos. El enlace de la fila de borrador apunta a `/permits/create?edit=<id>`, por lo que podían cargar el formulario ajeno y potencialmente sobreescribirlo con el botón "Borrador".

**Archivos modificados:** `src/app/(app)/permits/page.tsx`

| Rol | Corrección aplicada |
|---|---|
| `lider_regional` | `.filter(p => p.status !== 'borrador' \|\| p.createdBy === user.uid)` al final del pipeline de scope |
| `lider_sst` | Mismo filtro añadido tras el filtro por empresa |
| `autorizante` | Dentro del filtro empresa/planta: borradores solo pasan si `createdBy === user.uid`; el resto de estados siguen el filtro normal |

El rol `admin` mantiene visibilidad total de borradores (necesario para administración).  
El rol `solicitante` ya usaba `where('createdBy', '==', user.uid)` — sin cambios.

---

#### Fix: `savePermitDraft` sin validación de ownership en el servidor

**Problema:** La server action `savePermitDraft` al recibir un `draftId` existente actualizaba el documento sin verificar que el `userId` del request coincidiera con el `createdBy` del documento. Cualquier usuario que conociera el ID de un borrador ajeno podía sobreescribirlo.

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

```typescript
// Antes: actualizaba directamente
await docRef.update({ ...permitPayload, updatedAt: ... });

// Después: verifica ownership primero
const existing = await docRef.get();
if (!existing.exists) return { success: false, error: 'El borrador no existe.' };
if (existing.data()?.createdBy !== userId)
  return { success: false, error: 'No tienes permiso para modificar este borrador.' };
await docRef.update({ ...permitPayload, updatedAt: ... });
```

---

#### Fix: inicialización de Firebase con fallback para Edge / IndexedDB bloqueado

**Problema:** Microsoft Edge con "Prevención de rastreo" en modo Equilibrado (predeterminado) puede bloquear el acceso a IndexedDB para dominios de Firebase (`firebaseapp.com`). Esto causaba que `onSnapshot` devolviera resultados incompletos o no se actualizara, haciendo que los permisos aparecieran parcialmente en Edge. Además, en Next.js con hot reload, `initializeFirestore` lanzaba "already initialized" si el módulo se re-evaluaba.

**Archivo modificado:** `src/lib/firebase.ts`

```typescript
// Antes: inicialización sin manejo de errores
const db = !getApps().length || getApps().length === 1
  ? initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) })
  : getFirestore(app);

// Después: try/catch con fallback a Firestore sin persistencia
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
} catch {
  db = getFirestore(app); // fallback: sin caché persistente, siempre lee del servidor
}
```

**Comportamiento tras el fix:**
- Chrome/Firefox: comportamiento sin cambios (persistencia IndexedDB activa)
- Edge con Tracking Prevention: fallback a Firestore sin caché → datos siempre leídos del servidor → lista completa
- Next.js hot reload: el `catch` captura "already initialized" → retorna la instancia ya existente

**Nota para usuarios en Edge:** Si persiste el problema, indicar al usuario que vaya a `edge://settings/privacy` → Prevención de rastreo → agregar el dominio del app como excepción o cambiar a modo **Básica**.

---

### 2026-05-20 (Sesión 2) — Rol Líder Regional, estado Cancelado, simplificación de tabs y eliminación de borradores

#### Nuevo rol: `lider_regional`

Se implementó el rol `lider_regional` en toda la aplicación con control de acceso por scope (empresas, plantas, ciudades y módulos).

**Campos nuevos en el tipo `User` (`src/types/index.ts`):**

| Campo | Tipo | Descripción |
|---|---|---|
| `allowedEmpresas` | `string[]` | Empresas accesibles para el líder regional |
| `allowedPlantas` | `string[]` | Plantas accesibles |
| `allowedCiudades` | `string[]` | Ciudades accesibles |
| `allowedModules` | `AppModule[]` | Módulos habilitados (`permits`, `contractor_verifications`, `hallazgos`) |

**`src/lib/role-config.ts`:**
- `isInLiderRegionalScope(user, { empresa, planta, ciudad })`: helper que verifica si un permiso/verificación/hallazgo cae dentro del scope del lider_regional usando `.toLowerCase()` en ambos lados (insensible a mayúsculas)
- `liderRegionalHasModule(user, module)`: helper que verifica si el módulo está en `allowedModules`
- `ROLE_LABELS`: añadida etiqueta `lider_regional: 'Líder Regional'`

**Archivos de permisos de trabajo:**

| Archivo | Cambio |
|---|---|
| `src/app/(app)/permits/actions.ts` | `validateStateTransition`: `lider_regional` añadido a todas las transiciones de estado; puede aprobar, cancelar (nuevo), suspender/reactivar y cerrar permisos dentro de su scope |
| `src/app/(app)/permits/[id]/page.tsx` | `canBeCancelled`: añadido `lider_regional` |

**Verificaciones de contratistas:**

| Archivo | Cambio |
|---|---|
| `src/hooks/use-verification-permissions.ts` | `ALLOWED_ROLES`: añadido `lider_regional`; `canAccessModule`: verifica `allowedModules.includes('contractor_verifications')`; `canViewVerification`: verifica scope con `verification.companyName` (empresa), `verification.plantId` (planta), `verification.city` (ciudad) — campos correctos del tipo `ContractorVerification` |

**Nota sobre Firestore Rules:** La protección real de scope es client-side (igual que `autorizante`/`lider_sst`) porque Firestore rules no pueden evaluar `array-contains` en campos del usuario autenticado contra campos del documento. Las rules permiten lectura amplia con `isAdminOrLR()` y el filtrado de scope se aplica en los hooks.

---

#### Nuevo estado: `cancelado` (separado de `rechazado`)

Se introdujo `cancelado` como estado dedicado para cuando un permiso es cancelado explícitamente por un usuario autorizado. `rechazado` queda reservado exclusivamente para rechazos durante la fase de aprobación (`pendiente_revision` → `rechazado`).

**Motivación:** Antes, el botón "Cancelar Permiso" producía `status: 'rechazado'`. Esto mezclaba dos conceptos distintos y generaba permisos con `closure.cancelado='si'` pero `status='rechazado'`, lo que era semánticamente incorrecto.

**`src/types/index.ts`:**
- `PermitStatus`: añadido `'cancelado'`

**`src/app/(app)/permits/actions.ts`:**
- `STATUS_LABEL` y `getStatusText`: añadido `cancelado: 'Cancelado'`
- `validateStateTransition`:
  - `pendiente_revision`: mantiene `rechazado` (rechazo real del autorizante) + añade `cancelado`
  - `aprobado`, `en_ejecucion`, `suspendido`: solo `cancelado` (se eliminó `rechazado` de estas transiciones)
  - **Bug fix:** `en_ejecucion` → `rechazado` estaba ausente en la función original — permisos en ejecución quedaban atascados con `closure.cancelado='si'` pero `status` sin cambiar
- `updatePermitStatus`: nuevo `case 'cancelado'` con notificación tipo `'cancellation'`; `rejectionReason` se guarda tanto para `rechazado` como para `cancelado`
- Nueva server action `deletePermit(permitId, currentUser)`:
  - Valida `status === 'borrador'` (solo borradores)
  - Valida ownership: `createdBy === uid` O rol admin/lider_regional
  - Llama `docRef.delete()` via Admin SDK (Firestore rules tienen `allow delete: if false` para el cliente)
  - Llama `revalidatePath('/permits')`

**`src/app/(app)/permits/[id]/page.tsx`:**
- `getStatusInfo`: añadido `cancelado` con ícono `Ban`, color `text-rose-700 / bg-rose-100`
- `canSign`: bloqueado cuando `status === 'cancelado'`
- Diálogo de cancelación rediseñado:
  - Reemplazado `AlertDialog` por `Dialog` con `SignaturePad`
  - Auto-rellena nombre del usuario (read-only)
  - Auto-rellena fecha y hora en formato `dd/MM/yyyy HH:mm` (read-only)
  - Campo de razón obligatorio (Textarea)
  - `handleSaveCancellationSignature(signatureDataUrl)`: primero registra la firma con rol `cancelacion` via `addSignatureAndNotify`, luego llama `handleChangeStatus('cancelado', cancellationReason)`
  - Eliminado el estado muerto `rejectionReason` e `isRejectionDialogOpen`

**`src/app/(app)/dashboard/page.tsx`:**
- Mapa de colores: `cancelado: 'bg-rose-100 text-rose-800'`
- Mapa de etiquetas: `cancelado: 'Cancelado'`

**`src/lib/permit-email-template.ts`:**
- `STATUS_LABEL`: `cancelado: 'Cancelado'`
- `STATUS_COLOR`: `cancelado: '#be123c'`

---

#### Script de migración: `rechazado` → `cancelado`

**Archivo creado:** `scripts/migrate-rechazado-to-cancelado.ts`

Migra TODOS los permisos con `status === 'rechazado'` al nuevo estado `cancelado`.

**Comportamiento:**
1. Consulta la colección `permits` filtrando `status == 'rechazado'`
2. Muestra preview de cada permiso afectado (número, ID, razón, cancelado por)
3. Espera 5 segundos (Ctrl+C para abortar)
4. Escribe en lotes de 400 (límite Firestore = 500 por batch)
5. Actualiza `status: 'cancelado'` + `updatedAt: serverTimestamp()`

**Uso:**
```bash
npx tsx scripts/migrate-rechazado-to-cancelado.ts
```

> Requiere variables `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` en `.env`

---

#### Simplificación de tabs en la lista de permisos

**Archivo modificado:** `src/app/(app)/permits/page.tsx`

| Cambio | Detalle |
|---|---|
| Tab **"Rechazado"** eliminado | Los permisos `rechazado` ahora se agrupan bajo el tab `cancelado` (retrocompatibilidad) |
| Tab **"Suspendido"** eliminado | Los permisos `suspendido` ahora se muestran bajo el tab **"Activos"** (un permiso suspendido es un permiso activo en pausa, no un estado terminal) |
| Lógica de filtrado | `activos`: incluye `['aprobado', 'en_ejecucion', 'suspendido']`; `cancelado`: incluye `status === 'cancelado' \|\| status === 'rechazado'` |
| Reporte Excel | `cancelled` agrupa `cancelado \|\| rechazado` |

---

#### Eliminación de permisos en borrador

**Archivo modificado:** `src/app/(app)/permits/page.tsx`

- Botón `Trash2` junto al botón "Continuar" en la fila de permisos con `status === 'borrador'`
- Estado `permitToDelete` (objeto `Permit | null`) e `isDeleting` (boolean)
- `handleDeleteConfirm`: llama la server action `deletePermit`; maneja error con toast; limpia estado al finalizar
- `AlertDialog` de confirmación al final del componente: muestra número del permiso a eliminar
- El botón de eliminar solo es visible en filas de borradores — no aparece en ningún otro estado

---

### 2026-05-20 — Módulo de Auditoría de Datos, mejoras UX en formularios y correcciones de scroll

#### Nuevo módulo: Auditoría de Datos (`/admin/audit`)

Se creó un módulo completo de auditoría que permite detectar valores "huérfanos" (valores presentes en documentos de Firestore pero ausentes en las listas maestras de `dynamic_lists`) y renombrarlos en lote desde la interfaz.

**Archivos creados:**

| Archivo | Descripción |
|---|---|
| `src/app/(app)/admin/audit/actions.ts` | Server actions: `scanAuditField` (escaneo de colecciones), `renameAuditValue` (renombrado en batch) |
| `src/app/(app)/admin/audit/page.tsx` | Página cliente con 4 pestañas (Empresa, Ciudad, Planta, Área), `AuditPanel`, `RenameDialog` |

**`src/app/(app)/admin/audit/actions.ts`:**
- `AUDIT_CONFIG`: configuración de rutas de campo por tipo (soporta rutas anidadas con notación punto, ej: `generalInfo.empresa`)
- `scanAuditField(field)`: carga la lista maestra, escanea las colecciones configuradas, compara con el maestro (case-insensitive + trim), devuelve entradas clasificadas (huérfanos / con datos / sin datos)
- `renameAuditValue(field, oldValue, newValue, addToMasterList)`: actualiza todos los documentos afectados en batch (chunks de 499 para respetar límite de Firestore), opcionalmente añade el nuevo valor al maestro con `FieldValue.arrayUnion`
- Helper `getNestedValue()`: resuelve rutas anidadas de Firestore con notación punto

**Colecciones auditadas por campo:**

| Campo | Colecciones |
|---|---|
| `empresa` | users · permits (`generalInfo.empresa`) · hallazgos · contractorVerifications |
| `ciudad` | users · permits (`generalInfo.ciudad`) · hallazgos |
| `planta` | users · permits (`generalInfo.planta`) · hallazgos · contractorVerifications |
| `area` | users · permits (`generalInfo.areaEspecifica`) · hallazgos |

**`src/app/(app)/admin/audit/page.tsx`:**
- 4 pestañas con íconos: Empresa (Building2), Ciudad (MapPin), Planta (Factory), Área (LayoutGrid)
- `AuditPanel`: botón "Escanear", chips de filtro (Todos / Huérfanos / Sin datos), leyenda, tabla con columnas: estado (ícono color), valor (+badge), total docs, presencia por colección, acción Renombrar
- `RenameDialog`: dos modos — "Mapear a valor del maestro" (Select) o "Escribir nombre personalizado" (input libre); switch para añadir al maestro; vista previa del valor; advertencia de irreversibilidad
- Badge de huérfanos totales en el encabezado de la página

**`src/app/(app)/layout.tsx`:**
- Añadido `ScanSearch` a los imports de `lucide-react`
- Nuevo `SidebarMenuItem` "Auditoría de Datos" con ícono `ScanSearch` bajo el grupo Administración

---

#### Combobox con búsqueda en "Tarea a Realizar" (Anexo de Alturas)

**Archivo modificado:** `src/app/(app)/permits/create/components/AnexoAlturaStep.tsx`

- Se amplió la lista `tareasTrabajoAltura` de 17 a 40 actividades, añadiendo 23 nuevas tareas en formato título (sentence case, sin ALL CAPS)
- Nuevas actividades añadidas: Ajuste de tableros eléctricos, Cambio de luminarias, Isocinético, Limpieza de filtros de manga, Limpieza de tableros eléctricos, Mantenimiento a tolva de ceniza, Mantenimiento cabezote de elevador, Mantenimiento de aire acondicionado, Mantenimiento de banda Merryck, Mantenimiento de bomba de condensados, Mantenimiento de cribas, Mantenimiento de monocangilón, Mantenimiento de tolva de descarga de molino, Mantenimiento estructural (soldadura), Mantenimiento y/o limpieza de canales, cerramiento, ciclones, cubierta, enfriador, fachada, secador, silos, tolvas
- El campo `Select` fue reemplazado por un **Combobox** (`Popover` + `PopoverContent`) con:
  - Input de búsqueda dinámica (insensible a acentos y mayúsculas via `normalize('NFD')`)
  - Lista con scroll nativo (`overflow-y-auto max-h-[280px]`) — no usa `ScrollArea` de Radix (que causaba listas estáticas)
  - Checkmark en el ítem seleccionado
  - "Otro" fijo al final de la lista
  - Contador de resultados al buscar
  - Limpieza automática del query al cerrar

---

#### Fix: inputs de gases con separador decimal en español

**Archivo modificado:** `src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx`

**Causa raíz:** Los inputs de gas usaban `type="number"`, que en Chrome/Android con locale `es` devuelve `""` cuando el usuario escribe `0,1` (coma como separador decimal). Los campos quedaban en blanco y los datos se almacenaban como cadenas vacías.

**Cambios aplicados:**
- Nueva función `normalizeDecimal(val)`: convierte comas a puntos, elimina caracteres no numéricos y previene múltiples puntos decimales
- Todos los inputs de gas cambiados de `type="number"` a `type="text"` con `inputMode="decimal"` y `autoComplete="off"`
- Aplica a: `resultadosPruebasGases` (lel, o2, h2s, co) y la tabla `pruebasGasesPeriodicas.pruebas`

**Archivo modificado:** `src/app/(app)/permits/create/components/ReviewStep.tsx`

- Nueva función `fmtGas(val)`: muestra `—` si el valor está vacío o no es numérico; muestra el valor tal cual si es válido
- Reemplaza el acceso directo `{p.lel}` etc. por `{fmtGas(p.lel)}` en la tabla de pruebas periódicas

---

#### Fix global: scroll en componentes Select (Radix UI)

**Archivo modificado:** `src/components/ui/select.tsx`

**Causa raíz:** `SelectViewport` usaba la variable CSS `--radix-select-trigger-height` (altura del botón trigger, ~44px) en lugar de `--radix-select-content-available-height` (espacio disponible en pantalla). El viewport quedaba limitado a la altura del botón, impidiendo el scroll aunque hubiera muchos ítems.

**Cambio aplicado (una línea):**
```tsx
// Antes (incorrecto — viewport = altura del botón ~44px)
"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"

// Después (correcto — viewport = espacio disponible en pantalla)
"h-[var(--radix-select-content-available-height)] w-full min-w-[var(--radix-select-trigger-width)]"
```

> **Impacto:** corrección global — afecta todos los `Select` de la aplicación (formularios de permisos, modales de usuario, filtros de dashboard, etc.)

---

#### Mejoras en Gestión de Usuarios (`/admin/users`)

**Archivo modificado:** `src/app/(app)/admin/users/page.tsx`

**Ordenamiento alfabético con locale español:**
- Los `onSnapshot` de `dynamic_lists` (empresas, ciudades, plantas) ahora aplican `.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))` antes de guardar en estado
- `uniqueEmpresas` también ordenado con `localeCompare('es')`

**Nuevo filtro por Ciudad:**
- Estado `filterCiudad` (string, default `'all'`)
- `uniqueCiudades` calculado con `useMemo` desde la lista de usuarios (ordenado con locale español)
- Lógica de filtrado: `if (filterCiudad !== 'all') filtered = filtered.filter(u => u.ciudad === filterCiudad)`
- `hasActiveFilters` actualizado para incluir `filterCiudad`
- `clearFilters` resetea también `filterCiudad`
- Select de ciudad añadido en la barra de filtros (entre Empresa y Estado), con opción "Todas las Ciudades"

---

### 2026-05-13 — Notificaciones, cierre de permisos, campo personalExpuesto y correcciones de seguridad

#### Fix crítico: firmas de cierre de permiso no se guardaban en Firestore

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Causa raíz:** En `addSignatureAndNotify`, el bloque para `cierre_responsable` y `cierre_autoridad` construía `updateData` correctamente con la firma, pero **nunca llamaba `docRef.update(updateData)`**. El action retornaba `{ success: true }` de todas formas, mostrando el toast "Firma Registrada" sin escribir nada en Firestore. El `onSnapshot` del cliente nunca disparaba → el modal no actualizaba → el botón de la Autoridad quedaba bloqueado.

**Cambio aplicado:** Se añadió `await docRef.update(updateData)` al final del bloque `cierre_` (antes del `else`). Afectaba **todos los permisos** sin excepción, no solo los de energías.

---

#### Fix: regla Firestore de notificaciones bloqueaba "marcar como leídas"

**Archivos modificados:** `firestore.rules`, `src/firestore.rules`

**Causa raíz:** La regla `allow update` de la colección `notifications` usaba `request.resource.data.keys().hasOnly(['isRead'])`, que evalúa **todos los campos del documento resultante** (no solo los modificados). Como el documento tiene `userId`, `message`, `type`, `createdAt`, etc., la condición nunca era verdadera — el `updateDoc` del cliente siempre era bloqueado silenciosamente. El optimistic update limpiaba la UI pero `onSnapshot` la restauraba al instante.

**Cambio aplicado:**
```js
// Antes (incorrecto)
request.resource.data.keys().hasOnly(['isRead'])

// Después (correcto)
request.resource.data.diff(resource.data).affectedKeys().hasOnly(['isRead'])
```

> **Pendiente de deploy:** ejecutar `firebase deploy --only firestore:rules` para activar la corrección en producción.

---

#### Fix: líderes SST ahora reciben notificaciones de todos los permisos de su planta

**Archivo modificado:** `src/app/(app)/permits/actions.ts`

**Cambio:** En `getInvolvedUsers()`, se eliminó la condición `if (permit.isSSTSignatureRequired || permit.trabajoAlturas || ...)` que limitaba las notificaciones a `lider_sst` solo cuando el permiso requería su firma. Ahora los líderes SST reciben alertas de **todos los permisos** de su empresa/planta para poder hacer seguimiento a todas las actividades, independientemente de si el permiso requiere firma SST.

---

#### Nuevo campo "Personal Expuesto" en formulario de hallazgos

**Archivos modificados:** `src/app/(app)/hallazgos/components/hallazgo-form.tsx`, `src/types/index.ts`

- Nuevo campo obligatorio `personalExpuesto` debajo de "Peligro Inspeccionado"
- Componente `PersonalExpuestoSelector`: dos chips toggle — **Propio** y **Contratistas** — misma estética y patrón que `PeligroSelector` (verde activo, múltiple selección, disabled en modo vista)
- Valor almacenado como etiquetas unidas por `\n` (consistente con `peligroInspeccionado`)
- `src/types/index.ts`: campo `personalExpuesto?: string` añadido al tipo `Hallazgo` (opcional para compatibilidad con registros existentes)
- `src/firestore.rules` sincronizado con la versión completa del root (incluye reglas de contratistas, `asesor_arl`, `hasRole` con `otherRoles`)

---

### 2026-05-13 — Dashboard: filtro de fecha, gráficos mejorados, ajustes permisos y selector de peligros corregido

#### Dashboard — Filtro de período

Se añadió un selector de período que filtra simultáneamente permisos y hallazgos en todas las secciones del dashboard.

**Cambios en `src/app/(app)/dashboard/page.tsx`:**

| Elemento | Detalle |
|---|---|
| `DATE_PRESETS` | Constante externa con 6 opciones: Todo el tiempo / Últimos 7 días / 30 días / 3 meses / 6 meses / Este año |
| `getDateFilterStart(filter)` | Helper puro que devuelve la fecha de inicio según el preset seleccionado |
| Estado `dateFilter` | Nuevo `useState('all')` junto a empresa/planta/ciudad |
| `filteredPermits` useMemo | Acepta `dateFilter` como dependencia; excluye permisos cuyo `createdAt < dateStart` |
| `filteredHallazgos` useMemo | Mismo criterio para hallazgos |
| `activeFilterCount` | Ahora incluye `dateFilter` |
| `showFilterBar` | Simplificado: visible siempre que haya datos (permisos o hallazgos) |
| UI filtros | Selector "Período" con ícono `CalendarDays` añadido después de ciudad |
| Botón Limpiar | Resetea también `setDateFilter('all')` |
| Chips activos | Nuevo chip índigo con el nombre del preset activo y × para limpiar |

---

#### Dashboard — Gráficos geográficos mejorados

**Cambios en `src/app/(app)/dashboard/page.tsx`:**

- **Tarjeta "Aprobados"** eliminada de `statsCards` (estado ya no existe en el flujo actual); campo `aprobado` eliminado del `stats` useMemo
- **Gráfico "Analítica por Planta"** eliminado; la grilla geográfica pasó de 3 a 2 columnas (`md:grid-cols-2`)
- **Ambos gráficos** (Empresa y Ciudad) refactorizados con patrón IIFE para cálculos inline:
  - **Ancho dinámico del eje Y**: `Math.min(max, Math.max(min, maxNombreLen * 7))` — sin truncación, nombres completos
  - **Altura dinámica interior**: `Math.max(280, items * 46 + 56)` — cada barra tiene espacio garantizado
  - **Contenedor scrollable** `max-h-[420px] overflow-y-auto` — la tarjeta no crece sin límite; scroll interno cuando hay muchas empresas/ciudades
  - **`LabelList`** (nuevo import de recharts): valores en blanco dentro de cada segmento (ocultos si 0) + total gris al final de la barra
  - **Footer fijo** fuera del área de scroll: leyenda Permisos/Hallazgos + contador de ítems
  - **`slice` aumentado a 12** para empresa y ciudad
- `workTypeLabels` eliminado (constante sin uso)
- `LabelList` añadido al import de recharts; `CalendarDays` añadido al import de lucide-react

---

#### Hallazgos — Selector de peligros corregido

El componente `PeligroSelector` fue simplificado: en lugar de 8 categorías con 29 ítems, ahora muestra exactamente las 5 opciones del flujo de permisos de trabajo.

**Archivo modificado:** `src/app/(app)/hallazgos/components/hallazgo-form.tsx`

- `PELIGROS` (categorizado) reemplazado por `PELIGRO_OPTIONS` (array plano):
  - Alturas · Espacios Confinados · Energías Peligrosas · Izaje de Cargas · Excavaciones
- Chip **"Otros"** (borde punteado) reemplaza el enlace "+ Agregar otro peligro"
- En modo vista (`disabled`) con texto personalizado guardado: el chip "Otros" se muestra activo en verde

---

#### Permisos — Ajustes manuales en vista de detalle

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx`

- Corrección de indentación en bloque `supervisor_confinado`
- Sección del Anexo Alturas renombrada de **"Estructura y Aspectos de Seguridad"** a **"Sistemas de Acceso"**

---

### 2026-05-12 — Emails BCC, Dashboard por secciones, Módulos placeholder y selector de peligros

#### Agrupación de emails con BCC (reducción cuota Resend)

**Problema:** Cada evento de permiso/hallazgo enviaba un correo individual a cada destinatario, consumiendo rápidamente el límite diario gratuito de Resend.

**Solución:** Se agrupan todos los destinatarios del mismo mensaje en un único `resend.emails.send` usando el campo `bcc`, enviando un solo correo API por evento sin importar cuántos usuarios deban recibirlo.

**Archivos modificados:**

| Archivo | Cambio |
|---|---|
| `src/lib/email.ts` | Nueva función `sendGroupEmail({ emails, subject, html })` — deduplica, envía al primero en `to:` y el resto en `bcc:`; nueva función `getEmailsForUsers(userIds[])` — paralelo de `getEmailForUser` para múltiples IDs |
| `src/app/(app)/permits/actions.ts` | Imports actualizados; `createNotification()` eliminó el envío de email propio; nueva función `notifyUsers()` agrupa Firestore+push (por usuario) y email (un solo BCC); 10 call sites reemplazados con `notifyUsers()` |
| `src/app/(app)/hallazgos/actions.ts` | `notifyHallazgoCreated()` reemplaza `Promise.allSettled(N correos)` por un único `sendGroupEmail()` |
| `src/app/api/cron/hallazgos-daily-summary/route.ts` | Resumen diario a admins: `Promise.allSettled(N correos)` → un único `sendGroupEmail()` |

---

#### Dashboard — Separación en secciones "Permisos de Trabajo" y "Hallazgos SST"

Se reestructuró visualmente el dashboard para separar con claridad los datos de permisos de los de hallazgos.

**Cambios en `src/app/(app)/dashboard/page.tsx`:**
- Encabezado de sección **"Permisos de Trabajo"** (barra azul) antes de las tarjetas de estadísticas
- Encabezado de sección **"Hallazgos SST"** (barra ámbar `bg-amber-500`) antes de los gráficos de hallazgos
- Las tarjetas de estado de hallazgos (Totales/Abiertos/Cerrados) fueron reemplazadas por un **donut chart de estado** (Abiertos/Cerrados) con Recharts, colocado junto al donut chart de Clase A/B/C ya existente — ambos en una grilla `max-w-3xl mx-auto`
- Se añadió `hallazgosEstado` useMemo con colores ámbar (Abiertos) y verde (Cerrados)
- El gráfico Histórico de Permisos pasó a ser tarjeta independiente de ancho completo dentro de su sección

---

#### Cuatro módulos placeholder "En Construcción"

Se crearon 4 módulos nuevos con páginas de marcador de posición para desarrollo futuro, usando un componente reutilizable.

**Archivos creados:**

| Archivo | Descripción |
|---|---|
| `src/components/ComingSoonPage.tsx` | Componente reutilizable: ícono grande con degradado, badge animado "Módulo en Construcción", título, descripción y tarjeta "Próximamente disponible" |
| `src/app/(app)/alturas/page.tsx` | Módulo Alturas — ícono `ArrowUpToLine`, degradado sky/blue |
| `src/app/(app)/confinados/page.tsx` | Módulo Confinados — ícono `Box`, degradado violet/purple |
| `src/app/(app)/calderas/page.tsx` | Módulo Calderas — ícono `Flame`, degradado orange/red |
| `src/app/(app)/energias-peligrosas/page.tsx` | Módulo Energías Peligrosas — ícono `Zap`, degradado yellow/amber |

**Archivos modificados:**

| Archivo | Cambio |
|---|---|
| `src/app/(app)/layout.tsx` | +`ArrowUpToLine`, `Box`, `Flame`, `Zap` de lucide-react; nuevo `SidebarGroup` "Módulos" con los 4 ítems y badge ámbar "Pronto" |

---

#### Hallazgos — Selector de peligros inspeccionados

El campo "Peligro Inspeccionado" del formulario de hallazgos cambió de un textarea de edición libre a un selector visual por chips.

**Archivo modificado:** `src/app/(app)/hallazgos/components/hallazgo-form.tsx`

- Se agregó `Check` a los imports de lucide-react
- Nueva constante `PELIGRO_OPTIONS` con las 5 opciones fijas:
  - Alturas · Espacios Confinados · Energías Peligrosas · Izaje de Cargas · Excavaciones
- Nuevo componente `PeligroSelector`: chips toggle con highlight verde al seleccionar; chip "Otros" (borde punteado) que despliega un textarea para texto libre; compatible con modo vista (disabled) y retrocompatible con valores ya guardados
- El campo del formulario (`FormField`) fue reemplazado para usar `PeligroSelector` en lugar de `Textarea`
- **Schema sin cambios:** `peligroInspeccionado` sigue siendo `z.string()` — el valor se almacena como etiquetas unidas por `\n`

---

### 2026-05-09 — Permisos Asesor ARL en Plantillas y fix SW dev

#### Permisos completos de Asesor ARL en el módulo de Plantillas

Se amplió el rol `asesor_arl` para que pueda gestionar plantillas de verificación de principio a fin, con la restricción de que solo puede editar o eliminar las plantillas que él mismo creó.

**Regla general:**
| Acción | Admin | Asesor ARL | Líder SST |
|---|---|---|---|
| Ver todas las plantillas | ✅ | ✅ (lectura) | ✅ (lectura) |
| Crear plantilla | ✅ | ✅ | ❌ |
| Editar / eliminar plantilla propia | ✅ | ✅ | ❌ |
| Editar / eliminar plantilla ajena | ✅ | ❌ | ❌ |
| Crear / activar tipos de riesgo | ✅ | ✅ | ❌ |
| Ver ítem "Plantillas Contratistas" en menú | ✅ | ✅ | ❌ |

**Archivos modificados:**

| Archivo | Cambio |
|---|---|
| `src/hooks/use-verification-permissions.ts` | `canManageTemplates` = `isAdmin \|\| isAsesorARL`; nueva función `canEditTemplate(template)` que devuelve `true` para admin siempre y para asesor_arl solo si `template.createdBy === user.uid` |
| `firestore.rules` | `riskTypes` write: `isAdmin() \|\| hasRole('asesor_arl')`; `checklistTemplates` create: asesor_arl si `createdBy == uid`; update/delete: asesor_arl si `resource.data.createdBy == uid`; `groups` write: asesor_arl si plantilla padre tiene `createdBy == uid` (con `get()`) |
| `src/app/(app)/contractor-verifications/templates/page.tsx` | Acceso habilitado a `canManageTemplates` (ya no solo admin); aviso informativo para no-admins; botones toggle/eliminar de plantillas condicionados a `canEditTemplate(t)`; botones de tipos de riesgo visibles para todos los que pasan el guard |
| `src/app/(app)/contractor-verifications/templates/[templateId]/page.tsx` | Cálculo de `canEdit = canEditTemplate(template)` tras cargar; banner de solo lectura si no es propietario; botones "Activar/Desactivar", "Nuevo grupo", editar ítem, eliminar ítem y eliminar grupo ocultos cuando `!canEdit`; modales de edición bloqueados cuando `!canEdit` |
| `src/app/(app)/layout.tsx` | Ítem "Plantillas Contratistas" movido fuera del bloque admin-only; ahora visible para `admin` y `asesor_arl`; eliminado del grupo "Administración"; `isActive` de "Verif. Contratistas" refinado para no activarse en la ruta de plantillas |

#### Fix: RuntimeError InvalidStateError en Service Worker con Turbopack

**Causa:** El navegador tenía registrado un SW de una build de producción anterior (`public/sw.js` con hashes de chunks fijos). Al arrancar en modo dev con Turbopack (puerto 9003), el browser intentaba actualizar ese SW pero Turbopack sirve los módulos de manera diferente e incompatible con el SW cacheado, generando `The object is in an invalid state`.

**Solución:** Se creó el componente `SwDevCleanup` que se monta en el root layout y llama a `navigator.serviceWorker.getRegistrations()` + `unregister()` únicamente cuando `NODE_ENV === 'development'`. En producción el `useEffect` sale inmediatamente sin efecto.

| Archivo | Cambio |
|---|---|
| `src/components/sw-dev-cleanup.tsx` | Componente nuevo — desregistra todos los SW activos en modo desarrollo |
| `src/app/layout.tsx` | Importa y monta `<SwDevCleanup />` antes de `<Providers>` |

---

### 2026-05-07 — Módulo Verificación de Contratistas (nuevo)

**Commits:** serie de commits desde `a4fa5f6` — *feat: módulo verificación contratistas completo*

#### Nuevo módulo: Verificación de Contratistas

Módulo completo para evaluar el cumplimiento de requisitos de seguridad de empresas contratistas según el tipo de actividad de riesgo (Trabajo en Alturas, Espacios Confinados, Energías Peligrosas LOTO, etc.).

##### Flujo del proceso
1. Admin crea tipos de riesgo y plantillas de checklist desde "Plantillas Contratistas"
2. Asesor ARL / Líder SST / Admin crea una nueva verificación (wizard 3 pasos)
3. Se diligencia el checklist ítem por ítem con calificaciones C / NC / OM / NA
4. Las No Conformidades requieren un plan de acción asociado
5. Al cerrar la verificación se calcula automáticamente el porcentaje de cumplimiento
6. Se puede exportar a PDF completo

##### Colecciones Firestore nuevas

| Colección | Descripción |
|---|---|
| `riskTypes` | Tipos de riesgo configurables (ej: Alturas, Espacios Confinados) |
| `checklistTemplates` | Plantillas con estado DRAFT / ACTIVE / INACTIVE / ARCHIVED |
| `checklistTemplates/{id}/groups` | Grupos de ítems dentro de cada plantilla |
| `contractorVerifications` | Registros de verificación por empresa/contratista |
| `contractorVerifications/{id}/answers` | Respuestas del checklist (C/NC/OM/NA por ítem) |
| `contractorVerifications/{id}/actionPlans` | Planes de acción para NC/OM |

##### Archivos creados

| Archivo | Descripción |
|---|---|
| `src/types/index.ts` | +13 tipos: RiskType, ChecklistTemplate, ChecklistGroup, ChecklistItem, ContractorVerification, ContractorVerificationAnswer, VerificationEvidence, ActionPlan, etc. |
| `src/lib/risk-type-service.ts` | CRUD tipos de riesgo |
| `src/lib/checklist-template-service.ts` | CRUD plantillas, grupos e ítems (ítems como array inline) |
| `src/lib/contractor-verification-service.ts` | createVerification + batch answers, updateAnswer, recalculateCompliance, closeVerification, canCloseVerification |
| `src/lib/action-plan-service.ts` | CRUD planes de acción |
| `src/lib/pdf-verificacion.ts` | Generador PDF jsPDF con secciones: info general, resumen cumplimiento, checklist por grupos, planes de acción, observaciones |
| `src/hooks/use-risk-types.ts` | onSnapshot con activeRiskTypes |
| `src/hooks/use-checklist-templates.ts` | useTemplatesByRiskType, useAllTemplates, useTemplateGroups |
| `src/hooks/use-contractor-verifications.ts` | useContractorVerifications (filtro por rol), useVerificationDetail, useAllActionPlans |
| `src/hooks/use-verification-permissions.ts` | canAccessModule, canCreate, canEdit, canClose, canManageTemplates |
| `src/app/(app)/contractor-verifications/page.tsx` | Listado con tabs, búsqueda, filtro riesgo, sort, paginación, modal de ayuda |
| `src/app/(app)/contractor-verifications/create/page.tsx` | Wizard 3 pasos: riesgo → plantilla → datos generales |
| `src/app/(app)/contractor-verifications/[id]/checklist/page.tsx` | Formulario dinámico de checklist con planes de acción editables |
| `src/app/(app)/contractor-verifications/[id]/page.tsx` | Detalle: info general, cumplimiento, acordeón de respuestas, planes de acción, descarga PDF |
| `src/app/(app)/contractor-verifications/templates/page.tsx` | Admin: gestión de plantillas y tipos de riesgo |
| `src/app/(app)/contractor-verifications/templates/[templateId]/page.tsx` | Editor de plantilla: grupos e ítems |
| `src/app/(app)/contractor-verifications/action-plans/page.tsx` | Vista global de planes de acción con tabs por estado |
| `scripts/seed-checklist-templates.ts` | Seed de plantillas iniciales (Alturas, Espacios Confinados, LOTO) |

##### Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/app/(app)/layout.tsx` | +`ClipboardCheck` icon, +ítem sidebar "Verif. Contratistas" y "Plantillas Contratistas" (admin) |
| `firestore.rules` | +reglas para riskTypes, checklistTemplates, contractorVerifications y subcollecciones |
| `storage.rules` | +regla para `/contractor-verifications/{id}/` |
| `src/lib/offline-queue.ts` | **Bug fix:** `IDBKeyRange.only(false/true)` → boolean no es clave IDB válida → reemplazado por `getAll()` + filtro JS |

##### Decisiones de diseño importantes

- **Ítems como array inline en el grupo**: evita subcollección de 3 niveles, más eficiente para lectura
- **`plantId` = string de `user.planta`**: no hay colección de plantas con IDs separados; el filtro por planta usa el mismo string
- **`requiresActionPlan`**: flag que se pone `true` al marcar NC y `false` al crear el plan (para desbloquear cierre)
- **`canCloseVerification`** recibe el array de `actionPlans` para validar cruzado — evita dependencia exclusiva del flag `requiresActionPlan` (compatibilidad retroactiva)
- **`crypto.randomUUID()`** en lugar del paquete `uuid` (no instalado)
- **`satisfies` en batch.set** removido — `serverTimestamp()` retorna `FieldValue` pero el tipo de lectura es `Timestamp`; se mantiene consistencia con el resto del codebase

---

### 2026-04-28 — Sesión de correcciones y mejoras UX
**Commit:** `73d7ed8` — *fix: login race condition, imágenes locales, iconos anexos y flujo cierre permiso*

#### 4.1 Bug: Login requería múltiples clics para iniciar sesión

**Causa raíz identificada:** Race condition en el flujo de autenticación.

Después de que `signInWithEmailAndPassword` resolvía, se llamaba `router.push('/dashboard')` de inmediato. Sin embargo, Firebase `onAuthStateChanged` es asíncrono — el evento aún no había propagado el usuario autenticado a través de `AuthProvider → UserProvider`. El `AppLayout` recibía `user=null, loading=false` (estado del usuario no autenticado anterior) y ejecutaba `router.replace('/login')`, devolviendo al usuario a la pantalla de login.

**Archivos modificados:**
- `src/app/login/page.tsx`

**Cambios aplicados:**
- Se agregó `useUser()` hook para observar el estado de autenticación
- Se implementó `useEffect` que redirige a `/dashboard` únicamente cuando `!userLoading && user` (auth state completamente propagado)
- Se eliminó `router.push('/dashboard')` del `onSubmit`
- `setIsLoading(false)` ahora solo se ejecuta en el bloque `catch` (errores), no en `finally` — el botón permanece en estado de carga hasta que la navegación ocurre naturalmente
- Se eliminó `transform hover:scale-[1.02]` del botón de submit (interfería con eventos touch en móvil)

---

#### 4.2 Bug: Imágenes y logos no se mostraban en algunos dispositivos

**Causa raíz identificada:** Los logos estaban alojados en `i.postimg.cc`, un CDN de terceros gratuito que puede ser lento, bloqueado en redes corporativas, o fallar silenciosamente. Además, el login usaba `<img>` estándar en lugar de Next.js `<Image>` (sin optimización ni error handling).

**Archivos modificados:**
- `src/app/login/page.tsx`
- `src/app/(app)/layout.tsx`
- `public/logo-italcol-full.png` *(nuevo — descargado desde postimg.cc)*
- `public/logo-marca-compartida.png` *(nuevo — descargado desde postimg.cc)*

**Cambios aplicados:**
- Descargados ambos logos localmente a `/public/`
- Reemplazadas todas las referencias de `https://i.postimg.cc/...` por rutas locales `/logo-italcol-full.png`
- `<img>` estándar reemplazado por Next.js `<Image>` con `priority` y dimensiones explícitas
- Eliminado import `UserRole` no utilizado en `layout.tsx` (limpieza TypeScript)

---

#### 4.3 Mejora: Iconos de seguridad en cabecera de los Anexos

**Contexto:** Los 5 anexos del permiso de trabajo mostraban íconos genéricos de `react-icons` (escalera, rayo, etc.). Se solicitó reemplazarlos por imágenes profesionales de seguridad industrial.

**Archivos modificados:**
- `src/app/(app)/permits/create/components/AnexoAlturaStep.tsx`
- `src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx`
- `src/app/(app)/permits/create/components/AnexoEnergiaStep.tsx`
- `src/app/(app)/permits/create/components/AnexoExcavacionesStep.tsx`
- `src/app/(app)/permits/create/components/AnexoIzajeStep.tsx`
- `public/icons/anexo-altura.png` *(nuevo)*
- `public/icons/anexo-confinado.png` *(nuevo)*
- `public/icons/anexo-energias.png` *(nuevo)*
- `public/icons/anexo-excavaciones.png` *(nuevo)*
- `public/icons/anexo-izaje.png` *(nuevo)*

**Cambios aplicados:**
- Eliminados imports de `react-icons` (`PiLadderBold`, `FaPersonShelter`, `MdElectricBolt`, `FaPersonDigging`, `TbCarCraneFilled`)
- Agregado `import Image from 'next/image'` en cada componente
- Reemplazado bloque `<div className="inline-flex... rounded-full bg-primary">` + ícono por `<Image>` con `priority`, `width={96}`, `height={96}`, `className="mx-auto mb-4 drop-shadow-lg"`

| Anexo | Ícono anterior | Imagen nueva |
|---|---|---|
| Trabajo en Alturas | `PiLadderBold` (react-icons/pi) | `/icons/anexo-altura.png` |
| Espacios Confinados | `FaPersonShelter` (react-icons/fa6) | `/icons/anexo-confinado.png` |
| Control de Energías | `MdElectricBolt` (react-icons/md) | `/icons/anexo-energias.png` |
| Excavaciones | `FaPersonDigging` (react-icons/fa6) | `/icons/anexo-excavaciones.png` |
| Izaje de Cargas | `TbCarCraneFilled` (react-icons/tb) | `/icons/anexo-izaje.png` |

---

#### 4.4 Bug: Flujo de cierre de permiso siempre activaba "Cierre de Emergencia"

**Causa raíz identificada:** Dos problemas de código:

1. El botón "Cerrar Permiso" en el header de la vista de detalle estaba conectado a `handleEmergencyClosure()` en lugar de `handleOpenClosureDialog()`, lo que hacía que SIEMPRE mostrara el diálogo de emergencia.
2. La función `handleOpenClosureDialog()` estaba definida en el código pero **nunca era llamada por ningún botón** — el diálogo normal de cierre era inalcanzable desde la UI.

**Archivo modificado:**
- `src/app/(app)/permits/[id]/page.tsx`

**Cambios aplicados:**

*Cambio 1 — Header (línea ~1369):*
```
ANTES: canQuickClose → siempre llamaba handleEmergencyClosure()

AHORA: canQuickClose + canChangeStatus('cerrado')  → handleOpenClosureDialog()  [flujo normal]
       canQuickClose + !canChangeStatus('cerrado') → handleEmergencyClosure()   [flujo emergencia]
```
`canChangeStatus('cerrado')` es `true` solo para rol `solicitante`/`admin` cuando el permiso está en `en_ejecucion` o `suspendido`.

*Cambio 2 — Diálogo normal de cierre (pie de diálogo):*
- Agregado botón secundario **"Forzar Cierre de Emergencia"** que solo aparece cuando `!closureStatus.can` (hay condiciones pendientes)
- El botón cierra el diálogo normal y abre el de emergencia
- Permite al usuario elegir: completar las firmas faltantes (camino normal) o forzar cierre con observaciones (emergencia)

**Flujos que NO fueron afectados:**
- Aprobación de permisos y firmas de apertura
- Suspensión y reactivación de permisos
- Rechazo de permisos
- Cancelación de permisos
- Firmas diarias de validación de los anexos
- Firmas de cierre diario
- Lógica interna de `executeEmergencyClosure` y `closePermitByAnyUser`
- Control de acceso por roles (RBAC)

---

### 2026-04-15 — Rol Asesor ARL, seguridad y filtros
**Commits:** `7e60ea5`, `64bef16`, `54f351e`, `7b95b9f`, `464a26e`

- Implementación del rol `asesor_arl` con acceso exclusivo a sus propios hallazgos
- Reglas de Firestore actualizadas para filtrar hallazgos por `createdBy` cuando el rol es `asesor_arl`
- Corrección de filtros por empresa y planta en permisos y hallazgos
- Validación server-side para cierre de permiso y corrección de error de Server Action desincronizado
- Notificaciones push nativas con badge optimista en la campana de alertas
- Corrección del `OfflineBanner` movido fuera de `SidebarProvider` para que `position:fixed` funcione correctamente en móvil

---

### 2026-04-14 — Funcionalidad offline y PWA
**Commits:** `bfee98e`, `1bccd13`, `b3c159b`, `aba00fa`

- Implementación completa de funcionalidad offline (Escenario B): permisos se guardan en `IndexedDB` y se sincronizan al recuperar conectividad
- Cola de operaciones offline (`offline-queue.ts`) con sincronización automática
- Corrección del sistema de actualizaciones PWA: Service Worker espera en estado `waiting` hasta que el usuario confirme desde el banner `PWAUpdater`
- Corrección del rol activo al iniciar sesión con usuario diferente en la misma sesión
- Corrección de visibilidad de permisos SST y notificaciones filtradas por planta

---

### 2026-04-13 — Módulo de hallazgos, emails y filtros por planta
**Commits:** múltiples del 2026-04-13

- Template HTML profesional para notificaciones de permisos por email (Resend)
- Filtrado de notificaciones por email con rate limiting para evitar exceder cuota de Resend
- Filtros basados en planta/empresa para `autorizante`, `lider_sst` y `mantenimiento` en dashboard y lista de permisos
- Auto-completado de `empresa`, `planta` y `ciudad` desde el perfil del usuario al crear permiso
- Firma del solicitante en `WorkersStep` corregida
- Módulo de hallazgos: reglas de Firestore refinadas para visibilidad por planta
- Paneles de prueba de email en página `/test`
- Acciones de permisos actualizadas

---

### 2026-04-11 — Vista pública de hallazgos y analíticas
**Commits:** múltiples del 2026-04-11

- Vista pública de hallazgos (`/public/hallazgo/[id]`) que imita el layout del PDF, sin autenticación requerida
- Corrección de parámetros dinámicos en Next.js 15 (requiere `await` en params)
- `PrintButton` extraído como componente cliente para que `window.print()` funcione
- Habilitación de eliminación de hallazgos y usuarios para admins
- Emails de hallazgos enviados a todos los admins sin importar ubicación
- Eliminación de branding ITALCOL de emails y PDFs auto-generados

---

### 2026-04-10 — Dashboard analítico completo
**Commit:** `feat: complete analytics dashboard with recharts geographic and historical drill-downs`

- Dashboard con gráficos de Recharts: distribución geográfica y tendencias históricas
- Drill-downs por empresa, ciudad y planta
- Corrección de solapamiento en PDF de hallazgos

---

### 2026-04-09 — Módulo de hallazgos y carga masiva
**Commits:** múltiples del 2026-04-09

- Módulo de hallazgos de seguridad (`/hallazgos`) con CRUD completo
- Componente de carga de archivos adjuntos a Firebase Storage
- Optimización de carga masiva de usuarios desde Excel
- Reglas de Firestore para hallazgos

---

### 2026-04-07 — Rol mantenimiento y limpieza de roles
**Commits:** múltiples del 2026-04-07

- Corrección del dashboard para el rol `mantenimiento`
- Badge y filtrado de lista de permisos por firma pendiente para `mantenimiento`
- Eliminación del rol obsoleto `lider_tarea` del sistema
- Centralización de etiquetas y enums de roles en `src/lib/role-config.ts`
- Corrección de reglas de Firestore en archivo raíz

---

### 2026-03-25 — Correcciones críticas Firebase y UserProvider
**Commits:** `fix(firebase): corrección en el formato y parseo de FIREBASE_PRIVATE_KEY`, `fix: agrega archivo user-provider.tsx faltante`

- Corrección del formato de `FIREBASE_PRIVATE_KEY` en variables de entorno (caracteres de escape `\n`)
- Archivo `src/components/user-provider.tsx` faltante agregado al repositorio
- Corrección de sintaxis inválida en tipo `signatureConsents`

---

### 2026-03-25 — Flujo de firmas desde lista de trabajadores
**Commit:** `feat: flujo de firmas desde lista de trabajadores y mejoras visuales en anexos`

- Firma de trabajadores desde la lista directamente en la vista de detalle del permiso
- Mejoras visuales en los pasos de los anexos

---

### 2026-03-16 — Módulo de administración de usuarios
**Commits:** 2026-03-16

- Habilitar opciones de eliminar y actualizar usuarios desde el panel de administración
- Corrección de errores reportados por Next.js en server components

---

### 2026-03-13 — Ajuste de etiquetas de roles
**Commits:** 2026-03-13

- Ajuste en los nombres visibles del rol "Mantenimiento" e internos
- Validación de cambios previos antes de aplicar nuevas modificaciones

---

### 2026-03-06 — Versión V060326
**Commit:** `V060326`

- Snapshot de versión estable en producción

---

### 2026-02-26 — Informe y reportes
**Commit:** 2026-02-26

- Generación de informes con datos del sistema

---

### 2026-02-14 — Exportación de usuarios y ajustes de UI
**Commits:** 2026-02-14

- Exportación de lista de usuarios a Excel
- Ocultamiento temporal de botones no requeridos en esta fase

---

### 2026-02-13 — Carga masiva de usuarios desde Excel
**Commits:** múltiples del 2026-02-13

- Implementación de carga masiva de usuarios desde plantilla Excel
- Creación en Firebase Auth y Firestore en lote
- Corrección de errores de importación en la carga

---

### 2026-02-07 — Flujo completo de permisos de trabajo
**Commits:** múltiples del 2026-02-07

- Flujo completo de firmas: solicitante, autorizante, líder SST, coordinador alturas, supervisor confinado, mantenimiento
- Firma del Líder a cargo del equipo ejecutante
- Campo `Área` en datos del usuario
- Corrección de nombre del solicitante en la tabla de trabajadores
- Botones de acción en vista de detalle del permiso
- Corrección de envío de permiso y cambio de estado

---

### 2025-10-08 al 2025-10-10 — Prototipo inicial y conexión Firebase
**Commits:** primer commit `dd6cf03` hasta los de 2025-10-10

- Inicialización del workspace en Firebase Studio
- Prototipo inicial de la aplicación
- Conexión con Firebase Authentication y Firestore
- Implementación del formulario de login
- Menú hamburguesa y navegación básica
- Opción de cierre de sesión
- Módulo inicial de creación de usuarios

---

## 5. Estructura de Carpetas Clave

```
src/
├── app/
│   ├── login/              → Página pública de login
│   ├── (app)/             → Rutas protegidas (requieren auth)
│   │   ├── layout.tsx     → Layout con sidebar, auth guard, providers
│   │   ├── dashboard/     → Panel de control con analíticas
│   │   ├── permits/       → Gestión de permisos de trabajo
│   │   │   ├── create/    → Asistente multi-paso de creación
│   │   │   │   └── components/   → Pasos del asistente (Anexos, ATS, etc.)
│   │   │   └── [id]/      → Vista de detalle y edición
│   │   ├── hallazgos/     → Módulo de hallazgos de seguridad
│   │   ├── admin/         → Gestión de usuarios y listas maestras
│   │   ├── guide/         → Guía de flujo del sistema
│   │   └── settings/      → Configuración del usuario y WhatsApp
│   ├── public/            → Rutas públicas (sin auth)
│   │   └── hallazgo/[id]/ → Vista pública de hallazgo
│   └── api/push/          → API route para suscripciones push
├── components/
│   ├── ui/               → shadcn/ui components
│   ├── logo.tsx
│   ├── AlertsBell.tsx
│   ├── OfflineBanner.tsx
│   ├── PWAUpdater.tsx
│   ├── IdleTimerProvider.tsx
│   └── user-provider.tsx
├── hooks/
│   ├── use-auth.tsx       → Firebase Auth context
│   ├── use-user.tsx       → Perfil Firestore + cambio de rol
│   ├── use-idle-timer.ts  → Cierre automático por inactividad (30 min)
│   ├── use-online-status.ts
│   ├── use-offline-sync.ts
│   └── use-push-notifications.ts
├── lib/
│   ├── firebase.ts        → Cliente Firebase (Auth, Firestore, Storage)
│   ├── firebase-admin.ts  → Admin SDK para server actions
│   ├── role-config.ts     → Centralización de roles y etiquetas
│   ├── pdf-generators.ts  → Generación de PDFs
│   ├── push-notifications.ts → Web Push con VAPID
│   ├── email.ts           → Templates y envío con Resend
│   ├── notifications.ts   → Sistema de notificaciones unificado
│   ├── offline-permits.ts → Gestión de permisos offline
│   └── offline-queue.ts   → Cola de sincronización offline
├── types/
│   └── index.ts           → Tipos TypeScript del dominio
└── middleware.ts           → Rutas públicas (solo /login es pública)

public/
├── icons/                 → Iconos de seguridad para los anexos
│   ├── anexo-altura.png
│   ├── anexo-confinado.png
│   ├── anexo-energias.png
│   ├── anexo-excavaciones.png
│   └── anexo-izaje.png
├── logo-italcol-full.png  → Logo principal Italcol (local)
├── logo-marca-compartida.png → Logo secundario (local)
├── manifest.json          → PWA manifest
└── sw.js                  → Service Worker (generado por next-pwa)
```

---

## 6. Variables de Entorno Requeridas (`.env`)

```
# Firebase (cliente)
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# Firebase Admin (servidor)
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY          # Formato: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Resend (email)
RESEND_API_KEY
RESEND_FROM_EMAIL

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_FROM

# Web Push (VAPID)
NEXT_PUBLIC_VAPID_PUBLIC_KEY
VAPID_PRIVATE_KEY
```

---

## 7. Comandos Útiles

```bash
npm run dev          # Servidor de desarrollo en puerto 9003
npm run build        # Build de producción
npm run typecheck    # Verificación TypeScript sin compilar
npm run lint         # ESLint
npm run genkit:dev   # Servidor de desarrollo de Genkit AI
```

---

## 8. Notas de Arquitectura y Decisiones Técnicas

### Autenticación en dos capas
- `AuthProvider` (use-auth.tsx): maneja Firebase Auth (`onAuthStateChanged`)
- `UserProvider` (user-provider.tsx): lee el perfil completo del usuario desde Firestore y gestiona el cambio de rol activo
- `AppLayout` usa `useUser()` (UserProvider) — no `useAuth()` directamente

### Protección de rutas
- El middleware (`middleware.ts`) solo marca `/login` como pública; el resto lo gestiona el cliente en `AppLayout`
- `AppLayout` redirige a `/login` si `!loading && !user && isMounted`

### Firestore Security Rules
- Los filtros por empresa/planta para `autorizante` y `lider_sst` en queries `list` no pueden aplicarse en las rules de Firestore v2 (no soporta inspección de `where()` en campos anidados como `generalInfo.empresa`)
- La protección real se aplica en `allow read` (por documento) + filtros en el cliente (dashboard, lista de permisos, badges)

### Cierre de permisos — flujo normal vs emergencia
- **Flujo normal** (`handleOpenClosureDialog`): requiere `firmaCierre` de todos los trabajadores + firma `closure.responsable` + firma `closure.autoridad`. Solo disponible para `solicitante`/`admin` con permiso en `en_ejecucion`/`suspendido`
- **Cierre de emergencia** (`handleEmergencyClosure`→`closePermitByAnyUser`): bypass con observaciones obligatorias y firma del usuario que fuerza el cierre. Disponible para cualquier estado de los que permiten cierre

### PWA y Service Worker
- En desarrollo, el PWA está deshabilitado (`disable: process.env.NODE_ENV === 'development'`)
- El SW personalizado (`src/sw-message-handler`) maneja el mensaje `SKIP_WAITING` del botón de actualización
- El error "Failed to update a ServiceWorker" en dev es inofensivo y esperado con Turbopack

### Timeout de inactividad
- `IdleTimerProvider` cierra la sesión automáticamente tras 30 minutos de inactividad
- Muestra advertencia con 5 minutos de anticipación

---

## 9. Pendientes / Mejoras Futuras Identificadas

- [ ] Agregar iconos PNG para `AtsStep` y `EppEmergenciasStep` (actualmente sin imagen de cabecera)
- [ ] Implementar funcionalidad de "Olvidé mi contraseña" (enlace existe en login pero apunta a `#`)
- [ ] Migrar a Firestore Rules v2 con `request.query.filters` para filtros empresa/planta en el servidor
- [x] ~~Validar comportamiento del flujo de cierre normal con firmas reales en dispositivos móviles~~ — Implementado en Sesión 6: el cierre ahora requiere sesión del ejecutante y del autorizante por separado
- [ ] Documentar el proceso de creación de usuarios en producción (actualmente se hace desde el panel de admin)

---

*Documento generado el 2026-04-28. Última actualización: 2026-06-04. Mantener actualizado con cada sesión de desarrollo.*
