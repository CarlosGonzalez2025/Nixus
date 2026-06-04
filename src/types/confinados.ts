import type { Timestamp } from 'firebase/firestore';

export type DiagnosticoStatus = 'borrador' | 'completado';

export interface DiagnosticoResultados {
  identificacionPeligros?: number;
  permisosDeTrabajo?: number;
  gestionMedidasPrevencion?: number;
  monitoreoDeLaAtmosfera?: number;
  procedimientoEspaciosConfinados?: number;
  manejoEnergiasPeligrosas?: number;
  planDeEmergencias?: number;
  sumaTotal?: number;
}

export interface DiagnosticoConfinado {
  id?: string;

  // Metadata
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
  createdById: string;
  createdByName: string;
  status: DiagnosticoStatus;

  // GRUPO 1 – Datos Generales
  fecha: string; // ISO date (yyyy-MM-dd)
  ubicacionGPS?: { lat: number; lng: number };
  planta: string;
  proceso?: string;

  // GRUPO 2 – Descripción de la Actividad
  empresa: string;
  contratista?: string;
  actividadAnalizada?: string;
  detalleActividad?: string;
  alturaPromedio?: string;
  desarrolladaPor?: string[];
  tipoEjecucion?: string;
  tieneAltoRiesgoAdicional?: string; // 'Si' | 'No'
  actividadesAltoRiesgo?: string[];
  medidasDeEntradaSalida?: string;
  descripcionEspacio?: string;

  // GRUPO 3 – Facilidades y Evaluación del Espacio
  facilidades?: string[];
  evaluadaEnIPER?: string;        // 'Si' | 'No'
  tipoEspacioConfinado?: string;  // 'Tipo 1' | 'Tipo 2'
  gradoPeligrosidad?: string;     // 'Grado A' | 'Grado B' | 'Grado C'
  medidasPrevencion?: string[];   // drives permisos + gestión scores
  monitoreoPrevioIngreso?: string;     // 'Si' | 'No'
  cuentaConProcedimiento?: string;     // 'Si' | 'No'
  metodologiaBloqueoEnergias?: string; // 'Si' | 'No'

  // Equipos y EPP
  escaleraFosaVertical?: string[];
  escaleraGato?: string[];
  escaleraExtension?: string[];
  otroTrabajoAlturas?: string[];
  arnesCuerpoCompleto?: string[];
  tripodeEquipoRescate?: string[];
  autoContenido?: string[];
  equipoComunicacion?: string[];
  sistemaVentilacionMecanica?: string[];
  sistemaProteccionCaidas?: string[];
  equipoPrimerosAuxilios?: string[];
  otrosModelosProteccion?: string[];
  eppUtilizados?: string[];

  // GRUPO 4 – Firma y Cierre
  eventosAccidentesPrevios?: string; // 'Si' | 'No'
  clienteAceptaInfo?: string;        // 'Si' | 'No'
  nombreSST?: string;
  firmaSST?: string;           // base64 data-url
  nombreResponsable?: string;
  firmaResponsable?: string;   // base64 data-url

  // Resultados calculados
  resultados?: DiagnosticoResultados;
}

// ── Score calculation (mirrors Google Sheets formulas) ─────────────────────────

export function calcDiagnosticoScore(
  data: Partial<DiagnosticoConfinado>,
): DiagnosticoResultados {
  // 1. Identificación de peligros y valoración de riesgos
  const identificacionPeligros =
    data.evaluadaEnIPER != null && data.evaluadaEnIPER !== ''
      ? data.evaluadaEnIPER === 'Si' ? 2 : 0
      : undefined;

  // 2 & 3. Permisos de trabajo / Gestión de medidas de prevención
  const medidasArr = data.medidasPrevencion ?? [];
  const medidasStr = medidasArr.join(', ');
  const medidasLower = medidasStr.toLowerCase().trim();
  const hasMedidas = medidasArr.length > 0;

  // Permiso de trabajo: value is EXACTLY "Permiso de trabajo"
  const permisosDeTrabajo = hasMedidas
    ? medidasLower === 'permiso de trabajo' ? 2 : 0
    : undefined;

  // Gestión: contains "permiso de trabajo" but is NOT exclusively that
  const gestionMedidasPrevencion = hasMedidas
    ? medidasLower.includes('permiso de trabajo') && medidasLower !== 'permiso de trabajo'
      ? 2 : 0
    : undefined;

  // 4. Monitoreo de la atmósfera
  const monitoreoDeLaAtmosfera =
    data.monitoreoPrevioIngreso != null && data.monitoreoPrevioIngreso !== ''
      ? data.monitoreoPrevioIngreso === 'Si' ? 2 : 0
      : undefined;

  // 5. Procedimiento para el manejo de espacios confinados
  const procedimientoEspaciosConfinados =
    data.cuentaConProcedimiento != null && data.cuentaConProcedimiento !== ''
      ? data.cuentaConProcedimiento === 'Si' ? 2 : 0
      : undefined;

  // 6. Manejo de energías peligrosas
  const manejoEnergiasPeligrosas =
    data.metodologiaBloqueoEnergias != null && data.metodologiaBloqueoEnergias !== ''
      ? data.metodologiaBloqueoEnergias === 'Si' ? 2 : 0
      : undefined;

  // 7. Plan de emergencias – driven by equipoPrimerosAuxilios containing "Se utiliza"
  const epa = data.equipoPrimerosAuxilios ?? [];
  const planDeEmergencias =
    epa.length > 0
      ? epa.some(v => v.toLowerCase().includes('se utiliza')) ? 2 : 0
      : undefined;

  // Suma total (only if at least one score is defined)
  const defined = [
    identificacionPeligros,
    permisosDeTrabajo,
    gestionMedidasPrevencion,
    monitoreoDeLaAtmosfera,
    procedimientoEspaciosConfinados,
    manejoEnergiasPeligrosas,
    planDeEmergencias,
  ].filter((v): v is number => v !== undefined);

  const sumaTotal = defined.length > 0
    ? defined.reduce((a, b) => a + b, 0)
    : undefined;

  return {
    identificacionPeligros,
    permisosDeTrabajo,
    gestionMedidasPrevencion,
    monitoreoDeLaAtmosfera,
    procedimientoEspaciosConfinados,
    manejoEnergiasPeligrosas,
    planDeEmergencias,
    sumaTotal,
  };
}

