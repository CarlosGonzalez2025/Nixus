
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

## 📂 Estructura del Proyecto

El código fuente está organizado de la siguiente manera para facilitar el mantenimiento y la escalabilidad:

```
src/
├── app/                  # Rutas principales de la aplicación (App Router)
│   ├── (app)/            # Rutas protegidas que requieren autenticación
│   │   ├── admin/        # Panel de administración
│   │   ├── dashboard/    # Panel de control principal
│   │   ├── permits/     # Creación y gestión de permisos
│   │   └── ...
│   ├── login/            # Página de inicio de sesión
│   └── ...
├── components/           # Componentes de UI reutilizables (ShadCN)
├── hooks/                # Hooks personalizados (useAuth, useUser, etc.)
├── lib/                  # Librerías y utilidades (config Firebase, helpers)
├── ai/                   # Lógica relacionada con Genkit (flujos y prompts)
├── types/                # Definiciones de tipos de TypeScript para el proyecto
└── ...
```

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
