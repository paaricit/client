import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Badge,
  Button,
  IconButton,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
  Link,
  Card,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import { FaFile, FaTrash, FaEdit } from 'react-icons/fa';
import httpClient from '../utils/httpClient';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await httpClient.get('/assignment');
      setAssignments(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to fetch assignments',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await httpClient.delete(`/assignment/${id}`);
      toast({
        title: 'Success',
        description: 'Assignment deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchAssignments();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete assignment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await httpClient.patch(`/assignment/${id}/status`, { status: newStatus });
      toast({
        title: 'Success',
        description: 'Status updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchAssignments();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'in_progress':
        return 'blue';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (assignments.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          No assignments found
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>Your Assignments</Heading>
      <VStack spacing={4} align="stretch">
        {assignments.map((assignment) => (
          <Card key={assignment._id}>
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
                <HStack spacing={4}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleStatusUpdate(assignment._id, 'completed')}
                    isDisabled={assignment.status === 'completed'}
                  >
                    Mark as Completed
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default AssignmentList; 