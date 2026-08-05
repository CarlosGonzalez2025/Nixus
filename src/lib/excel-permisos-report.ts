// lib/excel-permisos-report.ts
// Reporte gerencial de permisos de trabajo en Excel: resumen ejecutivo con KPIs,
// base de datos completa, matriz de firmas y aprobaciones, y análisis por planta.
// Generado con ExcelJS.
//
// Nota: no se usan reglas `dataBar` de formato condicional. ExcelJS las serializa
// sin el elemento <color> que exige el esquema OOXML y con un <x14:id/> vacío,
// lo que hace que Excel pida reparar el archivo (ver Sesión 17 del HANDOFF).
import ExcelJS from 'exceljs';
import {
  XL, solid, thinBorder, bar,
  drawBanner, drawSectionTitle, drawSectionTitleRange, drawKpiRow, drawTable, drawNote,
} from './excel-theme';

// ─── Contrato de entrada ─────────────────────────────────────────────────────
// El cliente envía los permisos ya filtrados y ordenados (lo que el usuario ve),
// con las etiquetas de estado y de rol ya resueltas: la lógica de qué firma se
// exige a cada permiso vive en el módulo, no aquí.

export interface PermisoAprobacionExport {
  rol: string;
  requerido: boolean;
  estado: string;
  firmante: string;
  fechaFirma: string;
  firmaApertura?: string;
  firmaCierre?: string;
}

export interface PermisoExportRow {
  numero: string;
  estado: string;
  estadoRaw: string;
  categoria: string;
  fechaCreacion?: string | null;
  validFrom?: string;
  validUntil?: string;
  tiposTrabajo: string[];
  empresa: string;
  planta: string;
  ciudad: string;
  areaEspecifica: string;
  proceso: string;
  contrato: string;
  descripcion: string;
  numTrabajadores?: number;
  trabajadoresRegistrados: number;
  solicitanteNombre: string;
  solicitanteEmail: string;
  aprobaciones: PermisoAprobacionExport[];
  anexos: string[];
  cierreFecha?: string;
  cierreHora?: string;
  cierreObservaciones?: string;
  areaDespejada?: string;
  continuaLabor?: string;
  suspendidoPor?: string;
  suspendidoEl?: string | null;
  motivoSuspension?: string;
  rechazoMotivo?: string;
}

export interface PermisosReportMeta {
  generadoPor: string;
  filtros: string[];
}

// ─── Helpers de dominio ──────────────────────────────────────────────────────
const CATEGORIAS = ['Borrador', 'Pendiente', 'Activos', 'Cerrado', 'Cancelado'] as const;

const CATEGORIA_COLOR: Record<string, string> = {
  Borrador: XL.gray,
  Pendiente: XL.amber,
  Activos: XL.blue,
  Cerrado: XL.green,
  Cancelado: XL.red,
};

const TIPOS_ALTO_RIESGO = ['Alturas', 'Confinados', 'Trabajo en Caliente', 'Energías', 'Izaje', 'Excavaciones'];

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

const esAltoRiesgo = (p: PermisoExportRow) =>
  p.tiposTrabajo.some(t => TIPOS_ALTO_RIESGO.includes(t));

function contar(valores: string[]): [string, number][] {
  const mapa = new Map<string, number>();
  valores.forEach(v => mapa.set(v, (mapa.get(v) ?? 0) + 1));
  return [...mapa.entries()].sort((a, b) => b[1] - a[1]);
}

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

