import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'wave' | 'gradient' | 'dots';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'gradient' }) => {
  if (variant === 'wave') {
    return (
      <div className="relative h-24 overflow-hidden">
        <motion.svg
          className="absolute bottom-0 w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
            className="text-blue-500/10"
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex justify-center py-12">
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default gradient variant
  return (
    <div className="relative h-px my-16">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
    </div>
  );
};

export default SectionDivider;