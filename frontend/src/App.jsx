import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemedNavbar from "./pages/ThemedNavbar";
import Leader from "./pages/Leader";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('team');
    setIsLoggedIn(false);
    window.location.href = '/login'; // Force reload to clear all states across components
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-neutral-200">
        <ThemedNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard onAuthChange={() => setIsLoggedIn(!!localStorage.getItem('token'))} />} />
          <Route path="/leader" element={<Leader />} />
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
