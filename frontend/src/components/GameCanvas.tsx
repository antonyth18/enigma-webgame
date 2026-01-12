import { CrackPattern, DeadTree, RadioTower, Tendril } from './icons';

export function GameCanvas() {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-[var(--void-black)] rounded-lg overflow-hidden border-2 border-[var(--blood-red)]/30">
      {/* Atmospheric background gradient */}
      <div className="absolute inset-0 upside-down-gradient" />
      
      {/* Fog layers */}
      <div className="absolute inset-0 fog-overlay" />

      {/* Dimensional cracks border */}
      <div className="absolute top-0 left-0 right-0 h-1 text-[var(--blood-red)] opacity-60">
        <CrackPattern className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 text-[var(--blood-red)] opacity-60 rotate-180">
        <CrackPattern className="w-full h-full" />
      </div>

      {/* Silhouetted scenery */}
      <div className="absolute bottom-0 left-10 opacity-20">
        <DeadTree className="w-20 h-40 text-black" />
      </div>
      <div className="absolute bottom-0 left-32 opacity-15">
        <DeadTree className="w-16 h-32 text-black" style={{ transform: 'scaleX(-1)' }} />
      </div>
      <div className="absolute bottom-0 right-20 opacity-25">
        <RadioTower className="w-24 h-48 text-black" />
      </div>

      {/* Tendrils/vines */}
      <div className="absolute top-10 right-10 opacity-30 text-[var(--blood-red)]">
        <Tendril className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-25 text-[var(--ember-orange)] rotate-180">
        <Tendril className="w-28 h-28" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: Math.random() > 0.5 ? 'var(--blood-red)' : 'var(--ember-orange)',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float-particles ${Math.random() * 10 + 8}s linear infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      {/* Center portal/gateway visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Outer rings */}
          <div className="absolute inset-0 animate-pulse-red">
            <svg width="300" height="300" viewBox="0 0 300 300">
              <circle
                cx="150"
                cy="150"
                r="140"
                fill="none"
                stroke="var(--blood-red)"
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="20 10"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 150 150"
                  to="360 150 150"
                  dur="30s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="var(--ember-orange)"
                strokeWidth="1.5"
                opacity="0.2"
                strokeDasharray="15 8"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 150 150"
                  to="0 150 150"
                  dur="25s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* Center glow */}
          <div
            className="w-48 h-48 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(229, 9, 20, 0.2) 0%, transparent 70%)',
              boxShadow: 'inset 0 0 60px var(--red-glow), 0 0 80px var(--red-glow)',
            }}
          >
            <div className="text-center">
              <p className="text-sm text-[var(--blood-red)] font-bold uppercase tracking-widest mb-2 animate-flicker-red">
                Dimensional Rift
              </p>
              <p className="text-xs text-[var(--ash-dim)]">
                Solve challenges to close the portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <div className="flex items-center gap-3 bg-[var(--void-dark)]/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-[var(--blood-red)]/30">
          <div className="w-2 h-2 bg-[var(--blood-red)] rounded-full animate-pulse-red shadow-[0_0_10px_var(--red-glow)]" />
          <span className="text-sm text-[var(--ash-gray)] font-semibold uppercase tracking-wide">
            Portal Stability: 67%
          </span>
        </div>
      </div>
    </div>
  );
}
