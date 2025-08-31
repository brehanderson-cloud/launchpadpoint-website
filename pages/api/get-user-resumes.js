// File: api/get-user-resumes.js
// Retrieve all saved resumes for a user

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userEmail, limit = 10, offset = 0 } = req.query;

    if (!userEmail) {
      return res.status(400).json({ error: 'User email required' });
    }

    // In production, query your database
    // const resumes = await database.resumes.findByUserEmail(userEmail, { limit, offset });
    
    // Mock saved resumes for demo
    const mockResumes = [
      {
        id: 'resume_1',
        title: 'Software Engineer - TechCorp',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        analysisResults: {
          overallScore: 85,
          atsScore: 90,
          improvementsCount: 6,
          appliedSuggestionsCount: 4
        },
        jobContext: {
          targetRole: 'Senior Software Engineer',
          targetCompany: 'TechCorp Solutions',
          industry: 'technology'
        },
        status: 'completed',
        downloadCount: 3,
        lastDownloaded: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
      },
      {
        id: 'resume_2',
        title: 'Product Manager - StartupXYZ', 
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        analysisResults: {
          overallScore: 78,
          atsScore: 82,
          improvementsCount: 5,
          appliedSuggestionsCount: 3
        },
        jobContext: {
          targetRole: 'Product Manager',
          targetCompany: 'StartupXYZ',
          industry: 'technology'
        },
        status: 'completed',
        downloadCount: 1,
        lastDownloaded: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'resume_3',
        title: 'Marketing Manager - RetailCorp',
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        updatedAt: new Date(Date.now() - 259200000).toISOString(),
        analysisResults: {
          overallScore: 72,
          atsScore: 75,
          improvementsCount: 8,
          appliedSuggestionsCount: 2
        },
        jobContext: {
          targetRole: 'Marketing Manager',
          targetCompany: 'RetailCorp',
          industry: 'marketing'
        },
        status: 'draft',
        downloadCount: 0,
        lastDownloaded: null
      }
    ];

    // Filter and paginate
    const filteredResumes = mockResumes.slice(offset, offset + limit);
    
    // Calculate summary statistics
    const summaryStats = {
      totalResumes: mockResumes.length,
      averageScore: Math.round(
        mockResumes.reduce((sum, resume) => sum + resume.analysisResults.overallScore, 0) / 
        mockResumes.length
      ),
      totalDownloads: mockResumes.reduce((sum, resume) => sum + resume.downloadCount, 0),
      completedResumes: mockResumes.filter(r => r.status === 'completed').length,
      draftResumes: mockResumes.filter(r => r.status === 'draft').length
    };

    return res.status(200).json({
      success: true,
      resumes: filteredResumes,
      pagination: {
        total: mockResumes.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (offset + limit) < mockResumes.length
      },
      summary: summaryStats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get resumes error:', error);
    return res.status(500).json({
      error: 'Failed to retrieve resumes',
      details: error.message
    });
  }
}

function extractCompanyFromJobDesc(jobDesc) {
  if (!jobDesc) return 'Unknown Company';
  
  const patterns = [
    /(?:at|join)\s+([A-Z][a-zA-Z\s&,.-]+?)(?:\s+(?:we|is|are|as|team))/i,
    /([A-Z][a-zA-Z\s&,.-]+?)(?:\s+is\s+(?:looking|seeking))/i,
    /([A-Z][a-zA-Z\s&,.-]+?)(?:\s+seeks)/i
  ];
  
  for (const pattern of patterns) {
    const match = jobDesc.match(pattern);
    if (match && match[1] && match[1].length < 50) {
      return match[1].trim();
    }
  }
  
  return 'Target Company';
}

function extractRoleFromJobDesc(jobDesc) {
  if (!jobDesc) return 'Target Position';
  
  const firstLine = jobDesc.split('\n')[0];
  if (firstLine && firstLine.length < 100) {
    return firstLine.trim();
  }
  
  return 'Target Position';
}
