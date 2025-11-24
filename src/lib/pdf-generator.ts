// ✅ Archivo: lib/pdf-generator.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format, parseISO, isValid, differenceInCalendarDays } from 'date-fns';

// Función para renderizar checkmark, X o N/A
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
  return [0, 0, 0]; // Negro
};

// Definiciones de campos por sección
export const PELIGROS_VERIFICACION = [
  { id: 'fisicos', label: 'Físicos', seccion: 'verificacionPeligros' },
  { id: 'quimicos', label: 'Químicos', seccion: 'verificacionPeligros' },
  { id: 'biologicos', label: 'Biológicos', seccion: 'verificacionPeligros' },
  { id: 'seguridad', label: 'De Seguridad', seccion: 'verificacionPeligros' },
  { id: 'locativos', label: 'Locativos', seccion: 'verificacionPeligros' },
  { id: 'biomecanico', label: 'Biomecánico', seccion: 'verificacionPeligros' },
  { id: 'psicosocial', label: 'Psicosocial', seccion: 'verificacionPeligros' },
];

export const ANEXO_ALTURA_CAMPOS = [
  { id: 'afiliacionVigente', label: 'A. EL PERSONAL EJECUTANTE DE LA ACTIVIDAD TIENE LA AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL?' },
  { id: 'procedimientoActividad', label: 'B. SE CUENTA CON EL PROCEDIMIENTO DE LA ACTIVIDAD A EJECUTAR?' },
  { id: 'medidasPrevencion', label: 'C. SE HAN DETERMINADO LAS MEDIDAS DE PREVENCIÓN CONTRA CAÍDAS?' },
  { id: 'conocenMedidas', label: 'D. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS EN LA EVALUACIÓN DE RIESGOS?' },
  { id: 'entrenadosCertificados', label: 'E. ESTÁN LOS EJECUTANTES ENTRENADOS Y SE ENCUENTRAN LOS CERTIFICADOS EN SITIO PARA REALIZAR TRABAJOS EN ALTURA?' },
  { id: 'elementosProteccionCertificados', label: 'F. ESTÁN TODOS LOS ELEMENTOS DE PROTECCIÓN CONTRA CAÍDAS EN BUEN ESTADO Y CERTIFICADOS?' },
  { id: 'sistemaAseguramientoVerificado', label: 'G. SE VERIFICO EL SISTEMA DE ASEGURAMIENTO DE LA ESCALERA, ANDAMIO O PLATAFORMA A UNA ESTRUCTURA FIJA' },
  { id: 'estadoElementosVerificado', label: 'H. SE VERIFICO EL ESTADO DE: ESLINGAS, ARNES, CASCO, MOSQUETONES, Y DEMAS ELEMENTOS NECESARIOS' },
  { id: 'puntosAnclajeCertificados', label: 'I. LOS PUNTOS DE ANCLAJE CUMPLEN CON LA RESISTENCIA DE 5000 LBS POR PERSONA Y ESTAN CERTIFICADOS?' },
  { id: 'areaDelimitada', label: 'J. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO' },
  { id: 'personalSaludable', label: 'K. EL PERSONAL QUE REALIZA EL TRABAJO SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD?' },
  { id: 'equiposAccesoBuenEstado', label: 'L. SE CUENTA CON TODOS LOS EQUIPOS Y SISTEMAS DE ACCESO PARA TRABAJO EN ALTURAS EN BUEN ESTADO?' },
  { id: 'espacioCaidaLibreSuficiente', label: 'M. EL ESPACIO DE CAIDA LIBRE ES SUFICIENTE PARA EVITAR QUE LA PERSONA SE GOLPEE?' },
  { id: 'equiposEmergenciaDisponibles', label: 'N. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS Y PLAN DE RESCATE EN ALTURAS?' },
  { id: 'eppSeleccionadosCorrectamente', label: 'O. ESTÁN LOS ELEMENTOS DE PROTECCIÓN PERSONAL SELECCIONADOS CORRECTAMENTE?' },
  { id: 'plataformaSoportaCarga', label: 'P. LA PLATAFORMA O ESTRUCTURA SOPORTA LA CARGA DE TRABAJO?' },
  { id: 'supervisorConstante', label: 'Q. EXISTE UN SUPERVISOR O ACOMPAÑANTE CONSTANTE DURANTE EL TRABAJO' },
  { id: 'andamiosCompletos', label: 'R. EN CASO DE TRABAJOS SOBRE ANDAMIOS, ESTOS ESTAN COMPLETOS Y ADECUADAMENTE ARMADOS' },
  { id: 'condicionesClimaticasAdecuadas', label: 'S. LAS CONDICIONES CLIMATICAS SON ADECUADAS PARA REALIZAR EL TRABAJO' },
  { id: 'metodoSubirHerramientasSeguro', label: 'T. EL METODO DE SUBIR HERRAMIENTAS ES SEGURO' },
];

