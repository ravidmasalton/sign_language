import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaCamera, FaClosedCaptioning, FaCog, FaInfoCircle, FaCheck, FaRocket, FaUpload } from 'react-icons/fa';

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

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.8; transform: scale(1.1) rotate(180deg); }
`;

// Modern styled components - OPTIMIZED FOR MINIMAL DESIGN
const ModernContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.COLORS?.gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)'};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px; /* Reduced from 2rem */
  ${css`animation: ${fadeIn} 0.8s ease-out;`}

  @media (max-width: 768px) {
    padding: 8px; /* Reduced from 1rem */
    min-height: 100dvh;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 16px; /* Reduced from 3rem */
  ${css`animation: ${slideIn} 1s ease-out 0.2s both;`}

  @media (max-width: 768px) {
    margin-bottom: 12px; /* Reduced from 2rem */
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px; /* Reduced from 2rem */
  ${css`animation: ${float} 3s ease-in-out infinite;`}

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const ModernLogo = styled.div`
  width: 80px; /* Reduced from 120px */
  height: 80px; /* Reduced from 120px */
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px; /* Reduced from 30px */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem; /* Reduced from 3rem */
  color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Reduced shadow */
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
    ${css`animation: ${sparkle} 3s infinite;`}
  }

  @media (max-width: 768px) {
    width: 64px; /* Reduced from 100px */
    height: 64px; /* Reduced from 100px */
    border-radius: 16px; /* Reduced from 25px */
    font-size: 1.6rem; /* Reduced from 2.5rem */
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem; /* Reduced from 3rem */
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0; /* Reduced from 1rem */
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.6rem; /* Reduced from 2.2rem */
  }

  @media (max-width: 480px) {
    font-size: 1.4rem; /* Reduced from 1.8rem */
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem; /* Reduced from 1.25rem */
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px 0; /* Reduced from 2rem */
  max-width: 480px; /* Reduced from 600px */
  line-height: 1.4; /* Reduced from 1.6 */
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Reduced from 1.1rem */
    margin-bottom: 12px; /* Reduced from 1.5rem */
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); /* Reduced from 300px */
  gap: 1rem; /* Reduced from 1.5rem */
  width: 100%;
  max-width: 800px; /* Reduced from 1000px */
  margin-bottom: 20px; /* Reduced from 3rem */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px; /* Reduced from 1rem */
    margin-bottom: 16px; /* Reduced from 2rem */
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.98);

    &::before {
      transform: scaleX(1);
    }

    ${props => props.primary && css`
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3), 0 0 20px rgba(99, 102, 241, 0.2);
      background: rgba(255, 255, 255, 0.98);
    `}
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FeatureIconContainer = styled.div`
  width: 48px; /* Reduced from 64px */
  height: 48px; /* Reduced from 64px */
  border-radius: 12px; /* Reduced from 16px */
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px; /* Reduced from 1.5rem */
  transition: all 0.3s ease;

  svg {
    font-size: 1.4rem; /* Reduced from 1.75rem */
    color: white;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 40px; /* Reduced from 56px */
    height: 40px; /* Reduced from 56px */
    margin-bottom: 8px; /* Reduced from 1rem */
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem; /* Reduced from 1.5rem */
  font-weight: 600;
  margin: 0 0 8px 0; /* Reduced from 0.75rem */
  color: #1e293b;

  @media (max-width: 768px) {
    font-size: 1.1rem; /* Reduced from 1.25rem */
  }
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem; /* Reduced from 1rem */
  line-height: 1.4; /* Reduced from 1.6 */
  margin: 0;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 0.8rem; /* Reduced from 0.9rem */
  }
`;

const InfoSection = styled.div`
  width: 100%;
  max-width: 480px; /* Reduced from 600px */
  ${css`animation: ${slideIn} 1s ease-out 0.6s both;`}
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px; /* Reduced from 20px */
  padding: 16px; /* Reduced from 2rem */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* Reduced shadow */

  @media (max-width: 768px) {
    padding: 12px; /* Reduced from 1.5rem */
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px; /* Reduced from 1.5rem */
  gap: 8px; /* Reduced from 0.75rem */
`;

