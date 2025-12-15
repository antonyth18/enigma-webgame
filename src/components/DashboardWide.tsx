import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HUD } from './HUD';
import { GameCanvas } from './GameCanvas';
import { QuestionPanel } from './QuestionPanel';
import { Modal } from './Modal';

export function DashboardWide() {
  const [showQuestionModal, setShowQuestionModal] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--bg-void)]">
      {/* Top HUD Bar */}
      <div className="h-20 bg-[var(--bg-void-lighter)] border-b border-[var(--border-default)] px-8 flex items-center justify-between">
        <div>
          <h3 className="text-[var(--text-primary)] mb-1">Mission: Escape the Upside Down</h3>
          <p className="text-sm text-[var(--text-dim)]">
            Solve coding challenges to weaken the Demogorgon
          </p>
        </div>
        <HUD timeRemaining="15:42" score={2450} level={3} lives={2} />
      </div>

      {/* Full Canvas Game Area */}
      <div className="relative h-[calc(100vh-80px)]">
        <GameCanvas />

        {/* Floating Question Modal Trigger */}
        <AnimatePresence>
          {!showQuestionModal && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="
                absolute bottom-8 right-8
                w-16 h-16 rounded-full
                bg-gradient-to-r from-[var(--neon-magenta)] to-[var(--neon-cyan)]
                shadow-[0_0_40px_rgba(255,45,149,0.6)]
                flex items-center justify-center
                cursor-pointer
                hover:scale-110
                transition-transform duration-200
                animate-pulse-glow
              "
              onClick={() => setShowQuestionModal(true)}
              aria-label="Open question"
            >
              <span className="text-2xl">❓</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Info Cards */}
        <motion.div
          className="absolute top-8 left-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-[var(--bg-void-lighter)]/80 backdrop-blur-md border border-[var(--border-glow)] rounded-lg p-4 max-w-xs">
            <h5 className="text-[var(--neon-cyan)] mb-2">Current Objective</h5>
            <p className="text-sm text-[var(--text-secondary)]">
              Answer the coding question correctly to progress to the next level and weaken the Demogorgon's hold.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-8 right-8"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-[var(--bg-void-lighter)]/80 backdrop-blur-md border border-[var(--border-glow)] rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--neon-magenta)]">12</p>
                <p className="text-xs text-[var(--text-dim)]">Solved</p>
              </div>
              <div className="w-px h-8 bg-[var(--border-default)]" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--neon-cyan)]">38</p>
                <p className="text-xs text-[var(--text-dim)]">Remaining</p>
              </div>
              <div className="w-px h-8 bg-[var(--border-default)]" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--neon-green)]">85%</p>
                <p className="text-xs text-[var(--text-dim)]">Accuracy</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-2 bg-[var(--bg-void-lighter)]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div
            className="h-full bg-gradient-to-r from-[var(--neon-magenta)] via-[var(--neon-cyan)] to-[var(--neon-green)] shadow-[0_0_20px_rgba(0,209,255,0.6)]"
            style={{ width: '24%' }}
          />
        </motion.div>
      </div>

      {/* Question Modal */}
      <Modal
        isOpen={showQuestionModal}
        onClose={() => setShowQuestionModal(false)}
        size="lg"
        showClose={true}
      >
        <QuestionPanel variant="modal" />
      </Modal>
    </div>
  );
}
