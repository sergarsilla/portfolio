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
    <div className="min-h-screen h-full bg-background transition-colors duration-300 scroll-container">
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      <main>
        <section className="section-spacing min-h-screen flex items-center w-full">
          <div className="w-full">
            <HeroSection language={language} />
          </div>
        </section>

        <section
          id="experience"
          className="section-spacing min-h-screen flex items-center w-full"
        >
          <div className="w-full">
            <ExperienceSection language={language} />
          </div>
        </section>

        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-spacing min-h-screen flex items-center w-full"
        >
          <div className="container-custom w-full">
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

        <section className="section-spacing min-h-screen flex items-center w-full">
          <div className="w-full">
            <SkillsSection language={language} />
          </div>
        </section>

        <section className="section-spacing min-h-screen flex items-center w-full">
          <div className="w-full">
            <ContactSection language={language} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
