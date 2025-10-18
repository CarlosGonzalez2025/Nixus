import { cn } from '@/lib/utils';
import Image from 'next/image';

// Asumiendo que tienes un logo de Italcol en tu carpeta public
const italcolLogoUrl = '/logo-italcol.png'; // <- Debes agregar el logo aqui

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="mb-4">
        {/* Usamos el componente Image de Next.js para optimización */}
        <Image 
          src={italcolLogoUrl} 
          alt="Logo Italcol" 
          width={180} // Ajusta el tamaño según sea necesario
          height={60} // Ajusta el tamaño según sea necesario
          priority // Carga la imagen con prioridad ya que es LCP
        />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Sistema de Gestión de Permisos de Trabajo
      </p>
    </div>
  );
}
