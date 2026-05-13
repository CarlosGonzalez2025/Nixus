'use client';

import { Construction, HardHat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  ringColor: string;
  iconBg: string;
  iconColor: string;
}

export function ComingSoonPage({
  title,
  description,
  icon: Icon,
  gradient,
  ringColor,
  iconBg,
  iconColor,
}: ComingSoonPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 bg-gray-50/50">
      <div className="max-w-md w-full text-center space-y-7">

        {/* Icono principal con badge de construcción */}
        <div className="flex justify-center">
          <div className="relative inline-block">
            <div className={`h-28 w-28 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl ${ringColor} ring-4 ring-offset-2`}>
              <Icon className="h-14 w-14 text-white drop-shadow" />
            </div>
            <div className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-lg">
              <Construction className="h-4 w-4 text-amber-900" />
            </div>
          </div>
        </div>

        {/* Badge estado */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Módulo en Construcción
          </span>
        </div>

        {/* Título y descripción */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
          <p className="text-gray-500 text-base leading-relaxed">{description}</p>
        </div>

        {/* Card informativa */}
        <Card className="border border-gray-100 shadow-md bg-white text-left">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                <HardHat className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Próximamente disponible</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Estamos trabajando en este módulo para ofrecerte la mejor experiencia de gestión SST.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
