import React from 'react';

const pastEvents = [
  { id: 1, title: 'Grand Wedding Gala', icon: '💍', date: 'March 15, 2024', location: 'Mumbai', attendees: 320, status: 'Completed' },
  { id: 2, title: 'CodeFest Hackathon', icon: '💻', date: 'February 10, 2024', location: 'Bangalore', attendees: 180, status: 'Completed' },
  { id: 3, title: 'Tech Talks Seminar', icon: '🎓', date: 'January 22, 2024', location: 'Pune', attendees: 250, status: 'Completed' },
  { id: 4, title: 'Sports Championship', icon: '🏆', date: 'December 5, 2023', location: 'Delhi', attendees: 400, status: 'Completed' },
  { id: 5, title: 'New Year Club Party', icon: '🎉', date: 'December 31, 2023', location: 'Hyderabad', attendees: 500, status: 'Completed' },
  { id: 6, title: 'Startup Summit', icon: '🚀', date: 'November 18, 2023', location: 'Chennai', attendees: 210, status: 'Completed' },
];

export default function PastEvents() {
  return (
    <div className="inner-page">
      <div className="page-hero">
        <h2>📅 Past Events</h2>
        <p>Relive the memories of our successfully organized events</p>
      </div>

      <div className="past-events-grid">
        {pastEvents.map((ev) => (
          <div key={ev.id} className="past-event-card">
            <div className="past-card-top">
              <span className="past-icon">{ev.icon}</span>
              <span className="status-badge">{ev.status}</span>
            </div>
            <h4>{ev.title}</h4>
            <div className="past-meta">
              <span>📆 {ev.date}</span>
              <span>📍 {ev.location}</span>
              <span>👥 {ev.attendees} Attendees</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
