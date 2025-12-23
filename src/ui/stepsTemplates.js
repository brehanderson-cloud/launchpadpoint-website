// Reusable components within steps
const nextBtn = (text) => `
    <button class="next-step-trigger btn-primary bg-primary-navy w-full mt-12 py-4 text-xl">
        ${text} <i class="fas fa-arrow-right ms-3"></i>
    </button>
`;

const bucketHeader = (colorClass, icon, title) => `
    <h2 class="m-0 p-5 md:p-6 text-white text-xl flex items-center gap-3 bg-gradient-to-br ${colorClass}">
        <i class="fas ${icon}"></i> ${title}
    </h2>
`;

const bucketList = (items, iconClass) => `
    <div class="p-6 md:p-8">
        <ul class="pl-2">
            ${items.map(item => `
                <li class="relative mb-4 pl-8 text-lg leading-relaxed">
                    <i class="fas ${iconClass} absolute left-0 top-1 text-xl opacity-80"></i>
                    ${item.text}
                    ${item.badge ? `<span class="inline-block bg-slate-100 text-slate-600 text-xs font-extrabold px-2 py-1 rounded ml-2 border border-slate-200 tracking-wide">${item.badge}</span>` : ''}
                </li>
            `).join('')}
        </ul>
    </div>
`;

// --- STEP 1 ---
export const Step1Analyze = `
<div id="step1-content" class="step-content">
    <div class="mb-10 text-center md:text-left">
        <h1 class="mb-4">Analyze Your Target Role</h1>
        <p class="text-lg text-text-muted">Paste the job description and upload your resume to decode the Job DNA.</p>
    </div>

    <div id="inputs-container" class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div>
             <label class="block font-bold mb-3 text-primary-navy text-lg">1. Paste Job Description text</label>
             <textarea class="w-full p-5 border-2 border-border rounded-2xl resize-y transition-all focus:border-accent-teal focus:outline-none focus:ring-4 focus:ring-accent-teal/10 bg-[#fcfcfc] text-base shadow-sm" rows="12" placeholder="Paste text here..."></textarea>
        </div>
        <div class="border-3 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-10 bg-bg-body hover:border-accent-teal hover:bg-accent-teal/5 transition-all cursor-pointer group">
             <i class="fas fa-cloud-upload-alt text-6xl mb-6 text-border group-hover:text-accent-teal transition-colors"></i>
             <label class="block font-bold text-xl mb-2 cursor-pointer">2. Upload Resume (PDF)</label>
             <p class="text-text-muted mb-6">Drag & drop or click to browse</p>
             <button class="font-bold py-3 px-8 rounded-xl border-2 border-border text-primary-navy bg-white hover:border-primary-navy hover:bg-bg-body transition-all shadow-sm">Choose File</button>
        </div>
    </div>
    <button id="analyze-btn" class="btn-primary w-full mt-10 bg-accent-teal hover:bg-[#007a82] py-5 text-xl">
        <i class="fas fa-microchip me-3"></i> Analyze Job DNA
    </button>

    <div id="analysis-results" class="hidden mt-10">
        <div class="mb-8 text-center">
            <h2>Job DNA Report</h2>
            <p class="text-text-muted">Role: Director of Talent Acquisition</p>
        </div>
        <div class="space-y-8">
             <div class="rounded-2xl overflow-hidden border border-border shadow-card">
                ${bucketHeader('from-accent-teal to-[#00b3bd]', 'fa-bullseye', 'Core Job Purpose')}
                <div class="p-6 md:p-8"><p class="text-lg md:text-xl font-medium text-[#064e3b] leading-relaxed">Lead the recruiting engine for a $1.4B Industrial Services business unit (~7,500 employees), directly managing a large team of 14-16 recruiters to execute high-volume hiring and strategic pipeline development.</p></div>
            </div>
             <div class="rounded-2xl overflow-hidden border border-border shadow-card">
                ${bucketHeader('from-primary-navy to-[#053057]', 'fa-tasks', 'Key Responsibilities')}
                ${bucketList([
                    {text: 'Manage and lead a team of 14-16 recruiters.', badge: 'LEADERSHIP'},
                    {text: 'Build strategic talent pipelines partnering with trade schools.', badge: 'SOURCING'},
                    {text: 'Drive high-volume hiring initiatives under tight deadlines.', badge: 'HIGH-VOLUME'},
                ], 'fa-check-circle text-primary-navy')}
            </div>
             <div class="rounded-2xl overflow-hidden border border-border shadow-card">
                ${bucketHeader('from-accent-orange to-[#ff8a4d]', 'fa-briefcase', 'Hard Requirements')}
                ${bucketList([
                    {text: 'Significant People Management Experience (14-16 reports).', badge: 'MANAGEMENT'},
                    {text: 'Industrial/High-Volume Experience supporting large operations.', badge: 'SCALE'},
                ], 'fa-times-circle text-accent-orange')}
            </div>
        </div>
        ${nextBtn('Next: Compare Your Fit')}
    </div>
</div>
`;

