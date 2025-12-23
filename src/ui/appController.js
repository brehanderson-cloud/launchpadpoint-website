import { NavBar, ProgressBar } from './layout.js';
import { Step1Analyze, Step2Compare, Step3Optimize, Step4Practice, Step5Plan } from './stepsTemplates.js';

// --- Global State ---
let currentStep = 1;
let appContainer = null;

// --- Main Initialization Function ---
export function initV9App(rootElement) {
    appContainer = rootElement;
    renderAppSkeleton();
    updateUIForStep(currentStep);
    attachEventListeners();
}

// --- Rendering Logic ---
function renderAppSkeleton() {
    // Inject the main layout framework
    appContainer.innerHTML = `
        <div class="min-h-screen flex flex-col bg-bg-body">
            ${NavBar}
            <div id="progress-bar-mount" class="sticky top-[72px] z-40">
                 ${ProgressBar(currentStep)}
            </div>
            <main class="flex-grow container mx-auto max-w-6xl mt-8 mb-20 md:mt-12 md:mb-24 p-0 md:p-4">
                 <div class="bg-white rounded-[2rem] shadow-panel border border-white/50 overflow-hidden relative">
                    ${Step1Analyze}
                    ${Step2Compare}
                    ${Step3Optimize}
                    ${Step4Practice}
                    ${Step5Plan}
                 </div>
            </main>
        </div>
    `;
}

// --- State & Navigation Logic ---
function updateUIForStep(stepNum) {
    currentStep = stepNum;

    // 1. Update Progress Bar
    const progressMount = document.getElementById('progress-bar-mount');
    if(progressMount) progressMount.innerHTML = ProgressBar(currentStep);

    // 2. Hide all steps
    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));

    // 3. Show active step
    const activeContent = document.getElementById(`step${stepNum}-content`);
    if(activeContent) activeContent.classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Event Listeners ---
function attachEventListeners() {
    appContainer.addEventListener('click', (e) => {
        // Navigation: Step Indicators
        const stepIndicator = e.target.closest('.step-indicator');
        if (stepIndicator) {
            const targetStep = parseInt(stepIndicator.dataset.step);
            if(targetStep <= currentStep + 1) updateUIForStep(targetStep);
        }

        // Navigation: Next Buttons
        if(e.target.closest('.next-step-trigger') && currentStep < 5) {
             updateUIForStep(currentStep + 1);
        }

        // Step 1: Analyze Button Mock
        if(e.target.id === 'analyze-btn') {
             const btn = e.target;
             btn.innerHTML = '<i class="fas fa-spinner fa-spin me-3"></i> Decoding Job DNA...';
             btn.disabled = true;
             document.getElementById('inputs-container').classList.add('opacity-50');
             setTimeout(() => {
                 document.getElementById('inputs-container').classList.add('hidden');
                 document.getElementById('analysis-results').classList.remove('hidden');
                 // Trigger animation on results
                 document.getElementById('analysis-results').classList.add('animate-fade-in');
             }, 1500);
        }

        // Step 2 & 4: Accordion Toggles
        const gapHeader = e.target.closest('.gap-header');
        if(gapHeader) {
            gapHeader.parentElement.classList.toggle('expanded');
        }

        // Step 3: Resume Polish Mock
        if(e.target.id === 'polish-btn') {
            e.target.disabled = true;
            e.target.innerHTML = '<i class="fas fa-check me-2"></i> Polished';
            document.getElementById('polish-result').classList.remove('hidden');
        }
        // Step 3: Add to Resume Mock
        if(e.target.id === 'add-to-resume-btn') {
            e.target.disabled = true;
            e.target.innerHTML = '<i class="fas fa-check-double me-2"></i> Added to Resume';
            const bullet = document.getElementById('new-resume-bullet');
            bullet.classList.remove('hidden');
            // Remove highlight after 2s
            setTimeout(() => bullet.classList.remove('bg-[#fef9c3]'), 2000);
        }

        // Step 5: Growth Dashboard Reveal
        if(e.target.closest('#growth-mode-card')) {
            document.getElementById('crossroads-selection').classList.add('hidden');
            const dash = document.getElementById('growth-dashboard');
            dash.classList.remove('hidden');
        }

        // Step 5: Dashboard Tabs
        const dashTab = e.target.closest('.dash-tab-btn');
        if(dashTab) {
            document.querySelectorAll('.dash-tab-btn').forEach(t => t.classList.remove('active'));
            dashTab.classList.add('active');
            document.querySelectorAll('.dash-tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`tab-content-${dashTab.dataset.tab}`).classList.remove('hidden');
        }

        // Step 5: Timeline Year Select
        const yearNode = e.target.closest('.year-node');
        if(yearNode) {
            document.querySelectorAll('.year-node').forEach(n => n.classList.remove('active', 'opacity-100'));
            yearNode.classList.add('active', 'opacity-100');
            // Mock refresh animation on bucket
            const bucket = document.getElementById('year-requirements-bucket');
            bucket.classList.remove('animate-fade-in');
            void bucket.offsetWidth; // trigger reflow
            bucket.classList.add('animate-fade-in');
        }
    });
}
