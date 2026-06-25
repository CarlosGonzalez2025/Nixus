/**
 * Datos legales y de contacto del operador de la plataforma.
 *
 * Fuente única de verdad para todas las páginas legales públicas
 * (/legal/*). Si cambia la razón social, NIT, dirección o los canales
 * de contacto, actualícelo aquí y se reflejará en todos los documentos.
 *
 * NOTA: Verifique el correo y teléfono de contacto antes de publicar.
 */
export const LEGAL_CONFIG = {
  // Operador / Encargado del Tratamiento de datos de la plataforma.
  operador: {
    razonSocial: 'Nixus Capital Humano S.A.S.',
    nombreComercial: 'Nixus Capital Humano',
    nit: '900.490.623-4',
    constitucion: '17 de enero de 2012, Bogotá D.C.',
    formaJuridica: 'Sociedad por Acciones Simplificada (S.A.S.)',
    sector:
      'Consultoría de gestión, dirección de empresas y servicios de seguridad y salud en el trabajo',
    sede: 'Bogotá D.C., Colombia',
    direccion: 'Cl. 77A #84 - 55 / Cra. 15 #104-33 (Oficina 204), Bogotá D.C., Colombia',
    // ⚠️ Confirmar estos canales antes de publicar.
    email: 'protecciondedatos@nixuscapitalhumano.com',
    telefono: '+57 (601) 000 0000',
  },

  // Organización contratante / Responsable del Tratamiento.
  responsable: {
    nombre: 'Italcol',
    descripcion:
      'Organización contratante de la plataforma y empleadora del personal usuario',
  },

  // Identificación del producto.
  app: {
    nombre: 'SGTC',
    nombreLargo: 'Sistema de Gestión de Tareas de Alto Riesgo (SGTC Móvil)',
  },

  // Marco normativo aplicable (Colombia).
  marcoNormativo: [
    'Constitución Política de Colombia, artículo 15 (Habeas Data)',
    'Ley 1581 de 2012 (Protección de Datos Personales)',
    'Decreto 1074 de 2015, Título 2.2.2 (Reglamentario)',
    'Ley 1266 de 2008 (en lo pertinente)',
    'Ley 1273 de 2009 (Delitos Informáticos)',
  ],

  // Fecha de última actualización de los documentos legales.
  ultimaActualizacion: '25 de junio de 2026',
} as const;
