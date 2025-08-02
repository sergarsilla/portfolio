// Script para probar la API de contacto
const testContactAPI = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    message: "Este es un mensaje de prueba para verificar que la API funciona correctamente."
  };

  try {
    console.log('🧪 Probando API de contacto...');
    console.log('Datos de prueba:', testData);

    const response = await fetch('http://localhost:3000/api/contact-with-resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('📊 Respuesta del servidor:');
    console.log('Status:', response.status);
    console.log('Data:', result);

    if (response.ok) {
      console.log('✅ ¡API funcionando correctamente!');
    } else {
      console.log('❌ Error en la API:', result.error);
    }

  } catch (error) {
    console.error('❌ Error al probar la API:', error);
  }
};

// Ejecutar la prueba
testContactAPI();