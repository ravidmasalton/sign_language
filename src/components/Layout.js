import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaHome, FaCamera, FaCog, FaSignOutAlt, FaBars, FaTimes, FaMoon, FaSun, FaArrowLeft, FaClosedCaptioning, FaCloudUploadAlt } from 'react-icons/fa';
import { auth } from '../firebaseConfig';
import HelpSystem from './help';

// Animation keyframes for mobile menu
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Layout = ({ children }) => {
  const { theme: COLORS, isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth <= 1024);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
      if (width >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Navigation will be handled by the auth state change listener in App.js
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <LayoutContainer backgroundColor={COLORS.background}>
      {/* Mobile header with hamburger menu - ALWAYS VISIBLE ON MOBILE */}
      {isMobile && (
        <MobileHeader backgroundColor={COLORS.card}>
          {location.pathname !== '/' && location.pathname !== '/camera' && (
            <BackButton 
              onClick={handleGoBack}
              aria-label="Go back"
            >
              <FaArrowLeft color={COLORS.text} size={18} />
            </BackButton>
          )}
          <AppTitle color={COLORS.text}>Sign Language App</AppTitle>
          <MenuButton 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes color={COLORS.text} /> : <FaBars color={COLORS.text} />}
          </MenuButton>
        </MobileHeader>
      )}

      {/* Sidebar navigation for desktop, or overlay for mobile */}
      <Sidebar 
        isMobile={isMobile} 
        isTablet={isTablet}
        isOpen={!isMobile || isMobileMenuOpen}
        backgroundColor={COLORS.card}
        borderColor={COLORS.border}
      >
        {!isMobile && (
          <AppLogo>
            <AppTitle color={COLORS.text}>Sign Language App</AppTitle>
          </AppLogo>
        )}        
        
        <NavItems>
          <NavItem isActive={isActive('/')} backgroundColor={COLORS.primaryLight}>
            <NavLink to="/" color={COLORS.text} activeColor={COLORS.primary}>
              <FaHome size={20} />
              <NavText>Home</NavText>
            </NavLink>
          </NavItem>
          
          <NavItem isActive={isActive('/camera')} backgroundColor={COLORS.primaryLight}>
            <NavLink to="/camera" color={COLORS.text} activeColor={COLORS.primary}>
              <FaCamera size={20} />
              <NavText>Video to Word</NavText>
            </NavLink>
          </NavItem>
          
          <NavItem isActive={isActive('/word-to-animation')} backgroundColor={COLORS.primaryLight}>
            <NavLink to="/word-to-animation" color={COLORS.text} activeColor={COLORS.primary}>
              <FaClosedCaptioning size={20} />
              <NavText>Word to Animation</NavText>
            </NavLink>
          </NavItem>
          
          <NavItem isActive={isActive('/video-upload')} backgroundColor={COLORS.primaryLight}>
            <NavLink to="/video-upload" color={COLORS.text} activeColor={COLORS.primary}>
              <FaCloudUploadAlt size={20} />
              <NavText>Upload Video</NavText>
            </NavLink>
          </NavItem>
          
          <NavItem isActive={isActive('/settings')} backgroundColor={COLORS.primaryLight}>
            <NavLink to="/settings" color={COLORS.text} activeColor={COLORS.primary}>
              <FaCog size={20} />
              <NavText>Settings</NavText>
            </NavLink>
          </NavItem>
        </NavItems>

        <BottomNavItems>
          <ThemeToggle 
            onClick={toggleTheme} 
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <>
                <FaSun size={18} color={COLORS.text} />
                <NavText>Light Mode</NavText>
              </>
            ) : (
              <>
                <FaMoon size={18} color={COLORS.text} />
                <NavText>Dark Mode</NavText>
              </>
            )}
          </ThemeToggle>

          <LogoutButton 
            color={COLORS.text}
            onClick={handleLogout}
          >
            <FaSignOutAlt size={20} />
            <NavText>Logout</NavText>
          </LogoutButton>
        </BottomNavItems>
      </Sidebar>

      {/* Overlay for mobile menu */}
      {isMobile && isMobileMenuOpen && (
        <Overlay onClick={toggleMobileMenu} />
      )}

      {/* Main content - ADJUSTED PADDING FOR MOBILE */}
      <MainContent 
        isMobile={isMobile} 
        isTablet={isTablet}
        isSidebarOpen={!isMobile || isMobileMenuOpen}
      >
        {children}
        <HelpSystem />
      </MainContent>

      {/* REMOVED: Mobile bottom navigation - NO LONGER DISPLAYED */}
      {/* The MobileNavBar component has been completely removed for mobile */}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${props => props.backgroundColor};
  position: relative;
  transition: background 0.3s ease;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MobileHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${props => props.backgroundColor};
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 60px; /* Fixed height for consistent layout */
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const AppTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.5px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MenuButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Sidebar = styled.nav`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  width: ${props => props.isMobile ? '85%' : '280px'};
  height: 100vh;
  background: ${props => props.backgroundColor};
  backdrop-filter: blur(20px);
  border-right: ${props => !props.isMobile ? `1px solid ${props.borderColor}` : 'none'};
  border-left: ${props => props.isMobile ? `1px solid ${props.borderColor}` : 'none'};
  position: ${props => props.isMobile ? 'fixed' : 'sticky'};
  top: 0;
  ${props => props.isMobile ? 'right: 0;' : 'left: 0;'}
  z-index: 1000;
  padding: ${props => props.isMobile ? '80px 0 0 0' : '32px 0'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isMobile ? '0 0 40px rgba(0, 0, 0, 0.2)' : 'none'};
  overflow-y: auto;
  
  /* Add slide-in animation for mobile */
  ${props => props.isMobile && props.isOpen && css`
    animation: ${slideInFromRight} 0.3s ease-out;
  `}
  
  /* Modern glassmorphism effect */
  background: ${props => props.isMobile ? 
    `linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95), 
      rgba(255, 255, 255, 0.8))` : 
    props.backgroundColor};
`;

