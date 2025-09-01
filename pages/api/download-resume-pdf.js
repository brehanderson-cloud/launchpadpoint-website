// /api/download-resume-pdf.js
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';

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
        const { resumeData, resumeId, format = 'pdf' } = req.body;

        if (!resumeData) {
            return res.status(400).json({ error: 'Resume data is required' });
        }

        // Generate PDF
        const pdfBuffer = await generateResumePDF(resumeData, format);
        
        // Generate unique filename
        const fileName = `${resumeData.fullName?.replace(/\s+/g, '_') || 'Resume'}_${Date.now()}.pdf`;
        
        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        
        // Send the PDF
        res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error('PDF generation error:', error);
        res.status(500).json({ 
            error: 'Failed to generate PDF', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
}

async function generateResumePDF(resumeData, format) {
    let browser;
    
    try {
        // Launch puppeteer
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Generate HTML content
        const htmlContent = generateResumeHTML(resumeData, format);
        
        // Set content and wait for fonts to load
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        // Generate PDF with professional settings
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in'
            },
            printBackground: true,
            preferCSSPageSize: true
        });
        
        return pdfBuffer;
        
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

function generateResumeHTML(data, format = 'professional') {
    const templates = {
        professional: generateProfessionalTemplate(data),
        modern: generateModernTemplate(data),
        creative: generateCreativeTemplate(data)
    };
    
    return templates[format] || templates.professional;
}

