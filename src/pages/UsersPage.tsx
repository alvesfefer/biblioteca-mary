import { useEffect, useState } from 'react';
import { Mail, Calendar, BookMarked, MoreHorizontal } from 'lucide-react';
import { api } from '@/lib/api';
import type { User } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { UserStatusBadge } from '@/components/ui/StatusBadge';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Registro de Leitores"
        title="Usuários"
        subtitle="Fichas dos leitores cadastrados na biblioteca."
      />

      <div className="bg-parchment-paper overflow-hidden rounded-[5px] border-gilded">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-gold/30 bg-wood/8">
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th align="center">Livros Emprestados</Th>
                <Th>Data de Cadastro</Th>
                <Th align="center">Status</Th>
                <Th align="center">Ações</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gold/15">
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-5 w-full max-w-[120px] animate-pulse rounded bg-wood/15" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                users.map((user, i) => <UserRow key={user.id} user={user} index={i} />)
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-right font-serif-body text-sm italic text-aged-beige/50">
        {users.length} leitores cadastrados
      </p>
    </div>
  );
}

function UserRow({ user, index }: { user: User; index: number }) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <tr
      className="group animate-fade-rise border-b border-gold/15 transition-colors duration-300 last:border-0 hover:bg-gold/8"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-gilded/50 font-serif-display text-sm font-semibold text-parchment-light"
            style={{
              background: `linear-gradient(135deg, hsl(${user.avatarHue},35%,24%), hsl(${user.avatarHue},40%,14%))`,
            }}
          >
            {initials}
          </div>
          <span className="font-serif-body text-[15px] text-ink">
            {user.name}
          </span>
        </div>
      </td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 font-sans-quiet text-xs text-ink-soft/75">
          <Mail size={12} strokeWidth={1.5} className="text-gold-deep/60" />
          {user.email}
        </span>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="inline-flex items-center gap-1.5 font-serif-body text-sm text-ink">
          <BookMarked size={13} strokeWidth={1.5} className="text-gold-deep/70" />
          {user.borrowedCount}
        </span>
      </td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 font-sans-quiet text-xs text-ink-soft/75">
          <Calendar size={12} strokeWidth={1.5} className="text-gold-deep/60" />
          {formatDate(user.registeredAt)}
        </span>
      </td>
      <td className="px-5 py-4 text-center">
        <UserStatusBadge status={user.status} />
      </td>
      <td className="px-5 py-4 text-center">
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] text-wood-light/60 transition-colors hover:bg-gold/15 hover:text-gold-deep"
          aria-label={`Ações para ${user.name}`}
        >
          <MoreHorizontal size={16} strokeWidth={1.5} />
        </button>
      </td>
    </tr>
  );
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <th
      className={`px-5 py-3.5 font-sans-quiet text-[10px] uppercase tracking-[0.22em] text-wood-light ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      {children}
    </th>
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
