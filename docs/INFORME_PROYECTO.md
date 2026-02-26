# Informe de Actividades - Proyecto SGTC Móvil
## Sistema de Gestión de Tareas Críticas - Italcol / Nixus

Este documento detalla el cronograma de actividades ejecutadas durante el diseño, desarrollo e implementación de la plataforma digital para la gestión de permisos de trabajo de alto riesgo.

---

### 1. Fase de Planeación y Diseño
*   **Reunión inicial:** Sesión de alineación con el equipo HSE y stakeholders de NIXUS para definir objetivos.
*   **Análisis de procesos:** Levantamiento de los procesos actuales basados en papel para su digitalización.
*   **Definición de Roles (RBAC):** Definición estricta de permisos para roles: `admin`, `solicitante`, `autorizante`, `lider_sst` y `mantenimiento`.
*   **Diseño de Datos:** Estructuración del modelo NoSQL en Firestore (Colecciones: `permits`, `users`, `dynamic_lists`, `notifications`).
*   **Diseño de Flujo:** Mapeo del ciclo de vida del permiso y la secuencia lógica de firmas digitales.
*   **Validación de Requisitos:** Firma de requerimientos y aprobación técnica para inicio de obra.

### 2. Infraestructura y Seguridad Base
*   **Entorno de Desarrollo:** Configuración de Next.js 15, Firebase SDK, TypeScript y Tailwind CSS.
*   **Autenticación:** Implementación de Firebase Authentication para acceso seguro mediante email y contraseña.
*   **Sistema RBAC:** Integración de la colección `users` con lógica de roles en tiempo real.
*   **Gestión de Sesión:** Desarrollo de hooks personalizados `useAuth` y `useUser`.
*   **Protección de Datos:** Implementación de reglas de seguridad robustas en `firestore.rules`.
*   **Timeouts de Seguridad:** Configuración de cierre de sesión automático tras 30 minutos de inactividad con aviso previo.

### 3. Dashboard y Gestión de Permisos
*   **Panel de Control:** Desarrollo de interfaz con estadísticas globales (Totales, Pendientes, Aprobados, En Ejecución) personalizadas por rol.
*   **Listado Inteligente:** Tabla de permisos recientes con filtros avanzados por estado, planta, área y tipo de trabajo.
*   **Acciones Rápidas:** Implementación de accesos directos para agilizar la operación diaria.

### 4. Asistente de Creación de Permisos (Wizard)
*   **PermitFormProvider:** Arquitectura de estado global para manejar formularios multi-paso complejos.
*   **Información General:** Captura de ubicación, fechas y selección dinámica de tipos de trabajo.
*   **ATS (Análisis de Trabajo Seguro):** Formulario detallado de identificación de peligros y controles con lógica condicional.
*   **Anexos Dinámicos:** Desarrollo de módulos específicos que se activan según el riesgo:
    *   Trabajo en Alturas.
    *   Espacios Confinados.
    *   Control de Energías Peligrosas.
    *   Izaje de Cargas.
    *   Trabajo en Caliente.
    *   Excavaciones.
*   **Gestión de Trabajadores:** Registro de personal con validación de seguridad social y captura de firmas individuales.
*   **Firma del Líder:** Integración de `SignaturePad` para la firma de apertura del solicitante.

### 5. Ciclo de Vida y Flujo de Aprobación
*   **Detalle del Permiso:** Vista completa de 360° con toda la información técnica y firmas.
*   **Lógica Secuencial:** Implementación de la función `canSign` para garantizar que las firmas se recolecten en el orden jerárquico correcto.
*   **Estados de Operación:** Lógica para transiciones seguras entre `borrador`, `pendiente`, `aprobado`, `en_ejecucion`, `suspendido` y `cerrado`.
*   **Cierre de Emergencia:** Funcionalidad crítica para finalizar permisos con justificación obligatoria y firma de responsabilidad.

### 6. Integraciones y Salidas
*   **WhatsApp (Twilio):** Configuración de notificaciones en tiempo real para alertar a los supervisores sobre nuevos permisos.
*   **Email (Resend):** Envío automático de resúmenes y actualizaciones de estado por correo electrónico.
*   **Generación de PDF:** Implementación de exportación profesional de documentos usando `jsPDF` y `jspdf-autotable`.
*   **IA (Google Genkit):** Configuración de flujos de IA para la recomendación inteligente de controles de riesgo basados en la tarea.

### 7. Administración y Soporte
*   **Módulo de Usuarios:** Interfaz para que administradores gestionen perfiles y roles usando Firebase Admin SDK.
*   **Carga Masiva:** Importación masiva de usuarios desde plantillas Excel para el despliegue inicial.
*   **Gestión de Listas:** Panel para administrar catálogos maestros (Áreas, Plantas, Contratos).
*   **Guía de Usuario:** Implementación de una guía visual interactiva dentro de la aplicación.
*   **Configuración de Perfil:** Módulo para actualización de datos personales y cambio de contraseña.

### 8. Pruebas, Calidad y Despliegue
*   **QA Funcional:** Pruebas exhaustivas de autenticación, asistente de creación y flujos de firmas.
*   **Pruebas de Integración:** Validación de envío de mensajes WhatsApp y correos electrónicos.
*   **Seguridad:** Auditoría de reglas de Firestore para prevenir accesos no autorizados.
*   **UAT (User Acceptance Testing):** Validación final del flujo con usuarios líderes de HSE.
*   **Optimización:** Ajustes de UX/UI y corrección de bugs reportados durante la fase beta.
*   **Despliegue:** Configuración de hosting, variables de entorno de producción y lanzamiento.
*   **Documentación:** Elaboración de manuales técnicos y de usuario.
*   **Entrega:** Reunión de cierre y transferencia formal del sistema al equipo de NIXUS.

---
**Estado del Proyecto:** Completado / Entrega Formal
**Fecha de Informe:** 2025