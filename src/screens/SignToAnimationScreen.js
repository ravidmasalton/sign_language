import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSearch, FiInfo, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import {
  Container,
  Header,
  Title,
  Subtitle,
  AvailableWordsHint,
  SearchContainer,
  SearchForm,
  InputWrapper,
  SearchIcon,
  Input,
  SearchButton,
  SpinningIcon,
  RecentWordsContainer,
  RecentWordsTitle,
  RecentWordsList,
  RecentWordButton,
  ErrorContainer,
  ErrorText,
  ContentContainer,
  CurrentWordDisplay,
  CurrentWordLabel,
  CurrentWord,
  VideoContainer,
  Video,
  InfoContainer,
  InfoText,
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
  const [recentWords, setRecentWords] = useState([]);
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  // Available words list - כל המילים הזמינות
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
    
    // טען את הסרטון הרגיל בהתחלה
    if (videoRef.current) {
      videoRef.current.src = '/sign_videos/Regular.mp4';
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
    }
  }, []);

  // Handle video end - return to regular video
  useEffect(() => {
    const handleVideoEnd = () => {
      // אם זה לא מצב משפט ויש מילה נוכחית, עבור לסרטון רגיל
      if (!isSentenceMode && currentWord) {
        setTimeout(() => {
          setCurrentWord('');
          setInputWord('');
          if (videoRef.current) {
            videoRef.current.src = '/sign_videos/Regular.mp4';
            videoRef.current.load();
            videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
          }
        }, 500); // המתנה קצרה לפני המעבר
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
    // המר "thank you" ל-"thank_you" כדי להתאים לשם הקובץ
    return word.trim().toLowerCase().replace(/\s+/g, '_');
  };

  // Check if video exists for the given word
  const checkVideoExists = async (word) => {
    const formattedWord = formatWord(word);
    if (!formattedWord) return false;
    
    // Debug - הדפס מה אנחנו מחפשים
    console.log('Checking word:', word);
    console.log('Formatted word:', formattedWord);
    console.log('Expected file path:', `/sign_videos/${formattedWord}.mp4`);
    
    // בדיקה אם המילה קיימת ברשימת המילים הזמינות
    const originalWordLower = word.toLowerCase().trim();
    
    const isInList = AVAILABLE_WORDS.includes(originalWordLower) || 
           AVAILABLE_WORDS.includes(formattedWord) ||
           AVAILABLE_WORDS.some(availableWord => 
             formatWord(availableWord) === formattedWord
           );
    
    console.log('Is in available words list:', isInList);
    
    // אם המילה ברשימה, בדוק בפועל אם הקובץ קיים
    if (isInList) {
      try {
        const response = await fetch(`/sign_videos/${formattedWord}.mp4`, { method: 'HEAD' });
        const fileExists = response.ok;
        console.log('File actually exists on server:', fileExists);
        console.log('Response status:', response.status);
        return fileExists;
      } catch (error) {
        console.error('Error checking file:', error);
        return false;
      }
    }
    
    return false;
  };

  // Check if multiple words exist
  const checkMultipleWordsExist = async (words) => {
    const checks = await Promise.all(words.map(word => checkVideoExists(word)));
    return checks;
  };

  // Handle video click for play/pause like GIF
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
        
        // Reset video to ensure it plays from beginning - without loop for single word
        if (videoRef.current) {
          // עצור הפעלה קודמת לפני טעינת סרטון חדש
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          videoRef.current.src = `/sign_videos/${formattedWord}.mp4`;
          videoRef.current.load();
          
          // המתן קצת לפני הפעלה
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => {
                console.error("Error playing video:", e);
                // אם נכשל, נסה לחזור לסרטון רגיל
                if (videoRef.current) {
                  videoRef.current.src = '/sign_videos/Regular.mp4';
                  videoRef.current.load();
                  videoRef.current.play().catch(err => console.error("Error playing Regular video:", err));
                }
              });
            }
          }, 100);
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
        // הגיע לסוף המשפט - חזור לסרטון רגיל
        setTimeout(() => {
          setCurrentSentence([]);
          setInputWord('');
          setIsSentenceMode(false);
          if (videoRef.current) {
            videoRef.current.src = '/sign_videos/Regular.mp4';
            videoRef.current.load();
            videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
          }
        }, 800); // המתנה יותר ארוכה לפני החזרה לסרטון רגיל
        return;
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
          // עצור הפעלה קודמת
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          const formattedWord = formatWord(word);
          videoRef.current.src = `/sign_videos/${formattedWord}.mp4`;
          videoRef.current.load();
          
          // המתן קצת לפני הפעלה
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => {
                console.error("Error playing video:", e);
                // אם נכשל, חזור לסרטון רגיל
                if (videoRef.current) {
                  videoRef.current.src = '/sign_videos/Regular.mp4';
                  videoRef.current.load();
                  videoRef.current.play().catch(err => console.error("Error playing Regular video:", err));
                }
              });
            }
          }, 100);
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
          Available words: {AVAILABLE_WORDS.join(', ')}. Try sentences or single words
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

      {recentWords.length > 0 && (
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

      {/* הצגת הסרטון - תמיד, עם Regular.mp4 כברירת מחדל */}
      <ContentContainer>
        {(currentWord || currentSentence.length > 0) && (
          <CurrentWordDisplay>
            <CurrentWordLabel>
              {isSentenceMode ? 'Current sentence:' : 'Current word:'}
            </CurrentWordLabel>
            <CurrentWord>
              {isSentenceMode ? currentSentence.join(' ') : currentWord}
            </CurrentWord>
          </CurrentWordDisplay>
        )}

        <VideoContainer onClick={handleVideoClick}>
          <Video
            ref={videoRef}
            autoPlay
            loop={!currentWord && !isSentenceMode} // לולאה רק לסרטון הרגיל
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            src={
              isSentenceMode ? 
                `/sign_videos/${formatWord(currentSentence[0])}.mp4` : 
                currentWord ? 
                  `/sign_videos/${formatWord(currentWord)}.mp4` : 
                  '/sign_videos/Regular.mp4' // סרטון ברירת מחדל
            }
            onError={() => {
              // אם הסרטון הנוכחי נכשל, נסה לטעון את הסרטון הרגיל
              if (videoRef.current && videoRef.current.src !== '/sign_videos/Regular.mp4') {
                videoRef.current.src = '/sign_videos/Regular.mp4';
                videoRef.current.load();
                videoRef.current.play().catch(e => console.error("Error playing Regular video:", e));
              }
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
              currentWord ?
                `This animation demonstrates the sign language gesture for the word "${currentWord}". The video will loop automatically to help you learn the gesture.` :
                'This is a regular sign language animation. Enter a word above to see specific sign language gestures.'
            }
          </InfoText>
        </InfoContainer>
      </ContentContainer>

      {!currentWord && currentSentence.length === 0 && !error && !isLoading && (
        <EmptyStateContainer>
          <EmptyStateIcon>🖐️</EmptyStateIcon>
          <EmptyStateText>
            Enter a word or sentence above to see sign language animation
          </EmptyStateText>
          <EmptyStateSubText>
            Try words like "love", "family", "thank you" or sentences like "love family"
          </EmptyStateSubText>
        </EmptyStateContainer>
      )}
    </Container>
  );
};

export default SignToAnimationScreen;