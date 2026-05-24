import { z } from 'zod';

export const linkSchema = z.object({
  url: z.string().url('الرابط غير صالح'),
  title: z.string().min(1, 'العنوان مطلوب').max(120, 'العنوان طويل جداً'),
  description: z.string().max(300, 'الوصف طويل جداً').optional(),
  categoryId: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'اسم الفئة مطلوب').max(40, 'الاسم طويل جداً'),
  icon: z.string().min(1, 'الأيقونة مطلوبة'),
  colorTag: z.string().min(1, 'اللون مطلوب'),
});

export const profileSchema = z.object({
  displayName: z.string().min(1, 'الاسم مطلوب').max(50, 'الاسم طويل جداً'),
});

export const progressSchema = z.object({
  title: z.string().min(1, 'العنوان مطلوب').max(80),
  currentValue: z.number().min(0, 'لا يمكن أن تكون القيمة سالبة'),
  targetValue: z.number().min(1, 'الهدف يجب أن يكون أكبر من صفر'),
  unit: z.string().min(1, 'الوحدة مطلوبة').max(20),
  categoryId: z.string().optional(),
});

export type LinkInput = z.infer<typeof linkSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ProgressInput = z.infer<typeof progressSchema>;
