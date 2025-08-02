import type { VercelRequest, VercelResponse } from '@vercel/node';

// Configuración CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Agregar headers CORS
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== TEST API CONTACT ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Method:', req.method);
    
    const { name, email, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos',
        received: { name: !!name, email: !!email, message: !!message }
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email inválido',
        email: email
      });
    }

    console.log('✅ Validaciones pasadas');
    console.log('Variables de entorno disponibles:', {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      TO_EMAIL: process.env.TO_EMAIL,
      NODE_ENV: process.env.NODE_ENV
    });

    // Simular éxito sin enviar email real
    return res.status(200).json({ 
      success: true,
      message: 'API funcionando correctamente (modo test)',
      data: {
        name,
        email,
        messageLength: message.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error en API test:', error);
    
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}