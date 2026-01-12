import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    rounded-md font-semibold tracking-wide
    transition-all duration-200
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
    disabled:opacity-40 disabled:cursor-not-allowed
    overflow-hidden uppercase
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-b from-[var(--blood-red)] to-[var(--blood-dark)]
      text-white border border-[var(--blood-red)]
      hover:shadow-[0_0_30px_var(--red-glow-strong)]
      hover:scale-[1.02] hover:brightness-110
      active:scale-[0.98]
      focus-visible:outline-[var(--blood-red)]
      before:absolute before:inset-0 
      before:bg-gradient-to-t before:from-transparent before:to-white/10
      before:opacity-0 before:transition-opacity before:duration-200
      hover:before:opacity-100
      animate-flicker-red
    `,
    secondary: `
      bg-transparent border-2 border-[var(--blood-red)]
      text-[var(--blood-red)]
      hover:bg-[var(--blood-red)]/10
      hover:shadow-[0_0_25px_var(--red-glow)]
      hover:scale-[1.02]
      active:scale-[0.98]
      focus-visible:outline-[var(--blood-red)]
      animate-flicker-red
    `,
    ghost: `
      bg-transparent
      text-[var(--ash-gray)]
      hover:bg-white/5 hover:text-white
      active:bg-white/10
      focus-visible:outline-[var(--ash-gray)]
    `,
    danger: `
      bg-gradient-to-b from-[var(--ember-orange)] to-[var(--ember-dark)]
      text-white border border-[var(--ember-orange)]
      hover:shadow-[0_0_30px_var(--ember-glow)]
      hover:scale-[1.02] hover:brightness-110
      active:scale-[0.98]
      focus-visible:outline-[var(--ember-orange)]
      animate-ember-glow
    `,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
