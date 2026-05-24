'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { logOut } from '@/lib/firebase/auth';
import { isFirebaseReady } from '@/lib/firebase/config';
import { Trash2, Download, LogOut } from 'lucide-react';

export function DangerZone() {
  const { user } = useAuthStore();
  const { links, categories, progress, achievements } = useWorkspaceStore();

  const handleExport = () => {
    const data = { links, categories, progress, achievements, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `gatekeeper-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (!confirm('هل أنت متأكد؟ هذا الإجراء لا يمكن التراجع عنه.')) return;
    console.log('Account deletion - TODO');
  };

  return (
    <GlassCard className="border-[rgba(239,68,68,0.3)]">
      <h2 className="text-lg font-semibold text-[#ef4444] mb-4 flex items-center gap-2">
        <Trash2 className="w-5 h-5" /> منطقة الخطر
      </h2>

      <div className="space-y-3">
        <Button variant="secondary" onClick={handleExport} className="w-full justify-start">
          <Download className="w-4 h-4" /> تصدير البيانات (JSON)
        </Button>

        {isFirebaseReady && (
          <>
            <Button variant="danger" onClick={handleDelete} className="w-full justify-start">
              <Trash2 className="w-4 h-4" /> حذف الحساب
            </Button>
            <div className="pt-3 border-t border-[rgba(239,68,68,0.3)]">
              <Button variant="secondary" onClick={() => logOut().catch(() => {})} className="w-full justify-start">
                <LogOut className="w-4 h-4" /> تسجيل الخروج
              </Button>
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
}
