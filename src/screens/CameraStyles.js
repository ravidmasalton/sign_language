// CameraStyles.js
import styled, { keyframes, css } from 'styled-components';

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0%,100% { transform: scale(1); }
  50%    { transform: scale(1.05); }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// Main container - פשוט וברור
export const ModernCameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #121212;
  color: #e0e0e0;
  user-select: none;
  overflow: hidden;
  padding: 8px;
  box-sizing: border-box;
  ${css`animation: ${fadeIn} 0.4s ease-out;`}
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    padding: 4px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

// Layout - vertical split
export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 4px;
    height: 100%;
  }
`;

// Camera section - מצלמה תופסת 70% מהמסך
export const CameraSection = styled.div`
  flex: 7;
  position: relative;
  overflow: hidden;
  background: #000;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-height: 0;
  
  @media (max-width: 768px) {
    flex: 8;
    border-radius: 8px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

export const LiveVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  border-radius: 12px;
  
  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

export const ModernCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  border-radius: 12px;
  
  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

// Loading overlay
export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 10;
  border-radius: 12px;
  
  @media (max-width: 768px) {
    border-radius: 8px;
    gap: 8px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    border-width: 2px;
  }
`;

export const LoadingText = styled.div`
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Controls panel - תופס 30% מהמסך
export const ControlsPanel = styled.div`
  flex: 3;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  border-radius: 12px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  color: #212529;
  overflow: hidden;
  min-height: 0;
  
  @media (max-width: 768px) {
    flex: 2;
    padding: 8px;
    gap: 6px;
    border-radius: 8px;
    
    /* הסתרת הכפתור הרגיל במובייל */
    .desktop-only {
      display: none;
    }
  }
  
  /* הצגת הכפתור הרגיל רק בדסקטופ */
  .mobile-only {
    display: none;
  }
`;

// Prediction panel - קטן מאוד כדי לפנות מקום לתרגום
export const PredictionPanel = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  padding: 4px 8px;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  min-height: 28px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    padding: 3px 5px;
    gap: 3px;
    min-height: 24px;
    border-radius: 4px;
  }
`;

export const PredictionHeader = styled.div`
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

export const PredictionDisplay = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 1;
  min-width: 0;
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 3px 5px;
    border-radius: 3px;
  }
`;

export const BufferText = styled.div`
  font-size: 0.6rem;
  color: ${props => (props.$isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)')};
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 0.55rem;
  }
`;

// Translation panel - גדול יותר עם יותר מקום לטקסט רב
export const TranslationPanel = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px 16px 30px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1.5;
  min-height: 0;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 12px 12px 24px 12px;
    gap: 10px;
    border-radius: 6px;
    flex: 1.2;
  }
`;

// Translation header with clear button
export const TranslationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  
  .translation-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: #6c757d;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2px;
    
    .translation-title {
      font-size: 0.75rem;
    }
  }
`;

export const TranslationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const TranslationIcon = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const TranslationText = styled.div`
  color: #212529;
  font-size: 1rem;
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.5;
  flex: 1;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 28px;
  border: 1px solid #e9ecef;
  min-height: 140px;
  overflow-y: auto;
  text-align: left;
  vertical-align: top;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 24px;
    min-height: 120px;
    line-height: 1.4;
    border-radius: 6px;
  }
`;

// Clear button - עם שני מצבים
export const ClearButton = styled.button`
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 65, 108, 0.3);
  
  /* Desktop version - inside translation panel */
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  min-height: 32px;
  
  &:hover { 
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 65, 108, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled { 
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Mobile version - floating button */
  &.mobile-only {
    display: none;
    
    @media (max-width: 768px) {
      display: flex;
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 50px;
      padding: 0;
      border-radius: 25px;
      z-index: 1000;
      box-shadow: 0 4px 16px rgba(255, 65, 108, 0.4);
      
      &:hover { 
        transform: translateX(-50%) scale(1.05);
        box-shadow: 0 6px 20px rgba(255, 65, 108, 0.5);
      }
      
      &:active {
        transform: translateX(-50%) scale(0.95);
      }
      
      &:disabled {
        background: #adb5bd;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transform: translateX(-50%);
      }
    }
  }
  
  /* Hide desktop version on mobile */
  @media (max-width: 768px) {
    &:not(.mobile-only) {
      display: none;
    }
  }
`;

export const ButtonIcon = styled.span`
  font-size: 0.8rem;
  line-height: 1;
  
  @media (max-width: 768px) {
    .mobile-only & {
      font-size: 1.2rem;
    }
  }
`;

export const ButtonText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;