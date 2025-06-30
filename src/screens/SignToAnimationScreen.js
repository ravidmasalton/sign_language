import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSearch, FiAlertCircle, FiRefreshCw, FiMic, FiMicOff } from 'react-icons/fi';
import {
  Container,
  TopSection,
  Header,
  Title,
  Subtitle,
  ContentContainer,
  VideoContainer,
  Video,
  MiddleSection,
  SearchContainer,
  SearchForm,
  InputWrapper,
  SearchIcon,
  Input,
  SearchButton,
  SpinningIcon,
  MicButton,
  BottomSection,
  ErrorContainer,
  ErrorText,
  SpeechStatusContainer,
  SpeechStatusDot,
  SpeechStatusText,
  SupportInfo,
} from './SignAnimationStyles';

/**
 * Component that displays sign language animations - SMOOTH SEQUENCE PLAYBACK
 */
const SignToAnimationScreen = () => {
  const { theme: COLORS } = useTheme();
  
  // ========================
  // STATE MANAGEMENT
  // ========================
  const [inputWord, setInputWord] = useState('');
  const [currentVideo, setCurrentVideo] = useState('/sign_videos/Regular.mp4');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Speech Recognition states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechError, setSpeechError] = useState('');
  
  // Sequence mode states
  const [playingSequence, setPlayingSequence] = useState(false);
  const [sequenceWords, setSequenceWords] = useState([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  
  // Video optimization states
  const [videoReady, setVideoReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // ========================
  // CONSTANTS
  // ========================
  const AVAILABLE_WORDS = [
    "bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day",
    "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom",
    "need", "no", "red", "sick", "son", "study", "tall", "thank you",
    "tired", "write", "yes", "you"
  ];

  // ========================
  // UTILITY FUNCTIONS
  // ========================
  const formatWord = (word) => {
    if (!word || typeof word !== 'string') return '';
    const cleanWord = word.trim();
    if (!cleanWord) return '';
    const processedWord = cleanWord.toLowerCase().replace(/\s+/g, '_');
    return processedWord.charAt(0).toUpperCase() + processedWord.slice(1);
  };

  const isWordAvailable = (word) => {
    const normalizedInput = word.toLowerCase().trim().replace(/\s+/g, ' ');
    return AVAILABLE_WORDS.includes(normalizedInput) || 
           AVAILABLE_WORDS.some(availableWord => 
             availableWord.toLowerCase().replace(/\s+/g, ' ') === normalizedInput
           );
  };

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  };

  // ========================
  // INSTANT VIDEO TRANSITIONS - NO DELAYS
  // ========================
  const playVideo = useCallback((videoPath) => {
    if (!videoRef.current) return;
    
    setIsTransitioning(true);
    const video = videoRef.current;
    
    // Immediate transition with minimal fade
    video.pause();
    video.currentTime = 0;
    video.style.opacity = '0.7';
    
    // Immediate video change - no setTimeout
    video.src = videoPath;
    setCurrentVideo(videoPath);
    
    // When video is ready to play
    const onCanPlay = () => {
      video.removeEventListener('canplaythrough', onCanPlay);
      video.style.opacity = '1';
      setIsTransitioning(false);
      
      video.play().catch(error => {
        console.error('Video play error:', error);
        handleVideoError();
      });
    };
    
    video.addEventListener('canplaythrough', onCanPlay);
  }, []);

  // ========================
  // SMOOTH SEQUENCE MANAGEMENT - NO DELAYS
  // ========================
  const playSequence = useCallback(async (words) => {
    if (!words.length || playingSequence) return;
    
    setPlayingSequence(true);
    setSequenceWords(words);
    setCurrentSequenceIndex(0);
    setError('');
    
    // Start immediately with first video
    const firstWord = formatWord(words[0]);
    playVideo(`/sign_videos/${firstWord}.mp4`);
  }, [playingSequence, playVideo]);

  const playNextInSequence = useCallback(() => {
    const nextIndex = currentSequenceIndex + 1;
    
    if (nextIndex >= sequenceWords.length) {
      // Sequence finished - immediate return to regular
      setPlayingSequence(false);
      setSequenceWords([]);
      setCurrentSequenceIndex(0);
      setInputWord('');
      
      // Return to regular video immediately - no timeout
      playVideo('/sign_videos/Regular.mp4');
      return;
    }
    
    // Play next video in sequence IMMEDIATELY
    setCurrentSequenceIndex(nextIndex);
    const nextWord = formatWord(sequenceWords[nextIndex]);
    
    // INSTANT transition - no setTimeout delay
    playVideo(`/sign_videos/${nextWord}.mp4`);
  }, [currentSequenceIndex, sequenceWords, playVideo]);

  const returnToRegular = useCallback(() => {
    setPlayingSequence(false);
    setSequenceWords([]);
    setCurrentSequenceIndex(0);
    setInputWord('');
    
    // Return to regular immediately - no timeout
    playVideo('/sign_videos/Regular.mp4');
  }, [playVideo]);

  // ========================
  // EVENT HANDLERS
  // ========================
  const handleVideoClick = useCallback(() => {
    if (!videoRef.current || isTransitioning) return;
    
    const video = videoRef.current;
    if (video.paused) {
      video.play().catch(e => console.error("Error playing video:", e));
    } else {
      video.pause();
    }
  }, [isTransitioning]);

  const handleVideoError = useCallback(() => {
    console.error('Video error occurred');
    setError('Video file not found');
    setIsTransitioning(false);
    
    // Return to regular video on error - immediate
    if (!currentVideo.includes('Regular.mp4')) {
      playVideo('/sign_videos/Regular.mp4');
    }
  }, [currentVideo, playVideo]);

  const handleVideoEnd = useCallback(() => {
    console.log('Video ended, playing sequence:', playingSequence);
    
    if (playingSequence) {
      // IMMEDIATE next video in sequence
      playNextInSequence();
    } else if (!currentVideo.includes('Regular.mp4')) {
      // IMMEDIATE return to regular
      returnToRegular();
    }
  }, [playingSequence, currentVideo, playNextInSequence, returnToRegular]);

  const handleVideoCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  // ========================
  // FORM HANDLERS
  // ========================
  const processSubmission = useCallback(async (inputText) => {
    if (!inputText.trim()) {
      setError('Please enter a word or sentence');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSpeechError('');
    
    // Stop any current sequence immediately
    setPlayingSequence(false);
    
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      // Single word - immediate play
      if (isWordAvailable(words[0])) {
        const formattedWord = formatWord(words[0]);
        playVideo(`/sign_videos/${formattedWord}.mp4`);
      } else {
        setError(`No sign language animation found for "${words[0]}". Available words: ${AVAILABLE_WORDS.join(', ')}`);
      }
    } else {
      // Multiple words - check all exist
      const missingWords = words.filter(word => !isWordAvailable(word));
      
      if (missingWords.length > 0) {
        setError(`Missing videos for: ${missingWords.join(', ')}. Available words: ${AVAILABLE_WORDS.join(', ')}`);
      } else {
        // Play sequence immediately
        await playSequence(words);
      }
    }
    
    setIsLoading(false);
  }, [playVideo, playSequence]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await processSubmission(inputWord);
  }, [inputWord, processSubmission]);

  // ========================
  // SPEECH RECOGNITION
  // ========================
  const handleSpeechSubmit = useCallback(async (transcript) => {
    await processSubmission(transcript);
  }, [processSubmission]);

  const handleMicClick = useCallback(() => {
    if (!speechSupported) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (!recognitionRef.current) {
      setSpeechError('Speech recognition not initialized. Please refresh the page.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setSpeechError('');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setSpeechError('Failed to start speech recognition. Please try again.');
      }
    }
  }, [speechSupported, isListening]);

  // ========================
  // EFFECTS
  // ========================
  
  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setSpeechSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Speech recognized:', transcript);
        
        setInputWord(transcript);
        setSpeechError('');
        
        if (transcript.trim()) {
          // Immediate submission - no setTimeout
          handleSpeechSubmit(transcript.trim());
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        switch (event.error) {
          case 'no-speech':
            setSpeechError('No speech detected. Please try again.');
            break;
          case 'audio-capture':
            setSpeechError('Microphone not accessible. Please check permissions.');
            break;
          case 'not-allowed':
            setSpeechError('Microphone permission denied. Please allow microphone access.');
            break;
          case 'network':
            setSpeechError('Network error occurred. Please check your connection.');
            break;
          default:
            setSpeechError('Speech recognition failed. Please try again.');
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
      };
      
      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError('');
        console.log('Speech recognition started');
      };
      
      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
      console.warn('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [handleSpeechSubmit]);

  // Initialize component
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Start with regular video immediately
    playVideo('/sign_videos/Regular.mp4');
  }, [playVideo]);

  // Setup video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('canplaythrough', handleVideoCanPlay);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('canplaythrough', handleVideoCanPlay);
    };
  }, [handleVideoEnd, handleVideoError, handleVideoCanPlay]);

  // ========================
  // COMPUTED VALUES
  // ========================
  const inputPlaceholder = isListening ? "Listening..." : "Enter a word or sentence...";
  
  const micButtonTitle = !speechSupported 
    ? "Speech recognition not supported" 
    : isListening 
      ? "Stop listening"
      : "Start voice input";

  const isButtonDisabled = isLoading || isListening || playingSequence || isTransitioning;
  
  // ========================
  // MOBILE MICROPHONE BUTTON STYLES
  // ========================
  const MicButtonMobile = isMobile() ? {
    padding: '6px',
    minWidth: '32px',
    height: '32px',
    fontSize: '14px'
  } : {};

  // ========================
  // RENDER
  // ========================
  return (
    <Container COLORS={COLORS}>
      {/* TOP SECTION - HEADER AND ANIMATION */}
      <TopSection>
        <Header>
          <Title>Word to Sign Animation</Title>
          <Subtitle>
            Type a word or use voice input to see its sign language animation
            {playingSequence && ` (Playing sequence: ${currentSequenceIndex + 1}/${sequenceWords.length})`}
          </Subtitle>
        </Header>

        <ContentContainer>
          <VideoContainer onClick={handleVideoClick}>
            <Video
              ref={videoRef}
              autoPlay
              loop={currentVideo.includes('Regular.mp4')}
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
              preload="auto"
              style={{
                transition: 'opacity 0.05s ease-out', // Ultra-fast transition
                opacity: isTransitioning ? 0.7 : 1
              }}
            />
          </VideoContainer>
        </ContentContainer>
      </TopSection>

      {/* MIDDLE SECTION - INPUT AREA */}
      <MiddleSection>
        {/* Error Messages */}
        {(error || speechError) && (
          <ErrorContainer>
            <FiAlertCircle size={16} />
            <ErrorText>{error || speechError}</ErrorText>
          </ErrorContainer>
        )}

        {/* Speech Status */}
        {isListening && (
          <SpeechStatusContainer>
            <SpeechStatusDot />
            <SpeechStatusText>Listening... Speak now</SpeechStatusText>
          </SpeechStatusContainer>
        )}

        <SearchContainer>
          <SearchForm onSubmit={handleSubmit}>
            <InputWrapper>
              <SearchIcon>
                <FiSearch size={18} />
              </SearchIcon>
              <Input
                ref={inputRef}
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder={inputPlaceholder}
                aria-label="Enter a word"
                list="available-words"
                disabled={isListening || playingSequence || isTransitioning}
                isListening={isListening}
              />
              <datalist id="available-words">
                {AVAILABLE_WORDS.map(word => (
                  <option key={word} value={word} />
                ))}
              </datalist>
              
              <MicButton
                type="button"
                onClick={handleMicClick}
                disabled={!speechSupported || playingSequence || isTransitioning}
                title={micButtonTitle}
                isListening={isListening}
                speechSupported={speechSupported}
                style={MicButtonMobile}
              >
                {isListening ? 
                  <FiMicOff size={isMobile() ? 14 : 18} /> : 
                  <FiMic size={isMobile() ? 14 : 18} />
                }
              </MicButton>
            </InputWrapper>
            
            <SearchButton
              type="submit"
              disabled={isButtonDisabled}
            >
              {isLoading || isTransitioning ? (
                <SpinningIcon><FiRefreshCw size={14} /></SpinningIcon>
              ) : (
                'Send'
              )}
            </SearchButton>
          </SearchForm>
        </SearchContainer>

        {/* Speech Support Info */}
        {!speechSupported && (
          <SupportInfo>
            Voice input requires Chrome, Edge, or Safari browser
          </SupportInfo>
        )}
      </MiddleSection>

      {/* BOTTOM SECTION */}
      <BottomSection>
        {/* Loading indicator for video transitions */}
        {isTransitioning && (
          <div style={{ 
            textAlign: 'center', 
            color: COLORS.textSecondary,
            fontSize: '0.875rem',
            marginTop: '1rem'
          }}>
            Loading video...
          </div>
        )}
      </BottomSection>
    </Container>
  );
};

export default SignToAnimationScreen;