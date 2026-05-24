'use client';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#00f0ff] mb-4">404</h1>
        <p className="text-xl text-[#94a3b8] mb-6">الصفحة غير موجودة</p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-[rgba(0,240,255,0.15)] text-[#00f0ff] rounded-lg hover:bg-[rgba(0,240,255,0.25)] transition-colors"
        >
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}
