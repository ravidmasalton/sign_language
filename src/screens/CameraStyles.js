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
export const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to   { transform: translateY(0); }
`;

// Main wrapper - Full screen container
export const ModernCameraContainer = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #121212; /* Dark background */
  color: #e0e0e0;
  user-select: none;
  overflow: hidden;
  ${css`animation: ${fadeIn} 0.4s ease-out;`}
`;

// Compact header
export const HeaderSection = styled.div`
  background: #1f1f1f;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${css`animation: ${slideDown} 0.4s ease-out;`}
`;
export const MainTitle = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const TitleIcon = styled.span`
  font-size: 1rem;
  ${css`animation: ${pulse} 2s infinite;`}
`;
export const Subtitle = styled.p`
  font-size: 0.75rem;
  color: #bbb;
  margin: 0;
`;

// Horizontal layout: Camera on left, translation panel on right
export const MainLayout = styled.div`
  display: flex;
  flex: 1;
  /* Height is viewport height minus HeaderSection height (~40px) */
  height: calc(100vh - 40px);
`;

// Camera area
export const CameraSection = styled.div`
  flex: 2;
  position: relative;
  overflow: hidden;
  background: #000;
`;
export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const LiveVideo = styled.video`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
`;
export const ModernCanvas = styled.canvas`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 1;
`;

// Loading overlay for loading state
export const LoadingOverlay = styled.div`
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 10;
`;
export const LoadingSpinner = styled.div`
  width: 40px; height: 40px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
`;
export const LoadingText = styled.div`
  color: #fff;
  font-size: 0.9rem;
`;

// Translation & Prediction panel (white background for translation box)
export const TranslationPanel = styled.div`
  flex: 1;
  background: #fff; /* White background */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 12px;
  border-left: 1px solid #ccc;
  color: #222; /* Dark text in panel */
`;

// Compact prediction section
export const PredictionPanel = styled.div`
  background: #f0f0f0; /* Light gray */
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const PredictionHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: #000;
  gap: 4px;
`;
export const PredictionDisplay = styled.div`
  background: #e0e0e0;
  color: #000;
  font-size: 0.85rem;
  padding: 4px 6px;
  border-radius: 6px;
  text-align: center;
`;
export const BufferText = styled.div`
  font-size: 0.75rem;
  color: ${props => (props.$isActive ? '#388e3c' : '#666')};
`;

// Translation box section
export const TranslationContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;
export const TranslationIcon = styled.span`
  font-size: 1.2rem;
  color: #333;
`;
export const TranslationText = styled.div`
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  word-wrap: break-word;
`;

// Clear button styling
export const InlineButton = styled.button`
  margin-top: auto;
  background: #d32f2f;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  transition: background 0.3s ease;
  &:hover { background: #c62828; }
  &:disabled { background: #aaa; cursor: not-allowed; }
`;
export const ButtonIcon = styled.span`
  font-size: 1rem;
`;
