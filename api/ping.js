export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  res.status(200).json({
    success: true,
    message: 'API funcionando',
    hasResendKey: !!process.env.RESEND_API_KEY,
    toEmail: process.env.TO_EMAIL || 'no configurado'
  });
}