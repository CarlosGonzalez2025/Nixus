// ✅ Archivo refactorizado: lib/pdf-generators.ts
// Reemplaza lib/pdf-generator.ts con esta versión modular

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format, parseISO } from 'date-fns';

// ============================================================================
// 🎨 CONSTANTES Y UTILIDADES
// ============================================================================

const SYSTEM_PRIMARY: [number, number, number] = [0, 34, 72]; // hsl(var(--primary)) / #002248
const ITALCOL_ORANGE = SYSTEM_PRIMARY;
const PAGE_WIDTH = 210; // A4 ancho en mm
const PAGE_HEIGHT = 279; // A4 alto en mm
const MARGIN = 10;

const getStatusSymbol = (value: string | boolean | undefined): string => {
  if (value === 'si' || value === true) return '✓ SÍ';
  if (value === 'no' || value === false) return '✗ NO';
  if (value === 'na') return 'N/A';
  return '—';
};

const getStatusColor = (value: string | boolean | undefined): number[] => {
  if (value === 'si' || value === true) return [34, 139, 34]; // Verde
  if (value === 'no' || value === false) return [220, 20, 60]; // Rojo
  if (value === 'na') return [169, 169, 169]; // Gris
  return [0, 0, 0];
};

const formatKey = (key: string): string =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();

const selectedMapLabels = (value: unknown): string => {
  if (!value || typeof value !== 'object') return 'N/A';
  const selected = Object.entries(value as Record<string, unknown>)
    .filter(([key, item]) => key !== 'otro' && key !== 'otra' && item === true)
    .map(([key]) => formatKey(key));
  const other = (value as Record<string, unknown>).otro || (value as Record<string, unknown>).otra;
  if (typeof other === 'string' && other.trim()) selected.push(other.trim());
  return selected.length > 0 ? selected.join(', ') : 'N/A';
};

const objectStatusRows = (value: unknown): string[][] => {
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value as Record<string, unknown>)
    .filter(([_, item]) => item !== undefined && item !== null && item !== '')
    .map(([key, item]) => [
      formatKey(key),
      typeof item === 'boolean' || item === 'si' || item === 'no' || item === 'na'
        ? getStatusSymbol(item as string | boolean)
        : String(item),
    ]);
};

const renderStatusTable = (
  doc: jsPDF,
  yPos: number,
  rows: string[][],
  firstColumnTitle = 'ITEM'
): number => {
  if (!rows.length) return yPos;
  autoTable(doc, {
    startY: yPos,
    head: [[firstColumnTitle, 'ESTADO / DETALLE']],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 7, fontStyle: 'bold' },
    bodyStyles: { fontSize: 6, cellPadding: 1 },
    columnStyles: { 0: { cellWidth: 95, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN },
  });
  return (doc as any).lastAutoTable.finalY + 3;
};

const isWorkTypeSelected = (permit: any, legacyKey: string, selectedKey: string): boolean =>
  permit?.[legacyKey] === true || permit?.selectedWorkTypes?.[selectedKey] === true;

// ============================================================================
// 📋 DEFINICIONES DE CAMPOS
// ============================================================================

export const PELIGROS_VERIFICACION = [
  { id: 'fisicos', label: 'Físicos' },
  { id: 'quimicos', label: 'Químicos' },
  { id: 'biologicos', label: 'Biológicos' },
  { id: 'seguridad', label: 'De Seguridad' },
  { id: 'locativos', label: 'Locativos' },
  { id: 'biomecanico', label: 'Biomecánico' },
  { id: 'psicosocial', label: 'Psicosocial' },
];

export const ANEXO_ALTURA_CAMPOS = [
  { id: 'afiliacionVigente', label: 'A. AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL?' },
  { id: 'procedimientoActividad', label: 'B. PROCEDIMIENTO DE LA ACTIVIDAD?' },
  { id: 'medidasPrevencion', label: 'C. MEDIDAS DE PREVENCIÓN CONTRA CAÍDAS?' },
  { id: 'conocenMedidas', label: 'D. EJECUTANTES CONOCEN LAS MEDIDAS?' },
  { id: 'entrenadosCertificados', label: 'E. EJECUTANTES ENTRENADOS Y CERTIFICADOS?' },
  { id: 'elementosProteccionCertificados', label: 'F. ELEMENTOS DE PROTECCIÓN EN BUEN ESTADO Y CERTIFICADOS?' },
  { id: 'sistemaAseguramientoVerificado', label: 'G. SISTEMA DE ASEGURAMIENTO VERIFICADO?' },
  { id: 'estadoElementosVerificado', label: 'H. ESTADO DE ESLINGAS, ARNÉS, CASCOS, ETC.?' },
  { id: 'puntosAnclajeCertificados', label: 'I. PUNTOS DE ANCLAJE CUMPLEN 5000 LBS Y CERTIFICADOS?' },
  { id: 'areaDelimitada', label: 'J. ÁREA DELIMITADA Y SEÑALIZADA?' },
  { id: 'personalSaludable', label: 'K. PERSONAL EN CONDICIONES ADECUADAS DE SALUD?' },
  { id: 'equiposAccesoBuenEstado', label: 'L. EQUIPOS Y SISTEMAS DE ACCESO EN BUEN ESTADO?' },
  { id: 'espacioCaidaLibreSuficiente', label: 'M. ESPACIO DE CAÍDA LIBRE SUFICIENTE?' },
  { id: 'equiposEmergenciaDisponibles', label: 'N. ELEMENTOS DE EMERGENCIA Y PLAN DE RESCATE?' },
  { id: 'eppSeleccionadosCorrectamente', label: 'O. EPP SELECCIONADO CORRECTAMENTE?' },
  { id: 'plataformaSoportaCarga', label: 'P. PLATAFORMA SOPORTA CARGA DE TRABAJO?' },
  { id: 'supervisorConstante', label: 'Q. SUPERVISOR O ACOMPAÑANTE CONSTANTE?' },
  { id: 'andamiosCompletos', label: 'R. ANDAMIOS COMPLETOS Y ADECUADAMENTE ARMADOS?' },
  { id: 'condicionesClimaticasAdecuadas', label: 'S. CONDICIONES CLIMÁTICAS ADECUADAS?' },
  { id: 'metodoSubirHerramientasSeguro', label: 'T. MÉTODO DE SUBIR HERRAMIENTAS SEGURO?' },
  { id: 'sistemasRestriccion', label: 'U. SISTEMAS DE RESTRICCIÓN (si requiere)?' },
  { id: 'sistemasPosicionamiento', label: 'V. SISTEMAS DE POSICIONAMIENTO (si requiere)?' },
];

export const ANEXO_CONFINADO_CAMPOS = [
  { id: 'fuentesEnergiaAisladas', label: 'A. FUENTES DE ENERGÍA AISLADAS?' },
  { id: 'ejecutantesConocenMedidas', label: 'B. EJECUTANTES CONOCEN MEDIDAS DE PRECAUCIÓN?' },
  { id: 'ejecutantesEntrenados', label: 'C. EJECUTANTES ENTRENADOS?' },
  { id: 'entradasSalidasFlujoBloqueadas', label: 'D. ENTRADAS Y SALIDAS DE FLUJO BLOQUEADAS?' },
  { id: 'areaDelimitada', label: 'E. ÁREA DELIMITADA Y SEÑALIZADA?' },
  { id: 'monitorAtmosferasCalibrado', label: 'F. MONITOR DE ATMÓSFERAS CALIBRADO?' },
  { id: 'equiposIluminacionExplosion', label: 'G. EQUIPOS DE ILUMINACIÓN A PRUEBA DE EXPLOSIÓN?' },
  { id: 'equiposVentilacionExplosion', label: 'H. EQUIPOS DE VENTILACIÓN A PRUEBA DE EXPLOSIÓN?' },
  { id: 'equiposVentilacionSuficientes', label: 'J. EQUIPOS DE VENTILACIÓN DISPONIBLES Y SUFICIENTES?' },
  { id: 'equiposRespiracionAutonoma', label: 'K. EQUIPOS DE RESPIRACIÓN AUTÓNOMA DISPONIBLES?' },
  { id: 'elementosAtencionEmergencias', label: 'L. ELEMENTOS PARA ATENCIÓN DE EMERGENCIAS?' },
  { id: 'planEmergenciaRescate', label: 'M. PLAN DE EMERGENCIA PARA RESCATE?' },
  { id: 'hojasSeguridadDisponibles', label: 'N. HOJAS DE SEGURIDAD DE PRODUCTOS QUÍMICOS?' },
  { id: 'vigiaPermanente', label: 'O. VIGÍA PERMANENTE EN EL ÁREA?' },
  { id: 'herramientasAdecuadas', label: 'P. HERRAMIENTAS ADECUADAS PARA LAS CONDICIONES?' },
  { id: 'personalSaludable', label: 'Q. PERSONAL EN CONDICIONES DE SALUD ADECUADAS?' },
  { id: 'verificadoEpp', label: 'R. EPP VERIFICADO Y EN BUEN ESTADO?' },
];

