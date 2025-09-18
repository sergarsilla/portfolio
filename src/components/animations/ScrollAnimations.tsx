import React from "react";
import { motion } from "framer-motion";
import { useIsMobile, useReducedMotion } from "../../hooks/useMediaQuery";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const ScrollAnimations: React.FC<ScrollAnimationProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Reduce animations on mobile and for users who prefer reduced motion
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  const variants = {
    hidden: {
      opacity: shouldAnimate ? 0 : 1,
      y: shouldAnimate
        ? direction === "up"
          ? 20
          : direction === "down"
          ? -20
          : 0
        : 0,
      x: shouldAnimate
        ? direction === "left"
          ? 20
          : direction === "right"
          ? -20
          : 0
        : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: shouldAnimate ? (isMobile ? 0.3 : 0.6) : 0,
        delay: shouldAnimate ? delay : 0,
        ease: shouldAnimate ? [0.25, 0.25, 0.25, 0.75] : "linear",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.05 : 0.1 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimations;
