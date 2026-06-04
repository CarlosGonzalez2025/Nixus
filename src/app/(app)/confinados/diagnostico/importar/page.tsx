'use client';

import React, { useState, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import {
  validateImportRows, executeImport,
  type RawImportRow, type RowResult, type ValidationResult, type ExecuteResult,
} from './actions';
import {
  ACTIVIDADES_LISTA, DETALLE_ACTIVIDAD_LISTA, ALTURA_OPCIONES,
  DESARROLLADO_POR_OPCIONES, TIPO_EJECUCION_OPCIONES, ACTIVIDADES_ALTO_RIESGO,
  FACILIDADES_OPCIONES, MEDIDAS_PREVENCION_OPCIONES, EQUIPOS_BASE_OPTS, EPP_OPCIONES,
} from '@/types/confinados';

// ── Column mapping (client-side — must NOT live in 'use server' file) ─────────
// Includes accent-variant keys for resilience (users may delete accents in Excel).

const COLUMN_MAP: Record<string, string> = {
  // Datos Generales
  'Empresa':                              'empresa',
  'Planta':                               'planta',
  'Proceso':                              'proceso',
  'Fecha':                                'fecha',
  // Descripción de la Actividad
  'Actividad Analizada':                  'actividadAnalizada',
  'Detalle de la Actividad':              'detalleActividad',
  'Altura Promedio':                      'alturaPromedio',
  'Desarrollada Por':                     'desarrolladaPor',
  'Tipo de Ejecucion':                    'tipoEjecucion',
  'Tipo de Ejecución':                    'tipoEjecucion',
  'Tiene Alto Riesgo Adicional':          'tieneAltoRiesgoAdicional',
  'Actividades Alto Riesgo':              'actividadesAltoRiesgo',
  'Medidas de Entrada y Salida':          'medidasDeEntradaSalida',
  'Medidas Entrada Salida':               'medidasDeEntradaSalida',
  'Descripcion Espacio':                  'descripcionEspacio',
  'Descripción Espacio':                 'descripcionEspacio',
  'Descripcion del Espacio':              'descripcionEspacio',
  'Descripción del Espacio':             'descripcionEspacio',
  // Facilidades y Evaluación
  'Facilidades del Espacio':              'facilidades',
  'Facilidades':                          'facilidades',
  'Evaluada en IPER':                     'evaluadaEnIPER',
  'Tipo Espacio Confinado':               'tipoEspacioConfinado',
  'Grado Peligrosidad':                   'gradoPeligrosidad',
  'Medidas de Prevencion':                'medidasPrevencion',
  'Medidas de Prevención':               'medidasPrevencion',
  'Monitoreo Previo Ingreso':             'monitoreoPrevioIngreso',
  'Cuenta con Procedimiento':             'cuentaConProcedimiento',
  'Metodologia Bloqueo Energias':         'metodologiaBloqueoEnergias',
  'Metodología Bloqueo Energías':        'metodologiaBloqueoEnergias',
  // Equipos y EPP
  'Escalera Fosa Vertical':               'escaleraFosaVertical',
  'Escalera Gato':                        'escaleraGato',
  'Escalera Extension':                   'escaleraExtension',
  'Escalera Extensión':                  'escaleraExtension',
  'Otro Trabajo en Alturas':              'otroTrabajoAlturas',
  'Arnes Cuerpo Completo':                'arnesCuerpoCompleto',
  'Arnés Cuerpo Completo':               'arnesCuerpoCompleto',
  'Tripode Equipo Rescate':               'tripodeEquipoRescate',
  'Trípode Equipo Rescate':              'tripodeEquipoRescate',
  'Auto Contenido':                       'autoContenido',
  'Equipo Comunicacion':                  'equipoComunicacion',
  'Equipo Comunicación':                 'equipoComunicacion',
  'Sistema Ventilacion Mecanica':         'sistemaVentilacionMecanica',
  'Sistema Ventilación Mecánica':        'sistemaVentilacionMecanica',
  'Sistema Proteccion Caidas':            'sistemaProteccionCaidas',
  'Sistema Protección Caídas':           'sistemaProteccionCaidas',
  'Equipo Primeros Auxilios':             'equipoPrimerosAuxilios',
  'Otros Modelos Proteccion':             'otrosModelosProteccion',
  'Otros Modelos Protección':            'otrosModelosProteccion',
  'EPP Utilizados':                       'eppUtilizados',
  // Cierre
  'Eventos Accidentes Previos':           'eventosAccidentesPrevios',
  'Cliente Acepta Info':                  'clienteAceptaInfo',
  'Nombre SST':                           'nombreSST',
  'Nombre Responsable':                   'nombreResponsable',
};

function mapRowColumns(rawRow: Record<string, string>): RawImportRow {
  const mapped: RawImportRow = {};
  for (const [header, value] of Object.entries(rawRow)) {
    const field = COLUMN_MAP[header.trim()] ?? header.trim().toLowerCase().replace(/\s+/g, '_');
    mapped[field] = value;
  }
  return mapped;
}
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Upload, Download, FileSpreadsheet, CheckCircle2, XCircle,
  AlertTriangle, ArrowLeft, Loader2, ChevronDown, ChevronRight,
  FileX, RefreshCw, ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Template definition (38 columns = all importable fields) ─────────────────

type ColKind = 'texto' | 'fecha' | 'unico' | 'multiple';

interface TemplateCol {
  header: string;
  req: boolean;
  kind: ColKind;
  example: string;
  allowed: string;   // description of allowed values (short)
}

// ── Listas de valores sheet layout (column index → Excel letter) ──────────────
// Col 0 (A): Si/No           Col 1 (B): Tipo Ejecución     Col 2 (C): Tipo Espacio
// Col 3 (D): Grado           Col 4 (E): Altura Promedio     Col 5 (F): Desarrollada Por [M]
// Col 6 (G): Act. Alto Riesgo [M]  Col 7 (H): Facilidades [M]  Col 8 (I): Medidas Prev [M]
// Col 9 (J): Equipos base [M] Col 10 (K): EPP [M]          Col 11 (L): Actividad Analizada
// Col 12 (M): Detalle Actividad
// Data rows start at Excel row 3 (index 2, after title + header rows)

const TEMPLATE_COLS: TemplateCol[] = [
  // ── Grupo 1: Datos Generales ────────────────────────────────────────────────
  {
    header: 'Empresa', req: true, kind: 'texto',
    example: 'Italcol S.A.',
    allowed: 'Texto libre. Nombre exacto de la empresa registrada en el sistema.',
  },
  {
    header: 'Planta', req: true, kind: 'texto',
    example: 'Planta Mosquera',
    allowed: 'Texto libre. Nombre exacto de la planta.',
  },
  {
    header: 'Proceso', req: false, kind: 'texto',
    example: 'Producción',
    allowed: 'Texto libre. Nombre del proceso o área.',
  },
  {
    header: 'Fecha', req: true, kind: 'fecha',
    example: '15/06/2024',
    allowed: 'Formato dd/mm/yyyy. También se acepta yyyy-mm-dd.',
  },
  // ── Grupo 2: Descripción de la Actividad ────────────────────────────────────
  {
    header: 'Actividad Analizada', req: false, kind: 'unico',
    example: 'Limpieza y desatasque de silos, tolvas y fosos.',
    allowed: 'Ver hoja "Listas de valores" → columna Actividad Analizada. Tiene validación de datos.',
  },
  {
    header: 'Detalle de la Actividad', req: false, kind: 'unico',
    example: 'Limpieza y desinfección interna/externa de tanques (agua, combustible, residuales).',
    allowed: 'Ver hoja "Listas de valores" → columna Detalle de la Actividad. Tiene validación de datos.',
  },
  {
    header: 'Altura Promedio', req: false, kind: 'unico',
    example: 'Entre 2.01 m y 4.00 m',
    allowed: 'Entre 2.01 m y 4.00 m | Entre 4.01 m y 6.00 m | Entre 6.01 m y 9.00 m | Más de 9.01 m',
  },
  {
    header: 'Desarrollada Por', req: false, kind: 'multiple',
    example: 'Personal de la Empresa,Personal Temporal',
    allowed: 'Personal Temporal | Personal de la Empresa | No Aplica',
  },
  {
    header: 'Tipo de Ejecución', req: false, kind: 'unico',
    example: 'Rutinaria',
    allowed: 'Rutinaria | No Rutinaria | Periódica | Esporádica',
  },
  {
    header: 'Tiene Alto Riesgo Adicional', req: false, kind: 'unico',
    example: 'No',
    allowed: 'Si | No',
  },
  {
    header: 'Actividades Alto Riesgo', req: false, kind: 'multiple',
    example: 'Trabajo en alturas,Trabajo en caliente',
    allowed: 'Ver hoja "Listas de valores" → columna Actividades Alto Riesgo.',
  },
  {
    header: 'Medidas de Entrada y Salida', req: false, kind: 'texto',
    example: 'Escotilla superior 60 cm, escalera tipo gato',
    allowed: 'Texto libre. Descripción de accesos y medios de comunicación.',
  },
  {
    header: 'Descripción del Espacio', req: false, kind: 'texto',
    example: 'Tanque cilíndrico 2 m diámetro x 4 m alto',
    allowed: 'Texto libre. Dimensiones, redes presentes, etc.',
  },
  // ── Grupo 3: Facilidades y Evaluación ───────────────────────────────────────
  {
    header: 'Facilidades del Espacio', req: false, kind: 'multiple',
    example: 'Ventilación: Natural,Iluminación: Natural',
    allowed: 'Ver hoja "Listas de valores" → columna Facilidades del Espacio.',
  },
  {
    header: 'Evaluada en IPER', req: false, kind: 'unico',
    example: 'Si',
    allowed: 'Si | No',
  },
  {
    header: 'Tipo Espacio Confinado', req: false, kind: 'unico',
    example: 'Tipo 1',
    allowed: 'Tipo 1 | Tipo 2',
  },
  {
    header: 'Grado Peligrosidad', req: false, kind: 'unico',
    example: 'Grado B',
    allowed: 'Grado A | Grado B | Grado C',
  },
  {
    header: 'Medidas de Prevención', req: false, kind: 'multiple',
    example: 'Permiso de trabajo,Monitoreo de atmósfera',
    allowed: 'Ver hoja "Listas de valores" → columna Medidas de Prevención.',
  },
  {
    header: 'Monitoreo Previo Ingreso', req: false, kind: 'unico',
    example: 'Si',
    allowed: 'Si | No',
  },
  {
    header: 'Cuenta con Procedimiento', req: false, kind: 'unico',
    example: 'Si',
    allowed: 'Si | No',
  },
  {
    header: 'Metodología Bloqueo Energías', req: false, kind: 'unico',
    example: 'Si',
    allowed: 'Si | No',
  },
  // ── Grupo 4: Equipos y EPP (todos son selección múltiple) ───────────────────
  {
    header: 'Escalera Fosa Vertical', req: false, kind: 'multiple',
    example: 'Se utiliza,Buen estado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Escalera Gato', req: false, kind: 'multiple',
    example: 'No aplica',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Escalera Extensión', req: false, kind: 'multiple',
    example: 'Se utiliza,Certificado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Otro Trabajo en Alturas', req: false, kind: 'multiple',
    example: 'No aplica',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Arnés Cuerpo Completo', req: false, kind: 'multiple',
    example: 'Se utiliza,Hoja de vida,Buen estado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Trípode Equipo Rescate', req: false, kind: 'multiple',
    example: 'Se utiliza,Certificado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Auto Contenido', req: false, kind: 'multiple',
    example: 'Se utiliza,Buen estado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Equipo Comunicación', req: false, kind: 'multiple',
    example: 'Se utiliza',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Sistema Ventilación Mecánica', req: false, kind: 'multiple',
    example: 'Se utiliza,Buen estado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Sistema Protección Caídas', req: false, kind: 'multiple',
    example: 'Se utiliza,Certificado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Equipo Primeros Auxilios', req: false, kind: 'multiple',
    example: 'Se utiliza,Buen estado,Certificado',
    allowed: 'Se utiliza | Inspección y mantenimiento | Hoja de vida | Buen estado | Certificado | No se utiliza | No aplica',
  },
  {
    header: 'Otros Modelos Protección', req: false, kind: 'multiple',
    example: 'Se utiliza,Casco de seguridad,Botas dieléctricas',
    allowed: 'Ver hoja "Listas de valores" → columna EPP / Otros Modelos.',
  },
  {
    header: 'EPP Utilizados', req: false, kind: 'multiple',
    example: 'Casco de seguridad,Guantes de seguridad según la labor',
    allowed: 'Ver hoja "Listas de valores" → columna EPP / Otros Modelos.',
  },
  // ── Grupo 5: Cierre ──────────────────────────────────────────────────────────
  {
    header: 'Eventos Accidentes Previos', req: false, kind: 'unico',
    example: 'No',
    allowed: 'Si | No',
  },
  {
    header: 'Cliente Acepta Info', req: false, kind: 'unico',
    example: 'Si',
    allowed: 'Si | No',
  },
  {
    header: 'Nombre SST', req: false, kind: 'texto',
    example: 'Carlos Ramírez',
    allowed: 'Texto libre. Nombre completo del asesor SST.',
  },
  {
    header: 'Nombre Responsable', req: false, kind: 'texto',
    example: 'Jefe de Planta',
    allowed: 'Texto libre. Nombre de la persona responsable.',
  },
];

// ── Palette ────────────────────────────────────────────────────────────────────

const C = {
  violeta:    '7C3AED',
  violetaClaro: 'EDE9FE',
  azulOscuro: '1E3A5F',
  azulClaro:  'DBEAFE',
  verdeOscuro:'15803D',
  verdeClaro: 'DCFCE7',
  naranjaOscuro: 'C2410C',
  naranjaClaro:  'FFEDD5',
  grisOscuro: '374151',
  grisClaro:  'F3F4F6',
  gris2:      'E5E7EB',
  blanco:     'FFFFFF',
  amarillo:   'FEF9C3',
  amarilloOscuro: '92400E',
};

function cellStyle(
  bold = false,
  bgRgb = C.blanco,
  fgRgb = C.grisOscuro,
  wrapText = true,
  hAlign: 'left' | 'center' | 'right' = 'left',
) {
  return {
    font: { bold, color: { rgb: fgRgb } },
    fill: { fgColor: { rgb: bgRgb } },
    alignment: { wrapText, horizontal: hAlign, vertical: 'center' },
    border: {
      top:    { style: 'thin', color: { rgb: 'D1D5DB' } },
      bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
      left:   { style: 'thin', color: { rgb: 'D1D5DB' } },
      right:  { style: 'thin', color: { rgb: 'D1D5DB' } },
    },
  };
}

function setCell(ws: XLSX.WorkSheet, row: number, col: number, value: any, style?: any) {
  const addr = XLSX.utils.encode_cell({ r: row, c: col });
  ws[addr] = { v: value, t: typeof value === 'number' ? 'n' : 's', s: style };
}

// ── Helper: Excel column letter from 0-based index ────────────────────────────

function colLetter(idx: number): string {
  let letter = '';
  let n = idx + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    n = Math.floor((n - 1) / 26);
  }
  return letter;
}

