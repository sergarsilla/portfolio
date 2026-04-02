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
      title: 'Ingeniero Informático | Ciberseguridad & Desarrollo de Software',
      subtitle: 'Ingeniero Informático / Técnico en Ciberseguridad',
      description: 'Ingeniero Informático por la Universidad Politécnica de Madrid con experiencia profesional en desarrollo de software y ciberseguridad. Actualmente cursando el Máster Profesional en Dirección de Ciberseguridad, Hacking Ético y Seguridad Ofensiva en EIP International Business School. Especializado en seguridad ofensiva, hardening de sistemas y desarrollo de aplicaciones móviles.'
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
      description: 'Disponible para oportunidades laborales en desarrollo de software y ciberseguridad. Experiencia en proyectos empresariales y metodologías ágiles.',
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
      title: 'Computer Engineer | Cybersecurity & Software Development',
      subtitle: 'Computer Engineer / Cybersecurity Technician',
      description: 'Computer Engineer from Universidad Politécnica de Madrid with professional experience in software development and cybersecurity. Currently pursuing a Professional Master\'s in Cybersecurity Management, Ethical Hacking and Offensive Security at EIP International Business School. Specialized in offensive security, system hardening and mobile application development.'
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
      description: 'Available for employment opportunities in software development and cybersecurity. Experience in enterprise projects and agile methodologies.',
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