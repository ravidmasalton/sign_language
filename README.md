# Sign Language Recognition & Translation App

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22.0-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-0.8-00F0FF?style=flat)
![Firebase](https://img.shields.io/badge/Firebase-11.8.1-FFCA28?style=flat&logo=firebase&logoColor=black)

A React-based application for real-time American Sign Language (ASL) recognition and learning, utilizing computer vision and machine learning technologies to bridge communication barriers.

<p align="center">
  <img src="/public/image_screen/home.png" alt="Sign Language App Home Screen" width="700"/>
</p>

## Table of Contents

- [Project Overview](#project-overview)
- [Features & Application Screens](#features--application-screens)
  - [Home Screen](#home-screen)
  - [Sign Language Recognition](#sign-language-recognition-video-to-word)
  - [Sign Language Learning](#sign-language-learning-word-to-animation)
  - [Video Upload & Dataset Contribution](#video-upload--dataset-contribution)
- [Supported Vocabulary](#supported-vocabulary)
- [Technical Implementation](#technical-implementation)
  - [Technology Stack](#technology-stack)
  - [Machine Learning Pipeline](#machine-learning-pipeline)
  - [Model Development](#model-development)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Instructions](#usage-instructions)
- [Development Process](#development-process)
- [Performance & Limitations](#performance--limitations)
- [Contributing & Future Work](#contributing--future-work)
- [License](#license)

## Project Overview

This project addresses the communication gap between deaf/hard-of-hearing individuals and the general population through a technological solution. The application leverages recent advancements in computer vision and machine learning to enable real-time American Sign Language (ASL) recognition and translation.

### Problem Statement

Communication barriers significantly impact the daily lives of approximately 70 million deaf people worldwide who use sign language as their primary means of communication. These barriers affect education, healthcare access, employment opportunities, and social interactions.

### Solution Approach

Our application implements a comprehensive approach to sign language accessibility through:

1. **Real-time Recognition**: Converting sign language gestures to text through computer vision and machine learning
2. **Educational Platform**: Providing resources for learning ASL through visual demonstrations
3. **Community Contribution**: Enabling users to contribute to the dataset, improving model accuracy over time
4. **Accessibility-First Design**: Creating an intuitive interface usable by both deaf and hearing individuals

### Target Users

- Deaf and hard-of-hearing individuals seeking to communicate with those unfamiliar with sign language
- Hearing individuals looking to learn and practice ASL
- Educational institutions teaching sign language
- Organizations seeking to improve accessibility in their communication channels
- Researchers in the fields of computer vision and accessibility technology

### Impact on Accessibility

This application aims to:
- Reduce communication barriers in everyday interactions
- Promote learning and adoption of sign language among the general population
- Create a self-improving system through community contributions
- Demonstrate the potential of AI technologies in addressing accessibility challenges

## Features & Application Screens

### Home Screen
![Home Screen](/public/image_screen/home.png)

The Home Screen serves as the central navigation hub of the application, featuring:
- Modern user interface with intuitive design principles
- Gradient background with subtle animations for enhanced visual appeal
- Quick access buttons to all primary features
- Responsive layout adapting to various device dimensions
- Clear visual hierarchy to guide user interactions

### Sign Language Recognition (Video to Word)
![Video to Word](/public/image_screen/Video%20to%20Word.png)

The Sign Language Recognition screen enables real-time translation through:
- Live camera feed with MediaPipe skeletal tracking overlay
- Real-time sign language gesture recognition
- Visual display of detected signs with corresponding confidence scores
- Accumulation of recognized signs into coherent text output
- Clear visual feedback during the recognition process
- Optimal frame rate processing for smooth interaction

### Sign Language Learning (Word to Animation)
![Word to Animation](/public/image_screen/Word%20to%20Animation.png)

The Sign Language Learning screen facilitates educational objectives through:
- Searchable database of sign language demonstrations
- High-quality video animations for each supported sign
- Intuitive playback controls (play, pause, replay)
- Visual word selection interface
- Educational reference for proper sign execution
- Consistent visual design with the application's aesthetic

### Video Upload & Dataset Contribution
![Video Upload](/public/image_screen/Video%20Upload.png)

The Video Upload screen enables community contribution through:
- Drag-and-drop interface for video submission
- Metadata form for proper categorization of uploads
- Preview functionality for verification before submission
- Progress indicators during upload and processing
- Automatic extraction of skeletal keypoints for model training
- Contribution to the continuous improvement of the recognition model

## Supported Vocabulary

The current implementation supports recognition of 30 common ASL signs:

"Bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day", "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom", "need", "no", "red", "sick", "son", "study", "tall", "thank", "tired", "write", "yes", "you"

This vocabulary was selected based on frequency analysis of common conversational signs and educational value for beginners learning ASL.

## Technical Implementation

### Technology Stack

The application utilizes a modern technology stack designed for performance, accessibility, and scalability:

- **Frontend**: React.js (v19.1.0) with functional components and hooks for efficient UI rendering
- **State Management**: React Context API for global state management
- **Machine Learning**: TensorFlow.js (v4.22.0) for in-browser machine learning inference
- **Computer Vision**: MediaPipe Holistic for skeletal tracking and keypoint extraction
- **Authentication**: Firebase Authentication for user management and security
- **Storage**: Firebase Storage for video assets and user contributions
- **Video Processing**: Python scripts utilizing OpenCV and MediaPipe for offline processing
- **Styling**: Styled-components for component-based CSS management

### Machine Learning Pipeline

The sign language recognition system employs a sophisticated pipeline:

1. **Input Processing**: Capture video stream from camera or process uploaded video
2. **Feature Extraction**: MediaPipe Holistic extracts 225-dimensional keypoint vectors representing hands, face, and body pose landmarks
3. **Data Preprocessing**: Normalization of spatial coordinates and temporal sequence formatting
4. **Model Inference**: Custom-trained TensorFlow.js model performs classification on the processed feature vectors
5. **Output Generation**: Conversion of model predictions to text with corresponding confidence scores

This pipeline operates efficiently within browser constraints, achieving near real-time performance without requiring server-side processing.

### Model Development

The model development process is thoroughly documented in the `azure_data` folder:

- **Training Data**: Collection of ASL video samples in `/azure_data/videos/` organized by sign category
- **Data Processing**: Jupyter notebooks in `/azure_data/sign_model.ipynb` documenting the entire model development workflow
- **Feature Engineering**: Extracted keypoint data stored in `/azure_data/processed_keypoints/` for model training
- **Model Architecture**: Custom neural network architecture optimized for keypoint sequence classification
- **Training Methodology**: Supervised learning approach with cross-validation
- **Model Evaluation**: Performance metrics including accuracy, precision, recall, and F1-score
- **Model Export**: Conversion to TensorFlow.js format for browser deployment

## Project Structure

```
/
├── public/
│   ├── image_screen/       # Application screenshots
│   ├── sign_videos/        # ASL animation videos
│   ├── tfjs_model/         # Trained TensorFlow.js model
│   └── uploads/            # User-uploaded videos
├── src/
│   ├── components/         # Reusable React components
│   ├── contexts/           # Context providers (theme, auth)
│   ├── screens/            # Main application screens
│   ├── firebaseConfig.js   # Firebase configuration
│   └── App.js              # Main application component
├── azure_data/
│   ├── processed_keypoints/# MediaPipe extracted features
│   ├── videos/             # Training dataset
│   └── sign_model.ipynb    # Jupyter notebook for model development
└── package.json            # Project dependencies
```

## Installation & Setup

### Prerequisites

- Node.js (v14.0 or higher)
- npm (v6.0 or higher) or yarn
- Python 3.8+ (for video processing scripts)
- Web browser with camera access (Chrome recommended)
- Firebase account for authentication and storage

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/username/sign-language-recognition.git
   cd sign-language-recognition
   ```

2. Install JavaScript dependencies:
   ```
   npm install
   ```

3. Install Python dependencies (for video processing):
   ```
   pip install mediapipe opencv-python numpy
   ```

4. Configure Firebase:
   - Create a project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password method
   - Create a Firebase Storage bucket
   - Add your Firebase configuration to `src/firebaseConfig.js`

5. Start the development server:
   ```
   npm start
   ```

## Usage Instructions

### Starting the Application

1. Run `npm start` to launch the development server
2. Navigate to `http://localhost:3000` in your web browser
3. Log in with your Firebase credentials or create a new account

### Basic User Workflow

1. **Sign Language Recognition**:
   - Select "Video to Word" from the home screen
   - Grant camera permissions when prompted
   - Position yourself in the camera frame
   - Perform ASL signs from the supported vocabulary
   - View real-time translations with confidence scores

2. **Learning Sign Language**:
   - Select "Word to Animation" from the home screen
   - Search for a word from the supported vocabulary
   - Watch the demonstration video
   - Practice the sign along with the video
   - Use playback controls to review as needed

3. **Contributing to the Dataset**:
   - Select "Video Upload" from the home screen
   - Drag and drop your sign language video or click to browse
   - Fill in the required metadata (sign, contributor name)
   - Preview the video for quality assurance
   - Submit to contribute to the dataset

### Optimal Recognition Performance

- Ensure adequate lighting conditions
- Position yourself clearly in the camera frame
- Make deliberate, clear sign gestures
- Maintain appropriate distance from the camera
- Minimize background distractions
- Wear solid-colored clothing that contrasts with your skin tone

## Development Process

The development of this application presented several technical challenges that required innovative solutions:

### Challenges and Solutions

1. **Real-time Performance**:
   - Challenge: Achieving real-time recognition in browser environment
   - Solution: Optimized MediaPipe configuration and implemented efficient frame processing

2. **Model Accuracy**:
   - Challenge: Creating a robust model for diverse users and environments
   - Solution: Extensive data augmentation and feature engineering to improve generalization

3. **Browser Compatibility**:
   - Challenge: Ensuring consistent performance across different browsers
   - Solution: Progressive enhancement approach with fallbacks for unsupported features

4. **User Experience**:
   - Challenge: Creating an intuitive interface for both technical and non-technical users
   - Solution: Iterative design process with user feedback and accessibility considerations

### Learning Outcomes

This project provided valuable insights into:
- Integration of machine learning with web technologies
- Real-time computer vision processing techniques
- Accessible UI/UX design principles
- Cross-disciplinary application of AI for social impact

## Performance & Limitations

### Current Performance

- Model accuracy: approximately 85% on the test dataset
- Recognition latency: 200-300ms on modern browsers
- Browser support: Chrome (optimal), Firefox, Safari, Edge

### System Requirements

- Desktop/laptop with webcam or mobile device with camera
- Minimum 4GB RAM recommended
- Modern browser with WebGL support
- Stable internet connection for initial loading

### Known Limitations

- Recognition accuracy decreases in poor lighting conditions
- Limited vocabulary of 30 signs in the current implementation
- Potential decreased performance on older mobile devices
- Dependency on clear visibility of hands and upper body
- Variations in signing style may affect recognition accuracy

## Contributing & Future Work

### Contribution Guidelines

Contributions to this project are welcome through the following methods:
1. **Code contributions**: Submit pull requests with improvements or bug fixes
2. **Data contributions**: Upload sign language videos through the application
3. **Documentation**: Improve or translate documentation
4. **Testing**: Report bugs or usability issues

### Future Research Directions

This project lays the groundwork for several promising research directions:
1. **Expanded Vocabulary**: Increasing the number of supported signs
2. **Sentence-Level Recognition**: Moving beyond individual signs to grammatical structures
3. **Personalization**: User-specific model adaptation for improved accuracy
4. **Cross-Language Support**: Extending beyond ASL to other sign languages
5. **Mobile Optimization**: Enhanced performance for mobile devices

### Scalability Considerations

The current architecture supports scaling through:
- Browser-based inference reducing server requirements
- Asynchronous processing of user contributions
- Modular design allowing for component-level enhancements
- Progressive loading for optimal resource utilization

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


