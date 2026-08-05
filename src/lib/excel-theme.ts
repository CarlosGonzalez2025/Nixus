// lib/excel-theme.ts
// Paleta y utilidades de estilo compartidas por los libros de Excel generados
// con ExcelJS (plantilla de importación y reporte gerencial de hallazgos).
//
// Nota: la librería `xlsx` (SheetJS community) que se usa en otros módulos NO
// escribe estilos ni validaciones de datos — los ignora en silencio. Todo lo que
// deba verse con formato o traer listas desplegables se genera con ExcelJS.
import type { Worksheet } from 'exceljs';

// ─── Paleta ──────────────────────────────────────────────────────────────────
export const XL = {
  navy: 'FF002248',
  navySoft: 'FF123A63',
  blue: 'FF1565C0',
  blueSoft: 'FFE3F0FB',
  gray: 'FF546E7A',
  grayLight: 'FFF4F6F9',
  grayBorder: 'FFD8DEE8',
  white: 'FFFFFFFF',
  red: 'FFC62828',
  redSoft: 'FFFDECEA',
  amber: 'FFF9A825',
  amberSoft: 'FFFFF8E1',
  green: 'FF2E7D32',
  greenSoft: 'FFE8F5E9',
  violet: 'FF6A1B9A',
  yellowSoft: 'FFFFF9C4',
} as const;

/** Color por clase de hallazgo. */
export const CLASE_COLOR: Record<string, string> = {
  A: XL.red,
  B: XL.amber,
  C: XL.blue,
};

/** Color por estado de cumplimiento. */
export const ESTADO_COLOR: Record<string, string> = {
  Pendiente: XL.amber,
  'En Progreso': XL.blue,
  Completado: XL.green,
  Cerrado: XL.gray,
};

// ─── Helpers de estilo ───────────────────────────────────────────────────────

export const solid = (argb: string) => ({
  type: 'pattern' as const,
  pattern: 'solid' as const,
  fgColor: { argb },
});

export const thinBorder = (argb: string = XL.grayBorder) => ({
  top: { style: 'thin' as const, color: { argb } },
  left: { style: 'thin' as const, color: { argb } },
  bottom: { style: 'thin' as const, color: { argb } },
  right: { style: 'thin' as const, color: { argb } },
});

/**
 * Barra de progreso dibujada con caracteres de bloque.
 * Se calcula en JS (no con fórmulas REPT) para que se vea igual en Excel,
 * LibreOffice y Google Sheets sin depender del recálculo.
 */
export function bar(value: number, max: number, width = 18): string {
  if (!max || max <= 0 || value <= 0) return '';
  const filled = Math.max(1, Math.round((value / max) * width));
  return '█'.repeat(Math.min(filled, width));
}

/**
 * Banner de encabezado: título, subtítulo y línea de metadatos.
 * Devuelve la siguiente fila libre.
 */
export function drawBanner(
  ws: Worksheet,
  opts: { title: string; subtitle: string; meta?: string; lastCol: number; startRow?: number },
): number {
  const { title, subtitle, meta, lastCol } = opts;
  const r = opts.startRow ?? 1;

  ws.mergeCells(r, 1, r + 2, lastCol);
  const cell = ws.getCell(r, 1);
  cell.value = {
    richText: [
      { text: `${title}\n`, font: { bold: true, size: 18, color: { argb: XL.white }, name: 'Calibri' } },
      { text: subtitle, font: { size: 10, color: { argb: 'FFBFD3E8' }, name: 'Calibri' } },
    ],
  };
  cell.fill = solid(XL.navy);
  cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1, wrapText: true };
  ws.getRow(r).height = 26;
  ws.getRow(r + 1).height = 16;
  ws.getRow(r + 2).height = 10;

  let next = r + 3;
  if (meta) {
    ws.mergeCells(next, 1, next, lastCol);
    const m = ws.getCell(next, 1);
    m.value = meta;
    m.fill = solid(XL.grayLight);
    m.font = { size: 9, color: { argb: XL.gray }, italic: true };
    m.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(next).height = 18;
    next += 1;
  }
  return next + 1;
}

