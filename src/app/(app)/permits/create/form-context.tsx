'use client';

import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import type { Permit, ExternalWorker, AnexoATS, AnexoAltura, AnexoConfinado, AnexoEnergias } from '@/types';

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
  | { type: 'SET_WORKERS'; payload: ExternalWorker[] }
  | { type: 'ADD_WORKER'; payload: ExternalWorker }
  | { type: 'UPDATE_SIGNATURE', payload: { target: string, signature: string, context: any } }
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
    protocolosBioseguridad: 'no'
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
