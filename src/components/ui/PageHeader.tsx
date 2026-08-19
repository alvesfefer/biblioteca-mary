import type { ReactNode } from 'react';
import { OrnamentDivider } from '@/components/ornaments/Ornaments';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  divider?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  divider = true,
}: PageHeaderProps) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-2 font-sans-quiet text-[11px] uppercase tracking-[0.35em] text-gold/70">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-3xl font-semibold text-parchment-light sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 font-serif-body text-base italic text-aged-beige/70">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
      {divider && (
        <div className="mt-5">
          <OrnamentDivider />
        </div>
      )}
    </header>
  );
}
