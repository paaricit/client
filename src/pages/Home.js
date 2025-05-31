// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TopWritersSection from '../components/TopWritersSection';
import StepsAndFeaturesSection from '../components/StepsAndFeaturesSection';
import FaqAndServicesSection from '../components/FaqAndServicesSection';
import LegalPoliciesSection from '../components/LegalPoliciesSection';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-dark-bg">
      <Navbar />
      <HeroSection />
      <TopWritersSection />
      <StepsAndFeaturesSection />
      <FaqAndServicesSection />
      {/* <LegalPoliciesSection /> */}
    </div>
  );
};

export default Home;