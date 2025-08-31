// File: api/save-resume.js
// Save optimized resume to user account

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
      optimizedResume, 
      originalResume, 
      jobDescription, 
      userEmail,
      analysisResults,
      appliedSuggestions = [],
      userPreferences = {},
      resumeTitle = ''
    } = req.body;

    if (!optimizedResume) {
      return res.status(400).json({ error: 'Optimized resume data required' });
    }

    // Create comprehensive resume save data
    const resumeData = {
      id: `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: resumeTitle || `Resume for ${userPreferences.targetRole || 'Position'}`,
      userEmail: userEmail || 'anonymous',
      
      // Resume data
      optimizedResume,
      originalResume,
      
      // Job context
      jobDescription: jobDescription ? jobDescription.substring(0, 2000) : '', // Truncate for storage
      targetCompany: extractCompanyFromJobDesc(jobDescription),
      targetRole: userPreferences.targetRole || extractRoleFromJobDesc(jobDescription),
      
      // Analysis results
      analysisResults: {
        overallScore: analysisResults?.overallScore || 0,
        improvementsCount: analysisResults?.suggestions?.length || 0,
        atsScore: analysisResults?.atsOptimization?.score || 0,
        matchingSkills: analysisResults?.keyFindings?.matchingSkills || [],
        missingSkills: analysisResults?.keyFindings?.missingSkills || [],
        appliedSuggestionsCount: appliedSuggestions.length
      },
      
      // User interaction data
      metadata: {
        appliedSuggestions,
        userPreferences,
        industry: userPreferences.industry,
        careerLevel: userPreferences.careerLevel,
        stylePreference: userPreferences.stylePreference,
        processingTime: req.body.processingTime || null,
        userAgent: req.headers['user-agent'],
        sessionId: req.body.sessionId || generateSessionId()
      },
      
      // Timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      // Status
      status: 'completed',
      version: '2.0'
    };

    // In production, save to your database
    // For now, simulate database save
    console.log('Resume saved successfully:', {
      id: resumeData.id,
      title: resumeData.title,
      score: resumeData.analysisResults.overallScore,
      improvements: resumeData.analysisResults.improvementsCount
    });

    // Simulate database operations
    const saveResult = await simulateResumeStorage(resumeData);

    // Track analytics
    trackResumeEvent('resume_saved', {
      resumeId: resumeData.id,
      overallScore: resumeData.analysisResults.overallScore,
      improvementsApplied: appliedSuggestions.length,
      industry: userPreferences.industry,
      careerLevel: userPreferences.careerLevel
    });

    return res.status(200).json({
      success: true,
      resumeId: resumeData.id,
      title: resumeData.title,
      message: 'Resume saved successfully',
      downloadLinks: {
        pdf: `/api/download-resume-pdf?id=${resumeData.id}`,
        docx: `/api/download-resume-docx?id=${resumeData.id}`
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Save resume error:', error);
    return res.status(500).json({
      error: 'Failed to save resume',
      details: error.message
    });
  }
}

// Helper functions
function extractCompanyFromJobDesc(jobDesc) {
  if (!jobDesc) return '';
  
  // Simple company name extraction
  const companyPatterns = [
    /at ([A-Z][a-zA-Z\s&,.-]+)(?:\s+we|\s+is|\s+are)/i,
    /join ([A-Z][a-zA-Z\s&,.-]+)(?:\s+as|\s+team)/i,
    /([A-Z][a-zA-Z\s&,.-]+)(?:\s+is\s+looking|\s+seeks)/i
  ];
  
  for (const pattern of companyPatterns) {
    const match = jobDesc.match(pattern);
    if (match && match[1] && match[1].length < 50) {
      return match[1].trim();
    }
  }
  
  return '';
}

function extractRoleFromJobDesc(jobDesc) {
  if (!jobDesc) return '';
  
  // Extract job title from first few lines
  const lines = jobDesc.split('\n').slice(0, 3);
  const titleLine = lines.find(line => 
    line.length < 80 && 
    line.length > 10 &&
    !line.toLowerCase().includes('company') &&
    !line.toLowerCase().includes('location')
  );
  
  return titleLine ? titleLine.trim() : '';
}

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function simulateResumeStorage(resumeData) {
  // Simulate database save delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // In production, replace with actual database save:
  // const result = await database.resumes.insert(resumeData);
  // return result;
  
  return {
    success: true,
    id: resumeData.id,
    savedAt: new Date().toISOString()
  };
}

function trackResumeEvent(eventType, eventData) {
  // Analytics tracking
  console.log(`Analytics Event: ${eventType}`, eventData);
  
  // In production, send to your analytics service:
  // analytics.track(eventType, eventData);
}
