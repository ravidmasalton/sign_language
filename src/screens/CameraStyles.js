// CameraStyles.js - Optimized while keeping perfect responsive design
import styled, { keyframes, css } from 'styled-components';

// ======================
// ANIMATIONS (Performance optimized)
// ======================
export const fadeIn = keyframes`
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale3d(1, 1, 1); }
  50%      { transform: scale3d(1.05, 1.05, 1); }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ======================
// RESPONSIVE SYSTEM (Consolidated)
// ======================
const breakpoints = {
  xs: '320px',
  sm: '480px', 
  md: '600px',
  tablet: '767px',
  lg: '1024px'
};

// Responsive utility functions
const mobile = `@media (max-width: ${breakpoints.sm})`;
const smallTablet = `@media (max-width: ${breakpoints.tablet}) and (min-width: calc(${breakpoints.sm} + 1px))`;
const tablet = `@media (max-width: ${breakpoints.lg}) and (min-width: calc(${breakpoints.tablet} + 1px))`;
const desktop = `@media (min-width: calc(${breakpoints.lg} + 1px))`;
const verySmall = `@media (max-width: ${breakpoints.xs})`;

// Stack breakpoint for side-by-side layouts
const stackBelow = `@media (max-width: ${breakpoints.md})`;
const sideByAbove = `@media (min-width: calc(${breakpoints.md} + 1px))`;

// ======================
// THEME SYSTEM
// ======================
const theme = {
  colors: {
    dark: '#121212',
    light: '#e0e0e0',
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    danger: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
    white: '#ffffff',
    border: '#e9ecef',
    text: '#212529',
    textLight: '#6c757d',
    success: '#4ade80',
    panelBg: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
  },
  shadows: {
    light: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 2px 8px rgba(102, 126, 234, 0.2)',
    danger: '0 2px 6px rgba(220, 53, 69, 0.2)',
    panel: '0 -1px 8px rgba(0, 0, 0, 0.06)'
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease'
  }
};

// ======================
// MAIN LAYOUT COMPONENTS
// ======================
export const ModernCameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.dark};
  color: ${theme.colors.light};
  user-select: none;
  overflow: hidden;
  padding: 4px;
  box-sizing: border-box;
  animation: ${fadeIn} 0.4s ease-out;
  
  /* Modern viewport units with fallback */
  @supports (height: 100dvh) {
    height: 100dvh;
  }
  
  ${mobile} {
    height: 100vh;
    margin-top: 0;
    position: relative;
  }
`;

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 4px;
  padding: 0;
  margin: 0;
  
  ${mobile} {
    height: 100%;
    gap: 2px;
  }
