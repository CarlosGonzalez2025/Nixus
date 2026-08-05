// lib/excel-hallazgos-report.ts
// Reporte gerencial de hallazgos en Excel: hoja de resumen ejecutivo con KPIs y
// análisis, base de datos completa como tabla filtrable, detalle de seguimientos
// y análisis por planta. Generado con ExcelJS.
import ExcelJS from 'exceljs';
import {
  XL, CLASE_COLOR, ESTADO_COLOR, solid, thinBorder, bar,
  drawBanner, drawSectionTitle, drawKpiRow, drawTable, drawNote,
} from './excel-theme';

// ─── Contrato de entrada ─────────────────────────────────────────────────────
// El cliente envía los hallazgos ya filtrados y ordenados (lo que el usuario ve
// en pantalla), con las fechas serializadas a ISO y sin las firmas en base64.

export interface HallazgoExportSeguimiento {
  fecha: string | null;
  porcentaje?: number;
  observacion?: string;
}

export interface HallazgoExportRow {
  numero: number;
  empresa: string;
  planta: string;
  area: string;
  tipoActividad?: string;
  tipoHallazgo?: string;
  responsabilidad?: string;
  fechaVisita?: string | null;
  fechaMedidaImplementada?: string | null;
  fechaCierre?: string | null;
  peligroInspeccionado?: string;
  personalExpuesto?: string;
  hallazgo: string;
  descripcion?: string;
  accionInmediata?: string;
  observacion?: string;
  clase: string;
  intervencion?: string;
  cumplimientoEstado?: string;
  porcentajeCumplimiento?: number;
  porcentajeCumplimientoTotal?: number;
  reportadoPorNombre?: string;
  reportadoPorCargo?: string;
  responsable?: string;
  lat?: number;
  lng?: number;
  evidenciasAntes: number;
  evidenciasCierre: number;
  firmaReportador: boolean;
  firmaResponsable: boolean;
  seguimientos: HallazgoExportSeguimiento[];
  createdAt?: string | null;
}

export interface ReportMeta {
  generadoPor: string;
  filtros: string[];
}

// ─── Helpers de dominio ──────────────────────────────────────────────────────
const ESTADOS = ['Pendiente', 'En Progreso', 'Completado', 'Cerrado'] as const;
const ABIERTOS: string[] = ['Pendiente', 'En Progreso'];

const estadoDe = (h: HallazgoExportRow) => h.cumplimientoEstado || 'Pendiente';
const estaCerrado = (h: HallazgoExportRow) => !ABIERTOS.includes(estadoDe(h));
const cumplimientoDe = (h: HallazgoExportRow) =>
  h.porcentajeCumplimientoTotal ?? h.porcentajeCumplimiento ?? 0;

const toDate = (v?: string | null): Date | null => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

