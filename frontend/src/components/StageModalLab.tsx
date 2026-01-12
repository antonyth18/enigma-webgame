import { X } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { CrackPattern } from './icons';

interface Question {
  number: number;
  title: string;
  status: 'locked' | 'active' | 'completed';
  points: number;
  questionText: string;
  correctAnswer: string;
}

interface StageModalLabProps {
  stageNumber: number;
  stageName: string;
  description: string;
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
  onQuestionClick: (questionNumber: number) => void;
}

export function StageModalLab({
  stageNumber,
  stageName,
  description,
  questions,
  isOpen,
  onClose,
  onQuestionClick,
}: StageModalLabProps) {
  if (!isOpen) return null;

  const labColor = '#FFA500';
  const labGlow = 'rgba(255, 165, 0, 0.5)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8 animate-scale-in-fog"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(26, 15, 0, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)',
        }}
      />

      {/* Modal Container */}
      <div
        className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-xl border-2"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `${labColor}60`,
          background: 'linear-gradient(180deg, rgba(26, 15, 0, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
          boxShadow: `inset 0 0 60px rgba(255, 165, 0, 0.15), 0 0 60px ${labGlow}`,
        }}
      >
        {/* Top hazard border */}
        <div
          className="absolute top-0 left-0 right-0 h-2 opacity-70 z-10"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              ${labColor},
              ${labColor} 10px,
              transparent 10px,
              transparent 20px
            )`,
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-lg bg-[var(--void-dark)]/80 border-2 flex items-center justify-center hover:bg-[#FFA500]/10 transition-all duration-300 group"
          style={{ 
            borderColor: `${labColor}60`,
            boxShadow: `0 0 20px ${labGlow}`
          }}
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" style={{ color: labColor }} />
        </button>

        {/* Fog overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(255, 165, 0, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
            `,
            animation: 'fog-drift 20s ease-in-out infinite',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                backgroundColor: Math.random() > 0.5 ? '#FFA500' : '#FFD700',
                opacity: Math.random() * 0.3 + 0.1,
                animation: `float-particles ${Math.random() * 10 + 8}s linear infinite`,
                animationDelay: Math.random() * 5 + 's',
              }}
            />
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                {/* Accent bar */}
                <div
                  className="w-1 h-16 rounded-full"
                  style={{
                    background: `linear-gradient(180deg, ${labColor}, #FFD700)`,
                    boxShadow: `0 0 15px ${labGlow}`,
                    animation: 'pulse-red 2s ease-in-out infinite',
                  }}
                />

                <div>
                  <h2
                    className="text-4xl mb-2"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      color: labColor,
                      textShadow: `0 0 20px ${labGlow}, 0 0 40px ${labGlow}`,
                      animation: 'flicker-red 3s ease-in-out infinite',
                    }}
                  >
                    {stageName}
                  </h2>
                  <p className="text-sm text-[var(--ash-dim)] uppercase tracking-widest">
                    Security Level {stageNumber}
                  </p>
                </div>

                {/* Accent bar */}
                <div
                  className="w-1 h-16 rounded-full"
                  style={{
                    background: `linear-gradient(180deg, #FFD700, ${labColor})`,
                    boxShadow: `0 0 15px ${labGlow}`,
                    animation: 'pulse-red 2s ease-in-out infinite',
                  }}
                />
              </div>

              <p className="text-[var(--ash-gray)] max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>

            {/* Progress Overview */}
            <div className="mb-6 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--ash-dim)] uppercase tracking-wide">
                  Protocol Status:
                </span>
                <div className="flex gap-1">
                  {questions.map((q, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          q.status === 'completed'
                            ? '#FFD700'
                            : q.status === 'active'
                            ? '#FFA500'
                            : '#5A5A5A',
                        boxShadow:
                          q.status !== 'locked'
                            ? `0 0 8px ${q.status === 'completed' ? '#FFD700' : '#FFA500'}`
                            : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-[var(--ash-gray)]">
                <span className="font-bold" style={{ color: '#FFD700' }}>
                  {questions.filter((q) => q.status === 'completed').length}
                </span>
                <span className="text-[var(--ash-dim)]"> / {questions.length} Completed</span>
              </div>
            </div>

            {/* Question Cards */}
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question.number}
                  {...question}
                  onClick={() => onQuestionClick(question.number)}
                />
              ))}
            </div>

            {/* Footer Status */}
            <div className="mt-8 pt-6 border-t opacity-20 text-center" style={{ borderColor: `${labColor}40` }}>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: labColor,
                    boxShadow: `0 0 10px ${labGlow}`,
                    animation: 'pulse-red 2s ease-in-out infinite'
                  }}
                />
                <span className="text-xs text-[var(--ash-dim)] uppercase tracking-wide">
                  Facility Systems: Active · Security: Compromised
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom hazard border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 opacity-70 z-10"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              ${labColor},
              ${labColor} 10px,
              transparent 10px,
              transparent 20px
            )`,
          }}
        />
      </div>
    </div>
  );
}
