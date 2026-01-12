import { CrackPattern, Tendril } from './icons';

interface StagePortalProps {
  stageNumber: number;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function StagePortal({
  stageNumber,
  label,
  isSelected,
  onClick,
  difficulty,
}: StagePortalProps) {
  const difficultyColors = {
    easy: {
      glow: 'var(--ash-darker)',
      intensity: 'rgba(90, 90, 90, 0.3)',
    },
    medium: {
      glow: 'var(--ember-orange)',
      intensity: 'rgba(255, 106, 61, 0.4)',
    },
    hard: {
      glow: stageNumber === 1 ? '#DC143C' : '#8B0000',
      intensity: stageNumber === 1 ? 'rgba(220, 20, 60, 0.5)' : 'rgba(139, 0, 0, 0.5)',
    },
  };

  const color = difficultyColors[difficulty];

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full aspect-[4/5] rounded-xl overflow-hidden
        transition-all duration-500
        ${isSelected ? 'scale-105' : 'scale-100 hover:scale-102'}
        ${isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100'}
      `}
      style={{
        filter: isSelected
          ? `drop-shadow(0 0 40px ${color.glow})`
          : `drop-shadow(0 0 20px ${color.intensity})`,
      }}
    >
      {/* Base gradient background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
        }`}
        style={{
          background: `
            radial-gradient(ellipse at center, ${color.intensity} 0%, transparent 70%),
            radial-gradient(ellipse at 30% 40%, rgba(0, 0, 0, 0.9) 0%, #000000 50%),
            linear-gradient(180deg, #0A0A0A 0%, #000000 100%)
          `,
        }}
      />

      {/* Animated fog layer */}
      <div
        className={`
          absolute inset-0 opacity-40 transition-all duration-700
          ${isSelected ? 'opacity-70' : 'group-hover:opacity-60'}
        `}
        style={{
          background: `
            radial-gradient(ellipse at 50% 60%, ${color.intensity} 0%, transparent 60%),
            radial-gradient(ellipse at 30% 30%, ${color.intensity} 0%, transparent 50%)
          `,
          animation: isSelected ? 'fog-drift 15s ease-in-out infinite' : 'fog-drift 20s ease-in-out infinite',
        }}
      />

      {/* Crack overlay borders */}
      <div
        className={`absolute top-0 left-0 right-0 h-2 opacity-50 transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'group-hover:opacity-80'
        }`}
        style={{ color: color.glow }}
      >
        <CrackPattern className="w-full h-full" />
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-2 opacity-50 rotate-180 transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'group-hover:opacity-80'
        }`}
        style={{ color: color.glow }}
      >
        <CrackPattern className="w-full h-full" />
      </div>

      {/* Left and right tendrils */}
      <div
        className={`absolute top-10 left-4 opacity-20 transition-all duration-500 ${
          isSelected ? 'opacity-40' : 'group-hover:opacity-30'
        }`}
        style={{ color: color.glow }}
      >
        <Tendril className="w-20 h-32" />
      </div>
      <div
        className={`absolute bottom-10 right-4 opacity-20 rotate-180 transition-all duration-500 ${
          isSelected ? 'opacity-40' : 'group-hover:opacity-30'
        }`}
        style={{ color: color.glow }}
      >
        <Tendril className="w-20 h-32" />
      </div>

      {/* Center portal gateway */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Outer rotating ring */}
        <div
          className={`absolute transition-all duration-700 ${
            isSelected ? 'scale-110' : 'scale-100 group-hover:scale-105'
          }`}
        >
          <svg width="280" height="280" viewBox="0 0 280 280" className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <circle
              cx="140"
              cy="140"
              r="130"
              fill="none"
              stroke={color.glow}
              strokeWidth="2"
              opacity={isSelected ? "0.6" : "0.3"}
              strokeDasharray="20 15"
              className="transition-opacity duration-500"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 140 140"
                to="360 140 140"
                dur={isSelected ? "20s" : "30s"}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="140"
              cy="140"
              r="110"
              fill="none"
              stroke={color.glow}
              strokeWidth="1.5"
              opacity={isSelected ? "0.4" : "0.2"}
              strokeDasharray="15 10"
              className="transition-opacity duration-500"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 140 140"
                to="0 140 140"
                dur={isSelected ? "18s" : "25s"}
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Center gateway glow */}
        <div
          className={`
            relative rounded-full transition-all duration-700
            ${isSelected ? 'w-44 h-44' : 'w-40 h-40 group-hover:w-42 group-hover:h-42'}
          `}
          style={{
            background: `radial-gradient(circle, ${color.intensity} 0%, transparent 70%)`,
            boxShadow: isSelected
              ? `inset 0 0 60px ${color.glow}, 0 0 80px ${color.glow}`
              : `inset 0 0 40px ${color.intensity}, 0 0 50px ${color.intensity}`,
          }}
        >
          {/* Stage number & label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className={`
                text-6xl font-bold mb-2 transition-all duration-500
                ${isSelected ? 'animate-flicker-red' : ''}
              `}
              style={{
                fontFamily: 'Cinzel, serif',
                color: isSelected ? color.glow : '#8A8A8A',
                textShadow: isSelected
                  ? `0 0 20px ${color.glow}, 0 0 40px ${color.glow}`
                  : 'none',
              }}
            >
              {stageNumber}
            </div>
            <div
              className="text-sm uppercase tracking-widest font-semibold transition-colors duration-500"
              style={{
                color: isSelected ? color.glow : '#5A5A5A',
              }}
            >
              {label}
            </div>
          </div>
        </div>

        {/* Floating corruption particles */}
        {isSelected && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  left: 20 + Math.random() * 60 + '%',
                  top: 20 + Math.random() * 60 + '%',
                  backgroundColor: color.glow,
                  opacity: Math.random() * 0.4 + 0.2,
                  animation: `float-particles ${Math.random() * 8 + 6}s linear infinite`,
                  animationDelay: Math.random() * 3 + 's',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Border glow on selected */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none border-2 animate-pulse-red"
          style={{
            borderColor: color.glow,
            boxShadow: `inset 0 0 30px ${color.intensity}`,
          }}
        />
      )}
    </button>
  );
}