import { Card } from './Card';
import { HeartIcon, StarIcon, SkullIcon, LightningIcon, BrainIcon } from './icons';

interface SidebarProps {
  username?: string;
  health?: number;
  score?: number;
  level?: number;
}

export function Sidebar({
  username = 'Survivor',
  health = 75,
  score = 2450,
  level = 5,
}: SidebarProps) {
  return (
    <aside className="w-80 bg-[var(--void-dark)] border-r-2 border-[var(--blood-red)]/20 p-6 flex flex-col gap-6 relative overflow-hidden">
      {/* Background atmospheric effects */}
      <div className="absolute inset-0 fog-overlay opacity-20" />
      
      {/* Dead tree silhouettes */}
      <div className="absolute bottom-0 left-4 opacity-10">
        <div className="w-16 h-32 text-[var(--ash-darker)]">
          <svg viewBox="0 0 100 200" fill="currentColor">
            <path d="M 45 200 L 48 120 L 50 80 L 52 120 L 55 200 Z" />
            <path d="M 50 80 L 30 60 L 25 55" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M 50 80 L 70 65 L 75 62" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </div>
      </div>

      {/* Player Avatar Card */}
      <Card variant="glow" className="relative z-10">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar with red glow */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--blood-red)] to-[var(--ember-orange)] flex items-center justify-center border-4 border-[var(--blood-red)]/50 shadow-[0_0_30px_var(--red-glow-strong)] animate-pulse-red">
              <span className="text-4xl font-bold text-white">{username[0]}</span>
            </div>
            {/* Level badge */}
            <div className="absolute -bottom-2 -right-2 bg-[var(--ember-orange)] text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-[var(--void-dark)] shadow-[0_0_15px_var(--ember-glow)]">
              LVL {level}
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-bold text-[var(--ash-gray)] uppercase tracking-wide">
              {username}
            </h3>
            <p className="text-xs text-[var(--ash-dim)]">Code Warrior</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="relative z-10 space-y-3">
        <StatItem
          icon={<HeartIcon className="w-5 h-5" />}
          label="Health"
          value={health}
          max={100}
          color="blood"
        />
        <StatItem
          icon={<StarIcon className="w-5 h-5" />}
          label="Score"
          value={score}
          displayValue={score.toLocaleString()}
          color="ember"
        />
        <StatItem
          icon={<LightningIcon className="w-5 h-5" />}
          label="Streak"
          value={7}
          displayValue="7 Days"
          color="ember"
        />
      </div>

      {/* Quick Actions */}
      <Card variant="default" className="relative z-10">
        <h5 className="text-xs text-[var(--ash-dim)] uppercase tracking-widest mb-3">
          Quick Actions
        </h5>
        <div className="space-y-2">
          <ActionButton
            icon={<BrainIcon className="w-4 h-4" />}
            label="Daily Challenge"
            highlight
          />
          <ActionButton
            icon={<SkullIcon className="w-4 h-4" />}
            label="Boss Fight"
          />
        </div>
      </Card>

      {/* Warning Banner */}
      <div className="relative z-10 mt-auto">
        <div
          className="p-4 rounded-lg border-2 border-[var(--blood-red)]/40 bg-[var(--blood-red)]/5 animate-pulse-red"
          style={{ boxShadow: 'inset 0 0 20px rgba(229, 9, 20, 0.1)' }}
        >
          <div className="flex items-center gap-3">
            <SkullIcon className="w-6 h-6 text-[var(--blood-red)]" />
            <div>
              <p className="text-xs font-bold text-[var(--blood-red)] uppercase">
                Dimension Alert
              </p>
              <p className="text-xs text-[var(--ash-dim)] mt-1">
                The Upside Down grows stronger...
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  max?: number;
  displayValue?: string;
  color: 'blood' | 'ember';
}

function StatItem({ icon, label, value, max, displayValue, color }: StatItemProps) {
  const colorClasses = {
    blood: 'text-[var(--blood-red)]',
    ember: 'text-[var(--ember-orange)]',
  };

  const bgClasses = {
    blood: 'bg-[var(--blood-red)]',
    ember: 'bg-[var(--ember-orange)]',
  };

  const percentage = max ? (value / max) * 100 : 100;

  return (
    <div className="bg-[var(--void-surface)]/50 rounded-lg p-3 border border-[var(--ash-darker)]/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={colorClasses[color]}>{icon}</span>
          <span className="text-sm text-[var(--ash-dim)] uppercase tracking-wide">
            {label}
          </span>
        </div>
        <span className={`text-sm font-bold ${colorClasses[color]}`}>
          {displayValue || value}
        </span>
      </div>
      
      {max && (
        <div className="h-2 bg-[var(--void-dark)] rounded-full overflow-hidden">
          <div
            className={`h-full ${bgClasses[color]} transition-all duration-500 shadow-[0_0_8px_var(--red-glow)]`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}

function ActionButton({ icon, label, highlight = false }: ActionButtonProps) {
  return (
    <button
      className={`
        w-full flex items-center gap-3 p-3 rounded-lg
        transition-all duration-200
        ${
          highlight
            ? 'bg-[var(--blood-red)]/10 border border-[var(--blood-red)]/40 text-[var(--blood-red)] hover:shadow-[0_0_20px_var(--red-glow)]'
            : 'bg-[var(--void-surface)]/30 border border-[var(--ash-darker)]/30 text-[var(--ash-gray)] hover:border-[var(--blood-red)]/40 hover:bg-[var(--blood-red)]/5'
        }
        hover:scale-[1.02]
      `}
    >
      {icon}
      <span className="text-sm font-semibold uppercase tracking-wide">{label}</span>
    </button>
  );
}
