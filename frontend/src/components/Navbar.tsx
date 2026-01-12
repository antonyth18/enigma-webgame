import { UserIcon } from './icons';
import { Button } from './Button';

interface NavbarProps {
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
  username?: string;
}

export function Navbar({ onLoginClick, isLoggedIn = false, username }: NavbarProps) {
  return (
    <nav
      className="
        w-full h-20
        bg-[var(--void-black)]
        border-b-2 border-[var(--blood-red)]/30
        px-8
        flex items-center justify-between
        relative
      "
      style={{
        boxShadow: '0 4px 20px rgba(229, 9, 20, 0.2)',
      }}
    >
      {/* Background fog effect */}
      <div className="absolute inset-0 fog-overlay opacity-30" />

      {/* Logo & Title */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="relative">
          {/* Glowing red emblem */}
          <div className="w-12 h-12 rounded-full bg-[var(--blood-red)]/20 flex items-center justify-center border-2 border-[var(--blood-red)] animate-pulse-red">
            <div className="w-6 h-6 rounded-full bg-[var(--blood-red)] shadow-[0_0_20px_var(--red-glow-strong)]" />
          </div>
        </div>
        <div>
          <h1
            className="text-3xl text-[var(--blood-red)] animate-flicker-red"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            ESCAPE THE UPSIDE DOWN
          </h1>
          <p className="text-xs text-[var(--ash-dim)] uppercase tracking-widest mt-1">
            Coding Challenge Arena
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="relative z-10 flex items-center gap-6">
        <NavLink href="#dashboard" label="Dashboard" />
        <NavLink href="#leaderboard" label="Leaderboard" />
        <NavLink href="#challenges" label="Challenges" />
      </div>

      {/* User Actions */}
      <div className="relative z-10 flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-[var(--ash-gray)] font-semibold">
                {username || 'Survivor'}
              </p>
              <p className="text-xs text-[var(--ash-dim)]">Level 5 · 2,450 pts</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--blood-red)] to-[var(--ember-orange)] flex items-center justify-center border-2 border-[var(--blood-red)]/50 shadow-[0_0_15px_var(--red-glow)]">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        ) : (
          <Button variant="primary" size="sm" onClick={onLoginClick}>
            <UserIcon className="w-4 h-4" />
            Enter Portal
          </Button>
        )}
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--blood-red) 30%, var(--ember-orange) 50%, var(--blood-red) 70%, transparent)',
          boxShadow: '0 0 8px var(--red-glow)',
        }}
      />
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a
      href={href}
      className="
        relative text-sm text-[var(--ash-gray)] font-semibold uppercase tracking-wider
        transition-all duration-300
        hover:text-[var(--blood-red)]
        red-underline-flicker
        pb-1
      "
    >
      {label}
    </a>
  );
}
