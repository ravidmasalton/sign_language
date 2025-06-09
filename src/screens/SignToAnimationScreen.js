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

  // Available words list - כל המילים הזמינות (לתצוגה ולבדיקת קלט המשתמש)
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

  // Process the input word to match video filename format - תיקון לתמיכה באותיות גדולות
  const formatWord = (word) => {
    if (!word || typeof word !== 'string') return '';
    
    // נקה רווחים מיותרים
    const cleanWord = word.trim();
    if (!cleanWord) return '';
    
    // טפל במקרים מיוחדים כמו "thank you" -> "thank_you"
    const processedWord = cleanWord.toLowerCase().replace(/\s+/g, '_');
    
    // המר לפורמט עם אות גדולה בהתחלה לפי פורמט הקבצים
    // דוגמה: "hello" -> "Hello", "thank_you" -> "Thank_you"
    return processedWord.charAt(0).toUpperCase() + processedWord.slice(1);
  };

  // Check if video exists for the given word
  const checkVideoExists = async (word) => {
    const formattedWord = formatWord(word);
    if (!formattedWord) return false;
    // בדוק אם המילה ריקה או לא תקינה
    // Debug - הדפס מה אנחנו מחפשים
    console.log('🔍 Checking word:', word);
    console.log('📝 Formatted word:', formattedWord);
    console.log('📁 Expected file path:', `/sign_videos/${formattedWord}.mp4`);
    // Debug - רשימת מילים זמינות
    // בדיקה אם המילה קיימת ברשימת המילים הזמינות
    const originalWordLower = word.toLowerCase().trim();
    const normalizedInput = originalWordLower.replace(/\s+/g, ' '); // נרמול רווחים
    
    const isInList = AVAILABLE_WORDS.includes(normalizedInput) || 
           AVAILABLE_WORDS.some(availableWord => 
             availableWord.toLowerCase().replace(/\s+/g, ' ') === normalizedInput
           );
    
    console.log('📋 Is in available words list:', isInList);
    
    // אם המילה ברשימה, בדוק בפועל אם הקובץ קיים
    if (isInList) {
      try {
        const testUrl = `/sign_videos/${formattedWord}.mp4`;
        console.log('🌐 Testing URL:', testUrl);
        
        const response = await fetch(testUrl, { method: 'HEAD' });
        const fileExists = response.ok;
        
        console.log('✅ File actually exists on server:', fileExists);
        console.log('📊 Response status:', response.status);
        console.log('🌍 Full URL tested:', window.location.origin + testUrl);
        console.log('📄 Response headers:', Object.fromEntries(response.headers.entries()));
        
        // בדיקה נוספת - נסה לקבל את גודל הקובץ
        if (fileExists) {
          const contentLength = response.headers.get('content-length');
          console.log('📏 File size:', contentLength ? `${contentLength} bytes` : 'unknown');
        }
        
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
        const updatedRecent = [words[0], ...recentList.filter(w => w !== words[0])].slice(0, 5);
        setRecentWords(updatedRecent);
        localStorage.setItem('recentSignWords', JSON.stringify(updatedRecent));
        
        // Reset video to ensure it plays from beginning - without loop for single word
        if (videoRef.current) {
          // עצור הפעלה קודמת לפני טעינת סרטון חדש
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          const videoSrc = `/sign_videos/${formattedWord}.mp4`;
          console.log('🎬 Loading video:', videoSrc);
          
          videoRef.current.src = videoSrc;
          videoRef.current.load();
          
          // המתן קצת לפני הפעלה
          setTimeout(() => {
            if (videoRef.current && videoRef.current.src.includes(formattedWord)) {
              videoRef.current.play().catch(e => {
                console.error("❌ Error playing video:", e);
                // אם נכשל, נסה לחזור לסרטון רגיל
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
    setInputWord(word);
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
        const updatedRecent = [word, ...recentList.filter(w => w !== word)].slice(0, 5);
        setRecentWords(updatedRecent);
        localStorage.setItem('recentSignWords', JSON.stringify(updatedRecent));
        
        // Reset video
        if (videoRef.current) {
          // עצור הפעלה קודמת
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          const videoSrc = `/sign_videos/${formattedWord}.mp4`;
          console.log('🎬 Loading recent video:', videoSrc);
          
          videoRef.current.src = videoSrc;
          videoRef.current.load();
          
          // המתן קצת לפני הפעלה
          setTimeout(() => {
            if (videoRef.current && videoRef.current.src.includes(formattedWord)) {
              videoRef.current.play().catch(e => {
                console.error("❌ Error playing video:", e);
                // אם נכשל, חזור לסרטון רגיל
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
                {word}
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
            onLoadStart={(e) => {
              console.log('📺 Video loadstart:', e.target.src);
            }}
            onLoadedData={(e) => {
              console.log('✅ Video loaded successfully:', e.target.src);
            }}
            onCanPlay={(e) => {
              console.log('▶️ Video can play:', e.target.src);
            }}
            onError={(e) => {
              console.error('🚨 Video onError triggered!');
              console.error('Current video src:', e.target.src);
              console.error('Video error details:', e.target.error);
              console.error('Error type:', e.target.error?.code);
              console.error('Error message:', e.target.error?.message);
              
              // אם הסרטון הנוכחי נכשל, נסה לטעון את הסרטון הרגיל
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
// Export the component
export default SignToAnimationScreen;