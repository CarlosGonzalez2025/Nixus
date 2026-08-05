import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

// ─── Definición de columnas ────────────────────────────────────────────────────

const COLUMNAS: {
  key: string;
  label: string;
  requerido: boolean;
  ejemplo: string;
  nota?: string;
}[] = [
  // Información General
  { key: 'empresa',              label: 'Empresa',                    requerido: true,  ejemplo: 'Italcol de Occidente S.A.S.' },
  { key: 'planta',               label: 'Planta',                     requerido: true,  ejemplo: 'Planta Mosquera' },
  { key: 'area',                 label: 'Área',                       requerido: true,  ejemplo: 'Silo de almacenamiento' },
  { key: 'tipoActividad',        label: 'Tipo de Actividad',          requerido: true,  ejemplo: 'Rutinario',        nota: 'Rutinario | No Rutinario' },
  { key: 'tipoHallazgo',         label: 'Tipo de Hallazgo',           requerido: false, ejemplo: 'Seguimiento',      nota: 'Positivo | Seguimiento' },
  { key: 'responsabilidad',      label: 'Responsabilidad',            requerido: false, ejemplo: 'Directa',          nota: 'Directa | Corporativa' },
  { key: 'fechaVisita',          label: 'Fecha de Visita',            requerido: true,  ejemplo: '27/05/2026',       nota: 'dd/mm/aaaa' },
  { key: 'latitud',              label: 'Latitud (Geo)',              requerido: true,  ejemplo: '4.710989',         nota: 'Capturado automáticamente por la app' },
  { key: 'longitud',             label: 'Longitud (Geo)',             requerido: true,  ejemplo: '-74.072090',       nota: 'Capturado automáticamente por la app' },
  { key: 'peligroInspeccionado', label: 'Peligro(s) Inspeccionado(s)',requerido: true,  ejemplo: 'Alturas, Energías Peligrosas', nota: 'Alturas | Espacios Confinados | Energías Peligrosas | Izaje de Cargas | Excavaciones | Otros (separar con coma)' },
  { key: 'personalExpuesto',     label: 'Personal Expuesto',          requerido: true,  ejemplo: 'Propio',           nota: 'Propio | Contratistas (o ambos separados con coma)' },

  // Evidencia
  { key: 'hallazgo',             label: 'Descripción del Hallazgo',   requerido: true,  ejemplo: 'Trabajador realiza labor en altura sin arnés anclado al punto de anclaje certificado.' },

  // Clasificación
  { key: 'clase',                label: 'Clase del Hallazgo',         requerido: true,  ejemplo: 'A',                nota: 'A = Inmediata | B = Pronta | C = Posterior' },
  { key: 'intervencion',         label: 'Tipo de Intervención',       requerido: true,  ejemplo: 'Inmediata',        nota: 'Inmediata | Pronta | Posterior (se asigna automáticamente según la clase)' },
  { key: 'descripcion',          label: 'Detalle de Recomendaciones', requerido: true,  ejemplo: 'Detener la actividad de inmediato. Suministrar arnés certificado y verificar punto de anclaje antes de continuar.' },
  { key: 'accionInmediata',      label: 'Acción Inmediata',           requerido: false, ejemplo: 'Se suspendió la actividad y se informó al supervisor del área.' },

  // Reportado por
  { key: 'reportadoPorNombre',   label: 'Nombre del Reportador',      requerido: true,  ejemplo: 'Carlos González' },
  { key: 'reportadoPorCargo',    label: 'Cargo del Reportador',       requerido: true,  ejemplo: 'Líder SST' },

  // Plan de acción (todos opcionales)
  { key: 'responsable',               label: 'Responsable (Plan de Acción)',    requerido: false, ejemplo: 'Juan Pérez' },
  { key: 'fechaMedidaImplementada',   label: 'Fecha Medida Implementada',       requerido: false, ejemplo: '30/05/2026',  nota: 'dd/mm/aaaa' },
  { key: 'fechaSeguimiento1',         label: 'Fecha de Seguimiento',            requerido: false, ejemplo: '05/06/2026',  nota: 'dd/mm/aaaa' },
  { key: 'porcentajeCumplimiento',    label: '% de Cumplimiento',               requerido: false, ejemplo: '50',          nota: 'Número entre 0 y 100' },
  { key: 'evidenciasPlanAccion',      label: 'Evidencias Plan de Acción (URLs)',requerido: false, ejemplo: 'https://storage.example.com/foto1.jpg', nota: 'URLs separadas por coma. Las fotos se suben desde la app.' },
  { key: 'fechaCierre',               label: 'Fecha de Cierre',                 requerido: false, ejemplo: '10/06/2026',  nota: 'dd/mm/aaaa' },
  { key: 'porcentajeCumplimientoTotal', label: '% de Cumplimiento Total',       requerido: false, ejemplo: '100',         nota: 'Número entre 0 y 100' },
  { key: 'cumplimientoEstado',        label: 'Estado del Cumplimiento',         requerido: false, ejemplo: 'Pendiente',   nota: 'Pendiente | En Progreso | Completado | Cerrado' },
  { key: 'observacion',               label: 'Observación',                     requerido: false, ejemplo: 'Se instaló línea de vida horizontal en el área de trabajo.' },
];

