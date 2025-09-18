import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Language } from "../hooks/useLanguage";
import { getProjects } from "../data/portfolioData";
import ScrollAnimations from "./animations/ScrollAnimations";

interface ProjectGridProps {
  language: Language;
}

const ProjectGrid = ({ language }: ProjectGridProps) => {
  const [showAll, setShowAll] = useState(false);
  const projects = getProjects(language);
  const featuredCount = 4;
  const featuredProjects = projects.slice(0, featuredCount);
  const remainingProjects = projects.slice(featuredCount);
  const hasMoreProjects = remainingProjects.length > 0;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="space-y-8">
      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <ScrollAnimations
            key={project.title}
            delay={index * 0.1}
            direction="up"
          >
            <ProjectCard {...project} index={index} language={language} />
          </ScrollAnimations>
        ))}
      </div>

      {/* Additional Projects (Expandable) */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingProjects.map((project, index) => (
                <ScrollAnimations
                  key={project.title}
                  delay={(index + featuredCount) * 0.1}
                  direction="up"
                >
                  <ProjectCard {...project} index={index + featuredCount} language={language} />
                </ScrollAnimations>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show More/Less Button */}
      {hasMoreProjects && (
        <div className="flex justify-center">
          <motion.button
            onClick={toggleShowAll}
            className="group relative px-8 py-3 bg-gradient-to-r from-accent to-accent/80 text-background font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              {showAll 
                ? (language === 'es' ? 'Ver menos' : 'Show less')
                : (language === 'es' ? 'Ver más proyectos' : 'View more projects')
              }
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </span>
            
            {/* Button background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
