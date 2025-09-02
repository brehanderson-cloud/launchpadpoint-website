// /api/ai/analyze-resume.js
export default async function handler(req, res) {
    console.log(`🔍 ANALYZE-RESUME: ${req.method} ${req.url || 'unknown'} - Headers:`, req.headers);
    console.log(`🔍 ANALYZE-RESUME Body:`, req.body);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        console.log(`🔍 ANALYZE-RESUME: OPTIONS request handled`);
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        console.log(`❌ ANALYZE-RESUME: Method ${req.method} not allowed - returning 405`);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const resumeData = req.body;

        console.log(`🔍 ANALYZE-RESUME: Processing analysis for job title: ${resumeData.jobTitle || 'unknown'}`);

        // Validate input
        if (!resumeData.jobTitle) {
            console.log(`❌ ANALYZE-RESUME: Missing job title`);
            return res.status(400).json({ 
                error: 'Job title is required for analysis' 
            });
        }

        // Perform comprehensive resume analysis
        const analysis = await analyzeResumeComprehensively(resumeData);

        console.log(`✅ ANALYZE-RESUME: Analysis complete`);
        res.status(200).json({
            success: true,
            analysis,
            metadata: {
                analyzedAt: new Date().toISOString(),
                analysisVersion: '2.0'
            }
        });

    } catch (error) {
        console.error('❌ ANALYZE-RESUME: Error:', error);
        res.status(500).json({ 
            error: 'Failed to analyze resume', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
}

async function analyzeResumeComprehensively(data) {
    const analysis = {
        strengths: [],
        weaknesses: [],
        suggestions: [],
        industryMatch: null,
        experienceLevel: null,
        keywordAnalysis: null,
        completenessScore: 0,
        competitiveAnalysis: null
    };

    // Analyze industry match
    analysis.industryMatch = analyzeIndustryMatch(data.jobTitle, data.skills, data.workExperience);
    
    // Analyze experience level
    analysis.experienceLevel = analyzeExperienceLevel(data.experience, data.workExperience);
    
    // Keyword analysis
    analysis.keywordAnalysis = performKeywordAnalysis(data.jobTitle, data.summary, data.workExperience, data.skills);
    
    // Completeness assessment
    analysis.completenessScore = assessCompleteness(data);
    
    // Identify strengths
    analysis.strengths = identifyStrengths(data, analysis);
    
    // Identify weaknesses
    analysis.weaknesses = identifyWeaknesses(data, analysis);
    
    // Generate suggestions
    analysis.suggestions = generateSuggestions(data, analysis);
    
    // Competitive analysis
    analysis.competitiveAnalysis = performCompetitiveAnalysis(data.jobTitle, analysis);

    return analysis;
}

function analyzeIndustryMatch(jobTitle, skills, workExperience) {
    const industries = {
        'Human Resources': {
            keywords: ['hr', 'human resources', 'talent', 'recruiting', 'onboarding', 'employee relations', 'performance management', 'hris'],
            skills: ['recruiting', 'talent acquisition', 'employee relations', 'performance management', 'hris', 'onboarding', 'compensation']
        },
        'Data & Analytics': {
            keywords: ['data', 'analytics', 'analyst', 'business intelligence', 'sql', 'python', 'tableau', 'statistics'],
            skills: ['sql', 'python', 'excel', 'tableau', 'power bi', 'statistics', 'machine learning', 'data visualization']
        },
        'Software Engineering': {
            keywords: ['software', 'developer', 'engineer', 'programming', 'javascript', 'python', 'react', 'full stack'],
            skills: ['javascript', 'python', 'react', 'node.js', 'git', 'sql', 'aws', 'docker']
        },
        'Marketing': {
            keywords: ['marketing', 'digital marketing', 'social media', 'seo', 'content', 'campaign', 'brand'],
            skills: ['digital marketing', 'google analytics', 'seo', 'social media', 'content marketing', 'email marketing']
        },
        'Project Management': {
            keywords: ['project manager', 'program manager', 'agile', 'scrum', 'pmp', 'project management'],
            skills: ['project management', 'agile', 'scrum', 'jira', 'risk management', 'stakeholder management']
        }
    };

    let bestMatch = { industry: 'General', score: 0, matchedKeywords: [], matchedSkills: [] };
    
    const combinedText = `${jobTitle} ${skills} ${workExperience}`.toLowerCase();
    const skillsArray = skills ? skills.toLowerCase().split(',').map(s => s.trim()) : [];

    for (const [industry, data] of Object.entries(industries)) {
        let score = 0;
        const matchedKeywords = [];
        const matchedSkills = [];

        // Check keyword matches
        data.keywords.forEach(keyword => {
            if (combinedText.includes(keyword)) {
                score += 2;
                matchedKeywords.push(keyword);
            }
        });

        // Check skill matches
        data.skills.forEach(skill => {
            if (skillsArray.some(userSkill => userSkill.includes(skill))) {
                score += 3;
                matchedSkills.push(skill);
            }
        });

        if (score > bestMatch.score) {
            bestMatch = { industry, score, matchedKeywords, matchedSkills };
        }
    }

    return {
        primaryIndustry: bestMatch.industry,
        matchScore: bestMatch.score,
        matchedKeywords: bestMatch.matchedKeywords,
        matchedSkills: bestMatch.matchedSkills,
        confidence: bestMatch.score > 10 ? 'High' : bestMatch.score > 5 ? 'Medium' : 'Low'
    };
}

function analyzeExperienceLevel(experienceRange, workExperience) {
    const analysis = {
        declared: experienceRange,
        estimated: null,
        consistency: null,
        depth: null
    };

    // Estimate from work experience content
    if (workExperience) {
        const jobCount = (workExperience.match(/\d{4}|\d{2}\/\d{4}/g) || []).length / 2; // Rough job count
        const contentLength = workExperience.length;
        
        if (jobCount >= 4 || contentLength > 800) {
            analysis.estimated = '10+';
        } else if (jobCount >= 3 || contentLength > 500) {
            analysis.estimated = '6-10';
        } else if (jobCount >= 2 || contentLength > 200) {
            analysis.estimated = '2-5';
        } else {
            analysis.estimated = '0-1';
        }

        // Check consistency
        analysis.consistency = experienceRange === analysis.estimated ? 'Consistent' : 'Inconsistent';
        
        // Assess depth
        const detailWords = workExperience.match(/\b(achieved|managed|led|developed|implemented|increased|decreased|improved|created|designed|built)\b/gi) || [];
        analysis.depth = detailWords.length > 10 ? 'High' : detailWords.length > 5 ? 'Medium' : 'Low';
    }

    return analysis;
}

function performKeywordAnalysis(jobTitle, summary, workExperience, skills) {
    const roleKeywords = getRoleSpecificKeywords(jobTitle);
    const combinedText = `${summary} ${workExperience} ${skills}`.toLowerCase();
    
    const analysis = {
        roleRelevantKeywords: [],
        missingKeywords: [],
        keywordDensity: 0,
        overusedWords: [],
        suggestions: []
    };

    // Check for role-relevant keywords
    roleKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
        const matches = combinedText.match(regex) || [];
        
        if (matches.length > 0) {
            analysis.roleRelevantKeywords.push({
                keyword,
                frequency: matches.length,
                impact: 'High'
            });
        } else {
            analysis.missingKeywords.push(keyword);
        }
    });

    // Calculate keyword density
    const totalWords = combinedText.split(/\s+/).length;
    const relevantKeywordCount = analysis.roleRelevantKeywords.reduce((sum, k) => sum + k.frequency, 0);
    analysis.keywordDensity = totalWords > 0 ? (relevantKeywordCount / totalWords * 100).toFixed(2) : 0;

    // Check for overused words
    const wordCount = {};
    combinedText.split(/\s+/).forEach(word => {
        if (word.length > 3) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });
    
    analysis.overusedWords = Object.entries(wordCount)
        .filter(([word, count]) => count > 5)
        .map(([word, count]) => ({ word, count }))
        .slice(0, 5);

    // Generate suggestions
    if (analysis.missingKeywords.length > 0) {
        analysis.suggestions.push(`Consider adding these relevant keywords: ${analysis.missingKeywords.slice(0, 5).join(', ')}`);
    }
    
    if (parseFloat(analysis.keywordDensity) < 2) {
        analysis.suggestions.push('Your keyword density is low. Include more role-specific terms naturally in your content.');
    }

    return analysis;
}

