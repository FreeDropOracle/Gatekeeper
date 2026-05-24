'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { SmartLinkGrid } from '@/components/dashboard/SmartLinkGrid';
import { QuickAddFAB } from '@/components/dashboard/QuickAddFAB';
import { CryptoTicker } from '@/components/dashboard/CryptoTicker';
import { ProgressWidget } from '@/components/dashboard/ProgressWidget';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { fetchLinks, fetchCategories, fetchProgress, deleteLink, updateLink } from '@/lib/firebase/firestore';
import { isFirebaseReady } from '@/lib/firebase/config';
import type { CryptoPrice, LinkItem } from '@/types';
import { Loader2, Grid, List, Zap, Trophy, Link2, TrendingUp, Save, Search, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { activeCategory, viewMode, setViewMode, addToast } = useUIStore();
  const { links, categories, progress, setLinks, setCategories, setProgress, removeLink, updateLink: updateLocal } = useWorkspaceStore();
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [cryptoLoading, setCryptoLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [deletingLink, setDeletingLink] = useState<LinkItem | null>(null);

  // Edit link state
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    if (!user || !isFirebaseReady) {
      setDataLoading(false);
      return;
    }
    Promise.all([
      fetchLinks(user.uid),
      fetchCategories(user.uid),
      fetchProgress(user.uid),
    ])
      .then(([l, c, p]) => { setLinks(l); setCategories(c); setProgress(p); })
      .catch(console.error)
      .finally(() => setDataLoading(false));
  }, [user, setLinks, setCategories, setProgress]);

  useEffect(() => {
    fetch('/api/crypto')
      .then((r) => r.json())
      .then((d) => setCryptoPrices(d.prices || []))
      .catch(() => {})
      .finally(() => setCryptoLoading(false));
  }, []);

  const totalClicks = links.reduce((s, l) => s + l.clickCount, 0);

  const filteredLinks = links.filter((l) => {
    if (activeCategory !== 'all' && l.categoryId !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!l.title.toLowerCase().includes(q) && !(l.description || '').toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleDelete = (link: LinkItem) => {
    setDeletingLink(link);
  };

  const confirmDelete = async () => {
    if (!deletingLink) return;
    removeLink(deletingLink.id);
    addToast('تم حذف الرابط', 'info');
    if (isFirebaseReady && user) {
      try { await deleteLink(user.uid, deletingLink.id); } catch { addToast('فشل حذف الرابط', 'error'); }
    }
    setDeletingLink(null);
  };

  const handleEdit = (link: LinkItem) => {
    setEditingLink(link);
    setEditTitle(link.title);
    setEditDescription(link.description || '');
    setEditCategoryId(link.categoryId || '');
  };

  const handleSaveEdit = async () => {
    if (!editingLink) return;
    setSavingEdit(true);
    try {
      const updates = { title: editTitle, description: editDescription, categoryId: editCategoryId };
      updateLocal(editingLink.id, updates);
      if (isFirebaseReady && user) {
        await updateLink(user.uid, editingLink.id, updates);
      }
      addToast('تم تعديل الرابط', 'success');
      setEditingLink(null);
    } catch {
      addToast('فشل تعديل الرابط', 'error');
    } finally {
      setSavingEdit(false);
    }
  };

  const stats = [
    { icon: Link2, label: 'إجمالي الروابط', value: links.length.toString(), color: '#00f0ff' },
    { icon: TrendingUp, label: 'إجمالي النقرات', value: totalClicks.toString(), color: '#10b981' },
    { icon: Trophy, label: 'الفئات', value: categories.length.toString(), color: '#f59e0b' },
    { icon: Zap, label: 'التقدم', value: progress.length.toString(), color: '#8b5cf6' },
  ];

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#e0fcff]">لوحة التحكم</h1>
            <p className="text-sm text-[#94a3b8] mt-1">
              {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="relative flex-1 max-w-md mx-auto w-full sm:w-auto">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في روابطك..."
              className="w-full px-4 py-2 pr-10 text-sm rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#e0fcff] placeholder:text-[#64748b] focus:outline-none focus:border-[rgba(0,240,255,0.5)] transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === 'grid' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('grid')} aria-label="عرض شبكي">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'primary' : 'secondary'} size="sm" onClick={() => setViewMode('list')} aria-label="عرض قائمة">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#e0fcff]">{stat.value}</div>
                <div className="text-xs text-[#64748b]">{stat.label}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mb-6">
          <CryptoTicker prices={cryptoPrices} loading={cryptoLoading} />
        </div>

        {progress.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {progress.slice(0, 3).map((p) => (
              <ProgressWidget key={p.id} progress={p} />
            ))}
          </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#e0fcff]">
              {activeCategory === 'all' ? 'كل الروابط' : categories.find((c) => c.id === activeCategory)?.name || 'كل الروابط'}
            </h2>
            <span className="text-sm text-[#64748b]">{filteredLinks.length} رابط</span>
          </div>

          <SmartLinkGrid
            links={filteredLinks}
            categories={categories}
            loading={dataLoading}
            onEditLink={handleEdit}
            onDeleteLink={handleDelete}
          />
        </section>
      </div>

      {/* Edit Link Modal */}
      <Modal isOpen={!!editingLink} onClose={() => setEditingLink(null)} title="تعديل الرابط" size="md">
        <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
          <Input label="العنوان" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
          <Input label="الوصف" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">الفئة</label>
            <select value={editCategoryId} onChange={(e) => setEditCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#e0fcff] focus:outline-none focus:border-[rgba(0,240,255,0.5)]">
              <option value="">بدون فئة</option>
              {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={savingEdit} className="flex-1">
              {savingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              حفظ التعديلات
            </Button>
            <Button type="button" variant="secondary" onClick={() => setEditingLink(null)}>إلغاء</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deletingLink} onClose={() => setDeletingLink(null)} title="تأكيد الحذف" size="sm">
        <div className="text-center py-4">
          <AlertTriangle className="w-12 h-12 text-[#ef4444] mx-auto mb-4" />
          <p className="text-[#e0fcff] font-medium mb-2">هل أنت متأكد من حذف الرابط؟</p>
          <p className="text-sm text-[#94a3b8]">
            {deletingLink?.title}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={confirmDelete} className="flex-1 bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.25)]">
            نعم، احذف
          </Button>
          <Button variant="secondary" onClick={() => setDeletingLink(null)} className="flex-1">
            لا
          </Button>
        </div>
      </Modal>

      <QuickAddFAB />
    </AppShell>
  );
}
