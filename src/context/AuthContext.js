import React, { createContext, useState, useEffect, useContext } from 'react';
import httpClient from '../utils/httpClient';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    console.log('Checking authentication...');
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    console.log('Stored user:', storedUser);
    console.log('Stored token:', storedToken ? 'Present' : 'Missing');
    
    if (storedToken) {
      if (storedUser && storedUser !== 'undefined') {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('Setting user from storage:', parsedUser);
          setUser(parsedUser);
          setToken(storedToken);
        } catch (err) {
          console.error('Error parsing stored user:', err);
          // Clear invalid data
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        }
      } else {
        console.log('No valid user data found');
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    } else {
      console.log('No token found');
      setUser(null);
      setToken(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('AuthProvider mounted');
    checkAuth();
  }, []);

  const login = async (email, password) => {
    console.log('Attempting login...');
    try {
      const res = await httpClient.post('/auth/login', { email, password });
      console.log('Login response:', res.data);
      
      const { token: newToken, user: userData } = res.data;
      
      // Validate token
      if (!newToken) {
        throw new Error('No token received from server');
      }

      // If no user data in response, create a minimal user object
      const user = userData || {
        email: email,
        name: email.split('@')[0], // Use email username as name
        role: 'student' // Default role
      };
      
      console.log('Setting user state:', user);
      console.log('Setting token state');
      
      // Update state
      setUser(user);
      setToken(newToken);
      
      // Update localStorage
      console.log('Updating localStorage');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', newToken);
      
      return { token: newToken, user };
    } catch (err) {
      console.error('Login error:', err);
      // Clear any partial data
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      let msg = 'Login failed';
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }
      throw new Error(msg);
    }
  };

  const signup = async (name, email, password) => {
    console.log('Attempting signup...');
    try {
      const res = await httpClient.post('/auth/register', { name, email, password });
      console.log('Signup response:', res.data);
      
      const { token: newToken, user: userData } = res.data;
      
      if (!newToken) {
        throw new Error('No token received from server');
      }

      // If no user data in response, create a minimal user object
      const user = userData || {
        email: email,
        name: name,
        role: 'student'
      };
      
      console.log('Setting user state:', user);
      console.log('Setting token state');
      
      setUser(user);
      setToken(newToken);
      
      console.log('Updating localStorage');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', newToken);
      
      return { token: newToken, user };
    } catch (err) {
      console.error('Signup error:', err);
      // Clear any partial data
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      let msg = 'Signup failed';
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }
      throw new Error(msg);
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('Logout complete');
  };

  // Helper to attach token to fetch requests
  const authFetch = (url, options = {}) => {
    return httpClient(url, options);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, authFetch, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
