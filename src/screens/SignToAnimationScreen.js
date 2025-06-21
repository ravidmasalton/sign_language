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
 * Component that displays sign language animations - OPTIMIZED FOR SMOOTH PLAYBACK
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
  const [preloadedVideos, setPreloadedVideos] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs
  const videoRef = useRef(null);
  const secondaryVideoRef = useRef(null); // For smooth transitions
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const sequenceTimeoutRef = useRef(null);
  const preloadCacheRef = useRef(new Map());

  // ========================
  // CONSTANTS
  // ========================
  const AVAILABLE_WORDS = [
    "bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day",
    "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom",
    "need", "no", "red", "sick", "son", "study", "tall", "thank you",
    "tired", "write", "yes", "you"
  ];

  // Mobile optimization settings
  const MOBILE_SETTINGS = {
    preloadBuffer: 2, // Number of videos to preload ahead
    transitionDelay: 100, // Shorter delay for mobile
    videoQuality: 'auto', // Let browser decide
    enableHardwareAcceleration: true
  };

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
  // VIDEO PRELOADING SYSTEM
  // ========================
  const preloadVideo = useCallback((videoPath) => {
    return new Promise((resolve, reject) => {
      if (preloadedVideos.has(videoPath) || preloadCacheRef.current.has(videoPath)) {
        resolve(videoPath);
        return;
      }

      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      
      const onCanPlay = () => {
        setPreloadedVideos(prev => new Set([...prev, videoPath]));
        preloadCacheRef.current.set(videoPath, video);
        video.removeEventListener('canplaythrough', onCanPlay);
        video.removeEventListener('error', onError);
        resolve(videoPath);
      };

      const onError = (error) => {
        video.removeEventListener('canplaythrough', onCanPlay);
        video.removeEventListener('error', onError);
        console.warn(`Failed to preload video: ${videoPath}`, error);
        reject(error);
      };

      video.addEventListener('canplaythrough', onCanPlay);
      video.addEventListener('error', onError);
      video.src = videoPath;
    });
  }, [preloadedVideos]);

  const preloadSequenceVideos = useCallback(async (words) => {
    const videoPromises = words.map(word => {
      const formattedWord = formatWord(word);
      const videoPath = `/sign_videos/${formattedWord}.mp4`;
      return preloadVideo(videoPath).catch(err => {
        console.warn(`Failed to preload ${videoPath}:`, err);
        return null;
      });
    });

    try {
      await Promise.allSettled(videoPromises);
      console.log('Sequence videos preloaded');
    } catch (error) {
      console.warn('Some videos failed to preload:', error);
    }
  }, [preloadVideo]);

  // ========================
  // SMOOTH VIDEO TRANSITIONS
  // ========================
  const createSmoothTransition = useCallback((newVideoPath, callback) => {
    if (!videoRef.current) return;

    setIsTransitioning(true);
    const mainVideo = videoRef.current;
    
    // For mobile, use immediate transition to avoid memory issues
    if (isMobile()) {
      mainVideo.pause();
      mainVideo.currentTime = 0;
      mainVideo.src = newVideoPath;
      setCurrentVideo(newVideoPath);
      
      const playPromise = mainVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsTransitioning(false);
            callback?.();
          })
          .catch((error) => {
            console.error('Mobile video play error:', error);
            setIsTransitioning(false);
            handleVideoError();
          });
      }
      return;
    }

    // Desktop smooth transition
    if (secondaryVideoRef.current) {
      const secondaryVideo = secondaryVideoRef.current;
      secondaryVideo.src = newVideoPath;
      secondaryVideo.currentTime = 0;
      
      const onCanPlay = () => {
        secondaryVideo.removeEventListener('canplaythrough', onCanPlay);
        
        // Fade out main video, fade in secondary
        mainVideo.style.opacity = '0';
        secondaryVideo.style.opacity = '1';
        
        secondaryVideo.play().then(() => {
          // Swap videos
          setTimeout(() => {
            mainVideo.src = newVideoPath;
            mainVideo.currentTime = 0;
            mainVideo.style.opacity = '1';
            secondaryVideo.style.opacity = '0';
            secondaryVideo.pause();
            
            setCurrentVideo(newVideoPath);
            setIsTransitioning(false);
            callback?.();
          }, 200);
        }).catch(error => {
          console.error('Secondary video play error:', error);
          setIsTransitioning(false);
          handleVideoError();
        });
      };

      secondaryVideo.addEventListener('canplaythrough', onCanPlay);
    }
  }, []);

  const playVideo = useCallback((videoPath) => {
    if (!videoRef.current) return;
    
    // Clear any pending sequence timeouts
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
    }
    
    createSmoothTransition(videoPath, () => {
      console.log('Video started playing:', videoPath);
    });
  }, [createSmoothTransition]);

  // ========================
  // SEQUENCE MANAGEMENT
  // ========================
  const playSequence = useCallback(async (words) => {
    if (!words.length || playingSequence) return;
    
    setPlayingSequence(true);
    setSequenceWords(words);
    setCurrentSequenceIndex(0);
    setError('');
    
    // Preload sequence videos for smoother playback
    await preloadSequenceVideos(words);
    
    // Start with first video
    const firstWord = formatWord(words[0]);
    playVideo(`/sign_videos/${firstWord}.mp4`);
  }, [playingSequence, preloadSequenceVideos, playVideo]);

  const playNextInSequence = useCallback(() => {
    const nextIndex = currentSequenceIndex + 1;
    
    if (nextIndex >= sequenceWords.length) {
      // Sequence finished
      setPlayingSequence(false);
      setSequenceWords([]);
      setCurrentSequenceIndex(0);
      setInputWord('');
      
      // Return to regular video with delay
      sequenceTimeoutRef.current = setTimeout(() => {
        playVideo('/sign_videos/Regular.mp4');
      }, isMobile() ? 300 : 500);
      
      return;
    }
    
    // Play next video in sequence
    setCurrentSequenceIndex(nextIndex);
    const nextWord = formatWord(sequenceWords[nextIndex]);
    
    // Optimized delay for mobile
    const delay = isMobile() ? MOBILE_SETTINGS.transitionDelay : 200;
    sequenceTimeoutRef.current = setTimeout(() => {
      playVideo(`/sign_videos/${nextWord}.mp4`);
    }, delay);
  }, [currentSequenceIndex, sequenceWords, playVideo]);

  const returnToRegular = useCallback(() => {
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
    }
    
    setPlayingSequence(false);
    setSequenceWords([]);
    setCurrentSequenceIndex(0);
    setInputWord('');
    
    sequenceTimeoutRef.current = setTimeout(() => {
      playVideo('/sign_videos/Regular.mp4');
    }, 400);
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
    
    // Return to regular video on error
    if (!currentVideo.includes('Regular.mp4')) {
      setTimeout(() => playVideo('/sign_videos/Regular.mp4'), 500);
    }
  }, [currentVideo, playVideo]);

  const handleVideoEnd = useCallback(() => {
    if (playingSequence) {
      playNextInSequence();
    } else if (!currentVideo.includes('Regular.mp4')) {
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
    
    // Stop any current sequence
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
    }
    setPlayingSequence(false);
    
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      // Single word
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
        // Play sequence
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
          setTimeout(() => {
            handleSpeechSubmit(transcript.trim());
          }, 100);
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
    
    // Start with regular video
    playVideo('/sign_videos/Regular.mp4');
    
    // Preload common videos
    const commonVideos = ['Regular.mp4', 'Hello.mp4', 'Thank_you.mp4'];
    commonVideos.forEach(video => {
      preloadVideo(`/sign_videos/${video}`).catch(console.warn);
    });
  }, [playVideo, preloadVideo]);

  // Setup video event listeners with optimized handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('canplaythrough', handleVideoCanPlay);
    
    // Mobile-specific optimizations
    if (isMobile()) {
      video.addEventListener('loadstart', () => {
        video.playbackRate = 1.0; // Ensure normal speed
      });
    }

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('canplaythrough', handleVideoCanPlay);
    };
  }, [handleVideoEnd, handleVideoError, handleVideoCanPlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }
      // Clear preload cache
      preloadCacheRef.current.clear();
    };
  }, []);

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
                transition: 'opacity 0.2s ease-in-out',
                opacity: isTransitioning ? 0.7 : 1
              }}
            />
            {/* Secondary video for smooth transitions (desktop only) */}
            {!isMobile() && (
              <Video
                ref={secondaryVideoRef}
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                preload="auto"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  transition: 'opacity 0.2s ease-in-out',
                  pointerEvents: 'none'
                }}
              />
            )}
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
              
              {/* Microphone Button */}
              <MicButton
                type="button"
                onClick={handleMicClick}
                disabled={!speechSupported || playingSequence || isTransitioning}
                title={micButtonTitle}
                isListening={isListening}
                speechSupported={speechSupported}
              >
                {isListening ? <FiMicOff size={18} /> : <FiMic size={18} />}
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