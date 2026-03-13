# SGTC Móvil - Sistema de Gestión de Tareas Críticas

![SGTC Login](https://i.postimg.cc/VsZf5S1T/logo-header.png)

**SGTC Móvil** es una aplicación web robusta y moderna, diseñada para digitalizar y optimizar el ciclo de vida completo de los permisos de trabajo para tareas de alto riesgo. El sistema reemplaza los procesos manuales basados en papel por un flujo de trabajo digital, centralizado y en tiempo real, mejorando radicalmente la seguridad, la trazabilidad y la eficiencia operativa.

La plataforma ha sido construida sobre una base tecnológica de última generación (Next.js, Firebase, Tailwind CSS), garantizando una experiencia de usuario fluida, segura y escalable, accesible desde cualquier dispositivo a través de un navegador web.

---

## 🎯 A Quién Va Dirigido

El sistema está diseñado para empresas y organizaciones donde la seguridad en operaciones de alto riesgo es una prioridad, involucrando a los siguientes actores clave:

-   **Ejecutantes del Trabajo / Líderes de Tarea:** Personal que necesita planificar y solicitar autorización para ejecutar trabajos críticos.
-   **Jefes de Área y Supervisores (Autorizantes):** Responsables de revisar la viabilidad y seguridad de los trabajos propuestos en sus áreas de influencia.
-   **Personal de Mantenimiento / Aislador Competente:** Equipos especializados que deben validar y asegurar el control de energías peligrosas.
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
    -   `mantenimiento`: Rol especializado (**Mantenimiento / Aislador Competente**) que debe firmar obligatoriamente en permisos que involucren control de energías.
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
    -   Anexo - Trabajos en Altura
    -   Anexo - Espacios Confinados
    -   Anexo - Control de Energías
    -   Anexo - Izaje de Cargas
    -   Anexo - Trabajo en Caliente
    -   Anexo - Excavaciones
-   **Paso 3: Trabajadores y Firmas:** Registro del personal involucrado con captura de firma digital.
-   **Paso 4: Revisión y Envío:** Un resumen final antes de crear el permiso.

### 4. Ciclo de Vida y Gestión de Permisos
-   **Listado y Filtrado:** Una vista de tabla que permite filtrar permisos por estado (`Pendiente`, `Aprobado`, etc.) y buscar por palabras clave.
-   **Vista de Detalles Completa:** Cada permiso tiene una página dedicada que muestra toda su información en un formato claro y legible, donde ocurren las aprobaciones.
-   **Notificaciones por WhatsApp:** El sistema se integra con **Twilio** para enviar notificaciones automáticas por WhatsApp a los supervisores cuando se crea un nuevo permiso o cuando se realizan acciones clave, agilizando el proceso de revisión.

---

## 🔄 Flujo de Trabajo Detallado (Ciclo de Vida)

### Paso 1: Inicio de Sesión
- El usuario accede con sus credenciales institucionales. El sistema valida su rol para habilitar las opciones correspondientes en el menú lateral.

### Paso 2: Creación del Permiso (Rol: `solicitante` / `lider_tarea`)
- Se completa el asistente de creación.
- **Importante:** Se deben seleccionar los tipos de trabajo críticos.
- En el último paso ("Revisión"), el creador debe **Firmar Digitalmente** como "Ejecutante del trabajo / Líder del equipo Ejecutante".
- Al guardar, el permiso se crea en estado **`borrador`**.

### Paso 3: Firmas de Prerrequisito (Estado: `borrador`)
- Si aplica, el sistema exige firmas de especialistas técnicos antes de notificar a los aprobadores generales:
    - **Trabajo en Alturas:** Requiere firma del **Coordinador Alturas**.
    - **Espacios Confinados:** Requiere firma del **Supervisor Esp. Confinado**.

### Paso 4: Revisión y Notificación (Estado: `pendiente_revision`)
- Una vez que el solicitante firmó y los prerrequisitos se cumplieron, el estado cambia a **`pendiente_revision`**.
- Se envían alertas por WhatsApp y Email a los roles autorizantes.
- Se habilita la secuencia de firmas principal:
    1.  **Líder SST:** Firma si el permiso requiere su validación técnica.
    2.  **Mantenimiento / Aislador Competente:** Firma si hay control de energías.
    3.  **Autorizante:** Firma al final, una vez que todas las validaciones previas están completas.

### Paso 5: Decisión Final
- **Aprobar:** El `autorizante` o `admin` presiona "Aprobar". El estado cambia a **`aprobado`**.
- **Rechazar:** El `autorizante`, `lider_sst` o `admin` pueden rechazar indicando un motivo. El estado cambia a **`rechazado`**.

### Paso 6: Ejecución y Seguimiento (Estado: `en_ejecucion`)
- El líder de tarea presiona **"Iniciar Ejecución"**.
- Se habilitan las tablas de **Validación Diaria** (Apertura y Cierre por jornada).
- Los trabajadores pueden firmar su ingreso y salida.
- **Suspensión:** Un `lider_sst` o `admin` puede suspender el trabajo si detecta riesgos inminentes.

### Paso 7: Cierre Final (Estado: `cerrado`)
- Al finalizar la obra y las validaciones diarias, el líder de tarea procede al **Cierre del Permiso**.
- Requiere firmas de cierre del Responsable y la Autoridad del Área.
- **Cierre de Emergencia:** Acción forzada disponible para roles de supervisión con justificación obligatoria.

---

## 🛠️ Pila Tecnológica

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
-   **UI y Estilos:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN/UI](https://ui.shadcn.com/)
-   **Backend:** [Firebase](https://firebase.google.com/) (Auth, Firestore)
-   **Notificaciones:** Twilio (WhatsApp), Resend (Email)
-   **PDF:** jspdf / jspdf-autotable
-   **IA:** Google Genkit