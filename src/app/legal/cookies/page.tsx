import type { Metadata } from 'next';
import { LegalShell } from '@/components/legal/legal-shell';
import { LEGAL_CONFIG } from '@/lib/legal-config';

export const metadata: Metadata = {
  title: 'Política de Cookies y Almacenamiento Local | SGTC',
  description:
    'Tecnologías de almacenamiento utilizadas por la plataforma SGTC para autenticación y funcionamiento sin conexión.',
};

const C = LEGAL_CONFIG;

export default function CookiesPage() {
  return (
    <LegalShell
      title="Política de Cookies y Almacenamiento Local"
      subtitle="Tecnologías de almacenamiento utilizadas por la plataforma."
    >
      <h2>1. Qué tecnologías utilizamos</h2>
      <p>
        La plataforma <strong>{C.app.nombreLargo}</strong> es una aplicación web progresiva (PWA).
        Para funcionar, no utiliza cookies publicitarias ni de rastreo de terceros. Emplea
        únicamente las siguientes tecnologías de almacenamiento en su dispositivo, todas con
        finalidad estrictamente técnica:
      </p>

      <h2>2. Tipos de almacenamiento</h2>
      <h3>2.1. Almacenamiento de sesión y autenticación</h3>
      <p>
        Utilizamos almacenamiento local del navegador (<em>local storage</em> / <em>IndexedDB</em>)
        gestionado por el proveedor de autenticación para mantener su sesión iniciada de forma
        segura y evitar que deba ingresar sus credenciales repetidamente. Estos datos son
        indispensables para el funcionamiento de la Plataforma.
      </p>

      <h3>2.2. Almacenamiento para funcionamiento sin conexión</h3>
      <p>
        La Plataforma puede guardar datos operativos de forma temporal en su dispositivo
        (a través de <em>service workers</em> e <em>IndexedDB</em>) para permitir el trabajo sin
        conexión y sincronizar la información cuando se restablece la conectividad.
      </p>

      <h3>2.3. Preferencias de la aplicación</h3>
      <p>
        Podemos almacenar pequeñas preferencias de interfaz (por ejemplo, el estado del menú
        lateral) para mejorar su experiencia de uso.
      </p>

      <h2>3. Cookies de terceros</h2>
      <p>
        La Plataforma no incorpora cookies de publicidad, analítica de marketing ni redes sociales.
        Los proveedores de infraestructura tecnológica pueden utilizar mecanismos propios
        estrictamente necesarios para la seguridad y prestación del servicio.
      </p>

      <h2>4. Gestión y eliminación</h2>
      <p>
        Puede borrar el almacenamiento local y las cookies técnicas desde la configuración de su
        navegador. Tenga en cuenta que, al hacerlo, se cerrará su sesión y se eliminarán los datos
        guardados para el modo sin conexión que aún no se hayan sincronizado.
      </p>

      <h2>5. Más información</h2>
      <p>
        Para conocer cómo tratamos sus datos personales, consulte la{' '}
        <a href="/legal/privacidad">Política de Privacidad y Tratamiento de Datos Personales</a>.
        Para dudas, escriba a <a href={`mailto:${C.operador.email}`}>{C.operador.email}</a>.
      </p>
    </LegalShell>
  );
}
