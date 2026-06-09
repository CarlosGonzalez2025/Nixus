import type { Timestamp } from 'firebase/firestore';

export type DiagnosticoAlturaStatus = 'borrador' | 'completado';

export interface DiagnosticoAlturaResultados {
  procedimientosGestionAlturas?: number;  // 0 or 2
  permisosDeTrabajo?: number;             // 0 or 2
  gestionMedidasPrevencion?: number;      // 0 or 2
  gestionDocumental?: number;             // 0 or 2
  gestionRiesgoControlOperacional?: number; // 0, 1, or 2
  gestionEquiposSistemas?: number;        // 0, 1, or 2
  gestionEmergencias?: number;            // 0, 1, or 2
  sumaTotal?: number;                     // 0–14
}

export interface DiagnosticoAltura {
  id?: string;

  // Metadata
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
  createdById: string;
  createdByName: string;
  status: DiagnosticoAlturaStatus;

  // GRUPO 1 – Datos Generales
  fecha: string;
  planta: string;
  empresa: string;
  proceso?: string;

  // GRUPO 2 – Información de la Actividad
  actividadAnalizada?: string;
  detalleActividad?: string;
  alturaPromedio?: string;
  desarrolladaPor?: string[];
  frecuenciaEjecucion?: string;
  tieneAltoRiesgoAdicional?: string; // 'Si' | 'No'
  actividadesAltoRiesgo?: string[];
  evaluadaEnIPER?: string;            // 'Si' | 'No' → criterion 1
  cuentaConProcedimiento?: string;    // 'Si' | 'No' → criterion 4
  medidasPrevencion?: string[];       // → criteria 2 & 3

  // GRUPO 3 – Escaleras y Andamios (→ gestionRiesgoControlOperacional)
  escaleraFijaVertical?: string[];    // tipo gato
  escaleraLlana?: string[];
  escaleraExtension?: string[];
  escaleraPortatil?: string[];        // un solo cuerpo
  escaleraTipoAvion?: string[];
  andamioMultidireccional?: string[];
  elevadorPersonas?: string[];        // Manlift

  // GRUPO 4 – Arneses y Sistemas (→ gestionEquiposSistemas)
  arnesCuerpoCompleto?: string[];
  estingaPosicionamiento?: string[];
  estingaConAbsorbedor?: string[];
  anclajesFijos?: string[];
  anclajePortatil?: string[];
  lvhFija?: string[];
  lvhPortatil?: string[];
  lvvFija?: string[];
  lvvPortatil?: string[];
  mosquetones?: string[];
  lvAutorretractil?: string[];

  // GRUPO 5 – Equipos de Emergencia y EPP (→ gestionEmergencias)
  equipoRescate?: string[];
  equipoPrimerosAuxilios?: string[];
  eppUtilizados?: string[];

  // GRUPO 6 – Firma y Cierre
  seHanPresentadoCargos?: string;     // 'Si' | 'No'
  clienteAceptaInfo?: string;         // 'Si' | 'No'
  nombreSST?: string;
  firmaSST?: string;
  nombreResponsable?: string;
  firmaResponsable?: string;

  // Resultados calculados
  resultados?: DiagnosticoAlturaResultados;
}

// ── Score calculation (mirrors Google Sheets ARRAYFORMULA logic) ───────────────

