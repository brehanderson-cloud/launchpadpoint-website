// Import CSS so Vite processes it
import './style.css';
// Import the UI Controller
import { initV9App } from './ui/appController.js';
// Import Core (just to show connection)
import '../src/core/payments.js';

console.log('🚀 LaunchPad Point V9 Starting...');

const appRoot = document.querySelector('#app');
// Initialize the UI
initV9App(appRoot);
