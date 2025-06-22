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

// Main wrapper - מעודכן להצגת header
export const ModernCameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #121212; /* Dark background */
  color: #e0e0e0;
  user-select: none;
  overflow: hidden;
  padding: 4px;
  box-sizing: border-box;
  ${css`animation: ${fadeIn} 0.4s ease-out;`}
  
  /* עדכון למובייל - בלי להסתיר header */
  @media (max-width: 767px) {
    height: 100vh; /* השתמש בגובה מלא */
    margin-top: 0;
    position: relative;
  }
`;

// Vertical layout: Camera on top, controls below
export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 4px;
  padding: 0;
  margin: 0;
  
  @media (max-width: 767px) {
    height: 100%;
    gap: 2px;
  }
`;

// Camera area - MOBILE RESPONSIVE
export const CameraSection = styled.div`
  width: 100%;
  height: 70vh; /* גובה קבוע יותר גמיש */
  position: relative;
  overflow: hidden;
  background: #000;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    height: 65vh; /* התאם לפי הצורך */
    border-radius: 6px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 767px) {
    border-radius: 6px;
  }
`;

export const LiveVideo = styled.video`
  position: absolute;
  top: 0; left: 0;
  width: 100%; 
  height: 100%;
  object-fit: cover;
  z-index: 0;
  border-radius: 8px;
  
  @media (max-width: 767px) {
    border-radius: 6px;
  }
`;

export const ModernCanvas = styled.canvas`
  position: absolute;
  top: 0; left: 0;
  width: 100%; 
  height: 100%;
  object-fit: cover;
  z-index: 1;
  border-radius: 8px;
  
  @media (max-width: 767px) {
    border-radius: 6px;
  }
`;

// Loading overlay for loading state
export const LoadingOverlay = styled.div`
  position: absolute; 
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  z-index: 10;
  border-radius: 8px;
  
  @media (max-width: 767px) {
    border-radius: 6px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 24px; height: 24px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
`;

export const LoadingText = styled.div`
  color: #fff;
  font-size: 0.7rem;
  
  @media (max-width: 767px) {
    font-size: 0.65rem;
  }
`;

// Controls panel - MOBILE RESPONSIVE - COMPACT LAYOUT
export const ControlsPanel = styled.div`
  flex: 1;
  min-height: 150px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content */
  padding: 12px;
  gap: 12px; /* Increased gap for better spacing */
  border-radius: 8px;
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.06);
  color: #212529;
  overflow: hidden;
  
  @media (max-width: 767px) {
    min-height: 120px;
    padding: 8px;
    gap: 8px;
    border-radius: 6px;
  }
`;

// Compact prediction section with better grouping
export const PredictionPanel = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  max-width: 500px; /* Limit maximum width */
  height: auto;
  min-height: 44px; /* Better height for touch targets */
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    padding: 6px 10px;
    gap: 8px;
    min-height: 40px;
    max-width: 100%; /* Full width on mobile */
  }
`;

export const PredictionHeader = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  
  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

export const PredictionDisplay = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 1;
  min-width: 0;
  
  @media (max-width: 767px) {
    font-size: 0.75rem;
    padding: 3px 6px;
  }
`;

export const BufferText = styled.div`
  font-size: 0.5rem;
  color: ${props => (props.$isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)')};
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 767px) {
    font-size: 0.45rem;
  }
`;

// Larger, more prominent circular progress indicator
export const CircularProgress = styled.div`
  position: relative;
  width: 48px; /* Increased from 28px */
  height: 48px; /* Increased from 28px */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    width: 40px; /* Increased from 24px */
    height: 40px; /* Increased from 24px */
  }
`;

export const CircularProgressSvg = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

export const CircularProgressBg = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 3; /* Increased from 2 */
`;

export const CircularProgressBar = styled.circle`
  fill: none;
  stroke: ${props => props.$isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)'};
  stroke-width: 3; /* Increased from 2 */
  stroke-linecap: round;
  stroke-dasharray: ${props => props.$circumference};
  stroke-dashoffset: ${props => props.$circumference - (props.$progress / 100) * props.$circumference};
  /* Only transition color changes, not the progress bar filling */
  transition: ${props => props.$isActive ? 'stroke 0.2s ease' : 'stroke-dashoffset 0.3s ease, stroke 0.2s ease'};
`;

export const CircularProgressText = styled.span`
  position: absolute;
  font-size: 0.7rem; /* Increased from 0.4rem */
  font-weight: 600;
  color: ${props => (props.$isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)')};
  
  @media (max-width: 767px) {
    font-size: 0.6rem; /* Increased from 0.35rem */
  }
`;

// Translation section - MOBILE RESPONSIVE - MAIN PROMINENT ELEMENT
export const TranslationPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 600px; /* Limit maximum width */
  min-height: 80px;
  
  @media (max-width: 767px) {
    padding: 10px;
    gap: 6px;
    border-radius: 8px;
    max-width: 100%; /* Full width on mobile */
    min-height: 70px;
  }
`;

export const TranslationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
  
  @media (max-width: 767px) {
    gap: 1px;
  }
`;

export const TranslationIcon = styled.span`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 1px;
  
  @media (max-width: 767px) {
    font-size: 0.7rem;
  }
`;

export const TranslationText = styled.div`
  color: #212529;
  font-size: 1rem; /* Slightly increased */
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.5;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #e9ecef;
  min-height: 60px;
  overflow-y: auto;
  text-align: left;
  display: flex;
  align-items: flex-start;

  @media (max-width: 767px) {
    font-size: 0.9rem;
    padding: 10px;
    line-height: 1.4;
    min-height: 50px;
  }
`;

// Clear button - Properly sized and centered
export const InlineButton = styled.button`
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 65, 108, 0.2);
  min-height: 40px;
  min-width: 100px;
  max-width: 200px;
  align-self: center; /* Center the button */
  
  &:hover { 
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 65, 108, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled { 
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 767px) {
    padding: 6px 16px;
    font-size: 0.8rem;
    min-height: 36px;
    min-width: 80px;
    max-width: 150px;
    gap: 4px;
    border-radius: 6px;
    
    &:hover { 
      transform: none; /* Disable hover effects on mobile */
      box-shadow: 0 2px 8px rgba(255, 65, 108, 0.2);
    }
  }
`;

export const ButtonIcon = styled.span`
  font-size: 0.55rem;
  
  @media (max-width: 767px) {
    font-size: 0.35rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.3rem;
  }
`;