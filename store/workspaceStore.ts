import { create } from 'zustand';
import { Category, LinkItem, ProgressTracker, Achievement } from '@/types';

interface WorkspaceState {
  categories: Category[];
  links: LinkItem[];
  progress: ProgressTracker[];
  achievements: Achievement[];
  loading: {
    categories: boolean;
    links: boolean;
    progress: boolean;
    achievements: boolean;
  };
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  removeCategory: (id: string) => void;
  setLinks: (links: LinkItem[]) => void;
  addLink: (link: LinkItem) => void;
  updateLink: (id: string, data: Partial<LinkItem>) => void;
  removeLink: (id: string) => void;
  incrementLinkClick: (id: string) => void;
  setProgress: (progress: ProgressTracker[]) => void;
  addProgress: (p: ProgressTracker) => void;
  updateProgressItem: (id: string, data: Partial<ProgressTracker>) => void;
  removeProgress: (id: string) => void;
  setAchievements: (achievements: Achievement[]) => void;
  addAchievement: (a: Achievement) => void;
  setLoading: (key: keyof WorkspaceState['loading'], val: boolean) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  categories: [],
  links: [],
  progress: [],
  achievements: [],
  loading: {
    categories: true,
    links: true,
    progress: true,
    achievements: true,
  },
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((s) => ({ categories: [...s.categories, category] })),
  updateCategory: (id, data) =>
    set((s) => ({
      categories: s.categories.map((c) => (c.id === id ? { ...c, ...data } : c)),
    })),
  removeCategory: (id) =>
    set((s) => ({
      categories: s.categories.filter((c) => c.id !== id),
    })),
  setLinks: (links) => set({ links }),
  addLink: (link) => set((s) => ({ links: [link, ...s.links] })),
  updateLink: (id, data) =>
    set((s) => ({
      links: s.links.map((l) => (l.id === id ? { ...l, ...data } : l)),
    })),
  removeLink: (id) =>
    set((s) => ({ links: s.links.filter((l) => l.id !== id) })),
  incrementLinkClick: (id) =>
    set((s) => ({
      links: s.links.map((l) =>
        l.id === id ? { ...l, clickCount: l.clickCount + 1 } : l
      ),
    })),
  setProgress: (progress) => set({ progress }),
  addProgress: (p) => set((s) => ({ progress: [...s.progress, p] })),
  updateProgressItem: (id, data) =>
    set((s) => ({
      progress: s.progress.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),
  removeProgress: (id) =>
    set((s) => ({ progress: s.progress.filter((p) => p.id !== id) })),
  setAchievements: (achievements) => set({ achievements }),
  addAchievement: (a) =>
    set((s) => ({ achievements: [...s.achievements, a] })),
  setLoading: (key, val) =>
    set((s) => ({ loading: { ...s.loading, [key]: val } })),
}));
