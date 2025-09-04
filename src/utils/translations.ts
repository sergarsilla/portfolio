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
    toolsOthers: string;
    cybersecurity: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  es: {
    hero: {
      title: 'Ingeniero Informático | Desarrollo de Software & Ciberseguridad',
      subtitle: 'Ingeniero Informático / Desarrollador',
      description: 'Ingeniero Informático por la Universidad Politécnica de Madrid con experiencia profesional en el desarrollo de software. Mi trayectoria incluye la participación en el ciclo de vida completo de proyectos de aplicaciones móviles y el trabajo en equipos que utilizan metodologías ágiles. Actualmente, complemento mi formación técnica cursando el Máster Profesional en Dirección de Ciberseguridad y Hacking Ético en EIP International Business School.'
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
      toolsOthers: 'Herramientas y Otros',
      cybersecurity: 'Ciberseguridad'
    }
  },
  en: {
    hero: {
      title: 'Computer Engineer | Software Development & Cybersecurity',
      subtitle: 'Computer Engineer / Developer',
      description: 'Computer Engineer from Universidad Politécnica de Madrid with professional experience in software development. My background includes participation in the complete lifecycle of mobile application projects and working in teams using agile methodologies. Currently, I am complementing my technical training by pursuing a Professional Master\'s in Cybersecurity Management and Ethical Hacking at EIP International Business School.'
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
      toolsOthers: 'Tools & Others',
      cybersecurity: 'Cybersecurity'
    }
  }
};

export const getTranslation = (language: Language): TranslationContent => {
  return translations[language];
};