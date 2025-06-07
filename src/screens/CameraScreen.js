import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import styled, { keyframes, css } from 'styled-components';
import { FaCamera, FaSync } from 'react-icons/fa';

// Modern styled components for the camera screen
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px #007bff40; }
  50% { box-shadow: 0 0 30px #007bff60; }
`;

const ModernCameraContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TitleIcon = styled.span`
  font-size: 2.5rem;
  ${css`animation: ${pulse} 2s infinite;`}

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TranslationDisplay = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;  
  align-items: center;
  gap: 1rem;
  min-height: 80px;
  ${css`animation: ${fadeIn} 0.8s ease-out 0.2s both;`}

  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

const TranslationIcon = styled.span`
  font-size: 2rem;
  ${css`animation: ${pulse} 2s infinite;`}
`;

const TranslationText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  flex: 1;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ControlsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    align-items: center;
  }
`;

const ModernButton = styled.button`
  background: ${props => {
    if (props.$variant === 'danger') {
      return 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
    }
    if (props.$variant === 'camera') {
      return 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    }
    return 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
  }};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 48px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    ${css`animation: ${glow} 2s infinite;`}
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    flex: 1;
    min-width: 140px;
    max-width: 200px;
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.1rem;
  ${props => props.$isSpinning && css`animation: ${spin} 1s linear infinite;`}
`;

const CameraSection = styled.div`
  flex: 1;
  display: flex;  
  justify-content: center;
  align-items: center;
  ${css`animation: ${fadeIn} 1s ease-out 0.4s both;`}
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 4/3;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    aspect-ratio: 16/12;
  }
`;

const ModernCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 10;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
`;

const LoadingText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  text-align: center;
`;

const CameraNotification = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
`;

const StatusSection = styled.div`
  ${css`animation: ${fadeIn} 1.2s ease-out 0.6s both;`}
`;

const StatusCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
`;

const StatusIcon = styled.span`
  font-size: 1.2rem;
`;

const PredictionDisplay = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 1.5rem;
  background: ${props => props.$confidence 
    ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
    : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  transition: all 0.3s ease;
  ${props => props.$confidence && css`animation: ${pulse} 2s infinite;`}
`;

const SystemStatus = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatusLabel = styled.span`
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

const StatusValue = styled.span`
  font-weight: 600;
  color: ${props => props.$isActive 
    ? '#4ade80'
    : 'rgba(255, 255, 255, 0.9)'};
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ErrorCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;  
  text-align: center;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  ${css`animation: ${pulse} 2s infinite;`}
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ErrorHint = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #dc3545;
`;

const ErrorCode = styled.code`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: white;
  font-size: 0.875rem;
