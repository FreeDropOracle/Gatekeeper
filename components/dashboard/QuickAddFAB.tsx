'use client';

import { useState, useCallback } from 'react';
import { Plus, Loader2, Link2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { createLink } from '@/lib/firebase/firestore';
import { sanitizeUrl, getFaviconFromUrl, generateId } from '@/lib/utils';
import { isFirebaseReady } from '@/lib/firebase/config';
import type { LinkItem } from '@/types';

export function QuickAddFAB() {
  const { addLinkModalOpen, toggleAddLinkModal, addToast } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const { categories, addLink } = useWorkspaceStore();

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingMeta, setFetchingMeta] = useState(false);
  const [error, setError] = useState('');

  const autoFetchTitle = useCallback(async (urlStr: string) => {
    if (!urlStr || !/^https?:\/\//.test(urlStr)) return;
    setFetchingMeta(true);
    try {
      const res = await fetch(`/api/links/metadata?url=${encodeURIComponent(urlStr)}`);
      const data = await res.json();
      if (data.title && !title) setTitle(data.title);
      if (data.description && !description) setDescription(data.description);
    } catch {
      // ignore
    } finally {
      setFetchingMeta(false);
    }
  }, [title, description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const sanitizedUrl = sanitizeUrl(url);

      if (isFirebaseReady && user) {
        await createLink(user.uid, {
          url: sanitizedUrl,
          title: title || sanitizedUrl,
          description,
          categoryId,
          favicon: getFaviconFromUrl(sanitizedUrl),
        });
      }

      // Optimistic add for both Firebase and demo
      const newLink: LinkItem = {
        id: generateId(),
        url: sanitizedUrl,
        title: title || sanitizedUrl,
        description,
        categoryId,
        favicon: getFaviconFromUrl(sanitizedUrl),
        createdAt: Date.now(),
        clickCount: 0,
      };
      addLink(newLink);
      addToast('تمت إضافة الرابط بنجاح', 'success');

      setUrl(''); setTitle(''); setDescription(''); setCategoryId('');
      toggleAddLinkModal();
    } catch {
      setError('فشل إضافة الرابط. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleAddLinkModal}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.3)] text-[#00f0ff] hover:bg-[rgba(0,240,255,0.25)] hover:border-[rgba(0,240,255,0.5)] transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-[rgba(0,240,255,0.2)] hover:scale-105 active:scale-95"
        aria-label="إضافة رابط جديد"
      >
        <Plus className="w-6 h-6" />
      </button>

      <Modal isOpen={addLinkModalOpen} onClose={() => { toggleAddLinkModal(); setError(''); }} title="إضافة رابط جديد" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              label="الرابط"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => autoFetchTitle(url)}
              required
              autoFocus
              dir="ltr"
            />
            {fetchingMeta && (
              <div className="absolute left-3 top-[38px]">
                <Loader2 className="w-4 h-4 text-[#00f0ff] animate-spin" />
              </div>
            )}
          </div>

          <Input
            label="العنوان"
            placeholder="عنوان الرابط (يُجلب تلقائياً)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            label="الوصف"
            placeholder="وصف قصير للرابط"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">الفئة</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#e0fcff] focus:outline-none focus:border-[rgba(0,240,255,0.5)] transition-colors"
            >
              <option value="">بدون فئة</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-[#ef4444] flex items-center gap-2">⚠ {error}</p>}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading || !url} className="flex-1">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
              إضافة
            </Button>
            <Button type="button" variant="secondary" onClick={() => { toggleAddLinkModal(); setError(''); }}>
              إلغاء
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
