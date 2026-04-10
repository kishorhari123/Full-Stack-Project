import React, { useState } from "react";
import { registrationAPI } from "../services/api.js";

const initialForm = {
  name: "",
  email: "",
  contact: "",
  city: "",
  age: "",
  gender: "",
};

export default function RegistrationForm({ event, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registrationAPI.create({
        eventId: event._id || event.id,
        ...form,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.msg || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {submitted ? (
          <div className="success-screen">
            <div className="success-icon">🎉</div>
            <h3>Registration Successful!</h3>
            <p>
              You have registered for <strong>{event.title}</strong>
            </p>
            <p>
              We'll contact you at <strong>{form.email}</strong>
            </p>
            <button className="btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="modal-event-icon">{event.icon}</span>
              <h3>Register for {event.title}</h3>
            </div>

            {error && (
              <div
                style={{
                  padding: 10,
                  background: "#fee",
                  color: "#c33",
                  borderRadius: 6,
                  marginBottom: 15,
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="reg-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact No.</label>
                  <input
                    name="contact"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.contact}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    name="city"
                    placeholder="Your city"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    name="age"
                    type="number"
                    placeholder="Your age"
                    value={form.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "⏳ Submitting..." : "Submit Registration"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
