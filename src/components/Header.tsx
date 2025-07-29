import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Github, Linkedin, FileText, Languages } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Language } from "../hooks/useLanguage";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const Header = ({ isDark, onToggleTheme, language, onToggleLanguage }: HeaderProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleCvClick = () => {
    setShowModal(true);
  };

  const downloadCv = (lang: "es" | "en") => {
    const url =
      lang === "es"
        ? "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_Spanish.pdf"
        : "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_English.pdf";
    window.open(url, "_blank");
    setShowModal(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-background/95 backdrop-blur-md border-b border-accent/20 sticky top-0 z-50"
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
            <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Sergio García Mansilla
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-1">
            <motion.a
              href="https://github.com/sergarsilla"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
              <Github className="w-5 h-5 relative z-10" />
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/sergarsilla"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
              <Linkedin className="w-5 h-5 relative z-10" />
            </motion.a>
            
            <motion.button
              onClick={handleCvClick}
              className="p-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={language === 'es' ? 'Descargar CV' : 'Download CV'}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              />
              <FileText className="w-5 h-5 relative z-10" />
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

      {showModal && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div 
            className="bg-background border border-accent/20 p-8 rounded-2xl shadow-2xl max-w-sm mx-4 backdrop-blur-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-6 text-foreground text-center">
              {language === 'es' 
                ? 'Se descargará el PDF del CV. ¿Qué versión quieres?'
                : 'The PDF of the CV will be downloaded. Which version do you want?'
              }
            </p>
            <div className="flex justify-center space-x-3">
              <motion.button
                className="px-6 py-3 bg-accent text-background rounded-xl hover:bg-accent/90 transition-all duration-300 font-medium"
                onClick={() => downloadCv("es")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'es' ? 'Español' : 'Spanish'}
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-accent text-background rounded-xl hover:bg-accent/90 transition-all duration-300 font-medium"
                onClick={() => downloadCv("en")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'es' ? 'Inglés' : 'English'}
              </motion.button>
            </div>
            <motion.button
              className="w-full mt-4 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              onClick={() => setShowModal(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'es' ? 'Cancelar' : 'Cancel'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
