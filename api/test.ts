export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    const envInfo = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      keyLength: process.env.RESEND_API_KEY?.length || 0,
      toEmail: process.env.TO_EMAIL,
      nodeVersion: process.version,
      platform: process.platform
    };

    return res.status(200).json({
      success: true,
      message: 'API funcionando',
      environment: envInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Error en API test',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}