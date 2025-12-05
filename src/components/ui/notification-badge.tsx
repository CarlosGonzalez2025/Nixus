import React from 'react';
import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  className?: string;
  max?: number;
}

export function NotificationBadge({ 
  count, 
  className,
  max = 99 
}: NotificationBadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span 
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2",
        "flex h-5 min-w-[20px] items-center justify-center",
        "rounded-full bg-red-500 px-1.5",
        "text-[10px] font-bold text-white",
        "shadow-sm ring-2 ring-background",
        "animate-pulse",
        className
      )}
    >
      {displayCount}
    </span>
  );
}
