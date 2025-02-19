
import { motion } from "framer-motion";
import { Code, Github, Linkedin } from "lucide-react";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Code className="w-8 h-8 text-accent mr-2" />
          <h1 className="text-2xl font-semibold text-primary">Sergio García Mansilla</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/sergiorilla"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
          >
            <Github className="w-6 h-6 text-primary" />
          </a>
          <a
            href="https://linkedin.com/in/sergiorilla"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
          >
            <Linkedin className="w-6 h-6 text-primary" />
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
