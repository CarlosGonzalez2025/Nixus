
# SGTC Móvil - Sistema de Gestión de Tareas Críticas

![SGTC Login](https://i.postimg.cc/2SnCvqX4/Marca-compartida-color.png)

**SGTC Móvil** es una aplicación web moderna y robusta, diseñada para digitalizar y optimizar el ciclo de vida completo de los permisos de trabajo para tareas de alto riesgo. El sistema reemplaza los procesos manuales basados en papel por un flujo de trabajo digital, centralizado y en tiempo real, mejorando la seguridad, la trazabilidad y la eficiencia operativa.

La plataforma ha sido construida sobre una base tecnológica de última generación, garantizando una experiencia de usuario fluida, segura y escalable, accesible desde cualquier dispositivo a través de un navegador web.

---

## 🚀 Características Principales

El sistema se organiza en varios módulos interconectados que cubren todo el flujo de trabajo de un permiso.

### 1. Autenticación y Gestión de Sesiones
-   **Inicio de Sesión Seguro:** Acceso mediante correo electrónico y contraseña validados contra Firebase Authentication.
-   **Perfiles de Usuario y Roles (RBAC):** Cada usuario tiene un rol (`Administrador`, `Solicitante`, `Autorizante`, `Líder SST`, `Ejecutante`) que define sus permisos dentro del sistema.
-   **Protección de Sesión por Inactividad:** Cierre de sesión automático tras un período de inactividad, con una advertencia previa para extender la sesión.

### 2. Panel de Control (Dashboard)
-   **Estadísticas en Tiempo Real:** Visualización instantánea del número de permisos totales, pendientes, aprobados y en ejecución.
-   **Acciones Rápidas:** Botones para crear un nuevo permiso o ver todos los permisos existentes.
-   **Permisos Recientes:** Una tabla con los últimos permisos creados para un acceso rápido.

### 3. Creación de Permisos de Trabajo (Asistente Guiado)
Un flujo de varios pasos que asegura la recopilación completa y precisa de la información:
-   **Paso 1: Análisis de Trabajo Seguro (ATS):** Formulario detallado para la identificación de peligros, riesgos y controles.
-   **Paso 2: Información General y Tipos de Trabajo:** Selección de los tipos de trabajo de alto riesgo, lo que activa dinámicamente los anexos correspondientes.
-   **Pasos de Anexos (Dinámicos):** Formularios detallados y replicados de los formatos oficiales para:
    -   **Anexo 1 - Trabajos en Altura:** Verificación de equipos, aspectos de seguridad, validación diaria y firmas.
    -   **Anexo 2 - Espacios Confinados:** Mediciones de gases (iniciales y periódicas), requerimientos de equipos y autorizaciones.
    -   **Anexo 3 - Trabajos con Energías:** Verificación de bloqueo (LO/TO), método de trabajo y planeación.
-   **Gestión de Trabajadores:** Registro de personal involucrado con captura de firma digital.
-   **Análisis de Riesgo con IA (Genkit):** Una funcionalidad que permite evaluar los detalles del permiso para sugerir controles de riesgo adicionales.

### 4. Ciclo de Vida y Gestión de Permisos
-   **Vista de Detalles Completa:** Cada permiso tiene una página dedicada que muestra toda su información en un formato claro y legible.
-   **Flujo de Aprobación y Firmas Digitales:** Los usuarios autorizados pueden firmar digitalmente para la apertura y cierre de permisos.
-   **Gestión de Estados:** Los roles adecuados pueden cambiar el estado de un permiso (`Aprobar`, `Rechazar`, `Iniciar Ejecución`, `Cerrar Permiso`), con notificaciones automáticas.

### 5. Notificaciones por WhatsApp
-   El sistema se integra con **Twilio** para enviar notificaciones automáticas por WhatsApp a los supervisores cuando se crea un nuevo permiso, agilizando el proceso de revisión.

### 6. Módulo de Administración (Exclusivo para Admin)
-   Panel para crear, editar y gestionar los perfiles de todos los usuarios del sistema, incluyendo la asignación de roles y la activación/desactivación de cuentas.

---

## 🛠️ Pila Tecnológica

-   **Framework:** [Next.js](https://nextjs.org/) (con App Router)
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
-   **UI y Estilos:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN/UI](https://ui.shadcn.com/)
-   **Backend y Base de Datos:** [Firebase](https://firebase.google.com/) (Authentication, Firestore, Admin SDK)
-   **Inteligencia Artificial:** [Genkit](https://firebase.google.com/docs/genkit) (para el análisis de riesgos)
-   **Notificaciones:** [Twilio](https://www.twilio.com/) (para WhatsApp)
-   **Exportación a PDF:** `jspdf` y `html2canvas`

---

## 📂 Estructura del Proyecto y Detalle de Módulos

A continuación, se detalla la estructura del proyecto y el funcionamiento de cada componente clave.

```
src/
├── app/
│   ├── (app)/              # Rutas protegidas (requieren login)
│   │   ├── admin/          # Módulo de Administración
│   │   ├── dashboard/      # Panel de Control principal
│   │   ├── permits/       # Creación y gestión de permisos
│   │   │   ├── create/     # Asistente de creación de permisos
│   │   │   └── [id]/       # Vista de detalle de un permiso
│   │   └── ...
│   ├── login/              # Página de inicio de sesión
│   └── ...
├── components/             # Componentes de UI reutilizables
├── hooks/                  # Hooks personalizados (useAuth, useUser)
├── lib/                    # Librerías y utilidades (Firebase, helpers)
├── ai/                     # Lógica de IA con Genkit
├── types/                  # Definiciones de tipos de TypeScript
└── ...
```

### **Módulo 1: Autenticación y Sesión (`/login`, `hooks/useAuth.tsx`)**
-   **Cómo funciona:** El usuario ingresa sus credenciales en la página de `/login`. El `hook/useAuth.tsx` utiliza la función `signInWithEmailAndPassword` de Firebase Authentication para validar al usuario. Si tiene éxito, Firebase establece una sesión en el navegador.
-   **Gestión de Perfil (`hooks/useUser.tsx`):** Una vez autenticado, el sistema consulta la colección `users` en Firestore usando el ID de usuario. De allí obtiene información crucial como el **rol**, la empresa y el nombre completo. Este rol se utiliza en toda la aplicación para mostrar u ocultar funcionalidades (Control de Acceso Basado en Roles - RBAC).
-   **Archivos Clave:**
    -   `src/app/login/page.tsx`: Contiene la interfaz y la lógica del formulario de inicio de sesión.
    -   `src/hooks/useAuth.tsx`: Centraliza la lógica de `login`, `logout` y monitorea el estado de autenticación.
    -   `src/hooks/useUser.tsx`: Obtiene y provee los datos del perfil del usuario logueado desde Firestore.

### **Módulo 2: Creación de Permisos (`/permits/create`)**
-   **Cómo funciona:** Es un asistente de múltiples pasos que gestiona un estado complejo en el cliente. Cada paso recopila una parte de la información del permiso. La selección de "Tipo de Trabajo" en el paso 2 determina dinámicamente qué anexos (pasos adicionales) se mostrarán.
-   **Lógica de Anexos:** Los formularios para `Altura`, `Espacios Confinados`, `Energías` y `Trabajo en Caliente` son componentes condicionales que solo se renderizan si el usuario selecciona el tipo de trabajo correspondiente.
-   **Gestión de Trabajadores:** Permite agregar dinámicamente a los trabajadores involucrados, capturando sus datos y firma digital a través de un componente (`SignaturePad`).
-   **Envío del Permiso (`permits/actions.ts`):** Al finalizar, toda la información recopilada se ensambla en un único objeto y se envía a la `Server Action` llamada `createPermit`. Esta función del lado del servidor se encarga de:
    1.  Crear el documento del permiso en la colección `permits` de Firestore.
    2.  Asignarle un número de permiso único.
    3.  Establecer el estado inicial como `pendiente_revision`.
    4.  **Disparar una notificación por WhatsApp** al supervisor a través de la integración con Twilio.
-   **Archivos Clave:**
    -   `src/app/(app)/permits/create/page.tsx`: El componente principal que orquesta todo el asistente de creación.
    -   `src/app/(app)/permits/actions.ts`: Contiene la lógica del servidor para crear el permiso en la base de datos y enviar notificaciones.
    -   `src/types/index.ts`: Define la estructura de datos completa de un `Permit` y todos sus `Anexos`.

### **Módulo 3: Ciclo de Vida del Permiso (`/permits`, `/permits/[id]`)**
-   **Listado de Permisos (`/permits`):** Esta página muestra todos los permisos en una tabla con pestañas para filtrar por estado (`Pendiente`, `Aprobado`, etc.). Utiliza `onSnapshot` de Firestore para escuchar cambios en tiempo real, por lo que la lista se actualiza automáticamente.
-   **Detalle del Permiso (`/permits/[id]`):**
    -   **Cómo funciona:** Es la vista más importante para la gestión. Muestra toda la información de un permiso, incluyendo todos los anexos y datos recopilados. También utiliza `onSnapshot` para que cualquier cambio (como una nueva firma) se refleje al instante.
    -   **Firmas y Aprobaciones:** Los usuarios autorizados verán botones para firmar digitalmente. Al firmar, se invoca la `Server Action` `addSignatureAndNotify`, que actualiza el documento del permiso en Firestore y envía una notificación por WhatsApp.
    -   **Cambio de Estado:** Botones como `Aprobar`, `Rechazar` o `Cerrar Permiso` son visibles según el rol del usuario y el estado actual del permiso. Estos botones llaman a la `Server Action` `updatePermitStatus`, que actualiza el estado en Firestore y notifica a los involucrados.
-   **Archivos Clave:**
    -   `src/app/(app)/permits/page.tsx`: La vista de lista y filtrado de permisos.
    -   `src/app/(app)/permits/[id]/page.tsx`: La vista de detalle, centro de la interacción con el permiso.
    -   `src/app/(app)/permits/actions.ts`: Contiene las `Server Actions` para firmar y cambiar el estado de un permiso.

### **Módulo 4: Administración (`/admin/users`)**
-   **Cómo funciona:** Es una sección protegida, accesible solo para usuarios con rol de `admin`. Muestra una tabla con todos los usuarios del sistema.
-   **Lógica de Backend (Admin SDK):** Las acciones de crear, editar o cambiar el estado de un usuario se realizan a través de `Server Actions` que utilizan el **Firebase Admin SDK**. Esto es crucial para la seguridad, ya que permite realizar operaciones privilegiadas (como crear un usuario en Firebase Authentication o modificar el rol de otro usuario) desde un entorno seguro en el servidor, en lugar de hacerlo desde el cliente.
-   **Archivos Clave:**
    -   `src/app/(app)/admin/users/page.tsx`: La interfaz del panel de administración.
    -   `src/app/(app)/admin/users/actions.ts`: Las `Server Actions` que interactúan con el Admin SDK para gestionar usuarios.
    -   `src/lib/firebase-admin.ts`: Configuración e inicialización del Firebase Admin SDK.

---

## ⚙️ Configuración y Ejecución Local

Para ejecutar el proyecto en un entorno de desarrollo, siga estos pasos:

### **1. Prerrequisitos**
-   Node.js (versión 18 o superior)
-   npm o yarn

### **2. Instalación**
Clone el repositorio y luego instale las dependencias:
```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
npm install
```

### **3. Variables de Entorno**
Cree un archivo `.env` en la raíz del proyecto y agregue las siguientes variables con sus respectivos valores obtenidos de Firebase y Twilio:

```env
# Firebase - Configuración del Cliente (puedes obtener esto desde la consola de Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY="AI..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="1:..."

# Firebase - Credenciales del Admin SDK (para operaciones de backend)
# Estas se obtienen de la cuenta de servicio en "Configuración del proyecto" -> "Cuentas de servicio"
FIREBASE_PROJECT_ID="..."
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-..."
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Twilio - Credenciales para Notificaciones por WhatsApp
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_WHATSAPP_FROM="whatsapp:+1..."
WHATSAPP_TO="whatsapp:+57..." # Número del supervisor para recibir alertas

# Genkit - Credenciales para la API de Gemini
GEMINI_API_KEY="AI..."
```

**Nota Importante sobre `FIREBASE_PRIVATE_KEY`:** Al copiar la clave privada del archivo JSON de Firebase, asegúrese de que los saltos de línea `\n` se mantengan como literales en el archivo `.env`.

### **4. Ejecutar la Aplicación**
Una vez configuradas las variables de entorno, puede iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:9002` (o el puerto que hayas configurado).
