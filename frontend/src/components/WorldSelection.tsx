import { Lock } from 'lucide-react';

interface WorldSelectionProps {
  onSelectWorld: (worldId: string) => void;
  lockedWorld: string | null;
  otherTeamWorld: string | null;
}

export function WorldSelection({ onSelectWorld, lockedWorld, otherTeamWorld }: WorldSelectionProps) {
  const worlds = [
    {
      id: 'upside-down',
      title: 'ESCAPE THE UPSIDE DOWN',
      description: 'Navigate through corrupted dimensions. Face the darkness of the Upside Down.',
      color: '#E50914',
      gradient: 'linear-gradient(135deg, rgba(229, 9, 20, 0.2) 0%, rgba(139, 0, 0, 0.1) 100%)',
      glow: 'rgba(229, 9, 20, 0.5)',
    },
    {
      id: 'hawkins-lab',
      title: 'ESCAPE THE HAWKINS LAB',
      description: 'Infiltrate the secret facility. Uncover the experiments hidden in the shadows.',
      color: '#FFA500',
      gradient: 'linear-gradient(135deg, rgba(255, 165, 0, 0.2) 0%, rgba(184, 134, 11, 0.1) 100%)',
      glow: 'rgba(255, 165, 0, 0.5)',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--void-black)] relative overflow-hidden">
      {/* VHS Grain */}
      <div className="vhs-grain" />

      {/* Background */}
      <div className="fixed inset-0 upside-down-gradient -z-10" />
      <div className="fixed inset-0 fog-overlay -z-10" />

      {/* Content */}
      <div className="relative z-10 px-12 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full bg-[var(--blood-red)]/20 flex items-center justify-center border-2 border-[var(--blood-red)] animate-pulse-red"
              style={{ boxShadow: '0 0 30px var(--red-glow-strong)' }}
            >
              <div className="w-6 h-6 rounded-full bg-[var(--blood-red)]" />
            </div>
          </div>

          <h1
            className="text-6xl text-[var(--blood-red)] mb-4 animate-flicker-red"
            style={{
              fontFamily: 'Cinzel, serif',
              textShadow: 'var(--glow-red-strong)',
            }}
          >
            CHOOSE YOUR GATEWAY
          </h1>
          <p className="text-lg text-[var(--ash-gray)] max-w-3xl mx-auto leading-relaxed">
            Two parallel dimensions await. Choose your path carefully - once you enter, there is no turning back.
            {otherTeamWorld && (
              <span className="block mt-4 text-[var(--ember-orange)]">
                Your rival team has entered: <span className="font-bold">{worlds.find(w => w.id === otherTeamWorld)?.title}</span>
              </span>
            )}
          </p>
        </div>

        {/* World Selection Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
          {worlds.map((world) => {
            const isLocked = lockedWorld && lockedWorld !== world.id;
            
            return (
              <button
                key={world.id}
                onClick={() => !isLocked && onSelectWorld(world.id)}
                disabled={isLocked}
                className={`
                  relative group rounded-xl overflow-hidden border-2 p-8 min-h-[400px]
                  transition-all duration-500
                  ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
                `}
                style={{
                  background: world.gradient,
                  borderColor: world.color,
                  boxShadow: isLocked ? 'none' : `0 0 40px ${world.glow}`,
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(ellipse at center, ${world.glow} 0%, transparent 70%)`,
                    animation: 'fog-drift 15s ease-in-out infinite',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                  <h2
                    className="text-4xl mb-6 animate-flicker-red"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      color: world.color,
                      textShadow: `0 0 20px ${world.glow}`,
                    }}
                  >
                    {world.title}
                  </h2>

                  <p className="text-[var(--ash-gray)] mb-8 leading-relaxed max-w-md">
                    {world.description}
                  </p>

                  {!isLocked ? (
                    <div
                      className="px-6 py-3 rounded-lg border-2 font-bold uppercase tracking-widest text-sm transition-all duration-300"
                      style={{
                        borderColor: world.color,
                        color: world.color,
                        backgroundColor: `${world.color}20`,
                        boxShadow: `0 0 20px ${world.glow}`,
                      }}
                    >
                      Enter Gateway
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-[var(--ash-darker)]/40 border-2 border-[var(--ash-darker)] flex items-center justify-center">
                        <Lock className="w-8 h-8 text-[var(--ash-darker)]" />
                      </div>
                      <p className="text-sm text-[var(--ash-darker)] font-bold uppercase">
                        Gateway Sealed
                      </p>
                    </div>
                  )}
                </div>

                {/* Particles */}
                {!isLocked && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          width: Math.random() * 4 + 2 + 'px',
                          height: Math.random() * 4 + 2 + 'px',
                          left: Math.random() * 100 + '%',
                          top: Math.random() * 100 + '%',
                          backgroundColor: world.color,
                          opacity: Math.random() * 0.4 + 0.2,
                          animation: `float-particles ${Math.random() * 8 + 6}s linear infinite`,
                          animationDelay: Math.random() * 3 + 's',
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Warning */}
        <div className="mt-16 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-[var(--void-dark)]/80 border border-[var(--blood-red)]/30 backdrop-blur-sm"
            style={{ boxShadow: 'inset 0 0 30px rgba(229, 9, 20, 0.1)' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="text-[var(--blood-red)] animate-pulse-red"
            >
              <path d="M 50 10 L 90 85 L 10 85 Z" />
              <rect x="46" y="35" width="8" height="25" rx="2" fill="var(--void-black)" />
              <circle cx="50" cy="70" r="5" fill="var(--void-black)" />
            </svg>
            <p className="text-sm text-[var(--ash-gray)]">
              <span className="font-bold text-[var(--blood-red)]">Warning:</span> Once you choose a gateway, it cannot be changed. Choose wisely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