// ── Catalog data ───────────────────────────────────────────────────────────────

export const ACTIVIDADES_LISTA: string[] = [
  'Mantenimiento, limpieza e inspección de tanques de almacenamiento',
  'Mantenimiento e instalación de sistemas de iluminación',
  'Mantenimiento e instalación de sistemas de seguridad electrónica',
  'Mantenimiento de equipos electromecánicos',
  'Mantenimiento e instalación de dispositivos de proceso',
  'Mantenimiento industrial de equipos y estructuras de proceso',
  'Inspección, monitoreo y mantenimiento de tuberías',
  'Inspección y mantenimiento de redes de almacenamiento',
  'Inspección, mantenimiento e instalación de sistema de gas',
  'Muestreo e inspección de calidad',
  'Carga y descarga de vehículos de carga',
  'Mantenimiento de sistemas HVAC y refrigeración',
  'Mantenimiento de sistemas de generación térmica y vapor',
  'Mantenimiento de equipos hidráulicos',
  'Mantenimiento e instalación de energía eléctrica',
  'Operación de equipos de izaje y manejo de carga',
  'Trabajo y mantenimiento al interior de andamios',
  'Limpieza de áreas',
  'Mantenimiento de cerramientos y sistemas perimetrales',
  'Limpieza y demolición de estructuras',
  'Montajes y adecuación de estructuras',
  'Inspección y supervisión operativas',
  'Inspección y mantenimiento en altura',
  'Mantenimiento de sistemas de telecomunicaciones',
  'Mantenimiento de sistemas hidráulicos y talleres',
  'Mantenimiento, reparación e instalación de redes (agua, tubería)',
  'Limpieza y desinfección de tanques (agua, combustible, sumideros)',
  'Limpieza y desalojado de silos, tolvas y fosas',
  'Limpieza de filtros, ductos y sistemas de ventilación',
  'Limpieza de sumideros y drenajes en piso',
  'Limpieza de luminarias y sistemas de aire acondicionado/refrigeración',
  'Control de plagas (fumigación e instalación de mallas)',
  'Mantenimiento preventivo/correctivo de motores y maquinaria',
  'Revisión y reparación de bandas transportadoras y tornillos sin fin',
  'Mantenimiento de cabrias, chimeneas y tuberías de vapor',
  'Mantenimiento de sistemas de refrigeración (cuartos fríos)',
  'Instalación y mantenimiento de redes eléctricas y transformadores',
  'Instalación, limpieza y mantenimiento de cámaras CCTV y alarmas',
  'Preparación y mantenimiento de sistemas de energía solar fotovoltaica',
  'Excavación, relleno y apilamiento de materias primas',
  'Llenado y vaciado de silos, tolvas y carro tanques a granel',
  'Cargue y descargue de vehículos de carga',
  'Servicios varios (limpieza, orden general, logística)',
  'Control de calidad (agua, materias primas)',
];

