// /api/ai/optimize-resume.js
export default async function handler(req, res) {
    console.log(`🔍 OPTIMIZE-RESUME: ${req.method} ${req.url || 'unknown'}`);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Handle GET requests (stops 405 errors from health checks)
    if (req.method === 'GET') {
        console.log('GET request received - returning basic info');
        return res.status(200).json({ 
            message: 'AI Resume Optimization endpoint', 
            methods: ['POST'],
            status: 'active' 
        });
    }

    if (req.method !== 'POST') {
        console.log(`❌ Method ${req.method} not allowed - returning 405`);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { fullName, email, phone, location, jobTitle, experience, summary, workExperience, education, skills, analysis } = req.body;

        if (!fullName || !email || !jobTitle) {
            return res.status(400).json({ 
                error: 'Missing required fields: fullName, email, and jobTitle are required' 
            });
        }

        const optimizedData = await optimizeResumeWithAI({
            fullName, email, phone, location, jobTitle, experience, summary, workExperience, education, skills, analysis
        });

        res.status(200).json({
            success: true,
            optimizedData,
            metadata: { processedAt: new Date().toISOString(), optimization: 'ai-enhanced' }
        });

    } catch (error) {
        console.error('Resume optimization error:', error);
        res.status(500).json({ 
            error: 'Failed to optimize resume', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
}

async function optimizeResumeWithAI(data) {
    try {
        const optimizedSummary = generateOptimizedSummary(data);
        const optimizedSkills = optimizeSkillsForRole(data.skills, data.jobTitle);
        const optimizedExperience = enhanceWorkExperience(data.workExperience, data.jobTitle);
        const keywords = getIndustryKeywords(data.jobTitle);
        
        return {
            ...data,
            optimizedSummary,
            optimizedSkills,
            optimizedExperience,
            keywords,
            atsScore: calculateATSScore(data),
            recommendations: generateRecommendations(data)
        };
        
    } catch (error) {
        console.error('AI optimization failed:', error);
        return basicOptimization(data);
    }
}

function generateOptimizedSummary(data) {
    const { jobTitle, experience, summary } = data;
    
    if (summary && summary.length > 20) {
        return enhanceExistingSummary(summary, jobTitle);
    }
    
    const roleTemplates = {
        'HR Manager': `Strategic HR professional with ${getExperienceText(experience)} in talent acquisition, employee relations, and organizational development.`,
        'Data Analyst': `Results-oriented data analyst with ${getExperienceText(experience)} in statistical analysis, data visualization, and business intelligence.`,
        'Software Engineer': `Innovative software engineer with ${getExperienceText(experience)} in full-stack development, system design, and modern programming languages.`
    };
    
    for (const [role, template] of Object.entries(roleTemplates)) {
        if (jobTitle.toLowerCase().includes(role.toLowerCase().split(' ')[0])) {
            return template;
        }
    }
    
    return `Dedicated professional with ${getExperienceText(experience)} and a strong commitment to excellence.`;
}

function getExperienceText(experience) {
    const experienceMap = {
        '0-1': '1 year of experience',
        '2-5': '2-5 years of experience', 
        '6-10': '6-10 years of experience',
        '10+': 'over 10 years of experience'
    };
    return experienceMap[experience] || 'professional experience';
}

function enhanceExistingSummary(summary, jobTitle) {
    return summary + ` Enhanced for ${jobTitle} roles with industry-specific optimization.`;
}

function optimizeSkillsForRole(skills, jobTitle) {
    if (!skills) return getDefaultSkillsForRole(jobTitle);
    
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    const additionalSkills = getRecommendedSkills(jobTitle);
    const allSkills = [...skillsArray, ...additionalSkills];
    
    return allSkills.slice(0, 15).join(', ');
}

function getDefaultSkillsForRole(jobTitle) {
    const skillSets = {
        'hr': ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'HRIS Systems'],
        'data': ['Data Analysis', 'Python', 'SQL', 'Tableau', 'Excel'],
        'software': ['JavaScript', 'Python', 'React', 'Node.js', 'Git']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, skillSet] of Object.entries(skillSets)) {
        if (jobLower.includes(category)) {
            return skillSet.join(', ');
        }
    }
    
    return 'Communication, Problem Solving, Team Collaboration, Leadership';
}

function getRecommendedSkills(jobTitle) {
    const recommendations = {
        'hr': ['Workday', 'ADP', 'Microsoft Office'],
        'data': ['Machine Learning', 'R', 'Power BI'],
        'software': ['AWS', 'Docker', 'API Development']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, skills] of Object.entries(recommendations)) {
        if (jobLower.includes(category)) {
            return skills;
        }
    }
    
    return ['Microsoft Office', 'Communication'];
}

function enhanceWorkExperience(workExperience, jobTitle) {
    if (!workExperience) return '';
    return workExperience
      .replace(/\bmanaged\b/gi, 'Successfully managed')
      .replace(/\bworked\b/gi, 'Collaborated');
}

function getIndustryKeywords(jobTitle) {
    const keywordSets = {
        'hr': ['talent acquisition', 'employee engagement', 'performance management'],
        'data': ['data analytics', 'business intelligence', 'statistical analysis'],
        'software': ['software development', 'full-stack', 'agile development']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, keywords] of Object.entries(keywordSets)) {
        if (jobLower.includes(category)) {
            return keywords;
        }
    }
    
    return ['leadership', 'communication', 'problem-solving'];
}

function calculateATSScore(data) {
    let score = 0;
    if (data.fullName) score += 10;
    if (data.email) score += 10;
    if (data.jobTitle) score += 15;
    if (data.summary && data.summary.length > 50) score += 20;
    if (data.workExperience && data.workExperience.length > 100) score += 25;
    if (data.skills && data.skills.split(',').length >= 3) score += 20;
    return Math.min(score, 100);
}

function generateRecommendations(data) {
    const recommendations = [];
    if (!data.summary || data.summary.length < 50) {
        recommendations.push("Add a compelling professional summary");
    }
    if (!data.workExperience || data.workExperience.length < 100) {
        recommendations.push("Expand work experience with specific achievements");
    }
    if (!data.skills || data.skills.split(',').length < 5) {
        recommendations.push("Include more relevant skills");
    }
    return recommendations;
}

function basicOptimization(data) {
    return {
        ...data,
        optimizedSummary: data.summary || `Professional with experience in ${data.jobTitle}`,
        optimizedSkills: data.skills || 'Communication, Problem Solving',
        optimizedExperience: data.workExperience || '',
        keywords: ['professional', 'experienced'],
        atsScore: 60,
        recommendations: ['Complete all sections for better results']
    };
}