`;

// ======================
// CAMERA SECTION
// ======================
export const CameraSection = styled.div`
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
  background: #000;
  border-radius: 8px;
  box-shadow: ${theme.shadows.light};
  flex-shrink: 0;
  
  ${mobile} {
    height: 65vh;
    border-radius: 6px;
  }
  
  ${verySmall} {
    height: 60vh;
    border-radius: 4px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
`;

export const LiveVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  border-radius: inherit;
`;

export const ModernCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  border-radius: inherit;
  
  /* Hardware acceleration */
  transform: translateZ(0);
  will-change: transform;
`;

// ======================
// LOADING COMPONENTS
// ======================
export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  z-index: 10;
  border-radius: inherit;
  backdrop-filter: blur(4px);
`;

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.div`
  color: #fff;
  font-size: 0.7rem;
  
  ${mobile} {
    font-size: 0.65rem;
  }
`;

// ======================
// CONTROLS PANEL
// ======================
export const ControlsPanel = styled.div`
  flex: 1;
  min-height: 120px;
  background: ${theme.colors.panelBg};
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  border-radius: 8px;
  box-shadow: ${theme.shadows.panel};
  color: ${theme.colors.text};
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  
  /* Tablet screens */
  ${tablet} {
    min-height: 110px;
    padding: 7px;
    gap: 7px;
  }
  
  /* Mobile landscape and small tablets */
  ${smallTablet} {
    min-height: 100px;
    max-height: 45vh;
    padding: 6px;
    gap: 6px;
    border-radius: 6px;
  }
  
  /* Mobile portrait */
  ${mobile} {
    min-height: 85px;
    max-height: 50vh;
    padding: 5px;
    gap: 5px;
    border-radius: 4px;
  }
  
  /* Very small screens */
  ${verySmall} {
    min-height: 75px;
    max-height: 55vh;
    padding: 4px;
    gap: 4px;
  }
`;

// ======================
// SIDE-BY-SIDE LAYOUT (Main responsive container)
// ======================
export const SideBySideRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  width: 100%;
  
  ${tablet} {
    gap: 10px;
    margin-bottom: 10px;
  }
  
  ${smallTablet} {
    gap: 8px;
    margin-bottom: 8px;
  }
  
  /* Stack vertically on mobile screens */
  ${stackBelow} {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  ${mobile} {
    gap: 6px;
    margin-bottom: 6px;
  }
`;

// ======================
// PREDICTION COMPONENTS (Unified responsive design)
// ======================
export const PredictionSide = styled.div`
  flex: 1;
  background: ${theme.colors.primary};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: ${theme.shadows.medium};
  min-height: 60px;
  
  ${tablet} {
    padding: 14px;
    border-radius: 10px;
    min-height: 56px;
  }
  
  ${smallTablet} {
    padding: 12px;
    border-radius: 8px;
    min-height: 52px;
  }
  
  ${stackBelow} {
    padding: 12px;
    border-radius: 8px;
    min-height: 48px;
  }
  
  ${mobile} {
    padding: 10px;
    border-radius: 6px;
    min-height: 44px;
  }
  
  ${verySmall} {
    padding: 8px;
    border-radius: 4px;
    min-height: 40px;
  }
`;

export const PredictionContent = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-right: 12px;
  word-wrap: break-word;
  
  ${tablet} {
    font-size: 0.9rem;
    padding: 7px 11px;
    margin-right: 10px;
  }
  
  ${smallTablet} {
    font-size: 0.85rem;
    padding: 6px 10px;
    margin-right: 8px;
    border-radius: 6px;
  }
  
  ${stackBelow} {
    font-size: 0.85rem;
    padding: 6px 10px;
    margin-right: 8px;
    border-radius: 6px;
  }
  
  ${mobile} {
    font-size: 0.8rem;
    padding: 5px 8px;
    margin-right: 6px;
    border-radius: 4px;
  }
  
  ${verySmall} {
    font-size: 0.75rem;
    padding: 4px 6px;
    margin-right: 4px;
  }
`;

// ======================
// CIRCULAR PROGRESS (Unified)
// ======================
export const PredictionCircularProgress = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${tablet} {
    width: 36px;
    height: 36px;
  }
  
  ${smallTablet} {
    width: 32px;
    height: 32px;
  }
  
  ${stackBelow} {
    width: 32px;
    height: 32px;
  }
  
  ${mobile} {
    width: 28px;
    height: 28px;
  }
  
  ${verySmall} {
    width: 24px;
    height: 24px;
  }
`;

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
  stroke: ${props => props.$isActive ? theme.colors.success : 'rgba(255, 255, 255, 0.7)'};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: ${props => props.$circumference};
  stroke-dashoffset: ${props => props.$circumference - (props.$progress / 100) * props.$circumference};
  transition: ${props => props.$isActive ? 
    `stroke ${theme.transitions.fast}` : 
    `stroke-dashoffset ${theme.transitions.normal}, stroke ${theme.transitions.fast}`
  };
`;

export const CircularProgressText = styled.span`
  position: absolute;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${props => props.$isActive ? theme.colors.success : 'rgba(255, 255, 255, 0.7)'};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  ${mobile} {
    font-size: 0.6rem;
  }
  
  ${verySmall} {
    font-size: 0.5rem;
  }
`;

// ======================
// TRANSLATION COMPONENTS (Unified)
// ======================
export const TranslationSide = styled.div`
  flex: 1;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${theme.shadows.light};
  min-height: 60px;
  display: flex;
  flex-direction: column;
  
  ${tablet} {
    padding: 14px;
    border-radius: 10px;
    min-height: 56px;
  }
  
  ${smallTablet} {
    padding: 12px;
    border-radius: 8px;
    min-height: 52px;
  }
  
  ${stackBelow} {
    padding: 12px;
    border-radius: 8px;
    min-height: 48px;
  }
  
  ${mobile} {
    padding: 10px;
    border-radius: 6px;
    min-height: 44px;
  }
  
  ${verySmall} {
    padding: 8px;
    border-radius: 4px;
    min-height: 40px;
  }
`;

export const TranslationSideHeader = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.textLight};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  ${tablet} {
    font-size: 0.78rem;
    margin-bottom: 7px;
  }
  
  ${smallTablet} {
    font-size: 0.75rem;
    margin-bottom: 6px;
  }
  
  ${stackBelow} {
    font-size: 0.75rem;
    margin-bottom: 6px;
  }
  
  ${mobile} {
    font-size: 0.7rem;
    margin-bottom: 5px;
  }
  
  ${verySmall} {
    font-size: 0.65rem;
    margin-bottom: 4px;
  }
`;

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
  overflow-wrap: break-word;
  hyphens: auto;
  
  ${tablet} {
    font-size: 0.9rem;
    min-height: 22px;
  }
  
  ${smallTablet} {
    font-size: 0.85rem;
    min-height: 20px;
  }
  
  ${stackBelow} {
    font-size: 0.85rem;
    min-height: 20px;
  }
  
  ${mobile} {
    font-size: 0.8rem;
    min-height: 18px;
    line-height: 1.3;
  }
  
  ${verySmall} {
    font-size: 0.75rem;
    min-height: 16px;
    line-height: 1.2;
  }
`;

// ======================
// BUTTON COMPONENTS (Unified responsive)
// ======================
export const ClearButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
  
  ${mobile} {
    margin-top: 2px;
  }
`;

export const ClearButtonSideBySide = styled.button`
  background: ${theme.colors.danger};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.danger};
  min-height: 36px;
  min-width: 100px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  /* Focus for accessibility */
  &:focus {
    outline: 2px solid ${theme.colors.success};
    outline-offset: 2px;
  }
  
  /* Hover only on devices that support it */
  @media (hover: hover) {
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 3px 8px rgba(220, 53, 69, 0.3);
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: all ${theme.transitions.fast};
  }
  
  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: ${theme.shadows.danger};
    opacity: 0.6;
  }
  
  ${tablet} {
    padding: 9px 22px;
    font-size: 0.83rem;
    min-height: 34px;
    border-radius: 7px;
  }
  
  ${smallTablet} {
    padding: 8px 20px;
    font-size: 0.8rem;
    min-height: 32px;
    min-width: 90px;
    border-radius: 6px;
    
    @media (hover: hover) {
      &:hover {
        transform: none;
        box-shadow: ${theme.shadows.danger};
      }
    }
  }
  
  ${stackBelow} {
    padding: 8px 20px;
    font-size: 0.8rem;
    min-height: 32px;
    min-width: 90px;
    border-radius: 6px;
    
    @media (hover: hover) {
      &:hover {
        transform: none;
        box-shadow: ${theme.shadows.danger};
      }
    }
  }
  
  ${mobile} {
    padding: 7px 18px;
    font-size: 0.75rem;
    min-height: 30px;
    min-width: 80px;
    border-radius: 4px;
    
    @media (hover: hover) {
      &:hover {
        transform: none;
        box-shadow: ${theme.shadows.danger};
      }
    }
  }
  
  ${verySmall} {
    padding: 6px 16px;
    font-size: 0.7rem;
    min-height: 28px;
    min-width: 70px;
  }
