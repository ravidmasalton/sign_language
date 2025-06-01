// src/components/HandSignPredictor.js
import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './HandSignPredictor.css';

const HandSignPredictor = ({ landmarkData }) => {
  const [status, setStatus] = useState('Ready to load model');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusType, setStatusType] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const modelRef = useRef(null);

  // Labels for the model output
  const WORDS = [
      "Bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day",
    "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom",
    "need", "no", "red", "sick", "son", "study", "tall", "thank you",
    "tired", "write", "yes", "you"
  ];

  useEffect(() => {
    return () => {
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, []);

  // Load the model as a LayersModel
  const loadModel = async () => {
    if (modelRef.current) {
      setStatus('Model already loaded');
      return;
    }
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setStatusType('loading');
      setStatus('🔄 Loading model...');

      const model = await tf.loadLayersModel('/tfjs_model/model.json');
      console.log('✅ Model loaded:', model);
      modelRef.current = model;

      setStatus('✅ Model loaded! Ready for prediction.');
      setStatusType('success');
      setIsModelLoaded(true);
    } catch (error) {
      console.error(error);
      setStatus(`❌ Error loading model: ${error.message}`);
      setStatusType('error');
    } finally {
      setIsProcessing(false);
    }
  };
  // Run prediction using model.predict()
  const runPrediction = async () => {
    if (!modelRef.current) {
      setStatus('⚠️ Please load the model first');
      setStatusType('error');
      return;
    }
    if (!Array.isArray(landmarkData)) {
      setStatus('⚠️ No valid landmark data provided');
      setStatusType('error');
      return;
    }
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setStatusType('loading');
      setStatus('🔄 Processing input data...');

      // Validate expected shape [40, 225]
      if (
        landmarkData.length !== 40 ||
        !Array.isArray(landmarkData[0]) ||
        landmarkData[0].length !== 225
      ) {
        throw new Error(`Invalid data shape: [${landmarkData.length}, ${landmarkData[0]?.length}]`);
      }

      // Add batch dimension
      const inputTensor = tf.tensor(landmarkData, [40, 225], 'float32').expandDims(0);

      // Debug log
      console.log('Input tensor shape (should be [1, 40, 225]):', inputTensor.shape);

      setStatus('🔄 Running prediction...');
      const resultTensor = modelRef.current.predict(inputTensor);

      // Get probabilities and predicted index
      const probabilities = await resultTensor.data();
      const predictedClassIdx = tf.argMax(resultTensor, 1).dataSync()[0];
      const confidence = probabilities[predictedClassIdx];
      const predictedWord = WORDS[predictedClassIdx] || `Unknown (Class ${predictedClassIdx})`;

      setPredictionResult({ word: predictedWord, confidence, classIndex: predictedClassIdx });
      setStatus('✅ Prediction complete!');
      setStatusType('success');

      // Cleanup tensors
      inputTensor.dispose();
      if (Array.isArray(resultTensor)) {
        resultTensor.forEach((t) => t.dispose());
      } else {
        resultTensor.dispose();
      }
    } catch (error) {
      console.error(error);
      setStatus(`❌ Prediction error: ${error.message}`);
      setStatusType('error');
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="predictor-container">
      <h2 className="predictor-title">Hand Sign Recognition</h2>
      
      <div className={`status-panel ${statusType}`}>
        <div className="status-text">
          <span>{status}</span>
        </div>
      </div>
      
      <div className="control-buttons">
        <button
          className={`button ${isModelLoaded ? 'success' : 'primary'}`}
          onClick={loadModel}
          disabled={isModelLoaded || isProcessing}
        >
          {isModelLoaded ? 'Model Loaded' : isProcessing ? 'Loading...' : 'Load Model'}
        </button>
        <button
          className="button primary"
          onClick={runPrediction}
          disabled={!isModelLoaded || isProcessing}
        >
          {isProcessing ? 'Predicting...' : 'Run Prediction'}
        </button>
      </div>
      
      {predictionResult && (
        <div className="result-panel">
          <h3 className="result-title">Prediction Result</h3>
          <div className="result-word">{predictionResult.word}</div>
          
          <div className="confidence-bar">
            <div 
              className="confidence-fill" 
              style={{ width: `${predictionResult.confidence * 100}%` }}
            ></div>
          </div>
          
          <div className="confidence-text">
            Confidence: {(predictionResult.confidence * 100).toFixed(2)}%
          </div>
          
          <div className="metadata">
            Class Index: {predictionResult.classIndex}
          </div>
        </div>
      )}
    </div>
  );
};

export default HandSignPredictor;