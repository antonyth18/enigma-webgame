import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./themed-navbar.css";

export default function ThemedNavbar({ isLoggedIn, onLogout }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Reusable nav link
  const Item = ({ to, children, onClick }) => {
    const active = pathname === to;
    if (onClick) {
      return (
        <button onClick={onClick} className={`nv-item ${active ? "active" : ""}`}>
          {children}
          {active && <span className="nv-underline" />}
        </button>
      );
    }
    return (
      <Link to={to} className={`nv-item ${active ? "active" : ""}`}>
        {children}
        {active && <span className="nv-underline" />}
      </Link>
    );
  };

  return (
    <header className="nv-wrap">
      <div className="nv-row">
        {/* Brand / Logo */}
        <Link to="/dashboard" className="nv-brand">
          ENIGMA
          <span className="nv-spark" />
        </Link>

        {/* ✅ Desktop Navigation */}
        <nav className="nv-desktop">
          <Item to="/dashboard">Dashboard</Item>
          <Item to="/leader">Leaderboard</Item>
          {isLoggedIn ? (
            <Item onClick={onLogout}>Logout</Item>
          ) : (
            <Item to="/login">Login</Item>
          )}
        </nav>

        {/* Burger menu for mobile */}
        <button
          className="nv-burger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ✅ Mobile Dropdown Navigation */}
      {open && (
        <div className="nv-mobile">
          <Item to="/dashboard">Dashboard</Item>
          <Item to="/leader">Leaderboard</Item>
          {isLoggedIn ? (
            <Item onClick={() => { onLogout(); setOpen(false); }}>Logout</Item>
          ) : (
            <Item to="/login" onClick={() => setOpen(false)}>Login</Item>
          )}
        </div>
      )}

      {/* Neon glow line */}
      <div className="nv-glow" />
    </header>
  );
}