export const ANEXO_CONFINADO_CAMPOS = [
  { id: 'fuentesEnergiaAisladas', label: 'A. ESTAN LAS FUENTES DE ENERGIA AISLADAS' },
  { id: 'ejecutantesConocenMedidas', label: 'B. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS?' },
  { id: 'ejecutantesEntrenados', label: 'C. ESTÁN LOS EJECUTANTES ENTRENADOS' },
  { id: 'entradasSalidasFlujoBloqueadas', label: 'D. ESTAN BLOQUEADAS LAS ENTRADAS Y SALIDAS DE FLUJO' },
  { id: 'areaDelimitada', label: 'E. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO' },
  { id: 'monitorAtmosferasCalibrado', label: 'F. SE TIENE EN SITIO UN MONITOR DE ATMOSFERAS PELIGROSAS, CALIBRADO' },
  { id: 'equiposIluminacionExplosion', label: 'G. SON A PRUEBA DE EXPLOSION LOS EQUIPOS DE ILUMINACION' },
  { id: 'equiposVentilacionExplosion', label: 'H. SON A PRUEBA DE EXPLOSION LOS EQUIPOS DE VENTILACION' },
  { id: 'equiposVentilacionSuficientes', label: 'J. LOS EQUIPOS DE VENTILACION ESTAN DISPONIBLES Y SON SUFICIENTES' },
  { id: 'equiposRespiracionAutonoma', label: 'K. ESTAN DISPONIBLES EQUIPOS DE RESPIRACION AUTONOMA EN CASO DE EMERGENCIA' },
  { id: 'elementosAtencionEmergencias', label: 'L. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS' },
  { id: 'planEmergenciaRescate', label: 'M. SE CUENTA CON PLAN DE EMERGENCIA PARA RESCATE' },
  { id: 'hojasSeguridadDisponibles', label: 'N. ESTAN DISPONIBLES LAS HOJAS DE SEGURIDAD DE PRODUCTOS QUIMICOS' },
  { id: 'vigiaPermanente', label: 'O. SE VERIFICA QUE HAYA UN VIGIA PERMANENTE EN EL AREA' },
  { id: 'herramientasAdecuadas', label: 'P. SE VERIFICO QUE LAS HERRAMIENTAS SEAN LAS ADECUADAS' },
  { id: 'personalSaludable', label: 'Q. EL PERSONAL SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD' },
  { id: 'verificadoEpp', label: 'R. SE VERIFICO EL EQUIPO Y ELEMENTOS DE PROTECCION PERSONAL' },
];

export const ANEXO_ENERGIA_CAMPOS = [
  { id: 'fuentesEnergiaIdentificadas', label: 'A. SE HAN IDENTIFICADO LAS FUENTES DE ENERGÍA' },
  { id: 'ejecutantesConocenMedidas', label: 'B. SE HAN IDENTIFICADO LOS EJECUTANTES Y LOS SUPERVISORES QUE DEBEN ESTAR PRESENTES' },
  { id: 'medidasPrevencion', label: 'C. SE HAN DETERMINADO LAS MEDIDAS DE PREVENCIÓN' },
  { id: 'ejecutantesEntrenados', label: 'D. LOS EJECUTANTES ESTÁN ENTRENADOS' },
  { id: 'procedimientoDisiparEnergia', label: 'E. SE HA ESTABLECIDO EL PROCEDIMIENTO PARA DISIPAR ENERGÍA' },
  { id: 'bloqueoEtiquetado', label: 'F. SE CUENTA CON BLOQUEOS Y ETIQUETADOS' },
  { id: 'verificacionAusenciaEnergia', label: 'G. SE HA VERIFICADO LA AUSENCIA DE ENERGÍA' },
  { id: 'distanciasSeguridad', label: 'H. SE CUMPLEN LAS DISTANCIAS DE SEGURIDAD SEGÚN RETIE' },
];