function generateProfessionalTemplate(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${data.fullName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
            background: white;
        }
        
        .resume-container {
            max-width: 8.5in;
            margin: 0 auto;
            background: white;
            padding: 0.5in;
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        
        .name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #2c3e50;
        }
        
        .contact-info {
            font-size: 10px;
            color: #666;
            line-height: 1.3;
        }
        
        .section {
            margin-bottom: 18px;
        }
        
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 3px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .content {
            margin-left: 0;
        }
        
        .job-entry, .education-entry {
            margin-bottom: 12px;
        }
        
        .job-title, .degree {
            font-weight: bold;
            font-size: 11px;
        }
        
        .company, .school {
            font-style: italic;
            color: #666;
            font-size: 10px;
        }
        
        .date {
            float: right;
            font-size: 9px;
            color: #888;
        }
        
        .job-description, .education-details {
            margin-top: 5px;
            font-size: 10px;
            line-height: 1.4;
        }
        
        .job-description ul {
            margin-left: 15px;
            margin-top: 3px;
        }
        
        .job-description li {
            margin-bottom: 2px;
        }
        
        .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-item {
            background: #ecf0f1;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 9px;
            color: #2c3e50;
        }
        
        .summary-text {
            font-size: 10px;
            line-height: 1.5;
            text-align: justify;
            margin-bottom: 5px;
        }
        
        @media print {
            body { print-color-adjust: exact; }
            .resume-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <div class="header">
            <div class="name">${data.fullName || 'Your Name'}</div>
            <div class="contact-info">
                ${buildContactLine(data)}
            </div>
        </div>
        
        ${data.summary ? `
        <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="content">
                <div class="summary-text">${data.optimizedSummary || data.summary}</div>
            </div>
        </div>
        ` : ''}
        
        ${data.workExperience ? `
        <div class="section">
            <div class="section-title">Professional Experience</div>
            <div class="content">
                ${formatWorkExperienceForPDF(data.optimizedExperience || data.workExperience)}
            </div>
        </div>
        ` : ''}
        
        ${data.education ? `
        <div class="section">
            <div class="section-title">Education</div>
            <div class="content">
                ${formatEducationForPDF(data.education)}
            </div>
        </div>
        ` : ''}
        
        ${data.skills ? `
        <div class="section">
            <div class="section-title">Core Competencies</div>
            <div class="content">
                <div class="skills-grid">
                    ${formatSkillsForPDF(data.optimizedSkills || data.skills)}
                </div>
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>`;
}

function generateModernTemplate(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${data.fullName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
            background: white;
        }
        
        .resume-container {
            max-width: 8.5in;
            margin: 0 auto;
            background: white;
            display: grid;
            grid-template-columns: 1fr 2fr;
            min-height: 11in;
        }
        
        .sidebar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
        }
        
        .main-content {
            padding: 30px 25px;
        }
        
        .name {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .job-title {
            font-size: 12px;
            opacity: 0.9;
            margin-bottom: 15px;
            font-weight: 300;
        }
        
        .contact-info {
            font-size: 9px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .contact-info div {
            margin-bottom: 3px;
        }
        
        .sidebar-section {
            margin-bottom: 20px;
        }
        
        .sidebar-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .skills-list {
            list-style: none;
        }
        
        .skills-list li {
            background: rgba(255,255,255,0.2);
            padding: 4px 8px;
            margin: 3px 0;
            border-radius: 3px;
            font-size: 9px;
        }
        
        .main-section {
            margin-bottom: 25px;
        }
        
        .main-section-title {
            font-size: 14px;
            font-weight: bold;
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 5px;
            margin-bottom: 12px;
            text-transform: uppercase;
        }
        
        .experience-item {
            margin-bottom: 15px;
        }
        
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 5px;
        }
        
        .job-info h4 {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 2px;
        }
        
        .job-info .company {
            font-size: 10px;
            color: #666;
            font-style: italic;
        }
        
        .job-date {
            font-size: 9px;
            color: #888;
        }
        
        .job-description {
            font-size: 10px;
            line-height: 1.4;
            margin-top: 5px;
        }
        
        @media print {
            body { print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <div class="sidebar">
            <div class="name">${data.fullName || 'Your Name'}</div>
            <div class="job-title">${data.jobTitle || 'Professional'}</div>
            
            <div class="contact-info">
                ${buildContactSidebar(data)}
            </div>
            
            ${data.skills ? `
            <div class="sidebar-section">
                <div class="sidebar-title">Skills</div>
                <ul class="skills-list">
                    ${formatSkillsForSidebar(data.optimizedSkills || data.skills)}
                </ul>
            </div>
            ` : ''}
        </div>
        
        <div class="main-content">
            ${data.summary ? `
            <div class="main-section">
                <div class="main-section-title">Profile</div>
                <div style="font-size: 10px; line-height: 1.5;">${data.optimizedSummary || data.summary}</div>
            </div>
            ` : ''}
            
            ${data.workExperience ? `
            <div class="main-section">
                <div class="main-section-title">Experience</div>
                ${formatWorkExperienceModern(data.optimizedExperience || data.workExperience)}
            </div>
            ` : ''}
            
            ${data.education ? `
            <div class="main-section">
                <div class="main-section-title">Education</div>
                ${formatEducationModern(data.education)}
            </div>
            ` : ''}
        </div>
    </div>
</body>
</html>`;
}

function generateCreativeTemplate(data) {
    // A more creative template with colors and modern design
    return generateModernTemplate(data); // For now, use modern template
}

function buildContactLine(data) {
    const contact = [];
    if (data.email) contact.push(data.email);
    if (data.phone) contact.push(data.phone);
    if (data.location) contact.push(data.location);
    return contact.join(' | ');
}

function buildContactSidebar(data) {
    let contact = '';
    if (data.email) contact += `<div>📧 ${data.email}</div>`;
    if (data.phone) contact += `<div>📞 ${data.phone}</div>`;
    if (data.location) contact += `<div>📍 ${data.location}</div>`;
    return contact;
}

function formatWorkExperienceForPDF(workExperience) {
    if (!workExperience) return '';
    
    const lines = workExperience.split('\n').filter(line => line.trim());
    let formatted = '';
    let currentJob = null;
    
    lines.forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('•') && !line.startsWith('-')) {
            // Job title line
            if (currentJob) {
                formatted += '</div></div>';
            }
            
            // Parse job title, company, and dates
            const parts = line.split(' - ');
            const title = parts[0] || '';
            const rest = parts.slice(1).join(' - ');
            
            // Try to extract dates (basic pattern matching)
            const datePattern = /\(([^)]+)\)$/;
            const dateMatch = rest.match(datePattern);
            const company = dateMatch ? rest.replace(datePattern, '').trim() : rest;
            const dates = dateMatch ? dateMatch[1] : '';
            
            formatted += `
                <div class="job-entry">
                    <div class="job-title">${title}</div>
                    <div class="company">${company}</div>
                    ${dates ? `<div class="date">${dates}</div>` : ''}
                    <div class="job-description">
            `;
            currentJob = true;
        } else if (line.startsWith('•') || line.startsWith('-')) {
            // Bullet point
            if (!currentJob) {
                formatted += '<div class="job-entry"><div class="job-description">';
                currentJob = true;
            }
            formatted += `<div style="margin-left: 15px; margin-bottom: 3px;">${line}</div>`;
        }
    });
    
    if (currentJob) {
        formatted += '</div></div>';
    }
    
    return formatted;
}

function formatWorkExperienceModern(workExperience) {
    if (!workExperience) return '';
    
    const lines = workExperience.split('\n').filter(line => line.trim());
    let formatted = '';
    let currentJob = null;
    
    lines.forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('•') && !line.startsWith('-')) {
            if (currentJob) {
                formatted += '</div></div>';
            }
            
            const parts = line.split(' - ');
            const title = parts[0] || '';
            const rest = parts.slice(1).join(' - ');
            const datePattern = /\(([^)]+)\)$/;
            const dateMatch = rest.match(datePattern);
            const company = dateMatch ? rest.replace(datePattern, '').trim() : rest;
            const dates = dateMatch ? dateMatch[1] : '';
            
            formatted += `
                <div class="experience-item">
                    <div class="job-header">
                        <div class="job-info">
                            <h4>${title}</h4>
                            <div class="company">${company}</div>
                        </div>
                        <div class="job-date">${dates}</div>
                    </div>
                    <div class="job-description">
            `;
            currentJob = true;
        } else if (line.startsWith('•') || line.startsWith('-')) {
            if (!currentJob) {
                formatted += '<div class="experience-item"><div class="job-description">';
                currentJob = true;
            }
            formatted += `<div style="margin-bottom: 2px;">${line}</div>`;
        }
    });
    
    if (currentJob) {
        formatted += '</div></div>';
    }
    
    return formatted;
}

function formatEducationForPDF(education) {
    if (!education) return '';
    
    return education.split('\n').filter(line => line.trim()).map(line => {
        line = line.trim();
        const parts = line.split(' - ');
        const degree = parts[0] || line;
        const school = parts[1] || '';
        const year = parts[2] || '';
        
        return `
            <div class="education-entry">
                <div class="degree">${degree}</div>
                ${school ? `<div class="school">${school}</div>` : ''}
                ${year ? `<div class="date">${year}</div>` : ''}
            </div>
        `;
    }).join('');
}

function formatEducationModern(education) {
    return formatEducationForPDF(education); // Same format for now
}

function formatSkillsForPDF(skills) {
    if (!skills) return '';
    
    return skills.split(',')
        .map(skill => skill.trim())
        .filter(skill => skill)
        .map(skill => `<span class="skill-item">${skill}</span>`)
        .join('');
}

function formatSkillsForSidebar(skills) {
    if (!skills) return '';
    
    return skills.split(',')
        .map(skill => skill.trim())
        .filter(skill => skill)
        .map(skill => `<li>${skill}</li>`)
        .join('');
}
