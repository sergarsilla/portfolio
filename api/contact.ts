import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== CONTACT API ===');

    // Verificar variables de entorno
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY no configurada');
      return res.status(500).json({
        error: 'Error de configuración del servidor'
      });
    }

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

    // Inicializar Resend con import dinámico
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('✅ Resend inicializado');

    // Enviar email
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.TO_EMAIL || 'contact.sergarsilla@gmail.com'],
      subject: `💼 Nuevo mensaje desde tu portfolio - ${name}`,
      text: `Nuevo mensaje desde tu portfolio

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

---
Enviado el: ${new Date().toLocaleString('es-ES')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">💼 Nuevo mensaje desde tu portfolio</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #007acc; margin: 20px 0;">
            <h3 style="margin-top: 0;">Mensaje:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Enviado el: ${new Date().toLocaleString('es-ES')}
          </p>
        </div>
      `
    });

    console.log('✅ Email enviado exitosamente:', result.data?.id);

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente',
      id: result.data?.id
    });

  } catch (error) {
    console.error('❌ Error en contact API:', error);
    
    // Manejo específico de errores
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