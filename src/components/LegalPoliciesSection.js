import React from 'react';
import './LegalPoliciesSection.scss';
import { Link } from 'react-router-dom';

const POLICIES = [
  {
    title: 'Terms of Use',
    summary: 'Understand the rules and responsibilities for using our platform and services.',
    link: '/terms-of-use',
  },
  {
    title: 'Privacy Policy',
    summary: 'Learn how we collect, use, and protect your personal information.',
    link: '/privacy-policy',
  },
  {
    title: 'Revision & Refund Policy',
    summary: 'Read about your rights to revisions and refunds for our services.',
    link: '/revision-refund-policy',
  },
  {
    title: 'Fair Use Policy',
    summary: 'See how we promote academic integrity and responsible use of our services.',
    link: '/fair-use-policy',
  },
];

const LegalPoliciesSection = () => (
  <section className="legal-policies-section">
    <h2>Legal & Policies</h2>
    <div className="policies-list">
      {POLICIES.map((policy, idx) => (
        <div className="policy-card" key={idx}>
          <h3>{policy.title}</h3>
          <p>{policy.summary}</p>
          <Link to={policy.link} className="read-more-link">Read More</Link>
        </div>
      ))}
    </div>
  </section>
);

export default LegalPoliciesSection; 