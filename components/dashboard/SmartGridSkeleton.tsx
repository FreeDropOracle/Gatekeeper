import { GlassCard } from '@/components/ui/GlassCard';

export function SmartGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <GlassCard key={i}>
          <div className="flex items-start gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-3/4" />
              <div className="h-3 bg-[rgba(255,255,255,0.03)] rounded w-full" />
              <div className="flex gap-2">
                <div className="h-3 bg-[rgba(255,255,255,0.03)] rounded w-16" />
                <div className="h-3 bg-[rgba(255,255,255,0.03)] rounded w-12" />
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
