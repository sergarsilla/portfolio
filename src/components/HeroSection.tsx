import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Language } from "../hooks/useLanguage";

interface HeroSectionProps {
  language: Language;
}

/** Terminal session shown as the hero visual. Kept language-neutral on purpose. */
type SessionLine = { kind: "cmd" | "out"; text: string };

const SESSION: SessionLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "sergio.garcia" },
  { kind: "cmd", text: "cat role.txt" },
  { kind: "out", text: "cybersecurity & systems @ brooktec" },
  { kind: "out", text: "siem / hardening / cloud / iso 27001" },
  { kind: "cmd", text: "ls ~/projects" },
  { kind: "out", text: "wazuh-anomaly-detector  wazuh-llm-triage" },
];

const TYPE_MS = 38;
const OUT_MS = 220;

const copy = {
  es: {
    role: "Técnico en Ingeniería de Ciberseguridad y Sistemas en Brooktec",
    description:
      "Ingeniero Informático por la UPM y Máster en Dirección de Ciberseguridad, Hacking Ético y Seguridad Ofensiva (EIP).",
    primaryCta: "Ver proyectos",
    secondaryCta: "Descargar CV",
    terminalHint: "Abrir la terminal interactiva",
  },
  en: {
    role: "Cybersecurity and Systems Engineering Technician at Brooktec",
    description:
      "Computer Engineer (UPM) with a Professional Master's in Cybersecurity Management, Ethical Hacking and Offensive Security (EIP).",
    primaryCta: "View projects",
    secondaryCta: "Download CV",
    terminalHint: "Open the interactive terminal",
  },
};

const HeroSection = ({ language }: HeroSectionProps) => {
  const t = copy[language];
  const reducedMotion = useReducedMotion();
  // Number of session lines fully shown; chars typed of the current cmd line
  const [progress, setProgress] = useState({ line: 0, char: 0 });

  useEffect(() => {
    if (reducedMotion) {
      setProgress({ line: SESSION.length, char: 0 });
      return;
    }

    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (line >= SESSION.length) return;
      const current = SESSION[line];
      if (current.kind === "cmd" && char < current.text.length) {
        char += 1;
        setProgress({ line, char });
        timer = setTimeout(step, TYPE_MS);
      } else {
        line += 1;
        char = 0;
        setProgress({ line, char });
        timer = setTimeout(step, current.kind === "cmd" ? OUT_MS : OUT_MS / 2);
      }
    };

    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const downloadCV = async () => {
    const url =
      language === "es"
        ? "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_Spanish.pdf"
        : "https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_English.pdf";
    const fileName =
      language === "es" ? "CV_SergioGarciaMansilla_es.pdf" : "CV_SergioGarciaMansilla_en.pdf";
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  const done = progress.line >= SESSION.length;

  return (
    <div className="min-h-[100dvh] flex items-center pt-14">
      <div className="container-custom w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Intro */}
          <div>
            <p className="font-mono text-sm text-accent mb-4">$ whoami</p>
            <h1 className="text-4xl md:text-5xl text-foreground">
              Sergio García Mansilla
            </h1>
            <p className="mt-4 text-lg md:text-xl font-medium text-foreground/90">
              {t.role}
            </p>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={scrollToProjects}
                className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 active:translate-y-px transition-colors duration-150"
              >
                {t.primaryCta}
              </button>
              <button
                onClick={downloadCV}
                className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-accent/60 hover:text-accent active:translate-y-px transition-colors duration-150"
              >
                {t.secondaryCta}
              </button>
            </div>
          </div>

          {/* Terminal session (click opens the real one) */}
          <button
            onClick={openTerminal}
            title={t.terminalHint}
            className="terminal-window w-full text-left cursor-pointer hover:border-accent/50 transition-colors duration-150"
          >
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="text-xs font-mono ml-2 text-muted-foreground">
                sergarsilla@portfolio:~$
              </span>
            </div>
            <div className="p-5 font-mono text-sm leading-7 min-h-[240px]">
              {SESSION.slice(0, progress.line).map((line, i) =>
                line.kind === "cmd" ? (
                  <p key={i}>
                    <span className="text-accent">$</span>{" "}
                    <span className="text-foreground">{line.text}</span>
                  </p>
                ) : (
                  <p key={i} className="text-muted-foreground">
                    {line.text}
                  </p>
                ),
              )}
              {!done && SESSION[progress.line]?.kind === "cmd" && (
                <p>
                  <span className="text-accent">$</span>{" "}
                  <span className="text-foreground">
                    {SESSION[progress.line].text.slice(0, progress.char)}
                  </span>
                  <span className="cursor-blink text-accent">▊</span>
                </p>
              )}
              {done && (
                <p>
                  <span className="text-accent">$</span>{" "}
                  <span className="cursor-blink text-accent">▊</span>
                </p>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
