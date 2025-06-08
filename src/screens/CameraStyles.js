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

export const cameraGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px #28a74540; }
  50% { box-shadow: 0 0 30px #28a74560; }
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
    padding: 0.5rem;
    gap: 1rem;
  }
`;

// Header Section - Minimized on mobile
export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
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
    font-size: 1.3rem;
    margin: 0 0 0.2rem 0;
    gap: 0.3rem;
  }
`;

export const TitleIcon = styled.span`
  font-size: 2.5rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin: 0;
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
    padding: 1rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
    min-height: 60px;
    border-radius: 15px;
  }
`;

export const TranslationIcon = styled.span`
  font-size: 2rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const TranslationText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  flex: 1;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Controls Section
export const ControlsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
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

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    ${props => {
      if (props.$variant === 'camera') {
        return css`animation: ${cameraGlow} 2s infinite;`;
      }
      return css`animation: ${glow} 2s infinite;`;
    }}
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
    min-width: 120px;
    max-width: 160px;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    min-height: 40px;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.1rem;
  ${props => props.$isSpinning && css`animation: ${spin} 1s linear infinite;`}

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
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
    border-radius: 15px;
    max-width: 100%;
  }
`;

export const ModernCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;

  @media (max-width: 768px) {
    border-radius: 15px;
  }
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
  border-radius: 20px;

  @media (max-width: 768px) {
    border-radius: 15px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }
`;

export const LoadingText = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Status Section
export const StatusSection = styled.div`
  display: flex;
  justify-content: center;
  ${css`animation: ${fadeIn} 1.2s ease-out 0.6s both;`}
`;

export const StatusCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 250px;
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

export const StatusIcon = styled.span`
  font-size: 1.3rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const PredictionDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.$confidence ? '#4ade80' : '#fbbf24'};
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
  border: 2px solid ${props => props.$confidence ? '#4ade8080' : '#fbbf2480'};

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem;
    margin-bottom: 0.75rem;
  }
`;

export const SystemStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const StatusLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

export const StatusValue = styled.span`
  color: ${props => props.$isActive ? '#4ade80' : '#fbbf24'};
  font-weight: 700;
  font-family: 'Courier New', monospace;
`;

// Error Components
export const ErrorContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ErrorCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 15px;
  }
`;

export const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

export const ErrorTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const ErrorMessage = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;