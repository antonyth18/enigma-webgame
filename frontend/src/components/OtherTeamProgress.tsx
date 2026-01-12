interface Progress {
  totalPoints: number;
  completedQuestions: number;
  totalQuestions: number;
}

interface OtherTeamProgressProps {
  progress: Progress | null;
  worldName: string;
  accentColor: string;
}

export function OtherTeamProgress({ progress, worldName, accentColor }: OtherTeamProgressProps) {
  if (!progress) return null;

  const completionPercentage = progress.totalQuestions > 0 
    ? Math.round((progress.completedQuestions / progress.totalQuestions) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div
        className="relative rounded-xl p-6 border-2 overflow-hidden"
        style={{
          borderColor: `${accentColor}40`,
          background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 100%)`,
          boxShadow: `0 0 30px ${accentColor}20`,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}30 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 10px ${accentColor}`,
                }}
              />
              <h3 className="text-lg font-bold text-[var(--ash-gray)] uppercase tracking-wide">
                Rival Team Progress
              </h3>
              <span
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{
                  color: accentColor,
                  backgroundColor: `${accentColor}20`,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {worldName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 100 100"
                fill="currentColor"
                style={{ color: accentColor }}
              >
                <path d="M 50 10 L 60 38 L 90 38 L 66 56 L 76 84 L 50 66 L 24 84 L 34 56 L 10 38 L 40 38 Z" />
              </svg>
              <span className="text-xl font-bold" style={{ color: accentColor }}>
                {progress.totalPoints}
              </span>
              <span className="text-sm text-[var(--ash-dim)]">points</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--ash-dim)] uppercase tracking-wide">
                Puzzles Solved
              </span>
              <span className="text-xs font-bold text-[var(--ash-gray)]">
                {progress.completedQuestions} / {progress.totalQuestions}
              </span>
            </div>
            <div className="h-2 bg-[var(--void-dark)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completionPercentage}%`,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 10px ${accentColor}`,
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-xs text-[var(--ash-dim)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--ash-gray)]" />
              <span>Completion: <span className="font-bold text-[var(--ash-gray)]">{completionPercentage}%</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <span>Status: <span className="font-bold" style={{ color: accentColor }}>Active</span></span>
            </div>
          </div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '2px',
                height: '2px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                backgroundColor: accentColor,
                opacity: Math.random() * 0.3 + 0.1,
                animation: `float-particles ${Math.random() * 10 + 8}s linear infinite`,
                animationDelay: Math.random() * 5 + 's',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
