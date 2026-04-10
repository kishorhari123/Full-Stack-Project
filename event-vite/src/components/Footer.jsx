import React from 'react';

export default function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <h3>🎪 EventHub</h3>
          <p>India's most trusted event management platform. Creating unforgettable experiences since 2016.</p>
          <div className="social-links">
            <a href="#!" className="social-btn">📘 Facebook</a>
            <a href="#!" className="social-btn">📸 Instagram</a>
            <a href="#!" className="social-btn">🐦 Twitter</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><button onClick={() => scrollTo('hero')}>🏠 Home</button></li>
            <li><button onClick={() => scrollTo('events')}>🗓️ Upcoming Events</button></li>
            <li><button onClick={() => scrollTo('past')}>📅 Past Events</button></li>
            <li><button onClick={() => scrollTo('about')}>ℹ️ About Us</button></li>
            <li><button onClick={() => scrollTo('contact')}>📬 Contact Us</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Event Categories</h4>
          <ul>
            <li><span>💍 Weddings</span></li>
            <li><span>💻 Hackathons</span></li>
            <li><span>🎓 Technical Seminars</span></li>
            <li><span>🏆 Sports Events</span></li>
            <li><span>🎉 Club Parties</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <ul>
            <li><span>📍 123 Event Street, Mumbai - 400053</span></li>
            <li><span>📞 +91 98765 43210</span></li>
            <li><span>✉️ hello@eventhub.in</span></li>
            <li><span>🕐 Mon–Sat: 9AM – 7PM</span></li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EventHub. All rights reserved. Made with ❤️ in India</p>
        <div className="footer-bottom-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
          <a href="#!">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
