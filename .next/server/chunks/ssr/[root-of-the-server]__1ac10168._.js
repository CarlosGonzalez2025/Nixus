module.exports = {

"[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("firebase-admin/app");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("firebase-admin/firestore");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/lib/firebase-admin.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "adminDb": (()=>adminDb)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const apps = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["getApps"])();
if (!apps.length) {
    try {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        if (!projectId || !clientEmail || !privateKey) {
            throw new Error('Missing Firebase Admin credentials in environment variables.');
        }
        // Reemplazar los literales \n con saltos de línea reales
        const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["initializeApp"])({
            credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["cert"])({
                projectId,
                clientEmail,
                privateKey: formattedPrivateKey
            })
        });
        console.log('✅ Firebase Admin initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing Firebase Admin:', error);
        // Don't throw in production, just log
        if (("TURBOPACK compile-time value", "development") !== 'production') {
            throw error;
        }
    }
}
const adminDb = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["getFirestore"])();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/querystring [external] (querystring, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}}),
"[project]/src/lib/notifications.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"404a027530e420f9fbb2c5107917245e9154185b25":"sendWhatsAppNotification"},"",""] */ __turbopack_context__.s({
    "sendWhatsAppNotification": (()=>sendWhatsAppNotification)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$twilio$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/twilio/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
