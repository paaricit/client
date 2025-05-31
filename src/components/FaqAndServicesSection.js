import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FaqAndServicesSection.scss';

const FAQS = [
  {
    q: 'Why do students order last-minute assistance with assignments from us?',
    a: 'MyAssignmenthelp.expert is known for having all the resources to handle accounting tasks. We are known for offering the best accounting assignment writing help and for delivering every accounting project on time. Since accounting is one of the complex subjects, we understand why students need professional help, and the experts provide assistance to all to ensure that they never miss the submission deadline. We understand how many students face time management problems and are known for offering assistance with all projects.'
  },
  {
    q: 'How much discount do you offer on the first accounting order?',
    a: 'You can hire online accounting assignment writers without paying a lot of money from MyAssignmenthelp.expert. We are known for providing services at a flat 25% off in addition to offering academic writing services at a low price to all students seeking help with cost accounting assignments. All you have to do is sign up for the best accounting assignment help from a trustworthy website. We have a dedicated team of experts to help you overcome the odds.'
  },
  {
    q: 'Can I talk to my experts when my accounting assignment writing is in progress?',
    a: 'You can connect with the accounting assignment writers when the writing is in progress. We ensure you get expert assistance with your fund accounting tasks when you need accounting assignment help. You can also ask them how they analyse an income statement or other financial statement for better understanding.'
  },
  {
    q: 'How much do your services cost in Australia?',
    a: 'Students from Norfolk Island seeking professional assistance with accounting assignments can be assured of getting things done at the lowest price. Share accurate information about your paper with us to get a free quote before availing of our online accounting assignment help services. We will deliver the word document following all instructions on time. If we fail to meet the expectations, you can opt for unlimited revisions without paying a single penny. We also offer exciting discounts to all asking for help from us. This is a reason students rely on us for expert help.'
  },
  {
    q: 'Do I need to pay in advance for account assignment writing?',
    a: 'We have a very easy ordering process. When you decide to avail our accounting assignment writing services, you will be asked to share every minute detail and make the payment before one of our accounting assignment writers starts working on the difficult task. We have flexible payment options to ease the decision-making process. Take steps to pay someone when you need help from us. You can also check our automated tools free of cost for quick results.'
  },
  {
    q: 'What qualifications do the writers have at professional accounting assignment services?',
    a: 'You can be assured of getting help with accounting assignment from some of the best accounting assignment writers when you sign up with us. We have expert writers with the highest educational qualifications in the discipline. From analysing an income statement to creating a balance sheet, they can do it all.'
  },
  {
    q: 'Can I pay someone to do my accounting assignment at low prices?',
    a: "We will assign the best accounting assignment helper to help with accounting tasks. However, students need not worry about the costs. Be assured of paying a minimum amount to get your assignment done perfectly. You can also get help with different subjects once you sign up with us at a low price. So, give us a call if you don't have adequate time to work on the projects."
  },
  {
    q: 'Do accounting assignment helpers provide plagiarism-free work?',
    a: 'We deliver completely original accounting assignment solutions and top-notch quality assignments to students who seek accounting assignment assistance from us. The assignment writers check the papers and remove all traces of plagiarism before delivering them to you. We also share a plagiarism report along with the solution. Be assured about getting a plagiarism-free paper from us.'
  },
  {
    q: 'Can you do my financial accounting assignments?',
    a: 'We cover various accounting topics. So, when you ask us for help with financial accounting assignments, we make sure you have a perfect one. Sign up to get financial statements done perfectly on time. From preparing a balance sheet and auditing to decoding complex topics, we can do it all. Hire us to get help with writing accounting assignments at a low price and for better preparation for the next tasks.'
  },
  {
    q: 'Will my professor know if I take account assignment writing services?',
    a: 'We are considered the most reliable accounting assignment help platform by students from prestigious universities. We keep your data confidential and ensure that no one knows that you have asked us for writing accounting assignments.'
  },
];