// ── Build "Datos" sheet ────────────────────────────────────────────────────────

function buildDatosSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const headers  = TEMPLATE_COLS.map(c => c.header);
  const lastCol  = colLetter(headers.length - 1);

  const notes = TEMPLATE_COLS.map(c =>
    (c.req ? '★ REQUERIDO' : 'Opcional') +
    (c.kind === 'multiple' ? '  |  SELECCIÓN MÚLTIPLE — separar con coma ( , )' : '') +
    '\n' + c.allowed,
  );
  const examples = TEMPLATE_COLS.map(c => c.example);

  // Row 0 — headers (group color bands)
  // Groups: 0-3 violet, 4-12 blue, 13-20 teal, 21-33 indigo, 34-37 green
  const groupBg = (i: number) => {
    if (i <= 3)  return '5B21B6'; // datos generales — deep violet
    if (i <= 12) return '1D4ED8'; // descripción — blue
    if (i <= 20) return '0F766E'; // facilidades — teal
    if (i <= 33) return '3730A3'; // equipos — indigo
    return '15803D';              // cierre — green
  };

  headers.forEach((h, ci) => {
    setCell(ws, 0, ci, h, cellStyle(true, groupBg(ci), C.blanco, true, 'center'));
  });

  // Row 1 — notes
  notes.forEach((n, ci) => {
    const isMulti = TEMPLATE_COLS[ci].kind === 'multiple';
    setCell(ws, 1, ci, n,
      cellStyle(false, isMulti ? C.amarillo : C.grisClaro, isMulti ? C.amarilloOscuro : C.grisOscuro, true));
  });

  // Row 2 — example row
  examples.forEach((ex, ci) => {
    setCell(ws, 2, ci, ex, cellStyle(false, C.verdeClaro, C.verdeOscuro, true));
  });

  ws['!ref']  = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 2, c: headers.length - 1 } });
  ws['!cols'] = headers.map(() => ({ wch: 30 }));
  ws['!rows'] = [{ hpt: 24 }, { hpt: 56 }, { hpt: 22 }];

  // AutoFilter on header row (gives Excel table look with dropdown arrows)
  ws['!autofilter'] = { ref: `A1:${lastCol}1` };

  // Freeze top 3 rows so headers stay visible while scrolling
  ws['!views'] = [{ state: 'frozen', ySplit: 3, topLeftCell: 'A4' }];

  // ── Data Validations ──────────────────────────────────────────────────────────
  // Data starts at Excel row 4 (index 3). We apply validation down to row 2000.
  // Single-select fields: dropdown with exact allowed values from "Listas de valores".
  // Multi-select fields: no validation (Excel can't validate comma-separated lists natively).

  const LV = "'Listas de valores'"; // sheet reference prefix
  // Listas de valores column layout (Excel rows 3+, 1-indexed):
  // A=Si/No  B=TipoEjec  C=TipoEspacio  D=Grado  E=Altura  F=DesarrolladaPor[M]
  // G=ActAltRiesgo[M]  H=Facilidades[M]  I=MedidasPrev[M]  J=EquiposBase[M]
  // K=EPP[M]  L=ActividadAnalizada  M=DetalleActividad

  type DV = { sqref: string; formula1: string };
  const dvList: DV[] = [
    // col 4 (E): Actividad Analizada — 44 values (L3:L46 in Listas)
    { sqref: `E4:E2000`, formula1: `${LV}!$L$3:$L$46` },
    // col 5 (F): Detalle — 25 values (M3:M27 in Listas)
    { sqref: `F4:F2000`, formula1: `${LV}!$M$3:$M$27` },
    // col 6 (G): Altura Promedio — 4 values (E3:E6 in Listas)
    { sqref: `G4:G2000`, formula1: `${LV}!$E$3:$E$6` },
    // col 8 (I): Tipo Ejecución — 4 values (B3:B6 in Listas)
    { sqref: `I4:I2000`, formula1: `${LV}!$B$3:$B$6` },
    // col 9 (J): Tiene Alto Riesgo — Si/No inline (2 values, safe for inline)
    { sqref: `J4:J2000`, formula1: `"Si,No"` },
    // col 13 (N): Evaluada en IPER
    { sqref: `N4:N2000`, formula1: `"Si,No"` },
    // col 14 (O): Tipo Espacio Confinado (C3:C4 in Listas)
    { sqref: `O4:O2000`, formula1: `${LV}!$C$3:$C$4` },
    // col 15 (P): Grado Peligrosidad (D3:D5 in Listas)
    { sqref: `P4:P2000`, formula1: `${LV}!$D$3:$D$5` },
    // col 17 (R): Monitoreo Previo Ingreso
    { sqref: `R4:R2000`, formula1: `"Si,No"` },
    // col 18 (S): Cuenta con Procedimiento
    { sqref: `S4:S2000`, formula1: `"Si,No"` },
    // col 19 (T): Metodología Bloqueo
    { sqref: `T4:T2000`, formula1: `"Si,No"` },
    // col 33 (AH): Eventos Accidentes Previos
    { sqref: `AH4:AH2000`, formula1: `"Si,No"` },
    // col 34 (AI): Cliente Acepta Info
    { sqref: `AI4:AI2000`, formula1: `"Si,No"` },
  ];

  (ws as any)['!dataValidations'] = dvList.map(dv => ({
    type: 'list',
    sqref: dv.sqref,
    formula1: dv.formula1,
    allowBlank: true,
    showDropDown: false,
    showInputMessage: false,
    showErrorMessage: true,
    errorTitle: 'Valor no válido',
    error: 'Seleccione un valor de la lista desplegable.',
  }));

  return ws;
}

