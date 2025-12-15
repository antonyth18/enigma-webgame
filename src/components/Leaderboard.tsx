import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { TrophyIcon, SkullIcon, StarIcon } from './icons';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  challengesSolved: number;
  timeCompleted: string;
  isCurrentUser?: boolean;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'ShadowCoder', score: 15200, challengesSolved: 45, timeCompleted: '12:34' },
  { rank: 2, username: 'DarkKnight', score: 14500, challengesSolved: 42, timeCompleted: '14:22' },
  { rank: 3, username: 'VoidWalker', score: 13800, challengesSolved: 40, timeCompleted: '15:18' },
  { rank: 4, username: 'CrimsonHacker', score: 12900, challengesSolved: 38, timeCompleted: '16:45' },
  { rank: 5, username: 'NetherByte', score: 11200, challengesSolved: 35, timeCompleted: '18:12' },
  { rank: 6, username: 'EclipseRunner', score: 10500, challengesSolved: 33, timeCompleted: '19:08' },
  { rank: 7, username: 'PhantomDev', score: 9800, challengesSolved: 30, timeCompleted: '20:34' },
  { rank: 8, username: 'Survivor', score: 8900, challengesSolved: 28, timeCompleted: '21:56', isCurrentUser: true },
  { rank: 9, username: 'GlitchMaster', score: 8200, challengesSolved: 25, timeCompleted: '23:15' },
  { rank: 10, username: 'CodeReaper', score: 7500, challengesSolved: 22, timeCompleted: '25:40' },
];

