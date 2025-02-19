
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-secondary dark:bg-gray-700 rounded-full text-sm text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-foreground hover:text-accent dark:hover:text-accent-dark transition-colors duration-200"
          >
            <Github className="w-5 h-5 mr-1" />
            <span>Código</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-foreground hover:text-accent dark:hover:text-accent-dark transition-colors duration-200"
          >
            <Globe className="w-5 h-5 mr-1" />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
