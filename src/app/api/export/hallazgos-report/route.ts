import { NextResponse } from 'next/server';
import {
  buildHallazgosReport,
  type HallazgoExportRow,
  type ReportMeta,
} from '@/lib/excel-hallazgos-report';

export const runtime = 'nodejs';

interface Payload {
  rows: HallazgoExportRow[];
  meta: ReportMeta;
}

/**
 * Reporte gerencial de hallazgos en Excel.
 *
 * Recibe los hallazgos ya filtrados y ordenados por el cliente (exactamente lo
 * que el usuario ve en pantalla) y devuelve el libro con resumen ejecutivo,
 * base de datos, seguimientos y análisis por planta.
 *
 * Se genera en el servidor porque ExcelJS es pesado para el bundle del cliente
 * y porque el formato (estilos, formatos condicionales) no lo soporta `xlsx`.
 */
export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<Payload>;

    if (!Array.isArray(payload.rows)) {
      return NextResponse.json({ error: 'Payload inválido: falta "rows".' }, { status: 400 });
    }
    if (payload.rows.length === 0) {
      return NextResponse.json({ error: 'No hay hallazgos para exportar.' }, { status: 400 });
    }

    const meta: ReportMeta = {
      generadoPor: payload.meta?.generadoPor?.trim() || 'Usuario del sistema',
      filtros: Array.isArray(payload.meta?.filtros) ? payload.meta!.filtros : [],
    };

    const buffer = await buildHallazgosReport(payload.rows, meta);

    const fecha = new Date().toISOString().slice(0, 10);
    const filename = `Reporte_Hallazgos_SGTC_${fecha}.xlsx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Export] Error generando reporte de hallazgos:', err);
    return NextResponse.json({ error: 'No se pudo generar el reporte.' }, { status: 500 });
  }
}
