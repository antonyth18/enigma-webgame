import { Sidebar } from './Sidebar';
import { GameCanvas } from './GameCanvas';
import { QuestionPanel } from './QuestionPanel';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--void-black)] flex relative overflow-hidden">
      {/* VHS grain effect */}
      <div className="vhs-grain" />

      {/* Atmospheric background */}
      <div className="absolute inset-0 upside-down-gradient" />
      <div className="absolute inset-0 fog-overlay opacity-40" />

      {/* Left Sidebar */}
      <Sidebar username="Survivor" health={75} score={2450} level={5} />

      {/* Main Content Area */}
      <main className="flex-1 flex gap-6 p-6 relative z-10">
        {/* Game Canvas - Center */}
        <div className="flex-1">
          <GameCanvas />
        </div>

        {/* Question Panel - Right */}
        <div className="w-96">
          <QuestionPanel />
        </div>
      </main>
    </div>
  );
}
