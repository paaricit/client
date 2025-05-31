import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.scss';
import { Box, Input, Button, FormControl, FormLabel, Heading, Text, Spinner, useToast, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = () => {
  const { login, user, token } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && token) {
      const params = new URLSearchParams(location.search);
      const redirect = params.get('redirect') || '/dashboard';
      navigate(redirect, { replace: true });
    }
  }, [user, token, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login(email, password);
      console.log('Login response:', response); // Debug log
      
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });

      // Get redirect path
      const params = new URLSearchParams(location.search);
      const redirect = params.get('redirect') || '/dashboard';
      console.log('Redirecting to:', redirect); // Debug log
      
      // Navigate immediately
      navigate(redirect, { replace: true });
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(err.message || 'Login failed');
      toast({
        title: 'Login failed',
        description: err.message || 'Invalid credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="auth-page" minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.900, indigo.900, gray.900)">
      <Box className="auth-card" bg="whiteAlpha.900" p={8} borderRadius="2xl" boxShadow="xl" maxW="sm" w="100%">
        <Heading as="h1" size="lg" color="blue.700" mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit} className="auth-form">
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter your email"
              isDisabled={loading}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                isDisabled={loading}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  isDisabled={loading}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {error && <Text color="red.500" mb={2}>{error}</Text>}
          <Button 
            type="submit" 
            colorScheme="blue" 
            w="100%" 
            isLoading={loading} 
            mb={3} 
            disabled={loading}
          >
            {loading ? <Spinner size="sm" color="white" /> : 'Login'}
          </Button>
        </form>
        <Text textAlign="center" fontSize="sm">
          Don't have an account? <Link to="/user/signup" className="auth-link">Sign up</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
