import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useTheme } from '../contexts/ThemeContext';
import styled from 'styled-components';

const LoginScreen = () => {
  const { theme: COLORS } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError('Login failed: ' + error.message.replace('Firebase: ', ''));
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEmailSignUp = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (error) {
      setError('Sign up failed: ' + error.message.replace('Firebase: ', ''));
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container backgroundColor={COLORS.background}>
      <Title color={COLORS.text}>Sign Language App</Title>
      <Subtitle color={COLORS.textSecondary}>Login or Sign Up</Subtitle>
      
      <InputContainer>
        <Input
          backgroundColor={COLORS.card}
          borderColor={COLORS.border}
          color={COLORS.text}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <Input
          backgroundColor={COLORS.card}
          borderColor={COLORS.border}
          color={COLORS.text}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      
      {error && (
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      )}
      
      <ButtonContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <LoginButton 
              backgroundColor={COLORS.primary}
              onClick={handleEmailLogin}
            >
              <ButtonText>Login</ButtonText>
            </LoginButton>
            
            <SignUpButton 
              backgroundColor={COLORS.accent}
              onClick={handleEmailSignUp}
            >
              <ButtonText>Sign Up</ButtonText>
            </SignUpButton>
          </>
        )}
      </ButtonContainer>
    </Container>
  );
};

// ADD THESE STYLED COMPONENTS FOR MOBILE-RESPONSIVE LOGIN:
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${props => props.backgroundColor};
  
  @media (max-width: 768px) {
    padding: 16px;
    min-height: 100dvh; /* Use dynamic viewport height on mobile */
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.color};
  text-align: center;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color};
  text-align: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    gap: 12px;
  }
`;

const Input = styled.input`
  padding: 16px;
  border: 2px solid ${props => props.borderColor};
  border-radius: 8px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  font-size: 16px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.borderColor}dd;
  }
  
  &::placeholder {
    color: ${props => props.placeholderTextColor || '#999'};
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    font-size: 16px; /* Prevent zoom on iOS */
    min-height: 44px; /* Touch target */
  }
`;

const ErrorContainer = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ErrorText = styled.p`
  color: #c33;
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
    gap: 12px;
  }
`;

const LoginButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: ${props => props.backgroundColor};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  min-height: 44px;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    min-height: 48px;
  }
`;

const SignUpButton = styled(LoginButton)`
  background-color: ${props => props.backgroundColor};
`;

const ButtonText = styled.span`
  color: white;
  font-weight: 600;
`;

const Loader = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default LoginScreen;
