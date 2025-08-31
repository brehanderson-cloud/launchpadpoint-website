// File: api/download-resume-docx.js
// Complete Word document generation

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
    const { optimizedResume, stylePreference = 'professional' } = req.body;

    if (!optimizedResume) {
      return res.status(400).json({ error: 'Optimized resume data required' });
    }

    const resume = optimizedResume.optimizedResume || optimizedResume;

    // Generate comprehensive HTML that Word can properly import
    const htmlContent = generateProfessionalResumeHTML(resume, stylePreference);

    // Set headers for Word document download
    res.setHeader('Content-Type', 'application/msword');
    res.setHeader('Content-Disposition', 'attachment; filename="optimized-resume.doc"');
    res.setHeader('Content-Length', Buffer.byteLength(htmlContent, 'utf8'));

    // Send HTML content that Word will format
    res.send(htmlContent);

  } catch (error) {
    console.error('Word document generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate Word document',
      details: error.message 
    });
  }
}

function generateProfessionalResumeHTML(resume, style) {
  const styleCSS = getStyleCSS(style);
  
  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="Microsoft Word 15">
    <meta name="Originator" content="Microsoft Word 15">
    <title>Resume - ${resume.personalInfo.name}</title>
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>90</w:Zoom>
            <w:DoNotPromptForConvert/>
            <w:DoNotShowInsertionsAndDeletions/>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        ${styleCSS}
    </style>
</head>
<body>
    <!-- Header Section -->
    <div class="header">
        <h1 class="name">${resume.personalInfo.name}</h1>
        <div class="contact-info">
            ${resume.personalInfo.email}
            ${resume.personalInfo.phone ? ` • ${resume.personalInfo.phone}` : ''}
            ${resume.personalInfo.location ? ` • ${resume.personalInfo.location}` : ''}
        </div>
        ${resume.personalInfo.linkedin ? `<div class="linkedin">${resume.personalInfo.linkedin}</div>` : ''}
    </div>

    <!-- Professional Summary -->
    ${resume.professionalSummary ? `
    <div class="section">
        <h2 class="section-title">PROFESSIONAL SUMMARY</h2>
        <p class="summary-text">${resume.professionalSummary}</p>
    </div>
    ` : ''}

    <!-- Core Competencies -->
    ${resume.skills || resume.coreCompetencies ? `
    <div class="section">
        <h2 class="section-title">CORE COMPETENCIES</h2>
        <div class="skills-container">
            ${getSkillsHTML(resume.skills || resume.coreCompetencies)}
        </div>
    </div>
    ` : ''}

    <!-- Professional Experience -->
    ${resume.experience && resume.experience.length > 0 ? `
    <div class="section">
        <h2 class="section-title">PROFESSIONAL EXPERIENCE</h2>
        ${resume.experience.map(exp => `
            <div class="job-entry">
                <div class="job-header">
                    <div class="job-title-company">
                        <span class="job-title">${exp.title}</span>
                        <span class="company">${exp.company}</span>
                    </div>
                    <div class="job-duration">${exp.duration}</div>
                </div>
                ${exp.location ? `<div class="job-location">${exp.location}</div>` : ''}
                
                ${exp.achievements && exp.achievements.length > 0 ? `
                <ul class="achievements">
                    ${exp.achievements.map(achievement => `
                        <li class="achievement">${achievement}</li>
                    `).join('')}
                </ul>
                ` : ''}
                
                ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                <ul class="achievements">
                    ${exp.responsibilities.map(resp => `
                        <li class="achievement">${resp}</li>
                    `).join('')}
                </ul>
                ` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <!-- Education -->
    ${resume.education && resume.education.length > 0 ? `
    <div class="section">
        <h2 class="section-title">EDUCATION</h2>
        ${resume.education.map(edu => `
            <div class="education-entry">
                <div class="education-header">
                    <span class="degree">${edu.degree}</span>
                    <span class="graduation-year">${edu.year}</span>
                </div>
                <div class="school">${edu.school}</div>
                ${edu.relevant || edu.details ? `<div class="education-details">${edu.relevant || edu.details}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <!-- Certifications -->
    ${resume.certifications && resume.certifications.length > 0 ? `
    <div class="section">
        <h2 class="section-title">CERTIFICATIONS</h2>
        <ul class="certifications">
            ${resume.certifications.map(cert => `
                <li class="certification">${cert}</li>
            `).join('')}
        </ul>
    </div>
    ` : ''}

    <!-- Projects -->
    ${resume.projects && resume.projects.length > 0 ? `
    <div class="section">
        <h2 class="section-title">NOTABLE PROJECTS</h2>
        ${resume.projects.map(project => `
            <div class="project-entry">
                <div class="project-name">${project.name}</div>
                <div class="project-description">${project.description}</div>
                ${project.technologies ? `
                    <div class="project-tech">Technologies: ${project.technologies.join(', ')}</div>
                ` : ''}
                ${project.impact ? `<div class="project-impact">${project.impact}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}
</body>
</html>`;
}

function getSkillsHTML(skills) {
  if (Array.isArray(skills)) {
    return skills.map(skill => `<span class="skill-item">${skill}</span>`).join('');
  }
  
  if (typeof skills === 'object') {
    return Object.entries(skills).map(([category, skillList]) => `
      <div class="skill-category">
        <span class="skill-category-title">${category.charAt(0).toUpperCase() + category.slice(1)}:</span>
        ${skillList.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
      </div>
    `).join('');
  }
  
  return '';
}

function getStyleCSS(style) {
  const baseCSS = `
    body {
        font-family: 'Calibri', 'Arial', sans-serif;
        margin: 0.75in;
        line-height: 1.3;
        color: #333;
        font-size: 11pt;
    }
    
    .header {
        text-align: center;
        margin-bottom: 25px;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 15px;
    }
    
    .name {
        font-size: 28pt;
        font-weight: bold;
        margin: 0 0 8px 0;
        color: #1f2937;
    }
    
    .contact-info {
        font-size: 11pt;
        color: #6b7280;
        margin-bottom: 5px;
    }
    
    .linkedin {
        font-size: 10pt;
        color: #3b82f6;
        font-style: italic;
    }
    
    .section {
        margin-bottom: 20px;
        page-break-inside: avoid;
    }
    
    .section-title {
        font-size: 14pt;
        font-weight: bold;
        color: #2563eb;
        margin: 0 0 10px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 1px solid #2563eb;
        padding-bottom: 3px;
    }
    
    .summary-text {
        margin: 0;
        text-align: justify;
        line-height: 1.4;
    }
    
    .skills-container {
        display: block;
    }
    
    .skill-category {
        margin-bottom: 8px;
    }
    
    .skill-category-title {
        font-weight: bold;
        color: #374151;
        margin-right: 8px;
    }
    
    .skill-item {
        margin-right: 12px;
        font-size: 10pt;
    }
    
    .job-entry {
        margin-bottom: 18px;
        page-break-inside: avoid;
    }
    
    .job-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5px;
    }
    
    .job-title-company {
        flex: 1;
    }
    
    .job-title {
        font-weight: bold;
        font-size: 12pt;
        color: #1f2937;
    }
    
    .company {
        margin-left: 8px;
        color: #2563eb;
        font-weight: 600;
    }
    
    .job-duration {
        font-size: 10pt;
        color: #6b7280;
        font-style: italic;
    }
    
    .job-location {
        font-size: 10pt;
        color: #9ca3af;
        margin-bottom: 8px;
    }
    
    .achievements {
        margin: 8px 0 0 0;
        padding-left: 18px;
    }
    
    .achievement {
        margin-bottom: 4px;
        line-height: 1.3;
        font-size: 10pt;
    }
    
    .education-entry {
        margin-bottom: 12px;
    }
    
    .education-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .degree {
        font-weight: bold;
        color: #1f2937;
    }
    
    .graduation-year {
        font-size: 10pt;
        color: #6b7280;
        font-style: italic;
    }
    
    .school {
        color: #2563eb;
        font-weight: 600;
        margin-bottom: 3px;
    }
    
    .education-details {
        font-size: 10pt;
        color: #6b7280;
    }
    
    .certifications {
        margin: 0;
        padding-left: 18px;
    }
    
    .certification {
        margin-bottom: 6px;
        font-size: 10pt;
    }
    
    .project-entry {
        margin-bottom: 15px;
    }
    
    .project-name {
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 5px;
    }
    
    .project-description {
        margin-bottom: 5px;
        font-size: 10pt;
    }
    
    .project-tech {
        font-size: 9pt;
        color: #6b7280;
        font-style: italic;
        margin-bottom: 3px;
    }
    
    .project-impact {
        font-size: 10pt;
        color: #059669;
        font-weight: 600;
    }
  `;

  // Style-specific customizations
  const styleCustomizations = {
    professional: `
      .name { color: #1f2937; }
      .section-title { color: #374151; border-bottom-color: #374151; }
      .company, .school { color: #4b5563; }
    `,
    modern: `
      .name { color: #2563eb; }
      .section-title { color: #2563eb; border-bottom-color: #2563eb; }
      .company, .school { color: #3b82f6; }
      .header { border-bottom-color: #3b82f6; }
    `,
    creative: `
      .name { color: #7c3aed; }
      .section-title { color: #8b5cf6; border-bottom-color: #8b5cf6; }
      .company, .school { color: #a855f7; }
      .header { border-bottom-color: #a855f7; }
      .job-title { color: #7c3aed; }
    `
  };

  return baseCSS + (styleCustomizations[style] || styleCustomizations.professional);
}
