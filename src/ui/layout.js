export const NavBar = `
    <nav class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 md:px-10 bg-primary-navy text-white shadow-md">
        <div class="font-extrabold text-xl md:text-2xl flex items-center gap-3 tracking-tight truncate">
            <i class="fas fa-rocket text-accent-teal"></i> LaunchPad Point
        </div>
        <div class="flex gap-6 opacity-80">
            <i class="fas fa-cog cursor-pointer hover:text-accent-teal transition-colors"></i>
            <i class="fas fa-user-circle fa-lg cursor-pointer hover:text-accent-teal transition-colors"></i>
        </div>
    </nav>
`;

const generateSteps = (activeStep) => {
    const steps = ['Analyze', 'Compare', 'Optimize', 'Practice', 'Plan'];
    return steps.map((name, index) => {
        const stepNum = index + 1;
        // Default future state
        let statusClasses = 'opacity-40'; 
        let circleClasses = 'bg-border text-text-muted';
        let content = stepNum;

        if (stepNum < activeStep) {
            // Completed State
            statusClasses = 'opacity-100 text-primary-navy';
            circleClasses = 'bg-primary-navy text-white';
            content = '<i class="fas fa-check text-sm"></i>';
        } else if (stepNum === activeStep) {
            // Active State
            statusClasses = 'opacity-100 text-accent-teal';
            circleClasses = 'bg-accent-teal text-white ring-4 ring-accent-teal/20 shadow-lg scale-110';
        }

        return `
            <li class="step-indicator flex flex-col md:flex-row items-center gap-2 md:gap-3 font-bold text-sm md:text-lg cursor-pointer transition-all duration-300 group ${statusClasses}" data-step="${stepNum}">
                <div class="step-circle w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-extrabold transition-all duration-300 group-hover:shadow-md ${circleClasses}">
                    ${content}
                </div>
                <span class="hidden md:inline">${name}</span>
            </li>
        `;
    }).join('');
};

export const ProgressBar = (currentStep) => `
    <div class="bg-white py-4 md:py-6 border-b border-border shadow-sm">
        <ul class="flex justify-center gap-8 md:gap-16 px-4">
            ${generateSteps(currentStep)}
        </ul>
    </div>
`;
