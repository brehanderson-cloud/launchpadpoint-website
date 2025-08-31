// File: api/analyze-resume.js
// Vercel Serverless Function for Claude AI Resume Analysis

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate environment
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    // Extract request data
    const { resumeContent, jobDescription, userPreferences } = req.body;

    // Validate required fields
    if (!resumeContent || !jobDescription) {
      return res.status(400).json({ 
        error: 'Resume content and job description are required',
        success: false
      });
    }

    // Create enhanced analysis prompt
    const analysisPrompt = createAnalysisPrompt(resumeContent, jobDescription, userPreferences);

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        temperature: 0.7,
        messages: [{ 
          role: 'user', 
          content: analysisPrompt 
        }]
      })
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error('Claude API Error:', errorText);
      throw new Error(`Claude API failed: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    
    // Parse Claude's response (handle potential JSON issues)
    let analysis;
    try {
      const responseText = claudeData.content[0].text;
      
      // Look for JSON in the response (Claude sometimes adds explanation before/after JSON)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : responseText;
      
      analysis = JSON.parse(jsonText);
      
      // Validate the analysis structure
      if (!analysis.overallScore || !analysis.suggestions || !analysis.keyFindings) {
        throw new Error('Invalid analysis structure from Claude');
      }
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Claude response:', claudeData.content[0].text);
      
      // Use fallback analysis if parsing fails
      analysis = generateFallbackAnalysis(resumeContent, jobDescription);
    }

    // Log successful API usage (for monitoring)
    console.log(`Resume analysis completed - Score: ${analysis.overallScore}%`);

    // Return successful response
    return res.status(200).json({
      success: true,
      analysis: analysis,
      timestamp: new Date().toISOString(),
      tokensUsed: claudeData.usage || 'unknown'
    });

  } catch (error) {
    console.error('Resume analysis error:', error);
    
    // Return fallback analysis instead of error (better UX)
    const fallbackAnalysis = generateFallbackAnalysis(
      req.body.resumeContent, 
      req.body.jobDescription
    );
    
    return res.status(200).json({
      success: true,
      analysis: fallbackAnalysis,
      fallback: true,
      error: 'Using backup analysis due to AI service issue',
      timestamp: new Date().toISOString()
    });
  }
}

// Create the comprehensive analysis prompt for Claude
function createAnalysisPrompt(resumeData, jobDesc, preferences = {}) {
  return `You are an elite resume writer and career strategist with 20+ years of experience helping professionals at all levels land their dream jobs. You've successfully optimized resumes for Fortune 500 companies, startups, and everything in between.

ANALYSIS CONTEXT:
===================
ORIGINAL RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

TARGET JOB DESCRIPTION:
${jobDesc}

USER CONTEXT:
- Industry: ${preferences.industry || 'Not specified'}
- Career Level: ${preferences.careerLevel || 'Not specified'}
- Target Role: ${preferences.targetRole || 'Not specified'}
- Style Preference: ${preferences.stylePreference || 'professional'}
- Special Requirements: ${preferences.specialRequirements || 'None specified'}

ANALYSIS MISSION:
===================
Provide a comprehensive, actionable analysis that will genuinely help this person land interviews. Be specific, creative, and focus on high-impact improvements.

RETURN EXACTLY THIS JSON STRUCTURE (no additional text):
{
  "overallScore": number (0-100 realistic assessment),
  "keyFindings": {
    "matchingSkills": [
      "skill that appears in both resume and job description",
      "another matching skill",
      "third matching skill",
      "fourth matching skill", 
      "fifth matching skill"
    ],
    "missingSkills": [
      "critical skill mentioned in job but missing from resume",
      "important skill gap",
      "another missing requirement",
      "additional skill needed",
      "final missing skill"
    ],
    "strengthAreas": [
      "area where candidate is strong",
      "another strength area",
      "third strength"
    ],
    "improvementAreas": [
      "area needing improvement",
      "another improvement area", 
      "third area to enhance"
    ]
  },
  "suggestions": [
    {
      "type": "critical",
      "category": "keywords",
      "title": "Add Critical Missing Keywords",
      "description": "Specific explanation of why this matters for ATS and hiring managers",
      "impact": "High",
      "specificExample": "Current text from their resume that needs improvement",
      "improvedVersion": "Enhanced version with keywords and metrics"
    },
    {
      "type": "improvement",
      "category": "experience", 
      "title": "Quantify Your Achievements",
      "description": "Add specific numbers and metrics to demonstrate impact",
      "impact": "High",
      "specificExample": "Another piece of current text",
      "improvedVersion": "Improved version with quantified results"
    },
    {
      "type": "enhancement",
      "category": "summary",
      "title": "Optimize Professional Summary", 
      "description": "Tailor summary to directly address job requirements",
      "impact": "Medium",
      "specificExample": "Current summary text",
      "improvedVersion": "Enhanced summary targeting this specific role"
    }
  ],
  "industryInsights": {
    "trendingSkills": [
      "hot skill in this industry",
      "emerging technology/method",
      "in-demand capability",
      "trending competency"
    ],
    "industryKeywords": [
      "keyword commonly used in this field",
      "important industry term",
      "relevant technical term",
      "field-specific language"
    ],
    "salaryInsights": "Brief market insight about salary ranges for this role in current market",
    "careerPathSuggestions": [
      "logical next career step",
      "alternative career path",
      "stretch goal position"
    ]
  },
  "atsOptimization": {
    "score": number (0-100),
    "issues": [
      "specific ATS issue found",
      "another parsing problem",
      "formatting concern"
    ],
    "recommendations": [
      "specific recommendation to improve ATS compatibility",
      "another ATS improvement",
      "final ATS suggestion"
    ]
  }
}

Focus on actionable, specific improvements. Provide 4-6 high-impact suggestions that will genuinely improve their chances of landing interviews.`;
}

// Generate intelligent fallback analysis
function generateFallbackAnalysis(resumeData, jobDescription) {
  // Extract basic keywords from job description
  const jobWords = jobDescription.toLowerCase().split(/\W+/).filter(word => word.length > 3);
  const topKeywords = [...new Set(jobWords)].slice(0, 10);
  
  // Extract skills from resume
  const resumeSkills = resumeData.skills || [];
  const resumeText = JSON.stringify(resumeData).toLowerCase();
  
  // Find matches
  const matchingSkills = topKeywords.filter(keyword => 
    resumeSkills.some(skill => skill.toLowerCase().includes(keyword)) ||
    resumeText.includes(keyword)
  ).slice(0, 5);
  
  const missingSkills = topKeywords.filter(keyword => 
    !matchingSkills.includes(keyword)
  ).slice(0, 5);

  return {
    overallScore: Math.max(40, Math.min(85, Math.round((matchingSkills.length / topKeywords.length) * 100))),
    keyFindings: {
      matchingSkills: matchingSkills.length > 0 ? matchingSkills : ["communication", "teamwork", "problem solving"],
      missingSkills: missingSkills.length > 0 ? missingSkills : ["data analysis", "project management", "leadership"],
      strengthAreas: ["relevant experience", "educational background", "core competencies"],
      improvementAreas: ["quantified achievements", "industry keywords", "technical skills"]
    },
    suggestions: [
      {
        type: "critical",
        category: "keywords",
        title: "Add Job-Specific Keywords",
        description: "Include key terms from the job description to improve ATS compatibility and show relevance",
        impact: "High",
        specificExample: "Managed daily operations",
        improvedVersion: "Managed daily operations using industry-standard processes, improving efficiency by 25%"
      },
      {
        type: "improvement",
        category: "experience",
        title: "Quantify Your Impact",
        description: "Add specific numbers, percentages, and metrics to make your achievements more compelling",
        impact: "High", 
        specificExample: "Improved team performance",
        improvedVersion: "Improved team performance by 30%, leading to $50K annual cost savings"
      },
      {
        type: "enhancement",
        category: "summary",
        title: "Tailor Professional Summary",
        description: "Customize your summary to directly address the specific job requirements and company needs",
        impact: "Medium",
        specificExample: "Experienced professional with strong background",
        improvedVersion: "Results-driven professional with proven expertise in [job-specific skills], delivering measurable impact in [relevant industry]"
      }
    ],
    industryInsights: {
      trendingSkills: ["artificial intelligence", "data analysis", "remote collaboration", "digital transformation"],
      industryKeywords: ["innovation", "strategic planning", "cross-functional", "stakeholder management"],
      salaryInsights: "Based on current market trends, this role typically offers competitive compensation with growth potential",
      careerPathSuggestions: ["senior specialist role", "team leadership position", "strategic management role"]
    },
    atsOptimization: {
      score: 72,
      issues: ["Limited keyword density", "Could use stronger action verbs", "Missing industry-specific terms"],
      recommendations: ["Increase relevant keyword usage", "Use impactful action verbs", "Add industry terminology"]
    }
  };
}
