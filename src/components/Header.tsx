import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Github, Linkedin, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Header = ({ isDark, onToggleTheme }: HeaderProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleCvClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
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
        transition={{ duration: 0.5 }}
        className="w-full py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Code
              className={`w-8 h-8 ${
                isDark ? "text-accent-dark" : "text-accent"
              } mr-2`}
            />
            <h1 className="text-2xl font-semibold text-foreground">
              Sergio García Mansilla
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/sergarsilla"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
            >
              <Github className="w-6 h-6 text-foreground" />
            </a>
            <a
              href="https://linkedin.com/in/sergarsilla"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6 text-foreground" />
            </a>
            <a
              href="#"
              onClick={handleCvClick}
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              title="Descargar CV"
            >
              <FileText className="w-6 h-6 text-foreground" />
            </a>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </motion.header>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm mx-auto">
            <p className="mb-4 text-foreground">
              The PDF of the CV will be downloaded. Which version do you want?{" "}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => downloadCv("es")}
              >
                Español
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                onClick={() => downloadCv("en")}
              >
                English
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