// --- STEP 2 ---
export const Step2Compare = `
<div id="step2-content" class="step-content hidden">
    <div class="mb-10">
        <h1>Compare Your Fit</h1>
        <div class="bg-indigo-bg p-4 md:p-6 rounded-2xl flex items-start md:items-center text-indigo-text mt-6 border border-indigo-text/20">
            <i class="fas fa-info-circle mr-4 text-2xl flex-shrink-0"></i>
            <p class="font-semibold text-lg">Action Required: Click any <span class="inline-flex mx-1 items-center gap-1 px-3 py-1 rounded-full font-bold text-sm bg-indigo-text text-white shadow-sm">Missing</span> item to bridge the gap.</p>
        </div>
    </div>

    <div class="flex flex-col gap-4">
        ${['Manage and lead a large team of 14-16 recruiters.', 'Build strategic talent pipelines with trade schools.'].map(text => `
        <div class="border-2 border-border rounded-2xl bg-[#f8fafc]/80">
            <div class="p-5 md:p-6 flex justify-between items-center font-bold text-lg cursor-default opacity-80">
                <span class="flex items-center gap-4"><i class="fas fa-check text-accent-teal text-xl"></i> ${text}</span>
                ${matchBadge}
            </div>
        </div>`).join('')}
        
        <div class="gap-item-container border-2 border-border rounded-2xl bg-white transition-all overflow-hidden hover:border-indigo-text/50 group">
            <div class="gap-header p-5 md:p-6 flex justify-between items-center font-bold text-lg cursor-pointer bg-white group-[.expanded]:bg-indigo-bg group-[.expanded]:text-indigo-text transition-colors">
                <span class="flex items-center gap-4"><i class="fas fa-exclamation-triangle text-accent-orange text-xl"></i> Support high-volume industrial business unit.</span>
                <div class="flex items-center gap-4 shrink-0">${missingBadge} <i class="fas fa-chevron-down transition-transform duration-300 group-[.expanded]:rotate-180 opacity-60 group-[.expanded]:opacity-100"></i></div>
            </div>
             <div class="gap-body hidden p-6 md:p-8 border-t-2 border-border group-[.expanded]:border-indigo-text bg-white group-[.expanded]:block animate-slide-down">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="border-2 border-indigo-text p-6 rounded-2xl bg-[#f9faff] flex gap-5 items-start">
                        <i class="fas fa-brain text-3xl text-indigo-text shrink-0"></i>
                        <div><h4 class="text-indigo-text mb-2 text-lg">Knowledge Gap</h4><p class="text-text-muted leading-relaxed">Industrial TA requires velocity and sourcing from skilled trade pools rather than professional networks.</p></div>
                    </div>
                    <div class="border-2 border-accent-orange bg-[#fff7ed] p-6 rounded-2xl flex gap-5 items-start">
                        <i class="far fa-lightbulb text-3xl text-accent-orange shrink-0"></i>
                        <div><h4 class="text-accent-orange mb-2 text-lg">Quick Project Idea</h4><p class="text-text-muted leading-relaxed">Create a 1-page 'High-Volume Deployment Plan' focusing on Time-to-Fill metrics for 50+ roles/month.</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ${nextBtn('Next: Optimize Resume')}
</div>
`;

