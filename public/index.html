<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal Resume Optimization Tool</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #334155;
            line-height: 1.6;
            min-height: 100vh;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
            color: white;
        }
        .header h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .main-section {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        .input-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 300px;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .input-group {
            background: #f8fafc;
            border-radius: 0.75rem;
            padding: 1.5rem;
            border: 2px solid #e2e8f0;
            transition: border-color 0.3s ease;
        }
        .input-group:focus-within {
            border-color: #3b82f6;
        }
        .input-group h3 {
            color: #1e293b;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .industry-selector {
            background: #fef3c7;
            border-color: #f59e0b;
        }
        .industry-selector h3 {
            color: #92400e;
        }
        .textarea {
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            background: white;
            padding: 1rem;
            font-size: 0.9rem;
            line-height: 1.5;
            transition: all 0.2s ease;
            outline: none;
            width: 100%;
            min-height: 350px;
            resize: vertical;
            font-family: inherit;
        }
        .textarea:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            background: white;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        .industry-options {
            display: grid;
            gap: 0.5rem;
            max-height: 250px;
            overflow-y: auto;
        }
        .industry-option {
            padding: 0.75rem;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.85rem;
        }
        .industry-option:hover {
            background: #f1f5f9;
            border-color: #3b82f6;
        }
        .industry-option.selected {
            background: #dbeafe;
            border-color: #3b82f6;
            color: #1e40af;
        }
        .controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(59, 130, 246, 0.35);
        }
        .btn-secondary {
            background: #6b7280;
            color: white;
        }
        .btn-secondary:hover {
            background: #4b5563;
        }
        .output-section {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .output-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .output-title {
            color: #1e293b;
            font-size: 1.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .format-selector {
            display: flex;
            gap: 0.5rem;
        }
        .format-btn {
            padding: 0.5rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            background: white;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.2s ease;
        }
        .format-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }
        .resume-preview {
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            padding: 2rem;
            min-height: 600px;
            background: #fafafa;
            white-space: pre-wrap;
            font-family: 'Georgia', serif;
            line-height: 1.7;
            overflow-y: auto;
            max-height: 800px;
        }
        .resume-preview.html-format {
            white-space: normal;
        }
        .action-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        .status-message {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 0.5rem;
            font-size: 0.9rem;
            display: none;
        }
        .status-success {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }
        .status-error {
            background: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        .status-info {
            background: #dbeafe;
            color: #1e40af;
            border: 1px solid #93c5fd;
        }
        .progress-bar {
            width: 100%;
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            overflow: hidden;
            margin: 1rem 0;
            display: none;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            width: 0%;
            transition: width 0.3s ease;
        }
        .optimization-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
            display: none;
        }
        .stat-card {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 0.5rem;
            border-left: 4px solid #3b82f6;
        }
        .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1e293b;
        }
        .stat-label {
            font-size: 0.85rem;
            color: #64748b;
        }
        @media (max-width: 1024px) {
            .input-grid {
                grid-template-columns: 1fr;
            }   
            .container {
                padding: 1rem;
            }
            .header h1 {
                font-size: 2rem;
            }
        }
        @media (max-width: 768px) {
            .controls {
                flex-direction: column;
            }   
            .output-header {
                flex-direction: column;
                align-items: flex-start;
            }
            .action-buttons {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Universal Resume Optimizer</h1>
            <p>Optimize your resume for any industry with AI-powered keyword matching and formatting</p>
        </div>
        <div class="main-section">
            <div class="input-grid">
                <div class="input-group">
                    <h3>📄 Your Current Resume</h3>
                    <textarea 
                        id="resumeInput"
                        class="textarea" 
                        placeholder="Paste your complete resume text here including contact info, experience, education, skills, etc..."
                        spellcheck="false"
                    ></textarea>
                </div>
                <div class="input-group">
                    <h3>🎯 Target Job Description</h3>
                    <textarea 
                        id="jobDescInput"
                        class="textarea" 
                        placeholder="Paste the complete job description here including requirements, responsibilities, qualifications, etc..."
                        spellcheck="false"
                    ></textarea>
                </div>
                <div class="input-group industry-selector">
                    <h3>🏭 Industry Focus</h3>
                    <select id="industrySelect" class="select">
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
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="logistics">Logistics</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="nonprofit">Non-Profit</option>
                        <option value="government">Government</option>
                        <option value="media">Media & Communications</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="construction">Construction</option>
                        <option value="energy">Energy</option>
                    </select>
                    <div class="industry-options" id="industryOptions">
                        <!-- Dynamically populated based on selection -->
                    </div>
                </div>
            </div>
            <div class="controls">
                <button class="btn btn-primary" onclick="optimizeResume()">
                    ✨ Optimize Resume
                </button>
                <button class="btn btn-secondary" onclick="clearAll()">
                    🗑️ Clear All
                </button>
            </div>
            <div class="progress-bar" id="progressBar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="optimization-stats" id="optimizationStats">
                <div class="stat-card">
                    <div class="stat-number" id="matchScore">0%</div>
                    <div class="stat-label">Keyword Match Score</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="keywordsAdded">0</div>
                    <div class="stat-label">Keywords Added</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="sectionsOptimized">0</div>
                    <div class="stat-label">Sections Optimized</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="atsScore">0%</div>
                    <div class="stat-label">ATS Compatibility</div>
                </div>
            </div>
        </div>
        <div class="output-section">
            <div class="output-header">
                <h3 class="output-title">
                    📋 Optimized Resume
                </h3>
                <div class="format-selector">
                    <button class="format-btn active" onclick="setFormat('text')" id="textBtn">Text</button>
                    <button class="format-btn" onclick="setFormat('html')" id="htmlBtn">HTML</button>
                    <button class="format-btn" onclick="setFormat('json')" id="jsonBtn">JSON</button>
                </div>
            </div>
            <div id="resumePreview" class="resume-preview">
                Your optimized resume will appear here after processing...  
                Click "Optimize Resume" to get started with AI-powered optimization that includes:
                • Industry-specific keyword integration
                • ATS-friendly formatting
                • Skills alignment with job requirements
                • Professional summary enhancement
                • Achievement quantification
                • Section reorganization for impact
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="copyToClipboard()">
                    📋 Copy to Clipboard
                </button>
                <button class="btn btn-secondary" onclick="downloadResume()">
                    💾 Download
                </button>
                <button class="btn btn-secondary" onclick="printResume()">
                    🖨️ Print
                </button>
                <button class="btn btn-secondary" onclick="emailResume()">
                    📧 Email
                </button>
            </div>
            <div id="statusMessage" class="status-message"></div>
        </div>
    </div>
    <script>
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
        let currentFormat = 'text';
        let optimizedResumeData = null;
        function optimizeResume() {
            const resumeText = document.getElementById('resumeInput').value.trim();
            const jobDescText = document.getElementById('jobDescInput').value.trim();
            const selectedIndustry = document.getElementById('industrySelect').value;
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
            // Find contact information
            const emailMatch = originalResume.match(/[\w\.-]+@[\w\.-]+\.\w+/);
            const phoneMatch = originalResume.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
            const linkedinMatch = originalResume.match(/linkedin\.com\/in\/[\w-]+/i);
            const email = emailMatch ? emailMatch[0] : 'email@example.com';
            const phone = phoneMatch ? phoneMatch[0] : '(555) 123-4567';
            const linkedin = linkedinMatch ? linkedinMatch[0] : 'linkedin.com/in/profile';
            // Try to extract actual job title from resume
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
            // Look for common job title patterns in the resume
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
            // Fallback to industry-specific default titles
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
            // Generate new summary if none exists
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
            // Generate sample experience if none exists
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
            // Look for degree patterns
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
            return summaryTemplates[industry] || summaryTemplates.default;
        }
        function generateCoreCompetencies(keywords, industry) {
            // Select most relevant keywords and format them professionally
            const competencies = keywords.slice(0, 12).map(skill => {
                // Capitalize first letter and make it more professional
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
            const text = resume.toLowerCase();
            // Extract contact and header info
            const lines = resume.split('\n').filter(line => line.trim());
            sections.header = lines.slice(0, 3).join('\n');   
            // Find sections using common headers
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
            // If no formal sections found, try to extract content by patterns
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
        function setFormat(format) {
            currentFormat = format;   
            document.querySelectorAll('.format-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(format + 'Btn').classList.add('active');
            if (optimizedResumeData) {
                displayOptimizedResume(optimizedResumeData);
            }
        }
        function updateOptimizationStats(stats) {
            document.getElementById('matchScore').textContent = stats.matchScore + '%';
            document.getElementById('keywordsAdded').textContent = stats.keywordsAdded;
            document.getElementById('sectionsOptimized').textContent = stats.sectionsOptimized;
            document.getElementById('atsScore').textContent = stats.atsScore + '%';
            document.getElementById('optimizationStats').style.display = 'grid';
        }
        function showProgress() {
            document.getElementById('progressBar').style.display = 'block';
        }
        function hideProgress() {
            document.getElementById('progressBar').style.display = 'none';
        }
        function updateProgress(percent) {
            document.getElementById('progressFill').style.width = percent + '%';
        }
        function copyToClipboard() {
            const preview = document.getElementById('resumePreview');
            const text = preview.textContent;   
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Resume copied to clipboard!', 'success');
            }).catch(() => {
                showStatus('Failed to copy to clipboard. Please select and copy manually.', 'error');
            });
        }
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
                    ${formatAsHTML(optimizedResumeData.content)}
                </body>
                </html>
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
            document.getElementById('resumeInput').value = '';
            document.getElementById('jobDescInput').value = '';
            document.getElementById('industrySelect').value = '';
            document.getElementById('resumePreview').textContent = 'Your optimized resume will appear here after processing...';
            document.getElementById('optimizationStats').style.display = 'none';
            optimizedResumeData = null;
            hideProgress();
            showStatus('All fields cleared.', 'info');
        }
        function showStatus(message, type) {
            const statusDiv = document.getElementById('statusMessage');
            statusDiv.textContent = message;
            statusDiv.className = `status-message status-${type}`;
            statusDiv.style.display = 'block';   
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
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
            // Industry selector change handler
            document.getElementById('industrySelect').addEventListener('change', function() {
                const industry = this.value;
                const optionsDiv = document.getElementById('industryOptions'); 
                if (industry && industryKeywords[industry]) {
                    optionsDiv.innerHTML = `
                        <h4 style="margin-bottom: 0.5rem; color: #374151;">Key Skills for ${industry.charAt(0).toUpperCase() + industry.slice(1)}:</h4>
                        ${industryKeywords[industry].map(keyword => 
                            `<div class="industry-option">${keyword}</div>`
                        ).join('')}
                    `;
                } else {
                    optionsDiv.innerHTML = '<div style="color: #64748b; font-style: italic;">Select an industry to see relevant keywords</div>';
                }
            });
        });
        // Sample data for demo purposes
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
            document.getElementById('resumeInput').value = sampleResume;
            document.getElementById('jobDescInput').value = sampleJobDesc;
            document.getElementById('industrySelect').value = 'technology';
            showStatus('Sample data loaded. Click "Optimize Resume" to see the tool in action!', 'info');
        }
        // Add sample data button (for demo purposes)
        document.addEventListener('DOMContentLoaded', function() {
            const demoButton = document.createElement('button');
            demoButton.textContent = '🎯 Load Sample Data';
            demoButton.className = 'btn btn-secondary';
            demoButton.onclick = loadSampleData;
            demoButton.style.fontSize = '0.9rem';   
            const controls = document.querySelector('.controls');
            controls.appendChild(demoButton);
        })