export const ANEXO_ENERGIA_CAMPOS = [
  { id: 'fuentesEnergiaIdentificadas', label: 'A. FUENTES DE ENERGÍA IDENTIFICADAS?' },
  { id: 'ejecutantesConocenMedidas', label: 'B. EJECUTANTES IDENTIFICADOS Y SUPERVISORES PRESENTES?' },
  { id: 'medidasPrevencion', label: 'C. MEDIDAS DE PREVENCIÓN DETERMINADAS?' },
  { id: 'ejecutantesEntrenados', label: 'D. EJECUTANTES ENTRENADOS?' },
  { id: 'procedimientoDisiparEnergia', label: 'E. PROCEDIMIENTO PARA DISIPAR ENERGÍA ESTABLECIDO?' },
  { id: 'bloqueoEtiquetado', label: 'F. BLOQUEOS Y ETIQUETADOS DISPONIBLES?' },
  { id: 'verificacionAusenciaEnergia', label: 'G. AUSENCIA DE ENERGÍA VERIFICADA?' },
  { id: 'distanciasSeguridad', label: 'H. DISTANCIAS DE SEGURIDAD SEGÚN RETIE CUMPLIDAS?' },
];

export const ANEXO_IZAJE_CAMPOS = [
  { id: 'terrenoEstabilizado', label: 'A. TERRENO ESTABILIZADO Y SOPORTA EQUIPO?' },
  { id: 'operadorVisualiza', label: 'B. OPERADOR VISUALIZA BIEN EL ÁREA?' },
  { id: 'calculoTecnicoIzaje', label: 'C. CÁLCULO TÉCNICO/PLAN DE IZAJE?' },
  { id: 'areaSeñalizada', label: 'D. ÁREA SEÑALIZADA Y DEMARCADA?' },
  { id: 'verificacionCapacidad', label: 'E. CAPACIDAD DEL EQUIPO VERIFICADA?' },
  { id: 'areaLimpia', label: 'F. ÁREA DE IZAJE DESPEJADA?' },
  { id: 'comunicacionClara', label: 'G. COMUNICACIÓN CLARA ESTABLECIDA?' },
  { id: 'atsRealizado', label: 'H. ATS REALIZADO?' },
  { id: 'eslinguasEstado', label: 'I. ESLINGAS Y APAREJOS EN BUEN ESTADO?' },
  { id: 'polinesEstado', label: 'J. POLINES EN BUEN ESTADO?' },
  { id: 'polinesEstables', label: 'K. POLINES ESTABLES Y POSICIONADOS?' },
  { id: 'distanciaLineasElectricas', label: 'L. DISTANCIA SEGURA DE LÍNEAS ELÉCTRICAS?' },
  { id: 'sinPersonasAjoBajoCarga', label: 'M. SIN PERSONAS BAJO LA CARGA?' },
  { id: 'climaSeguro', label: 'N. CONDICIONES CLIMÁTICAS SEGURAS?' },
  { id: 'equipoTierra', label: 'O. EQUIPO CON CONEXIÓN A TIERRA?' },
  { id: 'noMaterialCayendoCarga', label: 'P. SIN MATERIAL CAYENDO SOBRE CARGA?' },
  { id: 'senalizadorCapacitado', label: 'Q. SEÑALIZADOR CAPACITADO Y ENTRENADO?' },
  { id: 'afiliacionVerificada', label: 'R. AFILIACIÓN A SISTEMA DE SEGURIDAD SOCIAL VERIFICADA?' },
];

export const ANEXO_EXCAVACION_CAMPOS = [
  { id: 'sistemasEnterrados', label: 'A. SISTEMAS ENTERRADOS IDENTIFICADOS?' },
  { id: 'metodoExcavacion', label: 'B. MÉTODO DE EXCAVACIÓN DETERMINADO?' },
  { id: 'ejecutantesEntrenados', label: 'C. EJECUTANTES ENTRENADOS Y CONOCEN RIESGOS?' },
  { id: 'controlEntibado', label: 'D. CONTROLES, ENTIBADO, ACCESO/SALIDA INSTALADOS?' },
  { id: 'areaSeñalizada', label: 'E. ÁREA SEÑALIZADA PARA PREVENIR CAÍDAS?' },
  { id: 'puentesComplementarios', label: 'F. PUENTES/PASARELAS SI NECESARIO?' },
  { id: 'materialesAlBorde', label: 'G. MATERIALES A MÍNIMO 1M DEL BORDE?' },
  { id: 'escaleraSobresale', label: 'H. ESCALERAS SOBRESALEN MÍNIMO 1M DEL BORDE?' },
  { id: 'metodoRelleno', label: 'I. MÉTODO DE RELLENO Y CONFORMACIÓN PREVISTO?' },
];

// ============================================================================
// 🛠️ FUNCIONES AUXILIARES
// ============================================================================

const createNewPDF = () => {
  return new jsPDF('p', 'mm', 'letter');
};

const ITALCOL_LOGO_URL = '/logo-italcol-full.png';

