import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Languages } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Language } from "../hooks/useLanguage";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const Header = ({ isDark, onToggleTheme, language, onToggleLanguage }: HeaderProps) => {

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-background border-b border-accent/20 sticky top-0 z-50"
      >
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center">
          <motion.div 
            className="flex items-center mb-4 sm:mb-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mr-3"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Code className="w-5 h-5 text-background" />
            </motion.div>
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent cursor-pointer"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                transition: { duration: 0.3 }
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Sergio García Mansilla
            </motion.h1>
          </motion.div>
          
          <div className="flex items-center space-x-1">
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-accent text-background font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">
                {language === 'es' ? 'Contacto' : 'Contact'}
              </span>
            </motion.button>
            
            <motion.button
              onClick={onToggleLanguage}
              className="px-3 py-2 rounded-xl hover:bg-accent/10 hover:text-accent transition-all duration-300 flex items-center space-x-2 font-mono text-sm font-medium group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
              <Languages className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{language.toUpperCase()}</span>
            </motion.button>
            
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </motion.header>


    </>
  );
};

export default Header;
