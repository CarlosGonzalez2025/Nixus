module.exports = {

"[project]/src/app/(app)/permits/create/form-context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PermitFormProvider": (()=>PermitFormProvider),
    "usePermitForm": (()=>usePermitForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// Initial state
const initialState = {
    generalInfo: {
        areaEspecifica: '',
        planta: '',
        proceso: '',
        contrato: '',
        empresa: '',
        nombreSolicitante: '',
        fechaCreacion: new Date().toISOString(),
        validFrom: '',
        validUntil: '',
        workDescription: '',
        tools: [],
        numTrabajadores: '',
        reunionInicio: 'na',
        atsVerificado: 'na',
        responsable: {
            nombre: '',
            cargo: '',
            compania: '',
            alcance: ''
        }
    },
    selectedWorkTypes: {
        alturas: false,
        confinado: false,
        energia: false,
        izaje: false,
        excavacion: false,
        general: false
    },
    anexoATS: {
        peligros: {},
        controles: {},
        epp: {},
        justificacion: {}
    },
    anexoAltura: {
        tipoEstructura: {
            escaleraCuerpo: false,
            escaleraDosCuerpos: false,
            andamioTubular: false,
            andamioColgante: false,
            plataforma: false,
            manLift: false,
            otros: false,
            otrosCual: ''
        },
        aspectosSeguridad: {},
        precauciones: {},
        afectaciones: {
            riesgoOtrasAreas: 'na',
            otrasAreasRiesgo: 'na',
            personalNotificado: 'na',
            observaciones: ''
        }
    },
    anexoConfinado: {
        identificacionPeligros: {},
        precauciones: {},
        resultadosPruebasGases: {},
        requerimientosEquipos: {},
        pruebasGasesPeriodicas: {
            intervalo: '',
            pruebas: [],
            pruebaRealizadaPor: '',
            serialMonitor: '',
            marca: '',
            fechaCalibracion: ''
        },
        validacion: {
            autoridad: [],
            responsable: []
        }
    },
    anexoEnergias: {
        trabajosEnCaliente: {},
        energiasPeligrosas: {},
        procedimientoLOTO: {},
        trabajosConEnergiaElectrica: {},
        tensionExpuesta: {},
        planeacion: {},
        metodoTrabajo: {
            sinTension: false,
            conTension: false
        },
        trabajoConTension: {},
        trabajoSinTension: {},
        observaciones: ''
    },
    anexoIzaje: {
        informacionGeneral: {
            accion: {},
            pesoCarga: {},
            equipoUtilizar: {},
            capacidadEquipo: ''
        },
        aspectosRequeridos: {},
        precauciones: {}
    },
    anexoExcavaciones: {
        informacionGeneral: {
            dimensiones: '',
            profundidad: '',
            ancho: '',
            largo: ''
        },
        aspectosRequeridos: {},
        precauciones: {}
    },
    verificacionPeligros: {
        fisicos: {},
        quimicos: {},
        seguridad: {},
        locativos: {},
        biologicoAmbiental: {},
        biomecanicos: {},
        psicosocial: {}
    },
    eppEmergencias: {
        epp: {},
        emergencias: {}
    },
    workers: []
};
// Reducer function
function formReducer(state, action) {
    switch(action.type){
        case 'UPDATE_GENERAL_INFO':
            return {
                ...state,
                generalInfo: {
                    ...state.generalInfo,
                    ...action.payload
                }
            };
        case 'UPDATE_WORK_TYPES':
            return {
                ...state,
                selectedWorkTypes: {
                    ...state.selectedWorkTypes,
                    [action.payload.type]: action.payload.value
                }
            };
        case 'UPDATE_ATS':
            return {
                ...state,
                anexoATS: {
                    ...state.anexoATS,
                    ...action.payload
                }
            };
        case 'UPDATE_ANEXO_ALTURA':
            return {
                ...state,
                anexoAltura: {
                    ...state.anexoAltura,
                    ...action.payload
                }
            };
        case 'UPDATE_ANEXO_CONFINADO':
            return {
                ...state,
                anexoConfinado: {
                    ...state.anexoConfinado,
                    ...action.payload
                }
            };
        case 'UPDATE_ANEXO_ENERGIA':
            return {
                ...state,
                anexoEnergias: {
                    ...state.anexoEnergias,
                    ...action.payload
                }
            };
        case 'UPDATE_ANEXO_IZAJE':
            return {
                ...state,
                anexoIzaje: {
                    ...state.anexoIzaje,
                    ...action.payload
                }
            };
        case 'UPDATE_ANEXO_EXCAVACIONES':
            return {
                ...state,
                anexoExcavaciones: {
                    ...state.anexoExcavaciones,
                    ...action.payload
                }
            };
        case 'UPDATE_VERIFICACION_PELIGROS':
            return {
                ...state,
                verificacionPeligros: {
                    ...state.verificacionPeligros,
                    ...action.payload
                }
            };
        case 'UPDATE_EPP_EMERGENCIAS':
            return {
                ...state,
                eppEmergencias: {
                    ...state.eppEmergencias,
                    ...action.payload
                }
            };
        case 'SET_WORKERS':
            return {
                ...state,
                workers: action.payload
            };
        case 'ADD_WORKER':
            return {
                ...state,
                workers: [
                    ...state.workers || [],
                    action.payload
                ]
            };
        case 'UPDATE_SIGNATURE':
            // Complex logic for updating signatures in nested annexes can be handled here
            // This is a simplified example
            console.log('Signature update needs to be implemented in reducer:', action.payload);
            return state;
        case 'SET_ENTIRE_STATE':
            const { payload } = action;
            // Reconstruct the state from the payload, providing defaults for any missing pieces
            return {
                generalInfo: {
                    ...initialState.generalInfo,
                    ...payload.generalInfo
                },
                selectedWorkTypes: {
                    ...initialState.selectedWorkTypes,
                    ...payload.selectedWorkTypes
                },
                anexoATS: {
                    ...initialState.anexoATS,
                    ...payload.anexoATS
                },
                anexoAltura: {
                    ...initialState.anexoAltura,
                    ...payload.anexoAltura
                },
                anexoConfinado: {
                    ...initialState.anexoConfinado,
                    ...payload.anexoConfinado
                },
                anexoEnergias: {
                    ...initialState.anexoEnergias,
                    ...payload.anexoEnergias
                },
                anexoIzaje: {
                    ...initialState.anexoIzaje,
                    ...payload.anexoIzaje
                },
                anexoExcavaciones: {
                    ...initialState.anexoExcavaciones,
                    ...payload.anexoExcavaciones
                },
                verificacionPeligros: {
                    ...initialState.verificacionPeligros,
                    ...payload.verificacionPeligros
                },
                eppEmergencias: {
                    ...initialState.eppEmergencias,
                    ...payload.eppEmergencias
                },
                workers: payload.workers || initialState.workers
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}
// Create the context
const PermitFormContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function PermitFormProvider({ children }) {
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(formReducer, initialState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PermitFormContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/permits/create/form-context.tsx",
        lineNumber: 254,
        columnNumber: 5
    }, this);
}
function usePermitForm() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PermitFormContext);
    if (!context) {
        throw new Error('usePermitForm must be used within a PermitFormProvider');
    }
    return context;
}
}}),

};

//# sourceMappingURL=src_app_%28app%29_permits_create_form-context_tsx_942920d7._.js.map