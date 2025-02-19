
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Proyecto 1",
    description:
      "Una aplicación web fullstack con funcionalidades de autenticación, base de datos y API REST.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/tu-usuario/proyecto-1",
    liveUrl: "https://proyecto-1.com",
  },
  {
    title: "Proyecto 2",
    description:
      "Aplicación móvil multiplataforma para gestión de tareas y productividad.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    technologies: ["React Native", "Firebase", "TypeScript"],
    githubUrl: "https://github.com/tu-usuario/proyecto-2",
  },
  {
    title: "Proyecto 3",
    description:
      "Dashboard interactivo para visualización de datos en tiempo real.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    githubUrl: "https://github.com/tu-usuario/proyecto-3",
    liveUrl: "https://proyecto-3.com",
  },
];

const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} {...project} index={index} />
      ))}
    </div>
  );
};

export default ProjectGrid;
