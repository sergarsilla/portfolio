import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import HoverEffects from "./animations/HoverEffects";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  language: Language;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  index,
  language,
}: ProjectCardProps) => {
  const t = getTranslation(language);
  
  // Random hover direction for each card
  const hoverDirection = index % 4;
  const getHoverTransform = () => {
    switch (hoverDirection) {
      case 0: return { rotateX: 5, rotateY: 5 }; // top-right
      case 1: return { rotateX: 5, rotateY: -5 }; // top-left
      case 2: return { rotateX: -5, rotateY: 5 }; // bottom-right
      case 3: return { rotateX: -5, rotateY: -5 }; // bottom-left
      default: return { rotateX: 5, rotateY: 5 };
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-accent/10 p-6 h-full flex flex-col relative group hover:border-accent/30 transition-all duration-200"
        whileHover={{
          scale: 1.02,
          y: -8,
          ...getHoverTransform(),
          boxShadow: "0 15px 30px -8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)",
          transition: {
            duration: 0.2,
            ease: [0.25, 0.25, 0.25, 0.75]
          }
        }}
        whileTap={{ scale: 0.98 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated background gradient with random direction */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ 
            scale: 1, 
            rotate: hoverDirection % 2 === 0 ? 180 : -180 
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.h3 
            className="text-xl font-semibold text-foreground mb-3"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: 'rgb(59, 130, 246)'
                }}
                className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-sm text-foreground cursor-default transition-all duration-200 hover:bg-accent hover:text-background"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <div className="flex space-x-4">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.1,
                  color: 'rgb(59, 130, 246)'
                }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center text-foreground hover:text-accent dark:hover:text-accent-dark transition-colors duration-200 group/link"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-5 h-5 mr-2" />
                </motion.div>
                <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                  {t.projects.code}
                </span>
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.1,
                  color: 'rgb(34, 197, 94)'
                }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center text-foreground hover:text-green-500 transition-colors duration-200 group/link"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Globe className="w-5 h-5 mr-2" />
                </motion.div>
                <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                  {t.projects.demo}
                </span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
