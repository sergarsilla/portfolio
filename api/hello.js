module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    const envInfo = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      keyLength: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0,
      toEmail: process.env.TO_EMAIL || 'undefined',
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Hello API funcionando',
      environment: envInfo
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error en Hello API',
      details: error.message
    });
  }
};