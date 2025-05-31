import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SERVICE_NAMES = {
  'physics-homework-help': 'Physics Homework Help',
  'physics-assignment-help': 'Physics Assignment Help',
  'php-assignment-help': 'Php Assignment Help',
  'philosophy-essay': 'Philosophy Essay',
  'philosophy-assignment-help': 'Philosophy Assignment Help',
  'phd-thesis-writers': 'Phd Thesis Writers',
  'pest-analysis-assignment-help': 'Pest Analysis Assignment Help',
  'persuasive-essay': 'Persuasive Essay',
  'personal-statement-writing': 'Personal Statement Writing',
  'perl-assignment-help': 'Perl Assignment Help',
  'performance-appraisal-assignment-help': 'Performance Appraisal Assignment Help',
  'pay-someone-to-do-my-homework': 'Pay Someone To Do My Homework',
  'pay-for-essay': 'Pay For Essay',
  'pay-for-assignments': 'Pay For Assignments',
  'pascal-programming-assignment-help': 'Pascal Programming Assignment Help',
};

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate(`/user/login?redirect=${encodeURIComponent(location.pathname)}`);
    }
  }, [user, navigate, location.pathname]);

  if (!user) return null;

  const serviceName = SERVICE_NAMES[serviceSlug] || 'Service';

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 p-4">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg flex flex-col items-center">
          <h1 className="text-blue-900 text-3xl font-bold mb-6">{serviceName}</h1>
          <p className="text-gray-700 text-lg mb-4">Welcome to our {serviceName} page. Here you can get expert help and support for your assignments!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail; 