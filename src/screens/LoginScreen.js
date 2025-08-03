// LoginScreen.js - LOGIC ONLY (NO STYLING)

import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useTheme } from '../contexts/ThemeContext';

// Import all styled components from separate styles file
import {
  LoginContainer,
  FloatingCircle1,
  FloatingRect1,
  FloatingCircle2,
  LoginCard,
  Header,
  WaveIcon,
  Title,
  Subtitle,
  FormContainer,
  InputGroup,
  Input,
  Label,
  ErrorMessage,
  ErrorText,
  ButtonContainer,
  LoginButton,
  SignupButton,
  LoadingContainer,
  Spinner,
  LoadingText,
  FooterText
} from './LoginScreenStyles';

/**
 * Login Screen Component - Authentication interface
 * Handles both sign in and sign up functionality
 */
const LoginScreen = () => {
  // ========================
  // HOOKS & STATE
  // ========================
  const { theme: COLORS } = useTheme();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  // ========================
  // VALIDATION HELPERS
  // ========================
  
  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate password strength
   */
  const isValidPassword = (password) => {
    return password.length >= 6; // Firebase minimum requirement
  };

  /**
   * Validate form inputs before submission
   */
  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  // ========================
  // AUTHENTICATION HANDLERS
  // ========================
  
  /**
   * Handle email/password authentication
   * Supports both sign in and sign up
   */
  const handleEmailLogin = async () => {
    // Validate form inputs
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      setError(''); // Clear any previous errors
      
      if (isSignup) {
        // Create new user account
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // Authentication successful - Firebase auth state listener will handle navigation
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Handle specific Firebase auth errors
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Convert Firebase error codes to user-friendly messages
   */
  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return 'Authentication failed. Please try again';
    }
  };

  // ========================
  // UI INTERACTION HANDLERS
  // ========================
  
  /**
   * Toggle between sign in and sign up modes
   */
  const handleToggleMode = () => {
    setIsSignup(!isSignup);
    setError(''); // Clear errors when switching modes
  };

  /**
   * Handle form submission via Enter key
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      handleEmailLogin();
    }
  };

  /**
   * Clear error when user starts typing
   */
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    if (error) {
      setError(''); // Clear error as user types
    }
  };

  // ========================
  // COMPUTED VALUES
  // ========================
  
  const isFormValid = email && password;
  const buttonText = isSignup ? 'Create Account' : 'Sign In';
  const toggleText = isSignup ? 'Already have an account?' : 'Create new account';

  // ========================
  // RENDER COMPONENT
  // ========================
  
  return (
    <LoginContainer COLORS={COLORS}>
      {/* Floating background decorations */}
      <FloatingCircle1 />
      <FloatingRect1 />
      <FloatingCircle2 />
      
      <LoginCard>
        {/* Header Section - Welcome message and branding */}
        <Header>
          <WaveIcon>
            <span aria-hidden="true">👋</span>
          </WaveIcon>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to continue your journey</Subtitle>
        </Header>

        {/* Form Section - Input fields and submission */}
        <FormContainer>
          {/* Email Input */}
          <InputGroup>
            <Input
              type="email"
              placeholder=" " /* Required for floating label effect */
              value={email}
              onChange={handleInputChange(setEmail)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete="email"
              aria-label="Email Address"
            />
            <Label>Email Address</Label>
          </InputGroup>

          {/* Password Input */}
          <InputGroup>
            <Input
              type="password"
              placeholder=" " /* Required for floating label effect */
              value={password}
              onChange={handleInputChange(setPassword)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete={isSignup ? "new-password" : "current-password"}
              aria-label="Password"
            />
            <Label>Password</Label>
          </InputGroup>

          {/* Error Message Display */}
          {error && (
            <ErrorMessage>
              <ErrorText>{error}</ErrorText>
            </ErrorMessage>
          )}

          {/* Action Buttons */}
          <ButtonContainer>
            {/* Primary Action Button - Sign In/Sign Up */}
            <LoginButton 
              onClick={handleEmailLogin} 
              disabled={isLoading || !isFormValid}
              aria-label={buttonText}
            >
              {isLoading ? (
                <LoadingContainer>
                  <Spinner />
                  <LoadingText>
                    {isSignup ? 'Creating account...' : 'Signing in...'}
                  </LoadingText>
                </LoadingContainer>
              ) : (
                buttonText
              )}
            </LoginButton>

            {/* Toggle Mode Button - Switch between Sign In/Sign Up */}
            <SignupButton 
              onClick={handleToggleMode} 
              disabled={isLoading}
              aria-label={toggleText}
            >
              {toggleText}
            </SignupButton>
          </ButtonContainer>
        </FormContainer>

        {/* Footer - Security message */}
        <FooterText>
          Protected by enterprise-grade security
        </FooterText>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginScreen;