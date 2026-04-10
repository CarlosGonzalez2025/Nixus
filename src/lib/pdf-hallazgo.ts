// lib/pdf-hallazgo.ts
// Generador de PDF para registros de Hallazgos de Seguridad
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Hallazgo } from '@/types';

// ─── Paleta de colores ──────────────────────────────────────────────────────
const ORANGE: [number, number, number] = [0, 34, 72];
const DARK: [number, number, number] = [30, 30, 30];
const LIGHT_GRAY: [number, number, number] = [245, 245, 245];
const MID_GRAY: [number, number, number] = [180, 180, 180];
const WHITE: [number, number, number] = [255, 255, 255];
const RED: [number, number, number] = [120, 120, 120];
const AMBER: [number, number, number] = [217, 119, 6];
const BLUE: [number, number, number] = [37, 99, 235];
const GREEN: [number, number, number] = [22, 163, 74];

const CLASE_COLOR: Record<string, [number, number, number]> = {
  A: RED,
  B: AMBER,
  C: BLUE,
};

const CLASE_LABEL: Record<string, string> = {
  A: 'CLASE A — Intervención Inmediata',
  B: 'CLASE B — Intervención Pronta',
  C: 'CLASE C — Intervención Posterior',
};

const ESTADO_COLOR: Record<string, [number, number, number]> = {
  Pendiente: AMBER,
  'En Progreso': BLUE,
  Completado: GREEN,
  Cerrado: [100, 100, 100],
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const safeDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  return null;
};

const fmt = (v: any, pattern = 'dd/MM/yyyy') => {
  const d = safeDate(v);
  return d ? format(d, pattern, { locale: es }) : '—';
};

const safe = (v: any) => (v && String(v).trim() ? String(v).trim() : '—');

const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

