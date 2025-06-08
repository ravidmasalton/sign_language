# Sign Language App

A React application for sign language recognition and translation, with features for uploading, displaying, and recognizing sign language gestures.

## Features

- **Video to Word Translation**: Translate sign language gestures captured via webcam
- **Word to Animation**: View sign language animations for specific words
- **Video Upload**: Upload sign language videos and extract MediaPipe Holistic keypoints
- **Firebase Authentication**: Secure user login and access control

## Prerequisites

Before running this application, you'll need:

- Node.js (v14 or higher)
- npm or yarn
- Python 3.8+ (for video processing)
- MediaPipe (`pip install mediapipe`)
- OpenCV (`pip install opencv-python`)
- NumPy (`pip install numpy`)

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
  - `/uploads`: Uploaded videos (created during runtime)
- `/src`: React frontend code
  - `/components`: UI components
  - `/contexts`: React contexts
  - `/screens`: Main application screens
- `/processed_keypoints`: Extracted MediaPipe Holistic keypoints (created during runtime)
- `server.js`: Express backend server
- `process_and_sample_video.py`: Python script for processing videos

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

## License

[MIT License](LICENSE)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
