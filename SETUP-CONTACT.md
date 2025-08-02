# 📧 Configuración del Formulario de Contacto

## 🚨 Problema Actual
El formulario de contacto no funciona porque faltan las variables de entorno necesarias.

## ✅ Solución Paso a Paso

### 1. Obtener API Key de Resend
1. Ve a [Resend Dashboard](https://resend.com/dashboard)
2. Copia tu API Key (empieza con `re_`)

### 2. Configurar Variables de Entorno
1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza `re_tu_api_key_aqui` con tu API key real
3. Verifica que el email sea correcto

```env
RESEND_API_KEY=re_tu_api_key_real_aqui
TO_EMAIL=contact.sergarsilla@gmail.com
```

### 3. Verificar Configuración
Ejecuta este comando para verificar que todo esté bien:
```bash
node check-env.js
```

### 4. Probar la API
1. Inicia el servidor de desarrollo: `npm run dev:api`
2. Ve a: http://localhost:3000/api/debug
3. Verifica que `hasApiKey: true`

### 5. Probar el Formulario
1. Llena el formulario en tu sitio web
2. Revisa los logs en la consola del navegador
3. Verifica que llegue el email

## 🔧 Scripts de Ayuda

- `node check-env.js` - Verificar variables de entorno
- `node test-contact-api.js` - Probar la API directamente
- Endpoint de debug: `/api/debug`

## 📁 Archivos Importantes

- `api/contact-with-resend.ts` - Función principal del formulario
- `src/components/ContactForm.tsx` - Componente del frontend
- `.env.local` - Variables de entorno (NO subir a git)
- `vercel.json` - Configuración de Vercel

## 🚀 Deploy en Vercel

Para que funcione en producción, agrega las variables de entorno en:
1. Vercel Dashboard → Tu proyecto → Settings → Environment Variables
2. Agrega `RESEND_API_KEY` y `TO_EMAIL`
3. Redeploy el proyecto

## 🐛 Troubleshooting

### Error: "API key no configurada"
- Verifica que el archivo `.env.local` existe
- Verifica que la API key sea correcta
- Reinicia el servidor de desarrollo

### Error: "Domain not verified"
- En Resend, verifica tu dominio `sergarsilla.is-a.dev`
- O cambia el `from` a un dominio verificado

### Error: "Rate limit"
- Espera unos minutos antes de probar de nuevo
- Verifica los límites de tu plan de Resend