import React, { useState } from "react";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
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

const translations = {
  es: {
    name: "Nombre",
    namePlaceholder: "Nombre y apellidos",
    email: "Email",
    emailPlaceholder: "nombre@empresa.com",
    message: "Mensaje",
    messagePlaceholder: "Cuéntame sobre tu proyecto, oportunidad o consulta...",
    send: "Enviar mensaje",
    sending: "Enviando...",
    success: "Mensaje enviado. Te responderé pronto.",
    error: "No se pudo enviar. Inténtalo de nuevo.",
    required: "Este campo es obligatorio",
    invalidEmail: "Email inválido",
  },
  en: {
    name: "Name",
    namePlaceholder: "First and last name",
    email: "Email",
    emailPlaceholder: "name@company.com",
    message: "Message",
    messagePlaceholder: "Tell me about your project, opportunity or inquiry...",
    send: "Send message",
    sending: "Sending...",
    success: "Message sent. I'll get back to you soon.",
    error: "Failed to send. Please try again.",
    required: "This field is required",
    invalidEmail: "Invalid email",
  },
};

const inputClasses =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:ring-1 focus:ring-accent/40 focus:outline-none transition-colors duration-150 disabled:opacity-60";

const ContactForm: React.FC<ContactFormProps> = ({ language }) => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  const t = translations[language];

  const validateForm = (): boolean => {
    if (!formData.name.trim() || !formData.message.trim() || !formData.email.trim()) {
      setStatus({ type: "error", message: t.required });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: t.invalidEmail });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ type: "loading", message: t.sending });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: t.success });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || t.error);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({ type: "error", message: t.error });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status.type === "error") {
      setStatus({ type: "idle", message: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            {t.name}
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={inputClasses}
            placeholder={t.namePlaceholder}
            disabled={status.type === "loading"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            {t.email}
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={inputClasses}
            placeholder={t.emailPlaceholder}
            disabled={status.type === "loading"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          {t.message}
        </label>
        <textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className={`${inputClasses} resize-none`}
          placeholder={t.messagePlaceholder}
          disabled={status.type === "loading"}
        />
      </div>

      {status.message && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
            status.type === "success"
              ? "border-accent/30 bg-accent/10 text-accent"
              : status.type === "error"
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-border bg-secondary/50 text-muted-foreground"
          }`}
        >
          {status.type === "success" && <CheckCircle className="w-4 h-4" />}
          {status.type === "error" && <AlertCircle className="w-4 h-4" />}
          {status.type === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{status.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
      >
        {status.type === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {status.type === "loading" ? t.sending : t.send}
      </button>
    </form>
  );
};

export default ContactForm;
