# Sign Language Recognition & Translation App

A comprehensive React application for real-time sign language recognition, translation, and learning. This application leverages machine learning models and MediaPipe Holistic to process sign language gestures, offering an accessible platform for both users who want to learn sign language and those who wish to communicate through it.

## Main Features Overview

### Home Screen
![Home Screen](/public/image_screen/home.png)

The Home Screen serves as the central hub of the application, providing intuitive navigation to all main features. Users are greeted with a clean, modern interface and clear options for sign language recognition, learning, and contribution.

### Sign Language Recognition (Video to Word)
![Video to Word](/public/image_screen/Video%20to%20Word.png)

The Sign Language Recognition screen enables real-time translation of sign language gestures to text. Using the device camera and machine learning, users can communicate through sign language and have their gestures instantly translated into written words.

### Sign Language Learning (Word to Animation)
![Word to Animation](/public/image_screen/Word%20to%20Animation.png)

The Word to Animation feature allows users to search for specific words or phrases and view the corresponding sign language animations. This is an essential tool for learning sign language, with high-quality animations and playback controls.

### Video Upload & Contribution
![Video Upload](/public/image_screen/Video%20Upload.png)

The Video Upload screen allows users to contribute to the sign language dataset by recording and uploading their own sign language videos. This helps expand the dataset and improve the machine learning model's accuracy over time.

## Detailed Feature Descriptions

### Home Screen
![Home Screen](/public/image_screen/home.png)

The Home Screen is designed with user experience in mind, featuring:

- **Modern Interface**: A clean, visually appealing design with intuitive navigation
- **Quick Access Tiles**: Large, easy-to-tap tiles for accessing main features
- **Gradient Background**: Soothing purple gradient that provides visual appeal
- **Animated Elements**: Subtle animations that enhance the user experience
- **Responsive Design**: Adapts seamlessly to different screen sizes

The home screen establishes the application's design language with its gradient backgrounds, floating cards, and accessibility-focused UI elements. Users can quickly access Sign Language Recognition, Word to Animation, Video Upload, and Settings from this central hub. The modern, minimalist design ensures that users can navigate to their desired feature without confusion.

### Sign Language Recognition (Video to Word)
![Video to Word](/public/image_screen/Video%20to%20Word.png)

The Sign Language Recognition screen transforms sign language into text through:

- **Real-time Camera Feed**: Shows user's gestures with overlay of detected keypoints
- **Live Recognition**: Displays recognized signs with confidence percentages
- **Accumulated Text**: Builds sentences from recognized signs
- **Adjustable Settings**: Controls for detection sensitivity and other parameters
- **Clear Visual Feedback**: Color-coded confidence indicators and smooth animations

This feature utilizes MediaPipe Holistic to extract 225-dimensional keypoint vectors from the user's hands, face, and pose. These keypoints are processed through a TensorFlow.js model that predicts the sign being performed. The system is designed to work in various lighting conditions and can recognize a vocabulary of 30 common signs. As users perform signs, the system displays the detected sign along with a confidence score, and allows building sentences by accumulating recognized words.

### Sign Language Learning (Word to Animation)
![Word to Animation](/public/image_screen/Word%20to%20Animation.png)

The Word to Animation screen facilitates learning through:

- **Word Search**: Input field to find specific words or phrases
- **High-quality Animations**: Clear, professional sign language demonstrations
- **Playback Controls**: Play, pause, slow-motion, and loop options
- **Voice Input**: Option to speak words for signing demonstration
- **Sequence Mode**: Create and play sequences of signs to form sentences

This feature serves as a learning tool for those wanting to learn sign language. Users can type a word or use voice input to search for signs. The application then displays high-quality video animations demonstrating the correct sign. Users can play, pause, and replay the animations as needed. The sequence mode allows users to create sentences by chaining multiple signs together, which is particularly useful for learning conversational sign language. The clean interface ensures that users can focus on the animations without distraction.

### Video Upload & Contribution
![Video Upload](/public/image_screen/Video%20Upload.png)

The Video Upload screen empowers users to contribute through:

- **Drag-and-Drop Interface**: Easy upload of sign language videos
- **Metadata Form**: Fields for categorizing and describing the uploaded sign
- **Preview Functionality**: Review uploaded content before processing
- **Processing Status**: Visual indicators of upload and processing progress
- **Contribution History**: Record of previous uploads and their impact

This collaborative feature allows the community to contribute to the sign language dataset, which in turn improves the model's recognition capabilities. Users can upload videos of themselves performing signs, specify the gesture name and contributor information, and preview the video before submission. The system processes these videos to extract keypoints using MediaPipe Holistic, which are then stored for potential model retraining. Progress indicators keep users informed throughout the upload and processing stages, creating a transparent and engaging contribution experience.

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

## Adding Screenshots to This README

To add the actual screenshots to this README:

1. Take screenshots of each main screen in the application
2. Save the screenshots in a `/docs/images/` directory (create this if it doesn't exist)
3. Update the image paths in this README to point to your actual images:
   ```markdown
   ![Home Screen](/docs/images/home-screen.png)
   ```
4. Consider adding alt text for accessibility:
   ```markdown
   ![Home Screen: Main dashboard with navigation tiles](/docs/images/home-screen.png)
   ```
5. Optimize images for web before adding (recommended size: 1280x720px or smaller)

## Contributing

