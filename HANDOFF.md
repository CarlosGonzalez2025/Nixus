# HANDOFF — SGTC Móvil
## Sistema de Gestión de Tareas de Alto Riesgo — Italcol / Nixus Capital

> **Repositorio:** https://github.com/CarlosGonzalez2025/Nixus  
> **Rama principal:** `main`  
> **Última actualización de este documento:** 2026-05-07

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
| `asesor_arl` | Acceso a hallazgos propios y verificaciones de contratistas propias |

---

## 4. Changelog — Registro de Cambios por Fecha

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
- [ ] Validar comportamiento del flujo de cierre normal con firmas reales en dispositivos móviles
- [ ] Documentar el proceso de creación de usuarios en producción (actualmente se hace desde el panel de admin)

---

*Documento generado el 2026-04-28. Mantener actualizado con cada sesión de desarrollo.*