export function Leaderboard() {
  return (
    <div className="min-h-screen bg-[var(--void-black)] upside-down-gradient p-8 relative overflow-hidden">
      {/* VHS grain */}
      <div className="vhs-grain" />
      
      {/* Fog overlay */}
      <div className="fog-overlay" />

      {/* Background silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 opacity-10">
        <svg viewBox="0 0 1440 400" fill="black">
          <path d="M0,200 Q360,150 720,200 T1440,200 L1440,400 L0,400 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <TrophyIcon className="w-16 h-16 text-[var(--blood-red)] animate-pulse-red" />
            <h2 className="text-[var(--blood-red)]" style={{ fontFamily: 'Cinzel, serif' }}>
              SURVIVORS LEADERBOARD
            </h2>
          </div>
          <p className="text-[var(--ash-gray)]">
            Those who escaped the Upside Down and lived to code another day
          </p>
        </div>

        {/* Leaderboard Card */}
        <Card variant="glow">
          <CardHeader>
            <CardTitle accent>Global Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm text-[var(--ash-dim)] border-b border-[var(--blood-red)]/20 uppercase tracking-wide">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Survivor</div>
                <div className="col-span-2 text-right">Score</div>
                <div className="col-span-2 text-center">Solved</div>
                <div className="col-span-3 text-right">Best Time</div>
              </div>

              {/* Leaderboard Entries */}
              {mockLeaderboard.map((entry) => (
                <LeaderboardRow key={entry.rank} entry={entry} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <StatsCard
            title="Total Survivors"
            value="1,847"
            subtitle="Escaped"
            icon={<StarIcon className="w-8 h-8" />}
          />
          <StatsCard
            title="Avg Escape Time"
            value="19:42"
            subtitle="Minutes"
            icon={<SkullIcon className="w-8 h-8" />}
            danger
          />
          <StatsCard
            title="Portal Breaches"
            value="456"
            subtitle="Today"
            icon={<TrophyIcon className="w-8 h-8" />}
          />
        </div>
      </div>
    </div>
  );
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

function LeaderboardRow({ entry }: LeaderboardRowProps) {
  const isTopThree = entry.rank <= 3;
  const isPodium = {
    1: 'bg-gradient-to-r from-[var(--blood-red)]/20 to-transparent border-l-4 border-[var(--blood-red)]',
    2: 'bg-gradient-to-r from-[var(--ember-orange)]/15 to-transparent border-l-4 border-[var(--ember-orange)]',
    3: 'bg-gradient-to-r from-[var(--blood-dark)]/10 to-transparent border-l-4 border-[var(--blood-dark)]',
  };

  return (
    <div
      className={`
        grid grid-cols-12 gap-4 px-6 py-4 rounded-lg
        transition-all duration-300
        ${entry.isCurrentUser ? 'bg-[var(--blood-red)]/10 border-2 border-[var(--blood-red)]/50' : ''}
        ${!entry.isCurrentUser && isTopThree ? isPodium[entry.rank as 1 | 2 | 3] : ''}
        ${!entry.isCurrentUser && !isTopThree ? 'hover:bg-[var(--blood-red)]/5 hover:border-l-2 hover:border-[var(--blood-red)]/30' : ''}
      `}
      style={
        entry.isCurrentUser
          ? { boxShadow: '0 0 20px var(--red-glow)' }
          : undefined
      }
    >
      {/* Rank */}
      <div className="col-span-1 flex items-center">
        {isTopThree ? (
          <div className="flex items-center gap-2">
            <TrophyIcon
              className={`w-6 h-6 ${
                entry.rank === 1
                  ? 'text-[var(--blood-red)] animate-pulse-red'
                  : entry.rank === 2
                  ? 'text-[var(--ember-orange)]'
                  : 'text-[var(--blood-dark)]'
              }`}
            />
            <span
              className={`text-lg font-bold ${
                entry.rank === 1
                  ? 'text-[var(--blood-red)]'
                  : entry.rank === 2
                  ? 'text-[var(--ember-orange)]'
                  : 'text-[var(--blood-dark)]'
              }`}
            >
              {entry.rank}
            </span>
          </div>
        ) : (
          <span className="text-[var(--ash-dim)] font-semibold">{entry.rank}</span>
        )}
      </div>

      {/* Username */}
      <div className="col-span-4 flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            entry.isCurrentUser
              ? 'bg-gradient-to-br from-[var(--blood-red)] to-[var(--ember-orange)] text-white shadow-[0_0_15px_var(--red-glow)]'
              : 'bg-[var(--void-surface)] text-[var(--ash-dim)]'
          }`}
        >
          {entry.username[0]}
        </div>
        <span
          className={`font-semibold ${
            entry.isCurrentUser ? 'text-[var(--blood-red)]' : 'text-[var(--ash-gray)]'
          }`}
        >
          {entry.username}
          {entry.isCurrentUser && (
            <span className="ml-2 text-xs text-[var(--ember-orange)]">(You)</span>
          )}
        </span>
      </div>

      {/* Score */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <StarIcon className="w-4 h-4 text-[var(--ember-orange)]" />
        <span className="text-[var(--ember-orange)] font-bold">
          {entry.score.toLocaleString()}
        </span>
      </div>

      {/* Challenges Solved */}
      <div className="col-span-2 flex items-center justify-center">
        <span className="px-3 py-1 bg-[var(--blood-red)]/10 border border-[var(--blood-red)]/30 rounded-full text-sm text-[var(--ash-gray)] font-semibold">
          {entry.challengesSolved}
        </span>
      </div>

      {/* Time */}
      <div className="col-span-3 flex items-center justify-end">
        <span className="text-[var(--ash-dim)] font-mono text-sm">
          {entry.timeCompleted}
        </span>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  danger?: boolean;
}

function StatsCard({ title, value, subtitle, icon, danger = false }: StatsCardProps) {
  return (
    <Card variant="default" className="text-center">
      <div className="flex justify-center mb-3">
        <div
          className={`${
            danger ? 'text-[var(--blood-red)]' : 'text-[var(--ember-orange)]'
          }`}
        >
          {icon}
        </div>
      </div>
      <p className="text-sm text-[var(--ash-dim)] uppercase tracking-wide mb-2">{title}</p>
      <p
        className={`text-3xl font-bold mb-1 ${
          danger ? 'text-[var(--blood-red)]' : 'text-[var(--ember-orange)]'
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-[var(--ash-darker)]">{subtitle}</p>
    </Card>
  );
}
