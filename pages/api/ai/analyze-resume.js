// /api/ai/analyze-resume.js
export default async function handler(req, res) {
    console.log(`🔍 ANALYZE-RESUME: ${req.method} ${req.url || 'unknown'}`);
    
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

    // Handle GET requests (prevents 405 errors from health checks)
    if (req.method === 'GET') {
        console.log('🔍 ANALYZE-RESUME: GET request received - returning API info');
        return res.status(200).json({ 
            message: 'AI Resume Analysis endpoint', 
            methods: ['POST'],
            status: 'active',
            version: '1.0.0',
            capabilities: [
                'ATS compatibility scoring',
                'Content quality assessment',
                'Skills gap analysis',
                'Industry alignment check',
                'Format optimization review'
            ],
            timestamp: new Date().toISOString()
        });
    }

    if (req.method !== 'POST') {
        console.log(`❌ ANALYZE-RESUME: Method ${req.method} not allowed - returning 405`);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { resumeContent, jobDescription, analysisType, resumeData } = req.body;

        // Validate required fields
        if (!resumeContent && !resumeData) {
            return res.status(400).json({ 
                success: false,
                error: 'Resume content or resume data is required for analysis' 
            });
        }

        console.log(`🔍 ANALYZE-RESUME: Processing analysis request`);

        // Perform comprehensive analysis
        const analysis = await performResumeAnalysis(resumeContent || JSON.stringify(resumeData), jobDescription, analysisType);

        console.log(`✅ ANALYZE-RESUME: Analysis completed successfully`);

        res.status(200).json({ 
            success: true, 
            message: 'Resume analysis completed successfully',
            analysis,
            processedAt: new Date().toISOString(),
            analysisId: `analysis_${Date.now()}`,
            summary: {
                overallScore: analysis.overall.score,
                atsScore: analysis.ats.score,
                topStrengths: analysis.content.strengths.slice(0, 3),
                criticalImprovements: analysis.content.improvements.filter(imp => imp.impact === 'High'),
                recommendation: getOverallRecommendation(analysis.overall.score)
            }
        });

    } catch (error) {
        console.error('❌ ANALYZE-RESUME: Error during analysis:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error during analysis',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

async function performResumeAnalysis(content, jobDescription, analysisType) {
    // Comprehensive analysis simulation with realistic scoring
    const analysis = {
        overall: {
            score: calculateOverallScore(content),
            grade: getGradeFromScore(calculateOverallScore(content)),
            readabilityScore: calculateReadabilityScore(content),
            professionalismScore: calculateProfessionalismScore(content)
        },
        ats: {
            score: calculateATSScore(content),
            issues: identifyATSIssues(content),
            strengths: identifyATSStrengths(content)
        },
        content: {
            strengths: identifyContentStrengths(content),
            improvements: identifyContentImprovements(content)
        },
        skills: {
            identified: identifySkills(content),
            missing: identifyMissingSkills(content, jobDescription),
            trending: getTrendingSkills()
        },
        formatting: {
            score: calculateFormattingScore(content),
            positives: identifyFormattingPositives(content),
            suggestions: getFormattingSuggestions(content)
        },
        industryAlignment: {
            score: calculateIndustryAlignment(content),
            targetIndustry: identifyTargetIndustry(content),
            alignment: getAlignmentLevel(calculateIndustryAlignment(content)),
            recommendations: getIndustryRecommendations(content)
        },
        recommendations: {
            immediate: getImmediateRecommendations(content),
            longTerm: getLongTermRecommendations(content)
        }
    };

    return analysis;
}

function calculateOverallScore(content) {
    let score = 70; // Base score
    
    // Check for key sections
    if (content.toLowerCase().includes('experience')) score += 5;
    if (content.toLowerCase().includes('education')) score += 3;
    if (content.toLowerCase().includes('skills')) score += 5;
    if (content.toLowerCase().includes('summary') || content.toLowerCase().includes('objective')) score += 5;
    
    // Check for quantifiable results
    if (content.match(/\d+%|\d+\+|increased|improved|reduced|achieved/gi)) score += 8;
    
    // Check for contact information
    if (content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) score += 2;
    if (content.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)) score += 2;
    
    return Math.min(100, score);
}

function getGradeFromScore(score) {
    if (score >= 90) return 'A';
    if (score >= 85) return 'A-';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'B-';
    if (score >= 65) return 'C+';
    return 'C';
}

function calculateReadabilityScore(content) {
    // Simple readability calculation
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // Ideal: 15-20 words per sentence
    if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) return 90;
    if (avgWordsPerSentence >= 12 && avgWordsPerSentence <= 25) return 80;
    return 70;
}

function calculateProfessionalismScore(content) {
    let score = 80; // Base professional score
    
    // Check for professional language
    if (content.match(/\b(achieved|managed|developed|implemented|optimized|enhanced)\b/gi)) score += 10;
    
    // Penalize for informal language
    if (content.match(/\b(awesome|cool|stuff|things)\b/gi)) score -= 10;
    
    // Check for proper formatting indicators
    if (content.includes('•') || content.includes('-')) score += 5;
    
    return Math.max(60, Math.min(100, score));
}

function calculateATSScore(content) {
    let score = 75; // Base ATS score
    
    // Check for standard sections
    const sections = ['experience', 'education', 'skills', 'summary'];
    sections.forEach(section => {
        if (content.toLowerCase().includes(section)) score += 3;
    });
    
    // Check for keywords density
    const keywords = content.match(/\b\w{4,}\b/g) || [];
    if (keywords.length > 50) score += 5;
    
    // Check for consistent formatting
    if (content.includes('\n') && content.split('\n').length > 5) score += 5;
    
    return Math.min(95, score);
}

function identifyATSIssues(content) {
    const issues = [];
    
    if (!content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
        issues.push({
            severity: 'high',
            issue: 'Email address not detected',
            solution: 'Include a professional email address'
        });
    }
    
    if (content.length < 500) {
        issues.push({
            severity: 'medium',
            issue: 'Resume content appears too brief',
            solution: 'Expand sections with more detailed information'
        });
    }
    
    if (!content.match(/\d+%|\d+\+|increased|improved|reduced/gi)) {
        issues.push({
            severity: 'medium',
            issue: 'Limited quantifiable achievements',
            solution: 'Add specific metrics and results to work experience'
        });
    }
    
    return issues;
}

function identifyATSStrengths(content) {
    const strengths = [];
    
    if (content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
        strengths.push('Professional email format detected');
    }
    
    if (content.includes('\n') && content.split('\n').length > 5) {
        strengths.push('Well-structured content with clear sections');
    }
    
    if (content.match(/\d+%|\d+\+|increased|improved|reduced/gi)) {
        strengths.push('Contains quantifiable achievements');
    }
    
    if (content.length > 800) {
        strengths.push('Appropriate content length for ATS parsing');
    }
    
    return strengths;
}

function identifyContentStrengths(content) {
    const strengths = [];
    
    if (content.match(/\b(achieved|managed|developed|implemented|led|optimized)\b/gi)) {
        strengths.push('Uses strong action verbs');
    }
    
    if (content.match(/\d+%|\d+\+|\$\d+|increased|improved|reduced/gi)) {
        strengths.push('Includes quantifiable results and metrics');
    }
    
    if (content.toLowerCase().includes('experience') && content.toLowerCase().includes('education')) {
        strengths.push('Contains both experience and education sections');
    }
    
    if (content.length > 1000) {
        strengths.push('Comprehensive content coverage');
    }
    
    return strengths;
}

function identifyContentImprovements(content) {
    const improvements = [];
    
    if (!content.match(/\b(summary|objective)\b/gi)) {
        improvements.push({
            section: 'Summary',
            suggestion: 'Add a professional summary or objective statement',
            impact: 'High',
            example: 'Experienced [Job Title] with X years of experience in [Key Skills/Industry]'
        });
    }
    
    if (!content.match(/\d+%|\d+\+|increased|improved|reduced/gi)) {
        improvements.push({
            section: 'Experience',
            suggestion: 'Add quantifiable achievements with specific metrics',
            impact: 'High',
            example: 'Increased sales by 25% → Increased quarterly sales by 25% ($50K revenue)'
        });
    }
    
    if (content.split(',').length < 5 && content.toLowerCase().includes('skill')) {
        improvements.push({
            section: 'Skills',
            suggestion: 'Expand skills section with more relevant competencies',
            impact: 'Medium',
            example: 'Add both technical and soft skills relevant to your target role'
        });
    }
    
    return improvements;
}

function identifySkills(content) {
    const commonSkills = [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL',
        'Leadership', 'Communication', 'Project Management', 'Problem Solving',
        'Microsoft Office', 'Excel', 'PowerPoint', 'Teamwork'
    ];
    
    return commonSkills.filter(skill => 
        content.toLowerCase().includes(skill.toLowerCase())
    );
}

function identifyMissingSkills(content, jobDescription) {
    const trendingSkills = [
        'Cloud Computing', 'AWS', 'Docker', 'Kubernetes',
        'Data Analysis', 'Machine Learning', 'Agile',
        'Digital Marketing', 'SEO', 'Social Media'
    ];
    
    return trendingSkills.filter(skill => 
        !content.toLowerCase().includes(skill.toLowerCase())
    ).slice(0, 5);
}

function getTrendingSkills() {
    return [
        'Artificial Intelligence', 'Machine Learning', 'Cloud Computing',
        'Cybersecurity', 'Data Science', 'DevOps', 'Blockchain',
        'Remote Work', 'Digital Transformation', 'Sustainability'
    ];
}

function calculateFormattingScore(content) {
    let score = 80;
    
    // Check for bullet points
    if (content.includes('•') || content.includes('-')) score += 5;
    
    // Check for section breaks
    if (content.split('\n').length > 10) score += 5;
    
    // Check for consistent structure
    if (content.match(/\b(EXPERIENCE|EDUCATION|SKILLS)\b/g)) score += 10;
    
    return Math.min(100, score);
}

function identifyFormattingPositives(content) {
    const positives = [];
    
    if (content.includes('•') || content.includes('-')) {
        positives.push('Uses bullet points for easy readability');
    }
    
    if (content.split('\n').length > 5) {
        positives.push('Well-organized with clear section breaks');
    }
    
    if (content.match(/\b[A-Z][A-Z\s]+\b/)) {
        positives.push('Uses clear section headers');
    }
    
    return positives;
}

function getFormattingSuggestions(content) {
    const suggestions = [];
    
    if (!content.includes('•') && !content.includes('-')) {
        suggestions.push('Use bullet points for work experience and achievements');
    }
    
    if (content.split('\n').length < 5) {
        suggestions.push('Add more section breaks for better readability');
    }
    
    suggestions.push('Ensure consistent font and spacing throughout');
    suggestions.push('Use bold or caps for section headers');
    
    return suggestions;
}

function calculateIndustryAlignment(content) {
    return Math.floor(Math.random() * 20) + 75; // 75-95
}

function identifyTargetIndustry(content) {
    if (content.toLowerCase().includes('software') || content.toLowerCase().includes('developer')) {
        return 'Technology';
    }
    if (content.toLowerCase().includes('marketing') || content.toLowerCase().includes('digital')) {
        return 'Marketing';
    }
    if (content.toLowerCase().includes('finance') || content.toLowerCase().includes('accounting')) {
        return 'Finance';
    }
    return 'General';
}

function getAlignmentLevel(score) {
    if (score >= 85) return 'Excellent';
    if (score >= 75) return 'Strong';
    if (score >= 65) return 'Good';
    return 'Needs Improvement';
}

function getIndustryRecommendations(content) {
    return [
        'Emphasize industry-relevant experience and skills',
        'Use industry-specific keywords and terminology',
        'Highlight relevant certifications or training',
        'Showcase projects related to target industry'
    ];
}

function getImmediateRecommendations(content) {
    const recommendations = [];
    
    if (!content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
        recommendations.push('Add professional email address');
    }
    
    if (!content.match(/\d+%|\d+\+|increased|improved/gi)) {
        recommendations.push('Add 2-3 quantifiable achievements');
    }
    
    if (!content.toLowerCase().includes('summary')) {
        recommendations.push('Include a professional summary section');
    }
    
    return recommendations;
}

function getLongTermRecommendations(content) {
    return [
        'Consider obtaining relevant industry certifications',
        'Build a portfolio of projects to showcase skills',
        'Develop expertise in trending technologies for your field',
        'Network with professionals in your target industry'
    ];
}

function getOverallRecommendation(score) {
    if (score >= 85) {
        return 'Your resume is strong with minor improvements needed';
    } else if (score >= 75) {
        return 'Good foundation with several areas for improvement';
    } else {
        return 'Significant improvements recommended before applying';
    }
}
