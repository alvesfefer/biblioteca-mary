import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookHeart, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import type { Book } from '@/types';
import { BookCard } from '@/components/books/BookCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { OrnamentDivider } from '@/components/ornaments/Ornaments';

export function FavoritesPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFavoriteBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Estante Pessoal"
        title="Favoritos"
        subtitle="As obras que conquistaram um lugar especial na sua coleção."
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-[4px] border-gilded/20 bg-wood/20"
            />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="bg-parchment-paper flex flex-col items-center rounded-[4px] border-gilded/30 px-6 py-16 text-center">
          <BookHeart size={36} strokeWidth={1} className="text-gold-deep/60" />
          <p className="mt-4 font-serif-display text-xl text-ink">
            Nenhum favorito ainda
          </p>
          <p className="mt-1 font-serif-body text-sm italic text-ink-soft/60">
            Explore o catálogo e marque as obras que mais te tocaram.
          </p>
          <Link
            to="/livros"
            className="group mt-6 inline-flex items-center gap-2 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-gold-deep transition-colors hover:text-wine"
          >
            Explorar catálogo
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center gap-2 text-gold/50">
            <BookHeart size={16} strokeWidth={1.3} />
            <span className="font-sans-quiet text-[10px] uppercase tracking-[0.25em]">
              {books.length} {books.length === 1 ? 'obra selecionada' : 'obras selecionadas'}
            </span>
          </div>
          <OrnamentDivider />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {books.map((book, i) => (
              <div key={book.id} className="animate-fade-rise">
                <BookCard book={book} index={i} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
