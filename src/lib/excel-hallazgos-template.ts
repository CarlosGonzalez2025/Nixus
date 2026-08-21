// lib/excel-hallazgos-template.ts
// Plantilla "inteligente" de importación masiva de hallazgos:
// listas desplegables, validación de fechas y porcentajes, hoja de instrucciones
// y formato profesional. Generada con ExcelJS (SheetJS community no escribe
// estilos ni validaciones de datos).
import ExcelJS from 'exceljs';
import {
  XL, solid, thinBorder, drawBanner, drawSectionTitle, drawTable, drawNote,
} from './excel-theme';
import {
  HALLAZGO_PELIGRO_OPTIONS,
  HALLAZGO_PERSONAL_EXPUESTO_OPTIONS,
} from '@/types';

// ─── Catálogos de las listas desplegables ────────────────────────────────────
// Viven en la hoja oculta "Listas"; las validaciones apuntan a esos rangos.
const CATALOGOS: { titulo: string; valores: readonly string[] }[] = [
  { titulo: 'TipoActividad', valores: ['Rutinario', 'No Rutinario'] },
  { titulo: 'TipoHallazgo', valores: ['Positivo', 'Seguimiento'] },
  { titulo: 'Responsabilidad', valores: ['Directa', 'Corporativa'] },
  { titulo: 'Clase', valores: ['A', 'B', 'C'] },
  { titulo: 'Intervencion', valores: ['Inmediata', 'Pronta', 'Posterior'] },
  { titulo: 'Estado', valores: ['Pendiente', 'En Progreso', 'Cerrado'] },
  { titulo: 'Peligros', valores: HALLAZGO_PELIGRO_OPTIONS },
  {
    titulo: 'PersonalExpuesto',
    valores: [...HALLAZGO_PERSONAL_EXPUESTO_OPTIONS, 'Propio, Contratistas'],
  },
];

type Validacion =
  | { kind: 'list'; catalogo: string; estricta: boolean }
  | { kind: 'date' }
  | { kind: 'percent' }
  | { kind: 'text' };

interface TemplateCol {
  header: string;
  required: boolean;
  width: number;
  example: string;
  /** Descripción para la hoja de Instrucciones. */
  help: string;
  validacion?: Validacion;
}

