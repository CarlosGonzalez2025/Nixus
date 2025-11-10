(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(app)/permits/create/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CreatePermitPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$a5c0ad__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:a5c0ad [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/signature.js [app-client] (ecmascript) <export default as Signature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/alert-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/signature-pad.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$form$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/form-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$GeneralInfoStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/GeneralInfoStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AtsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/AtsStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoAlturaStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/AnexoAlturaStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoConfinadoStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/AnexoConfinadoStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoEnergiaStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/AnexoEnergiaStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoIzajeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/AnexoIzajeStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoExcavacionesStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/AnexoExcavacionesStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$VerificacionPeligrosStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/VerificacionPeligrosStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$EppEmergenciasStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/EppEmergenciasStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$WorkersStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/WorkersStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$ReviewStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/create/components/ReviewStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const workerRoles = [
    "Trabajador autorizado",
    "Ayudante de seguridad",
    "Coordinador de TA",
    "Supervisor de EC",
    "Soldador",
    "Operador de equipo para elevación de personas",
    "Vigía",
    "Otro"
];
function CreatePermitWizard() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { state: formData, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$form$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermitForm"])();
    const [draftId, setDraftId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [isLoadingForm, setIsLoadingForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSavingDraft, setIsSavingDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccessDialog, setShowSuccessDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newPermitInfo, setNewPermitInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: '',
        number: ''
    });
    // Worker Dialog State
    const [isWorkerDialogOpen, setIsWorkerDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentWorker, setCurrentWorker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingWorkerIndex, setEditingWorkerIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Signature Pad State
    const [isSignaturePadOpen, setIsSignaturePadOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signatureTarget, setSignatureTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signatureContext, setSignatureContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Scroll to top on step change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreatePermitWizard.useEffect": ()=>{
            window.scrollTo(0, 0);
        }
    }["CreatePermitWizard.useEffect"], [
        step
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreatePermitWizard.useEffect": ()=>{
            const editId = searchParams.get('edit');
            if (editId) {
                setIsLoadingForm(true);
                const fetchDraft = {
                    "CreatePermitWizard.useEffect.fetchDraft": async ()=>{
                        try {
                            const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'permits', editId);
                            const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
                            if (docSnap.exists() && (docSnap.data().status === 'borrador' || docSnap.data().status === 'pendiente_revision')) {
                                const draftData = docSnap.data();
                                // Use a single action to set the entire state for consistency
                                dispatch({
                                    type: 'SET_ENTIRE_STATE',
                                    payload: draftData
                                });
                                setDraftId(editId);
                            } else {
                                toast({
                                    variant: "destructive",
                                    title: "Permiso no encontrado o no editable",
                                    description: "El permiso que intenta editar no existe o ya no está en estado de borrador."
                                });
                                router.push('/permits');
                            }
                        } catch (error) {
                            console.error("Error cargando borrador:", error);
                            toast({
                                variant: "destructive",
                                title: "Error al Cargar",
                                description: "No se pudo cargar la información del permiso."
                            });
                        } finally{
                            setIsLoadingForm(false);
                        }
                    }
                }["CreatePermitWizard.useEffect.fetchDraft"];
                fetchDraft();
            } else {
                setIsLoadingForm(false);
            }
        }
    }["CreatePermitWizard.useEffect"], [
        searchParams,
        dispatch,
        router,
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreatePermitWizard.useEffect": ()=>{
            if (user && !formData.generalInfo.nombreSolicitante) {
                dispatch({
                    type: 'UPDATE_GENERAL_INFO',
                    payload: {
                        nombreSolicitante: user.displayName || ''
                    }
                });
            }
        }
    }["CreatePermitWizard.useEffect"], [
        user,
        formData.generalInfo.nombreSolicitante,
        dispatch
    ]);
    const openNewWorkerDialog = ()=>{
        setEditingWorkerIndex(null);
        setCurrentWorker({
            nombre: '',
            cedula: '',
            rol: '',
            otroRol: '',
            eps: '',
            arl: '',
            pensiones: '',
            tsaTec: 'na',
            entrenamiento: 'otro',
            firmaApertura: '',
            firmaCierre: ''
        });
        setIsWorkerDialogOpen(true);
    };
    const openEditWorkerDialog = (worker, index)=>{
        setEditingWorkerIndex(index);
        setCurrentWorker(worker);
        setIsWorkerDialogOpen(true);
    };
    const handleSaveWorker = ()=>{
        if (!currentWorker || !currentWorker.nombre || !currentWorker.cedula || !currentWorker.rol) {
            toast({
                variant: 'destructive',
                title: 'Campos Incompletos',
                description: 'Nombre, cédula y rol son requeridos.'
            });
            return;
        }
        if (currentWorker.rol === 'Otro' && !currentWorker.otroRol?.trim()) {
            toast({
                variant: 'destructive',
                title: 'Especificación Requerida',
                description: 'Por favor, especifique el rol "Otro".'
            });
            return;
        }
        if (editingWorkerIndex !== null) {
            const updatedWorkers = [
                ...formData.workers || []
            ];
            updatedWorkers[editingWorkerIndex] = currentWorker;
            dispatch({
                type: 'SET_WORKERS',
                payload: updatedWorkers
            });
            toast({
                title: 'Trabajador Actualizado'
            });
        } else {
            dispatch({
                type: 'ADD_WORKER',
                payload: currentWorker
            });
            toast({
                title: 'Trabajador Agregado'
            });
        }
        setIsWorkerDialogOpen(false);
        setCurrentWorker(null);
        setEditingWorkerIndex(null);
    };
    const removeWorker = (index)=>{
        const updatedWorkers = (formData.workers || []).filter((_, i)=>i !== index);
        dispatch({
            type: 'SET_WORKERS',
            payload: updatedWorkers
        });
    };
    const handleWorkerInputChange = (field, value)=>{
        setCurrentWorker((prev)=>prev ? {
                ...prev,
                [field]: value
            } : null);
    };
    const openSignaturePad = (target, context)=>{
        setSignatureTarget(target);
        setSignatureContext(context);
        setIsSignaturePadOpen(true);
    };
    const handleSaveSignature = (signatureDataUrl)=>{
        if (!signatureTarget) return;
        if (signatureTarget === 'worker.firmaApertura' || signatureTarget === 'worker.firmaCierre') {
            setCurrentWorker((prev)=>prev ? {
                    ...prev,
                    [signatureTarget.split('.')[1]]: signatureDataUrl
                } : null);
        } else {
            dispatch({
                type: 'UPDATE_SIGNATURE',
                payload: {
                    target: signatureTarget,
                    signature: signatureDataUrl,
                    context: signatureContext
                }
            });
        }
        setIsSignaturePadOpen(false);
        setSignatureTarget(null);
        setSignatureContext(null);
    };
    const handleSaveDraft = async ()=>{
        if (!user) {
            toast({
                variant: 'destructive',
                title: 'Error de Autenticación'
            });
            return;
        }
        setIsSavingDraft(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$a5c0ad__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["savePermitDraft"])({
                userId: user.uid,
                userDisplayName: user.displayName || null,
                userEmail: user.email || null,
                userPhotoURL: user.photoURL || null,
                draftId: draftId,
                ...formData
            });
            if (result.success && result.permitId) {
                if (!draftId) {
                    setDraftId(result.permitId);
                }
                toast({
                    title: "Borrador Guardado",
                    description: "Tu progreso ha sido guardado."
                });
            } else {
                throw new Error(result.error || 'No se pudo guardar el borrador.');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error al Guardar',
                description: error.message
            });
        } finally{
            setIsSavingDraft(false);
        }
    };
    const colors = {
        primary: 'hsl(var(--primary))',
        dark: 'hsl(var(--primary))',
        success: 'hsl(var(--accent))'
    };
    const baseSteps = [
        {
            label: "Info General",
            condition: true
        },
        {
            label: "ATS",
            condition: true
        },
        {
            label: "Anexo Altura",
            condition: formData.selectedWorkTypes.alturas
        },
        {
            label: "Anexo Confinado",
            condition: formData.selectedWorkTypes.confinado
        },
        {
            label: "Anexo Energías",
            condition: formData.selectedWorkTypes.energia
        },
        {
            label: "Anexo Izaje",
            condition: formData.selectedWorkTypes.izaje
        },
        {
            label: "Anexo Excavaciones",
            condition: formData.selectedWorkTypes.excavacion
        },
        {
            label: "Verificación Peligros",
            condition: true
        },
        {
            label: "EPP y Emergencias",
            condition: true
        },
        {
            label: "Trabajadores",
            condition: true
        },
        {
            label: "Revisión",
            condition: true
        }
    ];
    const steps = baseSteps.filter((s)=>s.condition);
    const currentStepInfo = steps[step - 1];
    const canProceed = ()=>{
        const currentLabel = steps[step - 1]?.label;
        if (currentLabel === 'Info General') {
            const { areaEspecifica, planta, nombreSolicitante, validFrom, validUntil, workDescription, numTrabajadores, responsable } = formData.generalInfo;
            const missingFields = [];
            if (!areaEspecifica) missingFields.push("Área específica");
            if (!planta) missingFields.push("Planta");
            if (!nombreSolicitante) missingFields.push("Nombre solicitante");
            if (!validFrom) missingFields.push("Fecha de inicio");
            if (!validUntil) missingFields.push("Fecha de fin");
            if (!workDescription) missingFields.push("Descripción de la Tarea");
            if (!numTrabajadores) missingFields.push("No. Trabajadores");
            if (!responsable?.nombre) missingFields.push("Nombre del Responsable");
            if (!responsable?.cargo) missingFields.push("Cargo del Responsable");
            if (!responsable?.compania) missingFields.push("Compañía del Responsable");
            if (!Object.values(formData.selectedWorkTypes).some((v)=>v)) {
                missingFields.push("Tipo de Trabajo (al menos uno)");
            }
            if (missingFields.length > 0) {
                toast({
                    variant: "destructive",
                    title: "Campos Incompletos en Información General",
                    description: `Por favor, complete los siguientes campos obligatorios: ${missingFields.join(', ')}.`,
                    duration: 6000
                });
                return false;
            }
        }
        if (currentLabel === 'ATS') {
            const { peligros, justificacion, epp, peligrosAdicionales } = formData.anexoATS || {};
            const hasPeligro = peligros && Object.values(peligros).some((value)=>value === 'si') || peligrosAdicionales && peligrosAdicionales.length > 0;
            if (!hasPeligro) {
                toast({
                    variant: "destructive",
                    title: "Validación Requerida en ATS",
                    description: "Debe seleccionar 'SI' en al menos un peligro o agregar un peligro adicional para continuar."
                });
                return false;
            }
            if (!justificacion || !Object.values(justificacion).some((value)=>value === true)) {
                toast({
                    variant: "destructive",
                    title: "Validación Requerida en ATS",
                    description: "Debe seleccionar al menos una 'Justificación para el uso del ATS' para continuar."
                });
                return false;
            }
            const eppData = epp || {};
            const allEppItems = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AtsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eppOptions"]).flat();
            const missingAtsEppSpec = allEppItems.filter((item)=>item.type === 'text' && eppData[item.id]).filter((item)=>{
                const specValue = eppData[`${item.id}_spec`];
                return !specValue || specValue.trim() === '';
            }).map((item)=>`'${item.label.replace(/:$/, '')}'`);
            if (missingAtsEppSpec.length > 0) {
                toast({
                    variant: "destructive",
                    title: "Especificación de EPP Requerida en ATS",
                    description: `Por favor, complete la especificación para los siguientes EPP: ${missingAtsEppSpec.join(', ')}.`,
                    duration: 6000
                });
                return false;
            }
        }
        if (currentLabel === 'Anexo Altura') {
            const anexo = formData.anexoAltura;
            if (anexo?.tipoEstructura?.otros && !anexo.tipoEstructura.otrosCual?.trim()) {
                toast({
                    variant: "destructive",
                    title: "Campo Requerido",
                    description: "Debe especificar el otro tipo de estructura en el Anexo de Alturas."
                });
                return false;
            }
        }
        if (currentLabel === 'Anexo Confinado') {
            const anexo = formData.anexoConfinado;
            if (anexo?.identificacionPeligros?.procedimientoComunicacion === 'si' && !anexo.procedimientoComunicacionCual?.trim()) {
                toast({
                    variant: "destructive",
                    title: "Campo Requerido",
                    description: "Debe especificar cuál es el procedimiento de comunicación en el Anexo de Espacios Confinados."
                });
                return false;
            }
        }
        if (currentLabel === 'Anexo Energías') {
            const anexo = formData.anexoEnergias;
            const trabajosEnCaliente = anexo?.trabajosEnCaliente;
            if (trabajosEnCaliente?.otro_check && !(trabajosEnCaliente?.otro || '').trim()) {
                toast({
                    variant: "destructive",
                    title: "Campo Requerido",
                    description: "Debe especificar el 'otro' aspecto en Trabajos en Caliente."
                });
                return false;
            }
            const energiasPeligrosas = anexo?.energiasPeligrosas;
            if (energiasPeligrosas?.otra_check && !(energiasPeligrosas?.otra || '').trim()) {
                toast({
                    variant: "destructive",
                    title: "Campo Requerido",
                    description: "Debe especificar el 'otro' tipo de energía peligrosa."
                });
                return false;
            }
        }
        if (currentLabel === 'Verificación Peligros') {
            const { verificacionPeligros } = formData;
            if (!verificacionPeligros || Object.values(verificacionPeligros).every((category)=>!Object.values(category).some((value)=>value === 'si'))) {
                toast({
                    variant: "destructive",
                    title: "Validación Requerida en Verificación de Peligros",
                    description: "Debe seleccionar 'SI' en al menos un peligro para poder continuar."
                });
                return false;
            }
        }
        if (currentLabel === 'EPP y Emergencias') {
            const eppData = formData.eppEmergencias?.epp || {};
            const missingSpecFields = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$EppEmergenciasStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eppItems"].filter((item)=>item.manual && eppData[item.id] === 'si').map((item)=>({
                    item,
                    specValue: eppData[`${item.id}_manual`]
                })).filter(({ specValue })=>!specValue || specValue.trim() === '').map(({ item })=>`'${item.label.replace(/:$/, '')}'`);
            if (missingSpecFields.length > 0) {
                toast({
                    variant: "destructive",
                    title: "Especificación de EPP Requerida",
                    description: `Por favor, complete la especificación para: ${missingSpecFields.join(', ')}.`,
                    duration: 6000
                });
                return false;
            }
        }
        if (currentLabel === 'Trabajadores') {
            const numTrabajadores = parseInt(formData.generalInfo.numTrabajadores || '0', 10);
            const workers = formData.workers || [];
            if (workers.length !== numTrabajadores) {
                toast({
                    variant: "destructive",
                    title: "Número de Trabajadores no Coincide",
                    description: `Ha especificado ${numTrabajadores} trabajadores, pero ha registrado ${workers.length}. Por favor, ajuste la lista.`,
                    duration: 6000
                });
                return false;
            }
            const missingSignatures = workers.filter((w)=>!w.firmaApertura);
            if (missingSignatures.length > 0) {
                toast({
                    variant: "destructive",
                    title: "Faltan Firmas de Trabajadores",
                    description: `Todos los trabajadores deben registrar su firma de apertura para poder continuar. Faltan ${missingSignatures.length} firmas.`,
                    duration: 6000
                });
                return false;
            }
        }
        return true;
    };
    const handleSavePermit = async ()=>{
        if (!user) {
            toast({
                variant: 'destructive',
                title: 'Error de Autenticación'
            });
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$a5c0ad__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["savePermitDraft"])({
                userId: user.uid,
                userDisplayName: user.displayName || null,
                userEmail: user.email || null,
                userPhotoURL: user.photoURL || null,
                draftId: draftId,
                ...formData
            });
            if (result.success && result.permitId) {
                toast({
                    title: 'Borrador Guardado',
                    description: 'Será redirigido para firmar y activar el permiso.'
                });
                // Redirect to the permit detail page to finalize and sign
                router.push(`/permits/${result.permitId}`);
            } else {
                throw new Error(result.error || 'Hubo un error guardando el permiso.');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Falló el Envío',
                description: error.message
            });
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleUpdateATS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CreatePermitWizard.useCallback[handleUpdateATS]": (updates)=>{
            dispatch({
                type: 'UPDATE_ATS',
                payload: updates
            });
        }
    }["CreatePermitWizard.useCallback[handleUpdateATS]"], [
        dispatch
    ]);
    const handleUpdateEppEmergencias = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CreatePermitWizard.useCallback[handleUpdateEppEmergencias]": (updates)=>{
            dispatch({
                type: 'UPDATE_EPP_EMERGENCIAS',
                payload: updates
            });
        }
    }["CreatePermitWizard.useCallback[handleUpdateEppEmergencias]"], [
        dispatch
    ]);
    const renderStepContent = ()=>{
        if (isLoadingForm) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-8 w-8 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 517,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                lineNumber: 516,
                columnNumber: 9
            }, this);
        }
        const currentStepLabel = steps[step - 1]?.label;
        switch(currentStepLabel){
            case "Info General":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$GeneralInfoStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeneralInfoStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 525,
                    columnNumber: 16
                }, this);
            case "ATS":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AtsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AtsStep"], {
                    anexoATS: formData.anexoATS,
                    onUpdateATS: handleUpdateATS
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 527,
                    columnNumber: 16
                }, this);
            case "Anexo Altura":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoAlturaStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnexoAlturaStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 529,
                    columnNumber: 16
                }, this);
            case "Anexo Confinado":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoConfinadoStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnexoConfinadoStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 531,
                    columnNumber: 16
                }, this);
            case "Anexo Energías":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoEnergiaStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnexoEnergiaStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 533,
                    columnNumber: 16
                }, this);
            case "Anexo Izaje":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoIzajeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnexoIzajeStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 535,
                    columnNumber: 16
                }, this);
            case "Anexo Excavaciones":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$AnexoExcavacionesStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnexoExcavacionesStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 537,
                    columnNumber: 16
                }, this);
            case "Verificación Peligros":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$VerificacionPeligrosStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VerificacionPeligrosStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 539,
                    columnNumber: 16
                }, this);
            case "EPP y Emergencias":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$EppEmergenciasStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EppEmergenciasStep"], {
                    eppEmergencias: formData.eppEmergencias,
                    onUpdate: handleUpdateEppEmergencias
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 541,
                    columnNumber: 16
                }, this);
            case "Trabajadores":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$WorkersStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkersStep"], {
                    workers: formData.workers || [],
                    onAddWorker: openNewWorkerDialog,
                    onEditWorker: openEditWorkerDialog,
                    onRemoveWorker: removeWorker
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 543,
                    columnNumber: 16
                }, this);
            case "Revisión":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$components$2f$ReviewStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReviewStep"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 550,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold",
                            children: "Paso en Construcción"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                            lineNumber: 554,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: currentStepLabel
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                            lineNumber: 555,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 553,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 flex-col bg-gray-50 min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "text-white shadow-lg sticky top-0 z-20",
                    style: {
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 py-3 md:py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "https://i.postimg.cc/jShP2K6k/Whats-App-Image-2025-10-20-at-10-43-48-AM.jpg",
                                                alt: "Crear Permiso Icon",
                                                width: 48,
                                                height: 48,
                                                className: "rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 569,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hidden md:block border-l border-white border-opacity-30 pl-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-xl font-bold",
                                                        children: "Nuevo Permiso de Trabajo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 577,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white text-opacity-80",
                                                        children: [
                                                            "Paso ",
                                                            step,
                                                            " de ",
                                                            steps.length,
                                                            ": ",
                                                            currentStepInfo.label
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 576,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 568,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>{
                                        if (confirm('¿Está seguro de cancelar? Los cambios no guardados se perderán.')) {
                                            router.push('/dashboard');
                                        }
                                    },
                                    variant: "ghost",
                                    className: "bg-white bg-opacity-20 hover:bg-opacity-30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 18,
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                            lineNumber: 593,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                            lineNumber: 594,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                    lineNumber: 584,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                            lineNumber: 566,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 564,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border-b shadow-sm sticky top-[68px] md:top-[80px] z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 py-4 md:py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: steps.map((s_info, s_idx)=>{
                                    const s = s_idx + 1;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-sm transition-all ${s === step ? 'ring-4 scale-110 shadow-lg text-white' : s < step ? 'text-white' : 'bg-gray-200 text-gray-600'}`,
                                                style: s <= step ? {
                                                    backgroundColor: s === step ? colors.primary : colors.success
                                                } : {},
                                                children: s < step ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 31
                                                }, this) : s_idx + 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 607,
                                                columnNumber: 17
                                            }, this),
                                            s < steps.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 h-1 mx-1 md:mx-2 rounded",
                                                style: {
                                                    backgroundColor: s < step ? colors.success : '#E5E7EB'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, s, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 606,
                                        columnNumber: 15
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 602,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid",
                                style: {
                                    gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`
                                },
                                children: steps.map((s_info, s_idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] md:text-xs text-center font-medium",
                                        style: {
                                            color: step === s_idx + 1 ? colors.primary : '#6B7280'
                                        },
                                        children: s_info.label
                                    }, s_idx, false, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                        lineNumber: 601,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 600,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto p-4 pb-24 md:pb-24 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-xl p-6 md:p-8",
                            children: renderStepContent()
                        }, step, false, {
                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                            lineNumber: 632,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t shadow-lg z-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-5xl mx-auto px-4 py-3 flex gap-2 sm:gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>setStep(step - 1),
                                        disabled: isSubmitting || step === 1,
                                        variant: "outline",
                                        className: "px-4 py-3 h-auto md:px-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                className: "mr-2 h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 645,
                                                columnNumber: 15
                                            }, this),
                                            "Anterior"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handleSaveDraft,
                                        variant: "secondary",
                                        disabled: isSavingDraft || isSubmitting,
                                        className: "px-4 py-3 h-auto md:px-6",
                                        children: [
                                            isSavingDraft ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 655,
                                                columnNumber: 34
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "mr-2 h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 655,
                                                columnNumber: 85
                                            }, this),
                                            "Borrador"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 649,
                                        columnNumber: 13
                                    }, this),
                                    step < steps.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>{
                                            if (canProceed()) {
                                                setStep(step + 1);
                                            }
                                        },
                                        disabled: isSubmitting,
                                        className: "flex-1 py-3 h-auto",
                                        children: [
                                            "Siguiente",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "ml-2 h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 670,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 660,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialog"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    disabled: isSubmitting,
                                                    className: "flex-1 py-3 h-auto bg-green-600 hover:bg-green-700 text-lg",
                                                    children: [
                                                        isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "mr-2 h-5 w-5 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                            size: 22,
                                                            className: "mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                            lineNumber: 682,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Guardar Permiso"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                    lineNumber: 675,
                                                    columnNumber: 26
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 674,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                                                children: "¿Está seguro de guardar el permiso?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 689,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                                                children: "Se creará un borrador del permiso. Deberá ir a la página de detalles para firmar y activar el flujo de aprobación."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 690,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                                                children: "Cancelar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 695,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                                                onClick: handleSavePermit,
                                                                disabled: isSubmitting,
                                                                children: isSubmitting ? 'Guardando...' : 'Sí, guardar ahora'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 696,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 694,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 687,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 673,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 638,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                            lineNumber: 637,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 631,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                    open: showSuccessDialog,
                    onOpenChange: setShowSuccessDialog,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                        className: "flex items-center gap-2 text-green-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 711,
                                                columnNumber: 23
                                            }, this),
                                            "¡Permiso Creado Exitosamente!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 710,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                        children: [
                                            "El permiso N° ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: newPermitInfo.number
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 715,
                                                columnNumber: 37
                                            }, this),
                                            " ha sido creado y enviado para revisión."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 714,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 709,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                                className: "sm:justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: ()=>router.push('/dashboard'),
                                        children: "Ir al Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 719,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>router.push(`/permits/${newPermitInfo.id}`),
                                        children: "Ver Detalles del Permiso"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 722,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 718,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                        lineNumber: 708,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 707,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                    open: isWorkerDialogOpen,
                    onOpenChange: setIsWorkerDialogOpen,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                        className: "sm:max-w-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: [
                                        editingWorkerIndex !== null ? 'Editar' : 'Agregar',
                                        " Trabajador"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                    lineNumber: 732,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 731,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 max-h-[70vh] overflow-y-auto p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "worker-name",
                                                children: "Nombres y Apellidos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 736,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "worker-name",
                                                value: currentWorker?.nombre || '',
                                                onChange: (e)=>handleWorkerInputChange('nombre', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 737,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 735,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "worker-cedula",
                                                children: "Cédula"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 740,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "worker-cedula",
                                                value: currentWorker?.cedula || '',
                                                onChange: (e)=>handleWorkerInputChange('cedula', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 741,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 739,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "worker-rol",
                                                children: "Cargo/Rol"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 744,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                value: currentWorker?.rol || '',
                                                onValueChange: (value)=>handleWorkerInputChange('rol', value),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                        id: "worker-rol",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                            lineNumber: 746,
                                                            columnNumber: 60
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 746,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                        children: workerRoles.map((role)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: role,
                                                                children: role
                                                            }, role, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 748,
                                                                columnNumber: 58
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 747,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 745,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 743,
                                        columnNumber: 21
                                    }, this),
                                    currentWorker?.rol === 'Otro' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "worker-otro-rol",
                                                children: "Especifique el rol"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 754,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "worker-otro-rol",
                                                value: currentWorker?.otroRol || '',
                                                onChange: (e)=>handleWorkerInputChange('otroRol', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 755,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 753,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "font-semibold",
                                                children: "Certificado Aptitud Médica"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 760,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "cert-tec",
                                                                checked: currentWorker?.tsaTec === 'tec',
                                                                onCheckedChange: (checked)=>handleWorkerInputChange('tsaTec', checked ? 'tec' : 'na')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 762,
                                                                columnNumber: 70
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "cert-tec",
                                                                children: "TEC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 762,
                                                                columnNumber: 226
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "cert-tsa",
                                                                checked: currentWorker?.tsaTec === 'tsa',
                                                                onCheckedChange: (checked)=>handleWorkerInputChange('tsaTec', checked ? 'tsa' : 'na')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 70
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "cert-tsa",
                                                                children: "TSA"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 226
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 763,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 761,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 759,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "font-semibold",
                                                children: "Entrenamiento / Capacitación"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 767,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "ent-tec",
                                                                checked: currentWorker?.entrenamiento === 'tec',
                                                                onCheckedChange: (checked)=>handleWorkerInputChange('entrenamiento', checked ? 'tec' : 'otro')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 769,
                                                                columnNumber: 71
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "ent-tec",
                                                                children: "TEC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 769,
                                                                columnNumber: 242
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 769,
                                                        columnNumber: 30
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "ent-tsa",
                                                                checked: currentWorker?.entrenamiento === 'tsa',
                                                                onCheckedChange: (checked)=>handleWorkerInputChange('entrenamiento', checked ? 'tsa' : 'otro')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 770,
                                                                columnNumber: 70
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "ent-tsa",
                                                                children: "TSA"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 770,
                                                                columnNumber: 241
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 770,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 768,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                placeholder: "Otro",
                                                value: currentWorker?.entrenamiento === 'otro' ? currentWorker.otroEntrenamiento || '' : '',
                                                onChange: (e)=>handleWorkerInputChange('otroEntrenamiento', e.target.value),
                                                disabled: currentWorker?.entrenamiento !== 'otro'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 772,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 766,
                                        columnNumber: 22
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "font-semibold",
                                                children: "Afiliación a Seguridad Social"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 775,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "afil-eps",
                                                                checked: !!currentWorker?.eps,
                                                                onCheckedChange: (checked)=>handleWorkerInputChange('eps', checked ? 'activo' : '')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 777,
                                                                columnNumber: 69
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "afil-eps",
                                                                children: "EPS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 777,
                                                                columnNumber: 212
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 777,
                                                        columnNumber: 28
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "afil-arl",
                                                                checked: !!currentWorker?.arl,
                                                                onCheckedChange: (checked)=>handleWorkerInputChange('arl', checked ? 'activo' : '')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 778,
                                                                columnNumber: 69
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "afil-arl",
                                                                children: "ARL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 778,
                                                                columnNumber: 212
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 778,
                                                        columnNumber: 28
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "afil-pension",
                                                                checked: !!currentWorker?.pensiones,
                                                                onCheckedChange: (checked)=>handleWorkerInputChange('pensiones', checked ? 'activo' : '')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 779,
                                                                columnNumber: 69
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "afil-pension",
                                                                children: "Pensiones"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                                lineNumber: 779,
                                                                columnNumber: 228
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 776,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 774,
                                        columnNumber: 22
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                children: "Firma de Apertura"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 783,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full mt-2",
                                                onClick: ()=>openSignaturePad('worker.firmaApertura'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                        className: "mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 25
                                                    }, this),
                                                    " ",
                                                    currentWorker?.firmaApertura ? 'Ver/Cambiar Firma' : 'Registrar Firma'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 784,
                                                columnNumber: 23
                                            }, this),
                                            currentWorker?.firmaApertura && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: currentWorker.firmaApertura,
                                                alt: "Firma Apertura",
                                                width: 150,
                                                height: 75,
                                                className: "mx-auto mt-2 border rounded-md"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                                lineNumber: 787,
                                                columnNumber: 56
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 782,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 734,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "secondary",
                                        onClick: ()=>setIsWorkerDialogOpen(false),
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 791,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handleSaveWorker,
                                        children: "Guardar Trabajador"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                        lineNumber: 792,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 790,
                                columnNumber: 18
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                        lineNumber: 730,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 729,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                    open: isSignaturePadOpen,
                    onOpenChange: setIsSignaturePadOpen,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                        className: "w-[90vw] max-w-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Registrar Firma"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                    lineNumber: 800,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 799,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignaturePad"], {
                                onSave: handleSaveSignature
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                                lineNumber: 802,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                        lineNumber: 798,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/create/page.tsx",
                    lineNumber: 797,
                    columnNumber: 8
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
            lineNumber: 563,
            columnNumber: 5
        }, this)
    }, void 0, false);
}
_s(CreatePermitWizard, "OeLBFrLbdVpHM5wV2xztdYA4SBQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$form$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermitForm"]
    ];
});
_c = CreatePermitWizard;
function CreatePermitPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$create$2f$form$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PermitFormProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreatePermitWizard, {}, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/create/page.tsx",
            lineNumber: 813,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/permits/create/page.tsx",
        lineNumber: 812,
        columnNumber: 5
    }, this);
}
_c1 = CreatePermitPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "CreatePermitWizard");
__turbopack_context__.k.register(_c1, "CreatePermitPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_%28app%29_permits_create_page_tsx_8c213d6f._.js.map