const InfoIcon = styled.div`
  width: 32px; /* Reduced from 40px */
  height: 32px; /* Reduced from 40px */
  border-radius: 8px; /* Reduced from 10px */
  background: linear-gradient(135deg, #f59e0b, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem; /* Reduced from 1.1rem */
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem; /* Reduced from 1.25rem */
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Reduced from 1rem */
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px; /* Reduced from 0.75rem */
  font-size: 0.9rem; /* Reduced from 1rem */
  color: #64748b;
  line-height: 1.4; /* Reduced from 1.5 */
`;

const CheckIcon = styled.div`
  width: 20px; /* Reduced from 24px */
  height: 20px; /* Reduced from 24px */
  border-radius: 4px; /* Reduced from 6px */
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem; /* Reduced from 0.75rem */
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const CallToAction = styled.div`
  text-align: center;
  margin-top: 16px; /* Reduced from 2rem */
  ${css`animation: ${slideIn} 1s ease-out 0.8s both;`}
`;

const CTAText = styled.p`
  font-size: 0.9rem; /* Reduced from 1.1rem */
  color: #64748b;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px; /* Reduced from 0.5rem */
`;

const HomeScreen = () => {
  const { theme: COLORS } = useTheme();
  const navigate = useNavigate();

  // Safety check for theme
  if (!COLORS) {
    return <div>Loading theme...</div>;
  }

  const handleGoToCamera = () => {
    navigate('/camera');
  };
    const handleGoToWordToAnimation = () => {
    navigate('/word-to-animation');
  };
  
  const handleGoToVideoUpload = () => {
    navigate('/video-upload');
  };
  
  const handleGoToSettings = () => {
    navigate('/settings');
  };
  
  return (
    <ModernContainer COLORS={COLORS}>      
        <HeroSection>
        <LogoContainer>
          <ModernLogo>SL</ModernLogo>
        </LogoContainer>
        
        <MainTitle>HandTalker</MainTitle>
        <HeroSubtitle>
          Translate sign language and text, both ways
        </HeroSubtitle>
      </HeroSection>      <FeaturesGrid>
        <FeatureCard 
          primary
          COLORS={COLORS}
          onClick={handleGoToCamera}
          delay="0.2s"
        >
          <FeatureIconContainer COLORS={COLORS}>
            <FaCamera />
          </FeatureIconContainer>
          <FeatureTitle COLORS={COLORS}>Sign to Word</FeatureTitle>
          <FeatureDescription COLORS={COLORS}>
            Use your camera to translate sign language gestures in real-time with advanced AI recognition
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard 
          COLORS={COLORS}
          onClick={handleGoToVideoUpload}
          delay="0.3s"
        >
          <FeatureIconContainer COLORS={COLORS}>
            <FaUpload />
          </FeatureIconContainer>
          <FeatureTitle COLORS={COLORS}>Upload Video</FeatureTitle>
          <FeatureDescription COLORS={COLORS}>
            Upload sign language videos to contribute to our training dataset and help improve recognition
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard 
          COLORS={COLORS}
          onClick={handleGoToWordToAnimation}
          delay="0.4s"
        >
          <FeatureIconContainer COLORS={COLORS}>
            <FaClosedCaptioning />
          </FeatureIconContainer>
          <FeatureTitle COLORS={COLORS}>Word to Animation</FeatureTitle>
          <FeatureDescription COLORS={COLORS}>
            View beautiful sign language animations for words and sentences to learn and practice
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
      
      <InfoSection>
        <InfoCard COLORS={COLORS}>
          <InfoHeader>
            <InfoIcon COLORS={COLORS}>
              <FaRocket />
            </InfoIcon>
            <InfoTitle COLORS={COLORS}>Getting Started is Easy</InfoTitle>
          </InfoHeader>
          
          <InfoList>
            <InfoItem COLORS={COLORS}>
              <CheckIcon COLORS={COLORS}>
                <FaCheck />
              </CheckIcon>
              Position your hands clearly in front of the camera with good lighting
            </InfoItem>
            <InfoItem COLORS={COLORS}>
              <CheckIcon COLORS={COLORS}>
                <FaCheck />
              </CheckIcon>
              Make sign language gestures at a moderate, natural pace
            </InfoItem>
            <InfoItem COLORS={COLORS}>
              <CheckIcon COLORS={COLORS}>
                <FaCheck />
              </CheckIcon>
              Watch real-time translations appear as you sign
            </InfoItem>
            <InfoItem COLORS={COLORS}>
              <CheckIcon COLORS={COLORS}>
                <FaCheck />
              </CheckIcon>
              Explore word-to-animation feature to learn new signs
            </InfoItem>
          </InfoList>
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