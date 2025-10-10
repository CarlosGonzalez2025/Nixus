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
      <div className="flex justify-center mb-4">
        <svg viewBox="0 0 200 100" className="w-48 h-32">
          <defs>
            <linearGradient
              id="italcolGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: '#FFD400' }} />
              <stop offset="50%" style={{ stopColor: '#F47920' }} />
              <stop offset="100%" style={{ stopColor: '#E86610' }} />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="50" rx="55" ry="40" fill="#FFD400" opacity="0.8" />
          <ellipse cx="100" cy="50" rx="50" ry="45" fill="#F47920" opacity="0.9" />
          <ellipse cx="140" cy="50" rx="45" ry="38" fill="#E86610" opacity="0.8" />
          <text
            x="100"
            y="60"
            fontFamily="Arial, sans-serif"
            fontSize="32"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
          >
            italcol
          </text>
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        SGPT
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Sistema de Gestión de
      </p>
      <p className="text-gray-600 dark:text-gray-400">Permisos de Trabajo</p>
    </div>
  );
}
