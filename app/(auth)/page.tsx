'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/store/authStore';
import { signInWithGoogle } from '@/lib/firebase/auth';

const features = [
  {
    icon: Zap,
    title: 'سرعة فائقة',
    description: 'إضافة الروابط في أقل من 3 ثوانٍ',
  },
  {
    icon: Shield,
    title: 'أمان تام',
    description: 'مصادقة Firebase وتشفير كامل',
  },
  {
    icon: BarChart3,
    title: 'تتبع التقدم',
    description: 'إحصائيات ولوحات تقدم تفاعلية',
  },
];

export default function AuthPage() {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] flex">
      {/* Left side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(0,240,255,0.05)] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(0,240,255,0.03)] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold text-[#e0fcff] mb-4">
            Gate<span className="text-[#00f0ff]">Keeper</span>
          </h1>
          <p className="text-xl text-[#94a3b8] mb-8">
            تحكم في تشتتك.. نظّم عالمك الرقمي في مكان واحد
          </p>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[rgba(0,240,255,0.1)] flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#e0fcff]">{feature.title}</h3>
                  <p className="text-sm text-[#64748b]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <GlassCard className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#e0fcff] mb-2 lg:hidden">
              Gate<span className="text-[#00f0ff]">Keeper</span>
            </h2>
            <p className="text-[#94a3b8]">
              Digital Life Management Platform
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleLogin}
              className="w-full h-12 text-base"
              variant="primary"
            >
              <LogIn className="w-5 h-5" />
              تسجيل الدخول عبر Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgba(255,255,255,0.1)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[rgba(10,10,20,0.8)] text-[#64748b]">
                  مميزات المنصة
                </span>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-[#94a3b8]">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#00f0ff]" />
                تنظيم الروابط في فئات مخصصة
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#00f0ff]" />
                تتبع التقدم والإنجازات
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#00f0ff]" />
                أسعار الكريبتو المباشرة
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#00f0ff]" />
                نظام شارات وتحفيز
              </li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