// ── Build "Instrucciones" sheet ────────────────────────────────────────────────

function buildInstruccionesSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  let r = 0;

  const title = (text: string) => {
    setCell(ws, r, 0, text, cellStyle(true, C.violeta, C.blanco, false, 'left'));
    setCell(ws, r, 1, '', cellStyle(true, C.violeta, C.blanco, false));
    setCell(ws, r, 2, '', cellStyle(true, C.violeta, C.blanco, false));
    setCell(ws, r, 3, '', cellStyle(true, C.violeta, C.blanco, false));
    r++;
  };

  const headerRow = () => {
    ['Columna', 'Obligatorio', 'Tipo', 'Valores permitidos / Instrucciones'].forEach((h, c) => {
      setCell(ws, r, c, h, cellStyle(true, C.azulOscuro, C.blanco, false, 'center'));
    });
    r++;
  };

  const infoRow = (col: TemplateCol) => {
    const isMulti = col.kind === 'multiple';
    const kindLabel: Record<ColKind, string> = {
      texto:    'Texto libre',
      fecha:    'Fecha',
      unico:    'Selección única',
      multiple: 'SELECCIÓN MÚLTIPLE',
    };
    const bg = isMulti ? C.amarillo : (r % 2 === 0 ? C.blanco : C.grisClaro);
    const fg = isMulti ? C.amarilloOscuro : C.grisOscuro;

    setCell(ws, r, 0, col.header,        cellStyle(true,  bg, fg, true));
    setCell(ws, r, 1, col.req ? '★ Sí' : 'No',
      cellStyle(true, col.req ? C.naranjaClaro : bg, col.req ? C.naranjaOscuro : fg, false, 'center'));
    setCell(ws, r, 2, kindLabel[col.kind], cellStyle(isMulti, bg, fg, false, 'center'));
    setCell(ws, r, 3, col.allowed,        cellStyle(false, bg, fg, true));
    r++;
  };

  const blank = () => { r++; };

  const note = (text: string, bg = C.grisClaro, fg = C.grisOscuro) => {
    setCell(ws, r, 0, text, cellStyle(false, bg, fg, true));
    setCell(ws, r, 1, '', cellStyle(false, bg, fg, true));
    setCell(ws, r, 2, '', cellStyle(false, bg, fg, true));
    setCell(ws, r, 3, '', cellStyle(false, bg, fg, true));
    r++;
  };

  // ── Título principal ────────────────────────────────────────────────────────
  title(`INSTRUCCIONES — Plantilla de Diagnóstico para Espacios Confinados (${TEMPLATE_COLS.length} columnas)`);
  blank();

  // ── Pasos generales ─────────────────────────────────────────────────────────
  note('CÓMO USAR ESTA PLANTILLA', C.azulOscuro, C.blanco);
  [
    `1.  Esta plantilla tiene ${TEMPLATE_COLS.length} columnas que cubren todos los campos del formulario.`,
    '2.  Pase a la hoja "Datos" e ingrese sus registros a partir de la FILA 4 (filas 1-3: encabezado, descripción y ejemplo).',
    '3.  Las columnas marcadas con ★ son obligatorias. Sin ellas el registro NO se importará.',
    '4.  Varias columnas tienen validación de datos (dropdown ▼) — úsela para evitar errores de escritura.',
    '5.  Respete exactamente los valores de las listas. Ver hoja "Listas de valores" para referencia completa.',
    '6.  No elimine ni renombre las columnas del encabezado.',
    '7.  Las firmas (Firma SST, Firma Responsable) NO se pueden importar — se capturan en la aplicación.',
    '8.  Guarde el archivo en formato .xlsx antes de subirlo.',
  ].forEach(t => note(t));
  blank();

  // ── Selección múltiple ──────────────────────────────────────────────────────
  note('⚠  COLUMNAS DE SELECCIÓN MÚLTIPLE — LEA CON ATENCIÓN', C.amarillo, C.amarilloOscuro);
  [
    'Algunas columnas aceptan más de un valor al mismo tiempo. Para indicar varios valores:',
    '   → Separe cada valor con una COMA  ( , )  dentro de la misma celda.',
    '   → No use punto y coma ni barras verticales.',
    '   → Ejemplo correcto:   Se utiliza,Buen estado,Certificado',
    '   → Ejemplo incorrecto: Se utiliza; Buen estado / Certificado',
    '',
    'Las columnas de SELECCIÓN MÚLTIPLE en esta plantilla son:',
    '   • Desarrollada Por',
    '   • Actividades Alto Riesgo',
    '   • Facilidades del Espacio',
    '   • Medidas de Prevención',
    '   • Escalera Fosa Vertical / Escalera Gato / Escalera Extensión',
    '   • Otro Trabajo en Alturas / Arnés Cuerpo Completo / Trípode Equipo Rescate',
    '   • Auto Contenido / Equipo Comunicación / Sistema Ventilación Mecánica',
    '   • Sistema Protección Caídas / Equipo Primeros Auxilios',
    '   • Otros Modelos Protección / EPP Utilizados',
  ].forEach(t => note(t, C.amarillo, C.amarilloOscuro));
  blank();

  // ── Tipos de dato ───────────────────────────────────────────────────────────
  note('TIPOS DE DATO', C.azulOscuro, C.blanco);
  [
    'Texto libre     →  Escriba el valor directamente. No hay lista de opciones predefinidas.',
    'Fecha           →  Use el formato dd/mm/yyyy  (ej: 15/06/2024). También se acepta yyyy-mm-dd.',
    'Selección única →  Solo se acepta UN valor exacto de la lista. Revise la hoja "Listas de valores".',
    'SELECCIÓN MÚLTIPLE →  Se aceptan varios valores separados por coma. Ver sección anterior.',
  ].forEach(t => note(t));
  blank();

  // ── Tabla detallada por columna ─────────────────────────────────────────────
  note('DETALLE POR COLUMNA', C.azulOscuro, C.blanco);
  blank();
  headerRow();
  TEMPLATE_COLS.forEach(infoRow);
  blank();

  // ── Nota de errores ─────────────────────────────────────────────────────────
  note('ERRORES COMUNES', C.naranjaClaro, C.naranjaOscuro);
  [
    '✗  Empresa o Planta vacíos            →  El registro será rechazado.',
    '✗  Fecha en formato incorrecto        →  Use dd/mm/yyyy. Fechas como "Jun 2024" no son válidas.',
    '✗  Valor de selección con tilde/sin tilde diferente a la lista  →  Use exactamente el texto de la lista.',
    '✗  Separador incorrecto en multicampo →  Use coma ( , ) no punto y coma ( ; ).',
    '✗  Espacios extra alrededor del valor →  "  Si  " es diferente a "Si". Evite espacios iniciales o finales.',
  ].forEach(t => note(t, C.naranjaClaro, C.naranjaOscuro));

  ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r, c: 3 } });
  ws['!cols'] = [{ wch: 32 }, { wch: 14 }, { wch: 22 }, { wch: 70 }];
  ws['!merges'] = [];

  return ws;
}

