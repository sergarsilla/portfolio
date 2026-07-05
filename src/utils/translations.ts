import { Language } from '../hooks/useLanguage';

export interface TranslationContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  navigation: {
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  sections: {
    workExperience: string;
    featuredProjects: string;
    technologiesSkills: string;
    contact: string;
  };
  contact: {
    title: string;
    description: string;
    email: string;
    linkedin: string;
    github: string;
  };
  projects: {
    demo: string;
    code: string;
    writeup: string;
  };
  skills: {
    programmingLanguages: string;
    frameworksLibraries: string;
    databases: string;
    cloudDevOps: string;
    cybersecurity: string;
    methodologies: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  es: {
    hero: {
      title: 'Ingeniero Informático | Ciberseguridad, Sistemas & Desarrollo de Software',
      subtitle: 'Ingeniero Informático / Técnico en Ciberseguridad y Sistemas',
      description: 'Ingeniero Informático por la Universidad Politécnica de Madrid y Máster en Dirección de Ciberseguridad, Hacking Ético y Seguridad Ofensiva por EIP International Business School. Técnico en Ciberseguridad y Sistemas en Brooktec: administración y securización de infraestructuras, seguridad defensiva (SIEM, hardening, cloud), cumplimiento ISO 27001 y una base sólida de desarrollo de software.'
    },
    navigation: {
      experience: 'Experiencia',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto'
    },
    sections: {
      workExperience: 'Experiencia Laboral',
      featuredProjects: 'Proyectos Destacados',
      technologiesSkills: 'Tecnologías y Habilidades',
      contact: 'Conectemos'
    },
    contact: {
      title: 'Contacto Profesional',
      description: 'Disponible para oportunidades laborales en ciberseguridad y desarrollo de software.',
      email: 'Contacto Directo',
      linkedin: 'Perfil Profesional',
      github: 'Repositorios'
    },
    projects: {
      demo: 'Demo',
      code: 'Código',
      writeup: 'Análisis'
    },
    skills: {
      programmingLanguages: 'Lenguajes de Programación',
      frameworksLibraries: 'Frameworks y Librerías',
      databases: 'Bases de Datos',
      cloudDevOps: 'Cloud & DevOps',
      cybersecurity: 'Ciberseguridad',
      methodologies: 'Metodologías & Arquitectura'
    }
  },
  en: {
    hero: {
      title: 'Computer Engineer | Cybersecurity, Systems & Software Development',
      subtitle: 'Computer Engineer / Cybersecurity and Systems Technician',
      description: 'Computer Engineer from Universidad Politécnica de Madrid with a Professional Master\'s in Cybersecurity Management, Ethical Hacking and Offensive Security from EIP International Business School. Cybersecurity and Systems Technician at Brooktec: infrastructure administration and hardening, defensive security (SIEM, cloud), ISO 27001 compliance and a solid software development background.'
    },
    navigation: {
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    sections: {
      workExperience: 'Work Experience',
      featuredProjects: 'Featured Projects',
      technologiesSkills: 'Technologies & Skills',
      contact: 'Let\'s Connect'
    },
    contact: {
      title: 'Professional Contact',
      description: 'Available for employment opportunities in cybersecurity and software development.',
      email: 'Direct Contact',
      linkedin: 'Professional Profile',
      github: 'Code Repositories'
    },
    projects: {
      demo: 'Demo',
      code: 'Code',
      writeup: 'Write-up'
    },
    skills: {
      programmingLanguages: 'Programming Languages',
      frameworksLibraries: 'Frameworks & Libraries',
      databases: 'Databases',
      cloudDevOps: 'Cloud & DevOps',
      cybersecurity: 'Cybersecurity',
      methodologies: 'Methodologies & Architecture'
    }
  }
};

export const getTranslation = (language: Language): TranslationContent => {
  return translations[language];
};