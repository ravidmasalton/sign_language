import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiSearch, FiInfo, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

// Define keyframes at the top level
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const slideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

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
  const [recentWords, setRecentWords] = useState([]);
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  // Available words list - רק המילים שעובדות בפועל
  const AVAILABLE_WORDS = [
    'bye', 'book'  // הוספתי book גם כן לדוגמה
  ];

  // Focus input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Process the input word to match video filename format
  const formatWord = (word) => {
    // המר "thank you" ל-"thank_you" כדי להתאים לשם הקובץ
    return word.trim().toLowerCase().replace(/\s+/g, '_');
  };

  // Check if video exists for the given word
  const checkVideoExists = async (word) => {
    const formattedWord = formatWord(word);
    if (!formattedWord) return false;
    
    // רשימה זמנית של הקבצים שיש לך בפועל ועובדים
    const WORKING_FILES = ['bye', 'book']; // הוסף book גם כן לדוגמה
    
    // בדיקה פשוטה אם המילה קיימת ברשימה העובדת
    return WORKING_FILES.includes(formattedWord);
  };

  // Check if multiple words exist
  const checkMultipleWordsExist = async (words) => {
    const checks = await Promise.all(words.map(word => checkVideoExists(word)));
    return checks;
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
    
    // פיצול הקלט למילים
    const words = inputWord.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      // מילה יחידה - מצב רגיל
      const exists = await checkVideoExists(words[0]);
      
      if (exists) {
        const formattedWord = formatWord(words[0]);
        setCurrentWord(words[0]);
        setCurrentSentence([]);
        setIsSentenceMode(false);
        setVideoExists(true);
        
        // Add to recent words ONLY if video actually works
        const recentList = JSON.parse(localStorage.getItem('recentSignWords') || '[]');
        const updatedRecent = [formattedWord, ...recentList.filter(w => w !== formattedWord)].slice(0, 5);
        setRecentWords(updatedRecent);
        localStorage.setItem('recentSignWords', JSON.stringify(updatedRecent));
        
        // Reset video to ensure it plays from beginning
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(e => console.error("Error playing video:", e));
        }
      } else {
        setVideoExists(false);
        setCurrentWord('');
        setCurrentSentence([]);
        setIsSentenceMode(false);
        setError(`No sign language animation found for "${words[0]}". Available words: ${AVAILABLE_WORDS.join(', ')}`);
      }
    } else {
      // מספר מילים - מצב משפט
      const existsArray = await checkMultipleWordsExist(words);
      const missingWords = words.filter((word, index) => !existsArray[index]);
      
      if (missingWords.length > 0) {
        setError(`Missing videos for: ${missingWords.join(', ')}. Available words: ${AVAILABLE_WORDS.join(', ')}`);
        setVideoExists(false);
        setCurrentWord('');
        setCurrentSentence([]);
        setIsSentenceMode(false);
      } else {
        // כל המילים קיימות - צור משפט
        setCurrentSentence(words);
        setCurrentWord('');
        setIsSentenceMode(true);
        setVideoExists(true);
        
        // Save sentence to recent
        const sentenceKey = words.join(' ');
        const recentList = JSON.parse(localStorage.getItem('recentSignWords') || '[]');
        const updatedRecent = [sentenceKey, ...recentList.filter(w => w !== sentenceKey)].slice(0, 5);
        setRecentWords(updatedRecent);
        localStorage.setItem('recentSignWords', JSON.stringify(updatedRecent));
        
        // Start playing sentence videos
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
        // הגיע לסוף - התחל מהתחלה (לולאה)
        currentIndex = 0;
      }
      
      const currentWord = words[currentIndex];
      const videoSrc = `/sign_videos/${formatWord(currentWord)}.mp4`;
      
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      
      videoRef.current.play().catch(e => console.error("Error playing sequence video:", e));
      
      currentIndex++;
    };
    
    // התחל עם הסרטון הראשון
    playNextVideo();
    
    // כשסרטון נגמר, עבור לבא
    const handleVideoEnd = () => {
      setTimeout(playNextVideo, 500); // הפסקה קצרה בין סרטונים
    };
    
    videoRef.current.addEventListener('ended', handleVideoEnd);
    
    // נקה את ה-listener כש-component מתעדכן
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  };
  const handleSelectRecentWord = async (word) => {
    setInputWord(word.replace(/_/g, ' '));
    await handleSubmitWord(word);
  };

  // Handle selecting from available words
  // eslint-disable-next-line no-unused-vars
  const handleSelectAvailableWord = async (word) => {
    setInputWord(word);
    await handleSubmitWord(word);
  };
  
  // Separate function to handle word submission without event
  const handleSubmitWord = async (word) => {
    setIsLoading(true);
    setError('');
    
    try {
      const exists = await checkVideoExists(word);
      
      if (exists) {
        const formattedWord = formatWord(word);
        setCurrentWord(word);
        setVideoExists(true);
        
        // Update recent words list ONLY if video actually works
        const recentList = JSON.parse(localStorage.getItem('recentSignWords') || '[]');
        const updatedRecent = [formattedWord, ...recentList.filter(w => w !== formattedWord)].slice(0, 5);
        setRecentWords(updatedRecent);
        localStorage.setItem('recentSignWords', JSON.stringify(updatedRecent));
        
        // Reset video
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(e => console.error("Error playing video:", e));
        }
      } else {
        setVideoExists(false);
        setCurrentWord('');
        setError(`No sign language animation found for "${word}"`);
      }
    } catch (error) {
      console.error("Error submitting word:", error);
      setError('An error occurred while loading the animation');
    } finally {
      setIsLoading(false);
    }
  };

  // Load recent words on component mount
  useEffect(() => {
    // נקה את ההיסטוריה הישנה ותתחיל מחדש
    localStorage.removeItem('recentSignWords');
    setRecentWords([]);
  }, []);
  return (
    <Container COLORS={COLORS}>
      <Header>
        <Title>Word to Sign Animation</Title>
        <Subtitle>
          Type a word to see its sign language animation
        </Subtitle>
        <AvailableWordsHint>
          Available words: bye, book. Try sentences like: "bye book" or single words
        </AvailableWordsHint>
      </Header>

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
            {isLoading ? <SpinningIcon><FiRefreshCw size={20} /></SpinningIcon> : 'Show Animation'}
          </SearchButton>
        </SearchForm>
      </SearchContainer>

      {/* הוסר החלק של Quick Select */}      {recentWords.length > 0 && (
        <RecentWordsContainer>
          <RecentWordsTitle>Recent searches:</RecentWordsTitle>
          <RecentWordsList>
            {recentWords.map((word, index) => (
              <RecentWordButton
                key={`${word}-${index}`}
                onClick={() => handleSelectRecentWord(word)}
                disabled={isLoading}
              >
                {word.replace(/_/g, ' ')}
              </RecentWordButton>
            ))}
          </RecentWordsList>
        </RecentWordsContainer>
      )}

      {error && (
        <ErrorContainer>
          <FiAlertCircle size={20} />
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      )}

      {(currentWord || currentSentence.length > 0) && videoExists && (
        <ContentContainer>
          <CurrentWordDisplay>
            <CurrentWordLabel>
              {isSentenceMode ? 'Current sentence:' : 'Current word:'}
            </CurrentWordLabel>
            <CurrentWord>
              {isSentenceMode ? currentSentence.join(' ') : currentWord}
            </CurrentWord>
          </CurrentWordDisplay>

          <VideoContainer>
            <Video
              ref={videoRef}
              autoPlay
              loop={!isSentenceMode} // לולאה רק למילה יחידה
              controls
              muted
              src={isSentenceMode ? 
                `/sign_videos/${formatWord(currentSentence[0])}.mp4` : 
                `/sign_videos/${formatWord(currentWord)}.mp4`
              }
              onError={() => {
                setVideoExists(false);
                setError(`Video file not found`);
              }}
            />
          </VideoContainer>

          <InfoContainer>
            <FiInfo size={18} />
            <InfoText>
              {isSentenceMode ? 
                `This animation sequence demonstrates the sign language gestures for the sentence "${currentSentence.join(' ')}". The videos will play in sequence and loop.` :
                `This animation demonstrates the sign language gesture for the word "${currentWord}". The video will loop automatically to help you learn the gesture.`
              }
            </InfoText>
          </InfoContainer>
        </ContentContainer>
      )}

      {!currentWord && currentSentence.length === 0 && !error && !isLoading && (
        <EmptyStateContainer>
          <EmptyStateIcon>🖐️</EmptyStateIcon>
          <EmptyStateText>
            Enter a word or sentence above to see sign language animation
          </EmptyStateText>
          <EmptyStateSubText>
            Try single words like "bye" or sentences like "bye book"
          </EmptyStateSubText>
        </EmptyStateContainer>
      )}
    </Container>
  );
};

