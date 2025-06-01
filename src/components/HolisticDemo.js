import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

// MediaPipe Holistic Component with Real MediaPipe Integration
const HolisticDemo = () => {
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

      // 4) ציור overlay
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
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, ctx.canvas.width, 120);

    // מציג רק את המילים בלי המילה "Sentence:"
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(`${sentence.join(' ')}`, 10, 35);

    if (currentPrediction.word && currentPrediction.confidence > 0) {
      const color = currentPrediction.confidence > THRESHOLD ? '#00FF00' : '#FFAA00';
      ctx.fillStyle = color;
      ctx.font = 'bold 22px Arial';
      ctx.fillText(
        `${currentPrediction.word} (${(currentPrediction.confidence * 100).toFixed(0)}%)`,
        10, 70
      );
    }

    // הצגה של פס ההתקדמות רק בשלב איסוף פריימים
    if (isCollecting) {
      ctx.fillStyle = '#FFF200';
      ctx.font = '18px Arial';
      ctx.fillText(`Collecting frames: ${frameCount}/${SEQ_LEN}`, 10, 100);

      const progressWidth = (frameCount / SEQ_LEN) * 200;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(10, 105, 200, 10);
      ctx.fillStyle = '#FFF200';
      ctx.fillRect(10, 105, progressWidth, 10);
    }
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
      <div
        className="error"
        style={{
          padding: 20,
          backgroundColor: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: 8
        }}
      >
        <h3 style={{ color: '#f44336' }}>Error</h3>
        <p>{error}</p>
        <p style={{ fontSize: 14, color: '#666', marginTop: 10 }}>
          Make sure you have a valid TensorFlow.js model at
          <br />
          <code>/tfjs_model/model.json</code>
        </p>
      </div>
    );
  }

 return (
  <div className="holistic-demo" style={{ textAlign: 'center' }}>
    {/* חלון הטקסט העליון */}
    <div
      className="translation-text"
      style={{
        marginBottom: 12,
        padding: '12px 24px',
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 20,
        borderRadius: 5,
        display: 'inline-block',
        minWidth: 400,
        maxWidth: '95%',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}
    >
      {sentence.length > 0
        ? sentence.join(' ')
        : 'Waiting for translation...'}
    </div>

    {/* כפתור ניקוי */}
    <div className="controls" style={{ marginBottom: 20 }}>
      <button
        onClick={clearSentence}
        disabled={!isMediaPipeLoaded || !isModelLoaded}
        style={{
          padding: '10px 20px',
          fontSize: 16,
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          opacity: !isMediaPipeLoaded || !isModelLoaded ? 0.5 : 1
        }}
      >
        Clear Sentence
      </button>
    </div>

    {/* חלון המצלמה (Canvas) */}
    <div
      className="video-container"
      style={{
        position: 'relative',
        display: 'inline-block',
        backgroundColor: '#000',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        maxWidth: '100%'
      }}
    >
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
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: 800,
          height: 560
        }}
      />
    </div>

    {/* מידע על סטטוס */}
    <div
      className="status-info"
      style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left'
      }}
    >
      {/* כאן מוצג רק Latest Prediction ואת המילה + אחוז הביטחון */}
      <h4 style={{ textAlign: 'left', margin: 0 }}>Latest Prediction:</h4>
      <p
        style={{
          textAlign: 'left',
          fontSize: 16,
          marginTop: 4,
          color:
            currentPrediction.confidence > THRESHOLD
              ? '#4caf50'
              : '#757575'
        }}
      >
        {currentPrediction.word
          ? `${currentPrediction.word} (${(currentPrediction.confidence * 100).toFixed(1)}%)`
          : 'Processing...'}
      </p>

      <div
        style={{
          marginTop: 15,
          fontSize: 14,
          color: '#666'
        }}
      >
        <strong>MediaPipe:</strong>{' '}
        {isMediaPipeLoaded
          ? window.Holistic
            ? '✅ Real'
            : '🎭 Simulation'
          : '⏳ Loading...'}
        <span style={{ marginLeft: 20 }}>
          <strong>Model:</strong>{' '}
          {isModelLoaded ? '✅ Loaded' : '⏳ Loading...'}
        </span>
        <span style={{ marginLeft: 20 }}>
          <strong>Buffer:</strong> {frameCount}/{SEQ_LEN}{' '}
          {isCollecting ? '(Collecting)' : ''}
        </span>
      </div>
    </div>

    {isLoading && (
      <div
        className="loading"
        style={{ padding: 20, fontSize: 18, color: '#555' }}
      >
        Loading camera and MediaPipe...
      </div>
    )}
  </div>
);
};
export default HolisticDemo;
