'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { isFirebaseReady } from '@/lib/firebase/config';
import { User, Save, Moon, Sun } from 'lucide-react';

export function ProfileForm() {
  const { user, profile, setProfile } = useAuthStore();
  const { reducedMotion, setReducedMotion, viewMode, setViewMode } = useUIStore();
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setDisplayName(profile.displayName || '');
  }, [profile]);

  const handleSave = async () => {
    if (!user || !isFirebaseReady) return;
    setSaving(true);
    try {
      const userRef = doc(db!, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        preferences: { ...profile?.preferences, reducedMotion, defaultView: viewMode },
      });
      setProfile({ ...profile, displayName, preferences: { ...profile?.preferences, reducedMotion, defaultView: viewMode } } as any);
    } catch { /* */ } finally { setSaving(false); }
  };

  return (
    <GlassCard>
      <h2 className="text-lg font-semibold text-[#e0fcff] mb-4 flex items-center gap-2">
        <User className="w-5 h-5" /> الملف الشخصي
      </h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" className="w-14 h-14 rounded-full object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[rgba(0,240,255,0.2)] flex items-center justify-center text-[#00f0ff] text-xl font-medium">
              {displayName[0]?.toUpperCase() || '?'}
            </div>
          )}
          <Input label="الاسم" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>

        <label className="flex items-center justify-between">
          <span className="text-sm text-[#94a3b8]"><Moon className="w-4 h-4 inline ml-1" />تقليل الحركة</span>
          <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)}
            className="w-4 h-4 rounded border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-[#00f0ff]" />
        </label>

        <label className="flex items-center justify-between">
          <span className="text-sm text-[#94a3b8]"><Sun className="w-4 h-4 inline ml-1" />وضع العرض</span>
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value as 'grid' | 'list')}
            className="px-3 py-1.5 text-sm rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#e0fcff] focus:outline-none">
            <option value="grid">شبكة</option><option value="list">قائمة</option>
          </select>
        </label>

        {isFirebaseReady && (
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4" />{saving ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
