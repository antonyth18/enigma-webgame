import { HUD } from './HUD';
import { GameCanvas } from './GameCanvas';
import { QuestionPanel } from './QuestionPanel';
import { Card, CardContent } from './Card';
import { PillTag } from './PillTag';
import { CodeIcon, StarIcon, TrophyIcon } from './icons';

export function DashboardCompact() {
  return (
    <div className="min-h-screen bg-[var(--bg-void)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--bg-void-lighter)] border-r border-[var(--border-default)] p-6 flex flex-col gap-6">
        {/* Progress */}
        <div>
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--neon-magenta)] rounded-full" />
            Your Progress
          </h5>
          <div className="space-y-3">
            <ProgressItem
              icon={<StarIcon className="w-4 h-4" />}
              label="Questions Solved"
              value="12/50"
              percentage={24}
              color="magenta"
            />
            <ProgressItem
              icon={<TrophyIcon className="w-4 h-4" />}
              label="Current Level"
              value="3"
              percentage={60}
              color="cyan"
            />
            <ProgressItem
              icon={<CodeIcon className="w-4 h-4" />}
              label="Accuracy"
              value="85%"
              percentage={85}
              color="green"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--neon-cyan)] rounded-full" />
            Categories
          </h5>
          <div className="space-y-2">
            <CategoryItem label="Arrays" count={5} completed={3} />
            <CategoryItem label="Strings" count={4} completed={2} />
            <CategoryItem label="Trees" count={6} completed={1} />
            <CategoryItem label="Graphs" count={5} completed={0} />
            <CategoryItem label="Dynamic Programming" count={8} completed={0} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-auto">
          <Card variant="bordered" className="p-4">
            <p className="text-xs text-[var(--text-dim)] mb-2">Daily Streak</p>
            <p className="text-2xl font-bold text-[var(--neon-orange)] mb-1">7 🔥</p>
            <p className="text-xs text-[var(--text-secondary)]">Keep it up!</p>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* HUD */}
        <div className="p-6 border-b border-[var(--border-default)]">
          <HUD
            timeRemaining="15:42"
            score={2450}
            level={3}
            lives={2}
          />
        </div>

        {/* Game Area */}
        <div className="flex-1 grid grid-cols-2 gap-6 p-6">
          {/* Canvas */}
          <div className="col-span-1">
            <GameCanvas />
          </div>

          {/* Question Panel */}
          <div className="col-span-1">
            <QuestionPanel variant="panel" />
          </div>
        </div>
      </main>
    </div>
  );
}

interface ProgressItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  percentage: number;
  color: 'magenta' | 'cyan' | 'green';
}

function ProgressItem({ icon, label, value, percentage, color }: ProgressItemProps) {
  const colorClasses = {
    magenta: 'text-[var(--neon-magenta)]',
    cyan: 'text-[var(--neon-cyan)]',
    green: 'text-[var(--neon-green)]',
  };

  const bgClasses = {
    magenta: 'bg-[var(--neon-magenta)]',
    cyan: 'bg-[var(--neon-cyan)]',
    green: 'bg-[var(--neon-green)]',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={colorClasses[color]}>{icon}</span>
          <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        </div>
        <span className={`text-sm font-medium ${colorClasses[color]}`}>
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-[var(--bg-void)] rounded-full overflow-hidden">
        <div
          className={`h-full ${bgClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface CategoryItemProps {
  label: string;
  count: number;
  completed: number;
}

function CategoryItem({ label, count, completed }: CategoryItemProps) {
  const isActive = completed > 0;
  
  return (
    <button
      className={`
        w-full p-3 rounded-lg text-left
        border transition-all duration-200
        ${isActive
          ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5 hover:bg-[var(--neon-cyan)]/10'
          : 'border-[var(--border-default)] hover:border-[var(--neon-cyan)]/50 hover:bg-white/5'
        }
      `}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
          {label}
        </span>
        <PillTag variant="neutral" size="sm">
          {completed}/{count}
        </PillTag>
      </div>
      {isActive && (
        <div className="h-1 bg-[var(--bg-void)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--neon-cyan)]"
            style={{ width: `${(completed / count) * 100}%` }}
          />
        </div>
      )}
    </button>
  );
}