export function calcDiagnosticoAlturaScore(
  data: Partial<DiagnosticoAltura>,
): DiagnosticoAlturaResultados {
  // 1. Procedimientos para la gestión de trabajo en alturas (evaluadaEnIPER)
  const procedimientosGestionAlturas =
    data.evaluadaEnIPER != null && data.evaluadaEnIPER !== ''
      ? data.evaluadaEnIPER === 'Si' ? 2 : 0
      : undefined;

  // 2 & 3. Permisos de trabajo / Gestión de medidas de prevención
  const medidasArr = data.medidasPrevencion ?? [];
  const medidasStr = medidasArr.join(', ').toLowerCase().trim();
  const hasMedidas = medidasArr.length > 0;

  const permisosDeTrabajo = hasMedidas
    ? medidasStr === 'permiso de trabajo' ? 2 : 0
    : undefined;

  const gestionMedidasPrevencion = hasMedidas
    ? medidasStr.includes('permiso de trabajo') && medidasStr !== 'permiso de trabajo' ? 2 : 0
    : undefined;

  // 4. Gestión documental (cuentaConProcedimiento)
  const gestionDocumental =
    data.cuentaConProcedimiento != null && data.cuentaConProcedimiento !== ''
      ? data.cuentaConProcedimiento === 'Si' ? 2 : 0
      : undefined;

  // 5. Gestión del riesgo y control operacional (escaleras & andamios)
  const escalerasFields = [
    ...(data.escaleraFijaVertical ?? []),
    ...(data.escaleraLlana ?? []),
    ...(data.escaleraExtension ?? []),
    ...(data.escaleraPortatil ?? []),
    ...(data.escaleraTipoAvion ?? []),
    ...(data.andamioMultidireccional ?? []),
    ...(data.elevadorPersonas ?? []),
  ];
  const escalerasStr = escalerasFields.join('|').toLowerCase();
  const hasEscaleras = escalerasFields.length > 0;

  let gestionRiesgoControlOperacional: number | undefined;
  if (hasEscaleras) {
    if (escalerasStr.includes('inspecci') && escalerasStr.includes('mantenimiento')) {
      gestionRiesgoControlOperacional = 2;
    } else if (escalerasStr.includes('buen estado')) {
      gestionRiesgoControlOperacional = 1;
    } else {
      gestionRiesgoControlOperacional = 0;
    }
  }

  // 6. Gestión de equipos y sistemas (arneses, estingas, anclajes, LVH, LVV, etc.)
  const arnesesFields = [
    ...(data.arnesCuerpoCompleto ?? []),
    ...(data.estingaPosicionamiento ?? []),
    ...(data.estingaConAbsorbedor ?? []),
    ...(data.anclajesFijos ?? []),
    ...(data.anclajePortatil ?? []),
    ...(data.lvhFija ?? []),
    ...(data.lvhPortatil ?? []),
    ...(data.lvvFija ?? []),
    ...(data.lvvPortatil ?? []),
    ...(data.mosquetones ?? []),
    ...(data.lvAutorretractil ?? []),
  ];
  const arnesesStr = arnesesFields.join('|').toLowerCase();
  const hasArneses = arnesesFields.length > 0;

  let gestionEquiposSistemas: number | undefined;
  if (hasArneses) {
    if (arnesesStr.includes('anual vigente')) {
      gestionEquiposSistemas = 2;
    } else if (arnesesStr.includes('buen estado')) {
      gestionEquiposSistemas = 1;
    } else {
      gestionEquiposSistemas = 0;
    }
  }

  // 7. Gestión de emergencias (equipo de rescate y primeros auxilios)
  const emergenciasFields = [
    ...(data.equipoRescate ?? []),
    ...(data.equipoPrimerosAuxilios ?? []),
  ];
  const emergenciasStr = emergenciasFields.join('|').toLowerCase();
  const hasEmergencias = emergenciasFields.length > 0;

  let gestionEmergencias: number | undefined;
  if (hasEmergencias) {
    if (emergenciasStr.includes('se utiliza')) {
      gestionEmergencias = 2;
    } else if (emergenciasStr.includes('buen estado')) {
      gestionEmergencias = 1;
    } else {
      gestionEmergencias = 0;
    }
  }

  const defined = [
    procedimientosGestionAlturas, permisosDeTrabajo, gestionMedidasPrevencion,
    gestionDocumental, gestionRiesgoControlOperacional, gestionEquiposSistemas, gestionEmergencias,
  ].filter((v): v is number => v !== undefined);

  const sumaTotal = defined.length > 0 ? defined.reduce((a, b) => a + b, 0) : undefined;

  return {
    procedimientosGestionAlturas,
    permisosDeTrabajo,
    gestionMedidasPrevencion,
    gestionDocumental,
    gestionRiesgoControlOperacional,
    gestionEquiposSistemas,
    gestionEmergencias,
    sumaTotal,
  };
}

