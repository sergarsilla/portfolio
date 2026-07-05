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
    company: 'Brooktec',
    position: {
      es: 'Técnico en Ingeniería de Ciberseguridad y Sistemas',
      en: 'Cybersecurity and Systems Engineering Technician'
    },
    period: {
      es: 'Enero 2026 - Actualidad',
      en: 'January 2026 - Present'
    },
    description: {
      es: 'Administración y securización de sistemas e infraestructuras, tanto internas como de clientes. Defensa y Hardening: implementación de políticas de endurecimiento en entornos Linux y Mac, reduciendo la superficie de exposición de la infraestructura. Monitorización (SOC): gestión activa de alertas mediante SIEM (Wazuh) y protección de capas de aplicación con WAF, garantizando una respuesta ágil ante incidentes de seguridad. Seguridad Cloud: auditoría y validación de seguridad en entornos distribuidos de AWS, Azure y Google Cloud. Cumplimiento: soporte a la implantación y mantenimiento del SGSI ISO 27001 (procedimientos, auditorías internas, RGPD). Seguridad Ofensiva: ejecución de pruebas de penetración Black Box y White Box sobre activos críticos, reportando hallazgos técnicos para su remediación. Automatización con IA: desarrollo de herramientas internas basadas en LLM para diagnóstico de infraestructura y operaciones de seguridad.',
      en: 'Administration and securing of systems and infrastructure, both internal and client-facing. Defense and Hardening: implementation of hardening policies in Linux and Mac environments, reducing infrastructure exposure surface. Monitoring (SOC): active alert management through SIEM (Wazuh) and application-layer protection with WAF, ensuring agile response to security incidents. Cloud Security: security auditing and validation in distributed AWS, Azure and Google Cloud environments. Compliance: support to the implementation and maintenance of an ISO 27001 ISMS (procedures, internal audits, GDPR). Offensive Security: execution of Black Box and White Box penetration tests on critical assets, reporting technical findings for remediation. AI Automation: development of internal LLM-based tooling for infrastructure diagnostics and security operations.'
    },
    technologies: [
      'SIEM (Wazuh)',
      'Linux Hardening',
      'Incident Response',
      'AWS Security',
      'Azure Security',
      'Google Cloud',
      'ISO 27001',
      'Docker',
      'WAF',
      'SOC',
      'Penetration Testing',
      'DevSecOps'
    ],
    type: 'full-time'
  },
  {
    company: 'Brooktec',
    position: {
      es: 'Desarrollador de Software',
      en: 'Software Developer'
    },
    period: {
      es: 'Septiembre 2025 - Enero 2026',
      en: 'September 2025 - January 2026'
    },
    description: {
      es: 'Desarrollo de aplicaciones móviles utilizando herramientas de Inteligencia Artificial. Integración de protocolos de Ciberseguridad en pipelines CI/CD (DevSecOps).',
      en: 'Development of mobile applications using Artificial Intelligence tools. Integration of Cybersecurity protocols in CI/CD pipelines (DevSecOps).'
    },
    technologies: [
      'Mobile Development',
      'AI Tools',
      'DevSecOps',
      'CI/CD',
      'React Native',
      'Flutter'
    ],
    type: 'internship'
  },
  {
    company: 'Freelance',
    position: {
      es: 'Desarrollador de Aplicaciones Móviles',
      en: 'Mobile Application Developer'
    },
    period: {
      es: 'Enero 2023 - Actualidad',
      en: 'January 2023 - Present'
    },
    description: {
      es: 'Gestión del ciclo de vida completo de proyectos de aplicaciones móviles para clientes, desde la toma de requisitos hasta el despliegue en Google Play Store y Apple App Store. Desarrollo de soluciones multiplataforma a medida utilizando React Native y TypeScript, integrando servicios backend con Firebase. Comunicación eficaz y habilidades de consultoría, traduciendo las necesidades del cliente en especificaciones técnicas y productos funcionales.',
      en: 'Management of the complete lifecycle of mobile application projects for clients, from requirements gathering to deployment on Google Play Store and Apple App Store. Development of custom cross-platform solutions using React Native and TypeScript, integrating backend services with Firebase. Effective communication and consulting skills, translating client needs into technical specifications and functional products.'
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
      es: 'Ingeniero de Software',
      en: 'Software Engineer'
    },
    period: {
      es: 'Febrero 2025 - Mayo 2025',
      en: 'February 2025 - May 2025'
    },
    description: {
      es: 'Liderazgo en el desarrollo de una aplicación móvil Android con Kotlin y Jetpack Compose para evaluar la vulnerabilidad climática en servicios rurales de agua. Implementación de arquitectura de software limpia (Clean Architecture), mejorando la mantenibilidad y escalabilidad del código base. Establecimiento del uso de Git Flow como flujo de trabajo para el control de versiones, optimizando la colaboración y reduciendo los conflictos de código en el equipo. Participación activa en la planificación y seguimiento del proyecto bajo la metodología SCRUM, asegurando entregas de valor continuas.',
      en: 'Leadership in the development of an Android mobile application with Kotlin and Jetpack Compose to assess climate vulnerability in rural water services. Implementation of clean software architecture (Clean Architecture), improving code base maintainability and scalability. Establishment of Git Flow as version control workflow, optimizing collaboration and reducing code conflicts in the team. Active participation in project planning and tracking under SCRUM methodology, ensuring continuous value delivery.'
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
    title: 'Wazuh Anomaly Detector',
    description: {
      es: 'Motor de detección de anomalías en tiempo real para el SIEM Wazuh, desarrollado como Trabajo Fin de Máster. Un autoencoder en PyTorch aprende el comportamiento normal de los equipos a partir de logs sanitizados localmente (ISO 27001/RGPD) y detecta desviaciones mediante un umbral dinámico por percentil, inyectando alertas explicables en Wazuh. Validado sobre infraestructura real: 0,1% de falsos positivos medidos, despliegue en Docker y 48 tests automatizados.',
      en: 'Real-time anomaly detection engine for the Wazuh SIEM, developed as my Master\'s Thesis. A PyTorch autoencoder learns normal host behaviour from locally sanitized logs (ISO 27001/GDPR) and flags deviations using a dynamic percentile threshold, injecting explainable alerts back into Wazuh. Validated on real infrastructure: 0.1% measured false-positive rate, Docker deployment and 48 automated tests.'
    },
    technologies: [
      'Python',
      'PyTorch',
      'Wazuh SIEM',
      'Machine Learning',
      'Docker',
      'ISO 27001'
    ],
    category: 'cybersecurity',
    githubUrl: 'https://github.com/sergarsilla/wazuh-anomaly-detector'
  },
  {
    title: 'Wazuh LLM Triage',
    description: {
      es: 'Middleware de triaje automatizado de nivel 1 para SOC: intercepta alertas críticas de Wazuh, las enriquece con el contexto de la infraestructura mediante RAG (Qdrant) y las clasifica con un LLM 100% local (Ollama), reinyectando un veredicto estructurado con escalado en dos niveles y respuesta activa acotada. Sin GPU y sin enviar datos a terceros; resistente a inyección de prompt.',
      en: 'Automated SOC level-1 triage middleware: it intercepts critical Wazuh alerts, enriches them with infrastructure context via RAG (Qdrant) and classifies them with a fully local LLM (Ollama), re-injecting a structured verdict with two-level escalation and bounded active response. No GPU required and no data sent to third parties; resistant to prompt injection.'
    },
    technologies: [
      'Python',
      'LLM (Ollama)',
      'RAG',
      'Qdrant',
      'Wazuh SIEM',
      'Docker'
    ],
    category: 'cybersecurity',
    githubUrl: 'https://github.com/sergarsilla/wazuh-llm-triage'
  },
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
      'React Native',
      'Node.js',
      'Express',
      'Android',
      'Jetpack Compose',
      'Flutter',
      'PyTorch',
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
    nameKey: 'cloudDevOps',
    skills: [
      'AWS',
      'Azure',
      'Google Cloud',
      'Docker',
      'CI/CD',
      'DevSecOps',
      'Git',
      'GitLab',
      'Git Flow'
    ],
    priority: 'high'
  },
  {
    nameKey: 'cybersecurity',
    skills: [
      'Penetration Testing',
      'Black Box Testing',
      'White Box Testing',
      'Ethical Hacking',
      'Linux Hardening',
      'Network Security',
      'SIEM (Wazuh)',
      'WAF',
      'SOC',
      'Incident Response',
      'ISO 27001',
      'Vulnerability Assessment',
      'Burp Suite',
      'Nmap',
      'Metasploit',
      'Kali Linux',
      'OWASP Top 10'
    ],
    priority: 'high'
  },
  {
    nameKey: 'methodologies',
    skills: [
      'Clean Architecture',
      'Domain Driven Design',
      'SCRUM',
      'Agile',
      'Multithreading',
      'GPU Programming'
    ],
    priority: 'medium'
  }
];

export const getSkillCategories = (language: Language): SkillCategory[] => {
  const skillNames = {
    es: {
      programmingLanguages: 'Lenguajes de Programación',
      frameworksLibraries: 'Frameworks y Librerías',
      databases: 'Bases de Datos',
      cloudDevOps: 'Cloud & DevOps',
      cybersecurity: 'Ciberseguridad',
      methodologies: 'Metodologías & Arquitectura'
    },
    en: {
      programmingLanguages: 'Programming Languages',
      frameworksLibraries: 'Frameworks & Libraries',
      databases: 'Databases',
      cloudDevOps: 'Cloud & DevOps',
      cybersecurity: 'Cybersecurity',
      methodologies: 'Methodologies & Architecture'
    }
  };

  return skillCategoriesData.map(category => ({
    name: skillNames[language][category.nameKey],
    skills: category.skills,
    priority: category.priority
  }));
};