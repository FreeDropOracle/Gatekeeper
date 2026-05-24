import { Category, LinkItem, ProgressTracker, Achievement } from '@/types';

export const DEMO_USER = {
  uid: 'demo-user',
  displayName: 'مستخدم تجريبي',
  email: 'demo@gatekeeper.app',
  photoURL: '',
  preferences: { reducedMotion: false, defaultView: 'grid' as const },
  createdAt: new Date().toISOString(),
};

export const DEMO_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'عام', icon: 'Globe', colorTag: 'cyan', orderIndex: 0, createdAt: Date.now() },
  { id: 'cat-2', name: 'عمل', icon: 'Briefcase', colorTag: 'indigo', orderIndex: 1, createdAt: Date.now() },
  { id: 'cat-3', name: 'تعليم', icon: 'BookOpen', colorTag: 'emerald', orderIndex: 2, createdAt: Date.now() },
  { id: 'cat-4', name: 'ترفيه', icon: 'Tv', colorTag: 'rose', orderIndex: 3, createdAt: Date.now() },
  { id: 'cat-5', name: 'تقنية', icon: 'Monitor', colorTag: 'violet', orderIndex: 4, createdAt: Date.now() },
];

export const DEMO_LINKS: LinkItem[] = [
  { id: 'link-1', url: 'https://nextjs.org/docs', title: 'Next.js Documentation', description: 'The official Next.js documentation covering all features.', categoryId: 'cat-3', favicon: 'https://www.google.com/s2/favicons?domain=nextjs.org&sz=64', createdAt: Date.now() - 86400000, clickCount: 5 },
  { id: 'link-2', url: 'https://github.com', title: 'GitHub', description: 'Where the world builds software.', categoryId: 'cat-2', favicon: 'https://www.google.com/s2/favicons?domain=github.com&sz=64', createdAt: Date.now() - 172800000, clickCount: 12 },
  { id: 'link-3', url: 'https://tailwindcss.com', title: 'Tailwind CSS', description: 'Utility-first CSS framework.', categoryId: 'cat-3', favicon: 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=64', createdAt: Date.now() - 259200000, clickCount: 3 },
  { id: 'link-4', url: 'https://youtube.com', title: 'YouTube', description: 'Enjoy videos and music you love.', categoryId: 'cat-4', favicon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64', createdAt: Date.now() - 345600000, clickCount: 8 },
  { id: 'link-5', url: 'https://vercel.com', title: 'Vercel', description: 'Deploy your frontend projects.', categoryId: 'cat-2', favicon: 'https://www.google.com/s2/favicons?domain=vercel.com&sz=64', createdAt: Date.now() - 432000000, clickCount: 2 },
  { id: 'link-6', url: 'https://react.dev', title: 'React Documentation', description: 'The library for web and native user interfaces.', categoryId: 'cat-3', favicon: 'https://www.google.com/s2/favicons?domain=react.dev&sz=64', createdAt: Date.now() - 518400000, clickCount: 7 },
  { id: 'link-7', url: 'https://news.ycombinator.com', title: 'Hacker News', description: 'Social news for tech enthusiasts.', categoryId: 'cat-1', favicon: 'https://www.google.com/s2/favicons?domain=news.ycombinator.com&sz=64', createdAt: Date.now() - 604800000, clickCount: 4 },
  { id: 'link-8', url: 'https://figma.com', title: 'Figma', description: 'Collaborative interface design tool.', categoryId: 'cat-2', favicon: 'https://www.google.com/s2/favicons?domain=figma.com&sz=64', createdAt: Date.now() - 691200000, clickCount: 1 },
];

export const DEMO_PROGRESS: ProgressTracker[] = [
  { id: 'prog-1', title: 'قراءة المقالات', currentValue: 12, targetValue: 20, unit: 'مقال', categoryId: 'cat-3', updatedAt: Date.now() },
  { id: 'prog-2', title: 'مشاريع مكتملة', currentValue: 3, targetValue: 5, unit: 'مشروع', categoryId: 'cat-2', updatedAt: Date.now() },
  { id: 'prog-3', title: 'ساعات التعلم', currentValue: 24, targetValue: 40, unit: 'ساعة', categoryId: 'cat-3', updatedAt: Date.now() },
];

export const DEMO_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1', badgeId: 'first_link', unlockedAt: Date.now() - 604800000 },
  { id: 'ach-2', badgeId: 'streak_novice', unlockedAt: Date.now() - 259200000 },
  { id: 'ach-3', badgeId: 'category_builder', unlockedAt: Date.now() - 432000000 },
];
