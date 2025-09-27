  import React, { useState } from "react";
        // Industry-specific keyword databases
        const industryKeywords = {
            technology: ['agile', 'scrum', 'API', 'cloud', 'DevOps', 'machine learning', 'AI', 'JavaScript', 'Python', 'software development', 'full-stack', 'microservices', 'containerization', 'CI/CD'],
            healthcare: ['patient care', 'clinical', 'HIPAA', 'EMR', 'EHR', 'medical records', 'healthcare administration', 'nursing', 'diagnosis', 'treatment', 'medical terminology', 'quality assurance'],
            finance: ['financial analysis', 'risk management', 'compliance', 'portfolio management', 'investment', 'trading', 'banking', 'financial modeling', 'accounting', 'tax', 'audit', 'regulations'],
            marketing: ['digital marketing', 'SEO', 'SEM', 'social media', 'content marketing', 'brand management', 'campaign management', 'analytics', 'conversion optimization', 'lead generation'],
            sales: ['lead generation', 'CRM', 'sales pipeline', 'closing deals', 'quota achievement', 'customer relationship', 'prospecting', 'negotiation', 'account management', 'revenue growth'],
            hr: ['talent acquisition', 'recruitment', 'employee relations', 'performance management', 'compensation', 'benefits administration', 'HRIS', 'diversity inclusion', 'training development'],
            engineering: ['technical design', 'project management', 'CAD', 'testing', 'quality control', 'manufacturing', 'problem solving', 'research development', 'technical documentation'],
            education: ['curriculum development', 'lesson planning', 'student assessment', 'classroom management', 'educational technology', 'learning outcomes', 'instructional design', 'pedagogy'],
            legal: ['legal research', 'case management', 'litigation', 'contract negotiation', 'compliance', 'regulatory', 'legal writing', 'court proceedings', 'legal analysis'],
            consulting: ['strategic planning', 'process improvement', 'change management', 'stakeholder management', 'project delivery', 'client relations', 'business analysis', 'recommendations']
        };
