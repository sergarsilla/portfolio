import React, { useState } from 'react';

const ContactFormTest: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async (endpoint: string) => {
    setLoading(true);
    setResult(null);

    const testData = {
      name: "Test User",
      email: "test@example.com",
      message: "Este es un mensaje de prueba para verificar que la API funciona correctamente."
    };

    try {
      console.log(`🧪 Probando ${endpoint}...`);
      
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      const data = await response.json();
      
      setResult({
        endpoint,
        status: response.status,
        success: response.ok,
        data: data,
        timestamp: new Date().toISOString()
      });

      console.log(`📊 Resultado ${endpoint}:`, {
        status: response.status,
        data
      });

    } catch (error) {
      console.error(`💥 Error ${endpoint}:`, error);
      setResult({
        endpoint,
        status: 'ERROR',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🧪 Test de APIs de Contacto</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => testAPI('contact-test')}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test API Simple
        </button>
        
        <button
          onClick={() => testAPI('contact')}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test API Original
        </button>
        
        <button
          onClick={() => testAPI('contact-with-resend')}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test API Resend
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          <p className="mt-2">Probando API...</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            📋 Resultado: {result.endpoint}
          </h3>
          
          <div className={`p-4 rounded-lg border-2 ${
            result.success 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Status:</strong> {result.status}</div>
              <div><strong>Success:</strong> {result.success ? '✅' : '❌'}</div>
              <div><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">📄 Respuesta completa:</h4>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-semibold text-yellow-800 mb-2">💡 Instrucciones:</h4>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. Primero prueba "Test API Simple" - debe funcionar siempre</li>
          <li>2. Si falla, hay un problema básico de configuración</li>
          <li>3. Luego prueba "Test API Resend" para ver errores específicos</li>
          <li>4. Revisa la consola del navegador para más detalles</li>
        </ol>
      </div>
    </div>
  );
};

export default ContactFormTest;