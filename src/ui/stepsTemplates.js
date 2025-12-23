// Reusable component strings
const missingBadge = `<span class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-indigo-text text-white shadow-sm"><i class="fas fa-times-circle"></i> Missing ℹ️</span>`;
const matchBadge = `<span class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-accent-teal text-white shadow-sm"><i class="fas fa-check-circle"></i> Match</span>`;

export const Step1Analyze = `
<div id="step1-content" class="step-content p-6 md:p-10 animate-fade-in">
    <div class="mb-10">
        <h1 class="mb-4">Analyze Your Target Role</h1>
        <p class="text-lg text-text-muted">Paste the job description and upload your resume to decode the Job DNA.</p>
    </div>

    <div id="inputs-container" class="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        <div>
             <label class="block font-bold mb-4 text-primary-navy text-lg">1. Paste Job Description text</label>
             <textarea class="w-full p-5 border-2 border-border rounded-xl resize-y transition-all focus:border-accent-teal focus:outline-none focus:ring-4 focus:ring-accent-teal/10 bg-[#fcfcfc]" rows="15" placeholder="Paste text here..."></textarea>
        </div>
        <div class="border-3 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10 bg-bg-body hover:border-accent-teal hover:bg-accent-teal/5 transition-all cursor-pointer">
             <i class="fas fa-cloud-upload-alt fa-4x mb-6 text-border"></i>
             <label class="block font-bold text-lg mb-2">2. Upload Resume (PDF)</label>
             <p class="text-text-muted mb-6">Drag & drop or click to browse</p>
             <button class="font-bold py-3 px-6 rounded-xl border-2 border-border text-primary-navy bg-white hover:border-primary-navy">Choose File</button>
        </div>
    </div>
    <button id="analyze-btn" class="btn-primary w-full mt-10 bg-accent-teal hover:bg-opacity-90 text-xl py-5">
        <i class="fas fa-microchip me-2"></i> Analyze Job DNA
    </button>

    <div id="analysis-results" class="hidden mt-10">
        </div>
     <button id="next-step-btn" class="hidden btn-primary w-full mt-12 text-xl py-5">
        Next: Compare Your Fit <i class="fas fa-arrow-right ms-2"></i>
    </button>
</div>
`;

export const Step2Compare = `
<div id="step2-content" class="step-content hidden p-6 md:p-10 animate-fade-in">
    <div class="mb-10">
        <h1>Compare Your Fit</h1>
        <div class="bg-indigo-bg p-5 rounded-xl flex items-center text-indigo-text mt-6">
            <i class="fas fa-info-circle mr-3 text-xl"></i>
            <p class="font-semibold">Action Required: Click any <span class="inline-flex mx-2 items-center gap-1 px-3 py-1 rounded-full font-bold text-xs bg-indigo-text text-white">Missing</span> item to bridge the gap.</p>
        </div>
    </div>

    <div class="flex flex-col gap-4">
        <div class="border-2 border-border rounded-xl bg-white opacity-80">
            <div class="p-6 flex justify-between items-center font-bold text-lg cursor-default">
                <span class="flex items-center"><i class="fas fa-check text-accent-teal mr-4"></i> Manage and lead a large team of 14-16 recruiters.</span>
                ${matchBadge}
            </div>
        </div>
        
        <div class="gap-item-container border-2 border-indigo-text rounded-xl bg-white shadow-lg transition-all overflow-hidden">
            <div class="gap-header p-6 flex justify-between items-center font-bold text-lg cursor-pointer bg-indigo-bg text-indigo-text">
                <span class="flex items-center"><i class="fas fa-exclamation-triangle text-accent-orange mr-4"></i> Support high-volume industrial business unit.</span>
                <div class="flex items-center gap-4">${missingBadge} <i class="fas fa-chevron-up transition-transform"></i></div>
            </div>
             <div class="gap-body p-8 border-t-2 border-indigo-text bg-white animate-slide-down">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="border-2 border-indigo-text p-8 rounded-xl bg-[#f9faff] flex gap-6">
                        <div><i class="fas fa-brain fa-2x text-indigo-text"></i></div>
                        <div><h4 class="text-indigo-text mb-3">Knowledge Gap</h4><p class="text-sm">Industrial TA requires velocity and sourcing from skilled trade pools rather than professional networks.</p></div>
                    </div>
                    <div class="border-2 border-accent-orange bg-[#fff7ed] p-8 rounded-xl flex gap-6">
                        <div><i class="far fa-lightbulb fa-2x text-accent-orange"></i></div>
                        <div><h4 class="text-accent-orange mb-3">Quick Project Idea</h4><p class="text-sm">Create a 1-page 'High-Volume Deployment Plan' focusing on Time-to-Fill metrics for 50+ roles/month.</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="next-step-trigger btn-primary w-full mt-12 text-xl py-5">Next: Optimize Resume <i class="fas fa-arrow-right ms-2"></i></button>
</div>
`;