/** Título de sección con barra de color. Devuelve la siguiente fila libre. */
export function drawSectionTitle(
  ws: Worksheet,
  row: number,
  text: string,
  lastCol: number,
  color: string = XL.navy,
): number {
  ws.mergeCells(row, 1, row, lastCol);
  const c = ws.getCell(row, 1);
  c.value = text.toUpperCase();
  c.fill = solid(color);
  c.font = { bold: true, size: 10, color: { argb: XL.white } };
  c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  ws.getRow(row).height = 20;
  return row + 1;
}

/** Título de sección acotado a un rango de columnas (para bloques lado a lado). */
export function drawSectionTitleRange(
  ws: Worksheet,
  row: number,
  text: string,
  colInicio: number,
  colFin: number,
  color: string = XL.navy,
): number {
  ws.mergeCells(row, colInicio, row, colFin);
  const c = ws.getCell(row, colInicio);
  c.value = text.toUpperCase();
  c.fill = solid(color);
  c.font = { bold: true, size: 9, color: { argb: XL.white } };
  c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  ws.getRow(row).height = 18;
  return row + 1;
}

/**
 * Fila de tarjetas KPI. Cada tarjeta ocupa `span` columnas y dos filas
 * (valor grande arriba, etiqueta abajo). Devuelve la siguiente fila libre.
 */
export function drawKpiRow(
  ws: Worksheet,
  row: number,
  cards: { label: string; value: string | number; color: string; hint?: string }[],
  span = 3,
): number {
  let col = 1;
  cards.forEach(card => {
    ws.mergeCells(row, col, row, col + span - 1);
    const v = ws.getCell(row, col);
    v.value = card.value;
    v.fill = solid(card.color);
    v.font = { bold: true, size: 20, color: { argb: XL.white } };
    v.alignment = { vertical: 'middle', horizontal: 'center' };

    ws.mergeCells(row + 1, col, row + 1, col + span - 1);
    const l = ws.getCell(row + 1, col);
    l.value = card.hint ? `${card.label}\n${card.hint}` : card.label;
    l.fill = solid(XL.grayLight);
    l.font = { bold: true, size: 8, color: { argb: XL.navy } };
    l.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    l.border = { bottom: { style: 'medium', color: { argb: card.color } } };

    col += span;
  });
  ws.getRow(row).height = 34;
  ws.getRow(row + 1).height = 26;
  return row + 3;
}

/**
 * Tabla simple con encabezado de color, filas alternadas y bordes.
 * `widths` se aplica solo si la columna aún no tiene ancho asignado.
 * Devuelve la siguiente fila libre.
 */
export function drawTable(
  ws: Worksheet,
  row: number,
  headers: string[],
  rows: (string | number)[][],
  opts: {
    startCol?: number;
    headerColor?: string;
    widths?: number[];
    align?: ('left' | 'center' | 'right')[];
    numFmt?: (string | undefined)[];
  } = {},
): number {
  const startCol = opts.startCol ?? 1;
  const headerColor = opts.headerColor ?? XL.navySoft;

  headers.forEach((h, i) => {
    const c = ws.getCell(row, startCol + i);
    c.value = h;
    c.fill = solid(headerColor);
    c.font = { bold: true, size: 9, color: { argb: XL.white } };
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    c.border = thinBorder(headerColor);
    if (opts.widths?.[i]) {
      const column = ws.getColumn(startCol + i);
      if (!column.width || column.width < opts.widths[i]) column.width = opts.widths[i];
    }
  });
  ws.getRow(row).height = 22;

  rows.forEach((r, ri) => {
    r.forEach((val, ci) => {
      const c = ws.getCell(row + 1 + ri, startCol + ci);
      c.value = val;
      c.font = { size: 9 };
      c.alignment = {
        vertical: 'middle',
        horizontal: opts.align?.[ci] ?? (typeof val === 'number' ? 'center' : 'left'),
        wrapText: false,
      };
      c.border = thinBorder();
      if (ri % 2 === 1) c.fill = solid(XL.grayLight);
      if (opts.numFmt?.[ci]) c.numFmt = opts.numFmt[ci]!;
    });
  });

  return row + rows.length + 2;
}

/** Nota al pie / aclaración en cursiva. Devuelve la siguiente fila libre. */
export function drawNote(ws: Worksheet, row: number, text: string, lastCol: number): number {
  ws.mergeCells(row, 1, row, lastCol);
  const c = ws.getCell(row, 1);
  c.value = text;
  c.font = { size: 8, italic: true, color: { argb: XL.gray } };
  c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1, wrapText: true };
  return row + 2;
}
