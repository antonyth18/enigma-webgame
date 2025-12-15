import { ReactNode, useEffect } from 'react';
import { CloseIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showClose?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop with fog and blur */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md">
        {/* Upside Down fog effect */}
        <div className="absolute inset-0 fog-overlay" />
        
        {/* Particle noise */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--blood-red)] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particles ${5 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal content */}
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          bg-[var(--void-darker)]/95
          border-2 border-[var(--blood-red)]/30
          rounded-lg
          animate-scale-in-fog
          max-h-[90vh] overflow-y-auto
        `}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: 'inset 0 0 60px rgba(229, 9, 20, 0.15), 0 0 40px rgba(229, 9, 20, 0.3)',
        }}
      >
        {/* Red inner glow effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(229, 9, 20, 0.05) 100%)',
          }}
        />

        {/* Header */}
        {(title || showClose) && (
          <div className="relative flex items-center justify-between p-6 border-b border-[var(--blood-red)]/20">
            {title && (
              <h3
                id="modal-title"
                className="text-[var(--ash-gray)] flex items-center gap-3 font-bold uppercase tracking-wide"
              >
                <span className="w-1 h-6 bg-gradient-to-b from-[var(--blood-red)] to-[var(--ember-orange)] rounded-full shadow-[0_0_8px_var(--red-glow)]" />
                {title}
              </h3>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="
                  ml-auto p-2 rounded-lg
                  text-[var(--ash-dim)]
                  hover:text-[var(--blood-red)]
                  hover:bg-[var(--blood-red)]/10
                  hover:shadow-[0_0_15px_var(--red-glow)]
                  transition-all duration-200
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--blood-red)]
                "
                aria-label="Close modal"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="relative p-6">{children}</div>
      </div>
    </div>
  );
}
