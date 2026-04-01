import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import CyberCard from './ui/cyber/CyberCard';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  className?: string;
}

const ProjectCardCyber: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  index,
  className,
}) => {
  const securityScore = Math.floor(Math.random() * 20) + 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn('h-full', className)}
    >
      <CyberCard variant="security" className="h-full p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-900/30 border border-red-500/50 rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">{title}</h3>
              <span className="text-xs text-red-400 font-mono flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse-fast" />
                SECURITY_SCANNED
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-mono text-green-400">{securityScore}%</div>
            <div className="text-xs text-gray-500">SECURE</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 font-mono leading-relaxed border-l-2 border-red-500/30 pl-3 mb-4">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-red-900/20 border border-red-500/30 text-red-300 rounded font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-red-500/20">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded font-mono text-xs text-gray-400 hover:text-white hover:border-cyber-green/50 hover:text-cyber-green transition-colors"
            >
              <Github className="w-3 h-3" />
              CODE
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-green-500/30 rounded font-mono text-xs text-green-400 hover:border-green-500/60 hover:text-green-300 transition-colors"
            >
              <Globe className="w-3 h-3" />
              DEMO
            </a>
          )}
        </div>
      </CyberCard>
    </motion.div>
  );
};

export default ProjectCardCyber;
