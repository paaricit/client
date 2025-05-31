// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ChakraProvider, Spinner, Box } from '@chakra-ui/react';

import Signup from './pages/Signup'; // Create this file in /pages
import Login from './pages/Login';   // Create this file in /pages
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import UploadAssignment from './pages/UploadAssignment';
import Profile from './pages/Profile';
import Services from './pages/Services';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RevisionRefundPolicy from './pages/RevisionRefundPolicy';
import FairUsePolicy from './pages/FairUsePolicy';
import ServiceDetail from './pages/ServiceDetail';
import { AuthProvider, AuthContext } from './context/AuthContext';
// import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user, token, isLoading } = useContext(AuthContext);
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();

  console.log('PrivateRoute render - User:', user);
  console.log('PrivateRoute render - Token:', token ? 'Present' : 'Missing');
  console.log('PrivateRoute render - Loading:', isLoading);
  console.log('PrivateRoute render - Verifying:', isVerifying);

  useEffect(() => {
    console.log('PrivateRoute useEffect - Checking authentication');
    
    // If AuthContext is still loading, wait
    if (isLoading) {
      console.log('PrivateRoute useEffect - AuthContext still loading');
      return;
    }

    // If we have both user and token in context, we're good
    if (user && token) {
      console.log('PrivateRoute useEffect - Valid context state');
      setIsVerifying(false);
      return;
    }

    // Check localStorage as fallback
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('PrivateRoute useEffect - Stored token:', storedToken ? 'Present' : 'Missing');
    console.log('PrivateRoute useEffect - Stored user:', storedUser ? 'Present' : 'Missing');
    
    if (!storedToken || !storedUser) {
      console.log('PrivateRoute useEffect - No stored credentials');
      setIsVerifying(false);
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser || !storedToken) {
        throw new Error('Invalid stored data');
      }
      console.log('PrivateRoute useEffect - Valid stored credentials');
      setIsVerifying(false);
    } catch (err) {
      console.error('PrivateRoute useEffect - Error with stored data:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsVerifying(false);
    }
  }, [isLoading, user, token]);

  if (isLoading || isVerifying) {
    console.log('PrivateRoute - Showing loading spinner');
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  // Check both token and user existence
  const isAuthenticated = Boolean(token && user);
  console.log('PrivateRoute - Authentication status:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('PrivateRoute - Not authenticated, redirecting to login');
    return <Navigate to="/user/login" replace />;
  }

  console.log('PrivateRoute - Authenticated, rendering children');
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/upload" 
        element={
          <PrivateRoute>
            <UploadAssignment />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
      <Route path="/services" element={<Services />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/revision-refund-policy" element={<RevisionRefundPolicy />} />
      <Route path="/fair-use-policy" element={<FairUsePolicy />} />
      <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