// ── Catalog data ───────────────────────────────────────────────────────────────

export const ACTIVIDADES_LISTA_ALTURAS: string[] = [
  'Mantenimiento de techos, cubiertas y sistemas de drenaje',
  'Mantenimiento, limpieza e inspección de tanques de almacenamiento',
  'Control de aves y mantenimiento de sistemas de protección aviar',
  'Mantenimiento e instalación de sistemas de iluminación',
  'Mantenimiento e instalación de sistemas de seguridad electrónica',
  'Instalación y mantenimiento de sistemas solares fotovoltaicos',
  'Mantenimiento de equipos electromecánicos',
  'Mantenimiento de equipos de almacenamiento y proceso',
  'Limpieza industrial de equipos y estructuras de proceso',
  'Mantenimiento e instalación de sistemas eléctricos',
  'Monitoreo y medición ambiental',
  'Muestreo e inspección de calidad',
  'Inspección y verificación de niveles de almacenamiento',
  'Cargue y descargue de materiales y productos',
  'Carpe y descarpe de vehículos de carga',
  'Almacenamiento, inventario y manejo de materiales',
  'Mantenimiento de sistemas HVAC y refrigeración',
  'Mantenimiento de sistemas de generación térmica y vapor',
  'Mantenimiento de estructuras e infraestructura',
  'Mantenimiento locativo y obras civiles',
  'Montaje e instalación de estructuras',
  'Operación de equipos de izaje y manejo de cargas',
  'Poda y mantenimiento de zonas verdes',
  'Mantenimiento de sistemas auxiliares de proceso',
  'Mantenimiento de cerramientos y sistemas perimetrales',
  'Limpieza y desinfección industrial',
  'Actividades operativas pecuarias y avícolas',
  'Inspección y supervisión operativa',
  'Inspección y mantenimiento en alturas',
  'Mantenimiento de sistemas de telecomunicaciones',
  'Mantenimiento de sistemas hidráulicos y tuberías',
  'Operación y mantenimiento de sistemas de seguridad física',
  'Manipulación y almacenamiento de materias primas y producto terminado',
  'Mantenimiento preventivo y correctivo de instalaciones y equipos industriales',
];

export const DETALLE_ACTIVIDAD_LISTA_ALTURAS: string[] = [
  'Limpieza y lavado de techos, cubiertas, canales y bajantes.',
  'Limpieza y desinfección interna/externa de tanques (agua, combustible, residuales).',
  'Limpieza y desatasque de silos, tolvas y fosos.',
  'Limpieza de filtros de mangas, rejillas, tamices y ductos.',
  'Lavado y mantenimiento de paneles solares.',
  'Limpieza de luminarias y sistemas de aire acondicionado/refrigeración.',
  'Control de plagas (retiro de nidos, instalación de mallas antipájaros y polisombras).',
  'Mantenimiento preventivo/correctivo de motores (elevadores, malacates, tolvas).',
  'Revisión y reparación de bandas transportadoras, redlers y tornillos sin fin.',
  'Mantenimiento de calderas, válvulas, chimeneas y tuberías de vapor/neumáticas.',
  'Lubricación, engrase y ajuste de rodillos, cadenas y guayas.',
  'Mantenimiento de equipos de elevación (grúas, pantógrafos, montacargas).',
  'Reparación de sistemas de refrigeración (cuartos fríos, evaporadores).',
  'Instalación, cambio y mantenimiento de luminarias (internas/perimetrales).',
  'Instalación y mantenimiento de redes eléctricas, tableros y transformadores.',
  'Instalación, limpieza y mantenimiento de cámaras de seguridad (CCTV) y alarmas.',
  'Instalación y mantenimiento de sistemas de energía solar fotovoltaica.',
  'Cargue, descargue y apilamiento de materias primas (bultos, estibas).',
  'Llenado y vaciado de silos, tolvas y carro tanques a granel.',
  'Carpe y descarpe de vehículos de carga pesada.',
  'Supervisión de producto y manejo de inventarios en bodegas.',
  'Toma de muestras de calidad (aceite, agua, materias primas).',
  'Verificación de niveles en tanques, tolvas y silos (uso de flexómetros/sensores).',
  'Mediciones ambientales y emisiones en chimeneas (calidad del aire).',
  'Inspecciones termográficas y revisión de equipos de medida.',
];

