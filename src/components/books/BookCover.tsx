import type { Book } from '@/types';

interface BookCoverProps {
  book: Pick<Book, 'title' | 'author' | 'coverHue' | 'coverAccent' | 'year'>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes: Record<NonNullable<BookCoverProps['size']>, string> = {
  sm: 'w-20 h-28',
  md: 'w-32 h-44',
  lg: 'w-44 h-60',
  xl: 'w-56 h-80',
};

const titleSizes: Record<NonNullable<BookCoverProps['size']>, string> = {
  sm: 'text-[8px]',
  md: 'text-[10px]',
  lg: 'text-xs',
  xl: 'text-sm',
};

const authorSizes: Record<NonNullable<BookCoverProps['size']>, string> = {
  sm: 'text-[6px]',
  md: 'text-[8px]',
  lg: 'text-[10px]',
  xl: 'text-xs',
};

/**
 * Procedurally rendered vintage book cover. Generates a leather-bound
 * look with a gilded frame, title plate and author line based on the
 * book's hue and accent color — no external images required.
 */
export function BookCover({ book, size = 'md', className = '' }: BookCoverProps) {
  const base = `hsl(${book.coverHue}, 38%, 24%)`;
  const dark = `hsl(${book.coverHue}, 42%, 16%)`;
  const light = `hsl(${book.coverHue}, 35%, 32%)`;

  return (
    <div
      className={`relative ${sizes[size]} ${className} shrink-0 overflow-hidden rounded-[3px]`}
      style={{
        background: `linear-gradient(135deg, ${light} 0%, ${base} 45%, ${dark} 100%)`,
        boxShadow:
          'inset 0 0 0 1px rgba(201,169,106,0.25), inset 4px 0 12px -2px rgba(0,0,0,0.5), inset -2px 0 4px rgba(0,0,0,0.3), 2px 6px 16px -4px rgba(0,0,0,0.6)',
      }}
    >
      {/* leather texture grain */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* spine shadow */}
      <div className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/45 to-transparent" />
      <div className="absolute inset-y-0 left-[6px] w-px bg-black/30" />

      {/* gilded frame */}
      <div
        className="absolute inset-[6px] rounded-[2px]"
        style={{ border: `0.5px solid ${book.coverAccent}55` }}
      />
      <div
        className="absolute inset-[8px] rounded-[2px]"
        style={{ border: `0.5px solid ${book.coverAccent}33` }}
      />

      {/* corner ornaments */}
      <span
        className="absolute left-[7px] top-[7px] h-2 w-2"
        style={{
          borderTop: `0.5px solid ${book.coverAccent}aa`,
          borderLeft: `0.5px solid ${book.coverAccent}aa`,
        }}
      />
      <span
        className="absolute right-[7px] top-[7px] h-2 w-2"
        style={{
          borderTop: `0.5px solid ${book.coverAccent}aa`,
          borderRight: `0.5px solid ${book.coverAccent}aa`,
        }}
      />
      <span
        className="absolute bottom-[7px] left-[7px] h-2 w-2"
        style={{
          borderBottom: `0.5px solid ${book.coverAccent}aa`,
          borderLeft: `0.5px solid ${book.coverAccent}aa`,
        }}
      />
      <span
        className="absolute bottom-[7px] right-[7px] h-2 w-2"
        style={{
          borderBottom: `0.5px solid ${book.coverAccent}aa`,
          borderRight: `0.5px solid ${book.coverAccent}aa`,
        }}
      />

      {/* content */}
      <div className="relative flex h-full flex-col items-center justify-between px-3 pb-3 pt-5 text-center">
        <div
          className="font-serif-display leading-tight"
          style={{
            color: book.coverAccent,
            fontSize: undefined,
          }}
        >
          <span
            className={`${titleSizes[size]} block uppercase tracking-[0.18em]`}
            style={{ textShadow: '0 1px 1px rgba(0,0,0,0.5)' }}
          >
            {book.title}
          </span>
        </div>

        <div
          className="text-gold-shimmer opacity-80"
          style={{ fontSize: size === 'sm' ? 6 : size === 'md' ? 8 : 10 }}
          aria-hidden="true"
        >
          ❦
        </div>

        <div>
          <div
            className={`${authorSizes[size]} font-sans-quiet uppercase tracking-[0.2em] text-parchment/70`}
          >
            {book.author}
          </div>
          <div
            className={`${authorSizes[size]} font-sans-quiet tracking-wider text-parchment/40`}
          >
            {book.year}
          </div>
        </div>
      </div>

      {/* top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
    </div>
  );
}