function getRoleSpecificKeywords(jobTitle) {
    const keywordMap = {
        'hr': ['talent acquisition', 'employee relations', 'performance management', 'onboarding', 'hris', 'recruiting', 'compensation', 'benefits administration'],
        'data': ['data analysis', 'sql', 'python', 'tableau', 'business intelligence', 'statistical analysis', 'data visualization', 'machine learning'],
        'software': ['javascript', 'python', 'react', 'node.js', 'git', 'agile', 'full stack', 'api development'],
        'marketing': ['digital marketing', 'seo', 'social media', 'content marketing', 'google analytics', 'campaign management', 'brand strategy'],
        'project': ['project management', 'agile', 'scrum', 'stakeholder management', 'risk management', 'budget management', 'team leadership']
    };

    const jobLower = jobTitle.toLowerCase();
    for (const [category, keywords] of Object.entries(keywordMap)) {
        if (jobLower.includes(category)) {
            return keywords;
        }
    }

    return ['leadership', 'communication', 'problem solving', 'team collaboration', 'project management'];
}

function assessCompleteness(data) {
    let score = 0;
    const maxScore = 100;

    // Contact information (25 points)
    if (data.fullName) score += 5;
    if (data.email) score += 5;
    if (data.phone) score += 5;
    if (data.location) score += 5;
    if (data.jobTitle) score += 5;

    // Content sections (60 points)
    if (data.summary && data.summary.length >= 100) score += 15;
    else if (data.summary && data.summary.length >= 50) score += 10;
    else if (data.summary) score += 5;

    if (data.workExperience && data.workExperience.length >= 300) score += 20;
    else if (data.workExperience && data.workExperience.length >= 150) score += 15;
    else if (data.workExperience && data.workExperience.length >= 50) score += 10;
    else if (data.workExperience) score += 5;

    if (data.education && data.education.length >= 50) score += 10;
    else if (data.education) score += 5;

    if (data.skills) {
        const skillCount = data.skills.split(',').length;
        if (skillCount >= 8) score += 15;
        else if (skillCount >= 5) score += 10;
        else if (skillCount >= 3) score += 5;
    }

    // Experience alignment (15 points)
    if (data.experience) score += 15;

    return Math.min(score, maxScore);
}

