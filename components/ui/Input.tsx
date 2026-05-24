'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full px-3 py-2.5 text-sm rounded-lg',
          'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)]',
          'text-[#e0fcff] placeholder-[#64748b]',
          'focus:outline-none focus:border-[rgba(0,240,255,0.5)] focus:ring-1 focus:ring-[rgba(0,240,255,0.3)]',
          'transition-colors duration-200',
          error && 'border-[rgba(239,68,68,0.5)] focus:border-[rgba(239,68,68,0.8)] focus:ring-[rgba(239,68,68,0.3)]',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[#ef4444]">{error}</p>}
    </div>
  );
});
