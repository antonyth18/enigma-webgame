import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

export function QuestionModalLab({
  questionNumber,
  title,
  questionText,
  points,
  isOpen,
  onClose,
  onCorrectAnswer,
}) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

  const labColor = '#FFA500';
  const labGlow = 'rgba(255, 165, 0, 0.5)';

  // Auto-hide incorrect feedback after 3 seconds
  useEffect(() => {
    if (feedback === 'wrong') {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (feedback === 'correct') {
      setShowFeedback(true);
    }
  }, [feedback]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!answer.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const isCorrect = answer.toLowerCase().trim() === 'test';
      
      setFeedback(isCorrect ? 'correct' : 'wrong');
      setIsSubmitting(false);

      if (isCorrect) {
        setTimeout(() => {
          onCorrectAnswer();
          handleClose();
        }, 2000);
      }
    }, 800);
  };

  const handleClose = () => {
    setAnswer('');
    setFeedback(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-8 animate-scale-in-fog"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(26, 15, 0, 0.4) 0%, rgba(0, 0, 0, 0.98) 100%)',
        }}
      />

      {/* Modal Container */}
      <div
        className="relative max-w-3xl w-full rounded-xl border-2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `${labColor}80`,
          background: 'linear-gradient(180deg, rgba(20, 12, 0, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
          boxShadow: `inset 0 0 80px rgba(255, 165, 0, 0.2), 0 0 80px ${labGlow}`,
        }}
      >
        {/* Top hazard border */}
        <div
          className="absolute top-0 left-0 right-0 h-2 opacity-80 z-10"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              ${labColor},
              ${labColor} 8px,
              transparent 8px,
              transparent 16px
            )`,
          }}
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
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
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(255, 165, 0, 0.1) 0%, transparent 60%)`,
            animation: 'fog-drift 15s ease-in-out infinite',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="text-sm font-bold text-[var(--ash-dim)]"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                PROTOCOL {questionNumber}
              </span>
              <div className="w-px h-4 opacity-40" style={{ backgroundColor: labColor }} />
              <div className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  style={{ color: '#FFD700' }}
                >
                  <path d="M 50 10 L 60 38 L 90 38 L 66 56 L 76 84 L 50 66 L 24 84 L 34 56 L 10 38 L 40 38 Z" />
                </svg>
                <span className="text-sm font-bold" style={{ color: '#FFD700' }}>
                  {points} Points
                </span>
              </div>
            </div>

            <h3
              className="text-3xl mb-2"
              style={{
                fontFamily: 'Cinzel, serif',
                color: labColor,
                textShadow: `0 0 20px ${labGlow}`,
                animation: 'flicker-yellow 3s ease-in-out infinite',
              }}
            >
              {title}
            </h3>
          </div>

          {/* Question Content */}
          <div
            className="mb-8 p-6 rounded-lg border bg-[var(--void-dark)]/40"
            style={{ 
              borderColor: `${labColor}40`,
              boxShadow: 'inset 0 0 30px rgba(255, 165, 0, 0.05)' 
            }}
          >
            <p className="text-[var(--ash-gray)] leading-relaxed text-lg whitespace-pre-wrap">
              {questionText}
            </p>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label
              className="block text-sm text-[var(--ash-dim)] uppercase tracking-wide mb-3"
              htmlFor="answer-input"
            >
              Your Solution
            </label>
            <textarea
              id="answer-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={feedback === 'correct' || isSubmitting}
              className="w-full h-32 px-4 py-3 bg-[var(--void-dark)]/60 border-2 rounded-lg text-[var(--ash-gray)] placeholder-[var(--ash-darker)] focus:outline-none transition-all duration-300 resize-none font-mono"
              placeholder="Enter your solution here..."
              style={{
                borderColor: `${labColor}40`,
                boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
              }}
              onFocus={(e) => e.target.style.borderColor = labColor}
              onBlur={(e) => e.target.style.borderColor = `${labColor}40`}
            />
          </div>

          {/* Feedback Message */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-out ${
              feedback && showFeedback ? 'mb-6' : 'mb-0'
            }`}
            style={{
              maxHeight: feedback && showFeedback ? '200px' : '0px',
            }}
          >
            {feedback && (
              <div
                className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                  showFeedback ? 'animate-scale-in-fog' : 'opacity-0'
                }`}
                style={{
                  backgroundColor: feedback === 'correct' ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 69, 0, 0.1)',
                  borderColor: feedback === 'correct' ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 69, 0, 0.5)',
                  boxShadow: feedback === 'correct' 
                    ? '0 0 30px rgba(255, 215, 0, 0.3)' 
                    : '0 0 30px rgba(255, 69, 0, 0.3)',
                  animation: !showFeedback
                    ? 'fade-out-collapse 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                    : undefined,
                }}
              >
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#FFD700' }} />
                    <div>
                      <p className="font-bold" style={{ color: '#FFD700' }}>Access Granted!</p>
                      <p className="text-sm text-[var(--ash-gray)] mt-1">
                        Protocol completed! You earned {points} clearance points. Processing...
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#FF4500' }} />
                    <div>
                      <p className="font-bold" style={{ color: '#FF4500' }}>Access Denied</p>
                      <p className="text-sm text-[var(--ash-gray)] mt-1">
                        Invalid solution. Try again.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || feedback === 'correct' || isSubmitting}
            className="w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all duration-700 border-2"
            style={{
              backgroundColor: feedback === 'correct' || isSubmitting || !answer.trim()
                ? 'rgba(90, 90, 90, 0.1)'
                : 'rgba(255, 165, 0, 0.2)',
              borderColor: feedback === 'correct' || isSubmitting || !answer.trim()
                ? 'rgba(90, 90, 90, 0.3)'
                : labColor,
              color: feedback === 'correct' || isSubmitting || !answer.trim()
                ? '#5A5A5A'
                : labColor,
              boxShadow: feedback !== 'correct' && !isSubmitting && answer.trim()
                ? `0 0 30px ${labGlow}, inset 0 0 20px rgba(255, 165, 0, 0.1)`
                : 'none',
              cursor: feedback === 'correct' || isSubmitting || !answer.trim() ? 'not-allowed' : 'pointer',
              transform: feedback === 'wrong' && !showFeedback ? 'translateY(-10px)' : 'translateY(0)',
            }}
          >
            {isSubmitting ? 'Validating Solution...' : feedback === 'correct' ? 'Access Granted!' : 'Submit Solution'}
          </button>

          {/* Hint */}
          <p className="mt-4 text-xs text-[var(--ash-darker)] text-center italic">
            Hint: For demo purposes, try typing "test" as the solution
          </p>
        </div>

        {/* Bottom hazard border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 opacity-80 z-10"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              ${labColor},
              ${labColor} 8px,
              transparent 8px,
              transparent 16px
            )`,
          }}
        />
      </div>
    </div>
  );
}