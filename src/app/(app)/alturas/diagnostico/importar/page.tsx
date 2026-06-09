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
  ACTIVIDADES_LISTA_ALTURAS,
  DETALLE_ACTIVIDAD_LISTA_ALTURAS,
  ALTURA_PROMEDIO_OPCIONES,
  DESARROLLADO_POR_OPCIONES_ALTURAS,
  FRECUENCIA_OPCIONES,
  ACTIVIDADES_ALTO_RIESGO_ALTURAS,
  MEDIDAS_PREVENCION_OPCIONES_ALTURAS,
  EPP_OPCIONES_ALTURAS,
} from '@/types/alturas';

// ── Column mapping (client-side only) ─────────────────────────────────────────

const ESCALERAS_OPTS = ['Se utiliza', 'Inspección y mantenimiento', 'Certificación', 'Buen estado', 'No se utiliza', 'No aplica'];
const ARNESES_OPTS   = ['Se utiliza', 'Inspección anual vigente', 'Hoja de vida', 'Buen estado', 'No se utiliza', 'No aplica'];
const EMERGENCIAS_OPTS = ['Se utiliza', 'Buen estado', 'Certificado', 'No se utiliza', 'No aplica'];

const COLUMN_MAP: Record<string, string> = {
  // Datos Generales
  'Empresa':                            'empresa',
  'Planta':                             'planta',
  'Proceso':                            'proceso',
  'Fecha':                              'fecha',
  // Actividad
  'Actividad Analizada':                'actividadAnalizada',
  'Detalle de la Actividad':            'detalleActividad',
  'Altura Promedio':                    'alturaPromedio',
  'Desarrollada Por':                   'desarrolladaPor',
  'Frecuencia de Ejecucion':            'frecuenciaEjecucion',
  'Frecuencia de Ejecución':            'frecuenciaEjecucion',
  'Tiene Alto Riesgo Adicional':        'tieneAltoRiesgoAdicional',
  'Actividades Alto Riesgo':            'actividadesAltoRiesgo',
  'Evaluada en IPER':                   'evaluadaEnIPER',
  'Cuenta con Procedimiento':           'cuentaConProcedimiento',
  'Medidas de Prevencion':              'medidasPrevencion',
  'Medidas de Prevención':             'medidasPrevencion',
  // Escaleras y andamios
  'Escalera Fija Vertical':             'escaleraFijaVertical',
  'Escalera Llana':                     'escaleraLlana',
  'Escalera Extension':                 'escaleraExtension',
  'Escalera Extensión':                'escaleraExtension',
  'Escalera Portatil':                  'escaleraPortatil',
  'Escalera Portátil':                 'escaleraPortatil',
  'Escalera Tipo Avion':                'escaleraTipoAvion',
  'Escalera Tipo Avión':               'escaleraTipoAvion',
  'Andamio Multidireccional':           'andamioMultidireccional',
  'Elevador de Personas':               'elevadorPersonas',
  'Elevador Personas':                  'elevadorPersonas',
  // Arneses y sistemas
  'Arnes Cuerpo Completo':              'arnesCuerpoCompleto',
  'Arnés Cuerpo Completo':             'arnesCuerpoCompleto',
  'Estinga Posicionamiento':            'estingaPosicionamiento',
  'Estinga con Absorbedor':             'estingaConAbsorbedor',
  'Anclajes Fijos':                     'anclajesFijos',
  'Anclaje Portatil':                   'anclajePortatil',
  'Anclaje Portátil':                  'anclajePortatil',
  'LVH Fija':                           'lvhFija',
  'LVH Portatil':                       'lvhPortatil',
  'LVH Portátil':                      'lvhPortatil',
  'LVV Fija':                           'lvvFija',
  'LVV Portatil':                       'lvvPortatil',
  'LVV Portátil':                      'lvvPortatil',
  'Mosquetones':                        'mosquetones',
  'LV Autorretractil':                  'lvAutorretractil',
  'LV Autorretráctil':                 'lvAutorretractil',
  // Emergencias y EPP
  'Equipo de Rescate':                  'equipoRescate',
  'Equipo Rescate':                     'equipoRescate',
  'Equipo Primeros Auxilios':           'equipoPrimerosAuxilios',
  'EPP Utilizados':                     'eppUtilizados',
  // Cierre
  'Se Han Presentado Cargos':           'seHanPresentadoCargos',
  'Cliente Acepta Info':                'clienteAceptaInfo',
  'Nombre SST':                         'nombreSST',
  'Nombre Responsable':                 'nombreResponsable',
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
  RefreshCw, ArrowUpToLine,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Template column definition ─────────────────────────────────────────────────

type ColKind = 'texto' | 'fecha' | 'unico' | 'multiple';

interface TemplateCol {
  header:  string;
  req:     boolean;
  kind:    ColKind;
  example: string;
  allowed: string;
}

const TEMPLATE_COLS: TemplateCol[] = [
  // Datos Generales
  { header: 'Empresa', req: true,  kind: 'texto',    example: 'Italcol S.A.',           allowed: 'Texto libre. Nombre exacto de la empresa.' },
  { header: 'Planta',  req: true,  kind: 'texto',    example: 'Planta Mosquera',        allowed: 'Texto libre. Nombre exacto de la planta.' },
  { header: 'Proceso', req: false, kind: 'texto',    example: 'Producción',             allowed: 'Texto libre. Nombre del proceso o área.' },
  { header: 'Fecha',   req: true,  kind: 'fecha',    example: '15/06/2024',             allowed: 'Formato dd/mm/yyyy. También se acepta yyyy-mm-dd.' },
  // Información de la actividad
  { header: 'Actividad Analizada',        req: false, kind: 'unico',    example: 'Mantenimiento de techos y cubiertas.', allowed: 'Ver hoja "Listas de valores" → columna Actividad Analizada.' },
  { header: 'Detalle de la Actividad',    req: false, kind: 'unico',    example: 'Instalación y mantenimiento de techos en lámina.', allowed: 'Ver hoja "Listas de valores" → columna Detalle de la Actividad.' },
  { header: 'Altura Promedio',            req: false, kind: 'unico',    example: '3.01-6.00m', allowed: '1.80m-2.00m | 2.01-3.00m | 3.01-6.00m | 6.01-9.00m | >9.01m' },
  { header: 'Desarrollada Por',           req: false, kind: 'multiple', example: 'Personal de la Empresa,Contratistas', allowed: 'Ver hoja "Listas de valores" → columna Desarrollada Por.' },
  { header: 'Frecuencia de Ejecución',    req: false, kind: 'unico',    example: 'Rutinaria', allowed: 'Rutinaria | No Rutinaria | Periódica | Esporádica' },
  { header: 'Tiene Alto Riesgo Adicional',req: false, kind: 'unico',    example: 'No',        allowed: 'Si | No' },
  { header: 'Actividades Alto Riesgo',    req: false, kind: 'multiple', example: 'Trabajo en caliente,Trabajo eléctrico', allowed: 'Ver hoja "Listas de valores" → columna Actividades Alto Riesgo.' },
  { header: 'Evaluada en IPER',           req: false, kind: 'unico',    example: 'Si',        allowed: 'Si | No' },
  { header: 'Cuenta con Procedimiento',   req: false, kind: 'unico',    example: 'Si',        allowed: 'Si | No' },
  { header: 'Medidas de Prevención',      req: false, kind: 'multiple', example: 'Permiso de Trabajo,Demarcación de áreas', allowed: 'Ver hoja "Listas de valores" → columna Medidas de Prevención.' },
  // Escaleras y andamios
  { header: 'Escalera Fija Vertical',     req: false, kind: 'multiple', example: 'Se utiliza,Buen estado', allowed: ESCALERAS_OPTS.join(' | ') },
  { header: 'Escalera Llana',             req: false, kind: 'multiple', example: 'No aplica',              allowed: ESCALERAS_OPTS.join(' | ') },
  { header: 'Escalera Extensión',         req: false, kind: 'multiple', example: 'Se utiliza,Certificación', allowed: ESCALERAS_OPTS.join(' | ') },
  { header: 'Escalera Portátil',          req: false, kind: 'multiple', example: 'No se utiliza',          allowed: ESCALERAS_OPTS.join(' | ') },
  { header: 'Escalera Tipo Avión',        req: false, kind: 'multiple', example: 'No aplica',              allowed: ESCALERAS_OPTS.join(' | ') },
  { header: 'Andamio Multidireccional',   req: false, kind: 'multiple', example: 'Se utiliza,Inspección y mantenimiento', allowed: ESCALERAS_OPTS.join(' | ') },
  { header: 'Elevador de Personas',       req: false, kind: 'multiple', example: 'No aplica',              allowed: ESCALERAS_OPTS.join(' | ') },
  // Arneses y sistemas
  { header: 'Arnés Cuerpo Completo',      req: false, kind: 'multiple', example: 'Se utiliza,Inspección anual vigente,Hoja de vida', allowed: ARNESES_OPTS.join(' | ') },
  { header: 'Estinga Posicionamiento',    req: false, kind: 'multiple', example: 'Se utiliza,Buen estado', allowed: ARNESES_OPTS.join(' | ') },
  { header: 'Estinga con Absorbedor',     req: false, kind: 'multiple', example: 'Se utiliza,Inspección anual vigente', allowed: ARNESES_OPTS.join(' | ') },
  { header: 'Anclajes Fijos',             req: false, kind: 'multiple', example: 'Se utiliza,Buen estado', allowed: ARNESES_OPTS.join(' | ') },
  { header: 'Anclaje Portátil',           req: false, kind: 'multiple', example: 'No aplica',              allowed: ARNESES_OPTS.join(' | ') },
  { header: 'LVH Fija',                   req: false, kind: 'multiple', example: 'No aplica',              allowed: ARNESES_OPTS.join(' | ') },
  { header: 'LVH Portátil',               req: false, kind: 'multiple', example: 'Se utiliza,Buen estado', allowed: ARNESES_OPTS.join(' | ') },
  { header: 'LVV Fija',                   req: false, kind: 'multiple', example: 'No aplica',              allowed: ARNESES_OPTS.join(' | ') },
  { header: 'LVV Portátil',               req: false, kind: 'multiple', example: 'No aplica',              allowed: ARNESES_OPTS.join(' | ') },
  { header: 'Mosquetones',                req: false, kind: 'multiple', example: 'Se utiliza,Buen estado', allowed: ARNESES_OPTS.join(' | ') },
  { header: 'LV Autorretráctil',          req: false, kind: 'multiple', example: 'Se utiliza,Inspección anual vigente', allowed: ARNESES_OPTS.join(' | ') },
  // Emergencias y EPP
  { header: 'Equipo de Rescate',          req: false, kind: 'multiple', example: 'Se utiliza,Buen estado,Certificado', allowed: EMERGENCIAS_OPTS.join(' | ') },
  { header: 'Equipo Primeros Auxilios',   req: false, kind: 'multiple', example: 'Se utiliza,Buen estado', allowed: EMERGENCIAS_OPTS.join(' | ') },
  { header: 'EPP Utilizados',             req: false, kind: 'multiple', example: 'Casco de seguridad,Arnés cuerpo completo,Guantes', allowed: 'Ver hoja "Listas de valores" → columna EPP Utilizados.' },
  // Cierre
  { header: 'Se Han Presentado Cargos',   req: false, kind: 'unico',    example: 'No', allowed: 'Si | No' },
  { header: 'Cliente Acepta Info',        req: false, kind: 'unico',    example: 'Si', allowed: 'Si | No' },
  { header: 'Nombre SST',                 req: false, kind: 'texto',    example: 'Carlos Ramírez', allowed: 'Texto libre. Nombre completo del asesor SST.' },
  { header: 'Nombre Responsable',         req: false, kind: 'texto',    example: 'Jefe de Planta', allowed: 'Texto libre. Nombre de la persona responsable.' },
];

// ── Excel builder helpers ──────────────────────────────────────────────────────

const C = {
  sky:        '0EA5E9',
  skyClaro:   'E0F2FE',
  azulOscuro: '1E3A5F',
  azulClaro:  'DBEAFE',
  verdeOscuro:'15803D',
  verdeClaro: 'DCFCE7',
  naranjaOscuro: 'C2410C',
  naranjaClaro:  'FFEDD5',
  grisOscuro: '374151',
  grisClaro:  'F3F4F6',
  blanco:     'FFFFFF',
  amarillo:   'FEF9C3',
  amarilloOscuro: '92400E',
};

function cellStyle(bold = false, bgRgb = C.blanco, fgRgb = C.grisOscuro, wrapText = true, hAlign: 'left' | 'center' | 'right' = 'left') {
  return {
    font:      { bold, color: { rgb: fgRgb } },
    fill:      { fgColor: { rgb: bgRgb } },
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
  ws[addr]   = { v: value, t: typeof value === 'number' ? 'n' : 's', s: style };
}

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

function buildDatosSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const headers  = TEMPLATE_COLS.map(c => c.header);
  const lastCol  = colLetter(headers.length - 1);

  // Group color: 0-3 sky, 4-13 blue, 14-20 indigo, 21-32 violet, 33-37 green
  const groupBg = (i: number) => {
    if (i <= 3)  return '0369A1';
    if (i <= 13) return '1D4ED8';
    if (i <= 20) return '4338CA';
    if (i <= 32) return '7C3AED';
    return '15803D';
  };

  headers.forEach((h, ci) => {
    setCell(ws, 0, ci, h, cellStyle(true, groupBg(ci), C.blanco, true, 'center'));
  });

  TEMPLATE_COLS.forEach((col, ci) => {
    const note = (col.req ? '★ REQUERIDO' : 'Opcional') +
      (col.kind === 'multiple' ? '  |  SELECCIÓN MÚLTIPLE — separar con coma ( , )' : '') +
      '\n' + col.allowed;
    const isMulti = col.kind === 'multiple';
    setCell(ws, 1, ci, note,
      cellStyle(false, isMulti ? C.amarillo : C.grisClaro, isMulti ? C.amarilloOscuro : C.grisOscuro, true));
    setCell(ws, 2, ci, col.example, cellStyle(false, C.verdeClaro, C.verdeOscuro, true));
  });

  ws['!ref']       = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 2, c: headers.length - 1 } });
  ws['!cols']      = headers.map(() => ({ wch: 28 }));
  ws['!rows']      = [{ hpt: 24 }, { hpt: 56 }, { hpt: 22 }];
  ws['!autofilter'] = { ref: `A1:${lastCol}1` };
  ws['!views']     = [{ state: 'frozen', ySplit: 3, topLeftCell: 'A4' }];

  const LV = "'Listas de valores'";
  type DV = { sqref: string; formula1: string };
  const dvList: DV[] = [
    { sqref: 'E4:E2000', formula1: `${LV}!$L$3:$L$36` },  // Actividad (34 items)
    { sqref: 'F4:F2000', formula1: `${LV}!$M$3:$M$27` },  // Detalle (25 items)
    { sqref: 'G4:G2000', formula1: `${LV}!$E$3:$E$7` },   // Altura (5 items)
    { sqref: 'I4:I2000', formula1: `${LV}!$B$3:$B$6` },   // Frecuencia (4 items)
    { sqref: 'J4:J2000', formula1: '"Si,No"' },
    { sqref: 'L4:L2000', formula1: '"Si,No"' },            // evaluadaEnIPER
    { sqref: 'M4:M2000', formula1: '"Si,No"' },            // cuentaConProcedimiento
    { sqref: 'AH4:AH2000', formula1: '"Si,No"' },          // seHanPresentadoCargos
    { sqref: 'AI4:AI2000', formula1: '"Si,No"' },          // clienteAceptaInfo
  ];
  (ws as any)['!dataValidations'] = dvList.map(dv => ({
    type: 'list', sqref: dv.sqref, formula1: dv.formula1,
    allowBlank: true, showDropDown: false, showInputMessage: false,
    showErrorMessage: true, errorTitle: 'Valor no válido',
    error: 'Seleccione un valor de la lista desplegable.',
  }));

  return ws;
}

function buildInstruccionesSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  let r = 0;

  const title = (text: string) => {
    [0, 1, 2, 3].forEach(c => setCell(ws, r, c, c === 0 ? text : '', cellStyle(true, C.sky, C.blanco, false)));
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
    const kindLabel: Record<ColKind, string> = { texto: 'Texto libre', fecha: 'Fecha', unico: 'Selección única', multiple: 'SELECCIÓN MÚLTIPLE' };
    const bg = isMulti ? C.amarillo : (r % 2 === 0 ? C.blanco : C.grisClaro);
    const fg = isMulti ? C.amarilloOscuro : C.grisOscuro;
    setCell(ws, r, 0, col.header, cellStyle(true, bg, fg, true));
    setCell(ws, r, 1, col.req ? '★ Sí' : 'No', cellStyle(true, col.req ? C.naranjaClaro : bg, col.req ? C.naranjaOscuro : fg, false, 'center'));
    setCell(ws, r, 2, kindLabel[col.kind], cellStyle(isMulti, bg, fg, false, 'center'));
    setCell(ws, r, 3, col.allowed, cellStyle(false, bg, fg, true));
    r++;
  };
  const note = (text: string, bg = C.grisClaro, fg = C.grisOscuro) => {
    [0, 1, 2, 3].forEach(c => setCell(ws, r, c, c === 0 ? text : '', cellStyle(false, bg, fg, true)));
    r++;
  };
  const blank = () => r++;

  title(`INSTRUCCIONES — Plantilla de Diagnóstico para Trabajo en Alturas (${TEMPLATE_COLS.length} columnas)`);
  blank();
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
  note('⚠  COLUMNAS DE SELECCIÓN MÚLTIPLE — LEA CON ATENCIÓN', C.amarillo, C.amarilloOscuro);
  [
    'Algunas columnas aceptan más de un valor. Para indicar varios valores:',
    '   → Separe cada valor con una COMA  ( , )  dentro de la misma celda.',
    '   → No use punto y coma ni barras verticales.',
    '   → Ejemplo correcto:   Se utiliza,Buen estado,Certificación',
    '   → Ejemplo incorrecto: Se utiliza; Buen estado / Certificación',
    '',
    'Las columnas de SELECCIÓN MÚLTIPLE en esta plantilla son:',
    '   • Desarrollada Por  •  Actividades Alto Riesgo  •  Medidas de Prevención',
    '   • Todas las columnas de Escaleras / Andamios',
    '   • Todas las columnas de Arneses y Sistemas',
    '   • Equipo de Rescate  •  Equipo Primeros Auxilios  •  EPP Utilizados',
  ].forEach(t => note(t, C.amarillo, C.amarilloOscuro));
  blank();
  note('TIPOS DE DATO', C.azulOscuro, C.blanco);
  [
    'Texto libre     →  Escriba el valor directamente.',
    'Fecha           →  Use el formato dd/mm/yyyy  (ej: 15/06/2024). También se acepta yyyy-mm-dd.',
    'Selección única →  Solo se acepta UN valor exacto de la lista. Revise la hoja "Listas de valores".',
    'SELECCIÓN MÚLTIPLE →  Se aceptan varios valores separados por coma. Ver sección anterior.',
  ].forEach(t => note(t));
  blank();
  note('DETALLE POR COLUMNA', C.azulOscuro, C.blanco);
  blank();
  headerRow();
  TEMPLATE_COLS.forEach(infoRow);
  blank();
  note('ERRORES COMUNES', C.naranjaClaro, C.naranjaOscuro);
  [
    '✗  Empresa o Planta vacíos            →  El registro será rechazado.',
    '✗  Fecha en formato incorrecto        →  Use dd/mm/yyyy.',
    '✗  Valor de selección con tilde/sin tilde diferente a la lista  →  Use exactamente el texto de la lista.',
    '✗  Separador incorrecto en multicampo →  Use coma ( , ) no punto y coma ( ; ).',
    '✗  Espacios extra alrededor del valor →  "  Si  " es diferente a "Si".',
  ].forEach(t => note(t, C.naranjaClaro, C.naranjaOscuro));

  ws['!ref']  = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r, c: 3 } });
  ws['!cols'] = [{ wch: 32 }, { wch: 14 }, { wch: 22 }, { wch: 70 }];
  return ws;
}

function buildListasSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const lists: Array<{ title: string; multi: boolean; values: string[] }> = [
    { title: 'Si / No', multi: false, values: ['Si', 'No'] },
    { title: 'Frecuencia de Ejecución', multi: false, values: ['Rutinaria', 'No Rutinaria', 'Periódica', 'Esporádica'] },
    { title: 'Tipo Espacio', multi: false, values: ['Tipo 1', 'Tipo 2'] },
    { title: 'Nivel Riesgo', multi: false, values: ['Alto', 'Medio', 'Bajo'] },
    { title: 'Altura Promedio', multi: false, values: ALTURA_PROMEDIO_OPCIONES },
    { title: 'Desarrollada Por', multi: true, values: DESARROLLADO_POR_OPCIONES_ALTURAS },
    { title: 'Actividades Alto Riesgo', multi: true, values: ACTIVIDADES_ALTO_RIESGO_ALTURAS },
    { title: 'Medidas de Prevención', multi: true, values: MEDIDAS_PREVENCION_OPCIONES_ALTURAS },
    { title: 'Escaleras — opciones', multi: true, values: ESCALERAS_OPTS },
    { title: 'Arneses — opciones', multi: true, values: ARNESES_OPTS },
    { title: 'EPP Utilizados', multi: true, values: EPP_OPCIONES_ALTURAS },
    { title: 'Actividad Analizada', multi: false, values: ACTIVIDADES_LISTA_ALTURAS },
    { title: 'Detalle de la Actividad', multi: false, values: DETALLE_ACTIVIDAD_LISTA_ALTURAS },
  ];

  const totalCols = lists.length;

  setCell(ws, 0, 0,
    `LISTAS DE VALORES — úselos exactamente como aparecen aquí (respete tildes y mayúsculas)   |   ${totalCols} listas disponibles`,
    cellStyle(true, C.sky, C.blanco, true));
  for (let c = 1; c < totalCols; c++) {
    setCell(ws, 0, c, '', cellStyle(true, C.sky, C.blanco, false));
  }

  lists.forEach((list, c) => {
    setCell(ws, 1, c,
      list.title + (list.multi ? '\n[SELECCIÓN MÚLTIPLE]' : ''),
      cellStyle(true, list.multi ? C.amarillo : C.azulOscuro, list.multi ? C.amarilloOscuro : C.blanco, true, 'center'));
  });

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

