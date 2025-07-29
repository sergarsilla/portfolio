import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectGrid from "../components/ProjectGrid";
import SkillsSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header 
        isDark={isDark} 
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      <main>
        <HeroSection language={language} />
        
        {/* Section divider */}
        <div className="py-8">
          <div className="container-custom">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto"></div>
          </div>
        </div>
        
        <div id="experience">
          <ExperienceSection language={language} />
        </div>
        
        {/* Section divider */}
        <div className="py-8">
          <div className="container-custom">
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="w-2 h-2 bg-accent rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-spacing"
        >
          <div className="container-custom">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-gradient">
                {t.sections.featuredProjects}
              </span>
            </motion.h2>
            <ProjectGrid language={language} />
          </div>
        </motion.section>

        {/* Section divider */}
        <div className="py-8">
          <div className="container-custom">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto"></div>
          </div>
        </div>

        <SkillsSection language={language} />
        
        {/* Section divider */}
        <div className="py-8">
          <div className="container-custom">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto"></div>
          </div>
        </div>
        
        <ContactSection language={language} />
      </main>
    </div>
  );
};

export default Index;
