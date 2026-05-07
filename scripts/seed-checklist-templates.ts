/**
 * Script de importación inicial de plantillas de verificación.
 *
 * Uso:
 *   npx tsx scripts/seed-checklist-templates.ts
 *
 * Requiere:
 *   - Variables de entorno: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   - O bien: GOOGLE_APPLICATION_CREDENTIALS apuntando al archivo de credenciales
 *
 * Estructura: transforma datos tipo Excel en riskTypes, checklistTemplates y groups con items.
 * Para agregar nuevas plantillas, agrega una entrada al array SEED_DATA.
 */

import * as admin from 'firebase-admin';

// ── Inicialización Firebase Admin ─────────────────────────────────────────────

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// ── Tipos locales ─────────────────────────────────────────────────────────────

interface SeedItem {
  requisitoBaseLegal: string;
  aspectoVerificar: string;
  preguntaClave?: string;
  metodoVerificacion?: string;
  isRequired?: boolean;
  requiresEvidence?: boolean;
}

interface SeedGroup {
  title: string;
  description?: string;
  items: SeedItem[];
}

interface SeedTemplate {
  riskTypeCode: string;
  riskTypeName: string;
  riskTypeDescription: string;
  templateName: string;
  templateDescription?: string;
  groups: SeedGroup[];
}

// ── Datos iniciales ────────────────────────────────────────────────────────────
// Estructura equivalente a hojas de Excel con columnas:
// REQUISITO/BASE LEGAL | ASPECTO A VERIFICAR | PREGUNTA CLAVE | MÉTODO VERIFICACIÓN

