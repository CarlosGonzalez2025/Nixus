# HANDOFF — SGTC Móvil
## Sistema de Gestión de Tareas de Alto Riesgo — Italcol / Nixus Capital

> **Repositorio:** https://github.com/CarlosGonzalez2025/Nixus  
> **Rama principal:** `main`  
> **Última actualización de este documento:** 2026-08-06 (Sesión 19)

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
├── ExcelJS                → escritura de Excel con formato, desplegables y KPIs
├── SheetJS (xlsx)         → lectura de los Excel importados (no escribe estilos)
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

### 2026-08-06 (Sesión 19) — Alertas tempranas de permisos: recordatorios automáticos de firmas, jornadas y cierres

**Solicitud:** avisar a los usuarios antes de que se complete la jornada de ejecución para que recuerden cerrar el permiso; avisar cuando inició un día de ejecución y no se registró la firma de apertura o de cierre; avisar cuando el autorizante no registró su validación diaria; y avisar cuando llegó el último día y el permiso sigue sin cerrarse (*"si el permiso iba hasta hoy y no se cerró, que mañana envíe una notificación"*).

#### 19.1 Validación previa: qué existía y qué faltaba

El sistema ya tenía **toda la infraestructura de entrega**, lo que redujo el trabajo a construir el disparador: `notifyUsers()` en `permits/actions.ts` (fan-out in-app + push + email), `sendPushToUser()` con VAPID, `sendGroupEmail()` con Resend, la colección `notifications` con sus reglas de seguridad, la campanita `AlertsBell` en tiempo real y un endpoint de cron ya escrito (`hallazgos-daily-summary`).

Lo que **no** existía: ninguna lógica proactiva. Todas las notificaciones del sistema eran reactivas (alguien firma → se notifica). Estas son las primeras alertas que dispara el sistema por sí solo.

**Dato clave del modelo:** los permisos se ejecutan en un **rango continuo** de días (`generalInfo.validFrom` → `validUntil`, máximo 7). No existe un arreglo de días escogidos uno a uno. El día N es `validFrom + (N-1) días`, y el índice del arreglo `validacion.responsable[i]` / `validacion.autoridad[i]` **es** el día. Confirmado con el cliente que el rango continuo es correcto, lo que evitó un cambio de esquema. Ninguna alerta requirió campos nuevos salvo el registro anti-duplicados.

#### 19.2 Motor de reglas — `src/lib/permit-alerts.ts`

Módulo **puro**: no toca Firestore, no envía nada, no depende del entorno servidor. Recibe un permiso y un instante, devuelve qué alertas corresponden. Esto lo hace determinista, testeable de forma aislada y garantiza que el cron **no pueda alterar la lógica de negocio existente** — solo lee.

**11 reglas en cuatro grupos:**

| Grupo | Regla | Se le reclama a |
|---|---|---|
| Vigencia | `ultimo_dia` — hoy vence el permiso | Ejecutante + autorizante |
| Vigencia | `jornada_por_terminar` — faltan ≤ 4 h para `validUntil` | Ejecutante + autorizante |
| Vigencia | `permiso_vencido_sin_cerrar` — venció y sigue abierto | Escalado (ver 19.5) |
| Firmas diarias | `firma_apertura_pendiente` | Ejecutante + SST |
| Firmas diarias | `validacion_autoridad_pendiente` | Autorizante + ejecutante |
| Firmas diarias | `firma_cierre_diario_pendiente` | Ejecutante + SST |
| Bloqueos de cierre | `cierre_trabajadores_pendiente` | Ejecutante |
| Bloqueos de cierre | `cierre_responsable_pendiente` | Ejecutante |
| Bloqueos de cierre | `cierre_autoridad_pendiente` | **Autorizante** |
| Bloqueos de cierre | `checklist_caliente_pendiente` | Ejecutante |
| Aprobación | `aprobacion_pendiente` — una por rol que falte | Cada rol dueño de su firma |

**Alcance por tipo de permiso:** las firmas diarias solo existen en los anexos de Alturas, Confinados, Izaje y Excavaciones. Un permiso que sea únicamente General, Caliente o Energías **no genera** esas tres alertas; a pedido del cliente sí recibe las de vigencia y la de vencimiento sin cerrar, que es lo que aplica a su ciclo.

**Margen de cortesía:** la firma de apertura del día solo se reclama 2 h después de la hora de inicio de esa jornada, para no avisar a las 06:00 por un trabajo que arranca a las 08:00. La firma de cierre diario solo se reclama sobre días **ya terminados** y que sí tuvieron apertura: un día sin apertura ya se reportó con su propia alerta y no se duplica el aviso.

**Fallo en silencio:** un permiso sin fechas, con fechas invertidas o corruptas no genera ninguna alerta. Se prefiere el silencio a un aviso incorrecto.

#### 19.3 Atribución por rol — el hallazgo de fondo

La primera versión solo cubría las firmas **diarias**. El cliente señaló que el correo debía llegar *"a los roles que interactúan con el permiso y que por causa de un proceso que este usuario no ha realizado no se ha completado el ciclo"*. Revisando `getClosureStatus()` en `permits/[id]/page.tsx` y `checkAllRequiredSignaturesComplete()` en `permits/actions.ts` aparecieron **cinco bloqueos del ciclo que no se estaban alertando**: las firmas de cierre de los trabajadores, la firma de cierre del responsable, la de la autoridad del área, el checklist de trabajo en caliente y **todas las firmas de aprobación** (Coordinador de Alturas, Supervisor de Confinados, Mantenimiento, Líder SST, Autorizante).

Cada uno se reclama **exclusivamente a su dueño**. Verificado sobre un mismo permiso vencido de alturas + caliente que genera 10 alertas: el ejecutante recibe 9, el autorizante 4 y el líder SST 3, y ninguno ve el ruido del otro (el autorizante no recibe el checklist en caliente ni las firmas de trabajadores, que no le competen).

Las condiciones de estas reglas son **réplica exacta** de las del botón de cierre y de `checkAllRequiredSignaturesComplete()`, para que la alerta y el bloqueo real no puedan discrepar.

Esto obligó a ampliar los estados vigilados con `pendiente_revision` — un permiso programado para hoy que sigue esperando firmas está frenado por alguien concreto. Un permiso sin aprobar genera **únicamente** reclamos de aprobación, nunca de ejecución ni de cierre. Los **borradores quedan fuera**: son trabajo privado del autor y todavía no comprometen a nadie.

#### 19.4 Idempotencia — el riesgo más serio

Sin control, un permiso vencido notificaría a 8 personas en cada corrida, indefinidamente. Cada alerta lleva una **clave única** (`firma_apertura:anexoAltura:2026-08-07`, `vencido:2026-08-08`) que se persiste en un campo nuevo y **aditivo** del permiso:

```ts
alertas?: { [alertKey: string]: Timestamp }
```

Se escribe con `set(..., { merge: true })`, que fusiona el mapa sin tocar ningún otro campo. Se verificó que las 25 escrituras existentes sobre `permits` usan `.update()` con rutas puntuales, así que nada lo puede borrar. **Ninguna regla de negocio, consulta ni vista lee este campo.**

El registro se marca **después** de escribir las notificaciones in-app (canal confiable y barato) y **antes** de los correos: si el envío de correo se agota por tiempo, el aviso ya quedó entregado en la aplicación y no se repite al día siguiente.

#### 19.5 Escalamiento y topes

El aviso de permiso vencido se repite a diario con escalamiento progresivo y **tope**, para no convertirse en ruido perpetuo:

| Retraso | Destinatarios |
|---|---|
| Día 1–2 | Ejecutante + autorizante |
| Día 3–6 | + Líder SST |
| Día 7–15 | + Administradores de la planta |
| Día 16 | **Silencio** |

#### 19.6 Volumen: digest por persona y tope de campanita

Un barrido sobre muchos permisos con el patrón de notificación individual (un correo por permiso) agotaría la cuota de Resend y desbordaría el `maxDuration` del cron. Se agrupa **por destinatario**: cada persona recibe **un solo correo digest** con todos sus permisos pendientes y **un solo push**, en vez de uno por permiso. Reduce el volumen ~10x.

La simulación masiva destapó un caso no previsto: un **Líder SST corporativo sin planta asignada calza con todos los permisos** y en el pico habría recibido 100 notificaciones en la campanita, que además solo muestra 30 sin leer. Se agregó un tope de **15 notificaciones in-app por persona y corrida**, priorizando las críticas; el resto viaja íntegro en el correo. El endpoint reporta `notificacionesOmitidas` para que sea visible si ocurre.

También se evitó el patrón de `getInvolvedUsers()`, que dispara entre 4 y 12 consultas a `users` **por permiso** — aceptable en una acción puntual, un desperdicio de cientos de lecturas en un barrido. El directorio se carga **una sola vez por ejecución** y todo se resuelve en memoria, replicando el mismo criterio de alcance por empresa/planta.

#### 19.7 Fix — el retraso se medía en días calendario, no en tiempo real

Detectado por el cliente al revisar un correo: un permiso vencido a las 17:00 y revisado a las 06:00 del día siguiente reportaba **"1 día(s) de retraso"** cuando en realidad eran **13 horas**. La causa: `differenceInCalendarDays` cuenta **cruces de medianoche**, no tiempo transcurrido.

Se separaron las dos cosas que estaban mezcladas: los **días calendario siguen decidiendo cuándo avisar** (una vez al día, escalamiento, tope), porque esa cadencia es predecible y es la acordada; el **tiempo transcurrido real** solo se usa para redactar. Nuevo helper `formatearRetraso()`: "30 minutos" → "13 horas" → "1 día y 13 horas" → "3 días". De paso se eliminaron todos los `(s)` de los mensajes con un helper de concordancia.

**El disparo no se movió:** verificado que a las 18:00 y a las 23:00 del mismo día sigue sin avisar, y que el primer aviso cae a la mañana siguiente.

#### 19.8 Zona horaria — corrección del cron de hallazgos

`hallazgos-daily-summary` calculaba la ventana del día sobre `America/Los_Angeles`. En Colombia eso arrancaba el resumen a las **02:00–03:00 a.m.**, dejando los hallazgos creados entre medianoche y esa hora **fuera de todo resumen**. Además la etiqueta de fecha del correo se formateaba con la hora del servidor (UTC): ejecutando a las 19:00 del 6 de agosto, el correo decía "7 de agosto".

Alineado a `America/Bogota`. El cambio es seguro porque la ventana nueva es un **superconjunto estricto** de la anterior: medianoche en Bogotá (05:00 UTC) siempre cae antes que medianoche del Pacífico (07:00 u 08:00 UTC), así que ningún hallazgo que antes se reportaba deja de reportarse. Verificado contra la implementación anterior en **los 365 días del año**, incluidos los dos cambios de horario del Pacífico: se recuperan hasta 3 h por ejecución.

El helper de zona horaria quedó centralizado en `permit-alerts.ts` (`toZonedWallClock`, `nowInTimeZone`, `getZonedDayStartUTC`) y ambos crons lo usan, para que no haya dos implementaciones que puedan divergir. También se corrigió la fecha mostrada de cada hallazgo en la tabla del correo, que tenía el mismo defecto.

**Queda un hueco conocido**, que no es de zona horaria sino de horario: el cron corre a las 00:00 UTC = **19:00 Colombia**, así que los hallazgos de 19:00 a medianoche siguen sin entrar en ningún resumen. Se cierra cambiando el cron a `0 5 * * *` (medianoche Colombia, resumiendo el día completo), pero eso mueve la hora de llegada del correo a los admins y es una decisión del cliente.

#### 19.9 Manejo de fechas sin zona

`validFrom` / `validUntil` se guardan como cadenas `datetime-local` (`"yyyy-MM-ddTHH:mm"`) en hora local de Colombia, **sin zona horaria**. Todas las comparaciones se hacen contra un "ahora" expresado también como hora de pared de Bogotá (`nowInTimeZone()`), nunca convirtiendo a UTC. Esto evita que el servidor —que corre en UTC— desplace los cálculos de día.

#### 19.10 Archivos

**Nuevos:**
- `src/lib/permit-alerts.ts` — motor de reglas puro + helpers de zona horaria
- `src/lib/permit-alert-recipients.ts` — resolución de destinatarios desde un directorio cargado una sola vez
- `src/lib/permit-alert-email.ts` — plantilla del correo digest
- `src/app/api/cron/permit-alerts/route.ts` — el barrido (protegido con `CRON_SECRET`, soporta `?dryRun=1`)

**Modificados:**
- `src/app/api/cron/hallazgos-daily-summary/route.ts` — zona horaria a Bogotá (19.8)
- `src/types/index.ts` — `Notification['type']` suma `'reminder' | 'overdue'`; `Permit` suma `alertas?`
- `src/components/AlertsBell.tsx` — iconos para los dos tipos nuevos
- `vercel.json` — se agregó el cron, pero **este archivo es inerte** en este proyecto (ver 19.13)

**Nuevo (19.13):**
- `scripts/setup-cron-scheduler.sh` — registra ambos crons en Cloud Scheduler

#### 19.11 Verificación

- **Suite de comportamiento** (25 comprobaciones): ventanas de cortesía, último día vs. vencido, escalamiento, estados no vigilados, datos corruptos, claves válidas para Firestore.
- **Suite de atribución** (22 comprobaciones): cada reclamo con **un solo destinatario**, no se molesta a quien ya firmó, un coordinador de alturas de otra planta no recibe nada, los bloqueos de cierre no se reclaman mientras el permiso sigue vigente.
- **Simulación masiva**: 140 permisos × 30 días × 6 corridas = **25.200 evaluaciones**, con 7 perfiles de comportamiento, 4 plantas, 3 empresas y duraciones de 1 a 7 días. Idempotencia confirmada (re-ejecutar produce **0 duplicados**), tope de 15 avisos de vencimiento respetado, tope de campanita respetado.
- **Redacción del retraso**: 8 casos límite, incluido el salto exacto a las 24 h.
- **Correos reales**: 7 enviados vía Resend a una cuenta de prueba y **confirmados como `delivered`** consultando la API — 3 escenarios (recordatorio, vencido, digest multi-permiso), 3 por rol desde un mismo permiso, y 1 con la corrección del retraso. Dominio `sistedigital.net` verificado.
- `tsc --noEmit` sin errores nuevos y build de producción correcto con ambos crons registrados.