`;

// ======================
// BACKWARDS COMPATIBILITY ALIASES
// (All components point to the unified versions above)
// ======================

// Legacy prediction components
export const PredictionPanel = PredictionSide;
export const PredictionDisplay = PredictionContent;
export const PredictionCompact = PredictionContent;

// Legacy translation components  
export const TranslationPanel = TranslationSide;
export const TranslationText = TranslationSideText;
export const TranslationTextBox = TranslationSideText;
export const TranslationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
  
  ${mobile} {
    gap: 1px;
  }
`;

// Legacy progress components
export const CircularProgress = PredictionCircularProgress;
export const CircularProgressCompact = PredictionCircularProgress;

// Legacy button components
export const InlineButton = ClearButtonSideBySide;
export const ClearButtonCompact = ClearButtonSideBySide;

// Legacy header components
export const PredictionHeader = TranslationSideHeader;
export const TranslationHeader = TranslationSideHeader;

// Additional legacy components
export const BufferText = styled.div`
  font-size: 0.5rem;
  color: ${props => props.$isActive ? theme.colors.success : 'rgba(255, 255, 255, 0.7)'};
  font-weight: 500;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  ${mobile} {
    font-size: 0.45rem;
  }
`;

// Unused legacy layout components (kept for compatibility but point to main components)
export const TopRow = SideBySideRow;
export const TranslationSection = styled.div`
  margin-bottom: 8px;
  width: 100%;
  
  ${smallTablet} {
    margin-bottom: 6px;
  }
  
  ${mobile} {
    margin-bottom: 5px;
  }
  
  ${verySmall} {
    margin-bottom: 4px;
  }
`;
export const ButtonRow = ClearButtonRow;
export const ButtonIcon = styled.span`
  font-size: 0.55rem;
  
  ${mobile} {
    font-size: 0.35rem;
  }
  
  ${verySmall} {
    font-size: 0.3rem;
  }
`;

// ======================
// UTILITY COMPONENTS
// ======================
export const VisuallyHidden = styled.span`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`;