import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaCamera, FaSave, FaShareAlt, FaCopy, FaCheck, FaInfoCircle } from 'react-icons/fa';

// Define keyframes at the top level
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translate(-50%, 20px); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  85% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -20px); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideIn = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const progressFill = keyframes`
  0% { width: 0%; }
  100% { width: var(--target-width); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -20px, 0); }
  70% { transform: translate3d(0, -10px, 0); }
  90% { transform: translate3d(0, -4px, 0); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(75, 85, 255, 0.3),
                0 0 10px rgba(75, 85, 255, 0.2),
                0 0 15px rgba(75, 85, 255, 0.1);
  }
  50% { 
    box-shadow: 0 0 10px rgba(75, 85, 255, 0.4),
                0 0 20px rgba(75, 85, 255, 0.3),
                0 0 30px rgba(75, 85, 255, 0.2);
  }
`;

const ResultsScreen = () => {
  const { theme: COLORS } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // In a real app, this would come from the location state or context
  // For demo purposes, we'll use sample data
  const result = location.state?.result || {
    word: "Thank you",
    confidence: 0.89,
    date: new Date().toISOString(),
  };

  const handleReturnToCamera = () => {
    navigate('/camera');
  };


  const handleSaveResult = () => {
    // Implementation for saving results would go here
    alert('Result saved!');
  };

  const handleShareResult = () => {
    // Implementation for sharing results would go here
    if (navigator.share) {
      navigator.share({
        title: 'Sign Language Recognition Result',
        text: `I translated the sign: ${result.word} (${(result.confidence * 100).toFixed(0)}% confidence)`,
        url: window.location.href,
      })
      .then(() => {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyToClipboard();
    }
  };
  
  const handleCopyToClipboard = () => {
    const textToCopy = `Sign Language Translation: "${result.word}" (${(result.confidence * 100).toFixed(0)}% confidence)`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard');
      });
  };
  return (
    <Container>
      <Title>Translation Result</Title>
      
      <ResultCard>
        <ResultWord>{result.word}</ResultWord>
        
        <ConfidenceContainer>
          <ConfidenceBar>
            <ConfidenceFill 
              width={`${result.confidence * 100}%`}
              confidenceLevel={getConfidenceLevel(result.confidence)}
            />
          </ConfidenceBar>
          <ConfidenceText>
            Confidence: {(result.confidence * 100).toFixed(0)}%
          </ConfidenceText>
        </ConfidenceContainer>

        <Timestamp>
          {new Date(result.date).toLocaleString()}
        </Timestamp>
        
        {isMobile && (
          <ResultActions>
            <ActionIconButton
              onClick={handleCopyToClipboard}
              aria-label="Copy to clipboard"
              type="copy"
            >
              {copySuccess ? <FaCheck size={16} /> : <FaCopy size={16} />}
            </ActionIconButton>
            
            <ActionIconButton
              onClick={handleShareResult}
              aria-label="Share result"
              type="share"
            >
              {shareSuccess ? <FaCheck size={16} /> : <FaShareAlt size={16} />}
            </ActionIconButton>
          </ResultActions>
        )}
      </ResultCard>
      
      <ActionsContainer>
        <ActionButton 
          onClick={handleReturnToCamera}
          aria-label="Return to camera"
          type="primary"
        >
          <FaCamera size={isMobile ? 16 : 18} style={{ marginRight: isMobile ? '6px' : '8px' }} />
          <ButtonText>New Translation</ButtonText>
        </ActionButton>
        
        <ActionButton 
          onClick={handleSaveResult}
          aria-label="Save result"
          type="secondary"
        >
          <FaSave size={isMobile ? 16 : 18} style={{ marginRight: isMobile ? '6px' : '8px' }} />
          <ButtonText>Save</ButtonText>
        </ActionButton>
      </ActionsContainer>
      
      <SecondaryActionsContainer>
        <SecondaryButton 
          onClick={!isMobile ? handleShareResult : undefined}
          aria-label="Share result"
          disabled={isMobile}
        >
          <FaShareAlt size={isMobile ? 16 : 18} style={{ marginRight: isMobile ? '6px' : '8px' }} />
          <ButtonText>Share</ButtonText>
        </SecondaryButton>
      </SecondaryActionsContainer>
      
      <InfoContainer>
        <InfoTitle>
          <FaInfoCircle size={18} style={{ marginRight: '8px', color: '#4B55FF' }} />
          About This Translation
        </InfoTitle>
        <InfoText>
          This result was generated by our AI model based on the sign language gesture detected.
          Higher confidence indicates a more reliable translation.
        </InfoText>
      </InfoContainer>
      
      {(copySuccess || shareSuccess) && (
        <SuccessToast>
          <FaCheck size={16} style={{ marginRight: '8px', color: 'white' }} />
          <span>{copySuccess ? 'Copied to clipboard!' : 'Shared successfully!'}</span>
        </SuccessToast>
      )}
    </Container>
  );
};

