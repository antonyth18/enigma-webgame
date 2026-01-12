import { useState } from 'react';
import { WorldSelection } from '../components/WorldSelection.jsx';
import { HawkinsLabDashboard } from '../components/HawkinsLabDashboard.jsx';
import { UpsideDownDashboard } from '../components/UpsideDownDashboard.jsx';
import "./Dashboard.css";

export default function App() {
  const [selectedWorld, setSelectedWorld] = useState(null); // null, 'upside-down', or 'hawkins-lab'
  const [upsideDownProgress, setUpsideDownProgress] = useState(null);
  const [hawkinsLabProgress, setHawkinsLabProgress] = useState(null);

  // For demo purposes, set to null to lock the other world after selection
  // Set to the same value as selectedWorld to keep both unlocked
  const lockedWorld = null; // Change this to selectedWorld to enable locking

  // Simulated other team's world (for demo, this would come from server/shared state)
  const otherTeamWorld = null; // Can be 'upside-down' or 'hawkins-lab'

  const handleWorldSelection = (worldId) => {
    setSelectedWorld(worldId);
  };

  const handleUpsideDownProgress = (progress) => {
    setUpsideDownProgress(progress);
  };

  const handleHawkinsLabProgress = (progress) => {
    setHawkinsLabProgress(progress);
  };

  // If no world selected, show selection screen
  if (!selectedWorld) {
    return (
      <WorldSelection
        onSelectWorld={handleWorldSelection}
        lockedWorld={lockedWorld}
        otherTeamWorld={otherTeamWorld}
      />
    );
  }

  // Show selected world's dashboard
  if (selectedWorld === 'upside-down') {
    return (
      <UpsideDownDashboard
        otherTeamProgress={hawkinsLabProgress}
        onProgressUpdate={handleUpsideDownProgress}
      />
    );
  }

  if (selectedWorld === 'hawkins-lab') {
    return (
      <HawkinsLabDashboard
        otherTeamProgress={upsideDownProgress}
        onProgressUpdate={handleHawkinsLabProgress}
      />
    );
  }

  return null;
}
