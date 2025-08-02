// Script para verificar las variables de entorno
console.log('🔍 Verificando variables de entorno...\n');

const requiredVars = {
  'RESEND_API_KEY': process.env.RESEND_API_KEY,
  'TO_EMAIL': process.env.TO_EMAIL
};

let allGood = true;

for (const [varName, value] of Object.entries(requiredVars)) {
  if (value) {
    console.log(`✅ ${varName}: ${varName === 'RESEND_API_KEY' ? `${value.substring(0, 8)}...` : value}`);
  } else {
    console.log(`❌ ${varName}: NO CONFIGURADA`);
    allGood = false;
  }
}

console.log('\n📋 Instrucciones:');
if (!allGood) {
  console.log('1. Crea un archivo .env.local en la raíz del proyecto');
  console.log('2. Agrega las siguientes líneas:');
  console.log('   RESEND_API_KEY=tu_api_key_de_resend');
  console.log('   TO_EMAIL=tu_email@gmail.com');
  console.log('3. Reinicia el servidor de desarrollo');
} else {
  console.log('✅ Todas las variables están configuradas correctamente!');
}

console.log('\n🔗 Enlaces útiles:');
console.log('- Dashboard de Resend: https://resend.com/dashboard');
console.log('- Documentación: https://resend.com/docs');