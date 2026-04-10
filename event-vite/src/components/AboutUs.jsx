import React from 'react';

const team = [
  { name: 'Akash Sharma', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Priya Patel', role: 'Event Manager', emoji: '👩‍💼' },
  { name: 'Rahul Verma', role: 'Tech Lead', emoji: '👨‍💻' },
  { name: 'Sneha Joshi', role: 'Marketing Head', emoji: '👩‍🎨' },
];

const stats = [
  { label: 'Events Organized', value: '200+' },
  { label: 'Happy Clients', value: '5000+' },
  { label: 'Cities Covered', value: '30+' },
  { label: 'Years Experience', value: '8+' },
];

export default function AboutUs() {
  return (
    <div className="inner-page">
      <div className="page-hero">
        <h2>🎪 About EventHub</h2>
        <p>We create unforgettable experiences that bring people together</p>
      </div>

      <div className="about-mission">
        <div className="mission-card">
          <span>🎯</span>
          <h4>Our Mission</h4>
          <p>To deliver world-class event experiences that connect communities, inspire innovation, and celebrate life's most important moments.</p>
        </div>
        <div className="mission-card">
          <span>👁️</span>
          <h4>Our Vision</h4>
          <p>To become India's most trusted event management platform, making every event seamless, memorable, and impactful.</p>
        </div>
        <div className="mission-card">
          <span>💎</span>
          <h4>Our Values</h4>
          <p>Excellence, creativity, and dedication in every event we organize — from intimate gatherings to large-scale conferences.</p>
        </div>
      </div>

      <div className="stats-row">
        {stats.map((s) => (
          <div key={s.label} className="stat-box">
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      <h3 className="team-title">Meet Our Team</h3>
      <div className="team-grid">
        {team.map((member) => (
          <div key={member.name} className="team-card">
            <div className="team-avatar">{member.emoji}</div>
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
