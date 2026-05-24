'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Settings, Trophy, Globe, Briefcase, BookOpen, Tv, Monitor, Plus, LogOut, ChevronLeft } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { logOut } from '@/lib/firebase/auth';
import { isFirebaseReady } from '@/lib/firebase/config';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  Globe, Briefcase, BookOpen, Tv, Monitor, Home,
};

export function Sidebar() {
  const pathname = usePathname();
  const { activeCategory, setActiveCategory, sidebarOpen, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();
  const { categories } = useWorkspaceStore();
  const [avatarError, setAvatarError] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'الرئيسية', icon: Home },
    { href: '/achievements', label: 'الإنجازات', icon: Trophy },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
  ];

  const handleLogout = async () => {
    try { await logOut(); } catch { /* */ }
  };

  return (
    <div className="h-full bg-[#0a0a14]/95 backdrop-blur-xl border-l border-[rgba(0,240,255,0.1)] overflow-y-auto">
      <div className="p-6 border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#e0fcff] tracking-tight">
            Gate<span className="text-[#00f0ff]">Keeper</span>
          </h1>
          <button onClick={toggleSidebar} className="text-[#64748b] hover:text-[#e0fcff] transition-colors p-1 rounded-lg hover:bg-[rgba(255,255,255,0.05)]">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-[#64748b] mt-1">نظّم عالمك الرقمي</p>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              pathname === item.href
                ? 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.08)]'
                : 'text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e0fcff]'
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="px-4 py-2 border-t border-[rgba(255,255,255,0.1)]">
        <GlassCard className="p-2.5">
          <div className="flex items-center gap-2.5">
            {user?.photoURL && !avatarError ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full object-cover flex-shrink-0" onError={() => setAvatarError(true)} />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[rgba(0,240,255,0.25)] to-[rgba(0,240,255,0.08)] flex items-center justify-center text-[#00f0ff] text-sm font-bold flex-shrink-0">
                {user?.displayName?.[0]?.toUpperCase() || 'G'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#e0fcff] truncate leading-tight">{user?.displayName || 'مستخدم'}</p>
              <p className="text-xs text-[#64748b] truncate leading-tight">{user?.email}</p>
            </div>
            {isFirebaseReady && (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex-shrink-0">
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#64748b] uppercase tracking-wider">الفئات</span>
        </div>
        <div className="space-y-0.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200',
              activeCategory === 'all'
                ? 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff]'
                : 'text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)]'
            )}
          >
            <Globe className="w-4 h-4" />
            الكل
          </button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Globe;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                  activeCategory === cat.id
                    ? 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff]'
                    : 'text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)]'
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