const SEED_DATA: SeedTemplate[] = [
  {
    riskTypeCode: 'ALTURAS',
    riskTypeName: 'Trabajo en Alturas',
    riskTypeDescription: 'Verificación de requisitos para trabajos en alturas (≥1.50 m) según Res. 4272/2021.',
    templateName: 'Lista de Verificación — Trabajo en Alturas',
    templateDescription: 'Basada en Resolución 4272 de 2021 y Resolución 1409 de 2012.',
    groups: [
      {
        title: '1. Documentación y Habilitación del Personal',
        description: 'Verificación de certificaciones, permisos y habilitaciones del personal.',
        items: [
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 9',
            aspectoVerificar: 'Certificación vigente en trabajo en alturas',
            preguntaClave: '¿El trabajador cuenta con certificación vigente en trabajo seguro en alturas?',
            metodoVerificacion: 'Verificar certificado emitido por entidad autorizada por el SENA. Vigencia máxima 3 años.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 11',
            aspectoVerificar: 'Permiso de trabajo en alturas diligenciado y firmado',
            preguntaClave: '¿El permiso de trabajo en alturas está diligenciado, firmado por las partes y vigente?',
            metodoVerificacion: 'Revisión física del permiso con firmas del solicitante, autorizante y coordinador de alturas.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 13',
            aspectoVerificar: 'Coordinador de trabajo en alturas designado',
            preguntaClave: '¿Existe un coordinador de trabajo en alturas designado para la actividad?',
            metodoVerificacion: 'Verificar certificación del coordinador y su presencia o disponibilidad durante el trabajo.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 17',
            aspectoVerificar: 'Plan de rescate disponible y socializado',
            preguntaClave: '¿Existe un plan de rescate documentado y el personal lo conoce?',
            metodoVerificacion: 'Consultar al trabajador sobre el procedimiento de rescate. Verificar disponibilidad del plan.',
            isRequired: true,
          },
        ],
      },
      {
        title: '2. Elementos de Protección Personal (EPP)',
        description: 'Verificación del estado y uso correcto de EPP para trabajo en alturas.',
        items: [
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 21',
            aspectoVerificar: 'Arnés de cuerpo entero en buen estado y certificado',
            preguntaClave: '¿El arnés de cuerpo entero cumple con la norma ANSI/ASSE Z359 o equivalente?',
            metodoVerificacion: 'Inspección visual del arnés: sin daños, costura, hebillas, marcación. Verificar certificación.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 21',
            aspectoVerificar: 'Eslinga de posicionamiento o doble cola en buen estado',
            preguntaClave: '¿La eslinga tiene absorbedor de impacto y está en buen estado?',
            metodoVerificacion: 'Inspección visual: mosquetones, costuras, absorbedor no activado, marcaciones.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'NTC 1523',
            aspectoVerificar: 'Casco de seguridad con barbuquejo',
            preguntaClave: '¿El casco tiene barbuquejo de tres puntos y está en buen estado?',
            metodoVerificacion: 'Verificar presencia de barbuquejo, golpes, rajaduras, fecha de fabricación (máx. 5 años).',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 21',
            aspectoVerificar: 'Línea de vida o punto de anclaje certificado',
            preguntaClave: '¿El punto de anclaje o línea de vida está certificado para soportar el peso requerido?',
            metodoVerificacion: 'Verificar certificación del punto de anclaje (mín. 5000 lbs). Inspeccionar línea de vida.',
            isRequired: true,
            requiresEvidence: true,
          },
        ],
      },
      {
        title: '3. Condiciones del Área de Trabajo',
        description: 'Verificación de condiciones de seguridad en el área donde se realizará el trabajo.',
        items: [
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 19',
            aspectoVerificar: 'Área delimitada y señalizada',
            preguntaClave: '¿El área de trabajo está delimitada con conos, cinta o barricadas y señalizada?',
            metodoVerificacion: 'Verificar delimitación visual del área con barreras físicas y señales de advertencia.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021',
            aspectoVerificar: 'Condiciones climáticas aptas para el trabajo',
            preguntaClave: '¿Las condiciones climáticas (viento, lluvia) son seguras para el trabajo en alturas?',
            metodoVerificacion: 'Verificar si hay lluvia, viento fuerte o condiciones que comprometan la seguridad.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021',
            aspectoVerificar: 'Redes de seguridad o superficies de protección colectiva',
            preguntaClave: '¿Se han instalado sistemas de protección colectiva donde aplique?',
            metodoVerificacion: 'Verificar instalación de redes, mallas, barandas o cubiertas de protección colectiva.',
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021 Art. 20',
            aspectoVerificar: 'Inspección preoperacional de herramientas y equipos',
            preguntaClave: '¿Todas las herramientas tienen sistema anti-caída o están aseguradas?',
            metodoVerificacion: 'Verificar que herramientas cuenten con driza o porta-herramientas para evitar caída de objetos.',
            isRequired: true,
          },
        ],
      },
      {
        title: '4. Procedimiento Seguro de Trabajo',
        description: 'Verificación del cumplimiento del procedimiento durante la ejecución.',
        items: [
          {
            requisitoBaseLegal: 'Res. 4272/2021',
            aspectoVerificar: 'Charla de inicio (toolbox talk) realizada',
            preguntaClave: '¿Se realizó la charla de inicio con todo el personal antes de iniciar el trabajo?',
            metodoVerificacion: 'Verificar registro de asistencia a la charla de inicio o ATS diligenciado.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021',
            aspectoVerificar: 'Uso correcto del arnés durante el trabajo',
            preguntaClave: '¿El trabajador usa el arnés correctamente con la hebilla pectoral al nivel del esternón?',
            metodoVerificacion: 'Observación directa: arnés ajustado, hebillas abrochadas, distancia de caída libre calculada.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 4272/2021',
            aspectoVerificar: 'Doble protección: trabajador siempre enganchado',
            preguntaClave: '¿El trabajador mantiene doble protección (ambas colas enganchadas) al desplazarse?',
            metodoVerificacion: 'Verificar por observación directa que el trabajador no queda sin protección en ningún momento.',
            isRequired: true,
          },
        ],
      },
    ],
  },

  {
    riskTypeCode: 'ESPACIOS_CONFINADOS',
    riskTypeName: 'Espacios Confinados',
    riskTypeDescription: 'Verificación de requisitos para trabajos en espacios confinados según Res. 491/2020.',
    templateName: 'Lista de Verificación — Espacios Confinados',
    templateDescription: 'Basada en Resolución 491 de 2020.',
    groups: [
      {
        title: '1. Clasificación y Permisos',
        items: [
          {
            requisitoBaseLegal: 'Res. 491/2020 Art. 6',
            aspectoVerificar: 'Espacio confinado clasificado (con/sin peligro)',
            preguntaClave: '¿El espacio confinado ha sido clasificado y documentado?',
            metodoVerificacion: 'Verificar registro de clasificación del espacio: dimensiones, accesos, peligros identificados.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 491/2020 Art. 8',
            aspectoVerificar: 'Permiso de entrada a espacio confinado diligenciado',
            preguntaClave: '¿El permiso de entrada está firmado por el supervisor y el vigía?',
            metodoVerificacion: 'Revisión del permiso con todas las firmas, mediciones atmosféricas registradas y vigente.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'Res. 491/2020',
            aspectoVerificar: 'Vigía designado y capacitado',
            preguntaClave: '¿Hay un vigía capacitado en la entrada del espacio durante todo el trabajo?',
            metodoVerificacion: 'Verificar presencia del vigía en la entrada, con certificación y sistema de comunicación.',
            isRequired: true,
          },
        ],
      },
      {
        title: '2. Monitoreo Atmosférico',
        items: [
          {
            requisitoBaseLegal: 'Res. 491/2020 Art. 10',
            aspectoVerificar: 'Medición de O2 (19.5% - 23.5%)',
            preguntaClave: '¿La concentración de oxígeno está en el rango seguro?',
            metodoVerificacion: 'Verificar medición con detector multigas calibrado. Registrar valor: O2 entre 19.5% y 23.5%.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'Res. 491/2020 Art. 10',
            aspectoVerificar: 'Medición de gases inflamables (LEL < 10%)',
            preguntaClave: '¿La concentración de gases inflamables está por debajo del 10% del LEL?',
            metodoVerificacion: 'Verificar medición con detector multigas. Registrar valor de LEL.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'Res. 491/2020 Art. 10',
            aspectoVerificar: 'Medición de gases tóxicos (H2S, CO)',
            preguntaClave: '¿Los niveles de gases tóxicos están dentro de los límites permisibles?',
            metodoVerificacion: 'H2S < 10 ppm TLV-TWA; CO < 25 ppm TLV-TWA. Registrar valores medidos.',
            isRequired: true,
            requiresEvidence: true,
          },
        ],
      },
      {
        title: '3. EPP y Equipos de Rescate',
        items: [
          {
            requisitoBaseLegal: 'Res. 491/2020 Art. 12',
            aspectoVerificar: 'Sistema de rescate disponible y operativo',
            preguntaClave: '¿El sistema de rescate (trípode + winche) está instalado y listo antes de ingresar?',
            metodoVerificacion: 'Verificar trípode instalado, línea de vida conectada, equipo de rescate disponible.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'Res. 491/2020',
            aspectoVerificar: 'EPP respiratorio disponible si se requiere',
            preguntaClave: '¿Se cuenta con equipo de respiración autónomo (SCBA) si la atmósfera es peligrosa?',
            metodoVerificacion: 'Verificar disponibilidad de SCBA, estado de la máscara, presión del cilindro.',
          },
          {
            requisitoBaseLegal: 'Res. 491/2020',
            aspectoVerificar: 'Sistema de comunicación operativo entre vigía y trabajador',
            preguntaClave: '¿El vigía y el trabajador tienen sistema de comunicación efectivo?',
            metodoVerificacion: 'Verificar radio, señales acordadas o cualquier sistema de comunicación bidireccional.',
            isRequired: true,
          },
        ],
      },
    ],
  },

  {
    riskTypeCode: 'ENERGIAS_PELIGROSAS',
    riskTypeName: 'Energías Peligrosas (LOTO)',
    riskTypeDescription: 'Verificación de control de energías peligrosas - procedimiento LOTO.',
    templateName: 'Lista de Verificación — Control de Energías Peligrosas (LOTO)',
    templateDescription: 'Lockout/Tagout para trabajos de mantenimiento en equipos y sistemas energizados.',
    groups: [
      {
        title: '1. Planificación y Permisos',
        items: [
          {
            requisitoBaseLegal: 'NTC 4116 / OSHA 1910.147',
            aspectoVerificar: 'Procedimiento LOTO documentado para el equipo específico',
            preguntaClave: '¿Existe un procedimiento LOTO específico para el equipo a intervenir?',
            metodoVerificacion: 'Solicitar procedimiento LOTO del equipo. Verificar que incluya todas las fuentes de energía.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'NTC 4116',
            aspectoVerificar: 'Permiso de trabajo para control de energías diligenciado',
            preguntaClave: '¿El permiso de trabajo está autorizado por el responsable del área?',
            metodoVerificacion: 'Revisar permiso con firmas del solicitante, autoridad del área y especialista LOTO.',
            isRequired: true,
            requiresEvidence: true,
          },
        ],
      },
      {
        title: '2. Aplicación del Procedimiento LOTO',
        items: [
          {
            requisitoBaseLegal: 'NTC 4116',
            aspectoVerificar: 'Identificación de todas las fuentes de energía',
            preguntaClave: '¿Se han identificado TODAS las fuentes de energía del equipo (eléctrica, hidráulica, neumática, térmica, gravitacional)?',
            metodoVerificacion: 'Verificar diagrama del equipo o P&ID. Confirmar que todas las fuentes estén listadas en el procedimiento.',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'NTC 4116',
            aspectoVerificar: 'Dispositivos de bloqueo y etiquetado instalados',
            preguntaClave: '¿Cada fuente de energía tiene su candado de bloqueo y etiqueta instalados?',
            metodoVerificacion: 'Verificar presencia de candado personal de cada trabajador en CADA punto de aislamiento. Verificar etiqueta con nombre y fecha.',
            isRequired: true,
            requiresEvidence: true,
          },
          {
            requisitoBaseLegal: 'NTC 4116',
            aspectoVerificar: 'Verificación de energía cero (prueba de ausencia)',
            preguntaClave: '¿Se verificó la ausencia de energía residual antes de iniciar el trabajo?',
            metodoVerificacion: 'Intentar arrancar el equipo + verificar con multímetro (energía eléctrica), sangrar líneas (energía hidráulica/neumática).',
            isRequired: true,
          },
          {
            requisitoBaseLegal: 'NTC 4116',
            aspectoVerificar: 'Cada trabajador tiene su propio candado instalado',
            preguntaClave: '¿Cada trabajador que interviene el equipo tiene su candado personal instalado?',
            metodoVerificacion: 'Un candado por trabajador. Nadie puede retirar el candado de otro trabajador.',
            isRequired: true,
          },
        ],
      },
      {
        title: '3. Restauración del Equipo',
        items: [
          {
            requisitoBaseLegal: 'NTC 4116',
            aspectoVerificar: 'Verificación de área limpia antes de re-energizar',
            preguntaClave: '¿Se verificó que no hay personal ni herramientas dentro del equipo antes de re-energizar?',
            metodoVerificacion: 'Inspección visual del área de trabajo. Confirmar que todos los trabajadores retiraron sus candados.',
            isRequired: true,
          },
        ],
      },
    ],
  },
];