**No probado en vivo:** el canal push (requiere una suscripción real de navegador) y la escritura de notificaciones in-app en Firestore. Ambos se validan al desplegar con `?dryRun=1` y luego una corrida real.

#### 19.13 Hallazgo crítico: los crons nunca se han ejecutado

Al revisar las variables de entorno del proyecto salió a la luz un problema que invalidaba el despliegue del punto anterior: **`vercel.json` no ejecuta nada aquí.** El proyecto está en **Firebase App Hosting** (`apphosting.yaml`, sin `.vercel`, `NEXT_PUBLIC_BASE_URL` apuntando a un dominio `hosted.app`), y las definiciones de `crons` de ese archivo **solo las lee Vercel**.

Consecuencia: el endpoint `hallazgos-daily-summary` existe desde hace sesiones, responde correctamente… y **nunca ha sido llamado por nadie**. El resumen diario de hallazgos jamás se ha enviado. Firebase App Hosting no tiene crons propios.

**Solución:** `scripts/setup-cron-scheduler.sh` registra ambos jobs en **Google Cloud Scheduler**, que resulta ser mejor herramienta para el caso:
- Acepta **zona horaria nativa** (`America/Bogota`), así que se programa en hora local sin convertir a UTC ni compensar horarios de verano. Esto habría evitado por sí solo el defecto corregido en 19.8.
- **Sin el límite** de 2 jobs diarios del plan Hobby de Vercel, así que el barrido de alertas corre **cada hora** — y con eso `jornada_por_terminar` sí cae dentro de su ventana de 4 h, que con cron diario era prácticamente inalcanzable.
- Nivel gratuito: 3 jobs por cuenta de facturación; se usan 2.

`vercel.json` se dejó en el repositorio (es correcto *si* algún día se despliega en Vercel) pero **es inerte**. La documentación de la sección 6 lo advierte de forma explícita para que nadie vuelva a asumir que los crons están corriendo.

#### 19.14 Otros hallazgos del panel de variables

- **`CRON_SECRET` tenía como valor `0 0 * * *`** — la expresión del horario pegada dentro del secreto. Al ser una cadena trivialmente adivinable, los endpoints `/api/cron/*` quedaban **efectivamente sin protección**: cualquiera podía disparar el barrido y provocar un envío masivo de correos. Debe reemplazarse por un secreto aleatorio real.
- **`NEXT_PUBLIC_BASE_URL` apuntaba a la URL de preview** (`studio--…`) en vez de al dominio de producción. Como esa variable arma los enlaces de todos los correos y notificaciones push, un operario que tocara "Abrir el permiso" no habría llegado a producción.
- **Twilio en placeholders** (`YOUR_TWILIO_ACCOUNT_SID`): WhatsApp está desactivado y falla en silencio. Anterior a esta sesión y ajeno a los crons nuevos, que no usan Twilio.
- **Las variables `NEXT_PUBLIC_FIREBASE_*` no se leen**: la configuración de Firebase está hardcodeada en `src/lib/firebase.ts`. La sección 6 de este documento las listaba por error; ya se corrigió.

#### 19.12 Al desplegar

1. **Reemplazar `CRON_SECRET`** por un valor aleatorio real (ver 19.14) y usar exactamente el mismo al registrar los jobs.
2. **Corregir `NEXT_PUBLIC_BASE_URL`** para que apunte al dominio de producción.
3. **Registrar los crons en Cloud Scheduler:** `bash scripts/setup-cron-scheduler.sh`. Sin este paso nada se ejecuta (ver 19.13).
4. **Lanzar el ensayo en seco antes de la primera corrida real:** `GET /api/cron/permit-alerts?dryRun=1` calcula y reporta sin escribir ni enviar nada. La primera corrida real destapará todos los permisos que ya arrastran pendientes, incluidos los que llevan tiempo esperando firma de aprobación.

---

### 2026-08-05 (Sesión 18) — Reporte gerencial de Permisos de Trabajo en Excel

Se llevó al módulo de **Permisos de Trabajo** el mismo tratamiento aplicado a Hallazgos en la Sesión 17. El export anterior generaba dos hojas con `xlsx`: "Permisos" (con hipervínculos a las firmas) y "Análisis" (un volcado de texto plano con conteos). Como en el resto del proyecto, **el formato no llegaba al archivo** porque SheetJS community no escribe estilos.

**Nuevo generador** `src/lib/excel-permisos-report.ts` + `POST /api/export/permisos-report`. Cuatro hojas:

1. **Resumen Ejecutivo** — 10 KPIs en tarjetas: total, activos, pendientes, cerrados, cancelados, tasa de cierre, suspendidos, alto riesgo, trabajadores y **firmas pendientes sobre requeridas**. Distribuciones por categoría, por estado detallado y por tipo de trabajo; **avance de firmas por rol** (requeridas / firmadas / % / faltantes), anexos diligenciados, tendencia de 12 meses y Top 10 de empresas y plantas.
2. **Permisos** — 31 columnas con paneles congelados, autofiltro, semáforo por categoría y las firmas pendientes resaltadas en rojo.
3. **Firmas y Aprobaciones** — **una fila por permiso × rol**, con si la firma era exigida, su estado, el firmante, la fecha y enlaces a las firmas de apertura y cierre. Es la vista que permite ver dónde se atascan las autorizaciones; antes esa información estaba aplanada en 30 columnas de la hoja de datos.
4. **Análisis por Planta** — matriz empresa/planta/ciudad con volumen, desglose por categoría, % de cierre, alto riesgo, firmas pendientes y % firmado.

**Criterios de negocio aplicados** (documentados en la nota al pie de cada hoja): la **tasa de cierre excluye borradores**, que no son permisos ejecutables; "alto riesgo" es todo permiso con al menos una tarea de alturas, espacios confinados, trabajo en caliente, energías, izaje o excavaciones; y "firmas pendientes" cuenta **solo las aprobaciones exigidas** a cada permiso según sus tipos de trabajo (reutiliza `isApprovalRequired` del módulo, que ya resolvía esa regla).

La decisión de qué firma exige cada permiso y las etiquetas de estado se resuelven **en el cliente** y viajan ya resueltas al endpoint: esa lógica pertenece al módulo, no al generador de Excel.

**Archivos:** `src/lib/excel-permisos-report.ts` (nuevo), `src/app/api/export/permisos-report/route.ts` (nuevo), `src/app/(app)/permits/page.tsx` (exportación vía API con estado de carga; nuevo `APPROVAL_ROLE_LABELS`; se retiró el import de `xlsx` y las ~215 líneas del export anterior), `src/lib/excel-theme.ts` (`drawSectionTitleRange` promovido desde el reporte de hallazgos para compartirlo).

**Verificación:** `tsc --noEmit` sin errores nuevos. Reporte generado con 150 permisos de prueba cubriendo los 8 estados: 4 hojas, 74 KB, KPIs correctos (150 total / 56 activos / 19 pendientes / 18 cerrados / 38 cancelados / 14 % de cierre / 101 firmas pendientes de 358 requeridas), 900 filas en la hoja de firmas y 257 hipervínculos válidos. **Validación de integridad** (la misma introducida en 17.5): las 14 partes XML están bien formadas y sin los patrones que hacen que Excel pida reparar. **Pendiente:** abrirlo en Excel de escritorio.

#### 18.1 La exportación se lleva TODOS los estados en un solo archivo

A pedido del cliente, el botón "Exportar Excel" dejó de exportar únicamente la pestaña visible: ahora descarga **un solo archivo con los permisos de todos los estados**, que es como se consume el reporte a nivel gerencial (antes había que exportar pestaña por pestaña y unir los archivos a mano). Además, el resumen ejecutivo solo tiene sentido sobre el universo completo: la tasa de cierre o el reparto por categoría calculados sobre una sola pestaña no dicen nada.

**Qué se respeta y qué se ignora**, decidido así porque la pestaña es *navegación* mientras que los selectores son elecciones explícitas del usuario:
- **Se ignora** la pestaña de estado (Borrador / Pendiente / Activos / Cerrado / Cancelado).
- **Se respetan** los filtros de empresa, planta, ciudad, tipo de trabajo y búsqueda.
- **Se respeta siempre el alcance por rol**, porque el universo se toma de `allPermits`, que ya viene acotado por la suscripción de Firestore según el rol (un `lider_regional` sigue exportando solo lo suyo). La regla del rol `mantenimiento` —que de los pendientes solo ve los que esperan su firma— también se conserva.

**Refactor para que la vista y la exportación no diverjan** (misma lección que `permit-status.ts` en la Sesión 14): los criterios que **no** dependen del estado se extrajeron a un único predicado `matchesFilters`. `filteredPermits` (la tabla) = pestaña + `matchesFilters`; `exportPermits` (el Excel) = `matchesFilters` sobre todos los estados, ordenado por fecha de creación descendente para que el archivo sea determinista sin depender del ordenamiento de columnas de la pantalla.

De paso, la condición del rol `mantenimiento` pasó de evaluar `activeTab === 'pendiente_revision'` a evaluar el **estado del permiso**: es equivalente dentro de la pestaña y es lo correcto para la exportación.

El botón quedó rotulado **"Exportar Excel (todos)"**, con un tooltip que indica cuántos permisos se descargarán y qué filtros se aplican; y la portada del reporte muestra "Estados: todos" en la línea de filtros.

#### 18.2 Fix — las categorías no sumaban el total (faltaba la columna Borradores)

El cliente detectó que en la matriz "Empresa / Planta / Ciudad" la suma de Activos + Pendientes + Cerrados + Cancelados **no daba el Total** de cada fila.

**Causa:** las categorías del sistema son **cinco** (Borrador, Pendiente, Activos, Cerrado, Cancelado) y la matriz solo mostraba cuatro: **faltaba Borradores**. La diferencia de cada fila era exactamente su número de borradores. Verificado sobre el archivo generado: en un grupo con total 38 la suma daba 19, y el faltante coincidía con los 19 borradores.

El mismo hueco estaba en las **tarjetas KPI** del resumen ejecutivo, que mostraban Total / Activos / Pendientes / Cerrados / Cancelados: 150 contra 131.

**Corrección:**
- Matriz por planta: se agregó la columna **Borradores** y se reordenaron las categorías en el orden del ciclo de vida (Borradores → Pendientes → Activos → Cerrados → Cancelados). Ahora **cada fila cuadra con su total**.
- Resumen ejecutivo: la primera fila de KPIs pasó a **seis tarjetas** con las cinco categorías más el total (la hoja pasó de 15 a 18 columnas, que son exactamente 6 tarjetas de 3). La segunda fila incorporó "Firmas requeridas", que antes solo aparecía como pista dentro de otra tarjeta.
- Las notas al pie de ambas hojas ahora explican qué suma y qué no: las cinco categorías son excluyentes y cubren los 8 estados del sistema, mientras que "Alto riesgo" y "Firmas pendientes" son **indicadores transversales** que no forman parte del total (un permiso puede ser a la vez activo, de alto riesgo y tener firmas pendientes). Esa confusión era el otro riesgo de lectura del tablero.

**Verificación:** se comprobó fila por fila sobre el archivo generado que Borradores + Pendientes + Activos + Cerrados + Cancelados = Total en **todas** las filas de la matriz (0 descuadres) y que las tarjetas KPI suman el total (150 = 19 + 19 + 56 + 18 + 38). Integridad XML sin observaciones.

---

### 2026-08-04 (Sesión 17) — Excel profesional: plantilla de importación con listas desplegables e instrucciones + reporte gerencial con resumen ejecutivo (nueva dependencia: ExcelJS)

**Solicitud:** que la plantilla de importación sea "inteligente" (listas desplegables automáticas, pestaña de instrucciones, apariencia profesional) y que la exportación a Excel deje de ser un volcado plano de la base de datos para convertirse en un reporte gerencial con análisis.

#### 17.1 Hallazgo de fondo: `xlsx` (SheetJS community) no puede hacerlo

El código anterior de la plantilla **definía estilos** (`fill`, `font`, `border` por celda) que **nunca llegaban al archivo**: la build community de SheetJS que se instala desde npm ignora el atributo `s` al escribir, y tampoco soporta validación de datos. Verificado releyendo el archivo generado: la celda `A1`, que el código pintaba de rojo, volvía con `patternType: "none"`. Es decir, la plantilla "con formato" llevaba tiempo saliendo como una cuadrícula plana y sin desplegables.

**Decisión: se agregó `exceljs` (^4.4.0)** como dependencia. Soporta estilos, validación de datos, formato condicional, paneles congelados, autofiltros y notas. `xlsx` se mantiene para la **lectura** de los archivos importados (donde funciona bien y ya está integrado).

Ambos libros se generan **en el servidor** (route handlers, `runtime = 'nodejs'`): ExcelJS es pesado para el bundle del cliente y la generación no necesita estar en el navegador.

#### 17.2 Plantilla de importación inteligente — `GET /api/export/hallazgos-template`

Reescrita en `src/lib/excel-hallazgos-template.ts`. Tres hojas:

