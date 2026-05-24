'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  active?: boolean;
}

export function GlassCard({ children, hover = false, active = false, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-4',
        'bg-[rgba(255,255,255,0.02)] backdrop-blur-xl',
        'border border-[rgba(0,240,255,0.1)]',
        'transition-all duration-200 ease-out',
        hover && 'hover:border-[rgba(0,240,255,0.2)] hover:bg-[rgba(255,255,255,0.04)]',
        active && 'border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.05)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
