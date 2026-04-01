import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetweenWords);
      return () => clearTimeout(pauseTimeout);
    }

    const targetText = isDeleting
      ? currentText.slice(0, -1)
      : currentWord.slice(0, currentText.length + 1);

    const speed = isDeleting ? deleteSpeed : typeSpeed;

    if (targetText.length === 0 && isDeleting) {
      setIsDeleting(false);
      const nextIndex = loop
        ? (currentWordIndex + 1) % words.length
        : currentWordIndex + 1;
      if (nextIndex < words.length || loop) {
        setCurrentWordIndex(nextIndex);
      }
      return;
    }

    if (targetText.length === currentWord.length && !isDeleting) {
      setIsPaused(true);
      setCurrentText(targetText);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(targetText);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWord, currentWordIndex, typeSpeed, deleteSpeed, delayBetweenWords, loop]);

  const reset = useCallback(() => {
    setCurrentWordIndex(0);
    setCurrentText('');
    setIsDeleting(false);
    setIsPaused(false);
  }, []);

  return { currentText, currentWordIndex, isDeleting, isPaused, reset };
};

export const useDecodingEffect = (finalText: string, duration: number = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [isActive, setIsActive] = useState(false);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    setIsActive(true);
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const charsToShow = Math.floor(finalText.length * progress);
      let result = '';

      for (let i = 0; i < finalText.length; i++) {
        if (i < charsToShow) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(finalText);
        setIsActive(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [finalText, duration]);

  return { displayText, isActive };
};
