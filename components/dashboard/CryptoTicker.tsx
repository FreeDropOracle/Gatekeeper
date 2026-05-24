'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { CryptoPrice } from '@/types';
import { cn } from '@/lib/utils';

interface CryptoTickerProps {
  prices: CryptoPrice[];
  loading?: boolean;
}

export function CryptoTicker({ prices, loading = false }: CryptoTickerProps) {
  if (loading) {
    return (
      <GlassCard className="p-4">
        <div className="flex items-center gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-32 h-12 bg-[rgba(255,255,255,0.05)] rounded-lg animate-pulse" />
          ))}
        </div>
      </GlassCard>
    );
  }

  if (prices.length === 0) {
    return null;
  }

  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {prices.map((crypto) => {
          const isUp = crypto.price_change_percentage_24h >= 0;
          return (
            <div
              key={crypto.id}
              className="flex-shrink-0 min-w-[140px] p-3 border-e border-[rgba(255,255,255,0.05)] last:border-e-0"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#e0fcff] uppercase">
                  {crypto.symbol}
                </span>
                <Badge
                  variant={isUp ? 'success' : 'warning'}
                  size="sm"
                  className={cn(
                    'text-xs',
                    !isUp && 'bg-[rgba(239,68,68,0.15)] text-[#ef4444] border-[rgba(239,68,68,0.3)]'
                  )}
                >
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </Badge>
              </div>
              <div className="text-lg font-semibold text-[#00f0ff]">
                ${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
