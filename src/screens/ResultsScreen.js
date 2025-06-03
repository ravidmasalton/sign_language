import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaCamera, FaSave, FaShareAlt, FaCopy, FaCheck } from 'react-icons/fa';

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
    <Container backgroundColor={COLORS.background}>
      <Title color={COLORS.text}>Translation Result</Title>
      
      <ResultCard backgroundColor={COLORS.card} borderColor={COLORS.border}>
        <ResultWord color={COLORS.text}>{result.word}</ResultWord>
        
        <ConfidenceContainer>
          <ConfidenceBar>
            <ConfidenceFill 
              width={`${result.confidence * 100}%`}
              backgroundColor={getConfidenceColor(result.confidence)}
            />
          </ConfidenceBar>
          <ConfidenceText color={COLORS.textSecondary}>
            Confidence: {(result.confidence * 100).toFixed(0)}%
          </ConfidenceText>
        </ConfidenceContainer>
        
        <Timestamp color={COLORS.textSecondary}>
          {new Date(result.date).toLocaleString()}
        </Timestamp>
        
        {isMobile && (
          <ResultActions>
            <ActionIconButton
              backgroundColor={COLORS.primary}
              onClick={handleCopyToClipboard}
              aria-label="Copy to clipboard"
            >
              {copySuccess ? <FaCheck size={16} /> : <FaCopy size={16} />}
            </ActionIconButton>
            
            <ActionIconButton
              backgroundColor={COLORS.accent}
              onClick={handleShareResult}
              aria-label="Share result"
            >
              {shareSuccess ? <FaCheck size={16} /> : <FaShareAlt size={16} />}
            </ActionIconButton>
          </ResultActions>
        )}
      </ResultCard>
      
      <ActionsContainer>
        <ActionButton 
          backgroundColor={COLORS.primary}
          onClick={handleReturnToCamera}
          aria-label="Return to camera"
        >
          <FaCamera size={isMobile ? 16 : 18} style={{ marginRight: isMobile ? '6px' : '8px' }} />
          <ButtonText>New Translation</ButtonText>
        </ActionButton>
        
        <ActionButton 
          backgroundColor={COLORS.accent}
          onClick={handleSaveResult}
          aria-label="Save result"
        >
          <FaSave size={isMobile ? 16 : 18} style={{ marginRight: isMobile ? '6px' : '8px' }} />
          <ButtonText>Save</ButtonText>
        </ActionButton>
      </ActionsContainer>
      
      <SecondaryActionsContainer>
        
        <SecondaryButton 
          color={COLORS.primary}
          borderColor={COLORS.primary}
          onClick={!isMobile ? handleShareResult : undefined}
          aria-label="Share result"
          disabled={isMobile}
        >
          <FaShareAlt size={isMobile ? 16 : 18} style={{ marginRight: isMobile ? '6px' : '8px' }} />
          <ButtonText>Share</ButtonText>
        </SecondaryButton>
      </SecondaryActionsContainer>
      
      <InfoContainer backgroundColor={COLORS.card} borderColor={COLORS.border}>
        <InfoTitle color={COLORS.text}>About This Translation</InfoTitle>
        <InfoText color={COLORS.textSecondary}>
          This result was generated by our AI model based on the sign language gesture detected.
          Higher confidence indicates a more reliable translation.
        </InfoText>
      </InfoContainer>
      
      {(copySuccess || shareSuccess) && (
        <SuccessToast backgroundColor={COLORS.success}>
          <FaCheck size={16} color="white" style={{ marginRight: '8px' }} />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: ${props => props.backgroundColor};
  max-width: 600px;
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
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.color};
  margin-bottom: 24px;
  text-align: center;
  
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
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin-bottom: 16px;
  }
`;

const ResultWord = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.color};
  margin-bottom: 24px;
  text-align: center;
  
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
  background-color: ${props => props.backgroundColor};
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  
  &:active {
    transform: scale(0.95);
    opacity: 0.9;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const ConfidenceContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  
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
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
  
  @media (max-width: 480px) {
    height: 10px;
    border-radius: 5px;
  }
`;

const ConfidenceFill = styled.div`
  width: ${props => props.width};
  height: 100%;
  background-color: ${props => props.backgroundColor};
  border-radius: 6px;
  transition: width 0.5s ease;
`;

const ConfidenceText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  text-align: right;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Timestamp = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 16px;
  
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
  background-color: ${props => props.backgroundColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  min-height: 44px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
    transform: scale(0.98);
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
  width: 100%;
  max-width: 500px;
  margin-bottom: 24px;
  
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
  background-color: transparent;
  border: 1px solid ${props => props.borderColor};
  color: ${props => props.color};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  min-height: 44px;
  font-size: 16px;
  font-weight: 600;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.05);
    transform: scale(0.98);
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
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 14px;
    border-radius: 10px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 12px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
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
  background-color: ${props => props.backgroundColor};
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: fadeInOut 2s ease;
  
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, 20px); }
    15% { opacity: 1; transform: translate(-50%, 0); }
    85% { opacity: 1; transform: translate(-50%, 0); }
    100% { opacity: 0; transform: translate(-50%, -20px); }
  }
  
  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 0.9rem;
    max-width: 90%;
  }
`;

export default ResultsScreen;