/** Celda de enlace a una firma alojada en Storage. */
function celdaFirma(url?: string, etiqueta = 'Ver firma'): ExcelJS.CellValue {
  if (!url || !/^https?:\/\//i.test(url)) return '—';
  return { text: etiqueta, hyperlink: url };
}

// ─── Hoja 1: Resumen Ejecutivo ───────────────────────────────────────────────
function buildResumen(
  wb: ExcelJS.Workbook,
  rows: PermisoExportRow[],
  meta: PermisosReportMeta,
) {
  const ws = wb.addWorksheet('Resumen Ejecutivo', {
    views: [{ showGridLines: false }],
    properties: { tabColor: { argb: XL.navy } },
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });

  const LAST = 15;
  ws.getColumn(1).width = 32;
  for (let c = 2; c <= LAST; c++) ws.getColumn(c).width = 11;

  const hoy = new Date();
  const total = rows.length;
  const porCategoria = (cat: string) => rows.filter(p => p.categoria === cat).length;
  const borradores = porCategoria('Borrador');
  const activos = porCategoria('Activos');
  const cerrados = porCategoria('Cerrado');
  const cancelados = porCategoria('Cancelado');
  const pendientes = porCategoria('Pendiente');

  // La tasa de cierre excluye borradores: no son permisos que se puedan cerrar.
  const gestionables = total - borradores;
  const suspendidos = rows.filter(p => p.estadoRaw === 'suspendido').length;
  const trabajadores = rows.reduce((s, p) => s + (p.numTrabajadores ?? 0), 0);
  const altoRiesgo = rows.filter(esAltoRiesgo).length;

  const firmasRequeridas = rows.reduce((s, p) => s + p.aprobaciones.filter(a => a.requerido).length, 0);
  const firmasPendientes = rows.reduce(
    (s, p) => s + p.aprobaciones.filter(a => a.requerido && a.estado === 'Pendiente').length, 0);

  let row = drawBanner(ws, {
    title: 'Reporte Gerencial de Permisos de Trabajo',
    subtitle: 'SGTC Móvil — Sistema de Gestión de Tareas de Alto Riesgo',
    meta: `Generado por ${meta.generadoPor}  ·  ${hoy.toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short' })}  ·  ${total} permiso(s)  ·  Filtros: ${meta.filtros.join(' | ') || 'ninguno'}`,
    lastCol: LAST,
  });

  // ── KPIs ──
  row = drawSectionTitle(ws, row, 'Indicadores clave', LAST);
  row = drawKpiRow(ws, row, [
    { label: 'TOTAL PERMISOS', value: total, color: XL.navy },
    { label: 'ACTIVOS', value: activos, color: XL.blue, hint: 'Aprobado + En ejecución + Suspendido' },
    { label: 'PENDIENTES', value: pendientes, color: XL.amber, hint: 'Esperando revisión' },
    { label: 'CERRADOS', value: cerrados, color: XL.green },
    { label: 'CANCELADOS', value: cancelados, color: XL.red, hint: 'Cancelado + Rechazado' },
  ], 3);

  row = drawKpiRow(ws, row, [
    {
      label: 'TASA DE CIERRE',
      value: gestionables > 0 ? `${Math.round((cerrados / gestionables) * 100)}%` : '—',
      color: XL.navySoft,
      hint: 'Cerrados sobre permisos no borrador',
    },
    { label: 'SUSPENDIDOS', value: suspendidos, color: XL.amber, hint: 'Actualmente detenidos' },
    { label: 'ALTO RIESGO', value: altoRiesgo, color: XL.violet, hint: 'Con al menos una tarea crítica' },
    { label: 'TRABAJADORES', value: trabajadores, color: XL.gray, hint: 'Suma declarada en los permisos' },
    {
      label: 'FIRMAS PENDIENTES',
      value: firmasPendientes,
      color: firmasPendientes > 0 ? XL.red : XL.green,
      hint: `De ${firmasRequeridas} requeridas`,
    },
  ], 3);

  // ── Distribuciones lado a lado ──
  const filaDist = row;
  const PCT = '0%';

  let r1 = drawSectionTitleRange(ws, filaDist, 'Por categoría', 1, 4, XL.navy);
  r1 = drawTable(ws, r1, ['Categoría', 'N°', '%', ''],
    filasDistribucion(CATEGORIAS.map(c => [c, porCategoria(c)] as [string, number]), total),
    { startCol: 1, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [32, 8, 8, 22] });

  let r2 = drawSectionTitleRange(ws, filaDist, 'Por estado detallado', 6, 9, XL.blue);
  r2 = drawTable(ws, r2, ['Estado', 'N°', '%', ''],
    filasDistribucion(contar(rows.map(p => p.estado)), total),
    { startCol: 6, headerColor: XL.blue, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [24, 8, 8, 22] });

  let r3 = drawSectionTitleRange(ws, filaDist, 'Por tipo de trabajo', 11, 14, XL.violet);
  r3 = drawTable(ws, r3, ['Tipo de trabajo', 'N°', '% del total', ''],
    filasDistribucion(contar(rows.flatMap(p => p.tiposTrabajo)), total),
    { startCol: 11, headerColor: XL.violet, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [26, 8, 10, 22] });

  row = Math.max(r1, r2, r3);

  // ── Firmas por rol, anexos y tendencia ──
  const filaFirmas = row;

  const roles = [...new Set(rows.flatMap(p => p.aprobaciones.map(a => a.rol)))];
  const firmasPorRol = roles.map(rol => {
    const requeridas = rows.filter(p => p.aprobaciones.some(a => a.rol === rol && a.requerido));
    const firmadas = requeridas.filter(p =>
      p.aprobaciones.some(a => a.rol === rol && a.estado === 'Aprobado')).length;
    return {
      rol,
      requeridas: requeridas.length,
      firmadas,
      avance: requeridas.length > 0 ? firmadas / requeridas.length : 0,
    };
  }).sort((a, b) => b.requeridas - a.requeridas);

  let r4 = drawSectionTitleRange(ws, filaFirmas, 'Avance de firmas por rol', 1, 6, XL.green);
  r4 = drawTable(ws, r4, ['Rol', 'Requeridas', 'Firmadas', 'Avance', 'Faltantes', ''],
    firmasPorRol.map(f => [
      f.rol, f.requeridas, f.firmadas, f.avance, f.requeridas - f.firmadas,
      bar(f.firmadas, f.requeridas, 12),
    ]),
    {
      startCol: 1, headerColor: XL.green,
      align: ['left', 'center', 'center', 'center', 'center', 'left'],
      numFmt: [undefined, undefined, undefined, PCT, undefined, undefined],
      widths: [32, 11, 11, 10, 11, 16],
    });

  let r5 = drawSectionTitleRange(ws, filaFirmas, 'Anexos diligenciados', 8, 11, XL.navySoft);
  r5 = drawTable(ws, r5, ['Anexo', 'N°', '% del total', ''],
    filasDistribucion(contar(rows.flatMap(p => p.anexos)), total),
    { startCol: 8, align: ['left', 'center', 'center', 'left'], numFmt: [undefined, undefined, PCT, undefined], widths: [26, 8, 10, 20] });

  // Tendencia mensual
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
    const delMes = rows.filter(p => claveMes(p.fechaCreacion) === m.clave);
    return {
      etiqueta: m.etiqueta,
      total: delMes.length,
      cerrados: delMes.filter(p => p.categoria === 'Cerrado').length,
      altoRiesgo: delMes.filter(esAltoRiesgo).length,
    };
  });
  const maxMes = Math.max(...tendencia.map(t => t.total), 0);

  let r6 = drawSectionTitleRange(ws, filaFirmas, 'Tendencia últimos 12 meses', 13, 15, XL.blue);
  r6 = drawTable(ws, r6, ['Mes', 'Creados', 'Cerrados', ''],
    tendencia.map(t => [t.etiqueta, t.total, t.cerrados, bar(t.total, maxMes, 10)]),
    { startCol: 13, headerColor: XL.blue, align: ['left', 'center', 'center', 'left'], widths: [12, 10, 10, 14] });

  row = Math.max(r4, r5, r6);

  // ── Rankings ──
  const ranking = (campo: 'empresa' | 'planta' | 'ciudad') => {
    const grupos = new Map<string, PermisoExportRow[]>();
    rows.forEach(p => {
      const k = (p[campo] || '').trim() || 'Sin especificar';
      grupos.set(k, [...(grupos.get(k) ?? []), p]);
    });
    return [...grupos.entries()]
      .map(([nombre, items]) => ({
        nombre,
        total: items.length,
        activos: items.filter(p => p.categoria === 'Activos').length,
        cerrados: items.filter(p => p.categoria === 'Cerrado').length,
        cancelados: items.filter(p => p.categoria === 'Cancelado').length,
        altoRiesgo: items.filter(esAltoRiesgo).length,
      }))
      .sort((a, b) => b.total - a.total);
  };

  const filaRanking = row;
  const empresas = ranking('empresa');
  let r7 = drawSectionTitleRange(ws, filaRanking, 'Top 10 empresas', 1, 7, XL.navy);
  r7 = drawTable(ws, r7,
    ['Empresa', 'Total', 'Activos', 'Cerrados', 'Cancelados', 'Alto riesgo', ''],
    empresas.slice(0, 10).map(e => [
      e.nombre, e.total, e.activos, e.cerrados, e.cancelados, e.altoRiesgo,
      bar(e.total, empresas[0]?.total ?? 0, 12),
    ]),
    { startCol: 1, align: ['left', 'center', 'center', 'center', 'center', 'center', 'left'], widths: [32, 9, 10, 10, 11, 11, 16] });

  const plantas = ranking('planta');
  let r8 = drawSectionTitleRange(ws, filaRanking, 'Top 10 plantas', 9, 15, XL.navy);
  r8 = drawTable(ws, r8,
    ['Planta', 'Total', 'Activos', 'Cerrados', 'Cancelados', 'Alto riesgo', ''],
    plantas.slice(0, 10).map(p => [
      p.nombre, p.total, p.activos, p.cerrados, p.cancelados, p.altoRiesgo,
      bar(p.total, plantas[0]?.total ?? 0, 12),
    ]),
    { startCol: 9, align: ['left', 'center', 'center', 'center', 'center', 'center', 'left'], widths: [26, 9, 10, 10, 11, 11, 16] });

  row = Math.max(r7, r8);

  drawNote(ws, row,
    'La tasa de cierre excluye los borradores, que no son permisos ejecutables. "Alto riesgo" son los permisos con al menos una tarea de alturas, espacios confinados, trabajo en caliente, energías peligrosas, izaje o excavaciones. "Firmas pendientes" cuenta únicamente las aprobaciones exigidas a cada permiso según sus tipos de trabajo.',
    LAST);

  return ws;
}

