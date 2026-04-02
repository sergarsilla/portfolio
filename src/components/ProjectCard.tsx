import { motion } from "framer-motion";
import { Github, Globe, Shield } from "lucide-react";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  language: Language;
  category?: 'development' | 'cybersecurity';
}

const ProjectCard = ({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  index,
  language,
  category = 'development',
}: ProjectCardProps) => {
  const t = getTranslation(language);
  
  const categoryIcon = category === 'cybersecurity' ? (
    <Shield className="w-5 h-5" />
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  const categoryColor = category === 'cybersecurity' 
    ? 'from-accent to-accent-secondary' 
    : 'from-accent-secondary to-accent-tertiary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
    >
      <motion.div
        className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border p-6 h-full flex flex-col relative group hover:border-accent/50 transition-all duration-300"
        whileHover={{
          scale: 1.02,
          y: -8,
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px hsl(var(--accent) / 0.3)",
          transition: {
            duration: 0.3,
            ease: [0.25, 0.25, 0.25, 0.75]
          }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Category badge */}
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryColor} text-background text-xs font-semibold`}
            whileHover={{ scale: 1.05 }}
          >
            {categoryIcon}
            <span className="uppercase tracking-wider">
              {category === 'cybersecurity' ? 'Cyber' : 'Dev'}
            </span>
          </motion.div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-accent to-transparent"></div>
        </div>

        <div className="relative z-10">
          <motion.h3 
            className="text-xl font-bold text-foreground mb-3 pr-20 glitch"
            data-text={title}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          
          <p className="text-muted-foreground mb-4 flex-grow leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2
                }}
                className="px-3 py-1.5 bg-secondary/50 border border-border rounded-lg text-xs text-foreground font-mono cursor-default transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <div className="flex gap-4">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200 group/link"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium group-hover/link:translate-x-1 transition-transform duration-200">
                  {t.projects.code}
                </span>
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-foreground hover:text-accent-secondary transition-colors duration-200 group/link"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Globe className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium group-hover/link:translate-x-1 transition-transform duration-200">
                  {t.projects.demo}
                </span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 rounded-2xl"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
