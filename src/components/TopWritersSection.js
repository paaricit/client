import React from 'react';
import './TopWritersSection.scss';

const WRITERS = [
  {
    name: 'Ann Wallace',
    degree: 'Degree in Accounting',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    desc: 'Get answers to all complex accounting problems in the blink of an eye. Hire me when you have tight deadlines.',
    orders: 1278,
    reviews: 383,
  },
  {
    name: 'Leigh Schmidt',
    degree: 'MA in English',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    desc: 'From Shakespeare to TS Eliot, I cover all literary eras. Get help with your essays and research papers.',
    orders: 2500,
    reviews: 550,
  },
  {
    name: 'Lynette White',
    degree: 'PhD in Management',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    desc: 'Reach out to me whenever you need unique topic suggestions on the latest marketing trends and breakthroughs.',
    orders: 1100,
    reviews: 275,
  },
  {
    name: 'Maurice Hogan',
    degree: 'Master In Programming',
    img: 'https://randomuser.me/api/portraits/men/43.jpg',
    rating: 5,
    desc: 'I was a lecturer before I joined MyAssignmentHelp. I specialize in programming, networking, and more.',
    orders: 3200,
    reviews: 928,
  },
];

const TopWritersSection = () => (
  <section className="top-writers-section" id="top-writers">
    <div className="top-writers-header">
      <h2>Meet the Top Assignment Writers</h2>
      <p>Take Your Pick from Our Team of Reliable Academic Scholars.</p>
    </div>
    <div className="top-writers-list">
      {WRITERS.map((w, i) => (
        <div className="writer-card" key={i}>
          <div className="writer-card-header">
            <div className="writer-img-wrap">
              <img src={w.img} alt={w.name} />
              <span className="writer-online" />
            </div>
            <div>
              <div className="writer-name">{w.name}</div>
              <div className="writer-degree">{w.degree}</div>
              <div className="writer-rating">
                {[...Array(w.rating)].map((_, idx) => (
                  <span key={idx} className="star">★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="writer-desc">{w.desc}</div>
          <div className="writer-card-footer">
            <div className="writer-meta">
              <span className="meta-item"><span className="icon">⏱️</span> <b>{w.orders}</b> Completed Orders</span>
              <span className="meta-item"><span className="icon">💬</span> <b>{w.reviews}</b> Student Reviews</span>
            </div>
            <button className="writer-hire-btn">Hire Me</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TopWritersSection; 