<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Herbert Essien - Senior Talent Acquisition Partner</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            background-color: #fff;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 0.5rem;
            letter-spacing: 1px;
        }

        .header .title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 1rem;
        }

        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
            font-size: 0.95rem;
        }

        .contact-info span {
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        .section {
            margin-bottom: 2rem;
        }

        .section-title {
            font-size: 1.1rem;
            font-weight: bold;
            color: #1e293b;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.3rem;
            margin-bottom: 1rem;
        }
        .summary {
            font-size: 1rem;
            text-align: justify;
            line-height: 1.7;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            font-size: 0.95rem;
        }

        .skill-category {
            margin-bottom: 0.8rem;
        }

        .skill-category strong {
            color: #2563eb;
            display: block;
            margin-bottom: 0.3rem;
        }

        .job {
            margin-bottom: 2rem;
            page-break-inside: avoid;
        }

        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.5rem;
            flex-wrap: wrap;
        }

        .company-title {
            font-size: 1.1rem;
            font-weight: bold;
            color: #1e293b;
        }

        .job-title {
            font-size: 1rem;
            color: #2563eb;
            font-weight: 600;
        }

        .dates {
            font-size: 0.9rem;
            color: #64748b;
            font-weight: 500;
        }

        .job-section {
            margin-bottom: 1rem;
        }

        .job-section-title {
            font-weight: bold;
            color: #374151;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
        }

        .bullet-points {
            list-style: none;
            padding-left: 0;
        }

        .bullet-points li {
            position: relative;
            padding-left: 1.2rem;
            margin-bottom: 0.4rem;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .bullet-points li::before {
            content: "•";
            color: #2563eb;
            font-weight: bold;
            position: absolute;
            left: 0;
        }

        .achievements {
            background-color: #f8fafc;
            padding: 1rem;
            border-left: 4px solid #2563eb;
            margin-bottom: 1.5rem;
        }

        .achievements-title {
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 0.5rem;
        }

        .achievement-item {
            margin-bottom: 0.8rem;
        }

        .achievement-item strong {
            color: #2563eb;
            display: block;
            margin-bottom: 0.2rem;
        }

        .education {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 1rem;
        }

        .degree {
            font-weight: bold;
            color: #1e293b;
        }

        .school {
            color: #64748b;
        }

        .tech-skills {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            font-size: 0.9rem;
        }

        .tech-category strong {
            color: #2563eb;
            display: block;
            margin-bottom: 0.3rem;
        }

        @media print {
            body {
                font-size: 11pt;
                padding: 0.3in;
            }
            
            .header h1 {
                font-size: 22pt;
            }
            
            .contact-info {
                font-size: 10pt;
            }
            
            .section {
                margin-bottom: 12pt;
            }
            
            .bullet-points li {
                font-size: 10pt;
            }
        }

        @media (max-width: 768px) {
            .skills-grid {
                grid-template-columns: 1fr;
            }
            
            .job-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .contact-info {
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>HERBERT ESSIEN</h1>
        <div class="title">Senior Talent Acquisition Partner</div>
        <div class="contact-info">
            <span>📧 Herbertessien01@gmail.com</span>
            <span>📱 (346) 530-3020</span>
            <span>💼 LinkedIn Profile</span>
            <span>📍 Houston, TX</span>
        </div>
    </div>
    <div class="section">
        <h2 class="section-title">Professional Summary</h2>
        <div class="summary">
            Strategic HR professional with 8+ years of progressive talent acquisition and HR management experience, including executive-level recruitment and complex organizational initiatives. Proven track record of leading full-cycle recruitment for senior-level positions across manufacturing, distribution, and corporate environments. Expert in building diverse talent pipelines, advising senior leadership on talent strategies, and implementing data-driven recruitment solutions. SHRM-CP certified with demonstrated success in mentoring teams, managing high-complexity searches, and driving measurable improvements in hiring efficiency and candidate quality.
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Core Competencies</h2>
        <div class="skills-grid">
            <div class="skill-category">
                <strong>Strategic Talent Acquisition:</strong>
                Executive search, high-complexity role recruitment, talent mapping, passive candidate engagement
            </div>
            <div class="skill-category">
                <strong>Leadership Advisory:</strong>
                Senior stakeholder consultation, workforce planning, succession planning, market intelligence
            </div>
            <div class="skill-category">
                <strong>Advanced Sourcing:</strong>
                Boolean search techniques, diverse pipeline development, talent calibration processes
            </div>
            <div class="skill-category">
                <strong>Data-Driven Recruitment:</strong>
                Analytics and reporting, time-to-fill optimization, candidate quality metrics
            </div>
            <div class="skill-category">
                <strong>Team Development:</strong>
                Mentorship, coaching, training program development and delivery
            </div>
            <div class="skill-category">
                <strong>Compliance & DEI:</strong>
                Inclusive hiring practices, employment law compliance, audit participation
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Professional Experience</h2>
        
        <div class="job">
            <div class="job-header">
                <div>
                    <div class="company-title">AkzoNobel</div>
                    <div class="job-title">HR Manager / HR Business Partner</div>
                </div>
                <div class="dates">09/2021 - Present</div>
            </div>
            
            <div class="job-section">
                <div class="job-section-title">Strategic Talent Management & Advisory</div>
                <ul class="bullet-points">
                    <li>Lead operational workforce planning and talent calibration processes across multiple manufacturing sites and regional distribution centers, directly advising senior leadership on strategic talent initiatives</li>
                    <li>Facilitate annual performance reviews and succession planning for executive and senior-level positions, ensuring alignment with organizational objectives</li>
                    <li>Partner with Centers of Excellence to develop and implement talent acquisition strategies for hard-to-fill specialized roles in manufacturing and operations</li>
                    <li>Mentor and coach hiring managers on advanced recruitment techniques, candidate assessment, and hiring best practices</li>
                </ul>
            </div>

            <div class="job-section">
                <div class="job-section-title">Complex Recruitment & Sourcing Excellence</div>
                <ul class="bullet-points">
                    <li>Execute full-cycle recruitment for senior management and specialized technical positions across Houston manufacturing facility, Florida operations, and US-based distribution network</li>
                    <li>Design and implement customized sourcing strategies that successfully expanded diverse talent pipelines by 40%</li>
                    <li>Collaborate with regional rewards team on compensation strategy and negotiation for executive-level hires</li>
                    <li>Champion company values and leadership behaviors while ensuring inclusive hiring practices across all locations</li>
                </ul>
            </div>

            <div class="job-section">
                <div class="job-section-title">Data Analysis & Process Improvement</div>
                <ul class="bullet-points">
                    <li>Analyze recruitment metrics and provide strategic recommendations that improved time-to-fill by 25% and enhanced candidate quality scores</li>
                    <li>Lead standardization initiatives and continuous improvement projects, implementing AkzoNobel global HR processes locally</li>
                    <li>Ensure compliance with local legal requirements and participate in internal/external audits</li>
                    <li>Identify and resolve data inaccuracies in HR systems, improving reporting accuracy and decision-making capabilities</li>
                </ul>
            </div>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="company-title">Randstad</div>
                    <div class="job-title">Talent Acquisition Lead</div>
                </div>
                <div class="dates">08/2020 – 09/2021</div>
            </div>
            
            <div class="job-section">
                <div class="job-section-title">Strategic Business Development & Client Partnership</div>
                <ul class="bullet-points">
                    <li>Developed and executed comprehensive recruitment strategies across multiple industry verticals, managing high-complexity client relationships</li>
                    <li>Built strategic partnerships with C-level executives and key decision-makers, serving as trusted advisor on workforce solutions</li>
                    <li>Conducted high-volume outreach and client engagement, consistently exceeding placement targets by 30%</li>
                    <li>Assessed organizational workforce gaps and provided tailored employment solutions, including succession planning recommendations</li>
                </ul>
            </div>

            <div class="job-section">
                <div class="job-section-title">Advanced Sourcing & Candidate Management</div>
                <ul class="bullet-points">
                    <li>Executed sophisticated sourcing strategies using Boolean search techniques and talent mapping for executive and specialized roles</li>
                    <li>Managed complete candidate lifecycle from identification through onboarding, ensuring exceptional candidate experience</li>
                    <li>Negotiated complex compensation packages and terms, achieving optimal outcomes for both clients and candidates</li>
                    <li>Provided ongoing coaching and retention support, resulting in 95% candidate retention rate</li>
                </ul>
            </div>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="company-title">Lucas</div>
                    <div class="job-title">Talent Acquisition Specialist</div>
                </div>
                <div class="dates">09/2019 – 08/2020</div>
            </div>
            
            <div class="job-section">
                <div class="job-section-title">Corporate Recruiting Excellence</div>
                <ul class="bullet-points">
                    <li>Led corporate recruiting initiatives for administrative and professional roles, partnering with hiring managers to define effective sourcing strategies</li>
                    <li>Built comprehensive talent pipelines for specialized positions, reducing time-to-fill for critical roles by 35%</li>
                    <li>Conducted thorough candidate assessments including behavioral interviews, skills evaluations, and comprehensive reference checks</li>
                    <li>Maintained detailed recruitment analytics and reporting to drive strategic decision-making and process improvements</li>
                </ul>
            </div>

            <div class="job-section">
                <div class="job-section-title">Stakeholder Management & Compliance</div>
                <ul class="bullet-points">
                    <li>Served as primary liaison between candidates, hiring managers, and HR leadership throughout recruitment process</li>
                    <li>Ensured full compliance with federal, state, and local employment regulations, maintaining zero compliance violations</li>
                    <li>Tracked and analyzed talent acquisition metrics, providing data-driven insights to optimize recruitment strategies</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="achievements">
        <div class="achievements-title">Key Achievements & Projects</div>
        
        <div class="achievement-item">
            <strong>Organizational Transformation Leadership</strong>
            Spearheaded comprehensive job description overhaul for North America HR policies, ensuring consistency and compliance across 200+ positions. Led organizational restructuring initiative, contributing to new blueprint design for North America organizational structure. Developed career progression framework for production roles, creating clear advancement pathways.
        </div>

        <div class="achievement-item">
            <strong>Diversity & Inclusion Excellence</strong>
            Appointed and developed D&I Ambassadors across Texas and Florida operations, enhancing inclusive workplace culture. Implemented inclusive hiring practices that increased diverse candidate representation by 45%.
        </div>

        <div class="achievement-item">
            <strong>Employee Engagement Innovation</strong>
            Partnered with Buckner Children Family Services to design employee engagement initiatives, improving retention rates by 20%.
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Education & Certifications</h2>
        
        <div class="education">
            <div>
                <div class="degree">Bachelor of Science, Sport Administration</div>
                <div class="school">Louisiana State University | Baton Rouge, LA</div>
            </div>
            <div class="dates">December 2013</div>
        </div>

        <div class="education">
            <div>
                <div class="degree">SHRM-CP Certification</div>
                <div class="school">Society for Human Resource Management</div>
            </div>
            <div class="dates">2025</div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Technical Proficiencies</h2>
        <div class="tech-skills">
            <div class="tech-category">
                <strong>Recruitment Technology:</strong>
                Advanced Boolean search, ATS platforms, talent mapping tools, social recruiting platforms
            </div>
            <div class="tech-category">
                <strong>Analytics & Reporting:</strong>
                HR metrics analysis, recruitment dashboards, data visualization, ROI analysis
            </div>
            <div class="tech-category">
                <strong>Project Management:</strong>
                Cross-functional team leadership, process optimization, change management
            </div>
        </div>
    </div>
</body>
</html>
