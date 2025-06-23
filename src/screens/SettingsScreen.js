// SettingsScreen.js
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun, FaSignOutAlt, FaFileAlt, FaBrain } from 'react-icons/fa';
import { auth } from '../firebaseConfig';
import {
  ModernContainer,
  HeaderSection,
  ModernTitle,
  TitleIcon,
  Subtitle,
  SettingsContainer,
  ModernSettingsGroup,
  GroupHeader,
  GroupTitle,
  GroupDescription,
  SettingsCard,
  ModernSettingItem,
  SettingIconContainer,
  SettingContent,
  SettingLabel,
  SettingDescription,
  ModernToggle,
  ToggleThumb,
  SliderContainer,
  ModernSlider,
  SliderValue,
  ChevronContainer,
  ChevronIcon,
  VersionBadge,
  ModernModal,
  ModalCard,
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalMessage,
  ModalActions,
  ModalButton
} from './SettingsStyles';

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme, threshold, updateThreshold } = useTheme();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  
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

  const handleThresholdChange = (e) => {
    const value = parseFloat(e.target.value);
    updateThreshold(value);
  };

  return (
    <ModernContainer theme={theme}>
      <HeaderSection>
        <ModernTitle theme={theme}>
          <TitleIcon>
            {/* Settings icon */}
            <span aria-hidden="true">⚙️</span>
          </TitleIcon>
          Settings
        </ModernTitle>
        <Subtitle theme={theme}>Customize your sign language recognition experience</Subtitle>
      </HeaderSection>

      <SettingsContainer>
        <ModernSettingsGroup delay="0.1s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              <span aria-hidden="true"></span> Appearance
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

        <ModernSettingsGroup delay="0.15s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              <span aria-hidden="true"></span> Recognition Settings
            </GroupTitle>
            <GroupDescription theme={theme}>
              Adjust the accuracy threshold for sign language recognition
            </GroupDescription>
          </GroupHeader>
          
          <SettingsCard theme={theme}>
            <ModernSettingItem theme={theme}>
              <SettingIconContainer background="#8B5CF6" theme={theme}>
                <FaBrain color="white" />
              </SettingIconContainer>
              <SettingContent>
                <SettingLabel theme={theme}>Recognition Threshold</SettingLabel>
                <SettingDescription theme={theme}>
                  Higher values = more accuracy required ({Math.round(threshold * 100)}%)
                </SettingDescription>
              </SettingContent>
              <SliderContainer>
                <ModernSlider
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={threshold}
                  onChange={handleThresholdChange}
                  aria-label="Recognition threshold"
                />
                <SliderValue>{Math.round(threshold * 100)}%</SliderValue>
              </SliderContainer>
            </ModernSettingItem>
          </SettingsCard>
        </ModernSettingsGroup>
        
        <ModernSettingsGroup delay="0.2s">
          <GroupHeader>
            <GroupTitle theme={theme}>
              <span aria-hidden="true"></span> Account
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
              <span aria-hidden="true"></span> Legal
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
          <span aria-hidden="true"></span> Version 1.0.0 • Built with modern React
        </VersionBadge>
      </SettingsContainer>
      
      {showConfirmLogout && (
        <ModernModal>
          <ModalCard theme={theme}>
            <ModalHeader>
              <ModalIcon>
                {/* Wave hand icon */}
                <span aria-hidden="true">👋</span>
              </ModalIcon>
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