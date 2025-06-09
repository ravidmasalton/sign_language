// SignAnimationStyles.js - קובץ העיצוב

import styled, { keyframes, css } from 'styled-components';

// Define keyframes at the top level
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

// תיקון האייקון המסתובב
export const SpinningIcon = styled.div`
  ${css`
    animation: ${spin} 1s linear infinite;
  `}
`;

// Main Container
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #f093fb 50%, 
    #f5576c 75%, 
    #4facfe 100%
  );
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    z-index: -2;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
    ${css`
      animation: ${float} 25s ease-in-out infinite;
    `}
    z-index: -1;
  }
`;

// Header Section
export const Header = styled.header`
  text-align: center;
  margin-bottom: 32px;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    #f8fafc 25%, 
    #e2e8f0 50%, 
    #cbd5e1 75%, 
    #94a3b8 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.02em;
  ${css`
    animation: ${shimmer} 4s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12px;
  font-weight: 500;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const AvailableWordsHint = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  font-weight: 400;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  text-align: center;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

// Search Section
export const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 1;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    left: 16px;
  }
  
  @media (max-width: 480px) {
    left: 14px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 18px 18px 18px 52px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(30px);
  color: #ffffff;
  min-height: 60px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 
      0 0 0 4px rgba(255, 255, 255, 0.1),
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: translateY(-2px) scale(1.01);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 16px 16px 16px 48px;
    min-height: 56px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 14px 14px 14px 44px;
    min-height: 52px;
    border-radius: 18px;
  }
`;

export const SearchButton = styled.button`
  padding: 0 36px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.8) 100%
  );
  color: #4f46e5;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  min-height: 60px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  
  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(255, 255, 255, 0.85) 100%
    );
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px) scale(1.01);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    background: rgba(255, 255, 255, 0.5);
    color: rgba(79, 70, 229, 0.6);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 28px;
    min-height: 56px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0 24px;
    min-height: 52px;
    border-radius: 18px;
  }
`;

// Recent Words Section
export const RecentWordsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
  z-index: 1;
  ${css`
    animation: ${slideIn} 0.6s ease-out;
  `}
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const RecentWordsTitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const RecentWordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const RecentWordButton = styled.button`
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    color: #ffffff;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Error Section
export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 600px;
  padding: 20px 24px;
  background: rgba(248, 113, 113, 0.15);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 20px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(248, 113, 113, 0.1);
  ${css`
    animation: ${slideIn} 0.4s ease-out;
  `}
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 18px 20px;
  }
`;

export const ErrorText = styled.p`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

// Content Section
export const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${css`
    animation: ${slideIn} 0.8s ease-out;
  `}
  z-index: 1;
`;

export const CurrentWordDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* הקטנה מ-28px */
  padding: 20px 24px; /* הקטנה מ-28px 32px */
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.2), 
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px; /* הקטנה מ-24px */
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  ${css`
    animation: ${pulse} 3s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 16px 20px;
    border-radius: 18px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 18px;
    border-radius: 16px;
  }
`;

export const CurrentWordLabel = styled.span`
  font-size: 0.75rem; /* הקטנה מ-1rem */
  color: rgba(255, 255, 255, 0.7); /* שקיפות יותר */
  margin-bottom: 6px; /* הקטנה מ-12px */
  font-weight: 500; /* הקלה מ-600 */
  text-transform: uppercase;
  letter-spacing: 0.5px; /* הקטנה מ-1px */
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const CurrentWord = styled.h2`
  font-size: 1.8rem; /* הקטנה מ-2.8rem */
  font-weight: 700; /* הקלה מ-900 */
  text-align: center;
  margin: 0;
  text-transform: capitalize;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    rgba(255, 255, 255, 0.9) 50%, 
    rgba(255, 255, 255, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* הקטנה מ-4px 12px */
  letter-spacing: -0.01em; /* הקטנה מ--0.02em */
  
  @media (max-width: 768px) {
    font-size: 1.6rem; /* הקטנה מ-2.4rem */
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem; /* הקטנה מ-2rem */
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  max-width: 520px; /* גדול יותר */
  aspect-ratio: 3/4; /* יחס 3:4 - יותר ארוך וגבוה */
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 32px; /* עיגול יותר חלק */
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  
  /* הוספת גלו עדין */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.1), 
      transparent
    );
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 35px 70px -12px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    border-color: rgba(99, 102, 241, 0.3);
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    max-width: 420px;
    border-radius: 28px;
  }
  
  @media (max-width: 480px) {
    max-width: 380px;
    border-radius: 24px;
  }
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px; /* התאמה לעיגול החדש */
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* הסתרת כל הקונטרולים להופעת GIF */
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
  
  /* הסתרת תפריט הקליק הימני */
  &::-webkit-media-controls-enclosure {
    display: none !important;
  }
  
  /* Firefox */
  &::-moz-media-controls {
    display: none !important;
  }
  
  /* הסתרת אטריביוטים שיכולים לחשוף שזה סרטון */
  &[controls] {
    controls: none;
  }
  
  /* הסתרת פוסטר וטעינה */
  &::before {
    display: none;
  }
  
  /* עיגול פנימי חלק */
  @media (max-width: 768px) {
    border-radius: 24px;
  }
  
  @media (max-width: 480px) {
    border-radius: 20px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  width: 100%;
  padding: 24px 28px;
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.15), 
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 
    0 12px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    padding: 20px 24px;
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 18px 20px;
    gap: 14px;
  }
`;

export const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Empty State Section
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 72px 32px;
  width: 100%;
  max-width: 600px;
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.08), 
    rgba(255, 255, 255, 0.04)
  );
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 28px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  ${css`
    animation: ${float} 8s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    padding: 56px 28px;
    border-radius: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 48px 24px;
    border-radius: 20px;
  }
`;

export const EmptyStateIcon = styled.div`
  font-size: 4.5rem;
  margin-bottom: 24px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  ${css`
    animation: ${wave} 3s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 3rem;
    margin-bottom: 16px;
  }
`;

export const EmptyStateText = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 16px;
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const EmptyStateSubText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;