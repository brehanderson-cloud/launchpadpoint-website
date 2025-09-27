<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Universal Resume Optimization Tool</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #334155;
      line-height: 1.6;
      min-height: 100vh;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    .header {
      text-align: center;
      margin-bottom: 3rem;
      color: white;
    }
    .header h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    .main-section {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    .input-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 300px;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .input-group {
      background: #f8fafc;
      border-radius: 0.75rem;
      padding: 1.5rem;
      border: 2px solid #e2e8f0;
      transition: border-color 0.3s ease;
    }
    .input-group:focus-within {
      border-color: #3b82f6;
    }
    .input-group h3 {
      color: #1e293b;
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .industry-selector {
      background: #fef3c7;
      border-color: #f59e0b;
    }
    .industry-selector h3 {
      color: #92400e;
    }
    .textarea {
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background: white;
      padding: 1rem;
      font-size: 0.9rem;
      line-height: 1.5;
      transition: all 0.2s ease;
      outline: none;
      width: 100%;
      min-height: 350px;
      resize: vertical;
      font-family: inherit;
    }
    .textarea:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    .select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background: white;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    .industry-options {
      display: grid;
      gap: 0.5rem;
      max-height: 250px;
      overflow-y: auto;
    }
    .industry-option {
      padding: 0.75rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.85rem;
    }
    .industry-option:hover {
      background: #f1f5f9;
      border-color: #3b82f6;
    }
    .industry-option.selected {
      background: #dbeafe;
      border-color: #3b82f6;
      color: #1e40af;
    }
    .controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(59, 130, 246, 0.35);
    }
    .btn-secondary {
      background: #6b7280;
      color: white;
    }
    .btn-secondary:hover {
      background: #4b5563;
    }
    .output-section {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    .output-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .output-title {
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .format-selector {
      display: flex;
      gap: 0.5rem;
    }
    .format-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: white;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s ease;
    }
    .format-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
    .resume-preview {
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 2rem;
      min-height: 600px;
      background: #fafafa;
      white-space: pre-wrap;
      font-family: 'Georgia', serif;
      line-height: 1.7;
      overflow-y: auto;
      max-height: 800px;
    }
    .resume-preview.html-format {
      white-space: normal;
    }
    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    .status-message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      display: none;
    }
    .status-success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    .status-error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
    .status-info {
      background: #dbeafe;
      color: #1e40af;
      border: 1px solid #93c5fd;
    }
    .progress-bar {
      width: 100%;
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      overflow: hidden;
      margin: 1rem 0;
      display: none;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #1d4ed8);
      width: 0%;
      transition: width 0.3s ease;
    }
    .optimization-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
      display: none;
    }
    .stat-card {
      background: #f8fafc;
      padding: 1rem;
      border-radius: 0.5rem;
      border-left: 4px solid #3b82f6;
    }
    .stat-number {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1e293b;
    }
    .stat-label {
      font-size: 0.85rem;
      color: #64748b;
    }
    @media (max-width: 1024px) {
      .input-grid {
        grid-template-columns: 1fr;
      }
      .container {
        padding: 1rem;
      }
      .header h1 {
        font-size: 2rem;
      }
    }
    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
      }
      .output-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .action-buttons {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <!-- Your HTML structure stays as is -->
  <!-- Script cleaned of duplicates -->
</body>
</html>