// --- STEP 3 ---
export const Step3Optimize = `
<div id="step3-content" class="step-content hidden">
    <div class="mb-10 text-center md:text-left"><h1>Optimize Your Resume</h1><p class="text-text-muted text-lg">Use the tools on the left to update your live preview on the right.</p></div>
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div class="lg:col-span-5 bg-white border-2 border-border rounded-3xl p-6 md:p-8">
            <h3 class="text-xl font-bold mb-6 pb-4 border-b-2 border-border flex items-center text-primary-navy"><i class="fas fa-tools mr-3"></i> Guided Builder</h3>
            <div class="border-2 border-indigo-text rounded-2xl overflow-hidden shadow-md">
                <div class="p-4 bg-indigo-bg text-indigo-text font-bold flex items-center gap-3"><i class="fas fa-exclamation-triangle"></i> Address Gap: Industrial Experience</div>
                <div class="p-5 bg-white">
                     <p class="font-bold text-primary-navy mb-3">Prompt: Tell us about a time you handled high-volume workloads under tight deadlines.</p>
                     <textarea class="w-full p-4 border-2 border-border rounded-xl bg-[#fcfcfc] focus:border-accent-teal focus:outline-none transition-all mb-4 text-sm" rows="5" placeholder="I managed a project where we had to hire 50 people in a month..."></textarea>
                     <button id="polish-btn" class="btn-primary bg-indigo-text w-full py-3 text-base hover:bg-[#3127a3]">✨ Polish into Professional Bullet</button>
                     
                     <div id="polish-result" class="hidden mt-6 bg-success-bg border-2 border-success-green p-5 rounded-2xl animate-fade-in">
                        <strong class="text-[#064e3b] block mb-3 flex items-center gap-2"><i class="fas fa-robot"></i> AI Suggestion:</strong>
                        <p class="bg-white p-4 rounded-xl border border-[#d1fae5] font-medium mb-4 shadow-sm">"Orchestrated high-volume operational initiatives, managing concurrent workflows for 50+ weekly requisitions, achieving 100% staffing goals."</p>
                        <button id="add-to-resume-btn" class="btn-primary bg-success-green hover:bg-[#16a34a] w-full py-3 text-base shadow-sm"><i class="fas fa-plus me-2"></i> Add to Resume Preview</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:col-span-7 bg-[#fffdfa] shadow-panel rounded-3xl p-8 md:p-10 min-h-[700px] font-serif border border-[#eee] lg:sticky lg:top-8">
            <h3 class="text-xl font-bold mb-8 pb-4 border-b-2 border-gray-100 flex items-center font-sans text-primary-navy"><i class="far fa-file-alt mr-3"></i> Live Preview</h3>
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold tracking-wider mb-2 text-black">HERBERT ESSIEN</h2>
                <p class="text-text-muted text-sm">herbert.essien@email.com | (555) 123-4567 | Houston, TX</p>
            </div>
            <div>
                 <h5 class="border-b-2 border-[#333] pb-2 mb-4 font-bold tracking-widest text-sm text-black">PROFESSIONAL EXPERIENCE</h5>
                 <div class="mb-6">
                     <div class="flex justify-between mb-2 font-bold text-black"><span>Houston Methodist</span><span>2020 - Present</span></div>
                     <p class="italic mb-3 text-black">Talent Acquisition Lead</p>
                     <ul class="list-disc pl-5 space-y-2 text-black leading-relaxed">
                         <li id="new-resume-bullet" class="hidden p-1 rounded bg-[#fef9c3] transition-colors duration-[2000ms]">Orchestrated high-volume operational initiatives, managing concurrent workflows for 50+ weekly requisitions, achieving 100% staffing goals.</li>
                         <li>Oversaw a 16-person talent acquisition team, driving recruitment for critical clinical roles across multiple facilities.</li>
                         <li>Spearheaded strategic sourcing initiatives using data-driven approaches, reducing overall time-to-fill by 18% year-over-year.</li>
                     </ul>
                 </div>
            </div>
        </div>
    </div>
    ${nextBtn('Next: Practice Interview')}
</div>`;

