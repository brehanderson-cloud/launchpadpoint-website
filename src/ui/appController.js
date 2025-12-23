import { NavBar, ProgressBar } from './layout.js';
import { Step1Analyze, Step2Compare, Step3Optimize, Step4Practice, Step5Plan } from './stepsTemplates.js';

// --- Global State ---
let currentStep = 1;
let appContainer = null;

// --- Main Initialization Function ---
export function initV9App(rootElement) {
    appContainer = rootElement;
    
    // 1. Initial Render of the skeleton
    renderAppSkeleton();
    
    // 2. Show the initial step
    updateUIForStep(currentStep);

    // 3. Attach global event listeners (for navigation)
    attachEventListeners();
}

// --- Rendering Logic ---
function renderAppSkeleton() {
    // Combine all HTML strings into one structure
    appContainer.innerHTML = `
        <div class="min-h-screen flex flex-col font-sans bg-bg-body text-primary-navy antialiased">
            ${NavBar}
            <div id="progress-bar-mount">
                 ${ProgressBar(currentStep)}
            </div>
            <main class="flex-grow container mx-auto max-w-6xl mt-10 mb-20 p-6 md:p-10 bg-white rounded-3xl shadow-card border border-white relative overflow-hidden">
                 ${Step1Analyze}
                 ${Step2Compare}
                 ${Step3Optimize}
                 ${Step4Practice}
                 ${Step5Plan}
            </main>
        </div>
    `;
}

// --- State & Navigation Logic ---
function updateUIForStep(stepNum) {
    currentStep = stepNum;

    // 1. Update Progress Bar
    const progressMount = document.getElementById('progress-bar-mount');
    if(progressMount) {
        progressMount.innerHTML = ProgressBar(currentStep);
    }

    // 2. Hide all step contents
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.add('hidden');
        // Remove animation class to allow re-triggering
        el.classList.remove('animate-fade-in');
    });

    // 3. Show active step content
    const activeContent = document.getElementById(`step${stepNum}-content`);
    if(activeContent) {
        activeContent.classList.remove('hidden');
        // Trigger reflow for animation
        void activeContent.offsetWidth;
        activeContent.classList.add('animate-fade-in');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function attachEventListeners() {
    // Event delegation for navigation steps
    document.addEventListener('click', (e) => {
        // Handle Progress Bar Clicks
        const stepIndicator = e.target.closest('.step-indicator');
        if (stepIndicator) {
            const targetStep = parseInt(stepIndicator.dataset.step);
            // Simple constraint: allow moving back, or one step forward
            if(targetStep <= currentStep + 1) {
                 updateUIForStep(targetStep);
            }
        }

        // Handle "Next Step" buttons located at bottom of pages
        const nextBtn = e.target.closest('.next-step-trigger');
        if(nextBtn && currentStep < 5) {
             updateUIForStep(currentStep + 1);
        }

        // Mock functionality for Step 1 Analyze Button
        if(e.target.id === 'analyze-btn') {
             const btn = e.target;
             btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Decoding Job DNA...';
             btn.disabled = true;
             setTimeout(() => {
                 btn.classList.add('hidden');
                 document.getElementById('inputs-container').classList.add('hidden');
                 document.getElementById('analysis-results').classList.remove('hidden');
                 document.getElementById('next-step-btn').classList.remove('hidden');
                 // Inject mock results here in future iteration
             }, 1500);
        }
    });
}
