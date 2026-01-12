import { X } from 'lucide-react';
import { QuestionCard } from './QuestionCard.jsx';
import { CrackPattern } from './icons/index.jsx';

export function StageModal({
  stageNumber,
  stageName,
  description,
  questions,
  isOpen,
  onClose,
  onQuestionClick,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8 animate-scale-in-fog"
      onClick={onClose}
    >
      {/* Backdrop with fog effect */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)',
        }}
      />

      {/* Modal Container */}
      <div
        className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-xl border-2 border-[var(--blood-red)]/40"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(180deg, rgba(26, 0, 0, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
          boxShadow:
            'inset 0 0 60px rgba(229, 9, 20, 0.15), 0 0 60px rgba(229, 9, 20, 0.4)',
        }}
      >
        {/* Top crack border */}
        <div className="absolute top-0 left-0 right-0 h-1 text-[var(--blood-red)] opacity-70 z-10">
          <CrackPattern className="w-full h-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-lg bg-[var(--void-dark)]/80 border-2 border-[var(--blood-red)]/40 flex items-center justify-center hover:border-[var(--blood-red)] hover:bg-[var(--blood-red)]/10 transition-all duration-300 group"
          style={{ boxShadow: '0 0 20px rgba(229, 9, 20, 0.3)' }}
        >
          <X className="w-5 h-5 text-[var(--blood-red)] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Fog overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(229, 9, 20, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(255, 106, 61, 0.05) 0%, transparent 50%)
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
                backgroundColor: Math.random() > 0.6 ? '#E50914' : '#FF6A3D',
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
                {/* Red accent bar */}
                <div
                  className="w-1 h-16 rounded-full animate-pulse-red"
                  style={{
                    background: 'linear-gradient(180deg, var(--blood-red), var(--ember-orange))',
                    boxShadow: '0 0 15px var(--red-glow)',
                  }}
                />

                <div>
                  <h2
                    className="text-4xl text-[var(--blood-red)] mb-2 animate-flicker-red"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      textShadow: '0 0 20px var(--red-glow), 0 0 40px var(--red-glow)',
                    }}
                  >
                    {stageName}
                  </h2>
                  <p className="text-sm text-[var(--ash-dim)] uppercase tracking-widest">
                    Stage {stageNumber} Challenge
                  </p>
                </div>

                {/* Red accent bar */}
                <div
                  className="w-1 h-16 rounded-full animate-pulse-red"
                  style={{
                    background: 'linear-gradient(180deg, var(--ember-orange), var(--blood-red))',
                    boxShadow: '0 0 15px var(--red-glow)',
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
                  Progress:
                </span>
                <div className="flex gap-1">
                  {questions.map((q, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          q.status === 'completed'
                            ? '#FF6A3D'
                            : q.status === 'active'
                            ? '#E50914'
                            : '#5A5A5A',
                        boxShadow:
                          q.status !== 'locked'
                            ? `0 0 8px ${q.status === 'completed' ? '#FF6A3D' : '#E50914'}`
                            : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-[var(--ash-gray)]">
                <span className="font-bold text-[var(--ember-orange)]">
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
            <div className="mt-8 pt-6 border-t border-[var(--blood-red)]/20 text-center">
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-2 h-2 bg-[var(--blood-red)] rounded-full animate-pulse-red"
                  style={{ boxShadow: '0 0 10px var(--red-glow)' }}
                />
                <span className="text-xs text-[var(--ash-dim)] uppercase tracking-wide">
                  Portal Stable · Gateway Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom crack border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 text-[var(--blood-red)] opacity-70 rotate-180 z-10">
          <CrackPattern className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}