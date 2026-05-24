import { create } from 'zustand';
import { ToastMessage } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  addLinkModalOpen: boolean;
  activeCategory: string;
  toasts: ToastMessage[];
  reducedMotion: boolean;
  viewMode: 'grid' | 'list';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  toggleAddLinkModal: () => void;
  setActiveCategory: (id: string) => void;
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  setReducedMotion: (val: boolean) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  commandPaletteOpen: false,
  addLinkModalOpen: false,
  activeCategory: 'all',
  toasts: [],
  reducedMotion: false,
  viewMode: 'grid',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleCommandPalette: () =>
    set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  toggleAddLinkModal: () =>
    set((s) => ({ addLinkModalOpen: !s.addLinkModalOpen })),
  setActiveCategory: (id) => set({ activeCategory: id }),
  addToast: (message, type) =>
    set((s) => ({
      toasts: [...s.toasts, { id: crypto.randomUUID(), message, type }],
    })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  setReducedMotion: (val) => set({ reducedMotion: val }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