// Helper function to get color based on confidence
const getConfidenceColor = (confidence) => {
  if (confidence >= 0.8) return '#34A853'; // Green for high confidence
  if (confidence >= 0.5) return '#FBBC04'; // Yellow for medium confidence
  return '#EA4335'; // Red for low confidence
};

// Helper function to get confidence level for styling
const getConfidenceLevel = (confidence) => {
  if (confidence >= 0.8) return 'high';
  if (confidence >= 0.5) return 'medium';
  return 'low';
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(75, 85, 255, 0.1) 0%,
    rgba(255, 107, 107, 0.1) 25%,
    rgba(78, 205, 196, 0.1) 50%,
    rgba(255, 195, 113, 0.1) 75%,
    rgba(199, 125, 255, 0.1) 100%);  background-size: 400% 400%;
  ${css`animation: ${float} 20s ease-in-out infinite;`}
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><circle cx="30" cy="30" r="1"/></g></svg>');
    pointer-events: none;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4B55FF 0%, #FF6B6B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;  text-align: center;
  ${css`animation: ${slideIn} 0.6s ease-out;`}
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #4B55FF 0%, #FF6B6B 100%);    border-radius: 2px;
    ${css`animation: ${shimmer} 2s infinite;`}
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 14px;
  }
`;

const ResultCard = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);  margin-bottom: 24px;
  position: relative;
  ${css`animation: ${slideIn} 0.8s ease-out 0.2s both;`}
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%);
    border-radius: 24px;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 48px rgba(0, 0, 0, 0.15),
      0 8px 24px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin-bottom: 16px;
    border-radius: 16px;
  }
`;

const ResultWord = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2D3748 0%, #4A5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;  text-align: center;
  ${css`animation: ${bounce} 1s ease-out 0.5s both;`}
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 16px;
  }
`;

const ResultActions = styled.div`
  display: flex;
  gap: 12px;
  position: absolute;
  top: 16px;
  right: 16px;
  
  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
    gap: 8px;
  }
`;

const ActionIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => 
    props.type === 'copy' 
      ? 'linear-gradient(135deg, #4B55FF 0%, #6B73FF 100%)'
      : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
  };
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  ${css`animation: ${float} 3s ease-in-out infinite;`}
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    ${css`animation: ${glow} 1.5s ease-in-out infinite;`}
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const ConfidenceContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  ${css`animation: ${slideIn} 1s ease-out 0.7s both;`}
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const ConfidenceBar = styled.div`
  width: 100%;
  height: 12px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    height: 10px;
    border-radius: 5px;
  }
`;

const ConfidenceFill = styled.div`
  width: ${props => props.width};
  height: 100%;
  border-radius: 6px;
  transition: width 1s ease;
  position: relative;  overflow: hidden;
  --target-width: ${props => props.width};
  ${css`animation: ${progressFill} 1.5s ease-out 0.8s both;`}
  
  background: ${props => {
    switch(props.confidenceLevel) {
      case 'high':
        return 'linear-gradient(90deg, #10B981 0%, #34D399 100%)';
      case 'medium':
        return 'linear-gradient(90deg, #F59E0B 0%, #FCD34D 100%)';
      case 'low':
        return 'linear-gradient(90deg, #EF4444 0%, #F87171 100%)';
      default:
        return 'linear-gradient(90deg, #6B7280 0%, #9CA3AF 100%)';
    }
  }};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.4) 50%,      transparent 100%);
    ${css`animation: ${shimmer} 2s infinite 1s;`}
  }
`;

const ConfidenceText = styled.p`
  font-size: 0.9rem;
  color: rgba(45, 55, 72, 0.8);
  text-align: right;
  margin: 0;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Timestamp = styled.p`
  font-size: 0.9rem;
  color: rgba(45, 55, 72, 0.6);
  margin: 0;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;  max-width: 500px;
  margin-bottom: 16px;
  ${css`animation: ${slideIn} 1s ease-out 0.4s both;`}
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${props => 
    props.type === 'primary'
      ? 'linear-gradient(135deg, #4B55FF 0%, #6B73FF 100%)'
      : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
  };
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      transparent 100%);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 15px;
  }
`;

const SecondaryActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;  max-width: 500px;
  margin-bottom: 24px;
  ${css`animation: ${slideIn} 1s ease-out 0.6s both;`}
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(75, 85, 255, 0.3);
  color: #4B55FF;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  font-size: 16px;
  font-weight: 600;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(75, 85, 255, 0.1) 50%, 
      transparent 100%);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    background: rgba(75, 85, 255, 0.1);
    border-color: rgba(75, 85, 255, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(75, 85, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 15px;
  }
`;

const ButtonText = styled.span`
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);  border-radius: 16px;
  margin-bottom: 16px;
  ${css`animation: ${slideIn} 1s ease-out 0.8s both;`}
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 14px;
    border-radius: 12px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2D3748;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: rgba(45, 55, 72, 0.7);
  margin: 0;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const SuccessToast = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  z-index: 1000;
  ${css`animation: ${fadeInOut} 2s ease;`}
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
  
  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    max-width: 90%;
  }
`;

export default ResultsScreen;
