import type { PermitClosure } from '@/types';

export type ClosureChecklistRule = {
  field: keyof PermitClosure;
  label: string;
  blockValue: 'si' | 'no';
};

// Reglas de bloqueo confirmadas con el cliente: cada pregunta tiene un valor que bloquea
// el cierre; "na" nunca bloquea. Se usa tanto en el cliente (UX) como en el servidor (seguridad).
export const HOT_WORK_CLOSURE_RULES: ClosureChecklistRule[] = [
  { field: 'informeCulminacion', label: 'Se informó al responsable del área sobre la culminación de las actividades', blockValue: 'no' },
  { field: 'areaDespejada', label: 'Área despejada, ordenada y demarcación retirada', blockValue: 'no' },
  { field: 'evidenciaParticulas', label: 'Se evidencia partículas o material encendido que pueda generar riesgo de fuego incipiente', blockValue: 'si' },
  { field: 'continuaLabor', label: 'Se continúa con la labor de manera normal', blockValue: 'no' },
  { field: 'dispositivosRetirados', label: 'Se retiraron todos los dispositivos de bloqueo (candados y tarjetas)', blockValue: 'no' },
  { field: 'verificoEstadoArea', label: 'Seguimiento trabajo en caliente: se verificó el estado del área posterior a la culminación de la actividad', blockValue: 'no' },
];

export function getHotWorkClosureBlockingReasons(closure: Partial<PermitClosure> | undefined | null): string[] {
  const reasons: string[] = [];
  for (const rule of HOT_WORK_CLOSURE_RULES) {
    const value = closure?.[rule.field] as string | undefined;
    if (!value) {
      reasons.push(`Checklist de cierre (trabajo en caliente): falta responder "${rule.label}".`);
    } else if (value === rule.blockValue) {
      reasons.push(`Checklist de cierre (trabajo en caliente): "${rule.label}" no permite el cierre (respuesta actual: ${rule.blockValue.toUpperCase()}).`);
    }
  }
  return reasons;
}
