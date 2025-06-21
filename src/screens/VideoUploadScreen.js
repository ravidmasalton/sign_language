// VideoUploadScreen.js
import React, { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaCloudUploadAlt, FaSignLanguage, FaUser, FaVideo, FaCheck, FaTimes, FaSpinner, FaPlay, FaPause, FaCloud } from 'react-icons/fa';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  Container,
  ContentWrapper,
  Header,
  Title,
  TitleIcon,
  Subtitle,
  FormCard,
  Form,
  FormSection,
  SectionTitle,
  FileUploadArea,
  UploadPlaceholder,
  UploadIcon,
  UploadText,
  UploadHint,
  VideoPreviewContainer,
  VideoPreviewWrapper,
  VideoPreview,
  PlayButton,
  VideoFileName,
  VideoFileSize,
  InputGroup,
  InputLabel,
  InputIcon,
  Input,
  ProgressContainer,
  ProgressLabel,
  ProgressBar,
  ProgressFill,
  DebugLogsContainer,
  DebugLogItem,
  ErrorMessage,
  ErrorIcon,
  ErrorText,
  StatusMessage,
  StatusIcon,
  StatusText,
  ResultsCard,
  ResultsTitle,
  ResultsGrid,
  ResultItem,
  ResultLabel,
  ResultValue,
  FileStructure,
  FileStructureTitle,
  FileStructureItem,
  ButtonGroup,
  Button,
  SpinnerIcon,
  HelpCard,
  HelpTitle,
  HelpText
} from './VideoUploadStyles';

/**
 * Upload video to Firebase Storage with progress tracking
 */
