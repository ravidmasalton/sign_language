import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { FaQuestionCircle, FaTimes } from 'react-icons/fa';
import HelpContent from './HelpContent';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { transform: scale(1); }
`;

const HelpSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: COLORS } = useTheme();
  const location = useLocation();
  const modalRef = useRef(null);
  const currentPath = location.pathname;
  
  // Get current page help content
  const currentPageHelp = HelpContent[currentPath] || HelpContent['/'];
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    // Close modal with ESC key
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);
  
  // Close modal when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Helper function to render list items
  const renderList = (items) => {
    return (
      <List colors={COLORS}>
        {items.map((item, index) => (
          <ListItem key={index} colors={COLORS}>{item}</ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      {/* Floating Help Button */}
      <HelpButton 
        onClick={() => setIsOpen(true)}
        aria-label="Open help"
        colors={COLORS}
      >
        <FaQuestionCircle size={24} />
      </HelpButton>
      
      {/* Help Modal */}
      {isOpen && (
        <>
          <ModalOverlay colors={COLORS} />
          <ModalContainer 
            ref={modalRef}
            colors={COLORS}
          >
            <ModalHeader colors={COLORS}>
              <HeaderIcon>
                {React.createElement(currentPageHelp.icon, { size: 28 })}
              </HeaderIcon>
              <ModalTitle>{currentPageHelp.title}</ModalTitle>
              <CloseButton 
                onClick={() => setIsOpen(false)}
                aria-label="Close help"
                colors={COLORS}
              >
                <FaTimes size={20} />
              </CloseButton>
            </ModalHeader>
            
            <ModalContent>
              {currentPageHelp.description && (
                <Description colors={COLORS}>{currentPageHelp.description}</Description>
              )}
              
              {currentPageHelp.sections.map((section, index) => (
                <Section key={index}>
                  <SectionHeader>
                    <SectionIcon colors={COLORS}>
                      {React.createElement(section.icon, { size: 18 })}
                    </SectionIcon>
                    <SectionTitle>{section.title}</SectionTitle>
                  </SectionHeader>
                  
                  {/* Render array content as list or string content as HTML */}
                  {Array.isArray(section.content) 
                    ? renderList(section.content)
                    : <SectionContent 
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                  }
                </Section>
              ))}
              
              {/* Render troubleshooting section if available */}
              {currentPageHelp.troubleshooting && (
                <TroubleshootingSection colors={COLORS}>
                  <TroubleshootingTitle>
                    {currentPageHelp.troubleshooting.title}
                  </TroubleshootingTitle>
                  {renderList(currentPageHelp.troubleshooting.issues)}
                </TroubleshootingSection>
              )}
              
              {/* Render privacy section if available */}
              {currentPageHelp.privacy && (
                <PrivacySection colors={COLORS}>
                  <PrivacyTitle>{currentPageHelp.privacy.title}</PrivacyTitle>
                  <p>{currentPageHelp.privacy.content}</p>
                </PrivacySection>
              )}
            </ModalContent>
          </ModalContainer>
        </>
      )}
    </>
  );
};

// Styled Components
const HelpButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  z-index: 1000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5);
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  background: ${props => props.colors.card};
  color: ${props => props.colors.text};
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  z-index: 1002;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.4s ease-out;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Glassmorphism effect */
  background: ${props => props.colors.isDarkMode 
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(51, 65, 85, 0.8))'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))'};
  backdrop-filter: blur(12px);
  
  @media (max-width: 768px) {
    width: 95%;
    max-height: 90vh;
    border-radius: 20px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.colors.border};
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 24px 24px 0 0;
`;

const HeaderIcon = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  flex: 1;
  font-size: 1.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const ModalContent = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.5);
    border-radius: 4px;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.colors?.textSecondary || '#4b5563'};
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SectionContent = styled.div`
  padding-left: 44px; /* Aligns with section title */
  
  p {
    margin-top: 0;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  ul, ol {
    margin-top: 0;
    margin-bottom: 16px;
    padding-left: 24px;
    
    li {
      margin-bottom: 8px;
      line-height: 1.5;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      ul, ol {
        margin-top: 8px;
        margin-bottom: 0;
      }
    }
  }
  
  strong {
    font-weight: 600;
    color: #6366f1;
  }
`;

const List = styled.ul`
  list-style-type: disc;
  margin: 0 0 16px 0;
  padding-left: 44px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.6;
  color: ${props => props.colors?.text || 'inherit'};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TroubleshootingSection = styled.div`
  margin-top: 32px;
  padding: 16px 20px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const TroubleshootingTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #ef4444;
  font-size: 1.1rem;
  font-weight: 600;
`;

const PrivacySection = styled.div`
  margin-top: 32px;
  padding: 16px 20px;
  background: rgba(6, 182, 212, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(6, 182, 212, 0.2);
`;

const PrivacyTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #06b6d4;
  font-size: 1.1rem;
  font-weight: 600;
`;

export default HelpSystem;