// ─── Estilos ───────────────────────────────────────────────────────────────────

const STYLE_HEADER_REQUIRED = {
  fill: { fgColor: { rgb: 'C62828' } },
  font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 10 },
  alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  border: { bottom: { style: 'thin', color: { rgb: '8B0000' } }, right: { style: 'thin', color: { rgb: 'FFFFFF' } } },
};

const STYLE_HEADER_OPTIONAL = {
  fill: { fgColor: { rgb: '1565C0' } },
  font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 10 },
  alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  border: { bottom: { style: 'thin', color: { rgb: '0D47A1' } }, right: { style: 'thin', color: { rgb: 'FFFFFF' } } },
};

const STYLE_EXAMPLE = {
  fill: { fgColor: { rgb: 'FFF9C4' } },
  font: { italic: true, color: { rgb: '5D4037' }, sz: 9 },
  alignment: { vertical: 'center', wrapText: true },
};

const STYLE_DATA = {
  alignment: { vertical: 'center', wrapText: true },
  border: {
    top: { style: 'thin', color: { rgb: 'E0E0E0' } },
    bottom: { style: 'thin', color: { rgb: 'E0E0E0' } },
    left: { style: 'thin', color: { rgb: 'E0E0E0' } },
    right: { style: 'thin', color: { rgb: 'E0E0E0' } },
  },
};

function cell(value: string | number, style: object): XLSX.CellObject {
  return { v: value, t: typeof value === 'number' ? 'n' : 's', s: style };
}

// ─── Hoja principal: Plantilla ─────────────────────────────────────────────────

function buildPlantillaSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const colLetters = COLUMNAS.map((_, i) => String.fromCharCode(65 + (i < 26 ? i : 0)) + (i >= 26 ? String.fromCharCode(65 + i - 26) : ''));

  // Fila 1: encabezados
  COLUMNAS.forEach((col, i) => {
    const addr = XLSX.utils.encode_cell({ r: 0, c: i });
    ws[addr] = cell(
      col.requerido ? `${col.label} *` : col.label,
      col.requerido ? STYLE_HEADER_REQUIRED : STYLE_HEADER_OPTIONAL
    );
  });

  // Fila 2: fila de ejemplo (color amarillo claro)
  COLUMNAS.forEach((col, i) => {
    const addr = XLSX.utils.encode_cell({ r: 1, c: i });
    ws[addr] = cell(col.ejemplo, STYLE_EXAMPLE);
  });

  // Filas 3–52: filas vacías para ingresar datos
  for (let r = 2; r < 52; r++) {
    COLUMNAS.forEach((_, i) => {
      const addr = XLSX.utils.encode_cell({ r, c: i });
      ws[addr] = { v: '', t: 's', s: STYLE_DATA };
    });
  }

  // Rango
  ws['!ref'] = XLSX.utils.encode_range({ r: 0, c: 0 }, { r: 51, c: COLUMNAS.length - 1 });

  // Anchos de columna
  ws['!cols'] = COLUMNAS.map((col) => {
    const maxLen = Math.max(col.label.length, col.ejemplo.length);
    return { wch: Math.min(Math.max(maxLen + 4, 18), 45) };
  });

  // Altura de fila de encabezado y ejemplo
  ws['!rows'] = [{ hpt: 40 }, { hpt: 30 }];

  // Paneles congelados: primera fila fija al hacer scroll
  ws['!freeze'] = { xSplit: 0, ySplit: 1 };

  return ws;
}

// ─── Hoja de instrucciones ─────────────────────────────────────────────────────

