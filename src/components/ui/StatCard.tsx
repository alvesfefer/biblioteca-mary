import type { LucideIcon } from 'lucide-react';
import { CornerFlourish } from '@/components/ornaments/Ornaments';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  hint?: string;
  index?: number;
}

/**
 * A stat card styled like an aged catalog slip / small wooden plaque
 * with gilded corner flourishes.
 */
export function StatCard({ label, value, icon: Icon, hint, index = 0 }: StatCardProps) {
  return (
    <div
      className="bg-parchment-paper book-card-lift group relative overflow-hidden rounded-[4px] border-gilded px-6 py-5"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <CornerFlourish
        className="absolute left-1 top-1 h-5 w-5 text-gold/50"
      />
      <CornerFlourish
        className="absolute right-1 top-1 h-5 w-5 -scale-x-100 text-gold/50"
      />
      <CornerFlourish
        className="absolute bottom-1 left-1 h-5 w-5 -scale-y-100 text-gold/50"
      />
      <CornerFlourish
        className="absolute bottom-1 right-1 h-5 w-5 -scale-100 text-gold/50"
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-sans-quiet text-[10px] uppercase tracking-[0.28em] text-wood-light">
            {label}
          </p>
          <p className="mt-2 font-serif-display text-4xl font-semibold leading-none text-ink">
            {value}
          </p>
          {hint && (
            <p className="mt-2 font-serif-body text-xs italic text-ink-soft/70">
              {hint}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-[3px] border-gilded bg-wood/10 text-gold-deep transition-colors duration-500 group-hover:bg-gold/20">
          <Icon size={18} strokeWidth={1.4} />
        </div>
      </div>

      {/* base shadow line */}
      <div className="absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}
