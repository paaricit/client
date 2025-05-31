import React, { useState, useEffect } from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AssignmentList from './AssignmentList';
import PostAssignmentModal from './PostAssignmentModal';
import './Dashboard.scss';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssignments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/assignments');
      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }
      const data = await response.json();
      setAssignments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAssignmentCreated = (newAssignment) => {
    setAssignments(prev => [newAssignment, ...prev]);
  };

  return (
    <Box className="dashboard">
      <Navbar />
      <Box className="dashboard-content">
        <Sidebar />
        <Box className="main-content">
          <Box className="content-header">
            <h1>Assignments</h1>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              onClick={onOpen}
            >
              Post Assignment
            </Button>
          </Box>
          <AssignmentList
            assignments={assignments}
            isLoading={isLoading}
            error={error}
            onRefresh={fetchAssignments}
          />
        </Box>
      </Box>
      <PostAssignmentModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={handleAssignmentCreated}
      />
    </Box>
  );
};

export default Dashboard; 