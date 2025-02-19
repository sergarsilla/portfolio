import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "AI Image Generator App",
    description:
      "I have developed a mobile application to create images with AI and I have published it on the Google Play Store.",
    technologies: [
      "Android - iOS",
      "React-Native",
      "AI APIs",
      "TypeScript",
      "Firebase",
    ],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.sergarsilla.aiimagegenerator",
  },
  {
    title: "Tennis Tournaments App",
    description:
      'I have developed Tennis Tournaments App: A web application built with React, Firebase, and JavaScript that simplifies the organization and management of tennis tournaments by enabling easy scheduling and match tracking. Developed as a team project using agile methodologies, it involved through planning, follow-up, testing, and quality assurance to deliver a robust solution. To view the admin options, log in with "admin@admin.com" and "adminadmin" as credentials.',
    technologies: ["React", "Firebase", "JavaScript"],
    liveUrl: "https://tennis-tournaments-af24a.web.app",
  },
  {
    title: "Word Games App",
    description:
      "I have developed a mobile application that collect some word games such as crossword or wordle and I have published it on the Google Play Store.",
    technologies: ["Android - iOS", "React-Native", "TypeScript", "Firebase"],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.sergarsilla.wordgame",
  },
  {
    title: "Task Manager App",
    description:
      "I have developed a mobile application to manage your daily tasks and I have published it on the Google Play Store.",
    technologies: ["Android - iOS", "React-Native", "JavaScript", "Firebase"],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.sergarsilla.taskmaster",
  },
  {
    title: "Weather App",
    description:
      "I have developed a web application to visualize the weather in any city and published it with Firebase Hosting.",
    technologies: ["React", "Firebase", "JavaScript", "Weather API"],
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
