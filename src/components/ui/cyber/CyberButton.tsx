import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  as?: 'a' | 'button' | 'a';
}

const CyberButton: React.FC<CyberButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = true,
  children,
  className,
  ...props
}) => {
  const baseStyles = `
    relative font-mono font-semibold border-2 transition-all duration-300
    flex items-center justify-center gap-2 rounded-lg
    hover:scale-105 active:scale-95 cursor-pointer
  `;

  const variants = {
    primary: 'border-cyber-green text-cyber-green hover:bg-cyber-green/10 hover:shadow-neon-green',
    secondary: 'border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-neon-cyan',
    danger: 'border-red-500 text-red-500 hover:bg-red-500/10 hover:shadow-neon-magenta',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <span className={`relative z-10 flex items-center gap-2 ${glow ? 'animate-pulse-fast' : ''}`}>
        {children}
      </span>
    </motion.button>
  );
};

export default CyberButton;
