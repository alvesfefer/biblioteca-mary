import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Hash,
  Heart,
  Library,
  Star,
  Bookmark,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { Book } from '@/types';
import { BookCover } from '@/components/books/BookCover';
import { BookStatusBadge } from '@/components/ui/StatusBadge';
import {
  OrnamentDivider,
  OrnamentFlourish,
  CornerFlourish,
} from '@/components/ornaments/Ornaments';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.getBook(id).then((b) => {
      setBook(b ?? null);
      setIsFavorite(b?.favorite ?? false);
    });
  }, [id]);

  if (book === undefined) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="h-96 animate-pulse rounded-[6px] border-gilded/20 bg-wood/20" />
      </div>
    );
  }

  if (book === null) {
    return (
      <div className="bg-parchment-paper mx-auto max-w-lg rounded-[4px] border-gilded/40 px-8 py-16 text-center">
        <h2 className="font-serif-display text-2xl text-ink">
          Volume não encontrado
        </h2>
        <p className="mt-2 font-serif-body text-sm italic text-ink-soft/60">
          Esta ficha não consta no catálogo.
        </p>
        <Link
          to="/livros"
          className="mt-6 inline-flex items-center gap-2 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-gold-deep transition-colors hover:text-wine"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/livros"
        className="group mb-6 inline-flex items-center gap-2 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold-light"
      >
        <ArrowLeft
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        Voltar ao catálogo
      </Link>

      <div className="bg-parchment-paper animate-fade-rise relative overflow-hidden rounded-[6px] border-gilded px-6 py-10 sm:px-12 sm:py-12">
        <CornerFlourish className="absolute left-2 top-2 h-10 w-10 text-gold/40" />
        <CornerFlourish className="absolute right-2 top-2 h-10 w-10 -scale-x-100 text-gold/40" />
        <CornerFlourish className="absolute bottom-2 left-2 h-10 w-10 -scale-y-100 text-gold/40" />
        <CornerFlourish className="absolute bottom-2 right-2 h-10 w-10 -scale-100 text-gold/40" />

        <div className="relative flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Cover with table shadow */}
          <div className="flex shrink-0 justify-center">
            <div className="relative">
              <div className="absolute -bottom-3 left-1/2 h-4 w-36 -translate-x-1/2 rounded-[50%] bg-black/30 blur-md" />
              <div className="animate-soft-glow transition-transform duration-700 hover:-translate-y-1.5 hover:rotate-[-1deg]">
                <BookCover book={book} size="xl" />
              </div>
            </div>
          </div>

          {/* Details — literary file */}
          <div className="flex-1">
            <p className="font-sans-quiet text-[10px] uppercase tracking-[0.35em] text-gold-deep/70">
              Ficha Literária · Nº {book.id.toUpperCase()}
            </p>
            <h1 className="mt-2 font-serif-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-1 font-serif-body text-lg italic text-ink-soft/80">
              {book.author}
            </p>

            <div className="my-5 flex items-center gap-2 text-gold-deep/50">
              <span className="text-sm">❦</span>
              <div className="h-px w-20 bg-gradient-to-r from-gold-deep/50 to-transparent" />
            </div>

            <p className="font-serif-body max-w-lg text-[15px] leading-relaxed text-ink-soft">
              {book.description}
            </p>

            {/* Meta grid */}
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <Meta icon={Library} label="Categoria" value={book.category} />
              <Meta icon={Calendar} label="Ano" value={String(book.year)} />
              <Meta
                icon={Star}
                label="Avaliação"
                value={`${book.rating.toFixed(1)} / 5`}
              />
              <Meta icon={BookOpen} label="Páginas" value={String(book.pages)} />
              <Meta icon={Hash} label="ISBN" value={book.isbn} />
              <Meta
                icon={Bookmark}
                label="Editora"
                value={book.publisher}
              />
            </dl>

            {/* Status */}
            <div className="mt-7 flex items-center gap-3">
              <span className="font-sans-quiet text-[10px] uppercase tracking-[0.25em] text-ink-soft/50">
                Disponibilidade
              </span>
              <BookStatusBadge status={book.status} />
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                disabled={book.status !== 'disponivel'}
                className="group inline-flex items-center justify-center gap-2 rounded-[4px] border-gilded-strong bg-gold/15 px-6 py-3 font-sans-quiet text-[11px] uppercase tracking-[0.25em] text-gold-deep transition-all duration-300 enabled:hover:bg-gold/25 enabled:hover:shadow-[0_0_24px_-4px_rgba(176,141,79,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Bookmark size={14} strokeWidth={1.5} />
                {book.status === 'disponivel' ? 'Reservar livro' : 'Indisponível'}
              </button>
              <button
                onClick={() => setIsFavorite((v) => !v)}
                className={`inline-flex items-center justify-center gap-2 rounded-[4px] border px-6 py-3 font-sans-quiet text-[11px] uppercase tracking-[0.25em] transition-all duration-300 ${
                  isFavorite
                    ? 'border-wine/60 bg-wine/15 text-wine'
                    : 'border-gold/40 bg-transparent text-ink-soft hover:border-gold/60 hover:text-gold-deep'
                }`}
              >
                <Heart
                  size={14}
                  strokeWidth={1.5}
                  fill={isFavorite ? 'currentColor' : 'none'}
                />
                {isFavorite ? 'Nos favoritos' : 'Adicionar aos favoritos'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <OrnamentDivider />
        </div>
        <div className="mt-4 flex justify-center">
          <OrnamentFlourish className="h-5 w-28 opacity-60" />
        </div>
      </div>
    </div>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Library;
  label: string;
  value: string;
}) {
  return (
    <div className="border-l border-gold/30 pl-3">
      <dt className="flex items-center gap-1.5 font-sans-quiet text-[9px] uppercase tracking-[0.25em] text-gold-deep/60">
        <Icon size={11} strokeWidth={1.5} />
        {label}
      </dt>
      <dd className="mt-1 font-serif-body text-sm text-ink">{value}</dd>
    </div>
  );
}