// El orden y los textos de `header` deben mantenerse: son los que reconoce el
// importador (`resolveField` tolera tildes, mayúsculas y el sufijo " *").
const COLS: TemplateCol[] = [
  { header: 'Empresa', required: true, width: 30, example: 'EJEMPLO (borrar esta fila)', help: 'Nombre de la empresa. Debe coincidir con las empresas registradas en la plataforma.' },
  { header: 'Planta', required: true, width: 24, example: 'Planta Mosquera', help: 'Nombre de la planta o sede registrada en la plataforma.' },
  { header: 'Área', required: true, width: 24, example: 'Silo de almacenamiento', help: 'Área específica dentro de la planta.' },
  { header: 'Tipo de Actividad', required: true, width: 18, example: 'Rutinario', help: 'Lista desplegable: Rutinario o No Rutinario.', validacion: { kind: 'list', catalogo: 'TipoActividad', estricta: true } },
  { header: 'Tipo de Hallazgo', required: false, width: 18, example: 'Seguimiento', help: 'Lista desplegable. Positivo = observación de una buena práctica. Seguimiento = requiere plan de acción.', validacion: { kind: 'list', catalogo: 'TipoHallazgo', estricta: true } },
  { header: 'Responsabilidad', required: false, width: 18, example: 'Directa', help: 'Lista desplegable. Indica si la corrección es responsabilidad directa del área o corporativa.', validacion: { kind: 'list', catalogo: 'Responsabilidad', estricta: true } },
  { header: 'Fecha de Visita', required: true, width: 16, example: '27/05/2026', help: 'Fecha en formato dd/mm/aaaa. La celda valida que sea una fecha real.', validacion: { kind: 'date' } },
  { header: 'Latitud (Geo)', required: false, width: 15, example: '4.710989', help: 'Coordenada decimal. La app la captura automáticamente; en la importación es opcional (debe ir junto con la longitud).' },
  { header: 'Longitud (Geo)', required: false, width: 15, example: '-74.072090', help: 'Coordenada decimal. Debe ir junto con la latitud.' },
  { header: 'Peligro(s) Inspeccionado(s)', required: true, width: 34, example: 'Alturas, Energías Peligrosas', help: 'Lista desplegable con los peligros del catálogo. Puede escribir VARIOS separados por coma, y también texto libre (se guarda como "Otros").', validacion: { kind: 'list', catalogo: 'Peligros', estricta: false } },
  { header: 'Personal Expuesto', required: false, width: 24, example: 'Propio, Contratistas', help: 'Lista desplegable: Propio, Contratistas o ambos separados por coma. NO admite otros valores.', validacion: { kind: 'list', catalogo: 'PersonalExpuesto', estricta: false } },
  { header: 'Descripción del Hallazgo', required: true, width: 46, example: 'Trabajador realiza labor en altura sin arnés anclado a punto certificado.', help: 'Texto libre. Describa la situación de riesgo identificada.' },
  { header: 'Clase del Hallazgo', required: true, width: 15, example: 'A', help: 'Lista desplegable. A = riesgo alto (inmediata), B = medio (pronta), C = bajo (posterior).', validacion: { kind: 'list', catalogo: 'Clase', estricta: true } },
  { header: 'Tipo de Intervención', required: true, width: 18, example: 'Inmediata', help: 'Lista desplegable. Debe corresponder con la clase: A→Inmediata, B→Pronta, C→Posterior.', validacion: { kind: 'list', catalogo: 'Intervencion', estricta: true } },
  { header: 'Detalle de Recomendaciones', required: true, width: 46, example: 'Detener la actividad. Suministrar arnés certificado y verificar el punto de anclaje.', help: 'Texto libre con las acciones correctivas o preventivas recomendadas.' },
  { header: 'Acción Inmediata', required: false, width: 34, example: 'Se suspendió la actividad y se informó al supervisor.', help: 'Opcional. Acción tomada en el momento del hallazgo.' },
  { header: 'Nombre del Reportador', required: true, width: 24, example: 'Carlos González', help: 'Nombre completo de quien reporta.' },
  { header: 'Cargo del Reportador', required: true, width: 22, example: 'Líder SST', help: 'Cargo o rol de quien reporta.' },
  { header: 'Responsable (Plan de Acción)', required: false, width: 24, example: 'Juan Pérez', help: 'Responsable de implementar la corrección.' },
  { header: 'Fecha Medida Implementada', required: false, width: 20, example: '30/05/2026', help: 'Fecha dd/mm/aaaa en que se implementó la medida correctiva.', validacion: { kind: 'date' } },
  { header: 'Seguimientos', required: false, width: 52, example: '05/06/2026 | 50 | Se instaló línea de vida; 20/06/2026 | 100 | Verificado en sitio', help: 'VARIOS seguimientos en una sola celda. Formato de cada uno: fecha | % | observación (el % y la observación son opcionales). Separe cada seguimiento con punto y coma ";".' },
  { header: 'Fecha de Seguimiento', required: false, width: 18, example: '', help: 'Compatibilidad con plantillas anteriores: un único seguimiento. Se IGNORA si la columna "Seguimientos" trae datos.', validacion: { kind: 'date' } },
  { header: '% de Cumplimiento', required: false, width: 16, example: '', help: 'Número entre 0 y 100. Acompaña a "Fecha de Seguimiento" cuando no se usa la columna "Seguimientos".', validacion: { kind: 'percent' } },
  { header: 'Evidencias Plan de Acción (URLs)', required: false, width: 34, example: '', help: 'URLs ya publicadas en el almacenamiento, separadas por coma. Las fotos nuevas se suben desde la app.' },
  { header: 'Fecha de Cierre', required: false, width: 16, example: '10/06/2026', help: 'Fecha dd/mm/aaaa en que se cierra el hallazgo.', validacion: { kind: 'date' } },
  { header: '% de Cumplimiento Total', required: false, width: 18, example: '100', help: 'Número entre 0 y 100. Porcentaje total al cierre.', validacion: { kind: 'percent' } },
  { header: 'Estado del Cumplimiento', required: false, width: 20, example: 'Pendiente', help: 'Lista desplegable: Pendiente, En Progreso o Cerrado.', validacion: { kind: 'list', catalogo: 'Estado', estricta: true } },
  { header: 'Observación', required: false, width: 34, example: 'Se instaló línea de vida horizontal en el área.', help: 'Texto libre con notas sobre la implementación del plan.' },
];

