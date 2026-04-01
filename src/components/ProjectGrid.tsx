import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCardCyber from "./ProjectCardCyber";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <ScrollAnimations
            key={project.title}
            delay={index * 0.1}
            direction="up"
          >
            <ProjectCardCyber {...project} index={index} language={language} />
          </ScrollAnimations>
        ))}
      </div>

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
                  <ProjectCardCyber
                    {...project}
                    index={index + featuredCount}
                    language={language}
                  />
                </ScrollAnimations>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasMoreProjects && (
        <div className="flex justify-center">
          <motion.button
            onClick={toggleShowAll}
            className="px-8 py-3 border-2 border-cyber-green text-cyber-green font-mono rounded-lg hover:bg-cyber-green/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll
              ? language === "es" ? "Ver menos" : "Show less"
              : language === "es" ? "Ver más proyectos" : "View more projects"
            }
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
