import React, { useState } from 'react';
import {
  Box,
  VStack,
  Button,
  Text,
  useColorModeValue,
  Divider,
  Icon,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaUser,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onToggle } = useDisclosure();
  const [activeFilter, setActiveFilter] = useState('all');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FaClipboardList, label: 'My Assignments', path: '/assignments' },
    { icon: FaHistory, label: 'History', path: '/history' },
    { icon: FaUser, label: 'Profile', path: '/profile' },
  ];

  const statusFilters = [
    { label: 'All', value: 'all', color: 'gray' },
    { label: 'Pending', value: 'pending', color: 'yellow' },
    { label: 'In Progress', value: 'in_progress', color: 'blue' },
    { label: 'Completed', value: 'completed', color: 'green' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleFilterClick = (value) => {
    setActiveFilter(value);
    // You can add a callback prop to notify parent component about filter change
  };

  return (
    <Box
      w="250px"
      h="calc(100vh - 64px)"
      position="fixed"
      left={0}
      top="64px"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      py={4}
      px={2}
      overflowY="auto"
      transition="all 0.3s"
    >
      <VStack spacing={2} align="stretch">
        <Text
          fontSize="xl"
          fontWeight="bold"
          px={4}
          py={2}
          color="blue.500"
          borderBottom="1px"
          borderColor={borderColor}
        >
          Assignment Hub
        </Text>
        
        <VStack spacing={1} align="stretch" px={2}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? 'solid' : 'ghost'}
              colorScheme={isActive(item.path) ? 'blue' : 'gray'}
              leftIcon={<Icon as={item.icon} />}
              justifyContent="flex-start"
              px={4}
              py={6}
              onClick={() => navigate(item.path)}
              _hover={{
                bg: isActive(item.path) ? 'blue.500' : hoverBg,
              }}
              borderRadius="md"
            >
              {item.label}
            </Button>
          ))}
        </VStack>

        <Divider my={4} />

        <Box px={4}>
          <Button
            variant="ghost"
            size="sm"
            width="full"
            justifyContent="space-between"
            onClick={onToggle}
            mb={2}
          >
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              Assignment Status
            </Text>
            <Icon as={isOpen ? FaChevronDown : FaChevronRight} />
          </Button>

          <Collapse in={isOpen}>
            <VStack spacing={1} align="stretch">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? 'solid' : 'ghost'}
                  colorScheme={filter.color}
                  size="sm"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={FaClipboardList} />}
                  onClick={() => handleFilterClick(filter.value)}
                  _hover={{
                    bg: activeFilter === filter.value ? `${filter.color}.500` : hoverBg,
                  }}
                  borderRadius="md"
                >
                  {filter.label}
                </Button>
              ))}
            </VStack>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar; 