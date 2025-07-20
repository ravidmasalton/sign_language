// SettingsStyles.js
import styled, { keyframes, css } from 'styled-components';

// Modern animations
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

export const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px #007bff40; }
  50% { box-shadow: 0 0 30px #007bff60; }
`;

// Modern styled components
export const ModernContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 2rem;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const ModernTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TitleIcon = styled.span`
  font-size: 2.5rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ModernSettingsGroup = styled.div`
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
`;

export const GroupHeader = styled.div`
  margin-bottom: 1rem;
`;

export const GroupTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const GroupDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

export const SettingsCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const ModernSettingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom: none;
  }

  ${props => props.clickable && css`
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    &:active {
      transform: translateX(2px);
    }
  `}

  ${props => props.danger && css`
    &:hover {
      background: rgba(220, 53, 69, 0.2);
    }
  `}

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`;

export const SettingIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.background || 'rgba(255, 255, 255, 0.2)'};
  margin-right: 1rem;
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
    color: white;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    margin-right: 0.875rem;
  }
`;

export const SettingContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SettingLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.color || 'white'};
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const SettingDescription = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const ModernToggle = styled.button`
  width: 56px;
  height: 32px;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
    : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 16px;
  border: none;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  box-shadow: ${props => props.isActive 
    ? '0 4px 6px rgba(0, 123, 255, 0.3)'
    : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: scale(1.05);
    ${props => props.isActive && css`animation: ${glow} 2s infinite;`}
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ToggleThumb = styled.div`
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 14px;
  position: absolute;
  top: 2px;
  left: ${props => props.isActive ? 'calc(100% - 30px)' : '2px'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

export const ModernSlider = styled.input`
  appearance: none;
  width: 120px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.3);
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.3);
  }
`;

export const SliderValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  min-width: 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
`;

export const VersionBadge = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const ModernModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  ${css`animation: ${fadeIn} 0.3s ease-out;`}
`;

export const ModalCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  ${css`animation: ${slideIn} 0.4s ease-out;`}
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const ModalIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  ${css`animation: ${pulse} 2s infinite;`}
`;

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem 0;
`;

export const ModalMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  min-width: 100px;

  ${props => props.variant === 'primary' ? css`
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
  ` : css`
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'danger' && css`
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: white;
    box-shadow: 0 4px 6px rgba(220, 53, 69, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
  `}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;