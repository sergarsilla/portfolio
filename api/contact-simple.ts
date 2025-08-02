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
    console.log('=== API SIMPLE TEST ===');
    console.log('Body recibido:', req.body);
    console.log('Headers:', req.headers);
    
    const { name, email, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Campos requeridos faltantes',
        received: { name: !!name, email: !!email, message: !!message }
      });
    }

    // Verificar variables de entorno
    console.log('Variables de entorno:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      keyLength: process.env.RESEND_API_KEY?.length,
      toEmail: process.env.TO_EMAIL
    });

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: 'RESEND_API_KEY no configurada',
        details: 'La variable de entorno RESEND_API_KEY no está definida'
      });
    }

    // Intentar importar y usar Resend
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      console.log('✅ Resend importado e inicializado');

      // Intentar enviar email simple
      const result = await resend.emails.send({
        from: 'Portfolio <noreply@sergarsilla.is-a.dev>',
        to: [process.env.TO_EMAIL || 'contact.sergarsilla@gmail.com'],
        subject: `Test desde portfolio - ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
      });

      console.log('✅ Email enviado:', result);

      return res.status(200).json({
        success: true,
        message: 'Email enviado correctamente',
        id: result.data?.id,
        debug: {
          from: 'noreply@sergarsilla.is-a.dev',
          to: process.env.TO_EMAIL || 'contact.sergarsilla@gmail.com'
        }
      });

    } catch (resendError) {
      console.error('❌ Error con Resend:', resendError);
      return res.status(500).json({
        error: 'Error con servicio Resend',
        details: resendError instanceof Error ? resendError.message : 'Error desconocido',
        stack: resendError instanceof Error ? resendError.stack : undefined
      });
    }

  } catch (error) {
    console.error('❌ Error general:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}