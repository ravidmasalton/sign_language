import React, { createContext, useState, useContext, useEffect } from 'react';

// Define modern vibrant theme colors
const lightTheme = {
  primary: '#6366f1',        // Modern indigo
  primaryDark: '#4f46e5',    // Darker indigo
  primaryLight: '#e0e7ff',   // Light indigo background
  accent: '#f59e0b',         // Warm amber
  secondary: '#10b981',      // Emerald green
  background: '#f8fafc',     // Cooler white
  card: '#ffffff',           // Pure white cards
  surface: '#f1f5f9',        // Light surface
  text: '#1e293b',           // Dark slate
  textSecondary: '#64748b',  // Medium slate
  textMuted: '#94a3b8',      // Light slate
  border: '#e2e8f0',         // Light border
  success: '#10b981',        // Emerald
  warning: '#f59e0b',        // Amber
  error: '#ef4444',          // Red
  info: '#3b82f6',           // Blue
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  cardGradient: 'linear-gradient(135deg, #ffffff, #f8fafc)',
};

const darkTheme = {
  primary: '#818cf8',        // Lighter indigo for dark
  primaryDark: '#6366f1',    
  primaryLight: '#312e81',   // Dark indigo
  accent: '#fbbf24',         // Brighter amber
  secondary: '#34d399',      // Lighter emerald
  background: '#0f172a',     // Very dark slate
  card: '#1e293b',           // Dark slate cards
  surface: '#334155',        // Medium slate
  text: '#f8fafc',           // Light text
  textSecondary: '#cbd5e1',  // Medium light
  textMuted: '#94a3b8',      // Muted light
  border: '#475569',         // Dark border
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradient: 'linear-gradient(135deg, #818cf8, #a855f7)',
  cardGradient: 'linear-gradient(135deg, #1e293b, #334155)',
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get stored preference from localStorage or use system preference
    const storedPreference = localStorage.getItem('darkMode');
    return storedPreference !== null ? JSON.parse(storedPreference) : prefersDarkMode;
  });

  // Apply theme to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only change if user hasn't set a preference
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };

    // Add event listener with compatibility check
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Choose theme based on dark mode setting
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
