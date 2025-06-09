import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

// Import all styled components from the separate styles file
import {
  ModernCameraContainer,
  HeaderSection,
  MainTitle,
  TitleIcon,
  Subtitle,
  TranslationDisplay,
  TranslationIcon,
  TranslationText,
  InlineButton,
  ButtonIcon,
  CameraSection,
  VideoContainer,
  ModernCanvas,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  StatusSection,
  StatusCard,
  StatusHeader,
  StatusIcon,
  PredictionDisplay,
  SystemStatus,
  StatusItem,
  StatusLabel,
  StatusValue,
  ErrorContainer,
  ErrorCard,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage
} from './CameraStyles';

const Sign_language_recognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const holisticRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const modelRef = useRef(null);
  const [isMediaPipeLoaded, setIsMediaPipeLoaded] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState({ word: '', confidence: 0 });
  const [sentence, setSentence] = useState([]);
  const [sequenceBuffer, setSequenceBuffer] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  
  // Camera states
  const [currentStream, setCurrentStream] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const streamRef = useRef(null);
  
  // Control refs
  const isPredictionRunningRef = useRef(false);
  const isProcessingFrameRef = useRef(false);
  const [totalPredictions, setTotalPredictions] = useState(0);
 
  // Constants
  const ACTIONS = React.useMemo(() => [
    "Bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day",
    "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom",
    "need", "no", "red", "sick", "son", "study", "tall", "thank you",
    "tired", "write", "yes", "you"
  ], []);
 
  const SEQ_LEN = 30;
  const THRESHOLD = 0.7;
  const SMOOTH_WINDOW = 3;
  const EMA_ALPHA = 0.7;

  const POSE_CONNECTIONS = React.useMemo(() => [
    [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8],
    [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
    [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20],
    [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28],
    [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]
  ], []);
 
  const HAND_CONNECTIONS = React.useMemo(() => [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20]
  ], []);
 
  // Smoothing
  const smootherRef = useRef({
    window: [],
    maxSize: SMOOTH_WINDOW,
    apply: function(pred) {
      this.window.push(pred);
      if (this.window.length > this.maxSize) {
        this.window.shift();
      }
      const counts = {};
      let maxCount = 0;
      let mostFrequent = pred;
      for (let item of this.window) {
        counts[item] = (counts[item] || 0) + 1;
        if (counts[item] > maxCount) {
          maxCount = counts[item];
          mostFrequent = item;
        }
      }
      return mostFrequent;
    }
  });
 
  const emaFilterRef = useRef({
    ema: null,
    alpha: EMA_ALPHA,
    apply: function(probs) {
      if (this.ema === null) {
        this.ema = [...probs];
      } else {
        for (let i = 0; i < probs.length; i++) {
          this.ema[i] = this.alpha * probs[i] + (1 - this.alpha) * this.ema[i];
        }
      }
      return this.ema;
    }
  });

  // Drawing functions
  const drawLandmarks = useCallback((ctx, landmarks, color = '#FF0000', radius = 2) => {
    ctx.fillStyle = color;
    landmarks.forEach(landmark => {
      ctx.beginPath();
      ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, []);
 
  const drawConnections = useCallback((ctx, landmarks, connections, color = '#00FF00', lineWidth = 2) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    connections.forEach(([start, end]) => {
      if (landmarks[start] && landmarks[end]) {
        ctx.beginPath();
        ctx.moveTo(landmarks[start].x * ctx.canvas.width, landmarks[start].y * ctx.canvas.height);
        ctx.lineTo(landmarks[end].x * ctx.canvas.width, landmarks[end].y * ctx.canvas.height);
        ctx.stroke();
      }
    });
  }, []);

  // Extract keypoints
  const extractKeypoints = useCallback((results) => {
    let pose = new Array(99).fill(0);
    if (results.poseLandmarks) {
      pose = results.poseLandmarks.flatMap(lm => [lm.x, lm.y, 0.0]);
    }
 
    let leftHand = new Array(63).fill(0);
    if (results.leftHandLandmarks) {
      leftHand = results.leftHandLandmarks.flatMap(lm => [lm.x, lm.y, lm.z]);
    }
 
    let rightHand = new Array(63).fill(0);
    if (results.rightHandLandmarks) {
      rightHand = results.rightHandLandmarks.flatMap(lm => [lm.x, lm.y, lm.z]);
    }
 
    if (!results.leftHandLandmarks && !results.rightHandLandmarks) {
      return null;
    }
 
    return [...pose, ...leftHand, ...rightHand];
  }, []);

  // Prediction function
  const makePrediction = useCallback(async (buffer) => {
    if (!modelRef.current || !Array.isArray(buffer) || buffer.length !== SEQ_LEN || isPredictionRunningRef.current) return;
 
    try {
      isPredictionRunningRef.current = true;
      setIsProcessing(true);
      
      const inputTensor = tf.tensor(buffer, [SEQ_LEN, 225], 'float32').expandDims(0);
      const resultTensor = modelRef.current.predict(inputTensor);
      const probabilities = await resultTensor.data();
 
      const probsEma = emaFilterRef.current.apply(Array.from(probabilities));
      const predictedClassIdx = tf.argMax(tf.tensor1d(probsEma)).dataSync()[0];
      
      const predSmooth = smootherRef.current.apply(predictedClassIdx);
      const confidence = probsEma[predSmooth];
 
      setTotalPredictions(prev => prev + 1);
 
      if (confidence > THRESHOLD) {
        const word = ACTIONS[predSmooth];
        setCurrentPrediction({ word, confidence, classIndex: predSmooth });
        setSentence(prev => {
          if (prev.length === 0 || prev[prev.length - 1] !== word) {
            return [...prev, word].slice(-5);
          }
          return prev;
        });
      } else {
        setCurrentPrediction({ word: ACTIONS[predSmooth], confidence, classIndex: predSmooth });
      }
 
      // Memory cleanup
      inputTensor.dispose();
      if (Array.isArray(resultTensor)) {
        resultTensor.forEach(t => t.dispose());
      } else {
        resultTensor.dispose();
      }
      
      setSequenceBuffer([]);
      setFrameCount(0);
      setIsCollecting(false);
      
    } catch (err) {
      setCurrentPrediction({ word: 'Error', confidence: 0, classIndex: -1 });
      setSequenceBuffer([]);
      setFrameCount(0);
      setIsCollecting(false);
    } finally {
      isPredictionRunningRef.current = false;
      setIsProcessing(false);
    }
  }, [ACTIONS, THRESHOLD, SEQ_LEN]);

  // MediaPipe results handler
  const onResults = useCallback((results) => {
    if (isProcessingFrameRef.current || !canvasRef.current || !videoRef.current) return;
    
    isProcessingFrameRef.current = true;
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;
 
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
 
      // Draw video directly (no mirroring for back camera)
      ctx.drawImage(video, 0, 0);
 
      // Draw landmarks
      if (results.poseLandmarks) {
        drawConnections(ctx, results.poseLandmarks, POSE_CONNECTIONS, '#00FF00', 2);
        drawLandmarks(ctx, results.poseLandmarks, '#FF0000', 2);
      }
      if (results.leftHandLandmarks) {
        drawConnections(ctx, results.leftHandLandmarks, HAND_CONNECTIONS, '#00FF00', 2);
        drawLandmarks(ctx, results.leftHandLandmarks, '#FF0000', 2);
      }
      if (results.rightHandLandmarks) {
        drawConnections(ctx, results.rightHandLandmarks, HAND_CONNECTIONS, '#00FF00', 2);
        drawLandmarks(ctx, results.rightHandLandmarks, '#FF0000', 2);
      }
 
      // Process keypoints
      const kp = extractKeypoints(results);
      if (kp !== null) {
        setSequenceBuffer(prev => {
          const newBuffer = [...prev, kp];
          const bufferLength = newBuffer.length;
          setIsCollecting(bufferLength < SEQ_LEN);
          setFrameCount(bufferLength);
 
          if (bufferLength === SEQ_LEN && !isPredictionRunningRef.current) {
            const bufferCopy = newBuffer.map(frame => [...frame]);
            makePrediction(bufferCopy);
          }
          
          return newBuffer;
        });
      } else {
        setFrameCount(prev => Math.max(0, prev - 1));
      }
    } finally {
      isProcessingFrameRef.current = false;
    }
  }, [drawConnections, drawLandmarks, POSE_CONNECTIONS, HAND_CONNECTIONS, extractKeypoints, makePrediction, SEQ_LEN]);

  // Start processing
  const startProcessing = useCallback(() => {
    const processFrame = async () => {
      if (videoRef.current && isMediaPipeLoaded && cameraReady && holisticRef.current?.send) {
        try {
          await holisticRef.current.send({ image: videoRef.current });
        } catch (err) {
          // Silent fail
        }
      }
      requestAnimationFrame(processFrame);
    };
    processFrame();
  }, [isMediaPipeLoaded, cameraReady]);

  // Load MediaPipe
  useEffect(() => {
    const loadMediaPipe = async () => {
      try {
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
              resolve();
              return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };
 
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1640029074/camera_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.6.1629159505/control_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1620248257/drawing_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/holistic.js');
 
        if (window.Holistic) {
          holisticRef.current = new window.Holistic({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`
          });
     
          holisticRef.current.setOptions({
            modelComplexity: 2,
            smoothLandmarks: true,
            refineFaceLandmarks: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            staticImageMode: false
          });
     
          holisticRef.current.onResults(onResults);
          setIsMediaPipeLoaded(true);
        }
      } catch (err) {
        setError('MediaPipe loading failed');
      }
    };
 
    loadMediaPipe();
  }, [onResults]);
 
  // Load TensorFlow model
  useEffect(() => {
    const loadModel = async () => {
      if (modelRef.current) return;
 
      try {
        setIsProcessing(true);
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        modelRef.current = loadedModel;
        setIsModelLoaded(true);
      } catch (err) {
        setError(`Model loading error: ${err.message}`);
      } finally {
        setIsProcessing(false);
      }
    };
    loadModel();
 
    return () => {
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, []);

  // Setup camera - SIMPLE BACK CAMERA
  const setupCamera = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        setCurrentStream(null);
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Simple approach - try multiple constraints until one works
      const constraintOptions = [
        // Option 1: Force exact environment
        {
          video: {
            facingMode: { exact: 'environment' },
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        },
        // Option 2: Prefer environment  
        {
          video: {
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        },
        // Option 3: Any back camera by device enumeration
        null // Will be filled dynamically
      ];

      let stream = null;
      
      // Try constraint options one by one
      for (let i = 0; i < constraintOptions.length && !stream; i++) {
        if (constraintOptions[i] === null) {
          // Try to find back camera by device enumeration
          try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(d => d.kind === 'videoinput');
            
            for (const device of videoDevices) {
              try {
                const testStream = await navigator.mediaDevices.getUserMedia({
                  video: { deviceId: { exact: device.deviceId } }
                });
                
                // Test if this is likely a back camera
                const track = testStream.getVideoTracks()[0];
                const settings = track.getSettings();
                
                if (settings.facingMode === 'environment' || 
                    device.label.toLowerCase().includes('back') ||
                    device.label.toLowerCase().includes('rear')) {
                  stream = testStream;
                  break;
                } else {
                  testStream.getTracks().forEach(t => t.stop());
                }
              } catch (err) {
                continue;
              }
            }
          } catch (err) {
            continue;
          }
        } else {
          try {
            stream = await navigator.mediaDevices.getUserMedia(constraintOptions[i]);
          } catch (err) {
            continue;
          }
        }
      }
      
      if (!stream) {
        // Last resort - any camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } }
        });
      }
      
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCurrentStream(stream);
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setCameraReady(true);
            setIsLoading(false);
            startProcessing();
          }).catch(() => {
            setError('Failed to start video playback');
          });
        };
        
        setError(null);
      }
    } catch (error) {
      setError(`Camera error: ${error.message}`);
      setIsLoading(false);
      setCameraReady(false);
    }
  }, [startProcessing]);

  // Setup camera when ready
  useEffect(() => {
    if (isMediaPipeLoaded && isModelLoaded) {
      setupCamera();
    }
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isMediaPipeLoaded, isModelLoaded, setupCamera]);
 
  const clearSentence = () => {
    setSentence([]);
    setCurrentPrediction({ word: '', confidence: 0, classIndex: -1 });
    setSequenceBuffer([]);
    setIsCollecting(false);
    setFrameCount(0);
    isPredictionRunningRef.current = false;
    isProcessingFrameRef.current = false;
    setTotalPredictions(0);
  };
   
  if (error) {
    return (
      <ErrorContainer>
        <ErrorCard>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Error</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorCard>
      </ErrorContainer>
    );
  }

  return (
    <ModernCameraContainer>
      <HeaderSection>
        <MainTitle>
          <TitleIcon>🎥</TitleIcon>
          Video to Word Translation
        </MainTitle>
        <Subtitle>AI-powered sign language recognition</Subtitle>
      </HeaderSection>

      <TranslationDisplay>
        <TranslationIcon>💬</TranslationIcon>
        <TranslationText>
          {sentence.length > 0
            ? sentence.join(' ')
            : 'Perform signs to see translation...'}
        </TranslationText>
        <InlineButton 
          onClick={clearSentence}
          disabled={!isMediaPipeLoaded || !isModelLoaded}
        >
          <ButtonIcon>🗑️</ButtonIcon>
          Clear
        </InlineButton>
      </TranslationDisplay>

      <CameraSection>
        <VideoContainer>
          <video
            ref={videoRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0
            }}
            autoPlay
            muted
            playsInline
          />
          <ModernCanvas ref={canvasRef} />
          
          {isLoading && (
            <LoadingOverlay>
              <LoadingSpinner />
              <LoadingText>Loading...</LoadingText>
            </LoadingOverlay>
          )}
        </VideoContainer>
      </CameraSection>

      <StatusSection>
        <StatusCard>
          <StatusHeader>
            <StatusIcon>🤖</StatusIcon>
            Prediction
          </StatusHeader>
          
          <PredictionDisplay $confidence={currentPrediction.confidence > THRESHOLD}>
            {currentPrediction.word
              ? `${currentPrediction.word} (${(currentPrediction.confidence * 100).toFixed(1)}%)`
              : 'Processing...'}
          </PredictionDisplay>

          <SystemStatus>
            <StatusItem>
              <StatusLabel>Buffer:</StatusLabel>
              <StatusValue $isActive={isCollecting}>
                {frameCount}/{SEQ_LEN}
              </StatusValue>
            </StatusItem>
          </SystemStatus>
        </StatusCard>
      </StatusSection>
    </ModernCameraContainer>
  );
};

export default Sign_language_recognition;