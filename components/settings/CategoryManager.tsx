'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { useAuthStore } from '@/store/authStore';
import { isFirebaseReady } from '@/lib/firebase/config';
import { createCategory, updateCategory, deleteCategory } from '@/lib/firebase/firestore';
import { generateId } from '@/lib/utils';
import type { Category } from '@/types';
import { Plus, Trash2, Edit2, Check, X, Globe, Briefcase, BookOpen, Tv, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = [
  { name: 'Globe', icon: Globe }, { name: 'Briefcase', icon: Briefcase },
  { name: 'BookOpen', icon: BookOpen }, { name: 'Tv', icon: Tv }, { name: 'Monitor', icon: Monitor },
];

const COLORS = ['cyan', 'indigo', 'emerald', 'rose', 'violet', 'amber', 'sky', 'lime'];

const colorMap: Record<string, string> = {
  cyan: '#00f0ff', indigo: '#818cf8', emerald: '#34d399',
  rose: '#fb7185', violet: '#a78bfa', amber: '#fbbf24',
  sky: '#38bdf8', lime: '#a3e635',
};

export function CategoryManager() {
  const { user } = useAuthStore();
  const { categories, addCategory, updateCategory: updateLocal, removeCategory } = useWorkspaceStore();
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('Globe');
  const [newColor, setNewColor] = useState('cyan');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const cat = { name: newName.trim(), icon: newIcon, colorTag: newColor, orderIndex: categories.length };
    if (isFirebaseReady && user) {
      const created = await createCategory(user.uid, cat);
      addCategory(created);
    } else {
      addCategory({ id: generateId(), ...cat, createdAt: Date.now() });
    }
    setNewName('');
  };

  const handleEdit = async (cat: Category) => {
    if (!editName.trim()) return;
    if (isFirebaseReady && user) {
      await updateCategory(user.uid, cat.id, { name: editName.trim() });
    }
    updateLocal(cat.id, { name: editName.trim() });
    setEditingId(null);
  };

  const handleDelete = async (cat: Category) => {
    if (isFirebaseReady && user) {
      await deleteCategory(user.uid, cat.id);
    }
    removeCategory(cat.id);
  };

  return (
    <GlassCard>
      <h2 className="text-lg font-semibold text-[#e0fcff] mb-4">إدارة الفئات</h2>

      <div className="flex gap-2 mb-4">
        <div className="flex gap-1">
          {ICONS.map((ic) => (
            <button key={ic.name} onClick={() => setNewIcon(ic.name)}
              className={cn('p-2 rounded-lg transition-colors', newIcon === ic.name ? 'bg-[rgba(0,240,255,0.2)] text-[#00f0ff]' : 'bg-[rgba(255,255,255,0.05)] text-[#64748b] hover:text-[#e0fcff]')}>
              <ic.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {COLORS.slice(0, 4).map((c) => (
            <button key={c} onClick={() => setNewColor(c)}
              className={cn('w-6 h-6 rounded-full transition-transform', newColor === c && 'scale-125 ring-2 ring-[#00f0ff]')}
              style={{ backgroundColor: colorMap[c] }} />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input value={newName} onChange={(e) => setNewName(e.target.value)}
          placeholder="اسم الفئة الجديدة" onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }} />
        <Button onClick={handleAdd} disabled={!newName.trim()} size="sm"><Plus className="w-4 h-4" /></Button>
      </div>

      <div className="mt-4 space-y-2">
        {categories.map((cat) => {
          const Icon = ICONS.find((i) => i.name === cat.icon)?.icon || Globe;
          return (
            <div key={cat.id} className="flex items-center gap-3 p-2 rounded-lg bg-[rgba(255,255,255,0.02)] group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colorMap[cat.colorTag] || colorMap.cyan}20` }}>
                <Icon className="w-4 h-4" style={{ color: colorMap[cat.colorTag] || colorMap.cyan }} />
              </div>
              {editingId === cat.id ? (
                <div className="flex-1 flex gap-2">
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleEdit(cat); if (e.key === 'Escape') setEditingId(null); }} />
                  <Button size="sm" onClick={() => handleEdit(cat)}><Check className="w-3 h-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="w-3 h-3" /></Button>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-sm text-[#e0fcff]">{cat.name}</span>
                  <button onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#64748b] hover:text-[#e0fcff] transition-all">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(cat)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#64748b] hover:text-[#ef4444] transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
