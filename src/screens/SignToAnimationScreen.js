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
 * Component that displays sign language animations based on user input text
 * With Speech Recognition support and optimized video preloading
 */
const SignToAnimationScreen = () => {
  const { theme: COLORS } = useTheme();
  
  // ========================
  // STATE MANAGEMENT
  // ========================
  const [inputWord, setInputWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [currentSentence, setCurrentSentence] = useState([]);
  const [isSentenceMode, setIsSentenceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Speech Recognition states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechError, setSpeechError] = useState('');
  
  // Video preloading states
  const [preloadedVideos, setPreloadedVideos] = useState(new Map());
  const [isPreloading, setIsPreloading] = useState(false);
  
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

  const checkVideoExists = async (word) => {
    const formattedWord = formatWord(word);
    if (!formattedWord) return false;
    
    const originalWordLower = word.toLowerCase().trim();
    const normalizedInput = originalWordLower.replace(/\s+/g, ' ');
    
    const isInList = AVAILABLE_WORDS.includes(normalizedInput) || 
           AVAILABLE_WORDS.some(availableWord => 
             availableWord.toLowerCase().replace(/\s+/g, ' ') === normalizedInput
           );
    
    if (isInList) {
      try {
        const testUrl = `/sign_videos/${formattedWord}.mp4`;
        const response = await fetch(testUrl, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        console.error('Error checking file:', error);
        return false;
      }
    }
    
    return false;
  };

  const checkMultipleWordsExist = async (words) => {
    const checks = await Promise.all(words.map(word => checkVideoExists(word)));
    return checks;
  };

  // ========================
  // VIDEO PRELOADING FUNCTIONS
  // ========================
  const preloadVideo = (videoSrc) => {
    return new Promise((resolve, reject) => {
      if (preloadedVideos.has(videoSrc)) {
        resolve(preloadedVideos.get(videoSrc));
        return;
      }

      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      
      const handleCanPlayThrough = () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('error', handleError);
        
        setPreloadedVideos(prev => new Map(prev.set(videoSrc, video)));
        resolve(video);
      };
      
      const handleError = () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('error', handleError);
        reject(new Error(`Failed to preload ${videoSrc}`));
      };
      
      video.addEventListener('canplaythrough', handleCanPlayThrough);
      video.addEventListener('error', handleError);
      video.src = videoSrc;
    });
  };

  const preloadMultipleVideos = async (words) => {
    setIsPreloading(true);
    const videoSources = words.map(word => `/sign_videos/${formatWord(word)}.mp4`);
    
    try {
      const preloadPromises = videoSources.map(src => preloadVideo(src));
      await Promise.all(preloadPromises);
      console.log('Successfully preloaded all videos:', videoSources);
    } catch (error) {
      console.error('Error preloading videos:', error);
    } finally {
      setIsPreloading(false);
    }
  };

  // ========================
  // OPTIMIZED VIDEO FUNCTIONS
  // ========================
  const playSequenceOfVideos = async (words) => {
    if (!videoRef.current) return;
    
    // Preload all videos first
    await preloadMultipleVideos(words);
    
    let currentIndex = 0;
    
    const playNextVideo = () => {
      if (currentIndex >= words.length) {
        setTimeout(() => {
          setCurrentSentence([]);
          setInputWord('');
          setIsSentenceMode(false);
          if (videoRef.current) {
            videoRef.current.src = '/sign_videos/Regular.mp4';
            videoRef.current.load();
            videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
          }
        }, 800);
        return;
      }
      
      const currentWord = words[currentIndex];
      const videoSrc = `/sign_videos/${formatWord(currentWord)}.mp4`;
      
      // Use preloaded video if available
      const preloadedVideo = preloadedVideos.get(videoSrc);
      if (preloadedVideo) {
        // Copy the preloaded video source to main video element
        videoRef.current.src = videoSrc;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.error("Error playing sequence video:", e));
      } else {
        // Fallback to regular loading
        videoRef.current.src = videoSrc;
        videoRef.current.load();
        videoRef.current.play().catch(e => console.error("Error playing sequence video:", e));
      }
      
      currentIndex++;
    };
    
    playNextVideo();
    
    const handleVideoEnd = () => {
      // Reduced delay since videos are preloaded
      setTimeout(playNextVideo, 200);
    };
    
    videoRef.current.addEventListener('ended', handleVideoEnd);
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  };

  // ========================
  // VIDEO EVENT HANDLERS
  // ========================
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error("Error playing video:", e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoError = () => {
    if (videoRef.current && !videoRef.current.src.includes('Regular.mp4')) {
      videoRef.current.src = '/sign_videos/Regular.mp4';
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
    }
    setError(`Video file not found`);
  };

  // ========================
  // FORM & INPUT HANDLERS
  // ========================
  const processVideoSubmission = async (inputText) => {
    if (!inputText.trim()) {
      setError('Please enter a word or sentence');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSpeechError('');
    
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      // Single word mode
      const exists = await checkVideoExists(words[0]);
      
      if (exists) {
        const formattedWord = formatWord(words[0]);
        const videoSrc = `/sign_videos/${formattedWord}.mp4`;
        
        setCurrentWord(words[0]);
        setCurrentSentence([]);
        setIsSentenceMode(false);
        
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          // Check if video is preloaded
          const preloadedVideo = preloadedVideos.get(videoSrc);
          if (preloadedVideo) {
            videoRef.current.src = videoSrc;
            videoRef.current.currentTime = 0;
            setTimeout(() => {
              if (videoRef.current && videoRef.current.src.includes(formattedWord)) {
                videoRef.current.play().catch(e => {
                  console.error("Error playing video:", e);
                  handleVideoError();
                });
              }
            }, 50); // Reduced delay
          } else {
            // Preload single video for faster playback
            try {
              await preloadVideo(videoSrc);
              videoRef.current.src = videoSrc;
              videoRef.current.currentTime = 0;
              setTimeout(() => {
                if (videoRef.current && videoRef.current.src.includes(formattedWord)) {
                  videoRef.current.play().catch(e => {
                    console.error("Error playing video:", e);
                    handleVideoError();
                  });
                }
              }, 50);
            } catch (error) {
              console.error("Error preloading single video:", error);
              // Fallback to regular loading
              videoRef.current.src = videoSrc;
              videoRef.current.load();
              setTimeout(() => {
                if (videoRef.current && videoRef.current.src.includes(formattedWord)) {
                  videoRef.current.play().catch(e => {
                    console.error("Error playing video:", e);
                    handleVideoError();
                  });
                }
              }, 200);
            }
          }
        }
      } else {
        setCurrentWord('');
        setCurrentSentence([]);
        setIsSentenceMode(false);
        setError(`No sign language animation found for "${words[0]}". Available words: ${AVAILABLE_WORDS.join(', ')}`);
      }
    } else {
      // Multiple words - sentence mode
      const existsArray = await checkMultipleWordsExist(words);
      const missingWords = words.filter((word, index) => !existsArray[index]);
      
      if (missingWords.length > 0) {
        setError(`Missing videos for: ${missingWords.join(', ')}. Available words: ${AVAILABLE_WORDS.join(', ')}`);
        setCurrentWord('');
        setCurrentSentence([]);
        setIsSentenceMode(false);
      } else {
        setCurrentSentence(words);
        setCurrentWord('');
        setIsSentenceMode(true);
        
        playSequenceOfVideos(words);
      }
    }
    
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await processVideoSubmission(inputWord);
  };

  // ========================
  // SPEECH RECOGNITION
  // ========================
  const handleSpeechSubmit = useCallback(async (transcript) => {
    await processVideoSubmission(transcript);
  }, []);

  const handleMicClick = async () => {
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
  };

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
    
    if (videoRef.current) {
      videoRef.current.src = '/sign_videos/Regular.mp4';
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
    }
  }, []);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    
    const handleVideoEnd = () => {
      if (!isSentenceMode && currentWord) {
        setTimeout(() => {
          setCurrentWord('');
          setInputWord('');
          if (video) {
            video.pause();
            video.currentTime = 0;
            video.src = '/sign_videos/Regular.mp4';
            video.load();
            
            setTimeout(() => {
              if (video && video.src.includes('Regular')) {
                video.play().catch(e => console.error("Error playing Regular video:", e));
              }
            }, 100);
          }
        }, 500);
      }
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [currentWord, isSentenceMode]);

  // Cleanup preloaded videos on unmount
  useEffect(() => {
    return () => {
      preloadedVideos.forEach(video => {
        if (video) {
          video.src = '';
          video.load();
        }
      });
    };
  }, []);

  // ========================
  // COMPUTED VALUES
  // ========================
  const videoSrc = isSentenceMode ? 
    `/sign_videos/${formatWord(currentSentence[0])}.mp4` : 
    currentWord ? 
      `/sign_videos/${formatWord(currentWord)}.mp4` : 
      '/sign_videos/Regular.mp4';

  const inputPlaceholder = isListening ? "Listening..." : "Enter a word or sentence...";
  
  const micButtonTitle = !speechSupported 
    ? "Speech recognition not supported" 
    : isListening 
      ? "Stop listening"
      : "Start voice input";

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
            {isPreloading && " (Preparing videos...)"}
          </Subtitle>
        </Header>

        <ContentContainer>
          <VideoContainer onClick={handleVideoClick}>
            <Video
              ref={videoRef}
              autoPlay
              loop={!currentWord && !isSentenceMode}
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
              src={videoSrc}
              onError={handleVideoError}
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
                disabled={isListening}
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
                disabled={!speechSupported}
                title={micButtonTitle}
                isListening={isListening}
                speechSupported={speechSupported}
              >
                {isListening ? <FiMicOff size={18} /> : <FiMic size={18} />}
              </MicButton>
            </InputWrapper>
            
            <SearchButton
              type="submit"
              disabled={isLoading || isListening || isPreloading}
            >
              {isLoading || isPreloading ? (
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
        {/* Minimal footer space */}
      </BottomSection>
    </Container>
  );
};

export default SignToAnimationScreen;