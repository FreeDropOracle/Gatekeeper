'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ children, variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-[rgba(0,240,255,0.3)] focus:ring-offset-2 focus:ring-offset-[#0a0a14]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  );

  const variants = {
    primary: cn(
      'bg-[rgba(0,240,255,0.15)] text-[#00f0ff] border border-[rgba(0,240,255,0.3)]',
      'hover:bg-[rgba(0,240,255,0.25)] hover:border-[rgba(0,240,255,0.5)]',
      'active:bg-[rgba(0,240,255,0.3)]'
    ),
    secondary: cn(
      'bg-[rgba(255,255,255,0.05)] text-[#94a3b8] border border-[rgba(255,255,255,0.1)]',
      'hover:bg-[rgba(255,255,255,0.08)] hover:text-[#e0fcff] hover:border-[rgba(255,255,255,0.2)]',
      'active:bg-[rgba(255,255,255,0.1)]'
    ),
    danger: cn(
      'bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.3)]',
      'hover:bg-[rgba(239,68,68,0.25)] hover:border-[rgba(239,68,68,0.5)]',
      'active:bg-[rgba(239,68,68,0.3)]'
    ),
    ghost: cn(
      'bg-transparent text-[#94a3b8]',
      'hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e0fcff]',
      'active:bg-[rgba(255,255,255,0.08)]'
    ),
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
