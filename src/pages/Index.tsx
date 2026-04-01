import { useState, useEffect, lazy, Suspense } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LazySection from "../components/LazySection";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";

const ExperienceSection = lazy(() => import("../components/ExperienceSection"));
const ProjectGrid = lazy(() => import("../components/ProjectGrid"));
const SkillsSection = lazy(() => import("../components/SkillsSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const SecurityResearchSection = lazy(() => import("../components/security/SecurityResearchSection"));
const GitHubStats = lazy(() => import("../components/github/GitHubStats"));
import { useEasterEggs } from "../hooks/useEasterEggs";

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-green"></div>
    <p className="text-cyber-green font-mono text-sm animate-pulse-fast ml-4">Cargando...</p>
  </div>
);

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);
  const { matrixMode } = useEasterEggs();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen h-full transition-colors duration-300 scroll-container bg-cyber-black">
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      <main className="bg-cyber-black">
        <HeroSection language={language} />

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

        {/* Security Research */}
        <section className="section-spacing min-h-screen flex items-center w-full">
          <div className="w-full">
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <SecurityResearchSection />
              </Suspense>
            </LazySection>
          </div>
        </section>

        {/* GitHub Stats */}
        <section className="section-spacing flex items-center w-full">
          <div className="container-custom w-full">
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <GitHubStats username="sergarsilla" />
              </Suspense>
            </LazySection>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="section-spacing min-h-screen flex items-center w-full relative overflow-hidden"
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }} />
          </div>

          <div className="container-custom relative z-10 w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-cyber-green font-mono mb-4">
                {t.sections.featuredProjects}
              </h2>
              <p className="text-gray-400 text-lg font-mono">
                {language === 'es'
                  ? 'Proyectos que priorizan la seguridad y siguen mejores prácticas OWASP'
                  : 'Projects that prioritize security and follow OWASP best practices'}
              </p>
            </div>
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <ProjectGrid language={language} />
              </Suspense>
            </LazySection>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section-spacing min-h-screen flex items-center w-full">
          <div className="w-full">
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <SkillsSection language={language} />
              </Suspense>
            </LazySection>
          </div>
        </section>

        {/* Contact */}
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
