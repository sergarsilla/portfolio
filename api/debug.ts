import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      method: req.method,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
      },
      resend: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        apiKeyLength: process.env.RESEND_API_KEY?.length || 0,
        apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 3) || 'undefined',
      },
      email: {
        toEmail: process.env.TO_EMAIL || 'undefined',
      },
      request: {
        headers: req.headers,
        body: req.body,
      }
    };

    // Test de importación de Resend
    let resendTest = null;
    try {
      const { Resend } = await import('resend');
      resendTest = {
        imported: true,
        canInitialize: !!process.env.RESEND_API_KEY
      };
      
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        resendTest.initialized = true;
      }
    } catch (error) {
      resendTest = {
        imported: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    return res.status(200).json({
      status: 'ok',
      diagnostics,
      resendTest
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}