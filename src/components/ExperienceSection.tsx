import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import { getExperiences } from "../data/portfolioData";
import HoverEffects from "./animations/HoverEffects";
import ScrollAnimations from "./animations/ScrollAnimations";

interface ExperienceSectionProps {
  language: Language;
}

const ExperienceSection = ({ language }: ExperienceSectionProps) => {
  const t = getTranslation(language);
  const experiences = getExperiences(language);
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <ScrollAnimations>
          <div className="text-center mb-16">
            <motion.div 
              className="flex items-center justify-center mb-4"
              whileInView={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mr-4"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Briefcase className="w-6 h-6 text-background" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient">
                  {t.sections.workExperience}
                </span>
              </h2>
            </motion.div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Mi trayectoria profesional combinando desarrollo de software con ciberseguridad'
                : 'My professional journey combining software development with cybersecurity'
              }
            </p>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ScrollAnimations
                key={exp.company}
                delay={index * 0.1}
                direction="up"
              >
                <motion.div
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-accent/10 relative overflow-hidden group hover:border-accent/30 transition-all duration-200"
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)",
                    transition: {
                      duration: 0.2,
                      ease: [0.25, 0.25, 0.25, 0.75]
                    }
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={false}
                  />
                  
                  {/* Left border accent */}
                  <motion.div
                    className="absolute left-0 top-0 w-1 h-0 bg-gradient-to-b from-accent to-accent/50 group-hover:h-full transition-all duration-300 ease-out"
                  />
                  
                  {/* Subtle shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200"
                    >
                      {exp.position}
                    </motion.h3>
                    <motion.h4 
                      className="text-lg text-accent mb-2 font-medium"
                    >
                      {exp.company}
                    </motion.h4>
                    <p className="text-muted-foreground text-sm mb-4 font-medium">
                      {exp.period}
                    </p>
                    <p className="text-foreground/80 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: techIndex * 0.03,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.03,
                            transition: { duration: 0.15 }
                          }}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-full text-sm text-gray-800 dark:text-gray-200 cursor-default transition-all duration-150 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimations>
            ))}
          </div>
        </ScrollAnimations>
      </div>
    </section>
  );
};

export default ExperienceSection;
