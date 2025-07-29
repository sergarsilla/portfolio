import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const emailData = await resend.emails.send({
      from: 'Portfolio Contact <noreply@resend.dev>', // Cambia por tu dominio verificado
      to: [process.env.TO_EMAIL || 'tu@email.com'], // Tu email
      subject: `💼 Nuevo mensaje desde tu portfolio - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #FFBF00; margin-bottom: 20px; border-bottom: 2px solid #FFBF00; padding-bottom: 10px;">
              📧 Nuevo mensaje desde tu portfolio
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 5px;">👤 Información del contacto:</h3>
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #FFBF00;">${email}</a></p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 10px;">💬 Mensaje:</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #FFBF00; border-radius: 5px;">
                <p style="margin: 0; line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #888; font-size: 14px; margin: 0;">
                Este mensaje fue enviado desde tu portfolio profesional
              </p>
              <p style="color: #888; font-size: 12px; margin: 5px 0 0 0;">
                Fecha: ${new Date().toLocaleString('es-ES', { 
                  timeZone: 'Europe/Madrid',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      // También enviar versión texto plano
      text: `
Nuevo mensaje desde tu portfolio

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

---
Enviado el: ${new Date().toLocaleString('es-ES')}
      `.trim()
    });

    console.log('Email enviado exitosamente:', emailData.id);

    return res.status(200).json({ 
      success: true,
      message: 'Mensaje enviado correctamente',
      id: emailData.id
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