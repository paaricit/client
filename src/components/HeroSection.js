import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.scss';

const TABS = ['Writing', 'Rewriting', 'Editing'];

const FloatingShapes = () => (
  <svg className="floating-shapes" width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="80" fill="#6E44FF" fillOpacity="0.18" />
    <circle cx="1200" cy="300" r="60" fill="#00F0FF" fillOpacity="0.13" />
    <circle cx="700" cy="700" r="100" fill="#FFA800" fillOpacity="0.10" />
    <ellipse cx="400" cy="600" rx="60" ry="30" fill="#fff" fillOpacity="0.07" />
    <ellipse cx="1100" cy="100" rx="40" ry="20" fill="#fff" fillOpacity="0.09" />
  </svg>
);

const HeroSection = () => {
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  const [angle, setAngle] = useState(135);
  const heroRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = e => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGradientPos({ x, y });
    };
    const handleTouchMove = e => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      setGradientPos({ x, y });
    };
    const node = heroRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  // Animated gradient angle
  useEffect(() => {
    let raf;
    const animate = () => {
      setAngle(a => (a + 0.03) % 360);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, #15151F 0%, #6E44FF ${gradientPos.x}%, #00F0FF 100%)`
  };

  const [activeTab, setActiveTab] = useState('Writing');
  const [accepted, setAccepted] = useState(false);

  return (
    <section className="hero-section" ref={heroRef} style={gradientStyle}>
      <FloatingShapes />
      <div className="hero-left">
        <h1>Experience Next-Gen Assignment Help</h1>
        <p>AI-powered. Expert-driven. Always on your side. <br />
        <span style={{color:'#FFA800'}}>weDoForYou</span> delivers premium academic solutions, 24/7.</p>
      </div>
      <div className="hero-right">
        <div className="hero-card">
          <h3>Get instant help from 5000+ experts for</h3>
          <div className="hero-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <form className="hero-form">
            <div className="hero-form-row">
              <input type="email" placeholder="Your Email" required />
              <div className="hero-phone-group">
                <select defaultValue="IN">
                  <option value="IN">IN(+91)</option>
                  <option value="AU">AU(+61)</option>
                  <option value="US">US(+1)</option>
                </select>
                <input type="tel" placeholder="Phone no." required />
              </div>
            </div>
            <div className="hero-form-row">
              <input type="text" placeholder="Subject or Course Code" required />
              <textarea placeholder="Describe your assignment or attach files" rows={2} required />
            </div>
            <div className="hero-form-row">
              <input type="date" placeholder="Deadline" required />
              <input type="time" placeholder="12:00 PM" required />
            </div>
            <div className="hero-form-row hero-pages-row">
              <div className="hero-pages">
                <label>Pages</label>
                <input type="number" min={1} defaultValue={1} />
                <span>250 words</span>
                <button type="button">-</button>
                <button type="button">+</button>
              </div>
              <label className="hero-attach">
                <input type="file" style={{ display: 'none' }} />
                <span>📎 Attach file</span>
              </label>
            </div>
            <div className="hero-form-row hero-checkbox-row">
              <input type="checkbox" id="accept" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
              <label htmlFor="accept">
                I accept the <a href="/terms-of-use">T&C</a>, <a href="/privacy-policy">Privacy Policy</a>, <a href="/revision-refund-policy">Revision & Refund Policy</a> and agree to receive offers and updates.
              </label>
            </div>
            <button className="hero-submit" type="submit" disabled={!accepted}>Get Free Quote</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 