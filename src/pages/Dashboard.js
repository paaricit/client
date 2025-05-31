import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAssignments } from '../services/assignmentService';
import Navbar from '../components/Navbar';
import { Box, Heading, Text, Button, Spinner, useToast, VStack, HStack, Card, CardBody, CardHeader, CardFooter, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import httpClient from '../services/httpClient';

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    file: null
  });
  const navigate = useNavigate();
  const toast = useToast();

  console.log('Dashboard render - User:', user);
  console.log('Dashboard render - Token:', token ? 'Present' : 'Missing');
  console.log('Dashboard render - Loading:', loading);
  console.log('Dashboard render - Error:', error);

  useEffect(() => {
    console.log('Dashboard useEffect - Initial check');
    // Check authentication
    if (!user || !token) {
      console.log('Dashboard useEffect - No user or token found:', { user, token });
      navigate('/user/login?redirect=/dashboard', { replace: true });
      return;
    }

    const fetchData = async () => {
      console.log('Dashboard useEffect - Starting to fetch assignments');
      try {
        setLoading(true);
        console.log('Dashboard useEffect - Making API call to get assignments');
        const response = await httpClient.get('/assignment');
        console.log('Dashboard useEffect - Assignments fetched successfully:', response.data);
        setAssignments(response.data);
      } catch (err) {
        console.error('Dashboard useEffect - Error fetching assignments:', err);
        console.error('Dashboard useEffect - Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.message || 'Failed to load assignments');
        toast({
          title: 'Error',
          description: err.message || 'Failed to load assignments',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        console.log('Dashboard useEffect - Setting loading to false');
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token, navigate, toast]);

  const handleLogout = () => {
    console.log('Dashboard - Logout clicked');
    logout();
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    navigate('/user/login', { replace: true });
  };

  const handleFileChange = (e) => {
    setNewAssignment({
      ...newAssignment,
      file: e.target.files[0]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({
      ...newAssignment,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newAssignment.title);
      formData.append('description', newAssignment.description);
      formData.append('dueDate', newAssignment.dueDate);
      if (newAssignment.file) {
        formData.append('file', newAssignment.file);
      }

      const response = await httpClient.post('/assignment', formData);
      
      toast({
        title: 'Assignment created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setNewAssignment({
        title: '',
        description: '',
        dueDate: '',
        file: null
      });

      // Refresh assignments list
      const assignmentsResponse = await httpClient.get('/assignment');
      setAssignments(assignmentsResponse.data);
    } catch (err) {
      console.error('Error creating assignment:', err);
      toast({
        title: 'Error creating assignment',
        description: err.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    console.log('Dashboard - Rendering loading spinner');
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  console.log('Dashboard - Rendering main content');
  return (
    <Box minH="100vh" bgGradient="linear(to-br, blue.900, indigo.900, gray.900)">
      <Navbar />
      <Box p={8}>
        <VStack spacing={8} align="stretch" maxW="6xl" mx="auto">
          {/* User Info Card */}
          <Card bg="whiteAlpha.900" borderRadius="2xl" boxShadow="xl">
            <CardHeader>
              <Heading as="h1" size="xl" color="blue.700">
                Welcome, {user?.name || user?.email}!
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="lg" color="gray.700">
                Email: {user?.email}
              </Text>
              {error && (
                <Text color="red.500" mt={4}>
                  {error}
                </Text>
              )}
            </CardBody>
            <CardFooter>
              <Button
                onClick={handleLogout}
                colorScheme="blue"
                size="lg"
                width="full"
              >
                Logout
              </Button>
            </CardFooter>
          </Card>

          {/* New Assignment Form */}
          <Card bg="whiteAlpha.900" borderRadius="2xl" boxShadow="xl">
            <CardHeader>
              <Heading as="h2" size="lg" color="blue.700">
                Create New Assignment
              </Heading>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      value={newAssignment.title}
                      onChange={handleInputChange}
                      placeholder="Enter assignment title"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={newAssignment.description}
                      onChange={handleInputChange}
                      placeholder="Enter assignment description"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                      type="datetime-local"
                      name="dueDate"
                      value={newAssignment.dueDate}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>File</FormLabel>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    width="full"
                    isLoading={loading}
                  >
                    Create Assignment
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </Card>

          {/* Assignments List */}
          <Card bg="whiteAlpha.900" borderRadius="2xl" boxShadow="xl">
            <CardHeader>
              <Heading as="h2" size="lg" color="blue.700">
                Your Assignments
              </Heading>
            </CardHeader>
            <CardBody>
              {error ? (
                <Text color="red.500">{error}</Text>
              ) : assignments.length === 0 ? (
                <Text color="gray.600">No assignments found.</Text>
              ) : (
                <VStack spacing={4} align="stretch">
                  {assignments.map((assignment) => (
                    <Card key={assignment._id} variant="outline">
                      <CardBody>
                        <VStack align="stretch" spacing={2}>
                          <Heading size="md">{assignment.title}</Heading>
                          <Text>{assignment.description}</Text>
                          <HStack justify="space-between">
                            <Text color="gray.600">
                              Status: {assignment.status}
                            </Text>
                            <Text color="gray.600">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              )}
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