1. **Instrucciones** — banner, pasos numerados de uso, leyenda de convenciones (rojo = obligatorio, azul = opcional, amarillo = ejemplo, celda con flecha = lista), explicación aparte de las tres columnas multivalor y un diccionario completo de los 28 campos (campo / obligatorio / valores permitidos / ejemplo).
2. **Plantilla Hallazgos** — encabezados de color según obligatoriedad, con **nota emergente** por columna; fila de EJEMPLO en amarillo marcada como desechable; 300 filas listas para capturar; paneles congelados y autofiltro.
3. **Listas** (oculta) — catálogos que alimentan los desplegables.

**4.200 celdas con validación** (verificado releyendo el archivo): 2.400 listas desplegables (Tipo de Actividad, Tipo de Hallazgo, Responsabilidad, Clase, Intervención, Estado, Peligros, Personal Expuesto), 1.200 validaciones de fecha y 600 de porcentaje 0–100. Cada una con mensaje de ayuda al seleccionar la celda y mensaje de error al escribir un valor inválido. Las dos columnas multivalor (Peligros, Personal Expuesto) usan desplegable **no estricto**, para que el desplegable ayude pero se pueda escribir `"Alturas, Excavaciones"`.

**Se eliminó la plantilla duplicada** (la deuda anotada en la Sesión 16): la página de importación ya no genera su propio archivo con `xlsx`, ahora descarga esta plantilla oficial. Fuente única.

#### 17.3 Bug crítico detectado por la prueba de ida y vuelta

Con la plantilla multi-hoja, el parser de importación **habría dejado de funcionar**: leía `wb.SheetNames[0]`, que pasó a ser "Instrucciones", y habría respondido "No se reconocieron columnas válidas" ante un archivo perfectamente válido. Ahora recorre todas las hojas y elige **la que más encabezados reconoce** — compatible tanto con la plantilla nueva como con los archivos de una sola hoja ya en circulación.

#### 17.4 Reporte gerencial — `POST /api/export/hallazgos-report`

`src/lib/excel-hallazgos-report.ts`. El botón "Exportar Excel" del módulo envía los hallazgos **ya filtrados y ordenados** (exactamente lo que el usuario ve, con los filtros aplicados anotados en la portada) y recibe un libro de cuatro hojas:

1. **Resumen Ejecutivo** — banner con autor, fecha y filtros; **10 KPIs** en tarjetas (total, abiertos, cerrados, tasa de cierre, Clase A abiertos, cumplimiento promedio, días promedio de cierre, antigüedad promedio de los abiertos, hallazgos con plan de acción, seguimientos totales); distribuciones por clase, estado, tipo de hallazgo y responsabilidad; peligros más frecuentes; personal expuesto; **tendencia de 12 meses** con nuevos/cerrados/% de cierre; y rankings Top 10 de empresas y plantas con % de cierre y Clase A abiertos. Las proporciones se ven con barras de bloques calculadas en JS (se ven igual en Excel, LibreOffice y Google Sheets, sin depender del recálculo).
2. **Hallazgos** — los 31 campos como tabla filtrable, con paneles congelados, semáforo de color por clase y estado, y **escala de color** (rojo → ámbar → verde) sobre el % de cumplimiento.
3. **Seguimientos** — una fila por seguimiento (hallazgo, empresa, planta, clase, estado, n.º, fecha, %, observación), que es la vista que faltaba para analizar el avance del plan de acción.
4. **Análisis por Planta** — matriz empresa/planta con total, desglose por clase, abiertos, cerrados, % de cierre, cumplimiento promedio y Clase A abiertos.

Las firmas ya no se exportan como data URL en base64 (inflaban el archivo sin aportar); se exporta si existen o no.

**Archivos:** `src/lib/excel-theme.ts` (paleta y helpers: banner, títulos de sección, tarjetas KPI, tablas, barras), `src/lib/excel-hallazgos-template.ts`, `src/lib/excel-hallazgos-report.ts`, `src/app/api/export/hallazgos-template/route.ts` (reescrito), `src/app/api/export/hallazgos-report/route.ts` (nuevo), `src/app/(app)/hallazgos/page.tsx` (exportación vía API, con estado de carga; se retiró el import de `xlsx`), `src/app/(app)/hallazgos/importar/page.tsx` (descarga la plantilla oficial, selección de hoja, descarte de filas guía).

#### 17.5 Fix — Excel pedía reparar el reporte (`dataBar` de ExcelJS genera XML inválido)

Al abrir el primer reporte en Excel de escritorio apareció *"Encontramos un problema con contenido de Reporte_Hallazgos_SGTC…"* y, al reparar, *"Parte reparada: /xl/worksheets/sheet2.xml parte con error de XML"*. `sheet2` es la hoja **Hallazgos**, la única con formato condicional.

**Causa (verificada descomprimiendo el .xlsx y leyendo el XML):** ExcelJS escribió

```xml
<dataBar><cfvo type="num" val="0"/><cfvo type="num" val="1"/></dataBar>
<extLst><ext uri="{B025F937-…}"><x14:id/></ext></extLst>
```

con **dos defectos**: falta el elemento `<color>`, que el esquema OOXML exige dentro de `dataBar`, y el `<x14:id/>` va **vacío**, apuntando a una definición x14 que nunca se escribe. Es una limitación conocida de ExcelJS con las barras de datos.

**Solución:** se reemplazó la regla `dataBar` por una `colorScale` de tres puntos (rojo → ámbar → verde), que ExcelJS sí serializa completa y válida. Comunica lo mismo (avance del cumplimiento de un vistazo) sin XML inválido.

Se añadió al proceso una verificación reutilizable del `.xlsx` generado: descomprimir, comprobar que **todas** las partes XML estén bien formadas y buscar los patrones que disparan la reparación de Excel (`<x14:id/>` vacío, `dataBar` sin `color`, `rgb="undefined"`, valores `NaN`, fórmulas y validaciones vacías). Ambos libros pasan sin observaciones.

---

**Verificación:** `tsc --noEmit` sin errores nuevos (persiste el preexistente `Hallazgo.ciudad`). Plantilla generada y releída: 3 hojas, 28 columnas, estilos presentes (`A1` sí sale rojo) y 4.200 celdas validadas; el circuito de notas está completo (`comments2.xml` + `vmlDrawing2.vml` + rels + `<legacyDrawing>` + declaraciones en `[Content_Types].xml`). Reporte generado con 120 hallazgos de prueba: 4 hojas, 39 KB, KPIs correctos (120 total / 60 abiertos / 60 cerrados / 73 % de cumplimiento / 182 días promedio), 180 filas de seguimientos. **Prueba de ida y vuelta completa:** plantilla generada → diligenciada como lo haría un usuario → parseada con la lógica real de la página → validada con la server action real: 2/2 filas OK, incluyendo peligros con coma, valores sin tildes y seguimientos múltiples. **Pendiente:** confirmar en Excel de escritorio que el reporte ya abre sin el aviso de reparación y revisar el render de la plantilla.

---

### 2026-08-04 (Sesión 16) — Hallazgos: campos Responsabilidad y Tipo de Hallazgo, seguimientos múltiples, fix de Peligros/Personal Expuesto que "no guardaban" + renombre de "Diagnóstico" a "Inventario" en Alturas y Confinados

**Solicitud del cliente (5 puntos):** (1) renombrar la etiqueta "Diagnóstico" a "Inventario" en Alturas —y luego en Confinados y demás módulos—, (2) agregar en el formulario de hallazgos un campo de selección de responsabilidad **Directa / Corporativa**, (3) revisar el ítem de **peligros** porque "no guarda" (aplica igual a **personal expuesto**), (4) permitir registrar **varios seguimientos** en el plan de acción y (5) agregar en Información General otro campo con las opciones **Positivo / Seguimiento**.

---

#### 4.1 Fix — Peligro Inspeccionado y Personal Expuesto "no guardaban" (bug real de sincronización, no de escritura)

**Causa raíz:** `PeligroSelector` y `PersonalExpuestoSelector` (en [hallazgo-form.tsx](src/app/(app)/hallazgos/components/hallazgo-form.tsx)) copiaban el prop `value` a `useState` **solo en el montaje**. El `form.reset()` que carga un hallazgo existente (o recupera un borrador de `localStorage`) ocurre en un `useEffect` **posterior**, así que el estado interno del selector quedaba con el valor inicial vacío y nunca se resincronizaba. Consecuencias: (a) al abrir un hallazgo guardado los chips se veían **sin seleccionar** aunque el dato sí estaba en Firestore — de ahí el reporte de "no guarda"; y (b) peor, al tocar cualquier chip, `buildValue()` partía de ese `Set` vacío y **sobrescribía los peligros ya guardados** con la selección nueva → pérdida real de datos al editar.

**Solución:** ambos selectores pasaron a ser **100% controlados** — el estado se deriva del prop `value` en cada render (`parseValue(value)`), sin copias en `useState`. En `PeligroSelector` solo queda `showCustomManual` (para desplegar el textarea de "Otros" cuando aún no hay texto); su visibilidad efectiva es `showCustomManual || customText.length > 0`, de modo que un valor cargado con peligros libres abre el textarea automáticamente. Se descartaron las reglas de Firestore como causa: `match /hallazgos/{id}` no restringe campos en `update`.

#### 4.2 Campos nuevos en Información General — Responsabilidad y Tipo de Hallazgo

- `responsabilidad: 'Directa' | 'Corporativa'` (tipo `HallazgoResponsabilidad`) — sobre quién recae la corrección del hallazgo.
- `tipoHallazgo: 'Positivo' | 'Seguimiento'` (tipo `HallazgoTipo`) — naturaleza del reporte.

Ambos se renderizan con un componente nuevo y reutilizable `OptionToggle` (grupo de 2 botones con ícono y color propio, mismo lenguaje visual que "Tipo de Actividad"), acompañado del `<select className="sr-only">` registrado que ya usaba el formulario para que la validación pueda enfocar el campo con error.

**Decisión pendiente de confirmación del cliente:** ambos quedaron **obligatorios** (`z.enum` con `required_error`) y **sin preselección**, para no inventar datos. Los registros históricos se leen sin problema, pero al **editar** un hallazgo anterior el sistema exige seleccionarlos antes de actualizar. Si se prefiere no generar esa fricción sobre el histórico, basta con hacer `.optional()` cada `z.enum`.

#### 4.3 Plan de Acción — varios seguimientos

Se reemplazó el par de campos sueltos `fechaSeguimiento1` / `porcentajeCumplimiento` por un arreglo `seguimientos[]` manejado con `useFieldArray`. Cada seguimiento tiene **fecha** (requerida), **% de cumplimiento** (con barra de progreso individual), **observación** y sus **propias evidencias fotográficas** (`FileUpload` → carpeta `hallazgos/seguimientos`, máx. 5). Se agregan/eliminan libremente con "Agregar seguimiento" / botón de papelera; en modo lectura se muestran sin controles de edición.

**Compatibilidad hacia atrás (en ambos sentidos), que es lo delicado de este cambio:**
- **Al cargar:** `seguimientosFromHallazgo()` usa `seguimientos[]` si existe; si no, migra el par legacy (`fechaSeguimiento1` + `porcentajeCumplimiento`) al primer elemento de la lista, para que los hallazgos antiguos se vean y se editen igual.
- **Al guardar:** los campos legacy se **re-derivan** del arreglo (`fechaSeguimiento1` = fecha del primer seguimiento cronológico; `porcentajeCumplimiento` = último % informado), porque los consumen el PDF, la exportación a Excel y los reportes existentes. Los seguimientos se ordenan por fecha y se limpian de claves `undefined` (Firestore las rechaza incluso dentro de objetos anidados).
- **Al vaciar la lista:** se borra `fechaSeguimiento1` con `deleteField()`. El `%` legacy **solo** se borra si provenía de un seguimiento (`hallazgo.seguimientos?.length` o `fechaSeguimiento1` presentes al cargar); un registro antiguo que tenía `%` **sin** fecha de seguimiento conserva su valor intacto.
- La recuperación de borradores (`draft_hallazgo` en `localStorage`) rehidrata las fechas de cada seguimiento (JSON las serializa como string ISO).

#### 4.4 Renombre "Diagnóstico" → "Inventario" (Alturas y Confinados)

Cambio **solo de etiquetas visibles**: tarjetas de submódulo, encabezados, breadcrumbs, botones ("Nuevo inventario", "Ver inventarios"), estados vacíos, diálogos de eliminación, toasts, la pregunta "¿El cliente acepta todo lo relacionado en el inventario?", los títulos de instrucciones de las plantillas Excel y sus nombres de archivo (`plantilla_inventario_alturas.xlsx`, `plantilla_inventario_confinados.xlsx`).

**No se tocaron** las rutas (`/alturas/diagnostico`, `/confinados/diagnostico`), las colecciones de Firestore ni los identificadores de código (`DiagnosticoAltura`, `useDiagnosticosAlturas`, `calcDiagnosticoAlturaScore`…), para no romper enlaces guardados ni datos existentes. Barrido case-insensitive sobre `src/`: Calderas, Energías Peligrosas, dashboard, guía y componentes compartidos no tenían la etiqueta. Se dejó **a propósito** la frase normativa de [AnexoEnergiaStep.tsx](src/app/(app)/permits/create/components/AnexoEnergiaStep.tsx) ("…cumpliendo las etapas de diagnóstico, planeación y ejecución de trabajos"), que no es la etiqueta del módulo.

#### 4.5 Carga masiva desde Excel — puesta al día con el formulario

Al revisar si los cambios anteriores habían llegado a la importación masiva aparecieron **tres huecos reales**, dos de ellos preexistentes:

