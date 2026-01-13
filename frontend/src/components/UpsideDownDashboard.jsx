import { useState, useEffect } from 'react';
import { api } from '../api';
import { StagePortal } from './StagePortal.jsx';
import { StageModal } from './StageModal.jsx';
import { QuestionModal } from './QuestionModal.jsx';
import { DeadTree, RadioTower } from './icons/index.jsx';
import { OtherTeamProgress } from './OtherTeamProgress.jsx';

const STAGE_METADATA = [
  {
    id: 1,
    label: 'STAGE I',
    name: 'THE BREACH',
    description: 'The portal has opened. Dark energy corrupts the code. Solve these foundational challenges.',
    unlockPoints: 0,
  },
  {
    id: 2,
    label: 'STAGE II',
    name: 'EXPERIMENT 001',
    description: 'Deep within the laboratory, experiments have failed. Advanced algorithms hide in the shadows.',
    unlockPoints: 200,
  },
  {
    id: 3,
    label: 'STAGE III',
    name: 'THE MIND FLAYER',
    description: 'Face the ultimate corruption. The Mind Flayer awaits.',
    unlockPoints: 400,
  },
];

export function UpsideDownDashboard({ otherTeamProgress, onProgressUpdate, onLogout, cipherCode, keyCode }) {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const questions = await api.get('/game/questions');
        let initialStages = STAGE_METADATA.map((meta, index) => {
          const stageQs = questions.slice(index * 4, (index + 1) * 4).map((q, i) => {
            let status = 'locked';
            if (index === 0) status = 'active';
            if (q.isCompleted) status = 'completed';

            return {
              ...q,
              number: index * 4 + i + 1,
              questionText: q.description,
              status
            };
          });
          return { ...meta, questions: stageQs };
        });

        // Fetch current team score and unlock stages
        try {
          const team = await api.get('/teams/me');
          if (team) {
            setTotalPoints(team.score);

            initialStages = initialStages.map(stage => {
              if (team.score >= stage.unlockPoints) {
                const updatedQuestions = stage.questions.map(q => {
                  if (q.status === 'locked') return { ...q, status: 'active' };
                  return q;
                });
                return { ...stage, questions: updatedQuestions };
              }
              return stage;
            });
          }
        } catch (err) {
          console.error("Failed to fetch team score", err);
        }

        setStages(initialStages);
      } catch (e) {
        console.error("Failed to load questions", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
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

  const handleCorrectAnswer = async (answer) => {
    if (!selectedQuestion) return;

    try {
      const res = await api.post('/game/answers', {
        questionId: selectedQuestion.id,
        answer: answer
      });

      if (res.isCorrect) {
        const newTotalPoints = totalPoints + (res.pointsAwarded || 0); // Use server points or local if consistent
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
        return true; // Success
      } else {
        return false; // Incorrect
      }
    } catch (e) {
      console.error("Answer submission failed", e);
      alert("Error submitting answer");
      return false;
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

          {/* Dashboard Codes */}
          <div className="mt-8 flex items-center justify-center gap-12 bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-[var(--blood-red)]/20 inline-flex mx-auto">
            {/* Points Earned */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-[var(--ember-orange)]">
                {totalPoints}
              </span>
              <span className="text-[10px] text-[var(--ash-dim)] uppercase tracking-widest">
                Points Earned
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-10 bg-[var(--blood-red)]/30" />

            {/* Codes Grid */}
            <div className="flex gap-8">
              {cipherCode && (
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] text-[var(--blood-red)] font-bold uppercase tracking-[0.2em] mb-1">
                    Cipher (Upside Down)
                  </span>
                  <span className="text-xl font-bold text-[var(--blood-red)] font-mono tracking-wider" style={{ textShadow: '0 0 10px var(--blood-red)' }}>
                    {cipherCode}
                  </span>
                </div>
              )}

              {keyCode && (
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] text-[var(--ember-orange)] font-bold uppercase tracking-[0.2em] mb-1">
                    Key (Hawkins Lab)
                  </span>
                  <span className="text-xl font-bold text-[var(--ember-orange)] font-mono tracking-wider">
                    {keyCode}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Subtitle */}
          <div className="mt-12 flex items-center justify-center gap-3">
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
          questionId={selectedQuestion.id}
          questionNumber={selectedQuestion.number}
          title={selectedQuestion.title}
          questionText={selectedQuestion.questionText}
          points={selectedQuestion.points}
          isOpen={selectedQuestion !== null}
          onClose={() => setSelectedQuestion(null)}
          onCorrectAnswer={(answer) => handleCorrectAnswer(answer)}
        />
      )}
    </div>
  );
}
