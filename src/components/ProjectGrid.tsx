
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "AI Image Generator App",
    description:
      "Mobile application for creating images with AI. Developed with modern technologies and published on Google Play Store.",
    technologies: ["Android", "Java", "AI APIs"],
    githubUrl: "https://play.google.com/store/apps/details?id=com.sergiorilla.aimagegenerator",
  },
  {
    title: "Word Games App",
    description:
      "Mobile application that compiles word games. Developed for Android and published on Google Play Store.",
    technologies: ["Android", "Java", "SQLite"],
    githubUrl: "https://play.google.com/store/apps/details?id=com.sergiorilla.wordgames",
  },
  {
    title: "Task Manager App",
    description:
      "Mobile application for managing daily tasks. Developed with a focus on productivity and user experience.",
    technologies: ["Android", "Java", "Room DB"],
    githubUrl: "https://play.google.com/store/apps/details?id=com.sergiorilla.taskmaster",
  },
  {
    title: "Weather App",
    description:
      "Web application to visualize weather in any city using React and Firebase.",
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
