import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import type { Book } from '@/types';
import { BookCover } from '@/components/books/BookCover';
import { BookStatusBadge } from '@/components/ui/StatusBadge';

interface BookCardProps {
  book: Book;
  index?: number;
}

/**
 * Catalog-card styled like a library index slip: book cover on the left,
 * bibliographic fields on the right, gilded hairline border.
 */
export function BookCard({ book, index = 0 }: BookCardProps) {
  return (
    <Link
      to={`/livros/${book.id}`}
      className="book-card-lift group bg-parchment-paper relative flex gap-4 rounded-[4px] border-gilded p-4"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
        <BookCover book={book} size="md" />
        {book.favorite && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-gilded-strong bg-wine text-gold-shimmer">
            <Heart size={10} fill="currentColor" strokeWidth={0} />
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div>
          <h3 className="font-serif-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-wine">
            {book.title}
          </h3>
          <p className="mt-0.5 font-serif-body text-sm italic text-ink-soft/80">
            {book.author}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans-quiet text-[10px] uppercase tracking-[0.15em] text-wood-light">
            <span>{book.category}</span>
            <span className="text-gold/60">·</span>
            <span>{book.year}</span>
            <span className="text-gold/60">·</span>
            <span className="inline-flex items-center gap-1 text-gold-deep">
              <Star size={10} fill="currentColor" strokeWidth={0} />
              {book.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <BookStatusBadge status={book.status} />
        </div>
      </div>

      {/* gilded base line */}
      <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent opacity-60" />
    </Link>
  );
}
