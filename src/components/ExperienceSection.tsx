import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import { getExperiences } from "../data/portfolioData";
import ScrollAnimations from "./animations/ScrollAnimations";

interface ExperienceSectionProps {
  language: Language;
}

const ExperienceSection = ({ language }: ExperienceSectionProps) => {
  const t = getTranslation(language);
  const experiences = getExperiences(language);

  return (
    <div className="container-custom">
      <ScrollAnimations>
        <h2 className="text-2xl md:text-3xl text-foreground">
          {t.sections.workExperience}
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {language === "es"
            ? "Trayectoria profesional entre sistemas, seguridad y desarrollo."
            : "A professional path across systems, security and software."}
        </p>
      </ScrollAnimations>

      <div className="mt-10 divide-y divide-border">
        {experiences.map((exp, index) => (
          <ScrollAnimations key={`${exp.company}-${exp.period}`} delay={index * 0.05}>
            <article className="grid gap-3 md:grid-cols-[210px,1fr] py-8">
              <p className="font-mono text-sm text-muted-foreground pt-1">{exp.period}</p>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{exp.position}</h3>
                <p className="mt-0.5 text-sm font-medium text-accent">{exp.company}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </ScrollAnimations>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
