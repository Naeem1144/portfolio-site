// Animation variants for Framer Motion
// Designed for smooth, performant animations

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
  }
};

export const slideUp = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
  }
};

// Stagger container for orchestrated animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  }
};

// Hero-specific animations
export const heroTitle = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.4, 0.25, 1],
    }
  }
};

export const heroSubtitle = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.4, 0.25, 1],
      delay: 0.2 
    }
  }
};

export const heroCTA = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.4, 0.25, 1],
      delay: 0.4 
    }
  }
};

// Card hover animation
export const cardHover = {
  rest: { 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: { 
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Button hover animation
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

// Nav item animations
export const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Text reveal character by character
export const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: [0.25, 0.4, 0.25, 1]
    }
  })
};

// Floating animation for decorative elements
export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Glow pulse animation
export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(0, 255, 170, 0.2)",
      "0 0 40px rgba(0, 255, 170, 0.4)",
      "0 0 20px rgba(0, 255, 170, 0.2)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Viewport animation triggers
export const viewportOnce = {
  once: true,
  amount: 0.3,
  margin: "-50px"
};

export const viewportRepeat = {
  amount: 0.2,
  margin: "-100px"
};
