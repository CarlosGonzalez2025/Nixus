# HANDOFF — SGTC Móvil
## Sistema de Gestión de Tareas de Alto Riesgo — Italcol / Nixus Capital

> **Repositorio:** https://github.com/CarlosGonzalez2025/Nixus  
> **Rama principal:** `main`  
> **Última actualización de este documento:** 2026-05-20

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
- [ ] Validar comportamiento del flujo de cierre normal con firmas reales en dispositivos móviles
- [ ] Documentar el proceso de creación de usuarios en producción (actualmente se hace desde el panel de admin)

---

*Documento generado el 2026-04-28. Última actualización: 2026-05-20 (sesión 2). Mantener actualizado con cada sesión de desarrollo.*
