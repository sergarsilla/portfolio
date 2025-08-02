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
    console.log('=== INICIO DEBUG API ===');

    // Verificar variables de entorno críticas
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return res.status(500).json({
        error: 'Error de configuración del servidor',
        details: 'API key de Resend no configurada'
      });
    }

    // Inicializar Resend
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend inicializado correctamente');

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

    // Validación de longitud
    if (name.length > 100 || message.length > 1000) {
      return res.status(400).json({
        error: 'Los campos exceden la longitud máxima permitida'
      });
    }

    // Enviar email usando Resend
    const response = await resend.emails.send({
      from: 'Portfolio Contact <noreply@resend.dev>', // Cambia por tu dominio verificado
      to: [process.env.TO_EMAIL || 'tu@email.com'], // Tu email
      subject: `💼 Nuevo mensaje desde tu portfolio - ${name}`,
      text: `Nuevo mensaje desde tu portfolio

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

---
Enviado el: ${new Date().toLocaleString('es-ES')}`
    };

    console.log('📧 Enviando email con datos:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    });

    // La respuesta fue exitosa si llegamos aquí
    console.log('Email enviado exitosamente');

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('Error en el formulario de contacto:', error);
    
    // Diferentes tipos de errores
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return res.status(500).json({ 
          error: 'Error de configuración del servidor' 
        });
      }
      if (error.message.includes('rate limit')) {
        return res.status(429).json({
          error: 'Demasiados mensajes enviados. Inténtalo más tarde.'
        });
      }
    }
    
    return res.status(500).json({ 
      error: 'Error interno del servidor. Inténtalo más tarde.' 
    });
  }
}