import { cn } from '@/lib/utils';
import Image from 'next/image';

// Asumiendo que tienes un logo de Italcol en tu carpeta public
const italcolLogoUrl = '/logo-italcol.png'; // <- Debes agregar el logo aqui

export function Logo({ className, textOnly = false }: { className?: string, textOnly?: boolean }) {

  if (textOnly) {
     return (
        <div className={cn('flex flex-col items-start', className)}>
            <h2 className="text-2xl font-bold text-gray-800">SGPT</h2>
            <p className="text-xs text-gray-600">
                Sistema de Gestión de Permisos de Trabajo
            </p>
        </div>
     );
  }
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="mb-2">
        {/* Usamos el componente Image de Next.js para optimización */}
        <Image 
          src={italcolLogoUrl} 
          alt="Logo Italcol" 
          width={120} // Ajusta el tamaño según sea necesario
          height={40} // Ajusta el tamaño según sea necesario
          priority // Carga la imagen con prioridad ya que es LCP
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">SGPT</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Sistema de Gestión de Permisos de Trabajo
      </p>
    </div>
  );
}
