'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2" role="alert" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl min-w-[300px] max-w-[420px]',
            'bg-[rgba(10,10,20,0.95)] backdrop-blur-xl border',
            'animate-fade-in shadow-lg',
            toast.type === 'success' && 'border-[rgba(16,185,129,0.3)]',
            toast.type === 'error' && 'border-[rgba(239,68,68,0.3)]',
            toast.type === 'info' && 'border-[rgba(0,240,255,0.3)]'
          )}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#00f0ff] flex-shrink-0" />}
          <span className="text-sm text-[#e0fcff] flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-[#64748b] hover:text-[#e0fcff] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
