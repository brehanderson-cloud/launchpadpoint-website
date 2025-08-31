// File: src/utils/claude-api.js
// Frontend utilities for Claude API integration

// Main API call function for frontend
export const callBackendAPI = async (endpoint, data, isFormData = false) => {
  try {
    const options = {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data)
    };

    if (!isFormData) {
      options.headers = { 'Content-Type': 'application/json' };
    }

    const response = await fetch(`/api/${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API call failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Backend API Error (${endpoint}):`, error);
    throw error;
  }
};

// Validate job description quality
export const validateJobDescription = (jobDesc) => {
  const minLength = 100;
  const optimalLength = 500;
  const maxLength = 5000;
  
  if (!jobDesc || jobDesc.trim().length === 0) {
    return {
      isValid: false,
      message: 'Job description is required',
      type: 'error'
    };
  }
  
  if (jobDesc.length < minLength) {
    return {
      isValid: false,
      message: `Add more detail (${minLength - jobDesc.length} characters needed for accurate analysis)`,
      type: 'warning'
    };
  }
  
  if (jobDesc.length > maxLength) {
    return {
      isValid: false,
      message: 'Job description too long. Please trim to essential information.',
      type: 'warning'
    };
  }
  
  if (jobDesc.length >= optimalLength) {
    return {
      isValid: true,
      message: 'Perfect! Detailed job description will yield excellent AI results',
      type: 'success'
    };
  }
  
  return {
    isValid: true,
    message: 'Good length. More detail = better AI analysis',
    type: 'info'
  };
};

// Validate resume content
export const validateResumeContent = (resumeData) => {
  if (!resumeData) {
    return { isValid: false, message: 'No resume data found' };
  }

  const requiredFields = ['name', 'email'];
  const missingFields = requiredFields.filter(field => 
    !resumeData.personalInfo?.[field] && !resumeData[field]
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Missing required information: ${missingFields.join(', ')}`
    };
  }

  if (!resumeData.experience || resumeData.experience.length === 0) {
    return {
      isValid: false,
      message: 'No work experience found in resume'
    };
  }

  return { isValid: true, message: 'Resume data looks good' };
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Calculate estimated analysis time
export const estimateAnalysisTime = (resumeLength, jobDescLength) => {
  const baseTime = 10; // 10 seconds base
  const complexityMultiplier = Math.min(
    (resumeLength + jobDescLength) / 2000, 
    3 // Max 3x multiplier
  );
  return Math.round(baseTime * complexityMultiplier);
};

// Track user actions for analytics
export const trackUserAction = (action, metadata = {}) => {
  const event = {
    action,
    timestamp: new Date().toISOString(),
    metadata,
    sessionId: getSessionId(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
  };
  
  // Log for development
  console.log('User Action:', event);
  
  // Send to analytics service (implement based on your analytics provider)
  // Example implementations:
  
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: 'resume_builder',
      event_label: metadata.label || action,
      custom_parameters: metadata
    });
  }
  
  // PostHog
  if (typeof posthog !== 'undefined') {
    posthog.capture(action, metadata);
  }
  
  // Custom analytics endpoint
  // fetch('/api/analytics/track', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event)
  // }).catch(console.error);
};

// Generate or get session ID
const getSessionId = () => {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('resume_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('resume_session_id', sessionId);
  }
  return sessionId;
};

// Error handling utilities
export const handleAPIError = (error, context = '') => {
  console.error(`API Error ${context}:`, error);
  
  // Categorize errors for better user experience
  if (error.message.includes('ANTHROPIC_API_KEY')) {
    return {
      userMessage: 'AI service configuration issue. Please try again later.',
      type: 'config_error',
      shouldRetry: false
    };
  }
  
  if (error.message.includes('rate limit') || error.message.includes('429')) {
    return {
      userMessage: 'Too many requests. Please wait a moment and try again.',
      type: 'rate_limit',
      shouldRetry: true,
      retryAfter: 60 // seconds
    };
  }
  
  if (error.message.includes('network') || error.message.includes('fetch')) {
    return {
      userMessage: 'Network connection issue. Please check your internet and try again.',
      type: 'network_error',
      shouldRetry: true,
      retryAfter: 10
    };
  }
  
  return {
    userMessage: 'An unexpected error occurred. Please try again.',
    type: 'unknown_error',
    shouldRetry: true,
    retryAfter: 30
  };
};

// Retry logic with exponential backoff
export const retryWithBackoff = async (operation, maxRetries = 3, baseDelay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Performance monitoring
export const measurePerformance = async (operation, operationName) => {
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const duration = performance.now() - startTime;
    
    console.log(`Performance: ${operationName} completed in ${Math.round(duration)}ms`);
    
    // Track performance metrics
    trackUserAction('performance_metric', {
      operation: operationName,
      duration: Math.round(duration),
      success: true
    });
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    console.error(`Performance: ${operationName} failed after ${Math.round(duration)}ms`);
    
    trackUserAction('performance_metric', {
      operation: operationName,
      duration: Math.round(duration),
      success: false,
      error: error.message
    });
    
    throw error;
  }
};

// Local storage utilities (for offline capabilities)
export const saveToLocalStorage = (key, data) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.warn('Could not save to localStorage:', error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.warn('Could not read from localStorage:', error);
    return null;
  }
};

// Resume content validation helpers
export const validatePDFFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf'];
  
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Please upload a PDF file only' };
  }
  
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: `File size (${formatFileSize(file.size)}) exceeds 10MB limit` 
    };
  }
  
  return { isValid: true };
};

// Generate unique operation ID for tracking
export const generateOperationId = () => {
  return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Environment validation
export const validateEnvironment = () => {
  const requiredEnvVars = {
    client: ['REACT_APP_API_BASE_URL'],
    server: ['ANTHROPIC_API_KEY']
  };
  
  if (typeof window !== 'undefined') {
    // Client-side validation
    const missing = requiredEnvVars.client.filter(envVar => !process.env[envVar]);
    if (missing.length > 0) {
      console.warn('Missing client environment variables:', missing);
      return { isValid: false, missing };
    }
  }
  
  return { isValid: true };
};

// Export all utilities
export default {
  callBackendAPI,
  validateJobDescription,
  validateResumeContent,
  formatFileSize,
  estimateAnalysisTime,
  trackUserAction,
  handleAPIError,
  retryWithBackoff,
  measurePerformance,
  saveToLocalStorage,
  getFromLocalStorage,
  validatePDFFile,
  generateOperationId,
  validateEnvironment
};
