'use client';

import React, { createContext, useReducer, useContext, Dispatch, useEffect } from 'react';
import type { Permit, ExternalWorker, AnexoATS, AnexoAltura, AnexoConfinado, AnexoEnergias, AnexoIzaje, AnexoExcavaciones, VerificacionPeligros, EppEmergencias, PermitGeneralInfo, SelectedWorkTypes } from '@/types';

// Define the shape of the form data
type PermitFormData = Omit<Permit, 'id' | 'createdAt' | 'status' | 'createdBy' | 'number' | 'user' | 'approvals' | 'closure'>;

// Define the shape of the state
interface FormState extends PermitFormData {}

// Define the actions
type FormAction =
  | { type: 'UPDATE_GENERAL_INFO'; payload: Partial<FormState['generalInfo']> }
  | { type: 'UPDATE_WORK_TYPES'; payload: { type: keyof FormState['selectedWorkTypes'], value: boolean } }
  | { type: 'UPDATE_ATS'; payload: Partial<FormState['anexoATS']> }
  | { type: 'UPDATE_ANEXO_ALTURA'; payload: Partial<FormState['anexoAltura']> }
  | { type: 'UPDATE_ANEXO_CONFINADO'; payload: Partial<FormState['anexoConfinado']> }
  | { type: 'UPDATE_ANEXO_ENERGIA'; payload: Partial<FormState['anexoEnergias']> }
  | { type: 'UPDATE_ANEXO_IZAJE'; payload: Partial<FormState['anexoIzaje']> }
  | { type: 'UPDATE_ANEXO_EXCAVACIONES'; payload: Partial<FormState['anexoExcavaciones']> }
  | { type: 'UPDATE_VERIFICACION_PELIGROS'; payload: Partial<FormState['verificacionPeligros']> }
  | { type: 'UPDATE_EPP_EMERGENCIAS'; payload: Partial<FormState['eppEmergencias']> }
  | { type: 'SET_WORKERS'; payload: ExternalWorker[] }
  | { type: 'ADD_WORKER'; payload: ExternalWorker }
  | { type: 'UPDATE_SIGNATURE', payload: { target: string, signature: string, context: any } }
  | { type: 'SET_SST_REQUIRED', payload: boolean }
  | { type: 'SET_ENTIRE_STATE', payload: Partial<Permit> }
  | { type: 'RESET_FORM' };

// Initial state
const initialState: FormState = {
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
    responsable: { nombre: '', cargo: '', compania: '', alcance: '' }
  },
  selectedWorkTypes: {
    alturas: false,
    confinado: false,
    energia: false,
    izaje: false,
    excavacion: false,
    general: false,
  },
  trabajoAlturas: false, // Compatibility field
  isSSTSignatureRequired: false,
  anexoATS: {
    peligros: {},
    controles: {},
    epp: {},
    justificacion: {},
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
        otrosCual: '',
    },
    aspectosSeguridad: {},
    precauciones: {},
    afectaciones: {
        riesgoOtrasAreas: 'na',
        otrasAreasRiesgo: 'na',
        personalNotificado: 'na',
        observaciones: '',
    },
    validacion: {
      autoridad: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
      responsable: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
    },
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
      fechaCalibracion: '',
    },
    validacion: {
      autoridad: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
      responsable: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
    },
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
      conTension: false,
    },
    trabajoConTension: {},
    trabajoSinTension: {},
    observaciones: '',
  },
  anexoIzaje: {
    informacionGeneral: {
        accion: {},
        pesoCarga: {},
        equipoUtilizar: {},
        capacidadEquipo: '',
    },
    aspectosRequeridos: {},
    precauciones: {},
    validacion: {
      autoridad: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
      responsable: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
    },
  },
  anexoExcavaciones: {
    informacionGeneral: {
      dimensiones: '',
      profundidad: '',
      ancho: '',
      largo: '',
    },
    aspectosRequeridos: {},
    precauciones: {},
    validacion: {
      autoridad: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
      responsable: Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' })),
    },
  },
  verificacionPeligros: {
    fisicos: {},
    quimicos: {},
    seguridad: {},
    locativos: {},
    biologicoAmbiental: {},
    biomecanicos: {},
    psicosocial: {},
  },
  eppEmergencias: {
    epp: {},
    emergencias: {},
  },
  workers: [],
};

const LOCAL_STORAGE_KEY = 'permitFormDraft';

