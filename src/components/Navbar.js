import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  useBreakpointValue,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import './Navbar.scss';

const SERVICES = [
  'Do My Assignment',
  'Accounting Assignment',
  'Law Assignment',
  'Marketing Assignment',
  'Programming Assignment',
  'Nursing Assignment',
  'Tafe Assignment',
  'Finance Assignment',
  'Physics Assignment',
  'MBA Assignment',
  'Economics Assignment',
  'Tableau Assignment',
  'Psychology Assignment',
  'Biology Assignment',
  'History Assignment',
  'Pay Someone To Do My Assignment',
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleExpertsClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('top-writers');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#top-writers');
      setTimeout(() => {
        const el = document.getElementById('top-writers');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = (
    <>
      <Menu isLazy>
        <MenuButton className="nav-menu-btn" as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
          Services
        </MenuButton>
        <MenuList className="dropdown-menu">
          {SERVICES.map((service, idx) => (
            <MenuItem
              className="dropdown-item"
              as={Link}
              to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
              key={idx}
            >
              {service}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <a className="nav-link" href="#top-writers" onClick={handleExpertsClick}>Experts</a>
      <Link className="nav-link" to="/reviews">Reviews</Link>
      <Link className="nav-link" to="/about">About us</Link>
      <Menu isLazy>
        <MenuButton className="nav-menu-btn" as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
          Academic Tools
        </MenuButton>
        <MenuList className="dropdown-menu">
          <MenuItem className="dropdown-item" as={Link} to="/tools/proofreading">Proofreading</MenuItem>
          <MenuItem className="dropdown-item" as={Link} to="/tools/grammar">Grammar Checker</MenuItem>
          <MenuItem className="dropdown-item" as={Link} to="/tools/gpa">GPA Calculator</MenuItem>
        </MenuList>
      </Menu>
    </>
  );

  return (
    <Box className="navbar">
      {/* Logo and subtitle */}
      <div className="navbar-logo">
        <div className="logo-circle">W</div>
        <div>
          <div className="logo-text">weDoForYou <sup>™</sup></div>
          <div className="logo-sub">World's No.1 Essay & Assignment Help Co. since 2007</div>
        </div>
      </div>

      {/* Desktop nav links */}
      <div className="navbar-links">
        {navLinks}
      </div>

      {/* Actions */}
      <div className="navbar-actions">
        {user ? (
          <Menu>
            <MenuButton
              as={Button}
              className="user-icon-btn"
              variant="ghost"
              _hover={{ bg: 'rgba(255,255,255,0.12)' }}
            >
              <FaUserCircle />
            </MenuButton>
            <MenuList className="profile-dropdown">
              <MenuItem 
                as={Link} 
                to="/profile"
                className="profile-dropdown-item"
              >
                Profile
              </MenuItem>
              <MenuItem 
                onClick={handleLogout}
                className="profile-dropdown-item"
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Link to="/user/login" className="order-btn">Sign In</Link>
            <Link to="/user/signup" className="order-btn" style={{ marginLeft: '0.5rem' }}>Sign Up</Link>
          </>
        )}
        {/* Hamburger for mobile */}
        <button className="navbar-mobile-menu-btn" style={{ display: isMobile ? 'block' : 'none' }} onClick={onOpen} aria-label="Open menu">
          <HamburgerIcon />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="#1C70DA">
          <DrawerCloseButton color="#fff" />
          <DrawerBody pt={10} px={4}>
            <VStack align="start" spacing={4}>
              <Box w="full">
                {user ? (
                  <>
                    <Link to="/profile" className="order-btn" style={{ width: '100%', display: 'block', textAlign: 'center' }}>Profile</Link>
                    <button className="order-btn navbar-logout-btn" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: '0.5rem' }} onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/user/login" className="order-btn" style={{ width: '100%', display: 'block', textAlign: 'center' }}>Sign In</Link>
                    <Link to="/user/signup" className="order-btn" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: '0.5rem' }}>Sign Up</Link>
                  </>
                )}
              </Box>
              {navLinks}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
