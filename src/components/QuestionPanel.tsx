import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Button } from './Button';
import { PillTag } from './PillTag';
import { TextAreaField } from './InputField';
import { TimerRing } from './TimerRing';
import { CodeIcon, CheckIcon, AlertIcon, LightningIcon } from './icons';

interface Question {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  category: string;
  question: string;
  codeSnippet?: string;
  correctAnswer: string;
}

const mockQuestion: Question = {
  id: 1,
  title: 'Reverse a String',
  difficulty: 'medium',
  category: 'String Manipulation',
  question: 'Write a function that reverses a string without using built-in reverse methods.',
  codeSnippet: `function reverseString(str) {
  // Your code here
  
}`,
  correctAnswer: 'let result = ""; for(let i = str.length - 1; i >= 0; i--) { result += str[i]; } return result;',
};

export function QuestionPanel() {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setAnswer('');
    setIsSubmitted(false);
    setShowHint(false);
  };

  // Simple mock validation
  const isCorrect = isSubmitted && answer.trim().length > 10;

  return (
    <div className="flex flex-col gap-6">
      {/* Timer Ring */}
      <div className="flex justify-center">
        <TimerRing duration={300} />
      </div>

      {/* Question Card */}
      <Card variant="glow">
        <CardHeader>
          <div className="flex items-center justify-between mb-3">
            <CardTitle accent>Challenge #{mockQuestion.id}</CardTitle>
            <PillTag
              variant={mockQuestion.difficulty}
              size="md"
            >
              {mockQuestion.difficulty}
            </PillTag>
          </div>
          <div className="flex items-center gap-2">
            <PillTag variant="neutral" size="sm" icon={<CodeIcon className="w-3 h-3" />}>
              {mockQuestion.category}
            </PillTag>
            <PillTag variant="neutral" size="sm">
              {mockQuestion.title}
            </PillTag>
          </div>
        </CardHeader>

        <CardContent>
          {/* Question */}
          <div className="mb-6">
            <p className="text-[var(--ash-gray)] leading-relaxed">
              {mockQuestion.question}
            </p>
          </div>

          {/* Code Snippet */}
          {mockQuestion.codeSnippet && (
            <div className="mb-6">
              <pre className="bg-[var(--void-black)] border border-[var(--blood-red)]/20 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-[var(--ash-gray)] font-mono">
                  {mockQuestion.codeSnippet}
                </code>
              </pre>
            </div>
          )}

          {/* Answer Input */}
          <div className="mb-6">
            <TextAreaField
              label="Your Solution"
              placeholder="Type your code here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={6}
              disabled={isSubmitted}
            />
          </div>

          {/* Hint */}
          {!isSubmitted && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="mb-4 text-sm text-[var(--ember-orange)] hover:text-[var(--ember-dark)] transition-colors flex items-center gap-2"
            >
              <LightningIcon className="w-4 h-4" />
              {showHint ? 'Hide hint' : 'Show hint (-50 pts)'}
            </button>
          )}
          
          {showHint && !isSubmitted && (
            <div
              className="mb-6 p-4 bg-[var(--ember-orange)]/10 border-2 border-[var(--ember-orange)]/30 rounded-lg"
              style={{ boxShadow: '0 0 15px var(--ember-glow)' }}
            >
              <p className="text-sm text-[var(--ash-gray)]">
                💡 Try using a loop to iterate through the string from the end to the beginning...
              </p>
            </div>
          )}

          {/* Feedback */}
          {isSubmitted && (
            <div
              className={`
                mb-6 p-5 rounded-lg border-2
                ${
                  isCorrect
                    ? 'bg-[var(--blood-red)]/10 border-[var(--blood-red)]'
                    : 'bg-[var(--ember-orange)]/10 border-[var(--ember-orange)]'
                }
              `}
              style={{
                boxShadow: isCorrect
                  ? '0 0 20px var(--red-glow)'
                  : '0 0 20px var(--ember-glow)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                {isCorrect ? (
                  <>
                    <CheckIcon className="w-6 h-6 text-[var(--blood-red)]" />
                    <p className="font-bold text-[var(--blood-red)] uppercase tracking-wide">
                      Correct! Portal Opening...
                    </p>
                  </>
                ) : (
                  <>
                    <AlertIcon className="w-6 h-6 text-[var(--ember-orange)]" />
                    <p className="font-bold text-[var(--ember-orange)] uppercase tracking-wide">
                      The Upside Down Resists...
                    </p>
                  </>
                )}
              </div>
              <p className="text-sm text-[var(--ash-gray)]">
                {isCorrect
                  ? 'You weakened the dimensional barrier! +250 points earned.'
                  : 'Your solution needs refinement. The darkness grows stronger...'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isSubmitted ? (
              <>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={answer.trim().length === 0}
                >
                  Submit Solution
                </Button>
                <Button variant="ghost" onClick={() => setShowHint(!showHint)}>
                  <LightningIcon className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button variant="primary" fullWidth onClick={handleNext}>
                {isCorrect ? 'Next Challenge →' : 'Try Again'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
