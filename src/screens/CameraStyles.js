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

export const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

// Main Container - Full Screen רק בדסקטופ
export const ModernCameraContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  color: #1e293b;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: none;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}

  @media (min-width: 769px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  @media (max-width: 768px) {
    position: relative;
    height: auto;
    min-height: 100vh;
  }
`;

// Header Section - רק בדסקטופ, מוסתר בנייד
export const HeaderSection = styled.div`
  background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
  padding: 20px;
  text-align: center;
  ${css`animation: ${slideDown} 0.5s ease-out;`}

  @media (min-width: 769px) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: env(safe-area-inset-top, 20px) 20px 30px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MainTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 6px;
  }
`;

export const TitleIcon = styled.span`
  font-size: 1.2rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 4px 0 0 0;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

// Camera Section - עם מקום לפאנל התחתון העבה יותר
export const CameraSection = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  overflow: hidden;

  @media (min-width: 769px) {
    height: calc(100vh - 80px);
  }

  @media (max-width: 768px) {
    height: calc(100vh - 90px);
    min-height: 300px;
  }

  @media (max-width: 480px) {
    height: calc(100vh - 85px);
    min-height: 280px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
`;

export const ModernCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
`;

export const LiveVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  z-index: 1;
`;

// Translation Display - פאנל תחתון עבה יותר ובצבע לבן
export const TranslationDisplay = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding: 15px;
  ${css`animation: ${slideUp} 0.5s ease-out;`}
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 769px) {
    position: fixed;
    bottom: 0;
    left: 250px;
    right: 0;
    z-index: 10;
    height: 80px;
    padding: 0 20px env(safe-area-inset-bottom, 0) 20px;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 90px;
    padding: 15px 15px env(safe-area-inset-bottom, 15px) 15px;
  }

  @media (max-width: 480px) {
    height: 85px;
    padding: 12px 12px env(safe-area-inset-bottom, 12px) 12px;
  }
`;

export const TranslationCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

export const TranslationIcon = styled.span`
  font-size: 1.4rem;
  ${css`animation: ${pulse} 2s infinite;`}
  flex-shrink: 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// תוכן הטקסט בצד שמאל
export const TranslationContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const TranslationText = styled.div`
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: left;
  line-height: 1.3;
  text-shadow: none;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Buttons - כפתור Clear בולט יותר על רקע לבן
export const InlineButton = styled.button`
  background: rgba(220, 53, 69, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: 2px solid rgba(220, 53, 69, 1);
  min-height: 40px;
  outline: none;
  flex-shrink: 0;
  
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.3);
  }

  &:hover:not(:disabled) {
    background: rgba(220, 53, 69, 1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 10px 16px;
    min-height: 36px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 8px 14px;
    min-height: 32px;
  }
`;

export const ModernButton = styled.button`
  background: ${props => {
    if (props.$variant === 'danger') {
      return 'rgba(220, 53, 69, 0.8)';
    }
    if (props.$variant === 'camera') {
      return 'rgba(40, 167, 69, 0.8)';
    }
    return 'rgba(0, 123, 255, 0.8)';
  }};
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 48px;
  outline: none;
  
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: ${props => {
      if (props.$variant === 'danger') return 'rgba(220, 53, 69, 0.9)';
      if (props.$variant === 'camera') return 'rgba(40, 167, 69, 0.9)';
      return 'rgba(0, 123, 255, 0.9)';
    }};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 20px;
    min-height: 44px;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.1rem;
  ${props => props.$isSpinning && css`animation: ${spin} 1s linear infinite;`}

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Overlays
export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 20;
`;

export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-width: 3px;
  }
`;

export const LoadingText = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const PredictionOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.$confidence > 0.7
    ? 'rgba(16, 185, 129, 0.9)' 
    : 'rgba(0, 0, 0, 0.7)'};
  backdrop-filter: blur(20px);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 5;
  ${props => props.$confidence > 0.7 && css`animation: ${pulse} 2s infinite;`}
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  max-width: 80%;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 20px;
  }
`;

export const StatusIndicator = styled.div`
  position: absolute;
  ${props => {
    switch(props.$position) {
      case 'top-left':
        return 'top: env(safe-area-inset-top, 20px); left: 20px;';
      case 'top-right':
        return 'top: env(safe-area-inset-top, 20px); right: 20px;';
      case 'bottom-left':
        return 'bottom: env(safe-area-inset-bottom, 20px); left: 20px;';
      case 'bottom-right':
        return 'bottom: env(safe-area-inset-bottom, 20px); right: 20px;';
      default:
        return 'top: 20px; left: 20px;';
    }
  }}
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 15;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 6px 10px;
  }
`;

export const CameraNotification = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  color: white;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 15;
  max-width: 80%;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 16px;
  }
`;

// Status Section - מעל הפאנל התחתון בצד ימין
export const StatusSection = styled.div`
  ${css`animation: ${fadeIn} 1.2s ease-out 0.6s both;`}
  
  @media (min-width: 769px) {
    position: fixed;
    bottom: 90px;
    right: 20px;
    z-index: 11;
    width: 220px;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 100px;
    right: 15px;
    z-index: 11;
    width: 200px;
  }

  @media (max-width: 480px) {
    bottom: 95px;
    right: 12px;
    width: 180px;
  }
`;

export const StatusCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 10px;
  color: white;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const StatusIcon = styled.span`
  font-size: 1rem;
`;

export const PredictionDisplay = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 8px;
  background: ${props => props.$confidence 
    ? 'rgba(16, 185, 129, 0.8)'
    : 'rgba(148, 163, 184, 0.3)'};
  color: white;
  transition: all 0.3s ease;
  ${props => props.$confidence && css`animation: ${pulse} 2s infinite;`}
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 6px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 5px;
    margin-bottom: 5px;
  }
`;

export const SystemStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.8rem;
`;

export const StatusLabel = styled.span`
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
`;

export const StatusValue = styled.span`
  font-weight: 600;
  color: ${props => props.$isActive 
    ? '#10b981'
    : 'rgba(255, 255, 255, 0.6)'};
`;

// Error Components
export const ErrorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  z-index: 30;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ErrorCard = styled.div`
  background: rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
  }
`;

export const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }
`;

export const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 12px 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ErrorHint = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(239, 68, 68, 0.2);
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #ef4444;
  margin-top: 16px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 10px;
  }
`;

export const ErrorCode = styled.code`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: white;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 3px 6px;
  }
`;