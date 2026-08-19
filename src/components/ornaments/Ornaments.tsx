import type { CSSProperties } from 'react';

/**
 * Decorative ornaments inspired by old book typography.
 * Used sparingly for dividers and section flourishes.
 */

export function OrnamentDivider({
  className = '',
  width = '100%',
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={`ornament-divider ${className}`}
      style={{ width }}
      aria-hidden="true"
    >
      <span className="text-gold text-xs tracking-[0.4em]">❦</span>
    </div>
  );
}

export function OrnamentFleuron({
  className = '',
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`text-gold ${className}`}
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      ❦
    </span>
  );
}

export function OrnamentFlourish({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={`text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      <path
        d="M2 12 Q 20 4, 40 12 T 78 12"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M118 12 Q 100 4, 80 12 T 42 12"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="60" cy="12" r="2.2" fill="currentColor" opacity="0.9" />
      <path
        d="M52 12 Q 56 7, 60 12 Q 64 17, 68 12"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function CornerFlourish({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden="true"
    >
      <path
        d="M2 38 Q 2 14, 14 8 Q 22 4, 28 6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M6 38 Q 6 18, 16 12"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="28" cy="6" r="1.3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function Crest({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
    >
      {/* shield outline */}
      <path
        d="M16 3 L27 6 V16 Q27 24 16 29 Q5 24 5 16 V6 Z"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* open book inside */}
      <path
        d="M10 14 Q13 12, 16 14 Q19 12, 22 14 L22 20 Q19 18, 16 20 Q13 18, 10 20 Z"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <line x1="16" y1="14" x2="16" y2="20" opacity="0.7" />
      <circle cx="16" cy="7" r="1" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
