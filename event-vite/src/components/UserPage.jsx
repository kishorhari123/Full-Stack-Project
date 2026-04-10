import React, { useState } from 'react';
import HomePage from './HomePage.jsx';
import ExplorePage from './ExplorePage.jsx';
import Footer from './Footer.jsx';
import RegistrationForm from './RegistrationForm.jsx';

export default function UserPage({ events, onLogout, userName }) {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [exploreEvent,  setExploreEvent]  = useState(null);

  const navLinks = [
    { key: 'hero',    label: '🏠 Home' },
    { key: 'events',  label: '🗓️ Events' },
    { key: 'past',    label: '📅 Past Events' },
    { key: 'about',   label: 'ℹ️ About Us' },
    { key: 'contact', label: '📬 Contact Us' },
  ];

  const scrollTo = (id) => {
    setMenuOpen(false);
    setExploreEvent(null);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleExplore = (ev) => {
    setExploreEvent(ev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setExploreEvent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page">

      {/* ── STICKY NAVBAR ── */}
      <nav className="navbar">
        <span className="nav-brand" onClick={() => { setExploreEvent(null); scrollTo('hero'); }}>
          🎪 EventHub
        </span>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <button
              key={link.key}
              className="nav-link"
              onClick={() => scrollTo(link.key)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <span className="nav-user-badge">👤 {userName || 'User'}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div className="page-body">
        {exploreEvent ? (
          <ExplorePage
            event={exploreEvent}
            onBack={handleBack}
            onRegister={(ev) => setSelectedEvent(ev)}
          />
        ) : (
          <HomePage
            events={events}
            scrollTo={scrollTo}
            onRegister={(ev) => setSelectedEvent(ev)}
            onExplore={handleExplore}
            userName={userName}
          />
        )}
      </div>

      <Footer scrollTo={scrollTo} />

      {selectedEvent && (
        <RegistrationForm event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
