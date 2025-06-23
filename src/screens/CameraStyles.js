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
  min-height: 120px; /* Reduced from 150px for more compact layout */
  max-height: none; /* Allow natural height on desktop */
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  padding: 8px; /* Reduced padding for more compact layout */
  gap: 8px; /* Reduced gap for tighter spacing */
  border-radius: 8px;
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.06);
  color: #212529;
  overflow-y: auto; /* Allow scrolling if content is too tall */
  overflow-x: hidden;
  
  /* Tablet screens */
  @media (max-width: 1024px) and (min-width: 768px) {
    min-height: 110px;
    padding: 7px;
    gap: 7px;
  }
  
  /* Mobile landscape and small tablets */
  @media (max-width: 767px) and (min-width: 481px) {
    min-height: 100px;
    max-height: 45vh; /* Ensure it doesn't take too much space */
    padding: 6px;
    gap: 6px;
    border-radius: 6px;
  }
  
  /* Mobile portrait */
  @media (max-width: 480px) {
    min-height: 85px; /* Reduced for more compact layout */
    max-height: 50vh; /* Prevent controls from being cut off */
    padding: 5px;
    gap: 5px;
    border-radius: 4px;
  }
  
  /* Very small screens */
  @media (max-width: 320px) {
    min-height: 75px; /* Further reduced */
    max-height: 55vh;
    padding: 4px;
    gap: 4px;
  }
`;

// OLD LAYOUT COMPONENTS (for backward compatibility)
// ================================================

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
  max-width: 500px;
  height: auto;
  min-height: 44px;
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    padding: 6px 10px;
    gap: 8px;
    min-height: 40px;
    max-width: 100%;
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

export const CircularProgress = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
`;

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
  max-width: 600px;
  min-height: 80px;
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    padding: 10px;
    gap: 6px;
    border-radius: 8px;
    max-width: 100%;
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

export const TranslationText = styled.div`
  color: #212529;
  font-size: 1rem;
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.5;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #e9ecef;
  min-height: 60px;
  max-height: 150px;
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
  align-self: center;
  flex-shrink: 0;
  
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
      transform: none;
      box-shadow: 0 2px 8px rgba(255, 65, 108, 0.2);
    }
  }
`;

// NEW COMPACT LAYOUT COMPONENTS
// ==============================

// Top row: Prediction + Progress side by side
export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  width: 100%;
  min-height: 48px;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    padding: 10px 14px;
    border-radius: 10px;
    min-height: 44px;
  }
  
  @media (max-width: 767px) and (min-width: 481px) {
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom: 6px;
    min-height: 40px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    border-radius: 6px;
    margin-bottom: 5px;
    min-height: 36px;
  }
  
  @media (max-width: 320px) {
    padding: 5px 8px;
    border-radius: 4px;
    margin-bottom: 4px;
    min-height: 32px;
  }
`;

export const PredictionCompact = styled.div`
  flex: 1;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 6px 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 1024px) and (min-width: 768px) {
    font-size: 0.9rem;
    padding: 5px 9px;
  }
  
  @media (max-width: 767px) and (min-width: 481px) {
    font-size: 0.85rem;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 3px 6px;
    border-radius: 3px;
  }
  
  @media (max-width: 320px) {
    font-size: 0.75rem;
    padding: 2px 5px;
  }
`;

export const CircularProgressCompact = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    width: 36px;
    height: 36px;
    margin-left: 10px;
  }
  
  @media (max-width: 767px) and (min-width: 481px) {
    width: 32px;
    height: 32px;
    margin-left: 8px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    margin-left: 6px;
  }
  
  @media (max-width: 320px) {
    width: 24px;
    height: 24px;
    margin-left: 4px;
  }
`;

// Circular progress SVG components (needed for existing CameraScreen.js)
export const CircularProgressSvg = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

export const CircularProgressBg = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 3;
`;

export const CircularProgressBar = styled.circle`
  fill: none;
  stroke: ${props => props.$isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)'};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: ${props => props.$circumference};
  stroke-dashoffset: ${props => props.$circumference - (props.$progress / 100) * props.$circumference};
  transition: ${props => props.$isActive ? 'stroke 0.2s ease' : 'stroke-dashoffset 0.3s ease, stroke 0.2s ease'};
`;

export const CircularProgressText = styled.span`
  position: absolute;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${props => (props.$isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)')};
  
  @media (max-width: 767px) {
    font-size: 0.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.3rem;
  }
`;

// Translation section - Compact version
export const TranslationSection = styled.div`
  margin-bottom: 8px;
  width: 100%;
  
  @media (max-width: 767px) and (min-width: 481px) {
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 5px;
  }
  
  @media (max-width: 320px) {
    margin-bottom: 4px;
  }
`;

export const TranslationHeader = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 767px) and (min-width: 481px) {
    font-size: 0.75rem;
    margin-bottom: 5px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-bottom: 4px;
  }
  
  @media (max-width: 320px) {
    font-size: 0.65rem;
    margin-bottom: 3px;
  }
`;

export const TranslationTextBox = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  min-height: 50px;
  max-height: 80px;
  overflow-y: auto;
  color: #212529;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    padding: 10px 14px;
    min-height: 45px;
    max-height: 75px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 767px) and (min-width: 481px) {
    padding: 8px 12px;
    min-height: 40px;
    max-height: 70px;
    font-size: 0.8rem;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    min-height: 35px;
    max-height: 60px;
    font-size: 0.75rem;
    border-radius: 4px;
  }
  
  @media (max-width: 320px) {
    padding: 5px 8px;
    min-height: 30px;
    max-height: 50px;
    font-size: 0.7rem;
  }
