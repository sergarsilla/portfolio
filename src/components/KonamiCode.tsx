import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KonamiCode = () => {
  const [activated, setActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
    ];
    
    let konamiIndex = 0;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
          setActivated(true);
          setShowMessage(true);
          document.documentElement.classList.add('hacker-mode');
          
          // Hide message after 5 seconds
          setTimeout(() => setShowMessage(false), 5000);
          
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-card border-2 border-accent rounded-lg p-6 shadow-2xl glow"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-6xl mb-4"
              >
                🟢
              </motion.div>
              <h2 className="text-2xl font-bold text-accent glow-text mb-2">
                Access Granted
              </h2>
              <p className="text-muted-foreground">
                Welcome to the Matrix, Neo
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Hacker Mode Activated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Matrix Rain Effect (optional) */}
      {activated && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
          <MatrixRain />
        </div>
      )}
    </>
  );
};

const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <canvas
      id="matrix-canvas"
      className="fixed inset-0 w-full h-full"
    />
  );
};

export default KonamiCode;
