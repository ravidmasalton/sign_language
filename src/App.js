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
import ResultsScreen from './screens/ResultsScreen';
import SettingsScreen from './screens/SettingsScreen';
import MobileConnectionScreen from './screens/MobileConnectionScreen';
import SignToAnimationScreen from './screens/SignToAnimationScreen';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isMobileConnected, setIsMobileConnected] = useState(true);

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check mobile connection
  useEffect(() => {
    const checkConnection = () => {
      // In a real app, this would be a more sophisticated check
      setIsMobileConnected(navigator.onLine);
    };

    // Check connection immediately and on online/offline events
    checkConnection();
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

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

    // Check if mobile is connected
    if (!isMobileConnected) {
      return <Navigate to="/connect" replace />;
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

          {/* Connection check route */}
          <Route
            path="/connect"
            element={isMobileConnected ? <Navigate to="/" replace /> : <MobileConnectionScreen />}
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
            path="/results"
            element={
              <ProtectedRoute>
                <ResultsScreen />
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