// ── Build "Listas de valores" sheet ────────────────────────────────────────────
// IMPORTANT: Column order matches the data validation references in buildDatosSheet.
// A=Si/No  B=TipoEjec  C=TipoEspacio  D=Grado  E=Altura  F=DesarrolladaPor[M]
// G=ActAltRiesgo[M]  H=Facilidades[M]  I=MedidasPrev[M]  J=EquiposBase[M]
// K=EPP[M]  L=ActividadAnalizada  M=DetalleActividad

function buildListasSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};

  const lists: Array<{ title: string; multi: boolean; values: string[] }> = [
    // A: Si/No (used by 6 fields with inline validation, also here for reference)
    { title: 'Si / No\n(campos evaluación)', multi: false, values: ['Si', 'No'] },
    // B: Tipo de Ejecución
    { title: 'Tipo de Ejecución', multi: false, values: TIPO_EJECUCION_OPCIONES },
    // C: Tipo Espacio Confinado
    { title: 'Tipo Espacio Confinado', multi: false, values: ['Tipo 1', 'Tipo 2'] },
    // D: Grado Peligrosidad
    { title: 'Grado Peligrosidad', multi: false, values: ['Grado A', 'Grado B', 'Grado C'] },
    // E: Altura Promedio
    { title: 'Altura Promedio', multi: false, values: ALTURA_OPCIONES },
    // F: Desarrollada Por
    { title: 'Desarrollada Por', multi: true, values: DESARROLLADO_POR_OPCIONES },
    // G: Actividades Alto Riesgo
    { title: 'Actividades Alto Riesgo', multi: true, values: ACTIVIDADES_ALTO_RIESGO },
    // H: Facilidades del Espacio
    { title: 'Facilidades del Espacio', multi: true, values: FACILIDADES_OPCIONES },
    // I: Medidas de Prevención
    { title: 'Medidas de Prevención', multi: true, values: MEDIDAS_PREVENCION_OPCIONES },
    // J: Opciones base para equipos
    { title: 'Equipos — opciones base', multi: true, values: EQUIPOS_BASE_OPTS },
    // K: EPP / Otros Modelos
    { title: 'EPP / Otros Modelos', multi: true, values: EPP_OPCIONES },
    // L: Actividad Analizada (44 values — for data validation reference E4:E2000)
    { title: 'Actividad Analizada', multi: false, values: ACTIVIDADES_LISTA },
    // M: Detalle de la Actividad (25 values — for data validation reference F4:F2000)
    { title: 'Detalle de la Actividad', multi: false, values: DETALLE_ACTIVIDAD_LISTA },
  ];

  const totalCols = lists.length;

  // Row 0 — main title spanning all columns
  setCell(ws, 0, 0,
    `LISTAS DE VALORES — úselos exactamente como aparecen aquí (respete tildes y mayúsculas)   |   ${totalCols} listas disponibles`,
    cellStyle(true, C.violeta, C.blanco, true));
  for (let c = 1; c < totalCols; c++) {
    setCell(ws, 0, c, '', cellStyle(true, C.violeta, C.blanco, false));
  }

  // Row 1 — column headers
  lists.forEach((list, c) => {
    setCell(ws, 1, c,
      list.title + (list.multi ? '\n[SELECCIÓN MÚLTIPLE]' : ''),
      cellStyle(true, list.multi ? C.amarillo : C.azulOscuro,
        list.multi ? C.amarilloOscuro : C.blanco, true, 'center'));
  });

  // Rows 2+ — values
  const maxLen = Math.max(...lists.map(l => l.values.length));
  for (let row = 0; row < maxLen; row++) {
    lists.forEach((list, c) => {
      const val = list.values[row] ?? '';
      setCell(ws, row + 2, c, val,
        cellStyle(false, row % 2 === 0 ? C.blanco : C.grisClaro, C.grisOscuro, true));
    });
  }

  ws['!ref']  = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: maxLen + 1, c: totalCols - 1 } });
  ws['!cols'] = lists.map(l => ({ wch: l.values.reduce((m, v) => Math.max(m, v.length), 20) + 4 }));
  ws['!rows'] = [{ hpt: 28 }, { hpt: 50 }];

  return ws;
}

