// 1. Import the tailwind directives and base styles
import './style.css';

// 2. Import the main UI Initialization function
import { initV9App } from './ui/appController.js';

// 3. Log boot status
console.log('🚀 LaunchPad Point V9 Starting...');

// 4. Find the root element in index.html and initialize the app into it
const appRoot = document.querySelector('#app');
if (appRoot) {
    initV9App(appRoot);
} else {
    console.error('CRITICAL: Root #app element not found in index.html');
}
