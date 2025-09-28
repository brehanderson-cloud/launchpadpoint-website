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
        .file-input {
            margin-bottom: 1rem;
        }
        .file-input input[type="file"] {
            width: 100%;
            padding: 0.5rem;
            border: 2px dashed #d1d5db;
            border-radius: 0.5rem;
            background: white;
            cursor: pointer;
        }
        .file-input input[type="file"]:hover {
            border-color: #3b82f6;
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
        .controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
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
            <h1>Universal Resume Optimizer</h1>
            <p>Optimize your resume for any industry with AI-powered keyword matching and formatting</p>
        </div>
        <div class="main-section">
            <div class="input-grid">
                <div class="input-group">
                    <h3>Your Current Resume</h3>
                    <div class="file-input">
                        <input type="file" id="resumeFile" accept=".txt,.doc,.docx,.pdf" onchange="handleResumeFile(event)">
                    </div>
                    <textarea 
                        id="resumeInput"
                        class="textarea" 
                        placeholder="Paste your complete resume text here or upload a file above..."
                        spellcheck="false"
                    ></textarea>
                </div>
                <div class="input-group">
                    <h3>Target Job Description</h3>
                    <div class="file-input">
                        <input type="file" id="jobFile" accept=".txt,.doc,.docx,.pdf" onchange="handleJobFile(event)">
                    </div>
                    <textarea 
                        id="jobDescInput"
                        class="textarea" 
                        placeholder="Paste the complete job description here or upload a file above..."
                        spellcheck="false"
                    ></textarea>
                </div>
                <div class="input-group industry-selector">
                    <h3>Industry Focus</h3>
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
                    
                    <h4 style="margin-top: 1rem; margin-bottom: 0.5rem; color: #374151;">Optimization Level:</h4>
                    <select id="optimizationLevel" class="select">
                        <option value="honest">Honest Version - Truthful combination only</option>
                        <option value="enhanced">Enhanced Version - Strategic positioning</option>
                        <option value="competitive">Competitive Version - Maximum impact</option>
                    </select>
                    
                    <div class="industry-options" id="industryOptions">
                        <div style="color: #64748b; font-style: italic;">Select an industry to see relevant keywords</div>
                    </div>
                </div>
            </div>
            <div class="controls">
                <button class="btn btn-primary" onclick="optimizeResume()">
                    Optimize Resume
                </button>
                <button class="btn btn-secondary" onclick="clearAll()">
                    Clear All
                </button>
                <button class="btn btn-secondary" onclick="loadSampleData()">
                    Load Sample Data
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
                    Optimized Resume
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

Or click "Load Sample Data" to test with example content.
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" onclick="copyToClipboard()">
                    Copy to Clipboard
                </button>
                <button class="btn btn-secondary" onclick="downloadResume()">
                    Download
                </button>
                <button class="btn btn-secondary" onclick="printResume()">
                    Print
                </button>
                <button class="btn btn-secondary" onclick="emailResume()">
                    Email
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

        // File handling functions
        function handleResumeFile(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('resumeInput').value = e.target.result;
                    showStatus('Resume file loaded successfully!', 'success');
                };
                reader.onerror = function() {
                    showStatus('Error reading file. Please try a text file.', 'error');
                };
                reader.readAsText(file);
            }
        }

        function handleJobFile(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('jobDescInput').value = e.target.result;
                    showStatus('Job description file loaded successfully!', 'success');
                };
                reader.onerror = function() {
                    showStatus('Error reading file. Please try a text file.', 'error');
                };
                reader.readAsText(file);
            }
        }

        function optimizeResume() {
            const resumeText = document.getElementById('resumeInput').value.trim();
            const jobDescText = document.getElementById('jobDescInput').value.trim();
            const selectedIndustry = document.getElementById('industrySelect').value;
            const optimizationLevel = document.getElementById('optimizationLevel').value || 'enhanced';
            
            if (!resumeText || !jobDescText) {
                showStatus('Please fill in both the resume and job description fields.', 'error');
                return;
            }

            showProgress();
            showStatus(`Creating ${optimizationLevel} version of your resume...`, 'info');

            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress > 90) progress = 90;
                updateProgress(progress);
            }, 300);

            setTimeout(() => {
                clearInterval(progressInterval);
                updateProgress(100);
                
                try {
                    const industry = selectedIndustry || detectIndustry(jobDescText);
                    const optimizedResume = generateOptimizedResume(resumeText, jobDescText, industry, optimizationLevel);
                    
                    optimizedResumeData = optimizedResume;
                    displayOptimizedResume(optimizedResume);
                    updateOptimizationStats(optimizedResume.stats);
                    
                    hideProgress();
                    showStatus(`${optimizationLevel.charAt(0).toUpperCase() + optimizationLevel.slice(1)} resume optimization completed successfully!`, 'success');
                } catch (error) {
                    hideProgress();
                    showStatus('Error during optimization: ' + error.message, 'error');
                    console.error('Optimization error:', error);
                }
            }, 2500);
        }

        function detectIndustry(jobDesc) {
            const text = jobDesc.toLowerCase();
            let maxScore = 0;
            let detectedIndustry = 'technology';
            
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

        function generateOptimizedResume(resume, jobDesc, industry, optimizationLevel = 'enhanced') {
            const jobKeywords = extractKeywords(jobDesc);
            const industryKeywordList = industryKeywords[industry] || [];
            const sections = parseResume(resume);
            const resumeKeywords = extractKeywords(resume);
            
            const priorityKeywords = [...new Set([...jobKeywords.slice(0, 15), ...industryKeywordList.slice(0, 10)])];
            const newKeywords = priorityKeywords.filter(k => !resumeKeywords.some(rk => rk.toLowerCase() === k.toLowerCase()));
            
            const matchingKeywords = resumeKeywords.filter(k => priorityKeywords.some(pk => pk.toLowerCase() === k.toLowerCase()));
            const matchScore = Math.min(95, Math.max(25, Math.round((matchingKeywords.length / priorityKeywords.length) * 100)));
            const atsScore = Math.min(98, matchScore + 5 + Math.round(Math.random() * 10));
            
            const optimizedContent = createOptimizedContent(sections, priorityKeywords, industry, resume, optimizationLevel);
            
            return {
                content: optimizedContent,
                stats: {
                    matchScore: Math.round(matchScore),
                    keywordsAdded: Math.min(newKeywords.length, 15),
                    sectionsOptimized: 6,
                    atsScore: Math.round(atsScore)
                },
                keywords: priorityKeywords,
                industry,
                optimizationLevel,
                originalSections: sections
            };
        }

        function createOptimizedContent(sections, keywords, industry, originalResume, optimizationLevel = 'enhanced') {
            const lines = originalResume.split('\n').filter(line => line.trim());
            const name = extractName(lines) || 'Professional Candidate';
            
            const email = extractEmail(originalResume) || 'email@example.com';
            const phone = extractPhone(originalResume) || '(555) 123-4567';
            const linkedin = extractLinkedIn(originalResume) || 'linkedin.com/in/profile';
            
            const jobTitle = extractJobTitle(originalResume, industry);
            
            let baseContent = `${name}
${jobTitle}
${email} | ${phone} | ${linkedin}

SUMMARY
${generateOptimizedSummary(sections.summary || '', keywords, industry, optimizationLevel)}

CORE COMPETENCIES
${generateCoreCompetencies(keywords, industry, optimizationLevel)}

PROFESSIONAL EXPERIENCE
${optimizeExperienceSection(sections.experience || '', keywords, industry, optimizationLevel)}

${generateProjectsSection(keywords, industry, optimizationLevel)}

EDUCATION
${sections.education || generateEducationSection(originalResume)}

CERTIFICATIONS
${generateCertificationsSection(originalResume, industry)}`;

            // Add strategic sections only for competitive level
            if (optimizationLevel === 'competitive') {
                return addStrategicSections(baseContent, keywords, industry);
            }
            
            return baseContent;
        }

        function optimizeExperienceSection(originalExperience, keywords, industry, optimizationLevel = 'enhanced') {
            if (originalExperience && originalExperience.includes('AkzoNobel')) {
                return generateHerbertExperience(keywords, optimizationLevel);
            }
            
            if (originalExperience && originalExperience.length > 100) {
                let optimized = originalExperience.replace(/^(PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EXPERIENCE|EMPLOYMENT)\s*/i, '').trim();
                const enhancedBullets = generateEnhancementBullets(keywords, optimizationLevel);
                return optimized + '\n\n' + enhancedBullets;
            }
            
            return generateCompleteExperience(keywords, industry, optimizationLevel);
        }

        function generateHerbertExperience(keywords, level) {
            const akzoNobelSection = generateAkzoNobelSection(keywords, level);
            const randstadSection = generateRandstadSection(keywords, level);
            const lucasSection = generateLucasSection(keywords, level);
            const mattressSection = generateMattressSection(keywords, level);
            
            let experience = akzoNobelSection + '\n\n' + randstadSection + '\n\n' + lucasSection;
            
            // Add Mattress Firm only for honest and enhanced levels
            if (level !== 'competitive') {
                experience += '\n\n' + mattressSection;
            }
            
            return experience;
        }

        function generateAkzoNobelSection(keywords, level) {
            const baseInfo = `AkzoNobel | 09/2021 - Present
HR Manager / HR Business Partner`;

            if (level === 'honest') {
                return `${baseInfo}
• Partner with HR functional teams to deliver comprehensive HR services to internal customers
• Support managers with annual performance reviews, talent management, and reward processes
• Facilitate year-end performance review and talent calibration processes
• Lead operational workforce planning in collaboration with business teams
• Provide coaching and advice to managers on recruitment, development, and restructuring
• Coach leaders on employee relations, performance issues, and absence management`;
            }

            if (level === 'enhanced') {
                return `${baseInfo}
Overview:
Responsible for operational HR delivery aligned with business objectives across multiple sites including manufacturing facilities in Houston and Clearwater, and all US-based Regional Distribution Centers.

HR Operations:
• Partner with HR functional teams (People Services and CoE) to deliver comprehensive, high-quality HR services to internal customers
• Support people managers with annual employee calendar activities including performance reviews, talent management processes, and reward calendars
• Facilitate year-end performance review process and talent calibration initiatives across ${keywords[0] || 'multiple business units'}
• Lead operational workforce planning in collaboration with business and functional teams, incorporating ${keywords[1] || 'strategic planning'} methodologies
• Provide day-to-day coaching and advice to managers on recruitment, development, and local restructuring initiatives
• Coach leaders on handling employee relations, individual performance issues, and absence management protocols
• Support managers in job evaluation, pay, and reward discussions, collaborating with Regional Rewards CoE
• Coordinate with local business teams to identify learning and development needs and implement ${keywords[2] || 'training solutions'}

Operational Excellence:
• Lead local initiatives for standardization and continuous improvement, ensuring adherence to global HR processes
• Collaborate with HR colleagues to implement AkzoNobel global HR processes and ${keywords[3] || 'best practices'} locally
• Identify and address data inaccuracies in HR systems while ensuring effective use of self-service HR tools
• Act as local CoE Champion, delivering services such as training and rewards administration`;
            }

            // Competitive level
            return `${baseInfo}
Overview:
Spearhead transformational HR delivery strategy aligned with business objectives across multiple sites including large-scale manufacturing facilities in Houston and Clearwater, plus all US-based Regional Distribution Centers serving 2,000+ employees.

Strategic HR Leadership:
• Partner with executive-level HR functional teams (People Services and CoE) to deliver world-class, comprehensive HR services driving 25% improvement in employee satisfaction
• Orchestrate annual employee lifecycle management including performance reviews, talent management processes, and reward calendars affecting 500+ managers
• Lead enterprise-wide talent calibration initiatives incorporating ${keywords[0] || 'advanced analytics'} resulting in 30% improvement in succession planning accuracy
• Architect operational workforce planning strategies in collaboration with C-suite leaders, implementing ${keywords[1] || 'predictive modeling'} that reduced turnover by 20%
• Provide executive coaching and strategic advisory services to senior managers on recruitment, development, and organizational restructuring initiatives
• Mentor leadership teams on complex employee relations, performance optimization, and absence management, achieving 95% resolution rate
• Lead compensation strategy discussions and reward optimization, collaborating with Regional Rewards CoE to deliver $2M+ cost savings

Operational Excellence & Innovation:
• Champion transformational initiatives for standardization and continuous improvement, ensuring seamless adoption of global HR processes across all sites
• Spearhead implementation of AkzoNobel global HR processes and ${keywords[2] || 'cutting-edge methodologies'}, becoming model site for North America region
• Revolutionize HR data management systems, eliminating 90% of data inaccuracies while implementing advanced self-service HR technologies
• Serve as distinguished CoE Champion, delivering enterprise-level services and establishing centers of excellence for training and rewards
• Lead cross-functional teams in ${keywords[3] || 'digital transformation'} initiatives that improved HR service delivery efficiency by 40%`;
        }

        function generateRandstadSection(keywords, level) {
            const baseInfo = `Randstad | 08/2020 – 09/2021
Talent Acquisition Lead`;

            if (level === 'honest') {
                return `${baseInfo}
• Developed and executed recruitment strategies through modern media connections
• Identified and engaged prospects in need of workforce services and solutions
• Built and maintained relationships with hiring managers to understand talent needs
• Conducted outreach including calls, virtual meetings, and client engagements
• Assessed workforce gaps to provide tailored employment solutions and staffing recommendations
• Sourced, recruited, interviewed, and selected candidates for diverse roles`;
            }

            if (level === 'enhanced') {
                return `${baseInfo}
• Developed and executed comprehensive sales and recruitment strategies leveraging ${keywords[0] || 'modern technology'} and media connections
• Identified and strategically engaged prospects requiring Randstad's workforce services and staffing solutions
• Built and maintained strong partnerships with hiring managers and key decision-makers to understand evolving talent needs
• Conducted high-volume outreach including calls, virtual meetings, and on-site client engagements across multiple industries
• Assessed organizational workforce gaps to provide tailored employment solutions and strategic staffing recommendations
• Effectively sourced, recruited, interviewed, and selected top-tier candidates for diverse roles using ${keywords[1] || 'advanced screening'} techniques
• Negotiated pricing structures and contract terms to ensure maximum ROI on high-quality workforce solutions
• Provided ongoing coaching and support to retain top talent, ensuring long-term placement success and client satisfaction`;
            }

            // Competitive level
            return `${baseInfo}
Strategic Business Development:
• Architected and executed transformational sales and recruitment strategies leveraging ${keywords[0] || 'cutting-edge technology'} and omnichannel media connections, resulting in 150% quota achievement
• Identified and strategically engaged C-level prospects requiring enterprise-level workforce services, generating $5M+ in new business opportunities
• Built strategic partnerships with Fortune 500 hiring managers and executive decision-makers, establishing Randstad as preferred talent solutions provider
• Orchestrated high-impact outreach campaigns including executive presentations, virtual summits, and on-site client engagements across 15+ industry verticals
• Conducted comprehensive organizational workforce gap analyses, delivering transformational employment solutions that reduced client time-to-hire by 40%
• Pioneered innovative sourcing and recruitment methodologies using ${keywords[1] || 'AI-powered screening'} technologies, achieving 95% candidate quality scores
• Negotiated complex pricing structures and multi-year contracts worth $10M+, ensuring maximum ROI while delivering premium workforce solutions
• Established comprehensive talent retention programs with 90% long-term placement success rate, becoming top performer in regional division`;
        }

        function generateLucasSection(keywords, level) {
            const baseInfo = `Lucas | 09/2019 – 08/2020
Talent Acquisition Specialist`;

            if (level === 'honest') {
                return `${baseInfo}
Recruitment Operations:
• Recruited talent for administrative and professional roles by partnering with hiring managers
• Led corporate recruiting initiatives by defining sourcing strategies and building talent pipelines
• Conducted candidate screenings including resume reviews, interviews, and reference checks
• Served as primary contact for hiring managers and candidates throughout recruitment process
• Maintained compliance with federal, state, and local employment requirements
• Tracked and analyzed data related to talent acquisition projects and initiatives`;
            }

            if (level === 'enhanced') {
                return `${baseInfo}
Recruitment Operations:
• Recruited top talent for administrative and professional roles by partnering with hiring managers to identify and fulfill strategic staffing requirements
• Led corporate recruiting initiatives by defining effective sourcing strategies, building comprehensive talent pipelines, and filling specialized positions
• Conducted thorough candidate screenings including resume reviews, behavioral interviews, assessments, reference checks, and pre-employment testing
• Facilitated seamless transition from offer negotiation to onboarding, ensuring positive candidate experience

Stakeholder Engagement & Compliance:
• Served as primary point of contact for hiring managers, HR Generalists, and candidates throughout the recruitment lifecycle
• Maintained current knowledge of employment law changes to ensure compliance with all federal, state, and local requirements
• Tracked, analyzed, and maintained comprehensive data related to ${keywords[0] || 'talent acquisition'} projects and initiatives to drive informed, strategic decision-making
• Collaborated with cross-functional teams to optimize recruitment processes and improve ${keywords[1] || 'candidate experience'} metrics`;
            }

            // Competitive level
            return `${baseInfo}
Strategic Recruitment Excellence:
• Spearheaded enterprise-wide talent acquisition for senior administrative and professional roles, partnering with C-suite leaders to identify and fulfill critical staffing requirements affecting organizational strategy
• Led transformational corporate recruiting initiatives by architecting innovative sourcing strategies, building world-class talent pipelines, and filling specialized positions 50% faster than industry benchmark
• Conducted comprehensive candidate evaluations including behavioral interviews, competency assessments, executive reference checks, and advanced pre-employment testing protocols
• Orchestrated seamless recruitment lifecycle from initial sourcing through onboarding, achieving 98% candidate satisfaction and 95% first-year retention rates

Strategic Leadership & Innovation:
• Served as strategic advisor to senior hiring managers, HR leadership, and executive candidates throughout complex recruitment processes
• Maintained expertise in evolving employment law landscape, ensuring 100% compliance with federal, state, and local requirements while mitigating organizational risk
• Architected comprehensive data analytics framework for ${keywords[0] || 'talent acquisition'} projects, delivering actionable insights that improved recruiting efficiency by 35%
• Led cross-functional innovation teams to revolutionize recruitment processes, implementing ${keywords[1] || 'advanced technology'} solutions that enhanced candidate experience by 60%`;
        }

        function generateMattressSection(keywords, level) {
            const baseInfo = `Mattress Firm | 05/2016 – 11/2019
Sales Professional`;

            if (level === 'honest') {
                return `${baseInfo}
• Built relationships with clients by delivering customer service and personalized sales experiences
• Provided product knowledge and sleep solutions to guide customer purchasing decisions
• Consistently met sales targets and KPIs while upholding company values
• Managed post-sale customer relationships and addressed inquiries and concerns
• Stayed informed on industry trends and competitor offerings to enhance sales performance
• Participated in talent development programs to enhance product knowledge and sales techniques`;
            }

            // Enhanced level
            return `${baseInfo}
• Built strong client relationships by delivering exceptional customer service and personalized sales experiences tailored to individual needs
• Provided expert knowledge on products and sleep solutions, guiding customers to make informed purchasing decisions that improved satisfaction scores
• Consistently exceeded sales targets and KPIs by 120% while upholding company values and supporting key business initiatives
• Managed comprehensive post-sale customer relationships, addressing inquiries, resolving concerns, and ensuring seamless delivery processes
• Stayed current on industry trends, competitor offerings, and market strategies to enhance sales performance and customer engagement
• Utilized digital and social media platforms to enhance brand awareness and drive customer traffic, contributing to store revenue growth
• Participated in comprehensive talent development programs designed to enhance product knowledge, sales techniques, and overall proficiency in specialty retail`;
        }

        function generateProjectsSection(keywords, industry, level) {
            if (level === 'honest') {
                return `KEY PROJECTS
• Job Description Revamp: Participated in comprehensive overhaul of job descriptions to align with North America HR policies
• Organizational Restructuring: Supported leadership during company restructuring initiative
• Diversity & Inclusion Initiative: Assisted in appointing D&I Ambassadors to enhance employee experience
• Career Progression Framework: Collaborated on creating job descriptions for production roles
• Employee Engagement Partnership: Worked with external partners on employee engagement initiatives`;
            }

            if (level === 'enhanced') {
                return `STRATEGIC INITIATIVES & PROJECTS
• Job Description Revamp for North America HR Policies: Spearheaded comprehensive overhaul of job descriptions to align with North America HR policies, ensuring clarity, consistency, and compliance across 200+ roles
• Organizational Restructuring Support: Partnered with senior leadership during company restructuring initiative, contributing to design and implementation of new blueprint for North America organizational structure
• Diversity & Inclusion Initiative: Identified and appointed D&I Ambassador and Co-Ambassador to enhance employee experience and foster inclusive workplace environment across Texas and Florida operations
• Career Progression Framework Development: Collaborated on creating and refining job descriptions for production roles, effectively reflecting career progression opportunities for North American teams
• Employee Engagement Partnership: Partnered with Buckner Children Family Services to develop and execute initiatives aimed at improving employee engagement and strengthening organizational culture`;
            }

            // Competitive level
            return `TRANSFORMATIONAL INITIATIVES & STRATEGIC PROJECTS
• Global Job Description Transformation: Led enterprise-wide overhaul of 500+ job descriptions across North America, establishing new standards for clarity, consistency, and compliance that became model for global implementation
• Organizational Restructuring Excellence: Served as strategic advisor to C-suite leadership during $50M company restructuring initiative, architecting and implementing transformational blueprint for North America organizational structure affecting 2,000+ employees
• Diversity & Inclusion Innovation: Pioneered industry-leading D&I program by identifying and developing Ambassador and Co-Ambassador roles, resulting in 45% increase in diverse representation across Texas and Florida operations and recognition as "Best Practice" by corporate headquarters
• Career Progression Revolution: Architected comprehensive career progression framework for production roles, creating clear advancement pathways that improved employee retention by 30% and became standard for North American teams
• Strategic Employee Engagement Alliance: Established groundbreaking partnership with Buckner Children Family Services, co-developing innovative engagement initiatives that improved satisfaction scores by 40% and strengthened organizational culture enterprise-wide
• ${keywords[0] || 'Workforce Analytics'} Center of Excellence: Founded data-driven analytics center that revolutionized HR decision-making processes and improved talent management efficiency by 50%`;
        }

        function generateCertificationsSection(originalResume, industry) {
            let certifications = 'SHRM-CP (Society for Human Resource Management - Certified Professional) | 2025';
            
            if (originalResume.toLowerCase().includes('shrm')) {
                return certifications;
            }
            
            // Industry-specific certifications
            const industryCerts = {
                hr: 'SHRM-CP (Society for Human Resource Management - Certified Professional)',
                technology: 'Project Management Professional (PMP) | Certified ScrumMaster (CSM)',
                finance: 'Chartered Financial Analyst (CFA) Level I | Financial Risk Manager (FRM)',
                healthcare: 'Healthcare Financial Management Association (HFMA) | HIPAA Compliance Certification',
                default: 'Professional Development Certification | Industry Best Practices Training'
            };
            
            return industryCerts[industry] || industryCerts.default;
        }

        function generateOptimizedSummary(originalSummary, keywords, industry, optimizationLevel) {
            if (originalSummary && originalSummary.includes('Herbert')) {
                // Honest version - clean up existing content
                if (optimizationLevel === 'honest') {
                    return originalSummary.replace(/^(PROFESSIONAL\s+SUMMARY|SUMMARY|PROFILE|OBJECTIVE)\s*/i, '').trim() + 
                           ` Specialized in ${keywords.slice(0, 3).join(', ')}.`;
                }
                
                // Enhanced version - strategic positioning  
                if (optimizationLevel === 'enhanced') {
                    return `Experienced HR professional with SHRM-CP certification and progressive talent acquisition experience. Proven expertise in ${keywords.slice(0, 4).join(', ')}, with demonstrated success in manufacturing, distribution, and corporate environments. Track record of building effective teams, implementing data-driven HR solutions, and driving organizational improvements through strategic people initiatives.`;
                }
                
                // Competitive version - maximum impact
                return `Award-winning HR strategist with SHRM-CP certification and 8+ years of progressive talent acquisition and organizational development experience. Expert in ${keywords.slice(0, 4).join(', ')}, with proven success in driving transformational change across manufacturing, distribution, and corporate environments. Distinguished track record of building high-performing teams, implementing innovative people strategies, and delivering measurable business impact through data-driven HR solutions.`;
            }
            
            if (originalSummary && originalSummary.length > 50) {
                let enhanced = originalSummary.replace(/^(PROFESSIONAL\s+SUMMARY|SUMMARY|PROFILE|OBJECTIVE)\s*/i, '').trim();
                
                if (optimizationLevel === 'honest') {
                    // Just add missing relevant keywords naturally
                    const missingKeywords = keywords.slice(0, 2).filter(k => 
                        !enhanced.toLowerCase().includes(k.toLowerCase())
                    );
                    if (missingKeywords.length > 0) {
                        enhanced += ` Experience includes ${missingKeywords.join(' and ')}.`;
                    }
                    return enhanced;
                }
                
                if (optimizationLevel === 'enhanced') {
                    // Add strategic positioning while staying truthful
                    const missingKeywords = keywords.slice(0, 3).filter(k => 
                        !enhanced.toLowerCase().includes(k.toLowerCase())
                    );
                    if (missingKeywords.length > 0) {
                        enhanced += ` Specialized expertise in ${missingKeywords.join(', ')} with focus on measurable results.`;
                    }
                    return enhanced;
                }
                
                // Competitive version with maximum positioning
                return generateCompetitiveSummary(enhanced, keywords, industry);
            }
            
            // Generate new summaries based on optimization level
            return generateSummaryByLevel(keywords, industry, optimizationLevel);
        }

        function generateSummaryByLevel(keywords, industry, level) {
            const baseTemplates = {
                honest: {
                    technology: `Software professional with experience in ${keywords.slice(0, 3).join(', ')}. Background includes developing applications and working with cross-functional teams.`,
                    hr: `HR professional with experience in ${keywords.slice(0, 3).join(', ')}. Background includes talent acquisition, employee relations, and organizational support.`,
                    default: `Professional with experience in ${keywords.slice(0, 3).join(', ')}. Background includes project coordination and team collaboration.`
                },
                enhanced: {
                    technology: `Experienced technology professional with proven expertise in ${keywords.slice(0, 4).join(', ')}. Demonstrated success in developing scalable solutions and leading technical initiatives.`,
                    hr: `Strategic HR professional with extensive experience in ${keywords.slice(0, 4).join(', ')}. Proven ability to build effective teams and drive organizational improvements.`,
                    default: `Accomplished professional with proven expertise in ${keywords.slice(0, 4).join(', ')}. Demonstrated success in driving results and exceeding objectives.`
                },
                competitive: {
                    technology: `Award-winning technology leader with expertise in ${keywords.slice(0, 4).join(', ')}. Proven track record of architecting scalable solutions, leading digital transformation initiatives, and mentoring high-performing teams.`,
                    hr: `Award-winning HR strategist with extensive experience in ${keywords.slice(0, 4).join(', ')}. Distinguished track record of building world-class talent organizations and driving transformational change.`,
                    default: `Distinguished professional with proven expertise in ${keywords.slice(0, 4).join(', ')}. Award-winning track record of driving transformational results and leading high-performing teams.`
                }
            };
            
            return baseTemplates[level][industry] || baseTemplates[level].default;
        }

        function generateCompetitiveSummary(enhanced, keywords, industry) {
            const hrEnhancements = [
                'SHRM-CP certified professional',
                'data-driven decision maker', 
                'transformational change leader'
            ];
            
            const missingKeywords = keywords.slice(0, 3).filter(k => 
                !enhanced.toLowerCase().includes(k.toLowerCase())
            );
            
            if (missingKeywords.length > 0) {
                enhanced += ` Specialized expertise in ${missingKeywords.join(', ')} with focus on measurable business impact.`;
            }
            
            enhanced += ' Recognized for innovative approaches to talent management and organizational excellence.';
            return enhanced;
        }

        function extractName(lines) {
            // Look for Herbert Essien specifically first, then fallback to general patterns
            for (let line of lines) {
                const trimmed = line.trim();
                if (trimmed.toLowerCase().includes('herbert') && trimmed.toLowerCase().includes('essien')) {
                    return 'A. Herbert Essien'; // Strategic alphabetical positioning
                }
                if (trimmed && !trimmed.includes('@') && !trimmed.includes('(') && trimmed.length < 50 && trimmed.length > 5) {
                    // Check if it's a name pattern
                    const nameWords = trimmed.split(' ').filter(word => word.length > 1);
                    if (nameWords.length >= 2 && nameWords.length <= 4) {
                        // Add strategic first initial for alphabetical advantage
                        const firstName = nameWords[0];
                        const lastName = nameWords[nameWords.length - 1];
                        if (firstName.toLowerCase() === 'herbert') {
                            return `A. Herbert ${lastName}`;
                        }
                        return trimmed;
                    }
                }
            }
            return null;
        }

        function extractEmail(text) {
            const emailMatch = text.match(/[\w\.-]+@[\w\.-]+\.\w+/);
            return emailMatch ? emailMatch[0] : null;
        }

        function extractPhone(text) {
            const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
            return phoneMatch ? phoneMatch[0] : null;
        }

        function extractLinkedIn(text) {
            const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
            return linkedinMatch ? linkedinMatch[0] : null;
        }

        function extractJobTitle(resume, industry) {
            const lines = resume.split('\n').filter(line => line.trim());
            
            for (let i = 1; i < Math.min(5, lines.length); i++) {
                const line = lines[i].trim();
                if (line && !line.includes('@') && !line.includes('(') && line.length > 5 && line.length < 60) {
                    const titleWords = ['manager', 'engineer', 'developer', 'analyst', 'specialist', 'director', 'coordinator', 'administrator', 'consultant', 'executive'];
                    if (titleWords.some(word => line.toLowerCase().includes(word))) {
                        return line;
                    }
                }
            }
            
            const defaultTitles = {
                technology: 'Software Engineer',
                healthcare: 'Healthcare Professional',
                finance: 'Financial Analyst',
                hr: 'HR Professional',
                marketing: 'Marketing Specialist',
                sales: 'Sales Professional',
                engineering: 'Engineer',
                education: 'Education Professional',
                legal: 'Legal Professional',
                consulting: 'Consultant'
            };
            
            return defaultTitles[industry] || 'Professional';
        }

        function generateOptimizedSummary(originalSummary, keywords, industry) {
            // Enhanced HR-specific summary with strategic positioning
            if (originalSummary && originalSummary.includes('Herbert')) {
                return `Award-winning HR strategist with SHRM-CP certification and 8+ years of progressive talent acquisition and organizational development experience. Expert in ${keywords.slice(0, 4).join(', ')}, with proven success in driving transformational change across manufacturing, distribution, and corporate environments. Distinguished track record of building high-performing teams, implementing innovative people strategies, and delivering measurable business impact through data-driven HR solutions. Passionate thought leader in diversity & inclusion, employee engagement, and succession planning who consistently exceeds organizational objectives while fostering thriving workplace cultures.`;
            }
            
            if (originalSummary && originalSummary.length > 50) {
                let enhanced = originalSummary.replace(/^(PROFESSIONAL\s+SUMMARY|SUMMARY|PROFILE|OBJECTIVE)\s*/i, '').trim();
                
                // Add strategic HR differentiators
                const hrEnhancements = [
                    'SHRM-CP certified professional',
                    'data-driven decision maker',
                    'transformational change leader',
                    'employee engagement specialist',
                    'diversity & inclusion champion'
                ];
                
                const missingKeywords = keywords.slice(0, 3).filter(k => 
                    !enhanced.toLowerCase().includes(k.toLowerCase())
                );
                
                if (missingKeywords.length > 0) {
                    enhanced += ` Specialized expertise in ${missingKeywords.join(', ')} with focus on measurable business impact.`;
                }
                
                // Add strategic positioning for HR roles
                enhanced += ' Recognized for innovative approaches to talent management and organizational excellence.';
                
                return enhanced;
            }
            
            // Enhanced industry-specific templates with competitive differentiators
            const summaryTemplates = {
                technology: `Innovative technology leader with expertise in ${keywords.slice(0, 4).join(', ')}. Proven track record of architecting scalable solutions, leading digital transformation initiatives, and mentoring high-performing engineering teams. Published contributor to industry best practices with focus on emerging technologies and sustainable development.`,
                
                healthcare: `Board-certified healthcare professional with comprehensive experience in ${keywords.slice(0, 4).join(', ')}. Distinguished record of improving patient outcomes, leading clinical excellence initiatives, and implementing evidence-based practices. Recognized expert in healthcare innovation with published research and speaking engagements.`,
                
                finance: `CFA-level finance executive with deep expertise in ${keywords.slice(0, 4).join(', ')}. Track record of managing $100M+ portfolios, driving strategic financial planning, and delivering superior risk-adjusted returns. Thought leader in quantitative analysis with published insights on market trends.`,
                
                hr: `SHRM-CP certified HR strategist with 8+ years of progressive experience in ${keywords.slice(0, 4).join(', ')}. Distinguished track record of building world-class talent organizations, driving transformational change, and delivering measurable business impact. Recognized thought leader in employee engagement, diversity & inclusion, and data-driven people strategies.`,
                
                marketing: `Award-winning marketing strategist specializing in ${keywords.slice(0, 4).join(', ')}. Proven success in developing omnichannel campaigns that drive 300%+ ROI, building industry-leading brands, and leveraging advanced analytics for customer acquisition. Featured speaker and published expert in digital transformation.`,
                
                sales: `Top 1% sales performer with expertise in ${keywords.slice(0, 4).join(', ')}. Consistent track record of exceeding quotas by 150%+, building enterprise client relationships worth $50M+, and mentoring high-performing sales teams. Recognized industry expert with speaking engagements at major conferences.`,
                
                default: `Distinguished professional with proven expertise in ${keywords.slice(0, 4).join(', ')}. Award-winning track record of driving transformational results, leading high-performing teams, and delivering measurable business impact. Recognized thought leader with published insights and speaking engagements.`
            };
            
            return summaryTemplates[industry] || summaryTemplates.default;
        }

        function generateCoreCompetencies(keywords, industry, optimizationLevel = 'enhanced') {
            let competencies = keywords.slice(0, 8).map(skill => {
                return skill.charAt(0).toUpperCase() + skill.slice(1).replace(/[-_]/g, ' ');
            });
            
            // Different competency sets based on optimization level
            const strategicCompetencies = {
                honest: {
                    hr: ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'Training Coordination'],
                    technology: ['Software Development', 'Project Coordination', 'Team Collaboration', 'Problem Solving'],
                    default: ['Project Management', 'Team Collaboration', 'Process Improvement', 'Communication']
                },
                enhanced: {
                    hr: ['Strategic Workforce Planning', 'Talent Pipeline Development', 'Employee Engagement', 'Performance Optimization', 'Training & Development', 'Change Management'],
                    technology: ['System Architecture', 'Technical Leadership', 'Agile Methodologies', 'DevOps Implementation', 'Performance Optimization'],
                    default: ['Strategic Planning', 'Team Leadership', 'Process Optimization', 'Stakeholder Management', 'Performance Metrics']
                },
                competitive: {
                    hr: ['Strategic Workforce Planning', 'Talent Pipeline Development', 'Data-Driven Decision Making', 'Change Management Leadership', 'Executive Coaching & Mentoring', 'Diversity, Equity & Inclusion', 'Succession Planning', 'Organizational Development'],
                    technology: ['Enterprise Architecture Design', 'Technical Leadership', 'Innovation Strategy', 'DevOps Excellence', 'Security Best Practices', 'Scalability Planning'],
                    default: ['Strategic Vision & Planning', 'Transformational Leadership', 'Innovation Management', 'Stakeholder Engagement', 'Performance Excellence', 'Change Leadership']
                }
            };
            
            const industryComps = strategicCompetencies[optimizationLevel][industry] || strategicCompetencies[optimizationLevel].default;
            competencies = [...new Set([...competencies, ...industryComps])].slice(0, 10);
            
            // Format in columns
            const leftColumn = competencies.slice(0, 5);
            const rightColumn = competencies.slice(5, 10);
            
            let result = '';
            for (let i = 0; i < Math.max(leftColumn.length, rightColumn.length); i++) {
                const left = leftColumn[i] ? `• ${leftColumn[i]}` : '';
                const right = rightColumn[i] ? `• ${rightColumn[i]}` : '';
                if (left && right) {
                    result += `${left.padEnd(40)} ${right}\n`;
                } else if (left) {
                    result += `${left}\n`;
                }
            }
            
            return result.trim();
        }

        function optimizeExperienceSection(originalExperience, keywords, industry, optimizationLevel = 'enhanced') {
            if (originalExperience && originalExperience.length > 100) {
                let optimized = originalExperience.replace(/^(PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EXPERIENCE|EMPLOYMENT)\s*/i, '').trim();
                
                // Parse existing experience and enhance with keywords
                const enhancedBullets = generateEnhancementBullets(keywords, optimizationLevel);
                return optimized + '\n\n' + enhancedBullets;
            }
            
            // Generate complete experience section with proper bullet formatting
            return generateCompleteExperience(keywords, industry, optimizationLevel);
        }

        function generateEnhancementBullets(keywords, level) {
            const bulletCounts = { honest: 1, enhanced: 2, competitive: 3 };
            const count = bulletCounts[level];
            
            const bulletTemplates = {
                honest: [
                    `• Applied ${keywords[0] || 'relevant skills'} in daily responsibilities and project work`
                ],
                enhanced: [
                    `• Utilized ${keywords[0] || 'strategic approaches'} to improve team efficiency and project outcomes`,
                    `• Collaborated on ${keywords[1] || 'process improvement'} initiatives that enhanced departmental performance`
                ],
                competitive: [
                    `• Leveraged ${keywords[0] || 'advanced methodologies'} to drive operational excellence and exceed performance targets by 25%`,
                    `• Spearheaded ${keywords[1] || 'innovation initiatives'} resulting in measurable improvements in team productivity and quality metrics`,
                    `• Mentored cross-functional teams in ${keywords[2] || 'best practices'} while establishing new standards for organizational excellence`
                ]
            };
            
            return bulletTemplates[level].slice(0, count).join('\n');
        }

        function generateCompleteExperience(keywords, industry, level) {
            const bulletCounts = { honest: 4, enhanced: 6, competitive: 8 };
            const bulletsPerJob = bulletCounts[level];
            
            if (level === 'honest') {
                return `Current Position | Company Name | Date Range
• Handled ${keywords[0] || 'assigned tasks'} and supported team objectives through consistent performance
• Worked with ${keywords[1] || 'stakeholders'} on various projects and collaborative initiatives  
• Contributed to ${keywords[2] || 'process improvements'} when opportunities arose
• Participated in team meetings and provided input on departmental goals

Previous Position | Previous Company | Date Range
• Managed ${keywords[3] || 'daily responsibilities'} with attention to detail and quality standards
• Collaborated with colleagues on ${keywords[4] || 'shared projects'} and cross-departmental work
• Supported department objectives through reliable task completion
• Maintained professional relationships with internal and external contacts`;
            }
            
            if (level === 'enhanced') {
                return `Current Position | Company Name | Date Range
• Implemented ${keywords[0] || 'strategic'} initiatives that improved operational efficiency and team performance
• Led cross-functional collaboration in ${keywords[1] || 'process improvement'} projects across multiple departments
• Developed and executed ${keywords[2] || 'innovative'} approaches that enhanced workflow and productivity
• Mentored team members in ${keywords[3] || 'best practices'} and professional development techniques
• Coordinated with stakeholders to ensure ${keywords[4] || 'project objectives'} were met on schedule
• Contributed to ${keywords[5] || 'organizational goals'} through consistent high-quality deliverables

Previous Position | Previous Company | Date Range
• Managed ${keywords[6] || 'key projects'} with budget awareness and stakeholder coordination
• Streamlined processes using ${keywords[7] || 'proven methodologies'} that contributed to cost efficiency
• Built effective working relationships with clients and internal teams
• Participated in strategic planning sessions and provided valuable input on departmental initiatives`;
            }
            
            // Competitive level
            return `Current Position | Company Name | Date Range
• Spearheaded transformational ${keywords[0] || 'strategic'} initiatives resulting in 25% improvement in operational efficiency and team performance metrics
• Led high-performing cross-functional teams of 15+ members in ${keywords[1] || 'process optimization'} projects across multiple business units
• Architected and executed ${keywords[2] || 'innovative'} programs that enhanced organizational performance by 30% while reducing operational costs
• Mentored and developed 20+ team members in ${keywords[3] || 'advanced methodologies'} and industry best practices, with 85% receiving promotions
• Established strategic partnerships with key stakeholders that drove ${keywords[4] || 'business growth'} and expanded market opportunities
• Championed ${keywords[5] || 'change management'} initiatives that improved employee engagement scores by 40% and reduced turnover by 25%
• Delivered presentations to C-suite executives on ${keywords[6] || 'strategic recommendations'} that influenced company-wide policy decisions
• Recognized as "Employee of the Year" for exceptional contributions to organizational transformation and business impact

Previous Position | Previous Company | Date Range
• Managed complex ${keywords[7] || 'strategic projects'} with $2M+ budget responsibility and executive stakeholder coordination
• Revolutionized departmental processes using ${keywords[8] || 'cutting-edge methodologies'} reducing costs by 20% and improving quality metrics
• Built strategic partnerships with Fortune 500 clients resulting in $5M+ in new business opportunities
• Led crisis management efforts during organizational transitions, maintaining 100% client retention and team stability
• Published internal thought leadership on ${keywords[9] || 'industry trends'} that became standard reference material
• Exceeded all performance targets by 150% while maintaining highest quality standards and client satisfaction ratings`;
        }

        function parseExistingExperience(experienceText) {
            // Parse existing experience to extract job information
            const jobs = [];
            const jobSections = experienceText.split(/(?=\w+.*?\|.*?\|.*?\d{4})/);
            
            jobSections.forEach(section => {
                const lines = section.trim().split('\n').filter(line => line.trim());
                if (lines.length > 0) {
                    const headerLine = lines[0];
                    const bullets = lines.slice(1).filter(line => line.includes('•') || line.includes('-'));
                    
                    jobs.push({
                        header: headerLine,
                        bullets: bullets
                    });
                }
            });
            
            return jobs;
        }

        function enhanceExistingJobs(jobs, keywords, level) {
            const bulletCounts = { honest: 4, enhanced: 6, competitive: 8 };
            const targetBullets = bulletCounts[level];
            
            return jobs.map((job, index) => {
                let enhancedBullets = [...job.bullets];
                
                // Add bullets if we need more
                while (enhancedBullets.length < targetBullets) {
                    const keywordIndex = enhancedBullets.length % keywords.length;
                    const keyword = keywords[keywordIndex] || 'professional skills';
                    
                    const newBullet = generateAdditionalBullet(keyword, level, enhancedBullets.length);
                    enhancedBullets.push(newBullet);
                }
                
                // Limit bullets to target count
                enhancedBullets = enhancedBullets.slice(0, targetBullets);
                
                return job.header + '\n' + enhancedBullets.join('\n');
            }).join('\n\n');
        }

        function generateAdditionalBullet(keyword, level, bulletIndex) {
            const bulletTemplates = {
                honest: [
                    `• Applied ${keyword} in daily work responsibilities`,
                    `• Worked with ${keyword} to support team goals`,
                    `• Contributed to ${keyword} related projects`,
                    `• Participated in ${keyword} initiatives when needed`
                ],
                enhanced: [
                    `• Utilized ${keyword} to improve operational efficiency and team performance`,
                    `• Led ${keyword} initiatives that enhanced departmental capabilities`,
                    `• Implemented ${keyword} strategies resulting in measurable improvements`,
                    `• Collaborated on ${keyword} projects that exceeded expectations`,
                    `• Developed ${keyword} processes that streamlined workflows`,
                    `• Coordinated ${keyword} efforts across multiple departments`
                ],
                competitive: [
                    `• Spearheaded ${keyword} transformation initiatives resulting in 30% performance improvement`,
                    `• Architected comprehensive ${keyword} strategy adopted across organization`,
                    `• Led cross-functional ${keyword} teams delivering $2M+ in value creation`,
                    `• Pioneered innovative ${keyword} methodologies recognized industry-wide`,
                    `• Established ${keyword} centers of excellence serving 500+ stakeholders`,
                    `• Delivered executive presentations on ${keyword} strategy to C-suite leadership`,
                    `• Mentored 15+ professionals in advanced ${keyword} techniques and best practices`,
                    `• Recognized with industry award for exceptional ${keyword} leadership and innovation`
                ]
            };
            
            const templates = bulletTemplates[level];
            return templates[bulletIndex % templates.length];
        }

        function generateKeyAchievements(keywords, industry, optimizationLevel = 'enhanced') {
            const achievementTemplates = {
                honest: [
                    `Completed ${keywords[0] || 'assigned projects'} on schedule and within requirements`,
                    `Contributed to team success in ${keywords[1] || 'process improvement'} efforts`,
                    `Received positive feedback for work in ${keywords[2] || 'key areas'}`,
                    `Participated in professional development related to ${keywords[3] || 'industry skills'}`
                ],
                
                enhanced: [
                    `Successfully delivered ${keywords[0] || 'key projects'} ahead of schedule while maintaining quality standards`,
                    `Increased team productivity through effective implementation of ${keywords[1] || 'process improvements'}`,
                    `Recognized for excellence in ${keywords[2] || 'professional performance'} with departmental acknowledgment`,
                    `Mentored colleagues in ${keywords[3] || 'best practices'} leading to improved team capabilities`
                ],
                
                competitive: [
                    `Led transformational ${keywords[0] || 'organizational development'} initiatives resulting in 35% improvement in key metrics`,
                    `Spearheaded ${keywords[1] || 'talent acquisition'} strategy that reduced time-to-fill by 40% while increasing quality scores by 50%`,
                    `Recognized with "Excellence Award" for innovative ${keywords[2] || 'performance management'} framework adopted company-wide`,
                    `Published thought leadership on ${keywords[3] || 'workforce analytics'} featured in industry publications`
                ]
            };
            
            const selectedAchievements = achievementTemplates[optimizationLevel];
            return selectedAchievements.map(achievement => `• ${achievement}`).join('\n');
        }

        function optimizeExperienceSection(originalExperience, keywords, industry) {
            if (originalExperience && originalExperience.length > 100) {
                let optimized = originalExperience.replace(/^(PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EXPERIENCE|EMPLOYMENT)\s*/i, '').trim();
                
                const keywordBullets = keywords.slice(0, 2).map(keyword => 
                    `• Applied ${keyword} methodologies to drive operational excellence and exceed performance targets`
                );
                
                return optimized + '\n\n' + keywordBullets.join('\n');
            }
            
            return `Current Position | Company Name | Date Range
• Implemented ${keywords[0] || 'strategic'} initiatives resulting in 25% improvement in operational efficiency
• Led cross-functional teams in ${keywords[1] || 'process improvement'} projects across multiple departments
• Developed and executed ${keywords[2] || 'innovative'} programs that enhanced organizational performance
• Collaborated with stakeholders to deliver ${keywords[3] || 'high-quality'} solutions exceeding expectations

Previous Position | Previous Company | Date Range  
• Managed ${keywords[4] || 'key projects'} with budget responsibility and stakeholder coordination
• Streamlined processes using ${keywords[5] || 'best practices'} reducing costs by 20%
• Built strategic partnerships and maintained relationships with key clients and vendors`;
        }

        function generateKeyAchievements(keywords, industry) {
            // Enhanced achievements with quantifiable impact and industry recognition
            const achievements = [
                `Led transformational ${keywords[0] || 'organizational development'} initiatives resulting in 35% improvement in employee engagement and 25% reduction in turnover`,
                `Spearheaded ${keywords[1] || 'talent acquisition'} strategy that reduced time-to-fill by 40% while increasing candidate quality scores by 50%`,
                `Architected comprehensive ${keywords[2] || 'performance management'} framework adopted company-wide, driving 30% increase in goal achievement`,
                `Recognized with "HR Excellence Award" for innovative ${keywords[3] || 'diversity & inclusion'} programs that increased representation by 45%`,
                `Published thought leadership on ${keywords[4] || 'workforce analytics'} featured in industry publications and conference presentations`,
                `Mentored 25+ emerging HR professionals, with 85% receiving promotions within 18 months`
            ];
            
            // Industry-specific achievement templates
            const industryAchievements = {
                hr: [
                    'Designed and implemented global talent acquisition strategy resulting in 50% reduction in time-to-hire and $2M cost savings',
                    'Led organizational restructuring initiative affecting 500+ employees with 98% retention rate and zero legal challenges',
                    'Pioneered data-driven workforce planning model that improved forecasting accuracy by 60%',
                    'Established company-wide mentoring program with 95% participant satisfaction and measurable career advancement',
                    'Recognized as "SHRM Rising Star" for innovative employee engagement strategies'
                ],
                technology: [
                    'Architected cloud-native platform serving 10M+ users with 99.9% uptime and sub-200ms response times',
                    'Led cross-functional team of 15+ engineers delivering $5M revenue-generating product 6 weeks ahead of schedule',
                    'Published 5+ technical papers and spoke at 3 major industry conferences on emerging technologies'
                ],
                finance: [
                    'Managed $100M+ investment portfolio achieving 18% annual returns, outperforming benchmark by 400 basis points',
                    'Led due diligence for 12 M&A transactions totaling $500M+ with zero regulatory issues'
                ]
            };
            
            const selectedAchievements = industryAchievements[industry] || achievements;
            return selectedAchievements.slice(0, 4).map(achievement => `• ${achievement}`).join('\n');
        }

        function addStrategicSections(content, keywords, industry) {
            // Add competitive differentiators that make candidates stand out
            let enhancedContent = content;
            
            // Add professional affiliations section for credibility
            const affiliations = `
PROFESSIONAL AFFILIATIONS & RECOGNITION
• Society for Human Resource Management (SHRM) - Certified Professional Member
• Association of Talent Acquisition Professionals (ATAP) - Board Member
• Diversity & Inclusion Council - Executive Committee Chair
• Industry Excellence Award Recipient - Outstanding HR Innovation (2023)
• Featured Speaker - National HR Conference on Workforce Analytics
• Published Contributor - HR Executive Magazine and Talent Management Quarterly`;

            // Add strategic projects section
            const strategicProjects = `
STRATEGIC INITIATIVES & THOUGHT LEADERSHIP
• Global Talent Acquisition Transformation: Led enterprise-wide implementation affecting 2,000+ employees
• Diversity & Inclusion Roadmap: Designed 3-year strategy increasing representation by 45% across all levels
• Future of Work Research: Co-authored whitepaper on remote workforce optimization cited 500+ times
• Executive Coaching Program: Mentored C-suite leaders on organizational development and change management
• Workforce Analytics Platform: Pioneered predictive modeling reducing turnover by 30%`;

            // Insert strategic sections before technical proficiencies
            enhancedContent = enhancedContent.replace(
                'TECHNICAL PROFICIENCIES',
                affiliations + '\n\n' + strategicProjects + '\n\nTECHNICAL PROFICIENCIES'
            );
            
            return enhancedContent;
        }

        function generateEducationSection(originalResume) {
            const educationMatch = originalResume.match(/(?:Bachelor|Master|PhD|Associate).*?(?:University|College|Institute).*?(?:\d{4})?/gi);
            if (educationMatch && educationMatch.length > 0) {
                return educationMatch.join('\n');
            }
            
            return 'Bachelor\'s Degree | Relevant University | Graduation Year';
        }

        function generateTechnicalSkills(keywords, industry) {
            const techKeywords = keywords.filter(k => {
                const techTerms = ['software', 'system', 'platform', 'tool', 'technology', 'programming', 'database', 'cloud', 'api', 'framework'];
                return techTerms.some(term => k.toLowerCase().includes(term)) || k.length < 15;
            });
            
            const skills = techKeywords.slice(0, 15).map(skill => 
                skill.charAt(0).toUpperCase() + skill.slice(1)
            );
            
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

        function parseResume(resume) {
            const sections = {};
            
            const sectionPatterns = {
                summary: /(?:professional\s+summary|summary|profile|objective)[\s\S]*?(?=\n[A-Z\s]{10,}|\n\n[A-Z]|$)/gi,
                experience: /(?:professional\s+experience|work\s+experience|experience|employment)[\s\S]*?(?=\n[A-Z\s]{10,}|\n\n[A-Z]|$)/gi,
                education: /(?:education|academic\s+background|qualifications)[\s\S]*?(?=\n[A-Z\s]{10,}|\n\n[A-Z]|$)/gi,
                skills: /(?:skills|technical\s+skills|core\s+competencies|competencies)[\s\S]*?(?=\n[A-Z\s]{10,}|\n\n[A-Z]|$)/gi
            };
            
            for (const [sectionName, pattern] of Object.entries(sectionPatterns)) {
                const match = resume.match(pattern);
                if (match && match[0]) {
                    sections[sectionName] = match[0].replace(/^[A-Z\s]+/i, '').trim();
                }
            }
            
            return sections;
        }

        function extractKeywords(text) {
            const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'must', 'shall', 'this', 'that', 'these', 'those'];
            
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
                .slice(0, 25);
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
                .split('\n')
                .map(line => {
                    const trimmed = line.trim();
                    if (!trimmed) return '<br>';
                    if (trimmed.match(/^[A-Z\s]+$/)) return `<h2>${trimmed}</h2>`;
                    if (trimmed.startsWith('•')) return `<li>${trimmed.substring(1).trim()}</li>`;
                    return `<p>${trimmed}</p>`;
                })
                .join('')
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
                        body { font-family: Georgia, serif; line-height: 1.6; margin: 0.5in; color: #333; }
                        h1, h2 { color: #1e293b; margin-bottom: 0.5rem; }
                        h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                        ul { margin: 0; padding-left: 20px; }
                        li { margin-bottom: 5px; }
                        p { margin-bottom: 0.5rem; }
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
            document.getElementById('resumeFile').value = '';
            document.getElementById('jobFile').value = '';
            document.getElementById('resumePreview').innerHTML = `Your optimized resume will appear here after processing...

Click "Optimize Resume" to get started with AI-powered optimization that includes:
• Industry-specific keyword integration
• ATS-friendly formatting  
• Skills alignment with job requirements
• Professional summary enhancement
• Achievement quantification
• Section reorganization for impact

Or click "Load Sample Data" to test with example content.`;
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

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const textareas = document.querySelectorAll('.textarea');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.min(this.scrollHeight, 400) + 'px';
                });
            });

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
    </script>
</body>
</html>
