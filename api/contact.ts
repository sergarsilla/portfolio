import type { VercelRequest, VercelResponse } from '@vercel/node';

// Configuración CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email inválido' 
      });
    }

    // Aquí puedes integrar con servicios de email como:
    // - Resend (recomendado)
    // - SendGrid
    // - Nodemailer con Gmail
    
    // Por ahora, simularemos el envío exitoso
    console.log('Nuevo mensaje de contacto:', { name, email, message });

    // TODO: Implementar envío real de email
    // await sendEmail({ name, email, message });

    return res.status(200).json({ 
      success: true,
      message: 'Mensaje enviado correctamente' 
    });

  } catch (error) {
    console.error('Error en el formulario de contacto:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
}