function formatAsHTML(content) {
  // Returns a string of HTML, so use `dangerouslySetInnerHTML` in JSX
  return content
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p>([A-Z\s&]+)<\/p>/g, '<h2>$1</h2>')
    .replace(/<p>•\s*(.+)<\/p>/g, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/g, '');
       function App() {
  const [resumeInput, setResumeInput] = useState("");
  const [jobDescInput, setJobDescInput] = useState("");
  const [industrySelect, setIndustrySelect] = useState("");
            if (!resumeText || !jobDescText) {
                showStatus('Please fill in both the resume and job description fields.', 'error');
                return;
            }
            showProgress();
            showStatus('Analyzing job description and optimizing resume...', 'info');
            // Simulate processing with progress updates
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress > 90) progress = 90;
                updateProgress(progress);
            }, 200);
            setTimeout(() => {
                clearInterval(progressInterval);
                updateProgress(100);
                const industry = selectedIndustry || detectIndustry(jobDescText);
                const optimizedResume = generateOptimizedResume(resumeText, jobDescText, industry);
                optimizedResumeData = optimizedResume;
                displayOptimizedResume(optimizedResume);
                updateOptimizationStats(optimizedResume.stats);
                hideProgress();
                showStatus('Resume optimization completed successfully!', 'success');
            }, 3000);
        }
        function detectIndustry(jobDesc) {
            const text = jobDesc.toLowerCase();
            let maxScore = 0;
            let detectedIndustry = 'general';   
            for (const [industry, keywords] of Object.entries(industryKeywords)) {
                let score = 0;
                keywords.forEach(keyword => {
                    if (text.includes(keyword.toLowerCase())) {
                        score++;
                    }
                });
                if (score > maxScore) {
                    maxScore = score;
                    detectedIndustry = industry;
                }
            }
            return detectedIndustry;
        }
        function generateOptimizedResume(resume, jobDesc, industry) {
            const jobKeywords = extractKeywords(jobDesc);
            const industryKeywordList = industryKeywords[industry] || [];
            const sections = parseResume(resume);
            const resumeKeywords = extractKeywords(resume);   
            // Combine and prioritize keywords
            const priorityKeywords = [...new Set([...jobKeywords.slice(0, 15), ...industryKeywordList.slice(0, 10)])];
            const newKeywords = priorityKeywords.filter(k => !resumeKeywords.includes(k));
            // Calculate realistic optimization stats
            const matchScore = Math.min(95, Math.round((resumeKeywords.filter(k => priorityKeywords.includes(k)).length / priorityKeywords.length) * 100) + 30);
            const atsScore = Math.min(98, matchScore + 5 + Math.random() * 5);
            const optimizedContent = createOptimizedContent(sections, priorityKeywords, industry, resume);
            return {
                content: optimizedContent,
                stats: {
                    matchScore: Math.round(matchScore),
                    keywordsAdded: newKeywords.length,
                    sectionsOptimized: 6,
                    atsScore: Math.round(atsScore)
                },
                keywords: priorityKeywords,
                industry,
                originalSections: sections
            };
        }
        function createOptimizedContent(sections, keywords, industry, originalResume) {
            // Extract actual name and contact info from original resume
            const lines = originalResume.split('\n').filter(line => line.trim());
            const name = lines[0] || 'Professional Candidate';   
            const emailMatch = originalResume.match(/[\w\.-]+@[\w\.-]+\.\w+/);
            const phoneMatch = originalResume.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
            const linkedinMatch = originalResume.match(/linkedin\.com\/in\/[\w-]+/i);
            const email = emailMatch ? emailMatch[0] : 'email@example.com';
            const phone = phoneMatch ? phoneMatch[0] : '(555) 123-4567';
            const linkedin = linkedinMatch ? linkedinMatch[0] : 'linkedin.com/in/profile';
            const jobTitleFromResume = extractJobTitle(originalResume, industry);
            const optimizedContent = `${name}
${jobTitleFromResume}
📧 ${email} | 📱 ${phone} | 💼 ${linkedin} | 📍 Location
PROFESSIONAL SUMMARY
${generateOptimizedSummary(sections.summary || '', keywords, industry)}
CORE COMPETENCIES
${generateCoreCompetencies(keywords, industry)}
PROFESSIONAL EXPERIENCE
${optimizeExperienceSection(sections.experience || '', keywords, industry)}
KEY ACHIEVEMENTS
${generateKeyAchievements(keywords, industry)}
EDUCATION
${sections.education || generateEducationSection(originalResume)}
TECHNICAL PROFICIENCIES
${generateTechnicalSkills(keywords, industry)}`;
            return optimizedContent;
        }
        function extractJobTitle(resume, industry) {
            const titlePatterns = [
                /(?:Senior|Lead|Principal|Chief)\s+[\w\s]+(?:Engineer|Manager|Developer|Analyst|Specialist|Director)/gi,
                /[\w\s]+(?:Engineer|Manager|Developer|Analyst|Specialist|Director|Coordinator|Administrator)/gi
            ];   
            for (const pattern of titlePatterns) {
                const matches = resume.match(pattern);
                if (matches && matches.length > 0) {
                    return matches[0].trim();
                }
            }
            const defaultTitles = {
                technology: 'Senior Software Engineer',
                healthcare: 'Healthcare Professional',
                finance: 'Financial Analyst',
                hr: 'HR Manager',
                marketing: 'Marketing Specialist',
                sales: 'Sales Manager',
                engineering: 'Senior Engineer',
                education: 'Education Professional',
                legal: 'Legal Professional',
                consulting: 'Senior Consultant'
            };
            return defaultTitles[industry] || 'Professional';
        }
        function generateOptimizedSummary(originalSummary, keywords, industry) {
            if (originalSummary && originalSummary.length > 50) {
                // Enhance existing summary with keywords
                let enhanced = originalSummary;
                const missingKeywords = keywords.slice(0, 4).filter(k => 
                    !originalSummary.toLowerCase().includes(k.toLowerCase())
                );       
                if (missingKeywords.length > 0) {
                    enhanced += ` Specialized expertise in ${missingKeywords.join(', ')}.`;
                }
                return enhanced;
            }
            const summaryTemplates = {
                technology: `Results-driven technology professional with expertise in ${keywords.slice(0, 4).join(', ')}. Proven track record of delivering scalable solutions and driving digital transformation initiatives. Strong background in software development, system architecture, and team leadership.`,
                healthcare: `Dedicated healthcare professional with comprehensive experience in ${keywords.slice(0, 4).join(', ')}. Committed to delivering exceptional patient care and improving healthcare outcomes through evidence-based practices and continuous improvement.`,
                finance: `Strategic finance professional with deep expertise in ${keywords.slice(0, 4).join(', ')}. Track record of driving financial performance, managing complex portfolios, and delivering actionable insights to senior leadership.`,
                hr: `Strategic HR professional with extensive experience in ${keywords.slice(0, 4).join(', ')}. Proven ability to build high-performing teams, drive organizational excellence, and implement innovative people strategies.`,
                marketing: `Creative marketing professional specializing in ${keywords.slice(0, 4).join(', ')}. Demonstrated success in developing data-driven campaigns, building brand awareness, and driving customer engagement across multiple channels.`,
                sales: `Results-oriented sales professional with expertise in ${keywords.slice(0, 4).join(', ')}. Consistent track record of exceeding quotas, building lasting client relationships, and driving revenue growth in competitive markets.`,
                default: `Accomplished professional with proven expertise in ${keywords.slice(0, 4).join(', ')}. Demonstrated success in driving results, leading teams, and exceeding organizational objectives through strategic thinking and execution.`
            };
            return summaryTemplates[industry] || summaryTemplates.default;
        }
        function optimizeExperienceSection(originalExperience, keywords, industry) {
            if (originalExperience && originalExperience.length > 100) {
                // Enhance existing experience with keywords
                let optimized = originalExperience;       
                // Add strategic keywords to bullet points
                const keywordBullets = keywords.slice(0, 3).map(keyword => 
                    `• Leveraged ${keyword} to drive operational excellence and exceed performance targets`
                ).join('\n');
                return optimized + '\n\nADDITIONAL CONTRIBUTIONS\n' + keywordBullets;
            }
            return `Current Position | Company Name | Date Range
• Implemented ${keywords[0]} strategies resulting in 25% improvement in operational efficiency
• Led cross-functional teams in ${keywords[1]} initiatives across multiple departments
• Developed and executed ${keywords[2]} programs that enhanced organizational performance
• Collaborated with stakeholders to deliver ${keywords[3]} solutions exceeding expectations
• Mentored team members and established best practices for ${keywords[4] || 'professional development'
Previous Position | Previous Company | Date Range  
• Managed ${keywords[5] || 'key projects'} with budget responsibility and stakeholder coordination
• Streamlined processes using ${keywords[6] || 'innovative approaches'} reducing costs by 20%
• Built strategic partnerships and maintained relationships with key clients and vendors`;
        }
        function generateEducationSection(originalResume) {
            // Try to extract education from original resume
            const educationSection = originalResume.match(/EDUCATION[\s\S]*?(?=\n[A-Z]{2,}|\n\n|$)/i);
            if (educationSection && educationSection[0].length > 20) {
                return educationSection[0].replace(/EDUCATION\s*/i, '').trim();
            }   
            const degreeMatch = originalResume.match(/(?:Bachelor|Master|PhD|Associate)[\w\s,]+(?:University|College|Institute)/gi);
            if (degreeMatch) {
                return degreeMatch[0];
            }
            return 'Bachelor\'s Degree | Relevant University | Graduation Year';
        }
        function generateProfessionalSummary(keywords, industry) {
            const summaryTemplates = {
                technology: `Results-driven software professional with expertise in ${keywords.slice(0, 4).join(', ')}. Proven track record of delivering scalable solutions and driving digital transformation initiatives.`,
                healthcare: `Dedicated healthcare professional with comprehensive experience in ${keywords.slice(0, 4).join(', ')}. Committed to delivering exceptional patient care and improving healthcare outcomes.`,
                finance: `Strategic finance professional with deep expertise in ${keywords.slice(0, 4).join(', ')}. Track record of driving financial performance and managing complex investment portfolios.`,
                hr: `Strategic HR professional with extensive experience in ${keywords.slice(0, 4).join(', ')}. Proven ability to build high-performing teams and drive organizational excellence.`,
                default: `Accomplished professional with proven expertise in ${keywords.slice(0, 4).join(', ')}. Demonstrated success in driving results and exceeding organizational objectives.`
            };   
          if (industryTechSkills[industry]) {
      skills.push(...industryTechSkills[industry]);
          }
            return summaryTemplates[industry] || summaryTemplates.default;
        }
        function generateCoreCompetencies(keywords, industry) {
            const competencies = keywords.slice(0, 12).map(skill => {
                return skill.charAt(0).toUpperCase() + skill.slice(1).replace(/[-_]/g, ' ');
            });   
            // Organize in columns for better readability
            const leftColumn = competencies.slice(0, 6);
            const rightColumn = competencies.slice(6, 12);
            let result = '';
            for (let i = 0; i < Math.max(leftColumn.length, rightColumn.length); i++) {
                const left = leftColumn[i] ? `• ${leftColumn[i]}` : '';
                const right = rightColumn[i] ? `• ${rightColumn[i]}` : '';
                result += `${left.padEnd(35)} ${right}\n`;
            }
            return result.trim();
        }
        function generateSampleExperience(keywords, industry) {
            return `Current Position | Company Name | Date Range
• Implemented ${keywords[0]} strategies resulting in 25% improvement in efficiency
• Led cross-functional teams in ${keywords[1]} initiatives across multiple departments
• Developed and executed ${keywords[2]} programs that enhanced operational performance
• Collaborated with stakeholders to deliver ${keywords[3]} solutions exceeding expectations`;
        }
        function generateKeyAchievements(keywords, industry) {
            const achievements = [
                `Successfully delivered ${keywords[0] || 'key projects'} 15% ahead of schedule and under budget`,
                `Increased team productivity by 30% through implementation of ${keywords[1] || 'innovative'} methodologies`,
                `Recognized for excellence in ${keywords[2] || 'professional performance'} with company-wide achievement award`,
                `Mentored junior team members in ${keywords[3] || 'best practices'} and professional development`
            ];   
            return achievements.map(achievement => `• ${achievement}`).join('\n');
        }
        function generateTechnicalSkills(keywords, industry) {
            // Filter for technical-sounding keywords
            const techKeywords = keywords.filter(k => {
                const techTerms = ['software', 'system', 'platform', 'tool', 'technology', 'programming', 'database', 'cloud', 'api', 'framework'];
                return techTerms.some(term => k.toLowerCase().includes(term)) || k.length < 15;
            });   
            const skills = techKeywords.slice(0, 15).map(skill => 
                skill.charAt(0).toUpperCase() + skill.slice(1)
            );
            // Add industry-specific technical skills
            const industryTechSkills = {
                technology: ['Agile Methodologies', 'DevOps', 'Cloud Computing', 'Version Control'],
                healthcare: ['Electronic Health Records', 'HIPAA Compliance', 'Medical Software'],
                finance: ['Financial Modeling', 'Risk Analysis', 'Bloomberg Terminal'],
                hr: ['HRIS Systems', 'Applicant Tracking Systems', 'Performance Management Tools']
            };
            if (industryTechSkills[industry]) {
                skills.push(...industryTechSkills[industry]);
            }
            return [...new Set(skills)].slice(0, 12).join(' • ');
        }
        function generateCertifications(industry) {
            const certifications = {
                technology: 'AWS Certified Solutions Architect • Certified Scrum Master • PMP',
                healthcare: 'BLS Certified • HIPAA Compliance Training • Healthcare Quality Certification',
                finance: 'CFA Level II • FRM Certification • Series 7 Licensed',
                hr: 'SHRM-CP • PHR Certified • Diversity & Inclusion Certificate',
                default: 'Industry-Relevant Certifications • Professional Development Courses'
            };   
            return certifications[industry] || certifications.default;
        }
        function extractKeywords(text) {
            const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
            const words = text.toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .split(/\s+/)
                .filter(word => word.length > 3 && !commonWords.includes(word));   
            const wordCount = {};
            words.forEach(word => {
                wordCount[word] = (wordCount[word] || 0) + 1;
            });
            return Object.keys(wordCount)
                .sort((a, b) => wordCount[b] - wordCount[a])
                .slice(0, 20);
        }
        function parseResume(resume) {
            const sections = {};
            const text = resume.toLowerCase()
            const lines = resume.split('\n').filter(line => line.trim());
            sections.header = lines.slice(0, 3).join('\n');   
            const sectionHeaders = {
                summary: /(?:professional\s+summary|summary|profile|objective)/i,
                experience: /(?:professional\s+experience|work\s+experience|experience|employment)/i,
                education: /(?:education|academic\s+background|qualifications)/i,
                skills: /(?:skills|technical\s+skills|core\s+competencies|competencies)/i,
                achievements: /(?:achievements|accomplishments|key\s+achievements)/i
            };
            for (const [sectionName, pattern] of Object.entries(sectionHeaders)) {
                const match = resume.match(new RegExp(pattern.source + '[\\s\\S]*?(?=\\n[A-Z]{2,}[\\s\\S]*?\\n|$)', 'i'));
                if (match) {
                    sections[sectionName] = match[0].replace(pattern, '').trim();
                }
            }
            if (!sections.experience) {
                // Look for job titles with companies and dates
                const jobPattern = /[\w\s]+\s*\|\s*[\w\s]+\s*\|\s*[\d\-\s\/]+/g;
                const jobs = resume.match(jobPattern);
                if (jobs && jobs.length > 0) {
                    sections.experience = jobs.join('\n');
                }
            }
            if (!sections.education) {
                // Look for degree patterns
                const degreePattern = /(?:Bachelor|Master|PhD|Associate)[\w\s,]+(?:University|College|Institute)[\w\s,]*(?:\d{4})?/gi;
                const degrees = resume.match(degreePattern);
                if (degrees) {
                    sections.education = degrees.join('\n');
                }
            }
            return sections;
        }
        function displayOptimizedResume(optimizedResume) {
            const preview = document.getElementById('resumePreview');   
            if (currentFormat === 'html') {
                preview.innerHTML = formatAsHTML(optimizedResume.content);
                preview.classList.add('html-format');
            } else if (currentFormat === 'json') {
                preview.textContent = JSON.stringify(optimizedResume, null, 2);
                preview.classList.remove('html-format');
            } else {
                preview.textContent = optimizedResume.content;
                preview.classList.remove('html-format');
            }
        }
        function formatAsHTML(content) {
            return content
                .replace(/^(.+)$/gm, '<p>$1</p>')
                .replace(/<p>([A-Z\s&]+)<\/p>/g, '<h2>$1</h2>')
                .replace(/<p>•\s*(.+)<\/p>/g, '<li>$1</li>')
                .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
                .replace(/<\/ul>\s*<ul>/g, '');
        }
        function App() {
  const [resumeInput, setResumeInput] = useState("");
  const [jobDescInput, setJobDescInput] = useState("");
  const [industrySelect, setIndustrySelect] = useState("");
  const [industryOptions, setIndustryOptions] = useState([]);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const [currentFormat, setCurrentFormat] = useState("text");
  const [optimizedResumeData, setOptimizedResumeData] = useState(null);
  const [optimizationStats, setOptimizationStats] = useState(null)
    function setFormat(format) {
             setCurrentFormat(format);
  }
        function updateOptimizationStats(stats)  {
    setOptimizationStats(stats)
        }
        function showProgress() {
        setProgressVisible(true);
        }
        function hideProgress() {
             setProgressVisible(false);
        }
        function updateProgress(percent) {
              setProgress(percent);
        }
      function copyToClipboard() {
    let text;
    if (!optimizedResumeData) return;
    if (currentFormat === "json") {
      text = JSON.stringify(optimizedResumeData, null, 2);
    } else if (currentFormat === "html") {
      text = formatAsHTML(optimizedResumeData.content);
    } else {
      text = optimizedResumeData.content;
    }
    navigator.clipboard.writeText(text)
      .then(() => showStatus('Resume copied to clipboard!', 'success'))
      .catch(() => showStatus('Faile
            });
        }
// ---- Download resume ----
          function downloadResume() {
            if (!optimizedResumeData) {
                showStatus('Please optimize a resume first.', 'error');
                return;
            }   
            const content = currentFormat === 'json' 
                ? JSON.stringify(optimizedResumeData, null, 2)
                : optimizedResumeData.content;
            const extension = currentFormat === 'json' ? 'json' : 'txt';
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `optimized_resume.${extension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showStatus('Resume downloaded successfully!', 'success');
        }
        function printResume() {
            if (!optimizedResumeData) {
                showStatus('Please optimize a resume first.', 'error');
                return;
            }   
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Optimized Resume</title>
                    <style>
                        body { font-family: Georgia, serif; line-height: 1.6; margin: 0.5in; }
                        h1, h2 { color: #1e293b; }
                        h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                        ul { margin: 0; padding-left: 20px; }
                        li { margin-bottom: 5px; }
                    </style>
                </head>
                <body>
                ${currentFormat === 'html'
          ? formatAsHTML(optimizedResumeData.content)
          : `<pre>${currentFormat === 'json'
            ? JSON.stringify(optimizedResumeData, null, 2)
            : optimizedResumeData.content}</pre>`
        }
                </body>
                </import React, { useState } from "react";>
            `);
            printWindow.document.close();
            printWindow.print();
        }
        function emailResume() {
            if (!optimizedResumeData) {
                showStatus('Please optimize a resume first.', 'error');
                return;
            }   
            const subject = encodeURIComponent('Optimized Resume');
            const body = encodeURIComponent(optimizedResumeData.content);
            const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;   
            window.location.href = mailtoUrl;
        }
        function clearAll() {
    setResumeInput('');
    setJobDescInput('');
    setIndustrySelect('');
    setIndustryOptions([]);
    setOptimizedResumeData(null);
    setOptimizationStats(null);
    hideProgressBar();
    showStatus('All fields cleared.', 'info');
         }
        // ---- Status message handler ----
  function showStatus(message, type) {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage({ message: "", type: "" }), 5000);
        }
        // Auto-resize textareas
        document.addEventListener('DOMContentLoaded', function() {
            const textareas = document.querySelectorAll('.textarea');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.min(this.scrollHeight, 400) + 'px';
                });
            });
        });
        // Sample data loader
        function loadSampleData() {
            const sampleResume = `John Smith
Senior Software Engineer
Email: john.smith@email.com | Phone: (555) 123-4567 | LinkedIn: linkedin.com/in/johnsmith
PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years developing scalable web applications and leading cross-functional teams.
EXPERIENCE
Senior Software Engineer | Tech Company | 2020 - Present
• Developed and maintained web applications using JavaScript and Python
• Led a team of 4 developers on multiple projects
• Improved application performance by 40%
Software Engineer | Previous Company | 2018 - 2020
• Built RESTful APIs and microservices
• Collaborated with product managers and designers
• Implemented automated testing frameworks
EDUCATION
Bachelor of Science in Computer Science | University Name | 2018
SKILLS
JavaScript, Python, React, Node.js, AWS, Docker, Git`;
            const sampleJobDesc = `Senior Full Stack Developer
We are seeking a talented Senior Full Stack Developer to join our growing engineering team.
Requirements:
• 5+ years of experience in software development
• Proficiency in JavaScript, React, Node.js
• Experience with cloud platforms (AWS, Azure)
• Knowledge of microservices architecture
• Strong problem-solving skills
• Experience with agile methodologies
• Bachelor's degree in Computer Science or related field
Responsibilities:
• Design and develop scalable web applications
• Collaborate with cross-functional teams
• Mentor junior developers
• Participate in code reviews
• Implement best practices for security and performance`;
            setResumeInput(sampleResume);
    setJobDescInput(sampleJobDesc);
    setIndustrySelect("technology");
    setIndustryOptions([]);
    showStatus('Sample data loaded. Click "Optimize Resume" to see the tool in action!', 'info');
  }
  // ---- Handler for textarea auto-resize (optional, can be done with CSS too) ----
  // In React, you can use style={{height: ...}} or a small useEffect if you want this.
  // ---- Handler for Industry change ----
  function handleIndustryChange(e) {
    const industry = e.target.value;
    setIndustrySelect(industry);
    setIndustryOptions(industry ? industryKeywords[industry] : []);
  }
  // ---- Render ----
  return (
    <div className="container">
      <h1>🚀 Universal Resume Optimizer</h1>
      <div className="main-section">
        <div className="input-grid">
          <div className="input-group">
            <h3>📄 Your Current Resume</h3>
            <textarea
              value={resumeInput}
              onChange={e => setResumeInput(e.target.value)}
              placeholder="Paste your complete resume text here including contact info, experience, education, skills, etc..."
              spellCheck={false}
              className="textarea"
            />
          </div>
          <div className="input-group">
            <h3>🎯 Target Job Description</h3>
            <textarea
              value={jobDescInput}
              onChange={e => setJobDescInput(e.target.value)}
              placeholder="Paste the complete job description here including requirements, responsibilities, qualifications, etc..."
              spellCheck={false}
              className="textarea"
            />
          </div>
          <div className="input-group industry-selector">
            <h3>🏭 Industry Focus</h3>
            <select
              value={industrySelect}
              onChange={handleIndustryChange}
              className="select"
            >
              <option value="">Auto-detect from job description</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="hr">Human Resources</option>
              <option value="engineering">Engineering</option>
              <option value="education">Education</option>
              <option value="legal">Legal</option>
              <option value="consulting">Consulting</option>
            </select>
            <div className="industry-options">
              {industryOptions.length > 0 ? (
                <>
                  <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>
                    Key Skills for {industrySelect.charAt(0).toUpperCase() + industrySelect.slice(1)}:
                  </h4>
                  {industryOptions.map((keyword, idx) => (
                    <div key={idx} className="industry-option">{keyword}</div>
                  ))}
                </>
              ) : (
                <div style={{ color: "#64748b", fontStyle: "italic" }}>
                  Select an industry to see relevant keywords
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="controls">
          <button className="btn btn-primary" onClick={optimizeResume}>
            ✨ Optimize Resume
          </button>
          <button className="btn btn-secondary" onClick={clearAll}>
            🗑️ Clear All
          </button>
          <button className="btn btn-secondary" onClick={loadSampleData}>
            🎯 Load Sample Data
          </button>
        </div>
        {progressVisible && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        {optimizationStats && (
          <div className="optimization-stats" style={{ display: 'grid' }}>
            <div className="stat-card">
              <div className="stat-number">{optimizationStats.matchScore}%</div>
              <div className="stat-label">Keyword Match Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{optimizationStats.keywordsAdded}</div>
              <div className="stat-label">Keywords Added</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{optimizationStats.sectionsOptimized}</div>
              <div className="stat-label">Sections Optimized</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{optimizationStats.atsScore}%</div>
              <div className="stat-label">ATS Compatibility</div>
            </div>
          </div>
        )}
      </div>
      <div className="output-section">
        <div className="output-header">
          <h3 className="output-title">📋 Optimized Resume</h3>
          <div className="format-selector">
            <button className={`format-btn ${currentFormat === 'text' ? 'active' : ''}`} onClick={() => handleSetFormat('text')} id="textBtn">Text</button>
            <button className={`format-btn ${currentFormat === 'html' ? 'active' : ''}`} onClick={() => handleSetFormat('html')} id="htmlBtn">HTML</button>
            <button className={`format-btn ${currentFormat === 'json' ? 'active' : ''}`} onClick={() => handleSetFormat('json')} id="jsonBtn">JSON</button>
          </div>
        </div>
        <div id="resumePreview" className={`resume-preview ${currentFormat === 'html' ? 'html-format' : ''}`}>
          {!optimizedResumeData ? (
            <>Your optimized resume will appear here after processing...<br />
              Click "Optimize Resume" to get started with AI-powered optimization that includes:
              <br />• Industry-specific keyword integration
              <br />• ATS-friendly formatting
              <br />• Skills alignment with job requirements
              <br />• Professional summary enhancement
              <br />• Achievement quantification
              <br />• Section reorganization for impact
            </>
          ) : currentFormat === 'json' ? (
            <pre>{JSON.stringify(optimizedResumeData, null, 2)}</pre>
          ) : currentFormat === 'html' ? (
            <div dangerouslySetInnerHTML={{ __html: formatAsHTML(optimizedResumeData.content) }} />
          ) : (
            <pre>{optimizedResumeData.content}</pre>
          )}
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={copyToClipboard}>
            📋 Copy to Clipboard
          </button>
          <button className="btn btn-secondary" onClick={downloadResume}>
            💾 Download
          </button>
          <button className="btn btn-secondary" onClick={printResume}>
            🖨️ Print
          </button>
          <button className="btn btn-secondary" onClick={emailResume}>
            📧 Email
          </button>
        </div>
        {statusMessage.message && (
          <div id="statusMessage" className={`status-message status-${statusMessage.type}`}>
            {statusMessage.message}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
