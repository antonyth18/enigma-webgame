import { useState, useEffect } from 'react';
import { api } from '../api';
import { StagePortalLab } from './StagePortalLab';
import { StageModalLab } from './StageModalLab';
import { QuestionModalLab } from './QuestionModalLab';
import { OtherTeamProgress } from './OtherTeamProgress';

const STAGE_METADATA = [
  {
    id: 1,
    label: 'LEVEL 1',
    name: 'CONTAINMENT BREACH',
    description: 'Security systems have failed. The specimens are loose. Solve these protocols to restore containment.',
    unlockPoints: 0,
  },
  {
    id: 2,
    label: 'LEVEL 2',
    name: 'EXPERIMENT 001',
    description: 'Deep in the restricted wing, forbidden experiments await. Navigate the protocols to uncover the truth.',
    unlockPoints: 200,
  },
  {
    id: 3,
    label: 'LEVEL 3',
    name: 'THE DIRECTOR',
    description: 'Face the final protocols. The Director AI has gone rogue.',
    unlockPoints: 400,
  },
];

export function HawkinsLabDashboard({ otherTeamProgress, onProgressUpdate, onLogout, cipherCode, keyCode }) {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      let initialStages = [];
      let currentTotalPoints = 0;

      try {
        const questions = await api.get('/game/questions');
        // Group questions into stages
        initialStages = STAGE_METADATA.map((meta, index) => {
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

        // 2. Fetch current team data (score and potentially more)
        try {
          const team = await api.get('/teams/me');
          if (team) {
            currentTotalPoints = team.score;
            setTotalPoints(team.score);

            // 3. Update stage unlock status based on fetched totalPoints
            initialStages = initialStages.map(stage => {
              // If points enough, mark active if not already completed maybe? 
              // Actually the existing logic relies on manual click or automatic?
              // Simplified: Stages are unlocked if points >= unlockPoints
              if (currentTotalPoints >= stage.unlockPoints) {
                const updatedQuestions = stage.questions.map(q => {
                  // Only unlock if not already completed
                  if (q.status === 'locked') {
                    return { ...q, status: 'active' };
                  }
                  return q;
                });
                return { ...stage, questions: updatedQuestions };
              }
              return stage;
            });
          }
        } catch (err) {
          console.error("Failed to fetch team data", err);
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

  const handleCorrectAnswer = async (submittedContent) => {
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

      {/* Background - Lab themed */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse at top, #1A0F00 0%, #000000 50%, #000000 100%)',
      }} />
      <div className="fixed inset-0 -z-10" style={{
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(255, 165, 0, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 60%, rgba(184, 134, 11, 0.06) 0%, transparent 50%)
        `,
        animation: 'fog-flicker 4s ease-in-out infinite',
      }} />

      {/* Lab equipment silhouettes */}
      <div className="fixed bottom-0 left-10 opacity-10 pointer-events-none -z-10">
        <svg viewBox="0 0 100 200" className="w-32 h-64 text-black">
          {/* Beaker */}
          <path d="M 30 20 L 30 60 L 20 100 L 20 140 Q 20 160, 50 160 Q 80 160, 80 140 L 80 100 L 70 60 L 70 20 Z" fill="currentColor" opacity="0.9" />
          <rect x="25" y="15" width="50" height="8" fill="currentColor" />
        </svg>
      </div>
      <div className="fixed bottom-0 right-16 opacity-12 pointer-events-none -z-10">
        <svg viewBox="0 0 100 200" className="w-40 h-80 text-black">
          {/* Laboratory stand */}
          <rect x="10" y="180" width="80" height="20" fill="currentColor" opacity="0.9" />
          <rect x="45" y="20" width="10" height="160" fill="currentColor" opacity="0.85" />
          <circle cx="50" cy="30" r="15" fill="currentColor" opacity="0.7" />
        </svg>
      </div>

      {/* Top atmospheric glow - orange/amber */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#FFA500]/10 blur-[120px] pointer-events-none -z-10" />

      {/* Main Content */}
      <div className="relative z-10 px-12 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full bg-[#FFA500]/20 flex items-center justify-center border-2 border-[#FFA500]"
              style={{
                boxShadow: '0 0 30px rgba(255, 165, 0, 0.8)',
                animation: 'pulse-yellow 2s ease-in-out infinite'
              }}
            >
              <div className="w-6 h-6 rounded-full bg-[#FFA500]" />
            </div>
          </div>

          <h1
            className="text-6xl text-[#FFA500] mb-4"
            style={{
              fontFamily: 'Cinzel, serif',
              textShadow: '0 0 30px rgba(255, 165, 0, 0.8)',
              animation: 'flicker-yellow 3s ease-in-out infinite',
            }}
          >
            ESCAPE THE HAWKINS LAB
          </h1>
          <p className="text-lg text-[var(--ash-gray)] max-w-3xl mx-auto leading-relaxed">
            Infiltrate the secret facility. Override security protocols. Uncover the experiments.
            Escape before the lockdown becomes permanent.
          </p>

          {/* Dashboard Codes */}
          <div className="mt-8 flex items-center justify-center gap-12 bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-[#FFA500]/20 inline-flex mx-auto">
            {/* Clearance Points */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-[#FFD700]">
                {totalPoints}
              </span>
              <span className="text-[10px] text-[var(--ash-dim)] uppercase tracking-widest">
                Clearance Points
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-10 bg-[#FFA500]/30" />

            {/* Codes Grid */}
            <div className="flex gap-8">
              {cipherCode && (
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] text-[#E50914] font-bold uppercase tracking-[0.2em] mb-1">
                    Cipher (Upside Down)
                  </span>
                  <span className="text-xl font-bold text-[#E50914] font-mono tracking-wider">
                    {cipherCode}
                  </span>
                </div>
              )}

              {keyCode && (
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] text-[#FFA500] font-bold uppercase tracking-[0.2em] mb-1">
                    Key (Hawkins Lab)
                  </span>
                  <span className="text-xl font-bold text-[#FFA500] font-mono tracking-wider">
                    {keyCode}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Subtitle */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FFA500] to-transparent" />
            <span className="text-sm text-[var(--ash-dim)] uppercase tracking-widest">
              Select Security Level
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FFA500] to-transparent" />
          </div>
        </div>

        {/* Other Team Progress */}
        {otherTeamProgress && (
          <OtherTeamProgress
            progress={otherTeamProgress}
            worldName="Upside Down"
            accentColor="#E50914"
          />
        )}

        {/* Stage Portals */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-3 gap-8">
            {stages.map((stage) => {
              const isUnlocked = isStageUnlocked(stage.id);
              return (
                <div key={stage.id} className="relative">
                  <StagePortalLab
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

        {/* Warning message */}
        <div className="mt-20 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-[var(--void-dark)]/80 border border-[#FFA500]/30 backdrop-blur-sm"
            style={{ boxShadow: 'inset 0 0 30px rgba(255, 165, 0, 0.1)' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="text-[#FFA500]"
              style={{ animation: 'pulse-yellow 2s ease-in-out infinite' }}
            >
              <path d="M 50 10 L 90 85 L 10 85 Z" />
              <rect x="46" y="35" width="8" height="25" rx="2" fill="var(--void-black)" />
              <circle cx="50" cy="70" r="5" fill="var(--void-black)" />
            </svg>
            <p className="text-sm text-[var(--ash-gray)]">
              <span className="font-bold text-[#FFA500]">Security Alert:</span> Unauthorized access detected.
              Complete protocols to restore containment.
            </p>
          </div>
        </div>

        {/* Status footer */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-2 h-2 bg-[#FFA500] rounded-full"
              style={{
                boxShadow: '0 0 10px rgba(255, 165, 0, 0.8)',
                animation: 'pulse-yellow 2s ease-in-out infinite'
              }}
            />
            <span className="text-xs text-[var(--ash-dim)] uppercase tracking-widest">
              Facility Status: Active · {stages.length} Security Levels · {stages.filter((s) => isStageUnlocked(s.id)).length} Accessible
            </span>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#FFA500]/5 to-transparent pointer-events-none -z-10" />

      {/* Stage Modal */}
      {selectedStage && (
        <StageModalLab
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
        <QuestionModalLab
          questionId={selectedQuestion.id}
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