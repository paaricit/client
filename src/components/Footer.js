import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-links">
        <Link to="/terms-of-use">Terms of Use</Link>
        <span>|</span>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <span>|</span>
        <Link to="/revision-refund-policy">Revision & Refund Policy</Link>
        <span>|</span>
        <Link to="/fair-use-policy">Fair Use Policy</Link>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} MyAssignmentHelp. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 