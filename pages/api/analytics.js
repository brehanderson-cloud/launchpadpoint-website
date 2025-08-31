// File: api/analytics.js
// Complete analytics tracking for resume builder

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      eventType, 
      eventData = {}, 
      userEmail = 'anonymous',
      sessionId,
      resumeId,
      timestamp = new Date().toISOString()
    } = req.body;

    if (!eventType) {
      return res.status(400).json({ error: 'Event type required' });
    }

    // Create comprehensive analytics event
    const analyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      eventType,
      eventData,
      
      // User context
      userEmail,
      sessionId: sessionId || generateSessionId(),
      resumeId,
      
      // Request metadata
      timestamp,
      userAgent: req.headers['user-agent'] || 'unknown',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown',
      referer: req.headers.referer || 'direct',
      
      // Performance data
      serverTimestamp: new Date().toISOString(),
      processingRegion: process.env.VERCEL_REGION || 'unknown'
    };

    // Process different event types
    switch (eventType) {
      case 'resume_uploaded':
        console.log(`📄 Resume uploaded - User: ${userEmail}, File: ${eventData.fileName}`);
        break;
        
      case 'ai_analysis_started':
        console.log(`🧠 AI analysis started - Score: ${eventData.previousScore || 'N/A'}`);
        break;
        
      case 'ai_analysis_completed':
        console.log(`✅ AI analysis completed - Score: ${eventData.overallScore}%, Suggestions: ${eventData.suggestionsCount}`);
        break;
        
      case 'suggestion_applied':
        console.log(`🎯 Suggestion applied - Type: ${eventData.suggestionType}, Impact: ${eventData.impact}`);
        break;
        
      case 'resume_optimized':
        console.log(`🚀 Resume optimized - Score improvement: ${eventData.scoreImprovement}%, Applied: ${eventData.appliedSuggestions}`);
        break;
        
      case 'resume_downloaded':
        console.log(`📥 Resume downloaded - Format: ${eventData.format}, User: ${userEmail}`);
        break;
        
      case 'cover_letter_generated':
        console.log(`📝 Cover letter generated - User: ${userEmail}, Company: ${eventData.companyName}`);
        break;
        
      case 'user_upgrade':
        console.log(`💎 User upgraded - Plan: ${eventData.plan}, User: ${userEmail}`);
        break;
        
      case 'error_occurred':
        console.error(`❌ Error occurred - Type: ${eventData.errorType}, Details: ${eventData.errorMessage}`);
        break;
        
      default:
        console.log(`📊 Custom event - Type: ${eventType}, Data:`, eventData);
    }

    // Store analytics event (in production, save to analytics database)
    const saveResult = await saveAnalyticsEvent(analyticsEvent);

    // Update user metrics (in production, update user stats)
    await updateUserMetrics(userEmail, eventType, eventData);

    return res.status(200).json({
      success: true,
      eventId: analyticsEvent.id,
      message: 'Event tracked successfully',
      timestamp: analyticsEvent.serverTimestamp
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return res.status(500).json({
      error: 'Failed to track event',
      details: error.message
    });
  }
}

async function saveAnalyticsEvent(event) {
  // Simulate database save
  console.log('Saving analytics event:', event.id);
  
  // In production, implement actual database save:
  // const result = await database.analytics.insert(event);
  // return result;
  
  return { success: true, savedAt: new Date().toISOString() };
}

async function updateUserMetrics(userEmail, eventType, eventData) {
  // Update user-specific metrics based on event
  const metricsUpdate = {};
  
  switch (eventType) {
    case 'resume_uploaded':
      metricsUpdate.totalUploads = 1;
      break;
      
    case 'ai_analysis_completed':
      metricsUpdate.totalAnalyses = 1;
      metricsUpdate.averageScore = eventData.overallScore;
      break;
      
    case 'resume_optimized':
      metricsUpdate.totalOptimizations = 1;
      metricsUpdate.averageImprovement = eventData.scoreImprovement;
      break;
      
    case 'resume_downloaded':
      metricsUpdate.totalDownloads = 1;
      if (eventData.format === 'pdf') metricsUpdate.pdfDownloads = 1;
      if (eventData.format === 'docx') metricsUpdate.docxDownloads = 1;
      break;
      
    case 'cover_letter_generated':
      metricsUpdate.totalCoverLetters = 1;
      break;
  }
  
  // In production, update user metrics in database:
  // await database.userMetrics.updateByEmail(userEmail, metricsUpdate);
  
  console.log(`Updated metrics for ${userEmail}:`, metricsUpdate);
}

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
