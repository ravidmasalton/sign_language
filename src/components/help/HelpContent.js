import React from 'react';
import styled from 'styled-components';
import {
  FaHome,
  FaCamera,
  FaHandPaper,
  FaUpload,
  FaSignLanguage,
  FaCog,
  FaInfoCircle,
  FaCheckCircle,
  FaLightbulb,
  FaVideo,
  FaFileVideo,
  FaUsers,
  FaExclamationTriangle,
  FaPlay,
  FaList,
  FaCloudUploadAlt,
  FaUser
} from 'react-icons/fa';
 
// Styled Components (keeping existing ones)
const Section = styled.div`
  margin-bottom: 2rem;
`;
 
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#E1E1E1' : '#2C3E50'};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
 
const SubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#D1D1D1' : '#34495E'};
  margin: 1.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
 
const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#CCCCCC' : '#444444'};
  margin: 0.5rem 0;
`;
 
const List = styled.ul`
  padding-left: 1.5rem;
  margin: 0.5rem 0;
`;
 
const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#CCCCCC' : '#444444'};
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
 
  svg {
    flex-shrink: 0;
    color: ${props => props.theme === 'dark' ? '#6C757D' : '#6C757D'};
  }
`;
 
const FeatureBox = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;
 
const HelpContent = {
  // HOME PAGE
  "/": {
    icon: FaHome,
    title: "Sign Language Recognition App",
    description: "Translate sign language to text and learn ASL through interactive features.",
    sections: [
      {
        title: "Available Features",
        icon: FaInfoCircle,
        content: [
          "Video to Word - Real-time sign language recognition using your camera",
          "Word to Animation - Learn signs through visual demonstrations",
          "Video Upload - Contribute sign language videos to improve the system",
          "Settings - Customize your experience and preferences"
        ]
      },
      {
        title: "Getting Started",
        icon: FaCheckCircle,
        content: [
          "Click 'Video to Word' to start recognizing signs with your camera",
          "Use 'Word to Animation' to learn how to perform specific signs",
          "Upload videos to help train the recognition system",
          "Adjust settings for optimal performance"
        ]
      }
    ]
  },
 
  // VIDEO TO WORD PAGE
  "/camera": {
    icon: FaCamera,
    title: "Real-Time Sign Recognition",
    description: "Convert sign language gestures to text using your camera.",
    sections: [
      {
        title: "Camera Setup",
        icon: FaVideo,
        content: [
          "Allow camera access when your browser prompts",
          "Position yourself 3-4 feet from the camera",
          "Ensure your hands and upper body are fully visible",
          "Use good lighting and avoid busy backgrounds"
        ]
      },
      {
        title: "Performing Signs",
        icon: FaHandPaper,
        content: [
          "Make clear, deliberate gestures at natural pace",
          "Keep your hands within the camera frame",
          "Pause briefly between different signs",
          "Use signs from the supported vocabulary (30 words)"
        ]
      },
      {
        title: "Reading Results",
        icon: FaInfoCircle,
        content: [
          "Recognized text appears in the results area",
          "Confidence score shows system certainty (0-100%)",
          "Use 'Clear' button to reset accumulated text",
          "Adjust recognition threshold in settings if needed"
        ]
      }
    ],
    troubleshooting: {
      title: "Common Issues",
      issues: [
        "If recognition isn't working, check lighting and hand visibility",
        "Ensure you're using signs from the supported vocabulary",
        "Try adjusting the confidence threshold in settings",
        "Make sure no other applications are using your camera"
      ]
    }
  },
 
  // VIDEO UPLOAD PAGE
  "/video-upload": {
    icon: FaUpload,
    title: "Video Upload & Contribution",
    description: "Upload sign language videos to help improve the recognition system.",
    sections: [
      {
        title: "Upload Process",
        icon: FaCloudUploadAlt,
        content: [
          "Click the upload area or drag and drop your video file",
          "Enter the gesture/sign name being performed",
          "Add your name as contributor (optional)",
          "Click 'Upload to Firebase' to submit your video"
        ]
      },
      {
        title: "Video Requirements",
        icon: FaFileVideo,
        content: [
          "Supported formats: MP4, WebM, MOV",
          "Duration: 2-10 seconds recommended",
          "File size: Maximum 50MB",
          "Ensure hands are clearly visible throughout"
        ]
      },
      {
        title: "Recording Tips",
        icon: FaLightbulb,
        content: [
          "Use good lighting and plain background",
          "Position camera to show upper body clearly",
          "Perform signs at natural pace",
          "Sign the word 1-2 times with brief pauses"
        ]
      }
    ]
  },
 
  // WORD TO ANIMATION PAGE
  "/word-to-animation": {
    icon: FaSignLanguage,
    title: "Learn Sign Language",
    description: "View animated demonstrations of sign language gestures.",
    sections: [
      {
        title: "How to Use",
        icon: FaPlay,
        content: [
          "Browse the grid of available words",
          "Click on any word to load its animation",
          "Use video controls to play, pause, or replay"
         
        ]
      },
      {
        title: "Available Signs",
        icon: FaList,
        content: [
          "30 common ASL signs are currently supported",
          "Includes greetings, family terms, actions, and descriptions",
          "Examples: 'Hello', 'Thank you', 'Mom', 'Dad', 'Eat', 'Beautiful'",
          "More signs may be added based on contributions"
        ]
      },
      {
        title: "Learning Tips",
        icon: FaLightbulb,
        content: [
          "Watch the complete animation several times first",
          "Practice alongside the animation",
          "Pay attention to hand shape, movement, and position",
          "Test your signing using the Video to Word feature"
        ]
      }
    ]
  },
 
  // SETTINGS PAGE
  "/settings": {
    icon: FaCog,
    title: "Settings & Preferences",
    description: "Customize the app for your needs and preferences.",
    sections: [
      {
        title: "Display Settings",
        icon: FaInfoCircle,
        content: [
          "Toggle between light and dark themes",
          "Adjust interface colors and contrast",
          "Customize text size for better readability"
        ]
      },
      {
        title: "Recognition Settings",
        icon: FaVideo,
        content: [
          "Adjust confidence threshold for sign detection",
          "Higher values = more precise but may miss signs",
          "Lower values = more sensitive but may include errors",
          "Recommended: 0.7 for balanced performance"
        ]
      },
      {
        title: "Camera Settings",
        icon: FaCamera,
        content: [
          "Select camera device if multiple available",
          "Adjust video resolution and frame rate",
          "Toggle hand tracking visualization",
          "Configure performance vs. accuracy balance"
        ]
      }
    ]
  }
};
 
export default HelpContent;