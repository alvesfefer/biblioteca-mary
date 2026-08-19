import { useEffect, useMemo, useState } from 'react';
import { BookOpen, User, Calendar, CalendarCheck } from 'lucide-react';
import { api } from '@/lib/api';
import type { Loan, LoanStatus } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoanStatusBadge } from '@/components/ui/StatusBadge';
import { CornerFlourish } from '@/components/ornaments/Ornaments';

type FilterKey = 'todos' | LoanStatus;

const filters: { key: FilterKey; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'emprestado', label: 'Emprestados' },
  { key: 'atrasado', label: 'Atrasados' },
  { key: 'devolvido', label: 'Devolvidos' },
];

export function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>('todos');

  useEffect(() => {
    api.getLoans().then((data) => {
      setLoans(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(
    () => loans.filter((l) => filter === 'todos' || l.status === filter),
    [loans, filter]
  );

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Registros de Circulação"
        title="Empréstimos"
        subtitle="Movimentação de volumes entre leitores e estantes."
      />

      {/* Filter tabs */}
      <div className="mb-7 flex flex-wrap items-center gap-2.5">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-[3px] border px-3.5 py-1.5 font-sans-quiet text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
              filter === f.key
                ? 'border-gold/60 bg-gold/15 text-gold-deep'
                : 'border-gold/20 bg-transparent text-aged-beige/60 hover:border-gold/40 hover:text-aged-beige'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto font-serif-body text-sm italic text-aged-beige/50">
          {filtered.length} registros
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-[4px] border-gilded/20 bg-wood/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filtered.map((loan, i) => (
            <LoanCard key={loan.id} loan={loan} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function LoanCard({ loan, index }: { loan: Loan; index: number }) {
  return (
    <div
      className="bg-parchment-paper book-card-lift animate-fade-rise relative overflow-hidden rounded-[4px] border-gilded p-5"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <CornerFlourish className="absolute right-1.5 top-1.5 h-5 w-5 -scale-x-100 text-gold/40" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-1 font-serif-display text-lg text-ink">
            {loan.bookTitle}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 font-serif-body text-sm italic text-ink-soft/75">
            <User size={12} strokeWidth={1.5} className="text-gold-deep/60" />
            {loan.userName}
          </p>
        </div>
        <LoanStatusBadge status={loan.status} />
      </div>

      <div className="my-4 h-px w-full bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <DateField
          icon={Calendar}
          label="Empréstimo"
          value={formatDate(loan.loanDate)}
        />
        <DateField
          icon={CalendarCheck}
          label="Devolução prevista"
          value={formatDate(loan.dueDate)}
          overdue={loan.status === 'atrasado'}
        />
        {loan.returnDate && (
          <DateField
            icon={BookOpen}
            label="Devolvido em"
            value={formatDate(loan.returnDate)}
          />
        )}
      </div>
    </div>
  );
}

function DateField({
  icon: Icon,
  label,
  value,
  overdue = false,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  overdue?: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-sans-quiet text-[9px] uppercase tracking-[0.22em] text-gold-deep/60">
        <Icon size={11} strokeWidth={1.5} />
        {label}
      </p>
      <p
        className={`mt-0.5 font-serif-body text-sm ${
          overdue ? 'font-semibold text-wine' : 'text-ink'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  const months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez',
  ];
  const mi = Math.max(0, Math.min(11, Number(m) - 1));
  return `${d} ${months[mi]} ${y}`;
}
