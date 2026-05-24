export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#94a3b8]">جاري التحميل...</p>
      </div>
    </div>
  );
}