export const DETALLE_ACTIVIDAD_LISTA: string[] = [
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

export const ALTURA_OPCIONES: string[] = [
  'Entre 2.01 m y 4.00 m',
  'Entre 4.01 m y 6.00 m',
  'Entre 6.01 m y 9.00 m',
  'Más de 9.01 m',
];

export const DESARROLLADO_POR_OPCIONES: string[] = [
  'Personal Temporal',
  'Personal de la Empresa',
  'No Aplica',
];

export const TIPO_EJECUCION_OPCIONES: string[] = [
  'Rutinaria',
  'No Rutinaria',
  'Periódica',
  'Esporádica',
];

export const ACTIVIDADES_ALTO_RIESGO: string[] = [
  'Trabajo en alturas',
  'Trabajo en caliente',
  'Trabajo eléctrico de alta tensión',
  'Izaje de cargas',
  'Excavaciones',
  'Manejo de sustancias peligrosas',
  'Demoliciones',
  'Trabajo en vía pública',
];

export const FACILIDADES_OPCIONES: string[] = [
  'Ventilación: Mecánica Continua',
  'Ventilación: Mecánica Portátil',
  'Ventilación: Natural',
  'Iluminación: No Elaborada',
  'Iluminación: Natural',
  'Iluminación: Portátil/Casco',
  'Monitoreo: Continua/Alarma',
  'Monitoreo: Portátil',
  'Andamios: Tubería y Crucetas',
  'Andamios: Bloques de Emergencia (GTOS)',
  'Andamios: No Aplica/No se Usa',
  'Entorno: Cerrado',
  'Entorno: Sin Cercar/Abierto',
  'Controles Administrativos: Señalización',
  'Controles Administrativos: Delimitación',
  'Controles Administrativos: Control de Acceso',
];

export const MEDIDAS_PREVENCION_OPCIONES: string[] = [
  'Permiso de trabajo',
  'Procedimiento de seguridad',
  'Análisis de trabajo seguro (ATS)',
  'Capacitación específica',
  'Bloqueo y etiquetado (LOTO)',
  'Monitoreo de atmósfera',
  'Equipo de rescate',
  'Equipo de comunicación',
  'Señalización y demarcación del área',
];

export const EQUIPOS_BASE_OPTS: string[] = [
  'Se utiliza',
  'Inspección y mantenimiento',
  'Hoja de vida',
  'Buen estado',
  'Certificado',
  'No se utiliza',
  'No aplica',
];

export const EPP_OPCIONES: string[] = [
  'Se utiliza',
  'Inspección y mantenimiento',
  'Buen estado',
  'No se utiliza',
  'No aplica',
  'Protección visual',
  'Protección auditiva',
  'Protección respiratoria',
  'Guantes de seguridad según la labor',
  'Protección dorsal',
  'Calzado Industrial',
  'Casco de seguridad',
  'Protector de extremidades / Espinilleros',
  'Botas dieléctricas',
  'Ropa Antiflama',
  'Cinturón de soldador',
  'Careta de soldador',
  'Máscara de alta protección tipo Cerek',
  'Botella preparadora',
];

export const EQUIPOS_ITEMS: Array<{
  field: keyof DiagnosticoConfinado;
  label: string;
  opts: string[];
}> = [
  { field: 'escaleraFosaVertical',    label: 'Escalera de Fosa Vertical (tipo gato)',  opts: EQUIPOS_BASE_OPTS },
  { field: 'escaleraGato',            label: 'Escalera de Gato',                        opts: EQUIPOS_BASE_OPTS },
  { field: 'escaleraExtension',       label: 'Escalera de Extensión',                   opts: EQUIPOS_BASE_OPTS },
  { field: 'otroTrabajoAlturas',      label: 'Otro Equipo – Trabajo en Alturas',         opts: EQUIPOS_BASE_OPTS },
  { field: 'arnesCuerpoCompleto',     label: 'Arnés de Cuerpo Completo',                opts: EQUIPOS_BASE_OPTS },
  { field: 'tripodeEquipoRescate',    label: 'Trípode o Equipo de Rescate',             opts: EQUIPOS_BASE_OPTS },
  { field: 'autoContenido',           label: 'Auto Contenido (SCBA)',                   opts: EQUIPOS_BASE_OPTS },
  { field: 'equipoComunicacion',      label: 'Equipo de Comunicación',                  opts: EQUIPOS_BASE_OPTS },
  { field: 'sistemaVentilacionMecanica', label: 'Sistema de Ventilación Mecánica',      opts: EQUIPOS_BASE_OPTS },
  { field: 'sistemaProteccionCaidas', label: 'Sistema de Protección Contra Caídas',     opts: EQUIPOS_BASE_OPTS },
  { field: 'equipoPrimerosAuxilios',  label: 'Equipo de Primeros Auxilios',             opts: EQUIPOS_BASE_OPTS },
  { field: 'otrosModelosProteccion',  label: 'Otros Modelos de Protección (EPP)',        opts: EPP_OPCIONES },
  { field: 'eppUtilizados',           label: 'Seleccione los EPP utilizados en la actividad', opts: EPP_OPCIONES },
];

export const RESULT_LABELS: Record<keyof DiagnosticoResultados, string> = {
  identificacionPeligros:         'Identificación de peligros y valoración de riesgos',
  permisosDeTrabajo:              'Permisos de trabajo',
  gestionMedidasPrevencion:       'Gestión de medidas de prevención',
  monitoreoDeLaAtmosfera:         'Monitoreo de la atmósfera',
  procedimientoEspaciosConfinados: 'Procedimiento para el manejo de espacios confinados',
  manejoEnergiasPeligrosas:       'Manejo de energías peligrosas',
  planDeEmergencias:              'Plan de emergencias',
  sumaTotal:                      'Suma total Resultado',
};
