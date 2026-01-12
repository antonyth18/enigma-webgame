import { ReactNode } from 'react';

type CardVariant = 'default' | 'glow' | 'ghost';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'default',
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  const baseStyles = `
    rounded-lg p-6
    transition-all duration-300
    relative
  `;

  const variantStyles = {
    default: `
      bg-[var(--void-surface)]
      border border-[var(--ash-darker)]/30
    `,
    glow: `
      bg-[var(--void-surface)]
      border border-[var(--blood-red)]/40
      shadow-[0_0_20px_var(--red-glow)]
    `,
    ghost: `
      bg-transparent
      border border-[var(--ash-darker)]/20
    `,
  };

  const hoverStyles = hover
    ? `
      cursor-pointer
      hover:border-[var(--blood-red)]/60
      hover:shadow-[0_0_30px_var(--red-glow)]
      hover:scale-[1.01]
      hover:-translate-y-1
    `
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${hoverStyles}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Subtle inner glow for depth */}
      {variant !== 'ghost' && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(229, 9, 20, 0.03) 0%, transparent 50%)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 pb-4 border-b border-[var(--blood-red)]/20 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}

export function CardTitle({ children, className = '', accent = false }: CardTitleProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {accent && (
        <span className="w-1 h-6 bg-gradient-to-b from-[var(--blood-red)] to-[var(--ember-orange)] rounded-full shadow-[0_0_8px_var(--red-glow)]" />
      )}
      <h4 className="text-[var(--ash-gray)] font-bold uppercase tracking-wide">
        {children}
      </h4>
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>;
}
