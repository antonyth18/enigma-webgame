import { ReactNode } from 'react';
import { TimerIcon, StarIcon, TrophyIcon } from './icons';

interface HUDProps {
  timeRemaining?: string;
  score?: number;
  level?: number;
  lives?: number;
  className?: string;
}

export function HUD({
  timeRemaining = '00:00',
  score = 0,
  level = 1,
  lives = 3,
  className = '',
}: HUDProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <HUDItem
        icon={<TimerIcon className="w-5 h-5" />}
        label="Time"
        value={timeRemaining}
        variant="cyan"
        pulse={true}
      />
      <HUDItem
        icon={<StarIcon className="w-5 h-5" />}
        label="Score"
        value={score.toLocaleString()}
        variant="magenta"
      />
      <HUDItem
        icon={<TrophyIcon className="w-5 h-5" />}
        label="Level"
        value={level.toString()}
        variant="purple"
      />
      <HUDItem
        label="Lives"
        value={
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`
                  w-2 h-2 rounded-full
                  ${i < lives 
                    ? 'bg-[var(--neon-green)] shadow-[0_0_8px_rgba(57,255,20,0.6)]' 
                    : 'bg-gray-600'
                  }
                `}
              />
            ))}
          </div>
        }
        variant="green"
      />
    </div>
  );
}

interface HUDItemProps {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  variant?: 'cyan' | 'magenta' | 'purple' | 'green';
  pulse?: boolean;
}

function HUDItem({ icon, label, value, variant = 'cyan', pulse = false }: HUDItemProps) {
  const variantColors = {
    cyan: 'text-[var(--neon-cyan)]',
    magenta: 'text-[var(--neon-magenta)]',
    purple: 'text-[var(--neon-purple)]',
    green: 'text-[var(--neon-green)]',
  };

  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-2
        bg-[var(--bg-void-lighter)]
        border border-[var(--border-default)]
        rounded-lg
        ${pulse ? 'animate-pulse-glow' : ''}
      `}
    >
      {icon && <span className={variantColors[variant]}>{icon}</span>}
      <div className="flex flex-col">
        <span className="text-xs text-[var(--text-dim)] uppercase tracking-wide">
          {label}
        </span>
        <span className={`font-semibold ${variantColors[variant]}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'cyan' | 'magenta' | 'green';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'cyan',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const variantColors = {
    cyan: 'bg-[var(--neon-cyan)]',
    magenta: 'bg-[var(--neon-magenta)]',
    green: 'bg-[var(--neon-green)]',
  };

  const variantGlow = {
    cyan: 'shadow-[0_0_10px_rgba(0,209,255,0.6)]',
    magenta: 'shadow-[0_0_10px_rgba(255,45,149,0.6)]',
    green: 'shadow-[0_0_10px_rgba(57,255,20,0.6)]',
  };

  return (
    <div className={className}>
      <div className="relative h-2 bg-[var(--bg-void-lighter)] rounded-full overflow-hidden border border-[var(--border-default)]">
        <div
          className={`
            absolute inset-y-0 left-0
            ${variantColors[variant]}
            ${variantGlow[variant]}
            transition-all duration-500 ease-out
            rounded-full
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-[var(--text-secondary)] text-right">
          {value} / {max}
        </div>
      )}
    </div>
  );
}