const drawPageHeader = (doc: jsPDF, title: string, code: string, version: string, yPos: number) => {
  // Dibujar recuadro de cabecera completa
  const headerHeight = 22;
  doc.setDrawColor(ITALCOL_ORANGE[0], ITALCOL_ORANGE[1], ITALCOL_ORANGE[2]);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN, yPos, PAGE_WIDTH - 2 * MARGIN, headerHeight, 'S');

  // Líneas internas para dividir secciones
  doc.line(MARGIN + 40, yPos, MARGIN + 40, yPos + headerHeight); // División logo
  doc.line(PAGE_WIDTH - MARGIN - 40, yPos, PAGE_WIDTH - MARGIN - 40, yPos + headerHeight); // División versión

  // Logo de Italcol (cuadro izquierdo)
  try {
    doc.addImage(ITALCOL_LOGO_URL, 'PNG', MARGIN + 5, yPos + 3, 30, 16);
  } catch (e) {
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    // doc.text('ITALCOL', MARGIN + 10, yPos + 12);
  }

  // Título central
  doc.setFillColor(ITALCOL_ORANGE[0], ITALCOL_ORANGE[1], ITALCOL_ORANGE[2]);
  doc.rect(MARGIN + 40, yPos, PAGE_WIDTH - 2 * MARGIN - 80, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(title.toUpperCase(), PAGE_WIDTH / 2, yPos + 6, { align: 'center' });

  // Subtítulo (debajo del título)
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema de Gestión de Seguridad y Salud en el Trabajo', PAGE_WIDTH / 2, yPos + 14, { align: 'center' });
  doc.text('Proceso: SST - SEGURIDAD INDUSTRIAL', PAGE_WIDTH / 2, yPos + 18, { align: 'center' });

  // Cuadro derecho: Código y versión
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  if (code) {
    doc.text(`Código: ${code}`, PAGE_WIDTH - MARGIN - 35, yPos + 8);
  }
  doc.text(`Versión: ${version || 'N/A'}`, PAGE_WIDTH - MARGIN - 35, yPos + 14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha: ${format(new Date(), 'dd/MM/yyyy')}`, PAGE_WIDTH - MARGIN - 35, yPos + 20);

  return yPos + headerHeight + 5;
};

// Helper para dibujar títulos de sección con barra naranja
const drawSectionHeader = (doc: jsPDF, title: string, yPos: number): number => {
  doc.setFillColor(ITALCOL_ORANGE[0], ITALCOL_ORANGE[1], ITALCOL_ORANGE[2]);
  doc.rect(MARGIN, yPos, PAGE_WIDTH - 2 * MARGIN, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(title.toUpperCase(), MARGIN + 2, yPos + 4);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  return yPos + 7;
};

const drawFooter = (doc: jsPDF, code?: string, version?: string) => {
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_HEIGHT - 12, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 12);

    // Número de página a la izquierda
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(`Página ${i} de ${totalPages}`, MARGIN, PAGE_HEIGHT - 7);

    // Código y versión a la derecha
    if (code || version) {
      doc.setFont('helvetica', 'bold');
      doc.text(`Código: ${code || 'N/A'}`, PAGE_WIDTH - MARGIN - 50, PAGE_HEIGHT - 9, { align: 'left' });
      doc.text(`Versión: ${version || 'N/A'}`, PAGE_WIDTH - MARGIN - 50, PAGE_HEIGHT - 5, { align: 'left' });
    }
    doc.setFont('helvetica', 'normal');
  }
};

// Helper para filtrar filas vacías en tablas
const filterEmptyRows = (rows: any[][]) => {
  return rows.filter(row => {
    // Mantener fila si al menos una celda de valor tiene datos (ignorando etiquetas)
    // Asumimos que la columna 1 en adelante son valores
    const valueCell = row[1];
    return valueCell && valueCell !== '' && valueCell !== '—' && valueCell !== 'N/A';
  });
};

const safeFormat = (dateStr: string): string => {
  try {
    if (!dateStr) return '';
    return format(parseISO(dateStr), 'dd/MM/yyyy HH:mm');
  } catch {
    return dateStr || '';
  }
};

const formatAnyDate = (dateValue: any): string => {
  if (!dateValue) return '';
  try {
    const dateObj = parseFirestoreDate(dateValue);
    if (dateObj && !Number.isNaN(dateObj.getTime())) return format(dateObj, 'dd/MM/yyyy HH:mm');
  } catch {
    // fallback below
  }
  return typeof dateValue === 'string' ? dateValue : '';
};

const drawSignatureImage = (
  doc: jsPDF,
  signature: string | undefined | null,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  if (!signature) return;
  try {
    doc.addImage(signature, 'PNG', x, y, width, height);
  } catch {
    doc.setFontSize(5);
    doc.setTextColor(150, 0, 0);
    doc.text('Firma no legible', x + width / 2, y + height / 2, { align: 'center' });
    doc.setTextColor(0, 0, 0);
  }
};

// ============================================================================
// ✍️ FUNCIONES DE FIRMA
// ============================================================================

const drawSignatures = (doc: jsPDF, permit: any, yPos: number): number => {
  const blocks: Array<{ label: string; name: string; date: string; signature: string; detail?: string }> = [];
  const addBlock = (label: string, data: any, signatureField: 'firmaApertura' | 'firmaCierre' | 'firma', detail?: string) => {
    const signature = data?.[signatureField] || data?.firma;
    if (!signature) return;
    blocks.push({
      label,
      name: String(data.userName || data.nombre || 'Firmado'),
      date: formatAnyDate(data.updatedAt || data.signedAt || data.fecha || data.hora),
      signature,
      detail,
    });
  };

  addBlock('Apertura - Solicitante / Lider Ejecutante', permit.approvals?.solicitante, 'firmaApertura');
  addBlock('Apertura - Autorizante / Jefe de Area', permit.approvals?.autorizante, 'firmaApertura');
  addBlock('Apertura - Lider SST', permit.approvals?.lider_sst, 'firmaApertura');
  addBlock('Apertura - Mantenimiento', permit.approvals?.mantenimiento, 'firmaApertura');
  addBlock('Apertura - Coordinador Alturas', permit.approvals?.coordinador_alturas, 'firmaApertura');
  addBlock('Cierre - Responsable', permit.closure?.responsable, 'firma');
  addBlock('Cierre - Autoridad', permit.closure?.autoridad, 'firma');
  addBlock('Cierre de Emergencia / Cancelacion', permit.closure?.cerradoPorUsuario || permit.closure?.canceladoPor, 'firma');

  if (blocks.length === 0) return yPos;

  let currentY = drawSectionHeader(doc, 'FIRMAS DE AUTORIZACION Y CIERRE', yPos + 3);
  const cardGap = 6;
  const cardWidth = (PAGE_WIDTH - 2 * MARGIN - cardGap) / 2;
  const cardHeight = 36;

  blocks.forEach((block, index) => {
    const col = index % 2;
    const x = MARGIN + col * (cardWidth + cardGap);
    if (col === 0 && index > 0) currentY += cardHeight + 5;
    if (currentY + cardHeight > PAGE_HEIGHT - 18) {
      doc.addPage();
      currentY = drawSectionHeader(doc, 'FIRMAS DE AUTORIZACION Y CIERRE (CONTINUACION)', MARGIN);
    }

    doc.setDrawColor(190, 190, 190);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, currentY, cardWidth, cardHeight, 1.5, 1.5, 'FD');
    doc.setFillColor(ITALCOL_ORANGE[0], ITALCOL_ORANGE[1], ITALCOL_ORANGE[2]);
    doc.rect(x, currentY, cardWidth, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(6.2);
    doc.setFont('helvetica', 'bold');
    doc.text(block.label.toUpperCase(), x + 2, currentY + 4.2, { maxWidth: cardWidth - 4 });

    drawSignatureImage(doc, block.signature, x + 4, currentY + 8, cardWidth - 8, 14);
    doc.setDrawColor(130, 130, 130);
    doc.line(x + 6, currentY + 23, x + cardWidth - 6, currentY + 23);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.text(block.name.toUpperCase(), x + cardWidth / 2, currentY + 27, { align: 'center', maxWidth: cardWidth - 8 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(90, 90, 90);
    doc.text(block.date || 'Fecha no registrada', x + cardWidth / 2, currentY + 31, { align: 'center', maxWidth: cardWidth - 8 });
    if (block.detail) doc.text(block.detail, x + cardWidth / 2, currentY + 34, { align: 'center', maxWidth: cardWidth - 8 });
    doc.setTextColor(0, 0, 0);
  });

  return currentY + cardHeight + 5;
};

// Helper interno duplicado para este contexto (ya que no podemos importar fácilmente parseFirestoreDate del componente)
const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  if (typeof dateValue.toDate === 'function') return dateValue.toDate();
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === 'string') return new Date(dateValue);
  return null;
};


// ============================================================================
// 📄 GENERADOR 1: PERMISO DE TRABAJO (DN-FR-SST-016)
// ============================================================================

// ============================================================================
// 🎨 RENDERIZADORES REUTILIZABLES (Para Single o Unified PDF)
// ============================================================================

const renderPermitContent = (doc: jsPDF, permit: any) => {
  let yPos = MARGIN;
  yPos = drawPageHeader(doc, 'PERMISO DE TRABAJO', 'DN-FR-SST-016', '05', yPos);
  yPos += 2;

  // Helper para obtener tipos de trabajo seleccionados
  const getWorkTypesString = (): string => {
    const types: string[] = [];
    if (permit.trabajoAlturas || permit.selectedWorkTypes?.alturas) types.push('Alturas');
    if (permit.espaciosConfinados || permit.selectedWorkTypes?.confinado) types.push('Confinados');
    if (permit.controlEnergia || permit.selectedWorkTypes?.energia) types.push('Energías');
    if (permit.izajeCargas || permit.selectedWorkTypes?.izaje) types.push('Izaje');
    if (permit.excavaciones || permit.selectedWorkTypes?.excavacion) types.push('Excavación');
    if (permit.trabajoGeneral || permit.selectedWorkTypes?.general) types.push('General');
    return types.length > 0 ? types.join(', ') : 'No especificado';
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 1: INFORMACIÓN GENERAL - Aplica a todos los Permisos
  // ═══════════════════════════════════════════════════════════════════════════
  yPos = drawSectionHeader(doc, 'INFORMACIÓN GENERAL - Aplica a todos los Permisos', yPos);

  // Tabla de información en formato de grid 2x4
  autoTable(doc, {
    startY: yPos,
    body: [
      ['Número Permiso:', String(permit.number || permit.id?.substring(0, 8) || 'S/N'), 'Planta:', String(permit.generalInfo?.planta || 'N/A')],
      ['Empresa:', String(permit.generalInfo?.empresa || 'N/A'), 'Área/Ubicación:', String(permit.generalInfo?.areaEspecifica || 'N/A')],
      ['Contrato:', String(permit.generalInfo?.contrato || 'N/A'), 'Proceso:', String(permit.generalInfo?.proceso || 'N/A')],
      ['Válido Desde:', safeFormat(permit.generalInfo?.validFrom) || 'N/A', 'Válido Hasta:', safeFormat(permit.generalInfo?.validUntil) || 'N/A'],
      ['Solicitante:', String(permit.user?.displayName || 'N/A'), 'No. Trabajadores:', String(permit.generalInfo?.numTrabajadores || 'N/A')],
      ['Tipos de Trabajo:', getWorkTypesString(), '', ''],
    ],
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 35, fontStyle: 'bold' },
      3: { cellWidth: 'auto' }
    },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 3;

  // 2. RESPONSABLE DEL TRABAJO
  if (permit.generalInfo?.responsable) {
    const respRows = [
      ['Nombre:', String(permit.generalInfo.responsable.nombre || 'N/A')],
      ['Cargo:', String(permit.generalInfo.responsable.cargo || 'N/A')],
      ['Compañía:', String(permit.generalInfo.responsable.compania || 'N/A')],
      ['Alcance:', String(permit.generalInfo.responsable.alcance || 'N/A')],
    ];
    autoTable(doc, {
      startY: yPos,
      head: [['RESPONSABLE DEL TRABAJO', 'DETALLE']],
      body: respRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 7, cellPadding: 1.5 },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 2: ALCANCE DEL TRABAJO - Descripción y Herramientas
  // ═══════════════════════════════════════════════════════════════════════════
  yPos = drawSectionHeader(doc, 'ALCANCE DEL TRABAJO - Descripción y Herramientas', yPos);

  // Descripción del trabajo
  autoTable(doc, {
    startY: yPos,
    body: [
      ['Tipo de Tarea:', String(permit.generalInfo?.workDescription || permit.alcance || 'N/A')],
    ],
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 2 },
    columnStyles: { 0: { cellWidth: 35, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 3;

  // Herramientas utilizadas
  if (permit.generalInfo?.tools && Array.isArray(permit.generalInfo.tools) && permit.generalInfo.tools.length > 0) {
    const toolRows = permit.generalInfo.tools.map((tool: any, idx: number) => [
      String(idx + 1),
      String(tool.name || 'N/A'),
      tool.status === 'B' ? '✓' : (tool.status === 'M' ? '✗' : '—')
    ]);
    autoTable(doc, {
      startY: yPos,
      head: [['No.', 'Herramienta/Equipo', 'Estado']],
      body: toolRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 7 },
      bodyStyles: { fontSize: 7, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 15, halign: 'center' }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 20, halign: 'center' } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 3;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 3: VERIFICACIÓN DE LOS PELIGROS ASOCIADOS A LA ACTIVIDAD
  // ═══════════════════════════════════════════════════════════════════════════
  if (permit.verificacionPeligros) {
    yPos = drawSectionHeader(doc, 'VERIFICACIÓN DE LOS PELIGROS ASOCIADOS A LA ACTIVIDAD', yPos);

    const peligrosRows = PELIGROS_VERIFICACION.map(campo => [
      campo.label,
      getStatusSymbol(permit.verificacionPeligros[campo.id])
    ]);
    autoTable(doc, {
      startY: yPos,
      head: [['PELIGRO', 'PRESENTE']],
      body: peligrosRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 7 },
      bodyStyles: { fontSize: 6, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 25, halign: 'center' } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 3;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 4: EQUIPOS DE PROTECCIÓN PERSONAL REQUERIDOS
  // ═══════════════════════════════════════════════════════════════════════════
  if (permit.eppEmergencias?.epp) {
    const eppRows = Object.entries(permit.eppEmergencias.epp)
      .filter(([_, value]) => value === true || value === 'si')
      .map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim(),
        getStatusSymbol(value as string | boolean)
      ]);
    if (eppRows.length > 0) {
      yPos = drawSectionHeader(doc, 'EQUIPOS DE PROTECCIÓN PERSONAL REQUERIDOS', yPos);
      autoTable(doc, {
        startY: yPos,
        head: [['EPP', '✓']],
        body: eppRows,
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 7 },
        bodyStyles: { fontSize: 6, cellPadding: 1 },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 20, halign: 'center' } },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN }
      });
      yPos = (doc as any).lastAutoTable.finalY + 3;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 5: NOTIFICACIONES Y MANEJO DE EMERGENCIAS
  // ═══════════════════════════════════════════════════════════════════════════
  if (permit.eppEmergencias?.emergencias) {
    const emergRows = Object.entries(permit.eppEmergencias.emergencias)
      .map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim(),
        getStatusSymbol(value as string | boolean)
      ]);
    if (emergRows.length > 0) {
      yPos = drawSectionHeader(doc, 'NOTIFICACIONES Y MANEJO DE EMERGENCIAS', yPos);
      autoTable(doc, {
        startY: yPos,
        head: [['EMERGENCIA / NOTIFICACIÓN', '✓']],
        body: emergRows,
        theme: 'grid',
        headStyles: { fillColor: [220, 53, 69] as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 7 },
        bodyStyles: { fontSize: 6, cellPadding: 1 },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 20, halign: 'center' } },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN }
      });
      yPos = (doc as any).lastAutoTable.finalY + 3;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 6: TRABAJADORES QUE PARTICIPAN EN LA ACTIVIDAD
  // ═══════════════════════════════════════════════════════════════════════════
  if (permit.workers && Array.isArray(permit.workers) && permit.workers.length > 0) {
    yPos = drawSectionHeader(doc, 'TRABAJADORES QUE PARTICIPAN EN LA ACTIVIDAD', yPos);

    const workerRows = permit.workers.map((w: any, idx: number) => [
      String(idx + 1),
      String(w.nombre || 'N/A'),
      String(w.cedula || 'N/A'),
      String(w.rol || 'N/A'),
      String(w.eps || 'N/A'),
      String(w.arl || 'N/A'),
      String(w.pensiones || 'N/A'),
      '',
      '',
    ]);
    autoTable(doc, {
      startY: yPos,
      head: [['No.', 'NOMBRE', 'CEDULA', 'CARGO', 'EPS', 'ARL', 'PENSION', 'F.APE', 'F.CIE']],
      body: workerRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 6 },
      bodyStyles: { fontSize: 5.5, cellPadding: 0.8, minCellHeight: 13 },
      columnStyles: {
        0: { cellWidth: 7, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 15 },
        3: { cellWidth: 20 },
        4: { cellWidth: 17 },
        5: { cellWidth: 17 },
        6: { cellWidth: 17 },
        7: { cellWidth: 18, halign: 'center' },
        8: { cellWidth: 18, halign: 'center' }
      },
      didDrawCell: (data: any) => {
        if (data.section !== 'body' || (data.column.index !== 7 && data.column.index !== 8)) return;
        const worker = permit.workers?.[data.row.index];
        const signature = data.column.index === 7 ? worker?.firmaApertura : worker?.firmaCierre;
        if (signature) {
          drawSignatureImage(doc, signature, data.cell.x + 1.5, data.cell.y + 1.5, data.cell.width - 3, data.cell.height - 3);
        } else {
          doc.setFontSize(6);
          doc.setTextColor(120, 120, 120);
          doc.text('-', data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2 + 1.5, { align: 'center' });
          doc.setTextColor(0, 0, 0);
        }
      },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 3;
  }

  // 7. INFORMACIÓN DE CIERRE (si existe)
  if (permit.closure && Object.keys(permit.closure).length > 0) {
    const closureRows = [
      ['Informe de Culminación:', getStatusSymbol(permit.closure.informeCulminacion)],
      ['Área Despejada:', getStatusSymbol(permit.closure.areaDespejada)],
      ['Evidencia de Partículas:', getStatusSymbol(permit.closure.evidenciaParticulas)],
      ['Continúa Labor:', getStatusSymbol(permit.closure.continuaLabor)],
      ['Dispositivos Retirados:', getStatusSymbol(permit.closure.dispositivosRetirados)],
      ['Fecha de Cierre:', (() => {
        try {
          const dateObj = parseFirestoreDate(permit.closure.fechaCierre);
          return dateObj ? format(dateObj, 'dd/MM/yyyy HH:mm') : 'N/A';
        } catch { return 'N/A'; }
      })()],
      ['Responsable Cierre:', String(permit.closure.responsable?.nombre || 'N/A')],
      ['Autoridad Cierre:', String(permit.closure.autoridad?.nombre || 'N/A')],
    ];
    if (permit.closure.cancelado === 'si') {
      closureRows.push(['PERMISO CANCELADO:', '✗ SÍ']);
      closureRows.push(['Razón Cancelación:', String(permit.closure.razonCancelacion || 'N/A')]);
      closureRows.push(['Cancelado Por:', String(permit.closure.canceladoPor?.nombre || 'N/A')]);
    }
    autoTable(doc, {
      startY: yPos,
      head: [['CIERRE DEL PERMISO', 'ESTADO']],
      body: closureRows,
      theme: 'grid',
      headStyles: { fillColor: [40, 167, 69] as [number, number, number], textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 7, cellPadding: 1.5 },
      columnStyles: { 0: { cellWidth: 100, fontStyle: 'bold' }, 1: { cellWidth: 'auto', halign: 'center' } }
    });
    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  // 10. FIRMAS DE AUTORIZACIÓN Y CIERRE
  drawSignatures(doc, permit, yPos);
};

const renderATSContent = (doc: jsPDF, permit: any) => {
  let yPos = MARGIN;
  yPos = drawPageHeader(doc, 'ANÁLISIS DE TRABAJO SEGURO (ATS)', 'DN-FR-SST-017', '02', yPos);
  yPos += 3;

  // 1. INFORMACIÓN GENERAL DEL ATS
  autoTable(doc, {
    startY: yPos,
    head: [['CAMPO', 'VALOR']],
    body: [
      ['Número Permiso:', String(permit.number || permit.id?.substring(0, 8) || 'S/N')],
      ['Área:', String(permit.generalInfo?.areaEspecifica || 'N/A')],
      ['Planta:', String(permit.generalInfo?.planta || 'N/A')],
      ['Empresa:', String(permit.generalInfo?.empresa || 'N/A')],
      ['Descripción Tarea:', String(permit.generalInfo?.workDescription || 'N/A')],
      ['Hora Inicio:', safeFormat(permit.generalInfo?.validFrom) || 'N/A'],
      ['Hora Terminación:', safeFormat(permit.generalInfo?.validUntil) || 'N/A'],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 8, fontStyle: 'bold' },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 45, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 5;

  // 2. PELIGROS IDENTIFICADOS (desde anexoATS.peligros)
  if (permit.anexoATS?.peligros && typeof permit.anexoATS.peligros === 'object') {
    const peligrosRows = Object.entries(permit.anexoATS.peligros).map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim().toUpperCase(),
      getStatusSymbol(value as string | boolean)
    ]);

    if (peligrosRows.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['PELIGRO IDENTIFICADO', '¿PRESENTE?']],
        body: peligrosRows,
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 8 },
        bodyStyles: { fontSize: 6, cellPadding: 1 },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 20, halign: 'center' } },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
    }
  }

  // 3. EPP REQUERIDOS DEL ATS (desde anexoATS.epp)
  if (permit.anexoATS?.epp && typeof permit.anexoATS.epp === 'object') {
    const eppRows = Object.entries(permit.anexoATS.epp)
      .filter(([key, value]) => value === true || value === 'si' || (typeof value === 'string' && value.length > 0 && !key.endsWith('_spec') && !key.endsWith('_tipo')))
      .map(([key, value]) => {
        let displayValue = getStatusSymbol(value as string | boolean);
        // Check for spec or tipo fields
        const specKey = `${key}_spec`;
        const tipoKey = `${key}_tipo`;
        const spec = (permit.anexoATS.epp as any)[specKey] || (permit.anexoATS.epp as any)[tipoKey];
        if (spec) displayValue = `✓ (${spec})`;
        return [key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim(), displayValue];
      });

    if (eppRows.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['EPP REQUERIDO', '¿APLICA?']],
        body: eppRows,
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 8 },
        bodyStyles: { fontSize: 6, cellPadding: 1 },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 60, halign: 'center' } },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
    }
  }

  // 4. JUSTIFICACIÓN DE USO DEL PERMISO (desde anexoATS.justificacion)
  if (permit.anexoATS?.justificacion && typeof permit.anexoATS.justificacion === 'object') {
    const justRows = Object.entries(permit.anexoATS.justificacion)
      .filter(([_, value]) => value === true)
      .map(([key]) => [key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim().toUpperCase(), '✓']);

    if (justRows.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['JUSTIFICACIÓN DE USO', 'APLICA']],
        body: justRows,
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 8 },
        bodyStyles: { fontSize: 6, cellPadding: 1 },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 20, halign: 'center' } },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
    }
  }

  // 5. PELIGROS ADICIONALES (si existen)
  if (permit.anexoATS?.peligrosAdicionales && Array.isArray(permit.anexoATS.peligrosAdicionales) && permit.anexoATS.peligrosAdicionales.length > 0) {
    const addRows = permit.anexoATS.peligrosAdicionales.map((p: any) => [
      String(p.peligro || 'N/A'),
      String(p.descripcion || 'N/A')
    ]);
    autoTable(doc, {
      startY: yPos,
      head: [['PELIGRO ADICIONAL', 'DESCRIPCIÓN']],
      body: addRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 8 },
      bodyStyles: { fontSize: 6, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 'auto' } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  // 6. CONTROLES (si existen)
  if (permit.anexoATS?.controles && typeof permit.anexoATS.controles === 'object') {
    const controlRows = Object.entries(permit.anexoATS.controles).map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim().toUpperCase(),
      getStatusSymbol(value as string | boolean)
    ]);
    if (controlRows.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['CONTROL', 'ESTADO']],
        body: controlRows,
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 8 },
        bodyStyles: { fontSize: 6, cellPadding: 1 },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 20, halign: 'center' } },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
    }
  }

  // 7. FIRMAS
  drawSignatures(doc, permit, yPos);
};

const renderAnexoAlturaContent = (doc: jsPDF, permit: any) => {
  let yPos = MARGIN;
  yPos = drawPageHeader(doc, 'ANEXO 1 - TRABAJOS EN ALTURA', 'DN-FR-SST-018', '02', yPos);
  yPos += 2;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 1: INFORMACIÓN GENERAL
  // ═══════════════════════════════════════════════════════════════════════════
  yPos = drawSectionHeader(doc, 'INFORMACIÓN GENERAL', yPos);

  // Obtener tipos de estructura seleccionados
  const tiposEstructura = permit.anexoAltura?.tipoEstructura || {};
  const tiposSeleccionados = Object.entries(tiposEstructura)
    .filter(([key, value]) => value === true && key !== 'otrosCual')
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim())
    .join(', ');

  autoTable(doc, {
    startY: yPos,
    body: [
      ['Área de Trabajo:', String(permit.generalInfo?.areaEspecifica || 'N/A'), 'Contrato:', String(permit.generalInfo?.contrato || 'N/A')],
      ['Tarea a Realizar:', String(permit.anexoAltura?.tareaRealizar?.nombre || 'N/A'), '', ''],
      ['Descripción:', String(permit.anexoAltura?.tareaRealizar?.descripcion || 'N/A'), '', ''],
      ['Altura Aproximada (m):', String(permit.anexoAltura?.alturaAproximada || 'N/A'), 'Tipo de Estructura:', tiposSeleccionados || 'N/A'],
      ['Contacto Emergencia:', String(permit.anexoAltura?.emergencia?.contacto || 'N/A'), 'Teléfono:', String(permit.anexoAltura?.emergencia?.telefono || 'N/A')],
    ],
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 55 },
      2: { cellWidth: 40, fontStyle: 'bold' },
      3: { cellWidth: 55 }
    },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 3;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 2: ASPECTOS DE SEGURIDAD PARA TRABAJO EN ALTURAS
  // ═══════════════════════════════════════════════════════════════════════════
  yPos = drawSectionHeader(doc, 'ASPECTOS DE SEGURIDAD PARA TRABAJO EN ALTURAS', yPos);

  const aspectosRows = ANEXO_ALTURA_CAMPOS.map(campo => [
    campo.id.toUpperCase(),
    campo.label,
    getStatusSymbol(permit.anexoAltura?.aspectosSeguridad?.[campo.id])
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['ID', 'ASPECTO DE SEGURIDAD', 'CUMPLE']],
    body: aspectosRows,
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 7 },
    bodyStyles: { fontSize: 6, cellPadding: 1 },
    columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 20, halign: 'center' } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 3;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 3: PRECAUCIONES Y CONTROLES
  // ═══════════════════════════════════════════════════════════════════════════
  if (permit.anexoAltura?.precauciones && Object.keys(permit.anexoAltura.precauciones).length > 0) {
    yPos = drawSectionHeader(doc, 'PRECAUCIONES Y CONTROLES ESPECÍFICOS', yPos);

    const precRows = Object.entries(permit.anexoAltura.precauciones).map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1').trim().toUpperCase(),
      getStatusSymbol(value as string | boolean)
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['PRECAUCIÓN/CONTROL', 'CUMPLE']],
      body: precRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 7 },
      bodyStyles: { fontSize: 6, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 20, halign: 'center' } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 3;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 4: AFECTACIONES
  // ═══════════════════════════════════════════════════════════════════════════
  if (permit.anexoAltura?.afectaciones) {
    yPos = drawSectionHeader(doc, 'AFECTACIONES', yPos);

    autoTable(doc, {
      startY: yPos,
      body: [
        ['¿Produce riesgos para otras áreas?', getStatusSymbol(permit.anexoAltura.afectaciones.riesgoOtrasAreas)],
        ['¿Otras áreas producen riesgo a este trabajo?', getStatusSymbol(permit.anexoAltura.afectaciones.otrasAreasRiesgo)],
        ['¿Personal notificado?', getStatusSymbol(permit.anexoAltura.afectaciones.personalNotificado)],
        ['Observaciones:', String(permit.anexoAltura.afectaciones.observaciones || 'N/A')],
      ],
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 1.5 },
      columnStyles: { 0: { cellWidth: 100, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 3;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN 5: VALIDACIÓN DIARIA DE INICIO/CIERRE
  // ═══════════════════════════════════════════════════════════════════════════
  if (permit.anexoAltura?.validacion) {
    yPos = drawSectionHeader(doc, 'VALIDACION DIARIA DE INICIO/CIERRE', yPos);

    const drawDailyValidationTable = (title: string, rows: any[]) => {
      if (!Array.isArray(rows) || rows.length === 0) return;
      const body = rows.map((v: any) => [
        String(v.dia || ''),
        String(v.fecha || ''),
        String(v.nombre || ''),
        '',
        String(v.fechaCierre || ''),
        '',
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [[title.toUpperCase()]],
        body: [],
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 7, fontStyle: 'bold' },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN },
      });
      yPos = (doc as any).lastAutoTable.finalY;

      autoTable(doc, {
        startY: yPos,
        head: [['DIA', 'FECHA INICIO', 'NOMBRE', 'FIRMA INICIO', 'FECHA FIN', 'FIRMA FIN']],
        body,
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255] as [number, number, number], fontSize: 6.5 },
        bodyStyles: { fontSize: 5.8, cellPadding: 0.8, minCellHeight: 14 },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 32 },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 28, halign: 'center' },
          4: { cellWidth: 32 },
          5: { cellWidth: 28, halign: 'center' },
        },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN },
        didDrawCell: (data: any) => {
          if (data.section !== 'body' || (data.column.index !== 3 && data.column.index !== 5)) return;
          const row = rows[data.row.index];
          const signature = data.column.index === 3 ? row?.firma : row?.firmaCierre;
          if (signature) {
            drawSignatureImage(doc, signature, data.cell.x + 1.5, data.cell.y + 1.5, data.cell.width - 3, data.cell.height - 3);
          } else {
            doc.setFontSize(6);
            doc.setTextColor(120, 120, 120);
            doc.text('-', data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2 + 1.5, { align: 'center' });
            doc.setTextColor(0, 0, 0);
          }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 3;
    };

    drawDailyValidationTable('Autoridad del Area', permit.anexoAltura.validacion.autoridad || []);
    drawDailyValidationTable('Responsable del Trabajo', permit.anexoAltura.validacion.responsable || []);
  }

  drawSignatures(doc, permit, yPos);
};

const renderAnexoConfinadoContent = (doc: jsPDF, permit: any) => {
  let yPos = MARGIN;
  yPos = drawPageHeader(doc, 'ANEXO 2 - TRABAJOS EN ESPACIOS CONFINADOS', '', '', yPos);
  yPos += 3;

  // Información General
  autoTable(doc, {
    startY: yPos,
    head: [['INFORMACIÓN GENERAL']],
    body: [
      ['Área de Trabajo:', permit.generalInfo?.areaEspecifica || ''],
      ['Equipo/Área Específica:', permit.anexoConfinado?.equipoEspecifico || ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Pruebas de Gases
  if (permit.anexoConfinado?.resultadosPruebasGases) {
    const gasesRows = [
      ['LEL (%)', permit.anexoConfinado.resultadosPruebasGases.lel || '—', '0%', permit.anexoConfinado.resultadosPruebasGases.lel === '0%' ? '✓' : ''],
      ['O2 (%)', permit.anexoConfinado.resultadosPruebasGases.o2 || '—', '19.5-22%', ''],
      ['H2S (PPM)', permit.anexoConfinado.resultadosPruebasGases.h2s || '—', '0-10', ''],
      ['CO (PPM)', permit.anexoConfinado.resultadosPruebasGases.co || '—', '0-25', ''],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [['PARÁMETRO', 'RESULTADO', 'LÍMITE PERMISIBLE', 'OK']],
      body: gasesRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE as [number, number, number], textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 7, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 40 }, 2: { cellWidth: 'auto' }, 3: { cellWidth: 20, halign: 'center' } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  yPos = drawSectionHeader(doc, 'IDENTIFICACION DE PELIGROS', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoConfinado?.identificacionPeligros), 'PELIGRO / CONTROL');

  yPos = drawSectionHeader(doc, 'PRECAUCIONES Y CONTROLES', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoConfinado?.precauciones), 'PRECAUCION / CONTROL');

  yPos = drawSectionHeader(doc, 'REQUERIMIENTOS DE EQUIPOS', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoConfinado?.requerimientosEquipos), 'REQUERIMIENTO');

  if (permit.anexoConfinado?.pruebasGasesPeriodicas) {
    yPos = drawSectionHeader(doc, 'PRUEBAS PERIODICAS DE GASES', yPos);
    autoTable(doc, {
      startY: yPos,
      body: [
        ['Intervalo:', permit.anexoConfinado.pruebasGasesPeriodicas.intervalo || 'N/A', 'Realizada por:', permit.anexoConfinado.pruebasGasesPeriodicas.pruebaRealizadaPor || 'N/A'],
        ['Serial monitor:', permit.anexoConfinado.pruebasGasesPeriodicas.serialMonitor || 'N/A', 'Marca:', permit.anexoConfinado.pruebasGasesPeriodicas.marca || 'N/A'],
        ['Fecha calibracion:', permit.anexoConfinado.pruebasGasesPeriodicas.fechaCalibracion || 'N/A', '', ''],
      ],
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 1.5 },
      columnStyles: { 0: { cellWidth: 35, fontStyle: 'bold' }, 1: { cellWidth: 55 }, 2: { cellWidth: 35, fontStyle: 'bold' }, 3: { cellWidth: 55 } },
      tableWidth: PAGE_WIDTH - 2 * MARGIN,
      margin: { left: MARGIN, right: MARGIN }
    });
    yPos = (doc as any).lastAutoTable.finalY + 3;

    const pruebas = permit.anexoConfinado.pruebasGasesPeriodicas.pruebas || [];
    if (Array.isArray(pruebas) && pruebas.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['HORA', 'LEL', 'O2', 'H2S', 'CO', 'FIRMA']],
        body: pruebas.map((p: any) => [p.hora || 'N/A', p.lel || '-', p.o2 || '-', p.h2s || '-', p.co || '-', p.firma ? 'Si' : '-']),
        theme: 'grid',
        headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 7 },
        bodyStyles: { fontSize: 6, cellPadding: 1 },
        tableWidth: PAGE_WIDTH - 2 * MARGIN,
        margin: { left: MARGIN, right: MARGIN }
      });
      yPos = (doc as any).lastAutoTable.finalY + 3;
    }
  }

  drawSignatures(doc, permit, yPos);
};

const renderAnexoEnergiaContent = (doc: jsPDF, permit: any) => {
  let yPos = MARGIN;
  yPos = drawPageHeader(doc, 'ANEXO 3 - TRABAJOS CON ENERGIAS PELIGROSAS', '', '', yPos);
  yPos += 3;

  autoTable(doc, {
    startY: yPos,
    head: [['INFORMACION GENERAL']],
    body: [
      ['Area de Trabajo:', permit.generalInfo?.areaEspecifica || 'N/A', 'Contacto emergencia:', permit.anexoEnergias?.emergencia?.contacto || 'N/A'],
      ['Telefono emergencia:', permit.anexoEnergias?.emergencia?.telefono || 'N/A', 'Tipos de energia:', selectedMapLabels(permit.anexoEnergias?.energiasPeligrosas)],
      ['Metodo de trabajo:', selectedMapLabels(permit.anexoEnergias?.metodoTrabajo), 'Observaciones:', permit.anexoEnergias?.observaciones || 'N/A'],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 35, fontStyle: 'bold' }, 1: { cellWidth: 55 }, 2: { cellWidth: 35, fontStyle: 'bold' }, 3: { cellWidth: 55 } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 4;

  yPos = drawSectionHeader(doc, 'TRABAJOS EN CALIENTE', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoEnergias?.trabajosEnCaliente), 'CONTROL');
  yPos = drawSectionHeader(doc, 'PROCEDIMIENTO LO/TO', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoEnergias?.procedimientoLOTO), 'REQUISITO');
  yPos = drawSectionHeader(doc, 'TENSION EXPUESTA', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoEnergias?.tensionExpuesta), 'TIPO');
  yPos = drawSectionHeader(doc, 'PLANEACION DEL TRABAJO ELECTRICO', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoEnergias?.planeacion), 'REQUISITO');
  yPos = drawSectionHeader(doc, 'TRABAJO CON TENSION', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoEnergias?.trabajoConTension), 'CONTROL');
  yPos = drawSectionHeader(doc, 'TRABAJO SIN TENSION', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoEnergias?.trabajoSinTension), 'CONTROL');

  drawSignatures(doc, permit, yPos);
};

const renderAnexoIzajeContent = (doc: jsPDF, permit: any) => {
  let yPos = MARGIN;
  yPos = drawPageHeader(doc, 'ANEXO 4 - IZAJE DE CARGAS', '', '', yPos);
  yPos += 3;

  const info = permit.anexoIzaje?.informacionGeneral || {};
  autoTable(doc, {
    startY: yPos,
    head: [['DETALLES DE IZAJE']],
    body: [
      ['Area de Trabajo:', permit.generalInfo?.areaEspecifica || 'N/A'],
      ['Acciones:', selectedMapLabels(info.accion)],
      ['Peso de Carga:', selectedMapLabels(info.pesoCarga)],
      ['Equipos a Utilizar:', selectedMapLabels(info.equipoUtilizar)],
      ['Capacidad del Equipo:', info.capacidadEquipo || 'N/A'],
      ['Contacto Emergencia:', permit.anexoIzaje?.emergencia?.contacto || 'N/A'],
      ['Telefono Emergencia:', permit.anexoIzaje?.emergencia?.telefono || 'N/A'],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 4;

  yPos = drawSectionHeader(doc, 'ASPECTOS REQUERIDOS', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoIzaje?.aspectosRequeridos), 'ASPECTO');
  yPos = drawSectionHeader(doc, 'PRECAUCIONES Y CONTROLES', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoIzaje?.precauciones), 'CONTROL');

  drawSignatures(doc, permit, yPos);
};

const renderAnexoExcavacionesContent = (doc: jsPDF, permit: any) => {
  let yPos = MARGIN;
  yPos = drawPageHeader(doc, 'ANEXO 5 - EXCAVACIONES', '', '', yPos);
  yPos += 3;

  const info = permit.anexoExcavaciones?.informacionGeneral || {};
  autoTable(doc, {
    startY: yPos,
    head: [['DIMENSIONES DE EXCAVACION']],
    body: [
      ['Area de Trabajo:', permit.generalInfo?.areaEspecifica || 'N/A'],
      ['Dimensiones:', info.dimensiones || 'N/A'],
      ['Profundidad:', info.profundidad || 'N/A'],
      ['Ancho:', info.ancho || 'N/A'],
      ['Largo:', info.largo || 'N/A'],
      ['Contacto Emergencia:', permit.anexoExcavaciones?.emergencia?.contacto || 'N/A'],
      ['Telefono Emergencia:', permit.anexoExcavaciones?.emergencia?.telefono || 'N/A'],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
    margin: { left: MARGIN, right: MARGIN }
  });
  yPos = (doc as any).lastAutoTable.finalY + 4;

  yPos = drawSectionHeader(doc, 'ASPECTOS REQUERIDOS', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoExcavaciones?.aspectosRequeridos), 'ASPECTO');
  yPos = drawSectionHeader(doc, 'PRECAUCIONES Y CONTROLES', yPos);
  yPos = renderStatusTable(doc, yPos, objectStatusRows(permit.anexoExcavaciones?.precauciones), 'CONTROL');

  drawSignatures(doc, permit, yPos);
};


// ============================================================================
// 📦 GENERADORES PÚBLICOS (WRAPPERS)
// ============================================================================

export const generatePermitoPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  renderPermitContent(doc, permit);
  drawFooter(doc);
  return doc.output('blob');
};

export const generateATSPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  renderATSContent(doc, permit);
  drawFooter(doc);
  return doc.output('blob');
};

export const generateAnexoAlturaPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  renderAnexoAlturaContent(doc, permit);
  drawFooter(doc);
  return doc.output('blob');
};

export const generateAnexoConfinadoPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  renderAnexoConfinadoContent(doc, permit);
  drawFooter(doc);
  return doc.output('blob');
};

export const generateAnexoEnergiaPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  renderAnexoEnergiaContent(doc, permit);
  drawFooter(doc);
  return doc.output('blob');
};

export const generateAnexoIzajePDF = (permit: any): Blob => {
  const doc = createNewPDF();
  renderAnexoIzajeContent(doc, permit);
  drawFooter(doc);
  return doc.output('blob');
};

export const generateAnexoExcavacionesPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  renderAnexoExcavacionesContent(doc, permit);
  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 🚀 GENERADOR UNIFICADO (TODO EN UNO)
// ============================================================================

// 🚀 GENERADOR UNIFICADO (TODO EN UNO)
// ============================================================================

export const generateUnifiedPDF = (permit: any): Blob => {
  const doc = createNewPDF();

  // 1. Permiso Principal (Siempre va)
  renderPermitContent(doc, permit);

  // 2. ATS (Siempre va si existe)
  doc.addPage();
  renderATSContent(doc, permit);

  // 3. Anexos (Solo si fueron seleccionados específicamente)

  // Anexo 1: Alturas
  if (isWorkTypeSelected(permit, 'trabajoAlturas', 'alturas') && permit.anexoAltura) {
    doc.addPage();
    renderAnexoAlturaContent(doc, permit);
  }

  // Anexo 2: Espacios Confinados
  if (isWorkTypeSelected(permit, 'espaciosConfinados', 'confinado') && permit.anexoConfinado) {
    doc.addPage();
    renderAnexoConfinadoContent(doc, permit);
  }

  // Anexo 3: Energías Peligrosas
  if (isWorkTypeSelected(permit, 'controlEnergia', 'energia') && permit.anexoEnergias) {
    doc.addPage();
    renderAnexoEnergiaContent(doc, permit);
  }

  // Anexo 4: Izaje
  if (isWorkTypeSelected(permit, 'izajeCargas', 'izaje') && permit.anexoIzaje) {
    doc.addPage();
    renderAnexoIzajeContent(doc, permit);
  }

  // Anexo 5: Excavaciones
  if (isWorkTypeSelected(permit, 'excavaciones', 'excavacion') && permit.anexoExcavaciones) {
    doc.addPage();
    renderAnexoExcavacionesContent(doc, permit);
  }

  // Footer global para numeración continua
  drawFooter(doc);

  return doc.output('blob');
};

// ============================================================================
// 💾 UTILIDADES DE DESCARGA
// ============================================================================

// ============================================================================
// 💾 UTILIDADES DE DESCARGA
// ============================================================================

export const downloadFile = (blob: Blob, filename: string) => {
  // Asegurar extensión .pdf
  if (!filename.toLowerCase().endsWith('.pdf')) {
    filename += '.pdf';
  }

  console.log(`⬇️ DEBUG: Intentando descargar: ${filename}`);

  // 🛡️ Asegurar MIME Type correcto
  const pdfBlob = new Blob([blob], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(pdfBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  // link.style.display = 'none'; // A veces ocultarlo previene la descarga en entornos estrictos
  document.body.appendChild(link);

  link.click();

  // Aumentar delay a 2 segundos para asegurar que entornos lentos lo procesen
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    window.URL.revokeObjectURL(url);
    console.log('✅ DEBUG: Limpieza de descarga completada');
  }, 2000);
};

// ============================================================================
// 🎯 FUNCIÓN PRINCIPAL - DESCARGA FLEXIBLE
// ============================================================================

// ============================================================================
// 🎯 FUNCIÓN PRINCIPAL - DESCARGA FLEXIBLE
// ============================================================================

export const handleExportPDF = async (
  permit: any,
  docType: 'permiso' | 'ats' | 'altura' | 'confinado' | 'energia' | 'izaje' | 'excavacion' | 'all'
) => {
  try {
    const rawNum = permit.number || permit.id?.substring(0, 6) || 'SIN_NUM';
    // 🛡️ SANITIZACIÓN: Reemplazar caracteres no válidos para nombres de archivo (ej: / \ : )
    const permisoNum = rawNum.replace(/[^a-zA-Z0-9-_]/g, '-');
    const dateStr = new Date().toISOString().split('T')[0];

    if (docType === 'all') {
      // ✨ CAMBIO: Generar un ÚNICO PDF con todo unificado
      const unifiedBlob = generateUnifiedPDF(permit);
      downloadFile(unifiedBlob, `Permiso-Completo-${permisoNum}-${dateStr}.pdf`);
    } else {
      // Descargar PDF individual
      let blob: Blob;
      let filename: string;

      switch (docType) {
        case 'permiso':
          blob = generatePermitoPDF(permit);
          filename = `DN-FR-SST-016-Permiso-${permisoNum}-${dateStr}.pdf`;
          break;
        case 'ats':
          blob = generateATSPDF(permit);
          filename = `DN-FR-SST-017-ATS-${permisoNum}-${dateStr}.pdf`;
          break;
        case 'altura':
          blob = generateAnexoAlturaPDF(permit);
          filename = `Anexo-01-Alturas-${permisoNum}-${dateStr}.pdf`;
          break;
        case 'confinado':
          blob = generateAnexoConfinadoPDF(permit);
          filename = `Anexo-02-Confinados-${permisoNum}-${dateStr}.pdf`;
          break;
        case 'energia':
          blob = generateAnexoEnergiaPDF(permit);
          filename = `Anexo-03-Energias-${permisoNum}-${dateStr}.pdf`;
          break;
        case 'izaje':
          blob = generateAnexoIzajePDF(permit);
          filename = `Anexo-04-Izaje-${permisoNum}-${dateStr}.pdf`;
          break;
        case 'excavacion':
          blob = generateAnexoExcavacionesPDF(permit);
          filename = `Anexo-05-Excavaciones-${permisoNum}-${dateStr}.pdf`;
          break;
        default:
          throw new Error('Tipo de documento no soportado');
      }

      downloadFile(blob, filename);
    }
  } catch (error) {
    console.error('Error generando PDF:', error);
    throw error;
  }
};

// ============================================================================
// ✅ FUNCIÓN COMPATIBILIDAD - MANTIENE API ANTERIOR
// ============================================================================

// ============================================================================
// 📘 GENERADOR MANUAL DE USUARIO
// ============================================================================

export const generateUserManualPDF = () => {
  const doc = createNewPDF();
  let yPos = 15;

  // 1. HEADER
  yPos = drawPageHeader(doc, 'Manual de Usuario - Permisos de Trabajo Digitales', 'MN-SST-001', '1', yPos);

  // 2. INTRODUCCIÓN
  yPos = drawSectionHeader(doc, '1. INTRODUCCIÓN', yPos);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const introText = "Este manual describe el funcionamiento de la plataforma digital para la gestión de Permisos de Trabajo. El objetivo es facilitar la solicitud, aprobación y cierre de permisos de alto riesgo, asegurando el cumplimiento de las normativas de seguridad.";
  const splitIntro = doc.splitTextToSize(introText, PAGE_WIDTH - 2 * MARGIN);
  doc.text(splitIntro, MARGIN, yPos);
  yPos += splitIntro.length * 4 + 5;

  // 3. ROLES DEL SISTEMA
  yPos = drawSectionHeader(doc, '2. ROLES DEL SISTEMA', yPos);

  const rolesData = [
    ['Rol', 'Responsabilidad Principal'],
    ['Solicitante / Líder', 'Crea el permiso, diligencia la información y solicita aprobación.'],
    ['Jefe de Área', 'Revisa la solicitud, verifica condiciones y aprueba o rechaza.'],
    ['Coordinador Alturas', 'Verifica y aprueba específicamente trabajos en alturas.'],
    ['Emisor (SST)', 'Verificación final de seguridad, firma de apertura y cierre.'],
    ['Aislador Competente', 'Encargado de bloqueo y etiquetado de energías.'],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Rol', 'Responsabilidad Principal']],
    body: rolesData.slice(1),
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: ITALCOL_ORANGE as any, textColor: 255, fontStyle: 'bold', halign: 'left' },
    margin: { left: MARGIN, right: MARGIN },
    tableWidth: PAGE_WIDTH - 2 * MARGIN,
  });

  // @ts-ignore
  yPos = doc.lastAutoTable.finalY + 10;

  // 4. FLUJO DE TRABAJO
  yPos = drawSectionHeader(doc, '3. FLUJO DE TRABAJO', yPos);

  const steps = [
    { title: '1. Iniciar Sesión', desc: 'Ingrese con su correo corporativo y contraseña asignada.' },
    { title: '2. Crear Permiso', desc: 'Desde el Dashboard, clic en "Nuevo Permiso". Seleccione planta, área y marque los trabajos de alto riesgo (Alturas, Caliente, etc.).' },
    { title: '3. Diligenciar Anexos', desc: 'Complete los checklists específicos (ATS, Alturas, etc.) que aparecen según su selección.' },
    { title: '4. Firmas de Aprobación', desc: 'El sistema solicitará las firmas en orden: Jefe de Área -> Coordinador -> SST. El estado cambiará automáticamente.' },
    { title: '5. Ejecución y Validación Diaria', desc: 'Una vez en estado "En Ejecución", se habilitan las pestañas de "Validación Diaria". Cada día debe firmar apertura y cierre.' },
    { title: '6. Cierre del Permiso', desc: 'Al finalizar el trabajo, el SST realiza el cierre definitivo. El permiso pasa a estado "Cerrado" y se genera el PDF final.' },
  ];

  steps.forEach(step => {
    // Check page break
    if (yPos > PAGE_HEIGHT - 30) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(step.title, MARGIN, yPos);
    yPos += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const descLines = doc.splitTextToSize(step.desc, PAGE_WIDTH - 2 * MARGIN);
    doc.text(descLines, MARGIN, yPos);
    yPos += descLines.length * 4 + 3;
  });

  yPos += 5;

  // 5. TIPS IMPORTANTES
  if (yPos > PAGE_HEIGHT - 40) {
    doc.addPage();
    yPos = 20;
  }
  yPos = drawSectionHeader(doc, '4. INFORMACIÓN IMPORTANTE', yPos);

  const tips = [
    "• Guardado Automático: El sistema guarda borradores, pero asegúrese de dar clic en 'Guardar' antes de cerrar.",
    "• Firmas: Las firmas son digitales. No comparta su usuario y contraseña.",
    "• Cierre Diario: Si el permiso dura varios días, ES OBLIGATORIO firmar la validación diaria de inicio y cierre.",
    "• Soporte: Si presenta fallas, contacte al área de sistemas o SST inmediato.",
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  tips.forEach(tip => {
    doc.text(tip, MARGIN, yPos);
    yPos += 5;
  });

  // Footer final (se aplica a todas las páginas)
  drawFooter(doc, 'MN-SST-001', '1');

  // Descargar
  const fileName = `Manual_Usuario_SST_${format(new Date(), 'yyyyMMdd')}.pdf`;
  doc.save(fileName);
};

export const generateCompleteWorkPermitPDF = async (permit: any) => {
  try {
    await handleExportPDF(permit, 'all');
  } catch (error) {
    console.error('Error en generateCompleteWorkPermitPDF:', error);
    throw error;
  }
};
