// /api/get-user-resumes.js
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

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId = 'anonymous', limit = 10, offset = 0 } = req.method === 'POST' ? req.body : req.query;

        // Get user's resumes
        const resumes = await getUserResumes(userId, limit, offset);
        
        res.status(200).json({
            success: true,
            resumes,
            total: resumes.length,
            hasMore: resumes.length === parseInt(limit)
        });

    } catch (error) {
        console.error('Get resumes error:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve resumes', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
}

async function getUserResumes(userId, limit, offset) {
    try {
        // In production, this would query your database
        // For demo purposes, we'll simulate with file system or in-memory storage
        
        const resumes = [];
        
        // Try to load from file system storage (development)
        if (process.env.NODE_ENV !== 'production') {
            try {
                const fs = require('fs').promises;
                const path = require('path');
                
                const storageDir = path.join(process.cwd(), 'resume-storage');
                const files = await fs.readdir(storageDir).catch(() => []);
                
                for (const file of files) {
                    if (file.endsWith('.json')) {
                        const filePath = path.join(storageDir, file);
                        const content = await fs.readFile(filePath, 'utf8');
                        const resumeRecord = JSON.parse(content);
                        
                        if (resumeRecord.userId === userId && resumeRecord.status === 'active') {
                            resumes.push({
                                id: resumeRecord.id,
                                name: resumeRecord.resumeData.fullName || 'Untitled Resume',
                                jobTitle: resumeRecord.resumeData.jobTitle || 'No Title',
                                lastModified: resumeRecord.metadata.updatedAt,
                                version: resumeRecord.metadata.version,
                                completeness: calculateQuickCompleteness(resumeRecord.resumeData)
                            });
                        }
                    }
                }
            } catch (error) {
                console.log('No file system storage found, checking in-memory storage');
            }
        }
        
        // Fallback to in-memory storage (if no file system results)
        if (resumes.length === 0) {
            // Access the resumeStorage from save-resume.js (in real app, this would be shared database)
            // For demo, we'll return sample data
            resumes.push({
                id: 'sample-1',
                name: 'Sample Resume',
                jobTitle: 'Professional',
                lastModified: new Date().toISOString(),
                version: 1,
                completeness: 75
            });
        }
        
        // Apply pagination
        const startIndex = parseInt(offset) || 0;
        const limitNum = parseInt(limit) || 10;
        
        return resumes
            .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
            .slice(startIndex, startIndex + limitNum);
            
    } catch (error) {
        console.error('Error loading user resumes:', error);
        return [];
    }
}

function calculateQuickCompleteness(resumeData) {
    let score = 0;
    const fields = ['fullName', 'email', 'jobTitle', 'summary', 'workExperience', 'education', 'skills'];
    
    fields.forEach(field => {
        if (resumeData[field]) {
            score += 100 / fields.length;
        }
    });
    
    return Math.round(score);
}