// Load credentials directly from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppFrom = process.env.TWILIO_WHATSAPP_FROM;
const whatsAppTo = process.env.WHATSAPP_TO;
async function sendWhatsAppNotification(messageBody) {
    if (!accountSid || !authToken || !twilioWhatsAppFrom || !whatsAppTo) {
        console.error('⚠️ [Twilio] Error: Credenciales no configuradas. Las variables de entorno (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, WHATSAPP_TO) deben estar definidas.');
        // No lanzar error para no detener el flujo principal, solo registrar.
        return {
            success: false,
            error: 'Servicio de notificaciones no configurado en el servidor.'
        };
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$twilio$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(accountSid, authToken);
    try {
        console.log(`[Twilio] Intentando enviar notificación a ${whatsAppTo}...`);
        const message = await client.messages.create({
            body: messageBody,
            from: twilioWhatsAppFrom,
            to: whatsAppTo
        });
        console.log(`✅ [Twilio] Notificación enviada con éxito. SID: ${message.sid}`);
        return {
            success: true,
            sid: message.sid
        };
    } catch (error) {
        console.error('❌ [Twilio] Falló el envío de la notificación por WhatsApp:', error);
        // No relanzar el error para no afectar la experiencia de usuario.
        // El error ya está registrado en el servidor para depuración.
        return {
            success: false,
            error: 'No se pudo enviar la notificación por WhatsApp.'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    sendWhatsAppNotification
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendWhatsAppNotification, "404a027530e420f9fbb2c5107917245e9154185b25", null);
}}),
"[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
/* __next_internal_action_entry_do_not_use__ [{"401402f01c0118016efe5c5d736d335e2f6d150079":"createPermit","60319495ff79b3d68f46484d47b850b772acb92317":"updatePermitData","6044c6e2c8ff873e7e6f9064830b738eea3357b21c":"addWorkerToPermit","605b676f916b25092bdb91a57ed59b9a21e218cc8f":"removeWorkerFromPermit","7873b9c7850e737568a6f6f7a4e17cda15a8f18e15":"updatePermitStatus","78a8fb1a5bbb0529792f4ce5739ca8e2e88e9d13d9":"addDailyValidation","7c15bdb6ac388e78a59299d5091891127d63de7bc6":"addSignatureAndNotify"},"",""] */ __turbopack_context__.s({
    "addDailyValidation": (()=>addDailyValidation),
    "addSignatureAndNotify": (()=>addSignatureAndNotify),
    "addWorkerToPermit": (()=>addWorkerToPermit),
    "createPermit": (()=>createPermit),
    "removeWorkerFromPermit": (()=>removeWorkerFromPermit),
    "updatePermitData": (()=>updatePermitData),
    "updatePermitStatus": (()=>updatePermitStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notifications.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["config"])();
// Mapeo actualizado de tipos de trabajo según documentación
const workTypesMap = {
    'trabajoAlturas': 'Trabajo en Alturas',
    'espaciosConfinados': 'Espacios Confinados',
    'controlEnergia': 'Control de Energías',
    'izajeCargas': 'Izaje de Cargas',
    'trabajoCaliente': 'Trabajo en Caliente',
    'excavaciones': 'Excavaciones',
    'trabajoGeneral': 'Trabajo General',
    // Mantener compatibilidad con nomenclatura anterior
    'altura': 'Trabajo en Alturas',
    'confinado': 'Espacios Confinados',
    'energia': 'Control de Energías',
    'izaje': 'Izaje de Cargas',
    'caliente': 'Trabajo en Caliente',
    'excavacion': 'Excavaciones',
    'general': 'Trabajo General'
};
const getWorkTypesString = (permit)=>{
    // Priorizar los nuevos campos booleanos
    const workTypes = [];
    if (permit.trabajoAlturas) workTypes.push('Trabajo en Alturas');
    if (permit.espaciosConfinados) workTypes.push('Espacios Confinados');
    if (permit.controlEnergia) workTypes.push('Control de Energías');
    if (permit.izajeCargas) workTypes.push('Izaje de Cargas');
    if (permit.trabajoCaliente) workTypes.push('Trabajo en Caliente');
    if (permit.excavaciones) workTypes.push('Excavaciones');
    if (permit.trabajoGeneral) workTypes.push('Trabajo General');
    // Fallback al campo workType si existe (compatibilidad)
    if (workTypes.length === 0 && permit.workType && Array.isArray(permit.workType)) {
        return permit.workType.map((key)=>workTypesMap[key] || key).join(', ');
    }
    return workTypes.length > 0 ? workTypes.join(', ') : 'Trabajo General';
};
const getStatusText = (status)=>{
    const statusText = {
        'borrador': 'Borrador',
        'pendiente_revision': 'Pendiente de Revisión',
        'aprobado': 'Aprobado',
        'en_ejecucion': 'En Ejecución',
        'suspendido': 'Suspendido',
        'cerrado': 'Cerrado',
        'rechazado': 'Rechazado'
    };
    return statusText[status] || status;
};
const signatureRoles = {
    solicitante: 'QUIEN SOLICITA (JEFES Y DUEÑOS DE AREA)',
    autorizante: 'QUIEN AUTORIZA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
    mantenimiento: 'PERSONAL DE MANTENIMIENTO',
    sst: 'AREA SST (si aplica)',
    lider_tarea: 'Líder de la Tarea',
    ejecutante: 'Ejecutante del Trabajo',
    lider_sst: 'Líder SST',
    admin: 'Administrador'
};
async function createPermit(data) {
    if (!data.userId) {
        return {
            success: false,
            error: 'User not authenticated'
        };
    }
    const { userId, userDisplayName, userEmail, userPhotoURL, ...permitData } = data;
    const initialApprovals = {
        solicitante: {
            status: 'pendiente'
        },
        autorizante: {
            status: 'pendiente'
        },
        mantenimiento: {
            status: 'pendiente'
        },
        sst: {
            status: 'pendiente'
        }
    };
    // Preparar el payload del permiso con la nueva estructura
    const permitPayload = {
        ...permitData,
        status: 'pendiente_revision',
        createdBy: userId,
        createdAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["FieldValue"].serverTimestamp(),
        fechaCreacion: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["FieldValue"].serverTimestamp(),
        user: {
            displayName: userDisplayName,
            email: userEmail,
            photoURL: userPhotoURL
        },
        approvals: initialApprovals,
        closure: {}
    };
    // Convertir fechas a Timestamp si existen
    if (permitData.fechaInicio) {
        permitPayload.fechaInicio = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["FieldValue"].serverTimestamp();
    }
    if (permitData.fechaFin) {
        permitPayload.fechaFin = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["FieldValue"].serverTimestamp();
    }
    // Solo incluir anexos si los tipos de trabajo correspondientes están seleccionados
    if (permitData.trabajoAlturas && permitData.anexoAlturas) {
        permitPayload.anexoAlturas = permitData.anexoAlturas;
    }
    if (permitData.espaciosConfinados && permitData.anexoConfinado) {
        permitPayload.anexoConfinado = permitData.anexoConfinado;
    }
    if (permitData.controlEnergia && permitData.anexoEnergias) {
        permitPayload.anexoEnergias = permitData.anexoEnergias;
    }
    if (permitData.izajeCargas && permitData.anexoIzaje) {
        permitPayload.anexoIzaje = permitData.anexoIzaje;
    }
    if (permitData.excavaciones && permitData.anexoExcavaciones) {
        permitPayload.anexoExcavaciones = permitData.anexoExcavaciones;
    }
    // Mantener compatibilidad con anexoATS si existe
    if (permitData.anexoATS) {
        permitPayload.anexoATS = permitData.anexoATS;
    }
    // Mantener compatibilidad con workType para sistemas legacy
    if (permitData.workType && permitData.workType.length > 0) {
        permitPayload.workType = permitData.workType;
    }
    try {
        const docRef = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('permits').add(permitPayload);
        const permitNumber = `PT-${Date.now()}-${docRef.id.substring(0, 6).toUpperCase()}`;
        await docRef.update({
            number: permitNumber,
            numeroPermiso: permitNumber
        });
        console.log('✅ [Action] Permiso creado con éxito en Firestore:', docRef.id);
        // Obtener tipos de trabajo para la notificación
        const workTypesText = getWorkTypesString(permitPayload);
        const baseUrl = ("TURBOPACK compile-time value", "https://sgpt-movil.web.app") || 'https://sgpt-movil.web.app';
        const permitUrl = `${baseUrl}/permits/${docRef.id}`;
        const messageBody = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha creado una nueva solicitud de permiso de trabajo.

📄 *Número:* ${permitNumber}
👤 *Solicitante:* ${userDisplayName || 'N/A'}
📍 *Área:* ${permitData.areaEspecifica || 'N/A'}
🏭 *Planta:* ${permitData.planta || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}
📝 *Descripción:* ${permitData.descripcionTarea?.substring(0, 100) || 'N/A'}${permitData.descripcionTarea && permitData.descripcionTarea.length > 100 ? '...' : ''}

Por favor, revise la solicitud para su aprobación en el siguiente enlace:
${permitUrl}`;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendWhatsAppNotification"])(messageBody);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/permits');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard');
        return {
            success: true,
            permitId: docRef.id,
            permitNumber
        };
    } catch (error) {
        console.error("❌ [Action] Error al crear permiso:", error);
        return {
            success: false,
            error: error.message || 'Could not create permit. Please try again.'
        };
    }
}
async function addSignatureAndNotify(permitId, role, signatureType, signatureDataUrl, user) {
    if (!permitId || !role || !signatureDataUrl || !user) {
        return {
            success: false,
            error: 'Faltan parámetros para guardar la firma.'
        };
    }
    try {
        const docRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('permits').doc(permitId);
        const signaturePath = `approvals.${role}.${signatureType}`;
        const statusPath = `approvals.${role}.status`;
        const userIdPath = `approvals.${role}.userId`;
        const userNamePath = `approvals.${role}.userName`;
        const signedAtPath = `approvals.${role}.signedAt`;
        const updateData = {
            [signaturePath]: signatureDataUrl,
            [`${userNamePath}`]: user.displayName,
            [`${userIdPath}`]: user.uid
        };
        if (signatureType === 'firmaApertura') {
            updateData[statusPath] = 'aprobado';
            updateData[signedAtPath] = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["FieldValue"].serverTimestamp();
        }
        await docRef.update(updateData);
        // Fetch permit for notification
        const permitDoc = await docRef.get();
        const permitData = permitDoc.data();
        const signatureRoleName = signatureRoles[role] || role;
        const baseUrl = ("TURBOPACK compile-time value", "https://sgpt-movil.web.app") || 'https://sgpt-movil.web.app';
        const permitUrl = `${baseUrl}/permits/${permitId}`;
        const workTypesText = getWorkTypesString(permitData);
        const messageBody = `*Notificación de Firma - SGPT* 🖋️
El permiso *${permitData.number || permitData.numeroPermiso || permitId}* ha sido firmado.

👤 *Quién firmó:* ${user.displayName || 'N/A'}
✨ *Rol:* ${signatureRoleName}
✍️ *Tipo de firma:* ${signatureType === 'firmaApertura' ? 'Apertura' : 'Cierre'}
📍 *Área:* ${permitData.areaEspecifica || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Puede ver los detalles aquí:
${permitUrl}`;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendWhatsAppNotification"])(messageBody);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/permits/${permitId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error("❌ Error al guardar firma y notificar:", error);
        return {
            success: false,
            error: error.message || 'No se pudo guardar la firma.'
        };
    }
}
async function updatePermitStatus(permitId, status, reason, closureData) {
    if (!permitId) {
        return {
            success: false,
            error: 'Permit ID is required.'
        };
    }
    try {
        const docRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('permits').doc(permitId);
        const updateData = {
            status
        };
        if (status === 'rechazado' && reason) {
            updateData.rejectionReason = reason;
        }
        if (status === 'cerrado') {
            updateData.closure = {
                ...closureData || {},
                fechaCierre: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["FieldValue"].serverTimestamp()
            };
        }
        await docRef.update(updateData);
        // Fetch permit for notification
        const permitDoc = await docRef.get();
        const permitData = permitDoc.data();
        const statusText = getStatusText(status);
        const workTypesText = getWorkTypesString(permitData);
        const baseUrl = ("TURBOPACK compile-time value", "https://sgpt-movil.web.app") || 'https://sgpt-movil.web.app';
        const permitUrl = `${baseUrl}/permits/${permitId}`;
        let messageBody = `*Actualización de Estado - SGPT* 🔄
El estado del permiso *${permitData.number || permitData.numeroPermiso || permitId}* ha cambiado.

*Nuevo Estado:* ${statusText}
📍 *Área:* ${permitData.areaEspecifica || 'N/A'}
🏭 *Planta:* ${permitData.planta || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Puede ver los detalles aquí:
${permitUrl}`;
        if (status === 'rechazado' && reason) {
            messageBody += `\n\n*Motivo del rechazo:* ${reason}`;
        }
        if (status === 'cerrado' && closureData) {
            messageBody += `\n\n*Información de cierre:*`;
            if (closureData.areaDespejada) {
                messageBody += `\n• Área despejada: ${closureData.areaDespejada}`;
            }
            if (closureData.informoResponsable) {
                messageBody += `\n• Informó al responsable: ${closureData.informoResponsable}`;
            }
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendWhatsAppNotification"])(messageBody);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/permits/${permitId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/permits');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard');
        return {
            success: true
        };
    } catch (error) {
        console.error("❌ Error updating permit status:", error);
        return {
            success: false,
            error: error.message || 'Could not update permit status.'
        };
    }
}
async function updatePermitData(permitId, updateData) {
    if (!permitId) {
        return {
            success: false,
            error: 'Permit ID is required.'
        };
    }
    try {
        const docRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('permits').doc(permitId);
        // Limpiar datos undefined
        const cleanData = Object.fromEntries(Object.entries(updateData).filter(([_, v])=>v !== undefined));
        await docRef.update(cleanData);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/permits/${permitId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/permits');
        return {
            success: true
        };
    } catch (error) {
        console.error("❌ Error updating permit data:", error);
        return {
            success: false,
            error: error.message || 'Could not update permit data.'
        };
    }
}
async function addDailyValidation(permitId, anexoType, validationType, validationData) {
    if (!permitId || !anexoType || !validationType) {
        return {
            success: false,
            error: 'Faltan parámetros requeridos.'
        };
    }
    try {
        const docRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('permits').doc(permitId);
        const permitDoc = await docRef.get();
        const permitData = permitDoc.data();
        if (!permitData[anexoType]) {
            return {
                success: false,
                error: `El anexo ${anexoType} no existe en este permiso.`
            };
        }
        const anexo = permitData[anexoType];
        if (!anexo.validacionDiaria) {
            anexo.validacionDiaria = [];
        }
        // Agregar la validación
        anexo.validacionDiaria.push(validationData);
        await docRef.update({
            [anexoType]: anexo
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/permits/${permitId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error("❌ Error adding daily validation:", error);
        return {
            success: false,
            error: error.message || 'No se pudo agregar la validación diaria.'
        };
    }
}
async function addWorkerToPermit(permitId, worker) {
    if (!permitId || !worker) {
        return {
            success: false,
            error: 'Faltan parámetros requeridos.'
        };
    }
    try {
        const docRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('permits').doc(permitId);
        await docRef.update({
            workers: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$29$__["FieldValue"].arrayUnion(worker)
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/permits/${permitId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error("❌ Error adding worker:", error);
        return {
            success: false,
            error: error.message || 'No se pudo agregar el trabajador.'
        };
    }
}
async function removeWorkerFromPermit(permitId, workerCedula) {
    if (!permitId || !workerCedula) {
        return {
            success: false,
            error: 'Faltan parámetros requeridos.'
        };
    }
    try {
        const docRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('permits').doc(permitId);
        const permitDoc = await docRef.get();
        const permitData = permitDoc.data();
        if (!permitData.workers) {
            return {
                success: false,
                error: 'No hay trabajadores en este permiso.'
            };
        }
        const updatedWorkers = permitData.workers.filter((w)=>w.cedula !== workerCedula);
        await docRef.update({
            workers: updatedWorkers
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/permits/${permitId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error("❌ Error removing worker:", error);
        return {
            success: false,
            error: error.message || 'No se pudo eliminar el trabajador.'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createPermit,
    addSignatureAndNotify,
    updatePermitStatus,
    updatePermitData,
    addDailyValidation,
    addWorkerToPermit,
    removeWorkerFromPermit
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPermit, "401402f01c0118016efe5c5d736d335e2f6d150079", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addSignatureAndNotify, "7c15bdb6ac388e78a59299d5091891127d63de7bc6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePermitStatus, "7873b9c7850e737568a6f6f7a4e17cda15a8f18e15", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePermitData, "60319495ff79b3d68f46484d47b850b772acb92317", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addDailyValidation, "78a8fb1a5bbb0529792f4ce5739ca8e2e88e9d13d9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addWorkerToPermit, "6044c6e2c8ff873e7e6f9064830b738eea3357b21c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeWorkerFromPermit, "605b676f916b25092bdb91a57ed59b9a21e218cc8f", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "401402f01c0118016efe5c5d736d335e2f6d150079": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPermit"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "401402f01c0118016efe5c5d736d335e2f6d150079": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["401402f01c0118016efe5c5d736d335e2f6d150079"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/permits/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(app)/permits/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$permits$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/(app)/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(app)/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/(app)/permits/create/page.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(app)/permits/create/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(app)/permits/create/page.tsx <module evaluation>", "default");
}}),
"[project]/src/app/(app)/permits/create/page.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(app)/permits/create/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(app)/permits/create/page.tsx", "default");
}}),
"[project]/src/app/(app)/permits/create/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/page.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/page.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/(app)/permits/create/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(app)/permits/create/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__1ac10168._.js.map