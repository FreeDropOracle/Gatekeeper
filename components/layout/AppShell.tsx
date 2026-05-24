'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { ChevronRight } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/store/uiStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { cn } from '@/lib/utils';

const ToastContainer = dynamic(
  () => import('@/components/shared/Toast').then((m) => m.ToastContainer),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import('@/components/shared/CommandPalette').then((m) => m.CommandPalette),
  { ssr: false }
);

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  useKeyboardShortcuts();
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgba(0,240,255,0.03)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[rgba(0,240,255,0.02)] rounded-full blur-3xl" />
      </div>

      <div className="relative flex">
        <aside
          className={cn(
            'fixed right-0 top-0 h-screen transition-all duration-300 ease-out z-40',
            sidebarOpen ? 'w-64 translate-x-0' : 'w-0 translate-x-full'
          )}
        >
          <Sidebar />
        </aside>

        <main
          className={cn(
            'flex-1 min-h-screen transition-all duration-300 ease-out max-w-full overflow-x-hidden',
            sidebarOpen ? 'mr-64' : 'mr-0'
          )}
        >
          {children}
        </main>
      </div>

      {/* Floating sidebar toggle button */}
      <button
        onClick={() => useUIStore.getState().toggleSidebar()}
        className={cn(
          'fixed right-0 top-20 z-50 flex items-center justify-center w-6 h-12 rounded-l-lg transition-all duration-300',
          sidebarOpen ? 'translate-x-0 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100',
          'bg-[rgba(0,240,255,0.1)] border border-r-0 border-[rgba(0,240,255,0.2)] text-[#00f0ff] hover:bg-[rgba(0,240,255,0.2)] hover:border-[rgba(0,240,255,0.3)]'
        )}
        aria-label="إظهار القائمة الجانبية"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <ToastContainer />
      <CommandPalette />
    </div>
  );
}
