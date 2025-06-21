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

// Main wrapper - תוקן להציג header
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
  
  /* תיקון למובייל - מאפשר הצגת header */
  @media (max-width: 767px) {
    height: calc(100vh - 80px); /* השאר מקום ל-header */
    margin-top: 0;
    position: relative;
    overflow: visible; /* אפשר גלילה אם צריך */
  }
  
  /* תיקון נוסף למסכים קטנים מאוד */
  @media (max-width: 480px) {
    height: calc(100vh - 70px); /* פחות מקום למסכים קטנים */
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
    height: 60vh; /* התאם לפי הצורך עם מקום ל-header */
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    height: 55vh; /* פחות גובה למסכים קטנים */
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

// Controls panel - MOBILE RESPONSIVE
export const ControlsPanel = styled.div`
  flex: 1; /* תופס את השטח הנותר */
  min-height: 150px; /* גובה מינימלי */
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 2px;
  border-radius: 8px;
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.06);
  color: #212529;
  overflow: hidden;
  
  @media (max-width: 767px) {
    min-height: 120px;
    padding: 3px;
    gap: 1px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    min-height: 100px;
    padding: 2px;
  }
`;

// Minimal prediction section
export const PredictionPanel = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  padding: 2px 4px;
  color: white;
  box-shadow: 0 1px 2px rgba(102, 126, 234, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  height: 24px;
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    height: 22px;
    padding: 1px 3px;
    gap: 4px;
  }
  
  @media (max-width: 480px) {
    height: 20px;
    padding: 1px 2px;
    gap: 2px;
  }
`;

export const PredictionHeader = styled.div`
  font-size: 0.55rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  
  @media (max-width: 767px) {
    font-size: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.45rem;
  }
`;

export const PredictionDisplay = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 3px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 1;
  min-width: 0;
  
  @media (max-width: 767px) {
    font-size: 0.55rem;
    padding: 1px 3px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.5rem;
    padding: 1px 2px;
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
  
  @media (max-width: 480px) {
    font-size: 0.4rem;
  }
`;

// Translation section - MOBILE RESPONSIVE
export const TranslationPanel = styled.div`
  background: white;
  border-radius: 6px;
  padding: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  
  @media (max-width: 767px) {
    padding: 3px;
    gap: 1px;
    border-radius: 4px;
  }
  
  @media (max-width: 480px) {
    padding: 2px;
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
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

export const TranslationText = styled.div`
  color: #212529;
  font-size: 0.95rem;
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.5;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 5px;
  border: 1px solid #e9ecef;
  min-height: 100px;
  overflow-y: auto;
  text-align: left;
  display: flex;
  align-items: flex-start;

  @media (max-width: 767px) {
    font-size: 0.85rem;
    padding: 4px;
    line-height: 1.4;
    min-height: 80px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 3px;
    min-height: 60px;
    border-radius: 4px;
  }
`;

// כפתור Clear - קטן יותר במובייל
export const InlineButton = styled.button`
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  color: white;
  padding: 2px 6px;
  border: none;
  border-radius: 3px;
  font-size: 0.55rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1px;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(255, 65, 108, 0.2);
  height: 18px;
  flex-shrink: 0;
  
  &:hover { 
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(255, 65, 108, 0.3);
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
  
  /* כפתור קטן יותר במובייל */
  @media (max-width: 767px) {
    height: 16px !important;
    padding: 1px 4px !important;
    font-size: 0.45rem !important;
    gap: 0px !important;
    border-radius: 2px !important;
    
    &:hover { 
      transform: none !important; /* ביטול אפקטי hover במובייל */
      box-shadow: 0 1px 2px rgba(255, 65, 108, 0.2) !important;
    }
  }
  
  @media (max-width: 480px) {
    height: 14px !important;
    padding: 0px 3px !important;
    font-size: 0.4rem !important;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 0.55rem;
  
  @media (max-width: 767px) {
    font-size: 0.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.35rem;
  }
`;