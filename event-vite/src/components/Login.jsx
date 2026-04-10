import React, { useState } from "react";
import { authAPI } from "../services/api.js";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.login(form.email, form.password);
      const { token, user } = response.data;
      onLogin(user.role, user.name, token);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await authAPI.register(form.name, form.email, form.password);
      setSuccess("Account created successfully! Please login.");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setMode("login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="auth-container">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>🎪 EventHub</h1>
          <p>India's most trusted event management platform</p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span>🗓️</span>
              <p>Discover exciting events</p>
            </div>
            <div className="auth-feature-item">
              <span>📝</span>
              <p>Easy registration process</p>
            </div>
            <div className="auth-feature-item">
              <span>🏆</span>
              <p>Weddings, Hackathons &amp; more</p>
            </div>
            <div className="auth-feature-item">
              <span>🌆</span>
              <p>Events across 30+ cities</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-logo">🎪</div>
          <div className="auth-header">
            <h2>{mode === "login" ? "Welcome Back!" : "Create Account"}</h2>
            <p>
              {mode === "login"
                ? "Sign in to your EventHub account"
                : "Join EventHub and discover events"}
            </p>
          </div>

          {/* TAB SWITCHER */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === "login" ? "auth-tab-active" : ""}`}
              onClick={() => switchMode("login")}
              type="button"
            >
              🔑 Login
            </button>
            <button
              className={`auth-tab ${mode === "register" ? "auth-tab-active" : ""}`}
              onClick={() => switchMode("register")}
              type="button"
            >
              ✨ Register
            </button>
          </div>

          {/* SUCCESS MESSAGE */}
          {success && <div className="success-msg" style={{ marginBottom: 16 }}>✅ {success}</div>}

          {/* LOGIN FORM */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {error && <div className="error-msg">⚠️ {error}</div>}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "⏳ Signing in..." : "🚀 Sign In"}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {error && <div className="error-msg">⚠️ {error}</div>}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "⏳ Creating Account..." : "✨ Create Account"}
              </button>
              <p style={{ textAlign: "center", fontSize: "0.82rem", color: "#888", marginTop: 8 }}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  style={{ background: "none", border: "none", color: "#667eea", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