const uploadVideoToFirebase = async (videoFile, gesture, contributor, onProgress, addLog) => {
  try {
    // Validate input parameters
    if (!videoFile) {
      const error = 'Video file is required';
      addLog(`ERROR: Validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (!gesture?.trim()) {
      const error = 'Gesture name is required';
      addLog(`ERROR: Validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (!contributor?.trim()) {
      const error = 'Contributor name is required';
      addLog(`ERROR: Validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (typeof onProgress !== 'function') {
      const error = 'Progress callback is required';
      addLog(`ERROR: Validation failed: ${error}`);
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
      addLog(`ERROR: Firebase error: ${error}`);
      return { success: false, error };
    }
    
    // Validate video file properties
    if (!videoFile.size || videoFile.size === 0) {
      const error = 'Video file is empty or corrupted';
      addLog(`ERROR: File validation failed: ${error}`);
      return { success: false, error };
    }
    
    if (!videoFile.type || !videoFile.type.startsWith('video/')) {
      const error = 'File must be a video format';
      addLog(`ERROR: File validation failed: ${error}`);
      return { success: false, error };
    }
    
    addLog(`INFO: Starting upload validation passed`);
    addLog(`INFO: File: ${videoFile.name} (${(videoFile.size / (1024 * 1024)).toFixed(2)} MB)`);
    addLog(`INFO: Gesture: "${gesture.trim()}", Contributor: "${contributor.trim()}"`);
    
    // Create unique filename
    const timestamp = Date.now();
    const sanitizedGesture = gesture.trim().toLowerCase().replace(/\s+/g, '_');
    const sanitizedContributor = contributor.trim().toLowerCase().replace(/\s+/g, '_');
    const fileName = `${sanitizedContributor}_${timestamp}.mp4`;
    const filePath = `videos/${sanitizedGesture}/${fileName}`;
    
    addLog(`INFO: Creating file path: ${filePath}`);
    
    // Create storage reference with error handling
    let storageRef;
    try {
      storageRef = ref(storage, filePath);
      if (!storageRef) {
        throw new Error('Failed to create storage reference');
      }
      addLog(`SUCCESS: Storage reference created successfully`);
    } catch (error) {
      const errorMsg = `Failed to create storage reference: ${error.message}`;
      addLog(`ERROR: ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
    
    // Start upload with progress tracking
    let uploadTask;
    try {
      uploadTask = uploadBytesResumable(storageRef, videoFile);
      if (!uploadTask) {
        throw new Error('Failed to create upload task');
      }
      addLog(`INFO: Upload task created, starting upload...`);
    } catch (error) {
      const errorMsg = `Failed to start upload: ${error.message}`;
      addLog(`ERROR: ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
    
    return new Promise((resolve, reject) => {
      // Validate uploadTask before using it
      if (!uploadTask || typeof uploadTask.on !== 'function') {
        const error = 'Upload task is invalid';
        addLog(`ERROR: ${error}`);
        reject(new Error(error));
        return;
      }
      
      uploadTask.on('state_changed',
        (snapshot) => {
          try {
            // Validate snapshot
            if (!snapshot) {
              addLog(`WARNING: Received null snapshot`);
              return;
            }
            
            if (typeof snapshot.bytesTransferred === 'undefined' || typeof snapshot.totalBytes === 'undefined') {
              addLog(`WARNING: Invalid snapshot data`);
              return;
            }
            
            if (snapshot.totalBytes === 0) {
              addLog(`WARNING: Total bytes is zero`);
              return;
            }
            
            // Calculate progress percentage
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            // Validate progress callback before calling
            if (typeof onProgress === 'function') {
              onProgress(Math.min(100, Math.max(0, progress))); // Clamp between 0-100
            }
            
            addLog(`INFO: Upload progress: ${progress.toFixed(1)}% (${snapshot.bytesTransferred}/${snapshot.totalBytes} bytes)`);
          } catch (error) {
            addLog(`WARNING: Error in progress handler: ${error.message}`);
          }
        },
        (error) => {
          // Enhanced error logging
          const errorMsg = error?.message || 'Unknown upload error';
          const errorCode = error?.code || 'unknown';
          addLog(`ERROR: Upload failed [${errorCode}]: ${errorMsg}`);
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          try {
            addLog(`INFO: Upload completed, getting download URL...`);
            
            // Validate uploadTask.snapshot.ref before using it
            if (!uploadTask?.snapshot?.ref) {
              const error = 'Upload task snapshot reference is invalid';
              addLog(`ERROR: ${error}`);
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
              addLog(`SUCCESS: Download URL obtained: ${downloadURL}`);
            } catch (error) {
              const errorMsg = `Failed to get download URL: ${error.message}`;
              addLog(`ERROR: ${errorMsg}`);
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
            
            addLog(`SUCCESS: Upload completed successfully! File: ${fileName}`);
            resolve(result);
            
          } catch (error) {
            const errorMsg = `Failed in completion handler: ${error.message}`;
            addLog(`ERROR: ${errorMsg}`);
            reject(error);
          }
        }
      );
    });
    
  } catch (error) {
    const errorMsg = `Upload initialization failed: ${error.message}`;
    addLog(`ERROR: ${errorMsg}`);
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
      addLog(`INFO: File selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    }
  };

  // Handle form submission with Firebase upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    addLog('INFO: Form submission started');
    
    // Validate form data
    if (!videoFile) {
      const error = 'Please select a video file.';
      addLog(`ERROR: Validation failed: ${error}`);
      setErrorMessage(error);
      return;
    }
    
    if (!gesture.trim()) {
      const error = 'Please enter the gesture/sign name.';
      addLog(`ERROR: Validation failed: ${error}`);
      setErrorMessage(error);
      return;
    }
    
    if (!contributor.trim()) {
      const error = 'Please enter the contributor name.';
      addLog(`ERROR: Validation failed: ${error}`);
      setErrorMessage(error);
      return;
    }

    addLog(`SUCCESS: Form validation passed - Uploading "${gesture}" by "${contributor}"`);
    
    // Clear any existing error message
    setErrorMessage('');
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Upload video to Firebase Storage
      addLog('INFO: Starting video upload to Firebase Storage...');
      
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
      
      addLog(`SUCCESS: Video uploaded successfully: ${result.fileName}`);
      addLog(`INFO: Download URL: ${result.downloadURL}`);
      addLog(`INFO: File path: ${result.filePath}`);
      
      setUploadResult(result);
      addLog('SUCCESS: Upload process completed successfully!');
      
    } catch (error) {
      addLog(`ERROR: Upload failed: ${error.message}`);
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
    
    addLog('INFO: Form reset');
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

  
  return (
    <Container backgroundColor={COLORS.background}>
      <ContentWrapper>
        <Header>
          <Title color={COLORS.text}>
            <TitleIcon><FaCloudUploadAlt /></TitleIcon>
            Video Upload
          </Title>
          <Subtitle color={COLORS.textSecondary}>
            Contribute Sign Language Videos to Help Us Improve Gesture Recognition
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
                          addLog('INFO: Video started playing');
                        }}
                        onPause={() => {
                          setIsVideoPlaying(false);
                          addLog('INFO: Video paused');
                        }}
                        onLoadStart={() => addLog('INFO: Video load started')}
                        onLoadedData={() => addLog('INFO: Video data loaded')}
                        onLoadedMetadata={() => addLog('INFO: Video metadata loaded')}
                        onCanPlay={() => addLog('SUCCESS: Video can play')}
                        onError={(e) => {
                          const errorMsg = e.target.error?.message || 'Video format not supported by browser';
                          addLog(`ERROR: Video preview error: ${errorMsg}`);
                          addLog('INFO: Video preview failed, but upload will still work');
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
                <SectionTitle color={COLORS.text}>Upload Logs</SectionTitle>
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
                    <FileStructureTitle color={COLORS.text}>SUCCESS: File saved to Firebase Storage:</FileStructureTitle>
                    <FileStructureItem color={COLORS.primary}>
                      Path: {uploadResult.filePath}
                    </FileStructureItem>
                    <FileStructureItem color={COLORS.success}>
                      <a href={uploadResult.downloadURL} target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                        View file in Firebase
                      </a>
                    </FileStructureItem>
                    <FileStructureItem color={COLORS.info}>
                      Uploaded: {new Date(uploadResult.metadata.uploadedAt).toLocaleString()}
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
            1. Choose a video from your device that shows a specific gesture
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            2. Enter the name of the gesture you're demonstrating
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            3. Add your name to be credited as a contributor
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            4. Click upload – your video will be added to our training dataset
          </HelpText>
          <HelpText color={COLORS.textSecondary}>
            5. By contributing, you help improve the accuracy of our gesture recognition model over time
          </HelpText>
        </HelpCard>
      </ContentWrapper>
    </Container>
  );
};

export default VideoUploadScreen;