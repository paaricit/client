import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/user/login?redirect=/profile');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 p-4">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg flex flex-col items-center">
          <h1 className="text-blue-900 text-3xl font-bold mb-6">Profile</h1>
          <p className="text-gray-700 text-lg mb-2"><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 