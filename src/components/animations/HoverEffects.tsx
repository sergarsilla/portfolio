import React from 'react';
import { motion } from 'framer-motion';

interface HoverEffectsProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  glowColor?: string;
}

const HoverEffects: React.FC<HoverEffectsProps> = ({
  children,
  className = '',
  hoverScale = 1.03,
  hoverY = -12,
  glowColor = 'rgba(59, 130, 246, 0.4)'
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px ${glowColor}, 0 0 20px ${glowColor}`,
        transition: {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      whileTap={{ 
        scale: 0.97,
        transition: { duration: 0.1 }
      }}
      initial={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      style={{
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </motion.div>
  );
};

export default HoverEffects;