function identifyStrengths(data, analysis) {
    const strengths = [];

    if (analysis.completenessScore >= 80) {
        strengths.push('Comprehensive resume with all key sections completed');
    }

    if (analysis.industryMatch.confidence === 'High') {
        strengths.push(`Strong alignment with ${analysis.industryMatch.primaryIndustry} industry requirements`);
    }

    if (analysis.keywordAnalysis.roleRelevantKeywords.length >= 5) {
        strengths.push('Good use of role-relevant keywords');
    }

    if (data.workExperience && data.workExperience.length > 400) {
        strengths.push('Detailed work experience section');
    }

    if (data.skills && data.skills.split(',').length >= 8) {
        strengths.push('Comprehensive skills section');
    }

    if (analysis.experienceLevel.consistency === 'Consistent') {
        strengths.push('Experience level matches work history');
    }

    return strengths;
}

function identifyWeaknesses(data, analysis) {
    const weaknesses = [];

    if (analysis.completenessScore < 60) {
        weaknesses.push('Resume appears incomplete - several sections need more detail');
    }

    if (analysis.industryMatch.confidence === 'Low') {
        weaknesses.push('Limited industry-specific content and keywords');
    }

    if (analysis.keywordAnalysis.missingKeywords.length > 5) {
        weaknesses.push('Missing important role-specific keywords');
    }

    if (!data.summary || data.summary.length < 50) {
        weaknesses.push('Professional summary is missing or too brief');
    }

    if (!data.workExperience || data.workExperience.length < 100) {
        weaknesses.push('Work experience section needs more detail');
    }

    if (!data.skills || data.skills.split(',').length < 5) {
        weaknesses.push('Skills section needs expansion');
    }

    if (analysis.experienceLevel.consistency === 'Inconsistent') {
        weaknesses.push('Declared experience level doesn\'t match work history detail');
    }

    return weaknesses;
}