// ─── Hoja 2: Permisos ────────────────────────────────────────────────────────
function buildDatos(wb: ExcelJS.Workbook, rows: PermisoExportRow[]) {
  const ws = wb.addWorksheet('Permisos', {
    views: [{ state: 'frozen', xSplit: 2, ySplit: 1 }],
    properties: { tabColor: { argb: XL.blue } },
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });

  const columnas: {
    header: string;
    width: number;
    get: (p: PermisoExportRow) => ExcelJS.CellValue;
  }[] = [
    { header: 'N° Permiso', width: 20, get: p => p.numero },
    { header: 'Estado', width: 20, get: p => p.estado },
    { header: 'Categoría', width: 13, get: p => p.categoria },
    { header: 'Fecha creación', width: 15, get: p => fmtFecha(p.fechaCreacion) },
    { header: 'Vigencia desde', width: 15, get: p => p.validFrom || '' },
    { header: 'Vigencia hasta', width: 15, get: p => p.validUntil || '' },
    { header: 'Tipos de trabajo', width: 34, get: p => p.tiposTrabajo.join(' | ') },
    { header: 'Alto riesgo', width: 11, get: p => (esAltoRiesgo(p) ? 'Sí' : 'No') },
    { header: 'Empresa', width: 30, get: p => p.empresa },
    { header: 'Planta', width: 24, get: p => p.planta },
    { header: 'Ciudad', width: 18, get: p => p.ciudad },
    { header: 'Área específica', width: 28, get: p => p.areaEspecifica },
    { header: 'Proceso', width: 22, get: p => p.proceso },
    { header: 'Contrato', width: 20, get: p => p.contrato },
    { header: 'Descripción del trabajo', width: 55, get: p => p.descripcion },
    { header: 'N° trabajadores', width: 14, get: p => p.numTrabajadores ?? '' },
    { header: 'Trabajadores registrados', width: 15, get: p => p.trabajadoresRegistrados },
    { header: 'Solicitante', width: 26, get: p => p.solicitanteNombre },
    { header: 'Email solicitante', width: 32, get: p => p.solicitanteEmail },
    { header: 'Anexos', width: 30, get: p => p.anexos.join(' | ') },
    { header: 'Firmas requeridas', width: 14, get: p => p.aprobaciones.filter(a => a.requerido).length },
    { header: 'Firmas obtenidas', width: 14, get: p => p.aprobaciones.filter(a => a.estado === 'Aprobado').length },
    { header: 'Firmas pendientes', width: 14, get: p => p.aprobaciones.filter(a => a.requerido && a.estado === 'Pendiente').length },
    { header: 'Fecha cierre', width: 14, get: p => p.cierreFecha || '' },
    { header: 'Hora cierre', width: 12, get: p => p.cierreHora || '' },
    { header: 'Área despejada', width: 14, get: p => p.areaDespejada || '' },
    { header: 'Continúa labor', width: 14, get: p => p.continuaLabor || '' },
    { header: 'Observaciones de cierre', width: 45, get: p => p.cierreObservaciones || '' },
    { header: 'Suspendido por', width: 24, get: p => p.suspendidoPor || '' },
    { header: 'Motivo de suspensión', width: 40, get: p => p.motivoSuspension || '' },
    { header: 'Motivo de rechazo', width: 40, get: p => p.rechazoMotivo || '' },
  ];

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

  rows.forEach((p, ri) => {
    const r = ri + 2;
    columnas.forEach((col, ci) => {
      const c = ws.getCell(r, ci + 1);
      c.value = col.get(p);
      c.font = { size: 9 };
      c.alignment = { vertical: 'top', horizontal: typeof c.value === 'number' ? 'center' : 'left' };
      c.border = thinBorder();
      if (ri % 2 === 1) c.fill = solid(XL.grayLight);
    });

    // Semáforo por categoría
    const cat = ws.getCell(r, 3);
    cat.font = { size: 9, bold: true, color: { argb: CATEGORIA_COLOR[p.categoria] ?? XL.gray } };
    cat.alignment = { vertical: 'top', horizontal: 'center' };

    // Resaltar permisos con firmas pendientes
    const pendientes = p.aprobaciones.filter(a => a.requerido && a.estado === 'Pendiente').length;
    if (pendientes > 0) {
      const cell = ws.getCell(r, 23);
      cell.font = { size: 9, bold: true, color: { argb: XL.red } };
      cell.alignment = { vertical: 'top', horizontal: 'center' };
    }
  });

  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columnas.length } };
  return ws;
}

