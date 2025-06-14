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


// Main wrapper - Web תקין, רק Mobile מתוקן
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
  
  /* MOBILE FIX ONLY - Web נשאר ללא שינוי */
  @media (max-width: 767px) {
    position: relative !important;
    height: auto !important;
    min-height: calc(100vh - 80px) !important;
    max-height: calc(100vh - 80px) !important;
    margin: 0 !important;
    padding: 2px !important;
  }
  
  /* תיקון מיוחד למצב אופקי במובייל */
  @media (max-width: 767px) and (orientation: landscape) {
    min-height: 100vh !important;
    max-height: 100vh !important;
  }
`;



// Vertical layout - Web תקין, Mobile מתוקן
export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 4px;
  padding: 0;
  margin: 0;
  flex: 1;
  
  /* MOBILE FIX ONLY */
  @media (max-width: 767px) {
    height: 100%;
    gap: 2px;
    flex: 1;
    min-height: 0;
  }
`;

// Camera area - Web נשאר 75vh, Mobile משתנה
export const CameraSection = styled.div`
  width: 100%;
  height: calc(75vh - 6px); /* Web - נשאר ללא שינוי */
  position: relative;
  overflow: hidden;
  background: #000;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  
  /* MOBILE FIX - הגדלת המצלמה רק במובייל */
  @media (max-width: 767px) {
    height: auto !important;
    flex: 8 !important; /* 80% במקום 70% */
    min-height: 0 !important;
    border-radius: 6px;
  }
  
  /* תיקון למצב אופקי במובייל */
  @media (max-width: 767px) and (orientation: landscape) {
    flex: 7 !important;
    min-height: 50vh !important;
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

// Controls panel - Web נשאר 25vh, Mobile קטן יותר
export const ControlsPanel = styled.div`
  height: calc(25vh - 6px); /* Web - נשאר ללא שינוי */
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 2px;
  border-radius: 8px;
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.06);
  color: #212529;
  overflow: hidden;
  flex-shrink: 0;
  
  /* MOBILE FIX - הקטנת הקונטרולים רק במובייל */
  @media (max-width: 767px) {
    height: auto !important;
    flex: 2 !important; /* 20% במקום 30% */
    min-height: 0 !important;
    padding: 3px;
    gap: 1px;
    border-radius: 6px;
  }
  
  /* תיקון למצב אופקי במובייל */
  @media (max-width: 767px) and (orientation: landscape) {
    flex: 3 !important;
    min-height: 20vh !important;
    max-height: 40vh !important;
  }
`;

// Minimal prediction section - ללא שינוי
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
`;

export const PredictionHeader = styled.div`
  font-size: 0.55rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  
  @media (max-width: 767px) {
    font-size: 0.5rem;
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

// Translation section - הקטנת חלון הטקסט רק במובייל
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

// הקטנת חלון הטקסט רק במובייל
export const TranslationText = styled.div`
  color: #212529;
  font-size: 0.75rem;
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.2;
  flex: 1;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 4px;
  border: 1px solid #e9ecef;
  min-height: 0;
  overflow-y: auto;
  
  /* הקטנת הטקסט רק במובייל */
  @media (max-width: 767px) {
    font-size: 0.65rem;
    padding: 2px;
    line-height: 1.1;
    max-height: 40px; /* הגבלת גובה רק במובייל */
  }
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 1px;
    max-height: 30px;
  }
`;

// כפתור Clear מעוצב כריבוע יפה - Web נשאר מלבני, Mobile ריבועי
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
  
  /* כפתור ריבועי יפה למובייל */
  @media (max-width: 767px) {
    width: 16px !important;
    height: 16px !important;
    padding: 0 !important;
    font-size: 0.5rem !important;
    gap: 0px !important;
    border-radius: 4px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%) !important;
    box-shadow: 0 2px 4px rgba(255, 65, 108, 0.3) !important;
    
    &:hover { 
      transform: none !important;
      box-shadow: 0 2px 4px rgba(255, 65, 108, 0.4) !important;
    }
    
    &:active {
      transform: scale(0.95) !important;
    }
  }
  
  @media (max-width: 480px) {
    width: 14px !important;
    height: 14px !important;
    font-size: 0.45rem !important;
    border-radius: 3px !important;
    min-width: 14px !important;
    min-height: 14px !important;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 0.55rem;
  
  @media (max-width: 767px) {
    font-size: 0.5rem !important;
    line-height: 1 !important;
  }
  
  @media (max-width: 480px) {
    font-size: 0.45rem !important;
  }
`;

// הוספת סטייל לטקסט של הכפתור - יוסתר במובייל
export const ButtonText = styled.span`
  @media (max-width: 767px) {
    display: none !important; /* הסתרת הטקסט במובייל */
  }
`;