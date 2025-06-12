// SignAnimationStyles.js - CLEAN MOBILE APP STYLE

import styled, { keyframes, css } from 'styled-components';

// Keyframes
export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const wave = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export const slideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const SpinningIcon = styled.div`
  ${css`animation: ${spin} 1s linear infinite;`}
`;

// MOBILE APP CONTAINER
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 100dvh;
  }
`;

// TOP SECTION - FOR HEADER AND ANIMATION (SMALLER)
export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  justify-content: center;
  padding: 16px;
  position: relative;
  min-height: 55vh;
  
  @media (max-width: 768px) {
    padding: 12px;
    min-height: 50vh;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    min-height: 45vh;
  }
`;

// HEADER - SMALLER
export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
  z-index: 1;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

export const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

export const AvailableWordsHint = styled.p`
  display: none;
`;

// CONTENT CONTAINER - SMALLER MARGINS
export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  flex: 1;
  justify-content: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

// HIDDEN COMPONENTS
export const RecentWordsContainer = styled.div`
  display: none;
`;

export const RecentWordsTitle = styled.p`
  display: none;
`;

export const RecentWordsList = styled.div`
  display: none;
`;

export const RecentWordButton = styled.button`
  display: none;
`;

// HIDDEN INFO CONTAINER
export const InfoContainer = styled.div`
  display: none;
`;

export const InfoText = styled.p`
  display: none;
`;

// HIDDEN CURRENT WORD DISPLAY
export const CurrentWordDisplay = styled.div`
  display: none;
`;

export const CurrentWordLabel = styled.span`
  display: none;
`;

export const CurrentWord = styled.h2`
  display: none;
`;

// VIDEO CONTAINER - SMALLER SIZE
export const VideoContainer = styled.div`
  width: 100%;
  max-width: 320px;
  aspect-ratio: 3/4;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    max-width: 280px;
    border-radius: 18px;
  }
  
  @media (max-width: 480px) {
    max-width: 240px;
    border-radius: 16px;
  }
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 22px;
  cursor: pointer;
  
  /* Hide all controls */
  &::-webkit-media-controls {
    display: none !important;
  }
  
  &::-webkit-media-controls-start-playback-button {
    display: none !important;
  }
  
  &::-webkit-media-controls-play-button {
    display: none !important;
  }
  
  &::-webkit-media-controls-timeline {
    display: none !important;
  }
  
  &::-webkit-media-controls-current-time-display {
    display: none !important;
  }
  
  &::-webkit-media-controls-time-remaining-display {
    display: none !important;
  }
  
  &::-webkit-media-controls-mute-button {
    display: none !important;
  }
  
  &::-webkit-media-controls-volume-slider {
    display: none !important;
  }
  
  &::-webkit-media-controls-fullscreen-button {
    display: none !important;
  }
  
  &::-webkit-media-controls-enclosure {
    display: none !important;
  }
  
  &::-moz-media-controls {
    display: none !important;
  }
  
  &[controls] {
    controls: none;
  }
  
  @media (max-width: 768px) {
    border-radius: 18px;
  }
  
  @media (max-width: 480px) {
    border-radius: 16px;
  }
`;

// FLOATING BUTTONS - LIKE +/1.0 BUTTONS (ON THE SIDES)
export const FloatingButtonsContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
  
  @media (max-width: 768px) {
    left: 16px;
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    left: 12px;
    gap: 8px;
  }
`;

export const FloatingButton = styled.button`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

// RIGHT SIDE BUTTONS
export const RightButtonsContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
  
  @media (max-width: 768px) {
    right: 16px;
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    right: 12px;
    gap: 8px;
  }
`;

// FLAG BUTTON - US FLAG (BOTTOM LEFT)
export const FlagButton = styled.button`
  width: 56px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: absolute;
  left: 20px;
  bottom: 20px;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 52px;
    height: 36px;
    left: 16px;
    bottom: 16px;
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    width: 48px;
    height: 32px;
    left: 12px;
    bottom: 12px;
    font-size: 1.2rem;
  }
`;

// MIDDLE SECTION - SMALLER PADDING
export const MiddleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px;
  position: relative;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    padding: 12px 12px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 8px;
  }
`;

// BOTTOM SECTION - TAB BAR ONLY
export const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// SEARCH CONTAINER (IN MIDDLE SECTION)
export const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 8px;
  position: relative;
  width: 100%;
  max-width: 500px;
  
  @media (max-width: 480px) {
    gap: 6px;
    max-width: 400px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 1;
  color: #6c757d;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    left: 12px;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    left: 10px;
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  min-height: 46px;
  transition: all 0.3s ease;
  font-weight: 400;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &::placeholder {
    color: #adb5bd;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 0 3px 12px rgba(0, 123, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 14px 10px 40px;
    min-height: 42px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 8px 12px 8px 36px;
    min-height: 38px;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  min-height: 46px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0056b3 0%, #004494 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #6c757d;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 0 16px;
    min-height: 42px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
    min-height: 38px;
    font-size: 0.8rem;
  }
`;

// MIC BUTTON - ORANGE LIKE IN IMAGE
export const MicButton = styled.button`
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
  }
  
  &:active:not(:disabled) {
    transform: translateY(-50%) scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #6c757d;
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
    right: 6px;
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
    right: 4px;
  }
`;

// CAMERA BUTTON
export const CameraButton = styled.button`
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  
  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.05);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
    left: 6px;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 0.7rem;
    left: 4px;
  }
`;

// TAB BAR - HIDDEN
export const TabBar = styled.div`
  display: none;
`;

export const TabItem = styled.div`
  display: none;
`;

export const TabIcon = styled.div`
  display: none;
`;

export const TabLabel = styled.span`
  display: none;
`;

// ADDITIONAL INFO SECTIONS (BELOW INPUT)
export const InfoSection = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    margin-top: 6px;
  }
`;

// ERROR/INFO MESSAGES
export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 12px;
  margin-bottom: 16px;
  ${css`animation: ${slideIn} 0.4s ease-out;`}
`;

export const ErrorText = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
  font-weight: 500;
`;

// EMPTY STATE - HIDDEN
export const EmptyStateContainer = styled.div`
  display: none;
`;

export const EmptyStateIcon = styled.div`
  display: none;
`;

export const EmptyStateText = styled.p`
  display: none;
`;

export const EmptyStateSubText = styled.p`
  display: none;
`;