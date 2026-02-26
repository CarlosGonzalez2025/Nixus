# SGTC Móvil - Sistema de Gestión de Tareas Críticas

![SGTC Login](https://i.postimg.cc/VsZf5S1T/logo-header.png)

**SGTC Móvil** es una aplicación web robusta y moderna, diseñada para digitalizar y optimizar el ciclo de vida completo de los permisos de trabajo para tareas de alto riesgo. El sistema reemplaza los procesos manuales basados en papel por un flujo de trabajo digital, centralizado y en tiempo real, mejorando radicalmente la seguridad, la trazabilidad y la eficiencia operativa.

La plataforma ha sido construida sobre una base tecnológica de última generación (Next.js, Firebase, Tailwind CSS), garantizando una experiencia de usuario fluida, segura y escalable, accesible desde cualquier dispositivo a través de un navegador web.

---

## 🎯 A Quién Va Dirigido

El sistema está diseñado para empresas y organizaciones donde la seguridad en operaciones de alto riesgo es una prioridad, involucrando a los siguientes actores clave:

-   **Líderes de Tarea y Solicitantes:** Personal que necesita planificar y solicitar autorización para ejecutar trabajos críticos.
-   **Jefes de Área y Supervisores (Autorizantes):** Responsables de revisar la viabilidad y seguridad de los trabajos propuestos en sus áreas de influencia.
-   **Personal de Mantenimiento:** Equipos especializados que deben validar y asegurar el control de energías peligrosas.
-   **Líderes de Seguridad y Salud en el Trabajo (SST):** Profesionales encargados de velar por el cumplimiento de las normativas de seguridad y auditar los permisos.
-   **Ejecutantes del Trabajo:** El personal en campo que realiza la tarea una vez que el permiso está aprobado.
-   **Administradores del Sistema:** Usuarios con privilegios para gestionar perfiles, roles y listas maestras de la aplicación.

---

## 🚀 Funciones Principales

### 1. Autenticación y Gestión de Roles (RBAC)
-   **Inicio de Sesión Seguro:** Acceso mediante correo electrónico y contraseña validados contra Firebase Authentication.
-   **Roles de Usuario:** El sistema implementa un robusto Control de Acceso Basado en Roles (RBAC). Cada usuario tiene un rol asignado que determina qué puede ver y hacer:
    -   `admin`: Control total. Gestiona usuarios, listas y tiene todos los permisos de los demás roles.
        -   `solicitante` / `lider_tarea`: Pueden crear permisos y solo pueden ver los permisos creados por ellos mismos.
            -   `autorizante`: Puede ver todos los permisos y es el rol clave para aprobar o rechazar un permiso.
                -   `lider_sst`: Puede ver todos los permisos y firmar como responsable de seguridad.
                    -   `mantenimiento`: Rol especializado que debe firmar obligatoriamente en permisos que involucren control de energías.
                    -   **Protección de Sesión por Inactividad:** Cierre de sesión automático tras 30 minutos de inactividad, con una advertencia previa de 5 minutos para extender la sesión.

                    ### 2. Panel de Control (Dashboard)
                    -   **Vista Personalizada por Rol:** El dashboard se adapta al rol del usuario. Los administradores, autorizantes y líderes SST ven estadísticas globales, mientras que los solicitantes ven solo las estadísticas de sus propios permisos.
                    -   **Estadísticas Clave:** Visualización instantánea del número de permisos totales, pendientes, aprobados y en ejecución.
                    -   **Acciones Rápidas:** Botones para crear un nuevo permiso o ver todos los permisos.
                    -   **Permisos Recientes:** Una tabla con los últimos permisos relevantes para el usuario.

                    ### 3. Creación de Permisos (Asistente Guiado)
                    Un flujo de varios pasos que asegura la recopilación completa y precisa de la información:
                    -   **Paso 1: Información General y Tipos de Trabajo:** Se seleccionan los tipos de trabajo de alto riesgo, lo que activa dinámicamente los anexos correspondientes en los pasos siguientes.
                    -   **Paso 2: Análisis de Trabajo Seguro (ATS):** Formulario detallado para la identificación de peligros, riesgos y controles recomendados.
                    -   **Pasos de Anexos (Dinámicos):** Formularios detallados y replicados de los formatos oficiales, que aparecen solo si se seleccionó el tipo de trabajo correspondiente:
                        -   **Anexo - Trabajos en Altura**
                            -   **Anexo - Espacios Confinados**
                                -   **Anexo - Control de Energías**
                                    -   **Anexo - Izaje de Cargas**
                                        -   **Anexo - Trabajo en Caliente**
                                            -   **Anexo - Excavaciones**
                                            -   **Paso 3: Trabajadores y Firmas:** Registro del personal involucrado con captura de firma digital.
                                            -   **Paso 4: Revisión y Envío:** Un resumen final antes de crear el permiso.

                                            ### 4. Ciclo de Vida y Gestión de Permisos
                                            -   **Listado y Filtrado:** Una vista de tabla que permite filtrar permisos por estado (`Pendiente`, `Aprobado`, etc.) y buscar por palabras clave.
                                            -   **Vista de Detalles Completa:** Cada permiso tiene una página dedicada que muestra toda su información en un formato claro y legible, donde ocurren las aprobaciones.
                                            -   **Notificaciones por WhatsApp:** El sistema se integra con **Twilio** para enviar notificaciones automáticas por WhatsApp a los supervisores cuando se crea un nuevo permiso o cuando se realizan acciones clave, agilizando el proceso de revisión.

                                            ### 5. Flujo de Trabajo Completo: Paso a Paso

                                            A continuación, se detalla el ciclo de vida completo de un permiso, desde el inicio de sesión hasta su cierre.

                                            **Paso 1: Inicio de Sesión y Acceso**
                                            -   Cada usuario ingresa a la plataforma con su correo electrónico y contraseña.
                                            -   El sistema lo redirige al **Dashboard**, que muestra una vista personalizada según su rol.

                                            **Paso 2: Creación del Permiso (Rol: `solicitante` / `lider_tarea`)**
                                            -   El usuario inicia el asistente de "Nuevo Permiso".
                                            -   Completa la información del permiso (ubicación, fechas, descripción de la tarea).
                                            -   **Clave:** Selecciona los **Tipos de Trabajo** (Altura, Confinados, etc.). Esto determina qué anexos y firmas condicionales se requerirán más adelante.
                                            -   Completa el ATS y todos los anexos activados.
                                            -   En el último paso, **el solicitante firma digitalmente**.
                                            -   Al guardar, el permiso se crea con estado **`borrador`** y la firma del solicitante ya queda registrada.

                                            **Paso 3: Firmas de Prerrequisito (Condicional)**
                                            -   El sistema ahora verifica si se necesitan firmas adicionales antes de la aprobación principal. El permiso **permanece en `borrador`**.
                                                -   **Si se seleccionó "Trabajo en Alturas"**: Se requiere la firma del **Coordinador de Alturas**.
                                                    -   **Si se seleccionó "Espacios Confinados"**: Se requiere la firma del **Supervisor de Espacios Confinados**.
                                                    -   El creador del permiso debe gestionar que estas personas firmen desde la página de detalles del permiso.

                                                    **Paso 4: Envío a Revisión (Automático) y Flujo de Aprobación Principal**
                                                    -   El permiso cambia **automáticamente** su estado a **`pendiente_revision`** en el momento en que se cumplen dos condiciones:
                                                        1.  El **solicitante** ha firmado.
                                                            2.  **Y** todas las firmas de prerrequisito (Coordinador, Supervisor, etc., si aplicaban) están completas.
                                                            -   En este instante, el sistema **envía las notificaciones por WhatsApp y correo electrónico** a los siguientes aprobadores.
                                                            -   Comienza la secuencia principal de firmas. El sistema habilita los botones en el siguiente orden estricto:
                                                                1.  **Líder SST (Condicional):** Firma si el permiso fue marcado para requerir su intervención.
                                                                    2.  **Mantenimiento (Condicional):** Firma si el permiso incluye "Control de Energías".
                                                                        3.  **Autorizante / Jefe de Área (Firma Obligatoria):** Firma al final. Solo puede firmar cuando todas las firmas anteriores (Solicitante, SST, Mantenimiento) están completas.

                                                                        **Paso 5: Decisión Final (Aprobación / Rechazo)**
                                                                        -   **Quién decide:** Un rol con permisos de aprobación, como `autorizante` o `admin`.
                                                                        -   **Para Aprobar:**
                                                                            -   **Condición:** Todas las firmas del Paso 4 deben estar completas.
                                                                                -   **Acción:** El usuario presiona "Aprobar". El estado del permiso cambia a **`aprobado`**.
                                                                                -   **Para Rechazar:**
                                                                                    -   **Condición:** Puede rechazar en cualquier momento mientras el permiso esté `pendiente_revision`.
                                                                                        -   **Acción:** El usuario presiona "Rechazar", debe ingresar un motivo. El estado cambia a **`rechazado`** y el flujo se detiene.

                                                                                        **Paso 6: Ejecución y Cierre del Permiso**
                                                                                        -   **Inicio de Ejecución:** Un `lider_tarea` o `admin`, con el permiso `aprobado`, presiona "Iniciar Ejecución". El estado cambia a **`en_ejecucion`**.
                                                                                        -   **Validación Diaria:** Para permisos de varios días, es obligatorio realizar el cierre y la apertura diaria en las tablas de validación de cada anexo.
                                                                                        -   **Suspensión:** Un `lider_sst` o `admin` puede `suspender` un permiso `en_ejecucion` si detecta un riesgo. El trabajo se detiene hasta que el mismo rol lo reactive.
                                                                                        -   **Cierre Final:**
                                                                                            -   **Quién:** Un `lider_tarea` o `admin`.
                                                                                                -   **Condición:** Todas las validaciones diarias y firmas de trabajadores deben estar completas. Se requieren las firmas de cierre del Responsable y la Autoridad del Área.
                                                                                                    -   **Acción:** Se presiona "Cerrar Permiso". El estado cambia a **`cerrado`**.

                                                                                                    **Step 7: Cierre de Emergencia (Acción Excepcional)**
                                                                                                    -   **Quién:** Roles de supervisión (`lider_tarea`, `autorizante`, `lider_sst`, `admin`).
                                                                                                    -   **Cuándo:** En cualquier estado activo (`pendiente_revision`, `aprobado`, `en_ejecucion`).
                                                                                                    -   **Acción:** El usuario presiona "Cierre de Emergencia". El sistema le muestra las tareas/firmas pendientes, exige una justificación y una firma. El estado del permiso cambia forzosamente a **`cerrado`**.

                                                                                                    ---

                                                                                                    ## 🛠️ Pila Tecnológica

                                                                                                    -   **Framework:** [Next.js](https://nextjs.org/) (con App Router)
                                                                                                    -   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
                                                                                                    -   **UI y Estilos:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN/UI](https://ui.shadcn.com/)
                                                                                                    -   **Backend y Base de Datos:** [Firebase](https://firebase.google.com/) (Authentication, Firestore con reglas de seguridad estrictas)
                                                                                                    -   **Notificaciones:** [Twilio](https://www.twilio.com/) (para WhatsApp), [Resend](https://resend.com/) (para correos electrónicos).
                                                                                                    -   **Exportación a PDF:** `jspdf` y `jspdf-autotable`
                                                                                                    -   **Inteligencia Artificial:** [Google Genkit](https://firebase.google.com/docs/genkit) (para evaluación de riesgos)

                                                                                                    ---

                                                                                                    ## 📂 Estructura del Proyecto y Detalle de Módulos

                                                                                                    A continuación, se detalla la estructura del proyecto y el funcionamiento de cada componente clave.

                                                                                                    ```
                                                                                                    src/
                                                                                                    ├── app/
                                                                                                    │   ├── (app)/              # Rutas protegidas (requieren login)
                                                                                                    │   │   ├── admin/          # Módulo de Administración (usuarios y listas)
                                                                                                    │   │   ├── dashboard/      # Panel de Control principal
                                                                                                    │   │   ├── permits/       # Creación y gestión de permisos
                                                                                                    │   │   │   ├── create/     # Asistente de creación de permisos
                                                                                                    │   │   │   └── [id]/       # Vista de detalle y ciclo de vida de un permiso
                                                                                                    │   │   ├── guide/          # Guía visual del flujo de trabajo
                                                                                                    │   │   └── settings/       # Configuración de perfil y contraseña
                                                                                                    │   ├── login/              # Página de inicio de sesión
                                                                                                    │   └── ...
                                                                                                    ├── components/             # Componentes de UI reutilizables (Sidebar, SignaturePad, etc.)
                                                                                                    ├── hooks/                  # Hooks personalizados (useAuth, useUser, useIdleTimer)
                                                                                                    ├── lib/                    # Librerías y utilidades (Firebase, notificaciones, errores, PDF)
                                                                                                    ├── types/                  # Definiciones de tipos de TypeScript (Permit, User, etc.)
                                                                                                    └── ...
                                                                                                    ```

                                                                                                    ### **Módulo 1: Autenticación y Roles (`/hooks/use-auth.tsx`, `/hooks/use-user.tsx`)**
                                                                                                    -   **Cómo funciona:** `useAuth` maneja la comunicación con Firebase Authentication. Al hacer login, `useUser` se activa y consulta la colección `users` en Firestore para obtener el perfil completo del usuario, incluyendo su **rol**. Este rol es el que determina los permisos en toda la aplicación.
                                                                                                    -   **Seguridad:** Las reglas de Firestore (`firestore.rules`) aseguran que un usuario solo pueda leer su propio perfil, mientras que un `admin` puede leer el de todos.

                                                                                                    ### **Módulo 2: Creación de Permisos (`/permits/create`)**
                                                                                                    -   **Cómo funciona:** Es un asistente de múltiples pasos que utiliza un `Context` de React (`PermitFormProvider`) para gestionar el estado del formulario a través de los diferentes componentes. La selección de "Tipo de Trabajo" en el primer paso renderiza condicionalmente los componentes de los anexos correspondientes.
                                                                                                    -   **Envío del Permiso (`/permits/actions.ts`):** Al finalizar, se invoca la `Server Action` `savePermitDraft`. Esta función se ejecuta en el servidor y es la única encargada de:
                                                                                                        1.  Crear o actualizar el documento del permiso en la colección `permits` de Firestore.
                                                                                                            2.  Asignarle un número de permiso único y el estado inicial (`borrador` o `pendiente_revision`).
                                                                                                                3.  Disparar las notificaciones por WhatsApp y correo electrónico a través de las integraciones con Twilio y Resend.
                                                                                                                -   **Seguridad:** Las reglas de Firestore prohíben la creación de permisos directamente desde el cliente (`allow create: false`), forzando el uso de esta `Server Action` segura.

                                                                                                                ### **Módulo 3: Ciclo de Vida del Permiso (`/permits`, `/permits/[id]`)**
                                                                                                                -   **Listado de Permisos (`/permits`):** Esta página realiza una consulta a Firestore que se filtra automáticamente según el rol del usuario. Un `solicitante` solo recibe sus propios permisos, mientras que un `autorizante` o `admin` reciben todos.
                                                                                                                -   **Detalle del Permiso (`/permits/[id]`):**
                                                                                                                    -   **Lógica de Visualización:** El componente renderiza dinámicamente las tarjetas de firma y los botones de acción (`Aprobar`, `Rechazar`, `Iniciar Ejecución`) basándose en el estado actual del permiso y el rol del usuario.
                                                                                                                        -   **Lógica de Firmas (`canSign`):** Una función clave en este componente verifica en tiempo real si se cumplen las condiciones para que un usuario pueda firmar (ej: "el solicitante ya firmó Y el permiso está pendiente"). Los botones deshabilitados incluyen un `Tooltip` que explica por qué no se puede firmar.
                                                                                                                            -   **Actualizaciones Seguras:** Todas las acciones (firmar, cambiar de estado) se realizan a través de `Server Actions` (`addSignatureAndNotify`, `updatePermitStatus`), que a su vez son validadas por las estrictas reglas de `update` en `firestore.rules`. Esto crea una doble capa de seguridad.

                                                                                                                            ### **Módulo 4: Administración (`/admin/users`, `/admin/lists`)**
                                                                                                                            -   **Cómo funciona:** Son secciones protegidas, accesibles solo para `admin`.
                                                                                                                            -   **Gestión de Usuarios:** Permite crear y gestionar perfiles de usuario. Las acciones invocan `Server Actions` que utilizan el **Firebase Admin SDK**, un requisito para operaciones privilegiadas como crear un usuario en Firebase Authentication o modificar su rol.
                                                                                                                            -   **Gestión de Listas:** Permite a los administradores añadir o eliminar elementos de las listas desplegables que se usan en los formularios (ej: Áreas, Plantas, Contratos), manteniendo la aplicación personalizable.

                                                                                                                            ### **Módulo 5: Inteligencia Artificial (`/ai/flows`)**
                                                                                                                            -   **Cómo funciona:** El sistema integra un agente de IA construido con **Google Genkit**.
                                                                                                                            -   **Evaluación de Riesgos (`risk-assessment-recommendation.ts`):** Una `Flow` de Genkit que recibe detalles del permiso (tipo de trabajo, factores ambientales) y utiliza un modelo de lenguaje para generar recomendaciones de controles de riesgo específicos para la tarea. Aunque no está implementado en la UI actualmente, sienta las bases para futuras funcionalidades de asistencia inteligente.

                                                                                                                            ---

                                                                                                                            ## ⚙️ Configuración y Ejecución Local

                                                                                                                            Para ejecutar el proyecto en un entorno de desarrollo, siga estos pasos:

                                                                                                                            1.  **Prerrequisitos:** Node.js (v18+), npm o yarn.
                                                                                                                            2.  **Instalación:**
                                                                                                                                ```bash
                                                                                                                                    git clone <url-del-repositorio>
                                                                                                                                        cd <nombre-del-repositorio>
                                                                                                                                            npm install
                                                                                                                                                ```
                                                                                                                                                3.  **Variables de Entorno:** Cree un archivo `.env` en la raíz del proyecto y agregue las credenciales de Firebase y Twilio. Un archivo `.env.example` está disponible como guía.
                                                                                                                                                4.  **Ejecución:**
                                                                                                                                                    ```bash
                                                                                                                                                        npm run dev
                                                                                                                                                            ```
                                                                                                                                                                La aplicación estará disponible en `http://localhost:9003`.
                                                                                                                                                                