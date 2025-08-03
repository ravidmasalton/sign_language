// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignToAnimationScreen from './screens/SignToAnimationScreen';
import VideoUploadScreen from './screens/VideoUploadScreen';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // We've removed the mobile connection check as it's no longer needed

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (isAuthLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Layout>{children}</Layout>;
  };

  if (isAuthLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Authentication routes */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <LoginScreen />} 
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/camera"
            element={
              <ProtectedRoute>
                <CameraScreen />
              </ProtectedRoute>
            }
          />
        
          <Route
            path="/word-to-animation"
            element={
              <ProtectedRoute>
                <SignToAnimationScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video-upload"
            element={
              <ProtectedRoute>
                <VideoUploadScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsScreen />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;