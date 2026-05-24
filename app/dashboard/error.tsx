'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-[#ef4444] mb-4">حدث خطأ في لوحة التحكم</h1>
        <p className="text-[#94a3b8] mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[rgba(0,240,255,0.15)] text-[#00f0ff] rounded-lg hover:bg-[rgba(0,240,255,0.25)] transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
