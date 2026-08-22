'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

/**
 * Cabecera plegable de sección del asistente de permisos.
 *
 * Existía copiada literalmente en nueve pasos (ATS, Emergencias y los siete anexos). La
 * duplicación no era inocua: al corregir el desbordamiento horizontal en móvil hubo que
 * aplicar el mismo arreglo nueve veces, y cualquiera de las copias podía quedarse atrás.
 *
 * Acepta las dos formas de uso que ya existían, sin cambiar dónde vive el estado:
 *
 *  - **Controlada** — `isOpen` + `onToggle`. El padre decide qué sección está abierta
 *    (AtsStep y AnexoConfinadoStep lo usan para abrir una sola a la vez).
 *  - **No controlada** — `defaultOpen`. El estado vive aquí dentro, como antes.
 */
export interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  /**
   * Sin uso: ninguna de las copias originales lo leía. Se mantiene en la firma porque
   * varios sitios de llamada lo pasan; quitarlo obligaría a editarlos sin ganar nada.
   */
  sectionId?: string;
  /** Presente ⇒ modo controlado. */
  isOpen?: boolean;
  /** Requerido en modo controlado. Radix envía el nuevo valor; las copias lo ignoraban. */
  onToggle?: () => void;
  /** Solo en modo no controlado. */
  defaultOpen?: boolean;
}

export const SectionWrapper = React.memo(function SectionWrapper({
  title,
  children,
  isOpen,
  onToggle,
  defaultOpen = false,
}: SectionWrapperProps) {
  const controlada = isOpen !== undefined;
  const [abiertaInterna, setAbiertaInterna] = React.useState(defaultOpen);

  const alCambiar = React.useCallback(
    (valor: boolean) => {
      if (controlada) onToggle?.();
      else setAbiertaInterna(valor);
    },
    [controlada, onToggle],
  );

  return (
    <Collapsible open={controlada ? isOpen : abiertaInterna} onOpenChange={alCambiar}>
      <CollapsibleTrigger asChild>
        {/* `h-auto whitespace-normal` neutraliza el `whitespace-nowrap` que Button trae de
            buttonVariants: sin esto los títulos largos miden ~470px y desbordan en móvil. */}
        <Button
          variant="ghost"
          className="w-full justify-between gap-3 h-auto min-h-[52px] whitespace-normal text-left p-3 bg-gray-100 rounded-lg cursor-pointer border"
        >
          <h3 className="text-base md:text-lg font-bold text-gray-700 min-w-0 text-left">{title}</h3>
          <ChevronDown className="h-5 w-5 shrink-0 transition-transform data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 sm:p-4 border-l border-r border-b rounded-b-lg">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
});