const AppLogo = styled.div`
  padding: 20px 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const NavItems = styled.ul`
  list-style: none;
  padding: 0 16px;
  margin: 0;
  flex: 1;
`;

const NavItem = styled.li`
  margin: 8px 0;
  border-radius: 16px;
  background: ${props => props.isActive ? 
    'linear-gradient(135deg, #6366f1, #8b5cf6)' : 
    'transparent'};
  box-shadow: ${props => props.isActive ? 
    '0 4px 14px rgba(99, 102, 241, 0.3)' : 
    'none'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(4px);
    background: ${props => !props.isActive ? 
      'rgba(99, 102, 241, 0.05)' : 
      'linear-gradient(135deg, #6366f1, #8b5cf6)'};
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  color: ${props => props.isActive ? '#ffffff' : props.color};
  text-decoration: none;
  border-radius: 16px;
  transition: all 0.3s ease;
  min-height: 52px;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.isActive ? '#ffffff' : props.activeColor};
  }
`;

const NavText = styled.span`
  margin-left: 16px;
  font-size: 16px;
  font-weight: 500;
`;

const BottomNavItems = styled.div`
  margin-top: auto;
  padding: 20px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  cursor: pointer;
  border-radius: 16px;
  margin-bottom: 12px;
  min-height: 52px;
  text-align: left;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(245, 158, 11, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  cursor: pointer;
  color: #ef4444;
  border-radius: 16px;
  min-height: 52px;
  text-align: left;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  transition: all 0.3s ease;
`;

/* UPDATED: MainContent with proper mobile padding */
const MainContent = styled.main`
  flex: 1;
  padding: ${props => props.isMobile ? '80px 20px 20px' : '32px'};
  transition: all 0.3s ease;
  overflow-x: hidden;
  min-height: 100vh;
  
  /* Ensure content takes full height on mobile without bottom nav */
  @media (max-width: 767px) {
    padding-top: 80px; /* Space for fixed header */
    padding-bottom: 20px; /* No extra space for removed bottom nav */
    min-height: calc(100vh - 80px); /* Full height minus header */
  }
`;

/* REMOVED: All MobileNavBar related styled components */
/* MobileNavBar, MobileNavItem, MobileNavLink, MobileNavText are no longer needed */

export default Layout;