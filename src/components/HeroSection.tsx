import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import {
  getAnimationConfig,
  prefersReducedMotion,
} from "../utils/animationConfig";

interface HeroSectionProps {
  language: Language;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const t = getTranslation(language);
  const animConfig = getAnimationConfig();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Sergio García Mansilla";

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(fullText);
      return;
    }

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [reducedMotion]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : animConfig.stagger.hero,
        delayChildren: reducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : animConfig.durations.fadeIn,
        ease: animConfig.easing.default,
      },
    },
  };

  return (
    <section className="min-h-[100dvh] relative overflow-x-hidden flex items-center bg-background py-20 md:py-0">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5"></div>

      {/* Floating particles */}
      {!reducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Terminal-style header */}
          <motion.div
            variants={itemVariants}
            className="inline-block mb-8 terminal-window max-w-3xl mx-auto"
          >
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="text-xs font-mono ml-4">sergio@portfolio:~$</span>
            </div>
            <div className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="font-mono text-left space-y-2">
                <div className="text-muted-foreground">
                  <span className="text-accent">$</span> whoami
                </div>
                <div className="text-2xl md:text-4xl font-bold text-foreground">
                  {displayedText}
                  {showCursor && displayedText.length < fullText.length && (
                    <span className="text-accent">▊</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8"
          >
            <span className="text-gradient-cyber">
              {language === "es"
                ? "Ingeniero Informático | Ciberseguridad & Desarrollo de Software"
                : "Computer Engineer | Cybersecurity & Software Development"}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {language === "es"
              ? "Ingeniero Informático por la UPM con experiencia profesional en desarrollo de software y ciberseguridad. Actualmente cursando el Máster Profesional en Dirección de Ciberseguridad, Hacking Ético y Seguridad Ofensiva en EIP International Business School."
              : "Computer Engineer from UPM with professional experience in software development and cybersecurity. Currently pursuing a Professional Master's in Cybersecurity Management, Ethical Hacking and Offensive Security at EIP International Business School."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
          >
            <motion.button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl glow"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label={
                language === "es"
                  ? "Ir a la sección de proyectos"
                  : "Go to projects section"
              }
            >
              {language === "es" ? "🚀 Explorar Proyectos" : "🚀 Explore Projects"}
            </motion.button>

            <motion.button
              onClick={() => {
                const experienceSection = document.getElementById("experience");
                experienceSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === "es" ? "💼 Ver Experiencia" : "💼 View Experience"}
            </motion.button>

            <motion.button
              onClick={async () => {
                const url =
                  language === "es"
                    ? "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_Spanish.pdf"
                    : "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_English.pdf";
                const fileName =
                  language === "es"
                    ? "CV_SergioGarciaMansilla_es.pdf"
                    : "CV_SergioGarciaMansilla_en.pdf";

                try {
                  const response = await fetch(url);
                  const blob = await response.blob();
                  const blobUrl = window.URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.download = fileName;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  window.URL.revokeObjectURL(blobUrl);
                } catch (error) {
                  console.error("Error downloading CV:", error);
                  window.open(url, "_blank");
                }
              }}
              className="px-8 py-4 border-2 border-accent/50 text-accent/80 font-semibold rounded-xl hover:border-accent hover:text-accent transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === "es" ? "📄 Descargar CV" : "📄 Download CV"}
            </motion.button>

            <motion.button
              onClick={() => {
                // Trigger terminal with Ctrl+Shift+K
                const event = new KeyboardEvent('keydown', {
                  key: 'K',
                  ctrlKey: true,
                  shiftKey: true,
                  bubbles: true
                });
                window.dispatchEvent(event);
              }}
              className="px-8 py-4 bg-gradient-to-r from-accent to-accent-secondary text-background font-semibold rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 glow"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              title="Open hidden terminal"
            >
              {language === "es" ? "🎯 CTF Challenge" : "🎯 CTF Challenge"}
            </motion.button>
          </motion.div>

          {/* Hint for terminal */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-sm text-muted-foreground font-mono"
          >
            <p className="opacity-50 hover:opacity-100 transition-opacity">
              💡 Tip: Press <kbd className="px-2 py-1 bg-secondary rounded text-xs">Ctrl</kbd> + 
              <kbd className="px-2 py-1 bg-secondary rounded text-xs mx-1">Shift</kbd> + 
              <kbd className="px-2 py-1 bg-secondary rounded text-xs">K</kbd> for a surprise
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <motion.div
              className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-accent rounded-full"
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        kbd {
          box-shadow: 0 2px 0 1px hsl(var(--border));
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
