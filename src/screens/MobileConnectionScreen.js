import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaWifi, FaTimes, FaSync, FaMobileAlt, FaTabletAlt, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

// Define keyframes at the top level
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const slideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-30px); }
  70% { transform: translateY(-15px); }
  90% { transform: translateY(-4px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const MobileConnectionScreen = () => {
  const { theme: COLORS } = useTheme();
  const navigate = useNavigate();
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [networkInfo, setNetworkInfo] = useState(null);
  const [deviceType, setDeviceType] = useState('');
  
  // Set device type based on screen width
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth <= 480 ? 'mobile' : 'tablet');
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Check connection status when component mounts
  useEffect(() => {
    checkConnection();
    
    // Listen for online/offline events
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);
  
  const handleOnlineStatusChange = () => {
    checkConnection();
  };
  
  const checkConnection = () => {
    setIsCheckingConnection(true);
    setConnectionStatus('checking');
    
    // Simulate network check (in a real app, this would be an actual check)
    setTimeout(() => {
      const online = navigator.onLine;
      
      if (online) {
        // Get more detailed connection info
        const connection = navigator.connection || 
                          navigator.mozConnection || 
                          navigator.webkitConnection;
        
        if (connection) {
          setNetworkInfo({
            type: connection.type || 'unknown',
            effectiveType: connection.effectiveType || 'unknown',
            downlink: connection.downlink,
            rtt: connection.rtt
          });
        }
        
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
      
      setIsCheckingConnection(false);
    }, 1500);
  };
  
  const handleContinue = () => {
    navigate('/camera');
  };
  
  const handleRetry = () => {
    checkConnection();
  };
  
  const getNetworkQualityColor = () => {
    if (!networkInfo) return COLORS?.textSecondary || '#64748b';
    
    const { effectiveType } = networkInfo;
    if (effectiveType === '4g') return COLORS?.success || '#10b981';
    if (effectiveType === '3g') return COLORS?.warning || '#f59e0b';
    return COLORS?.error || '#ef4444'; // 2g or slow-2g
  };
    // Render different content based on connection status
  const renderConnectionContent = () => {
    switch (connectionStatus) {
      case 'checking':
        return (
          <StatusContainer>
            <StatusIcon isSpinning>
              <FaSync size={50} />
            </StatusIcon>
            <StatusTitle>Checking Connection...</StatusTitle>
            <StatusMessage>
              Please wait while we verify your connection
            </StatusMessage>
          </StatusContainer>
        );
        
      case 'connected':
        return (
          <StatusContainer>
            <StatusIcon>
              <FaCheckCircle size={50} style={{ color: '#10b981' }} />
            </StatusIcon>
            <StatusTitle>Connected</StatusTitle>            <StatusMessage>
              Your device is connected to the internet
            </StatusMessage>
            
            {networkInfo && (
              <NetworkInfoContainer>
                <NetworkInfoTitle>
                  <FaWifi size={20} style={{ color: '#10b981' }} />
                  Connection Details
                </NetworkInfoTitle>
                <NetworkInfoContent>
                  <NetworkInfoItem>
                    <NetworkInfoLabel>Type:</NetworkInfoLabel>
                    <NetworkInfoValue>
                      {networkInfo.type === 'wifi' ? 'WiFi' : 
                       networkInfo.type === 'cellular' ? 'Cellular' : 
                       networkInfo.type === 'ethernet' ? 'Ethernet' : 
                       networkInfo.type}
                    </NetworkInfoValue>
                  </NetworkInfoItem>
                  
                  <NetworkInfoItem>
                    <NetworkInfoLabel>Speed:</NetworkInfoLabel>
                    <NetworkInfoValueWithBadge>
                      <NetworkInfoValue>
                        {networkInfo.effectiveType === '4g' ? 'Fast (4G)' :
                         networkInfo.effectiveType === '3g' ? 'Good (3G)' :
                         networkInfo.effectiveType === '2g' ? 'Slow (2G)' :
                         networkInfo.effectiveType === 'slow-2g' ? 'Very Slow' :
                         'Unknown'}
                      </NetworkInfoValue>
                      <NetworkQualityBadge color={getNetworkQualityColor()} />
                    </NetworkInfoValueWithBadge>
                  </NetworkInfoItem>
                  
                  {networkInfo.downlink && (
                    <NetworkInfoItem>
                      <NetworkInfoLabel>Bandwidth:</NetworkInfoLabel>
                      <NetworkInfoValue>
                        {networkInfo.downlink} Mbps
                      </NetworkInfoValue>
                    </NetworkInfoItem>
                  )}
                </NetworkInfoContent>
                
                <InfoTooltip>
                  <FaInfoCircle size={14} style={{ color: '#6366f1' }} />
                  <TooltipText>
                    Connection quality affects translation accuracy
                  </TooltipText>
                </InfoTooltip>
              </NetworkInfoContainer>
            )}
              <Button onClick={handleContinue}>
              Continue to Camera
            </Button>
          </StatusContainer>
        );
        
      case 'disconnected':
        return (
          <StatusContainer>
            <StatusIcon>
              <FaTimes size={50} style={{ color: '#ef4444' }} />
            </StatusIcon>
            <StatusTitle>No Connection</StatusTitle>
            <StatusMessage>
              Please check your internet connection and try again
            </StatusMessage>
            
            <TroubleshootingContainer>
              <TroubleshootingTitle>
                <FaInfoCircle size={16} />
                Troubleshooting Tips
              </TroubleshootingTitle>
              <TroubleshootingList>
                <TroubleshootingItem>
                  Enable WiFi or mobile data on your device
                </TroubleshootingItem>
                <TroubleshootingItem>
                  Check if you're in airplane mode
                </TroubleshootingItem>
                <TroubleshootingItem>
                  Try connecting to a different network
                </TroubleshootingItem>
                <TroubleshootingItem>
                  Restart your device if problems persist
                </TroubleshootingItem>
              </TroubleshootingList>
            </TroubleshootingContainer>
            
            <Button onClick={handleRetry}>
              <FaSync size={16} />
              Try Again
            </Button>
          </StatusContainer>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Container backgroundColor={COLORS?.background}>
      <Header>
        <Title color={COLORS?.text}>Connection Check</Title>
      </Header>
      
      <DeviceIconContainer>
        {deviceType === 'mobile' ? (
          <FaMobileAlt size={32} color={COLORS?.textSecondary} />
        ) : (
          <FaTabletAlt size={32} color={COLORS?.textSecondary} />
        )}
        <ConnectionLine isConnected={connectionStatus === 'connected'} />
        <FaWifi size={32} color={connectionStatus === 'connected' ? (COLORS?.success || '#10b981') : (COLORS?.textSecondary || '#64748b')} />
      </DeviceIconContainer>
      
      {renderConnectionContent()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
  background: ${props => props.backgroundColor || '#f8fafc'};
  position: relative;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 16px;
    min-height: 100dvh;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.08) 0%,
      rgba(139, 92, 246, 0.08) 25%,
      rgba(245, 158, 11, 0.08) 50%,
      rgba(16, 185, 129, 0.08) 75%,
      rgba(239, 68, 68, 0.08) 100%);
    z-index: -2;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle,
      rgba(99, 102, 241, 0.03) 0%,
      transparent 50%);
    ${css`animation: ${float} 15s ease-in-out infinite;`}
    z-index: -1;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ${css`animation: ${shimmer} 3s ease-in-out infinite;`}
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const DeviceIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
    padding: 20px;
  }
`;

const ConnectionLine = styled.div`
  width: 120px;
  height: 4px;
  background: ${props => props.isConnected 
    ? 'linear-gradient(90deg, #10b981, #16a34a)' 
    : 'linear-gradient(90deg, #e5e7eb, #d1d5db)'};
  margin: 0 20px;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border-style: solid;
  }
  
  &::before {
    left: -8px;
    border-width: 6px 0 6px 8px;
    border-color: transparent transparent transparent ${props => props.isConnected ? '#10b981' : '#d1d5db'};
    transform: translateY(-50%);
  }
  
  &::after {
    right: -8px;
    border-width: 6px 8px 6px 0;
    border-color: transparent ${props => props.isConnected ? '#16a34a' : '#d1d5db'} transparent transparent;
    transform: translateY(-50%);
  }
  
  @media (max-width: 768px) {
    width: 80px;
    margin: 0 16px;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  z-index: 1;
`;

const StatusIcon = styled.div`
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  ${css`animation: ${props => props.isSpinning 
    ? `${spin} 2s linear infinite, ${pulse} 1.5s ease-in-out infinite`
    : `${bounce} 2s ease-in-out infinite`};`}
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding: 16px;
  }
`;

const StatusTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.color || '#1e293b'};
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const StatusMessage = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color || '#64748b'};
  text-align: center;
  margin-bottom: 32px;
  font-weight: 500;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const NetworkInfoContainer = styled.div`
  width: 100%;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  margin-bottom: 24px;
  position: relative;
  ${css`animation: ${slideIn} 0.6s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

const NetworkInfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.color || '#1e293b'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 14px;
  }
`;

const NetworkInfoContent = styled.div`
  margin-bottom: 12px;
`;

const NetworkInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const NetworkInfoLabel = styled.span`
  font-size: 0.95rem;
  color: ${props => props.color || '#64748b'};
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NetworkInfoValue = styled.span`
  font-size: 0.95rem;
  color: ${props => props.color || '#1e293b'};
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NetworkInfoValueWithBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NetworkQualityBadge = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 8px ${props => props.color}40;
  ${css`animation: ${pulse} 2s ease-in-out infinite;`}
`;

const InfoTooltip = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  margin-top: 16px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
`;

const TooltipText = styled.span`
  color: ${props => props.color || '#475569'};
  margin-left: 8px;
  font-weight: 500;
`;

const TroubleshootingContainer = styled.div`
  width: 100%;
  padding: 24px;
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  margin-bottom: 24px;
  ${css`animation: ${slideIn} 0.6s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

const TroubleshootingTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.color || '#dc2626'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 14px;
  }
`;

const TroubleshootingList = styled.ul`
  padding-left: 24px;
  margin: 0;
  list-style: none;
  position: relative;
`;

const TroubleshootingItem = styled.li`
  font-size: 0.95rem;
  color: ${props => props.color || '#475569'};
  margin-bottom: 12px;
  position: relative;
  font-weight: 500;
  line-height: 1.5;
  
  &:before {
    content: '→';
    position: absolute;
    left: -20px;
    color: #dc2626;
    font-weight: 700;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 56px;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
    background: linear-gradient(135deg, #5855f7, #7c3aed);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 0.95rem;
    min-height: 52px;
  }
`;

export default MobileConnectionScreen;