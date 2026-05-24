# GateKeeper — Digital Life Management Platform

**تحكم في تشتتك.. نظّم عالمك الرقمي في مكان واحد**

## 🚀 نظرة عامة

GateKeeper هو منصة إدارة الحياة الرقمية التي تجمع بين:
- 📌 **تنظيم** الروابط والمصادر في فئات مخصصة
- 📊 **تتبع** التقدم الشخصي وأهدافك
- 💰 **مراقبة** أسعار الكريبتو بشكل مباشر
- 🏆 **تحفيز** عبر نظام شارات وإنجازات

## 🏗️ البنية التقنية

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Firebase (Auth + Firestore)
- **Validation**: Zod

## 📦 التثبيت

```bash
# تثبيت dependencies
npm install

# نسخ ملف البيئة
cp .env.local.example .env.local

# تعديل .env.local وإضافة مفاتيح Firebase
```

## 🔑 مفاتيح Firebase المطلوبة

يجب الحصول على المفاتيح من [Firebase Console](https://console.firebase.google.com/) وإضافتها لملف `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## 🚀 التشغيل

```bash
npm run dev
```

يفتح على: `http://localhost:3000`

## 📁 هيكل المشروع

```
gatekeeper/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication page
│   ├── dashboard/           # Main dashboard
│   ├── settings/            # User settings
│   ├── achievements/        # Achievements page
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components
│   └── dashboard/           # Dashboard components
├── lib/                     # Utilities and Firebase
│   ├── firebase/            # Firebase config & functions
│   └── utils.ts             # Helper functions
├── store/                   # Zustand stores
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript types
└── styles/                  # Global styles
```

## 🎨 الميزات الأساسية

### 1. لوحة التحكم (Dashboard)
- عرض جميع الروابط المنظم
- فلترة حسب الفئات
- إضافة روابط سريعة (< 3 ثواني)
- شريط أسعار الكريبتو المباشر

### 2. الفئات الديناميكية
- إنشاء فئات مخصصة
- أيقونات وألوان قابلة للتخصيص
- إعادة ترتيب الفئات

### 3. نظام الشارات
- 7 شارات نظام افتراضية
- تتبع الإنجازات
- تحفيز الاستخدام المستمر

### 4. تتبع التقدم
- Widgets للأهداف
- نسب إنجاز تفاعلية
- ألوان حالة ذكية

## 🔐 الحماية

- مصادقة Google OAuth عبر Firebase
- حماية المسارات الخاصة
- middleware لإعادة التوجيه التلقائي

## 🎯 اختصارات لوحة المفاتيح

| الاختصار | الوظيفة |
|----------|---------|
| `Ctrl/Cmd + K` | البحث الشامل |
| `Ctrl/Cmd + N` | إضافة رابط جديد |
| `Ctrl/Cmd + B` | إظهار/إخفاء القائمة |
| `Esc` | إغلاق النوافذ |

## 📊 مخطط البيانات (Firestore)

```
/users/{userId}
  ├── displayName: string
  ├── email: string
  ├── photoURL: string
  ├── preferences: {}
  └── createdAt: timestamp

/users/{userId}/categories/{categoryId}
  ├── name: string
  ├── icon: string
  ├── colorTag: string
  └── orderIndex: number

/users/{userId}/links/{linkId}
  ├── url: string
  ├── title: string
  ├── description: string
  ├── categoryId: string
  ├── favicon: string
  └── clickCount: number

/users/{userId}/progress/{progressId}
  ├── title: string
  ├── currentValue: number
  ├── targetValue: number
  └── unit: string

/users/{userId}/achievements/{achievementId}
  ├── badgeId: string
  └── unlockedAt: timestamp
```

## 🚧 ميزات مستقبلية

- [ ] Command Palette للبحث الشامل
- [ ] Command Palette للبحث الشامل
- [ ] Import/Export متقدم
- [ ] مشاركة الروابط
- [ ] وضع التصفح المشترك
- [ ] دعم PWA

## 📝 الترخيص

[MIT License](LICENSE) — هذا المشروع مفتوح المصدر بالكامل. يمكن لأي شخص استخدامه، تعديله، نسخه، توزيعه، أو حتى بيعه دون أي قيود.

---

**GateKeeper** — Built with ❤️ using Next.js, TypeScript, and Firebase
