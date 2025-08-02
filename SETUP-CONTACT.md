# 📧 Configuración del Formulario de Contacto

## ✅ Estado Actual
El formulario de contacto está configurado y listo para usar con Resend.

## 🔧 Configuración

### Variables de Entorno
El archivo `.env.local` debe contener:
```env
RESEND_API_KEY=re_MBaeEVpG_GuvkznT8VH4aqMQa6zFAh4SP
TO_EMAIL=contact.sergarsilla@gmail.com
```

### Verificar Configuración
```bash
node check-env.js
```

## 📁 Archivos del Sistema

- `api/contact.ts` - API principal del formulario
- `src/components/ContactForm.tsx` - Componente del frontend
- `.env.local` - Variables de entorno
- `vercel.json` - Configuración de Vercel

## 🚀 Deploy en Vercel

Para producción, configura las variables de entorno en:
1. Vercel Dashboard → Tu proyecto → Settings → Environment Variables
2. Agrega `RESEND_API_KEY` y `TO_EMAIL`
3. Redeploy el proyecto

## 🐛 Troubleshooting

### Error: "API key no configurada"
- Verifica que `.env.local` existe y tiene la API key correcta
- Reinicia el servidor de desarrollo

### Error: "Domain not verified"
- El formulario usa `onboarding@resend.dev` que está pre-verificado
- Para usar tu dominio personalizado, verifica `sergarsilla.is-a.dev` en Resend

### Error: "Rate limit"
- Resend tiene límites por hora/día según tu plan
- Espera antes de probar de nuevo

## 📧 Funcionamiento

1. El usuario llena el formulario
2. Se envía a `/api/contact`
3. La API valida los datos
4. Se envía el email usando Resend
5. Se muestra confirmación al usuario

El sistema está limpio y optimizado - se eliminaron todos los archivos de test y APIs duplicadas.