// ── Main download function ─────────────────────────────────────────────────────

function downloadTemplate() {
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, buildDatosSheet(),        'Datos');
  XLSX.utils.book_append_sheet(wb, buildInstruccionesSheet(), 'Instrucciones');
  XLSX.utils.book_append_sheet(wb, buildListasSheet(),        'Listas de valores');

  XLSX.writeFile(wb, 'plantilla_diagnostico_confinados.xlsx');
}

// ── Main component ─────────────────────────────────────────────────────────────

type Stage = 'idle' | 'parsing' | 'preview' | 'importing' | 'done';

export default function ImportarDiagnosticoPage() {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const fileRef = useRef<HTMLInputElement>(null);
  const [stage, setStage]   = useState<Stage>('idle');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [rawRows, setRawRows]       = useState<RawImportRow[]>([]);
  const [result, setResult]         = useState<ExecuteResult | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // ── Parse file ──────────────────────────────────────────────────────────────

  const parseFile = useCallback(async (file: File) => {
    setStage('parsing');
    setFileName(file.name);
    try {
      const buf = await file.arrayBuffer();
      const wb  = XLSX.read(buf, { type: 'array', cellDates: false });
      const ws  = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<Record<string, string>>(ws, { defval: '' });

      const mapped = raw.map(r => mapRowColumns(r));
      setRawRows(mapped);

      const val = await validateImportRows(mapped);
      setValidation(val);
      setStage('preview');
    } catch (err: any) {
      toast({ title: 'Error al leer el archivo', description: err?.message, variant: 'destructive' });
      setStage('idle');
    }
  }, [toast]);

  const handleFiles = useCallback((files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(ext ?? '')) {
      toast({ title: 'Formato no válido', description: 'Use .xlsx, .xls o .csv', variant: 'destructive' });
      return;
    }
    parseFile(file);
  }, [parseFile, toast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  // ── Execute import ──────────────────────────────────────────────────────────

  const handleImport = async () => {
    if (!user || !validation) return;
    const validRows = rawRows.filter((_, i) => validation.rows[i]?.valid);
    if (validRows.length === 0) return;

    setStage('importing');
    try {
      const res = await executeImport(
        validRows,
        user.uid,
        user.displayName || user.email || 'Desconocido',
      );
      setResult(res);
      setStage('done');
    } catch (err: any) {
      toast({ title: 'Error en la importación', description: err?.message, variant: 'destructive' });
      setStage('preview');
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  const displayRows = validation
    ? (showErrors ? validation.rows.filter(r => !r.valid) : validation.rows)
    : [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <button
            onClick={() => router.push('/confinados/diagnostico')}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1"
          >
            <ArrowLeft className="h-3 w-3" /> Diagnóstico
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-violet-600" />
            Importar Diagnósticos
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Cargue masiva usando una plantilla Excel (.xlsx).
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={downloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Descargar plantilla
        </Button>
      </div>

      {/* ── Stage: idle / parsing ─────────────────────────────────────────── */}
      {(stage === 'idle' || stage === 'parsing') && (
        <Card>
          <CardContent className="p-6">
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-3',
                'cursor-pointer transition-colors text-center',
                isDragging ? 'border-violet-500 bg-violet-50' : 'border-muted hover:border-violet-400 hover:bg-muted/30',
              )}
            >
              {stage === 'parsing' ? (
                <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
              ) : (
                <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
              )}
              <div>
                <p className="font-semibold text-sm">
                  {stage === 'parsing' ? 'Procesando archivo…' : 'Arrastra tu archivo aquí o haz clic para seleccionar'}
                </p>
                {stage === 'idle' && (
                  <p className="text-xs text-muted-foreground mt-1">Formatos aceptados: .xlsx, .xls, .csv</p>
                )}
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />

            {/* Instructions */}
            <div className="mt-4 rounded-lg bg-muted/40 border p-4 text-xs text-muted-foreground space-y-1.5">
              <p className="font-semibold text-foreground text-sm">Instrucciones</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Descargue la plantilla usando el botón superior derecho.</li>
                <li>Rellene las filas a partir de la fila 3 (las primeras 2 son encabezado y descripción).</li>
                <li>Los campos marcados con ★ son obligatorios.</li>
                <li>Los campos multi-valor (Medidas, Desarrollada Por, etc.) use comas para separar.</li>
                <li>Para fechas use el formato dd/mm/yyyy.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Stage: preview ────────────────────────────────────────────────── */}
      {stage === 'preview' && validation && (
        <>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <FileSpreadsheet className="h-4 w-4 text-violet-600" />
              <span className="font-medium truncate max-w-[200px]">{fileName}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {validation.validCount} válidas
              </Badge>
              {validation.errorCount > 0 && (
                <Badge className="bg-red-100 text-red-700">
                  <XCircle className="mr-1 h-3 w-3" />
                  {validation.errorCount} con errores
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={() => { setStage('idle'); setValidation(null); }}>
                <RefreshCw className="mr-2 h-3 w-3" /> Cambiar archivo
              </Button>
            </div>
          </div>

          {validation.errorCount > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <button
                className={cn('text-muted-foreground hover:text-foreground underline', showErrors && 'text-foreground font-semibold')}
                onClick={() => setShowErrors(v => !v)}
              >
                {showErrors ? 'Mostrar todas' : `Filtrar solo errores (${validation.errorCount})`}
              </button>
            </div>
          )}

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Planta</TableHead>
                    <TableHead>Actividad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayRows.map(row => (
                    <React.Fragment key={row.rowIndex}>
                      <TableRow
                        className={cn(
                          !row.valid && 'bg-red-50 hover:bg-red-50',
                          row.errors.length > 0 && 'cursor-pointer',
                        )}
                        onClick={() => {
                          if (row.errors.length > 0) {
                            setExpandedRows(prev => {
                              const n = new Set(prev);
                              n.has(row.rowIndex) ? n.delete(row.rowIndex) : n.add(row.rowIndex);
                              return n;
                            });
                          }
                        }}
                      >
                        <TableCell className="text-xs text-muted-foreground">{row.rowIndex}</TableCell>
                        <TableCell className="text-sm">{row.empresa || '—'}</TableCell>
                        <TableCell className="text-sm">{row.planta || '—'}</TableCell>
                        <TableCell className="text-sm max-w-[200px]">
                          <span className="truncate block">{row.actividadAnalizada || '—'}</span>
                        </TableCell>
                        <TableCell className="text-sm">{row.fecha || '—'}</TableCell>
                        <TableCell>
                          {row.valid ? (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> OK
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 text-xs flex items-center gap-1">
                              <XCircle className="h-3 w-3" />
                              {row.errors.length} error{row.errors.length > 1 ? 'es' : ''}
                              {expandedRows.has(row.rowIndex)
                                ? <ChevronDown className="h-3 w-3" />
                                : <ChevronRight className="h-3 w-3" />}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                      {expandedRows.has(row.rowIndex) && row.errors.length > 0 && (
                        <TableRow className="bg-red-50">
                          <TableCell colSpan={6} className="py-2 px-4">
                            <ul className="text-xs text-red-700 space-y-0.5">
                              {row.errors.map((e, i) => <li key={i}>• {e}</li>)}
                            </ul>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => { setStage('idle'); setValidation(null); }}>
              Cancelar
            </Button>
            <Button
              onClick={handleImport}
              disabled={validation.validCount === 0}
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Importar {validation.validCount} registro{validation.validCount !== 1 ? 's' : ''}
            </Button>
          </div>
        </>
      )}

      {/* ── Stage: importing ─────────────────────────────────────────────── */}
      {stage === 'importing' && (
        <Card>
          <CardContent className="p-12 flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
            <p className="font-semibold">Importando registros…</p>
            <p className="text-sm text-muted-foreground">Por favor no cierre esta ventana.</p>
          </CardContent>
        </Card>
      )}

      {/* ── Stage: done ──────────────────────────────────────────────────── */}
      {stage === 'done' && result && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center gap-4 text-center">
            {result.failed === 0 ? (
              <CheckCircle2 className="h-14 w-14 text-green-500" />
            ) : (
              <AlertTriangle className="h-14 w-14 text-amber-500" />
            )}
            <div>
              <p className="font-semibold text-lg">
                {result.failed === 0 ? '¡Importación exitosa!' : 'Importación completada con errores'}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                {result.imported} registro{result.imported !== 1 ? 's' : ''} importado{result.imported !== 1 ? 's' : ''}
                {result.failed > 0 && ` · ${result.failed} fallido${result.failed !== 1 ? 's' : ''}`}.
              </p>
            </div>
            {result.errors.length > 0 && (
              <div className="rounded-md bg-red-50 border border-red-200 p-3 text-xs text-red-700 text-left w-full max-w-lg">
                {result.errors.slice(0, 5).map((e, i) => <p key={i}>• {e}</p>)}
                {result.errors.length > 5 && <p className="mt-1 text-muted-foreground">…y {result.errors.length - 5} más</p>}
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setStage('idle'); setValidation(null); setResult(null); }}>
                Importar más
              </Button>
              <Button onClick={() => router.push('/confinados/diagnostico')}>
                Ver diagnósticos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