// ─── Hoja 3: Firmas y aprobaciones ───────────────────────────────────────────
function buildFirmas(wb: ExcelJS.Workbook, rows: PermisoExportRow[]) {
  const ws = wb.addWorksheet('Firmas y Aprobaciones', {
    views: [{ state: 'frozen', ySplit: 1 }],
    properties: { tabColor: { argb: XL.green } },
  });

  const headers = [
    'N° Permiso', 'Estado del permiso', 'Empresa', 'Planta', 'Rol',
    '¿Requerida?', 'Estado de la firma', 'Firmante', 'Fecha de firma',
    'Firma apertura', 'Firma cierre',
  ];
  const widths = [20, 20, 30, 24, 24, 12, 16, 26, 18, 14, 14];

  headers.forEach((h, i) => {
    const c = ws.getCell(1, i + 1);
    c.value = h;
    c.fill = solid(XL.green);
    c.font = { bold: true, size: 9, color: { argb: XL.white } };
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    c.border = thinBorder(XL.green);
    ws.getColumn(i + 1).width = widths[i];
  });
  ws.getRow(1).height = 28;

  const COLOR_FIRMA: Record<string, string> = {
    Aprobado: XL.green,
    Rechazado: XL.red,
    Pendiente: XL.amber,
    'No Aplica': XL.gray,
  };

  let r = 2;
  rows.forEach(p => {
    p.aprobaciones.forEach(a => {
      const valores: ExcelJS.CellValue[] = [
        p.numero, p.estado, p.empresa, p.planta, a.rol,
        a.requerido ? 'Sí' : 'No', a.estado, a.firmante || '', a.fechaFirma || '',
        celdaFirma(a.firmaApertura, 'Apertura'),
        celdaFirma(a.firmaCierre, 'Cierre'),
      ];
      valores.forEach((v, ci) => {
        const c = ws.getCell(r, ci + 1);
        c.value = v;
        c.font = { size: 9 };
        c.alignment = { vertical: 'top', horizontal: ci >= 5 ? 'center' : 'left' };
        c.border = thinBorder();
        if (r % 2 === 1) c.fill = solid(XL.grayLight);
        if (typeof v === 'object' && v !== null && 'hyperlink' in v) {
          c.font = { size: 9, color: { argb: XL.blue }, underline: true };
        }
      });
      const estadoCell = ws.getCell(r, 7);
      estadoCell.font = { size: 9, bold: true, color: { argb: COLOR_FIRMA[a.estado] ?? XL.gray } };
      r++;
    });
  });

  if (r === 2) {
    ws.mergeCells(2, 1, 2, headers.length);
    const c = ws.getCell(2, 1);
    c.value = 'No hay aprobaciones registradas en los permisos exportados.';
    c.font = { size: 9, italic: true, color: { argb: XL.gray } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
  } else {
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: headers.length } };
  }

  return ws;
}

