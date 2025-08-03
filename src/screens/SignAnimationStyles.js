// SignAnimationStyles.js - DESIGN ONLY (NO LOGIC)

import styled, { keyframes, css } from 'styled-components';

// ========================
// KEYFRAMES ANIMATIONS
// ========================

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
`;

export const micPulse = keyframes`
  0%, 100% { 
    transform: translateY(-50%) scale(1);
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  }
  50% { 
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.5);
  }
`;

export const slideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// ========================
// HELPER COMPONENTS
// ========================

export const SpinningIcon = styled.div`
  animation: ${spin} 1s linear infinite;
`;

// ========================
// MAIN LAYOUT CONTAINERS
// ========================

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 100dvh;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  justify-content: center;
  padding: 16px 12px 8px 12px;
  position: relative;
  min-height: 0;
  
  @media (max-width: 768px) {
    padding: 12px 8px 4px 8px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 6px 2px 6px;
  }
`;

export const MiddleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  position: relative;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 123, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 10px 12px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 8px;
  }
`;

export const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 8px;
  background: rgba(248, 249, 250, 0.95);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  flex-shrink: 0;
  min-height: 16px;
  
  @media (max-width: 768px) {
    padding: 4px 6px;
    min-height: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 3px 4px;
    min-height: 10px;
  }
`;

// ========================
// HEADER COMPONENTS
// ========================

export const Header = styled.header`
  text-align: center;
  margin-bottom: 8px;
  z-index: 1;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2px;
  }
`;

export const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0;
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

// ========================
// VIDEO COMPONENTS
// ========================

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  flex: 1;
  justify-content: center;
  margin: 0;
`;

export const VideoContainer = styled.div`
  width: 100%;
  max-width: 350px;
  aspect-ratio: 3/4;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(0, 123, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 123, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.16),
      0 6px 20px rgba(0, 123, 255, 0.12);
    border-color: rgba(0, 123, 255, 0.2);
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    max-width: 320px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    max-width: 290px;
    border-radius: 18px;
  }
  
  @media (max-width: 400px) {
    max-width: 270px;
  }
  
  @media (max-width: 360px) {
    max-width: 250px;
  }
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
  
  /* Hide all native video controls */
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

// ========================
// FORM & INPUT COMPONENTS
// ========================

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 500px;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  position: relative;
  width: 100%;
  align-items: center;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 2;
  color: #6c757d;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    left: 14px;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    left: 12px;
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 50px 14px 48px;
  border: 2px solid rgba(0, 123, 255, 0.1);  border-radius: 24px;
  font-size: 16px; /* Important! Minimum 16px to prevent zoom on iOS */
  background: ${props => props.isListening ? 'rgba(0, 123, 255, 0.1)' : 'rgba(255, 255, 255, 0.95)'};
  color: #2c3e50;
  min-height: 52px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border-color: ${props => props.isListening ? '#007bff' : 'rgba(0, 123, 255, 0.1)'};
  
  &::placeholder {
    color: #adb5bd;
    font-style: italic;
    font-weight: 400;
    font-size: 16px; /* Important! Placeholder must also be 16px */
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 
      0 6px 20px rgba(0, 123, 255, 0.15),
      0 0 0 4px rgba(0, 123, 255, 0.1);
  }
  
  &:disabled {
    background: rgba(0, 123, 255, 0.05);
    border-color: rgba(0, 123, 255, 0.2);
    color: #007bff;
  }
    /* On mobile - ensure font size stays at 16px */
  @media (max-width: 768px) {
    font-size: 16px; /* Required! */
    padding: 12px 38px 12px 44px;
    min-height: 48px;
    
    &::placeholder {
      font-size: 16px; /* Required! */
    }
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Required! */
    padding: 10px 34px 10px 40px;
    min-height: 44px;
    
    &::placeholder {
      font-size: 16px; /* Required! */
    }
  }
    @media (max-width: 360px) {
    font-size: 16px; /* Required! */
    padding: 9px 30px 9px 38px;
    min-height: 42px;
    
    &::placeholder {
      font-size: 16px; /* Required! */
    }
  }
