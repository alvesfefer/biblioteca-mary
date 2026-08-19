import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenLine, Globe2 } from 'lucide-react';
import { api } from '@/lib/api';
import type { Author } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { CornerFlourish, OrnamentDivider } from '@/components/ornaments/Ornaments';

export function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAuthors().then((data) => {
      setAuthors(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Panteão Literário"
        title="Autores"
        subtitle="As vozes que animaram as páginas da nossa coleção."
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-[4px] border-gilded/20 bg-wood/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author, i) => (
            <AuthorCard key={author.id} author={author} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function AuthorCard({ author, index }: { author: Author; index: number }) {
  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const hue = (author.name.charCodeAt(0) * 7) % 360;

  return (
    <div
      className="bg-parchment-paper book-card-lift group animate-fade-rise relative overflow-hidden rounded-[4px] border-gilded p-6"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <CornerFlourish className="absolute right-1.5 top-1.5 h-5 w-5 -scale-x-100 text-gold/40" />

      <div className="flex items-center gap-4">
        {/* Portrait medallion */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-gilded-strong font-serif-display text-2xl font-semibold text-parchment-light shadow-inner"
          style={{
            background: `linear-gradient(135deg, hsl(${hue},35%,22%), hsl(${hue},40%,14%))`,
            boxShadow:
              'inset 0 0 0 3px rgba(243,233,214,0.08), 0 4px 12px -2px rgba(0,0,0,0.4)',
          }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-serif-display text-xl leading-tight text-ink transition-colors group-hover:text-wine">
            {author.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 font-sans-quiet text-[10px] uppercase tracking-[0.2em] text-wood-light">
            <Globe2 size={11} strokeWidth={1.5} />
            {author.nationality}
          </p>
          <p className="mt-0.5 font-serif-body text-xs italic text-ink-soft/60">
            {author.birthYear} — {author.deathYear ?? 'presente'}
          </p>
        </div>
      </div>

      <div className="my-4">
        <OrnamentDivider width="100%" />
      </div>

      <p className="font-serif-body text-sm leading-relaxed text-ink-soft/85">
        {author.biography}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-sans-quiet text-[10px] uppercase tracking-[0.2em] text-gold-deep">
          <BookOpen size={12} strokeWidth={1.5} />
          {author.bookCount} {author.bookCount === 1 ? 'obra' : 'obras'}
        </span>
        <Link
          to="/livros"
          className="group/link inline-flex items-center gap-1.5 font-sans-quiet text-[10px] uppercase tracking-[0.2em] text-wine/70 transition-colors hover:text-wine"
        >
          <PenLine size={12} strokeWidth={1.5} />
          Ver obras
        </Link>
      </div>
    </div>
  );
}
