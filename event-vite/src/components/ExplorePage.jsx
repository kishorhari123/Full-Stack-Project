import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm.jsx';

const highlights = {
  'Wedding':           ['💐 Floral Decoration', '🎂 Custom Cake', '📸 Photography', '🎵 Live Music', '🍽️ Catering', '💌 Invitations'],
  'Hackathon':         ['💡 24hr Coding', '🏆 Cash Prizes', '🤝 Networking', '🍕 Free Meals', '👨💻 Mentors', '📜 Certificates'],
  'Technical Seminar': ['🎤 Expert Talks', '📊 Workshops', '📜 Certificates', '🤝 Networking', '📚 Study Material', '🎯 Q&A Sessions'],
  'Sport Seminar':     ['🏃 Training Sessions', '🏅 Competitions', '🥗 Nutrition Tips', '🧘 Wellness', '🏆 Awards', '📸 Coverage'],
  'Club Party':        ['🎵 DJ Night', '🍹 Mocktails', '🎭 Performances', '📸 Photo Booth', '🎁 Giveaways', '🕺 Dance Floor'],
};

const schedules = {
  'Wedding':           [{ time: '10:00 AM', event: 'Guest Arrival & Welcome' }, { time: '11:30 AM', event: 'Ceremony Begins' }, { time: '01:00 PM', event: 'Lunch Reception' }, { time: '03:00 PM', event: 'Celebrations & Music' }, { time: '07:00 PM', event: 'Dinner & Dance' }],
  'Hackathon':         [{ time: '08:00 AM', event: 'Registration & Breakfast' }, { time: '09:00 AM', event: 'Opening Ceremony' }, { time: '10:00 AM', event: 'Hacking Begins' }, { time: '06:00 PM', event: 'Mentor Sessions' }, { time: '10:00 AM+1', event: 'Final Submissions & Demo' }],
  'Technical Seminar': [{ time: '09:00 AM', event: 'Registration & Networking' }, { time: '10:00 AM', event: 'Keynote Address' }, { time: '11:30 AM', event: 'Technical Sessions' }, { time: '01:00 PM', event: 'Lunch Break' }, { time: '02:00 PM', event: 'Workshops & Q&A' }],
  'Sport Seminar':     [{ time: '07:00 AM', event: 'Warm-up & Fitness' }, { time: '09:00 AM', event: 'Opening Ceremony' }, { time: '10:00 AM', event: 'Training Sessions' }, { time: '12:00 PM', event: 'Nutrition Workshop' }, { time: '03:00 PM', event: 'Competitions & Awards' }],
  'Club Party':        [{ time: '07:00 PM', event: 'Doors Open' }, { time: '08:00 PM', event: 'Welcome Drinks' }, { time: '09:00 PM', event: 'DJ Night Begins' }, { time: '10:30 PM', event: 'Live Performances' }, { time: '12:00 AM', event: 'Grand Finale' }],
};

const galleryEmojis = {
  'Wedding':           ['💍','💐','🎂','📸','🥂','🎵'],
  'Hackathon':         ['💻','🏆','💡','🤝','📊','🚀'],
  'Technical Seminar': ['🎤','📊','📚','🎯','🤝','📜'],
  'Sport Seminar':     ['🏃','🏅','🥗','🧘','🏆','⚽'],
  'Club Party':        ['🎵','🍹','🎭','📸','🎁','🕺'],
};

const colors = {
  'Wedding':           { bg: '#fff0f6', accent: '#e91e8c', light: '#fce4ec' },
  'Hackathon':         { bg: '#f0f4ff', accent: '#667eea', light: '#e8ecff' },
  'Technical Seminar': { bg: '#f0fff4', accent: '#38a169', light: '#c6f6d5' },
  'Sport Seminar':     { bg: '#fff8f0', accent: '#e67e22', light: '#fde8cc' },
  'Club Party':        { bg: '#fdf0ff', accent: '#9b59b6', light: '#f3e5f5' },
};

export default function ExplorePage({ event, onBack, onRegister }) {
  const [showForm, setShowForm] = useState(false);
  const key    = event.title;
  const hl     = highlights[key]    || ['🎪 Amazing Experience', '🤝 Networking', '📜 Certificate', '🎁 Gifts', '🍽️ Food', '📸 Photos'];
  const sched  = schedules[key]     || [];
  const emojis = galleryEmojis[key] || ['🎪','🎉','🎵','🏆','📸','🎭'];
  const clr    = colors[key]        || { bg: '#f0f4f8', accent: '#667eea', light: '#e8ecff' };

  return (
    <div className="explore-page">

      {/* ── BACK BAR ── */}
      <div className="explore-back-bar">
        <button className="btn-back" onClick={onBack}>← Back to Events</button>
        <span className="explore-breadcrumb">Home / Events / {event.title}</span>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="explore-hero" style={{ background: `linear-gradient(135deg, ${clr.accent}dd, ${clr.accent}99)` }}>
        <div className="explore-hero-content">
          <div className="explore-hero-icon">{event.icon}</div>
          <div>
            <div className="explore-hero-tag" style={{ background: clr.light, color: clr.accent }}>
              {event.title}
            </div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <div className="explore-hero-meta">
              {event.date     && <span>📆 {event.date}</span>}
              {event.location && <span>📍 {event.location}</span>}
            </div>
          </div>
        </div>
        <button className="btn-explore-register" onClick={() => setShowForm(true)}>
          📝 Register Now
        </button>
      </div>

      <div className="explore-body">

        {/* ── HIGHLIGHTS ── */}
        <div className="explore-section">
          <h2 className="explore-section-title" style={{ color: clr.accent }}>Event Highlights</h2>
          <div className="explore-highlights-grid">
            {hl.map((h, i) => (
              <div key={i} className="explore-highlight-chip" style={{ background: clr.light, borderColor: clr.accent + '44' }}>
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* ── SCHEDULE + GALLERY ── */}
        <div className="explore-two-col">

          <div className="explore-section">
            <h2 className="explore-section-title" style={{ color: clr.accent }}>Event Schedule</h2>
            <div className="explore-schedule">
              {sched.map((s, i) => (
                <div key={i} className="schedule-item">
                  <div className="schedule-dot" style={{ background: clr.accent }}></div>
                  <div className="schedule-time" style={{ color: clr.accent }}>{s.time}</div>
                  <div className="schedule-event">{s.event}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="explore-section">
            <h2 className="explore-section-title" style={{ color: clr.accent }}>Gallery</h2>
            <div className="explore-gallery">
              {emojis.map((em, i) => (
                <div key={i} className="gallery-tile" style={{ background: clr.light }}>
                  <span>{em}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {showForm && (
        <RegistrationForm event={event} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
