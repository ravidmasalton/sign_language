import React from 'react';
import styled from 'styled-components';
import { 
  FaHome, 
  FaCamera, 
  FaHandPaper, 
  FaUpload, 
  FaClosedCaptioning, 
  FaCog, 
  FaLightbulb, 
  FaHandsHelping, 
  FaExclamationTriangle,
  FaInfoCircle,
  FaStepForward,
  FaQuestion,
  FaLightbulb as FaTip,
  FaTools,
  FaFileVideo,
  FaVideo,
  FaSearchPlus,
  FaHandPointRight,
  FaSliders,
  FaUserCog,
  FaSlidersH,
  FaBell,
  FaShieldAlt,
  FaSyncAlt,
  FaCheck,
  FaSun,
  FaEye,
  FaHandPointUp,
  FaRegKeyboard,
  FaRegLightbulb,
  FaSignLanguage,
  FaRegPlayCircle,
  FaRegPauseCircle,
  FaMobileAlt,
  FaWrench,
  FaRegWindowMaximize,
  FaList,
  FaCheckCircle,
  FaUsers,
  FaArrowRight,
} from 'react-icons/fa';
// Styled Components
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


/**
 * Comprehensive help content for each page in the sign language application
 * Structured as route-based object with detailed instructions for each feature
 */

