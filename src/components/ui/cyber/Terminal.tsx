import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TerminalLine {
  command: string;
  output: string;
}

interface TerminalProps {
  className?: string;
  lines: TerminalLine[];
  autoType?: boolean;
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  showPrompt?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  className,
  lines,
  autoType = false,
  typingSpeed = 50,
  delayBetweenWords = 1500,
  showPrompt = true,
}) => {
  const [completedLines, setCompletedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoType || currentLineIndex >= lines.length) return;

    const line = lines[currentLineIndex];

    // Type command character by character
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= line.command.length) {
        if (typedText.length < line.command.length) {
          setTypedText(line.command.slice(0, charIndex + 1));
        }
        charIndex++;
      } else {
        clearInterval(interval);
        setShowOutput(true);
      }
    }, typingSpeed);

    // Show output after command finishes typing
    const showOutputTimeout = setTimeout(() => {
      setCompletedLines(prev => [...prev, line]); // Add the line
    }, line.command.length * typingSpeed + delayBetweenWords);

    // Move to next line
    const nextLineTimeout = setTimeout(() => {
      setCurrentLineIndex(prev => prev + 1);
      setTypedText('');
      setShowOutput(false);
    }, line.command.length * typingSpeed + delayBetweenWords + 100);

    return () => {
      clearInterval(interval);
      clearTimeout(showOutputTimeout);
      clearTimeout(nextLineTimeout);
    };
  }, [currentLineIndex, autoType, lines, typingSpeed, delayBetweenWords, typedText.length]);

  return (
    <motion.div
      ref={terminalRef}
      className={cn(
        'bg-cyber-black/95 border border-cyber-green/30 rounded-lg overflow-hidden shadow-lg font-mono text-sm',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal header */}
      <div className="bg-gray-900/50 px-4 py-2 flex items-center gap-2 border-b border-cyber-green/20">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-xs text-gray-500 ml-2">
          terminal@portfolio:~
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 text-cyber-green min-h-[200px] max-h-[400px] overflow-y-auto">
        {/* Completed lines */}
        {completedLines.map((line, idx) => (
          <div key={idx} className="mb-3">
            {showPrompt && (
              <div className="flex items-start gap-2">
                <span className="text-cyber-cyan whitespace-nowrap">$</span>
                <span className="text-white">{line.command}</span>
              </div>
            )}
            <div className="mt-1 whitespace-pre-wrap text-cyber-green/80 text-xs leading-relaxed">
              {line.output}
            </div>
          </div>
        ))}

        {/* Current typing line */}
        {currentLineIndex < lines.length && (
          <div className="mb-3">
            {showPrompt && (
              <div className="flex items-start gap-2">
                <span className="text-cyber-cyan whitespace-nowrap">$</span>
                <span className="text-white">
                  {typedText}
                  <span className="inline-block w-2 h-4 bg-cyber-green ml-1 cursor-blink" />
                </span>
              </div>
            )}
          </div>
        )}

        {/* All lines completed */}
        {currentLineIndex >= lines.length && (
          <div className="flex items-center gap-2">
            <span className="text-cyber-cyan">$</span>
            <span className="inline-block w-2 h-4 bg-cyber-green cursor-blink" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;
