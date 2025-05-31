import React from 'react';
import './PolicyPage.scss';

const PrivacyPolicy = () => (
  <div className="policy-page">
    <h1>Privacy Policy</h1>
    <p>Your privacy is important to us at weDoForYou. This policy outlines how we collect, use, and protect your personal information.</p>
    <h2>1. Information We Collect</h2>
    <ul>
      <li>Name, email, academic details during registration.</li>
      <li>Assignment files and instructions.</li>
      <li>Payment details (handled securely through third-party providers).</li>
    </ul>
    <h2>2. Use of Information</h2>
    <ul>
      <li>Match you with suitable tutors.</li>
      <li>Deliver requested academic services.</li>
      <li>Improve platform functionality.</li>
    </ul>
    <h2>3. Data Sharing</h2>
    <p>We do not sell or rent your personal information. Your data may be shared with tutors only to fulfill your order.</p>
    <h2>4. Security</h2>
    <p>We implement strong encryption and access controls to protect your data. However, no method is 100% secure.</p>
    <h2>5. Cookies</h2>
    <p>Our site uses cookies to enhance user experience and analyze traffic.</p>
  </div>
);

export default PrivacyPolicy; 