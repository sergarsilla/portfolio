// Script para probar la API de contacto localmente
// Ejecutar con: node test-api.js

const testData = {
  name: "Test User",
  email: "test@example.com",
  message: "Este es un mensaje de prueba para verificar que la API funciona correctamente."
};

async function testContactAPI() {
  try {
    console.log('🧪 Probando API de contacto...');
    console.log('📤 Enviando datos:', testData);
    
    const response = await fetch('http://localhost:3000/api/contact-with-resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Status:', response.status);
    
    const data = await response.json();
    console.log('📥 Respuesta:', data);

    if (response.ok) {
      console.log('✅ ¡API funcionando correctamente!');
    } else {
      console.log('❌ Error en la API:', data.error);
      if (data.details) {
        console.log('🔍 Detalles:', data.details);
      }
    }
  } catch (error) {
    console.error('💥 Error al probar la API:', error.message);
  }
}

testContactAPI();