1. **Peligro Inspeccionado y Personal Expuesto llegaban en un formato que la app no entiende.** La plantilla pide las opciones **separadas por coma**, pero los selectores de chips del formulario parten el valor por **salto de línea**. Un `"Propio, Contratistas"` importado no coincidía con ninguna opción: el campo se veía **vacío** en el formulario y se perdía al tocar cualquier chip. Ahora `normalizeMultiOption()` parte por `,` `;` o salto de línea, compara contra el catálogo **ignorando mayúsculas y tildes** (`"ENERGIAS PELIGROSAS"` → `"Energías Peligrosas"`) y guarda **una opción por línea**. En Peligros el texto no reconocido se conserva (el selector tiene "Otros"); en Personal Expuesto se **rechaza la fila** con un error explícito, porque ese campo no admite texto libre.
2. **No se podían importar varios seguimientos.** Nueva columna **`Seguimientos`**, que admite varios en una sola celda: `fecha | % | observación`, separados por `;` (el `%` y la observación son opcionales). Se validan fecha y rango del `%` por seguimiento, se ordenan cronológicamente y se derivan `fechaSeguimiento1` / `porcentajeCumplimiento` igual que en el formulario. La columna suelta `Fecha de Seguimiento` se mantiene por compatibilidad con plantillas ya en circulación y **solo se usa si `Seguimientos` viene vacía**.
3. **Los encabezados se reconocían por coincidencia exacta**, y la plantilla del endpoint `/api/export/hallazgos-template` usa nombres distintos y añade `" *"` a las columnas obligatorias → un archivo descargado de ahí era rechazado ("No se reconocieron columnas válidas"). Nuevo `resolveField()`: intenta la coincidencia exacta y, si falla, compara ignorando mayúsculas, tildes, espacios repetidos y el sufijo `" *"`; además se agregaron los alias de esa plantilla. Verificado: **27 de las 28 columnas** del archivo generado ahora mapean. La 28.ª era `Evidencias Plan de Acción (URLs)`, que existía en la plantilla pero **nunca se importaba** — también quedó soportada (URLs separadas por coma, filtradas a `http(s)`).

**Bonus de robustez:** `parseDate()` aceptaba fechas imposibles porque `new Date(2026, 12, 32)` no falla, JS desborda al mes siguiente — un `32/13/2026` se importaba en silencio como `01/02/2027`. Ahora se verifica que año/mes/día del `Date` construido coincidan con lo escrito. Aplica a **todas** las columnas de fecha del importador, no solo a los seguimientos.

Los catálogos `HALLAZGO_PELIGRO_OPTIONS` y `HALLAZGO_PERSONAL_EXPUESTO_OPTIONS` se movieron a `src/types/index.ts` para que formulario e importación normalicen contra **la misma fuente de verdad** (antes estaban solo dentro del componente de formulario).

---

**Archivos modificados:**

