import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun, FaSignOutAlt, FaBell, FaCog, FaLock, FaQuestion, FaFileAlt, FaTrash, FaGlobe, FaLanguage } from 'react-icons/fa';
import { auth } from '../firebaseConfig';

// פונקציה לקבלת צבע בטוח מה-theme
const safeColor = (theme, path, fallback) => {
  const keys = path.split('.');
  let value = theme;
  for (const key of keys) {
    if (!value || typeof value !== 'object') return fallback;
    value = value[key];
  }
  return value || fallback;
};

// Modern animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px #007bff40; }
  50% { box-shadow: 0 0 30px #007bff60; }
`;

// Modern styled components
const ModernContainer = styled.div`
  min-height: 100vh;
  background: ${props => safeColor(props.theme, 'colors.background.gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')};
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  padding: 2rem;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ModernTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: ${props => safeColor(props.theme, 'colors.text.gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TitleIcon = styled.span`
  font-size: 2.5rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ModernSettingsGroup = styled.div`
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
`;

const GroupHeader = styled.div`
  margin-bottom: 1rem;
`;

const GroupTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GroupDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  margin: 0;
`;

const SettingsCard = styled.div`
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${props => safeColor(props.theme, 'shadows.glass', '0 8px 32px rgba(31, 38, 135, 0.37)')};
`;

const ModernSettingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  border-bottom: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};

  &:last-child {
    border-bottom: none;
  }

  ${props => props.clickable && css`
    &:hover {
      background: ${safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')}20;
      transform: translateX(4px);
    }

    &:active {
      transform: translateX(2px);
    }
  `}

  ${props => props.danger && css`
    &:hover {
      background: ${safeColor(props.theme, 'colors.accent.main', '#dc3545')}10;
    }
  `}

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`;

const SettingIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.background || safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')}40;
  margin-right: 1rem;
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
    color: ${props => props.iconColor || safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    margin-right: 0.875rem;
  }
`;

const SettingContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SettingLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.color || safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const SettingDescription = styled.div`
  font-size: 0.875rem;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ModernToggle = styled.button`
  width: 56px;
  height: 32px;
  background: ${props => props.isActive 
    ? safeColor(props.theme, 'colors.primary.gradient', 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)')
    : safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')};
  border-radius: 16px;
  border: none;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  box-shadow: ${props => props.isActive 
    ? safeColor(props.theme, 'shadows.primary', '0 4px 6px rgba(0, 123, 255, 0.3)')
    : safeColor(props.theme, 'shadows.soft', '0 4px 6px rgba(0, 0, 0, 0.1)')};
  
  &:hover {
    transform: scale(1.05);
    ${props => props.isActive && css`animation: ${glow} 2s infinite;`}
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ToggleThumb = styled.div`
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 14px;
  position: absolute;
  top: 2px;
  left: ${props => props.isActive ? 'calc(100% - 30px)' : '2px'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ModernSelect = styled.select`
  padding: 0.75rem 1rem;
  background: ${props => safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')};
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.light', 'rgba(255, 255, 255, 0.1)')};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${props => safeColor(props.theme, 'colors.primary.main', '#007bff')};
    box-shadow: 0 0 0 3px ${props => safeColor(props.theme, 'colors.primary.main', '#007bff')}20;
  }

  &:hover {
    border-color: ${props => safeColor(props.theme, 'colors.primary.main', '#007bff')}60;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.625rem 0.875rem;
    padding-right: 2.25rem;
  }
`;

const ChevronContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')}40;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')}60;
  }
`;

const ChevronIcon = styled.div`
  width: 8px;
  height: 8px;
  border-top: 2px solid ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  border-right: 2px solid ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  transform: rotate(45deg);
  transition: transform 0.3s ease;
`;

const VersionBadge = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};
  border-radius: 12px;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: ${props => safeColor(props.theme, 'shadows.glass', '0 8px 32px rgba(31, 38, 135, 0.37)')};
`;

const ModernModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  ${css`animation: ${fadeIn} 0.3s ease-out;`}
`;

const ModalCard = styled.div`
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: ${props => safeColor(props.theme, 'shadows.glass', '0 8px 32px rgba(31, 38, 135, 0.37)')};
  ${css`animation: ${slideIn} 0.4s ease-out;`}
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ModalIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  ${css`animation: ${pulse} 2s infinite;`}
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  margin: 0 0 0.5rem 0;
`;

const ModalMessage = styled.p`
  font-size: 1rem;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  margin: 0;
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  min-width: 100px;

  ${props => props.variant === 'primary' ? css`
    background: ${safeColor(props.theme, 'colors.primary.gradient', 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)')};
    color: white;
    box-shadow: ${safeColor(props.theme, 'shadows.primary', '0 4px 6px rgba(0, 123, 255, 0.3)')};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${safeColor(props.theme, 'shadows.hover', '0 8px 15px rgba(0, 0, 0, 0.2)')};
    }
  ` : css`
    background: ${safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')};
    color: ${safeColor(props.theme, 'colors.text.primary', '#ffffff')};
    border: 1px solid ${safeColor(props.theme, 'colors.border.light', 'rgba(255, 255, 255, 0.1)')};

    &:hover {
      background: ${safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')}80;
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'danger' && css`
    background: ${safeColor(props.theme, 'colors.accent.gradient', 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)')};
    color: white;
    box-shadow: ${safeColor(props.theme, 'shadows.accent', '0 4px 6px rgba(220, 53, 69, 0.3)')};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${safeColor(props.theme, 'shadows.hover', '0 8px 15px rgba(0, 0, 0, 0.2)')};
    }
  `}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
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
    <ModernContainer theme={theme}>
      <HeaderSection>
        <ModernTitle theme={theme}>
          <TitleIcon>⚙️</TitleIcon>
          Settings
        </ModernTitle>
        <Subtitle theme={theme}>Customize your sign language recognition experience</Subtitle>
      </HeaderSection>

      <SettingsContainer>
        <ModernSettingsGroup delay="0.1s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              🎨 Appearance
            </GroupTitle>
            <GroupDescription theme={theme}>
              Customize the look and feel of your application
            </GroupDescription>
          </GroupHeader>
          
          <SettingsCard theme={theme}>
            <ModernSettingItem theme={theme}>
              <SettingIconContainer background={isDarkMode ? '#FBBC04' : '#5F6368'} theme={theme}>
                {isDarkMode ? <FaSun color="white" /> : <FaMoon color="white" />}
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Dark Mode</SettingLabel>
                <SettingDescription theme={theme}>
                  {isDarkMode ? 'Currently using dark theme' : 'Currently using light theme'}
                </SettingDescription>
              </SettingContent>
              <ModernToggle 
                theme={theme}
                isActive={isDarkMode}
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <ToggleThumb isActive={isDarkMode} />
              </ModernToggle>
            </ModernSettingItem>
            
            <ModernSettingItem theme={theme}>
              <SettingIconContainer 
                background={notificationsEnabled ? safeColor(theme, 'colors.primary.main', '#007bff') : '#5F6368'} 
                theme={theme}
              >
                <FaBell color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Notifications</SettingLabel>
                <SettingDescription theme={theme}>
                  Receive alerts about new features and updates
                </SettingDescription>
              </SettingContent>
              <ModernToggle 
                theme={theme}
                isActive={notificationsEnabled}
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                aria-label={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
              >
                <ToggleThumb isActive={notificationsEnabled} />
              </ModernToggle>
            </ModernSettingItem>
            
            <ModernSettingItem theme={theme}>
              <SettingIconContainer background={safeColor(theme, 'colors.secondary.main', '#28a745')} theme={theme}>
                <FaLanguage color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Language</SettingLabel>
                <SettingDescription theme={theme}>
                  Choose your preferred language
                </SettingDescription>
              </SettingContent>
              <ModernSelect 
                theme={theme}
                value={languagePreference} 
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </ModernSelect>
            </ModernSettingItem>
          </SettingsCard>
        </ModernSettingsGroup>
        
        <ModernSettingsGroup delay="0.2s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              📷 Camera Settings
            </GroupTitle>
            <GroupDescription theme={theme}>
              Configure camera and recognition preferences
            </GroupDescription>
          </GroupHeader>
          
          <SettingsCard theme={theme}>
            <ModernSettingItem theme={theme}>
              <SettingIconContainer 
                background={cameraAutostart ? safeColor(theme, 'colors.primary.main', '#007bff') : '#5F6368'} 
                theme={theme}
              >
                <FaCog color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Camera Auto-start</SettingLabel>
                <SettingDescription theme={theme}>
                  Automatically start camera when opening the app
                </SettingDescription>
              </SettingContent>
              <ModernToggle 
                theme={theme}
                isActive={cameraAutostart}
                onClick={() => setCameraAutostart(!cameraAutostart)}
                aria-label={cameraAutostart ? "Disable camera auto-start" : "Enable camera auto-start"}
              >
                <ToggleThumb isActive={cameraAutostart} />
              </ModernToggle>
            </ModernSettingItem>
          </SettingsCard>
        </ModernSettingsGroup>
        
        <ModernSettingsGroup delay="0.3s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              👤 Account
            </GroupTitle>
            <GroupDescription theme={theme}>
              Manage your account settings and security
            </GroupDescription>
          </GroupHeader>
          
          <SettingsCard theme={theme}>
            <ModernSettingItem theme={theme} clickable>
              <SettingIconContainer background="#5F6368" theme={theme}>
                <FaLock color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Change Password</SettingLabel>
                <SettingDescription theme={theme}>
                  Update your account password
                </SettingDescription>
              </SettingContent>
              <ChevronContainer theme={theme}>
                <ChevronIcon theme={theme} />
              </ChevronContainer>
            </ModernSettingItem>
            
            <ModernSettingItem theme={theme} clickable danger onClick={handleLogout}>
              <SettingIconContainer background="#EA4335" theme={theme}>
                <FaSignOutAlt color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel color="#EA4335" theme={theme}>Logout</SettingLabel>
                <SettingDescription theme={theme}>
                  Sign out of your account
                </SettingDescription>
              </SettingContent>
            </ModernSettingItem>
          </SettingsCard>
        </ModernSettingsGroup>
        
        <ModernSettingsGroup delay="0.4s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              ❓ About & Help
            </GroupTitle>
            <GroupDescription theme={theme}>
              Get help and learn more about the application
            </GroupDescription>
          </GroupHeader>
          
          <SettingsCard theme={theme}>
            <ModernSettingItem theme={theme} clickable>
              <SettingIconContainer background="#4285F4" theme={theme}>
                <FaQuestion color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Help & Support</SettingLabel>
                <SettingDescription theme={theme}>
                  Get help with using the app
                </SettingDescription>
              </SettingContent>
              <ChevronContainer theme={theme}>
                <ChevronIcon theme={theme} />
              </ChevronContainer>
            </ModernSettingItem>
            
            <ModernSettingItem theme={theme} clickable>
              <SettingIconContainer background="#34A853" theme={theme}>
                <FaFileAlt color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Privacy Policy</SettingLabel>
                <SettingDescription theme={theme}>
                  Read our privacy policy
                </SettingDescription>
              </SettingContent>
              <ChevronContainer theme={theme}>
                <ChevronIcon theme={theme} />
              </ChevronContainer>
            </ModernSettingItem>
            
            <ModernSettingItem theme={theme} clickable>
              <SettingIconContainer background="#FBBC04" theme={theme}>
                <FaFileAlt color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Terms of Service</SettingLabel>
                <SettingDescription theme={theme}>
                  Read our terms of service
                </SettingDescription>
              </SettingContent>
              <ChevronContainer theme={theme}>
                <ChevronIcon theme={theme} />
              </ChevronContainer>
            </ModernSettingItem>
          </SettingsCard>
        </ModernSettingsGroup>
        
        <ModernSettingsGroup delay="0.5s">
          <SettingsCard theme={theme}>
            <ModernSettingItem theme={theme} clickable danger onClick={handleClearData}>
              <SettingIconContainer background="#EA4335" theme={theme}>
                <FaTrash color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel color="#EA4335" theme={theme}>Clear All Data</SettingLabel>
                <SettingDescription theme={theme}>
                  Delete all app data and history
                </SettingDescription>
              </SettingContent>
            </ModernSettingItem>
          </SettingsCard>
        </ModernSettingsGroup>
        
        <VersionBadge theme={theme}>
          🚀 Version 1.0.0 • Built with modern React
        </VersionBadge>
      </SettingsContainer>
      
      {showConfirmLogout && (
        <ModernModal>
          <ModalCard theme={theme}>
            <ModalHeader>
              <ModalIcon>👋</ModalIcon>
              <ModalTitle theme={theme}>Confirm Logout</ModalTitle>
              <ModalMessage theme={theme}>
                Are you sure you want to log out of your account?
              </ModalMessage>
            </ModalHeader>
            <ModalActions>
              <ModalButton theme={theme} onClick={handleCancelLogout}>
                Cancel
              </ModalButton>
              <ModalButton theme={theme} variant="danger" onClick={handleLogout}>
                Logout
              </ModalButton>
            </ModalActions>
          </ModalCard>
        </ModernModal>
      )}
    </ModernContainer>
  );
};

export default SettingsScreen;