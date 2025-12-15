// Escape the Upside Down - Original Atmospheric Icons & Silhouettes

// Supernatural crack/tendril patterns
export const CrackPattern = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    stroke="currentColor"
    className={className}
    aria-label="Dimensional crack"
    preserveAspectRatio="none"
  >
    <path
      d="M 0 200 Q 50 180, 100 200 T 200 200 T 300 200 Q 350 220, 400 200"
      strokeWidth="2"
      opacity="0.6"
      strokeDasharray="800"
      style={{ strokeDashoffset: 0 }}
    >
      <animate
        attributeName="stroke-dashoffset"
        from="800"
        to="0"
        dur="2s"
        fill="freeze"
      />
    </path>
    <path
      d="M 100 200 L 80 150 M 100 200 L 120 250"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path
      d="M 200 200 L 190 160 M 200 200 L 210 240"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path
      d="M 300 200 L 280 170 M 300 200 L 320 230"
      strokeWidth="1.5"
      opacity="0.4"
    />
  </svg>
);

// Dead tree silhouette
export const DeadTree = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 200"
    fill="currentColor"
    className={className}
    aria-label="Dead tree silhouette"
  >
    {/* Trunk */}
    <path d="M 45 200 L 48 120 L 50 80 L 52 120 L 55 200 Z" opacity="0.9" />
    
    {/* Main branches */}
    <path d="M 50 80 L 30 60 L 25 55 L 20 50" strokeWidth="3" stroke="currentColor" fill="none" opacity="0.8" />
    <path d="M 50 80 L 70 65 L 75 62 L 80 58" strokeWidth="3" stroke="currentColor" fill="none" opacity="0.8" />
    
    {/* Secondary branches */}
    <path d="M 50 100 L 35 85 L 30 82" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.7" />
    <path d="M 50 100 L 65 90 L 72 87" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.7" />
    
    {/* Smaller branches */}
    <path d="M 30 60 L 25 50 M 30 60 L 28 68" strokeWidth="1.5" stroke="currentColor" fill="none" opacity="0.6" />
    <path d="M 70 65 L 75 55 M 70 65 L 73 72" strokeWidth="1.5" stroke="currentColor" fill="none" opacity="0.6" />
  </svg>
);

// Radio tower silhouette
export const RadioTower = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 200"
    fill="currentColor"
    className={className}
    aria-label="Radio tower silhouette"
  >
    {/* Base */}
    <polygon points="35,200 40,180 60,180 65,200" opacity="0.9" />
    
    {/* Tower structure */}
    <polygon points="40,180 42,120 58,120 60,180" opacity="0.85" />
    <polygon points="42,120 44,60 56,60 58,120" opacity="0.8" />
    <polygon points="44,60 46,20 54,20 56,60" opacity="0.75" />
    
    {/* Cross beams */}
    <rect x="38" y="150" width="24" height="1" opacity="0.6" />
    <rect x="38" y="130" width="24" height="1" opacity="0.6" />
    <rect x="40" y="100" width="20" height="1" opacity="0.6" />
    <rect x="40" y="80" width="20" height="1" opacity="0.6" />
    <rect x="42" y="50" width="16" height="1" opacity="0.6" />
    <rect x="42" y="35" width="16" height="1" opacity="0.6" />
    
    {/* Antenna */}
    <rect x="49" y="5" width="2" height="15" opacity="0.9" />
    <circle cx="50" cy="8" r="3" opacity="0.4" className="animate-pulse-red" />
  </svg>
);

// Tendril/vine organic shapes
export const Tendril = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    className={className}
    aria-label="Organic tendril"
  >
    <path
      d="M 10 200 Q 20 180, 30 160 Q 40 140, 35 120 Q 30 100, 45 85 Q 60 70, 55 50 Q 50 30, 65 20"
      strokeWidth="3"
      opacity="0.4"
      strokeLinecap="round"
    />
    <path
      d="M 30 160 Q 40 155, 45 145"
      strokeWidth="2"
      opacity="0.3"
      strokeLinecap="round"
    />
    <path
      d="M 35 120 Q 25 115, 20 105"
      strokeWidth="2"
      opacity="0.3"
      strokeLinecap="round"
    />
    <path
      d="M 55 50 Q 65 45, 70 35"
      strokeWidth="2"
      opacity="0.3"
      strokeLinecap="round"
    />
  </svg>
);

