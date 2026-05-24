'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressTracker } from '@/types';
import { cn } from '@/lib/utils';

interface ProgressWidgetProps {
  progress: ProgressTracker;
  compact?: boolean;
}

export function ProgressWidget({ progress, compact = false }: ProgressWidgetProps) {
  const percentage = Math.min(
    100,
    Math.round((progress.currentValue / progress.targetValue) * 100)
  );

  const isComplete = progress.currentValue >= progress.targetValue;

  return (
    <GlassCard className={cn(compact ? 'p-3' : 'p-4')}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-[#e0fcff] truncate">{progress.title}</h3>
        {isComplete && (
          <span className="text-xs text-[#10b981]">✓ مكتمل</span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <div
          className={cn(
            'absolute inset-y-0 start-0 rounded-full transition-all duration-500 ease-out',
            isComplete
              ? 'bg-[#10b981]'
              : percentage >= 75
              ? 'bg-[#00f0ff]'
              : percentage >= 40
              ? 'bg-[#3b82f6]'
              : 'bg-[#f59e0b]'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-2 text-xs text-[#94a3b8]">
        <span>
          {progress.currentValue} / {progress.targetValue} {progress.unit}
        </span>
        <span>{percentage}%</span>
      </div>
    </GlassCard>
  );
}
