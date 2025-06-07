import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun, FaSignOutAlt, FaFileAlt } from 'react-icons/fa';
import { auth } from '../firebaseConfig';

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
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white; /* Changed to white for better contrast */
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
  color: white; /* Direct white color instead of gradient */
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Added text shadow for better readability */

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
  color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

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
  color: white; /* White text for better contrast */
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GroupDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  margin: 0;
`;

const SettingsCard = styled.div`
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent white background */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const ModernSettingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom: none;
  }

  ${props => props.clickable && css`
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    &:active {
      transform: translateX(2px);
    }
  `}

  ${props => props.danger && css`
    &:hover {
      background: rgba(220, 53, 69, 0.2);
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
  background: ${props => props.background || 'rgba(255, 255, 255, 0.2)'};
  margin-right: 1rem;
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
    color: white; /* Always white for better contrast */
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
  color: ${props => props.color || 'white'}; /* White text for better contrast */
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const SettingDescription = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ModernToggle = styled.button`
  width: 56px;
  height: 32px;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
    : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 16px;
  border: none;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  box-shadow: ${props => props.isActive 
    ? '0 4px 6px rgba(0, 123, 255, 0.3)'
    : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  
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

const ChevronContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChevronIcon = styled.div`
  width: 8px;
  height: 8px;
  border-top: 2px solid rgba(255, 255, 255, 0.9);
  border-right: 2px solid rgba(255, 255, 255, 0.9);
  transform: rotate(45deg);
  transition: transform 0.3s ease;
`;

const VersionBadge = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent white background */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent white background */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
  color: white; /* White text for better contrast */
  margin: 0 0 0.5rem 0;
`;

const ModalMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
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
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
  ` : css`
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'danger' && css`
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: white;
    box-shadow: 0 4px 6px rgba(220, 53, 69, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
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
          </SettingsCard>
        </ModernSettingsGroup>
        
        <ModernSettingsGroup delay="0.2s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              👤 Account
            </GroupTitle>
            <GroupDescription theme={theme}>
              Manage your account settings
            </GroupDescription>
          </GroupHeader>
          
          <SettingsCard theme={theme}>
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
        
        <ModernSettingsGroup delay="0.3s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              📋 Legal
            </GroupTitle>
            <GroupDescription theme={theme}>
              Learn more about policies and terms
            </GroupDescription>
          </GroupHeader>
          
          <SettingsCard theme={theme}>
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