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
        className="fixed top-4 right-4 z-50"
      >
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-2 shadow-lg">
          <motion.button
            onClick={onToggleLanguage}
            className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 flex items-center gap-2 font-mono text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
          >
            <Languages className="w-4 h-4" />
            <span>{language.toUpperCase()}</span>
          </motion.button>
          
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </motion.header>
    </>
  );
};

export default Header;