export const ALTURA_PROMEDIO_OPCIONES: string[] = [
  'Entre 1.80 m y 2.00 m',
  'Entre 2.01 m y 3.00 m',
  'Entre 3.01 m y 6.00 m',
  'Entre 6.01 m y 9.00 m',
  'Más de 9.01 m',
];

export const DESARROLLADO_POR_OPCIONES_ALTURAS: string[] = [
  'Personal de la Empresa',
  'Personal Temporal',
  'Personal de contratista',
];

export const FRECUENCIA_OPCIONES: string[] = [
  'Diaria',
  'Semanal',
  'Quincenal',
  'Mensual',
  'Esporádica',
  'Se alterna con otra actividad (hasta 2 veces/semana)',
];

export const ACTIVIDADES_ALTO_RIESGO_ALTURAS: string[] = [
  'Trabajo en alturas',
  'Trabajo en caliente',
  'Trabajo eléctrico',
  'Izaje de cargas',
  'Excavaciones',
  'Manejo de sustancias peligrosas',
  'Demoliciones',
  'Espacios confinados',
  'Trabajo en vía pública',
];

export const MEDIDAS_PREVENCION_OPCIONES_ALTURAS: string[] = [
  'Permiso de Trabajo',
  'Análisis de Trabajo Seguro (ATS)',
  'Ayudante de seguridad',
  'Bloqueo y etiquetado (LOTO)',
  'CCTV (Cámaras de seguridad)',
  'Certificación de trabajador autorizado (Curso de alturas / Personal certificado)',
  'Condiciones de salud (Reporte de)',
  'Control de acceso (Incluye puerta con candado)',
  'Coordinador de trabajo en alturas',
  'Drones (Para eliminación del peligro)',
  'Elementos para cubrir huecos',
  'Inspecciones periódicas y anuales',
  'Instructivo de uso de escaleras',
  'Linterna de casco intrínsecamente segura',
  'Lista de Verificación',
  'Operador certificado',
  'Preoperacional de equipo',
  'Señalización de área',
  'Sistema de barandas',
  'Pasarelas y plataformas de acceso con protección colectiva',
  'Escalera fija metálica con pasamanos',
  'Escalera helicoidal fija para acceso a silos',
  'Escalera vertical fija para acceso a tanques',
  'Vigía de seguridad',
];

export const ESCALERAS_OPTS: string[] = [
  'Se utiliza',
  'No se utiliza',
  'No aplica',
  'Inspección y mantenimiento',
  'Hoja de vida',
  'Buen estado',
  'Certificado',
  'Inspección anual vigente',
];

export const ARNESES_OPTS: string[] = [
  'Se utiliza',
  'No se utiliza',
  'Buen estado',
  'Inspección anual vigente',
  'Certificado',
  'Hoja de Vida',
];

export const EMERGENCIAS_OPTS: string[] = [
  'Se utiliza',
  'No se utiliza',
  'No aplica',
  'Buen estado',
  'Inspección anual vigente',
  'Certificado',
];

export const EPP_OPCIONES_ALTURAS: string[] = [
  'Casco de seguridad con barbuquejo',
  'Botas de seguridad con puntera',
  'Guantes de seguridad',
  'Gafas o careta de protección',
  'Protección auditiva',
  'Chaleco reflectivo',
  'Ropa de trabajo / overol',
  'Detector de protección',
  'Guantes dieléctricas',
  'Herramientas dieléctricas',
  'Herramientas no chispeantes',
  'Guantes de carnaza',
  'Traje de protección química tipo Tyvek',
  'Botas pantaneras',
  'Protección respiratoria',
  'Protección dorsal',
];