export const helpContent = {
  home: {
    title: "Home/Dashboard",
    icon: <FaHome />,
    sections: [
      {
        subtitle: "Primary Purpose & When to Use",
        icon: <FaInfoCircle />,
        content: [
          "The Home Dashboard is your central navigation hub and learning command center.",
          "Use this page to:",
          ["Get a quick overview of all available features", 
           "Access your most recently used tools",
           "View your learning progress",
           "Find quick links to start any activity"]
        ]
      },
      {
        subtitle: "Step-by-Step Usage",
        icon: <FaCheckCircle />,
        content: [
          "Getting Started:",
          ["1. Log in to your account",
           "2. Browse through the featured cards for different functionalities",
           "3. Click on any card to access that specific feature",
           "4. Use the navigation bar for direct access to main features"]
        ]
      },
      {
        subtitle: "Best Use Cases & Scenarios",
        icon: <FaLightbulb />,
        content: [
          "Ideal for:",
          ["First-time users getting oriented with the app",
           "Daily users starting their learning session",
           "Teachers preparing for ASL classes",
           "Students reviewing their learning options"]
        ]
      },
      {
        subtitle: "User Types & Adaptation",
        icon: <FaUsers />,
        content: [
          "For different user types:",
          ["Beginners: Focus on the learning path suggestions",
           "Experienced Users: Quick access to advanced features",
           "Educators: Use the dashboard to plan lessons",
           "Interpreters: Access professional tools quickly"]
        ]
      }
    ]
  },
  videoToWord: {
    title: "Video to Word Translation",
    icon: <FaVideo />,
    sections: [
      {
        subtitle: "Primary Purpose & When to Use",
        icon: <FaInfoCircle />,
        content: [
          "Real-time sign language recognition and translation to text.",
          "Best used when:",
          ["You need to understand signs being performed",
           "During live conversations with ASL users",
           "Learning to recognize new signs",
           "Practicing sign language comprehension"]
        ]
      },
      {
        subtitle: "Step-by-Step Usage",
        icon: <FaCheckCircle />,
        content: [
          "How to use the feature:",
          ["1. Position yourself in front of the camera",
           "2. Ensure good lighting and clear view of your hands",
           "3. Perform signs clearly and at a moderate pace",
           "4. Watch the real-time translation appear on screen",
           "5. Use the history feature to review past translations"]
        ]
      },
      {
        subtitle: "Best Use Cases & Scenarios",
        icon: <FaLightbulb />,
        content: [
          "Practical applications:",
          ["Educational settings for sign language practice",
           "Real-world communication scenarios",
           "Remote interpretation needs",
           "Self-assessment of signing accuracy"]
        ]
      }
    ]
  },
  wordToAnimation: {
    title: "Word to Animation Reference",
    icon: <FaSignLanguage />,
    sections: [
      {
        subtitle: "Primary Purpose & When to Use",
        icon: <FaInfoCircle />,
        content: [
          "Learn and practice specific signs through animated demonstrations.",
          "Perfect for:",
          ["Learning new signs",
           "Practicing proper hand movements",
           "Reviewing signs you've learned",
           "Preparing for conversations"]
        ]
      },
      {
        subtitle: "Step-by-Step Usage",
        icon: <FaCheckCircle />,
        content: [
          "Using the feature:",
          ["1. Enter the word you want to learn",
           "2. Watch the animated demonstration",
           "3. Practice the sign alongside the animation",
           "4. Use slow-motion and repeat options as needed",
           "5. Save frequently used signs for quick access"]
        ]
      },
      {
        subtitle: "Integration with Learning",
        icon: <FaArrowRight />,
        content: [
          "Maximize your learning:",
          ["Create custom practice lists",
           "Combine with Video to Word for practice",
           "Use spaced repetition for better retention",
           "Track your progress with the built-in tools"]
        ]
      }
    ]
  },
  videoUpload: {
    title: "Video Upload & Analysis",
    icon: <FaUpload />,
    sections: [
      {
        subtitle: "Primary Purpose & When to Use",
        icon: <FaInfoCircle />,
        content: [
          "Upload and analyze pre-recorded sign language videos.",
          "Ideal for:",
          ["Analyzing recorded conversations",
           "Studying complex sign sequences",
           "Contributing to the sign language database",
           "Creating learning materials"]
        ]
      },
      {
        subtitle: "Step-by-Step Usage",
        icon: <FaCheckCircle />,
        content: [
          "Upload process:",
          ["1. Select or drag-and-drop your video file",
           "2. Choose analysis preferences",
           "3. Wait for processing completion",
           "4. Review the detailed analysis results",
           "5. Save or share the results as needed"]
        ]
      },
      {
        subtitle: "Best Practices",
        icon: <FaLightbulb />,
        content: [
          "For best results:",
          ["Ensure good video quality and lighting",
           "Keep hands clearly visible in frame",
           "Use appropriate video length (30s-2min recommended)",
           "Label videos descriptively for easy reference"]
        ]
      }
    ]
  },
  settings: {
    title: "Settings & Customization",
    icon: <FaCog />,
    sections: [
      {
        subtitle: "Primary Purpose & When to Use",
        icon: <FaInfoCircle />,
        content: [
          "Customize the app to match your needs and preferences.",
          "Key settings include:",
          ["Display preferences (light/dark mode)",
           "Camera and video settings",
           "Recognition sensitivity",
           "Learning progress tracking",
           "Accessibility options"]
        ]
      },
      {
        subtitle: "Optimization Tips",
        icon: <FaLightbulb />,
        content: [
          "For optimal performance:",
          ["Adjust camera settings based on your environment",
           "Customize recognition sensitivity for your signing style",
           "Set up learning tracking to match your goals",
           "Configure notifications for regular practice reminders"]
        ]
      },
      {
        subtitle: "User-Specific Settings",
        icon: <FaUsers />,
        content: [
          "Recommended settings by user type:",
          ["Beginners: Enable learning aids and detailed feedback",
           "Advanced Users: Higher recognition sensitivity",
           "Educators: Enable sharing and collaboration features",
           "Professional Users: Configure advanced recognition options"]
        ]
      }
    ]
  }
};
const HelpContent = {
  // HOME PAGE
  "/": {
    icon: FaHome,
    title: "Welcome to Sign Language Recognition",
    description: "This application helps bridge communication gaps between deaf/hard-of-hearing individuals and the general population through real-time sign language recognition and learning tools.",
    sections: [
      {
        title: "App Overview",
        icon: FaLightbulb,
        content: "This application combines cutting-edge computer vision technology with machine learning to recognize American Sign Language (ASL) gestures in real-time and translate them to text. It also provides learning resources and allows community contributions to continuously improve the recognition model."
      },
      {
        title: "Main Features",
        icon: FaCheck,
        content: [
          "Real-time Sign Recognition - Translate ASL gestures to text using your camera",
          "Learning Animations - View sign language demonstrations for common words and phrases",
          "Training Contributions - Upload your own sign videos to help improve the model",
          "Customizable Settings - Adjust the app to your preferences for optimal recognition"
        ]
      },
      {
        title: "Getting Started",
        icon: FaHandPointUp,
        content: [
          "Navigate to 'Video to Word' to begin real-time sign language recognition",
          "Use 'Word to Animation' to learn how to perform signs correctly",
          "Visit 'Upload Video' to contribute to the training dataset",
          "Adjust your experience in the 'Settings' section"
        ]
      },
      {
        title: "Community Impact",
        icon: FaSignLanguage,
        content: "By using this application, you're helping bridge communication gaps and promote inclusivity. The more people use and contribute to the system, the more accurate and helpful it becomes for the deaf and hard-of-hearing community."
      }
    ],
    troubleshooting: {
      title: "Having Trouble?",
      issues: [
        "Ensure you have a stable internet connection for optimal performance",
        "Grant camera permissions when prompted for recognition features",
        "For best results, use the latest version of Chrome, Firefox, or Safari",
        "If you experience any issues, try refreshing the page or adjusting settings"
      ]
    }
  },

  // VIDEO TO WORD PAGE
  "/camera": {
    icon: FaCamera,
    title: "Real-Time Sign Language Recognition",
    description: "This page allows you to translate sign language into text using your camera in real-time.",
    sections: [
      {
        title: "How It Works",
        icon: FaInfoCircle,
        content: `
          <p>The system uses computer vision technology to track your hand movements and gestures through your camera.</p>
          <p>A machine learning model trained on thousands of sign language examples analyzes the movements and predicts the corresponding words.</p>
          <p><strong>When no hands are visible, no prediction will be made.</strong></p>
          
          <ol>
            <li><strong>Skeletal Tracking</strong>: The app uses MediaPipe Holistic to detect and track 225 key points across your hands, face, and upper body</li>
            <li><strong>Feature Extraction</strong>: These key points are processed to extract meaningful patterns that represent different signs</li>
            <li><strong>Neural Network Classification</strong>: A trained TensorFlow.js model analyzes these patterns to identify the most likely sign being performed</li>
            <li><strong>Confidence Filtering</strong>: Only predictions with confidence above your threshold setting are displayed</li>
            <li><strong>Translation Output</strong>: Recognized signs are displayed as text with their corresponding confidence scores</li>
          </ol>
          
          <p>All processing happens directly in your browser, with no data sent to external servers, ensuring privacy and enabling offline use.</p>
        `
      },
      {
        title: "Setting Up Your Camera",
        icon: FaVideo,
        content: `
          <p>For optimal sign language recognition performance, follow these camera setup guidelines:</p>
          
          <ul>
            <li><strong>Position</strong>: Place your device so that your upper body (from waist up) is clearly visible</li>
            <li><strong>Distance</strong>: Stay approximately 3-4 feet (1-1.2 meters) from the camera</li>
            <li><strong>Lighting</strong>: Ensure even lighting across your body - avoid backlighting that creates shadows</li>
            <li><strong>Background</strong>: Use a plain, uncluttered background when possible</li>
            <li><strong>Clothing</strong>: Wear solid-colored clothing that contrasts with your skin tone</li>
            <li><strong>Space</strong>: Allow enough room to perform signs without restrictions</li>
          </ul>
          
          <p>The app will automatically request camera permission when you first access this feature. You can always manage these permissions through your browser settings.</p>
        `
      },
      {
        title: "Performing Signs",
        icon: FaHandPaper,
        content: [
          "Make deliberate, clear gestures at a natural pace",
          "Keep your entire upper body and hands within the camera frame",
          "Pause briefly between different signs to help the system distinguish them",
          "Maintain consistent positioning relative to the camera",
          "Pay attention to hand shape, position, and movement - all are important for recognition",
          "Use the confidence score to gauge recognition accuracy"
        ]
      },
      {
        title: "Understanding the Interface",
        icon: FaRegWindowMaximize,
        content: `
          <p>The Video to Word interface includes several key elements:</p>
          
          <ul>
            <li><strong>Camera Feed</strong>: Live video showing you with skeletal tracking overlaid</li>
            <li><strong>Recognition Results</strong>: Text display of the most recently recognized sign</li>
            <li><strong>Confidence Score</strong>: Numerical value (0-100%) indicating how certain the model is about the recognition</li>
            <li><strong>Accumulated Text</strong>: A running display of recognized signs, building a sequence of words</li>
            <li><strong>Clear Button</strong>: Resets the accumulated text when needed</li>
            <li><strong>Copy Button</strong>: Copies the accumulated text to your clipboard</li>
          </ul>
          
          <p>The skeletal tracking overlay shows how the system is interpreting your movements, which can help you adjust your positioning for better recognition.</p>
        `
      },
      {
        title: "Troubleshooting",
        icon: FaExclamationTriangle,
        content: `
          <p><strong>If recognition isn't working:</strong></p>
          <ul>
            <li>Check your lighting - avoid backlighting and shadows</li>
            <li>Ensure your hands are fully visible in the frame</li>
            <li>Try adjusting the recognition threshold in Settings</li>
            <li>Move to a location with a plain background</li>
            <li>Ensure you're making ASL signs from our supported vocabulary</li>
            <li>Close other browser tabs/applications to free up system resources</li>
            <li>Wear clothing that contrasts with your background for better detection</li>
          </ul>
          <p>Remember that the system may perform differently for different users due to variations in signing style, physical characteristics, and environmental conditions.</p>
        `
      }
    ]
  },
  
  // VIDEO UPLOAD PAGE
  "/video-upload": {
    icon: FaUpload,
    title: "Video Upload & Contribution",
    description: "This page allows you to contribute sign language videos to help improve the recognition model.",
    sections: [
      {
        title: "Why Contribute Videos?",
        icon: FaInfoCircle,
        content: `
          <p>Your video contributions are essential to the continued improvement of the sign language recognition system:</p>
          
          <ul>
            <li><strong>Diverse Training Data</strong>: Contributions from different individuals help the model recognize signs across diverse body types, skin tones, and signing styles</li>
            <li><strong>Expanded Vocabulary</strong>: Your uploads can help extend the system's vocabulary beyond the current 30 supported signs</li>
            <li><strong>Improved Accuracy</strong>: More examples of each sign lead to more accurate recognition</li>
            <li><strong>Community Building</strong>: Participation creates a collaborative environment for improving accessibility technology</li>
            <li><strong>Personalization</strong>: The system gradually learns to better recognize your specific signing style</li>
            <li><strong>Regional Variations</strong>: Helps the system recognize different regional variations of the same sign</li>
            <li><strong>Education Resource</strong>: Contributes to a comprehensive library of sign language demonstrations</li>
          </ul>
          
          <p>By contributing, you're directly helping to make sign language technology more inclusive and effective for everyone. Each contribution strengthens the model's ability to bridge communication gaps between deaf and hearing communities.</p>
        `
      },
      {
        title: "Recording Guidelines",
        icon: FaFileVideo,
        content: `
          <p>To create high-quality video contributions that will be most valuable for training the model:</p>
          
          <ol>
            <li><strong>Environment</strong>:
              <ul>
                <li>Record in a well-lit area with even lighting</li>
                <li>Avoid backlighting that creates shadows on your hands or face</li>
                <li>Use a plain, uncluttered background (solid colors work best)</li>
                <li>Ensure consistent lighting throughout the recording</li>
              </ul>
            </li>
            <li><strong>Positioning</strong>:
              <ul>
                <li>Position yourself so your upper body (from waist up) is clearly visible</li>
                <li>Maintain approximately 3-4 feet (1-1.2 meters) distance from the camera</li>
                <li>Center yourself in the frame with space around you for hand movements</li>
                <li>Ensure your face is clearly visible for signs that require facial expressions</li>
              </ul>
            </li>
            <li><strong>Clothing</strong>:
              <ul>
                <li>Wear solid-colored clothing that contrasts with your background</li>
                <li>Avoid clothing with busy patterns, logos, or text</li>
                <li>Ensure your wrists and arms are visible if wearing long sleeves</li>
                <li>Remove distracting jewelry that could interfere with hand tracking</li>
              </ul>
            </li>
            <li><strong>Signing Technique</strong>:
              <ul>
                <li>Sign at a natural pace - not too fast or too slow</li>
                <li>Perform signs clearly and deliberately</li>
                <li>Include appropriate facial expressions and non-manual markers</li>
                <li>Sign the word 1-2 times with a brief pause between repetitions</li>
              </ul>
            </li>
          </ol>
          
          <p>Videos don't need to be professionally produced - natural, clear signing in everyday settings is perfect for training the model. The most important aspect is clarity and visibility of the hand movements and facial expressions.</p>
        `
      },
      {
        title: "Technical Requirements",
        icon: FaWrench,
        content: `
          <p>When uploading videos, please adhere to these technical specifications:</p>
          
          <ul>
            <li><strong>Format</strong>: MP4, WebM, or MOV video formats</li>
            <li><strong>Resolution</strong>: Minimum 480p (640×480), 720p (1280×720) recommended</li>
            <li><strong>Duration</strong>: 2-10 seconds per sign (optimal: 3-5 seconds)</li>
            <li><strong>File Size</strong>: Maximum 50MB per upload</li>
            <li><strong>Frame Rate</strong>: Minimum 24fps for smooth motion capture (30fps recommended)</li>
            <li><strong>Aspect Ratio</strong>: 16:9 or 9:16 (landscape or portrait orientation)</li>
            <li><strong>Stability</strong>: Use a stable surface or tripod if possible to minimize camera shake</li>
            <li><strong>Audio</strong>: Not required, but can be included if you want to add spoken word</li>
          </ul>
          
          <p>The system will automatically process your upload by:</p>
          <ol>
            <li>Extracting skeletal keypoints from your hands, face, and upper body</li>
            <li>Normalizing the data to account for differences in body proportions</li>
            <li>Adding the processed data to the training dataset</li>
            <li>Periodically retraining the model with the expanded dataset</li>
          </ol>
        `
      },
      {
        title: "Upload Process",
        icon: FaStepForward,
        content: `
          <p>Follow these steps to upload your sign language videos:</p>
          
          <ol>
            <li><strong>Prepare Your Recording</strong>: Create a video following the guidelines above</li>
            <li><strong>Access Upload Area</strong>: Navigate to the Video Upload page in the application</li>
            <li><strong>Select File</strong>: Click the upload area or drag and drop your video file</li>
            <li><strong>Preview</strong>: Review your video in the preview window to ensure quality and clarity</li>
            <li><strong>Add Metadata</strong>:
              <ul>
                <li>Select which sign is being performed from the dropdown menu</li>
                <li>If contributing a new sign, select "Other" and provide the sign name</li>
                <li>Add any relevant tags (e.g., "regional variation," "formal," "casual")</li>
              </ul>
            </li>
            <li><strong>Contributor Information</strong>:
              <ul>
                <li>Decide whether to provide your name for attribution (optional)</li>
                <li>Indicate if you're a native signer or ASL student (helps with data classification)</li>
              </ul>
            </li>
            <li><strong>Privacy Options</strong>: Review how your data will be used and select privacy preferences</li>
            <li><strong>Terms Acceptance</strong>: Acknowledge the contributor agreement and usage terms</li>
            <li><strong>Submit</strong>: Upload your contribution to the system</li>
            <li><strong>Confirmation</strong>: Receive a confirmation message with a unique contribution ID</li>
          </ol>
          
          <p>After submission, your video will be processed to extract skeletal keypoints, which are then used to improve the recognition model. The raw video may be stored securely for quality verification, but will not be publicly displayed without your explicit permission.</p>
        `
      },
      {
        title: "Privacy and Data Usage",
        icon: FaShieldAlt,
        content: `
          <p>We prioritize your privacy when you contribute videos:</p>
          
          <ul>
            <li><strong>Data Extraction</strong>:
              <ul>
                <li>Your videos are processed to extract skeletal keypoints - abstract mathematical representations rather than actual images</li>
                <li>The extracted data is anonymized unless you explicitly opt for attribution</li>
                <li>Processing happens on secure servers with encryption in transit and at rest</li>
              </ul>
            </li>
            <li><strong>Storage</strong>:
              <ul>
                <li>Raw videos are stored securely with limited access for quality verification purposes</li>
                <li>You can request deletion of your raw video at any time</li>
                <li>After processing and verification, raw videos can be automatically deleted if you prefer</li>
              </ul>
            </li>
            <li><strong>Usage</strong>:
              <ul>
                <li>Extracted data is used solely for improving the sign language recognition model</li>
                <li>Your contributions help make the system more accessible for everyone</li>
                <li>The model learns from aggregate patterns across many contributions</li>
              </ul>
            </li>
            <li><strong>Control</strong>:
              <ul>
                <li>You maintain ownership of your original content</li>
                <li>You can withdraw your contributions at any time</li>
                <li>You control whether your name is associated with your contributions</li>
              </ul>
            </li>
          </ul>
          
          <p>By contributing, you're helping to build a more accessible world while maintaining control over your personal data. Our full privacy policy is available in the Settings section for detailed information about data handling practices.</p>
        `
      },
      {
        title: "Best Practices for Contributors",
        icon: FaRegLightbulb,
        content: `
          <p>To maximize the impact of your contributions:</p>
          
          <ul>
            <li><strong>Contribute Systematically</strong>: Focus on completing sets of related signs</li>
            <li><strong>Include Variations</strong>: Record the same sign from slightly different angles or with subtle variations</li>
            <li><strong>Focus on Underrepresented Signs</strong>: Check the "Needed Signs" list for priority contributions</li>
            <li><strong>Diverse Environments</strong>: If possible, record in different lighting conditions and backgrounds</li>
            <li><strong>Regular Contributions</strong>: Small, consistent contributions over time are more valuable than one large batch</li>
            <li><strong>Quality Over Quantity</strong>: A few clear, well-executed recordings are better than many poor-quality ones</li>
            <li><strong>Share the Opportunity</strong>: Invite other signers to contribute, especially native ASL users</li>
          </ul>
          
          <p>Remember that your contributions directly impact the system's ability to serve the deaf and hard-of-hearing community. Every high-quality submission brings us closer to more accurate and inclusive sign language technology.</p>
        `
      },
      {
        title: "Troubleshooting",
        icon: FaExclamationTriangle,
        content: `
          <p>Common issues and solutions when uploading videos:</p>
          
          <ul>
            <li><strong>Upload Failures</strong>:
              <ul>
                <li>Check your internet connection stability</li>
                <li>Ensure your file meets the format and size requirements</li>
                <li>Try reducing the file size if it exceeds 50MB</li>
                <li>Clear browser cache and cookies, then try again</li>
              </ul>
            </li>
            <li><strong>Processing Errors</strong>:
              <ul>
                <li>Ensure your hands are clearly visible throughout the video</li>
                <li>Check that lighting is adequate and consistent</li>
                <li>Verify the video isn't blurry or shaky</li>
                <li>Try recording with a simpler background</li>
              </ul>
            </li>
            <li><strong>Metadata Issues</strong>:
              <ul>
                <li>Ensure all required fields are completed</li>
                <li>Try a different browser if form fields aren't saving properly</li>
                <li>If adding a new sign, check spelling and existing vocabulary</li>
              </ul>
            </li>
            <li><strong>Preview Problems</strong>:
              <ul>
                <li>Ensure your browser supports HTML5 video</li>
                <li>Try a different browser if preview doesn't load</li>
                <li>Check that your video codec is supported (H.264 recommended)</li>
              </ul>
            </li>
          </ul>
          
          <p>If issues persist, you can contact support through the Settings page. Include your browser type, device information, and a description of the problem for faster resolution.</p>
        `
      }
    ]
  },
  
  // WORD TO ANIMATION PAGE
  "/word-to-animation": {
    icon: FaClosedCaptioning,
    title: "Learn Sign Language Animations",
    description: "This page helps you learn sign language through visual demonstrations of signs.",
    sections: [
      {
        title: "Learning Through Animations",
        icon: FaInfoCircle,
        content: `
          <p>This feature allows you to view high-quality sign language animations for specific words and phrases.</p>
          <p>Watching these animations helps you learn proper sign execution, hand shapes, movements, and expressions.</p>
          <p>The Word to Animation feature serves as both an educational resource and a reference tool:</p>
          
          <ul>
            <li><strong>Learning Tool</strong>: Learn ASL signs through high-quality visual demonstrations</li>
            <li><strong>Reference Guide</strong>: Check the standard form of signs to improve recognition accuracy</li>
            <li><strong>Practice Aid</strong>: Use the animations as a model when practicing your signing</li>
            <li><strong>Vocabulary Builder</strong>: Explore the 30 supported signs to expand your ASL knowledge</li>
            <li><strong>Communication Support</strong>: Use as a quick reference when communicating with deaf individuals</li>
          </ul>
          
          <p>This feature is valuable for both beginners learning ASL and more experienced signers who want to ensure their signs match the forms recognized by the system.</p>
        `
      },
      {
        title: "How To Use",
        icon: FaHandPointRight,
        content: `
          <p>To effectively navigate and use the Word to Animation feature:</p>
          
          <ol>
            <li><strong>Word Selection</strong>: Browse the visual grid of available words or use the search function to find specific signs</li>
            <li><strong>Preview</strong>: Click on any word to load its animation</li>
            <li><strong>Playback</strong>: Use the video controls to play, pause, or replay the animation</li>
            <li><strong>Speed Control</strong>: Adjust playback speed (0.5x, 1x, 1.5x) to observe details or match your learning pace</li>
            <li><strong>Fullscreen</strong>: Expand the animation for a clearer view of hand movements and positioning</li>
            <li><strong>Loop Option</strong>: Enable looping for continuous playback when practicing</li>
          </ol>
          
          <p>The word selection interface is designed to be visually intuitive, making it easy to find and learn new signs even if you're unfamiliar with ASL.</p>
        `
      },
      {
        title: "Supported Vocabulary",
        icon: FaList,
        content: `
          <p>Currently, we support 30 common ASL signs including:</p>
          <ul>
            <li><strong>Greetings</strong>: "Bye", "Thank you"</li>
            <li><strong>Family Terms</strong>: "Mom", "Dad", "Son", "Family"</li>
            <li><strong>Everyday Actions</strong>: "Eat", "Drink", "Write", "Study", "Dance", "Go", "Help"</li>
            <li><strong>Descriptions</strong>: "Beautiful", "Tall", "Tired", "Sick", "Red"</li>
            <li><strong>Common Words</strong>: "Book", "Bird", "Yes", "No", "Can", "Need", "Love", "Enjoy"</li>
            <li><strong>Communication</strong>: "Deaf", "Day"</li>
          </ul>
          <p>We regularly expand our vocabulary based on user feedback and common communication needs.</p>
        `
      },
      {
        title: "Effective Learning Techniques",
        icon: FaLightbulb,
        content: `
          <p>To effectively learn and remember ASL signs:</p>
          
          <ul>
            <li><strong>Observe First</strong>: Watch the complete animation several times before attempting to sign</li>
            <li><strong>Break It Down</strong>: Study each component of the sign individually:
              <ul>
                <li>Hand shape: How the fingers are positioned</li>
                <li>Palm orientation: Which way the palm faces</li>
                <li>Movement: The path and direction your hands follow</li>
                <li>Location: Where the sign is performed relative to your body</li>
                <li>Non-manual markers: Facial expressions and body posture</li>
              </ul>
            </li>
            <li><strong>Mirroring</strong>: Practice alongside the animation, mimicking the movements as if looking in a mirror</li>
            <li><strong>Slow Motion</strong>: Use the 0.5x speed option to study complex hand shapes and movements</li>
            <li><strong>Repetition</strong>: Repeat each sign 10-15 times to build muscle memory</li>
            <li><strong>Daily Practice</strong>: Spend 5-10 minutes daily reviewing signs to reinforce learning</li>
            <li><strong>Self-Recording</strong>: Record yourself signing and compare with the animation</li>
            <li><strong>Self-Testing</strong>: Use the recognition feature to verify if you're performing signs correctly</li>
          </ul>
          
          <p>Remember that ASL is not just about hand shapes but also incorporates facial expressions and body positioning. Pay attention to these elements in the animations.</p>
        `
      },
      {
        title: "Understanding ASL Structure",
        icon: FaHandsHelping,
        content: `
          <p>To gain a deeper understanding of ASL as a language:</p>
          
          <ul>
            <li><strong>Grammar Difference</strong>: ASL has its own grammar that differs from English - it's not simply signed English</li>
            <li><strong>Sentence Structure</strong>: ASL typically follows a time-topic-comment structure rather than subject-verb-object</li>
            <li><strong>Non-Manual Markers</strong>: Facial expressions and body movements are grammatical elements, not just for emphasis</li>
            <li><strong>Classifiers</strong>: Special handshapes that represent categories of objects and their movements</li>
            <li><strong>Use of Space</strong>: ASL uses the signing space to establish locations, references, and relationships</li>
          </ul>
          
          <p>While this app focuses on individual signs, understanding these broader aspects of ASL will help you progress toward more fluent signing and communication.</p>
        `
      },
      {
        title: "Building Your Vocabulary",
        icon: FaStepForward,
        content: `
          <p>Strategic approaches to expand your ASL vocabulary using this feature:</p>
          
          <ol>
            <li><strong>Categorized Learning</strong>: Focus on related signs (e.g., family members, emotions, actions) in a single session</li>
            <li><strong>Daily Words</strong>: Learn 3-5 new signs each day rather than trying to memorize many at once</li>
            <li><strong>Practical Application</strong>: Prioritize signs relevant to your daily life and common interactions</li>
            <li><strong>Paired Practice</strong>: Learn with a friend to practice recognition and production</li>
            <li><strong>Spaced Repetition</strong>: Review new signs immediately, then at increasing intervals (1 day, 3 days, 1 week)</li>
            <li><strong>Sentence Building</strong>: Practice combining signs into basic sentences to build fluency</li>
            <li><strong>Real-World Application</strong>: Set challenges to use new signs in daily conversations</li>
          </ol>
          
          <p>The current system includes 30 common signs, with plans to expand the vocabulary based on community contributions and usage patterns.</p>
        `
      },
      {
        title: "Troubleshooting",
        icon: FaExclamationTriangle,
        content: `
          <p>If you encounter issues with animations:</p>
          <ul>
            <li>Ensure you have a stable internet connection</li>
            <li>Try refreshing the page if animations don't load</li>
            <li>Clear your browser cache if animations appear distorted</li>
            <li>Make sure you've entered a word from our supported vocabulary</li>
            <li>For blurry animations, try using a higher quality setting</li>
            <li>If playback is choppy, close other applications or tabs using system resources</li>
            <li>Try a different browser if problems persist</li>
            <li>Check that JavaScript is enabled in your browser</li>
          </ul>
        `
      }
    ]
  },
  
  // SETTINGS PAGE
  "/settings": {
    icon: FaCog,
    title: "Settings & Customization",
    description: "This page allows you to personalize your experience and optimize the application for your needs.",
    sections: [
      {
        title: "Available Settings",
        icon: FaInfoCircle,
        content: `
          <p>The Settings page provides several customization options to optimize your experience:</p>
          
          <ul>
            <li><strong>Theme Settings</strong>: 
              <ul>
                <li>Toggle between light, dark, and system-default themes</li>
                <li>Adjust contrast levels for better visibility</li>
                <li>Customize accent colors for a personalized experience</li>
              </ul>
            </li>
            <li><strong>Recognition Settings</strong>:
              <ul>
                <li>Adjust confidence threshold for sign detection</li>
                <li>Modify detection sensitivity for different environments</li>
                <li>Configure prediction delay and accumulation behavior</li>
              </ul>
            </li>
            <li><strong>Camera Settings</strong>:
              <ul>
                <li>Select camera device if multiple are available</li>
                <li>Configure resolution and frame rate</li>
                <li>Toggle hand tracking visualization options</li>
              </ul>
            </li>
            <li><strong>Account Preferences</strong>:
              <ul>
                <li>View and manage your user profile</li>
                <li>Control data sharing and privacy options</li>
                <li>Manage contributed content and attribution</li>
              </ul>
            </li>
            <li><strong>Notification Controls</strong>:
              <ul>
                <li>Enable/disable system notifications</li>
                <li>Configure notification types and frequency</li>
                <li>Set learning reminders and progress updates</li>
              </ul>
            </li>
            <li><strong>Data Management</strong>:
              <ul>
                <li>View storage usage and cache statistics</li>
                <li>Clear locally stored data when needed</li>
                <li>Export or delete your personal data</li>
              </ul>
            </li>
          </ul>
          
          <p>All settings are automatically saved to your browser's local storage or to your account if you're signed in, ensuring a consistent experience across sessions.</p>
        `
      },
      {
        title: "Theme Customization",
        icon: FaSlidersH,
        content: `
          <p>The app offers comprehensive theme options to enhance visual comfort and accessibility:</p>
          
          <ul>
            <li><strong>Light Mode</strong>:
              <ul>
                <li>Bright theme optimized for daytime use and high-visibility environments</li>
                <li>Crisp contrast for reading text in well-lit conditions</li>
                <li>Reduced eye strain in bright surroundings</li>
                <li>Ideal for educational settings and public presentations</li>
              </ul>
            </li>
            <li><strong>Dark Mode</strong>:
              <ul>
                <li>Reduced brightness theme for low-light environments</li>
                <li>Minimizes eye strain during extended use</li>
                <li>Reduces screen glare in dim lighting conditions</li>
                <li>Conserves battery on OLED/AMOLED displays</li>
              </ul>
            </li>
            <li><strong>System Default</strong>:
              <ul>
                <li>Automatically matches your device's theme preference</li>
                <li>Transitions between light and dark based on system settings</li>
                <li>Adapts to your device's automatic day/night switching</li>
              </ul>
            </li>
            <li><strong>High Contrast</strong>:
              <ul>
                <li>Enhanced visual separation for users with visual impairments</li>
                <li>Increased distinction between interactive elements</li>
                <li>Improved readability for text and button labels</li>
              </ul>
            </li>
            <li><strong>Color Adjustments</strong>:
              <ul>
                <li>Customize accent colors for personal preference</li>
                <li>Color-blind friendly options for improved accessibility</li>
                <li>Adjust text size and weight for better readability</li>
              </ul>
            </li>
          </ul>
          
          <p>The theme affects all aspects of the app, including navigation elements, cards, buttons, and text. Changes are applied immediately and persisted between sessions.</p>
          
          <p>Choosing the right theme can significantly impact the comfort of extended use and may affect camera recognition performance in different lighting environments. We recommend using dark mode in low-light conditions and light mode in brightly lit areas for optimal results.</p>
        `
      },
      {
        title: "Recognition Threshold Explained",
        icon: FaWrench,
        content: `
          <p>The Recognition Threshold is a critical setting that determines how confident the system must be before accepting a sign as recognized:</p>
          
          <ul>
            <li><strong>Higher Threshold (e.g., 0.8-0.95)</strong>: More precision but may miss valid signs
              <ul>
                <li>Fewer false positives (incorrect identifications)</li>
                <li>Only very clear, well-performed signs will be recognized</li>
                <li>Better for experienced signers in optimal conditions</li>
                <li>Recommended when accuracy is more important than recognition rate</li>
                <li>Ideal for formal communication scenarios</li>
              </ul>
            </li>
            <li><strong>Medium Threshold (e.g., 0.7-0.79)</strong>: Balanced performance
              <ul>
                <li>Good compromise between accuracy and sensitivity</li>
                <li>Works well for most users in typical environments</li>
                <li>Recommended default setting for general use</li>
                <li>Balances false positives with false negatives</li>
                <li>Suitable for everyday communication needs</li>
              </ul>
            </li>
            <li><strong>Lower Threshold (e.g., 0.5-0.69)</strong>: More sensitive but may include incorrect recognitions
              <ul>
                <li>More likely to catch signs even when performed imperfectly</li>
                <li>May occasionally misinterpret similar gestures</li>
                <li>Better for beginners or challenging environments</li>
                <li>Useful when learning new signs and getting feedback</li>
                <li>Helpful for users with mobility limitations</li>
              </ul>
            </li>
          </ul>
          
          <p>You can adjust this setting based on your signing proficiency, environmental conditions, and specific needs. Experiment with different thresholds to find the optimal balance between sensitivity and accuracy for your situation.</p>
          
          <p>The threshold setting directly affects both the speed and accuracy of recognition. In technical terms, it represents the minimum confidence score (0.0-1.0) required for the neural network to report a match between your signing and the trained sign patterns.</p>
        `
      },
      {
        title: "Camera Optimization",
        icon: FaVideo,
        content: `
          <p>Configure your camera settings for the best possible sign recognition performance:</p>
          
          <ul>
            <li><strong>Resolution Settings</strong>:
              <ul>
                <li><em>HD (720p)</em>: Recommended balance for most devices</li>
                <li><em>Full HD (1080p)</em>: Better detail but requires more processing power and bandwidth</li>
                <li><em>Standard (480p)</em>: Best for older devices, slow connections, or to conserve system resources</li>
              </ul>
            </li>
            <li><strong>Frame Rate Options</strong>:
              <ul>
                <li><em>High (30fps)</em>: Captures smooth movements, ideal for fast signing</li>
                <li><em>Medium (24fps)</em>: Good balance of performance and detail</li>
                <li><em>Low (15fps)</em>: Uses less resources but may miss quick gestures</li>
              </ul>
            </li>
            <li><strong>Camera Selection</strong>:
              <ul>
                <li>Choose between front and rear cameras on mobile devices</li>
                <li>Select from multiple connected cameras on desktop</li>
                <li>Set default camera for automatic connection</li>
              </ul>
            </li>
            <li><strong>Video Processing</strong>:
              <ul>
                <li>Toggle skeletal tracking visualization</li>
                <li>Adjust hand landmark visibility and style</li>
                <li>Enable/disable background blur for privacy</li>
              </ul>
            </li>
            <li><strong>Performance Mode</strong>:
              <ul>
                <li><em>Accuracy Priority</em>: Uses more detailed tracking at the cost of performance</li>
                <li><em>Balanced</em>: Default setting suitable for most systems</li>
                <li><em>Performance Priority</em>: Reduces detail to improve speed on lower-end devices</li>
              </ul>
            </li>
          </ul>
          
          <p>For the most fluid experience, close other resource-intensive applications while using the recognition features, especially on mobile devices or older computers. Changes to camera settings apply immediately but may briefly interrupt the video feed while reconfiguring.</p>
        `
      },
      {
        title: "Performance Optimization",
        icon: FaSyncAlt,
        content: `
          <p>Maximize application performance with these adjustments and best practices:</p>
          
          <ul>
            <li><strong>System Resource Management</strong>:
              <ul>
                <li>Close other browser tabs and applications when using sign recognition</li>
                <li>Disable unnecessary browser extensions that may consume resources</li>
                <li>Ensure your device meets the minimum system requirements</li>
              </ul>
            </li>
            <li><strong>Connection Optimization</strong>:
              <ul>
                <li>Use a stable WiFi or wired connection when possible</li>
                <li>Lower video quality settings when on mobile data connections</li>
                <li>Enable offline mode when available to reduce network dependencies</li>
              </ul>
            </li>
            <li><strong>Background Processing</strong>:
              <ul>
                <li>Toggle whether recognition continues when the app is not in focus</li>
                <li>Control whether the app runs in the background on mobile devices</li>
                <li>Configure sleep prevention during active sign translation</li>
              </ul>
            </li>
            <li><strong>Storage Management</strong>:
              <ul>
                <li>Clear the application cache periodically</li>
                <li>Manage stored videos and animations</li>
                <li>Control automatic downloads of model updates</li>
              </ul>
            </li>
            <li><strong>Hardware Acceleration</strong>:
              <ul>
                <li>Enable/disable GPU acceleration for neural network processing</li>
                <li>Optimize for your specific device capabilities</li>
                <li>Balance between CPU and GPU usage for thermal management</li>
              </ul>
            </li>
          </ul>
          
          <p>Performance settings are automatically saved and can be reset to defaults at any time. We recommend starting with the default settings and making incremental adjustments based on your device's performance.</p>
        `
      },
      {
        title: "Account Settings",
        icon: FaUserCog,
        content: `
          <p>Manage your user account and preferences:</p>
          
          <ul>
            <li><strong>Profile Information</strong>:
              <ul>
                <li>Update your name, email, and profile picture</li>
                <li>Manage display name and public profile visibility</li>
                <li>Add relevant information such as signing experience level</li>
              </ul>
            </li>
            <li><strong>Privacy Controls</strong>:
              <ul>
                <li><em>Video Storage</em>: Control how long your uploaded videos are retained</li>
                <li><em>Recognition Data</em>: Manage whether your usage patterns help improve the model</li>
                <li><em>Attribution</em>: Control if your name appears with your contributions</li>
                <li><em>Analytics Participation</em>: Opt in/out of anonymous usage statistics</li>
              </ul>
            </li>
            <li><strong>Data Management</strong>:
              <ul>
                <li>Download your personal data including contributions and settings</li>
                <li>View a log of your uploads and contributions</li>
                <li>Request deletion of specific videos or all personal data</li>
              </ul>
            </li>
            <li><strong>Security Settings</strong>:
              <ul>
                <li>Change your password or enable two-factor authentication</li>
                <li>Manage connected devices and active sessions</li>
                <li>Set up security questions or backup authentication methods</li>
              </ul>
            </li>
            <li><strong>Contribution History</strong>:
              <ul>
                <li>View statistics about your contributions to the system</li>
                <li>See how your uploads have improved model performance</li>
                <li>Track your impact on the accessibility community</li>
              </ul>
            </li>
          </ul>
          
          <p>Your privacy and data security are priorities - all settings provide clear explanations of their implications and no data is shared without your explicit consent. Account settings can be accessed and modified at any time, with changes taking effect immediately.</p>
        `
      },
      {
        title: "Notification Settings",
        icon: FaBell,
        content: `
          <p>Control how and when the application communicates with you:</p>
          
          <ul>
            <li><strong>System Notifications</strong>:
              <ul>
                <li>Application updates and new features announcements</li>
                <li>Maintenance alerts and important system messages</li>
                <li>Tips and suggestions for improving recognition quality</li>
              </ul>
            </li>
            <li><strong>Contribution Updates</strong>:
              <ul>
                <li>Alerts when your video uploads are processed</li>
                <li>Feedback on contribution quality and usability</li>
                <li>Impact reports showing how your data is helping</li>
              </ul>
            </li>
            <li><strong>Learning Resources</strong>:
              <ul>
                <li>New sign vocabulary additions</li>
                <li>Educational content about ASL and deaf culture</li>
                <li>Community events and learning opportunities</li>
              </ul>
            </li>
            <li><strong>Practice Reminders</strong>:
              <ul>
                <li>Customizable schedule for sign practice reminders</li>
                <li>Progress tracking and milestone celebrations</li>
                <li>Suggestions for signs to review based on your history</li>
              </ul>
            </li>
            <li><strong>Delivery Methods</strong>:
              <ul>
                <li>Browser notifications for real-time alerts</li>
                <li>Email digests for less time-sensitive updates</li>
                <li>In-app notification center for all communications</li>
              </ul>
            </li>
          </ul>
          
          <p>Notifications can be enabled or disabled individually, allowing you to customize exactly what information you receive. Frequency controls let you set how often you receive updates, from immediate notifications to daily or weekly digests.</p>
          
          <p>All notification settings respect your device's Do Not Disturb modes and quiet hours. You can disable all notifications with a single toggle if needed.</p>
        `
      },
      {
        title: "Troubleshooting",
        icon: FaExclamationTriangle,
        content: `
          <p>If you encounter issues with settings or application performance:</p>
          
          <ul>
            <li><strong>Settings Not Saving</strong>:
              <ul>
                <li>Ensure cookies and local storage are enabled in your browser</li>
                <li>Check that you're not in private/incognito browsing mode</li>
                <li>Try logging out and back in to refresh your session</li>
              </ul>
            </li>
            <li><strong>Performance Issues</strong>:
              <ul>
                <li>Lower camera resolution and frame rate settings</li>
                <li>Disable background processing and animations</li>
                <li>Clear application cache and browser data</li>
                <li>Ensure your browser is updated to the latest version</li>
              </ul>
            </li>
            <li><strong>Camera Problems</strong>:
              <ul>
                <li>Check browser permissions for camera access</li>
                <li>Ensure no other applications are using the camera</li>
                <li>Restart your browser if camera feed is frozen</li>
                <li>Try a different browser if issues persist</li>
              </ul>
            </li>
            <li><strong>Account Access</strong>:
              <ul>
                <li>Use the password recovery option if you can't log in</li>
                <li>Check for typos in your email address</li>
                <li>Contact support if you continue to have access issues</li>
              </ul>
            </li>
            <li><strong>Reset Options</strong>:
              <ul>
                <li>Reset individual settings to default values</li>
                <li>Perform a complete settings reset as a last resort</li>
                <li>Reset cached models if recognition accuracy decreases</li>
              </ul>
            </li>
          </ul>
          
          <p>If problems persist after trying these solutions, detailed logs can be generated from the Settings page to help support staff diagnose and resolve your issue. These logs contain technical information about your system and application state but do not include personal data or videos.</p>
        `
      }
    ]
  }
};

export default HelpContent;
