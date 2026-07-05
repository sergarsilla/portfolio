import { Github, Linkedin, Mail } from "lucide-react";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import ScrollAnimations from "./animations/ScrollAnimations";
import ContactForm from "./ContactForm";

interface ContactSectionProps {
  language: Language;
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const t = getTranslation(language);

  const channels = [
    {
      icon: Mail,
      label: t.contact.email,
      value: "sergarsilla@gmail.com",
      href: "mailto:sergarsilla@gmail.com",
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      value: "linkedin.com/in/sergarsilla",
      href: "https://linkedin.com/in/sergarsilla",
    },
    {
      icon: Github,
      label: t.contact.github,
      value: "github.com/sergarsilla",
      href: "https://github.com/sergarsilla",
    },
  ];

  return (
    <div className="container-custom">
      <ScrollAnimations>
        <h2 className="text-2xl md:text-3xl text-foreground">{t.contact.title}</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">{t.contact.description}</p>
      </ScrollAnimations>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr,1.4fr]">
        <ScrollAnimations>
          <ul className="space-y-2">
            {channels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-lg border border-transparent px-3 py-3 -mx-3 hover:border-border hover:bg-secondary/50 transition-colors duration-150"
                >
                  <channel.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-150" />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-foreground">
                      {channel.label}
                    </span>
                    <span className="block font-mono text-sm text-muted-foreground">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ScrollAnimations>

        <ScrollAnimations delay={0.06}>
          <ContactForm language={language} />
        </ScrollAnimations>
      </div>
    </div>
  );
};

export default ContactSection;
