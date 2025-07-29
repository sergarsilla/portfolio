import { Language } from '../hooks/useLanguage';

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  type: 'internship' | 'freelance' | 'full-time';
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'development' | 'cybersecurity';
  liveUrl?: string;
  githubUrl?: string;
  writeupUrl?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface ContactLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioContent {
  hero: {
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    description: Record<Language, string>;
  };
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  contact: {
    title: Record<Language, string>;
    description: Record<Language, string>;
    links: ContactLink[];
  };
}

export interface AnimationConfig {
  stagger: {
    hero: number;
    cards: number;
    skills: number;
  };
  durations: {
    fadeIn: number;
    slideUp: number;
    hover: number;
    headerShrink: number;
  };
  easing: {
    default: number[];
    bounce: number[];
    smooth: number[];
  };
}