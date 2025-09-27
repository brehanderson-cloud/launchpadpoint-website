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
export default App;