// Standard UI Icons
export const TimerIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    className={className}
    aria-label="Timer"
  >
    <circle cx="50" cy="55" r="35" />
    <path d="M 50 55 L 50 30" strokeLinecap="round" />
    <path d="M 50 55 L 65 65" strokeLinecap="round" strokeWidth="3" />
    <rect x="40" y="10" width="20" height="6" rx="2" fill="currentColor" />
  </svg>
);

export const SkullIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Skull"
  >
    <ellipse cx="50" cy="40" rx="28" ry="32" />
    <circle cx="38" cy="38" r="6" fill="var(--void-black)" />
    <circle cx="62" cy="38" r="6" fill="var(--void-black)" />
    <path d="M 40 55 L 35 60 L 40 65 M 50 55 L 50 65 M 60 55 L 65 60 L 60 65" fill="none" stroke="var(--void-black)" strokeWidth="3" strokeLinecap="round" />
    <rect x="35" y="70" width="10" height="12" rx="2" />
    <rect x="55" y="70" width="10" height="12" rx="2" />
  </svg>
);

export const HeartIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Health"
  >
    <path d="M 50 85 L 20 55 Q 10 45, 10 35 Q 10 20, 25 20 Q 35 20, 50 35 Q 65 20, 75 20 Q 90 20, 90 35 Q 90 45, 80 55 Z" />
  </svg>
);

export const TrophyIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Trophy"
  >
    <path d="M 30 20 L 30 15 L 70 15 L 70 20 L 75 20 Q 85 20, 85 30 Q 85 40, 75 42 L 70 43 L 70 45 Q 70 55, 55 60 L 55 70 L 65 70 L 65 80 L 35 80 L 35 70 L 45 70 L 45 60 Q 30 55, 30 45 L 30 43 L 25 42 Q 15 40, 15 30 Q 15 20, 25 20 Z" />
  </svg>
);

export const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Star"
  >
    <path d="M 50 10 L 60 38 L 90 38 L 66 56 L 76 84 L 50 66 L 24 84 L 34 56 L 10 38 L 40 38 Z" />
  </svg>
);

export const CodeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Code"
  >
    <path d="M 30 30 L 10 50 L 30 70" />
    <path d="M 70 30 L 90 50 L 70 70" />
    <path d="M 55 25 L 45 75" />
  </svg>
);

export const UserIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="User"
  >
    <circle cx="50" cy="30" r="18" />
    <path d="M 20 85 Q 20 60, 50 60 Q 80 60, 80 85 L 80 90 L 20 90 Z" />
  </svg>
);

export const LockIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Lock"
  >
    <rect x="25" y="45" width="50" height="40" rx="5" />
    <path d="M 35 45 L 35 30 Q 35 15, 50 15 Q 65 15, 65 30 L 65 45" fill="none" stroke="currentColor" strokeWidth="6" />
    <circle cx="50" cy="65" r="5" fill="var(--void-black)" />
  </svg>
);

export const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="10"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Check"
  >
    <path d="M 20 50 L 40 70 L 80 30" />
  </svg>
);

export const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    className={className}
    aria-label="Close"
  >
    <path d="M 20 20 L 80 80" />
    <path d="M 80 20 L 20 80" />
  </svg>
);

export const AlertIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Alert"
  >
    <path d="M 50 10 L 90 85 L 10 85 Z" />
    <rect x="46" y="35" width="8" height="25" rx="2" fill="var(--void-black)" />
    <circle cx="50" cy="70" r="5" fill="var(--void-black)" />
  </svg>
);

export const LightningIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Lightning"
  >
    <path d="M 60 10 L 30 50 L 45 50 L 40 90 L 70 45 L 55 45 Z" />
  </svg>
);

export const BrainIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    aria-label="Brain"
  >
    <ellipse cx="35" cy="50" rx="20" ry="30" />
    <ellipse cx="65" cy="50" rx="20" ry="30" />
    <path d="M 35 25 Q 50 20, 65 25" opacity="0.6" />
    <path d="M 35 75 Q 50 80, 65 75" opacity="0.6" />
  </svg>
);