// ── Equipment items (for form rendering) ─────────────────────────────────────

export const ESCALERAS_ITEMS: Array<{
  field: keyof DiagnosticoAltura;
  label: string;
  opts: string[];
}> = [
  { field: 'escaleraFijaVertical',    label: 'Escalera Fija Vertical (tipo gato)',        opts: ESCALERAS_OPTS },
  { field: 'escaleraLlana',           label: 'Escalera de Llana',                          opts: ESCALERAS_OPTS },
  { field: 'escaleraExtension',       label: 'Escalera de Extensión',                      opts: ESCALERAS_OPTS },
  { field: 'escaleraPortatil',        label: 'Escalera Portátil de un Solo Cuerpo',         opts: ESCALERAS_OPTS },
  { field: 'escaleraTipoAvion',       label: 'Escalera Tipo Avión',                        opts: ESCALERAS_OPTS },
  { field: 'andamioMultidireccional', label: 'Andamio Multidireccional',                   opts: ESCALERAS_OPTS },
  { field: 'elevadorPersonas',        label: 'Elevador de Personas (Manlift)',              opts: ESCALERAS_OPTS },
];

export const ARNESES_ITEMS: Array<{
  field: keyof DiagnosticoAltura;
  label: string;
  opts: string[];
}> = [
  { field: 'arnesCuerpoCompleto',     label: 'Arnés de Cuerpo Completo',                   opts: ARNESES_OPTS },
  { field: 'estingaPosicionamiento',  label: 'Estinga de Posicionamiento',                 opts: ARNESES_OPTS },
  { field: 'estingaConAbsorbedor',    label: 'Estinga con Absorbedor',                     opts: ARNESES_OPTS },
  { field: 'anclajesFijos',           label: 'Anclajes Fijos (tipo)',                      opts: ARNESES_OPTS },
  { field: 'anclajePortatil',         label: 'Anclaje Portátil',                           opts: ARNESES_OPTS },
  { field: 'lvhFija',                 label: 'L.V.H. Fija (Línea de Vida Horizontal Fija)', opts: ARNESES_OPTS },
  { field: 'lvhPortatil',             label: 'L.V.H. Portátil',                            opts: ARNESES_OPTS },
  { field: 'lvvFija',                 label: 'L.V.V. Fija (Línea de Vida Vertical Fija)',   opts: ARNESES_OPTS },
  { field: 'lvvPortatil',             label: 'L.V.V. Portátil',                            opts: ARNESES_OPTS },
  { field: 'mosquetones',             label: 'Mosquetones',                                opts: ARNESES_OPTS },
  { field: 'lvAutorretractil',        label: 'L.V. Autoretráctil',                         opts: ARNESES_OPTS },
];

export const EMERGENCIAS_ITEMS: Array<{
  field: keyof DiagnosticoAltura;
  label: string;
  opts: string[];
}> = [
  { field: 'equipoRescate',           label: 'Equipo de Rescate',                          opts: EMERGENCIAS_OPTS },
  { field: 'equipoPrimerosAuxilios',  label: 'Equipo de Primeros Auxilios',                opts: EMERGENCIAS_OPTS },
];

// All items combined for detail/import views
export const EQUIPOS_ITEMS_ALTURAS = [...ESCALERAS_ITEMS, ...ARNESES_ITEMS, ...EMERGENCIAS_ITEMS];

export const RESULT_LABELS_ALTURAS: Record<keyof DiagnosticoAlturaResultados, string> = {
  procedimientosGestionAlturas:       'Procedimientos para la gestión de trabajo en alturas',
  permisosDeTrabajo:                  'Permisos de trabajo',
  gestionMedidasPrevencion:           'Gestión de medidas de prevención',
  gestionDocumental:                  'Gestión documental',
  gestionRiesgoControlOperacional:    'Gestión del riesgo y control operacional',
  gestionEquiposSistemas:             'Gestión de equipos y sistemas',
  gestionEmergencias:                 'Gestión de emergencias',
  sumaTotal:                          'Suma total Resultado',
};