// --- STEP 4 ---
export const Step4Practice = `
<div id="step4-content" class="step-content hidden">
    <div class="mb-10 text-center md:text-left"><h1>Practice the Pitch</h1><p class="text-text-muted text-lg">Prepare for the toughest questions targeting your gaps.</p></div>

    <div class="space-y-8 max-w-4xl mx-auto">
        <div class="interview-bucket group">
            <div class="p-5 md:p-6 text-white font-extrabold text-lg md:text-xl rounded-t-2xl flex items-center bg-gradient-to-br from-indigo-text to-[#3127a3] tracking-tight"><i class="fas fa-shield-alt mr-3 opacity-80"></i> The Gap Defenders (Critical)</div>
            <div class="gap-item-container border-2 border-t-0 border-border rounded-b-2xl bg-white transition-all hover:border-indigo-text/50">
                <div class="gap-header p-5 md:p-6 flex justify-between items-center font-bold text-lg cursor-pointer bg-white group-[.expanded]:bg-indigo-bg group-[.expanded]:text-indigo-text transition-colors">
                    <span>"I see you don't have direct industrial experience..."</span>
                    <i class="fas fa-chevron-down transition-transform duration-300 group-[.expanded]:rotate-180 opacity-60 group-[.expanded]:opacity-100"></i>
                </div>
                 <div class="gap-body hidden p-6 md:p-8 border-t-2 border-border bg-white group-[.expanded]:block animate-slide-down">
                    <div class="strategy-hint-box border-l-[6px] border-accent-orange bg-[#fff7ed] p-5 rounded-lg flex gap-4 mb-6">
                        <i class="far fa-lightbulb text-xl text-accent-orange mt-1 shrink-0"></i>
                        <div><strong class="text-accent-orange block mb-1">Strategy Hint:</strong><p class="text-sm md:text-base">Do not apologize. Acknowledge quickly, then pivot to the transferable skill: managing **high-volume, complex recruiting workflows** in a regulated environment.</p></div>
                    </div>
                    <label class="input-label block font-bold mb-3 text-primary-navy">Draft your answer (STAR Method):</label>
                    <textarea class="w-full p-4 border-2 border-border rounded-xl bg-[#fcfcfc] focus:border-accent-teal focus:outline-none transition-all mb-4 text-base" rows="5" placeholder="Situation, Task, Action, Result..."></textarea>
                    <button class="btn-primary bg-indigo-text hover:bg-[#3127a3] py-3 text-base shadow-sm"><i class="fas fa-save me-2"></i> Save Answer</button>
                </div>
            </div>
        </div>

        <div class="interview-bucket group">
            <div class="p-5 md:p-6 text-white font-extrabold text-lg md:text-xl rounded-t-2xl flex items-center bg-gradient-to-br from-accent-teal to-[#00b3bd] tracking-tight"><i class="fas fa-rocket mr-3 opacity-80"></i> The Strength Leverage</div>
             <div class="gap-item-container border-2 border-t-0 border-border rounded-b-2xl bg-white transition-all hover:border-accent-teal/50">
                <div class="gap-header p-5 md:p-6 flex justify-between items-center font-bold text-lg cursor-pointer bg-white group-[.expanded]:bg-accent-teal/10 group-[.expanded]:text-accent-teal transition-colors">
                    <span>"Tell me about a time you led a large team through change."</span>
                    <i class="fas fa-chevron-down transition-transform duration-300 group-[.expanded]:rotate-180 opacity-60 group-[.expanded]:opacity-100"></i>
                </div>
                 <div class="gap-body hidden p-6 md:p-8 border-t-2 border-border bg-white group-[.expanded]:block animate-slide-down">
                     <div class="strategy-hint-box border-l-[6px] border-accent-teal bg-indigo-bg p-5 rounded-lg flex gap-4 mb-6">
                        <i class="far fa-lightbulb text-xl text-accent-teal mt-1 shrink-0"></i>
                        <div><strong class="text-accent-teal block mb-1">Strategy Hint:</strong><p class="text-sm md:text-base">Lean into your experience managing 16 people. Focus on the *scale* of leadership frameworks you used.</p></div>
                    </div>
                    <label class="input-label block font-bold mb-3 text-primary-navy">Draft your answer (STAR Method):</label>
                    <textarea class="w-full p-4 border-2 border-border rounded-xl bg-[#fcfcfc] focus:border-accent-teal focus:outline-none transition-all mb-4 text-base" rows="5" placeholder="Situation, Task, Action, Result..."></textarea>
                     <button class="btn-primary bg-accent-teal hover:bg-[#007a82] py-3 text-base shadow-sm"><i class="fas fa-save me-2"></i> Save Answer</button>
                </div>
            </div>
        </div>
    </div>
    ${nextBtn('Next: Plan Your Future')}
</div>`;

