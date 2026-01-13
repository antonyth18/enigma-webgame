import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { WorldSelection } from '../components/WorldSelection.jsx';
import { HawkinsLabDashboard } from '../components/HawkinsLabDashboard.jsx';
import { UpsideDownDashboard } from '../components/UpsideDownDashboard.jsx';
import "./Dashboard.css";

export default function App({ onAuthChange }) {
  const [selectedWorld, setSelectedWorld] = useState(null); // null, 'upside_down', or 'hawkins_lab'
  const [upsideDownProgress, setUpsideDownProgress] = useState(null);
  const [hawkinsLabProgress, setHawkinsLabProgress] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Read portal from local user object
  const userStr = localStorage.getItem('user');
  const userObj = userStr ? JSON.parse(userStr) : {};
  const lockedWorld = userObj.portal || userObj.currentWorld || null;
  const otherTeamWorld = null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const portal = user.portal || user.currentWorld;
      if (portal) {
        setSelectedWorld(portal);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('team');
    setIsLoggedIn(false);
    setSelectedWorld(null);
    if (onAuthChange) onAuthChange();
    navigate('/login');
  };

  const handleWorldSelection = async (worldId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/auth/portal', { portal: worldId }, token);

      // Update local user object too
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.portal = worldId;
      user.currentWorld = worldId;
      localStorage.setItem('user', JSON.stringify(user));

      localStorage.setItem('token', res.token);
      setSelectedWorld(worldId);
    } catch (err) {
      console.error('Failed to select world:', err);
      alert('Failed to enter portal. Please try again.');
    }
  };

  const handleUpsideDownProgress = (progress) => {
    setUpsideDownProgress(progress);
  };

  const handleHawkinsLabProgress = (progress) => {
    setHawkinsLabProgress(progress);
  };

  // Read team from local storage
  const teamStr = localStorage.getItem('team');
  const teamObj = teamStr ? JSON.parse(teamStr) : {};
  const currentCode = teamObj.code || '';

  // Derive both codes
  let cipherCode = currentCode;
  let keyCode = currentCode;

  if (currentCode.startsWith('ENIG-')) {
    const parts = currentCode.split('-');
    if (parts.length === 4) {
      const randomPart = `${parts[2]}-${parts[3]}`;
      cipherCode = `ENIG-A-${randomPart}`;
      keyCode = `ENIG-B-${randomPart}`;
    }
  }

  // If no world selected, show selection screen
  if (!selectedWorld) {
    return (
      <WorldSelection
        onSelectWorld={handleWorldSelection}
        lockedWorld={lockedWorld}
        otherTeamWorld={otherTeamWorld}
        isLoggedIn={isLoggedIn}
        onLogin={() => navigate('/login')}
        onLogout={handleLogout}
      />
    );
  }

  // Show selected world's dashboard
  if (selectedWorld === 'upside_down') {
    return (
      <UpsideDownDashboard
        otherTeamProgress={hawkinsLabProgress}
        onProgressUpdate={handleUpsideDownProgress}
        onLogout={handleLogout}
        cipherCode={cipherCode}
        keyCode={keyCode}
      />
    );
  }

  if (selectedWorld === 'hawkins_lab') {
    return (
      <HawkinsLabDashboard
        otherTeamProgress={upsideDownProgress}
        onProgressUpdate={handleHawkinsLabProgress}
        onLogout={handleLogout}
        cipherCode={cipherCode}
        keyCode={keyCode}
      />
    );
  }

  return null;
}
