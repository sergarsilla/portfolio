import { ArrowUpRight, Github } from "lucide-react";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  language: Language;
  category?: "development" | "cybersecurity";
}

const ProjectCard = ({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  language,
  category = "development",
}: ProjectCardProps) => {
  const t = getTranslation(language);
  const isCyber = category === "cybersecurity";

  return (
    <article className="group h-full flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5 transition-[transform,border-color,box-shadow] duration-150">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span
          className={
            isCyber
              ? "shrink-0 rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent"
              : "shrink-0 rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          }
        >
          {isCyber ? "cyber" : "dev"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-grow">
        {description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(githubUrl || liveUrl) && (
        <div className="mt-5 flex gap-5">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors duration-150"
            >
              <Github className="w-4 h-4" />
              {t.projects.code}
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors duration-150"
            >
              <ArrowUpRight className="w-4 h-4" />
              {t.projects.demo}
            </a>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
