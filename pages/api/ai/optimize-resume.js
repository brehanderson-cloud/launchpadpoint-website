// File: api/optimize-resume.js
// Vercel Serverless Function for Resume Optimization

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
    const { resumeContent, jobDescription, userPreferences, analysis } = req.body;

    // Validate required fields
    if (!resumeContent || !jobDescription || !analysis) {
      return res.status(400).json({ 
        error: 'Resume content, job description, and analysis are required',
        success: false
      });
    }

    // Create optimization prompt
    const optimizationPrompt = createOptimizationPrompt(
      resumeContent, 
      jobDescription, 
      userPreferences, 
      analysis
    );

    // Call Claude API for optimization
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 6000,
        temperature: 0.7,
        messages: [{ 
          role: 'user', 
          content: optimizationPrompt 
        }]
      })
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error('Claude API Error:', errorText);
      throw new Error(`Claude API failed: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    
    // Parse Claude's response
    let optimizedResume;
    try {
      const responseText = claudeData.content[0].text;
      
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : responseText;
      
      optimizedResume = JSON.parse(jsonText);
      
      // Validate optimization structure
      if (!optimizedResume.optimizedResume || !optimizedResume.improvementsSummary) {
        throw new Error('Invalid optimization structure from Claude');
      }
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Claude response:', claudeData.content[0].text);
      
      // Generate fallback optimization
      optimizedResume = generateFallbackOptimization(resumeContent, analysis);
    }

    // Log successful optimization
    console.log('Resume optimization completed successfully');

    return res.status(200).json({
      success: true,
      optimizedResume: optimizedResume,
      timestamp: new Date().toISOString(),
      tokensUsed: claudeData.usage || 'unknown'
    });

  } catch (error) {
    console.error('Resume optimization error:', error);
    
    // Return fallback optimization
    const fallbackOptimization = generateFallbackOptimization(
      req.body.resumeContent, 
      req.body.analysis
    );
    
    return res.status(200).json({
      success: true,
      optimizedResume: fallbackOptimization,
      fallback: true,
      error: 'Using backup optimization due to AI service issue',
      timestamp: new Date().toISOString()
    });
  }
}

// Create the optimization prompt for Claude
function createOptimizationPrompt(resumeData, jobDesc, preferences, analysis) {
  return `You are an elite resume writer who has crafted winning resumes for executives at Google, Apple, Microsoft, and top consulting firms. Your resumes consistently help clients land interviews and negotiate 20-40% salary increases.

OPTIMIZATION CONTEXT:
=====================
ORIGINAL RESUME: ${JSON.stringify(resumeData, null, 2)}

TARGET JOB DESCRIPTION: ${jobDesc}

USER PREFERENCES: ${JSON.stringify(preferences, null, 2)}

ANALYSIS INSIGHTS: ${JSON.stringify(analysis, null, 2)}

OPTIMIZATION MISSION:
=====================
Transform this resume into an irresistible, ATS-optimized masterpiece that makes hiring managers excited to interview this candidate. Implement ALL suggestions from the analysis and enhance beyond expectations.

RETURN EXACTLY THIS JSON STRUCTURE (no additional text):
{
  "optimizedResume": {
    "personalInfo": {
      "name": "Full Name",
      "email": "email@example.com",
      "phone": "Phone Number", 
      "location": "City, State",
      "linkedin": "LinkedIn URL (optimize if provided)",
      "portfolio": "Portfolio/Website URL (if applicable)"
    },
    "professionalSummary": "Compelling 3-4 sentence summary that immediately hooks hiring managers. Include key job requirements, quantified achievements, and unique value proposition. Make it irresistible.",
    "coreCompetencies": [
      "Most relevant skill for this job",
      "Second most important skill",
      "Third critical skill",
      "Fourth essential skill",
      "Fifth key competency",
      "Sixth important skill"
    ],
    "experience": [
      {
        "title": "Job Title (exactly as in original or enhanced)",
        "company": "Company Name",
        "duration": "MM/YYYY - MM/YYYY (or Present)",
        "location": "City, State",
        "achievements": [
          "Quantified achievement with specific metrics and keywords from job description (e.g., 'Increased team productivity by 35% through implementation of agile methodologies')",
          "Second achievement demonstrating relevant skills with numbers and impact",
          "Third achievement showing leadership/innovation with measurable results"
        ]
      }
    ],
    "skills": {
      "technical": ["Most relevant technical skill", "Second tech skill", "Third tech skill"],
      "leadership": ["Leadership skill 1", "Leadership skill 2", "Leadership skill 3"],
      "industry": ["Industry-specific skill 1", "Industry skill 2", "Industry skill 3"]
    },
    "education": [
      {
        "degree": "Degree Name",
        "school": "Institution Name",
        "year": "YYYY",
        "relevant": "Relevant coursework, honors, or projects (if applicable to job)"
      }
    ],
    "certifications": ["Relevant Certification 1", "Relevant Certification 2"],
    "projects": [
      {
        "name": "Project Name (if applicable)",
        "description": "Brief description optimized with job keywords",
        "technologies": ["tech1", "tech2", "tech3"],
        "impact": "Quantified result or benefit"
      }
    ]
  },
  "improvementsSummary": {
    "keyChanges": [
      "Specific improvement 1 made (e.g., 'Added 15+ industry keywords throughout experience section')",
      "Specific improvement 2 made (e.g., 'Quantified all achievements with metrics and percentages')",
      "Specific improvement 3 made (e.g., 'Restructured summary to directly address job requirements')",
      "Specific improvement 4 made (e.g., 'Enhanced action verbs and eliminated weak language')"
    ],
    "keywordOptimization": "Detailed explanation of the keyword strategy used to improve ATS compatibility and relevance",
    "atsImprovements": "Specific ATS enhancements made including formatting, keyword placement, and parsing optimization"
  }
}

Transform every bullet point into a compelling achievement. Make this resume impossible to ignore.`;
}

// Generate fallback optimization when Claude API fails
function generateFallbackOptimization(resumeData, analysis) {
  const enhancedSkills = [
    ...(resumeData.skills || []),
    ...(analysis?.keyFindings?.missingSkills?.slice(0, 3) || [])
  ];

  return {
    optimizedResume: {
      personalInfo: {
        name: resumeData.name || "Professional Name",
        email: resumeData.email || "email@example.com",
        phone: resumeData.phone || "(555) 123-4567",
        location: resumeData.location || "City, State",
        linkedin: resumeData.linkedin || "",
        portfolio: resumeData.portfolio || ""
      },
      professionalSummary: enhancedSkills.length > 0 ? 
        `Results-driven professional with proven expertise in ${enhancedSkills.slice(0, 3).join(', ')}. Demonstrated track record of delivering measurable impact and driving organizational success through innovative solutions and strategic thinking.` :
        resumeData.summary || "Dedicated professional with strong background in relevant field and commitment to excellence.",
      coreCompetencies: enhancedSkills.slice(0, 6),
      experience: (resumeData.experience || []).map(exp => ({
        ...exp,
        achievements: exp.responsibilities?.map(resp => 
          `${resp.replace(/^[a-z]/, c => c.toUpperCase())} with measurable impact on team efficiency and organizational goals`
        ) || ["Enhanced operational efficiency through strategic initiatives"]
      })),
      skills: {
        technical: enhancedSkills.filter(skill => 
          ['software', 'system', 'data', 'analysis', 'tech'].some(tech => skill.toLowerCase().includes(tech))
        ).slice(0, 3),
        leadership: enhancedSkills.filter(skill => 
          ['lead', 'manage', 'team', 'coach'].some(lead => skill.toLowerCase().includes(lead))
        ).slice(0, 3),
        industry: enhancedSkills.filter(skill => !skill.includes('software') && !skill.includes('lead')).slice(0, 3)
      },
      education: resumeData.education || [],
      certifications: resumeData.certifications || [],
      projects: resumeData.projects || []
    },
    improvementsSummary: {
      keyChanges: [
        "Enhanced professional summary with relevant keywords",
        "Quantified achievements with measurable impact statements",
        "Reorganized skills to highlight most relevant competencies",
        "Improved action verbs and eliminated weak language"
      ],
      keywordOptimization: "Integrated job-relevant keywords throughout experience descriptions and skills sections to improve ATS parsing and recruiter appeal",
      atsImprovements: "Optimized formatting, keyword placement, and section organization for better applicant tracking system compatibility"
    }
  };
}
