
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "AI Image Generator App",
    description:
      "Aplicación móvil para crear imágenes con IA. Desarrollada con tecnologías modernas y publicada en Google Play Store.",
    technologies: ["Android", "Java", "AI APIs"],
    githubUrl: "https://play.google.com/store/apps/details?id=com.sergiorilla.aimagegenerator",
  },
  {
    title: "Word Games App",
    description:
      "Aplicación móvil que recopila juegos de palabras. Desarrollada para Android y publicada en Google Play Store.",
    technologies: ["Android", "Java", "SQLite"],
    githubUrl: "https://play.google.com/store/apps/details?id=com.sergiorilla.wordgames",
  },
  {
    title: "Task Manager App",
    description:
      "Aplicación móvil para gestionar tareas diarias. Desarrollada con enfoque en la productividad y experiencia de usuario.",
    technologies: ["Android", "Java", "Room DB"],
    githubUrl: "https://play.google.com/store/apps/details?id=com.sergiorilla.taskmaster",
  },
  {
    title: "Weather App",
    description:
      "Aplicación web para visualizar el clima en cualquier ciudad utilizando React y Firebase.",
    technologies: ["React", "Firebase", "Weather API"],
    liveUrl: "https://weather-app-d654f.web.app",
  },
];

const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} {...project} index={index} />
      ))}
    </div>
  );
};

export default ProjectGrid;
