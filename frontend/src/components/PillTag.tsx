import { ReactNode } from 'react';

type PillVariant = 'easy' | 'medium' | 'hard' | 'extreme' | 'neutral';
type PillSize = 'sm' | 'md' | 'lg';

interface PillTagProps {
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  icon?: ReactNode;
}

export function PillTag({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon,
}: PillTagProps) {
  const baseStyles = `
    inline-flex items-center gap-1.5
    rounded-full
    font-semibold uppercase tracking-wide
    transition-all duration-200
    whitespace-nowrap
    border
  `;

  const variantStyles = {
    easy: `
      bg-[var(--ash-darker)]/30
      text-[var(--ash-gray)]
      border-[var(--ash-darker)]
    `,
    medium: `
      bg-[var(--ember-orange)]/10
      text-[var(--ember-orange)]
      border-[var(--ember-orange)]/40
      shadow-[0_0_10px_var(--ember-glow)]
    `,
    hard: `
      bg-[var(--blood-red)]/10
      text-[var(--blood-red)]
      border-[var(--blood-red)]/40
      shadow-[0_0_10px_var(--red-glow)]
    `,
    extreme: `
      bg-[var(--blood-dark)]/20
      text-[var(--blood-red)]
      border-[var(--blood-dark)]
      shadow-[0_0_15px_var(--red-glow-strong)]
      animate-pulse-red
    `,
    neutral: `
      bg-white/5
      text-[var(--ash-dim)]
      border-white/10
    `,
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0 w-3.5 h-3.5">{icon}</span>}
      {children}
    </span>
  );
}