// ─── Función principal ───────────────────────────────────────────────────────
export async function generateHallazgoPDF(hallazgo: Hallazgo): Promise<void> {
  const logoBase64 = await fetchImageAsBase64('https://i.postimg.cc/CLg66nhr/Piloso.png');
  const helmetBase64 = await fetchImageAsBase64('https://i.postimg.cc/RZ16KqFY/Whats-App-Image-2026-02-05_at_10_19_08.jpg');
  const eviAntesBase64 = hallazgo.evidenciasFotograficas?.length 
      ? await Promise.all(hallazgo.evidenciasFotograficas.map(fetchImageAsBase64))
      : [];
  const eviDespuesBase64 = hallazgo.evidenciasPlanAccion?.length
      ? await Promise.all(hallazgo.evidenciasPlanAccion.map(fetchImageAsBase64))
      : [];

  const pdf = new jsPDF('p', 'mm', 'letter');
  const PW = pdf.internal.pageSize.width;
  const PH = pdf.internal.pageSize.height;
  const ML = 12;
  const MR = 12;
  const MT = 20;
  const CONTENT_W = PW - ML - MR;
  let y = MT;

  // ── Utilidades internas ──────────────────────────────────────────────────
  const pageBreakIfNeeded = (needed: number) => {
    if (y + needed > PH - 15) {
      pdf.addPage();
      y = MT;
      drawPageHeader();
    }
  };

  const drawSectionHeader = (title: string, color: [number, number, number] = ORANGE) => {
    pageBreakIfNeeded(10);
    pdf.setFillColor(...color);
    pdf.rect(ML, y, CONTENT_W, 7, 'F');
    pdf.setTextColor(...WHITE);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title.toUpperCase(), PW / 2, y + 4.8, { align: 'center' });
    pdf.setTextColor(...DARK);
    y += 9;
  };

  const drawPageHeader = () => {
    // Barra superior
    pdf.setFillColor(...ORANGE);
    pdf.rect(0, 0, PW, 14, 'F');
    pdf.setTextColor(...WHITE);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REGISTRO DE HALLAZGO DE SEGURIDAD', PW / 2, 8, { align: 'center' });
    
    // Logo izquierdo
    if (logoBase64) {
      try {
        const match = logoBase64.match(/^data:image\/(png|jpeg|jpg);base64,/i);
        const format = match ? match[1].toUpperCase() : 'PNG';
        pdf.addImage(logoBase64, format, 12, 2, 20, 10);
      } catch(e){}
    }

    // Logo derecho (Casco)
    if (helmetBase64) {
      try {
        const match = helmetBase64.match(/^data:image\/(png|jpeg|jpg);base64,/i);
        const format = match ? match[1].toUpperCase() : 'JPEG';
        pdf.addImage(helmetBase64, format, PW - 22, 2, 10, 10);
      } catch(e){}
    }

    pdf.setTextColor(...DARK);
  };

  const drawFooter = (pageNum: number, totalPages: number) => {
    const footY = PH - 8;
    pdf.setDrawColor(...MID_GRAY);
    pdf.setLineWidth(0.3);
    pdf.line(ML, footY - 1, PW - MR, footY - 1);
    pdf.setFontSize(6.5);
    pdf.setTextColor(130, 130, 130);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generado el ${format(new Date(), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}`, ML, footY + 3);
    pdf.text(`Página ${pageNum} de ${totalPages}`, PW - MR, footY + 3, { align: 'right' });
    pdf.text('Sistema de Gestión SST', PW / 2, footY + 3, { align: 'center' });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PÁGINA 1
  // ═══════════════════════════════════════════════════════════════════════════
  drawPageHeader();
  y = 20;

  // ── Título y número ────────────────────────────────────────────────────────
  // Caja de número prominente
  const claseColor = CLASE_COLOR[hallazgo.clase] || BLUE;
  pdf.setFillColor(...claseColor);
  pdf.roundedRect(ML, y, CONTENT_W, 18, 2, 2, 'F');

  pdf.setTextColor(...WHITE);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`HALLAZGO #${hallazgo.numero}`, ML + 6, y + 7);

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text(CLASE_LABEL[hallazgo.clase] || '', ML + 6, y + 13);

  // Estado a la derecha
  const estado = hallazgo.cumplimientoEstado || 'Pendiente';
  pdf.setFillColor(...WHITE);
  pdf.setFillColor(255, 255, 255, 0.2);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.text(estado.toUpperCase(), PW - MR - 4, y + 11, { align: 'right' });

  pdf.setTextColor(...DARK);
  y += 22;

  // ── INFORMACIÓN GENERAL ────────────────────────────────────────────────────
  drawSectionHeader('Información General');

  autoTable(pdf, {
    startY: y,
    body: [
      [
        { content: 'Empresa', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        { content: safe(hallazgo.empresa || hallazgo.frenteTrabajo) },
        { content: 'Planta', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        { content: safe(hallazgo.planta || hallazgo.centroCosto) },
      ],
      [
        { content: 'Área', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        { content: safe(hallazgo.area) },
        { content: 'Tipo de Actividad', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        { content: safe(hallazgo.tipoActividad) },
      ],
      [
        { content: 'Fecha de Visita', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        { content: fmt(hallazgo.fechaVisita || hallazgo.fechaIdentificacion) },
        { content: 'Geolocalización', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        {
          content: hallazgo.geolocalizacion
            ? `${hallazgo.geolocalizacion.lat.toFixed(6)}, ${hallazgo.geolocalizacion.lng.toFixed(6)}${hallazgo.geolocalizacion.accuracy ? ` (±${Math.round(hallazgo.geolocalizacion.accuracy)}m)` : ''}`
            : '—'
        },
      ],
      [
        { content: 'Reportado Por', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        { content: safe(hallazgo.reportadoPorNombre) },
        { content: 'Cargo', styles: { fontStyle: 'bold' as const, textColor: [120, 120, 120], fontSize: 6.5 } },
        { content: safe(hallazgo.reportadoPorCargo) },
      ],
    ],
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK },
    columnStyles: {
      0: { cellWidth: 32, fillColor: LIGHT_GRAY },
      1: { cellWidth: CONTENT_W / 2 - 32 },
      2: { cellWidth: 32, fillColor: LIGHT_GRAY },
      3: { cellWidth: CONTENT_W / 2 - 32 },
    },
    margin: { left: ML, right: MR },
  });
  y = (pdf as any).lastAutoTable.finalY + 5;

  // ── PELIGRO INSPECCIONADO ─────────────────────────────────────────────────
  drawSectionHeader('Peligro Inspeccionado');
  autoTable(pdf, {
    startY: y,
    body: [[{ content: safe(hallazgo.peligroInspeccionado) }]],
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 3, textColor: DARK },
    margin: { left: ML, right: MR },
  });
  y = (pdf as any).lastAutoTable.finalY + 5;

  // ── DESCRIPCIÓN DEL HALLAZGO ──────────────────────────────────────────────
  drawSectionHeader('Descripción del Hallazgo');
  autoTable(pdf, {
    startY: y,
    body: [[{ content: safe(hallazgo.hallazgo) }]],
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 3, textColor: DARK, minCellHeight: 16 },
    margin: { left: ML, right: MR },
  });
  y = (pdf as any).lastAutoTable.finalY + 5;

  // ── CLASIFICACIÓN ─────────────────────────────────────────────────────────
  drawSectionHeader('Clasificación y Recomendaciones', claseColor);

  // Badge de clasificación
  pdf.setFillColor(...claseColor);
  pdf.roundedRect(ML, y, CONTENT_W, 10, 1.5, 1.5, 'F');
  pdf.setTextColor(...WHITE);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${CLASE_LABEL[hallazgo.clase]}  |  Intervención: ${hallazgo.intervencion}`, PW / 2, y + 6.5, { align: 'center' });
  pdf.setTextColor(...DARK);
  y += 13;

  const recomBody: any[] = [
    [{ content: 'Detalle de Recomendaciones', styles: { fontStyle: 'bold' as const, fillColor: LIGHT_GRAY, textColor: [80, 80, 80], fontSize: 7 } }],
    [{ content: safe(hallazgo.descripcion) }],
  ];
  if (hallazgo.accionInmediata) {
    recomBody.push(
      [{ content: 'Acción Inmediata', styles: { fontStyle: 'bold' as const, fillColor: [254, 242, 242] as [number,number,number], textColor: [153, 27, 27] as [number,number,number], fontSize: 7 } }],
      [{ content: safe(hallazgo.accionInmediata), styles: { textColor: [127, 29, 29] as [number,number,number] } }],
    );
  }

  autoTable(pdf, {
    startY: y,
    body: recomBody,
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK },
    margin: { left: ML, right: MR },
  });
  y = (pdf as any).lastAutoTable.finalY + 5;

  // ── PLAN DE ACCIÓN (si existe) ────────────────────────────────────────────
  const hasPlan = hallazgo.responsable || hallazgo.fechaMedidaImplementada ||
    hallazgo.porcentajeCumplimiento !== undefined || hallazgo.observacion;

  if (hasPlan) {
    pageBreakIfNeeded(40);
    drawSectionHeader('Plan de Acción', [22, 163, 74]);

    const pct = hallazgo.porcentajeCumplimientoTotal ?? hallazgo.porcentajeCumplimiento;

    const lbStyle = { fontStyle: 'bold' as const, fillColor: LIGHT_GRAY as [number,number,number], textColor: [80, 80, 80] as [number,number,number], fontSize: 6.5 };
    autoTable(pdf, {
      startY: y,
      body: [
        [
          { content: 'Responsable', styles: lbStyle },
          { content: safe(hallazgo.responsable) },
          { content: 'Fecha Medida Implementada', styles: lbStyle },
          { content: fmt(hallazgo.fechaMedidaImplementada) },
        ],
        [
          { content: 'Fecha de Seguimiento', styles: lbStyle },
          { content: fmt(hallazgo.fechaSeguimiento1) },
          { content: 'Fecha de Cierre', styles: lbStyle },
          { content: fmt(hallazgo.fechaCierre) },
        ],
        [
          { content: '% Cumplimiento', styles: lbStyle },
          { content: pct !== undefined ? `${pct}%` : '—' },
          { content: 'Estado', styles: lbStyle },
          {
            content: estado,
            styles: {
              textColor: (ESTADO_COLOR[estado] || DARK) as [number,number,number],
              fontStyle: 'bold' as const,
            },
          },
        ],
      ],
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK },
      columnStyles: {
        0: { cellWidth: 38, fillColor: LIGHT_GRAY },
        1: { cellWidth: CONTENT_W / 2 - 38 },
        2: { cellWidth: 38, fillColor: LIGHT_GRAY },
        3: { cellWidth: CONTENT_W / 2 - 38 },
      },
      margin: { left: ML, right: MR },
    });
    y = (pdf as any).lastAutoTable.finalY + 3;

    // Barra de progreso visual
    if (pct !== undefined) {
      pageBreakIfNeeded(14);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(80, 80, 80);
      pdf.text('Progreso de cumplimiento:', ML, y + 4);
      pdf.text(`${pct}%`, PW - MR, y + 4, { align: 'right' });
      y += 6;
      // Track
      pdf.setFillColor(...LIGHT_GRAY);
      pdf.roundedRect(ML, y, CONTENT_W, 5, 2, 2, 'F');
      // Fill
      const fillW = Math.max(0, Math.min(pct / 100, 1)) * CONTENT_W;
      const fillColor: [number, number, number] = pct >= 80 ? GREEN : pct >= 50 ? BLUE : AMBER;
      if (fillW > 0) {
        pdf.setFillColor(...fillColor);
        pdf.roundedRect(ML, y, fillW, 5, 2, 2, 'F');
      }
      y += 9;
    }

    // Observaciones
    if (hallazgo.observacion) {
      pageBreakIfNeeded(20);
      autoTable(pdf, {
        startY: y,
        head: [['OBSERVACIONES']],
        body: [[safe(hallazgo.observacion)]],
        theme: 'grid',
        headStyles: { fillColor: LIGHT_GRAY, textColor: [80, 80, 80], fontSize: 7 },
        styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK },
        margin: { left: ML, right: MR },
      });
      y = (pdf as any).lastAutoTable.finalY + 5;
    }
  }

  // ── FOTOGRAFÍAS ────────────────────────────────────────────────────────
  const validAntes = eviAntesBase64.filter(b => b) as string[];
  const validDespues = eviDespuesBase64.filter(b => b) as string[];

  if (validAntes.length > 0 || validDespues.length > 0) {
    pageBreakIfNeeded(40);
    drawSectionHeader('Evidencias Fotográficas', BLUE);
    
    const drawImages = (images: string[], title: string) => {
        if (images.length === 0) return;
        pageBreakIfNeeded(20);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, ML, y);
        y += 6;
        
        const imgW = 60;
        const imgH = 45;
        let currX = ML;
        let rowMaxH = imgH;
        
        for (const img of images) {
            if (currX + imgW > PW - MR) {
                currX = ML;
                y += rowMaxH + 5;
                pageBreakIfNeeded(imgH + 10);
            }
            try {
                const match = img.match(/^data:image\/(png|jpeg|jpg);base64,/i);
                const format = match ? match[1].toUpperCase() : 'JPEG';
                pdf.addImage(img, format, currX, y, imgW, imgH);
            } catch(e){}
            currX += imgW + 5;
        }
        y += rowMaxH + 10;
    }
    
    drawImages(validAntes, 'Evidencias del Hallazgo (Antes)');
    drawImages(validDespues, 'Evidencias del Plan de Acción (Cierre / Después)');
  }

  // ── FIRMA / CIERRE ────────────────────────────────────────────────────────
  pageBreakIfNeeded(30);
  drawSectionHeader('Registro de Creación');
  autoTable(pdf, {
    startY: y,
    body: [
      [
        { content: 'Creado por', styles: { fontStyle: 'bold' as const, fillColor: LIGHT_GRAY, textColor: [80, 80, 80], fontSize: 6.5 } },
        { content: safe(hallazgo.reportadoPorNombre) },
        { content: 'Fecha de registro', styles: { fontStyle: 'bold' as const, fillColor: LIGHT_GRAY, textColor: [80, 80, 80], fontSize: 6.5 } },
        { content: fmt(hallazgo.createdAt) },
      ],
    ],
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2.5, textColor: DARK },
    columnStyles: {
      0: { cellWidth: 32, fillColor: LIGHT_GRAY },
      1: { cellWidth: CONTENT_W / 2 - 32 },
      2: { cellWidth: 32, fillColor: LIGHT_GRAY },
      3: { cellWidth: CONTENT_W / 2 - 32 },
    },
    margin: { left: ML, right: MR },
  });
  y = (pdf as any).lastAutoTable.finalY + 6;

  // ── Sección de firmas ───────────────────────────────────────────────────
  pageBreakIfNeeded(50);
  drawSectionHeader('Firmas');

  const sigBoxW = (CONTENT_W - 6) / 2;
  const sigBoxH = 28;
  pdf.setDrawColor(...MID_GRAY);
  pdf.setLineWidth(0.3);

  const drawSignatureBox = (
    bx: number,
    label: string,
    name: string,
    role: string,
    sigDataUrl?: string
  ) => {
    // Borde de la caja
    pdf.setFillColor(...LIGHT_GRAY);
    pdf.rect(bx, y, sigBoxW, sigBoxH, 'FD');

    if (sigDataUrl) {
      // Renderizar imagen de firma (base64 PNG)
      try {
        pdf.addImage(sigDataUrl, 'PNG', bx + 6, y + 2, sigBoxW - 12, sigBoxH - 16);
      } catch { /* ignorar si la imagen falla */ }
    }

    // Línea base de firma
    pdf.setDrawColor(...MID_GRAY);
    pdf.line(bx + 6, y + sigBoxH - 12, bx + sigBoxW - 6, y + sigBoxH - 12);

    pdf.setFontSize(6.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(60, 60, 60);
    pdf.text(label, bx + sigBoxW / 2, y + sigBoxH - 8.5, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6);
    pdf.setTextColor(100, 100, 100);
    if (name && name !== '—') pdf.text(name, bx + sigBoxW / 2, y + sigBoxH - 5, { align: 'center' });
    if (role && role !== '—') pdf.text(role, bx + sigBoxW / 2, y + sigBoxH - 1.5, { align: 'center' });
    pdf.setTextColor(...DARK);
  };

  drawSignatureBox(
    ML,
    'FIRMA REPORTADOR',
    safe(hallazgo.reportadoPorNombre),
    safe(hallazgo.reportadoPorCargo),
    hallazgo.firmaReportador || undefined
  );

  drawSignatureBox(
    ML + sigBoxW + 6,
    'FIRMA RESPONSABLE SST',
    safe(hallazgo.responsable),
    'Líder SST',
    hallazgo.firmaResponsable || undefined
  );

  y += sigBoxH + 6;

  // ── Añadir footers a todas las páginas ──────────────────────────────────
  const totalPages = (pdf as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    drawFooter(i, totalPages);
  }

  // ── Descargar ────────────────────────────────────────────────────────────
  const fechaStr = fmt(hallazgo.fechaVisita || hallazgo.fechaIdentificacion, 'yyyyMMdd');
  pdf.save(`hallazgo-${hallazgo.numero}-${fechaStr}.pdf`);
}
