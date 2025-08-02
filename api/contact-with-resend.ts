import type { VercelRequest, VercelResponse } from '@vercel/node';
import { text } from 'stream/consumers';

// Función para inicializar Resend de forma segura
async function initResend() {
  try {
    const { Resend } = await import('resend');
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY no está configurada');
    }
    return new Resend(process.env.RESEND_API_KEY);
  } catch (error) {
    console.error('Error inicializando Resend:', error);
    throw error;
  }
}

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
    console.log('Variables de entorno disponibles:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyLength: process.env.RESEND_API_KEY?.length,
      toEmail: process.env.TO_EMAIL,
      nodeEnv: process.env.NODE_ENV
    });

    // Verificar variables de entorno críticas
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return res.status(500).json({ 
        error: 'Error de configuración del servidor',
        details: 'API key de Resend no configurada'
      });
    }

    // Inicializar Resend
    let resend;
    try {
      resend = await initResend();
      console.log('✅ Resend inicializado correctamente');
    } catch (initError) {
      console.error('❌ Error inicializando Resend:', initError);
      return res.status(500).json({ 
        error: 'Error inicializando servicio de email',
        details: initError instanceof Error ? initError.message : 'Error desconocido'
      });
    }

    const { name, email, message } = req.body;

    // Log para debugging
    console.log('Datos recibidos:', { name, email, message: message?.substring(0, 50) + '...' });
    console.log('Variables de entorno:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      toEmail: process.env.TO_EMAIL
    });

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

    // Preparar datos del email
    const emailData = {
      from: 'Portfolio Contact <noreply@sergarsilla.is-a.dev>',
      to: [process.env.TO_EMAIL || 'contact.sergarsilla@gmail.com'],
      subject: `💼 Nuevo mensaje desde tu portfolio - ${name}`,
      text: `Nuevo mensaje desde tu portfolio\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}\n\n---\nEnviado el: ${new Date().toLocaleString('es-ES')}`
    };

    console.log('📧 Enviando email con datos:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    });

    // Enviar email usando Resend
    const response = await resend.emails.send(emailData);
      from: 'Portfolio Contact <noreply@sergarsilla.is-a.dev>', // Tu dominio verificado
      to: [process.env.TO_EMAIL || 'contact.sergarsilla@gmail.com'], // Tu email
      subject: `💼 Nuevo mensaje desde tu portfolio - ${name}`,
      text: `Nuevo mensaje desde tu portfolio\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}\n\n---\nEnviado el: ${new Date().toLocaleString('es-ES')}`
    });

    // La respuesta fue exitosa si llegamos aquí
    console.log('Email enviado exitosamente:', response);

    return res.status(200).json({ 
      success: true,
      message: 'Mensaje enviado correctamente',
      id: response.data?.id
    });

  } catch (error) {
    console.error('Error completo en el formulario de contacto:', error);
    
    // Log más detallado del error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Diferentes tipos de errores
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('Unauthorized')) {
        return res.status(500).json({ 
          error: 'Error de configuración del servidor - API key inválida',
          details: error.message
        });
      }
      if (error.message.includes('rate limit')) {
        return res.status(429).json({ 
          error: 'Demasiados mensajes enviados. Inténtalo más tarde.' 
        });
      }
      if (error.message.includes('domain') || error.message.includes('from')) {
        return res.status(500).json({ 
          error: 'Error de configuración del dominio',
          details: error.message
        });
      }
    }
    
    return res.status(500).json({ 
      error: 'Error interno del servidor. Inténtalo más tarde.',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}