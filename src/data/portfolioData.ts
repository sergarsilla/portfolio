import { Experience, Project, SkillCategory } from '../types/portfolio';
import { Language } from '../hooks/useLanguage';

interface ExperienceWithTranslations {
  company: string;
  position: Record<Language, string>;
  period: Record<Language, string>;
  description: Record<Language, string>;
  technologies: string[];
  type: 'internship' | 'freelance' | 'full-time';
}

export const experiencesData: ExperienceWithTranslations[] = [
  {
    company: 'Freelance',
    position: {
      es: 'Desarrollador de Aplicaciones Móviles',
      en: 'Mobile Application Developer'
    },
    period: {
      es: 'Junio 2023 - Actualidad',
      en: 'June 2023 - Present'
    },
    description: {
      es: 'Gestioné el ciclo de vida completo de proyectos de aplicaciones móviles para clientes, desde la toma de requisitos hasta el despliegue en Google Play Store y Apple App Store. Desarrollé soluciones multiplataforma a medida utilizando React Native y TypeScript, integrando servicios backend con Firebase. Demostré una comunicación eficaz y habilidades de consultoría, traduciendo las necesidades del cliente en especificaciones técnicas y productos funcionales.',
      en: 'Managed the complete lifecycle of mobile application projects for clients, from requirements gathering to deployment on Google Play Store and Apple App Store. Developed custom cross-platform solutions using React Native and TypeScript, integrating backend services with Firebase. Demonstrated effective communication and consulting skills, translating client needs into technical specifications and functional products.'
    },
    technologies: [
      'React Native',
      'TypeScript',
      'Firebase',
      'JavaScript',
      'Google Play Store',
      'Apple App Store',
      'Technical Consulting'
    ],
    type: 'freelance'
  },
  {
    company: 'ONGAWA Ingeniería para el Desarrollo Humano',
    position: {
      es: 'Ingeniero Informático',
      en: 'Computer Engineer'
    },
    period: {
      es: 'Febrero 2025 - Mayo 2025',
      en: 'February 2025 - May 2025'
    },
    description: {
      es: 'Lideré el desarrollo de una aplicación móvil Android con Kotlin y Jetpack Compose para evaluar la vulnerabilidad climática en servicios rurales de agua. Implementé una arquitectura de software limpia (Clean Architecture), mejorando la mantenibilidad y escalabilidad del código base. Instauré el uso de Git Flow como flujo de trabajo para el control de versiones, optimizando la colaboración y reduciendo los conflictos de código en el equipo. Participé activamente en la planificación y seguimiento del proyecto bajo la metodología SCRUM, asegurando entregas de valor continuas.',
      en: 'Led the development of an Android mobile application with Kotlin and Jetpack Compose to assess climate vulnerability in rural water services. Implemented clean software architecture (Clean Architecture), improving code base maintainability and scalability. Established the use of Git Flow as version control workflow, optimizing collaboration and reducing code conflicts in the team. Actively participated in project planning and tracking under SCRUM methodology, ensuring continuous value delivery.'
    },
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Clean Architecture',
      'Domain Driven Design',
      'Git Flow',
      'SCRUM',
      'Android Development',
      'Room Database'
    ],
    type: 'internship'
  }
];

export const getExperiences = (language: Language): Experience[] => {
  return experiencesData.map(exp => ({
    company: exp.company,
    position: exp.position[language],
    period: exp.period[language],
    description: exp.description[language],
    technologies: exp.technologies,
    type: exp.type
  }));
};

interface ProjectWithTranslations {
  title: string;
  description: Record<Language, string>;
  technologies: string[];
  category: 'development' | 'cybersecurity';
  liveUrl?: string;
  githubUrl?: string;
  writeupUrl?: string;
}