function generateSuggestions(data, analysis) {
    const suggestions = [];

    // Completeness suggestions
    if (analysis.completenessScore < 80) {
        if (!data.summary || data.summary.length < 100) {
            suggestions.push('Add a compelling professional summary (2-3 sentences) highlighting your key strengths');
        }
        if (!data.workExperience || data.workExperience.length < 200) {
            suggestions.push('Expand work experience with specific achievements and quantifiable results');
        }
        if (!data.skills || data.skills.split(',').length < 6) {
            suggestions.push('Add more relevant skills to match job requirements');
        }
    }

    // Industry-specific suggestions
    if (analysis.industryMatch.confidence !== 'High') {
        suggestions.push(`Include more ${analysis.industryMatch.primaryIndustry}-specific keywords and terminology`);
    }

    // Keyword optimization suggestions
    if (analysis.keywordAnalysis.missingKeywords.length > 0) {
        suggestions.push(`Consider adding these relevant keywords: ${analysis.keywordAnalysis.missingKeywords.slice(0, 3).join(', ')}`);
    }

    // Experience-specific suggestions
    if (analysis.experienceLevel.depth === 'Low') {
        suggestions.push('Use more action verbs and include quantifiable achievements in your work experience');
    }

    // ATS optimization suggestions
    if (parseFloat(analysis.keywordAnalysis.keywordDensity) < 2) {
        suggestions.push('Increase keyword density by naturally incorporating role-relevant terms throughout your resume');
    }

    // Contact information suggestions
    if (!data.phone) {
        suggestions.push('Consider adding a phone number for easier recruiter contact');
    }
    if (!data.location) {
        suggestions.push('Adding your city and state can help with location-specific job searches');
    }

    return suggestions;
}

function performCompetitiveAnalysis(jobTitle, analysis) {
    // This would typically involve comparing against a database of similar resumes
    // For now, we'll provide benchmark-based analysis
    
    const competitiveAnalysis = {
        marketPosition: 'Average',
        standoutFactors: [],
        improvementAreas: [],
        benchmarkComparison: {}
    };

    // Determine market position based on completeness and keyword alignment
    if (analysis.completenessScore >= 85 && analysis.industryMatch.confidence === 'High') {
        competitiveAnalysis.marketPosition = 'Strong';
    } else if (analysis.completenessScore >= 70 && analysis.industryMatch.confidence !== 'Low') {
        competitiveAnalysis.marketPosition = 'Above Average';
    } else if (analysis.completenessScore < 50) {
        competitiveAnalysis.marketPosition = 'Needs Improvement';
    }

    // Identify standout factors
    if (analysis.keywordAnalysis.roleRelevantKeywords.length >= 8) {
        competitiveAnalysis.standoutFactors.push('Strong keyword optimization');
    }
    if (analysis.experienceLevel.depth === 'High') {
        competitiveAnalysis.standoutFactors.push('Detailed achievement-focused experience');
    }
    if (analysis.industryMatch.matchScore > 15) {
        competitiveAnalysis.standoutFactors.push('Excellent industry alignment');
    }

    // Identify improvement areas
    if (analysis.completenessScore < 75) {
        competitiveAnalysis.improvementAreas.push('Resume completeness');
    }
    if (analysis.keywordAnalysis.missingKeywords.length > 3) {
        competitiveAnalysis.improvementAreas.push('Keyword optimization');
    }
    if (analysis.industryMatch.confidence === 'Low') {
        competitiveAnalysis.improvementAreas.push('Industry-specific content');
    }

    // Benchmark comparison (simulated data)
    competitiveAnalysis.benchmarkComparison = {
        completeness: {
            yourScore: analysis.completenessScore,
            marketAverage: 72,
            topPerformers: 88
        },
        keywordAlignment: {
            yourScore: analysis.keywordAnalysis.roleRelevantKeywords.length,
            marketAverage: 6,
            topPerformers: 12
        },
        industryMatch: {
            yourScore: analysis.industryMatch.matchScore,
            marketAverage: 8,
            topPerformers: 15
        }
    };

    return competitiveAnalysis;
        }
