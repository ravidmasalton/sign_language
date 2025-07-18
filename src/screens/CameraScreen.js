// CameraScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useTheme } from '../contexts/ThemeContext';
import {
  ModernCameraContainer,
  MainLayout,
  CameraSection,
  VideoContainer,
  LiveVideo,
  ModernCanvas,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  ControlsPanel,
  PredictionPanel,
  PredictionHeader,
  PredictionDisplay,
  BufferText,
  CircularProgress,
  CircularProgressSvg,
  CircularProgressBg,
  CircularProgressBar,
  CircularProgressText,
  TranslationPanel,
  TranslationContent,
  TranslationText,
  InlineButton,
  // New side-by-side layout components
  SideBySideRow,
  PredictionSide,
  PredictionContent,
  PredictionCircularProgress,
  TranslationSide,
  TranslationSideHeader,
  TranslationSideText,
  ClearButtonRow,
  ClearButtonSideBySide,
} from './CameraStyles';

const Sign_language_recognition = () => {
  const { threshold } = useTheme(); // Get threshold from theme context
  
  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const holisticRef = useRef(null);
  const modelRef = useRef(null);
  const streamRef = useRef(null);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isMediaPipeLoaded, setIsMediaPipeLoaded] = useState(false);

  const [currentPrediction, setCurrentPrediction] = useState({ word: '', confidence: 0 });
  const [sentence, setSentence] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const isPredictionRunningRef = useRef(false);
  const isProcessingFrameRef = useRef(false);

  // Internal sequence buffer for collecting frames
  const sequenceBufferRef = useRef([]);

  // Constants
  const ACTIONS = React.useMemo(() => [
    "Bye","beautiful","bird","book","but","can","dad","dance","day",
    "deaf","drink","eat","enjoy","family","go","help","love","mom",
    "need","no","red","sick","son","study","tall","thank",
    "tired","write","yes","you"
  ], []);
  const SEQ_LEN = 30;
  const SMOOTH_WINDOW = 3;
  const EMA_ALPHA = 0.75;

  const COLORS = React.useMemo(() => ({
    pose: { landmarks: '#0080FF', connections: '#4DA6FF' },
    leftHand: { landmarks: '#00FF00', connections: '#4DFF4D' },
    rightHand: { landmarks: '#FF0000', connections: '#FF4D4D' }
  }), []);

  const POSE_CONNECTIONS = React.useMemo(() => [
    [0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],
    [9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],
    [17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],
    [11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],
    [27,29],[28,30],[29,31],[30,32],[27,31],[28,32]
  ], []);
  const HAND_CONNECTIONS = React.useMemo(() => [
    [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],
    [0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],
    [0,17],[17,18],[18,19],[19,20]
  ], []);

  // Smoothing & EMA
  const smootherRef = useRef({
    window: [],
    maxSize: SMOOTH_WINDOW,
    apply(pred) {
      this.window.push(pred);
      if (this.window.length > this.maxSize) this.window.shift();
      const counts = {};
      let maxCount = 0, mostFrequent = pred;
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
    apply(probs) {
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

  // Drawing helpers
  const drawLandmarks = useCallback((ctx, landmarks, color, radius = 2) => {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 3;
    landmarks.forEach(lm => {
      ctx.beginPath();
      ctx.arc(lm.x * ctx.canvas.width, lm.y * ctx.canvas.height, radius, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  }, []);
  
  const drawConnections = useCallback((ctx, landmarks, connections, color, lineWidth = 1.5) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur = 2;
    connections.forEach(([s, e]) => {
      if (landmarks[s] && landmarks[e]) {
        ctx.beginPath();
        ctx.moveTo(landmarks[s].x * ctx.canvas.width, landmarks[s].y * ctx.canvas.height);
        ctx.lineTo(landmarks[e].x * ctx.canvas.width, landmarks[e].y * ctx.canvas.height);
        ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;
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

  // Prediction logic - Updated to use dynamic threshold
  const makePrediction = useCallback(async (buffer) => {
    if (!modelRef.current || !Array.isArray(buffer) || buffer.length !== SEQ_LEN || isPredictionRunningRef.current) return;
    try {
      isPredictionRunningRef.current = true;
      const inputTensor = tf.tensor(buffer, [SEQ_LEN, 225], 'float32').expandDims(0);
      const resultTensor = modelRef.current.predict(inputTensor);
      const probabilities = await resultTensor.data();
      const probsEma = emaFilterRef.current.apply(Array.from(probabilities));
      const predictedClassIdx = tf.argMax(tf.tensor1d(probsEma)).dataSync()[0];
      const predSmooth = smootherRef.current.apply(predictedClassIdx);
      const confidence = probsEma[predSmooth];
      
      // Use dynamic threshold from context instead of constant THRESHOLD
      if (confidence > threshold) {
        const word = ACTIONS[predSmooth];
        setCurrentPrediction({ word, confidence, classIndex: predSmooth });
        setSentence(prev => {
          if (prev.length === 0 || prev[prev.length - 1] !== word) {
            return [...prev, word];
          }
          return prev;
        });
      } else {
        setCurrentPrediction({ word: ACTIONS[predSmooth], confidence, classIndex: predSmooth });
      }
      
      inputTensor.dispose();
      if (Array.isArray(resultTensor)) {
        resultTensor.forEach(t => t.dispose());
      } else {
        resultTensor.dispose();
      }
      
      sequenceBufferRef.current = [];
      setFrameCount(0);
      setIsCollecting(false);
    } catch (err) {
      setCurrentPrediction({ word: 'Error', confidence: 0, classIndex: -1 });
      sequenceBufferRef.current = [];
      setFrameCount(0);
      setIsCollecting(false);
    } finally {
      isPredictionRunningRef.current = false;
    }
  }, [ACTIONS, threshold]);

  // MediaPipe onResults
  const onResults = useCallback((results) => {
    if (isProcessingFrameRef.current || !canvasRef.current || !videoRef.current) return;
    isProcessingFrameRef.current = true;
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0);

      // draw landmarks
      if (results.poseLandmarks) {
        drawConnections(ctx, results.poseLandmarks, POSE_CONNECTIONS, COLORS.pose.connections, 1.5);
        drawLandmarks(ctx, results.poseLandmarks, COLORS.pose.landmarks, 2);
      }
      if (results.leftHandLandmarks) {
        drawConnections(ctx, results.leftHandLandmarks, HAND_CONNECTIONS, COLORS.leftHand.connections, 1.5);
        drawLandmarks(ctx, results.leftHandLandmarks, COLORS.leftHand.landmarks, 2);
      }
      if (results.rightHandLandmarks) {
        drawConnections(ctx, results.rightHandLandmarks, HAND_CONNECTIONS, COLORS.rightHand.connections, 1.5);
        drawLandmarks(ctx, results.rightHandLandmarks, COLORS.rightHand.landmarks, 2);
      }

      // collect keypoints & buffer
      const kp = extractKeypoints(results);
      if (kp !== null) {
        sequenceBufferRef.current.push(kp);
        const bufferLength = sequenceBufferRef.current.length;
        setIsCollecting(bufferLength < SEQ_LEN);
        setFrameCount(bufferLength);
        
        if (bufferLength === SEQ_LEN && !isPredictionRunningRef.current) {
          const bufferCopy = sequenceBufferRef.current.map(frame => [...frame]);
          makePrediction(bufferCopy);
        }
      }
    } finally {
      isProcessingFrameRef.current = false;
    }
  }, [drawConnections, drawLandmarks, POSE_CONNECTIONS, HAND_CONNECTIONS, COLORS, extractKeypoints, makePrediction]);

  // Start processing loop
  const startProcessing = useCallback(() => {
    const processFrame = async () => {
      if (videoRef.current && isMediaPipeLoaded && cameraReady && holisticRef.current?.send) {
        try {
          await holisticRef.current.send({ image: videoRef.current });
        } catch {}
      }
      requestAnimationFrame(processFrame);
    };
    processFrame();
  }, [isMediaPipeLoaded, cameraReady]);

  // Load MediaPipe
  useEffect(() => {
    const loadMediaPipe = async () => {
      try {
        const loadScript = (src) => new Promise((res, rej) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            res();
            return;
          }
          const s = document.createElement('script');
          s.src = src;
          s.onload = res;
          s.onerror = rej;
          document.head.appendChild(s);
        });
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
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        modelRef.current = loadedModel;
        setIsModelLoaded(true);
      } catch (err) {
        setError(`Model loading error: ${err.message}`);
      }
    };
    loadModel();
    return () => {
      if (modelRef.current) modelRef.current.dispose();
    };
  }, []);

  // Setup camera
  const setupCamera = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      await new Promise(r => setTimeout(r, 300));
      const constraintOptions = [
        {
          video: {
            facingMode: { exact: 'environment' },
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 }
          }
        },
        {
          video: {
            facingMode: 'environment',
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 }
          }
        },
        null
      ];
      let stream = null;
      for (let i = 0; i < constraintOptions.length && !stream; i++) {
        if (constraintOptions[i] === null) {
          try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(d => d.kind === 'videoinput');
            for (const device of videoDevices) {
              try {
                const testStream = await navigator.mediaDevices.getUserMedia({
                  video: {
                    deviceId: { exact: device.deviceId },
                    width: { ideal: 1280, min: 640 },
                    height: { ideal: 720, min: 480 }
                  }
                });
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
              } catch {}
            }
          } catch {}
        } else {
          try {
            stream = await navigator.mediaDevices.getUserMedia(constraintOptions[i]);
          } catch {}
        }
      }
      if (!stream) {
        // fallback
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 }
          }
        });
      }
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
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
    } catch (err) {
      setError(`Camera error: ${err.message}`);
      setIsLoading(false);
      setCameraReady(false);
    }
  }, [startProcessing]);

  useEffect(() => {
    if (isMediaPipeLoaded && isModelLoaded) {
      setupCamera();
    }
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, [isMediaPipeLoaded, isModelLoaded, setupCamera]);

  const clearSentence = () => {
    setSentence([]);
    setCurrentPrediction({ word: '', confidence: 0 });
    sequenceBufferRef.current = [];
    setIsCollecting(false);
    setFrameCount(0);
    isPredictionRunningRef.current = false;
    isProcessingFrameRef.current = false;
  };

  if (error) {
    return <div style={{ color: 'white', padding: 16 }}>{error}</div>;
  }

  return (
    <ModernCameraContainer>
      <MainLayout>
        {/* Camera Section - Top */}
        <CameraSection>
          <VideoContainer>
            <LiveVideo
              ref={videoRef}
              autoPlay muted playsInline
              style={{ visibility: 'hidden' }}
            />
            <ModernCanvas ref={canvasRef} />
            {isLoading && (
              <LoadingOverlay>
                <LoadingSpinner />
                <LoadingText>Loading...</LoadingText>
              </LoadingOverlay>
            )}
          </VideoContainer>
        </CameraSection>        {/* Controls Section - Bottom */}
        <ControlsPanel>
          {/* Side-by-Side Layout: Prediction + Translation */}
          <SideBySideRow>
            {/* Left Side - Prediction Panel */}
            <PredictionSide>
              <PredictionContent>
                {currentPrediction.word
                  ? `${currentPrediction.word} (${(currentPrediction.confidence * 100).toFixed(1)}%)`
                  : 'Waiting...'}
              </PredictionContent>
              <PredictionCircularProgress>
                <CircularProgressSvg>
                  <CircularProgressBg
                    cx="50%"
                    cy="50%"
                    r="18"
                  />
                  <CircularProgressBar
                    cx="50%"
                    cy="50%"
                    r="18"
                    $circumference={2 * Math.PI * 18}
                    $progress={(frameCount / SEQ_LEN) * 100}
                    $isActive={isCollecting}
                  />
                </CircularProgressSvg>
                <CircularProgressText $isActive={isCollecting}>
                  {Math.round((frameCount / SEQ_LEN) * 100)}%
                </CircularProgressText>
              </PredictionCircularProgress>
            </PredictionSide>

            {/* Right Side - Translation Panel */}
            <TranslationSide>
              <TranslationSideHeader>
                Translation (Threshold: {Math.round(threshold * 100)}%)
              </TranslationSideHeader>
              <TranslationSideText>
                {sentence.length > 0
                  ? sentence.join(' ')
                  : 'Make gestures to get translation...'}
              </TranslationSideText>
            </TranslationSide>
          </SideBySideRow>

          {/* Clear Button Row */}
          <ClearButtonRow>
            <ClearButtonSideBySide
              onClick={clearSentence}
              disabled={!isModelLoaded || !isMediaPipeLoaded}
            >
              clear
            </ClearButtonSideBySide>
          </ClearButtonRow>
        </ControlsPanel>
      </MainLayout>
    </ModernCameraContainer>
  );
};

export default Sign_language_recognition;