const fmtFecha = (v?: string | null) => {
  const d = toDate(v);
  return d
    ? `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
    : '';
};

const diasEntre = (a?: string | null, b?: string | null): number | null => {
  const da = toDate(a);
  const db = toDate(b);
  if (!da || !db) return null;
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
};

/** Cuenta ocurrencias y devuelve pares ordenados de mayor a menor. */
function contar(valores: string[]): [string, number][] {
  const mapa = new Map<string, number>();
  valores.forEach(v => mapa.set(v, (mapa.get(v) ?? 0) + 1));
  return [...mapa.entries()].sort((a, b) => b[1] - a[1]);
}

/** Filas "valor | cantidad | % | barra" listas para `drawTable`. */
function filasDistribucion(
  pares: [string, number][],
  total: number,
  limite?: number,
): (string | number)[][] {
  const max = pares[0]?.[1] ?? 0;
  const usados = limite ? pares.slice(0, limite) : pares;
  return usados.map(([nombre, n]) => [
    nombre,
    n,
    total > 0 ? n / total : 0,
    bar(n, max),
  ]);
}

// ─── Hoja 1: Resumen Ejecutivo ───────────────────────────────────────────────
function buildResumen(wb: ExcelJS.Workbook, rows: HallazgoExportRow[], meta: ReportMeta) {
  const ws = wb.addWorksheet('Resumen Ejecutivo', {
    views: [{ showGridLines: false }],
    properties: { tabColor: { argb: XL.navy } },
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });

  const LAST = 15;
  ws.getColumn(1).width = 30;
  for (let c = 2; c <= LAST; c++) ws.getColumn(c).width = 11;

  const total = rows.length;
  const cerrados = rows.filter(estaCerrado).length;
  const abiertos = total - cerrados;
  const criticosAbiertos = rows.filter(h => h.clase === 'A' && !estaCerrado(h)).length;
  const cumplimientoProm = total > 0
    ? Math.round(rows.reduce((s, h) => s + cumplimientoDe(h), 0) / total)
    : 0;

  const diasCierre = rows
    .map(h => diasEntre(h.fechaVisita, h.fechaCierre))
    .filter((d): d is number => d !== null && d >= 0);
  const diasCierreProm = diasCierre.length
    ? Math.round(diasCierre.reduce((s, d) => s + d, 0) / diasCierre.length)
    : null;

  const hoy = new Date();
  const antiguedades = rows
    .filter(h => !estaCerrado(h))
    .map(h => {
      const d = toDate(h.fechaVisita);
      return d ? Math.round((hoy.getTime() - d.getTime()) / 86_400_000) : null;
    })
    .filter((d): d is number => d !== null && d >= 0);
  const antiguedadProm = antiguedades.length
    ? Math.round(antiguedades.reduce((s, d) => s + d, 0) / antiguedades.length)
    : null;

  let row = drawBanner(ws, {
    title: 'Reporte Gerencial de Hallazgos SST',
    subtitle: 'SGTC Móvil — Sistema de Gestión de Tareas de Alto Riesgo',
    meta: `Generado por ${meta.generadoPor}  ·  ${hoy.toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short' })}  ·  ${total} hallazgo(s)  ·  Filtros: ${meta.filtros.join(' | ') || 'ninguno'}`,
    lastCol: LAST,
  });

  // ── KPIs ──
  row = drawSectionTitle(ws, row, 'Indicadores clave', LAST);
  row = drawKpiRow(ws, row, [
    { label: 'TOTAL HALLAZGOS', value: total, color: XL.navy },
    { label: 'ABIERTOS', value: abiertos, color: XL.amber, hint: 'Pendiente + En Progreso' },
    { label: 'CERRADOS', value: cerrados, color: XL.green, hint: 'Completado + Cerrado' },
    { label: 'TASA DE CIERRE', value: total > 0 ? `${Math.round((cerrados / total) * 100)}%` : '—', color: XL.blue },
    { label: 'CLASE A ABIERTOS', value: criticosAbiertos, color: XL.red, hint: 'Requieren intervención inmediata' },
  ], 3);

  row = drawKpiRow(ws, row, [
    { label: 'CUMPLIMIENTO PROMEDIO', value: `${cumplimientoProm}%`, color: XL.navySoft },
    { label: 'DÍAS PROMEDIO DE CIERRE', value: diasCierreProm ?? '—', color: XL.gray, hint: 'Desde la visita hasta el cierre' },
    { label: 'ANTIGÜEDAD DE ABIERTOS', value: antiguedadProm !== null ? `${antiguedadProm} d` : '—', color: XL.violet, hint: 'Promedio de días sin cerrar' },
    { label: 'CON PLAN DE ACCIÓN', value: rows.filter(h => h.seguimientos.length > 0).length, color: XL.blue, hint: 'Con al menos un seguimiento' },
    { label: 'SEGUIMIENTOS TOTALES', value: rows.reduce((s, h) => s + h.seguimientos.length, 0), color: XL.green },
  ], 3);

  // ── Distribuciones lado a lado ──
  const filaDistribuciones = row;
  const PCT = '0%';

  // Clase (col 1)
  let r1 = drawSectionTitleRango(ws, filaDistribuciones, 'Por clase de riesgo', 1, 4, XL.red);
  r1 = drawTable(ws, r1, ['Clase', 'N°', '%', ''], filasDistribucion(
    (['A', 'B', 'C'] as const).map(c => [`Clase ${c}`, rows.filter(h => h.clase === c).length] as [string, number]),
    total,
  ), { startCol: 1, headerColor: XL.red, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [30, 8, 8, 22] });

  // Estado (col 6)
  let r2 = drawSectionTitleRango(ws, filaDistribuciones, 'Por estado de cumplimiento', 6, 9, XL.blue);
  r2 = drawTable(ws, r2, ['Estado', 'N°', '%', ''], filasDistribucion(
    ESTADOS.map(e => [e, rows.filter(h => estadoDe(h) === e).length] as [string, number]),
    total,
  ), { startCol: 6, headerColor: XL.blue, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [22, 8, 8, 22] });

  // Tipo y responsabilidad (col 11)
  let r3 = drawSectionTitleRango(ws, filaDistribuciones, 'Tipo y responsabilidad', 11, 14, XL.violet);
  r3 = drawTable(ws, r3, ['Categoría', 'N°', '%', ''], [
    ...filasDistribucion(
      ['Positivo', 'Seguimiento'].map(t => [t, rows.filter(h => h.tipoHallazgo === t).length] as [string, number]),
      total,
    ),
    ['Sin clasificar (tipo)', rows.filter(h => !h.tipoHallazgo).length, total > 0 ? rows.filter(h => !h.tipoHallazgo).length / total : 0, ''],
    ...filasDistribucion(
      ['Directa', 'Corporativa'].map(t => [t, rows.filter(h => h.responsabilidad === t).length] as [string, number]),
      total,
    ),
    ['Sin clasificar (resp.)', rows.filter(h => !h.responsabilidad).length, total > 0 ? rows.filter(h => !h.responsabilidad).length / total : 0, ''],
  ], { startCol: 11, headerColor: XL.violet, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [24, 8, 8, 22] });

  row = Math.max(r1, r2, r3);

  // ── Peligros y personal expuesto ──
  const peligros = rows.flatMap(h =>
    (h.peligroInspeccionado || '').split('\n').map(p => p.trim()).filter(Boolean));
  const personal = rows.flatMap(h =>
    (h.personalExpuesto || '').split('\n').map(p => p.trim()).filter(Boolean));

  const filaPeligros = row;
  let r4 = drawSectionTitleRango(ws, filaPeligros, 'Peligros más frecuentes', 1, 4, XL.navySoft);
  r4 = drawTable(ws, r4, ['Peligro', 'N°', '% del total', ''],
    filasDistribucion(contar(peligros), total, 10),
    { startCol: 1, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [30, 8, 10, 22] });

  let r5 = drawSectionTitleRango(ws, filaPeligros, 'Personal expuesto', 6, 9, XL.navySoft);
  r5 = drawTable(ws, r5, ['Personal', 'N°', '% del total', ''],
    filasDistribucion(contar(personal), total),
    { startCol: 6, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [22, 8, 10, 22] });

  // Tendencia mensual (col 11)
  const meses: { etiqueta: string; clave: string }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    meses.push({
      etiqueta: d.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' }),
      clave: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    });
  }
  const claveMes = (v?: string | null) => {
    const d = toDate(v);
    return d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` : '';
  };
  const tendencia = meses.map(m => {
    const delMes = rows.filter(h => claveMes(h.fechaVisita) === m.clave);
    const cerradosMes = delMes.filter(estaCerrado).length;
    return { etiqueta: m.etiqueta, total: delMes.length, cerrados: cerradosMes };
  });
  const maxMes = Math.max(...tendencia.map(t => t.total), 0);

  let r6 = drawSectionTitleRango(ws, filaPeligros, 'Tendencia últimos 12 meses', 11, 15, XL.green);
  r6 = drawTable(ws, r6, ['Mes', 'Nuevos', 'Cerrados', '% cierre', ''],
    tendencia.map(t => [
      t.etiqueta,
      t.total,
      t.cerrados,
      t.total > 0 ? t.cerrados / t.total : 0,
      bar(t.total, maxMes, 12),
    ]),
    { startCol: 11, headerColor: XL.green, align: ['left', 'center', 'center', 'center', 'left'], numFmt: [undefined, undefined, undefined, PCT, undefined], widths: [12, 10, 10, 10, 16] });

  row = Math.max(r4, r5, r6);

  // ── Ranking por empresa y planta ──
  const ranking = (campo: 'empresa' | 'planta') => {
    const grupos = new Map<string, HallazgoExportRow[]>();
    rows.forEach(h => {
      const k = (h[campo] || 'Sin especificar').trim() || 'Sin especificar';
      grupos.set(k, [...(grupos.get(k) ?? []), h]);
    });
    return [...grupos.entries()]
      .map(([nombre, items]) => {
        const cer = items.filter(estaCerrado).length;
        return {
          nombre,
          total: items.length,
          abiertos: items.length - cer,
          cerrados: cer,
          tasa: items.length > 0 ? cer / items.length : 0,
          criticos: items.filter(h => h.clase === 'A' && !estaCerrado(h)).length,
        };
      })
      .sort((a, b) => b.total - a.total);
  };

  const filaRanking = row;
  const empresas = ranking('empresa');
  let r7 = drawSectionTitleRango(ws, filaRanking, 'Top 10 empresas', 1, 7, XL.navy);
  r7 = drawTable(ws, r7,
    ['Empresa', 'Total', 'Abiertos', 'Cerrados', '% cierre', 'Clase A abiertos', ''],
    empresas.slice(0, 10).map(e => [e.nombre, e.total, e.abiertos, e.cerrados, e.tasa, e.criticos, bar(e.total, empresas[0]?.total ?? 0, 12)]),
    { startCol: 1, align: ['left', 'center', 'center', 'center', 'center', 'center', 'left'], numFmt: [undefined, undefined, undefined, undefined, PCT, undefined, undefined], widths: [30, 9, 10, 10, 10, 12, 16] });

  const plantas = ranking('planta');
  let r8 = drawSectionTitleRango(ws, filaRanking, 'Top 10 plantas', 9, 15, XL.navy);
  r8 = drawTable(ws, r8,
    ['Planta', 'Total', 'Abiertos', 'Cerrados', '% cierre', 'Clase A abiertos', ''],
    plantas.slice(0, 10).map(p => [p.nombre, p.total, p.abiertos, p.cerrados, p.tasa, p.criticos, bar(p.total, plantas[0]?.total ?? 0, 12)]),
    { startCol: 9, align: ['left', 'center', 'center', 'center', 'center', 'center', 'left'], numFmt: [undefined, undefined, undefined, undefined, PCT, undefined, undefined], widths: [26, 9, 10, 10, 10, 12, 16] });

  row = Math.max(r7, r8);

  drawNote(ws, row,
    'Abiertos = Pendiente + En Progreso. Cerrados = Completado + Cerrado. El cumplimiento promedio usa el % total cuando existe y, en su defecto, el último % reportado en los seguimientos. Las barras son proporcionales al valor máximo de cada tabla.',
    LAST);

  return ws;
}

/** Título de sección acotado a un rango de columnas (para bloques lado a lado). */
function drawSectionTitleRango(
  ws: ExcelJS.Worksheet,
  row: number,
  text: string,
  colInicio: number,
  colFin: number,
  color: string,
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

// ─── Hoja 2: Base de datos ───────────────────────────────────────────────────
function buildDatos(wb: ExcelJS.Workbook, rows: HallazgoExportRow[]) {
  const ws = wb.addWorksheet('Hallazgos', {
    views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }],
    properties: { tabColor: { argb: XL.blue } },
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });

  const columnas: { header: string; width: number; get: (h: HallazgoExportRow) => any; numFmt?: string }[] = [
    { header: 'N°', width: 8, get: h => h.numero },
    { header: 'Empresa', width: 30, get: h => h.empresa },
    { header: 'Planta', width: 22, get: h => h.planta },
    { header: 'Área', width: 22, get: h => h.area },
    { header: 'Fecha visita', width: 13, get: h => fmtFecha(h.fechaVisita) },
    { header: 'Clase', width: 8, get: h => h.clase },
    { header: 'Intervención', width: 13, get: h => h.intervencion ?? '' },
    { header: 'Estado', width: 14, get: h => estadoDe(h) },
    { header: 'Tipo de hallazgo', width: 15, get: h => h.tipoHallazgo ?? '' },
    { header: 'Responsabilidad', width: 15, get: h => h.responsabilidad ?? '' },
    { header: 'Tipo actividad', width: 14, get: h => h.tipoActividad ?? '' },
    { header: 'Peligro(s)', width: 28, get: h => (h.peligroInspeccionado || '').split('\n').join(', ') },
    { header: 'Personal expuesto', width: 18, get: h => (h.personalExpuesto || '').split('\n').join(', ') },
    { header: 'Hallazgo', width: 55, get: h => h.hallazgo },
    { header: 'Recomendaciones', width: 45, get: h => h.descripcion ?? '' },
    { header: 'Acción inmediata', width: 32, get: h => h.accionInmediata ?? '' },
    { header: 'Reportado por', width: 24, get: h => h.reportadoPorNombre ?? '' },
    { header: 'Cargo', width: 20, get: h => h.reportadoPorCargo ?? '' },
    { header: 'Responsable plan', width: 24, get: h => h.responsable ?? '' },
    { header: 'Fecha medida', width: 13, get: h => fmtFecha(h.fechaMedidaImplementada) },
    { header: 'N° seguimientos', width: 14, get: h => h.seguimientos.length },
    { header: 'Último seguimiento', width: 15, get: h => fmtFecha(h.seguimientos[h.seguimientos.length - 1]?.fecha) },
    { header: '% cumplimiento', width: 14, get: h => cumplimientoDe(h) / 100, numFmt: '0%' },
    { header: 'Fecha cierre', width: 13, get: h => fmtFecha(h.fechaCierre) },
    { header: 'Días de cierre', width: 12, get: h => diasEntre(h.fechaVisita, h.fechaCierre) ?? '' },
    { header: 'Observación', width: 34, get: h => h.observacion ?? '' },
    { header: 'Evidencias antes', width: 13, get: h => h.evidenciasAntes },
    { header: 'Evidencias cierre', width: 13, get: h => h.evidenciasCierre },
    { header: 'Firma reportador', width: 13, get: h => (h.firmaReportador ? 'Sí' : 'No') },
    { header: 'Firma responsable', width: 14, get: h => (h.firmaResponsable ? 'Sí' : 'No') },
    { header: 'Geolocalización', width: 22, get: h => (h.lat != null && h.lng != null ? `${h.lat.toFixed(6)}, ${h.lng.toFixed(6)}` : '') },
  ];

  // Encabezado
  columnas.forEach((col, i) => {
    const c = ws.getCell(1, i + 1);
    c.value = col.header;
    c.fill = solid(XL.navy);
    c.font = { bold: true, size: 9, color: { argb: XL.white } };
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    c.border = thinBorder(XL.navy);
    ws.getColumn(i + 1).width = col.width;
  });
  ws.getRow(1).height = 30;

  // Datos
  rows.forEach((h, ri) => {
    const r = ri + 2;
    columnas.forEach((col, ci) => {
      const c = ws.getCell(r, ci + 1);
      c.value = col.get(h);
      c.font = { size: 9 };
      c.alignment = { vertical: 'top', horizontal: typeof c.value === 'number' ? 'center' : 'left', wrapText: false };
      c.border = thinBorder();
      if (col.numFmt) c.numFmt = col.numFmt;
      if (ri % 2 === 1) c.fill = solid(XL.grayLight);
    });

    // Semáforo por clase y estado
    const claseCell = ws.getCell(r, 6);
    claseCell.font = { size: 9, bold: true, color: { argb: CLASE_COLOR[h.clase] ?? XL.gray } };
    claseCell.alignment = { vertical: 'top', horizontal: 'center' };

    const estadoCell = ws.getCell(r, 8);
    estadoCell.font = { size: 9, bold: true, color: { argb: ESTADO_COLOR[estadoDe(h)] ?? XL.gray } };
  });

  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columnas.length } };

  // Barras de datos nativas de Excel sobre la columna "% cumplimiento" (W)
  if (rows.length > 0) {
    ws.addConditionalFormatting({
      ref: `W2:W${rows.length + 1}`,
      rules: [{
        type: 'dataBar',
        priority: 1,
        gradient: true,
        minLength: 0,
        maxLength: 100,
        showValue: true,
        border: false,
        axisPosition: 'auto',
        direction: 'leftToRight',
        cfvo: [{ type: 'num', value: 0 }, { type: 'num', value: 1 }],
      }],
    });
  }

  return ws;
}

// ─── Hoja 3: Seguimientos ────────────────────────────────────────────────────
function buildSeguimientos(wb: ExcelJS.Workbook, rows: HallazgoExportRow[]) {
  const ws = wb.addWorksheet('Seguimientos', {
    views: [{ state: 'frozen', ySplit: 1 }],
    properties: { tabColor: { argb: XL.green } },
  });

  const headers = ['N° hallazgo', 'Empresa', 'Planta', 'Clase', 'Estado', 'N° seg.', 'Fecha', '% cumplimiento', 'Observación'];
  const widths = [12, 30, 22, 8, 14, 9, 13, 14, 60];

  headers.forEach((h, i) => {
    const c = ws.getCell(1, i + 1);
    c.value = h;
    c.fill = solid(XL.green);
    c.font = { bold: true, size: 9, color: { argb: XL.white } };
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    c.border = thinBorder(XL.green);
    ws.getColumn(i + 1).width = widths[i];
  });
  ws.getRow(1).height = 26;

  let r = 2;
  rows.forEach(h => {
    h.seguimientos.forEach((s, i) => {
      const valores: (string | number)[] = [
        h.numero,
        h.empresa,
        h.planta,
        h.clase,
        estadoDe(h),
        i + 1,
        fmtFecha(s.fecha),
        (s.porcentaje ?? 0) / 100,
        s.observacion ?? '',
      ];
      valores.forEach((v, ci) => {
        const c = ws.getCell(r, ci + 1);
        c.value = v;
        c.font = { size: 9 };
        c.alignment = { vertical: 'top', horizontal: typeof v === 'number' ? 'center' : 'left' };
        c.border = thinBorder();
        if (ci === 7) c.numFmt = '0%';
        if (r % 2 === 1) c.fill = solid(XL.grayLight);
      });
      r++;
    });
  });

  if (r === 2) {
    ws.mergeCells(2, 1, 2, headers.length);
    const c = ws.getCell(2, 1);
    c.value = 'No hay seguimientos registrados en los hallazgos exportados.';
    c.font = { size: 9, italic: true, color: { argb: XL.gray } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
  } else {
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: headers.length } };
  }

  return ws;
}

// ─── Hoja 4: Análisis por planta ─────────────────────────────────────────────
function buildAnalisisPlanta(wb: ExcelJS.Workbook, rows: HallazgoExportRow[]) {
  const ws = wb.addWorksheet('Análisis por Planta', {
    views: [{ showGridLines: false }],
    properties: { tabColor: { argb: XL.violet } },
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });

  const LAST = 12;
  ws.getColumn(1).width = 30;
  ws.getColumn(2).width = 26;
  for (let c = 3; c <= LAST; c++) ws.getColumn(c).width = 12;

  let row = drawBanner(ws, {
    title: 'Análisis por Empresa y Planta',
    subtitle: 'Distribución de hallazgos, criticidad y avance del plan de acción',
    lastCol: LAST,
  });

  const grupos = new Map<string, HallazgoExportRow[]>();
  rows.forEach(h => {
    const k = `${(h.empresa || 'Sin especificar').trim()}||${(h.planta || 'Sin especificar').trim()}`;
    grupos.set(k, [...(grupos.get(k) ?? []), h]);
  });

  const filas = [...grupos.entries()]
    .map(([clave, items]) => {
      const [empresa, planta] = clave.split('||');
      const cer = items.filter(estaCerrado).length;
      return [
        empresa,
        planta,
        items.length,
        items.filter(h => h.clase === 'A').length,
        items.filter(h => h.clase === 'B').length,
        items.filter(h => h.clase === 'C').length,
        items.length - cer,
        cer,
        items.length > 0 ? cer / items.length : 0,
        Math.round(items.reduce((s, h) => s + cumplimientoDe(h), 0) / items.length) / 100,
        items.filter(h => h.clase === 'A' && !estaCerrado(h)).length,
        bar(items.length, Math.max(...[...grupos.values()].map(g => g.length)), 12),
      ] as (string | number)[];
    })
    .sort((a, b) => (b[2] as number) - (a[2] as number));

  row = drawSectionTitle(ws, row, 'Matriz empresa / planta', LAST, XL.violet);
  row = drawTable(ws, row,
    ['Empresa', 'Planta', 'Total', 'Clase A', 'Clase B', 'Clase C', 'Abiertos', 'Cerrados', '% cierre', 'Cumplimiento prom.', 'Clase A abiertos', ''],
    filas,
    {
      headerColor: XL.violet,
      align: ['left', 'left', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'left'],
      numFmt: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, '0%', '0%', undefined, undefined],
    });

  drawNote(ws, row,
    'Las filas están ordenadas por cantidad de hallazgos. "Clase A abiertos" es el indicador de atención prioritaria: hallazgos de intervención inmediata que siguen sin cerrarse.',
    LAST);

  return ws;
}

// ─── API ─────────────────────────────────────────────────────────────────────

/** Genera el libro gerencial de hallazgos (.xlsx). */
export async function buildHallazgosReport(
  rows: HallazgoExportRow[],
  meta: ReportMeta,
): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'SGTC Móvil';
  wb.created = new Date();

  buildResumen(wb, rows, meta);
  buildDatos(wb, rows);
  buildSeguimientos(wb, rows);
  buildAnalisisPlanta(wb, rows);

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
