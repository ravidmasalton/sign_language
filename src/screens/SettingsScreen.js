import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun, FaSignOutAlt, FaBell, FaCog, FaLock, FaQuestion, FaFileAlt, FaTrash, FaGlobe, FaLanguage } from 'react-icons/fa';
import { auth } from '../firebaseConfig';

const SettingsScreen = () => {
  const { theme: COLORS, isDarkMode, toggleTheme } = useTheme();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [cameraAutostart, setCameraAutostart] = useState(true);
  const [languagePreference, setLanguagePreference] = useState('en');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLogout = async () => {
    if (showConfirmLogout) {
      try {
        await auth.signOut();
        // Navigation will be handled by the auth state change listener in the main app
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      setShowConfirmLogout(true);
    }
  };
  
  const handleCancelLogout = () => {
    setShowConfirmLogout(false);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all app data? This action cannot be undone.')) {
      // Logic to clear app data would go here
      alert('All data has been cleared');
    }
  };
  
  const handleLanguageChange = (lang) => {
    setLanguagePreference(lang);
  };

  return (
    <Container backgroundColor={COLORS.background}>
      <Title color={COLORS.text}>Settings</Title>
      
      <SettingsGroup>
        <GroupTitle color={COLORS.text}>Appearance</GroupTitle>
        
        <SettingItem backgroundColor={COLORS.card} borderColor={COLORS.border}>
          <SettingIcon>
            {isDarkMode ? <FaSun color="#FBBC04" /> : <FaMoon color="#5F6368" />}
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Dark Mode</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              {isDarkMode ? 'Currently using dark theme' : 'Currently using light theme'}
            </SettingDescription>
          </SettingContent>
          <Toggle 
            isActive={isDarkMode}
            activeColor={COLORS.primary}
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <ToggleThumb isActive={isDarkMode} />
          </Toggle>
        </SettingItem>
        
        <SettingItem backgroundColor={COLORS.card} borderColor={COLORS.border}>
          <SettingIcon>
            <FaBell color={notificationsEnabled ? COLORS.primary : "#5F6368"} />
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Notifications</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Receive alerts about new features and updates
            </SettingDescription>
          </SettingContent>
          <Toggle 
            isActive={notificationsEnabled}
            activeColor={COLORS.primary}
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            aria-label={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
          >
            <ToggleThumb isActive={notificationsEnabled} />
          </Toggle>
        </SettingItem>
        
        <SettingItem backgroundColor={COLORS.card} borderColor={COLORS.border}>
          <SettingIcon>
            <FaLanguage color={COLORS.textSecondary} />
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Language</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Choose your preferred language
            </SettingDescription>
          </SettingContent>
          <LanguageSelector 
            value={languagePreference} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            backgroundColor={COLORS.card}
            borderColor={COLORS.border}
            color={COLORS.text}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </LanguageSelector>
        </SettingItem>
      </SettingsGroup>
      
      <SettingsGroup>
        <GroupTitle color={COLORS.text}>Camera Settings</GroupTitle>
        
        <SettingItem backgroundColor={COLORS.card} borderColor={COLORS.border}>
          <SettingIcon>
            <FaCog color={cameraAutostart ? COLORS.primary : "#5F6368"} />
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Camera Auto-start</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Automatically start camera when opening the app
            </SettingDescription>
          </SettingContent>
          <Toggle 
            isActive={cameraAutostart}
            activeColor={COLORS.primary}
            onClick={() => setCameraAutostart(!cameraAutostart)}
            aria-label={cameraAutostart ? "Disable camera auto-start" : "Enable camera auto-start"}
          >
            <ToggleThumb isActive={cameraAutostart} />
          </Toggle>
        </SettingItem>
      </SettingsGroup>
      
      <SettingsGroup>
        <GroupTitle color={COLORS.text}>Account</GroupTitle>
        
        <SettingItem 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border}
          as="button"
          onClick={() => {}}
          role="button"
        >
          <SettingIcon>
            <FaLock color="#5F6368" />
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Change Password</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Update your account password
            </SettingDescription>
          </SettingContent>
          <ChevronButton>
            <ChevronRight color={COLORS.textSecondary} />
          </ChevronButton>
        </SettingItem>
        
        <DangerItem 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border} 
          onClick={handleLogout}
        >
          <SettingIcon>
            <FaSignOutAlt color="#EA4335" />
          </SettingIcon>
          <SettingContent>
            <DangerLabel>Logout</DangerLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Sign out of your account
            </SettingDescription>
          </SettingContent>
        </DangerItem>
      </SettingsGroup>
      
      <SettingsGroup>
        <GroupTitle color={COLORS.text}>About & Help</GroupTitle>
        
        <SettingItem 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border}
          as="button"
          onClick={() => {}}
          role="button"
        >
          <SettingIcon>
            <FaQuestion color="#5F6368" />
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Help & Support</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Get help with using the app
            </SettingDescription>
          </SettingContent>
          <ChevronButton>
            <ChevronRight color={COLORS.textSecondary} />
          </ChevronButton>
        </SettingItem>
        
        <SettingItem 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border}
          as="button"
          onClick={() => {}}
          role="button"
        >
          <SettingIcon>
            <FaFileAlt color="#5F6368" />
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Privacy Policy</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Read our privacy policy
            </SettingDescription>
          </SettingContent>
          <ChevronButton>
            <ChevronRight color={COLORS.textSecondary} />
          </ChevronButton>
        </SettingItem>
        
        <SettingItem 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border}
          as="button"
          onClick={() => {}}
          role="button"
        >
          <SettingIcon>
            <FaFileAlt color="#5F6368" />
          </SettingIcon>
          <SettingContent>
            <SettingLabel color={COLORS.text}>Terms of Service</SettingLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Read our terms of service
            </SettingDescription>
          </SettingContent>
          <ChevronButton>
            <ChevronRight color={COLORS.textSecondary} />
          </ChevronButton>
        </SettingItem>
      </SettingsGroup>
      
      <SettingsGroup>
        <DangerItem 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border} 
          onClick={handleClearData}
        >
          <SettingIcon>
            <FaTrash color="#EA4335" />
          </SettingIcon>
          <SettingContent>
            <DangerLabel>Clear All Data</DangerLabel>
            <SettingDescription color={COLORS.textSecondary}>
              Delete all app data and history
            </SettingDescription>
          </SettingContent>
        </DangerItem>
      </SettingsGroup>
      
      <VersionInfo color={COLORS.textSecondary}>
        Version 1.0.0
      </VersionInfo>
      
      {showConfirmLogout && (
        <ModalOverlay>
          <ModalContent backgroundColor={COLORS.card} borderColor={COLORS.border}>
            <ModalTitle color={COLORS.text}>Confirm Logout</ModalTitle>
            <ModalText color={COLORS.textSecondary}>
              Are you sure you want to log out of your account?
            </ModalText>
            <ModalButtons>
              <ModalButton 
                backgroundColor="transparent"
                color={COLORS.text}
                borderColor={COLORS.border}
                onClick={handleCancelLogout}
              >
                Cancel
              </ModalButton>
              <ModalButton 
                backgroundColor={COLORS.error}
                color="white"
                onClick={handleLogout}
              >
                Logout
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${props => props.backgroundColor};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.color};
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const SettingsGroup = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const GroupTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  margin-bottom: 12px;
  transition: background-color 0.2s;
  
  ${props => props.as === 'button' && `
    cursor: pointer;
    width: 100%;
    text-align: left;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
    
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `}
  
  @media (max-width: 768px) {
    padding: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const SettingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    margin-right: 12px;
    width: 36px;
    height: 36px;
  }
`;

const SettingContent = styled.div`
  flex: 1;
  min-width: 0; /* Prevents text overflow in flex items */
`;

const SettingLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.color};
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const SettingDescription = styled.div`
  font-size: 0.85rem;
  color: ${props => props.color};
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Toggle = styled.button`
  width: 52px;
  height: 32px;
  background-color: ${props => props.isActive ? props.activeColor : '#E0E0E0'};
  border-radius: 16px;
  border: none;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
  min-width: 52px;
  min-height: 32px;
  padding: 0;
  
  &:active {
    opacity: 0.9;
  }
`;

const ToggleThumb = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 12px;
  position: absolute;
  top: 4px;
  left: ${props => props.isActive ? 'calc(100% - 28px)' : '4px'};
  transition: left 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const LanguageSelector = styled.select`
  padding: 8px 12px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: 1px solid ${props => props.borderColor};
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 44px;
  min-width: 120px;
  flex-shrink: 0;
  
  &:focus {
    outline: none;
    border-color: ${props => props.color};
  }
  
  @media (max-width: 768px) {
    min-width: 100px;
  }
  
  @media (max-width: 480px) {
    min-width: 90px;
    padding: 8px;
    font-size: 0.85rem;
  }
`;

const ChevronButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

const ChevronRight = styled.div`
  width: 8px;
  height: 8px;
  border-top: 2px solid ${props => props.color};
  border-right: 2px solid ${props => props.color};
  transform: rotate(45deg);
`;

const DangerItem = styled(SettingItem)`
  cursor: pointer;
  
  &:hover {
    background-color: rgba(234, 67, 53, 0.05);
  }
  
  &:active {
    background-color: rgba(234, 67, 53, 0.1);
  }
`;

const DangerLabel = styled(SettingLabel)`
  color: #EA4335;
`;

const VersionInfo = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 16px;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ModalText = styled.p`
  font-size: 1rem;
  color: ${props => props.color};
  margin-bottom: 24px;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 20px;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const ModalButton = styled.button`
  padding: 10px 16px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: ${props => props.borderColor ? `1px solid ${props.borderColor}` : 'none'};
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  min-height: 44px;
  min-width: 80px;
  transition: opacity 0.2s, transform 0.1s;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }
  
  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
`;

export default SettingsScreen;