// ── Función principal de seed ─────────────────────────────────────────────────

async function seedTemplates() {
  const SEED_BY = 'SEED_SCRIPT';
  const now = admin.firestore.FieldValue.serverTimestamp();

  console.log('🚀 Iniciando seed de plantillas de verificación...\n');

  for (const seed of SEED_DATA) {
    console.log(`📋 Procesando: ${seed.riskTypeName}`);

    // 1. Crear o actualizar riskType
    const riskTypesRef = db.collection('riskTypes');
    const existingRT = await riskTypesRef.where('code', '==', seed.riskTypeCode).limit(1).get();

    let riskTypeId: string;
    if (!existingRT.empty) {
      riskTypeId = existingRT.docs[0].id;
      console.log(`   ✔ Tipo de riesgo ya existe: ${riskTypeId}`);
    } else {
      const rtRef = await riskTypesRef.add({
        code: seed.riskTypeCode,
        name: seed.riskTypeName,
        description: seed.riskTypeDescription,
        isActive: true,
        createdBy: SEED_BY,
        createdAt: now,
        updatedAt: now,
      });
      riskTypeId = rtRef.id;
      console.log(`   ✅ Tipo de riesgo creado: ${riskTypeId}`);
    }

    // 2. Crear plantilla
    const tplRef = await db.collection('checklistTemplates').add({
      riskTypeId,
      riskTypeCode: seed.riskTypeCode,
      name: seed.templateName,
      description: seed.templateDescription || '',
      version: 1,
      status: 'ACTIVE',
      createdBy: SEED_BY,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`   ✅ Plantilla creada: ${tplRef.id}`);

    // 3. Crear grupos con ítems inline
    for (let gi = 0; gi < seed.groups.length; gi++) {
      const group = seed.groups[gi];
      const items = group.items.map((item, ii) => ({
        id: `item-${gi}-${ii}-${Date.now()}`,
        groupId: '',        // se actualizará después
        templateId: tplRef.id,
        requisitoBaseLegal: item.requisitoBaseLegal || '',
        aspectoVerificar: item.aspectoVerificar,
        preguntaClave: item.preguntaClave || '',
        metodoVerificacion: item.metodoVerificacion || '',
        requiresEvidence: item.requiresEvidence || false,
        allowsAttachment: true,
        isRequired: item.isRequired !== false,
        orderIndex: ii,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      }));

      const groupRef = await db.collection('checklistTemplates').doc(tplRef.id).collection('groups').add({
        templateId: tplRef.id,
        title: group.title,
        description: group.description || '',
        orderIndex: gi,
        isActive: true,
        items: items.map(item => ({ ...item, groupId: '' })),
        createdAt: now,
        updatedAt: now,
      });

      // Actualizar groupId en los ítems
      const finalItems = items.map(item => ({ ...item, groupId: groupRef.id }));
      await groupRef.update({ items: finalItems });

      console.log(`   ✅ Grupo "${group.title}" con ${items.length} ítems`);
    }

    console.log(`✅ ${seed.riskTypeName} importado correctamente.\n`);
  }

  console.log('🎉 Seed completado exitosamente.');
  console.log('\nPlantillas importadas:');
  SEED_DATA.forEach(s => {
    const totalItems = s.groups.reduce((acc, g) => acc + g.items.length, 0);
    console.log(`  - ${s.templateName}: ${s.groups.length} grupos, ${totalItems} ítems`);
  });
}

// ── Ejecutar ──────────────────────────────────────────────────────────────────

seedTemplates()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error en el seed:', err);
    process.exit(1);
  });