const SERVICES = [
  { text: 'Physics Homework Help', slug: 'physics-homework-help' },
  { text: 'Physics Assignment Help', slug: 'physics-assignment-help' },
  { text: 'Php Assignment Help', slug: 'php-assignment-help' },
  { text: 'Philosophy Essay', slug: 'philosophy-essay' },
  { text: 'Philosophy Assignment Help', slug: 'philosophy-assignment-help' },
  { text: 'Phd Thesis Writers', slug: 'phd-thesis-writers' },
  { text: 'Pest Analysis Assignment Help', slug: 'pest-analysis-assignment-help' },
  { text: 'Persuasive Essay', slug: 'persuasive-essay' },
  { text: 'Personal Statement Writing', slug: 'personal-statement-writing' },
  { text: 'Perl Assignment Help', slug: 'perl-assignment-help' },
  { text: 'Performance Appraisal Assignment Help', slug: 'performance-appraisal-assignment-help' },
  { text: 'Pay Someone To Do My Homework', slug: 'pay-someone-to-do-my-homework' },
  { text: 'Pay For Essay', slug: 'pay-for-essay' },
  { text: 'Pay For Assignments', slug: 'pay-for-assignments' },
  { text: 'Pascal Programming Assignment Help', slug: 'pascal-programming-assignment-help' },
];

const FaqAndServicesSection = () => {
  const [open, setOpen] = useState(null);
  const toggle = idx => setOpen(open === idx ? null : idx);

  // Split FAQ into two columns
  const leftFaqs = FAQS.filter((_, i) => i % 2 === 0);
  const rightFaqs = FAQS.filter((_, i) => i % 2 === 1);

  // Split services into two columns
  const mid = Math.ceil(SERVICES.length / 2);
  const leftServices = SERVICES.slice(0, mid);
  const rightServices = SERVICES.slice(mid);

  return (
    <>
      <section className="faq-services-section">
        <div className="faq-wrap">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-cols">
            <div className="faq-col">
              {leftFaqs.map((f, i) => {
                const idx = i * 2;
                return (
                  <div className="faq-item" key={idx}>
                    <div className="faq-q" onClick={() => toggle(idx)}>
                      {f.q}
                      <span className={open === idx ? 'arrow open' : 'arrow'}>
                        <img src="https://cdnx.myassignmenthelp.expert/assets/homepage/arrow-down-faq.svg" alt="arrow" width={20} />
                      </span>
                    </div>
                    <div className={open === idx ? 'faq-a open' : 'faq-a'}>{f.a}</div>
                  </div>
                );
              })}
            </div>
            <div className="faq-col">
              {rightFaqs.map((f, i) => {
                const idx = i * 2 + 1;
                return (
                  <div className="faq-item" key={idx}>
                    <div className="faq-q" onClick={() => toggle(idx)}>
                      {f.q}
                      <span className={open === idx ? 'arrow open' : 'arrow'}>
                        <img src="https://cdnx.myassignmenthelp.expert/assets/homepage/arrow-down-faq.svg" alt="arrow" width={20} />
                      </span>
                    </div>
                    <div className={open === idx ? 'faq-a open' : 'faq-a'}>{f.a}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="services-wrap">
          <h2>Other MyAssignmentHelp Services</h2>
          <div className="services-cta">
            <span>Get instant help from 5000+ experts</span>
          </div>
          <div className="services-list">
            <div className="services-col">
              {leftServices.map((s, i) => (
                <Link className="service-link" to={`/services/${s.slug}`} key={i}>
                  <span>{s.text}</span>
                  <img src="https://cdnx.myassignmenthelp.expert/assets/homepage/arrow-orange.svg" alt="arrow" width={14} />
                </Link>
              ))}
            </div>
            <div className="services-col">
              {rightServices.map((s, i) => (
                <Link className="service-link" to={`/services/${s.slug}`} key={i + mid}>
                  <span>{s.text}</span>
                  <img src="https://cdnx.myassignmenthelp.expert/assets/homepage/arrow-orange.svg" alt="arrow" width={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-policy-links">
        <div className="footer-links-wrap">
          <a href="/terms-of-use">Term of use</a>
          <span>|</span>
          <a href="/privacy-policy">Privacy policy</a>
          <span>|</span>
          <a href="/revision-refund-policy">Revision & Refund policy</a>
          <span>|</span>
          <a href="/fair-use-policy">Fair use policy</a>
        </div>
      </footer>
    </>
  );
};

export default FaqAndServicesSection; 