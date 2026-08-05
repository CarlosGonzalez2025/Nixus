import { NextResponse } from 'next/server';
import {
  buildPermisosReport,
  type PermisoExportRow,
  type PermisosReportMeta,
} from '@/lib/excel-permisos-report';

export const runtime = 'nodejs';

interface Payload {
  rows: PermisoExportRow[];
  meta: PermisosReportMeta;
}

/**
 * Reporte gerencial de permisos de trabajo en Excel.
 *
 * Recibe los permisos ya filtrados y ordenados por el cliente (lo que el usuario
 * ve, con las etiquetas de estado y las firmas exigidas ya resueltas) y devuelve
 * el libro con resumen ejecutivo, base de datos, firmas y análisis por planta.
 */
export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<Payload>;

    if (!Array.isArray(payload.rows)) {
      return NextResponse.json({ error: 'Payload inválido: falta "rows".' }, { status: 400 });
    }
    if (payload.rows.length === 0) {
      return NextResponse.json({ error: 'No hay permisos para exportar.' }, { status: 400 });
    }

    const meta: PermisosReportMeta = {
      generadoPor: payload.meta?.generadoPor?.trim() || 'Usuario del sistema',
      filtros: Array.isArray(payload.meta?.filtros) ? payload.meta!.filtros : [],
    };

    const buffer = await buildPermisosReport(payload.rows, meta);

    const fecha = new Date().toISOString().slice(0, 10);
    const filename = `Reporte_Permisos_SGTC_${fecha}.xlsx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[Export] Error generando reporte de permisos:', err);
    return NextResponse.json({ error: 'No se pudo generar el reporte.' }, { status: 500 });
  }
}
