import type { Metadata } from 'next';
import { LegalShell } from '@/components/legal/legal-shell';
import { LEGAL_CONFIG } from '@/lib/legal-config';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Tratamiento de Datos | SGTC',
  description:
    'Política de Tratamiento de Datos Personales de la plataforma SGTC conforme a la Ley 1581 de 2012.',
};

const C = LEGAL_CONFIG;

export default function PrivacidadPage() {
  return (
    <LegalShell
      title="Política de Privacidad y Tratamiento de Datos Personales"
      subtitle="Aviso de privacidad y política de tratamiento conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015."
    >
      <h2>1. Identificación del responsable y del encargado</h2>
      <p>
        La plataforma <strong>{C.app.nombreLargo}</strong> es operada y administrada por{' '}
        <strong>{C.operador.razonSocial}</strong> (NIT {C.operador.nit}), sociedad{' '}
        {C.operador.formaJuridica} con domicilio en {C.operador.sede}, quien actúa como{' '}
        <strong>Encargado del Tratamiento</strong> de los datos personales, responsable de la
        gestión, almacenamiento y licenciamiento de la información de la aplicación.
      </p>
      <p>
        La organización contratante, <strong>{C.responsable.nombre}</strong>, actúa como{' '}
        <strong>Responsable del Tratamiento</strong> respecto de los datos de su personal y
        contratistas registrados en la plataforma, y determina las finalidades del tratamiento.
      </p>
      <ul>
        <li><strong>Domicilio:</strong> {C.operador.direccion}</li>
        <li><strong>Correo de contacto / Habeas Data:</strong> {C.operador.email}</li>
        <li><strong>Teléfono:</strong> {C.operador.telefono}</li>
      </ul>

      <h2>2. Marco normativo</h2>
      <p>
        Esta política se rige por la legislación colombiana en materia de protección de datos
        personales:
      </p>
      <ul>
        {C.marcoNormativo.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>

      <h2>3. Datos personales que tratamos</h2>
      <p>
        La plataforma recolecta y trata las siguientes categorías de datos, necesarios para la
        gestión de permisos de trabajo de alto riesgo, hallazgos de seguridad y verificación de
        contratistas:
      </p>

      <h3>3.1. Datos de identificación y contacto</h3>
      <ul>
        <li>Nombre completo y número de identificación (cédula).</li>
        <li>Correo electrónico y número de teléfono.</li>
        <li>Fotografía de perfil y/o del trabajador.</li>
      </ul>

      <h3>3.2. Datos laborales y organizacionales</h3>
      <ul>
        <li>Empresa, cargo, área, proceso y contrato.</li>
        <li>Planta, ciudad y ubicación asignada.</li>
        <li>Rol dentro del sistema (solicitante, autorizante, líder SST, entre otros).</li>
      </ul>

      <h3>3.3. Datos sensibles</h3>
      <p>
        El sistema trata datos que la ley considera <strong>sensibles</strong> o de especial
        protección. Su recolección es facultativa y se realiza para fines de seguridad y salud en
        el trabajo y cumplimiento de obligaciones legales:
      </p>
      <ul>
        <li>
          Afiliación a seguridad social: Entidad Promotora de Salud (EPS), Administradora de
          Riesgos Laborales (ARL) y fondo de pensiones.
        </li>
        <li>
          Firma manuscrita digitalizada, utilizada para la autorización, ejecución y cierre de
          permisos y validaciones diarias.
        </li>
        <li>
          Datos de geolocalización asociados a los hallazgos de seguridad reportados en campo.
        </li>
      </ul>
      <p>
        Usted no está obligado a autorizar el tratamiento de datos sensibles. No obstante, algunos
        de estos datos son requisito legal indispensable para la emisión de permisos de trabajo de
        alto riesgo; su omisión puede impedir la prestación del servicio.
      </p>

      <h3>3.4. Datos operativos y de auditoría</h3>
      <ul>
        <li>
          Contenido de permisos de trabajo, análisis de trabajo seguro (ATS) y sus anexos
          (alturas, espacios confinados, energías peligrosas, izaje, excavaciones, trabajo en
          caliente).
        </li>
        <li>Evidencias fotográficas de hallazgos y de verificaciones de contratistas.</li>
        <li>
          Registros de actividad: fechas y horas de firmas, cambios de estado, aprobaciones,
          rechazos y notificaciones.
        </li>
      </ul>

      <h2>4. Finalidades del tratamiento</h2>
      <p>Los datos personales se tratan para las siguientes finalidades:</p>
      <ul>
        <li>Gestionar la creación, aprobación, ejecución, cierre y cancelación de permisos de trabajo de alto riesgo.</li>
        <li>Administrar el registro y seguimiento de hallazgos de seguridad y salud en el trabajo.</li>
        <li>Realizar verificaciones documentales y de cumplimiento de contratistas.</li>
        <li>Autenticar a los usuarios y controlar el acceso según su rol y alcance asignado.</li>
        <li>Generar evidencias, reportes y documentos en cumplimiento de la normativa de seguridad y salud en el trabajo (SST).</li>
        <li>Enviar notificaciones operativas dentro de la plataforma.</li>
        <li>Atender requerimientos de autoridades administrativas y judiciales.</li>
        <li>Conservar registros con fines de auditoría, trazabilidad y defensa de obligaciones legales.</li>
      </ul>

      <h2>5. Almacenamiento e infraestructura</h2>
      <p>
        La información se almacena en servicios de infraestructura en la nube proporcionados por
        proveedores tecnológicos de terceros (Google Firebase / Google Cloud Platform), que actúan
        como subencargados del tratamiento bajo estándares internacionales de seguridad. Esto puede
        implicar la <strong>transferencia y almacenamiento de datos en servidores ubicados fuera de
        Colombia</strong>. Al aceptar esta política, usted autoriza dicha transferencia
        internacional, la cual se realiza con las garantías de seguridad y confidencialidad
        exigidas por la ley.
      </p>

      <h2>6. Conservación de los datos</h2>
      <p>
        Los datos se conservarán durante el tiempo necesario para cumplir las finalidades descritas
        y mientras subsistan las obligaciones legales, contractuales y de trazabilidad en materia de
        SST. Vencidos dichos plazos, los datos serán suprimidos o anonimizados de forma segura,
        salvo obligación legal de conservación.
      </p>

      <h2>7. Derechos del titular (Habeas Data)</h2>
      <p>Como titular de los datos personales, usted tiene derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar sus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada.</li>
        <li>Ser informado sobre el uso que se da a sus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
        <li>Revocar la autorización y/o solicitar la supresión de sus datos cuando no exista un deber legal o contractual que lo impida.</li>
        <li>Acceder de forma gratuita a sus datos personales objeto de tratamiento.</li>
      </ul>

      <h2>8. Procedimiento para ejercer sus derechos</h2>
      <p>
        Puede ejercer sus derechos de consulta y reclamo enviando una solicitud al correo{' '}
        <a href={`mailto:${C.operador.email}`}>{C.operador.email}</a>, indicando su nombre completo,
        número de identificación, descripción de la solicitud y datos de contacto.
      </p>
      <ul>
        <li>
          <strong>Consultas:</strong> serán atendidas en un término máximo de diez (10) días
          hábiles, prorrogables conforme a la ley.
        </li>
        <li>
          <strong>Reclamos:</strong> serán atendidos en un término máximo de quince (15) días
          hábiles, contados a partir del día siguiente a su recepción.
        </li>
      </ul>

      <h2>9. Autorización</h2>
      <p>
        Al registrarse y utilizar la plataforma, el usuario otorga su autorización libre, previa,
        expresa e informada para que sus datos personales sean tratados conforme a la presente
        política. Para el caso de datos de terceros (por ejemplo, trabajadores registrados por un
        solicitante), quien los suministra declara contar con la autorización del titular.
      </p>

      <h2>10. Seguridad de la información</h2>
      <p>
        El operador implementa medidas técnicas, humanas y administrativas razonables para proteger
        los datos contra acceso no autorizado, pérdida, alteración o uso indebido. Para más detalle,
        consulte la <a href="/legal/seguridad">Política de Seguridad de la Información</a>.
      </p>

      <h2>11. Vigencia y cambios</h2>
      <p>
        Esta política rige a partir de su publicación y permanece vigente mientras la plataforma
        preste sus servicios. Cualquier modificación sustancial será comunicada a través de la misma
        plataforma. La fecha de última actualización se indica en la parte superior de este
        documento.
      </p>
    </LegalShell>
  );
}