// Placeholder templates for 3, 4, 5 to keep file size manageable for now. 
// These follow the exact same pattern: putting Tailwind classes into HTML strings.
export const Step3Optimize = `
<div id="step3-content" class="step-content hidden p-10 animate-fade-in">
    <div class="mb-10"><h1>Optimize Your Resume</h1><p class="text-text-muted">Split-screen builder implementation...</p></div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div class="bg-white border-2 border-border rounded-2xl p-8"><h3 class="text-xl font-bold mb-6 pb-4 border-b-2 border-border flex items-center"><i class="fas fa-tools mr-3"></i> Guided Builder</h3><p class="text-text-muted">Builder controls go here.</p></div>
        <div class="bg-[#fffdfa] shadow-panel rounded-2xl p-10 min-h-[700px] font-serif sticky top-8"><h3 class="text-xl font-bold mb-6 pb-4 border-b-2 border-gray-100 flex items-center font-sans text-primary-navy"><i class="far fa-file-alt mr-3"></i> Live Preview</h3><p class="text-center text-text-muted">Resume preview goes here.</p></div>
    </div>
    <button class="next-step-trigger btn-primary w-full mt-12 text-xl py-5">Next: Practice Interview <i class="fas fa-arrow-right ms-2"></i></button>
</div>`;

export const Step4Practice = `
<div id="step4-content" class="step-content hidden p-10 animate-fade-in">
    <div class="mb-10"><h1>Practice the Pitch</h1><p class="text-text-muted">Interview simulation implementation...</p></div>
     <div class="mb-10">
        <div class="p-6 text-white font-extrabold text-xl rounded-t-2xl flex items-center bg-gradient-to-br from-indigo-text to-[#3127a3]"><i class="fas fa-shield-alt mr-3"></i> The Gap Defenders (Critical)</div>
        <div class="border-2 border-t-0 border-border rounded-b-2xl p-8 bg-white">Accordion content here...</div>
    </div>
     <button class="next-step-trigger btn-primary w-full mt-12 text-xl py-5">Next: Plan Your Future <i class="fas fa-arrow-right ms-2"></i></button>
</div>`;

export const Step5Plan = `
<div id="step5-content" class="step-content hidden p-10 animate-fade-in">
    <div class="mb-12 text-center"><h1>The Career Crossroads</h1><p class="text-2xl text-text-muted mt-4">Choose your strategic path forward.</p></div>
    <div class="flex flex-col md:flex-row gap-10 mt-10">
         <div class="flex-1 p-16 text-center border-4 border-accent-orange rounded-3xl cursor-pointer bg-white hover:-translate-y-3 hover:shadow-panel transition-all group">
            <i class="fas fa-rocket text-7xl mb-8 text-accent-orange group-hover:scale-110 transition-transform"></i>
            <h3 class="text-3xl mb-4">Launch Mode</h3><p class="text-xl text-text-muted mb-8">Give me the roadmap to secure this new role.</p>
        </div>
         <div class="flex-1 p-16 text-center border-4 border-accent-teal rounded-3xl cursor-pointer bg-indigo-bg hover:bg-[#e6f0ff] hover:-translate-y-3 hover:shadow-panel transition-all group">
            <i class="fas fa-seedling text-7xl mb-8 text-accent-teal group-hover:scale-110 transition-transform"></i>
            <h3 class="text-3xl mb-4">Growth Mode</h3><p class="text-xl text-text-muted mb-8">I want to build leverage here first.</p>
        </div>
    </div>
</div>`;
