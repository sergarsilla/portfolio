import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollDirection: 'up' | 'down';
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollDirection: 'up'
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      setScrollPosition({
        scrollY: currentScrollY,
        scrollDirection: direction
      });

      lastScrollY = currentScrollY;
    };

    const throttledUpdateScrollPosition = throttle(updateScrollPosition, 16); // ~60fps

    window.addEventListener('scroll', throttledUpdateScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollPosition);
    };
  }, []);

  return scrollPosition;
};

// Throttle function to limit scroll event frequency
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}