export const ANEXO_IZAJE_CAMPOS = [
  { id: 'terrenoEstabilizado', label: 'A. TERRENO ESTABILIZADO Y SOPORTA EL EQUIPO' },
  { id: 'operadorVisualiza', label: 'B. OPERADOR VISUALIZA BIEN EL ÁREA' },
  { id: 'calculoTecnicoIzaje', label: 'C. SE CUENTA CON CÁLCULO TÉCNICO/PLAN DE IZAJE' },
  { id: 'areaSeñalizada', label: 'D. ÁREA SEÑALIZADA Y DEMARCADA' },
  { id: 'verificacionCapacidad', label: 'E. SE VERIFICÓ LA CAPACIDAD DEL EQUIPO VS CARGA' },
  { id: 'areaLimpia', label: 'F. ÁREA DE IZAJE DESPEJADA DE PERSONAL' },
  { id: 'comunicacionClara', label: 'G. COMUNICACIÓN CLARA ESTABLECIDA' },
  { id: 'atsRealizado', label: 'H. ATS REALIZADO' },
  { id: 'eslinguasEstado', label: 'I. ESLINGAS Y APAREJOS EN BUEN ESTADO' },
  { id: 'polinesEstado', label: 'J. POLINES EN BUEN ESTADO' },
  { id: 'polinesEstables', label: 'K. POLINES ESTABLES Y CORRECTAMENTE POSICIONADOS' },
  { id: 'distanciaLineasElectricas', label: 'L. DISTANCIA SEGURA DE LÍNEAS ELÉCTRICAS' },
  { id: 'sinPersonasAjoBajoCarga', label: 'M. SIN PERSONAS BAJO LA CARGA' },
  { id: 'climaSeguro', label: 'N. CONDICIONES CLIMÁTICAS SEGURAS' },
  { id: 'equipoTierra', label: 'O. EQUIPO CON CONEXIÓN A TIERRA' },
  { id: 'noMaterialCayendoCarga', label: 'P. SIN MATERIAL QUE PUEDA CAER SOBRE LA CARGA' },
  { id: 'senalizadorCapacitado', label: 'Q. SEÑALIZADOR CAPACITADO Y ENTRENADO' },
  { id: 'afiliacionVerificada', label: 'R. SE VERIFICÓ AFILIACIÓN A SISTEMA DE SEGURIDAD SOCIAL' },
];

export const ANEXO_EXCAVACION_CAMPOS = [
  { id: 'sistemasEnterrados', label: 'A. SISTEMAS ENTERRADOS IDENTIFICADOS' },
  { id: 'metodoExcavacion', label: 'B. MÉTODO DE EXCAVACIÓN DETERMINADO' },
  { id: 'ejecutantesEntrenados', label: 'C. EJECUTANTES ENTRENADOS' },
  { id: 'controlEntibado', label: 'D. CONTROLES, ENTIBADO, SISTEMAS DE ACCESO INSTALADOS' },
  { id: 'areaSeñalizada', label: 'E. ÁREA SEÑALIZADA PARA PREVENIR CAÍDAS' },
  { id: 'puentesComplementarios', label: 'F. PUENTES O PASARELAS SI NECESARIO' },
  { id: 'materialesAlBorde', label: 'G. MATERIALES MOVIDOS A MÍNIMO 1M DEL BORDE' },
  { id: 'escaleraSobresale', label: 'H. ESCALERAS SOBRESALEN MÍNIMO 1M DEL BORDE' },
  { id: 'metodoRelleno', label: 'I. MÉTODO DE RELLENO PREVISTO' },
];

