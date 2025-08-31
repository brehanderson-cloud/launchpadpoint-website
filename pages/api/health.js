// File: api/health.js
// Complete API health check and system status

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const startTime = Date.now();

  try {
    // Check system health
    const healthChecks = await runHealthChecks();
    const responseTime = Date.now() - startTime;

    // Determine overall health status
    const isHealthy = Object.values(healthChecks.services).every(
      service => service.status === 'healthy' || service.status === 'available'
    );

    const healthStatus = {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      version: '2.0.0',
      environment: process.env.VERCEL_ENV || 'development',
      region: process.env.VERCEL_REGION || 'unknown',
      services: healthChecks.services,
      metrics: healthChecks.metrics,
      lastUpdated: new Date().toISOString()
    };

    // Log health check
    console.log(`Health check completed - Status: ${healthStatus.status}, Response time: ${responseTime}ms`);

    return res.status(isHealthy ? 200 : 503).json(healthStatus);

  } catch (error) {
    console.error('Health check error:', error);
    
    return res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`
    });
  }
}

async function runHealthChecks() {
  const checks = {};

  // Check Anthropic API
  checks.anthropic_api = await checkAnthropicAPI();
  
  // Check PDF generation capability
  checks.pdf_generation = await checkPDFGeneration();
  
  // Check file upload capability
  checks.file_upload = checkFileUpload();
  
  // Check environment variables
  checks.environment = checkEnvironmentVariables();
  
  // Check memory and performance
  checks.system_resources = checkSystemResources();

  // Calculate overall metrics
  const metrics = calculateHealthMetrics(checks);

  return {
    services: checks,
    metrics
  };
}

async function checkAnthropicAPI() {
  try {
    const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
    
    if (!hasApiKey) {
      return {
        status: 'unavailable',
        message: 'API key not configured',
        lastChecked: new Date().toISOString()
      };
    }

    // Test API connection with minimal request
    const testStart = Date.now();
    const testResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Test' }]
      }),
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    const responseTime = Date.now() - testStart;

    if (testResponse.ok) {
      return {
        status: 'healthy',
        message: 'API connection successful',
        responseTime: `${responseTime}ms`,
        lastChecked: new Date().toISOString()
      };
    } else {
      return {
        status: 'error',
        message: `API returned ${testResponse.status}`,
        responseTime: `${responseTime}ms`,
        lastChecked: new Date().toISOString()
      };
    }

  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      lastChecked: new Date().toISOString()
    };
  }
}

async function checkPDFGeneration() {
  try {
    // Test jsPDF import
    const { jsPDF } = await import('jspdf');
    
    // Create test PDF
    const doc = new jsPDF();
    doc.text('Health check test', 20, 20);
    const pdfOutput = doc.output('arraybuffer');
    
    return {
      status: 'available',
      message: 'PDF generation working',
      testSize: `${pdfOutput.byteLength} bytes`,
      lastChecked: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: `PDF generation failed: ${error.message}`,
      lastChecked: new Date().toISOString()
    };
  }
}

function checkFileUpload() {
  try {
    // Check if formidable is available
    const formidable = require('formidable');
    
    return {
      status: 'available',
      message: 'File upload capability ready',
      maxFileSize: '10MB',
      supportedFormats: ['PDF'],
      lastChecked: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: `File upload not available: ${error.message}`,
      lastChecked: new Date().toISOString()
    };
  }
}

function checkEnvironmentVariables() {
  const requiredVars = ['ANTHROPIC_API_KEY'];
  const optionalVars = ['STRIPE_SECRET_KEY', 'DATABASE_URL', 'ANALYTICS_KEY'];
  
  const envStatus = {
    required: {},
    optional: {}
  };

  // Check required variables
  requiredVars.forEach(varName => {
    envStatus.required[varName] = {
      configured: !!process.env[varName],
      length: process.env[varName] ? process.env[varName].length : 0
    };
  });

  // Check optional variables
  optionalVars.forEach(varName => {
    envStatus.optional[varName] = {
      configured: !!process.env[varName],
      length: process.env[varName] ? process.env[varName].length : 0
    };
  });

  const allRequiredConfigured = Object.values(envStatus.required).every(v => v.configured);

  return {
    status: allRequiredConfigured ? 'healthy' : 'error',
    message: allRequiredConfigured ? 'All required variables configured' : 'Missing required environment variables',
    details: envStatus,
    lastChecked: new Date().toISOString()
  };
}

function checkSystemResources() {
  try {
    // Check memory usage (if available)
    const memoryUsage = process.memoryUsage ? process.memoryUsage() : {};
    
    // Check process uptime
    const uptime = process.uptime ? process.uptime() : 0;
    
    return {
      status: 'healthy',
      message: 'System resources normal',
      memory: {
        used: memoryUsage.heapUsed ? `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB` : 'unknown',
        total: memoryUsage.heapTotal ? `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB` : 'unknown'
      },
      uptime: `${Math.round(uptime)}s`,
      lastChecked: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'warning',
      message: `Could not check system resources: ${error.message}`,
      lastChecked: new Date().toISOString()
    };
  }
}

function calculateHealthMetrics(checks) {
  const serviceStatuses = Object.values(checks);
  const healthyCount = serviceStatuses.filter(s => s.status === 'healthy' || s.status === 'available').length;
  const totalCount = serviceStatuses.length;
  
  return {
    overallHealth: Math.round((healthyCount / totalCount) * 100),
    servicesHealthy: healthyCount,
    servicesTotal: totalCount,
    criticalIssues: serviceStatuses.filter(s => s.status === 'error').length,
    warnings: serviceStatuses.filter(s => s.status === 'warning').length
  };
}

function generateSessionId() {
  return `health_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
