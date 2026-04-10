import React, { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="inner-page">
      <div className="page-hero">
        <h2>📬 Contact Us</h2>
        <p>Have a question or want to organize an event? We'd love to hear from you!</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <div className="contact-item">
            <span>📍</span>
            <div>
              <strong>Address</strong>
              <p>123 Event Street, Andheri West, Mumbai - 400053</p>
            </div>
          </div>
          <div className="contact-item">
            <span>📞</span>
            <div>
              <strong>Phone</strong>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="contact-item">
            <span>✉️</span>
            <div>
              <strong>Email</strong>
              <p>hello@eventhub.in</p>
            </div>
          </div>
          <div className="contact-item">
            <span>🕐</span>
            <div>
              <strong>Working Hours</strong>
              <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form-box">
          {sent ? (
            <div className="success-screen">
              <div className="success-icon">✅</div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-primary" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                Send Another
              </button>
            </div>
          ) : (
            <>
              <h3>Send a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Write your message here..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required style={{ minHeight: '120px' }} />
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
