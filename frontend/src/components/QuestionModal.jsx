import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { CrackPattern } from './icons/index.jsx';
import { api } from '../api';

export function QuestionModal({
  questionId,
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

  // Hint State
  const [hints, setHints] = useState([]);
  const hasLoadedRef = useRef(false);

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

  // Polling for Hints
  useEffect(() => {
    if (!isOpen || !questionId) {
      hasLoadedRef.current = false;
      return;
    }

    const fetchHints = async () => {
      try {
        const query = new URLSearchParams({ questionId });

        // If we have hints, use the latest one as the 'since' threshold
        if (hints.length > 0) {
          query.append('since', hints[0].createdAt);
        }

        const newHints = await api.get(`/game/hints?${query.toString()}`);
        if (newHints && newHints.length > 0) {
          setHints(prev => {
            const existingIds = new Set(prev.map(h => h.id));
            const filteredNew = newHints.filter(h => !existingIds.has(h.id));
            return [...filteredNew, ...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          });
        }
      } catch (e) {
        console.error("Hint retrieval failure", e);
      }
    };

    // Initial load: fetch everything if not loaded yet
    if (!hasLoadedRef.current) {
      fetchHints();
      hasLoadedRef.current = true;
    }

    const interval = setInterval(fetchHints, 10000); // 10 second polling
    return () => clearInterval(interval);
  }, [isOpen, questionId, hints.length]); // hints.length ensures we know when to send 'since'

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsSubmitting(true);

    try {
      // Call parent's submit handler which calls API
      const isCorrect = await onCorrectAnswer(answer);

      setFeedback(isCorrect ? 'correct' : 'wrong');
      setIsSubmitting(false);

      if (isCorrect) {
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      setFeedback('wrong');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAnswer('');
    setFeedback(null);
    setHints([]);
    hasLoadedRef.current = false;
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
          background: 'radial-gradient(ellipse at center, rgba(139, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.98) 100%)',
        }}
      />

      {/* Modal Container */}
      <div
        className="relative max-w-4xl w-full rounded-xl border-2 border-[var(--blood-red)]/50 overflow-hidden flex flex-col md:flex-row h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(180deg, rgba(20, 0, 0, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
          boxShadow:
            'inset 0 0 80px rgba(229, 9, 20, 0.2), 0 0 80px rgba(229, 9, 20, 0.5)',
        }}
      >
        {/* Top crack border */}
        <div className="absolute top-0 left-0 right-0 h-1 text-[var(--blood-red)] opacity-80 z-10">
          <CrackPattern className="w-full h-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-lg bg-[var(--void-dark)]/80 border-2 border-[var(--blood-red)]/40 flex items-center justify-center hover:border-[var(--blood-red)] hover:bg-[var(--blood-red)]/10 transition-all duration-300 group"
          style={{ boxShadow: '0 0 20px rgba(229, 9, 20, 0.3)' }}
        >
          <X className="w-5 h-5 text-[var(--blood-red)] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Left Side: Question and Input */}
        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-[var(--blood-red)]/20 text-white">
          {/* Header */}
          <div className="mb-8 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span
                className="text-sm font-bold text-[var(--ash-dim)]"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                QUESTION {questionNumber}
              </span>
              <div className="w-px h-4 bg-[var(--blood-red)]/40" />
              <div className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  className="text-[var(--ember-orange)]"
                >
                  <path d="M 50 10 L 60 38 L 90 38 L 66 56 L 76 84 L 50 66 L 24 84 L 34 56 L 10 38 L 40 38 Z" />
                </svg>
                <span className="text-sm font-bold text-[var(--ember-orange)]">
                  {points} Points
                </span>
              </div>
            </div>

            <h3
              className="text-3xl text-[var(--blood-red)] mb-2 animate-flicker-red"
              style={{
                fontFamily: 'Cinzel, serif',
                textShadow: '0 0 20px var(--red-glow)',
              }}
            >
              {title}
            </h3>
          </div>

          {/* Question Content */}
          <div
            className="mb-8 p-6 rounded-lg border border-[var(--blood-red)]/30 bg-[var(--void-dark)]/40"
            style={{ boxShadow: 'inset 0 0 30px rgba(229, 9, 20, 0.05)' }}
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
              Your Answer
            </label>
            <textarea
              id="answer-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={feedback === 'correct' || isSubmitting}
              className="w-full h-32 px-4 py-3 bg-[var(--void-dark)]/60 border-2 border-[var(--blood-red)]/30 rounded-lg text-[var(--ash-gray)] placeholder-[var(--ash-darker)] focus:border-[var(--blood-red)] focus:outline-none transition-all duration-300 resize-none font-mono"
              placeholder="Type your answer here..."
              style={{
                boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || feedback === 'correct' || isSubmitting}
            className={`
              w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm
              transition-all duration-700 border-2
              ${feedback === 'correct' || isSubmitting || !answer.trim()
                ? 'bg-[var(--void-dark)]/40 border-[var(--ash-darker)]/30 text-[var(--ash-darker)] cursor-not-allowed'
                : 'bg-[var(--blood-red)]/20 border-[var(--blood-red)] text-[var(--blood-red)] hover:bg-[var(--blood-red)]/30 hover:scale-[1.02] animate-pulse-red'
              }
            `}
          >
            {isSubmitting ? 'Checking Answer...' : feedback === 'correct' ? 'Correct!' : 'Submit Answer'}
          </button>
        </div>

        {/* Right Side: Live Hint Feed */}
        <div className="w-full md:w-80 bg-black/40 flex flex-col border-t md:border-t-0 md:border-l border-[var(--blood-red)]/20">
          <div className="p-4 border-b border-[var(--blood-red)]/20 bg-[var(--blood-red)]/5 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--blood-red)]" />
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--blood-red)]">
              Live Intercepts
            </h4>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar" style={{ maxHeight: 'calc(85vh - 120px)', scrollbarWidth: 'thin', scrollbarColor: 'var(--blood-red) transparent' }}>
            {hints.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-8 h-8 rounded-full border border-[var(--blood-red)]/20 flex items-center justify-center mb-2 animate-pulse">
                  <div className="w-1 h-1 rounded-full bg-[var(--blood-red)]/40" />
                </div>
                <span className="text-[10px] text-[var(--ash-dim)] uppercase tracking-widest leading-loose">
                  Waiting for transmissions from Hawkins Lab...
                </span>
              </div>
            ) : (
              hints.map((hint, idx) => (
                <div
                  key={hint.id || idx}
                  className="p-3 bg-[var(--void-dark)]/60 border border-[var(--blood-red)]/20 rounded-lg animate-slide-in-right"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-bold text-[var(--blood-red)] uppercase tracking-wider">
                      SECURE MSG
                    </span>
                    <span className="text-[9px] text-[var(--ash-dim)]">
                      {new Date(hint.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--ash-gray)] leading-relaxed italic">
                    "{hint.content}"
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-black/60 text-center border-t border-[var(--blood-red)]/10">
            <p className="text-[8px] text-[var(--ash-dim)] uppercase tracking-[0.2em] animate-pulse">
              Encrypted Connection Stable
            </p>
          </div>
        </div>

        {/* Bottom crack border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 text-[var(--blood-red)] opacity-80 rotate-180 z-10">
          <CrackPattern className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}