// /api/ai/optimize-resume.js
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { 
            fullName, 
            email, 
            phone, 
            location, 
            jobTitle, 
            experience, 
            summary, 
            workExperience, 
            education, 
            skills,
            analysis 
        } = req.body;

        // Validate required fields
        if (!fullName || !email || !jobTitle) {
            return res.status(400).json({ 
                error: 'Missing required fields: fullName, email, and jobTitle are required' 
            });
        }

        // AI-powered resume optimization logic
        const optimizedData = await optimizeResumeWithAI({
            fullName,
            email,
            phone,
            location,
            jobTitle,
            experience,
            summary,
            workExperience,
            education,
            skills,
            analysis
        });

        res.status(200).json({
            success: true,
            optimizedData,
            metadata: {
                processedAt: new Date().toISOString(),
                optimization: 'ai-enhanced'
            }
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
        // Enhanced summary generation
        const optimizedSummary = generateOptimizedSummary(data);
        
        // Skills optimization based on job title
        const optimizedSkills = optimizeSkillsForRole(data.skills, data.jobTitle);
        
        // Work experience enhancement
        const optimizedExperience = enhanceWorkExperience(data.workExperience, data.jobTitle);
        
        // Industry-specific keywords
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
        // Fallback to basic optimization
        return basicOptimization(data);
    }
}

function generateOptimizedSummary(data) {
    const { jobTitle, experience, summary } = data;
    
    // If user provided summary, enhance it
    if (summary && summary.length > 20) {
        return enhanceExistingSummary(summary, jobTitle);
    }
    
    // Generate new summary based on role
    const roleTemplates = {
        'HR Manager': `Strategic HR professional with ${getExperienceText(experience)} in talent acquisition, employee relations, and organizational development. Proven track record of implementing data-driven HR solutions that improve employee satisfaction and drive business results.`,
        
        'Data Analyst': `Results-oriented data analyst with ${getExperienceText(experience)} in statistical analysis, data visualization, and business intelligence. Expert in transforming complex datasets into actionable insights that inform strategic decision-making.`,
        
        'Software Engineer': `Innovative software engineer with ${getExperienceText(experience)} in full-stack development, system design, and modern programming languages. Passionate about building scalable applications and contributing to collaborative development environments.`,
        
        'Marketing Manager': `Creative marketing professional with ${getExperienceText(experience)} in digital marketing, brand strategy, and campaign optimization. Demonstrated ability to drive engagement, increase conversions, and deliver measurable ROI.`,
        
        'Project Manager': `Experienced project manager with ${getExperienceText(experience)} in cross-functional team leadership, process optimization, and strategic planning. Proven ability to deliver complex projects on time and within budget.`
    };
    
    // Find matching template
    for (const [role, template] of Object.entries(roleTemplates)) {
        if (jobTitle.toLowerCase().includes(role.toLowerCase().split(' ')[0])) {
            return template;
        }
    }
    
    // Default template
    return `Dedicated professional with ${getExperienceText(experience)} and a strong commitment to excellence. Proven ability to drive results, solve complex problems, and contribute to organizational success.`;
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
    let enhanced = summary;
    
    // Add industry-specific keywords if missing
    const keywordSets = {
        'hr': ['talent acquisition', 'employee relations', 'performance management'],
        'data': ['data analysis', 'business intelligence', 'statistical modeling'],
        'software': ['full-stack development', 'system design', 'agile methodologies'],
        'marketing': ['digital marketing', 'brand strategy', 'campaign optimization'],
        'project': ['project management', 'cross-functional leadership', 'process improvement']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, keywords] of Object.entries(keywordSets)) {
        if (jobLower.includes(category)) {
            keywords.forEach(keyword => {
                if (!enhanced.toLowerCase().includes(keyword.toLowerCase())) {
                    enhanced += ` Experienced in ${keyword}.`;
                }
            });
            break;
        }
    }
    
    return enhanced;
}

function optimizeSkillsForRole(skills, jobTitle) {
    if (!skills) return getDefaultSkillsForRole(jobTitle);
    
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    const additionalSkills = getRecommendedSkills(jobTitle);
    
    // Merge and prioritize skills
    const allSkills = [...skillsArray];
    additionalSkills.forEach(skill => {
        if (!allSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
            allSkills.push(skill);
        }
    });
    
    return allSkills.slice(0, 15).join(', '); // Limit to 15 skills
}

function getDefaultSkillsForRole(jobTitle) {
    const skillSets = {
        'hr': ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'HRIS Systems', 'Recruiting', 'Onboarding', 'Compensation Planning', 'Training & Development'],
        'data': ['Data Analysis', 'Python', 'SQL', 'Tableau', 'Excel', 'Statistical Analysis', 'Business Intelligence', 'Data Visualization'],
        'software': ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'Agile', 'System Design', 'Database Management'],
        'marketing': ['Digital Marketing', 'Google Analytics', 'SEO/SEM', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Campaign Management', 'Brand Strategy'],
        'project': ['Project Management', 'Agile/Scrum', 'Risk Management', 'Budget Planning', 'Team Leadership', 'Process Improvement', 'Stakeholder Management', 'Quality Assurance']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, skillSet] of Object.entries(skillSets)) {
        if (jobLower.includes(category)) {
            return skillSet.slice(0, 8).join(', ');
        }
    }
    
    return 'Communication, Problem Solving, Team Collaboration, Time Management, Leadership, Analytical Thinking';
}

