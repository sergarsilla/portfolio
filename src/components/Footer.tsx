import { Github, Linkedin, Terminal } from "lucide-react";
import { Language } from "../hooks/useLanguage";

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  return (
    <footer className="border-t border-border">
      <div className="container-custom py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sergio García Mansilla
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={openTerminal}
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs text-muted-foreground hover:text-accent hover:bg-secondary transition-colors duration-150"
            title={language === "es" ? "También funciona con Ctrl+Shift+K" : "Also works with Ctrl+Shift+K"}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{language === "es" ? "abrir terminal" : "open terminal"}</span>
            <span className="hidden sm:inline text-muted-foreground/60">ctrl+shift+k</span>
          </button>

          <a
            href="https://github.com/sergarsilla"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/sergarsilla"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
