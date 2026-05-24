'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Search, Link, Trophy, Settings, Plus, Globe, Command } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const ACTIONS = [
  { id: 'add-link', label: 'إضافة رابط', shortcut: 'Ctrl+N', icon: Plus, action: 'addLink' },
  { id: 'dashboard', label: 'لوحة التحكم', shortcut: '', icon: Globe, action: 'navigate', href: '/dashboard' },
  { id: 'achievements', label: 'الإنجازات', shortcut: '', icon: Trophy, action: 'navigate', href: '/achievements' },
  { id: 'settings', label: 'الإعدادات', shortcut: '', icon: Settings, action: 'navigate', href: '/settings' },
];

export function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette, toggleAddLinkModal } = useUIStore();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  const filtered = ACTIONS.filter((a) =>
    a.label.includes(query) || a.id.includes(query)
  );

  const handleSelect = useCallback((action: typeof ACTIONS[0]) => {
    toggleCommandPalette();
    setQuery('');
    if (action.action === 'navigate' && action.href) {
      router.push(action.href);
    } else if (action.action === 'addLink') {
      toggleAddLinkModal();
    }
  }, [toggleCommandPalette, toggleAddLinkModal, router]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;
      if (e.key === 'Escape') {
        toggleCommandPalette();
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [commandPaletteOpen, toggleCommandPalette]);

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { toggleCommandPalette(); setQuery(''); }} />
      <div className="relative z-10 w-full max-w-lg animate-fade-in-scale">
        <div className="bg-[rgba(15,15,26,0.98)] backdrop-blur-2xl border border-[rgba(0,240,255,0.15)] rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 p-4 border-b border-[rgba(255,255,255,0.1)]">
            <Search className="w-5 h-5 text-[#64748b]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن إجراء..."
              className="flex-1 bg-transparent text-[#e0fcff] placeholder-[#64748b] outline-none text-lg"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-[#64748b] bg-[rgba(255,255,255,0.05)] rounded">
              <Command className="w-3 h-3" />K
            </kbd>
          </div>
          <div className="p-2 max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-center text-[#64748b] py-6 text-sm">لا توجد نتائج</p>
            )}
            {filtered.map((action) => (
              <button
                key={action.id}
                onClick={() => handleSelect(action)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                  'text-[#94a3b8] hover:bg-[rgba(0,240,255,0.1)] hover:text-[#e0fcff]'
                )}
              >
                <action.icon className="w-4 h-4" />
                <span className="flex-1 text-right">{action.label}</span>
                {action.shortcut && (
                  <kbd className="text-xs text-[#64748b] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded">
                    {action.shortcut}
                  </kbd>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