`;

// MediaPipe Holistic Component with Real MediaPipe Integration
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
  
  // Camera switching states
  const [isMobile, setIsMobile] = useState(false);
  const [currentStream, setCurrentStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [cameraReady, setCameraReady] = useState(false);
  const streamRef = useRef(null);
 
  // הגדרות זהות לגרסת Python - מועברות למemoized values
  const ACTIONS = React.useMemo(() => [
    "Bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day",
    "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom",
    "need", "no", "red", "sick", "son", "study", "tall", "thank you",
    "tired", "write", "yes", "you"
  ], []);
 
  const SEQ_LEN = 30;
  const THRESHOLD = 0.7;
  const SMOOTH_WINDOW = 4;
  const EMA_ALPHA = 0.6;

  // Constants for MediaPipe connections - מועברות למemoized values
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
 
  // Smoothing classes
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

  // Drawing utility functions
  const drawLandmarks = useCallback((ctx, landmarks, color = '#FF0000', radius = 2) => {
    if (!landmarks) return;
    ctx.fillStyle = color;
    landmarks.forEach(landmark => {
      const x = landmark.x * ctx.canvas.width;
      const y = landmark.y * ctx.canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, []);
 
  const drawConnections = useCallback((ctx, landmarks, connections, color = '#00FF00', lineWidth = 2) => {
    if (!landmarks) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    connections.forEach(([start, end]) => {
      if (landmarks[start] && landmarks[end]) {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];
        ctx.beginPath();
        ctx.moveTo(startPoint.x * ctx.canvas.width, startPoint.y * ctx.canvas.height);
        ctx.lineTo(endPoint.x * ctx.canvas.width, endPoint.y * ctx.canvas.height);
        ctx.stroke();
      }
    });
  }, []);

  // פונקצית חילוץ keypoints
  const extractKeypoints = useCallback((results) => {
    let pose = new Array(33 * 3).fill(0);
    if (results.poseLandmarks) {
      pose = results.poseLandmarks.flatMap(lm => [lm.x, lm.y, 0.0]);
    }
 
    let leftHand = new Array(21 * 3).fill(0);
    if (results.leftHandLandmarks) {
      leftHand = results.leftHandLandmarks.flatMap(lm => [lm.x, lm.y, lm.z]);
    }
 
    let rightHand = new Array(21 * 3).fill(0);
    if (results.rightHandLandmarks) {
      rightHand = results.rightHandLandmarks.flatMap(lm => [lm.x, lm.y, lm.z]);
    }
 
    if (!results.leftHandLandmarks && !results.rightHandLandmarks) {
      return null;
    }
 
    return [...pose, ...leftHand, ...rightHand];
  }, []);

  const makePrediction = useCallback(async (buffer) => {
    if (!modelRef.current || !Array.isArray(buffer) || buffer.length !== SEQ_LEN || isProcessing) return;
 
    try {
      setIsProcessing(true);
      for (let i = 0; i < buffer.length; i++) {
        if (!Array.isArray(buffer[i]) || buffer[i].length !== 225) {
          throw new Error(`Invalid frame ${i}: expected 225 features, got ${buffer[i]?.length}`);
        }
      }
      const inputTensor = tf.tensor(buffer, [SEQ_LEN, 225], 'float32').expandDims(0);
      const resultTensor = modelRef.current.predict(inputTensor);
      const probabilities = await resultTensor.data();
 
      const probsEma = emaFilterRef.current.apply(Array.from(probabilities));
      const predictedClassIdx = tf.argMax(tf.tensor1d(probsEma)).dataSync()[0];
      const predSmooth = smootherRef.current.apply(predictedClassIdx);
      const confidence = probsEma[predSmooth];
 
      if (confidence > THRESHOLD) {
        const word = ACTIONS[predSmooth];
        setCurrentPrediction({ word, confidence, classIndex: predSmooth });
        setSentence(prev => {
          if (prev.length === 0 || prev[prev.length - 1] !== word) {
            const newSentence = [...prev, word];
            return newSentence.slice(-5);
          } else {
            return prev;
          }
        });
      } else {
        setCurrentPrediction({ word: ACTIONS[predSmooth], confidence, classIndex: predSmooth });
      }
 
      inputTensor.dispose();
      if (Array.isArray(resultTensor)) {
        resultTensor.forEach((t) => t.dispose());
      } else {
        resultTensor.dispose();
      }
    } catch (err) {
      console.error('❌ Prediction error:', err);
      setCurrentPrediction({ word: 'Error', confidence: 0, classIndex: -1 });
    } finally {
      setIsProcessing(false);
    }
  }, [ACTIONS, THRESHOLD, SEQ_LEN, isProcessing]);

  // טעינת MediaPipe
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onResults = useCallback((results) => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;
 
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
 
      // ציור הווידאו
      ctx.save();
      if (facingMode === 'user') {
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
      }
      ctx.drawImage(video, 0, 0);
      ctx.restore();
 
      // ציור landmarks
      ctx.save();
      if (facingMode === 'user') {
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
      }
      
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
      ctx.restore();
 
      // חילוץ keypoints והוספה לבאפר
      const kp = extractKeypoints(results);
      if (kp !== null) {
        setSequenceBuffer(prev => {
          const newBuffer = [...prev, kp];
          setIsCollecting(newBuffer.length < SEQ_LEN);
          setFrameCount(newBuffer.length);
 
          if (newBuffer.length === SEQ_LEN) {
            makePrediction(newBuffer);
            return [];
          }
          return newBuffer;
        });
      } else {
        // אם אין ידיים, עדכן רק את הפריים קאונטר
        setFrameCount(prev => Math.max(0, prev - 1));
      }
    }
  }, [facingMode, drawConnections, drawLandmarks, POSE_CONNECTIONS, HAND_CONNECTIONS, extractKeypoints, makePrediction, SEQ_LEN]);

  // Start processing function
  const startProcessing = useCallback(() => {
    const processFrame = async () => {
      if (videoRef.current && isMediaPipeLoaded && cameraReady) {
        if (holisticRef.current && holisticRef.current.send && window.Holistic) {
          try {
            await holisticRef.current.send({ image: videoRef.current });
          } catch (err) {
            console.warn('MediaPipe send error:', err);
          }
        }
      }
      requestAnimationFrame(processFrame);
    };
    processFrame();
  }, [isMediaPipeLoaded, cameraReady]);

  // Check if device is mobile and get available cameras
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobile = /android/i.test(userAgent) || 
                    /iPad|iPhone|iPod/.test(userAgent) || 
                    (window.innerWidth <= 768);
      setIsMobile(mobile);
      if (mobile) {
        setFacingMode('user');
      } else {
        setFacingMode('environment');
      }
    };

    const getAvailableCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setAvailableCameras(cameras);
        console.log(`Found ${cameras.length} cameras:`, cameras.map(c => c.label));
      } catch (err) {
        console.warn('Could not enumerate cameras:', err);
      }
    };

    checkDevice();
    getAvailableCameras();

    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
 
        const initializeHolistic = () => {
          try {
            if (!window.Holistic) {
              throw new Error('Holistic not available');
            }
     
            holisticRef.current = new window.Holistic({
              locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`
            });
     
            holisticRef.current.setOptions({
              modelComplexity: 2,
              smoothLandmarks: false,
              refineFaceLandmarks: false,
              minDetectionConfidence: 0.5,
              minTrackingConfidence: 0.5,
              staticImageMode: false
            });
     
            holisticRef.current.onResults(onResults);
            setIsMediaPipeLoaded(true);
          } catch (err) {
            console.error('MediaPipe initialization error:', err);
          }
        };

        initializeHolistic();
      } catch (err) {
        console.error('MediaPipe loading error:', err);
      }
    };
 
    loadMediaPipe();
  }, [onResults]);
 
  // טעינת המודל TensorFlow
  useEffect(() => {
    const loadModel = async () => {
      if (modelRef.current) return;
 
      try {
        setIsProcessing(true);
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        modelRef.current = loadedModel;
        setIsModelLoaded(true);
      } catch (err) {
        console.error('❌ Error loading model:', err);
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

  // Request camera access and setup video stream
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setupCamera = useCallback(async () => {
    try {
      console.log('Setting up camera with facingMode:', facingMode);
      
      // Stop any previous camera stream
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
        streamRef.current = null;
        setCurrentStream(null);
      }
      
      // Wait a bit for camera to be released
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const getVideoConstraints = () => {
        const baseConstraints = {
          width: { ideal: isMobile ? 720 : 1280 },
          height: { ideal: isMobile ? 1280 : 720 },
          facingMode: { exact: facingMode }
        };
        
        return baseConstraints;
      };
      
      const constraints = {
        video: getVideoConstraints()
      };
      
      console.log("Requesting camera with constraints:", constraints);
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCurrentStream(stream);
          
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(() => {
              setCameraReady(true);
              setIsLoading(false);
              console.log('✅ Camera started successfully');
              
              const videoTrack = stream.getVideoTracks()[0];
              if (videoTrack) {
                const settings = videoTrack.getSettings();
                console.log('Using camera:', videoTrack.label);
                console.log('Camera settings:', settings);
                console.log('Actual facingMode:', settings.facingMode);
              }
              
              startProcessing();
            }).catch(err => {
              console.error('❌ Error playing video:', err);
              setError('Failed to start video playback');
            });
          };
          
          setError(null);
        }
      } catch (exactError) {
        console.warn('Exact facingMode failed, trying ideal:', exactError);
        
        // Fallback to ideal instead of exact
        const fallbackConstraints = {
          video: {
            width: { ideal: isMobile ? 720 : 1280 },
            height: { ideal: isMobile ? 1280 : 720 },
            facingMode: { ideal: facingMode }
          }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCurrentStream(stream);
          
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(() => {
              setCameraReady(true);
              setIsLoading(false);
              console.log('✅ Camera started successfully (fallback)');
              
              const videoTrack = stream.getVideoTracks()[0];
              if (videoTrack) {
                const settings = videoTrack.getSettings();
                console.log('Using camera (fallback):', videoTrack.label);
                console.log('Camera settings:', settings);
                console.log('Actual facingMode:', settings.facingMode);
              }
              
              startProcessing();
            }).catch(err => {
              console.error('❌ Error playing video:', err);
              setError('Failed to start video playback');
            });
          };
          
          setError(null);
        }
      }
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      
      if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
        setError(`Could not access ${facingMode === 'user' ? 'front' : 'back'} camera: Your device may not have this camera or it might be in use by another application.`);
      } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setError(`Camera access denied: Please enable camera permissions in your browser settings and reload this page.`);
      } else {
        setError(`Camera error: ${error.message}. Try reloading the page or using a different device/browser.`);
      }
      setIsLoading(false);
      setCameraReady(false);
    }
  }, [facingMode, isMobile, startProcessing]);

  // Camera switching function
  const switchCamera = async () => {
    if (!isMobile || availableCameras.length < 2) {
      console.log('Camera switch not available:', { isMobile, availableCameras: availableCameras.length });
      return;
    }
    
    console.log('Switching camera from', facingMode);
    setIsSwitchingCamera(true);
    setCameraReady(false);
    setIsLoading(true);
    
    try {
      // Stop current stream first
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => {
          track.stop();
          console.log('Stopped track:', track.label);
        });
        streamRef.current = null;
        setCurrentStream(null);
      }
      
      // Wait for camera to be fully released
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
      console.log('Switching to facingMode:', newFacingMode);
      setFacingMode(newFacingMode);
      
      // Small delay before starting new camera
      setTimeout(() => {
        setIsSwitchingCamera(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error switching camera:', err);
      setError(`Error switching camera: ${err.message}`);
      setIsSwitchingCamera(false);
      setIsLoading(false);
    }
  };

  // Use effect to setup camera when component mounts or facing mode changes
  useEffect(() => {
    if (isMediaPipeLoaded && isModelLoaded && !isSwitchingCamera) {
      setupCamera();
    }
    
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isMediaPipeLoaded, isModelLoaded, setupCamera, facingMode, isSwitchingCamera]);
 
  const clearSentence = () => {
    setSentence([]);
    setCurrentPrediction({ word: '', confidence: 0, classIndex: -1 });
    setSequenceBuffer([]);
    setIsCollecting(false);
    setFrameCount(0);
    console.log('🧹 Cleared sentence and buffer');
  };
   
  if (error) {
    return (
      <ErrorContainer>
        <ErrorCard>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Camera Error</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <ErrorHint>
            Make sure you have a valid TensorFlow.js model at{' '}
            <ErrorCode>/tfjs_model/model.json</ErrorCode>
          </ErrorHint>
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
        <Subtitle>AI-powered sign language recognition in real-time</Subtitle>
      </HeaderSection>

      {isMobile && availableCameras.length > 0 && (
        <CameraNotification>
          <FaCamera />
          Using {facingMode === 'user' ? 'Front' : 'Back'} Camera
          {availableCameras.length > 1 && ' - Tap switch to change'}
        </CameraNotification>
      )}

      <TranslationDisplay>
        <TranslationIcon>💬</TranslationIcon>
        <TranslationText>
          {sentence.length > 0
            ? sentence.join(' ')
            : 'Perform signs to see video-to-word translation...'}
        </TranslationText>
      </TranslationDisplay>

      <ControlsSection>
        <ModernButton 
          onClick={clearSentence}
          disabled={!isMediaPipeLoaded || !isModelLoaded}
          $variant="danger"
        >
          <ButtonIcon>🗑️</ButtonIcon>
          Clear Sentence
        </ModernButton>

        {isMobile && availableCameras.length > 1 && (
          <ModernButton 
            onClick={switchCamera}
            disabled={isSwitchingCamera || isLoading || !cameraReady}
            $variant="camera"
          >
            <ButtonIcon $isSpinning={isSwitchingCamera}>
              {isSwitchingCamera ? <FaSync /> : <FaCamera />}
            </ButtonIcon>
            {isSwitchingCamera ? 'Switching...' : 
             facingMode === 'user' ? 'Switch to Back' : 'Switch to Front'}
          </ModernButton>
        )}
      </ControlsSection>

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
          
          {(isLoading || isSwitchingCamera) && (
            <LoadingOverlay>
              <LoadingSpinner />
              <LoadingText>
                {isSwitchingCamera ? 'Switching camera...' : 'Initializing camera and AI model...'}
              </LoadingText>
            </LoadingOverlay>
          )}
        </VideoContainer>
      </CameraSection>

      <StatusSection>
        <StatusCard>
          <StatusHeader>
            <StatusIcon>🤖</StatusIcon>
            Latest Prediction
          </StatusHeader>
          
          <PredictionDisplay $confidence={currentPrediction.confidence > THRESHOLD}>
            {currentPrediction.word
              ? `${currentPrediction.word} (${(currentPrediction.confidence * 100).toFixed(1)}%)`
              : 'Processing...'}
          </PredictionDisplay>

          <SystemStatus>
            <StatusItem>
              <StatusLabel>MediaPipe:</StatusLabel>
              <StatusValue $isActive={isMediaPipeLoaded}>
                {isMediaPipeLoaded
                  ? window.Holistic
                    ? '✅ Real'
                    : '🎭 Simulation'
                  : '⏳ Loading...'}
              </StatusValue>
            </StatusItem>
            
            <StatusItem>
              <StatusLabel>AI Model:</StatusLabel>
              <StatusValue $isActive={isModelLoaded}>
                {isModelLoaded ? '✅ Loaded' : '⏳ Loading...'}
              </StatusValue>
            </StatusItem>
            
            <StatusItem>
              <StatusLabel>Camera:</StatusLabel>
              <StatusValue $isActive={cameraReady && currentStream}>
                {cameraReady && currentStream ? 
                  `✅ ${facingMode === 'user' ? 'Front' : 'Back'}` : 
                  '⏳ Loading...'}
              </StatusValue>
            </StatusItem>
            
            <StatusItem>
              <StatusLabel>Buffer:</StatusLabel>
              <StatusValue $isActive={isCollecting}>
                {frameCount}/{SEQ_LEN} {isCollecting ? '(Collecting)' : ''}
              </StatusValue>
            </StatusItem>
          </SystemStatus>
        </StatusCard>
      </StatusSection>
    </ModernCameraContainer>
  );
};

export default Sign_language_recognition;