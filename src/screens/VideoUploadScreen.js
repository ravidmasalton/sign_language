import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaCloudUploadAlt, FaSignLanguage, FaUser, FaVideo, FaCheck, FaTimes, FaSpinner, FaPlay, FaPause, FaCloud } from 'react-icons/fa';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


// Define animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/**
 * Upload video to Firebase Storage with progress tracking
 */
const uploadVideoToFirebase = async (videoFile, gesture, contributor, onProgress, addLog) => {
  try {
    // Validate input parameters
    if (!videoFile) {
      const error = 'Video file is required';
      addLog(`❌ Validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (!gesture?.trim()) {
      const error = 'Gesture name is required';
      addLog(`❌ Validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (!contributor?.trim()) {
      const error = 'Contributor name is required';
      addLog(`❌ Validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (typeof onProgress !== 'function') {
      const error = 'Progress callback is required';
      addLog(`❌ Validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (typeof addLog !== 'function') {
      const error = 'Logging function is required';
      console.error('Validation failed:', error);
      return { success: false, error };
    }
    
    // Validate Firebase storage
    if (!storage) {
      const error = 'Firebase storage is not initialized';
      addLog(`❌ Firebase error: ${error}`);
      return { success: false, error };
    }
    
    // Validate video file properties
    if (!videoFile.size || videoFile.size === 0) {
      const error = 'Video file is empty or corrupted';
      addLog(`❌ File validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (!videoFile.type || !videoFile.type.startsWith('video/')) {
      const error = 'File must be a video format';
      addLog(`❌ File validation failed: ${error}`);
      return { success: false, error };
    }
    
    addLog(`📝 Starting upload validation passed`);
    addLog(`📁 File: ${videoFile.name} (${(videoFile.size / (1024 * 1024)).toFixed(2)} MB)`);
    addLog(`🏷️ Gesture: "${gesture.trim()}", Contributor: "${contributor.trim()}"`);
    
    // Create unique filename
    const timestamp = Date.now();
    const sanitizedGesture = gesture.trim().toLowerCase().replace(/\s+/g, '_');
    const sanitizedContributor = contributor.trim().toLowerCase().replace(/\s+/g, '_');
    const fileName = `${sanitizedContributor}_${timestamp}.mp4`;
    const filePath = `videos/${sanitizedGesture}/${fileName}`;
    
    addLog(`📁 Creating file path: ${filePath}`);
    
    // Create storage reference with error handling
    let storageRef;
    try {
      storageRef = ref(storage, filePath);
      if (!storageRef) {
        throw new Error('Failed to create storage reference');
      }
      addLog(`✅ Storage reference created successfully`);
    } catch (error) {
      const errorMsg = `Failed to create storage reference: ${error.message}`;
      addLog(`❌ ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
    
    // Start upload with progress tracking
    let uploadTask;
    try {
      uploadTask = uploadBytesResumable(storageRef, videoFile);
      if (!uploadTask) {
        throw new Error('Failed to create upload task');
      }
      addLog(`🚀 Upload task created, starting upload...`);
    } catch (error) {
      const errorMsg = `Failed to start upload: ${error.message}`;
      addLog(`❌ ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
    
    return new Promise((resolve, reject) => {
      // Validate uploadTask before using it
      if (!uploadTask || typeof uploadTask.on !== 'function') {
        const error = 'Upload task is invalid';
        addLog(`❌ ${error}`);
        reject(new Error(error));
        return;
      }
      
      uploadTask.on('state_changed',
        (snapshot) => {
          try {
            // Validate snapshot
            if (!snapshot) {
              addLog(`⚠️ Warning: Received null snapshot`);
              return;
            }
            
            if (typeof snapshot.bytesTransferred === 'undefined' || typeof snapshot.totalBytes === 'undefined') {
              addLog(`⚠️ Warning: Invalid snapshot data`);
              return;
            }
            
            if (snapshot.totalBytes === 0) {
              addLog(`⚠️ Warning: Total bytes is zero`);
              return;
            }
            
            // Calculate progress percentage
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            // Validate progress callback before calling
            if (typeof onProgress === 'function') {
              onProgress(Math.min(100, Math.max(0, progress))); // Clamp between 0-100
            }
            
            addLog(`⬆️ Upload progress: ${progress.toFixed(1)}% (${snapshot.bytesTransferred}/${snapshot.totalBytes} bytes)`);
          } catch (error) {
            addLog(`⚠️ Error in progress handler: ${error.message}`);
          }
        },
        (error) => {
          // Enhanced error logging
          const errorMsg = error?.message || 'Unknown upload error';
          const errorCode = error?.code || 'unknown';
          addLog(`❌ Upload failed [${errorCode}]: ${errorMsg}`);
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          try {
            addLog(`🎯 Upload completed, getting download URL...`);
            
            // Validate uploadTask.snapshot.ref before using it
            if (!uploadTask?.snapshot?.ref) {
              const error = 'Upload task snapshot reference is invalid';
              addLog(`❌ ${error}`);
              reject(new Error(error));
              return;
            }
            
            // Get download URL with additional validation
            let downloadURL;
            try {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              if (!downloadURL || typeof downloadURL !== 'string') {
                throw new Error('Received invalid download URL');
              }
              addLog(`✅ Download URL obtained: ${downloadURL}`);
            } catch (error) {
              const errorMsg = `Failed to get download URL: ${error.message}`;
              addLog(`❌ ${errorMsg}`);
              reject(new Error(errorMsg));
              return;
            }
            
            // Validate video file properties before creating metadata
            const fileSize = videoFile?.size || 0;
            const fileType = videoFile?.type || 'unknown';
            
            const result = {
              success: true,
              downloadURL: downloadURL,
              filePath: filePath,
              fileName: fileName,
              metadata: {
                gesture: sanitizedGesture,
                contributor: sanitizedContributor,
                originalGesture: gesture.trim(),
                originalContributor: contributor.trim(),
                uploadedAt: new Date().toISOString(),
                fileSize: fileSize,
                fileType: fileType
              }
            };
            
            addLog(`✅ Upload completed successfully! File: ${fileName}`);
            resolve(result);
            
          } catch (error) {
            const errorMsg = `Failed in completion handler: ${error.message}`;
            addLog(`❌ ${errorMsg}`);
            reject(error);
          }
        }
      );
    });
    
  } catch (error) {
    const errorMsg = `Upload initialization failed: ${error.message}`;
    addLog(`❌ ${errorMsg}`);
    console.error('Upload initialization failed:', error);
    return {
      success: false,
      error: errorMsg
    };
  }
};

/**
 * Component for uploading sign language videos
 */
const VideoUploadScreen = () => {
  const { theme: COLORS } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  
  // State for form data
  const [videoFile, setVideoFile] = useState(null);
  const [gesture, setGesture] = useState('');
  const [contributor, setContributor] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);

  // Debug logging function
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setDebugLogs(prev => [...prev.slice(-9), logMessage]); // Keep last 10 logs
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setErrorMessage('Please upload a video file (MP4, AVI, MOV, etc.)');
        setVideoFile(null);
        setVideoPreview('');
        return;
      }
      
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setErrorMessage('');
      setUploadResult(null);
      addLog(`📁 File selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    }
  };

  // Handle form submission with Firebase upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    addLog('🚀 Form submission started');
    
    // Validate form data
    if (!videoFile) {
      const error = 'Please select a video file.';
      addLog(`❌ Validation failed: ${error}`);
      setErrorMessage(error);
      return;
    }
    
    if (!gesture.trim()) {
      const error = 'Please enter the gesture/sign name.';
      addLog(`❌ Validation failed: ${error}`);
      setErrorMessage(error);
      return;
    }
    
    if (!contributor.trim()) {
      const error = 'Please enter the contributor name.';
      addLog(`❌ Validation failed: ${error}`);
      setErrorMessage(error);
      return;
    }

    addLog(`✅ Form validation passed - Uploading "${gesture}" by "${contributor}"`);
    
    // Clear any existing error message
    setErrorMessage('');
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Upload video to Firebase Storage
      addLog('📤 Starting video upload to Firebase Storage...');
      
      const result = await uploadVideoToFirebase(
        videoFile, 
        gesture, 
        contributor, 
        (progress) => {
          setUploadProgress(progress);
        },
        addLog
      );
      
      if (!result.success) {
        throw new Error(result.error || 'Video upload failed');
      }
      
      addLog(`✅ Video uploaded successfully: ${result.fileName}`);
      addLog(`🔗 Download URL: ${result.downloadURL}`);
      addLog(`📁 File path: ${result.filePath}`);
      
      setUploadResult(result);
      addLog('🎉 Upload process completed successfully!');
      
    } catch (error) {
      addLog(`❌ Upload failed: ${error.message}`);
      setErrorMessage(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle clicking the file input area
  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  // Reset form
  const handleReset = () => {
    setVideoFile(null);
    setVideoPreview('');
    setGesture('');
    setContributor('');
    setErrorMessage('');
    setUploadResult(null);
    setUploadProgress(0);
    setIsUploading(false);
    setDebugLogs([]);
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    addLog('🔄 Form reset');
  };

  // Toggle video play/pause
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Navigate back to home
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container backgroundColor={COLORS.background}>
      <ContentWrapper>
        <Header>
          <Title color={COLORS.text}>
            <TitleIcon><FaCloudUploadAlt /></TitleIcon>
            Video Upload to Firebase
          </Title>
          <Subtitle color={COLORS.textSecondary}>
            Upload sign language videos to Firebase Storage organized by gesture name
          </Subtitle>
        </Header>

        {/* Main Form */}
        <FormCard backgroundColor={COLORS.card} borderColor={COLORS.border}>
          <Form onSubmit={handleSubmit}>
            {/* File Upload Area */}
            <FormSection>
              <SectionTitle color={COLORS.text}>Video File</SectionTitle>
              <FileUploadArea 
                onClick={handleClickFileInput}
                backgroundColor={COLORS.surface}
                borderColor={videoFile ? COLORS.primary : COLORS.border}
                hasFile={!!videoFile}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/*"
                  style={{ display: 'none' }}
                />
                
                {!videoFile && (
                  <UploadPlaceholder>
                    <UploadIcon><FaVideo size={40} /></UploadIcon>
                    <UploadText color={COLORS.textSecondary}>
                      Click to select a video file
                    </UploadText>
                    <UploadHint color={COLORS.textMuted}>
                      Supports MP4, WebM, MOV formats. Will be uploaded to Firebase Storage.
                    </UploadHint>
                  </UploadPlaceholder>
                )}
                
                {videoFile && (
                  <VideoPreviewContainer>
                    <VideoPreviewWrapper>
                      <VideoPreview 
                        ref={videoRef}
                        src={videoPreview} 
                        onPlay={() => {
                          setIsVideoPlaying(true);
                          addLog('▶️ Video started playing');
                        }}
                        onPause={() => {
                          setIsVideoPlaying(false);
                          addLog('⏸️ Video paused');
                        }}
                        onLoadStart={() => addLog('🔄 Video load started')}
                        onLoadedData={() => addLog('📊 Video data loaded')}
                        onLoadedMetadata={() => addLog('📋 Video metadata loaded')}
                        onCanPlay={() => addLog('✅ Video can play')}
                        onError={(e) => {
                          const errorMsg = e.target.error?.message || 'Video format not supported by browser';
                          addLog(`❌ Video preview error: ${errorMsg}`);
                          addLog('💡 Video preview failed, but upload will still work');
                        }}
                        controls
                        preload="metadata"
                        muted
                        playsInline
                      />
                      <PlayButton onClick={toggleVideoPlay}>
                        {isVideoPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                      </PlayButton>
                    </VideoPreviewWrapper>
                    <VideoFileName color={COLORS.text}>
                      {videoFile.name}
                    </VideoFileName>
                    <VideoFileSize color={COLORS.textSecondary}>
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </VideoFileSize>
                  </VideoPreviewContainer>
                )}
              </FileUploadArea>
            </FormSection>

            {/* Metadata Inputs */}
            <FormSection>
              <SectionTitle color={COLORS.text}>Video Information</SectionTitle>
              
              <InputGroup>
                <InputLabel htmlFor="gesture" color={COLORS.text}>
                  <InputIcon><FaSignLanguage /></InputIcon>
                  Gesture/Sign Name
                </InputLabel>
                <Input
                  id="gesture"
                  type="text"
                  value={gesture}
                  onChange={(e) => setGesture(e.target.value)}
                  placeholder="e.g., hello, thank_you, goodbye"
                  backgroundColor={COLORS.surface}
                  borderColor={COLORS.border}
                  color={COLORS.text}
                  required
                />
                <InputHint color={COLORS.textMuted}>
                  This will create a folder in Firebase Storage: videos/{gesture.toLowerCase().replace(/\s+/g, '_')}/
                </InputHint>
              </InputGroup>
              
              <InputGroup>
                <InputLabel htmlFor="contributor" color={COLORS.text}>
                  <InputIcon><FaUser /></InputIcon>
                  Contributor Name
                </InputLabel>
                <Input
                  id="contributor"
                  type="text"
                  value={contributor}
                  onChange={(e) => setContributor(e.target.value)}
                  placeholder="Your name or username"
                  backgroundColor={COLORS.surface}
                  borderColor={COLORS.border}
                  color={COLORS.text}
                  required
                />
              </InputGroup>
            </FormSection>

            {/* Upload Progress */}
            {isUploading && (
              <FormSection>
                <SectionTitle color={COLORS.text}>
                  <FaCloud style={{ marginRight: '8px' }} />
                  Upload Progress
                </SectionTitle>
                <ProgressContainer>
                  <ProgressLabel color={COLORS.text}>
                    Uploading: {uploadProgress.toFixed(1)}%
                  </ProgressLabel>
                  <ProgressBar>
                    <ProgressFill 
                      width={`${uploadProgress}%`}
                      backgroundColor={COLORS.primary}
                    />
                  </ProgressBar>
                </ProgressContainer>
              </FormSection>
            )}

            {/* Debug Logs */}
            {debugLogs.length > 0 && (
              <FormSection>
                <SectionTitle color={COLORS.text}>🔍 Upload Logs</SectionTitle>
                <DebugLogsContainer backgroundColor={COLORS.surface} borderColor={COLORS.border}>
                  {debugLogs.map((log, index) => (
                    <DebugLogItem key={index} color={COLORS.textSecondary}>
                      {log}
                    </DebugLogItem>
                  ))}
                </DebugLogsContainer>
              </FormSection>
            )}

            {/* Error Message */}
            {errorMessage && (
              <ErrorMessage 
                backgroundColor={COLORS.errorLight} 
                borderColor={COLORS.error}
              >
                <ErrorIcon>
                  <FaTimes size={16} />
                </ErrorIcon>
                <ErrorText color={COLORS.error}>
                  {errorMessage}
                </ErrorText>
              </ErrorMessage>
            )}

            {/* Success Message and Results */}
            {uploadResult && (
              <>
                <StatusMessage 
                  backgroundColor={COLORS.successLight} 
                  borderColor={COLORS.success}
                >
                  <StatusIcon color={COLORS.success}><FaCheck size={16} /></StatusIcon>
                  <StatusText color={COLORS.success}>
                    Video uploaded successfully to Firebase Storage!
                  </StatusText>
                </StatusMessage>

                {/* Upload Results */}
                <ResultsCard backgroundColor={COLORS.surface} borderColor={COLORS.border}>
                  <ResultsTitle color={COLORS.text}>
                    <FaCloud size={18} style={{ marginRight: '8px' }} />
                    Upload Results
                  </ResultsTitle>
                  
                  <ResultsGrid>
                    <ResultItem>
                      <ResultLabel color={COLORS.textSecondary}>File Name:</ResultLabel>
                      <ResultValue color={COLORS.text}>{uploadResult.fileName}</ResultValue>
                    </ResultItem>
                    <ResultItem>
                      <ResultLabel color={COLORS.textSecondary}>Gesture:</ResultLabel>
                      <ResultValue color={COLORS.text}>{uploadResult.metadata.originalGesture}</ResultValue>
                    </ResultItem>
                    <ResultItem>
                      <ResultLabel color={COLORS.textSecondary}>Contributor:</ResultLabel>
                      <ResultValue color={COLORS.text}>{uploadResult.metadata.originalContributor}</ResultValue>
                    </ResultItem>
                    <ResultItem>
                      <ResultLabel color={COLORS.textSecondary}>File Size:</ResultLabel>
                      <ResultValue color={COLORS.text}>{(uploadResult.metadata.fileSize / (1024 * 1024)).toFixed(2)} MB</ResultValue>
                    </ResultItem>
                  </ResultsGrid>

                  {/* Firebase Structure Preview */}
                  <FileStructure>
                    <FileStructureTitle color={COLORS.text}>✅ File saved to Firebase Storage:</FileStructureTitle>
                    <FileStructureItem color={COLORS.primary}>
                      📁 Path: {uploadResult.filePath}
                    </FileStructureItem>
                    <FileStructureItem color={COLORS.success}>
                      🔗 <a href={uploadResult.downloadURL} target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                        View file in Firebase
                      </a>
                    </FileStructureItem>
                    <FileStructureItem color={COLORS.info}>
                      📅 Uploaded: {new Date(uploadResult.metadata.uploadedAt).toLocaleString()}
                    </FileStructureItem>
                  </FileStructure>
                </ResultsCard>
              </>
            )}

            {/* Form Buttons */}
            <ButtonGroup>
              <Button
                type="button"
                onClick={handleReset}
                backgroundColor={COLORS.surface}
                color={COLORS.text}
                borderColor={COLORS.border}
                disabled={isUploading}
              >
                Reset Form
              </Button>
              
              <Button
                type="submit"
                backgroundColor={COLORS.primary}
                color="#FFFFFF"
                disabled={isUploading || !videoFile}
              >
                {isUploading ? (
                  <>
                    <SpinnerIcon><FaSpinner size={16} /></SpinnerIcon>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaCloud size={16} style={{ marginRight: '8px' }} />
                    Upload to Firebase
                  </>
                )}
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>

        {/* Help Section */}
        <HelpCard backgroundColor={COLORS.card} borderColor={COLORS.border}>
          <HelpTitle color={COLORS.text}>How it works:</HelpTitle>
          <HelpText color={COLORS.textSecondary}>
            1. Select a video file from your device
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            2. Enter the gesture name (creates folder structure)
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            3. Enter your name as contributor
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            4. Click upload - file goes to Firebase Storage
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            5. Files are organized: videos/gesture_name/contributor_timestamp.mp4
          </HelpText>
        </HelpCard>
      </ContentWrapper>
    </Container>
  );
};

// Styled Components (same as before, keeping all styles)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: ${props => props.backgroundColor};
  min-height: 100%;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 8px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${props => props.color};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TitleIcon = styled.span`
  ${css`animation: ${pulse} 2s infinite;`}
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FormCard = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  ${css`animation: ${slideIn} 0.6s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed ${props => props.borderColor};
  border-radius: 12px;
  background-color: ${props => props.backgroundColor};
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${props => props.hasFile ? props.borderColor : props.theme.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    min-height: 160px;
  }
`;

const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const UploadIcon = styled.div`
  color: ${props => props.theme.primary};
  margin-bottom: 8px;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

const UploadText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const UploadHint = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const VideoPreviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const VideoPreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const VideoPreview = styled.video`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  
  ${VideoPreviewWrapper}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const VideoFileName = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const VideoFileSize = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InputIcon = styled.span`
  color: ${props => props.theme.primary};
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 12px 16px;
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primaryLight};
  }
  
  &::placeholder {
    color: ${props => props.theme.textMuted};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 14px;
  }
`;

const InputHint = styled.p`
  font-size: 0.8rem;
  color: ${props => props.color};
  margin-top: -4px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  
  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`;

const ErrorIcon = styled.span`
  color: ${props => props.theme.error};
`;

const ErrorText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  
  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`;

const StatusIcon = styled.span`
  color: ${props => props.color};
`;

const SpinnerIcon = styled.span`
  color: ${props => props.theme.info};
  ${css`animation: ${spin} 1s linear infinite;`}
`;

const StatusText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressLabel = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${props => props.theme.surface};
  border-radius: 6px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 10px;
  }
`;

const ProgressFill = styled.div`
  width: ${props => props.width};
  height: 100%;
  background-color: ${props => props.backgroundColor};
  border-radius: 6px;
  transition: width 0.3s ease;
`;

const ResultsCard = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 8px;
  padding: 16px;
  ${css`animation: ${slideIn} 0.4s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ResultsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const ResultItem = styled.div`
  text-align: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  
  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const ResultLabel = styled.p`
  font-size: 0.8rem;
  color: ${props => props.color};
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ResultValue = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.color};
  font-family: 'Courier New', monospace;
  word-break: break-all;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FileStructure = styled.div`
  background: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FileStructureTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 6px;
  }
`;

const FileStructureItem = styled.p`
  font-size: 0.8rem;
  color: ${props => props.color};
  font-family: 'Courier New', monospace;
  margin-bottom: 4px;
  word-break: break-all;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Button = styled.button`
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 8px;
  border: ${props => props.borderColor ? `1px solid ${props.borderColor}` : 'none'};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 16px;
  }
`;

const HelpCard = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  padding: 20px;
  margin-top: 8px;
  ${css`animation: ${slideIn} 0.8s ease-out;`}
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const HelpTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const HelpText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.color};
  margin-bottom: 8px;
  position: relative;
  padding-left: 16px;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${props => props.theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 6px;
  }
`;

const DebugLogsContainer = styled.div`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 6px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  
  @media (max-width: 768px) {
    max-height: 150px;
    font-size: 0.75rem;
  }
`;

const DebugLogItem = styled.div`
  color: ${props => props.color};
  margin-bottom: 4px;
  word-wrap: break-word;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export default VideoUploadScreen;