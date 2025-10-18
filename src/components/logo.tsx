import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

export function Logo({
  className,
  textOnly = false,
}: {
  className?: string;
  textOnly?: boolean;
}) {
  if (textOnly) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="bg-primary rounded-full p-2">
          <Shield className="text-white" size={24} />
        </div>
        <span className="text-2xl font-bold text-primary">SGPT Móvil</span>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
       <div className="flex items-center gap-3 text-primary mb-4">
            <div className="bg-primary rounded-full p-3">
                <Shield className="text-white" size={32} />
            </div>
            <span className="text-3xl font-bold">SGPT Móvil</span>
        </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Sistema de Gestión de Permisos de Trabajo
      </p>
    </div>
  );
}
