import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, BookX } from 'lucide-react';
import { api } from '@/lib/api';
import type { Book } from '@/types';
import { BookCard } from '@/components/books/BookCard';
import { PageHeader } from '@/components/ui/PageHeader';

type FilterKey = 'todos' | 'disponiveis' | 'emprestados' | 'favoritos';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'disponiveis', label: 'Disponíveis' },
  { key: 'emprestados', label: 'Emprestados' },
  { key: 'favoritos', label: 'Favoritos' },
];

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('todos');
  const [category, setCategory] = useState<string>('todas');

  useEffect(() => {
    api.getBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(books.map((b) => b.category));
    return ['todas', ...Array.from(set).sort()];
  }, [books]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);

      const matchesFilter =
        filter === 'todos' ||
        (filter === 'disponiveis' && b.status === 'disponivel') ||
        (filter === 'emprestados' && b.status === 'emprestado') ||
        (filter === 'favoritos' && b.favorite);

      const matchesCategory =
        category === 'todas' || b.category === category;

      return matchesQuery && matchesFilter && matchesCategory;
    });
  }, [books, query, filter, category]);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Estante Digital"
        title="Livros"
        subtitle="Catálogo completo da coleção, organizado como fichas de biblioteca."
      />

      {/* Search bar */}
      <div className="mb-5">
        <div className="bg-parchment-paper relative flex items-center rounded-[4px] border-gilded px-5 py-4">
          <Search
            size={18}
            strokeWidth={1.4}
            className="text-gold-deep mr-3 shrink-0"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por título, autor ou categoria..."
            className="font-serif-body w-full bg-transparent text-base text-ink placeholder:text-ink-soft/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="font-sans-quiet ml-2 text-[10px] uppercase tracking-[0.2em] text-wood-light transition-colors hover:text-wine"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-7 flex flex-wrap items-center gap-2.5">
        <span className="font-sans-quiet mr-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-gold/60">
          <SlidersHorizontal size={12} strokeWidth={1.5} />
          Filtrar
        </span>
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

        <div className="mx-1 hidden h-5 w-px bg-gold/20 sm:block" />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-[3px] border border-gold/20 bg-espresso px-3 py-1.5 font-sans-quiet text-[11px] uppercase tracking-[0.15em] text-aged-beige focus:border-gold/50 focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-espresso">
              {c === 'todas' ? 'Categorias' : c}
            </option>
          ))}
        </select>

        <span className="ml-auto font-serif-body text-sm italic text-aged-beige/50">
          {filtered.length} {filtered.length === 1 ? 'volume' : 'volumes'}
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-[4px] border-gilded/20 bg-wood/20"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-parchment-paper flex flex-col items-center rounded-[4px] border-gilded/30 px-6 py-16 text-center">
          <BookX size={36} strokeWidth={1} className="text-gold-deep/60" />
          <p className="mt-4 font-serif-display text-xl text-ink">
            Nenhum volume encontrado
          </p>
          <p className="mt-1 font-serif-body text-sm italic text-ink-soft/60">
            Ajuste a pesquisa ou os filtros para encontrar sua próxima leitura.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((book, i) => (
            <div key={book.id} className="animate-fade-rise">
              <BookCard book={book} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
