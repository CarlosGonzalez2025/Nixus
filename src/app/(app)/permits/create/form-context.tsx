
'use client';

import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import type { Permit, ExternalWorker, AnexoATS, AnexoAltura, AnexoConfinado, AnexoEnergias, AnexoIzaje, AnexoExcavaciones, VerificacionPeligros, EppEmergencias } from '@/types';

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
    caliente: false,
    excavacion: false,
    general: false,
  },
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
        autoridad: [],
        responsable: [],
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

// Reducer function
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_GENERAL_INFO':
      return {
        ...state,
        generalInfo: { ...state.generalInfo, ...action.payload },
      };
    case 'UPDATE_WORK_TYPES':
        return {
            ...state,
            selectedWorkTypes: { ...state.selectedWorkTypes, [action.payload.type]: action.payload.value }
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
      // Complex logic for updating signatures in nested annexes can be handled here
      // This is a simplified example
      console.log('Signature update needs to be implemented in reducer:', action.payload);
      return state;
    case 'SET_ENTIRE_STATE':
        const { payload } = action;
        // Reconstruct the state from the payload, providing defaults for any missing pieces
        return {
            generalInfo: payload.generalInfo || initialState.generalInfo,
            selectedWorkTypes: payload.selectedWorkTypes || initialState.selectedWorkTypes,
            anexoATS: payload.anexoATS || initialState.anexoATS,
            anexoAltura: payload.anexoAltura || initialState.anexoAltura,
            anexoConfinado: payload.anexoConfinado || initialState.anexoConfinado,
            anexoEnergias: payload.anexoEnergias || initialState.anexoEnergias,
            anexoIzaje: payload.anexoIzaje || initialState.anexoIzaje,
            anexoExcavaciones: payload.anexoExcavaciones || initialState.anexoExcavaciones,
            verificacionPeligros: payload.verificacionPeligros || initialState.verificacionPeligros,
            eppEmergencias: payload.eppEmergencias || initialState.eppEmergencias,
            workers: payload.workers || initialState.workers,
        };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

// Create the context
const PermitFormContext = createContext<{ state: FormState; dispatch: Dispatch<FormAction> } | undefined>(undefined);

// Create the provider component
export function PermitFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

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
