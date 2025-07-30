import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import { getSkillCategories } from "../data/portfolioData";
import ScrollAnimations from "./animations/ScrollAnimations";
import HoverEffects from "./animations/HoverEffects";
import FloatingParticles from "./animations/FloatingParticles";

interface SkillsSectionProps {
  language: Language;
}

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const t = getTranslation(language);
  const skillCategories = getSkillCategories(language);
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container-custom relative z-10">
        <ScrollAnimations>
          <div className="text-center mb-16">
            <motion.div 
              className="flex items-center justify-center mb-4"
              whileInView={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mr-4"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.1 }}
              >
                <Code2 className="w-6 h-6 text-background" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient">
                  {t.sections.technologiesSkills}
                </span>
              </h2>
            </motion.div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Tecnologías y herramientas que domino para crear soluciones robustas'
                : 'Technologies and tools I master to create robust solutions'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <ScrollAnimations
                key={category.name}
                delay={index * 0.05}
                direction="up"
              >
                <motion.div
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-accent/10 h-full hover:border-accent/30 transition-all duration-200"
                  whileHover={{
                    scale: 1.02,
                    y: -3,
                    transition: { duration: 0.1 }
                  }}
                >
                  <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-3 ${
                      category.priority === 'high' ? 'bg-accent' : 'bg-accent/60'
                    }`}></span>
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: (index * 0.05) + (skillIndex * 0.02),
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-full text-sm cursor-default transition-all duration-200 font-medium text-gray-800 dark:text-gray-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        {skill}
                      </motion.span>
                    ))}
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

export default SkillsSection;