`;

// ========================
// BUTTON COMPONENTS
// ========================

// MicButton - perfectly round with emphasis

export const MicButton = styled.button`
  width: 32px;
  height: 32px;
  min-width: 32px;       // Ensures width won't decrease
  min-height: 32px;      // Ensures height won't decrease
  max-width: 32px;       // Ensures width won't increase
  max-height: 32px;      // Ensures height won't increase
  background: ${props => 
    props.isListening 
      ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
      : props.disabled
        ? '#e9ecef'
        : 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'  };
  color: ${props => props.disabled ? '#6c757d' : 'white'};
  border: none;
  border-radius: 50% !important;  // Enhanced with !important
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => 
    props.disabled 
      ? 'none'
      : props.isListening
        ? '0 3px 12px rgba(0, 123, 255, 0.4)'
        : '0 2px 6px rgba(0, 123, 255, 0.3)'
  };
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  padding: 0;              // Removing padding that could interfere
  margin: 0;               // Removing margin that could interfere
  box-sizing: border-box;  // Size includes border
  overflow: hidden;        // Ensures content doesn't overflow
  
  ${props => props.isListening && css`
    animation: ${micPulse} 1.5s ease-in-out infinite;
  `}
  
  &:hover:not(:disabled) {
    transform: translateY(-50%) scale(1.1);
    background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
    box-shadow: ${props => 
      props.isListening
        ? '0 4px 16px rgba(0, 123, 255, 0.5)'
        : '0 3px 10px rgba(0, 123, 255, 0.4)'
    };
  }
  
  &:active:not(:disabled) {
    transform: translateY(-50%) scale(0.95);
  }
    /* Perfect round sizes for mobile */
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
    max-width: 28px;
    max-height: 28px;
    font-size: 0.7rem;
    right: 20px;
    border-radius: 50% !important;  // Additional enforcement
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 480px) {
    width: 26px;
    height: 26px;
    min-width: 26px;
    min-height: 26px;
    max-width: 26px;    max-height: 26px;
    font-size: 0.65rem;
    right: 1px;
    border-radius: 50% !important;  // Additional enforcement
    
    svg {
      width: 15px;
      height: 15px;
    }
  }
  
  @media (max-width: 360px) {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    max-width: 24px;    max-height: 24px;
    font-size: 0.6rem;
    right: 6px;
    border-radius: 50% !important;  // Additional enforcement
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;
export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 600;
  min-height: 52px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  white-space: nowrap;
  backdrop-filter: blur(10px);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #6c757d;
    transform: none;
    box-shadow: 0 2px 8px rgba(108, 117, 125, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    min-height: 48px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
    min-height: 44px;
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    padding: 0 14px;
    min-height: 42px;
    font-size: 0.75rem;
  }
`;

// ========================
// STATUS & ERROR COMPONENTS
// ========================

export const SpeechStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.08), rgba(0, 123, 255, 0.12));
  border: 1px solid rgba(0, 123, 255, 0.2);
  border-radius: 16px;
  margin-bottom: 8px;
  backdrop-filter: blur(10px);
  animation: ${slideIn} 0.3s ease-out;
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    margin-bottom: 6px;
    gap: 8px;
  }
`;

export const SpeechStatusDot = styled.div`
  width: 10px;
  height: 10px;
  background: #007bff;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
`;

export const SpeechStatusText = styled.span`
  font-size: 0.85rem;
  color: #007bff;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.08), rgba(248, 113, 113, 0.12));
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 16px;
  margin-bottom: 8px;
  backdrop-filter: blur(10px);
  animation: ${slideIn} 0.4s ease-out;
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    margin-bottom: 6px;
    gap: 8px;
  }
`;

export const ErrorText = styled.p`
  color: #dc3545;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.3;
  font-weight: 500;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.2;
  }
`;

export const SupportInfo = styled.div`
  font-size: 0.75rem;
  color: #6c757d;
  text-align: center;
  margin-top: 8px;
  font-style: italic;
  font-weight: 400;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-top: 6px;
  }
`;