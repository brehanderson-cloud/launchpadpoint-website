
// File: api/generate-cover-letter.js
// Complete AI-powered cover letter generation

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
    // Validate environment
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const { 
      optimizedResume, 
      jobDescription, 
      companyName = '',
      hiringManagerName = '',
      userPreferences = {}
    } = req.body;

    if (!optimizedResume || !jobDescription) {
      return res.status(400).json({ 
        error: 'Optimized resume and job description are required' 
      });
    }

    // Create cover letter prompt for Claude
    const coverLetterPrompt = createCoverLetterPrompt(
      optimizedResume, 
      jobDescription, 
      companyName, 
      hiringManagerName,
      userPreferences
    );

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
        max_tokens: 2000,
        temperature: 0.7,
        messages: [{ 
          role: 'user', 
          content: coverLetterPrompt 
        }]
      })
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error('Claude API Error:', errorText);
      throw new Error(`Claude API failed: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    const coverLetter = claudeData.content[0].text;

    // Clean up the cover letter (remove any JSON formatting if present)
    const cleanCoverLetter = coverLetter
      .replace(/```/g, '')
      .replace(/^```[\w]*\n?/gm, '')
      .replace(/\n```$/gm, '')
      .trim();

    console.log('Cover letter generated successfully');

    return res.status(200).json({
      success: true,
      coverLetter: cleanCoverLetter,
      timestamp: new Date().toISOString(),
      tokensUsed: claudeData.usage || 'unknown'
    });

  } catch (error) {
    console.error('Cover letter generation error:', error);
    
    // Return fallback cover letter
    const fallbackCoverLetter = generateFallbackCoverLetter(
      req.body.optimizedResume, 
      req.body.jobDescription, 
      req.body.companyName
    );
    
    return res.status(200).json({
      success: true,
      coverLetter: fallbackCoverLetter,
      fallback: true,
      error: 'Using backup cover letter due to AI service issue',
      timestamp: new Date().toISOString()
    });
  }
}

function createCoverLetterPrompt(resume, jobDescription, companyName, hiringManagerName, preferences) {
  const resumeData = resume.optimizedResume || resume;
  
  return `You are an expert cover letter writer who has helped thousands of professionals land their dream jobs at top companies. Write a compelling, personalized cover letter that makes the hiring manager excited to interview this candidate.

CONTEXT:
========
CANDIDATE'S OPTIMIZED RESUME:
${JSON.stringify(resumeData, null, 2)}

TARGET JOB DESCRIPTION:
${jobDescription}

COMPANY INFORMATION:
- Company Name: ${companyName || 'the company'}
- Hiring Manager: ${hiringManagerName || 'Hiring Manager'}
- Industry: ${preferences.industry || 'Not specified'}
- Career Level: ${preferences.careerLevel || 'Not specified'}

COVER LETTER REQUIREMENTS:
==========================
1. Professional yet engaging tone that matches the company culture
2. Highlight 2-3 most relevant achievements from the resume with specific metrics
3. Show clear understanding of the role requirements and company needs
4. Include relevant keywords from the job description naturally
5. Demonstrate genuine enthusiasm for the specific role and company
6. End with a confident call to action
7. Keep to 3-4 paragraphs, approximately 300-400 words
8. Avoid generic phrases and clichés

WRITING STRATEGY:
================
- Opening: Hook that connects candidate's strongest achievement to company needs
- Body: 2 paragraphs highlighting relevant experience and quantified results
- Closing: Enthusiastic statement about contributing to company success + call to action

Write a cover letter that:
- Opens with a compelling hook that grabs attention
- Demonstrates clear value proposition with specific examples
- Shows research and knowledge about the company/role
- Includes natural integration of job description keywords
- Ends with confidence and clear next steps
- Sounds authentic and personalized, not template-like

Return ONLY the cover letter text. No additional formatting, explanations, or JSON structure.`;
}

function generateFallbackCoverLetter(resume, jobDescription, companyName) {
  const resumeData = resume.optimizedResume || resume;
  const name = resumeData.personalInfo?.name || 'Your Name';
  const company = companyName || 'your organization';
  const currentTitle = resumeData.experience?.[0]?.title || 'Professional';
  const topSkills = resumeData.skills?.technical?.slice(0, 2) || 
                   resumeData.skills?.industry?.slice(0, 2) ||
                   resumeData.coreCompetencies?.slice(0, 2) ||
                   ['relevant expertise', 'professional skills'];
  
  const achievement = resumeData.experience?.[0]?.achievements?.[0] || 
                     'delivered significant improvements to operational efficiency and team performance';

  return `Dear Hiring Manager,

I am writing to express my strong interest in joining ${company} in the capacity described in your recent job posting. As a ${currentTitle} with demonstrated expertise in ${topSkills.join(' and ')}, I am excited about the opportunity to contribute to your team's continued success.

In my current role, I