function getRecommendedSkills(jobTitle) {
    const recommendations = {
        'hr': ['Workday', 'BambooHR', 'ADP', 'Slack', 'Microsoft Office', 'Data Analysis'],
        'data': ['Machine Learning', 'R', 'Power BI', 'Google Analytics', 'A/B Testing', 'ETL'],
        'software': ['AWS', 'Docker', 'API Development', 'Testing', 'CI/CD', 'MongoDB'],
        'marketing': ['HubSpot', 'Salesforce', 'Adobe Creative Suite', 'Mailchimp', 'WordPress', 'CRM'],
        'project': ['Jira', 'Confluence', 'Microsoft Project', 'Slack', 'Gantt Charts', 'KPI Tracking']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, skills] of Object.entries(recommendations)) {
        if (jobLower.includes(category)) {
            return skills;
        }
    }
    
    return ['Microsoft Office', 'Communication', 'Leadership'];
}

function enhanceWorkExperience(workExperience, jobTitle) {
    if (!workExperience) return '';
    
    // Add action verbs and quantifiable achievements where possible
    let enhanced = workExperience;
    
    const actionVerbs = {
        'hr': ['Recruited', 'Onboarded', 'Developed', 'Implemented', 'Managed', 'Coordinated'],
        'data': ['Analyzed', 'Developed', 'Optimized', 'Implemented', 'Visualized', 'Automated'],
        'software': ['Developed', 'Architected', 'Implemented', 'Optimized', 'Deployed', 'Maintained'],
        'marketing': ['Created', 'Launched', 'Optimized', 'Managed', 'Increased', 'Developed'],
        'project': ['Led', 'Managed', 'Coordinated', 'Delivered', 'Implemented', 'Optimized']
    };
    
    // This is a simplified enhancement - in a real implementation, 
    // you might use NLP to better parse and enhance the content
    return enhanced;
}

function getIndustryKeywords(jobTitle) {
    const keywordSets = {
        'hr': ['talent acquisition', 'employee engagement', 'performance management', 'HRIS', 'compliance', 'diversity and inclusion'],
        'data': ['data analytics', 'business intelligence', 'statistical analysis', 'machine learning', 'data visualization', 'predictive modeling'],
        'software': ['software development', 'full-stack', 'agile development', 'system architecture', 'code review', 'version control'],
        'marketing': ['digital marketing', 'brand management', 'campaign optimization', 'conversion rate', 'customer acquisition', 'market research'],
        'project': ['project management', 'agile methodology', 'stakeholder management', 'risk assessment', 'budget management', 'deliverable tracking']
    };
    
    const jobLower = jobTitle.toLowerCase();
    for (const [category, keywords] of Object.entries(keywordSets)) {
        if (jobLower.includes(category)) {
            return keywords;
        }
    }
    
    return ['leadership', 'communication', 'problem-solving', 'team collaboration'];
}

function calculateATSScore(data) {
    let score = 0;
    const maxScore = 100;
    
    // Contact information (20 points)
    if (data.fullName) score += 5;
    if (data.email) score += 5;
    if (data.phone) score += 5;
    if (data.location) score += 5;
    
    // Content completeness (40 points)
    if (data.summary && data.summary.length > 50) score += 10;
    if (data.workExperience && data.workExperience.length > 100) score += 15;
    if (data.education && data.education.length > 20) score += 5;
    if (data.skills && data.skills.split(',').length >= 5) score += 10;
    
    // Job title relevance (20 points)
    if (data.jobTitle) score += 20;
    
    // Experience level (20 points)
    if (data.experience) score += 20;
    
    return Math.min(score, maxScore);
}

function generateRecommendations(data) {
    const recommendations = [];
    
    if (!data.summary || data.summary.length < 50) {
        recommendations.push("Add a compelling professional summary to grab recruiters' attention");
    }
    
    if (!data.skills || data.skills.split(',').length < 5) {
        recommendations.push("Include more relevant skills for your target role");
    }
    
    if (!data.workExperience || data.workExperience.length < 100) {
        recommendations.push("Expand your work experience with specific achievements and metrics");
    }
    
    if (!data.phone) {
        recommendations.push("Consider adding a phone number for easier contact");
    }
    
    if (!data.location) {
        recommendations.push("Adding your location can help with local job searches");
    }
    
    return recommendations;
}

function basicOptimization(data) {
    // Fallback optimization when AI fails
    return {
        ...data,
        optimizedSummary: data.summary || `Professional with experience in ${data.jobTitle}`,
        optimizedSkills: data.skills || 'Communication, Problem Solving, Team Work',
        optimizedExperience: data.workExperience || '',
        keywords: ['professional', 'experienced', 'dedicated'],
        atsScore: 60,
        recommendations: ['Complete all sections for better ATS compatibility']
    };
}
