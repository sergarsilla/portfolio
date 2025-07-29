import ProjectCard from "./ProjectCard";
import { Language } from "../hooks/useLanguage";
import { getProjects } from "../data/portfolioData";
import ScrollAnimations from "./animations/ScrollAnimations";

interface ProjectGridProps {
  language: Language;
}

const ProjectGrid = ({ language }: ProjectGridProps) => {
  const projects = getProjects(language);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <ScrollAnimations
          key={project.title}
          delay={index * 0.1}
          direction="up"
        >
          <ProjectCard {...project} index={index} language={language} />
        </ScrollAnimations>
      ))}
    </div>
  );
};

export default ProjectGrid;
