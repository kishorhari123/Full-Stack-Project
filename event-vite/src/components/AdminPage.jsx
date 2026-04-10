import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import { authAPI, registrationAPI } from "../services/api.js";

const CATEGORIES = [
  { label: "Wedding", icon: "💍" },
  { label: "Hackathon", icon: "💻" },
  { label: "Technical Seminar", icon: "🎓" },
  { label: "Sport Seminar", icon: "🏆" },
  { label: "Club Party", icon: "🎉" },
  { label: "Music Concert", icon: "🎵" },
  { label: "Art Exhibition", icon: "🎨" },
  { label: "Startup Summit", icon: "🚀" },
  { label: "Other", icon: "🎪" },
];

const emptyForm = {
  title: "",
  icon: "🎪",
  description: "",
  date: "",
  location: "",
  seats: "",
  category: "",
};

export default function AdminPage({ events, addEvent, deleteEvent, onLogout, userName, loading }) {
  const [form, setForm] = useState(emptyForm);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [regsLoading, setRegsLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchReg, setSearchReg] = useState("");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  // Fetch users when tab opens
  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "registrations") fetchRegistrations();
  }, [activeTab]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await authAPI.getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    setRegsLoading(true);
    try {
      const res = await registrationAPI.getAll();
      setRegistrations(res.data);
    } catch (err) {
      console.error("Fetch registrations error:", err);
    } finally {
      setRegsLoading(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Event title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.date) e.date = "Event date is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.seats || form.seats < 1) e.seats = "Enter valid seat count";
    if (!form.category) e.category = "Select a category";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const result = await addEvent({ ...form, seats: Number(form.seats) });
    if (result.success) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setForm(emptyForm); setErrors({}); }, 3000);
    } else {
      setErrors({ submit: result.error || "Failed to create event" });
    }
  };

  const handleCategory = (cat) => {
    setForm({ ...form, category: cat.label, icon: cat.icon, title: cat.label });
    setErrors({ ...errors, category: "", title: "" });
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredRegs = registrations.filter(r =>
    r.name.toLowerCase().includes(searchReg.toLowerCase()) ||
    r.email.toLowerCase().includes(searchReg.toLowerCase()) ||
    (r.eventId?.title || "").toLowerCase().includes(searchReg.toLowerCase())
  );

  const adminStats = [
    { label: "Total Events", value: events.length, icon: "🎪", color: "#667eea" },
    { label: "Registered Users", value: users.length || "—", icon: "👥", color: "#38a169" },
    { label: "Event Registrations", value: registrations.length || "—", icon: "📋", color: "#e67e22" },
    { label: "Cities Covered", value: "10+", icon: "🌆", color: "#e53e3e" },
  ];

  const scrollTo = () => {};

  const tabs = [
    { key: "dashboard", label: "📊 Dashboard" },
    { key: "create", label: "➕ Create Event" },
    { key: "events", label: "📋 All Events" },
    { key: "users", label: "👥 Registered Users" },
    { key: "registrations", label: "📝 Event Registrations" },
  ];

  return (
    <div className="page">
      {/* NAVBAR */}
      <nav className="navbar">
        <span className="nav-brand">🎪 EventHub</span>
        <div className="nav-links">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`nav-link ${activeTab === t.key ? "nav-link-active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <span className="nav-user-badge">👤 {userName || "Admin"}</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="page-body admin-body">
        {/* WELCOME BANNER */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>{greeting}, {userName || "Admin"}! 👋</h2>
            <p>You have <strong>{events.length} events</strong> listed on the platform.</p>
          </div>
          <div className="welcome-actions">
            <button className="btn-welcome-primary" onClick={() => setActiveTab("create")}>➕ Create New Event</button>
            <button className="btn-welcome-outline" onClick={() => setActiveTab("users")}>👥 View Users</button>
          </div>
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="admin-container">
            <div className="admin-stats-grid">
              {adminStats.map((s) => (
                <div key={s.label} className="admin-stat-card" style={{ borderTopColor: s.color }}
                  onClick={() => {
                    if (s.label === "Registered Users") setActiveTab("users");
                    if (s.label === "Event Registrations") setActiveTab("registrations");
                  }}
                  style={{ borderTopColor: s.color, cursor: "pointer" }}
                >
                  <div className="admin-stat-icon">{s.icon}</div>
                  <h3 style={{ color: s.color }}>{s.value}</h3>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="admin-section-card">
              <div className="admin-section-head">
                <h3>📋 Recent Events</h3>
                <button className="btn-tab-link" onClick={() => setActiveTab("create")}>+ Create New</button>
              </div>
              <div className="events-list">
                {events.slice(0, 5).map((ev) => (
                  <div key={ev._id || ev.id} className="event-list-item">
                    <span className="event-icon-sm">{ev.icon}</span>
                    <div className="event-list-info">
                      <strong>{ev.title}</strong>
                      <p>{ev.description}</p>
                    </div>
                    <div className="event-list-meta">
                      {ev.date && <span>📆 {ev.date}</span>}
                      {ev.location && <span>📍 {ev.location}</span>}
                    </div>
                    <span className="event-status-badge">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CREATE EVENT */}
        {activeTab === "create" && (
          <div className="admin-container">
            <div className="admin-page-header">
              <h2>➕ Create New Event</h2>
              <p>Fill in all the details to publish a new event for users to register.</p>
            </div>

            {submitted ? (
              <div className="create-success-card">
                <div className="create-success-icon">🎉</div>
                <h3>Event Created Successfully!</h3>
                <p>Your new event has been published and is now visible to users.</p>
                <button className="btn-primary" style={{ maxWidth: 220, margin: "0 auto" }} onClick={() => setActiveTab("events")}>
                  View All Events
                </button>
              </div>
            ) : (
              <div className="create-event-layout">
                <div className="create-form-card">
                  <h3 className="create-form-title">Event Details</h3>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group" style={{ marginBottom: 20 }}>
                      <label>Event Category <span className="required-star">*</span></label>
                      <div className="category-grid">
                        {CATEGORIES.map((cat) => (
                          <button type="button" key={cat.label}
                            className={`category-chip ${form.category === cat.label ? "category-chip-active" : ""}`}
                            onClick={() => handleCategory(cat)}
                          >
                            <span>{cat.icon}</span><span>{cat.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.category && <span className="field-error">{errors.category}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Event Title <span className="required-star">*</span></label>
                        <input placeholder="e.g. Annual Hackathon 2025" value={form.title}
                          onChange={(e) => { setForm({ ...form, title: e.target.value }); setErrors({ ...errors, title: "" }); }} />
                        {errors.title && <span className="field-error">{errors.title}</span>}
                      </div>
                      <div className="form-group" style={{ maxWidth: 120 }}>
                        <label>Icon</label>
                        <input placeholder="🎪" value={form.icon}
                          onChange={(e) => setForm({ ...form, icon: e.target.value })}
                          style={{ fontSize: "1.4rem", textAlign: "center" }} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description <span className="required-star">*</span></label>
                      <textarea rows="4" placeholder="Describe what this event is about..." value={form.description}
                        onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: "" }); }} />
                      {errors.description && <span className="field-error">{errors.description}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Event Date <span className="required-star">*</span></label>
                        <input type="date" value={form.date}
                          onChange={(e) => { setForm({ ...form, date: e.target.value }); setErrors({ ...errors, date: "" }); }} />
                        {errors.date && <span className="field-error">{errors.date}</span>}
                      </div>
                      <div className="form-group">
                        <label>Location <span className="required-star">*</span></label>
                        <input placeholder="e.g. Mumbai, Maharashtra" value={form.location}
                          onChange={(e) => { setForm({ ...form, location: e.target.value }); setErrors({ ...errors, location: "" }); }} />
                        {errors.location && <span className="field-error">{errors.location}</span>}
                      </div>
                    </div>

                    <div className="form-group" style={{ maxWidth: 200 }}>
                      <label>Total Seats <span className="required-star">*</span></label>
                      <input type="number" min="1" placeholder="e.g. 200" value={form.seats}
                        onChange={(e) => { setForm({ ...form, seats: e.target.value }); setErrors({ ...errors, seats: "" }); }} />
                      {errors.seats && <span className="field-error">{errors.seats}</span>}
                    </div>

                    {errors.submit && (
                      <div className="field-error" style={{ marginTop: 10, padding: 10, background: "#fee", borderRadius: 6 }}>
                        {errors.submit}
                      </div>
                    )}

                    <div className="create-form-actions">
                      <button type="button" className="btn-cancel" onClick={() => { setForm(emptyForm); setErrors({}); }}>Reset</button>
                      <button type="submit" className="btn-create-submit">🚀 Publish Event</button>
                    </div>
                  </form>
                </div>

                <div className="create-preview-card">
                  <h3 className="create-form-title">Live Preview</h3>
                  <div className="preview-event-card">
                    <div className="preview-icon">{form.icon || "🎪"}</div>
                    <h4>{form.title || "Event Title"}</h4>
                    <p className="preview-desc">{form.description || "Event description will appear here..."}</p>
                    <div className="preview-meta">
                      {form.date && <span>📆 {new Date(form.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
                      {form.location && <span>📍 {form.location}</span>}
                      {form.seats && <span>💺 {form.seats} Seats</span>}
                    </div>
                    <div className="preview-register-btn">Register Now</div>
                  </div>
                  <p className="preview-note">This is how the event card will appear to users.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ALL EVENTS */}
        {activeTab === "events" && (
          <div className="admin-container">
            <div className="admin-page-header">
              <h2>📋 All Events</h2>
              <p>{events.length} events currently listed on the platform.</p>
            </div>
            <div className="admin-section-card">
              <div className="events-list">
                {events.length === 0 && <p style={{ color: "#888", textAlign: "center", padding: "30px 0" }}>No events yet. Create your first event!</p>}
                {events.map((ev) => (
                  <div key={ev._id || ev.id} className="event-list-item">
                    <span className="event-icon-sm">{ev.icon}</span>
                    <div className="event-list-info">
                      <strong>{ev.title}</strong>
                      <p>{ev.description}</p>
                    </div>
                    <div className="event-list-meta">
                      {ev.date && <span>📆 {ev.date}</span>}
                      {ev.location && <span>📍 {ev.location}</span>}
                      {ev.seats && <span>💺 {ev.seats} seats</span>}
                    </div>
                    <span className="event-status-badge">Active</span>
                    <button
                      onClick={() => { if (window.confirm(`Delete "${ev.title}"?`)) deleteEvent(ev._id || ev.id); }}
                      style={{ background: "#fee", color: "#c33", border: "1px solid #fcc", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REGISTERED USERS */}
        {activeTab === "users" && (
          <div className="admin-container">
            <div className="admin-page-header">
              <h2>👥 Registered Users</h2>
              <p>All users who have created an account on EventHub.</p>
            </div>
            <div className="admin-section-card">
              <div className="admin-section-head">
                <h3>👤 User Accounts ({filteredUsers.length})</h3>
                <input
                  placeholder="🔍 Search by name or email..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  style={{ padding: "8px 14px", border: "1.5px solid #dde1f0", borderRadius: 8, fontSize: "0.88rem", width: 240, outline: "none" }}
                />
              </div>

              {usersLoading ? (
                <p style={{ textAlign: "center", color: "#888", padding: "30px 0" }}>⏳ Loading users...</p>
              ) : filteredUsers.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888", padding: "30px 0" }}>
                  {searchUser ? "No users match your search." : "No registered users yet."}
                </p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ background: "#f8f9ff", borderBottom: "2px solid #e8ecff" }}>
                        <th style={thStyle}>#</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                        <th style={thStyle}>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u, i) => (
                        <tr key={u._id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                          <td style={tdStyle}>{i + 1}</td>
                          <td style={tdStyle}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#667eea,#764ba2)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <strong>{u.name}</strong>
                            </div>
                          </td>
                          <td style={tdStyle}>{u.email}</td>
                          <td style={tdStyle}>
                            <span style={{ background: "#d4edda", color: "#276749", fontSize: "0.74rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                              {u.role}
                            </span>
                          </td>
                          <td style={tdStyle}>{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* EVENT REGISTRATIONS */}
        {activeTab === "registrations" && (
          <div className="admin-container">
            <div className="admin-page-header">
              <h2>📝 Event Registrations</h2>
              <p>All event registrations submitted by users.</p>
            </div>
            <div className="admin-section-card">
              <div className="admin-section-head">
                <h3>📋 Registrations ({filteredRegs.length})</h3>
                <input
                  placeholder="🔍 Search by name, email or event..."
                  value={searchReg}
                  onChange={(e) => setSearchReg(e.target.value)}
                  style={{ padding: "8px 14px", border: "1.5px solid #dde1f0", borderRadius: 8, fontSize: "0.88rem", width: 260, outline: "none" }}
                />
              </div>

              {regsLoading ? (
                <p style={{ textAlign: "center", color: "#888", padding: "30px 0" }}>⏳ Loading registrations...</p>
              ) : filteredRegs.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888", padding: "30px 0" }}>
                  {searchReg ? "No registrations match your search." : "No event registrations yet."}
                </p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                    <thead>
                      <tr style={{ background: "#f8f9ff", borderBottom: "2px solid #e8ecff" }}>
                        <th style={thStyle}>#</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Contact</th>
                        <th style={thStyle}>City</th>
                        <th style={thStyle}>Age</th>
                        <th style={thStyle}>Gender</th>
                        <th style={thStyle}>Event</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Registered On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegs.map((r, i) => (
                        <tr key={r._id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                          <td style={tdStyle}>{i + 1}</td>
                          <td style={tdStyle}><strong>{r.name}</strong></td>
                          <td style={tdStyle}>{r.email}</td>
                          <td style={tdStyle}>{r.contact}</td>
                          <td style={tdStyle}>{r.city}</td>
                          <td style={tdStyle}>{r.age}</td>
                          <td style={tdStyle}>{r.gender}</td>
                          <td style={tdStyle}>{r.eventId?.title || "—"}</td>
                          <td style={tdStyle}>
                            <span style={{ background: r.status === "confirmed" ? "#d4edda" : "#fff3cd", color: r.status === "confirmed" ? "#276749" : "#856404", fontSize: "0.74rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                              {r.status}
                            </span>
                          </td>
                          <td style={tdStyle}>{new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer scrollTo={scrollTo} />
    </div>
  );
}

const thStyle = { padding: "10px 14px", textAlign: "left", color: "#555", fontWeight: 700, fontSize: "0.82rem", whiteSpace: "nowrap" };
const tdStyle = { padding: "12px 14px", color: "#444", verticalAlign: "middle" };
