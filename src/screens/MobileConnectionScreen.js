import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaWifi, FaTimes, FaSync, FaMobileAlt, FaTabletAlt, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

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
    if (!networkInfo) return COLORS.textSecondary;
    
    const { effectiveType } = networkInfo;
    if (effectiveType === '4g') return COLORS.success;
    if (effectiveType === '3g') return COLORS.warning;
    return COLORS.error; // 2g or slow-2g
  };
  
  // Render different content based on connection status
  const renderConnectionContent = () => {
    switch (connectionStatus) {
      case 'checking':
        return (
          <StatusContainer>
            <StatusIcon isSpinning>
              <FaSync size={50} color={COLORS.primary} />
            </StatusIcon>
            <StatusTitle color={COLORS.text}>Checking Connection...</StatusTitle>
            <StatusMessage color={COLORS.textSecondary}>
              Please wait while we verify your connection
            </StatusMessage>
          </StatusContainer>
        );
        
      case 'connected':
        return (
          <StatusContainer>
            <StatusIcon>
              <FaCheckCircle size={50} color={COLORS.success} />
            </StatusIcon>
            <StatusTitle color={COLORS.text}>Connected</StatusTitle>
            <StatusMessage color={COLORS.textSecondary}>
              Your device is connected to the internet
            </StatusMessage>
            
            {networkInfo && (
              <NetworkInfoContainer backgroundColor={COLORS.card} borderColor={COLORS.border}>
                <NetworkInfoTitle color={COLORS.text}>
                  Connection Details
                </NetworkInfoTitle>
                <NetworkInfoContent>
                  <NetworkInfoItem>
                    <NetworkInfoLabel color={COLORS.textSecondary}>Type:</NetworkInfoLabel>
                    <NetworkInfoValue color={COLORS.text}>
                      {networkInfo.type === 'wifi' ? 'WiFi' : 
                       networkInfo.type === 'cellular' ? 'Cellular' : 
                       networkInfo.type === 'ethernet' ? 'Ethernet' : 
                       networkInfo.type}
                    </NetworkInfoValue>
                  </NetworkInfoItem>
                  
                  <NetworkInfoItem>
                    <NetworkInfoLabel color={COLORS.textSecondary}>Speed:</NetworkInfoLabel>
                    <NetworkInfoValueWithBadge>
                      <NetworkInfoValue color={COLORS.text}>
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
                      <NetworkInfoLabel color={COLORS.textSecondary}>Bandwidth:</NetworkInfoLabel>
                      <NetworkInfoValue color={COLORS.text}>
                        {networkInfo.downlink} Mbps
                      </NetworkInfoValue>
                    </NetworkInfoItem>
                  )}
                </NetworkInfoContent>
                
                <InfoTooltip>
                  <FaInfoCircle size={14} color={COLORS.textSecondary} />
                  <TooltipText color={COLORS.textSecondary}>
                    Connection quality affects translation accuracy
                  </TooltipText>
                </InfoTooltip>
              </NetworkInfoContainer>
            )}
            
            <Button 
              backgroundColor={COLORS.primary}
              onClick={handleContinue}
            >
              Continue to Camera
            </Button>
          </StatusContainer>
        );
        
      case 'disconnected':
        return (
          <StatusContainer>
            <StatusIcon>
              <FaTimes size={50} color={COLORS.error} />
            </StatusIcon>
            <StatusTitle color={COLORS.text}>No Connection</StatusTitle>
            <StatusMessage color={COLORS.textSecondary}>
              Please check your internet connection and try again
            </StatusMessage>
            
            <TroubleshootingContainer backgroundColor={COLORS.card} borderColor={COLORS.border}>
              <TroubleshootingTitle color={COLORS.text}>Troubleshooting Tips</TroubleshootingTitle>
              <TroubleshootingList>
                <TroubleshootingItem color={COLORS.text}>
                  Enable WiFi or mobile data on your device
                </TroubleshootingItem>
                <TroubleshootingItem color={COLORS.text}>
                  Check if you're in airplane mode
                </TroubleshootingItem>
                <TroubleshootingItem color={COLORS.text}>
                  Try connecting to a different network
                </TroubleshootingItem>
                <TroubleshootingItem color={COLORS.text}>
                  Restart your device if problems persist
                </TroubleshootingItem>
              </TroubleshootingList>
            </TroubleshootingContainer>
            
            <Button 
              backgroundColor={COLORS.primary}
              onClick={handleRetry}
            >
              <FaSync size={16} style={{ marginRight: '8px' }} />
              Try Again
            </Button>
          </StatusContainer>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Container backgroundColor={COLORS.background}>
      <Header>
        <Title color={COLORS.text}>Connection Check</Title>
      </Header>
      
      <DeviceIconContainer>
        {deviceType === 'mobile' ? (
          <FaMobileAlt size={32} color={COLORS.textSecondary} />
        ) : (
          <FaTabletAlt size={32} color={COLORS.textSecondary} />
        )}
        <ConnectionLine isConnected={connectionStatus === 'connected'} />
        <FaWifi size={32} color={connectionStatus === 'connected' ? COLORS.success : COLORS.textSecondary} />
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
  background-color: ${props => props.backgroundColor};
  
  @media (max-width: 768px) {
    padding: 16px;
    min-height: 100dvh;
  }
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const DeviceIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const ConnectionLine = styled.div`
  width: 100px;
  height: 3px;
  background-color: ${props => props.isConnected ? '#34A853' : '#E0E0E0'};
  margin: 0 16px;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
  }
  
  &::before {
    left: 0;
    border-width: 6px 0 6px 8px;
    border-color: transparent transparent transparent ${props => props.isConnected ? '#34A853' : '#E0E0E0'};
    transform: translateX(-50%) translateY(-50%);
  }
  
  &::after {
    right: 0;
    border-width: 6px 0 6px 8px;
    border-color: transparent transparent transparent ${props => props.isConnected ? '#34A853' : '#E0E0E0'};
    transform: translateX(50%) translateY(-50%);
  }
  
  @media (max-width: 768px) {
    width: 60px;
    margin: 0 12px;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const StatusIcon = styled.div`
  margin-bottom: 24px;
  animation: ${props => props.isSpinning ? 'spin 2s linear infinite' : 'none'};
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const StatusTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.color};
  margin-bottom: 8px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StatusMessage = styled.p`
  font-size: 1rem;
  color: ${props => props.color};
  text-align: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const NetworkInfoContainer = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  margin-bottom: 24px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 20px;
  }
`;

const NetworkInfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const NetworkInfoContent = styled.div`
  margin-bottom: 8px;
`;

const NetworkInfoItem = styled.div`
  display: flex;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const NetworkInfoLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.color};
  width: 100px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    width: 80px;
  }
`;

const NetworkInfoValue = styled.span`
  font-size: 0.9rem;
  color: ${props => props.color};
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
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
`;

const InfoTooltip = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-top: 12px;
`;

const TooltipText = styled.span`
  color: ${props => props.color};
  margin-left: 6px;
`;

const TroubleshootingContainer = styled.div`
  width: 100%;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 20px;
  }
`;

const TroubleshootingTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const TroubleshootingList = styled.ul`
  padding-left: 20px;
  margin: 0;
`;

const TroubleshootingItem = styled.li`
  font-size: 0.9rem;
  color: ${props => props.color};
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
  min-height: 44px;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    font-size: 0.95rem;
  }
`;

export default MobileConnectionScreen;
