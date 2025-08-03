// LoginScreenStyles.js - DESIGN ONLY (NO LOGIC)

import styled, { keyframes, css } from 'styled-components';

// ========================
// KEYFRAMES ANIMATIONS
// ========================

export const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export const wave = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

// ========================
// MAIN LAYOUT CONTAINERS
// ========================

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: ${props => props.COLORS?.background || '#f8fafc'};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 100dvh; /* Better mobile viewport support */
  }

  /* Animated gradient background overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.1) 0%,
      rgba(139, 92, 246, 0.1) 25%,
      rgba(245, 158, 11, 0.1) 50%,
      rgba(16, 185, 129, 0.1) 75%,
      rgba(239, 68, 68, 0.1) 100%);
    z-index: -2;
  }
`;

// ========================
// FLOATING BACKGROUND SHAPES
// ========================

export const FloatingShape = styled.div`
  position: absolute;
  z-index: -1;
`;

export const FloatingCircle1 = styled(FloatingShape)`
  top: 10%;
  left: 10%;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  ${css`animation: ${float} 6s ease-in-out infinite;`}
`;

export const FloatingRect1 = styled(FloatingShape)`
  top: 20%;
  right: 15%;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f59e0b, #10b981);
  border-radius: 20px;
  ${css`animation: ${float} 8s ease-in-out infinite reverse;`}
`;

export const FloatingCircle2 = styled(FloatingShape)`
  bottom: 20%;
  left: 20%;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #ef4444, #6366f1);
  border-radius: 30px;
  ${css`animation: ${float} 10s ease-in-out infinite;`}
`;

// ========================
// MAIN CARD CONTAINER
// ========================

export const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px); /* Glassmorphism effect */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 450px;

  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 20px;
    margin: 20px 0;
  }

  @media (max-width: 480px) {
    padding: 28px 20px;
    border-radius: 16px;
  }
`;

// ========================
// HEADER SECTION COMPONENTS
// ========================

export const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 28px;
  }
`;

export const WaveIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
  ${css`animation: ${wave} 2s ease-in-out infinite;`}

  @media (max-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 12px;
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// ========================
// FORM COMPONENTS
// ========================

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 16px; /* Important: minimum 16px to prevent zoom on iOS */
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #1e293b;

  /* Focus states */
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  /* Floating label animation when focused */
  &:focus + label {
    transform: translateY(-28px) translateX(4px) scale(0.8);
    color: #6366f1;
    font-weight: 600;
  }

  /* Floating label animation when has content */
  &:not(:placeholder-shown) + label {
    transform: translateY(-28px) translateX(4px) scale(0.8);
    color: #6366f1;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 18px 18px;
    border-radius: 14px;
    min-height: 56px;
    font-size: 16px; /* Required for iOS to prevent zoom */
  }
`;

export const Label = styled.label`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #64748b;
  font-size: 16px;
  font-weight: 500;
  pointer-events: none; /* Allows clicking through to input */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;

  @media (max-width: 768px) {
    left: 18px;
    font-size: 15px;
  }
`;

// ========================
// ERROR MESSAGE COMPONENTS
// ========================

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(248, 113, 113, 0.1));
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 14px 18px;
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

// ========================
// BUTTON COMPONENTS
// ========================

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 14px;
  }
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 24px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  min-height: 56px;

  /* Hover effects */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
  }

  &:active {
    transform: translateY(0);
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 16px 22px;
    border-radius: 14px;
    min-height: 52px;
  }
`;

export const SignupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 24px;
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 2px solid rgba(245, 158, 11, 0.3);
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 56px;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(245, 158, 11, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.2);
  }

  @media (max-width: 768px) {
    padding: 16px 22px;
    border-radius: 14px;
    min-height: 52px;
  }
`;

// ========================
// LOADING COMPONENTS
// ========================

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(99, 102, 241, 0.1);
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
`;

export const LoadingText = styled.p`
  margin: 0;
  color: #6366f1;
  font-size: 14px;
  font-weight: 500;
  ${css`animation: ${pulse} 2s ease-in-out infinite;`}
`;

// ========================
// DIVIDER COMPONENTS
// ========================

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0;

  /* Create line effect with pseudo elements */
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  }
`;

export const DividerText = styled.span`
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`;

// ========================
// SOCIAL LOGIN COMPONENTS
// ========================

export const SocialButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Single column on small screens */
    gap: 12px;
  }
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 13px;
  }
`;

export const SocialIcon = styled.span`
  font-size: 1rem;
`;

// ========================
// FOOTER COMPONENTS
// ========================

export const FooterText = styled.p`
  margin-top: 32px;
  color: #64748b;
  font-size: 14px;
  text-align: center;
  font-weight: 500;

  @media (max-width: 768px) {
    margin-top: 24px;
    font-size: 13px;
  }
`;