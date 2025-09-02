// /api/ai/parse-resume.js
import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';

// Configure for Vercel
export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

export default async function handler(req, res) {
  console.log(`🔍 PARSE-RESUME: ${req.method} ${req.url || 'unknown'} - Headers:`, req.headers);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log(`🔍 PARSE-RESUME: OPTIONS request handled`);
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`❌ PARSE-RESUME: Method ${req.method} not allowed - returning 405`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log(`🔍 PARSE-RESUME: Processing file upload`);
    
    // Validate environment
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log(`❌ PARSE-RESUME: ANTHROPIC_API_KEY not configured`);
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    // Parse the multipart form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      filter: ({ mimetype }) => mimetype && mimetype.includes('pdf'),
    });

    const [fields, files] = await form.parse(req);
    
    // Get the uploaded file
    const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;
    
    if (!resumeFile) {
      console.log(`❌ PARSE-RESUME: No resume file uploaded`);
      return res.status(400).json({ 
        error: 'No resume file uploaded',
        success: false
      });
    }

    console.log(`🔍 PARSE-RESUME: Processing file ${resumeFile.originalFilename}`);

    // Read and parse the PDF
    const fileBuffer = fs.readFileSync(resumeFile.filepath);
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 100) {
      console.log(`❌ PARSE-RESUME: Could not extract readable text from PDF`);
      return res.status(400).json({
        error: 'Could not extract readable text from PDF. Please ensure your resume contains selectable text.',
        success: false
      });
    }

    // Use Claude to extract structured data from raw text
    const structuringPrompt = createStructuringPrompt(resumeText);

    console.log(`🔍 PARSE-RESUME: Calling Claude API for text structuring`);
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 3000,
        temperature: 0.3, // Lower temperature for accurate extraction
        messages: [{ 
          role: 'user', 
          content: structuringPrompt 
        }]
      })
    });

    if (!claudeResponse.ok) {
      console.error('❌ PARSE-RESUME: Claude API Error:', await claudeResponse.text());
      throw new Error(`Claude API failed: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    
    // Parse structured resume data
    let structuredData;
    try {
      const responseText = claudeData.content[0].text;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : responseText;
      
      structuredData = JSON.parse(jsonText);
      
      // Validate required fields
      if (!structuredData.personalInfo || !structuredData.personalInfo.name) {
        throw new Error('Could not extract personal information from resume');
      }
      
    } catch (parseError) {
      console.error('❌ PARSE-RESUME: JSON parsing error:', parseError);
      
      // Generate fallback structured data
      structuredData = generateFallbackStructuredData(resumeText);
    }

    // Clean up temporary file
    try {
      fs.unlinkSync(resumeFile.filepath);
    } catch (cleanupError) {
      console.warn('Could not clean up temporary file:', cleanupError);
    }

    console.log(`✅ PARSE-RESUME: Successfully parsed resume for ${structuredData.personalInfo.name}`);

    return res.status(200).json({
      success: true,
      resumeData: structuredData,
      rawText: resumeText.substring(0, 1000), // First 1000 chars for debugging
      metadata: {
        fileSize: resumeFile.size,
        fileName: resumeFile.originalFilename,
        pageCount: pdfData.numpages,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ PARSE-RESUME: Error:', error);
    
    return res.status(500).json({ 
      error: 'Failed to parse resume',
      details: error.message,
      success: false
    });
  }
}

// Create prompt for Claude to structure raw resume text
function createStructuringPrompt(resumeText) {
  return `You are an expert at extracting structured data from resume text. Extract information from this resume and return it as valid JSON.

RESUME TEXT:
${resumeText}

Extract the information exactly as it appears in the resume. Don't add information that isn't there, but do clean up formatting and organization.

RETURN EXACTLY THIS JSON STRUCTURE (no additional text):
{
  "personalInfo": {
    "name": "Full Name (exactly as written)",
    "email": "email@example.com (if found)",
    "phone": "phone number (if found)",
    "location": "city, state (if found)",
    "linkedin": "linkedin URL (if found)",
    "website": "website URL (if found)"
  },
  "summary": "Professional summary or objective statement (if present)",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Start Date - End Date (extract exact format used)",
      "location": "Location (if provided)",
      "responsibilities": [
        "First responsibility or achievement",
        "Second responsibility or achievement", 
        "Third responsibility or achievement"
      ]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "school": "School/University Name",
      "year": "Graduation Year",
      "details": "Additional details like GPA, honors, relevant coursework (if mentioned)"
    }
  ],
  "skills": [
    "skill1",
    "skill2", 
    "skill3"
  ],
  "certifications": [
    "Certification 1",
    "Certification 2"
  ],
  "projects": [
    {
      "name": "Project Name (if any projects mentioned)",
      "description": "Project description",
      "technologies": ["tech1", "tech2"]
    }
  ],
  "languages": ["Language 1", "Language 2"],
  "achievements": [
    "Notable achievement 1",
    "Notable achievement 2"
  ]
}

If a section is not present in the resume, return an empty array [] or empty string "". Extract exactly what's written without adding or inferring information.`;
}

// Generate fallback structured data when Claude fails
function generateFallbackStructuredData(resumeText) {
  // Basic text parsing fallback
  const lines = resumeText.split('\n').filter(line => line.trim().length > 0);
  
  // Try to extract name (usually first few lines)
  const nameCandidate = lines.slice(0, 5).find(line => 
    line.length < 50 && 
    line.includes(' ') && 
    !line.includes('@') && 
    !line.includes('http') &&
    /^[A-Za-z\s]+$/.test(line.trim())
  );

  // Extract email
  const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  
  // Extract phone
  const phoneMatch = resumeText.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
  
  // Extract LinkedIn
  const linkedinMatch = resumeText.match(/(linkedin\.com\/in\/[a-zA-Z0-9-]+)/);

  // Basic skills extraction (look for common skill keywords)
  const skillKeywords = ['javascript', 'python', 'react', 'node', 'sql', 'aws', 'git', 'docker', 'kubernetes', 'agile', 'scrum', 'leadership', 'management', 'communication', 'analysis', 'marketing', 'sales', 'design', 'research'];
  const foundSkills = skillKeywords.filter(skill => 
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );

  return {
    personalInfo: {
      name: nameCandidate || "Name Not Found",
      email: emailMatch ? emailMatch[0] : "",
      phone: phoneMatch ? phoneMatch[0] : "",
      location: "",
      linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : "",
      website: ""
    },
    summary: "Professional summary extracted from uploaded resume",
    experience: [
      {
        title: "Position extracted from resume",
        company: "Company extracted from resume", 
        duration: "Duration extracted from resume",
        location: "",
        responsibilities: [
          "Responsibility extracted from resume text",
          "Additional responsibility from resume",
          "Further details from uploaded document"
        ]
      }
    ],
    education: [
      {
        degree: "Degree information from resume",
        school: "Educational institution from resume",
        year: "Year from resume",
        details: ""
      }
    ],
    skills: foundSkills.length > 0 ? foundSkills : ["skills", "extracted", "from", "resume"],
    certifications: [],
    projects: [],
    languages: [],
    achievements: []
  };
}
