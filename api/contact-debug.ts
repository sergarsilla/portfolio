import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== DEBUG API ===');
    
    const { name, email, message } = req.body;

    // Información completa del entorno
    const debugInfo = {
      timestamp: new Date().toISOString(),
      method: req.method,
      headers: req.headers,
      body: req.body,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
        hasResendKey: !!process.env.RESEND_API_KEY,
        resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
        resendKeyStart: process.env.RESEND_API_KEY?.substring(0, 5) || 'undefined',
        toEmail: process.env.TO_EMAIL || 'undefined',
        allEnvKeys: Object.keys(process.env).filter(key => 
          key.includes('RESEND') || key.includes('TO_EMAIL') || key.includes('EMAIL')
        )
      },
      validation: {
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message,
        nameLength: name?.length || 0,
        emailLength: email?.length || 0,
        messageLength: message?.length || 0
      }
    };

    console.log('Debug info:', debugInfo);

    return res.status(200).json({
      success: true,
      message: 'Debug API funcionando correctamente',
      debug: debugInfo
    });

  } catch (error) {
    console.error('❌ Error en debug API:', error);
    return res.status(500).json({
      error: 'Error en debug API',
      details: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}