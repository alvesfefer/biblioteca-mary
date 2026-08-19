import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Library,
  BookOpen,
  Users,
  BookMarked,
  ArrowRight,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { Book, Stats } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { BookCard } from '@/components/books/BookCard';
import { OrnamentDivider } from '@/components/ornaments/Ornaments';

export function LibraryPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.getStats().then(setStats);
    api.getBooks().then((b) => setBooks(b.slice(0, 6)));
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Visão de Conjunto"
        title="Biblioteca"
        subtitle="Um panorama da coleção, dos leitores e da circulação."
      />

      <div className="mb-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats ? (
          <>
            <StatCard index={0} label="Volumes" value={stats.totalBooks} icon={Library} />
            <StatCard index={1} label="Disponíveis" value={stats.availableBooks} icon={BookOpen} />
            <StatCard index={2} label="Emprestados" value={stats.borrowedBooks} icon={BookMarked} />
            <StatCard index={3} label="Leitores" value={stats.registeredUsers} icon={Users} />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-[4px] border-gilded/20 bg-wood/20" />
          ))
        )}
      </div>

      <div className="mb-6">
        <OrnamentDivider />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif-display text-xl font-semibold text-parchment-light">
          Volumes em destaque
        </h2>
        <Link
          to="/livros"
          className="group inline-flex items-center gap-1.5 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold-light"
        >
          Catálogo completo
          <ArrowRight
            size={13}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {books.map((book, i) => (
          <div key={book.id} className="animate-fade-rise">
            <BookCard book={book} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