const FILAS_DATOS = 300;
const FILA_HEADER = 1;
const FILA_EJEMPLO = 2;
const PRIMERA_FILA_DATOS = 3;

/** Letra(s) de columna a partir del índice 1. */
function colLetter(index: number): string {
  let n = index;
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

// ─── Hoja: Listas (oculta) ───────────────────────────────────────────────────

/**
 * Rangos de los catálogos en la hoja "Listas". Se calculan sin crear la hoja
 * para poder añadirla al final (las validaciones solo necesitan la referencia
 * como texto; la hoja debe existir en el libro terminado).
 */
const RANGOS_LISTAS: Record<string, string> = CATALOGOS.reduce((acc, cat, i) => {
  const letra = colLetter(i + 1);
  acc[cat.titulo] = `Listas!$${letra}$2:$${letra}$${1 + cat.valores.length}`;
  return acc;
}, {} as Record<string, string>);

function buildListasSheet(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet('Listas', { state: 'hidden' });
  CATALOGOS.forEach((cat, i) => {
    const col = i + 1;
    ws.getCell(1, col).value = cat.titulo;
    cat.valores.forEach((v, j) => {
      ws.getCell(2 + j, col).value = v;
    });
    ws.getColumn(col).width = 26;
  });
}

// ─── Hoja: Plantilla ─────────────────────────────────────────────────────────
function buildPlantillaSheet(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet('Plantilla Hallazgos', {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 2 }],
    properties: { tabColor: { argb: XL.navy } },
  });

  // Encabezados
  COLS.forEach((col, i) => {
    const c = ws.getCell(FILA_HEADER, i + 1);
    c.value = col.required ? `${col.header} *` : col.header;
    c.fill = solid(col.required ? XL.red : XL.blue);
    c.font = { bold: true, size: 9, color: { argb: XL.white } };
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    c.border = thinBorder(XL.white);
    ws.getColumn(i + 1).width = col.width;

    // Ayuda al pasar el mouse / seleccionar la celda
    c.note = `${col.required ? 'OBLIGATORIO' : 'Opcional'}\n\n${col.help}`;
  });
  ws.getRow(FILA_HEADER).height = 38;

  // Fila de ejemplo
  COLS.forEach((col, i) => {
    const c = ws.getCell(FILA_EJEMPLO, i + 1);
    c.value = col.example;
    c.fill = solid(XL.yellowSoft);
    c.font = { size: 9, italic: true, color: { argb: 'FF5D4037' } };
    c.alignment = { vertical: 'middle', horizontal: 'left', wrapText: false };
    c.border = thinBorder('FFE0C97F');
  });
  ws.getRow(FILA_EJEMPLO).height = 22;

  // Filas de captura + validaciones (se asignan por celda: es la API tipada de
  // ExcelJS y produce el mismo XML que `worksheet.dataValidations.add`).
  const ultimaFila = PRIMERA_FILA_DATOS + FILAS_DATOS - 1;

  COLS.forEach((col, i) => {
    const v = col.validacion;

    const dv: ExcelJS.DataValidation | null =
      !v ? null
        : v.kind === 'list' ? {
          type: 'list',
          allowBlank: true,
          formulae: [`=${RANGOS_LISTAS[v.catalogo]}`],
          showErrorMessage: v.estricta,
          errorStyle: 'stop',
          errorTitle: 'Valor no permitido',
          error: `Seleccione uno de los valores de la lista para "${col.header}".`,
          showInputMessage: true,
          promptTitle: col.header,
          prompt: col.help,
        }
        : v.kind === 'date' ? {
          type: 'date',
          operator: 'between',
          allowBlank: true,
          formulae: [new Date(2015, 0, 1), new Date(2100, 11, 31)],
          showErrorMessage: true,
          errorStyle: 'stop',
          errorTitle: 'Fecha inválida',
          error: 'Escriba una fecha real en formato dd/mm/aaaa.',
          showInputMessage: true,
          promptTitle: col.header,
          prompt: col.help,
        }
        : v.kind === 'percent' ? {
          type: 'decimal',
          operator: 'between',
          allowBlank: true,
          formulae: [0, 100],
          showErrorMessage: true,
          errorStyle: 'stop',
          errorTitle: 'Porcentaje inválido',
          error: 'Escriba un número entre 0 y 100 (sin el signo %).',
          showInputMessage: true,
          promptTitle: col.header,
          prompt: col.help,
        }
        : null;

    for (let r = PRIMERA_FILA_DATOS; r <= ultimaFila; r++) {
      const c = ws.getCell(r, i + 1);
      c.border = thinBorder();
      c.font = { size: 9 };
      c.alignment = { vertical: 'middle', horizontal: 'left' };
      if (dv) c.dataValidation = dv;
    }

    if (v?.kind === 'date') ws.getColumn(i + 1).numFmt = 'dd/mm/yyyy';
    if (v?.kind === 'percent') ws.getColumn(i + 1).numFmt = '0';
  });

  ws.autoFilter = {
    from: { row: FILA_HEADER, column: 1 },
    to: { row: FILA_HEADER, column: COLS.length },
  };

  return ws;
}

