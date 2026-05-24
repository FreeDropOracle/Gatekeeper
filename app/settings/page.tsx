'use client';

import { AppShell } from '@/components/layout/AppShell';
import { CategoryManager } from '@/components/settings/CategoryManager';
import { ProfileForm } from '@/components/settings/ProfileForm';
import { DangerZone } from '@/components/settings/DangerZone';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Settings as SettingsIcon, Keyboard } from 'lucide-react';
import { KEYBOARD_SHORTCUTS } from '@/lib/constants';

export default function SettingsPage() {
  const { user } = useAuthStore();
  useKeyboardShortcuts();

  if (!user) return null;

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#e0fcff] mb-2 flex items-center gap-2">
            <SettingsIcon className="w-6 h-6" /> الإعدادات
          </h1>
          <p className="text-sm text-[#94a3b8]">إدارة حسابك وفئاتك وتفضيلاتك</p>
        </header>

        <div className="space-y-6">
          <CategoryManager />
          <ProfileForm />

          <GlassCard>
            <h2 className="text-lg font-semibold text-[#e0fcff] mb-4 flex items-center gap-2">
              <Keyboard className="w-5 h-5" /> اختصارات لوحة المفاتيح
            </h2>
            <div className="space-y-2">
              {KEYBOARD_SHORTCUTS.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  <span className="text-sm text-[#94a3b8]">{s.action}</span>
                  <kbd className="text-xs text-[#00f0ff] bg-[rgba(0,240,255,0.1)] px-2.5 py-1 rounded-lg">
                    {s.keys.join(' + ')}
                  </kbd>
                </div>
              ))}
            </div>
          </GlassCard>

          <DangerZone />
        </div>
      </div>
    </AppShell>
  );
}
