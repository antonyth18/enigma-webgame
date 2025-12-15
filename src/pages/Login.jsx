import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import "./Login.css";

export default function App() {
  const [authState, setAuthState] = useState('auth'); 
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    teamName: '',
    email: '',
    password: ''
  });
  const [teamCode, setTeamCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateTeamCode = () => {
    // Generate a random team code (e.g., ENIG-A7B2-C4D9)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `ENIG-${segment()}-${segment()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      const code = generateTeamCode();
      setTeamCode(code);
      setAuthState('signed-up');
    } else {
      setAuthState('logged-in');
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    console.log('Team code entered:', enteredCode);
    // Here you would verify the code
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(teamCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Removed explicit type e: React.ChangeEvent<HTMLInputElement>
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

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
                  {authState === 'signed-up' ? 'Team created' : authState === 'logged-in' ? 'Enter team code' : isSignup ? 'Create account' : 'Sign in'}
                </motion.h2>
              </AnimatePresence>
            </div>
            <motion.button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-red-500/30 text-zinc-400 hover:text-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
              aria-label="Close"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {/* Auth Form - shown when not logged in or signed up */}
            {authState === 'auth' && (
              <motion.div
                key="auth-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Team name field - only shown in signup mode */}
                  <AnimatePresence>
                    {isSignup && (
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
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-300 mt-8 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {isSignup ? 'Create account' : 'Sign in'}
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

            {/* Team Code Display - shown after signup */}
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
                  <p className="text-zinc-400">Your team code has been generated. Save this code - you'll need it to access your team:</p>
                  
                  <div className="relative">
                    <motion.div 
                      className="bg-zinc-950 border border-zinc-700/50 rounded-lg p-4 font-mono text-center"
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
                        {teamCode.split('').map((char, index) => (
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
                      className="absolute top-2 right-2 p-2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-md text-zinc-400 hover:text-red-400 transition-all duration-300 border border-zinc-700/50"
                      aria-label="Copy code"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
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

                  <motion.div 
                    className="bg-red-950/20 border border-red-500/20 rounded-lg p-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <p className="text-red-400/80 text-sm">⚠️ Keep this code secure. Anyone with this code can access your team.</p>
                  </motion.div>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => setAuthState('auth')}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  Continue to dashboard
                </motion.button>
              </motion.div>
            )}

            {/* Team Code Input - shown after login */}
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
                  className="text-zinc-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Enter your team code to access the challenges:
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
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-zinc-600 font-mono tracking-wider text-center"
                      placeholder="ENIG-XXXX-XXXX"
                      required
                      pattern="[A-Z0-9-]+"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Enter
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