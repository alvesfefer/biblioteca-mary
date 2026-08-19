import type { BookStatus, LoanStatus, UserStatus } from '@/types';

type Tone = 'gold' | 'wine' | 'green' | 'amber' | 'neutral';

const toneStyles: Record<Tone, string> = {
  gold: 'border-gold/60 bg-gold/15 text-gold-light',
  wine: 'border-[#7a3a40]/60 bg-[#5e2a2f]/25 text-[#d4969b]',
  green: 'border-emerald-700/50 bg-emerald-900/25 text-emerald-300/90',
  amber: 'border-amber-700/50 bg-amber-900/25 text-amber-300/90',
  neutral: 'border-wood-light/50 bg-wood/30 text-aged-beige',
};

interface StatusBadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({
  tone = 'neutral',
  children,
  className = '',
  dot = true,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2.5 py-0.5 font-sans-quiet text-[11px] font-medium uppercase tracking-[0.12em] ${toneStyles[tone]} ${className}`}
    >
      {dot && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: 'currentColor', opacity: 0.7 }}
        />
      )}
      {children}
    </span>
  );
}

export function BookStatusBadge({ status }: { status: BookStatus }) {
  const map: Record<BookStatus, { tone: Tone; label: string }> = {
    disponivel: { tone: 'green', label: 'Disponível' },
    emprestado: { tone: 'amber', label: 'Emprestado' },
    reservado: { tone: 'gold', label: 'Reservado' },
  };
  const { tone, label } = map[status];
  return <StatusBadge tone={tone}>{label}</StatusBadge>;
}

export function LoanStatusBadge({ status }: { status: LoanStatus }) {
  const map: Record<LoanStatus, { tone: Tone; label: string }> = {
    disponivel: { tone: 'green', label: 'Disponível' },
    emprestado: { tone: 'amber', label: 'Emprestado' },
    atrasado: { tone: 'wine', label: 'Atrasado' },
    devolvido: { tone: 'neutral', label: 'Devolvido' },
  };
  const { tone, label } = map[status];
  return <StatusBadge tone={tone}>{label}</StatusBadge>;
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const map: Record<UserStatus, { tone: Tone; label: string }> = {
    ativo: { tone: 'green', label: 'Ativo' },
    inativo: { tone: 'neutral', label: 'Inativo' },
    suspenso: { tone: 'wine', label: 'Suspenso' },
  };
  const { tone, label } = map[status];
  return <StatusBadge tone={tone}>{label}</StatusBadge>;
}
