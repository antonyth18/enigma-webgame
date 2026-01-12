import { CrackPattern, Tendril } from './icons/index.jsx';

export function StagePortalLab({
  stageNumber,
  label,
  isSelected,
  onClick,
  difficulty,
}) {
  const difficultyColors = {
    easy: {
      glow: '#B8860B',
      intensity: 'rgba(184, 134, 11, 0.3)',
    },
    medium: {
      glow: '#FFA500',
      intensity: 'rgba(255, 165, 0, 0.4)',
    },
    hard: {
      glow: stageNumber === 1 ? '#FFD700' : '#FF8C00',
      intensity: stageNumber === 1 ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 140, 0, 0.4)',
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
      {/* Base gradient background - lab theme */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
        }`}
        style={{
          background: `
            radial-gradient(ellipse at center, ${color.intensity} 0%, transparent 70%),
            radial-gradient(ellipse at 30% 40%, rgba(26, 15, 0, 0.9) 0%, #000000 50%),
            linear-gradient(180deg, #0F0A00 0%, #000000 100%)
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

      {/* Hazard stripe borders (instead of cracks) */}
      <div
        className={`absolute top-0 left-0 right-0 h-3 opacity-50 transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'group-hover:opacity-80'
        }`}
        style={{
          background: `repeating-linear-gradient(
            45deg,
            ${color.glow},
            ${color.glow} 10px,
            transparent 10px,
            transparent 20px
          )`,
        }}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 h-3 opacity-50 transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'group-hover:opacity-80'
        }`}
        style={{
          background: `repeating-linear-gradient(
            45deg,
            ${color.glow},
            ${color.glow} 10px,
            transparent 10px,
            transparent 20px
          )`,
        }}
      />

      {/* Lab equipment decorations */}
      <div
        className={`absolute top-10 left-4 opacity-15 transition-all duration-500 ${
          isSelected ? 'opacity-30' : 'group-hover:opacity-25'
        }`}
        style={{ color: color.glow }}
      >
        <svg viewBox="0 0 80 120" className="w-16 h-24">
          {/* Test tube */}
          <rect x="25" y="20" width="30" height="80" rx="15" fill="currentColor" opacity="0.4" />
          <rect x="32" y="10" width="16" height="15" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      <div
        className={`absolute bottom-10 right-4 opacity-15 transition-all duration-500 ${
          isSelected ? 'opacity-30' : 'group-hover:opacity-25'
        }`}
        style={{ color: color.glow }}
      >
        <svg viewBox="0 0 80 120" className="w-16 h-24">
          {/* Radiation symbol */}
          <circle cx="40" cy="60" r="8" fill="currentColor" />
          <path d="M 40 35 L 35 45 L 45 45 Z" fill="currentColor" />
          <path d="M 58 72 L 48 67 L 48 77 Z" fill="currentColor" />
          <path d="M 22 72 L 32 67 L 32 77 Z" fill="currentColor" />
        </svg>
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
                ${isSelected ? 'animate-flicker-yellow' : ''}
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
          className="absolute inset-0 rounded-xl pointer-events-none border-2 animate-pulse-yellow"
          style={{
            borderColor: color.glow,
            boxShadow: `inset 0 0 30px ${color.intensity}`,
          }}
        />
      )}
    </button>
  );
}