import React from 'react';
import { cn } from '@/lib/utils';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'terminal' | 'security' | 'default';
}

const variants = {
  default: 'bg-cyber-dark-gray/30 border-gray-700/30 hover:border-gray-700/70',
  terminal: 'bg-cyber-black/80 border-cyber-green/20 hover:border-cyber-green/50',
  security: 'bg-cyber-dark-gray/30 border-red-500/20 hover:border-red-500/40',
};

const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'p-6 border rounded-lg transition-all duration-300',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default CyberCard;
