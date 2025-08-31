// File: api/download-resume-pdf.js
// Complete PDF resume generation with jsPDF

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

    // Import jsPDF dynamically for serverless environment
    const { jsPDF } = await import('jspdf');
    
    // Create PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = 25;

    // Color scheme based on style
    const colorSchemes = {
      professional: { primary: '#000000', secondary: '#555555', accent: '#2563eb' },
      modern: { primary: '#1f2937', secondary: '#6b7280', accent: '#3b82f6' },
      creative: { primary: '#1e40af', secondary: '#64748b', accent: '#8b5cf6' }
    };
    
    const colors = colorSchemes[stylePreference] || colorSchemes.professional;

    // Helper functions
    const addText = (text, fontSize = 11, color = colors.primary, isBold = false, isItalic = false) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 25;
      }

      doc.setFontSize(fontSize);
      doc.setTextColor(color);
      
      let fontStyle = 'normal';
      if (isBold && isItalic) fontStyle = 'bolditalic';
      else if (isBold) fontStyle = 'bold';
      else if (isItalic) fontStyle = 'italic';
      
      doc.setFont('helvetica', fontStyle);
      
      const maxWidth = pageWidth - (margin * 2);
      const lines = doc.splitTextToSize(text, maxWidth);
      
      doc.text(lines, margin, yPosition);
      yPosition += (lines.length * (fontSize * 0.35)) + 3;
      
      return yPosition;
    };

    const addSectionHeader = (title) => {
      yPosition += 8;
      doc.setTextColor(colors.accent);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin, yPosition);
      
      // Add underline
      const textWidth = doc.getTextWidth(title.toUpperCase());
      doc.setDrawColor(colors.accent);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition + 1, margin + textWidth, yPosition + 1);
      
      yPosition += 8;
    };

    const addBulletPoint = (text, indent = 5) => {
      const bulletX = margin + indent;
      const textX = bulletX + 5;
      
      doc.setTextColor(colors.accent);
      doc.setFontSize(10);
      doc.text('•', bulletX, yPosition);
      
      doc.setTextColor(colors.primary);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const maxWidth = pageWidth - textX - margin;
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, textX, yPosition);
      
      yPosition += (lines.length * 3.5) + 2;
    };

    // Document Header
    const resume = optimizedResume.optimizedResume || optimizedResume;
    
    // Name (Large, Bold)
    doc.setFontSize(24);
    doc.setTextColor(colors.primary);
    doc.setFont('helvetica', 'bold');
    doc.text(resume.personalInfo.name, margin, yPosition);
    yPosition += 12;

    // Contact Information
    const contactInfo = [
      resume.personalInfo.email,
      resume.personalInfo.phone,
      resume.personalInfo.location,
      resume.personalInfo.linkedin
    ].filter(Boolean).join(' • ');

    doc.setFontSize(10);
    doc.setTextColor(colors.secondary);
    doc.setFont('helvetica', 'normal');
    doc.text(contactInfo, margin, yPosition);
    yPosition += 15;

    // Professional Summary
    if (resume.professionalSummary) {
      addSectionHeader('Professional Summary');
      addText(resume.professionalSummary, 11, colors.primary);
    }

    // Core Competencies
    if (resume.skills || resume.coreCompetencies) {
      addSectionHeader('Core Competencies');
      
      const skills = resume.coreCompetencies || 
        (resume.skills ? Object.values(resume.skills).flat() : []);
      
      if (skills.length > 0) {
        // Display skills in rows of 3
        const skillsPerRow = 3;
        for (let i = 0; i < skills.length; i += skillsPerRow) {
          const rowSkills = skills.slice(i, i + skillsPerRow);
          const skillText = rowSkills.join(' • ');
          addText(skillText, 10, colors.primary);
        }
      }
    }

    // Professional Experience
    if (resume.experience && resume.experience.length > 0) {
      addSectionHeader('Professional Experience');
      
      resume.experience.forEach((exp, index) => {
        // Job title and company (bold)
        const jobHeader = `${exp.title} | ${exp.company}`;
        addText(jobHeader, 12, colors.primary, true);
        
        // Duration and location
        const jobDetails = `${exp.duration}${exp.location ? ` • ${exp.location}` : ''}`;
        addText(jobDetails, 9, colors.secondary, false, true);
        yPosition += 2;
        
        // Achievements/Responsibilities
        const achievements = exp.achievements || exp.responsibilities || [];
        achievements.forEach(achievement => {
          addBulletPoint(achievement);
        });
        
        if (index < resume.experience.length - 1) {
          yPosition += 5;
        }
      });
    }

    // Education
    if (resume.education && resume.education.length > 0) {
      addSectionHeader('Education');
      
      resume.education.forEach(edu => {
        const eduText = `${edu.degree} | ${edu.school} | ${edu.year}`;
        addText(eduText, 11, colors.primary, true);
        
        if (edu.relevant || edu.details) {
          addText(edu.relevant || edu.details, 10, colors.secondary);
        }
      });
    }

    // Certifications
    if (resume.certifications && resume.certifications.length > 0) {
      addSectionHeader('Certifications');
      resume.certifications.forEach(cert => {
        addBulletPoint(cert);
      });
    }

    // Projects (if applicable)
    if (resume.projects && resume.projects.length > 0) {
      addSectionHeader('Notable Projects');
      
      resume.projects.forEach(project => {
        addText(project.name, 11, colors.primary, true);
        addText(project.description, 10, colors.primary);
        
        if (project.technologies && project.technologies.length > 0) {
          const techText = `Technologies: ${project.technologies.join(', ')}`;
          addText(techText, 9, colors.secondary, false, true);
        }
        yPosition += 3;
      });
    }

    // Generate PDF
    const pdfBytes = doc.output('arraybuffer');

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="optimized-resume.pdf"');
    res.setHeader('Content-Length', pdfBytes.byteLength);

    // Send PDF
    res.end(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    });
  }
}
