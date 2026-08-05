import { NextResponse } from 'next/server';
import { buildHallazgosTemplate } from '@/lib/excel-hallazgos-template';

export const runtime = 'nodejs';

/**
 * Plantilla oficial de importación masiva de hallazgos.
 * La construcción (columnas, listas desplegables, validaciones e instrucciones)
 * vive en `@/lib/excel-hallazgos-template`.
 */
export async function GET() {
  try {
    const buffer = await buildHallazgosTemplate();

    const fecha = new Date().toISOString().slice(0, 10);
    const filename = `Plantilla_Hallazgos_SGTC_${fecha}.xlsx`;

    return new NextResponse(new Uint8Array(buffer), {
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