`;

// Button row - Centered clear button
export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ClearButtonCompact = styled.button`
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
  min-height: 32px;
  min-width: 80px;
  
  &:hover { 
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(220, 53, 69, 0.3);
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
  
  @media (max-width: 1024px) and (min-width: 768px) {
    padding: 7px 18px;
    font-size: 0.78rem;
    min-height: 30px;
    border-radius: 7px;
  }
  
  @media (max-width: 767px) and (min-width: 481px) {
    padding: 6px 16px;
    font-size: 0.75rem;
    min-height: 28px;
    min-width: 70px;
    border-radius: 6px;
    
    &:hover { 
      transform: none;
      box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
    }
  }
  
  @media (max-width: 480px) {
    padding: 5px 14px;
    font-size: 0.7rem;
    min-height: 26px;
    min-width: 60px;
    border-radius: 4px;
    
    &:hover { 
      transform: none;
      box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
    }
  }
  
  @media (max-width: 320px) {
    padding: 4px 12px;
    font-size: 0.65rem;
    min-height: 24px;
    min-width: 50px;
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

// SIDE-BY-SIDE LAYOUT COMPONENTS
// ===============================

// Main container for side-by-side prediction and translation
export const SideBySideRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  width: 100%;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    gap: 8px;
    margin-bottom: 8px;
  }
  
  /* Stack vertically on mobile screens */
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 6px;
  }
`;

// Left side - Prediction panel with purple background
export const PredictionSide = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  min-height: 60px;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    padding: 14px;
    border-radius: 10px;
    min-height: 56px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    padding: 12px;
    border-radius: 8px;
    min-height: 52px;
  }
  
  @media (max-width: 600px) {
    padding: 12px;
    border-radius: 8px;
    min-height: 48px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 6px;
    min-height: 44px;
  }
  
  @media (max-width: 320px) {
    padding: 8px;
    border-radius: 4px;
    min-height: 40px;
  }
`;

// Prediction content text
export const PredictionContent = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-right: 12px;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    font-size: 0.9rem;
    padding: 7px 11px;
    margin-right: 10px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    font-size: 0.85rem;
    padding: 6px 10px;
    margin-right: 8px;
    border-radius: 6px;
  }
  
  @media (max-width: 600px) {
    font-size: 0.85rem;
    padding: 6px 10px;
    margin-right: 8px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 5px 8px;
    margin-right: 6px;
    border-radius: 4px;
  }
  
  @media (max-width: 320px) {
    font-size: 0.75rem;
    padding: 4px 6px;
    margin-right: 4px;
  }
`;

// Circular progress for prediction side
export const PredictionCircularProgress = styled.div`
  position: relative;  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
  
  @media (max-width: 320px) {
    width: 24px;
    height: 24px;
  }
`;

// Right side - Translation panel with white background
export const TranslationSide = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 60px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    padding: 14px;
    border-radius: 10px;
    min-height: 56px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    padding: 12px;
    border-radius: 8px;
    min-height: 52px;
  }
  
  @media (max-width: 600px) {
    padding: 12px;
    border-radius: 8px;
    min-height: 48px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 6px;
    min-height: 44px;
  }
  
  @media (max-width: 320px) {
    padding: 8px;
    border-radius: 4px;
    min-height: 40px;
  }
`;

// Translation header
export const TranslationSideHeader = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    font-size: 0.78rem;
    margin-bottom: 7px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    font-size: 0.75rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: 600px) {
    font-size: 0.75rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-bottom: 5px;
  }
  
  @media (max-width: 320px) {
    font-size: 0.65rem;
    margin-bottom: 4px;
  }
`;

// Translation text content
export const TranslationSideText = styled.div`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
  min-height: 24px;
  flex: 1;
  display: flex;
  align-items: flex-start;
  word-wrap: break-word;
  
  @media (max-width: 1024px) and (min-width: 768px) {
    font-size: 0.9rem;
    min-height: 22px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    font-size: 0.85rem;
    min-height: 20px;
  }
  
  @media (max-width: 600px) {
    font-size: 0.85rem;
    min-height: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    min-height: 18px;
    line-height: 1.3;
  }
  
  @media (max-width: 320px) {
    font-size: 0.75rem;
    min-height: 16px;
    line-height: 1.2;
  }
`;

// Clear button row - centered below both panels
export const ClearButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
  
  @media (max-width: 767px) {
    margin-top: 2px;
  }
`;

// Clear button for side-by-side layout
export const ClearButtonSideBySide = styled.button`
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
  min-height: 36px;
  min-width: 100px;
  
  &:hover { 
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(220, 53, 69, 0.3);
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
  
  @media (max-width: 1024px) and (min-width: 768px) {
    padding: 9px 22px;
    font-size: 0.83rem;
    min-height: 34px;
    border-radius: 7px;
  }
  
  @media (max-width: 767px) and (min-width: 601px) {
    padding: 8px 20px;
    font-size: 0.8rem;
    min-height: 32px;
    min-width: 90px;
    border-radius: 6px;
    
    &:hover { 
      transform: none;
      box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
    }
  }
  
  @media (max-width: 600px) {
    padding: 8px 20px;
    font-size: 0.8rem;
    min-height: 32px;
    min-width: 90px;
    border-radius: 6px;
    
    &:hover { 
      transform: none;
      box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
    }
  }
  
  @media (max-width: 480px) {
    padding: 7px 18px;
    font-size: 0.75rem;
    min-height: 30px;
    min-width: 80px;
    border-radius: 4px;
    
    &:hover { 
      transform: none;
      box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
    }
  }
  
  @media (max-width: 320px) {
    padding: 6px 16px;
    font-size: 0.7rem;
    min-height: 28px;
    min-width: 70px;
  }
`;