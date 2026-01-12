import { useEffect, useState } from 'react';

interface TimerRingProps {
  duration?: number; // in seconds
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function TimerRing({
  duration = 300,
  size = 120,
  strokeWidth = 8,
  className = '',
}: TimerRingProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (timeLeft / duration) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  // Calculate color based on time remaining
  const getStrokeColor = () => {
    if (percentage > 50) return 'var(--blood-red)';
    if (percentage > 25) return 'var(--ember-orange)';
    return 'var(--blood-dark)';
  };

  const getGlowIntensity = () => {
    if (percentage > 50) return 'drop-shadow(0 0 8px var(--red-glow))';
    if (percentage > 25) return 'drop-shadow(0 0 12px var(--ember-glow))';
    return 'drop-shadow(0 0 16px var(--red-glow-strong))';
  };

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ filter: getGlowIntensity() }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(229, 9, 20, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ${
            percentage < 25 ? 'animate-pulse-red' : ''
          }`}
        />
      </svg>

      {/* Time display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-2xl font-bold tabular-nums ${
            percentage < 25
              ? 'text-[var(--blood-red)] animate-pulse-red'
              : percentage < 50
              ? 'text-[var(--ember-orange)]'
              : 'text-[var(--ash-gray)]'
          }`}
          style={
            percentage < 25
              ? { textShadow: 'var(--glow-red-strong)' }
              : undefined
          }
        >
          {formatTime(timeLeft)}
        </span>
        <span className="text-xs text-[var(--ash-dim)] uppercase tracking-wider mt-1">
          Time Left
        </span>
      </div>
    </div>
  );
}