// Función principal para generar PDF completo
export const generateCompleteWorkPermitPDF = async (permit: any) => {
  const doc = new jsPDF('p', 'mm', 'letter');
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  let yPos = margin;

  const italcolOrange = [239, 123, 0];

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
    }
  };

  const drawHeader = (title: string) => {
    doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), pageWidth / 2, yPos + 4, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    yPos += 8;
  };

  const renderFieldsTable = (fields: any[], data: any, title: string) => {
    checkPageBreak(50);
    drawHeader(title);

    const bodyData = fields.map(field => [
      field.label,
      getStatusSymbol(data[field.id]),
      ''
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['DESCRIPCIÓN', 'ESTADO', '']],
      body: bodyData,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontSize: 7 },
      bodyStyles: { fontSize: 6, cellPadding: 1.5 },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { halign: 'center', cellWidth: 25, textColor: getStatusColor(data[fields[0].id]) },
        2: { cellWidth: 10 }
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {
          const fieldValue = fields[data.row.index]?.id;
          const value = values[fieldValue];
          const color = getStatusColor(value);
          doc.setTextColor(color[0], color[1], color[2]);
        }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 5;
  };

  // ===== CONTENIDO DEL PDF =====

  // Encabezado principal
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PERMISO DE TRABAJO', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // Información General
  drawHeader('INFORMACIÓN GENERAL DEL PERMISO');
  autoTable(doc, {
    startY: yPos,
    body: [
      ['Número Permiso:', permit.number || permit.id.substring(0, 8), 'Empresa:', permit.generalInfo?.empresa || ''],
      ['Planta:', permit.generalInfo?.planta || '', 'Área:', permit.generalInfo?.areaEspecifica || ''],
      ['Proceso:', permit.generalInfo?.proceso || '', 'Contrato:', permit.generalInfo?.contrato || ''],
      ['Válido Desde:', format(parseISO(permit.generalInfo?.validFrom), 'dd/MM/yy HH:mm'), 'Válido Hasta:', format(parseISO(permit.generalInfo?.validUntil), 'dd/MM/yy HH:mm')],
      ['Solicitante:', permit.user?.displayName || '', 'Responsable:', permit.generalInfo?.responsable?.nombre || ''],
    ],
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1.5 },
    columnStyles: { 0: { cellWidth: 35 }, 1: { cellWidth: 50 }, 2: { cellWidth: 35 }, 3: { cellWidth: 50 } }
  });
  yPos = (doc as any).lastAutoTable.finalY + 5;

  // Alcance
  checkPageBreak(20);
  autoTable(doc, {
    startY: yPos,
    head: [['DESCRIPCIÓN DEL TRABAJO (ALCANCE)']],
    body: [[permit.generalInfo?.workDescription || 'No especificado']],
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 2 }
  });
  yPos = (doc as any).lastAutoTable.finalY + 5;

  // ✅ PELIGROS GENERALES
  if (permit.verificacionPeligros) {
    renderFieldsTable(PELIGROS_VERIFICACION, permit.verificacionPeligros, 'PELIGROS IDENTIFICADOS');
  }

  // ✅ EPP (si existe)
  if (permit.eppEmergencias?.epp) {
    checkPageBreak(40);
    drawHeader('EQUIPOS DE PROTECCIÓN PERSONAL (EPP)');
    
    const eppRows = Object.entries(permit.eppEmergencias.epp).map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1').trim(),
      getStatusSymbol(value)
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['ELEMENTO EPP', 'REQUERIDO']],
      body: eppRows,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontSize: 7 },
      bodyStyles: { fontSize: 6, cellPadding: 1 },
      columnStyles: { 1: { halign: 'center', cellWidth: 25 } }
    });
    yPos = (doc as any).lastAutoTable.finalY + 5;
  }

  // ✅ ANEXO 1: ALTURAS
  if (permit.selectedWorkTypes?.alturas && permit.anexoAltura) {
    renderFieldsTable(ANEXO_ALTURA_CAMPOS, permit.anexoAltura.aspectosSeguridad || {}, 'ANEXO 1 - TRABAJO EN ALTURAS');
  }

  // ✅ ANEXO 2: ESPACIOS CONFINADOS
  if (permit.selectedWorkTypes?.confinado && permit.anexoConfinado) {
    renderFieldsTable(ANEXO_CONFINADO_CAMPOS, permit.anexoConfinado.identificacionPeligros || {}, 'ANEXO 2 - ESPACIOS CONFINADOS');
    
    // Tabla de pruebas de gases
    if (permit.anexoConfinado.resultadosPruebasGases) {
      checkPageBreak(30);
      autoTable(doc, {
        startY: yPos,
        head: [['PARÁMETRO', 'VALOR', 'CUMPLE']],
        body: [
          ['LEL (%)', permit.anexoConfinado.resultadosPruebasGases.lel || '—', permit.anexoConfinado.resultadosPruebasGases.lel === '0%' ? '✓' : '—'],
          ['O2 (%)', permit.anexoConfinado.resultadosPruebasGases.o2 || '—', '—'],
          ['H2S (PPM)', permit.anexoConfinado.resultadosPruebasGases.h2s || '—', '—'],
          ['CO (PPM)', permit.anexoConfinado.resultadosPruebasGases.co || '—', '—'],
        ],
        theme: 'grid',
        styles: { fontSize: 6, halign: 'center', cellPadding: 1 }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
    }
  }

  // ✅ ANEXO 3: ENERGÍAS
  if (permit.selectedWorkTypes?.energia && permit.anexoEnergias) {
    renderFieldsTable(ANEXO_ENERGIA_CAMPOS, permit.anexoEnergias || {}, 'ANEXO 3 - CONTROL DE ENERGÍAS');
  }

  // ✅ ANEXO 4: IZAJE
  if (permit.selectedWorkTypes?.izaje && permit.anexoIzaje) {
    renderFieldsTable(ANEXO_IZAJE_CAMPOS, permit.anexoIzaje.identificacionPeligros || {}, 'ANEXO 4 - IZAJE DE CARGAS');
  }

  // ✅ ANEXO 5: EXCAVACIONES
  if (permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones) {
    renderFieldsTable(ANEXO_EXCAVACION_CAMPOS, permit.anexoExcavaciones.identificacionPeligros || {}, 'ANEXO 5 - EXCAVACIONES');
  }

  // Footer
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  doc.save(`Permiso_Italcol_${permit.number || permit.id.substring(0, 6)}.pdf`);
};
