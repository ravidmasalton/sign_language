// src/App.js
import React, { useState, useEffect } from 'react';
import HandSignPredictor from './components/HandSignPredictor';
import HolisticDemo from './components/HolisticDemo';
import './App.css';

function App() {
  const [landmarks, setLandmarks]       = useState(null);
  const [isLoading, setIsLoading]       = useState(true);
  const [status, setStatus]             = useState('Loading sample data...');
  const [showLiveDemo, setShowLiveDemo] = useState(false);

  useEffect(() => {
    async function loadSample() {
      try {
        setStatus('🔄 Loading sample data…');
        const res = await fetch('/hand_landmarks.json');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setLandmarks(data);
        setStatus('✅ Sample data loaded!');
      } catch (err) {
        setStatus(`❌ Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadSample();
  }, []);

  // Function to get status icon and class based on status text
  const getStatusInfo = (status) => {
    if (status.includes('✅')) return { icon: '✅', class: 'status-success' };
    if (status.includes('❌')) return { icon: '❌', class: 'status-error' };
    if (status.includes('🔄')) return { icon: '🔄', class: 'status-loading' };
    if (status.includes('⚠️')) return { icon: '⚠️', class: 'status-warning' };
    return { icon: 'ℹ️', class: '' };
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="App">
      <h1>TensorFlow.js Sign Language Recognition</h1>
      
      <div className="mode-toggle">
        <button 
          className={!showLiveDemo ? 'active' : ''} 
          onClick={() => setShowLiveDemo(false)}
        >
          Sample Data Mode
        </button>
        <button 
          className={showLiveDemo ? 'active' : ''} 
          onClick={() => setShowLiveDemo(true)}
        >
          Live Camera Demo
        </button>
      </div>

      {!showLiveDemo ? (
        <div className="app-card">
          <div className={`status-display ${statusInfo.class}`}>
            <span className="status-icon">{statusInfo.icon}</span>
            <span className="status-text">{status}</span>
          </div>
          
          {!isLoading && landmarks && (
            <HandSignPredictor landmarkData={landmarks} />
          )}
        </div>
      ) : (
        <HolisticDemo />
      )}
    </div>
  );
}

export default App;