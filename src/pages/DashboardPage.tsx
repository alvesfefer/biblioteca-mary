import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookMarked,
  BookOpen,
  Library,
  Users,
  ArrowRight,
  Star,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { Book, Stats } from '@/types';
import { StatCard } from '@/components/ui/StatCard';
import { BookCover } from '@/components/books/BookCover';
import { BookStatusBadge } from '@/components/ui/StatusBadge';
import {
  OrnamentDivider,
  OrnamentFlourish,
  CornerFlourish,
} from '@/components/ornaments/Ornaments';

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [featured, setFeatured] = useState<Book | null>(null);
  const [recent, setRecent] = useState<Book[]>([]);

  useEffect(() => {
    api.getStats().then(setStats);
    api.getBooks().then((books) => {
      setFeatured(books.find((b) => b.id === 'b13') ?? books[0] ?? null);
      setRecent(books.slice(0, 4));
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero — reading room welcome */}
      <section className="animate-fade-rise relative mb-12 overflow-hidden rounded-[6px] border-gilded/40 bg-wood-panel px-6 py-12 text-center sm:px-12 sm:py-16">
        <CornerFlourish className="absolute left-3 top-3 h-8 w-8 text-gold/40" />
        <CornerFlourish className="absolute right-3 top-3 h-8 w-8 -scale-x-100 text-gold/40" />
        <CornerFlourish className="absolute bottom-3 left-3 h-8 w-8 -scale-y-100 text-gold/40" />
        <CornerFlourish className="absolute bottom-3 right-3 h-8 w-8 -scale-100 text-gold/40" />

        {/* warm lamp glow */}
        <div className="animate-lamp pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative">
          <p className="mb-3 font-sans-quiet text-[11px] uppercase tracking-[0.4em] text-gold/70">
            Sala de Leitura
          </p>
          <h1 className="text-shadow-warm font-serif-display text-4xl font-semibold text-parchment-light sm:text-5xl">
            Bem-vinda à Bibliotheca
          </h1>
          <div className="my-5 flex items-center justify-center">
            <OrnamentFlourish className="h-5 w-32" />
          </div>
          <p className="font-serif-body text-lg italic text-aged-beige/80 sm:text-xl">
            Entre páginas, histórias e mundos que nunca terminam.
          </p>
        </div>
      </section>

      {/* Stats — catalog slip cards */}
      <section className="mb-14">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif-display text-xl font-semibold text-parchment-light">
            Estado da Coleção
          </h2>
          <Link
            to="/biblioteca"
            className="group inline-flex items-center gap-1.5 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold-light"
          >
            Ver biblioteca
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats ? (
            <>
              <StatCard
                index={0}
                label="Total de Livros"
                value={stats.totalBooks}
                icon={Library}
                hint="Volumes catalogados"
              />
              <StatCard
                index={1}
                label="Disponíveis"
                value={stats.availableBooks}
                icon={BookOpen}
                hint="Prontos para empréstimo"
              />
              <StatCard
                index={2}
                label="Emprestados"
                value={stats.borrowedBooks}
                icon={BookMarked}
                hint="Atualmente com leitores"
              />
              <StatCard
                index={3}
                label="Usuários"
                value={stats.registeredUsers}
                icon={Users}
                hint="Leitores cadastrados"
              />
            </>
          ) : (
            <SkeletonCards />
          )}
        </div>
      </section>

      {/* Featured book — on a wooden table */}
      <section className="mb-14">
        <div className="mb-6">
          <OrnamentDivider />
          <h2 className="mt-4 text-center font-serif-display text-2xl font-semibold text-parchment-light">
            Livro em Destaque
          </h2>
          <p className="mt-1 text-center font-serif-body text-sm italic text-aged-beige/60">
            A obra selecionada para esta semana
          </p>
        </div>

        {featured ? (
          <FeaturedBook book={featured} />
        ) : (
          <div className="h-80 animate-pulse rounded-[6px] border-gilded/30 bg-wood/20" />
        )}
      </section>

      {/* Recent additions */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif-display text-xl font-semibold text-parchment-light">
            Adições Recentes
          </h2>
          <Link
            to="/livros"
            className="group inline-flex items-center gap-1.5 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold-light"
          >
            Ver todos
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {recent.map((book, i) => (
            <Link
              key={book.id}
              to={`/livros/${book.id}`}
              className="book-card-lift bg-parchment-paper group flex flex-col items-center rounded-[4px] border-gilded p-4 text-center"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="transition-transform duration-500 group-hover:-translate-y-1">
                <BookCover book={book} size="md" />
              </div>
              <h3 className="mt-3 line-clamp-1 font-serif-display text-base text-ink">
                {book.title}
              </h3>
              <p className="line-clamp-1 font-serif-body text-xs italic text-ink-soft/70">
                {book.author}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SkeletonCards() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-28 animate-pulse rounded-[4px] border-gilded/20 bg-wood/20"
        />
      ))}
    </>
  );
}

function FeaturedBook({ book }: { book: Book }) {
  return (
    <div className="animate-fade-rise relative overflow-hidden rounded-[6px] border-gilded/40 bg-wood-panel px-6 py-10 sm:px-12 sm:py-12">
      <CornerFlourish className="absolute left-2 top-2 h-10 w-10 text-gold/35" />
      <CornerFlourish className="absolute right-2 top-2 h-10 w-10 -scale-x-100 text-gold/35" />
      <CornerFlourish className="absolute bottom-2 left-2 h-10 w-10 -scale-y-100 text-gold/35" />
      <CornerFlourish className="absolute bottom-2 right-2 h-10 w-10 -scale-100 text-gold/35" />

      {/* warm spotlight on the table */}
      <div
        className="pointer-events-none absolute left-[18%] top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
        {/* Book on the table */}
        <div className="relative shrink-0">
          {/* table surface shadow */}
          <div className="absolute -bottom-3 left-1/2 h-4 w-40 -translate-x-1/2 rounded-[50%] bg-black/50 blur-md" />
          {/* warm underlight */}
          <div className="absolute -inset-6 -z-10 rounded-full bg-gold/8 blur-2xl" />
          <div className="animate-soft-glow transition-transform duration-700 hover:-translate-y-2 hover:rotate-[-1.5deg]">
            <BookCover book={book} size="xl" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left">
          <p className="mb-2 font-sans-quiet text-[10px] uppercase tracking-[0.35em] text-gold/70">
            Obra Selecionada
          </p>
          <h3 className="font-serif-display text-3xl font-semibold text-parchment-light sm:text-4xl">
            {book.title}
          </h3>
          <p className="mt-2 font-serif-body text-lg italic text-aged-beige/80">
            {book.author}
          </p>

          <div className="my-5 flex items-center justify-center gap-2 text-gold/50 md:justify-start">
            <span className="text-sm">❦</span>
            <div className="h-px w-16 bg-gradient-to-r from-gold/50 to-transparent" />
          </div>

          <dl className="mx-auto grid max-w-md grid-cols-2 gap-x-6 gap-y-3 text-left md:mx-0">
            <Field label="Ano" value={String(book.year)} />
            <Field label="Categoria" value={book.category} />
            <Field label="Páginas" value={String(book.pages)} />
            <Field
              label="Avaliação"
              value={
                <span className="inline-flex items-center gap-1 text-gold-light">
                  <Star size={12} fill="currentColor" strokeWidth={0} />
                  {book.rating.toFixed(1)}
                </span>
              }
            />
          </dl>

          <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
            <BookStatusBadge status={book.status} />
          </div>

          <p className="mt-5 max-w-lg font-serif-body text-sm leading-relaxed text-aged-beige/70 md:mx-0">
            {book.description}
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Link
              to={`/livros/${book.id}`}
              className="group inline-flex items-center gap-2 rounded-[4px] border-gilded-strong bg-gold/10 px-6 py-3 font-sans-quiet text-[11px] uppercase tracking-[0.25em] text-gold-light transition-all duration-300 hover:bg-gold/20 hover:shadow-[0_0_24px_-4px_rgba(201,169,106,0.4)]"
            >
              Explorar livro
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="font-sans-quiet text-[9px] uppercase tracking-[0.25em] text-gold/50">
        {label}
      </dt>
      <dd className="mt-0.5 font-serif-body text-sm text-parchment-light">
        {value}
      </dd>
    </div>
  );
}
