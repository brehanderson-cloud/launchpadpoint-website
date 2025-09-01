// /api/save-resume.js
import { v4 as uuidv4 } from 'uuid';

// In a real implementation, you'd use a proper database
// For now, we'll simulate with in-memory storage or file system
let resumeStorage = new Map();

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
        const { resumeData, resumeId, userId, metadata = {} } = req.body;

        if (!resumeData) {
            return res.status(400).json({ error: 'Resume data is required' });
        }

        // Generate or use existing ID
        const id = resumeId || uuidv4();
        const timestamp = new Date().toISOString();
        
        // Prepare resume record
        const resumeRecord = {
            id,
            userId: userId || 'anonymous',
            resumeData,
            metadata: {
                ...metadata,
                createdAt: resumeStorage.has(id) ? resumeStorage.get(id).metadata.createdAt : timestamp,
                updatedAt: timestamp,
                version: resumeStorage.has(id) ? (resumeStorage.get(id).metadata.version || 0) + 1 : 1
            },
            status: 'active'
        };

        // Save to storage (in production, this would be a database)
        await saveResumeToStorage(id, resumeRecord);

        // Generate analytics
        const analytics = await generateResumeAnalytics(resumeRecord);

        res.status(200).json({
            success: true,
            resumeId: id,
            message: resumeStorage.has(resumeId) ? 'Resume updated successfully' : 'Resume saved successfully',
            analytics,
            metadata: resumeRecord.metadata
        });

    } catch (error) {
        console.error('Resume save error:', error);
        res.status(500).json({ 
            error: 'Failed to save resume', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
}

async function saveResumeToStorage(id, resumeRecord) {
    // In production, this would save to your database (MongoDB, PostgreSQL, etc.)
    // For demo purposes, we're using in-memory storage
    
    try {
        resumeStorage.set(id, resumeRecord);
        
        // Optional: Also save to file system for persistence across server restarts
        if (process.env.NODE_ENV !== 'production') {
            const fs = require('fs').promises;
            const path = require('path');
            
            const storageDir = path.join(process.cwd(), 'resume-storage');
            await fs.mkdir(storageDir, { recursive: true });
            
            const filePath = path.join(storageDir, `${id}.json`);
            await fs.writeFile(filePath, JSON.stringify(resumeRecord, null, 2));
        }
        
        return true;
    } catch (error) {
        console.error('Storage error:', error);
        throw new Error('Failed to save resume to storage');
    }
}

async function generateResumeAnalytics(resumeRecord) {
    const { resumeData, metadata } = resumeRecord;
    
    const analytics = {
        completenessScore: calculateCompletenessScore(resumeData),
        wordCount: calculateWordCount(resumeData),
        sectionAnalysis: analyzeSections(resumeData),
        improvementSuggestions: generateImprovementSuggestions(resumeData),
        lastUpdated: metadata.updatedAt,
        version: metadata.version
    };
    
    return analytics;
}

function calculateCompletenessScore(resumeData) {
    let score = 0;
    const weights = {
        fullName: 5,
        email: 5,
        phone: 3,
        location: 2,
        jobTitle: 5,
        summary: 15,
        workExperience: 30,
        education: 15,
        skills: 10,
        experience: 10
    };
    
    for (const [field, weight] of Object.entries(weights)) {
        if (resumeData[field]) {
            if (field === 'summary' && resumeData[field].length < 50) {
                score += weight * 0.5; // Partial credit for short summaries
            } else if (field === 'workExperience' && resumeData[field].length < 100) {
                score += weight * 0.6; // Partial credit for brief experience
            } else if (field === 'skills' && resumeData[field].split(',').length < 5) {
                score += weight * 0.7; // Partial credit for few skills
            } else {
                score += weight;
            }
        }
    }
    
    return Math.min(score, 100);
}

function calculateWordCount(resumeData) {
    const textFields = ['summary', 'workExperience', 'education'];
    let totalWords = 0;
    
    textFields.forEach(field => {
        if (resumeData[field]) {
            const words = resumeData[field].split(/\s+/).filter(word => word.length > 0);
            totalWords += words.length;
        }
    });
    
    return totalWords;
}

function analyzeSections(resumeData) {
    const sections = {};
    
    // Analyze summary
    if (resumeData.summary) {
        sections.summary = {
            present: true,
            wordCount: resumeData.summary.split(/\s+/).length,
            quality: resumeData.summary.length > 100 ? 'Good' : resumeData.summary.length > 50 ? 'Fair' : 'Needs Improvement'
        };
    } else {
        sections.summary = { present: false, quality: 'Missing' };
    }
    
    // Analyze work experience
    if (resumeData.workExperience) {
        const experienceLines = resumeData.workExperience.split('\n').filter(line => line.trim());
        const jobCount = experienceLines.filter(line => !line.trim().startsWith('•') && !line.trim().startsWith('-')).length;
        
        sections.workExperience = {
            present: true,
            jobCount,
            wordCount: resumeData.workExperience.split(/\s+/).length,
            quality: jobCount >= 3 ? 'Good' : jobCount >= 2 ? 'Fair' : 'Needs Improvement'
        };
    } else {
        sections.workExperience = { present: false, quality: 'Missing' };
    }
    
    // Analyze skills
    if (resumeData.skills) {
        const skillCount = resumeData.skills.split(',').filter(skill => skill.trim()).length;
        sections.skills = {
            present: true,
            skillCount,
            quality: skillCount >= 8 ? 'Good' : skillCount >= 5 ? 'Fair' : 'Needs Improvement'
        };
    } else {
        sections.skills = { present: false, quality: 'Missing' };
    }
    
    // Analyze education
    if (resumeData.education) {
        sections.education = {
            present: true,
            wordCount: resumeData.education.split(/\s+/).length,
            quality: resumeData.education.length > 50 ? 'Good' : 'Fair'
        };
    } else {
        sections.education = { present: false, quality: 'Missing' };
    }
    
    return sections;
}

function generateImprovementSuggestions(resumeData) {
    const suggestions = [];
    
    // Check completeness
    if (!resumeData.summary) {
        suggestions.push({
            type: 'missing_section',
            priority: 'high',
            suggestion: 'Add a professional summary to introduce yourself to employers'
        });
    } else if (resumeData.summary.length < 100) {
        suggestions.push({
            type: 'content_quality',
            priority: 'medium',
            suggestion: 'Expand your professional summary to 100-150 words for better impact'
        });
    }
    
    if (!resumeData.workExperience) {
        suggestions.push({
            type: 'missing_section',
            priority: 'high',
            suggestion: 'Add work experience details to demonstrate your qualifications'
        });
    } else if (resumeData.workExperience.length < 200) {
        suggestions.push({
            type: 'content_quality',
            priority: 'medium',
            suggestion: 'Provide more detailed work experience with specific achievements'
        });
    }
    
    if (!resumeData.skills) {
        suggestions.push({
            type: 'missing_section',
            priority: 'high',
            suggestion: 'Include a skills section to highlight your competencies'
        });
    } else {
        const skillCount = resumeData.skills.split(',').length;
        if (skillCount < 5) {
            suggestions.push({
                type: 'content_quality',
                priority: 'medium',
                suggestion: 'Add more relevant skills to strengthen your profile (aim for 6-10 skills)'
            });
        }
    }
    
    if (!resumeData.phone) {
        suggestions.push({
            type: 'contact_info',
            priority: 'low',
            suggestion: 'Consider adding a phone number for easier recruiter contact'
        });
    }
    
    if (!resumeData.location) {
        suggestions.push({
            type: 'contact_info',
            priority: 'low',
            suggestion: 'Adding your location can help with local job searches'
        });
    }
    
    // Check for quantifiable achievements
    if (resumeData.workExperience && !resumeData.workExperience.match(/\d+%|\$\d+|\d+\s*(people|employees|customers|projects)/i)) {
        suggestions.push({
            type: 'content_quality',
            priority: 'medium',
            suggestion: 'Include quantifiable achievements (numbers, percentages, dollar amounts) in your work experience'
        });
    }
    
    return suggestions;
}
