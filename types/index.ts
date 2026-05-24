export interface UserPreferences {
  reducedMotion: boolean;
  defaultView: 'grid' | 'list';
  themeColor?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  preferences: UserPreferences;
  createdAt: any; // Can be Timestamp or ISO string
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  colorTag: string; // Tailwind color name like 'cyan', 'rose', etc.
  orderIndex: number;
  createdAt: any;
}

export interface LinkItem {
  id: string;
  url: string;
  title: string;
  description: string;
  categoryId: string; // 'all' or empty means uncategorized
  favicon: string;
  createdAt: any;
  clickCount: number;
}

export interface ProgressTracker {
  id: string;
  title: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  categoryId?: string;
  updatedAt: any;
}

export interface Achievement {
  id: string;
  badgeId: string;
  unlockedAt: any;
  progressSnapshot?: Record<string, any>;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  conditionType: 'links' | 'clicks' | 'streak' | 'categories';
  targetValue: number;
}

export interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
