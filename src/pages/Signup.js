import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.scss';
import { Box, Input, Button, FormControl, FormLabel, Heading, Text, Spinner, useToast, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast({
        title: 'Signup failed',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password);
      toast({
        title: 'Signup successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
      toast({
        title: 'Signup failed',
        description: err.message || 'Signup failed',
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
        <Heading as="h1" size="lg" color="blue.700" mb={6} textAlign="center">Sign Up</Heading>
        <form onSubmit={handleSubmit} className="auth-form">
          <FormControl mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
              <InputRightElement>
                <IconButton
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {error && <Text color="red.500" mb={2}>{error}</Text>}
          <Button type="submit" colorScheme="blue" w="100%" isLoading={loading} mb={3} disabled={loading}>
            {loading ? <Spinner size="sm" color="white" /> : 'Sign Up'}
          </Button>
        </form>
        <Text textAlign="center" fontSize="sm">Already have an account? <Link to="/user/login" className="auth-link">Login</Link></Text>
      </Box>
    </Box>
  );
};

export default Signup;
