// VideoUploadStyles.js
import styled, { keyframes, css } from 'styled-components';

// Define animations
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

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: ${props => props.backgroundColor};
  min-height: 100%;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 8px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${props => props.color};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const TitleIcon = styled.span`
  ${css`animation: ${pulse} 2s infinite;`}
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FormCard = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  ${css`animation: ${slideIn} 0.6s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const FileUploadArea = styled.div`
  border: 2px dashed ${props => props.borderColor};
  border-radius: 12px;
  background-color: ${props => props.backgroundColor};
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${props => props.hasFile ? props.borderColor : props.theme.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    min-height: 160px;
  }
`;

export const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const UploadIcon = styled.div`
  color: ${props => props.theme.primary};
  margin-bottom: 8px;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

export const UploadText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const UploadHint = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const VideoPreviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const VideoPreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const VideoPreview = styled.video`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  
  ${VideoPreviewWrapper}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

export const VideoFileName = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const VideoFileSize = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const InputIcon = styled.span`
  color: ${props => props.theme.primary};
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 12px 16px;
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primaryLight};
  }
  
  &::placeholder {
    color: ${props => props.theme.textMuted};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 14px;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  
  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`;

export const ErrorIcon = styled.span`
  color: ${props => props.theme.error};
`;

export const ErrorText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  
  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`;

export const StatusIcon = styled.span`
  color: ${props => props.color};
`;

export const SpinnerIcon = styled.span`
  color: ${props => props.theme.info};
  ${css`animation: ${spin} 1s linear infinite;`}
`;

export const StatusText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressLabel = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${props => props.theme.surface};
  border-radius: 6px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 10px;
  }
`;

export const ProgressFill = styled.div`
  width: ${props => props.width};
  height: 100%;
  background-color: ${props => props.backgroundColor};
  border-radius: 6px;
  transition: width 0.3s ease;
`;

export const ResultsCard = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  padding: 16px;
  ${css`animation: ${slideIn} 0.4s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const ResultsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
`;

export const ResultItem = styled.div`
  text-align: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  
  @media (max-width: 768px) {
    padding: 6px;
  }
`;

export const ResultLabel = styled.p`
  font-size: 0.8rem;
  color: ${props => props.color};
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const ResultValue = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.color};
  font-family: 'Courier New', monospace;
  word-break: break-all;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const FileStructure = styled.div`
  background: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FileStructureTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 6px;
  }
`;

export const FileStructureItem = styled.p`
  font-size: 0.8rem;
  color: ${props => props.color};
  font-family: 'Courier New', monospace;
  margin-bottom: 4px;
  word-break: break-all;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    gap: 12px;
    flex-direction: column;
  }
`;

export const Button = styled.button`
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 8px;
  border: ${props => props.borderColor ? `1px solid ${props.borderColor}` : 'none'};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 16px;
  }
`;

export const HelpCard = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  padding: 20px;
  margin-top: 8px;
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const HelpTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

export const HelpText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  margin-bottom: 8px;
  position: relative;
  padding-left: 16px;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${props => props.theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 6px;
  }
`;

export const DebugLogsContainer = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 6px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  
  @media (max-width: 768px) {
    max-height: 150px;
    font-size: 0.75rem;
  }
`;

export const DebugLogItem = styled.div`
  color: ${props => props.color};
  margin-bottom: 4px;
  word-wrap: break-word;
  
  &:last-child {
    margin-bottom: 0;
  }
`;