'use client';

import { ExternalLink, Trash2, Edit } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import type { LinkItem } from '@/types';
import { getFaviconFromUrl, getDomainFromUrl, formatDate } from '@/lib/utils';

interface LinkCardProps {
  link: LinkItem;
  categoryName?: string;
  onEdit?: (link: LinkItem) => void;
  onDelete?: (link: LinkItem) => void;
}

export function LinkCard({ link, categoryName, onEdit, onDelete }: LinkCardProps) {
  const favicon = link.favicon || getFaviconFromUrl(link.url);
  const domain = getDomainFromUrl(link.url);

  const handleClick = () => {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <GlassCard
      hover
      className="group cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      aria-label={`افتح ${link.title}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden">
          <img src={favicon} alt="" className="w-5 h-5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#e0fcff] truncate group-hover:text-[#00f0ff] transition-colors">
            {link.title}
          </h3>
          {link.description && (
            <p className="text-sm text-[#94a3b8] mt-1 line-clamp-2">{link.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs text-[#64748b]">{domain}</span>
            {categoryName && (
              <span className="text-xs text-[rgba(0,240,255,0.6)] bg-[rgba(0,240,255,0.08)] px-2 py-0.5 rounded-full">{categoryName}</span>
            )}
            {link.clickCount > 0 && (
              <span className="text-xs text-[#64748b]">• {link.clickCount} click{link.clickCount !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit?.(link); }} aria-label="تعديل الرابط">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDelete?.(link); }} aria-label="حذف الرابط">
            <Trash2 className="w-4 h-4 text-[#ef4444]" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
