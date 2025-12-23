export const NavBar = `
    <nav class="flex justify-between items-center p-5 bg-primary-navy text-white shadow-md">
        <div class="font-extrabold text-xl flex items-center gap-3 tracking-tight">
            <i class="fas fa-rocket text-accent-teal"></i> LaunchPad Point
        </div>
        <div class="flex gap-4 opacity-80">
            <i class="fas fa-cog cursor-pointer hover:text-accent-teal transition-colors"></i>
            <i class="fas fa-user-circle fa-lg cursor-pointer hover:text-accent-teal transition-colors"></i>
        </div>
    </nav>
`;

// Helper to generate progress steps dynamically
const generateSteps = (activeStep) => {
    const steps = ['Analyze', 'Compare', 'Optimize', 'Practice', 'Plan'];
    return steps.map((name, index) => {
        const stepNum = index + 1;
        let statusClass = 'opacity-50'; // Default future state
        let circleClass = 'bg-border text-text-muted';
        let content = stepNum;

        if (stepNum < activeStep) {
            // Completed State
            statusClass = 'opacity-100 text-primary-navy';
            circleClass = 'bg-primary-navy text-white';
            content = '<i class="fas fa-check"></i>';
        } else if (stepNum === activeStep) {
            // Active State
            statusClass = 'opacity-100 text-accent-teal';
            circleClass = 'bg-accent-teal text-white ring-4 ring-accent-teal/20 shadow-lg scale-110';
        }

        // Note: onclick handlers will be attached in the controller after render
        return `
            <li class="step-indicator flex items-center gap-3 font-bold text-lg cursor-pointer transition-all duration-300 ${statusClass}" data-step="${stepNum}">
                <div class="step-circle w-10 h-10 rounded-full flex items-center justify-center font-extrabold transition-all duration-300 ${circleClass}">
                    ${content}
                </div>
                <span class="hidden md:inline">${name}</span>
            </li>
        `;
    }).join('');
};

export const ProgressBar = (currentStep) => `
    <div class="bg-white py-8 border-b border-border shadow-sm">
        <ul class="flex justify-center gap-6 md:gap-16">
            ${generateSteps(currentStep)}
        </ul>
    </div>
`;
