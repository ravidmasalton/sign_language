import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSearch, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
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
  BottomSection,
  TabBar,
  TabItem,
  TabIcon,
  TabLabel,
  ErrorContainer,
  ErrorText,
  EmptyStateContainer,
  EmptyStateIcon,
  EmptyStateText,
  EmptyStateSubText
} from './SignAnimationStyles';

/**
 * Component that displays sign language animations based on user input text
 */
const SignToAnimationScreen = () => {
  const { theme: COLORS } = useTheme();
  const [inputWord, setInputWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [currentSentence, setCurrentSentence] = useState([]);
  const [isSentenceMode, setIsSentenceMode] = useState(false);
  const [videoExists, setVideoExists] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  // Available words list
  const AVAILABLE_WORDS = [
    "bye", "beautiful", "bird", "book", "but", "can", "dad", "dance", "day",
    "deaf", "drink", "eat", "enjoy", "family", "go", "help", "love", "mom",
    "need", "no", "red", "sick", "son", "study", "tall", "thank you",
    "tired", "write", "yes", "you"
  ];

  // Focus input field on mount and load regular video
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

  // Handle video end - return to regular video
  useEffect(() => {
    const handleVideoEnd = () => {
      if (!isSentenceMode && currentWord) {
        console.log('🏁 Video ended, returning to regular video');
        setTimeout(() => {
          setCurrentWord('');
          setInputWord('');
          if (videoRef.current) {
            console.log('🔄 Loading Regular video after word end');
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.src = '/sign_videos/Regular.mp4';
            videoRef.current.load();
            
            setTimeout(() => {
              if (videoRef.current && videoRef.current.src.includes('Regular')) {
                videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
              }
            }, 100);
          }
        }, 500);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [currentWord, isSentenceMode]);

  // Process the input word to match video filename format
  const formatWord = (word) => {
    if (!word || typeof word !== 'string') return '';
    
    const cleanWord = word.trim();
    if (!cleanWord) return '';
    
    const processedWord = cleanWord.toLowerCase().replace(/\s+/g, '_');
    
    return processedWord.charAt(0).toUpperCase() + processedWord.slice(1);
  };

  // Check if video exists for the given word
  const checkVideoExists = async (word) => {
    const formattedWord = formatWord(word);
    if (!formattedWord) return false;
    
    console.log('🔍 Checking word:', word);
    console.log('📝 Formatted word:', formattedWord);
    console.log('📁 Expected file path:', `/sign_videos/${formattedWord}.mp4`);
    
    const originalWordLower = word.toLowerCase().trim();
    const normalizedInput = originalWordLower.replace(/\s+/g, ' ');
    
    const isInList = AVAILABLE_WORDS.includes(normalizedInput) || 
           AVAILABLE_WORDS.some(availableWord => 
             availableWord.toLowerCase().replace(/\s+/g, ' ') === normalizedInput
           );
    
    console.log('📋 Is in available words list:', isInList);
    
    if (isInList) {
      try {
        const testUrl = `/sign_videos/${formattedWord}.mp4`;
        console.log('🌐 Testing URL:', testUrl);
        
        const response = await fetch(testUrl, { method: 'HEAD' });
        const fileExists = response.ok;
        
        console.log('✅ File actually exists on server:', fileExists);
        
        return fileExists;
      } catch (error) {
        console.error('❌ Error checking file:', error);
        return false;
      }
    }
    
    console.log('❌ Word not in available list');
    return false;
  };

  // Check if multiple words exist
  const checkMultipleWordsExist = async (words) => {
    const checks = await Promise.all(words.map(word => checkVideoExists(word)));
    return checks;
  };

  // Handle video click for play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error("Error playing video:", e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputWord.trim()) {
      setError('Please enter a word or sentence');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const words = inputWord.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      // Single word mode
      const exists = await checkVideoExists(words[0]);
      
      if (exists) {
        const formattedWord = formatWord(words[0]);
        setCurrentWord(words[0]);
        setCurrentSentence([]);
        setIsSentenceMode(false);
        setVideoExists(true);
        
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          const videoSrc = `/sign_videos/${formattedWord}.mp4`;
          console.log('🎬 Loading video:', videoSrc);
          
          videoRef.current.src = videoSrc;
          videoRef.current.load();
          
          setTimeout(() => {
            if (videoRef.current && videoRef.current.src.includes(formattedWord)) {
              videoRef.current.play().catch(e => {
                console.error("❌ Error playing video:", e);
                if (videoRef.current) {
                  console.log('🔄 Fallback to Regular video');
                  videoRef.current.src = '/sign_videos/Regular.mp4';
                  videoRef.current.load();
                  videoRef.current.play().catch(err => console.error("Error playing Regular video:", err));
                }
              });
            }
          }, 200);
        }
      } else {
        setVideoExists(false);
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
        setVideoExists(false);
        setCurrentWord('');
        setCurrentSentence([]);
        setIsSentenceMode(false);
      } else {
        setCurrentSentence(words);
        setCurrentWord('');
        setIsSentenceMode(true);
        setVideoExists(true);
        
        playSequenceOfVideos(words);
      }
    }
    
    setIsLoading(false);
  };

  // Play sequence of videos for sentence mode
  const playSequenceOfVideos = async (words) => {
    if (!videoRef.current) return;
    
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
      
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      
      videoRef.current.play().catch(e => console.error("Error playing sequence video:", e));
      
      currentIndex++;
    };
    
    playNextVideo();
    
    const handleVideoEnd = () => {
      setTimeout(playNextVideo, 500);
    };
    
    videoRef.current.addEventListener('ended', handleVideoEnd);
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  };

  return (
    <Container COLORS={COLORS}>
      {/* TOP SECTION - HEADER AND ANIMATION */}
      <TopSection>
        <Header>
          <Title>Word to Sign Animation</Title>
          <Subtitle>
            Type a word to see its sign language animation
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
              src={
                isSentenceMode ? 
                  `/sign_videos/${formatWord(currentSentence[0])}.mp4` : 
                  currentWord ? 
                    `/sign_videos/${formatWord(currentWord)}.mp4` : 
                    '/sign_videos/Regular.mp4'
              }
              onError={(e) => {
                console.error('🚨 Video onError triggered!');
                console.error('Current video src:', e.target.src);
                
                if (videoRef.current && !videoRef.current.src.includes('Regular.mp4')) {
                  console.log('🔄 Video failed, trying Regular.mp4');
                  videoRef.current.src = '/sign_videos/Regular.mp4';
                  videoRef.current.load();
                  videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
                } else {
                  console.error('❌ Even Regular.mp4 failed!');
                }
                
                setVideoExists(false);
                setError(`Video file not found`);
              }}
            />
          </VideoContainer>
        </ContentContainer>
      </TopSection>

      {/* MIDDLE SECTION - INPUT AREA */}
      <MiddleSection>
        {error && (
          <ErrorContainer>
            <FiAlertCircle size={20} />
            <ErrorText>{error}</ErrorText>
          </ErrorContainer>
        )}

        <SearchContainer>
          <SearchForm onSubmit={handleSubmit}>
            <InputWrapper>
              <SearchIcon>
                <FiSearch size={20} />
              </SearchIcon>
              <Input
                ref={inputRef}
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder="Enter a word or sentence..."
                aria-label="Enter a word"
                list="available-words"
              />
              <datalist id="available-words">
                {AVAILABLE_WORDS.map(word => (
                  <option key={word} value={word} />
                ))}
              </datalist>
            </InputWrapper>
            <SearchButton
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <SpinningIcon><FiRefreshCw size={16} /></SpinningIcon> : 'Send'}
            </SearchButton>
          </SearchForm>
        </SearchContainer>
      </MiddleSection>

      {/* BOTTOM SECTION - EMPTY NOW */}
      <BottomSection>
        {/* No content */}
      </BottomSection>
    </Container>
  );
};

export default SignToAnimationScreen;