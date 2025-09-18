import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import {
  getAnimationConfig,
  prefersReducedMotion,
} from "../utils/animationConfig";
import Background3D from "./animations/Background3D";

interface HeroSectionProps {
  language: Language;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const t = getTranslation(language);
  const animConfig = getAnimationConfig();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
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
    <section className="min-h-screen relative overflow-hidden flex items-center bg-background">
      <div className="absolute inset-0">
        {!reducedMotion && <Background3D />}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10"></div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Sergio García Mansilla
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8"
          >
            <span className="text-gradient">
              {language === "es"
                ? "Ingeniero Informático | Desarrollo de Software & Ciberseguridad"
                : "Computer Engineer | Software Development & Cybersecurity"}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {language === "es"
              ? "Ingeniero Informático por la UPM, especializado en desarrollo móvil y arquitectura de software. Estudiante de Máster en Ciberseguridad y Hacking Ético."
              : "Computer Engineer from UPM, specialized in mobile development and software architecture. Master's student in Cybersecurity and Ethical Hacking."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label={
                language === "es"
                  ? "Ir a la sección de proyectos"
                  : "Go to projects section"
              }
            >
              {language === "es" ? "Explorar Proyectos" : "Explore Projects"}
            </motion.button>

            <motion.button
              onClick={() => {
                const experienceSection = document.getElementById("experience");
                experienceSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-background transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === "es" ? "Ver Experiencia" : "View Experience"}
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
                  // Fetch the file and create a blob to force the custom filename
                  const response = await fetch(url);
                  const blob = await response.blob();
                  const blobUrl = window.URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.download = fileName;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  // Clean up the blob URL
                  window.URL.revokeObjectURL(blobUrl);
                } catch (error) {
                  console.error("Error downloading CV:", error);
                  // Fallback to direct link if fetch fails
                  window.open(url, "_blank");
                }
              }}
              className="px-8 py-4 border-2 border-accent/50 text-accent/80 font-semibold rounded-xl hover:border-accent hover:text-accent transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === "es" ? "Descargar CV" : "Download CV"}
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <motion.div
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Main animated bar */}
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full relative overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/50 via-accent to-accent/50 rounded-full"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Interactive expanding effect */}
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Pulsing dots on sides */}
              <motion.div
                className="absolute -left-2 top-1/2 w-2 h-2 bg-accent rounded-full transform -translate-y-1/2"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -right-2 top-1/2 w-2 h-2 bg-accent rounded-full transform -translate-y-1/2"
                animate={{
                  scale: [1.2, 0.8, 1.2],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Hover particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full"
                    style={{
                      left: `${10 + i * 15}%`,
                      top: "50%",
                    }}
                    animate={{
                      y: [-10, -20, -10],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
