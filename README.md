# Sign Language Recognition & Translation App

A comprehensive React application for real-time sign language recognition, translation, and learning. This application leverages machine learning models and MediaPipe Holistic to process sign language gestures, offering an accessible platform for both users who want to learn sign language and those who wish to communicate through it.

## Key Features

- **Real-time Sign Language Recognition**: Translate sign language gestures to text using webcam input and machine learning
- **Word to Sign Language Animation**: View accurate sign language animations for specific words or phrases
- **Custom Video Upload & Processing**: Contribute to the training dataset by uploading sign language videos
- **Secure User Authentication**: Firebase-based authentication for personalized user experience
- **Adaptive UI with Light/Dark Mode**: Fully responsive design with theme customization
- **Accessibility Optimizations**: Built with accessibility in mind for diverse user needs
- **Mobile Connection**: Connect to mobile devices for expanded functionality
- **Settings Customization**: Configure application preferences to suit individual needs

## Technical Implementation

### Architecture

The application is built with a modern tech stack:

- **Frontend**: React.js with functional components and hooks
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage for videos and extracted features
- **Machine Learning**: TensorFlow.js for in-browser inference
- **Video Processing**: MediaPipe Holistic for feature extraction
- **Styling**: CSS-in-JS with styled-components

### Machine Learning Pipeline

The sign language recognition system follows this pipeline:

1. **Input**: Camera feed or uploaded video
2. **Feature Extraction**: MediaPipe Holistic extracts 225-dimensional keypoint vectors (face, pose, hand landmarks)
3. **Preprocessing**: Normalization and formatting of keypoint data
4. **Model Inference**: Custom-trained TensorFlow.js model predicts sign class
5. **Post-processing**: Converting predictions to text with confidence scores

The model is trained using a custom dataset of sign language gestures, with multiple examples per sign class to ensure robustness.

## Prerequisites

Before running this application, you'll need:

- Node.js (v14 or higher)
- npm or yarn
- Python 3.8+ (for video processing)
- MediaPipe (`pip install mediapipe`)
- OpenCV (`pip install opencv-python`)
- NumPy (`pip install numpy`)
- Firebase account (for authentication and storage)

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install Python dependencies:
   ```
   pip install mediapipe opencv-python numpy
   ```
4. Configure Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firebase Storage bucket
   - Add your Firebase configuration to `src/firebaseConfig.js`

## Running the Application

### Development Mode

To run both the React frontend and Express backend:

```
npm run dev
```

This will start:
- React frontend on port 3000
- Express backend on port 5000

### Frontend Only

```
npm start
```

### Backend Only

```
npm run server
```

## Project Structure

- `/public`: Static files
  - `/sign_videos`: Sign language animation videos
  - `/tfjs_model`: TensorFlow.js model files
  - `/uploads`: Uploaded videos (created during runtime)
- `/src`: React frontend code
  - `/components`: UI components
  - `/contexts`: React contexts (theme, authentication)
  - `/screens`: Main application screens
  - `/styles`: Global styles and theme definitions
- `/azure_data`: Training data and notebooks
  - `/processed_keypoints`: Extracted MediaPipe Holistic keypoints
  - `/videos`: Raw sign language videos for training
- `server.js`: Express backend server
- `process_and_sample_video.py`: Python script for processing videos

## Application Screens

### Home Screen
The landing page of the application, providing navigation to all features and a brief introduction to the app's capabilities.

### Camera Screen
Real-time sign language recognition using the device's camera. Users can:
- Toggle camera on/off
- View real-time keypoint detection
- See recognized signs with confidence scores
- Record and save sign language sequences

### Sign to Animation Screen
Look up signs by text input. The application shows:
- High-quality sign language animations
- Step-by-step instructions
- Slow-motion playback option

### Video Upload Screen
Contribute to the sign language dataset by:
- Uploading videos of sign language gestures
- Labeling the sign being performed
- Processing videos to extract keypoints for model training

### Settings Screen
Customize the application experience:
- Toggle between light and dark themes
- Adjust camera settings
- Configure notification preferences
- Manage account settings

### Login Screen
Secure user authentication with:
- Email/password login
- Account creation
- Password recovery

### Mobile Connection Screen
Connect to mobile devices for:
- Remote sign language recognition
- Synchronized learning experiences
- Multi-device interactions

## Video Upload Feature

The video upload feature allows users to:
1. Upload MP4 videos of sign language gestures
2. Provide metadata (gesture name, contributor)
3. Process videos to extract 225-dimensional keypoints (pose + hands)
4. Store both the original video and the extracted keypoints

Uploaded videos are saved to `/public/uploads/<gesture>/` and processed keypoints are stored in `/processed_keypoints/<gesture>/<video_id>/keypoints.npy`.

## API Endpoints

- `POST /api/upload-video`: Upload a sign language video
- `GET /api/processing-status/:processingId`: Check video processing status
- `GET /api/videos`: Get list of all uploaded videos
- `GET /api/videos/:id`: Get details of a specific video

## Accessibility Features

This application is designed with accessibility in mind:
- All UI elements have appropriate ARIA labels
- Keyboard navigation support throughout the application
- Screen reader compatibility
- High contrast mode for visually impaired users
- Text alternatives for all visual elements

## Future Enhancements

- Integration with natural language processing for sentence-level translation
- Support for additional sign languages beyond the current dataset
- Real-time video chat with sign language translation
- Offline mode for learning without internet connection
- Gamification elements for sign language learning

