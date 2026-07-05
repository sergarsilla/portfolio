import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";
import { getSkillCategories } from "../data/portfolioData";
import ScrollAnimations from "./animations/ScrollAnimations";

interface SkillsSectionProps {
  language: Language;
}

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const t = getTranslation(language);
  const skillCategories = getSkillCategories(language);

  return (
    <div className="container-custom">
      <ScrollAnimations>
        <h2 className="text-2xl md:text-3xl text-foreground">
          {t.sections.technologiesSkills}
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {language === "es"
            ? "Herramientas con las que trabajo a diario."
            : "The tools I work with every day."}
        </p>
      </ScrollAnimations>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
        {skillCategories.map((category, index) => (
          <ScrollAnimations key={category.name} delay={(index % 2) * 0.06}>
            <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground hover:border-accent/50 hover:text-foreground transition-colors duration-150"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </ScrollAnimations>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
