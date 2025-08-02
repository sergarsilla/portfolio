import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Language } from "../hooks/useLanguage";

interface ContactFormProps {
  language: Language;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ language }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const translations = {
    es: {
      title: "Inicia una conversación",
      subtitle: "Cuéntame sobre tu proyecto o oportunidad",
      name: "Nombre completo",
      email: "Email profesional",
      message: "Mensaje",
      messagePlaceholder:
        "Describe tu proyecto, oportunidad laboral o consulta...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado! Te responderé pronto.",
      error: "Error al enviar. Inténtalo de nuevo.",
      required: "Este campo es obligatorio",
      invalidEmail: "Email inválido",
    },
    en: {
      title: "Start a conversation",
      subtitle: "Tell me about your project or opportunity",
      name: "Full name",
      email: "Professional email",
      message: "Message",
      messagePlaceholder:
        "Describe your project, job opportunity or inquiry...",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      error: "Failed to send. Please try again.",
      required: "This field is required",
      invalidEmail: "Invalid email",
    },
  };

  const t = translations[language];

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: t.required });
      return false;
    }

    if (!formData.email.trim()) {
      setStatus({ type: "error", message: t.required });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: t.invalidEmail });
      return false;
    }

    if (!formData.message.trim()) {
      setStatus({ type: "error", message: t.required });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus({ type: "loading", message: t.sending });

    try {
      // Usar FormSubmit como alternativa temporal
      const response = await fetch(
        "https://formsubmit.co/contact.sergarsilla@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `💼 Nuevo mensaje desde tu portfolio - ${formData.name}`,
            _captcha: "false",
            _template: "table",
          }),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        setStatus({ type: "success", message: t.success });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Contact form error:", error);

      // Fallback: intentar con la API de Vercel
      try {
        const fallbackResponse = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const fallbackData = await fallbackResponse.json();

        if (fallbackResponse.ok) {
          setStatus({ type: "success", message: t.success });
          setFormData({ name: "", email: "", message: "" });
        } else {
          throw new Error(fallbackData.error || "Error en API de Vercel");
        }
      } catch (fallbackError) {
        console.error("Fallback también falló:", fallbackError);
        setStatus({
          type: "error",
          message:
            fallbackError instanceof Error
              ? fallbackError.message
              : "Error al enviar. Contacta directamente por email.",
        });
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status.type === "error") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const testAPI = async (endpoint = "contact-with-resend") => {
    const testData = {
      name: "Test User",
      email: "test@example.com",
      message: "Este es un mensaje de prueba",
    };

    try {
      console.log(`🧪 Probando API ${endpoint}...`);
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      console.log("📊 Status:", response.status);
      console.log("📥 Respuesta:", data);

      alert(
        `API: ${endpoint}\nStatus: ${
          response.status
        }\nRespuesta: ${JSON.stringify(data, null, 2)}`
      );
    } catch (error) {
      console.error("💥 Error:", error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{t.title}</h3>
        <p className="text-muted-foreground">{t.subtitle}</p>

        {/* Botones de test temporal */}
        <div className="mt-4 flex gap-1 justify-center flex-wrap">
          <button
            onClick={() => testAPI("ping")}
            className="px-2 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
          >
            🏓 Ping
          </button>
          <button
            onClick={() => testAPI("hello")}
            className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
          >
            👋 Hello
          </button>
          <button
            onClick={() => testAPI("test")}
            className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
          >
            ⚡ Test
          </button>
          <button
            onClick={() => testAPI("contact-debug")}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          >
            🔍 Debug
          </button>
          <button
            onClick={() => testAPI("contact-simple")}
            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
          >
            🧪 Simple
          </button>
          <button
            onClick={() => testAPI("contact-with-resend")}
            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          >
            🧪 Resend
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-accent/20 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 text-foreground placeholder:text-muted-foreground"
              placeholder="John Doe"
              disabled={status.type === "loading"}
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-background border-2 border-accent/20 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 text-foreground placeholder:text-muted-foreground"
              placeholder="john@company.com"
              disabled={status.type === "loading"}
            />
          </motion.div>
        </div>

        <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground"
          >
            {t.message}
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="w-full px-4 py-3 bg-background border-2 border-accent/20 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none"
            placeholder={t.messagePlaceholder}
            disabled={status.type === "loading"}
          />
        </motion.div>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 p-4 rounded-xl ${
              status.type === "success"
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : status.type === "error"
                ? "bg-red-500/10 text-red-500 border border-red-500/20"
                : "bg-accent/10 text-accent border border-accent/20"
            }`}
          >
            {status.type === "success" && <CheckCircle className="w-5 h-5" />}
            {status.type === "error" && <AlertCircle className="w-5 h-5" />}
            {status.type === "loading" && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            <span className="text-sm font-medium">{status.message}</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={status.type === "loading"}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {status.type === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {status.type === "loading" ? t.sending : t.send}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
