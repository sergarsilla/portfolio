import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

const KONAMI_SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

export const useEasterEggs = () => {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);

  const handleClick = useCallback(() => {
    setKonamiIndex(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setTerminalOpen(false);
        setDebugMode(false);
        return;
      }

      if (KONAMI_SEQUENCE[konamiIndex] === e.keyCode) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          setMatrixMode(prev => !prev);
          localStorage.setItem('matrixMode', String(!matrixMode));
          if (!matrixMode) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00ff41', '#00ffff', '#ff00ff']
            });
            setTimeout(() => {
              alert('🟢 MATRIX MODE ACTIVATED\nAccess Level: ROOT Granted');
            }, 200);
          }
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [konamiIndex, matrixMode]);

  const handleLogoClick = useCallback(() => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount >= 5) {
      setDebugMode(true);
      setLogoClickCount(0);
      const memInfo = `Performance:\nFPS: ~60\nRender Time: ${(Math.random() * 20 + 5).toFixed(1)}ms\nMemory: ${(Math.random() * 100 + 50).toFixed(0)}MB`;
      alert('🐛 DEBUG MODE ACTIVATED\n\n' + memInfo);
    }

    setTimeout(() => setLogoClickCount(0), 2000);
  }, [logoClickCount]);

  return {
    matrixMode,
    terminalOpen,
    debugMode,
    handleLogoClick,
    setTerminalOpen,
  };
};

export const binaryToText = (binary: string): string => {
  return binary
    .split(' ')
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
};