// תיקון האייקון המסתובב
const SpinningIcon = styled.div`
  ${css`
    animation: ${spin} 1s linear infinite;
  `}
`;

// Styled Components for the Sign Language Animation screen
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: ${props => props.backgroundColor || '#f8fafc'};
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.1) 0%,
      rgba(139, 92, 246, 0.1) 25%,
      rgba(245, 158, 11, 0.1) 50%,
      rgba(16, 185, 129, 0.1) 75%,
      rgba(239, 68, 68, 0.1) 100%);
    z-index: -2;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle,
      rgba(99, 102, 241, 0.05) 0%,
      transparent 50%);
    ${css`
      animation: ${float} 20s ease-in-out infinite;
    `}
    z-index: -1;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 32px;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  ${css`
    animation: ${shimmer} 3s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color || '#64748b'};
  margin-bottom: 8px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AvailableWordsHint = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color || '#94a3b8'};
  font-style: italic;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 1;
  color: #6366f1;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  color: ${props => props.color || '#1e293b'};
  min-height: 56px;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &::placeholder {
    color: #94a3b8;
  }
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 0 0 4px rgba(99, 102, 241, 0.1),
      0 8px 32px rgba(99, 102, 241, 0.15);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 14px 14px 14px 44px;
    min-height: 52px;
  }
`;

const SearchButton = styled.button`
  padding: 0 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 56px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
    background: linear-gradient(135deg, #5855f7, #7c3aed);
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    background: linear-gradient(135deg, #94a3b8, #64748b);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0 24px;
    min-height: 52px;
  }
`;

const RecentWordsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
  z-index: 1;
  ${css`
    animation: ${slideIn} 0.6s ease-out;
  `}
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const RecentWordsTitle = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color || '#64748b'};
  margin-bottom: 12px;
  font-weight: 600;