const projectsData: ProjectWithTranslations[] = [
  {
    title: 'IntelliCart - Smart Grocery List',
    description: {
      es: 'Desarrollé IntelliCart, una aplicación móvil de lista de compras inteligente. La app incluye un chat con IA que ayuda a los usuarios con recetas basándose en los productos de sus listas de compra, y está disponible en Google Play Store y Apple App Store.',
      en: 'I developed IntelliCart, a smart grocery list mobile application. The app includes an AI chat that helps users with recipes based on the products in their shopping lists, and is available on Google Play Store and Apple App Store.'
    },
    technologies: [
      'Android - iOS',
      'React Native',
      'Expo',
      'TypeScript',
      'Firebase',
      'AI Integration'
    ],
    category: 'development',
    liveUrl: 'https://intellicart.netlify.app/'
  },
  {
    title: 'TruDetail - Gift Ideas Planner',
    description: {
      es: 'Desarrollé TruDetail, una aplicación móvil que funciona como un "segundo cerebro" para organizar información vital sobre las personas importantes en tu vida. La app ayuda a planificar regalos perfectos basándose en características y "sparks" que el usuario registra sobre familiares y amigos, disponible en ambas stores.',
      en: 'I developed TruDetail, a mobile application that works as a "second brain" to organize vital information about the people who matter most to you. The app helps plan perfect gifts based on characteristics and "sparks" that users record about family and friends, available on both stores.'
    },
    technologies: [
      'Android - iOS',
      'React Native',
      'Expo',
      'TypeScript',
      'Firebase'
    ],
    category: 'development',
    liveUrl: 'https://trudetail.netlify.app/en'
  },
  {
    title: 'Tennis Tournaments App',
    description: {
      es: 'Desarrollé Tennis Tournaments App: Una aplicación web construida con React, Firebase y JavaScript que simplifica la organización y gestión de torneos de tenis permitiendo programación fácil y seguimiento de partidos. Desarrollada como proyecto en equipo usando metodologías ágiles, involucró planificación completa, seguimiento, pruebas y aseguramiento de calidad para entregar una solución robusta. Implementé un módulo de autenticación de usuarios. El trabajo futuro incluye endurecer la seguridad implementando medidas contra amenazas comunes como credential stuffing y asegurar el hash seguro de contraseñas.',
      en: 'I developed Tennis Tournaments App: A web application built with React, Firebase, and JavaScript that simplifies the organization and management of tennis tournaments by enabling easy scheduling and match tracking. Developed as a team project using agile methodologies, it involved thorough planning, follow-up, testing, and quality assurance to deliver a robust solution. I implemented a user authentication module. Future work includes hardening security by implementing measures against common threats like credential stuffing and ensuring secure password hashing.'
    },
    technologies: ['React', 'Firebase', 'JavaScript'],
    category: 'development',
    liveUrl: 'https://tennis-tournaments-af24a.web.app'
  },
  {
    title: 'AI Image Generator App',
    description: {
      es: 'Desarrollé una aplicación móvil para crear imágenes con IA y la publiqué en Google Play Store. La aplicación incluye autenticación de usuarios y medidas de seguridad para proteger las API keys y prevenir el uso no autorizado.',
      en: 'I developed a mobile application to create images with AI and published it on Google Play Store. The application includes user authentication and security measures to protect API keys and prevent unauthorized usage.'
    },
    technologies: [
      'Android - iOS',
      'React-Native',
      'AI APIs',
      'TypeScript',
      'Firebase'
    ],
    category: 'development',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.sergarsilla.aiimagegenerator'
  },
  {
    title: 'Word Games App',
    description: {
      es: 'Desarrollé una aplicación móvil que recopila algunos juegos de palabras como crucigramas o wordle y la publiqué en Google Play Store. La aplicación incluye validación de entrada y sanitización para prevenir inyección de código malicioso.',
      en: 'I developed a mobile application that collects some word games such as crosswords or wordle and published it on Google Play Store. The application includes input validation and sanitization to prevent malicious code injection.'
    },
    technologies: [
      'Android - iOS',
      'React-Native',
      'TypeScript',
      'Firebase'
    ],
    category: 'development',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.sergarsilla.wordgame'
  },
  {
    title: 'Task Manager App',
    description: {
      es: 'Desarrollé una aplicación móvil para gestionar tareas diarias y la publiqué en Google Play Store. Implementé cifrado local de datos sensibles y autenticación segura para proteger la información personal del usuario.',
      en: 'I developed a mobile application to manage daily tasks and published it on Google Play Store. I implemented local encryption of sensitive data and secure authentication to protect user personal information.'
    },
    technologies: [
      'Android - iOS',
      'React-Native',
      'JavaScript',
      'Firebase'
    ],
    category: 'development',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.sergarsilla.taskmaster'
  },
  {
    title: 'Weather App',
    description: {
      es: 'Desarrollé una aplicación web para visualizar el clima en cualquier ciudad y la publiqué con Firebase Hosting. La aplicación incluye validación de API keys y manejo seguro de datos meteorológicos externos.',
      en: 'I developed a web application to visualize the weather in any city and published it with Firebase Hosting. The application includes API key validation and secure handling of external weather data.'
    },
    technologies: ['React', 'Firebase', 'JavaScript', 'Weather API'],
    category: 'development',
    liveUrl: 'https://weather-app-a854f.firebaseapp.com'
  }
];

