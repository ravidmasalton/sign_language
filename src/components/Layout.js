import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaHome, FaCamera, FaCog, FaSignOutAlt, FaBars, FaTimes, FaMoon, FaSun, FaArrowLeft, FaClosedCaptioning } from 'react-icons/fa';
import { auth } from '../firebaseConfig';

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
      {/* Mobile header with hamburger menu */}
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
          <NavItem isActive={isActive('/') || isActive('/camera')} backgroundColor={COLORS.primaryLight}>
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

      {/* Main content */}
      <MainContent 
        isMobile={isMobile} 
        isTablet={isTablet}
        isSidebarOpen={!isMobile || isMobileMenuOpen}
      >
        {children}
      </MainContent>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <MobileNavBar backgroundColor={COLORS.card} borderColor={COLORS.border}>
          <MobileNavItem isActive={isActive('/') || isActive('/camera')}>
            <MobileNavLink to="/" activeColor={COLORS.primary} color={COLORS.textSecondary}>
              <FaHome size={24} />
              <MobileNavText>Home</MobileNavText>
            </MobileNavLink>
          </MobileNavItem>
            <MobileNavItem isActive={isActive('/camera')}>
            <MobileNavLink to="/camera" activeColor={COLORS.primary} color={COLORS.textSecondary}>
              <FaCamera size={24} />
              <MobileNavText>Video to Word</MobileNavText>
            </MobileNavLink>
          </MobileNavItem>
            <MobileNavItem isActive={isActive('/word-to-animation')}>
            <MobileNavLink to="/word-to-animation" activeColor={COLORS.primary} color={COLORS.textSecondary}>
              <FaClosedCaptioning size={24} />
              <MobileNavText>Word to Animation</MobileNavText>
            </MobileNavLink>
          </MobileNavItem>
          
          <MobileNavItem isActive={isActive('/settings')}>
            <MobileNavLink to="/settings" activeColor={COLORS.primary} color={COLORS.textSecondary}>
              <FaCog size={24} />
              <MobileNavText>Settings</MobileNavText>
            </MobileNavLink>
          </MobileNavItem>
        </MobileNavBar>
      )}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.backgroundColor};
  position: relative;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MobileHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const AppTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.color};
  margin: 0;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Sidebar = styled.nav`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  width: ${props => props.isMobile ? '80%' : '250px'};
  height: 100vh;
  background-color: ${props => props.backgroundColor};
  border-right: ${props => !props.isMobile ? `1px solid ${props.borderColor}` : 'none'};
  position: ${props => props.isMobile ? 'fixed' : 'sticky'};
  top: 0;
  left: 0;
  z-index: 1000;
  padding: ${props => props.isMobile ? '60px 0 0 0' : '20px 0'};
  transition: transform 0.3s ease;
  box-shadow: ${props => props.isMobile ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
  overflow-y: auto;
`;

const AppLogo = styled.div`
  padding: 16px 20px;
  margin-bottom: 20px;
`;

const NavItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const NavItem = styled.li`
  margin: 8px 10px;
  border-radius: 8px;
  background-color: ${props => props.isActive ? props.backgroundColor : 'transparent'};
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: ${props => props.isActive ? props.activeColor : props.color};
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s;
  min-height: 44px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const NavText = styled.span`
  margin-left: 12px;
  font-size: 16px;
`;

const BottomNavItems = styled.div`
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 8px;
  min-height: 44px;
  text-align: left;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.color};
  border-radius: 8px;
  min-height: 44px;
  text-align: left;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${props => props.isMobile ? '70px 16px 80px' : '20px'};
  transition: margin-left 0.3s ease;
`;

const MobileNavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${props => props.backgroundColor};
  border-top: 1px solid ${props => props.borderColor};
  z-index: 100;
`;

const MobileNavItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: ${props => props.isActive ? props.activeColor : props.color};
  text-decoration: none;
`;

const MobileNavText = styled.span`
  font-size: 12px;
  margin-top: 4px;
`;

export default Layout;
