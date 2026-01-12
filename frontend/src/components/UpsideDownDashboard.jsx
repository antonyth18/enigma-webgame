import { useState } from 'react';
import { StagePortal } from './StagePortal.jsx';
import { StageModal } from './StageModal.jsx';
import { QuestionModal } from './QuestionModal.jsx';
import { DeadTree, RadioTower } from './icons/index.jsx';
import { OtherTeamProgress } from './OtherTeamProgress.jsx';

const initialStages = [
  {
    id: 1,
    label: 'STAGE I',
    name: 'THE BREACH',
    description:
      'The portal has opened. Dark energy corrupts the code. Solve these foundational challenges to stabilize the dimensional rift.',
    unlockPoints: 0,
    questions: [
      {
        number: 1,
        title: 'String Reversal in the Void',
        status: 'active',
        points: 100,
        questionText: 'Write a function that reverses a string. The darkness consumes all forward motion - only backwards can you escape.',
        correctAnswer: 'test',
      },
      {
        number: 2,
        title: 'Array Manipulation Through Darkness',
        status: 'active',
        points: 150,
        questionText: 'Find the maximum value in an array corrupted by the Upside Down. Numbers shift and change - locate the strongest.',
        correctAnswer: 'test',
      },
      {
        number: 3,
        title: 'Loop Through the Upside Down',
        status: 'active',
        points: 200,
        questionText: 'Create a loop that traverses a nested structure. Each layer is darker than the last. Navigate wisely.',
        correctAnswer: 'test',
      },
      {
        number: 4,
        title: 'Conditional Logic in Corrupted Space',
        status: 'active',
        points: 250,
        questionText: 'Implement conditional branching where truth itself is unstable. The Mind Flayer distorts reality - find the correct path.',
        correctAnswer: 'test',
      },
    ],
  },
  {
    id: 2,
    label: 'STAGE II',
    name: 'HAWKINS LAB',
    description:
      'Deep within the laboratory, experiments have failed. Advanced algorithms hide in the shadows. Navigate the darkness to uncover the truth.',
    unlockPoints: 200,
    questions: [
      {
        number: 5,
        title: 'Recursive Descent into the Void',
        status: 'locked',
        points: 300,
        questionText: 'Build a recursive function that explores infinite depth. Each call takes you deeper into the Upside Down.',
        correctAnswer: 'test',
      },
      {
        number: 6,
        title: 'Binary Search Through Dimensions',
        status: 'locked',
        points: 350,
        questionText: 'Search through parallel dimensions using binary search. Time is fracturing - find the target before it is too late.',
        correctAnswer: 'test',
      },
      {
        number: 7,
        title: 'Dynamic Programming in Chaos',
        status: 'locked',
        points: 400,
        questionText: 'Optimize a chaotic system using dynamic programming. Memory itself is corrupted - cache your solutions carefully.',
        correctAnswer: 'test',
      },
      {
        number: 8,
        title: 'Graph Traversal Through Portals',
        status: 'locked',
        points: 450,
        questionText: 'Navigate a graph where edges are unstable portals. Find the shortest path before the connections collapse.',
        correctAnswer: 'test',
      },
    ],
  },
  {
    id: 3,
    label: 'STAGE III',
    name: 'THE MIND FLAYER',
    description:
      'Face the ultimate corruption. The Mind Flayer awaits. Only the most skilled coders can survive these nightmarish algorithmic challenges.',
    unlockPoints: 400,
    questions: [
      {
        number: 9,
        title: 'Advanced Tree Traversal in Darkness',
        status: 'locked',
        points: 500,
        questionText: 'Traverse a corrupted binary tree where nodes shift between dimensions. Balance is lost - restore order.',
        correctAnswer: 'test',
      },
      {
        number: 10,
        title: 'Complex System Design Under Pressure',
        status: 'locked',
        points: 600,
        questionText: 'Design a system that can withstand the Mind Flayer corruption. Architecture must be resilient against supernatural forces.',
        correctAnswer: 'test',
      },
      {
        number: 11,
        title: 'Optimization Through Supernatural Forces',
        status: 'locked',
        points: 700,
        questionText: 'Optimize an algorithm under impossible constraints. Time and space itself are warping - efficiency is survival.',
        correctAnswer: 'test',
      },
      {
        number: 12,
        title: 'The Final Algorithm',
        status: 'locked',
        points: 1000,
        questionText: 'Face the ultimate challenge. The Mind Flayer essence is encoded in this algorithm. Solve it to close the portal forever.',
        correctAnswer: 'test',
      },
    ],
  },
];