// --- STEP 5 ---
export const Step5Plan = `
<div id="step5-content" class="step-content hidden">
    <div class="mb-12 text-center">
            <h1 class="mb-4">The Career Crossroads</h1>
            <p class="text-xl md:text-2xl text-text-muted">Choose your strategic path forward.</p>
    </div>
    
    <div id="crossroads-selection" class="flex flex-col md:flex-row gap-8 md:gap-12 mt-10 max-w-5xl mx-auto">
            <div class="flex-1 p-10 md:p-14 text-center border-[3px] border-accent-orange rounded-3xl cursor-pointer bg-white hover:-translate-y-3 hover:shadow-panel hover:bg-[#fffaf5] transition-all group relative overflow-hidden">
            <i class="fas fa-rocket text-7xl md:text-8xl mb-8 text-accent-orange group-hover:scale-110 transition-transform duration-300"></i>
            <h3 class="text-2xl md:text-3xl mb-4">Launch Mode</h3>
            <p class="text-lg md:text-xl text-text-muted mb-8 leading-relaxed">I'm ready to leave. Give me the roadmap to secure this new role.</p>
            <button class="btn-primary bg-accent-orange hover:bg-[#d95e1a] text-lg py-4 px-8 w-full md:w-auto">View Launch Roadmap</button>
        </div>
            <div id="growth-mode-card" class="flex-1 p-10 md:p-14 text-center border-[3px] border-accent-teal rounded-3xl cursor-pointer bg-indigo-bg hover:bg-[#e6f0ff] hover:-translate-y-3 hover:shadow-panel transition-all group relative overflow-hidden">
            <i class="fas fa-seedling text-7xl md:text-8xl mb-8 text-accent-teal group-hover:scale-110 transition-transform duration-300"></i>
            <h3 class="text-2xl md:text-3xl mb-4">Growth Mode</h3>
            <p class="text-lg md:text-xl text-text-muted mb-8 leading-relaxed">I want to stay and build leverage for promotion here first.</p>
            <button class="btn-primary bg-accent-teal hover:bg-[#007a82] text-lg py-4 px-8 w-full md:w-auto shadow-sm">Open Growth Dashboard</button>
        </div>
    </div>

    <div id="growth-dashboard" class="hidden mt-16 bg-white rounded-3xl shadow-panel overflow-hidden border-2 border-border animate-slide-up">
        <div class="flex bg-primary-navy px-6 md:px-10">
            <button class="dash-tab-btn active flex-1 p-6 text-lg md:text-xl font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all relative flex items-center justify-center gap-3 [&.active]:text-white [&.active]:bg-white/10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-accent-teal after:hidden [&.active]:after:block" data-tab="timeline">
                <i class="fas fa-chart-line"></i> The 5-Year Climb
            </button>
            <button class="dash-tab-btn flex-1 p-6 text-lg md:text-xl font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all relative flex items-center justify-center gap-3 [&.active]:text-white [&.active]:bg-white/10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-accent-teal after:hidden [&.active]:after:block" data-tab="manager">
                <i class="fas fa-handshake"></i> Manager Alignment
            </button>
        </div>
        
        <div class="p-8 md:p-12 bg-bg-body">
            <div id="tab-content-timeline" class="dash-tab-content animate-fade-in">
                <div class="mb-10 text-center md:text-left"><h3>Your Path to VP/Head of TA</h3><p class="text-text-muted text-lg">Click a year to see requirements.</p></div>
                
                <div class="relative flex justify-between px-4 md:px-10 py-10 mb-12">
                    <div class="absolute top-[75px] left-[50px] right-[50px] h-2 bg-border rounded-full -z-10"></div>
                    ${[1,2,3,4,5].map(year => `
                        <div class="year-node relative z-10 text-center w-24 cursor-pointer opacity-60 hover:opacity-100 transition-all group ${year === 3 ? 'active opacity-100' : ''}" data-year="${year}">
                            <div class="year-circle w-16 h-16 md:w-20 md:h-20 bg-white border-[6px] border-border rounded-full flex items-center justify-center font-extrabold text-xl md:text-2xl text-text-muted mb-4 transition-all group-[.active]:border-accent-teal group-[.active]:bg-accent-teal group-[.active]:text-white group-[.active]:scale-110 group-[.active]:shadow-[0_10px_25px_rgba(0,142,151,0.4)]">${year}</div>
                            <span class="font-bold text-primary-navy">${['Foundation','Building','Leverage','Lead','Mastery'][year-1]}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div id="year-requirements-bucket" class="rounded-2xl overflow-hidden border border-border shadow-card bg-white">
                    ${bucketHeader('from-accent-teal to-[#00b3bd]', 'fa-clipboard-check', 'Year 3 Requirements to unlock Year 4:')}
                    <div class="p-6 md:p-8">
                        <ul class="space-y-4">
                             <li class="flex justify-between items-center p-5 bg-[#f8fafc] rounded-xl"><span class="flex items-center gap-4 text-lg opacity-70 line-through"><i class="fas fa-check-circle text-accent-teal text-2xl"></i> Complete advanced analytics certification</span>${matchBadge}</li>
                             <li class="flex justify-between items-center p-5 bg-white rounded-xl border-2 border-accent-orange shadow-sm font-bold text-lg"><span class="flex items-center gap-4"><i class="far fa-square text-accent-orange text-2xl"></i> Lead 2 cross-functional initiatives</span>${missingBadge}</li>
                             <li class="flex justify-between items-center p-5 bg-[#f8fafc] rounded-xl text-lg"><span class="flex items-center gap-4 text-text-muted"><i class="far fa-square text-2xl"></i> Mentor a junior staff member</span><span class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-text-muted text-white">To Do</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="tab-content-manager" class="dash-tab-content hidden animate-fade-in">
                 <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div class="bg-white border-2 border-border rounded-3xl p-8">
                        <h3 class="text-xl font-bold mb-6">Input Current Objectives</h3>
                        <textarea class="w-full p-5 border-2 border-border rounded-xl bg-[#fcfcfc] mb-6" rows="8" placeholder="Paste OKRs here..."></textarea>
                        <button class="btn-primary bg-primary-navy w-full py-4 text-lg">Analyze Alignment</button>
                    </div>
                    <div class="bg-indigo-bg rounded-3xl p-10 font-serif">
                        <h3 class="text-xl font-bold mb-6 font-sans text-primary-navy">Alignment Script Preview</h3>
                        <div class="p-8 bg-white rounded-2xl border-l-4 border-indigo-text shadow-sm"><p class="italic text-text-muted text-lg leading-relaxed">"I've reviewed my current objectives against strategic needs..."</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