`;

const RecentWordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const RecentWordButton = styled.button`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
  color: ${props => props.color || '#1e293b'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover:not(:disabled) {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  padding: 16px 20px;
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  margin-bottom: 24px;
  ${css`
    animation: ${slideIn} 0.4s ease-out;
  `}
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 14px 18px;
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
  font-weight: 500;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${css`
    animation: ${slideIn} 0.8s ease-out;
  `}
  z-index: 1;
`;

const CurrentWordDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  ${css`
    animation: ${pulse} 2s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 20px;
  }
`;

const CurrentWordLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.color || '#64748b'};
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CurrentWord = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin: 0;
  text-transform: capitalize;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 20px rgba(99, 102, 241, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 8px 32px rgba(99, 102, 241, 0.2);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 20px 24px;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  margin-top: 12px;
  
  @media (max-width: 768px) {
    padding: 16px 20px;
    gap: 12px;
  }
`;

const InfoText = styled.p`
  color: ${props => props.color || '#475569'};
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  ${css`
    animation: ${float} 6s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    padding: 48px 20px;
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  ${css`
    animation: ${wave} 2s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 16px;
  }
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color || '#475569'};
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EmptyStateSubText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color || '#64748b'};
  text-align: center;
  margin: 0;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export default SignToAnimationScreen;