<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Universal Resume Optimization Tool</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #334155; line-height: 1.6; min-height: 100vh;
    }
    .container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
    .header { text-align: center; margin-bottom: 3rem; color: white; }
    .header h1 { font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
    .header p { font-size: 1.2rem; opacity: 0.9; }
    .main-section { background: white; border-radius: 1rem; padding: 2rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1); margin-bottom: 2rem; }
    .input-grid { display: grid; grid-template-columns: 1fr 1fr 300px; gap: 2rem; margin-bottom: 2rem; }
    .input-group { background: #f8fafc; border-radius: 0.75rem; padding: 1.5rem; border: 2px solid #e2e8f0; }
    .input-group h3 { color: #1e293b; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .textarea { border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 1rem; width: 100%; min-height: 350px; font-size: 0.9rem; line-height: 1.5; }
    .controls { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; }
    .btn { padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
    .btn-primary { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; }
    .btn-secondary { background: #6b7280; color: white; }
    .output-section { background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .resume-preview { border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 2rem; min-height: 600px; background: #fafafa; white-space: pre-wrap; font-family: 'Georgia', serif; line-height: 1.7; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Universal Resume Optimizer</h1>
      <p>Optimize your resume for any industry with AI-powered keyword matching and formatting</p>
    </div>
    <div class="main-section">
      <div class="input-grid">
        <div class="input-group">
          <h3>📄 Your Current Resume</h3>
          <textarea id="resumeInput" class="textarea"
            placeholder="Paste your resume text here..."></textarea>
        </div>
        <div class="input-group">
          <h3>🎯 Target Job Description</h3>
          <textarea id="jobDescInput" class="textarea"
            placeholder="Paste the job description here..."></textarea>
        </div>
        <div class="input-group industry-selector">
          <h3>🏭 Industry Focus</h3>
          <select id="industrySelect" class="select">
            <option value="">Auto-detect</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="hr">Human Resources</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>
      <div class="controls">
        <button class="btn btn-primary" onclick="optimizeResume()">✨ Optimize Resume</button>
        <button class="btn btn-secondary" onclick="clearAll()">🗑️ Clear All</button>
      </div>
    </div>
    <div class="output-section">
      <h3>📋 Optimized Resume</h3>
      <div id="resumePreview" class="resume-preview">
        Your optimized resume will appear here...
      </div>
    </div>
  </div>
  <script>
    function optimizeResume() {
      const resume = document.getElementById('resumeInput').value.trim();
      const jobDesc = document.getElementById('jobDescInput').value.trim();
      if (!resume || !jobDesc) {
        alert("Please paste both resume and job description!");
        return;
      }
document.getElementById('resumePreview').textContent =
        "Optimized Resume (demo)...\n\n" + resume;
    }
    function clearAll() {
      document.getElementById('resumeInput').value = "";
      document.getElementById('jobDescInput').value = "";
      document.getElementById('resumePreview').textContent =
        "Your optimized resume will appear here...";
    }
  </script>
</body>
</html>