| Archivo | Cambio |
|---|---|
| `src/types/index.ts` | Nuevos tipos `HallazgoResponsabilidad`, `HallazgoTipo`, `HallazgoSeguimiento`. En `Hallazgo`: `responsabilidad?`, `tipoHallazgo?`, `seguimientos?`. `fechaSeguimiento1` y `porcentajeCumplimiento` quedan documentados como legacy/derivados. Catálogos compartidos `HALLAZGO_PELIGRO_OPTIONS` y `HALLAZGO_PERSONAL_EXPUESTO_OPTIONS`. |
| `src/app/(app)/hallazgos/components/hallazgo-form.tsx` | Selectores controlados (fix 4.1); `OptionToggle` + los dos campos nuevos; `seguimientoSchema` + `useFieldArray`; helpers `toDate()` y `seguimientosFromHallazgo()`; `onSubmit` deriva los campos legacy y usa `deleteField()` para limpiarlos. |
| `src/lib/pdf-hallazgo.ts` | "Tipo de Hallazgo" y "Responsabilidad" en Información General; contador de seguimientos + tabla de detalle (#, fecha, %, observación) en Plan de Acción; nueva galería "Evidencias de los Seguimientos". |
| `src/app/public/hallazgo/[id]/page.tsx` | Metadatos con Tipo de Hallazgo, Responsabilidad, Personal Expuesto y N.º de seguimientos; nueva tabla "Seguimientos del Plan de Acción". |
| `src/app/(app)/hallazgos/page.tsx` | Exportación Excel: columnas `Tipo de Hallazgo`, `Responsabilidad`, `Personal Expuesto`, `N° Seguimientos` y `Detalle Seguimientos`. |
| `src/app/api/export/hallazgos-template/route.ts` | Plantilla oficial: columnas `Tipo de Hallazgo`, `Responsabilidad` y `Seguimientos` (opcionales) + filas en la hoja de Instrucciones. |
| `src/app/(app)/hallazgos/importar/page.tsx` | `COLUMN_TO_FIELD` con las columnas nuevas (`Tipo de Hallazgo`, `Responsabilidad`, `Seguimientos`, evidencias) + alias de la plantilla del endpoint; `foldHeader()`/`resolveField()` para reconocimiento tolerante de encabezados; `TEMPLATE_COLS` actualizado con ejemplos y notas. |
| `src/app/(app)/hallazgos/importar/actions.ts` | `fold()`, `normalizeOption()`, `normalizeMultiOption()` y `parseSeguimientos()`; validación de Personal Expuesto y de cada seguimiento; escritura de `seguimientos[]` + campos legacy derivados + `evidenciasPlanAccion`; `parseDate()` endurecido contra fechas desbordadas. |
| `src/app/(app)/alturas/{page,diagnostico/page,diagnostico/[id]/page,diagnostico/nuevo/page,diagnostico/importar/page,analisis/page}.tsx` | Renombre de etiquetas a "Inventario". |
| `src/app/(app)/confinados/{page,diagnostico/page,diagnostico/[id]/page,diagnostico/nuevo/page,diagnostico/importar/page,analisis/page}.tsx` | Renombre de etiquetas a "Inventario". |

**Verificación:** `tsc --noEmit` sin errores nuevos (persisten los preexistentes ajenos a este cambio: `Hallazgo.ciudad` en `dashboard/page.tsx:321` y `hallazgos/page.tsx:137`, `user` posiblemente `null` en `layout.tsx`, `email.ts` y `firebase.ts`). **Importación:** se ejecutó la server action real `validateImportRows()` (vía `tsx`, con un stub de `server-only`) sobre filas de ejemplo — acepta peligros/personal con coma, sin tildes y en minúsculas, acepta seguimientos múltiples, y reporta correctamente responsabilidad/tipo inválidos, personal fuera de catálogo, fecha imposible (`32/13/2026`) y `%` fuera de rango. La plantilla del endpoint se descargó y se comprobó que **27 de 28 encabezados** mapean (la restante, evidencias, quedó soportada después). `executeImport()` **no** se ejecutó contra Firestore: la escritura real del arreglo `seguimientos[]` sigue pendiente de prueba manual. Smoke test contra el dev server en `:9003`: `/alturas`, `/alturas/diagnostico`, `/hallazgos`, `/hallazgos/crear`, `/hallazgos/importar`, `/confinados`, `/confinados/diagnostico`, `/confinados/analisis`, `/confinados/diagnostico/{importar,nuevo}` compilan y responden 200; `/api/export/hallazgos-template` genera el `.xlsx` (200, ~69 KB). **Pendiente de prueba manual con datos reales:** crear/editar un hallazgo con 2–3 seguimientos y descargar su PDF, para validar la escritura en Firestore de extremo a extremo.

---

### 2026-07-06 (Sesión 15) — Fix/UX: Modal de Cierre de Permiso — responsive, checklist de Trabajo en Caliente reubicado y obligatorio antes de la firma del Ejecutante (elimina deadlock)

**Contexto:** el "Módulo de Cierre de Permiso" tenía dos problemas: (1) se veía muy angosto en escritorio y (2) el checklist de Trabajo en Caliente se mostraba solo con "N/A" sin opciones editables. Al diagnosticarlo aparecieron dos temas de fondo.

**Aclaración de roles en el cierre** (confirmado en el código del modal): **"Responsable del Trabajo" = el Ejecutante** (creador del permiso), firma `closure.responsable` (paso ①). **"Autoridad del Área" = el Autorizante**, firma `closure.autoridad` (paso ②). Orden: ① Ejecutante → ② Autorizante.

**El deadlock detectado:** el checklist de Trabajo en Caliente es **requisito para cerrar** (`getHotWorkClosureBlockingReasons` bloquea el cierre si un ítem está sin responder o tiene valor inseguro, ver [permit-closure-rules.ts](src/lib/permit-closure-rules.ts)), pero la lógica de Sesión 13 lo **congelaba en cuanto el Ejecutante firmaba su cierre** (paso ①, la primera firma). Si el Ejecutante firmaba sin diligenciar el checklist, el permiso quedaba imposible de cerrar por el flujo normal (checklist requerido pero bloqueado) → solo cerrable con "Forzar Cierre de Emergencia". Además, `RadioCheck` pinta los valores `undefined` como "N/A", por lo que un checklist **sin responder** se veía como "N/A" y el modal aparecía en modo solo-lectura ("bloqueado tras la firma").

**Solución elegida (estricta, preserva la constancia y evita el deadlock a futuro):** se **impide que el Ejecutante firme su cierre hasta que el checklist esté completo y aprobado** (solo permisos de Trabajo en Caliente). Se mantiene el bloqueo de Sesión 13 (el checklist se congela tras la firma como constancia). Flujo resultante sin deadlock: diligenciar + guardar checklist → habilita firma ① → firma Ejecutante (se congela) → firma Autoridad ② → `cerrado`.

**Archivos modificados:**
- `src/app/(app)/permits/[id]/page.tsx`:
  - Modal responsive: `DialogContent` pasó de `sm:max-w-md` a `w-[95vw] sm:max-w-2xl lg:max-w-3xl`.
  - `RadioCheck`: las opciones editables `Sí/No/N/A` ahora son labels clickeables (antes solo el punto del radio).
  - El checklist de Trabajo en Caliente se **reubicó** desde el inicio del modal a **justo encima del bloque "① Responsable del Trabajo (Ejecutante)"**, para dejar claro que es su constancia. Nota contextual reforzada (obligatorio antes de firmar / bloqueado tras firmar).
  - Gate de firma: el botón "Firmar Cierre" del ① Responsable se **deshabilita** si `getHotWorkClosureBlockingReasons(permit.closure)` devuelve bloqueadores, con aviso inline + tooltip que lista lo que falta. Editabilidad del checklist sin cambios respecto a Sesión 13 (`!checklistLocked && en_ejecucion/suspendido && (creador||admin)`).
- `src/app/(app)/permits/actions.ts`:
  - `addSignature`, branch `cierre_responsable`: rechaza la firma en servidor si el permiso es de Trabajo en Caliente y el checklist tiene bloqueadores (la restricción no depende solo del botón deshabilitado).
  - `updatePermitClosureChecklist`: sin cambio neto (se mantuvo el guard de Sesión 13 que bloquea edición tras la firma del Responsable).

**Script operativo (solo lectura + destrabe puntual):** `scripts/destrabar-permiso-caliente.ts` — diligencia el checklist con los valores que aprueban el cierre (informó=SÍ, área despejada=SÍ, partículas=NO, continúa labor=SÍ, dispositivos retirados=SÍ, verificó estado=SÍ) manteniendo la firma del Responsable, para destrabar un permiso ya atascado (configurable en `TARGET_NUMBER`). Se ejecutó una vez sobre `PT-1783353111365-NK1U0K` (checklist estaba sin responder → diligenciado; firma del Ejecutante conservada; sin bloqueadores). Para cerrarlo solo falta la firma de la Autoridad (②). También quedó de Sesión 14 `scripts/diag-permisos-herzon.ts` (diagnóstico read-only).

**Verificación:** `tsc --noEmit` sin errores nuevos en los archivos tocados.

---

### 2026-07-06 (Sesión 14) — Fix: el módulo de Permisos subcontaba permisos (limit antes del filtro) + tarjetas del dashboard alineadas 1:1 con las pestañas

**Problema reportado:** para algunos usuarios el Dashboard y el módulo de Permisos de Trabajo mostraban cantidades distintas de permisos por estado (Activos, Pendientes, Cerrado, Cancelado). Caso concreto validado: el autorizante **Herzon Villamizar** (empresa `VGR-ITALCOL DEL NORTE S.A.S`, planta `LOS PATIOS`) veía en el Dashboard 34 permisos totales / 18 en ejecución / 14 cerrados, pero en el módulo solo 5 Activos / 4 Cerrados / 0 Cancelados.

**Causa raíz (verificada contra la BD con un script read-only):** la colección `permits` tiene **1178 documentos**. El módulo (`permits/page.tsx`) hacía `orderBy('createdAt','desc') + limit(200)` y **recién después** filtraba por empresa/planta en el cliente. Como los 200 más recientes globales están dominados por otras plantas (642 de ITALCOL S.A., 268 de GIRARDOTA…), **solo 9 de los 34 permisos de Herzon caían dentro de esa ventana de 200**. El `limit(200)` recortaba el universo **antes** del filtro fino. El Dashboard ya cargaba el conjunto completo (sin `limit`), por eso mostraba los 34 correctos → **el Dashboard estaba bien; el módulo era el que subcontaba**.

**Diagnóstico:** `scripts/diag-permisos-herzon.ts` (solo lectura, vía Admin SDK) confirmó los valores reales de la BD (Total 34 / Activos 18 / Cerrado 14 / Cancelado 2 / Pendiente 0) y simuló la query del módulo, reproduciendo exactamente el 5/4/0 de las capturas.

**El fix (bajo riesgo, sin tocar reglas ni queries de otros roles):**
- `src/app/(app)/permits/page.tsx` — **eliminados los tres `limit(200)`** de las ramas `lider_regional` (ambas), `admin` y `autorizante`, dejándolo igual que `dashboard/page.tsx` (que ya cargaba el universo completo justamente por esto). El filtro por empresa/planta/ciudad se aplica ahora sobre TODOS los permisos, no sobre una ventana recortada. Import `limit` retirado.

**Alineación de definiciones (fuente única de verdad para que Dashboard y módulo no se vuelvan a desincronizar):**
- `src/lib/permit-status.ts` (**nuevo**) — `UnifiedPermitStatus`, `PERMIT_TABS` y `matchesUnifiedStatus()`. Define las 5 categorías/pestañas (`borrador`, `pendiente_revision`, `activos` = aprobado+en_ejecucion+suspendido, `cerrado`, `cancelado` = cancelado+rechazado) en un solo lugar.
- `src/app/(app)/dashboard/page.tsx` — las tarjetas ahora son 1:1 con las pestañas del módulo: se reemplazó **"En Ejecución"** (que contaba solo `en_ejecucion`) por **"Activos"** (aprobado+en_ejecucion+suspendido) y se agregó la tarjeta **"Cancelados"** (cancelado+rechazado). El grid ya era `lg:grid-cols-5`. Para `mantenimiento`, la tarjeta "Pendientes" replica el criterio del módulo (solo los que esperan su firma). Usa `matchesUnifiedStatus()`.
- `src/app/(app)/permits/page.tsx` — reemplazada la lógica de estado inline por `matchesUnifiedStatus()` (comportamiento idéntico) + `permitStatuses` ahora es `PERMIT_TABS`. Agregado deep-link `?status=` (client-only) para que al hacer clic en una tarjeta del Dashboard se abra la pestaña correspondiente.

**Verificación:** `tsc --noEmit` sin errores nuevos en los archivos tocados (persiste el preexistente `Hallazgo.ciudad` en `dashboard/page.tsx:321`, ajeno a este cambio). Revisados `use-sidebar-badges.ts` (filtra por `status` en servidor, sin el bug) y el resto del repo: no hay otro `limit` que recorte vistas filtradas. Confirmado por el cliente que el módulo ahora muestra los valores correctos.

**Nota de escalabilidad (futuro, opcional):** el módulo ahora carga todos los permisos (~1178) como ya hacía el Dashboard. Funciona bien a este volumen. Si la colección crece a decenas de miles, el siguiente paso sería filtrar por empresa/planta en servidor con índices compuestos, en vez de cargar todo y filtrar en cliente.

---

### 2026-07-01 (Sesión 13) — Feat: Checklist de cierre Trabajo en Caliente + revalidación diaria "¿sigue igual?" + mediciones periódicas en Espacios Confinados

**Resumen:** tres ajustes solicitados por el cliente sobre los formatos físicos vigentes (Anexo "Emisión, Revalidación y Cierre" de Trabajo en Caliente y Anexo 2 de Espacios Confinados), implementados sin alterar la estructura ni la lógica existente. `tsc --noEmit`: 0 errores nuevos en los archivos tocados (los 13 errores preexistentes están en `dashboard`, `hallazgos`, `layout.tsx`, `email.ts`, `firebase.ts`, sin relación con este cambio). `next build`: exitoso, 43/43 páginas generadas.

#### Feat 1 — Checklist de cierre para Trabajo en Caliente (con bloqueo de cierre)

**Hallazgo previo a implementar:** el tipo `PermitClosure` ya tenía los campos `informeCulminacion`, `areaDespejada`, `evidenciaParticulas`, `continuaLabor`, `dispositivosRetirados` y `seguimientoCaliente.hora1/2/3` desde antes, y se leían en el PDF y en la exportación Excel — pero **ningún formulario los capturaba**: el diálogo "Módulo de Cierre de Permiso" solo manejaba las firmas de Responsable/Autoridad. Había que construir el checklist, no solo agregarle preguntas.

**Campos nuevos:** `PermitClosure.verificoEstadoArea` ("Seguimiento trabajo en caliente: se verificó el estado del área posterior a la culminación") y `ValidacionDiaria.actividadSigueIgual` (ver Feat 2).

**Reglas de bloqueo de cierre** (solo aplican si `selectedWorkTypes.caliente === true`; `N/A` nunca bloquea, confirmado con el cliente):

| Pregunta | Bloquea el cierre si la respuesta es |
|---|---|
| Se informó al responsable del área sobre la culminación | `NO` |
| Área despejada, ordenada, demarcación retirada | `NO` |
| Se evidencia partículas o material encendido | `SI` |
| Se continúa con la labor de manera normal | `NO` |
| Se retiraron todos los dispositivos de bloqueo (candados y tarjetas) | `NO` |
| Se verificó el estado del área posterior a la culminación | `NO` |

**Archivo nuevo:** `src/lib/permit-closure-rules.ts` — fuente única de verdad de la tabla anterior (`HOT_WORK_CLOSURE_RULES` + `getHotWorkClosureBlockingReasons()`), importada tanto por el cliente (UX) como por el servidor (seguridad), para que ambos evalúen exactamente la misma regla y no se desincronicen.

**Archivos modificados:**
- `src/types/index.ts` — nuevo campo `verificoEstadoArea` en `PermitClosure`.
- `src/app/(app)/permits/[id]/page.tsx` — nueva sección "Checklist de Cierre — Trabajo en Caliente" dentro del diálogo de cierre (visible solo si `selectedWorkTypes.caliente`), con las 6 preguntas SI/NO/N/A (reutilizando el componente `RadioCheck` ya existente en modo editable) + 3 campos de hora (30 min / 60 min / 2 h) + botón "Guardar Checklist". Se bloquea la edición tras la firma de cierre del Responsable. `getClosureStatus()` extendido con la Condición 6 usando `getHotWorkClosureBlockingReasons()`.
- `src/app/(app)/permits/actions.ts` — nueva acción `updatePermitClosureChecklist()` (guarda el checklist, exige `en_ejecucion`/`suspendido` y bloquea edición si ya hay firma de cierre); `updatePermitStatus()` ahora valida las mismas reglas de bloqueo **en servidor** dentro del bloque `status === 'cerrado'`, para que la restricción no dependa solo de un botón deshabilitado en el cliente.
- `src/lib/pdf-generators.ts` — el PDF de cierre ahora incluye `Verificó Estado del Área` y las 3 horas de seguimiento.

**Nota Firestore Rules:** no requirió cambios en `firestore.rules`. Las tres acciones nuevas de esta sesión (`updatePermitClosureChecklist`, `updatePermitAnexoATS`, `addPruebaGasesPeriodica`) escriben vía Admin SDK (`adminDb`) en Server Actions, que **bypasea** las Security Rules (estas solo aplican a escrituras desde el SDK de cliente/navegador). Pendiente menor documentado: `anexoATS` no está en la lista `affectedKeys().hasAny([...])` de la regla `allow update` de `permits` (línea ~149) — no bloquea nada hoy, pero si en el futuro se agrega un flujo **offline** para peligros/EPP (como el que ya existe para firmas en `offline-permits.ts`), habría que añadir `'anexoATS'` a esa lista.

#### Feat 2 — Revalidación diaria: "¿La actividad sigue igual?" con reapertura de peligros/EPP

Desde el día 2 en adelante (el día 1 ya recoge peligros/EPP en la creación del permiso), al abrir la firma de apertura diaria del Responsable se pregunta primero si la actividad sigue igual a la identificada inicialmente:
- **Sí** → continúa directo al flujo existente de nombre/fecha/firma, sin cambios.
- **No** → se abre el mismo componente `AtsStep` (`src/app/(app)/permits/create/components/AtsStep.tsx`, ya controlado por props `{ anexoATS, onUpdateATS }` y por eso 100% reutilizable fuera del wizard de creación) precargado con los valores vigentes; al guardar, actualiza `permit.anexoATS` (la misma fuente que usan el PDF y la aprobación inicial) y continúa a la firma.

**Archivos modificados:**
- `src/types/index.ts` — nuevo campo opcional `actividadSigueIgual` en `ValidacionDiaria` (registro auditable de qué día cambiaron los peligros).
- `src/app/(app)/permits/[id]/page.tsx` — `openDailyValidationSignatureDialog()` intercepta día 2+ del Responsable con el nuevo diálogo "Apertura de Nuevo Día"; nuevo diálogo "Actualizar Identificación de Peligros y EPP" que embebe `AtsStep`; `handleSaveDailyValidationSignature()` incluye `actividadSigueIgual` en el payload.
- `src/app/(app)/permits/actions.ts` — nueva acción `updatePermitAnexoATS()` (mismo guard `en_ejecucion`/`suspendido` que `addDailyValidationSignature`).

#### Feat 3 — Mediciones periódicas de gases en Espacios Confinados durante la ejecución

La tabla "Pruebas de Gases Periódicas" (LEL/O2/H2S/CO + Hora + Firma) ya existía en el wizard de creación, pero con tope de 4 filas y **solo de lectura** en la vista de ejecución del permiso.

**Archivos modificados:**
- `src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx` — se quitó el tope de 4 filas (tabla dinámica, sin límite).
- `src/app/(app)/permits/[id]/page.tsx` — la sección "Pruebas Periódicas" del Anexo Confinado ahora permite agregar mediciones también durante `en_ejecucion`/`suspendido` (botón "Agregar Medición" + diálogo con Hora/LEL/O2/H2S/CO + `SignaturePad`), visible para el creador del permiso, `admin`, `solicitante` o `autorizante`.
- `src/app/(app)/permits/actions.ts` — nueva acción `addPruebaGasesPeriodica()` (exige `en_ejecucion`/`suspendido` y `selectedWorkTypes.confinado`; hace push al arreglo existente sin reemplazarlo).

No se requirió cambio de tipos para este punto: `PruebaGasesPeriodica` ya tenía exactamente las columnas del formato Excel.

#### Compatibilidad

Todos los campos nuevos son opcionales (`?:`) y las reglas de bloqueo/acciones nuevas solo se activan para `selectedWorkTypes.caliente` / `.confinado` — permisos de otros tipos de trabajo (alturas, izaje, excavación, general) y permisos ya cerrados/en ejecución no se ven afectados.

#### Resumen de archivos (Sesión 13)

| Archivo | Cambios |
|---|---|
| `src/lib/permit-closure-rules.ts` | **Nuevo** — reglas de bloqueo del checklist de cierre (compartidas cliente/servidor) |
| `src/types/index.ts` | `PermitClosure.verificoEstadoArea`, `ValidacionDiaria.actividadSigueIgual` |
| `src/app/(app)/permits/[id]/page.tsx` | Checklist de cierre en el diálogo de cierre; paso "¿Sigue igual?" + `AtsStep` en validación diaria; tabla editable de mediciones periódicas |
| `src/app/(app)/permits/actions.ts` | Nuevas acciones `updatePermitClosureChecklist`, `updatePermitAnexoATS`, `addPruebaGasesPeriodica`; validación server-side de bloqueo de cierre en `updatePermitStatus` |
| `src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx` | Se quitó el tope de 4 filas en pruebas periódicas |
| `src/lib/pdf-generators.ts` | PDF de cierre incluye `verificoEstadoArea` y horas de seguimiento |

---

### 2026-06-25 (Sesión 12) — Fix: `lider_regional` no podía abrir permisos + Centro Legal público (políticas en el login)

**Resumen:** dos entregas. (1) Corrección de un bug de reglas de Firestore que impedía al rol `lider_regional` abrir el detalle de cualquier permiso. (2) Creación del conjunto completo de políticas legales públicas (privacidad/datos, términos, cookies, seguridad), accesibles desde el login, con **Nixus Capital Humano S.A.S.** como operador. `tsc --noEmit`: los archivos nuevos compilan sin errores (los errores restantes son preexistentes en `dashboard`, `(app)/layout.tsx`, `email.ts`, `firebase.ts`).

#### Fix 1 — `lider_regional` recibía "No tiene permisos para ver este documento" al abrir un permiso

**Archivo modificado:** `firestore.rules` (raíz, desplegado)

**Síntoma:** un usuario con rol `lider_regional` (ej. Líder Regional de Girón) veía los permisos en el dashboard y en la lista, pero al abrir cualquiera obtenía la pantalla de error *"Error al Cargar el Permiso — No tiene permisos para ver este documento o ha ocurrido un error."*

**Causa raíz:** inconsistencia en las reglas de la colección `permits`. La regla `allow list` **sí** incluía `isLiderRegional()`, pero la regla `allow read` (lectura de documento individual, `get`) **no**. Por eso la lista cargaba, pero el `onSnapshot` sobre el documento individual en `permits/[id]/page.tsx` fallaba con `PERMISSION_DENIED` → el callback de error mostraba ese mensaje. Los roles autorizados en `allow read` eran solo `admin`, creador, `autorizante`, `lider_sst` y `mantenimiento`.

**Fix aplicado:** se añadió `isLiderRegional()` a la cláusula `allow read` de `/permits/{permitId}`, alineándola con `allow list`. El scope (empresa/planta/ciudad) se sigue validando en el cliente con `isInLiderRegionalScope()` (`src/lib/role-config.ts`), mismo patrón ya documentado para `list`.

```
allow read: if isSignedIn() &&
              (isAdmin() ||
               isLiderRegional() ||      // ← agregado (espeja allow list)
               isCreator(resource.data) ||
               ...
```

> ⚠️ **Pendiente de despliegue:** ejecutar `firebase deploy --only firestore:rules` para activar el fix en producción (sin esto el `lider_regional` sigue viendo el error).

#### Fix 2 — Centro Legal público: políticas accesibles desde el login

Se creó el conjunto de documentos legales que toda aplicación debe publicar, conforme a la normativa colombiana de protección de datos (Ley 1581 de 2012, Decreto 1074 de 2015, Ley 1273 de 2009). Son **rutas públicas** (fuera del grupo `(app)`, sin autenticación) y quedan enlazadas desde el footer del login.

**Roles de tratamiento de datos reflejados en los documentos:**
- **Nixus Capital Humano S.A.S.** (NIT 900.490.623-4) → Encargado del Tratamiento / operador (gestión de almacenamiento y licenciamiento).
- **Italcol** → Responsable del Tratamiento.
- **Google Firebase / GCP** → subencargado (infraestructura, transferencia internacional de datos).

**Archivos creados:**

| Archivo | Descripción |
|---|---|
| `src/lib/legal-config.ts` | Fuente única de datos del operador (razón social, NIT, dirección, contacto, marco normativo, fecha de actualización). ⚠️ El correo/teléfono de contacto son placeholders pendientes de confirmar. |
| `src/components/legal/legal-shell.tsx` | Contenedor visual compartido (header con logo, navegación entre documentos, footer con datos de Nixus). |
| `src/app/legal/page.tsx` | Centro Legal (índice de las 4 políticas). |
| `src/app/legal/privacidad/page.tsx` | Política de Privacidad y Tratamiento de Datos Personales — incluye datos sensibles tratados (EPS/ARL/pensiones, firma digitalizada, geolocalización), finalidades, derechos Habeas Data, transferencia internacional y autorización. |
| `src/app/legal/terminos/page.tsx` | Términos y Condiciones de Uso. |
| `src/app/legal/cookies/page.tsx` | Política de Cookies y Almacenamiento Local (PWA: sesión, IndexedDB, offline; sin cookies de marketing). |
| `src/app/legal/seguridad/page.tsx` | Política de Seguridad de la Información (control de acceso por rol/scope, cifrado, infraestructura, gestión de incidentes). |

**Archivo modificado:**

| Archivo | Cambios |
|---|---|
| `src/app/login/page.tsx` | Footer con enlaces públicos a las 4 políticas (Privacidad · Términos · Cookies · Seguridad). |

> **Regla de marca:** los documentos presentan exclusivamente a Nixus Capital Humano como operador; no se menciona ningún otro proveedor de desarrollo.

#### Resumen de archivos (Sesión 12)

| Archivo | Cambios |
|---|---|
| `firestore.rules` | `allow read` de `permits` ahora incluye `isLiderRegional()` |
| `src/lib/legal-config.ts` | **Nuevo** — datos legales del operador |
| `src/components/legal/legal-shell.tsx` | **Nuevo** — shell compartido de páginas legales |
| `src/app/legal/**` | **Nuevo** — índice + 4 páginas de políticas |
| `src/app/login/page.tsx` | Enlaces a las políticas en el footer |

---

### 2026-06-19 (Sesión 11) — Fix: lentitud de ~1 min al cargar permisos (upgrade Firebase v12) + consistencia del dashboard por rol

**Resumen:** los permisos tardaban ~1 minuto en mostrarse y, para algunos usuarios (sobre todo de doble rol), el dashboard mostraba 0 permisos aunque la tabla de permisos sí los listaba. Se atacaron ambas causas raíz. Build de producción limpio verificado (38/38 páginas).

#### Fix 1 — Lentitud de ~1 min: upgrade a `firebase@12.15.0` y eliminación del long-polling forzado

**Archivos modificados:** `src/lib/firebase.ts`, `package.json`, `package-lock.json`

**Causa raíz:** desde la Sesión 5 se mantenía `experimentalForceLongPolling: true` como *workaround* del bug del SDK v11.10.0 `INTERNAL ASSERTION FAILED: ca9 / ve:-1` (eventos RESET del servidor tras `unsubscribe` que decrementaban el *target count* a -1). Ese flag **fuerza** el transporte HTTP long-polling en lugar de WebChannel/gRPC; en muchas redes la primera respuesta no se vacía hasta el *timeout* del long-poll (~60 s), que es exactamente la espera observada.

**Investigación (release notes oficiales + issue [#9267](https://github.com/firebase/firebase-js-sdk/issues/9267)):**
- El bug `ca9` **NO** se corrigió en ninguna versión de la línea **11.x**; persistió hasta la 12.x.
- Se corrigió en **`firebase@12.13.0`** (release 7-may-2026): *"Fixed a race condition that caused 'ca9: pendingResponses less than 0' assertions."*

**Fix aplicado:**
```typescript
// Antes
localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
experimentalForceLongPolling: true,   // workaround bug ca9 v11.10.0

// Después (firebase 12.15.0 — ca9 ya corregido en 12.13.0)
localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
experimentalAutoDetectLongPolling: true,   // usa transporte rápido; long-poll solo si la red lo exige
```
- `firebase`: `^11.9.1` → `^12.15.0` (`@firebase/firestore` 4.8.0 → 4.16.0).
- Se reemplaza `experimentalForceLongPolling` por `experimentalAutoDetectLongPolling`: usa el camino rápido por defecto (elimina la latencia de ~60 s) y solo cae a long-polling si la red (proxies corporativos en planta) lo requiere.

**Validaciones del upgrade:**
- *Breaking changes* de la v12 afectan solo al módulo AI/VertexAI e import `firebase/vertexai` → **0 usos** en esta app.
- Node 24 cumple el mínimo de la v12 (≥ 20). `firebase-admin` 13.6 (SDK servidor) no se ve afectado.
- ⚠️ **NOTA DE DESPLIEGUE:** la actualización requiere **instalación limpia** (`npm ci` / lockfile). Un upgrade *incremental* sobre un `node_modules` de la v11 deja el árbol `@firebase/*` inconsistente y rompe el prerender estático (`PageNotFoundError`). Firebase App Hosting instala desde `package-lock.json`, por lo que el deploy es limpio por defecto; este punto solo aplica a actualizaciones manuales en local.

#### Fix 2 — Dashboard mostraba 0 permisos a usuarios de doble rol

**Archivo modificado:** `src/app/(app)/dashboard/page.tsx`

**Causa raíz:** el dashboard elegía la consulta de permisos mirando también `otherRoles`:
```typescript
} else if (user.role !== 'admin' && (user.role === 'mantenimiento' || (user.otherRoles ?? []).includes('mantenimiento'))) {
```
Un usuario cuyo rol **activo** era, por ejemplo, `solicitante` pero que tenía `mantenimiento` entre sus otros roles caía en la rama de mantenimiento (que solo trae permisos `pendiente_revision` con firma de mantenimiento pendiente) → dashboard en **0**. La tabla de permisos (`permits/page.tsx`) enruta solo por el rol **activo**, por eso ahí sí se mostraban.

**Fix aplicado:** se enruta únicamente por el rol activo (`user.role === 'mantenimiento'`), respetando el selector de rol — consistente con la tabla de permisos. Era el único punto del dashboard que consultaba `otherRoles`.

#### Fix 3 — Dashboard usaba subconjuntos más estrechos que la tabla de permisos

**Archivo modificado:** `src/app/(app)/dashboard/page.tsx`

**Causa raíz:** dentro de cada rama de rol, el dashboard filtraba a un subconjunto más estrecho que `permits/page.tsx`, por lo que las tarjetas y estadísticas no reflejaban los permisos en los que el usuario realmente interactúa (la tabla sí los mostraba). Se alinearon las consultas con la lógica ya probada de la tabla (mismos índices Firestore):

| Rol | Antes (dashboard) | Después (= tabla de permisos) |
|---|---|---|
| `lider_sst` | Solo `selectedWorkTypes.alturas` + `isSSTSignatureRequired` | **Todos** los permisos de su planta (`where('generalInfo.planta','==',planta)` + filtro empresa + exclusión de borradores ajenos) |
| `mantenimiento` | Solo pendientes de su firma (`pendiente_revision` + `approvals`) | **Todos** los de energía (`or(controlEnergia, selectedWorkTypes.energia)`) de su planta, cualquier estado |
| `autorizante` | Incluía borradores ajenos | Excluye borradores ajenos (`borrador` → solo `createdBy === uid`) |
| `lider_regional` | Incluía borradores ajenos | Excluye borradores ajenos |

`solicitante` y `admin` ya eran consistentes (sin cambios).

#### Fix 4 — Hallazgos: error "La fecha de visita es requerida" con la fecha ya seleccionada

**Archivo modificado:** `src/app/(app)/hallazgos/components/hallazgo-form.tsx`

**Síntoma:** al registrar un hallazgo, el campo "Fecha de Visita" mostraba la fecha seleccionada (ej. *19 de junio de 2026*) pero la validación arrojaba "La fecha de visita es requerida" e impedía guardar.

**Causa raíz (confirmada con repro de las librerías reales):** el formulario tiene autoguardado de borrador con `localStorage.setItem('draft_hallazgo', JSON.stringify(value))`. `JSON.stringify` convierte los objetos `Date` en **string ISO**. Cuando ese string llega a la validación:
- `date-fns` 3.6 **`format()` SÍ formatea un string ISO** → el botón muestra la fecha correctamente.
- Pero `zod` `z.date()` **rechaza el string** por no ser un objeto `Date` → error de fecha.

Es decir, la UI mostraba la fecha mientras la validación la consideraba inválida — una inconsistencia de tipo (string vs Date), no un campo vacío.

**Fix aplicado:**
1. **Helper `dateField()` con `z.preprocess`** — convierte `string`/`number` → `Date` antes de validar, en `fechaVisita` (requerida) y en las fechas opcionales del plan de acción (`fechaMedidaImplementada`, `fechaSeguimiento1`, `fechaCierre`). Mantiene el mensaje de "requerida" para `undefined`.
   ```typescript
   const dateField = (opts?) => z.preprocess(
     (v) => (typeof v === 'string' || typeof v === 'number') ? new Date(v) : v,
     z.date(opts),
   );
   ```
2. **Restauración de borrador robusta** — `fechaVisita` siempre queda como `Date` válido (un borrador antiguo sin el campo, o serializado como string, ya no pierde el default ni deja la fecha vacía).

Build de producción limpio verificado (38/38 páginas).

---

#### ⏳ Tarea pendiente (backlog) — Fase 3: optimización opcional de re-suscripciones del dashboard

> **Estado:** NO implementada. La lentitud y las inconsistencias del dashboard ya quedaron resueltas sin necesidad de esta fase. Se documenta como mejora futura.

Pendiente de evaluar en una próxima iteración (cada ítem conlleva riesgo y por eso se pospuso):

1. **Estabilizar la referencia `user`** en los `useEffect` de suscripción (`dashboard/page.tsx`, `permits/page.tsx`): depender de `user?.uid` / `user?.role` en lugar del objeto `user` completo, para evitar re-suscripciones de listeners en cada snapshot del perfil. **Riesgo:** si `empresa`/`planta` cambian a mitad de sesión, el listener no se re-suscribiría con los nuevos filtros.
2. **Reponer `limit()` en el dashboard** y migrar los conteos globales a `getCountFromServer` para no descargar toda la colección solo para estadísticas. **Riesgo:** con `limit()` ingenuo las estadísticas quedarían inexactas si hay más de N permisos; requiere los conteos agregados.

---

### 2026-06-18 (Sesión 10) — Fix: cierre de permisos + badge Trabajo en Caliente + optimización de rendimiento Firestore + ocultar módulos Contratistas

#### Fix: autorizante veía "Cierre de Emergencia" al intentar firmar el cierre normal

**Archivo modificado:** `src/app/(app)/permits/[id]/page.tsx` (línea 1481)

**Causa raíz:** El botón "Cerrar Permiso" decidía entre el flujo normal y el de emergencia con esta condición:

```tsx
onClick={canChangeStatus('cerrado') ? handleOpenClosureDialog : handleEmergencyClosure}
```

`canChangeStatus('cerrado')` devuelve `true` solo para `solicitante` y `admin`. Cuando el **autorizante** hacía clic, `hasRole` era `false` → se disparaba `handleEmergencyClosure` directamente, mostrando el diálogo de "Cierre de Emergencia" con el mensaje "Falta la firma de cierre de la Autoridad del Área" — que es precisamente la firma que el autorizante quería capturar en ese momento.

La función correcta ya existía: `getClosureStatus()` evalúa las 5 condiciones reales de cierre (estado del permiso, firmas de trabajadores, firma responsable, firma autoridad, validaciones diarias de anexos). Su resultado estaba en `closureStatus` pero no se usaba para esta decisión. El flujo de emergencia ya tiene acceso desde **dentro** del diálogo normal (botón "Forzar Cierre de Emergencia" en línea 2342).

**Fix aplicado:**

```tsx
// Antes: solo solicitante/admin podían abrir el diálogo normal
onClick={canChangeStatus('cerrado') ? handleOpenClosureDialog : handleEmergencyClosure}

// Después: el diálogo normal siempre se abre; la emergencia es un camino secundario interno
onClick={handleOpenClosureDialog}
```

---

#### Feat: badge "T. Caliente" en la columna Tipo de Trabajo de la tabla de permisos

**Archivo modificado:** `src/app/(app)/permits/page.tsx`

Se añadió el tipo de trabajo `caliente` (Trabajos en Caliente) a las dos funciones que controlan la columna Tipo de Trabajo:

- **`getWorkTypeLabels`** — añadido `if (types.caliente) labels.push('Trabajo en Caliente')` (usado para búsqueda/filtrado de texto).
- **`getWorkTypeBadges`** — añadida entrada `{ key: 'caliente', label: 'T. Caliente', cls: 'bg-red-100 text-red-800' }` entre Confinados y Energías.

Los permisos con el anexo de Trabajos en Caliente ahora muestran su badge rojo en la lista.

---

#### Perf: 4 optimizaciones de rendimiento en la carga de datos Firestore

**Contexto:** todos los usuarios reportaban lentitud en el dashboard y la lista de permisos. El diagnóstico identificó 4 causas raíz tratables sin tocar el flujo de firmas ni el PDF:

1. **`memoryLocalCache` sin persistencia** — cada navegación entre páginas o recarga borraba la caché y forzaba re-descarga completa de Firestore.
2. **Sin filtros de servidor para `autorizante`, `admin` y `lider_regional`** — estos roles descargaban TODA la colección `permits` y filtraban en el cliente.
3. **`lider_sst` en dashboard: 4 operaciones simultáneas** — `getDocs×2 + onSnapshot×2 + fetchData()` en cada actualización.
4. **Sin `limit()` en la lista de permisos** — la lista descargaba todos los documentos aunque solo mostrara 25 por página.

##### Fix 1 — `persistentLocalCache` + `persistentMultipleTabManager`

**Archivo modificado:** `src/lib/firebase.ts`

```typescript
// Antes
localCache: memoryLocalCache()

// Después
localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
```

Los datos ahora sobreviven en IndexedDB del navegador. La segunda carga y la navegación entre páginas son instantáneas. Múltiples pestañas abiertas comparten una sola conexión Firestore. Se mantiene `experimentalForceLongPolling: true` (workaround del bug del SDK v11.10.0 — ver Sesión 5).

##### Fix 2 — Filtros en servidor para `autorizante`, `admin` y `lider_regional`

**Archivos modificados:** `src/app/(app)/permits/page.tsx`, `src/app/(app)/dashboard/page.tsx`

| Rol | Antes | Después |
|---|---|---|
| `autorizante` | Descarga toda la colección, filtra por empresa/planta en cliente | `where('generalInfo.empresa', '==', user.empresa)` + `where('generalInfo.planta', '==', user.planta)` en servidor |
| `lider_regional` | Descarga toda la colección, filtra por scope en cliente | `where('generalInfo.empresa', 'in', allowedEmpresas)` si tiene ≤30 empresas; planta/ciudad siguen cliente-side |
| `admin` | Descarga toda la colección | Sin cambio en dashboard (necesita datos completos para estadísticas); `limit(200)` en lista |

Los borradores ajenos se siguen excluyendo cliente-side para el `autorizante`.

##### Fix 3 — Consolidación de listeners `lider_sst` en dashboard

**Archivo modificado:** `src/app/(app)/dashboard/page.tsx`

```typescript
// Antes: getDocs×2 + onSnapshot×2 + fetchData() = hasta 5 operaciones por actualización
const q1 = query(permitsCollection, where('selectedWorkTypes.alturas', '==', true));
const q2 = query(permitsCollection, where('isSSTSignatureRequired', '==', true));
const fetchData = async () => { const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]); ... };
onSnapshot(q1, fetchData); onSnapshot(q2, fetchData); fetchData();

// Después: un solo onSnapshot con or()
const sstConstraints = [
  or(
    where('selectedWorkTypes.alturas', '==', true),
    where('isSSTSignatureRequired', '==', true),
  ),
];
onSnapshot(query(permitsCollection, ...sstConstraints), (snap) => { ... });
```

Se eliminó la importación de `getDocs` del dashboard.

##### Fix 4 — `limit(200)` en queries grandes de la lista de permisos

**Archivo modificado:** `src/app/(app)/permits/page.tsx`

Se añadió `limit(200)` a los queries de `admin`, `lider_regional` y `autorizante` en la lista de permisos. **No se aplica en el dashboard** porque las estadísticas (totales, gráficas, conteos) requieren el conjunto completo de datos.

---

#### UX: ocultar módulos "Verif. Contratistas" y "Plantillas Contratistas" del menú lateral

**Archivo modificado:** `src/app/(app)/layout.tsx`

Ambos ítems del sidebar se ocultaron para todos los roles añadiendo `{false && ...}` como condición. El código permanece intacto para reactivarlos fácilmente quitando el `false &&`.

```tsx
{/* Verif. Contratistas y Plantillas Contratistas — ocultos temporalmente */}
{false && (user.role === 'admin' || ...) && (
  <SidebarMenuItem>...</SidebarMenuItem>
)}
{false && (user.role === 'admin' || user.role === 'asesor_arl') && (
  <SidebarMenuItem>...</SidebarMenuItem>
)}
```

---

#### Resumen de archivos modificados (Sesión 10)

| Archivo | Cambios |
|---|---|
| `src/app/(app)/permits/[id]/page.tsx` | Fix botón "Cerrar Permiso": siempre abre diálogo normal |
| `src/app/(app)/permits/page.tsx` | Badge "T. Caliente"; filtros servidor autorizante/admin; `limit(200)` |
| `src/app/(app)/dashboard/page.tsx` | Filtros servidor lider_regional/autorizante; consolidación lider_sst en un solo listener |
| `src/lib/firebase.ts` | `persistentLocalCache` + `persistentMultipleTabManager` (reemplaza `memoryLocalCache`) |
| `src/app/(app)/layout.tsx` | Módulos Verif. Contratistas y Plantillas Contratistas ocultos (`false &&`) |

---

### 2026-06-16 (Sesión 9) — Feat: Módulo Plan de Trabajo Anual (SST · PHVA) + menú lateral colapsable por grupo

#### Feat: nuevo módulo "Plan de Trabajo Anual" bajo el ciclo PHVA

Implementación **desde cero** de un módulo de planeación SST offline-first, **exclusivo para administradores**. Es una implementación nueva y aislada: **no altera la lógica ni los datos de los demás módulos**. Reutiliza las convenciones del proyecto (Firestore SDK cliente, React Hook Form + Zod, shadcn/ui, xlsx, color de marca `nixus`).

**Modelo de datos (Firestore):**
- Colección `workPlans/{planId}` → documento del plan.
- Subcolección `workPlans/{planId}/tasks/{taskId}` → actividades.
- Agregados **denormalizados** en el plan: `tasksCount`, `executedCount`, `pendingCount`, `progressPercentage` (recalculados en cliente).

**Archivos creados:**

| Archivo | Descripción |
|---|---|
| `src/types/work-plan.ts` | Tipos del módulo: `PlanTrabajo`, `TareaPlanTrabajo`, `ProgresoMensual`, y enums (`EstadoPlanTrabajo`, `EstadoTarea`, `EtapaPHVA`, `TipoRecurso`, `FrecuenciaActividad`). Se siguió la convención del proyecto de un archivo de tipos por módulo (igual que `confinados.ts`/`alturas.ts`). |
| `src/lib/work-plan-service.ts` | Capa de servicio. Funciones puras (`initMonthlyProgress`, `calcTaskProgress`, `calcPlanProgress`, `calcPlanStats`, `isPlanReadOnly`, `normalizeMonthlyProgress`), CRUD de plan/tareas, `importTasks` (alta masiva por `writeBatch`), borrado en cascada de subcolección (`writeBatch`, ≤490 ops/lote) y `recalcPlanAggregates`. **Sin `runTransaction`** (offline-safe). |
| `src/hooks/use-work-plans.ts` | `useWorkPlans()` (lista) y `useWorkPlanDetail()` (doc + tareas) con `onSnapshot` en tiempo real. |
| `src/app/(app)/work-plans/page.tsx` | Lista de planes (buscador por nombre/año/estado/creador; tabla en desktop, tarjetas en móvil; lee agregados denormalizados). |
| `src/app/(app)/work-plans/[id]/page.tsx` | Detalle del plan: cabecera con estado, tarjeta resumen, acciones (Importar Excel, Editar, Cerrar plan con `AlertDialog`), y el `useEffect` de recálculo de agregados. |
| `src/app/(app)/work-plans/components/constants.ts` | Meses, configs de color/label de estados/PHVA/recurso, helpers `parseDate()` y `progressColor()`. |
| `src/app/(app)/work-plans/components/work-plan-form.tsx` | Diálogo crear/editar plan (RHF + Zod; valida `endDate >= startDate` y `year` 2020–2050; `version` inicia en 1). |
| `src/app/(app)/work-plans/components/task-form.tsx` | Diálogo nueva/editar actividad. |
| `src/app/(app)/work-plans/components/task-list.tsx` | Lista/CRUD de actividades con matriz por fila (tabla en desktop, tarjetas en móvil; oculta acciones y bloquea matriz si el plan está cerrado). |
| `src/app/(app)/work-plans/components/monthly-matrix.tsx` | Matriz mensual P/E (12 meses). Reglas: "E solo se marca si P está marcado" y "desmarcar P limpia E". |
| `src/app/(app)/work-plans/components/excel-import.tsx` | Diálogo de importación con plantilla `.xlsx` descargable, previsualización y validación por fila (columnas exactas: `Activity`, `PHVA`, `ResourceType`, `ResponsibleName`, `ResponsibleRole`, `Frequency`). |

**Reglas de negocio implementadas:**
- Al crear una tarea → 12 meses vacíos automáticos.
- Cumplimiento de tarea = (meses planeados **y** ejecutados / total planeados) × 100, redondeado; 0 si no hay meses planeados.
- Avance del plan = promedio aritmético simple de los cumplimientos de las tareas.
- `executedCount`/`pendingCount` se derivan del cumplimiento (≥100% = ejecutada), **no** del campo `status`, para que nunca se desalineen del %.
- Estado `Cerrado` → todo el plan en **solo lectura** (bloquea crear/editar/eliminar actividades y la matriz).

**Decisión clave offline (sin transacciones):** los agregados se recalculan en cliente. En la página de detalle, un `useEffect` compara el valor derivado (`calcPlanStats` + `calcPlanProgress`) contra el almacenado y **solo escribe si difieren**. Como `onSnapshot` refleja esa misma escritura, el cálculo **converge sin bucles**; un `useRef` (`recalcInFlight`) evita escrituras solapadas. Esto además hace backfill automático de contadores en planes creados antes.

> **Nota sobre offline:** el proyecto usa `memoryLocalCache()` + `experimentalForceLongPolling` en `src/lib/firebase.ts` (workaround del bug del SDK v11.10.0, ver Sesión 5), **no** caché IndexedDB persistente. Las escrituras siguen funcionando durante la sesión y se sincronizan al reconectar (no se usan transacciones), pero la caché no sobrevive a un recargado de la app.

#### Feat: control de acceso (solo administradores · defensa en profundidad)

- **Sidebar:** nuevo grupo "Planeación SST" → "Plan de Trabajo Anual" (`/work-plans`, ícono `CalendarRange`), renderizado solo si `user.role === 'admin'`.
- **Guard de ruta:** `page.tsx` y `[id]/page.tsx` redirigen a `/dashboard` con toast destructivo si el usuario no es admin; mientras cargan o no es admin, muestran un loader (no el contenido).
- **Firestore rules** (`firestore.rules`, raíz desplegado): nuevo bloque `workPlans` + subcolección `tasks`, con helper `canAccessWorkPlans()` que reutiliza `isAdmin()`. `create` exige `createdBy == uid`; `update` no permite reasignar `createdBy`.

> ⚠️ **Pendiente de despliegue:** ejecutar `firebase deploy --only firestore:rules` para activar el acceso en producción (sin esto el módulo devuelve `PERMISSION_DENIED`).

#### UX: menú lateral colapsable por grupo

**Archivos modificados:** `src/app/(app)/layout.tsx`, `tailwind.config.ts`

Cada grupo del menú lateral (Principal, Módulos, Planeación SST, Ayuda, Administración) ahora es **colapsable**: la etiqueta del grupo actúa como disparador con un chevron que rota según el estado.

- Nuevo componente reutilizable `CollapsibleNavGroup` basado en `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent` (Radix), usando `SidebarGroupLabel asChild` como trigger.
- Por petición del cliente, **todos los grupos arrancan recogidos/cerrados** (`defaultOpen = false`); el usuario los despliega con un clic.
- `tailwind.config.ts`: se agregaron keyframes/animaciones `collapsible-down` y `collapsible-up` (usan `--radix-collapsible-content-height`) para la transición suave; las de `accordion` no servían por usar otra variable CSS.

#### Validación

- `tsc --noEmit`: el módulo compila **sin errores** (los errores restantes son preexistentes en archivos no tocados: `dashboard`, `hallazgos`, `email.ts`; además `next.config` tiene `ignoreBuildErrors: true`).
- Build de producción (`next build`): **exitoso**; ambas rutas emitidas (`/work-plans` estática, `/work-plans/[id]` dinámica).

#### Resumen de archivos (Sesión 9)

| Archivo | Cambios |
|---|---|
| `src/types/work-plan.ts` | **Nuevo** — tipos del módulo |
| `src/lib/work-plan-service.ts` | **Nuevo** — capa de servicio (funciones puras + CRUD + agregados) |
| `src/hooks/use-work-plans.ts` | **Nuevo** — hooks de lectura en tiempo real |
| `src/app/(app)/work-plans/**` | **Nuevo** — páginas lista/detalle + 6 componentes |
| `firestore.rules` | Bloque `workPlans` + subcolección `tasks` (solo admin) |
| `src/app/(app)/layout.tsx` | Grupo "Planeación SST" (solo admin) + grupos de navegación colapsables (`CollapsibleNavGroup`) |
| `tailwind.config.ts` | Keyframes/animaciones `collapsible-down`/`collapsible-up` |

---

### 2026-06-16 (Sesión 8) — Fix: usuarios perdían empresa/planta/ciudad (se reseteaban a `N/A` solos)

#### Contexto

El cliente reportó que algunos usuarios que **ya tenían rol, empresa y planta asignados** aparecían tiempo después con todos esos campos en `N/A`, sin que nadie los editara manualmente. Se hizo un diagnóstico completo del módulo de usuarios y se identificaron dos causas raíz.

#### Causa raíz #1 (crítica) — Auto-aprovisionamiento destructivo en el cliente

**Archivo modificado:** `src/components/user-provider.tsx`

El `onSnapshot` del perfil del usuario, cuando recibía `docSnap.exists() === false`, **sobrescribía el documento completo** con un perfil por defecto (`empresa/ciudad/planta = 'N/A'`) usando `setDoc` **sin `merge`**.

El problema: Firestore tiene caché offline (`localCache`/persistencia) y el **primer emit del snapshot puede venir de la caché local** (dispositivo nuevo, caché fría, primer render offline). En ese caso `exists()` devuelve `false` aunque el perfil **sí existe en el servidor** → la app creaba un perfil `N/A` y, al reconectar, **ese `N/A` pisaba los datos reales del servidor**. El literal `'N/A'` solo se generaba en este archivo (huella forense que confirmó el origen).

**Fix aplicado:**
```typescript
} else {
    // Solo aprovisionamos cuando el SERVIDOR confirma que el doc no existe.
    if (docSnap.metadata.fromCache) {
        return; // ignorar snapshots de caché: evitan pisar datos reales
    }
    const defaultUser: User = { /* ...empresa/ciudad/planta = UNASSIGNED_PLACEHOLDER */ };
    setDoc(docRef, defaultUser, { merge: true }) // merge: red de seguridad
        .then(...).catch(...);
}
```

Resultado: un perfil con datos ya cargados **nunca más se reescribe a `N/A` por sí solo**. El aprovisionamiento por defecto solo ocurre para usuarios que realmente no tienen documento en Firestore (placeholder inicial).

#### Causa raíz #2 (mitigación) — Selects de edición acoplados a `dynamic_lists`

**Archivo modificado:** `src/app/(app)/admin/users/page.tsx`

En el modal de edición de usuario, los `<Select>` de Empresa/Ciudad/Planta se llenaban **solo** con las opciones de `dynamic_lists`. Si el valor guardado del usuario no coincidía exactamente (mayúsculas/acentos/espacios) con un ítem de la lista, el campo se mostraba **vacío** y se podía perder al guardar.

**Fix aplicado:** se inyecta el valor actual del campo como opción, de modo que siempre se muestre seleccionado:
```tsx
{Array.from(new Set([field.value, ...listEmpresas].filter(Boolean) as string[]))
  .map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
```
(idéntico para `listCiudades` y `listPlantas`).

#### Mejora — Valor por defecto unificado (fuente única de verdad)

**Archivos modificados:** `src/lib/role-config.ts`, `src/app/(app)/admin/users/actions.ts`, `src/hooks/use-auth.tsx`

Antes existían tres placeholders distintos para campos sin asignar: `'N/A'` (provider), `'Empresa no especificada'` (`syncAuthAndFirestoreUsers`) y `''`. Se centralizó en una sola constante:
```typescript
// src/lib/role-config.ts
export const UNASSIGNED_PLACEHOLDER = 'N/A';
```
Aplicada en `user-provider.tsx`, `syncAuthAndFirestoreUsers` y el fallback de demo de `use-auth.tsx` (este último además ahora usa `setDoc(..., { merge: true })`).

#### Rutas que NO tocan empresa/planta/ciudad (verificado)

- `migrateObsoleteRoles` → solo escribe `role`/`otherRoles`.
- `updateUserStatus` → solo escribe `disabled`.
- Editar el rol en el modal → los demás campos viajan en el formulario y ahora se muestran correctamente (no se borran).

#### Nota de remediación de datos

Estos cambios **previenen la recurrencia**, pero **no restauran** los perfiles que ya quedaron en `N/A`. Esos usuarios deben reasignarse desde el panel de admin (o vía un script puntual de remediación).

#### Resumen de archivos modificados (Sesión 8)

| Archivo | Cambios |
|---|---|
| `src/components/user-provider.tsx` | Guard `metadata.fromCache` + `setDoc` con `{ merge: true }` + constante unificada |
| `src/app/(app)/admin/users/page.tsx` | Selects de Empresa/Ciudad/Planta inyectan el valor guardado como opción |
| `src/app/(app)/admin/users/actions.ts` | `syncAuthAndFirestoreUsers` usa `UNASSIGNED_PLACEHOLDER` |
| `src/hooks/use-auth.tsx` | Fallback demo usa la constante + `setDoc` con `{ merge: true }` |
| `src/lib/role-config.ts` | Nueva constante `UNASSIGNED_PLACEHOLDER` |

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

#### Fix: el botón "Actualizar" no recargaba la app de forma fiable

Tras hacer clic en "Actualizar", visualmente "no pasaba nada". El cliente enviaba `SKIP_WAITING` y el SW se activaba, pero el reload dependía del evento `controllerchange`, que **no se dispara de forma fiable** porque el SW recién activado no reclamaba (`claim`) la pestaña abierta (Workbox no añade `clientsClaim` con `skipWaiting: false`).

**Archivos modificados:**
- `src/sw-message-handler.ts` — nuevo listener `activate` que ejecuta `self.clients.claim()`, para que la nueva versión tome control inmediato de las pestañas abiertas (la guardia de consentimiento del cliente evita recargas no deseadas en la primera instalación).
- `src/components/PWAUpdater.tsx` — recarga fiable: además de `controllerchange`, se escucha el `statechange` del worker a `activated` (señal fiable) y se añade una salvaguarda por timeout (4 s). Guardia `reloadingRef` para evitar recargas duplicadas. **Feedback visual inmediato**: el botón muestra "Actualizando…" con spinner y se deshabilita al hacer clic.

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
│   └── api/
│       ├── push/          → API route para suscripciones push
│       ├── export/        → Generación de Excel (plantilla y reportes)
│       └── cron/          → Tareas programadas (disparadas por Cloud Scheduler)
│           ├── hallazgos-daily-summary/  → Resumen diario a admins (19:00 Colombia)
│           └── permit-alerts/            → Alertas tempranas de permisos (cada hora)
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
│   ├── permit-alerts.ts   → Motor de reglas de alertas tempranas (puro) + zona horaria
│   ├── permit-alert-recipients.ts → Destinatarios de cada alerta según rol y alcance
│   ├── permit-alert-email.ts      → Plantilla del correo digest de alertas
│   ├── permit-closure-rules.ts    → Reglas que bloquean el cierre (trabajo en caliente)
│   ├── permit-status.ts   → Agrupamiento unificado de estados (dashboard y módulo)
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
# Firebase Admin (servidor)
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY          # Formato: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Resend (email)
RESEND_API_KEY
FROM_EMAIL                    # Remitente. OJO: el código lee FROM_EMAIL, no RESEND_FROM_EMAIL

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_FROM
WHATSAPP_TO                   # Destinatario único de los avisos de WhatsApp

# Web Push (VAPID)
NEXT_PUBLIC_VAPID_PUBLIC_KEY
VAPID_PRIVATE_KEY
VAPID_SUBJECT                 # mailto:... — por defecto mailto:nixus@sistedigital.net

# Aplicación
NEXT_PUBLIC_BASE_URL          # URL pública; se usa en los enlaces de correos y push

# Tareas programadas (Cloud Scheduler)
CRON_SECRET                   # Sin esta variable los endpoints /api/cron/* quedan SIN autenticación
```

> **La configuración de Firebase NO se lee del entorno.** `apiKey`, `authDomain`, `projectId`,
> `storageBucket`, `messagingSenderId` y `appId` están hardcodeados en `src/lib/firebase.ts`.
> El código no lee ninguna variable `NEXT_PUBLIC_FIREBASE_*`; si existe alguna en el panel de
> variables, es decorativa. Para cambiar de proyecto Firebase hay que editar ese archivo.

### Tareas programadas (crons)

> ⚠️ **`vercel.json` NO ejecuta nada en este proyecto.** El despliegue es **Firebase App
> Hosting**, y las definiciones de `crons` de ese archivo solo las lee Vercel. Los endpoints
> `/api/cron/*` existen y responden, pero sin un disparador externo nadie los llama.
> El disparador real es **Google Cloud Scheduler**.

Se registran con `scripts/setup-cron-scheduler.sh` (idempotente: crea o actualiza):

```bash
gcloud auth login                     # las credenciales caducan seguido
export CRON_SECRET='<el mismo valor del backend>'
bash scripts/setup-cron-scheduler.sh
```

| Job | Horario (America/Bogota) | Qué hace |
|---|---|---|
| `permit-alerts` | `0 * * * *` (cada hora) | Alertas tempranas de permisos (Sesión 19) |
| `hallazgos-daily-summary` | `0 19 * * *` | Resumen diario de hallazgos a administradores |

**Por qué Cloud Scheduler y no Vercel Cron:** acepta zona horaria nativa (se programa en hora
de Colombia, sin convertir a UTC ni compensar horarios de verano) y no tiene el límite de
2 jobs diarios del plan Hobby de Vercel. Por eso el barrido de alertas puede correr **cada
hora**, que es lo que necesita la regla `jornada_por_terminar` para caer dentro de su ventana
de 4 h. Las demás reglas son de granularidad diaria y se disparan en la primera corrida del
día; el registro anti-duplicados (`permit.alertas`) impide que las 24 corridas repitan avisos.
Nivel gratuito de Cloud Scheduler: 3 jobs por cuenta de facturación; aquí se usan 2.

Verificación y prueba manual:

```bash
gcloud scheduler jobs list --project=studio-7636781267-6dc02 --location=us-central1
gcloud scheduler jobs run permit-alerts --project=studio-7636781267-6dc02 --location=us-central1
curl -H "Authorization: Bearer $CRON_SECRET" "$BASE_URL/api/cron/permit-alerts?dryRun=1"
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
- [ ] **Sesión 16 — confirmar con el cliente** si `responsabilidad` y `tipoHallazgo` deben seguir siendo obligatorios: al editar hallazgos históricos el formulario exige seleccionarlos. Para hacerlos opcionales basta con `.optional()` en cada `z.enum` de `hallazgo-form.tsx`
- [ ] **Sesión 16 — prueba manual pendiente:** crear/editar un hallazgo con 2–3 seguimientos (con evidencias) y descargar el PDF, para validar la escritura del arreglo `seguimientos[]` en Firestore de extremo a extremo. Incluir una importación masiva de prueba (`executeImport` no se ejecutó contra Firestore)
- [x] ~~**Sesión 16 — deuda detectada:** existen dos plantillas de hallazgos en paralelo~~ — resuelto en Sesión 17: la página de importación descarga la plantilla oficial del endpoint; se eliminó la generación local
- [ ] **Sesión 17/18 — verificación visual pendiente:** abrir en Excel de escritorio la plantilla de importación y los reportes de Hallazgos y Permisos, para confirmar el render y que los desplegables se comporten como se espera. El aviso de reparación reportado por el cliente se corrigió (ver 17.5); falta confirmar que ya no aparece
- [ ] **Sesión 17 — regla para futuros .xlsx:** antes de dar por bueno un libro generado con ExcelJS, descomprimirlo y verificar que las partes XML estén bien formadas y sin los patrones que disparan la reparación de Excel. Releer el archivo con ExcelJS **no** detecta estos defectos: ExcelJS relee sin quejarse su propio XML inválido
- [ ] **Sesión 17 — mejora futura:** ExcelJS no genera gráficos nativos de Excel. El dashboard usa KPIs, tablas, barras de bloques y barras de datos condicionales. Si se requieren gráficos de torta/línea reales habría que insertarlos como imagen generada en servidor o migrar esa hoja a una plantilla `.xlsx` base con gráficos preexistentes
- [ ] **Sesión 19 — BLOQUEANTE:** registrar los crons en Cloud Scheduler con `bash scripts/setup-cron-scheduler.sh`. Hasta que se haga, **ningún cron se ejecuta** — ni el de alertas ni el resumen de hallazgos, que lleva sesiones sin dispararse (ver 19.13)
- [ ] **Sesión 19 — SEGURIDAD:** reemplazar `CRON_SECRET`, que tiene como valor la expresión `0 0 * * *`. Es adivinable, así que los endpoints `/api/cron/*` están sin protección real y cualquiera puede provocar un envío masivo de correos (ver 19.14)
- [ ] **Sesión 19 — corregir `NEXT_PUBLIC_BASE_URL`:** apunta a la URL de preview (`studio--…`) en vez de al dominio de producción. Es la variable que arma los enlaces de todos los correos y notificaciones push
- [ ] **Sesión 19 — primera corrida:** lanzar `GET /api/cron/permit-alerts?dryRun=1` antes de la corrida real, para medir cuántas alertas acumuladas saldrían. Los permisos que llevan tiempo esperando firma de aprobación se destaparán todos juntos
- [ ] **Sesión 19 — pendiente de validar en vivo:** el canal Web Push y la escritura de notificaciones in-app en Firestore no se probaron de extremo a extremo (el correo sí, con entrega confirmada por Resend)
- [ ] **Sesión 19 — decisión del cliente:** los hallazgos creados entre las 19:00 y la medianoche no entran en ningún resumen diario, porque el job corre a las 19:00. Se cierra cambiando su horario a `55 23 * * *` en `setup-cron-scheduler.sh` (resumiendo el día completo), pero mueve la hora de llegada del correo a los admins
- [ ] **Sesión 19 — limpieza opcional:** `vercel.json` quedó en el repositorio pero es inerte en App Hosting. Si se confirma que nunca se desplegará en Vercel, conviene eliminarlo para que nadie vuelva a asumir que sus crons están activos
- [ ] **Sesión 19 — anterior a esta sesión:** Twilio está en placeholders (`YOUR_TWILIO_ACCOUNT_SID`), así que las notificaciones de WhatsApp fallan en silencio
- [ ] **Sesión 19 — política a confirmar:** hoy el Líder SST recibe también los reclamos de firmas diarias de toda su planta. Si resulta ruidoso, basta con retirar `'lider_sst'` de las audiencias de `firma_apertura_pendiente` y `firma_cierre_diario_pendiente` en `permit-alerts.ts`; seguiría recibiendo el escalamiento de vencidos a partir del día 3

---

*Documento generado el 2026-04-28. Última actualización: 2026-08-06. Mantener actualizado con cada sesión de desarrollo.*
