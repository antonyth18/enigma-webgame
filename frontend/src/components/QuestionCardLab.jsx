import { LockIcon, CheckIcon, CodeIcon } from './icons/index.jsx';

export function QuestionCardLab({
  number,
  title,
  status,
  points,
  onClick,
}) {
  const statusConfig = {
    locked: {
      icon: LockIcon,
      color: '#5A5A5A',
      bgOpacity: 'bg-[var(--void-surface)]/30',
      borderColor: 'border-[var(--ash-darker)]/20',
      textColor: 'text-[var(--ash-dim)]',
      glow: 'none',
    },
    active: {
      icon: CodeIcon,
      color: '#FFA500',
      bgOpacity: 'bg-[#FFA500]/10',
      borderColor: 'border-[#FFA500]/50',
      textColor: 'text-[var(--ash-gray)]',
      glow: '0 0 20px rgba(255, 165, 0, 0.4)',
    },
    completed: {
      icon: CheckIcon,
      color: '#FFD700',
      bgOpacity: 'bg-[#FFD700]/10',
      borderColor: 'border-[#FFD700]/40',
      textColor: 'text-[var(--ash-gray)]',
      glow: '0 0 15px rgba(255, 215, 0, 0.3)',
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      onClick={status === 'active' ? onClick : undefined}
      className={`
        relative group rounded-lg p-5 border-2 transition-all duration-300
        ${config.bgOpacity}
        ${config.borderColor}
        ${status === 'active' ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default opacity-75'}
      `}
      style={{
        boxShadow: config.glow,
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(255, 165, 0, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex items-start gap-4">
        {/* Status Icon */}
        <div
          className={`
            flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border-2
            ${status === 'active' ? 'animate-pulse-yellow' : ''}
          `}
          style={{
            backgroundColor: `${config.color}15`,
            borderColor: `${config.color}60`,
            boxShadow: status === 'active' ? `0 0 15px ${config.color}60` : 'none',
          }}
        >
          <StatusIcon className="w-6 h-6" style={{ color: config.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-bold ${config.textColor}`}
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                QUESTION {number}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 100 100"
                fill="currentColor"
                style={{ color: '#FFD700' }}
              >
                <path d="M 50 10 L 60 38 L 90 38 L 66 56 L 76 84 L 50 66 L 24 84 L 34 56 L 10 38 L 40 38 Z" />
              </svg>
              <span className="text-sm font-bold" style={{ color: '#FFD700' }}>
                {points}
              </span>
            </div>
          </div>

          {/* Title */}
          <h4 className={`font-semibold ${config.textColor}`}>
            {title}
          </h4>

          {/* Locked message */}
          {status === 'locked' && (
            <p className="text-xs text-[var(--ash-darker)] italic mt-2">
              Complete previous questions to unlock
            </p>
          )}
        </div>
      </div>

      {/* Crack decoration on active */}
      {status === 'active' && (
        <div className="absolute bottom-0 left-0 right-0 h-px opacity-40">
          <svg
            viewBox="0 0 400 2"
            fill="none"
            stroke={config.color}
            strokeWidth="1"
            className="w-full h-full"
          >
            <path d="M 0 1 Q 100 0.5, 200 1 T 400 1" opacity="0.6" />
          </svg>
        </div>
      )}
    </div>
  );
}