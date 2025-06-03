import React, { createContext, useState, useContext, useEffect } from 'react';

// Define theme colors
const lightTheme = {
  primary: '#4285F4',
  primaryLight: '#D2E3FC',
  accent: '#34A853',
  accentLight: '#CEEAD6',
  background: '#FFFFFF',
  card: '#F8F9FA',
  text: '#202124',
  textSecondary: '#5F6368',
  border: '#DADCE0',
  error: '#EA4335',
  warning: '#FBBC04',
  success: '#34A853',
};

const darkTheme = {
  primary: '#8AB4F8',
  primaryLight: '#3C4043',
  accent: '#81C995',
  accentLight: '#3C4043',
  background: '#202124',
  card: '#303134',
  text: '#E8EAED',
  textSecondary: '#9AA0A6',
  border: '#5F6368',
  error: '#F28B82',
  warning: '#FDD663',
  success: '#81C995',
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
