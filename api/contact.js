export default async function handler(req, res) {
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
    const { name, email, message } = req.body;

    // Validación
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      });
    }

    // Verificar variables de entorno
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ 
        error: 'API key no configurada' 
      });
    }

    // Importar Resend dinámicamente
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Enviar email
    const result = await resend.emails.send({
      from: 'Portfolio <noreply@sergarsilla.is-a.dev>',
      to: [process.env.TO_EMAIL || 'contact.sergarsilla@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    });

    return res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
      id: result.data?.id
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Error al enviar email',
      details: error.message
    });
  }
}