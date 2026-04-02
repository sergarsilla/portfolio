import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LazySection from "../components/LazySection";
import SideNavigation from "../components/SideNavigation";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";

// Lazy load heavy components with better chunking
const ExperienceSection = lazy(() => import("../components/ExperienceSection"));
const ProjectGrid = lazy(() => import("../components/ProjectGrid"));
const SkillsSection = lazy(() => import("../components/SkillsSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));

// Loading component for better UX
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  </div>
);

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
    <div className="min-h-screen h-full transition-colors duration-300 scroll-container bg-background">
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      
      <SideNavigation />
      
      <main className="bg-background">
        <section id="home">
          <HeroSection language={language} />
        </section>

        <section
          id="experience"
          className="section-spacing min-h-screen flex items-center w-full"
        >
          <div className="w-full">
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <ExperienceSection language={language} />
              </Suspense>
            </LazySection>
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
            <div className="text-center mb-16">
              <motion.div 
                className="flex items-center justify-center mb-4"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-accent to-accent-secondary rounded-xl flex items-center justify-center mr-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-gradient-cyber">
                    {t.sections.featuredProjects}
                  </span>
                </h2>
              </motion.div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'es' 
                  ? 'Proyectos destacados que demuestran mis habilidades técnicas y creatividad'
                  : 'Featured projects showcasing my technical skills and creativity'
                }
              </p>
            </div>
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <ProjectGrid language={language} />
              </Suspense>
            </LazySection>
          </div>
        </motion.section>

        <section id="skills" className="section-spacing min-h-screen flex items-center w-full">
          <div className="w-full">
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <SkillsSection language={language} />
              </Suspense>
            </LazySection>
          </div>
        </section>

        <section id="contact" className="section-spacing min-h-screen flex items-center w-full">
          <div className="w-full">
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <ContactSection language={language} />
              </Suspense>
            </LazySection>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
