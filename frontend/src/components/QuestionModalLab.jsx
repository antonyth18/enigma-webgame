import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Send, ExternalLink, FileText } from 'lucide-react';
import { api } from '../api';

export function QuestionModalLab({
  questionId,
  questionNumber,
  title,
  questionText,
  points,
  resourceLink,
  isOpen,
  onClose,
  onCorrectAnswer,
}) {
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);
  const [serverHint, setServerHint] = useState(null);

  // Hint Submission State
  const [isSendingHint, setIsSendingHint] = useState(false);
  const [hintSuccess, setHintSuccess] = useState(false);

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

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await onCorrectAnswer(answer);
      // onCorrectAnswer now returns the full response object or false
      if (res && res.isCorrect) {
        setFeedback('correct');
        if (res.systemHint) {
          setServerHint(res.systemHint);
        }
      } else {
        setFeedback('wrong');
      }
    } catch (e) {
      console.error(e);
      setFeedback('wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendHint = async () => {
    if (!hint.trim() || isSendingHint) return;

    setIsSendingHint(true);
    try {
      await api.post('/game/hints', {
        questionId: questionId,
        content: hint.trim()
      });
      setHintSuccess(true);
      // Clear after sending a hint
      setHint('');
      setTimeout(() => setHintSuccess(false), 3000);
    } catch (e) {
      console.error("Failed to send hint", e);
      alert("Transmission failure. System interference detected.");
    } finally {
      setIsSendingHint(false);
    }
  };

  const handleClose = () => {
    setAnswer('');
    setHint('');
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

        {/* Content */}
        <div className="relative z-10 p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
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

            {resourceLink && (
              <a
                href={resourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 px-4 py-2 bg-[#FFA500]/5 border border-[#FFA500]/30 rounded-md text-[#FFA500] hover:bg-[#FFA500]/10 transition-colors w-fit group font-mono"
              >
                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Intercept Lab Resources</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            )}
          </div>

          {/* Input Section */}
          <div className="space-y-6 mb-6">
            {/* Answer Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  className="text-sm text-[var(--ash-dim)] uppercase tracking-wide"
                  htmlFor="answer-input"
                >
                  Secure Terminal Solution
                </label>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Auth System: {feedback === 'correct' ? 'DECRYPTED' : 'PENDING'}
                  </span>
                </div>
              </div>

              <input
                id="answer-input"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={isSubmitting || feedback === 'correct'}
                className="w-full px-4 py-4 bg-[var(--void-dark)]/60 border-2 rounded-lg text-[var(--ash-gray)] placeholder-[#5A5A5A] focus:outline-none transition-all duration-300 font-mono"
                placeholder="Enter final security bypass sequence..."
                style={{
                  borderColor: feedback === 'correct' ? 'rgba(255, 215, 0, 0.4)' : `${labColor}40`,
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>

            {/* Hint Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  className="text-sm text-[var(--ash-dim)] uppercase tracking-wide"
                  htmlFor="hint-input"
                >
                  Transmission Broadcast (Hints)
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFA500] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFA500]/60">
                    Portal Uplink Stable
                  </span>
                </div>
              </div>

              <textarea
                id="hint-input"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                disabled={isSendingHint}
                className="w-full h-24 px-4 py-3 bg-[var(--void-dark)]/60 border-2 rounded-lg text-[var(--ash-gray)] placeholder-[#5A5A5A] focus:outline-none transition-all duration-300 resize-none font-mono"
                placeholder="Broadcast observations to the Upside Down team..."
                style={{
                  borderColor: `${labColor}40`,
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>
          </div>

          {/* Feedback Message */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-out ${feedback && showFeedback ? 'mb-6' : 'mb-0'
              }`}
            style={{
              maxHeight: feedback && showFeedback ? '200px' : '0px',
            }}
          >
            {feedback && (
              <div
                className={`p-4 rounded-lg border-2 flex items-center gap-3 ${showFeedback ? 'animate-scale-in-fog' : 'opacity-0'
                  }`}
                style={{
                  backgroundColor: feedback === 'correct' ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 69, 0, 0.1)',
                  borderColor: feedback === 'correct' ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 69, 0, 0.5)',
                  boxShadow: feedback === 'correct'
                    ? '0 0 30px rgba(255, 215, 0, 0.3)'
                    : '0 0 30px rgba(255, 69, 0, 0.3)',
                }}
              >
                {feedback === 'correct' ? (
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#FFD700' }} />
                ) : (
                  <XCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#FF4500' }} />
                )}
                <div>
                  <p className="font-bold" style={{ color: feedback === 'correct' ? '#FFD700' : '#FF4500' }}>
                    {feedback === 'correct' ? 'Access Granted' : 'Access Denied'}
                  </p>
                  <p className="text-xs text-[var(--ash-gray)] mt-0.5">
                    {feedback === 'correct'
                      ? `Protocol ${questionNumber} completed. Proceed with further data transmissions.`
                      : 'Invalid sequence detected. Re-evaluating...'}
                  </p>
                  {serverHint && feedback === 'correct' && (
                    <div className="mt-3 p-3 bg-[#FFA500]/10 border border-[#FFA500]/30 rounded flex flex-col gap-1 animate-pulse">
                      <span className="text-[10px] uppercase tracking-widest text-[#FFA500] font-bold">Encrypted Intel Recovered:</span>
                      <p className="text-sm text-[var(--ash-gray)] italic">"{serverHint}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col gap-4">
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
                cursor: (feedback === 'correct' || isSubmitting || !answer.trim()) ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Validating...' : feedback === 'correct' ? 'Protocol Completed' : 'Submit Solution'}
            </button>

            <div className="relative">
              <button
                onClick={handleSendHint}
                disabled={!hint.trim() || isSendingHint}
                className="w-full py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 border-2 flex items-center justify-center gap-2 group"
                style={{
                  backgroundColor: 'rgba(255, 165, 0, 0.05)',
                  borderColor: hint.trim() && !isSendingHint ? `${labColor}40` : `${labColor}10`,
                  color: hint.trim() && !isSendingHint ? labColor : '#5A5A5A',
                  cursor: (!hint.trim() || isSendingHint) ? 'not-allowed' : 'pointer',
                }}
              >
                <Send className={`w-3.5 h-3.5 transition-transform duration-300 ${hint.trim() && !isSendingHint ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''}`} />
                {isSendingHint ? 'Transmitting...' : 'Transmit Hint to Upside Down'}
              </button>

              {hintSuccess && (
                <p className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-[#FFA500] uppercase tracking-[0.2em] animate-pulse">
                  Transmission Successful. Data Delivered.
                </p>
              )}
            </div>
          </div>
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