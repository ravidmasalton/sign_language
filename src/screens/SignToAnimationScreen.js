import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiSearch, FiInfo, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

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
    <Container backgroundColor={COLORS.background}>
      <Header>
        <Title color={COLORS.text}>Word to Sign Animation</Title>
        <Subtitle color={COLORS.textSecondary}>
          Type a word to see its sign language animation
        </Subtitle>
        <AvailableWordsHint color={COLORS.textSecondary}>
          Available words: bye, book. Try sentences like: "bye book" or single words
        </AvailableWordsHint>
      </Header>

      <SearchContainer>
        <SearchForm onSubmit={handleSubmit}>
          <InputWrapper>
            <SearchIcon>
              <FiSearch size={20} color={COLORS.textSecondary} />
            </SearchIcon>
            <Input
              ref={inputRef}
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder="Enter a word or sentence..."
              aria-label="Enter a word"
              backgroundColor={COLORS.card}
              borderColor={COLORS.border}
              color={COLORS.text}
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
            backgroundColor={COLORS.primary}
            disabled={isLoading}
          >
            {isLoading ? <FiRefreshCw size={20} className="spinning" /> : 'Show Animation'}
          </SearchButton>
        </SearchForm>
      </SearchContainer>

      {/* הוסר החלק של Quick Select */}

      {recentWords.length > 0 && (
        <RecentWordsContainer>
          <RecentWordsTitle color={COLORS.textSecondary}>Recent searches:</RecentWordsTitle>
          <RecentWordsList>
            {recentWords.map((word, index) => (
              <RecentWordButton
                key={`${word}-${index}`}
                onClick={() => handleSelectRecentWord(word)}
                backgroundColor={COLORS.card}
                borderColor={COLORS.border}
                color={COLORS.text}
                disabled={isLoading}
              >
                {word.replace(/_/g, ' ')}
              </RecentWordButton>
            ))}
          </RecentWordsList>
        </RecentWordsContainer>
      )}

      {error && (
        <ErrorContainer backgroundColor={COLORS.errorLight} borderColor={COLORS.error}>
          <FiAlertCircle size={20} color={COLORS.error} />
          <ErrorText color={COLORS.error}>{error}</ErrorText>
        </ErrorContainer>
      )}

      {(currentWord || currentSentence.length > 0) && videoExists && (
        <ContentContainer>
          <CurrentWordDisplay color={COLORS.text}>
            <CurrentWordLabel color={COLORS.textSecondary}>
              {isSentenceMode ? 'Current sentence:' : 'Current word:'}
            </CurrentWordLabel>
            <CurrentWord>
              {isSentenceMode ? currentSentence.join(' ') : currentWord}
            </CurrentWord>
          </CurrentWordDisplay>

          <VideoContainer backgroundColor={COLORS.card} borderColor={COLORS.border}>
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

          <InfoContainer backgroundColor={COLORS.infoLight} borderColor={COLORS.info}>
            <FiInfo size={18} color={COLORS.info} />
            <InfoText color={COLORS.textSecondary}>
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
          <EmptyStateText color={COLORS.textSecondary}>
            Enter a word or sentence above to see sign language animation
          </EmptyStateText>
          <EmptyStateSubText color={COLORS.textSecondary}>
            Try single words like "bye" or sentences like "bye book"
          </EmptyStateSubText>
        </EmptyStateContainer>
      )}
    </Container>
  );
};

// Styled Components for the Sign Language Animation screen
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: ${props => props.backgroundColor};
  min-height: 100vh;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.color};
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color};
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AvailableWordsHint = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
  
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
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid ${props => props.borderColor};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  min-height: 48px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.color};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SearchButton = styled.button`
  padding: 0 24px;
  background-color: ${props => props.backgroundColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .spinning {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const QuickSelectContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const QuickSelectTitle = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  margin-bottom: 12px;
  font-weight: 600;
`;

const QuickSelectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 6px;
  }
`;

const QuickSelectButton = styled.button`
  padding: 8px 12px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 20px;
  font-size: 0.85rem;
  color: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.borderColor};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
`;

const RecentWordsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const RecentWordsTitle = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  margin-bottom: 8px;
  font-weight: 600;
`;

const RecentWordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const RecentWordButton = styled.button`
  padding: 6px 12px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 16px;
  font-size: 0.85rem;
  color: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.borderColor};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 10px 14px;
  }
`;

const ErrorText = styled.p`
  color: ${props => props.color};
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CurrentWordDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const CurrentWordLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.color};
  margin-bottom: 4px;
`;

const CurrentWord = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  text-transform: capitalize;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${props => props.backgroundColor};
  border: 2px solid ${props => props.borderColor};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`;

const InfoText = styled.p`
  color: ${props => props.color};
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    padding: 36px 16px;
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 12px;
  }
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color};
  text-align: center;
  margin-bottom: 8px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EmptyStateSubText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  text-align: center;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export default SignToAnimationScreen;