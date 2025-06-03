import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaCamera, FaClosedCaptioning, FaCog, FaInfoCircle, FaCheck } from 'react-icons/fa';

const HomeScreen = () => {
  const { theme: COLORS } = useTheme();
  const navigate = useNavigate();

  const handleGoToCamera = () => {
    navigate('/camera');
  };
  
  const handleGoToWordToAnimation = () => {
    navigate('/word-to-animation');
  };
  
  const handleGoToSettings = () => {
    navigate('/settings');
  };

  return (
    <Container backgroundColor={COLORS.background}>
      <LogoContainer>
        <Logo src="/logo.png" alt="Sign Language Recognition" />
      </LogoContainer>
      
      <Title color={COLORS.text}>Sign Language Recognition</Title>
      <Subtitle color={COLORS.textSecondary}>
        Translate sign language gestures in real-time
      </Subtitle>

      <ActionsContainer>
        <ActionCard 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border}
          onClick={handleGoToCamera}
          primary
        >
          <ActionIconContainer backgroundColor={COLORS.primary}>
            <FaCamera size={24} color="white" />
          </ActionIconContainer>
          <ActionContent>
            <ActionTitle color={COLORS.text}>Start Translation</ActionTitle>
            <ActionDescription color={COLORS.textSecondary}>
              Use your camera to translate sign language
            </ActionDescription>
          </ActionContent>
        </ActionCard>
        
        <ActionCard 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border}
          onClick={handleGoToWordToAnimation}
        >
          <ActionIconContainer backgroundColor={COLORS.secondary}>
            <FaClosedCaptioning size={24} color="white" />
          </ActionIconContainer>
          <ActionContent>
            <ActionTitle color={COLORS.text}>Word to Animation</ActionTitle>
            <ActionDescription color={COLORS.textSecondary}>
              View sign language animations for words and sentences
            </ActionDescription>
          </ActionContent>
        </ActionCard>
        
        <ActionCard 
          backgroundColor={COLORS.card} 
          borderColor={COLORS.border}
          onClick={handleGoToSettings}
        >
          <ActionIconContainer backgroundColor={COLORS.tertiary}>
            <FaCog size={24} color="white" />
          </ActionIconContainer>
          <ActionContent>
            <ActionTitle color={COLORS.text}>Settings</ActionTitle>
            <ActionDescription color={COLORS.textSecondary}>
              Customize your experience
            </ActionDescription>
          </ActionContent>
        </ActionCard>
      </ActionsContainer>
      
      <InfoContainer backgroundColor={COLORS.card} borderColor={COLORS.border}>
        <InfoHeader>
          <FaInfoCircle size={16} color={COLORS.primary} />
          <InfoTitle color={COLORS.text}>How It Works</InfoTitle>
        </InfoHeader>
        <InfoList>
          <InfoItem color={COLORS.textSecondary}>
            <FaCheck size={12} color={COLORS.success} style={{ marginRight: '8px' }} />
            Position your hands clearly in front of the camera
          </InfoItem>
          <InfoItem color={COLORS.textSecondary}>
            <FaCheck size={12} color={COLORS.success} style={{ marginRight: '8px' }} />
            Make sign language gestures at a moderate pace
          </InfoItem>
          <InfoItem color={COLORS.textSecondary}>
            <FaCheck size={12} color={COLORS.success} style={{ marginRight: '8px' }} />
            Ensure good lighting for better recognition
          </InfoItem>
          <InfoItem color={COLORS.textSecondary}>
            <FaCheck size={12} color={COLORS.success} style={{ marginRight: '8px' }} />
            Type words or sentences to see sign language animations
          </InfoItem>
        </InfoList>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  min-height: 100%;
  background-color: ${props => props.backgroundColor};
  
  @media (max-width: 768px) {
    padding: 24px 16px;
    justify-content: flex-start;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${props => props.color};
  text-align: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color};
  text-align: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 24px;
  }
`;

const ActionCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  ${props => props.primary && `
    border-left: 4px solid ${props.theme.primary};
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ActionIconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 12px;
  }
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ActionDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-left: 8px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default HomeScreen;