// Reducer function
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_GENERAL_INFO':
      return {
        ...state,
        generalInfo: { ...state.generalInfo, ...action.payload },
      };
    case 'UPDATE_WORK_TYPES':
        const isAlturas = action.payload.type === 'alturas';
        return {
            ...state,
            selectedWorkTypes: { ...state.selectedWorkTypes, [action.payload.type]: action.payload.value },
            // Also update the old 'trabajoAlturas' field for compatibility with security rules
            ...(isAlturas && { trabajoAlturas: action.payload.value }),
        }
    case 'UPDATE_ATS':
        return {
            ...state,
            anexoATS: { ...state.anexoATS, ...action.payload },
        }
    case 'UPDATE_ANEXO_ALTURA':
        return {
            ...state,
            anexoAltura: { ...state.anexoAltura, ...action.payload },
        }
    case 'UPDATE_ANEXO_CONFINADO':
        return {
            ...state,
            anexoConfinado: { ...state.anexoConfinado, ...action.payload },
        }
    case 'UPDATE_ANEXO_ENERGIA':
        return {
            ...state,
            anexoEnergias: { ...state.anexoEnergias, ...action.payload },
        }
    case 'UPDATE_ANEXO_IZAJE':
        return {
            ...state,
            anexoIzaje: { ...state.anexoIzaje, ...action.payload },
        }
    case 'UPDATE_ANEXO_EXCAVACIONES':
        return {
            ...state,
            anexoExcavaciones: { ...state.anexoExcavaciones, ...action.payload },
        }
    case 'UPDATE_VERIFICACION_PELIGROS':
        return {
            ...state,
            verificacionPeligros: { ...state.verificacionPeligros, ...action.payload },
        }
    case 'UPDATE_EPP_EMERGENCIAS':
        return {
            ...state,
            eppEmergencias: { ...state.eppEmergencias, ...action.payload },
        }
    case 'SET_WORKERS':
        return {
            ...state,
            workers: action.payload,
        }
    case 'ADD_WORKER':
        return {
            ...state,
            workers: [...(state.workers || []), action.payload]
        }
    case 'UPDATE_SIGNATURE':
      console.log('Signature update needs to be implemented in reducer:', action.payload);
      return state;
    case 'SET_SST_REQUIRED':
        return {
            ...state,
            isSSTSignatureRequired: action.payload
        };
    case 'SET_ENTIRE_STATE':
        const { payload } = action;
        return {
            ...initialState, // Start with a clean initial state
            generalInfo: { ...initialState.generalInfo, ...payload.generalInfo },
            selectedWorkTypes: { ...initialState.selectedWorkTypes, ...payload.selectedWorkTypes },
            trabajoAlturas: payload.trabajoAlturas || false,
            isSSTSignatureRequired: payload.isSSTSignatureRequired || false,
            anexoATS: { ...initialState.anexoATS, ...payload.anexoATS },
            anexoAltura: { ...initialState.anexoAltura, ...payload.anexoAltura },
            anexoConfinado: { ...initialState.anexoConfinado, ...payload.anexoConfinado },
            anexoEnergias: { ...initialState.anexoEnergias, ...payload.anexoEnergias },
            anexoIzaje: { ...initialState.anexoIzaje, ...payload.anexoIzaje },
            anexoExcavaciones: { ...initialState.anexoExcavaciones, ...payload.anexoExcavaciones },
            verificacionPeligros: { ...initialState.verificacionPeligros, ...payload.verificacionPeligros },
            eppEmergencias: { ...initialState.eppEmergencias, ...payload.eppEmergencias },
            workers: payload.workers || initialState.workers,
        };
    case 'RESET_FORM':
      // Limpiar también el localStorage al resetear
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (error) {
        console.error("Failed to remove draft from localStorage", error);
      }
      return initialState;
    default:
      return state;
  }
}

// Create the context
const PermitFormContext = createContext<{ 
    state: FormState; 
    dispatch: Dispatch<FormAction>;
} | undefined>(undefined);

// Función para inicializar el estado, intentando cargar desde localStorage
const initializer = (initialValue = initialState) => {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse draft from localStorage", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
  return initialValue;
};

// 🔥 FUNCIÓN DE VALIDACIÓN DE EMERGENCIAS (EXPORTADA)
export const validateEmergenciasStep = (eppEmergencias: EppEmergencias): {
    isValid: boolean;
    errors: string[];
    hasNoResponses: boolean;
} => {
    const emergenciasRequired = [
        'notificacion',
        'potenciales',
        'procedimientos',
        'rutasEvacuacion',
        'puntosEncuentro',
        'equiposEmergencia',
        'ubicacionBrigadistas'
    ];

    const errors: string[] = [];
    let hasNoResponses = false;

    emergenciasRequired.forEach(field => {
        const value = eppEmergencias.emergencias?.[field];
        
        if (value === 'no') {
            errors.push(`El campo "${field}" debe estar en "SI"`);
            hasNoResponses = true;
        } else if (!value || value === '') {
            errors.push(`El campo "${field}" no ha sido seleccionado`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors,
        hasNoResponses
    };
};

// Create the provider component
export function PermitFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState, initializer);

  // Efecto para guardar en localStorage cada vez que el estado cambia
  useEffect(() => {
    try {
      // No guardar si el estado es el inicial (formulario vacío)
      if (state !== initialState) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      }
    } catch (error) {
      console.error("Failed to save draft to localStorage", error);
    }
  }, [state]);

  return (
    <PermitFormContext.Provider value={{ state, dispatch }}>
      {children}
    </PermitFormContext.Provider>
  );
}

// Custom hook to use the context
export function usePermitForm() {
  const context = useContext(PermitFormContext);
  if (!context) {
    throw new Error('usePermitForm must be used within a PermitFormProvider');
  }
  return context;
}

// 🔥 EXPORTAR FUNCIÓN HELPER PARA VALIDAR DESDE CUALQUIER COMPONENTE
export { validateEmergenciasStep as validateEmergencias };
