import React, { useState } from "react";

const pastEventsList = [
  {
    id: 1,
    title: "Grand Wedding Gala",
    icon: "💍",
    date: "March 15, 2024",
    location: "Mumbai",
    attendees: 320,
  },
  {
    id: 2,
    title: "CodeFest Hackathon",
    icon: "💻",
    date: "February 10, 2024",
    location: "Bangalore",
    attendees: 180,
  },
  {
    id: 3,
    title: "Tech Talks Seminar",
    icon: "🎓",
    date: "January 22, 2024",
    location: "Pune",
    attendees: 250,
  },
  {
    id: 4,
    title: "Sports Championship",
    icon: "🏆",
    date: "December 5, 2023",
    location: "Delhi",
    attendees: 400,
  },
  {
    id: 5,
    title: "New Year Club Party",
    icon: "🎉",
    date: "December 31, 2023",
    location: "Hyderabad",
    attendees: 500,
  },
  {
    id: 6,
    title: "Startup Summit",
    icon: "🚀",
    date: "November 18, 2023",
    location: "Chennai",
    attendees: 210,
  },
];

const stats = [
  { label: "Events Organized", value: "200+", icon: "🎪" },
  { label: "Happy Clients", value: "5000+", icon: "😊" },
  { label: "Cities Covered", value: "30+", icon: "🌆" },
  { label: "Years Experience", value: "8+", icon: "🏅" },
];

const team = [
  { name: "Akash Sharma", role: "Founder & CEO", emoji: "👨‍💼" },
  { name: "Priya Patel", role: "Event Manager", emoji: "👩‍💼" },
  { name: "Rahul Verma", role: "Tech Lead", emoji: "👨‍💻" },
  { name: "Sneha Joshi", role: "Marketing Head", emoji: "👩‍🎨" },
];

const missions = [
  {
    icon: "🎯",
    title: "Our Mission",
    text: "To deliver world-class event experiences that connect communities, inspire innovation, and celebrate life's most important moments.",
  },
  {
    icon: "👁️",
    title: "Our Vision",
    text: "To become India's most trusted event management platform, making every event seamless, memorable, and impactful.",
  },
  {
    icon: "💎",
    title: "Our Values",
    text: "Excellence, creativity, and dedication in every event we organize — from intimate gatherings to large-scale conferences.",
  },
];

const contactDetails = [
  {
    icon: "📍",
    label: "Address",
    text: "123 Event Street, Andheri West, Mumbai - 400053",
  },
  { icon: "📞", label: "Phone", text: "+91 98765 43210" },
  { icon: "✉️", label: "Email", text: "hello@eventhub.in" },
  { icon: "🕐", label: "Working Hours", text: "Mon - Sat: 9:00 AM - 7:00 PM" },
];

const heroEmojis = ["💍", "💻", "🎓", "🏆", "🎉", "🚀", "🎵", "🎭"];

export default function HomePage({
  events,
  scrollTo,
  onRegister,
  onExplore,
  userName,
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleContact = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="homepage">
      {/* ── HERO ── */}
      <section id="hero" className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">🎪 India's #1 Event Platform</span>
          <h1>
            {greeting}, {userName || "Guest"}! 👋
            <br />
            <span className="hero-highlight">Discover Amazing Events</span>
          </h1>
          <p>
            Discover, register and celebrate the most exciting events near you —
            weddings, hackathons, seminars, parties and more!
          </p>
          <div className="hero-btns">
            <button
              className="btn-hero-primary"
              onClick={() => scrollTo("events")}
            >
              Explore Events
            </button>
            <button
              className="btn-hero-outline"
              onClick={() => scrollTo("contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="hero-visual">
          {heroEmojis.map((emoji, i) => (
            <div key={i} className={`hero-emoji-box anim-${i % 2}`}>
              {emoji}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section id="events" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>🗓️ Our Events</h2>
            <p>Register now and be part of something amazing</p>
          </div>
          <div className="cards-grid">
            {events.map((ev) => (
              <div key={ev._id || ev.id} className="event-card">
                <div className="card-icon">{ev.icon}</div>
                <h4>{ev.title}</h4>
                <p className="card-desc">{ev.description}</p>
                <div className="card-info">
                  {ev.date && <span className="card-meta">📆 {ev.date}</span>}
                  {ev.location && (
                    <span className="card-meta">📍 {ev.location}</span>
                  )}
                </div>
                <button
                  className="btn-explore-full"
                  onClick={() => onExplore(ev)}
                >
                  🔍 Explore Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      <section id="past" className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2>📅 Past Events</h2>
            <p>Relive the memories of our successfully organized events</p>
          </div>
          <div className="past-grid">
            {pastEventsList.map((ev) => (
              <div key={ev.id} className="past-card">
                <div className="past-card-top">
                  <span className="past-icon">{ev.icon}</span>
                  <span className="badge-done">✔ Completed</span>
                </div>
                <h4>{ev.title}</h4>
                <ul className="past-meta">
                  <li>📆 {ev.date}</li>
                  <li>📍 {ev.location}</li>
                  <li>👥 {ev.attendees} Attendees</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section id="about" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>ℹ️ About EventHub</h2>
            <p>
              We create unforgettable experiences that bring people together
            </p>
          </div>
          <div className="mission-grid">
            {missions.map((m) => (
              <div key={m.title} className="mission-card">
                <span>{m.icon}</span>
                <h4>{m.title}</h4>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
          <h3 className="sub-heading">Meet Our Team</h3>
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
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2>📬 Contact Us</h2>
            <p>Have a question? We would love to hear from you!</p>
          </div>
          <div className="contact-layout">
            <div className="contact-info-box">
              <h3>Get In Touch</h3>
              {contactDetails.map((item) => (
                <div key={item.label} className="contact-item">
                  <span>{item.icon}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-form-box">
              {sent ? (
                <div className="success-screen">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3>Send a Message</h3>
                  <form onSubmit={handleContact} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input
                          placeholder="Full name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        rows="5"
                        placeholder="Write your message here..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary">
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
