// HomeScreenStyles.js - DESIGN ONLY (NO LOGIC)

import styled, { keyframes, css } from 'styled-components';

// ========================
// KEYFRAMES ANIMATIONS
// ========================

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
`;

export const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.8; transform: scale(1.1) rotate(180deg); }
`;

// ========================
// MAIN LAYOUT CONTAINERS
// ========================

export const ModernContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.COLORS?.gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)'};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px; /* Reduced spacing for minimal design */
  ${css`animation: ${fadeIn} 0.8s ease-out;`}

  @media (max-width: 768px) {
    padding: 8px;
    min-height: 100dvh; /* Better mobile viewport support */
  }
`;

export const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 16px; /* Compact spacing */
  ${css`animation: ${slideIn} 1s ease-out 0.2s both;`}

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

export const LogoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  ${css`animation: ${float} 3s ease-in-out infinite;`}

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const ModernLogo = styled.div`
  width: 80px; /* Compact logo size */
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px); /* Glassmorphism effect */

  /* Animated shimmer effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
    ${css`animation: ${sparkle} 3s infinite;`}
  }

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    font-size: 1.6rem;
  }
`;

// ========================
// TYPOGRAPHY COMPONENTS
// ========================

export const MainTitle = styled.h1`
  font-size: 2rem; /* Compact title size */
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Depth effect */

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px 0;
  max-width: 480px;
  line-height: 1.4;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

// ========================
// FEATURES GRID LAYOUT
// ========================

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); /* Responsive grid */
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column on mobile */
    gap: 8px;
    margin-bottom: 16px;
  }
`;

export const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px); /* Glassmorphism */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Smooth animation curve */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'}; /* Staggered animations */

  /* Top accent border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  /* Hover effects */
  &:hover {
    transform: translateY(-4px); /* Lift effect */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.98);

    &::before {
      transform: scaleX(1); /* Reveal accent border */
    }

    /* Enhanced hover for primary card */
    ${props => props.primary && css`
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3), 0 0 20px rgba(99, 102, 241, 0.2);
      background: rgba(255, 255, 255, 0.98);
    `}
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FeatureIconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: all 0.3s ease;

  svg {
    font-size: 1.4rem;
    color: white;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1e293b;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// ========================
// INFO SECTION COMPONENTS
// ========================

export const InfoSection = styled.div`
  width: 100%;
  max-width: 480px;
  ${css`animation: ${slideIn} 1s ease-out 0.6s both;`}
`;

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

export const InfoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
`;

export const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.4;
`;

export const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  flex-shrink: 0; /* Prevent icon from shrinking */
  margin-top: 0.125rem;
`;

// ========================
// CALL TO ACTION COMPONENTS
// ========================

export const CallToAction = styled.div`
  text-align: center;
  margin-top: 16px;
  ${css`animation: ${slideIn} 1s ease-out 0.8s both;`}
`;

export const CTAText = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;