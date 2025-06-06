import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

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

// פונקציה לקבלת צבע בטוח מה-theme
const safeColor = (theme, path, fallback) => {
  const keys = path.split('.');
  let value = theme;
  for (const key of keys) {
    if (!value || typeof value !== 'object') return fallback;
    value = value[key];
  }
  return value || fallback;
};

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px #007bff40; }
  50% { box-shadow: 0 0 30px #007bff60; }
`;

const ModernCameraContainer = styled.div`
  min-height: 100vh;
  background: ${props => safeColor(props.theme, 'colors.background.gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')};  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
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
  background: ${props => safeColor(props.theme, 'colors.text.gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

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
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TranslationDisplay = styled.div`
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${props => safeColor(props.theme, 'shadows.glass', '0 8px 32px rgba(31, 38, 135, 0.37)')};
  display: flex;  align-items: center;
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
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
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
    flex-direction: column;
    align-items: center;
  }
`;

const ModernButton = styled.button`
  background: ${props => {
    if (props.variant === 'danger') {
      return safeColor(props.theme, 'colors.accent.gradient', 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)');
    }
    return safeColor(props.theme, 'colors.primary.gradient', 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)');
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
  box-shadow: ${props => safeColor(props.theme, 'shadows.soft', '0 4px 6px rgba(0, 0, 0, 0.1)')};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => safeColor(props.theme, 'shadows.hover', '0 8px 15px rgba(0, 0, 0, 0.2)')};
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
    width: 100%;
    max-width: 200px;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.1rem;
`;

const CameraSection = styled.div`
  flex: 1;
  display: flex;  justify-content: center;
  align-items: center;
  ${css`animation: ${fadeIn} 1s ease-out 0.4s both;`}
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 4/3;
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => safeColor(props.theme, 'shadows.glass', '0 8px 32px rgba(31, 38, 135, 0.37)')};

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
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
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
  border: 4px solid ${props => safeColor(props.theme, 'colors.primary.main', '#007bff')}20;  border-top: 4px solid ${props => safeColor(props.theme, 'colors.primary.main', '#007bff')};
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
`;

const LoadingText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  text-align: center;
`;

const StatusSection = styled.div`
  ${css`animation: ${fadeIn} 1.2s ease-out 0.6s both;`}
`;

const StatusCard = styled.div`
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: ${props => safeColor(props.theme, 'shadows.glass', '0 8px 32px rgba(31, 38, 135, 0.37)')};
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
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
  background: ${props => props.confidence 
    ? safeColor(props.theme, 'colors.secondary.gradient', 'linear-gradient(135deg, #28a745 0%, #20c997 100%)')
    : safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')};
  color: ${props => props.confidence ? 'white' : safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  transition: all 0.3s ease;
  ${props => props.confidence && css`animation: ${pulse} 2s infinite;`}
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
  background: ${props => safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')}40;
  border-radius: 8px;
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.light', 'rgba(255, 255, 255, 0.1)')};
`;

const StatusLabel = styled.span`
  font-weight: 500;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
`;

const StatusValue = styled.span`
  font-weight: 600;
  color: ${props => props.isActive 
    ? safeColor(props.theme, 'colors.secondary.main', '#28a745')
    : safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  background: ${props => safeColor(props.theme, 'colors.background.gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ErrorCard = styled.div`
  background: ${props => safeColor(props.theme, 'colors.surface.glass', 'rgba(255, 255, 255, 0.1)')};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => safeColor(props.theme, 'colors.border.glass', 'rgba(255, 255, 255, 0.2)')};
  border-radius: 20px;
  padding: 2rem;  text-align: center;
  max-width: 500px;
  box-shadow: ${props => safeColor(props.theme, 'shadows.glass', '0 8px 32px rgba(31, 38, 135, 0.37)')};
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
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  margin: 0 0 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ErrorHint = styled.div`
  font-size: 0.875rem;
  color: ${props => safeColor(props.theme, 'colors.text.secondary', '#e0e6ed')};
  background: ${props => safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')}40;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid ${props => safeColor(props.theme, 'colors.accent.main', '#dc3545')};
`;

const ErrorCode = styled.code`
  background: ${props => safeColor(props.theme, 'colors.surface.secondary', 'rgba(255, 255, 255, 0.05)')};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: ${props => safeColor(props.theme, 'colors.text.primary', '#ffffff')};
  font-size: 0.875rem;
`;

// MediaPipe Holistic Component with Real MediaPipe Integration
const Sign_language_recognition = () => {
  const { theme } = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const holisticRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const modelRef = useRef(null);
  const [isMediaPipeLoaded, setIsMediaPipeLoaded] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState({ word: '', confidence: 0 });
  const [sentence, setSentence] = useState([]);
  const [sequenceBuffer, setSequenceBuffer] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
 
  // הגדרות זהות לגרסת Python
  const ACTIONS = [
    "Bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day",
    "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom",
    "need", "no", "red", "sick", "son", "study", "tall", "thank you",
    "tired", "write", "yes", "you"
  ];
 
  const SEQ_LEN = 40;
  const THRESHOLD = 0.7;
  const SMOOTH_WINDOW = 4;
  const EMA_ALPHA = 0.6;
 
  // Smoothing classes - זהות לגרסת Python
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
 
  // הוספת useEffect בשביל להסתיר את הכפתורים "Live Camera Demo" ו-"Sample Data Mode"
  useEffect(() => {
    const hideUnwantedButtons = () => {
      document.querySelectorAll('button').forEach(btn => {
        const txt = btn.innerText.trim();
        if (txt === 'Live Camera Demo' || txt === 'Sample Data Mode') {
          btn.style.display = 'none';
        }
      });
    };
    hideUnwantedButtons();
    const timeoutId = setTimeout(hideUnwantedButtons, 500);
    return () => clearTimeout(timeoutId);
  }, []);
 
  // טעינת MediaPipe עם הגרסה החדשה
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
 
        initializeHolistic();
      } catch (err) {
        console.error('MediaPipe loading error:', err);
      }
    };
 
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
 
    loadMediaPipe();
  }, []);
 
  // טעינת המודל TensorFlow - זהה לגרסה של HandSignPredictor
  useEffect(() => {
    const loadModel = async () => {
      if (modelRef.current) return;
 
      try {
        setIsProcessing(true);
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        modelRef.current = loadedModel;
        setModel(loadedModel);
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
 
  // פונקצית חילוץ keypoints - זהה לגרסת Python
  const extractKeypoints = (results) => {
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
  };
 
  const makePrediction = async (buffer) => {
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
  };
 
  // onResults callback - מקבל תוצאות מ-MediaPipe או סימולציה
  const onResults = (results) => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;
 
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
 
      // 1) ציור הווידאו
      ctx.drawImage(video, 0, 0);
 
      // 2) ציור landmarks
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
 
      // 3) חילוץ keypoints והוספה לבאפר
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
      }
 
      // 4) ציור overlay ללא הרקע השחור למעלה
      drawOverlay(ctx);
    }
  };
 
  const POSE_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8],
    [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
    [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20],
    [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28],
    [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]
  ];
 
  const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20]
  ];
 
  const drawLandmarks = (ctx, landmarks, color = '#FF0000', radius = 2) => {
    if (!landmarks) return;
    ctx.fillStyle = color;
    landmarks.forEach(landmark => {
      const x = landmark.x * ctx.canvas.width;
      const y = landmark.y * ctx.canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  };
 
  const drawConnections = (ctx, landmarks, connections, color = '#00FF00', lineWidth = 2) => {
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
  };
 
  const drawOverlay = (ctx) => {
    // הוסר כל המידע מהמצלמה - רק מצלמה נקייה
  };
 
  // התחלת המצלמה והעיבוד
  useEffect(() => {
    let stream = null;
    let animationId = null;
 
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1000, height: 700 }
        });
 
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsLoading(false);
            startProcessing();
          };
        }
      } catch (err) {
        setError(`Camera access error: ${err.message}`);
        setIsLoading(false);
      }
    };
 
    const startProcessing = () => {
      const processFrame = async () => {
        if (videoRef.current && isMediaPipeLoaded) {
          if (holisticRef.current && holisticRef.current.send && window.Holistic) {
            try {
              await holisticRef.current.send({ image: videoRef.current });
            } catch (err) {
              console.warn('MediaPipe send error, using simulation:', err);
            }
          }
        }
        animationId = requestAnimationFrame(processFrame);
      };
      processFrame();
    };
 
    if (isMediaPipeLoaded && isModelLoaded) {
      startCamera();
    }
 
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMediaPipeLoaded, isModelLoaded]);
 
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
      <ErrorContainer theme={theme}>
        <ErrorCard theme={theme}>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle theme={theme}>Camera Error</ErrorTitle>
          <ErrorMessage theme={theme}>{error}</ErrorMessage>
          <ErrorHint theme={theme}>
            Make sure you have a valid TensorFlow.js model at
            <ErrorCode theme={theme}>/tfjs_model/model.json</ErrorCode>
          </ErrorHint>
        </ErrorCard>
      </ErrorContainer>
    );
  }

  return (
    <ModernCameraContainer theme={theme}>
      <HeaderSection>
        <MainTitle theme={theme}>
          <TitleIcon>🎥</TitleIcon>
          Video to Word Translation
        </MainTitle>
        <Subtitle theme={theme}>AI-powered sign language recognition in real-time</Subtitle>
      </HeaderSection>

      <TranslationDisplay theme={theme}>
        <TranslationIcon>💬</TranslationIcon>
        <TranslationText theme={theme}>
          {sentence.length > 0
            ? sentence.join(' ')
            : 'Perform signs to see video-to-word translation...'}
        </TranslationText>
      </TranslationDisplay>

      <ControlsSection>
        <ModernButton 
          theme={theme}
          onClick={clearSentence}
          disabled={!isMediaPipeLoaded || !isModelLoaded}
          variant="danger"
        >
          <ButtonIcon>🗑️</ButtonIcon>
          Clear Sentence
        </ModernButton>
      </ControlsSection>

      <CameraSection>
        <VideoContainer theme={theme}>
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
            <LoadingOverlay theme={theme}>
              <LoadingSpinner theme={theme} />
              <LoadingText theme={theme}>Initializing camera and AI model...</LoadingText>
            </LoadingOverlay>
          )}
        </VideoContainer>
      </CameraSection>

      <StatusSection>
        <StatusCard theme={theme}>
          <StatusHeader theme={theme}>
            <StatusIcon>🤖</StatusIcon>
            Latest Prediction
          </StatusHeader>
          
          <PredictionDisplay theme={theme} confidence={currentPrediction.confidence > THRESHOLD}>
            {currentPrediction.word
              ? `${currentPrediction.word} (${(currentPrediction.confidence * 100).toFixed(1)}%)`
              : 'Processing...'}
          </PredictionDisplay>

          <SystemStatus>
            <StatusItem theme={theme}>
              <StatusLabel theme={theme}>MediaPipe:</StatusLabel>
              <StatusValue theme={theme} isActive={isMediaPipeLoaded}>
                {isMediaPipeLoaded
                  ? window.Holistic
                    ? '✅ Real'
                    : '🎭 Simulation'
                  : '⏳ Loading...'}
              </StatusValue>
            </StatusItem>
            
            <StatusItem theme={theme}>
              <StatusLabel theme={theme}>AI Model:</StatusLabel>
              <StatusValue theme={theme} isActive={isModelLoaded}>
                {isModelLoaded ? '✅ Loaded' : '⏳ Loading...'}
              </StatusValue>
            </StatusItem>
            
            <StatusItem theme={theme}>
              <StatusLabel theme={theme}>Buffer:</StatusLabel>
              <StatusValue theme={theme} isActive={isCollecting}>
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