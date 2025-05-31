import React from 'react';
import './StepsAndFeaturesSection.scss';

const STEPS = [
  {
    icon: '📝',
    title: 'Place Your Order',
    desc: 'If you want professional assistance with any type of academic paper, just fill out our order form with the accurate details.',
  },
  {
    icon: '💳',
    title: 'Complete The Payment',
    desc: 'Get assignment solutions by paying via a secure payment gateway using a credit/debit card, Apple Pay, etc.',
  },
  {
    icon: '📦',
    title: 'Receive The Solution',
    desc: 'As soon as the order is confirmed, we assign experienced writers so you get A-grade assignments within the deadline.',
  },
];

const FEATURES = [
  {
    icon: '📅',
    title: 'Quickest Assignment Writing Services',
    desc: 'Writing assignments when racing against time can be hectic. Hiring us means you can submit your assignment on time. Let our assignment',
  },
  {
    icon: '📝',
    title: 'Assignment Writing Service With 100+ Topics',
    desc: 'When you need academic help, Australia has MyAssignmentHelp, where reputed scholars can provide assignment solutions on any',
  },
  {
    icon: '24/7',
    title: 'Round The Clock Guidance',
    desc: 'You can book our Australian assignment writing service whenever you want! Our expert writers take on rotating shifts to solve your',
  },
  {
    icon: '✔️',
    title: '100% Original Solutions Guaranteed',
    desc: 'Every writer on our website composes papers from scratch. They conduct in-depth research and conduct multiple quality checks to',
  },
  {
    icon: '🔒',
    title: 'Complete Confidentiality From Experts',
    desc: 'Rest assured, we do not share any student details with our assignment writers. They only have access to your assignment details and',
  },
  {
    icon: '💰',
    title: 'Jaw-Dropping Deals And Policies',
    desc: 'Hiring a university assignment helper on our website is not expensive at all. We provide affordable prices, along with a money-back guarantee',
  },
];

const StepsAndFeaturesSection = () => (
  <section className="steps-features-section">
    <div className="steps-section">
      <h2>3 Steps to Achieve Excellence with Online Assignment Help Australia</h2>
      <div className="steps-list">
        {STEPS.map((step, i) => (
          <div className="step-item" key={i}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
      <button className="steps-order-btn">Order Now</button>
    </div>
    <div className="features-section">
      <h2>MyAssignmentHelp Guarantees And Features</h2>
      <div className="features-list">
        {FEATURES.map((f, i) => (
          <div className="feature-item" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
      <button className="features-explore-btn">Explore Other Features</button>
    </div>
  </section>
);

export default StepsAndFeaturesSection; 