// ─── Hoja: Instrucciones ─────────────────────────────────────────────────────
function buildInstruccionesSheet(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet('Instrucciones', {
    views: [{ state: 'frozen', ySplit: 0, showGridLines: false }],
    properties: { tabColor: { argb: XL.blue } },
  });

  const LAST = 4;
  ws.getColumn(1).width = 34;
  ws.getColumn(2).width = 14;
  ws.getColumn(3).width = 62;
  ws.getColumn(4).width = 34;

  let row = drawBanner(ws, {
    title: 'Plantilla de Importación de Hallazgos',
    subtitle: 'SGTC Móvil — Sistema de Gestión de Tareas de Alto Riesgo',
    meta: `Generada el ${new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}  ·  ${COLS.length} columnas  ·  ${FILAS_DATOS} filas disponibles`,
    lastCol: LAST,
  });

  // Pasos
  row = drawSectionTitle(ws, row, 'Cómo usar esta plantilla', LAST);
  const pasos = [
    ['1', 'Abra la hoja "Plantilla Hallazgos" (segunda pestaña).'],
    ['2', 'Borre la fila amarilla de EJEMPLO. Es solo una guía; si la deja, el sistema la ignora.'],
    ['3', 'Diligencie una fila por hallazgo. Las celdas con lista desplegable muestran una flecha al seleccionarlas.'],
    ['4', 'Las columnas con encabezado ROJO son obligatorias; las AZULES son opcionales.'],
    ['5', 'Guarde el archivo y súbalo en Hallazgos → Importar. El sistema valida fila por fila y muestra una vista previa antes de escribir nada.'],
  ];
  pasos.forEach(([n, texto]) => {
    const c1 = ws.getCell(row, 1);
    c1.value = n;
    c1.fill = solid(XL.navy);
    c1.font = { bold: true, size: 11, color: { argb: XL.white } };
    c1.alignment = { vertical: 'middle', horizontal: 'center' };
    ws.mergeCells(row, 2, row, LAST);
    const c2 = ws.getCell(row, 2);
    c2.value = texto;
    c2.font = { size: 10 };
    c2.alignment = { vertical: 'middle', horizontal: 'left', indent: 1, wrapText: true };
    ws.getRow(row).height = 22;
    row++;
  });
  row++;

  // Leyenda
  row = drawSectionTitle(ws, row, 'Convenciones', LAST);
  const leyenda: [string, string, string][] = [
    ['Encabezado rojo', 'OBLIGATORIO', 'La fila se rechaza si la celda está vacía.'],
    ['Encabezado azul', 'Opcional', 'Puede dejarse en blanco.'],
    ['Fila amarilla', 'Ejemplo', 'Bórrela antes de importar (el sistema también la ignora).'],
    ['Celda con flecha', 'Lista', 'Seleccione un valor del catálogo en lugar de escribirlo.'],
  ];
  leyenda.forEach(([a, b, c], i) => {
    const colores = [XL.red, XL.blue, XL.yellowSoft, XL.green];
    const ca = ws.getCell(row, 1);
    ca.value = a;
    ca.fill = solid(colores[i]);
    ca.font = { bold: true, size: 9, color: { argb: i === 2 ? 'FF5D4037' : XL.white } };
    ca.alignment = { vertical: 'middle', horizontal: 'center' };
    const cb = ws.getCell(row, 2);
    cb.value = b;
    cb.font = { bold: true, size: 9, color: { argb: XL.navy } };
    cb.alignment = { vertical: 'middle', horizontal: 'center' };
    ws.mergeCells(row, 3, row, LAST);
    const cc = ws.getCell(row, 3);
    cc.value = c;
    cc.font = { size: 9 };
    cc.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(row).height = 20;
    row++;
  });
  row++;

  // Casos especiales
  row = drawSectionTitle(ws, row, 'Columnas que admiten varios valores', LAST, XL.violet);
  const especiales: [string, string][] = [
    ['Peligro(s) Inspeccionado(s)',
      'Varios separados por coma. Ej: "Alturas, Energías Peligrosas". Cualquier texto fuera del catálogo se guarda como peligro libre ("Otros"). No distingue mayúsculas ni tildes.'],
    ['Personal Expuesto',
      'Solo admite Propio y/o Contratistas, separados por coma. Un valor distinto hace que la fila se rechace.'],
    ['Seguimientos',
      'Permite registrar VARIOS seguimientos en una sola celda.\nFormato de cada uno:  fecha | % | observación   (el % y la observación son opcionales)\nSepare cada seguimiento con punto y coma ";".\nEj:  05/06/2026 | 50 | Se instaló línea de vida; 20/06/2026 | 100 | Verificado en sitio'],
  ];
  especiales.forEach(([campo, desc]) => {
    const c1 = ws.getCell(row, 1);
    c1.value = campo;
    c1.font = { bold: true, size: 9, color: { argb: XL.violet } };
    c1.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
    c1.border = thinBorder();
    ws.mergeCells(row, 2, row, LAST);
    const c2 = ws.getCell(row, 2);
    c2.value = desc;
    c2.font = { size: 9 };
    c2.alignment = { vertical: 'top', horizontal: 'left', indent: 1, wrapText: true };
    c2.border = thinBorder();
    ws.getRow(row).height = desc.includes('\n') ? 58 : 32;
    row++;
  });
  row++;

  // Diccionario de campos
  row = drawSectionTitle(ws, row, 'Diccionario de campos', LAST);
  row = drawTable(
    ws,
    row,
    ['Campo', 'Obligatorio', 'Valores permitidos / formato', 'Ejemplo'],
    COLS.map(c => [c.header, c.required ? 'SÍ' : 'No', c.help, c.example]),
    { align: ['left', 'center', 'left', 'left'] },
  );

  // Ajuste de alto y ajuste de texto en la columna de ayuda
  for (let r = 1; r <= row; r++) {
    const cell = ws.getCell(r, 3);
    if (cell.value && typeof cell.value === 'string' && cell.value.length > 70) {
      ws.getRow(r).height = 30;
      cell.alignment = { ...cell.alignment, wrapText: true, vertical: 'middle' };
    }
  }

  drawNote(
    ws,
    row,
    'Las evidencias fotográficas y la geolocalización se capturan desde la app. La importación masiva no crea imágenes: solo admite URLs ya publicadas.',
    LAST,
  );

  return ws;
}

// ─── API ─────────────────────────────────────────────────────────────────────

/** Genera el archivo .xlsx de la plantilla de importación de hallazgos. */
export async function buildHallazgosTemplate(): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'SGTC Móvil';
  wb.created = new Date();

  // El orden de creación es el orden de las pestañas: la hoja oculta va al final.
  buildInstruccionesSheet(wb);
  buildPlantillaSheet(wb);
  buildListasSheet(wb);

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

export const TEMPLATE_COLUMN_COUNT = COLS.length;
