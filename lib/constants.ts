import { Badge } from '@/types';

export const SYSTEM_BADGES: Badge[] = [
  {
    id: 'first_link',
    title: 'الخطوة الأولى',
    description: 'أضف رابطك الأول في المنصة بنجاح.',
    icon: 'Link',
    conditionType: 'links',
    targetValue: 1,
  },
  {
    id: 'link_collector',
    title: 'جامع الروابط',
    description: 'أضف 10 روابط لتنظيم مكتبتك الرقمية.',
    icon: 'Library',
    conditionType: 'links',
    targetValue: 10,
  },
  {
    id: 'digital_master',
    title: 'الماستر الرقمي',
    description: 'أضف 50 رابطاً ونظّم معرفتك بالكامل.',
    icon: 'Database',
    conditionType: 'links',
    targetValue: 50,
  },
  {
    id: 'streak_novice',
    title: 'ملتزم مبتدئ',
    description: 'حافظ على استمرارية استخدام لمدة 3 أيام متتالية.',
    icon: 'Zap',
    conditionType: 'streak',
    targetValue: 3,
  },
  {
    id: 'streak_master',
    title: 'سيد الالتزام',
    description: 'حافظ على استمرارية استخدام لمدة 7 أيام متتالية.',
    icon: 'Flame',
    conditionType: 'streak',
    targetValue: 7,
  },
  {
    id: 'category_builder',
    title: 'مهندس التصنيف',
    description: 'أنشئ 5 فئات مخصصة لتنظيم عالمك الرقمي.',
    icon: 'FolderPlus',
    conditionType: 'categories',
    targetValue: 5,
  },
  {
    id: 'click_enthusiast',
    title: 'المتفاعل النشط',
    description: 'اضغط على روابطك المخزنة 20 مرة.',
    icon: 'MousePointer',
    conditionType: 'clicks',
    targetValue: 20,
  },
];

export const DEFAULT_CATEGORIES = [
  { name: 'عام', icon: 'Globe', colorTag: 'cyan', orderIndex: 0 },
  { name: 'عمل', icon: 'Briefcase', colorTag: 'indigo', orderIndex: 1 },
  { name: 'تعليم', icon: 'BookOpen', colorTag: 'emerald', orderIndex: 2 },
  { name: 'ترفيه', icon: 'Tv', colorTag: 'rose', orderIndex: 3 },
];

export const KEYBOARD_SHORTCUTS = [
  { keys: ['Ctrl', 'K'], action: 'البحث الشامل / لوحة التحكم' },
  { keys: ['Ctrl', 'N'], action: 'إضافة رابط سريع جديد' },
  { keys: ['Ctrl', 'B'], action: 'إظهار/إخفاء القائمة الجانبية' },
  { keys: ['Esc'], action: 'إغلاق النوافذ / إلغاء التحديد' },
];
