import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api';
import "./Login.css";

export default function App({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState('auth');
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    teamName: '',
    email: '',
    password: '',
    // Subteam is initially null/empty until selected on the next screen
    subteam: null
  });
  const [baseCode, setBaseCode] = useState('');
  const [finalTeamCode, setFinalTeamCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPortal, setUserPortal] = useState(localStorage.getItem('portal') || null);
  const [error, setError] = useState(null);

  // Function to generate the random part of the code
  const generateRandomSegments = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${segment()}-${segment()}`;
  }, []);

  // Function to update the final code whenever the subteam or base code changes
  useEffect(() => {
    if (baseCode && formData.subteam) {
      // Final code is formed using the selected subteam prefix
      setFinalTeamCode(`ENIG-${formData.subteam}-${baseCode}`);
    } else if (baseCode) {
      // If subteam is not selected yet, show a placeholder
      setFinalTeamCode(`ENIG-X-${baseCode}`);
    }
  }, [baseCode, formData.subteam]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (isSignup) {
      // 1. Generate the random part of the code immediately on sign up
      const randomSegments = generateRandomSegments();
      setBaseCode(randomSegments);
      // 2. Transition to the 'signed-up' state
      setAuthState('signed-up');
    } else {
      setIsLoading(true);
      try {
        // Try login with email and password first
        const res = await api.post('/auth/login', {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        if (res.user.portal) {
          localStorage.setItem('portal', res.user.portal);
          setUserPortal(res.user.portal);
        }

        // Always ask for team code after login as requested
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        if (res.team) localStorage.setItem('team', JSON.stringify(res.team));

        setAuthState('logged-in');
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      // Call Login API
      const res = await api.post('/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        teamCode: enteredCode.trim(),
      });

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.team) localStorage.setItem('team', JSON.stringify(res.team));

      if (onLoginSuccess) onLoginSuccess();
      navigate('/dashboard');
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATED: Handle change in subteam selection
  const handleSelectChange = (e) => {
    setFormData(prev => ({
      ...prev,
      subteam: e.target.value
    }));
  };

  const handleCopyCode = async () => {
    if (finalTeamCode) {
      await navigator.clipboard.writeText(finalTeamCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError(null);
  };

  const subteamName = formData.subteam === 'A' ? 'Cipher' : (formData.subteam === 'B' ? 'Key' : 'Select a Subteam');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden">
      {/* Animated background grid pattern for sci-fi effect */}
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </motion.div>

      {/* Animated red glow orbs in background */}
      {/* ... (Glow Orbs unchanged) ... */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Scanline effect */}
      {/* ... (Scanline unchanged) ... */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239, 68, 68, 0.5) 2px, rgba(239, 68, 68, 0.5) 4px)',
        }}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main authentication panel */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ENIGMA Title - Centered above panel */}
        {/* ... (Title unchanged) ... */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl font-bold text-red-500 tracking-[0.2em]"
            animate={{
              opacity: [0.7, 1, 0.7],
              textShadow: [
                '0 0 20px rgba(239, 68, 68, 0.5)',
                '0 0 30px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.5)',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ENIGMA
          </motion.h1>
        </motion.div>

        <motion.div
          className="relative bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800/50 shadow-2xl"
          style={{
            boxShadow: '0 0 60px rgba(239, 68, 68, 0.15), 0 0 100px rgba(239, 68, 68, 0.08)'
          }}
          animate={{
            boxShadow: [
              '0 0 60px rgba(239, 68, 68, 0.15), 0 0 100px rgba(239, 68, 68, 0.08)',
              '0 0 80px rgba(239, 68, 68, 0.2), 0 0 120px rgba(239, 68, 68, 0.12)',
              '0 0 60px rgba(239, 68, 68, 0.15), 0 0 100px rgba(239, 68, 68, 0.08)',
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={authState + isSignup.toString()}
                  className="uppercase tracking-wide text-white"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {authState === 'signed-up'
                    ? 'Select Subteam'
                    : authState === 'logged-in'
                      ? (userPortal === 'hawkins_lab' ? 'Hawkins Access' : userPortal === 'upside_down' ? 'Void Frequency' : 'Enter team code')
                      : isSignup ? 'Create account' : 'Sign in'}
                </motion.h2>
              </AnimatePresence>
            </div>
            <motion.button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-red-500/30 text-zinc-400 hover:text-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
              aria-label="Close"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  scale: 1,
                  x: [0, -4, 4, -4, 4, 0]
                }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{
                  x: { duration: 0.4 },
                  default: { duration: 0.3 }
                }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-500/30">
                    <span className="text-red-500 font-bold text-xs">!</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-red-400 uppercase tracking-widest mb-1">Authorization ERROR</p>
                    <p className="text-xs text-red-200/70 leading-relaxed font-mono">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Auth Form (Subteam dropdown REMOVED) */}
            {authState === 'auth' && (
              <motion.div
                key="auth-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Team name field */}
                  <AnimatePresence>
                    {isSignup && (
                      <>
                        {/* Team Name Input */}
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label htmlFor="teamName" className="block text-zinc-100">
                            Team name
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-zinc-600"
                            placeholder="Enter your team name"
                            required={isSignup}
                          />
                        </motion.div>
                        {/* Subteam Dropdown was HERE, now removed */}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Email field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="email" className="block text-zinc-100">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-zinc-600"
                      placeholder="Enter your email"
                      required
                    />
                  </motion.div>

                  {/* Password field */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="password" className="block text-zinc-100">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-zinc-600"
                      placeholder="Enter your password"
                      required
                    />
                  </motion.div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 text-white rounded-lg transition-all duration-300 mt-8 shadow-lg ${isLoading ? 'bg-zinc-700/50 cursor-not-allowed shadow-none' : 'bg-red-600 hover:bg-red-500 shadow-red-500/20 hover:shadow-red-500/40 hover:shadow-xl'}`}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {isLoading ? 'Processing...' : (isSignup ? 'Create account' : 'Sign in')}
                  </motion.button>
                </form>

                {/* Footer toggle */}
                <motion.div
                  className="mt-6 text-center text-zinc-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isSignup ? (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300 underline-offset-4 hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300 underline-offset-4 hover:underline"
                      >
                        Create one
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Team Code Display (with dropdown) - shown after sign up */}
            {authState === 'signed-up' && (
              <motion.div
                key="signed-up"
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="bg-black/50 border border-red-500/30 rounded-lg p-6 space-y-4"
                  animate={{
                    borderColor: ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.5)', 'rgba(239, 68, 68, 0.3)'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <p className="text-zinc-400">Your account is ready. Select your **Subteam** below to finalize your **Team Code**:</p>

                  {/* NEW: Subteam Dropdown on the signed-up screen */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="subteam" className="block text-zinc-100">
                      Choose Your Designation:
                    </label>
                    <div className="relative">
                      <select
                        id="subteam"
                        name="subteam"
                        value={formData.subteam || ''}
                        onChange={handleSelectChange}
                        className="appearance-none w-full px-4 py-3 bg-black/50 border border-zinc-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-zinc-600 cursor-pointer pr-10"
                        required
                      >
                        <option value="" disabled>-- Select a Subteam --</option>
                        <option value="A">Subteam A (Cipher)</option>
                        <option value="B">Subteam B (Key)</option>
                      </select>
                      {/* Custom caret for the select input */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Team Code Display */}
                  <div className="relative">
                    <motion.div
                      className={`bg-zinc-950 border rounded-lg p-4 font-mono text-center transition-colors duration-500 ${formData.subteam ? 'border-red-500/50' : 'border-zinc-700/50'}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <motion.div
                        className="text-2xl tracking-widest text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 1] }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        {finalTeamCode.split('').map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.button
                      type="button"
                      onClick={handleCopyCode}
                      disabled={!formData.subteam} // Disable until subteam is selected
                      className={`absolute top-2 right-2 p-2 rounded-md transition-all duration-300 border border-zinc-700/50 ${formData.subteam ? 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-red-400' : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'}`}
                      aria-label="Copy code"
                      whileHover={formData.subteam ? { scale: 1.1 } : {}}
                      whileTap={formData.subteam ? { scale: 0.9 } : {}}
                    >
                      <AnimatePresence mode="wait">
                        {isCopied ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                          >
                            <Check className="w-4 h-4 text-green-400" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Copy className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>

                  {/* Indication of the prefix */}
                  <motion.div
                    className={`border rounded-lg p-3 transition-colors duration-500 ${formData.subteam ? 'bg-red-950/20 border-red-500/20' : 'bg-yellow-950/20 border-yellow-500/20'}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className={`text-sm ${formData.subteam ? 'text-red-400/80' : 'text-yellow-400/80 font-bold'}`}>
                      {formData.subteam
                        ? `✅ Final Team Code generated. You are Subteam ${formData.subteam} (${subteamName}).`
                        : `⚠️ Select a Subteam above. Your current code prefix is a placeholder (X).`
                      }
                    </p>
                  </motion.div>

                </motion.div>

                <motion.button
                  type="button"
                  onClick={async () => {
                    if (isLoading) return;
                    setIsLoading(true);
                    try {
                      // Call Signup API
                      const res = await api.post('/auth/signup', {
                        email: formData.email.trim().toLowerCase(),
                        password: formData.password,
                        teamName: formData.teamName,
                        teamCode: finalTeamCode,
                        // Portal is selected later
                      });

                      localStorage.setItem('token', res.token);
                      localStorage.setItem('user', JSON.stringify(res.user));
                      localStorage.setItem('team', JSON.stringify(res.team));

                      if (onLoginSuccess) onLoginSuccess();
                      navigate('/dashboard');
                      setError(null);
                    } catch (err) {
                      console.error(err);
                      setError(err.message);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={!formData.subteam || isLoading} // Disable until subteam is selected
                  className={`w-full py-3 text-white rounded-lg transition-all duration-300 shadow-lg ${formData.subteam ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20 hover:shadow-red-500/40' : 'bg-zinc-700/50 cursor-not-allowed shadow-none'} ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                  whileHover={formData.subteam && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={formData.subteam && !isLoading ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  {isLoading ? 'Processing...' : (formData.subteam ? 'Continue to dashboard' : 'Select Subteam to Continue')}
                </motion.button>
              </motion.div>
            )}

            {/* Team Code Input - shown after login */}
            {/* ... (Login form unchanged) ... */}
            {authState === 'logged-in' && (
              <motion.div
                key="logged-in"
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <motion.p
                  className={userPortal === 'hawkins_lab' ? 'text-amber-400' : 'text-zinc-100'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {userPortal === 'hawkins_lab'
                    ? 'Infiltration authorized. Enter the Lab Access Code:'
                    : userPortal === 'upside_down'
                      ? 'The gateway is open. Enter the Void Frequency Code:'
                      : 'Enter your team code to access the challenges:'}
                </motion.p>

                <form onSubmit={handleCodeSubmit} className="space-y-5">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="teamCode" className="block text-zinc-100">
                      Team code
                    </label>
                    <input
                      type="text"
                      id="teamCode"
                      name="teamCode"
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                      className={`w-full px-4 py-3 bg-black/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 ${userPortal === 'hawkins_lab' ? 'focus:ring-amber-500' : 'focus:ring-red-500'} focus:border-transparent transition-all duration-300 hover:border-zinc-600 font-mono tracking-wider text-center`}
                      placeholder={userPortal === 'hawkins_lab' ? "LAB-XXXX-XXXX" : userPortal === 'upside_down' ? "VOID-XXXX-XXXX" : "ENIG-X-XXXX-XXXX"}
                      required
                      pattern="[A-Z0-9\-]+"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 text-white rounded-lg transition-all duration-300 shadow-lg ${isLoading ? 'bg-zinc-700/50 cursor-not-allowed shadow-none' : (userPortal === 'hawkins_lab' ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20 hover:shadow-amber-500/40' : 'bg-red-600 hover:bg-red-500 shadow-red-500/20 hover:shadow-red-500/40')} hover:shadow-xl`}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {isLoading ? 'Processing...' : 'Enter'}
                  </motion.button>
                </form>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    type="button"
                    onClick={() => setAuthState('auth')}
                    className="text-zinc-500 hover:text-zinc-400 transition-colors duration-300"
                  >
                    ← Back to login
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Decorative corner accents with animation */}
        {/* ... (Corner accents unchanged) ... */}
        <motion.div
          className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-red-500/30 rounded-tl-lg"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-red-500/30 rounded-tr-lg"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-red-500/30 rounded-bl-lg"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-red-500/30 rounded-br-lg"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </motion.div>
    </div>
  );
}