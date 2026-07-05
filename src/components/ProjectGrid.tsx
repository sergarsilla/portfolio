import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import { getProjects } from "../data/portfolioData";
import ScrollAnimations from "./animations/ScrollAnimations";

interface ProjectGridProps {
  language: Language;
}

const FEATURED_COUNT = 4;

const ProjectGrid = ({ language }: ProjectGridProps) => {
  const [showAll, setShowAll] = useState(false);
  const t = getTranslation(language);
  const projects = getProjects(language);
  const visibleProjects = showAll ? projects : projects.slice(0, FEATURED_COUNT);
  const hasMoreProjects = projects.length > FEATURED_COUNT;

  return (
    <div className="container-custom">
      <ScrollAnimations>
        <h2 className="text-2xl md:text-3xl text-foreground">
          {t.sections.featuredProjects}
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {language === "es"
            ? "Seguridad aplicada, aprendizaje automático y aplicaciones publicadas."
            : "Applied security, machine learning and shipped applications."}
        </p>
      </ScrollAnimations>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleProjects.map((project, index) => (
          <ScrollAnimations key={project.title} delay={(index % 2) * 0.06}>
            <ProjectCard {...project} language={language} />
          </ScrollAnimations>
        ))}
      </div>

      {hasMoreProjects && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-accent/60 hover:text-accent active:translate-y-px transition-colors duration-150"
          >
            {showAll
              ? language === "es"
                ? "Ver menos"
                : "Show less"
              : language === "es"
                ? "Ver más proyectos"
                : "View more projects"}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