function downloadTemplate() {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, buildDatosSheet(),         'Datos');
  XLSX.utils.book_append_sheet(wb, buildInstruccionesSheet(), 'Instrucciones');
  XLSX.utils.book_append_sheet(wb, buildListasSheet(),        'Listas de valores');
  XLSX.writeFile(wb, 'plantilla_diagnostico_alturas.xlsx');
}

// ── Main component ─────────────────────────────────────────────────────────────

type Stage = 'idle' | 'parsing' | 'preview' | 'importing' | 'done';

export default function ImportarAlturaPage() {
  const router    = useRouter();
  const { user }  = useUser();
  const { toast } = useToast();

  const fileRef = useRef<HTMLInputElement>(null);
  const [stage, setStage]           = useState<Stage>('idle');
  const [fileName, setFileName]     = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [validation, setValidation]   = useState<ValidationResult | null>(null);
  const [rawRows, setRawRows]         = useState<RawImportRow[]>([]);
  const [result, setResult]           = useState<ExecuteResult | null>(null);
  const [showErrors, setShowErrors]   = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const parseFile = useCallback(async (file: File) => {
    setStage('parsing');
    setFileName(file.name);
    try {
      const buf  = await file.arrayBuffer();
      const wb   = XLSX.read(buf, { type: 'array', cellDates: false });
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const raw  = XLSX.utils.sheet_to_json<Record<string, string>>(ws, { defval: '' });
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

  const displayRows = validation
    ? (showErrors ? validation.rows.filter(r => !r.valid) : validation.rows)
    : [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <button
            onClick={() => router.push('/alturas/diagnostico')}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1"
          >
            <ArrowLeft className="h-3 w-3" /> Diagnóstico
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <ArrowUpToLine className="h-6 w-6 text-sky-600" />
            Importar Diagnósticos – Alturas
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Cargue masivo usando la plantilla Excel (.xlsx) de alturas.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={downloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Descargar plantilla
        </Button>
      </div>

      {/* idle / parsing */}
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
                isDragging ? 'border-sky-500 bg-sky-50' : 'border-muted hover:border-sky-400 hover:bg-muted/30',
              )}
            >
              {stage === 'parsing'
                ? <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
                : <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />}
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
              ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />
            <div className="mt-4 rounded-lg bg-muted/40 border p-4 text-xs text-muted-foreground space-y-1.5">
              <p className="font-semibold text-foreground text-sm">Instrucciones</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Descargue la plantilla usando el botón superior derecho.</li>
                <li>Rellene las filas a partir de la fila 4 (las primeras 3 son encabezado, descripción y ejemplo).</li>
                <li>Los campos marcados con ★ son obligatorios.</li>
                <li>Los campos multi-valor (Medidas, Desarrollada Por, etc.) use comas para separar.</li>
                <li>Para fechas use el formato dd/mm/yyyy.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* preview */}
      {stage === 'preview' && validation && (
        <>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <FileSpreadsheet className="h-4 w-4 text-sky-600" />
              <span className="font-medium truncate max-w-[200px]">{fileName}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle2 className="mr-1 h-3 w-3" /> {validation.validCount} válidas
              </Badge>
              {validation.errorCount > 0 && (
                <Badge className="bg-red-100 text-red-700">
                  <XCircle className="mr-1 h-3 w-3" /> {validation.errorCount} con errores
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
                        className={cn(!row.valid && 'bg-red-50 hover:bg-red-50', row.errors.length > 0 && 'cursor-pointer')}
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
                              {expandedRows.has(row.rowIndex) ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
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
              className="bg-sky-600 hover:bg-sky-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Importar {validation.validCount} registro{validation.validCount !== 1 ? 's' : ''}
            </Button>
          </div>
        </>
      )}

      {/* importing */}
      {stage === 'importing' && (
        <Card>
          <CardContent className="p-12 flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
            <p className="font-semibold">Importando registros…</p>
            <p className="text-sm text-muted-foreground">Por favor no cierre esta ventana.</p>
          </CardContent>
        </Card>
      )}

      {/* done */}
      {stage === 'done' && result && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center gap-4 text-center">
            {result.failed === 0
              ? <CheckCircle2 className="h-14 w-14 text-green-500" />
              : <AlertTriangle className="h-14 w-14 text-amber-500" />}
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
              <Button onClick={() => router.push('/alturas/diagnostico')}>
                Ver diagnósticos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
