import { lazy, Suspense } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const ExperienceSection = lazy(() => import("../components/ExperienceSection"));
const ProjectGrid = lazy(() => import("../components/ProjectGrid"));
const SkillsSection = lazy(() => import("../components/SkillsSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));

// Invisible spacer keeps layout stable while a section chunk loads
const SectionFallback = () => <div className="min-h-[280px]" aria-hidden="true" />;

const Index = () => {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      <main>
        <section id="home">
          <HeroSection language={language} />
        </section>

        <section id="experience" className="section-spacing">
          <Suspense fallback={<SectionFallback />}>
            <ExperienceSection language={language} />
          </Suspense>
        </section>

        <section id="projects" className="section-spacing">
          <Suspense fallback={<SectionFallback />}>
            <ProjectGrid language={language} />
          </Suspense>
        </section>

        <section id="skills" className="section-spacing">
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection language={language} />
          </Suspense>
        </section>

        <section id="contact" className="section-spacing">
          <Suspense fallback={<SectionFallback />}>
            <ContactSection language={language} />
          </Suspense>
        </section>
      </main>

      <Footer language={language} />
    </div>
  );
};

export default Index;
