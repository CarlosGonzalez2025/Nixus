import type { Metadata } from 'next';
import { LegalShell } from '@/components/legal/legal-shell';
import { LEGAL_CONFIG } from '@/lib/legal-config';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso | SGTC',
  description: 'Términos y condiciones de uso de la plataforma SGTC.',
};

const C = LEGAL_CONFIG;

export default function TerminosPage() {
  return (
    <LegalShell
      title="Términos y Condiciones de Uso"
      subtitle="Condiciones que regulan el acceso y uso de la plataforma."
    >
      <h2>1. Aceptación de los términos</h2>
      <p>
        El acceso y uso de la plataforma <strong>{C.app.nombreLargo}</strong> (en adelante, “la
        Plataforma”), operada por <strong>{C.operador.razonSocial}</strong> (NIT {C.operador.nit}),
        implica la aceptación plena y sin reservas de los presentes Términos y Condiciones. Si no
        está de acuerdo con ellos, debe abstenerse de utilizar la Plataforma.
      </p>

      <h2>2. Objeto y naturaleza del servicio</h2>
      <p>
        La Plataforma es una herramienta corporativa de gestión de seguridad y salud en el trabajo
        que permite crear, aprobar, ejecutar y cerrar permisos de trabajo de alto riesgo, gestionar
        hallazgos de seguridad y realizar verificaciones de contratistas. Su uso está destinado
        exclusivamente al personal autorizado de la organización contratante y sus contratistas.
      </p>

      <h2>3. Acceso, cuentas y credenciales</h2>
      <ul>
        <li>El acceso requiere credenciales asignadas por la organización; no existe registro abierto al público.</li>
        <li>El usuario es responsable de la confidencialidad de su contraseña y de toda actividad realizada bajo su cuenta.</li>
        <li>El usuario debe notificar de inmediato cualquier uso no autorizado de su cuenta.</li>
        <li>Las cuentas son personales e intransferibles.</li>
      </ul>

      <h2>4. Uso correcto de la Plataforma</h2>
      <p>El usuario se obliga a:</p>
      <ul>
        <li>Suministrar información veraz, completa y actualizada.</li>
        <li>Utilizar la Plataforma conforme a la ley, la moral y el orden público.</li>
        <li>No registrar datos falsos ni suplantar la identidad de terceros.</li>
        <li>No intentar acceder a información o módulos fuera del alcance de su rol.</li>
        <li>No realizar acciones que comprometan la seguridad, integridad o disponibilidad del sistema.</li>
      </ul>

      <h2>5. Valor legal de las firmas y registros electrónicos</h2>
      <p>
        Las firmas digitalizadas, validaciones y aprobaciones registradas en la Plataforma tienen
        validez como manifestación de voluntad del usuario que las realiza, conforme a la normativa
        sobre mensajes de datos y comercio electrónico. El usuario reconoce que dichos registros
        constituyen evidencia de las actuaciones efectuadas en el marco de los procesos de SST.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        El software, su código, diseño, marcas, logotipos e interfaces son propiedad de{' '}
        {C.operador.razonSocial} o de sus licenciantes, y están protegidos por la legislación de
        propiedad intelectual. El uso de la Plataforma no transfiere ningún derecho de propiedad
        sobre estos elementos. Los datos operativos ingresados pertenecen a la organización
        contratante en su calidad de Responsable del Tratamiento.
      </p>

      <h2>7. Disponibilidad y modo sin conexión</h2>
      <p>
        El operador procurará la disponibilidad continua del servicio, sin garantizar que sea
        ininterrumpido o libre de errores. La Plataforma puede ofrecer funciones sin conexión cuyos
        datos se sincronizan al restablecerse la conectividad; el usuario es responsable de
        verificar la correcta sincronización de la información crítica.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        La Plataforma es una herramienta de apoyo a la gestión de SST y no sustituye el criterio
        profesional ni las obligaciones legales de la organización y sus responsables. El operador
        no será responsable por daños derivados del uso indebido de la Plataforma, de información
        inexacta suministrada por los usuarios, ni de decisiones operativas adoptadas por la
        organización contratante.
      </p>

      <h2>9. Suspensión y terminación</h2>
      <p>
        El operador o la organización contratante podrán suspender o cancelar el acceso de un
        usuario ante el incumplimiento de estos Términos, por razones de seguridad o por solicitud
        del Responsable del Tratamiento.
      </p>

      <h2>10. Protección de datos</h2>
      <p>
        El tratamiento de datos personales se rige por la{' '}
        <a href="/legal/privacidad">Política de Privacidad y Tratamiento de Datos Personales</a>,
        que forma parte integral de estos Términos.
      </p>

      <h2>11. Ley aplicable y jurisdicción</h2>
      <p>
        Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia se
        someterá a los jueces y tribunales competentes de la ciudad de Bogotá D.C.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para consultas sobre estos Términos, escriba a{' '}
        <a href={`mailto:${C.operador.email}`}>{C.operador.email}</a>.
      </p>
    </LegalShell>
  );
}
