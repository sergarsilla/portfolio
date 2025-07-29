import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';
import { getAnimationConfig, prefersReducedMotion } from '../utils/animationConfig';
import Background3D from './animations/Background3D';

interface HeroSectionProps {
  language: Language;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const t = getTranslation(language);
  const animConfig = getAnimationConfig();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const containerVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : animConfig.stagger.hero,
        delayChildren: reducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : animConfig.durations.fadeIn,
        ease: animConfig.easing.default
      }
    }
  };

  return (
    <section className="section-spacing relative overflow-hidden min-h-[90vh] flex items-center">
      {!reducedMotion && <Background3D />}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 -z-5"></div>
      
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
              {language === 'es' 
                ? 'Ingeniero de Software especializado en la construcción y seguridad de sistemas complejos'
                : 'Software Engineer specialized in building and securing complex systems'
              }
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {language === 'es'
              ? 'Combinando la arquitectura del software con una mentalidad ofensiva en ciberseguridad.'
              : 'Combining software architecture with an offensive cybersecurity mindset.'
            }
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-accent text-background font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'es' ? 'Explorar Proyectos' : 'Explore Projects'}
            </motion.button>
            
            <motion.button
              onClick={() => {
                const experienceSection = document.getElementById('experience');
                experienceSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-background transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'es' ? 'Ver Experiencia' : 'View Experience'}
            </motion.button>
            
            <motion.button
              onClick={() => {
                const url = language === 'es'
                  ? "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_Spanish.pdf"
                  : "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_English.pdf";
                window.open(url, "_blank");
              }}
              className="px-8 py-4 border-2 border-accent/50 text-accent/80 font-semibold rounded-xl hover:border-accent hover:text-accent transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'es' ? 'Descargar CV' : 'Download CV'}
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;