export const getProjects = (language: Language): Project[] => {
  return projectsData.map(project => ({
    title: project.title,
    description: project.description[language],
    technologies: project.technologies,
    category: project.category,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    writeupUrl: project.writeupUrl
  }));
};

interface SkillCategoryWithTranslations {
  nameKey: keyof typeof import('../utils/translations').translations.es.skills;
  skills: string[];
  priority: 'high' | 'medium' | 'low';
}

const skillCategoriesData: SkillCategoryWithTranslations[] = [
  {
    nameKey: 'programmingLanguages',
    skills: [
      'Java',
      'Python',
      'C',
      'Kotlin',
      'JavaScript',
      'TypeScript',
      'Elixir',
      'HTML',
      'CSS'
    ],
    priority: 'high'
  },
  {
    nameKey: 'frameworksLibraries',
    skills: [
      'React',
      'React-Native',
      'Node.js',
      'Express',
      'Android',
      'Jetpack Compose',
      'CUDA',
      'OpenMP'
    ],
    priority: 'high'
  },
  {
    nameKey: 'databases',
    skills: ['MySQL', 'PostgreSQL', 'Firebase', 'Room'],
    priority: 'medium'
  },
  {
    nameKey: 'toolsOthers',
    skills: [
      'Git',
      'GitLab',
      'Linux',
      'Scrum',
      'REST APIs',
      'AWS',
      'Clean Architecture',
      'Domain Driven Design',
      'Multithreading',
      'GPU Programming'
    ],
    priority: 'medium'
  },
  {
    nameKey: 'cybersecurity',
    skills: [
      'Pentesting',
      'Ethical Hacking',
      'Vulnerability Assessment',
      'Web Application Security',
      'Burp Suite',
      'Nmap',
      'Metasploit',
      'Kali Linux',
      'OWASP Top 10'
    ],
    priority: 'high'
  }
];

export const getSkillCategories = (language: Language): SkillCategory[] => {
  const skillNames = {
    es: {
      programmingLanguages: 'Lenguajes de Programación',
      frameworksLibraries: 'Frameworks y Librerías',
      databases: 'Bases de Datos',
      toolsOthers: 'Herramientas y Otros',
      cybersecurity: 'Ciberseguridad'
    },
    en: {
      programmingLanguages: 'Programming Languages',
      frameworksLibraries: 'Frameworks & Libraries',
      databases: 'Databases',
      toolsOthers: 'Tools & Others',
      cybersecurity: 'Cybersecurity'
    }
  };

  return skillCategoriesData.map(category => ({
    name: skillNames[language][category.nameKey],
    skills: category.skills,
    priority: category.priority
  }));
};