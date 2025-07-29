export const animationConfig = {
  stagger: {
    hero: 0.2,
    cards: 0.1,
    skills: 0.05
  },
  durations: {
    fadeIn: 0.6,
    slideUp: 0.8,
    hover: 0.3,
    headerShrink: 0.3
  },
  easing: {
    default: [0.25, 0.25, 0.25, 0.75],
    bounce: [0.68, -0.55, 0.265, 1.55],
    smooth: [0.4, 0, 0.2, 1]
  },
  delays: {
    heroTitle: 0,
    heroSubtitle: 0.2,
    heroDescription: 0.4,
    section: 0.1
  }
} as const;

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation duration based on user preference
export const getAnimationDuration = (duration: number) => {
  return prefersReducedMotion() ? 0 : duration;
};

// Get animation config with reduced motion support
export const getAnimationConfig = () => {
  const reduced = prefersReducedMotion();
  
  return {
    ...animationConfig,
    durations: {
      fadeIn: reduced ? 0 : animationConfig.durations.fadeIn,
      slideUp: reduced ? 0 : animationConfig.durations.slideUp,
      hover: reduced ? 0 : animationConfig.durations.hover,
      headerShrink: reduced ? 0 : animationConfig.durations.headerShrink
    },
    stagger: {
      hero: reduced ? 0 : animationConfig.stagger.hero,
      cards: reduced ? 0 : animationConfig.stagger.cards,
      skills: reduced ? 0 : animationConfig.stagger.skills
    }
  };
};