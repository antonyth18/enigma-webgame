import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { InputField } from './InputField';
import { UserIcon, LockIcon } from './icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (username: string, password: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(username, password);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Enter the Portal' : 'Join the Survivors'}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-[var(--void-dark)]/50 rounded-lg border border-[var(--blood-red)]/20">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`
              flex-1 py-3 rounded-md font-semibold uppercase tracking-wide text-sm
              transition-all duration-300
              ${
                mode === 'login'
                  ? 'bg-[var(--blood-red)]/20 text-[var(--blood-red)] border-2 border-[var(--blood-red)]/50 shadow-[0_0_15px_var(--red-glow)]'
                  : 'text-[var(--ash-dim)] hover:text-[var(--ash-gray)] hover:bg-white/5'
              }
            `}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`
              flex-1 py-3 rounded-md font-semibold uppercase tracking-wide text-sm
              transition-all duration-300
              ${
                mode === 'signup'
                  ? 'bg-[var(--ember-orange)]/20 text-[var(--ember-orange)] border-2 border-[var(--ember-orange)]/50 shadow-[0_0_15px_var(--ember-glow)]'
                  : 'text-[var(--ash-dim)] hover:text-[var(--ash-gray)] hover:bg-white/5'
              }
            `}
          >
            Sign Up
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {mode === 'signup' && (
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="survivor@upside-down.void"
              required
            />
          )}
          
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="DarkCoder"
            icon={<UserIcon className="w-4 h-4" />}
            required
          />
          
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<LockIcon className="w-4 h-4" />}
            required
          />
        </div>

        {/* Additional Options */}
        {mode === 'login' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="
                  w-4 h-4 rounded
                  border-2 border-[var(--ash-darker)]
                  bg-[var(--void-dark)]
                  checked:bg-[var(--blood-red)]
                  checked:border-[var(--blood-red)]
                  focus:ring-2 focus:ring-[var(--blood-red)]/50
                  transition-all
                "
              />
              <span className="text-sm text-[var(--ash-dim)] group-hover:text-[var(--ash-gray)] transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm text-[var(--blood-red)] hover:text-[var(--ember-orange)] transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Warning Message */}
        <div
          className="p-4 rounded-lg bg-[var(--blood-red)]/5 border border-[var(--blood-red)]/30"
          style={{ boxShadow: 'inset 0 0 20px rgba(229, 9, 20, 0.1)' }}
        >
          <p className="text-xs text-[var(--ash-dim)] text-center">
            ⚠️ Warning: Entering the Upside Down is dangerous. Proceed with caution.
          </p>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" fullWidth>
          {mode === 'login' ? 'Enter the Void' : 'Begin Journey'}
        </Button>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--blood-red)]/20 text-center">
          <p className="text-sm text-[var(--ash-dim)]">
            {mode === 'login' ? "Don't have an account? " : 'Already a survivor? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[var(--ember-orange)] hover:text-[var(--ember-dark)] font-semibold transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </form>
    </Modal>
  );
}
