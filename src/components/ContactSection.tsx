import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import ScrollAnimations from './animations/ScrollAnimations';
import ContactForm from './ContactForm';

interface ContactSectionProps {
  language: Language;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const t = getTranslation(language);

  const contactLinks = [
    {
      name: 'Email',
      url: 'mailto:sergarsilla@gmail.com',
      icon: Mail,
      color: 'text-red-500',
      hoverColor: 'hover:text-red-600'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sergarsilla',
      icon: Linkedin,
      color: 'text-blue-500',
      hoverColor: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/sergarsilla',
      icon: Github,
      color: 'text-gray-700 dark:text-gray-300',
      hoverColor: 'hover:text-gray-900 dark:hover:text-white'
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-br from-secondary/30 to-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative">
        <ScrollAnimations>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-accent mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.contact.title}
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.contact.description}
            </p>
          </div>

          {/* Contact Form */}
          <div className="mb-16">
            <ContactForm language={language} />
          </div>

          {/* Alternative contact methods */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-6">
              {language === 'es' ? 'O conéctate directamente:' : 'Or connect directly:'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {contactLinks.map((link, index) => (
              <ScrollAnimations
                key={link.name}
                delay={index * 0.1}
                direction="up"
              >
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium">
                    {link.name === 'Email' 
                      ? t.contact.email
                      : link.name === 'LinkedIn'
                      ? t.contact.linkedin
                      : t.contact.github
                    }
                  </span>
                </motion.a>
              </ScrollAnimations>
            ))}
          </div>
        </ScrollAnimations>
      </div>
    </section>
  );
};

export default ContactSection;