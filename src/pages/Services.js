import React from 'react';
import Navbar from '../components/Navbar';

const Services = () => (
  <div>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 p-4">
      <h2 className="text-blue-200 text-2xl font-bold mb-6">Our Services</h2>
      <ul className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-3">
        <li className="text-blue-900 font-medium">Assignment Help (All Subjects)</li>
        <li className="text-blue-900 font-medium">Essay Writing</li>
        <li className="text-blue-900 font-medium">Research Assistance</li>
        <li className="text-blue-900 font-medium">Proofreading & Editing</li>
        <li className="text-blue-900 font-medium">Plagiarism Checking</li>
        <li className="text-blue-900 font-medium">24/7 Expert Support</li>
      </ul>
    </div>
  </div>
);

export default Services; 