// ─── Hoja 4: Análisis por planta ─────────────────────────────────────────────
function buildAnalisisPlanta(wb: ExcelJS.Workbook, rows: PermisoExportRow[]) {
  const ws = wb.addWorksheet('Análisis por Planta', {
    views: [{ showGridLines: false }],
    properties: { tabColor: { argb: XL.violet } },
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });

  const LAST = 13;
  ws.getColumn(1).width = 30;
  ws.getColumn(2).width = 24;
  ws.getColumn(3).width = 18;
  for (let c = 4; c <= LAST; c++) ws.getColumn(c).width = 12;

  let row = drawBanner(ws, {
    title: 'Análisis por Empresa, Planta y Ciudad',
    subtitle: 'Volumen de permisos, criticidad y avance de firmas',
    lastCol: LAST,
  });

  const grupos = new Map<string, PermisoExportRow[]>();
  rows.forEach(p => {
    const k = [
      (p.empresa || 'Sin especificar').trim(),
      (p.planta || 'Sin especificar').trim(),
      (p.ciudad || 'Sin especificar').trim(),
    ].join('||');
    grupos.set(k, [...(grupos.get(k) ?? []), p]);
  });

  const maxTotal = Math.max(...[...grupos.values()].map(g => g.length), 0);

  const filas = [...grupos.entries()]
    .map(([clave, items]) => {
      const [empresa, planta, ciudad] = clave.split('||');
      const cerrados = items.filter(p => p.categoria === 'Cerrado').length;
      const gestionables = items.filter(p => p.categoria !== 'Borrador').length;
      const req = items.reduce((s, p) => s + p.aprobaciones.filter(a => a.requerido).length, 0);
      const pend = items.reduce(
        (s, p) => s + p.aprobaciones.filter(a => a.requerido && a.estado === 'Pendiente').length, 0);
      return [
        empresa, planta, ciudad,
        items.length,
        items.filter(p => p.categoria === 'Activos').length,
        items.filter(p => p.categoria === 'Pendiente').length,
        cerrados,
        items.filter(p => p.categoria === 'Cancelado').length,
        gestionables > 0 ? cerrados / gestionables : 0,
        items.filter(esAltoRiesgo).length,
        pend,
        req > 0 ? (req - pend) / req : 0,
        bar(items.length, maxTotal, 12),
      ] as (string | number)[];
    })
    .sort((a, b) => (b[3] as number) - (a[3] as number));

  row = drawSectionTitle(ws, row, 'Matriz empresa / planta / ciudad', LAST, XL.violet);
  row = drawTable(ws, row,
    ['Empresa', 'Planta', 'Ciudad', 'Total', 'Activos', 'Pendientes', 'Cerrados', 'Cancelados', '% cierre', 'Alto riesgo', 'Firmas pend.', '% firmado', ''],
    filas,
    {
      headerColor: XL.violet,
      align: ['left', 'left', 'left', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'left'],
      numFmt: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, '0%', undefined, undefined, '0%', undefined],
    });

  drawNote(ws, row,
    'Ordenado por volumen de permisos. "% cierre" excluye borradores. "Firmas pend." son aprobaciones exigidas que siguen sin resolverse: es el indicador de cuellos de botella en la autorización.',
    LAST);

  return ws;
}

// ─── API ─────────────────────────────────────────────────────────────────────

/** Genera el libro gerencial de permisos de trabajo (.xlsx). */
export async function buildPermisosReport(
  rows: PermisoExportRow[],
  meta: PermisosReportMeta,
): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'SGTC Móvil';
  wb.created = new Date();

  buildResumen(wb, rows, meta);
  buildDatos(wb, rows);
  buildFirmas(wb, rows);
  buildAnalisisPlanta(wb, rows);

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
