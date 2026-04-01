import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
  glitchDuration?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className,
  glitchInterval = 4000,
  glitchDuration = 600,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        setDisplayText(text);
      }, glitchDuration);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [text, glitchInterval, glitchDuration]);

  const getGlitchText = (original: string, progress: number) => {
    const glitchLength = Math.floor(original.length * progress);
    return original
      .split('')
      .map((char, index) => {
        if (index < glitchLength) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
        return char;
      })
      .join('');
  };

  return (
    <span className={cn('relative font-mono inline-block', className)}>
      {isGlitching ? getGlitchText(text, 0.7) : displayText}
    </span>
  );
};

export default GlitchText;
