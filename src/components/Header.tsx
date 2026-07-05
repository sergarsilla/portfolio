import ThemeToggle from "./ThemeToggle";
import { Language } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Header = ({ isDark, onToggleTheme, language, onToggleLanguage }: HeaderProps) => {
  const t = getTranslation(language);

  const links = [
    { id: "experience", label: t.navigation.experience },
    { id: "projects", label: t.navigation.projects },
    { id: "skills", label: t.navigation.skills },
    { id: "contact", label: t.navigation.contact },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-14 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-custom h-full flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors duration-150"
          aria-label={language === "es" ? "Volver arriba" : "Back to top"}
        >
          <span className="text-accent">&gt;_</span> sergarsilla
        </button>

        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-1 mr-3" aria-label={language === "es" ? "Secciones" : "Sections"}>
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-2 rounded-lg font-mono text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
            title={language === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {language === "es" ? "EN" : "ES"}
          </button>

          <ThemeToggle
            isDark={isDark}
            onToggle={onToggleTheme}
            label={
              language === "es"
                ? isDark
                  ? "Cambiar a tema claro"
                  : "Cambiar a tema oscuro"
                : isDark
                  ? "Switch to light theme"
                  : "Switch to dark theme"
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
