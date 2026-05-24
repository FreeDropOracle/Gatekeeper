import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/animations.css';
import { AuthGate } from '@/components/layout/AuthGate';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0a14',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'GateKeeper — نظّم عالمك الرقمي',
  description: 'منصة إدارة الحياة الرقمية. تحكم في تشتتك، نظّم عالمك الرقمي في مكان واحد.',
  icons: {
    icon: '/icons/favicon.png',
    apple: '/icons/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
