import type { Metadata } from 'next';
import { LegalShell } from '@/components/legal/legal-shell';
import { LEGAL_CONFIG } from '@/lib/legal-config';

export const metadata: Metadata = {
  title: 'Política de Seguridad de la Información | SGTC',
  description:
    'Medidas técnicas y organizativas que protegen la información de la plataforma SGTC.',
};

const C = LEGAL_CONFIG;

export default function SeguridadPage() {
  return (
    <LegalShell
      title="Política de Seguridad de la Información"
      subtitle="Medidas técnicas y organizativas para proteger la información."
    >
      <h2>1. Objetivo y alcance</h2>
      <p>
        <strong>{C.operador.razonSocial}</strong>, como operador de la plataforma{' '}
        <strong>{C.app.nombreLargo}</strong>, adopta medidas razonables para preservar la{' '}
        <strong>confidencialidad, integridad y disponibilidad</strong> de la información tratada en
        el sistema, en línea con la Ley 1581 de 2012 y la Ley 1273 de 2009.
      </p>

      <h2>2. Control de acceso</h2>
      <ul>
        <li>Autenticación de usuarios mediante credenciales personales e intransferibles.</li>
        <li>
          Modelo de acceso basado en roles (solicitante, autorizante, líder SST, líder regional,
          mantenimiento, asesor ARL y administrador), que limita la información visible a cada
          usuario según sus funciones.
        </li>
        <li>
          Segmentación por alcance (empresa, planta y ciudad) para roles regionales, de modo que
          cada usuario solo accede a los registros que le corresponden.
        </li>
        <li>Reglas de seguridad en la base de datos que validan cada operación de lectura y escritura.</li>
      </ul>

      <h2>3. Cifrado y transmisión</h2>
      <ul>
        <li>La comunicación entre el dispositivo y los servidores se realiza mediante canales cifrados (HTTPS/TLS).</li>
        <li>La información en reposo se almacena en infraestructura que aplica cifrado conforme a estándares de la industria.</li>
      </ul>

      <h2>4. Infraestructura</h2>
      <p>
        La Plataforma se apoya en proveedores de infraestructura en la nube de reconocido prestigio
        (Google Firebase / Google Cloud Platform), que cuentan con certificaciones internacionales
        de seguridad y mecanismos de redundancia, respaldo y monitoreo continuo.
      </p>

      <h2>5. Respaldo y continuidad</h2>
      <p>
        Se aplican mecanismos de copia de seguridad y recuperación gestionados por la infraestructura
        en la nube, orientados a minimizar la pérdida de información ante incidentes.
      </p>

      <h2>6. Gestión de incidentes</h2>
      <p>
        En caso de detectarse un incidente de seguridad que comprometa datos personales, el operador
        adoptará las medidas correctivas necesarias y notificará a los responsables y, cuando
        corresponda, a las autoridades competentes, conforme a la normativa vigente.
      </p>

      <h2>7. Responsabilidades del usuario</h2>
      <ul>
        <li>Custodiar sus credenciales y no compartirlas con terceros.</li>
        <li>Cerrar sesión en dispositivos compartidos.</li>
        <li>Reportar de inmediato cualquier uso indebido o sospecha de acceso no autorizado.</li>
        <li>Mantener actualizado el navegador y el dispositivo desde el cual accede.</li>
      </ul>

      <h2>8. Mejora continua</h2>
      <p>
        Las medidas de seguridad se revisan y actualizan periódicamente para responder a la
        evolución de las amenazas y de la tecnología.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para reportar un incidente de seguridad o realizar consultas, escriba a{' '}
        <a href={`mailto:${C.operador.email}`}>{C.operador.email}</a>.
      </p>
    </LegalShell>
  );
}
