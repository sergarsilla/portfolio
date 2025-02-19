
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ProjectGrid from "../components/ProjectGrid";
import ExperienceSection from "../components/ExperienceSection";
import SkillsSection from "../components/SkillsSection";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-primary mb-4">
              Computer Engineering Student
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Full Stack Developer especializado en el desarrollo de aplicaciones móviles y web.
              Estudiante de Ingeniería Informática en la Universidad Politécnica Madrid.
            </p>
          </motion.div>
        </div>
        
        <ExperienceSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="py-12"
        >
          <h2 className="text-2xl font-semibold text-primary text-center mb-8">
            Proyectos Destacados
          </h2>
          <ProjectGrid />
        </motion.div>
        
        <SkillsSection />
      </main>
    </div>
  );
};

export default Index;