export function UpsideDownDashboard({ otherTeamProgress, onProgressUpdate }) {
  const [stages, setStages] = useState(initialStages);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleStageClick = (stageId) => {
    const stage = stages.find((s) => s.id === stageId);
    if (stage && totalPoints >= stage.unlockPoints) {
      setSelectedStage(stageId);
    }
  };

  const handleQuestionClick = (stageId, questionNumber) => {
    const stage = stages.find((s) => s.id === stageId);
    if (!stage) return;

    const question = stage.questions.find((q) => q.number === questionNumber);
    if (question && question.status === 'active') {
      setSelectedQuestion(question);
    }
  };

  const handleCorrectAnswer = () => {
    if (!selectedQuestion) return;

    const newTotalPoints = totalPoints + selectedQuestion.points;
    setTotalPoints(newTotalPoints);

    const newStages = stages.map((stage) => {
      const questionIndex = stage.questions.findIndex(
        (q) => q.number === selectedQuestion.number
      );

      if (questionIndex !== -1) {
        const updatedQuestions = [...stage.questions];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          status: 'completed',
        };

        return {
          ...stage,
          questions: updatedQuestions,
        };
      }

      if (newTotalPoints >= stage.unlockPoints && stage.questions.every((q) => q.status === 'locked')) {
        const unlockedQuestions = stage.questions.map((q) => ({
          ...q,
          status: 'active',
        }));
        return {
          ...stage,
          questions: unlockedQuestions,
        };
      }

      return stage;
    });

    setStages(newStages);
    
    // Notify parent about progress update
    if (onProgressUpdate) {
      onProgressUpdate({
        totalPoints: newTotalPoints,
        completedQuestions: newStages.flatMap(s => s.questions).filter(q => q.status === 'completed').length,
        totalQuestions: newStages.flatMap(s => s.questions).length,
      });
    }
  };

  const isStageUnlocked = (stageId) => {
    const stage = stages.find((s) => s.id === stageId);
    return stage ? totalPoints >= stage.unlockPoints : false;
  };

  return (
    <div className="min-h-screen bg-[var(--void-black)] relative overflow-hidden">
      {/* VHS Grain */}
      <div className="vhs-grain" />

      {/* Atmospheric background gradient */}
      <div className="fixed inset-0 upside-down-gradient -z-10" />
      <div className="fixed inset-0 fog-overlay -z-10" />

      {/* Background silhouettes */}
      <div className="fixed bottom-0 left-10 opacity-8 pointer-events-none -z-10">
        <DeadTree className="w-32 h-64 text-black" />
      </div>
      <div className="fixed bottom-0 left-40 opacity-6 pointer-events-none -z-10">
        <DeadTree className="w-24 h-48 text-black" style={{ transform: 'scaleX(-1)' }} />
      </div>
      <div className="fixed bottom-0 right-16 opacity-10 pointer-events-none -z-10">
        <RadioTower className="w-40 h-80 text-black" />
      </div>

      {/* Top atmospheric glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[var(--blood-red)]/10 blur-[120px] pointer-events-none -z-10" />

      {/* Main Content */}
      <div className="relative z-10 px-12 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full bg-[var(--blood-red)]/20 flex items-center justify-center border-2 border-[var(--blood-red)] animate-pulse-red"
              style={{ boxShadow: '0 0 30px var(--red-glow-strong)' }}
            >
              <div className="w-6 h-6 rounded-full bg-[var(--blood-red)]" />
            </div>
          </div>

          <h1
            className="text-6xl text-[var(--blood-red)] mb-4 animate-flicker-red"
            style={{
              fontFamily: 'Cinzel, serif',
              textShadow: 'var(--glow-red-strong)',
            }}
          >
            ESCAPE THE UPSIDE DOWN
          </h1>
          <p className="text-lg text-[var(--ash-gray)] max-w-3xl mx-auto leading-relaxed">
            Navigate through corrupted dimensions. Solve algorithmic challenges to close the
            portal. Choose your stage and face the darkness within.
          </p>

          {/* Points Display */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--blood-red)] to-transparent" />
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 100 100"
                fill="currentColor"
                className="text-[var(--ember-orange)]"
              >
                <path d="M 50 10 L 60 38 L 90 38 L 66 56 L 76 84 L 50 66 L 24 84 L 34 56 L 10 38 L 40 38 Z" />
              </svg>
              <span className="text-2xl font-bold text-[var(--ember-orange)]">
                {totalPoints}
              </span>
              <span className="text-sm text-[var(--ash-dim)] uppercase tracking-widest">
                Points Earned
              </span>
            </div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--blood-red)] to-transparent" />
          </div>

          {/* Subtitle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--blood-red)] to-transparent" />
            <span className="text-sm text-[var(--ash-dim)] uppercase tracking-widest">
              Select A Gateway
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--blood-red)] to-transparent" />
          </div>
        </div>

        {/* Other Team Progress */}
        {otherTeamProgress && (
          <OtherTeamProgress 
            progress={otherTeamProgress}
            worldName="Hawkins Lab"
            accentColor="#FFA500"
          />
        )}

        {/* Stage Portals - Horizontal Layout */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-3 gap-8">
            {stages.map((stage) => {
              const isUnlocked = isStageUnlocked(stage.id);
              return (
                <div key={stage.id} className="relative">
                  <StagePortal
                    stageNumber={stage.id}
                    label={stage.label}
                    difficulty={stage.id === 2 ? 'medium' : 'hard'}
                    isSelected={false}
                    onClick={() => handleStageClick(stage.id)}
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-[var(--ash-darker)]/40 border-2 border-[var(--ash-darker)] flex items-center justify-center mx-auto mb-3">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-[var(--ash-darker)]"
                          >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <p className="text-sm text-[var(--ash-darker)] font-bold uppercase tracking-wide">
                          Locked
                        </p>
                        <p className="text-xs text-[var(--ash-darker)] mt-1">
                          Requires {stage.unlockPoints} points
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom atmospheric decoration */}
        <div className="mt-20 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-[var(--void-dark)]/80 border border-[var(--blood-red)]/30 backdrop-blur-sm"
            style={{ boxShadow: 'inset 0 0 30px rgba(229, 9, 20, 0.1)' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="text-[var(--blood-red)] animate-pulse-red"
            >
              <path d="M 50 10 L 90 85 L 10 85 Z" />
              <rect x="46" y="35" width="8" height="25" rx="2" fill="var(--void-black)" />
              <circle cx="50" cy="70" r="5" fill="var(--void-black)" />
            </svg>
            <p className="text-sm text-[var(--ash-gray)]">
              <span className="font-bold text-[var(--blood-red)]">Warning:</span> The dimensional
              rift is unstable. Select a stage to begin your journey.
            </p>
          </div>
        </div>

        {/* Portal status footer */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-2 h-2 bg-[var(--blood-red)] rounded-full animate-pulse-red"
              style={{ boxShadow: '0 0 10px var(--red-glow)' }}
            />
            <span className="text-xs text-[var(--ash-dim)] uppercase tracking-widest">
              Portal Network Online · {stages.length} Gateways · {stages.filter((s) => isStageUnlocked(s.id)).length} Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Bottom red glow */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[var(--blood-red)]/5 to-transparent pointer-events-none -z-10" />

      {/* Stage Modal */}
      {selectedStage && (
        <StageModal
          stageNumber={selectedStage}
          stageName={stages.find((s) => s.id === selectedStage)?.name || ''}
          description={stages.find((s) => s.id === selectedStage)?.description || ''}
          questions={stages.find((s) => s.id === selectedStage)?.questions || []}
          isOpen={selectedStage !== null}
          onClose={() => setSelectedStage(null)}
          onQuestionClick={(questionNumber) =>
            handleQuestionClick(selectedStage, questionNumber)
          }
        />
      )}

      {/* Question Modal */}
      {selectedQuestion && (
        <QuestionModal
          questionNumber={selectedQuestion.number}
          title={selectedQuestion.title}
          questionText={selectedQuestion.questionText}
          points={selectedQuestion.points}
          isOpen={selectedQuestion !== null}
          onClose={() => setSelectedQuestion(null)}
          onCorrectAnswer={handleCorrectAnswer}
        />
      )}
    </div>
  );
}
