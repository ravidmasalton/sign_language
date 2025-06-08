import styled, { keyframes, css } from 'styled-components';

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px #007bff40; }
  50% { box-shadow: 0 0 30px #007bff60; }
`;

// Main Container
export const ModernCameraContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

// Header Section
export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const TitleIcon = styled.span`
  font-size: 2.5rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Translation Display
export const TranslationDisplay = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;  
  align-items: center;
  gap: 1rem;
  min-height: 80px;
  ${css`animation: ${fadeIn} 0.8s ease-out 0.2s both;`}

  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

export const TranslationIcon = styled.span`
  font-size: 2rem;
  ${css`animation: ${pulse} 2s infinite;`}
`;

export const TranslationText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  flex: 1;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Controls Section
export const ControlsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const ModernButton = styled.button`
  background: ${props => {
    if (props.$variant === 'danger') {
      return 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
    }
    if (props.$variant === 'camera') {
      return 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    }
    return 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
  }};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 48px;
  /* הוספתי outline לנגישות */
  outline: none;
  
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    ${css`animation: ${glow} 2s infinite;`}
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    flex: 1;
    min-width: 140px;
    max-width: 200px;
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.1rem;
  ${props => props.$isSpinning && css`animation: ${spin} 1s linear infinite;`}
`;

// Camera Section
export const CameraSection = styled.div`
  flex: 1;
  display: flex;  
  justify-content: center;
  align-items: center;
  ${css`animation: ${fadeIn} 1s ease-out 0.4s both;`}
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 4/3;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    aspect-ratio: 16/12;
    /* שיפור למובייל - מצלמה יותר גדולה */
    max-width: 100%;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    aspect-ratio: 4/3;
  }
`;

export const ModernCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  /* הוספתי לחדות טובה יותר */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 10;
  border-radius: 20px;
`;

export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
`;

export const LoadingText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  text-align: center;
`;

// Notifications
export const CameraNotification = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
`;

// Status Section
export const StatusSection = styled.div`
  ${css`animation: ${fadeIn} 1.2s ease-out 0.6s both;`}
`;

export const StatusCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
`;

export const StatusIcon = styled.span`
  font-size: 1.2rem;
`;

export const PredictionDisplay = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 1.5rem;
  background: ${props => props.$confidence 
    ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
    : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  transition: all 0.3s ease;
  ${props => props.$confidence && css`animation: ${pulse} 2s infinite;`}
  /* שיפור לקריאות טובה יותר */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem;
  }
`;

export const SystemStatus = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

export const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const StatusLabel = styled.span`
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

export const StatusValue = styled.span`
  font-weight: 600;
  color: ${props => props.$isActive 
    ? '#4ade80'
    : 'rgba(255, 255, 255, 0.9)'};
  /* הוספתי אנימציה רכה לשינוי צבע */
  transition: color 0.3s ease;
`;

// Error Components
export const ErrorContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const ErrorCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;  
  text-align: center;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

export const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  ${css`animation: ${pulse} 2s infinite;`}
`;

export const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 1rem 0;
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

export const ErrorHint = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #dc3545;
`;

export const ErrorCode = styled.code`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: white;
  font-size: 0.875rem;
`;