function buildInstruccionesSheet(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};

  const rows: [string, string][] = [
    ['CAMPO', 'DESCRIPCIÓN Y VALORES PERMITIDOS'],
    ['', ''],
    ['--- INFORMACIÓN GENERAL ---', ''],
    ['Empresa *',                    'Nombre de la empresa. Debe coincidir con las empresas registradas en la plataforma.'],
    ['Planta *',                     'Nombre de la planta o sede. Debe coincidir con las plantas registradas en la plataforma.'],
    ['Área *',                       'Área específica dentro de la planta.'],
    ['Tipo de Actividad *',          'Rutinario  |  No Rutinario'],
    ['Tipo de Hallazgo',             'Positivo  |  Seguimiento\nPositivo = observación de una buena práctica. Seguimiento = requiere plan de acción.'],
    ['Responsabilidad',              'Directa  |  Corporativa\nIndica si la corrección es responsabilidad directa del área o corporativa.'],
    ['Fecha de Visita *',            'Formato: dd/mm/aaaa  (ej: 27/05/2026)'],
    ['Latitud / Longitud *',         'Coordenadas GPS. La app las captura automáticamente. Para importación manual use decimales (ej: 4.710989).'],
    ['Peligro(s) Inspeccionado(s) *','Alturas | Espacios Confinados | Energías Peligrosas | Izaje de Cargas | Excavaciones | Otros\nPuede seleccionar varios separados por coma.'],
    ['Personal Expuesto *',          'Propio  |  Contratistas  |  Propio, Contratistas'],
    ['', ''],
    ['--- EVIDENCIA ---', ''],
    ['Descripción del Hallazgo *',   'Texto libre. Describe detalladamente la situación de riesgo identificada.'],
    ['', ''],
    ['--- CLASIFICACIÓN ---', ''],
    ['Clase del Hallazgo *',         'A = Riesgo alto — Intervención INMEDIATA\nB = Riesgo medio — Intervención PRONTA\nC = Riesgo bajo — Intervención POSTERIOR'],
    ['Tipo de Intervención *',       'Se asigna automáticamente según la clase:\nA → Inmediata  |  B → Pronta  |  C → Posterior'],
    ['Detalle de Recomendaciones *', 'Texto libre. Describe las acciones correctivas o preventivas recomendadas.'],
    ['Acción Inmediata',             'Opcional. Describe la acción que se tomó en el momento del hallazgo.'],
    ['', ''],
    ['--- REPORTADO POR ---', ''],
    ['Nombre del Reportador *',      'Nombre completo de quien reporta el hallazgo.'],
    ['Cargo del Reportador *',       'Cargo o rol de quien reporta.'],
    ['', ''],
    ['--- PLAN DE ACCIÓN (todos opcionales) ---', ''],
    ['Responsable',                  'Nombre del responsable de implementar la corrección.'],
    ['Fecha Medida Implementada',    'Fecha en que se implementó la medida correctiva. Formato: dd/mm/aaaa'],
    ['Fecha de Seguimiento',         'Fecha programada para verificar avance. Formato: dd/mm/aaaa'],
    ['% de Cumplimiento',            'Número entre 0 y 100. Porcentaje de avance del plan de acción.'],
    ['Fecha de Cierre',              'Fecha en que se cierra el hallazgo. Formato: dd/mm/aaaa'],
    ['% de Cumplimiento Total',      'Número entre 0 y 100. Porcentaje total al cierre.'],
    ['Estado del Cumplimiento',      'Pendiente  |  En Progreso  |  Completado  |  Cerrado'],
    ['Observación',                  'Texto libre. Notas adicionales sobre la implementación del plan.'],
    ['', ''],
    ['NOTA:', 'Los campos marcados con * son OBLIGATORIOS para registrar el hallazgo en la plataforma.'],
    ['',      'Las evidencias fotográficas (imágenes) solo se pueden agregar desde la app móvil.'],
    ['',      'La geolocalización se captura automáticamente al abrir el formulario en la app.'],
  ];

  rows.forEach(([campo, descripcion], r) => {
    ws[XLSX.utils.encode_cell({ r, c: 0 })] = {
      v: campo, t: 's',
      s: r === 0
        ? { fill: { fgColor: { rgb: '1A237E' } }, font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 }, alignment: { horizontal: 'center' } }
        : campo.startsWith('---')
          ? { fill: { fgColor: { rgb: 'E8EAF6' } }, font: { bold: true, color: { rgb: '283593' }, sz: 10 } }
          : campo === 'NOTA:'
            ? { font: { bold: true, color: { rgb: 'B71C1C' }, sz: 10 } }
            : { font: { sz: 10 }, alignment: { vertical: 'top' } },
    };
    ws[XLSX.utils.encode_cell({ r, c: 1 })] = {
      v: descripcion, t: 's',
      s: r === 0
        ? { fill: { fgColor: { rgb: '1A237E' } }, font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 } }
        : { font: { sz: 10 }, alignment: { vertical: 'top', wrapText: true } },
    };
  });

  ws['!ref'] = XLSX.utils.encode_range({ r: 0, c: 0 }, { r: rows.length - 1, c: 1 });
  ws['!cols'] = [{ wch: 35 }, { wch: 70 }];
  ws['!rows'] = rows.map(() => ({ hpt: 28 }));
  ws['!rows']![0] = { hpt: 36 };

  return ws;
}

// ─── Handler ───────────────────────────────────────────────────────────────────

export async function GET() {
  try {
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, buildPlantillaSheet(), 'Plantilla Hallazgos');
    XLSX.utils.book_append_sheet(wb, buildInstruccionesSheet(), 'Instrucciones');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const fecha = new Date().toISOString().slice(0, 10);
    const filename = `Plantilla_Hallazgos_SGTC_${fecha}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Export] Error generando plantilla:', err);
    return NextResponse.json({ error: 'No se pudo generar la plantilla.' }, { status: 500 });
  }
}
