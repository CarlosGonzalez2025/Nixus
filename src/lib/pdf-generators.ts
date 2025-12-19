// ✅ Archivo refactorizado: lib/pdf-generators.ts
// Reemplaza lib/pdf-generator.ts con esta versión modular

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format, parseISO } from 'date-fns';

// ============================================================================
// 🎨 CONSTANTES Y UTILIDADES
// ============================================================================

const ITALCOL_ORANGE = [239, 123, 0];
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

const drawPageHeader = (doc: jsPDF, title: string, code: string, version: string, yPos: number) => {
  doc.setFillColor(ITALCOL_ORANGE[0], ITALCOL_ORANGE[1], ITALCOL_ORANGE[2]);
  doc.rect(MARGIN, yPos, PAGE_WIDTH - 2 * MARGIN, 6, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(title.toUpperCase(), PAGE_WIDTH / 2, yPos + 4, { align: 'center' });
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`${code} | Versión: ${version}`, PAGE_WIDTH - MARGIN - 30, yPos + 4);
  
  return yPos + 8;
};

const drawFooter = (doc: jsPDF) => {
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Página ${i} de ${totalPages}`,
      PAGE_WIDTH / 2,
      PAGE_HEIGHT - 5,
      { align: 'center' }
    );
  }
};

const safeFormat = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), 'dd/MM/yyyy HH:mm');
  } catch {
    return dateStr || 'N/A';
  }
};

// ============================================================================
// 📄 GENERADOR 1: PERMISO DE TRABAJO (DN-FR-SST-016)
// ============================================================================

export const generatePermitoPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  let yPos = MARGIN;

  // Encabezado principal
  yPos = drawPageHeader(doc, 'PERMISO DE TRABAJO', 'DN-FR-SST-016', '05', yPos);
  yPos += 3;

  // Información General
  autoTable(doc, {
    startY: yPos,
    head: [['INFORMACIÓN GENERAL']],
    body: [
      ['Número Permiso:', permit.number || permit.id?.substring(0, 8) || 'S/N'],
      ['Empresa:', permit.generalInfo?.empresa || ''],
      ['Planta:', permit.generalInfo?.planta || ''],
      ['Proceso:', permit.generalInfo?.proceso || ''],
      ['Área Específica:', permit.generalInfo?.areaEspecifica || ''],
      ['Contrato:', permit.generalInfo?.contrato || ''],
      ['Válido Desde:', safeFormat(permit.generalInfo?.validFrom)],
      ['Válido Hasta:', safeFormat(permit.generalInfo?.validUntil)],
      ['Solicitante:', permit.user?.displayName || ''],
      ['Responsable:', permit.generalInfo?.responsable?.nombre || ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Alcance del Trabajo
  autoTable(doc, {
    startY: yPos,
    head: [['ALCANCE/DESCRIPCIÓN DEL TRABAJO']],
    body: [[permit.generalInfo?.workDescription || permit.alcance || 'No especificado']],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 2 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Peligros Identificados
  if (permit.verificacionPeligros) {
    const peligrosRows = PELIGROS_VERIFICACION.map(campo => [
      campo.label,
      getStatusSymbol(permit.verificacionPeligros[campo.id])
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['TIPO DE PELIGRO', 'PRESENTE']],
      body: peligrosRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 7, cellPadding: 1.5 },
      columnStyles: { 0: { cellWidth: 130 }, 1: { cellWidth: 30, halign: 'center' } }
    });

    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  // EPP si existe
  if (permit.eppEmergencias?.epp) {
    const eppRows = Object.entries(permit.eppEmergencias.epp)
      .map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').trim(),
        getStatusSymbol(value)
      ]);

    autoTable(doc, {
      startY: yPos,
      head: [['EQUIPO DE PROTECCIÓN PERSONAL', 'REQUERIDO']],
      body: eppRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 7, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 130 }, 1: { cellWidth: 30, halign: 'center' } }
    });
  }

  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 📄 GENERADOR 2: ATS - ANÁLISIS DE TRABAJO SEGURO (DN-FR-SST-017)
// ============================================================================

export const generateATSPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  let yPos = MARGIN;

  yPos = drawPageHeader(doc, 'ANÁLISIS DE TRABAJO SEGURO (ATS)', 'DN-FR-SST-017', '02', yPos);
  yPos += 3;

  // Información General
  autoTable(doc, {
    startY: yPos,
    head: [['INFORMACIÓN DEL ATS']],
    body: [
      ['Número Permiso:', permit.number || permit.id?.substring(0, 8) || 'S/N'],
      ['Área:', permit.generalInfo?.areaEspecifica || ''],
      ['Descripción Tarea:', permit.generalInfo?.workDescription || ''],
      ['Hora Inicio:', safeFormat(permit.generalInfo?.validFrom)],
      ['Hora Terminación:', safeFormat(permit.generalInfo?.validUntil)],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Peligros y Controles
  if (permit.ats && Array.isArray(permit.ats)) {
    const atsRows = permit.ats.map((item: any) => [
      item.seccion || '',
      item.label || '',
      getStatusSymbol(item.valor)
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['SECCIÓN', 'PELIGRO IDENTIFICADO', 'PRESENTE']],
      body: atsRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 6, cellPadding: 1 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 130 },
        2: { cellWidth: 20, halign: 'center' }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  // Revalidación Diaria
  if (permit.atsRevalidacion && Array.isArray(permit.atsRevalidacion) && permit.atsRevalidacion.length > 0) {
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const revalidacionRows = permit.atsRevalidacion.slice(0, 7).map((item: any, idx: number) => [
      diasSemana[idx] || '',
      item.firmado ? '✓' : '—',
      item.nombre || '',
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['DÍA', 'REVALIDADO', 'RESPONSABLE']],
      body: revalidacionRows,
      theme: 'grid',
      headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 7, cellPadding: 1.5 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 30, halign: 'center' }, 2: { cellWidth: 90 } }
    });
  }

  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 📄 GENERADOR 3: ANEXO 1 - TRABAJOS EN ALTURA
// ============================================================================

export const generateAnexoAlturaPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  let yPos = MARGIN;

  yPos = drawPageHeader(doc, 'ANEXO 1 - TRABAJOS EN ALTURA', '', '', yPos);
  yPos += 3;

  // Información General
  const tiposEstructura = permit.anexoAltura?.tipoEstructura || [];
  autoTable(doc, {
    startY: yPos,
    head: [['INFORMACIÓN GENERAL']],
    body: [
      ['Área de Trabajo:', permit.generalInfo?.areaEspecifica || ''],
      ['Equipo/Área Específica:', permit.anexoAltura?.equipoEspecifico || ''],
      ['Altura Aproximada (m):', permit.anexoAltura?.altura || ''],
      ['Tipo de Estructura:', Array.isArray(tiposEstructura) ? tiposEstructura.join(', ') : ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Aspectos de Seguridad
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
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 6, cellPadding: 1 },
    columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 145 }, 2: { cellWidth: 20, halign: 'center' } }
  });

  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 📄 GENERADOR 4: ANEXO 2 - ESPACIOS CONFINADOS
// ============================================================================

export const generateAnexoConfínadoPDF = (permit: any): Blob => {
  const doc = createNewPDF();
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
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } }
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
      headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
      bodyStyles: { fontSize: 7, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 40 }, 2: { cellWidth: 50 }, 3: { cellWidth: 20, halign: 'center' } }
    });

    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  // Aspectos de Seguridad
  const aspectosRows = ANEXO_CONFINADO_CAMPOS.map(campo => [
    campo.id.toUpperCase(),
    campo.label,
    getStatusSymbol(permit.anexoConfinado?.identificacionPeligros?.[campo.id])
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['ID', 'ASPECTO DE SEGURIDAD', 'CUMPLE']],
    body: aspectosRows,
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 6, cellPadding: 1 },
    columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 145 }, 2: { cellWidth: 20, halign: 'center' } }
  });

  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 📄 GENERADOR 5: ANEXO 3 - ENERGÍAS PELIGROSAS
// ============================================================================

export const generateAnexoEnergiaPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  let yPos = MARGIN;

  yPos = drawPageHeader(doc, 'ANEXO 3 - TRABAJOS CON ENERGÍAS PELIGROSAS', '', '', yPos);
  yPos += 3;

  // Información General
  const tiposEnergia = permit.anexoEnergias?.tiposEnergia || [];
  autoTable(doc, {
    startY: yPos,
    head: [['INFORMACIÓN GENERAL']],
    body: [
      ['Área de Trabajo:', permit.generalInfo?.areaEspecifica || ''],
      ['Tipos de Energía:', Array.isArray(tiposEnergia) ? tiposEnergia.join(', ') : ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Aspectos de Seguridad
  const aspectosRows = ANEXO_ENERGIA_CAMPOS.map(campo => [
    campo.id.toUpperCase(),
    campo.label,
    getStatusSymbol(permit.anexoEnergias?.[campo.id])
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['ID', 'ASPECTO DE SEGURIDAD', 'CUMPLE']],
    body: aspectosRows,
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 6, cellPadding: 1 },
    columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 145 }, 2: { cellWidth: 20, halign: 'center' } }
  });

  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 📄 GENERADOR 6: ANEXO 4 - IZAJE DE CARGAS
// ============================================================================

export const generateAnexoIzajePDF = (permit: any): Blob => {
  const doc = createNewPDF();
  let yPos = MARGIN;

  yPos = drawPageHeader(doc, 'ANEXO 4 - IZAJE DE CARGAS', '', '', yPos);
  yPos += 3;

  // Detalles de Izaje
  const acciones = permit.anexoIzaje?.accion || [];
  const equipos = permit.anexoIzaje?.equipo || [];
  
  autoTable(doc, {
    startY: yPos,
    head: [['DETALLES DE IZAJE']],
    body: [
      ['Área de Trabajo:', permit.generalInfo?.areaEspecifica || ''],
      ['Acciones:', Array.isArray(acciones) ? acciones.join(', ') : ''],
      ['Peso de Carga:', permit.anexoIzaje?.pesoRango || ''],
      ['Equipos a Utilizar:', Array.isArray(equipos) ? equipos.join(', ') : ''],
      ['Capacidad del Equipo:', permit.anexoIzaje?.capacidad || ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Aspectos de Seguridad
  const aspectosRows = ANEXO_IZAJE_CAMPOS.map(campo => [
    campo.id.toUpperCase(),
    campo.label,
    getStatusSymbol(permit.anexoIzaje?.identificacionPeligros?.[campo.id])
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['ID', 'ASPECTO DE SEGURIDAD', 'CUMPLE']],
    body: aspectosRows,
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 6, cellPadding: 1 },
    columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 145 }, 2: { cellWidth: 20, halign: 'center' } }
  });

  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 📄 GENERADOR 7: ANEXO 5 - EXCAVACIONES
// ============================================================================

export const generateAnexoExcavacionesPDF = (permit: any): Blob => {
  const doc = createNewPDF();
  let yPos = MARGIN;

  yPos = drawPageHeader(doc, 'ANEXO 5 - EXCAVACIONES', '', '', yPos);
  yPos += 3;

  // Dimensiones
  autoTable(doc, {
    startY: yPos,
    head: [['DIMENSIONES DE EXCAVACIÓN']],
    body: [
      ['Área de Trabajo:', permit.generalInfo?.areaEspecifica || ''],
      ['Profundidad (m):', permit.anexoExcavaciones?.profundidad || ''],
      ['Ancho (m):', permit.anexoExcavaciones?.ancho || ''],
      ['Largo (m):', permit.anexoExcavaciones?.largo || ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } }
  });

  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Aspectos de Seguridad
  const aspectosRows = ANEXO_EXCAVACION_CAMPOS.map(campo => [
    campo.id.toUpperCase(),
    campo.label,
    getStatusSymbol(permit.anexoExcavaciones?.identificacionPeligros?.[campo.id])
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['ID', 'ASPECTO DE SEGURIDAD', 'CUMPLE']],
    body: aspectosRows,
    theme: 'grid',
    headStyles: { fillColor: ITALCOL_ORANGE, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 6, cellPadding: 1 },
    columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 145 }, 2: { cellWidth: 20, halign: 'center' } }
  });

  drawFooter(doc);
  return doc.output('blob');
};

// ============================================================================
// 💾 UTILIDADES DE DESCARGA
// ============================================================================

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

// ============================================================================
// 🎯 FUNCIÓN PRINCIPAL - DESCARGA FLEXIBLE
// ============================================================================

export const handleExportPDF = async (
  permit: any,
  docType: 'permiso' | 'ats' | 'altura' | 'confinado' | 'energia' | 'izaje' | 'excavacion' | 'all'
) => {
  try {
    const permisoNum = permit.number || permit.id?.substring(0, 6) || 'SIN_NUM';
    const dateStr = new Date().toISOString().split('T')[0];

    if (docType === 'all') {
      // Descargar todos los PDFs aplicables
      downloadFile(generatePermitoPDF(permit), `DN-FR-SST-016-Permiso-${permisoNum}-${dateStr}.pdf`);
      downloadFile(generateATSPDF(permit), `DN-FR-SST-017-ATS-${permisoNum}-${dateStr}.pdf`);
      
      if (permit.anexoAltura) {
        downloadFile(generateAnexoAlturaPDF(permit), `Anexo-01-Alturas-${permisoNum}-${dateStr}.pdf`);
      }
      if (permit.anexoConfinado) {
        downloadFile(generateAnexoConfínadoPDF(permit), `Anexo-02-Confinados-${permisoNum}-${dateStr}.pdf`);
      }
      if (permit.anexoEnergias) {
        downloadFile(generateAnexoEnergiaPDF(permit), `Anexo-03-Energias-${permisoNum}-${dateStr}.pdf`);
      }
      if (permit.anexoIzaje) {
        downloadFile(generateAnexoIzajePDF(permit), `Anexo-04-Izaje-${permisoNum}-${dateStr}.pdf`);
      }
      if (permit.anexoExcavaciones) {
        downloadFile(generateAnexoExcavacionesPDF(permit), `Anexo-05-Excavaciones-${permisoNum}-${dateStr}.pdf`);
      }
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
          blob = generateAnexoConfínadoPDF(permit);
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

export const generateCompleteWorkPermitPDF = async (permit: any) => {
  try {
    await handleExportPDF(permit, 'all');
  } catch (error) {
    console.error('Error en generateCompleteWorkPermitPDF:', error);
    throw error;
  }
};