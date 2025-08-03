// HomeScreen.js - LOGIC ONLY (NO STYLING)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaCamera, FaClosedCaptioning, FaCog, FaInfoCircle, FaCheck, FaRocket, FaUpload } from 'react-icons/fa';

// Import all styled components from separate styles file
import {
  ModernContainer,
  HeroSection,
  LogoContainer,
  ModernLogo,
  MainTitle,
  HeroSubtitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIconContainer,
  FeatureTitle,
  FeatureDescription,
  InfoSection,
  InfoCard,
  InfoHeader,
  InfoIcon,
  InfoTitle,
  InfoList,
  InfoItem,
  CheckIcon,
  CallToAction,
  CTAText
} from './HomeScreenStyles';

/**
 * Home Screen Component - Main landing page
 * Displays app overview and navigation to key features
 */
const HomeScreen = () => {
  // ========================
  // HOOKS & STATE
  // ========================
  const { theme: COLORS } = useTheme();
  const navigate = useNavigate();

  // ========================
  // SAFETY CHECKS
  // ========================
  
  // Ensure theme is loaded before rendering
  if (!COLORS) {
    return <div>Loading theme...</div>;
  }

  // ========================
  // NAVIGATION HANDLERS
  // ========================
  
  /**
   * Navigate to camera/sign recognition page
   */
  const handleGoToCamera = () => {
    navigate('/camera');
  };

  /**
   * Navigate to word-to-animation learning page
   */
  const handleGoToWordToAnimation = () => {
    navigate('/word-to-animation');
  };
  
  /**
   * Navigate to video upload contribution page
   */
  const handleGoToVideoUpload = () => {
    navigate('/video-upload');
  };
  
  /**
   * Navigate to settings configuration page
   */
  const handleGoToSettings = () => {
    navigate('/settings');
  };

  // ========================
  // FEATURE CARD DATA
  // ========================
  
  const features = [
    {
      id: 'camera',
      title: 'Sign to Word',
      description: 'Use your camera to translate sign language gestures in real-time with advanced AI recognition',
      icon: FaCamera,
      handler: handleGoToCamera,
      isPrimary: true,
      delay: '0.2s'
    },
    {
      id: 'upload',
      title: 'Upload Video',
      description: 'Upload sign language videos to contribute to our training dataset and help improve recognition',
      icon: FaUpload,
      handler: handleGoToVideoUpload,
      isPrimary: false,
      delay: '0.3s'
    },
    {
      id: 'animation',
      title: 'Word to Animation',
      description: 'View beautiful sign language animations for words and sentences to learn and practice',
      icon: FaClosedCaptioning,
      handler: handleGoToWordToAnimation,
      isPrimary: false,
      delay: '0.4s'
    }
  ];

  // ========================
  // GETTING STARTED STEPS
  // ========================
  
  const gettingStartedSteps = [
    'Position your hands clearly in front of the camera with good lighting',
    'Make sign language gestures at a moderate, natural pace',
    'Watch real-time translations appear as you sign',
    'Explore word-to-animation feature to learn new signs'
  ];

  // ========================
  // RENDER COMPONENT
  // ========================
  
  return (
    <ModernContainer COLORS={COLORS}>      
      {/* Hero Section - App branding and introduction */}
      <HeroSection>
        <LogoContainer>
          <ModernLogo>SL</ModernLogo>
        </LogoContainer>
        
        <MainTitle>HandTalker</MainTitle>
        <HeroSubtitle>
          Translate sign language and text, both ways
        </HeroSubtitle>
      </HeroSection>      

      {/* Features Grid - Main app functionality cards */}
      <FeaturesGrid>
        {features.map((feature) => {
          const IconComponent = feature.icon;
          
          return (
            <FeatureCard 
              key={feature.id}
              primary={feature.isPrimary}
              COLORS={COLORS}
              onClick={feature.handler}
              delay={feature.delay}
            >
              <FeatureIconContainer COLORS={COLORS}>
                <IconComponent />
              </FeatureIconContainer>
              <FeatureTitle COLORS={COLORS}>
                {feature.title}
              </FeatureTitle>
              <FeatureDescription COLORS={COLORS}>
                {feature.description}
              </FeatureDescription>
            </FeatureCard>
          );
        })}
      </FeaturesGrid>
      
      {/* Info Section - Getting started guide */}
      <InfoSection>
        <InfoCard COLORS={COLORS}>
          <InfoHeader>
            <InfoIcon COLORS={COLORS}>
              <FaRocket />
            </InfoIcon>
            <InfoTitle COLORS={COLORS}>
              Getting Started is Easy
            </InfoTitle>
          </InfoHeader>
          
          <InfoList>
            {gettingStartedSteps.map((step, index) => (
              <InfoItem key={index} COLORS={COLORS}>
                <CheckIcon COLORS={COLORS}>
                  <FaCheck />
                </CheckIcon>
                {step}
              </InfoItem>
            ))}
          </InfoList>
          
          {/* Call to Action - Community message */}
          <CallToAction>
            <CTAText COLORS={COLORS}>
              Made with care for the deaf and hard-of-hearing community
            </CTAText>
          </CallToAction>
        </InfoCard>
      </InfoSection>
    </ModernContainer>
  );
};

export default HomeScreen;