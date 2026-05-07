import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { ContractorVerification, ContractorVerificationAnswer, ActionPlan } from '@/types';

// ─── Paleta ───────────────────────────────────────────────────────────────────
const NAVY:   [number, number, number] = [0,   34,  72];
const WHITE:  [number, number, number] = [255, 255, 255];
const DARK:   [number, number, number] = [30,  30,  30];
const LGRAY:  [number, number, number] = [245, 245, 245];
const MGRAY:  [number, number, number] = [180, 180, 180];
const GREEN:  [number, number, number] = [22,  163, 74];
const RED:    [number, number, number] = [220, 38,  38];
const AMBER:  [number, number, number] = [217, 119, 6];
const SILVER: [number, number, number] = [107, 114, 128];
const ORANGE: [number, number, number] = [239, 123, 0];

const RESULT_COLOR: Record<string, [number, number, number]> = {
  C: GREEN, NC: RED, OM: AMBER, NA: SILVER,
};

const RESULT_LABEL: Record<string, string> = {
  C: 'CUMPLE', NC: 'NO CUMPLE', OM: 'OPT. MEJORA', NA: 'NO APLICA',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

const fetchLogoBase64 = async (): Promise<string | null> => {
  try {
    const res = await fetch('/logo-italcol-full.png');
    const blob = await res.blob();
    return new Promise<string | null>(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

// ─── Función principal ────────────────────────────────────────────────────────
export async function generateVerificacionPDF(
  verification: ContractorVerification,
  answers: ContractorVerificationAnswer[],
  actionPlans: ActionPlan[],
): Promise<void> {
  const logoBase64 = await fetchLogoBase64();

  const pdf = new jsPDF('p', 'mm', 'a4');
  const PW = pdf.internal.pageSize.width;
  const PH = pdf.internal.pageSize.height;
  const ML = 12;
  const MR = 12;
  const CW = PW - ML - MR; // content width
  let y = 0;

  // ── Helpers internos ────────────────────────────────────────────────────────
  const pageBreak = (needed = 20) => {
    if (y + needed > PH - 18) {
      pdf.addPage();
      y = 22;
      drawHeader();
    }
  };

  const drawHeader = () => {
    pdf.setFillColor(...NAVY);
    pdf.rect(0, 0, PW, 14, 'F');
    if (logoBase64) {
      try {
        const match = logoBase64.match(/^data:image\/(png|jpeg|jpg);base64,/i);
        const imgFmt = match ? match[1].toUpperCase().replace('JPG', 'JPEG') : 'PNG';
        pdf.addImage(logoBase64, imgFmt, ML, 2, 22, 10);
      } catch { /* skip */ }
    }
    pdf.setTextColor(...WHITE);
    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'bold');
    pdf.text('LISTA DE VERIFICACIÓN DE CONTRATISTAS', PW / 2, 6, { align: 'center' });
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text((verification.riskTypeName ?? '').toUpperCase(), PW / 2, 11, { align: 'center' });
    pdf.setTextColor(...DARK);
  };

  const drawFooter = () => {
    const totalPages = (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      const fy = PH - 8;
      pdf.setDrawColor(...MGRAY);
      pdf.setLineWidth(0.3);
      pdf.line(ML, fy - 2, PW - MR, fy - 2);
      pdf.setFontSize(6.5);
      pdf.setTextColor(130, 130, 130);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generado: ${format(new Date(), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}`, ML, fy + 2);
      pdf.text(`Página ${i} de ${totalPages}`, PW - MR, fy + 2, { align: 'right' });
      pdf.text('Sistema de Gestión SGTC', PW / 2, fy + 2, { align: 'center' });
    }
  };

  const drawSectionTitle = (title: string, color: [number, number, number] = NAVY) => {
    pageBreak(12);
    pdf.setFillColor(...color);
    pdf.rect(ML, y, CW, 7, 'F');
    pdf.setTextColor(...WHITE);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title.toUpperCase(), ML + 4, y + 5);
    pdf.setTextColor(...DARK);
    y += 9;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PÁGINA 1
  // ══════════════════════════════════════════════════════════════════════════
  drawHeader();
  y = 18;

  // Banner resumen
  const pct = verification.compliancePercentage ?? 0;
  const pctColor: [number, number, number] = pct >= 80 ? GREEN : pct >= 50 ? [37, 99, 235] : RED;

  pdf.setFillColor(...LGRAY);
  pdf.roundedRect(ML, y, CW, 16, 2, 2, 'F');
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...NAVY);
  pdf.text(safe(verification.riskTypeName), ML + 4, y + 7);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text(`${safe(verification.templateName)} · v${verification.templateVersion ?? 1}`, ML + 4, y + 13);

  pdf.setFillColor(...pctColor);
  pdf.roundedRect(PW - MR - 28, y + 2, 28, 12, 2, 2, 'F');
  pdf.setTextColor(...WHITE);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${pct}%`, PW - MR - 14, y + 10, { align: 'center' });
  pdf.setFontSize(6);
  pdf.setFont('helvetica', 'normal');
  pdf.text('CUMPLIMIENTO', PW - MR - 14, y + 14, { align: 'center' });
  y += 20;

  // ─── Sección 1: Información general ──────────────────────────────────────
  drawSectionTitle('1. Información General de la Verificación');

  const STATUS_LABELS: Record<string, string> = {
    DRAFT: 'Borrador', IN_PROGRESS: 'En Progreso',
    COMPLETED: 'Completado', CLOSED: 'Cerrado', CANCELLED: 'Cancelado',
  };

  autoTable(pdf, {
    startY: y,
    margin: { left: ML, right: MR },
    tableWidth: CW,
    body: [
      ['Empresa / Contratista', safe(verification.companyName), 'Contratista / Responsable', safe(verification.contractorName)],
      ['Planta', safe(verification.plantName), 'Ciudad', safe(verification.city)],
      ['Fecha de Verificación', fmt(verification.verificationDate), 'Estado', STATUS_LABELS[verification.status] || verification.status],
      ['Ubicación del Trabajo', safe(verification.workLocation), 'Inspector / Asesor', safe(verification.createdByName)],
      ['Descripción de Actividad', safe(verification.activityDescription), 'Proyecto', safe(verification.projectName)],
    ],
    columnStyles: {
      0: { cellWidth: 44, fontStyle: 'bold', fillColor: [235, 240, 250] as [number, number, number], textColor: NAVY },
      1: { cellWidth: CW / 2 - 44, fillColor: WHITE },
      2: { cellWidth: 44, fontStyle: 'bold', fillColor: [235, 240, 250] as [number, number, number], textColor: NAVY },
      3: { cellWidth: CW / 2 - 44, fillColor: WHITE },
    },
    styles: { fontSize: 8, cellPadding: 2.5, lineColor: [210, 215, 225] as [number, number, number], lineWidth: 0.3 },
    theme: 'grid',
  });

  y = (pdf as any).lastAutoTable.finalY + 6;

  // ─── Sección 2: Resumen de cumplimiento ───────────────────────────────────
  drawSectionTitle('2. Resumen de Cumplimiento');

  autoTable(pdf, {
    startY: y,
    margin: { left: ML, right: MR },
    tableWidth: CW,
    body: [
      [
        `CUMPLE (C): ${verification.compliantItems ?? 0}`,
        `NO CUMPLE (NC): ${verification.nonCompliantItems ?? 0}`,
        `OPT. MEJORA (OM): ${verification.improvementItems ?? 0}`,
        `NO APLICA (NA): ${verification.notApplicableItems ?? 0}`,
      ],
      [
        {
          content: `TOTAL EVALUADOS (excluye NA): ${(verification.compliantItems ?? 0) + (verification.nonCompliantItems ?? 0) + (verification.improvementItems ?? 0)}`,
          colSpan: 4,
          styles: { fontStyle: 'bold' as const, halign: 'center' as const, fillColor: LGRAY },
        },
      ],
    ],
    columnStyles: {
      0: { fillColor: [220, 252, 231] as [number, number, number], textColor: GREEN, fontStyle: 'bold' as const },
      1: { fillColor: [254, 226, 226] as [number, number, number], textColor: RED, fontStyle: 'bold' as const },
      2: { fillColor: [254, 243, 199] as [number, number, number], textColor: AMBER, fontStyle: 'bold' as const },
      3: { fillColor: [243, 244, 246] as [number, number, number], textColor: SILVER, fontStyle: 'bold' as const },
    },
    styles: { fontSize: 8, cellPadding: 3, lineColor: [210, 215, 225] as [number, number, number], lineWidth: 0.3, halign: 'center' },
    theme: 'grid',
  });

  y = (pdf as any).lastAutoTable.finalY + 6;

  // ══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 3: Checklist por grupos
  // ══════════════════════════════════════════════════════════════════════════
  drawSectionTitle('3. Lista de Verificación Detallada');

  const groupMap = new Map<string, { title: string; items: ContractorVerificationAnswer[] }>();
  answers.forEach(a => {
    if (!groupMap.has(a.groupId)) groupMap.set(a.groupId, { title: a.groupTitle, items: [] });
    groupMap.get(a.groupId)!.items.push(a);
  });

  for (const group of groupMap.values()) {
    pageBreak(20);

    pdf.setFillColor(...ORANGE);
    pdf.rect(ML, y, CW, 6.5, 'F');
    pdf.setTextColor(...WHITE);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text(group.title.toUpperCase(), ML + 3, y + 4.5);
    pdf.setTextColor(...DARK);
    y += 8;

    const bgResult: Record<string, [number, number, number]> = {
      C: [220, 252, 231], NC: [254, 226, 226], OM: [254, 243, 199], NA: [243, 244, 246],
    };

    const tableRows = group.items.map(item => {
      const r = item.result;
      return [
        { content: safe(item.requisitoBaseLegal) },
        { content: safe(item.aspectoVerificar) },
        { content: safe(item.metodoVerificacion) },
        {
          content: r ? RESULT_LABEL[r] : 'SIN EVALUAR',
          styles: {
            fontStyle: 'bold' as const,
            textColor: r ? RESULT_COLOR[r] : MGRAY,
            fillColor: r ? bgResult[r] : WHITE,
            halign: 'center' as const,
          },
        },
        { content: safe(item.observation) },
      ];
    });

    autoTable(pdf, {
      startY: y,
      margin: { left: ML, right: MR },
      tableWidth: CW,
      head: [[
        { content: 'Requisito Legal', styles: { fillColor: NAVY, textColor: WHITE } },
        { content: 'Aspecto a Verificar', styles: { fillColor: NAVY, textColor: WHITE } },
        { content: 'Método de Verificación', styles: { fillColor: NAVY, textColor: WHITE } },
        { content: 'Resultado', styles: { fillColor: NAVY, textColor: WHITE, halign: 'center' as const } },
        { content: 'Observación', styles: { fillColor: NAVY, textColor: WHITE } },
      ]],
      body: tableRows,
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 52 },
        2: { cellWidth: 38 },
        3: { cellWidth: 26 },
        4: { cellWidth: CW - 146 },
      },
      styles: {
        fontSize: 7.5, cellPadding: 2,
        lineColor: [210, 215, 225] as [number, number, number],
        lineWidth: 0.3, overflow: 'linebreak',
      },
      headStyles: { fontSize: 7.5, fontStyle: 'bold', cellPadding: 2 },
      theme: 'grid',
    });

    y = (pdf as any).lastAutoTable.finalY + 5;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 4: Planes de acción
  // ══════════════════════════════════════════════════════════════════════════
  if (actionPlans.length > 0) {
    pageBreak(20);
    drawSectionTitle('4. Planes de Acción Correctiva', RED);

    const AP_STATUS: Record<string, string> = {
      OPEN: 'Abierto', IN_PROGRESS: 'En Progreso',
      CLOSED: 'Cerrado', OVERDUE: 'Vencido', CANCELLED: 'Cancelado',
    };

    autoTable(pdf, {
      startY: y,
      margin: { left: ML, right: MR },
      tableWidth: CW,
      head: [[
        { content: 'Hallazgo / Descripción', styles: { fillColor: [150, 20, 20] as [number, number, number], textColor: WHITE } },
        { content: 'Acción Correctiva', styles: { fillColor: [150, 20, 20] as [number, number, number], textColor: WHITE } },
        { content: 'Responsable', styles: { fillColor: [150, 20, 20] as [number, number, number], textColor: WHITE } },
        { content: 'Fecha Límite', styles: { fillColor: [150, 20, 20] as [number, number, number], textColor: WHITE } },
        { content: 'Estado', styles: { fillColor: [150, 20, 20] as [number, number, number], textColor: WHITE } },
      ]],
      body: actionPlans.map(ap => [
        safe(ap.findingDescription),
        safe(ap.correctiveAction),
        safe(ap.responsibleName),
        fmt(ap.dueDate),
        AP_STATUS[ap.status] || ap.status,
      ]),
      columnStyles: {
        0: { cellWidth: 42 },
        1: { cellWidth: 58 },
        2: { cellWidth: 30 },
        3: { cellWidth: 24 },
        4: { cellWidth: CW - 154 },
      },
      styles: {
        fontSize: 7.5, cellPadding: 2,
        lineColor: [210, 215, 225] as [number, number, number],
        lineWidth: 0.3, overflow: 'linebreak',
      },
      headStyles: { fontSize: 7.5, fontStyle: 'bold' },
      theme: 'grid',
    });

    y = (pdf as any).lastAutoTable.finalY + 6;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SECCIÓN FINAL: Observaciones generales
  // ══════════════════════════════════════════════════════════════════════════
  const lastSection = actionPlans.length > 0 ? '5' : '4';
  pageBreak(30);
  drawSectionTitle(`${lastSection}. Observaciones Generales`);

  pdf.setFillColor(...LGRAY);
  pdf.rect(ML, y, CW, 22, 'F');
  pdf.setDrawColor(...MGRAY);
  pdf.setLineWidth(0.3);
  pdf.rect(ML, y, CW, 22, 'S');
  pdf.setFontSize(7.5);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...NAVY);
  pdf.text('Observaciones generales:', ML + 3, y + 4);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...DARK);
  const obsText = safe(verification.generalObservations);
  const obsLines = pdf.splitTextToSize(obsText, CW - 6);
  pdf.text(obsLines.slice(0, 5), ML + 3, y + 9);
  y += 26;

  drawFooter();

  const fileName = [
    'verificacion',
    verification.riskTypeCode || 'contratista',
    fmt(verification.verificationDate, 'yyyyMMdd'),
    (verification.companyName ?? 'empresa').replace(/\s+/g, '_'),
  ].join('_') + '.pdf';

  pdf.save(fileName);
}
