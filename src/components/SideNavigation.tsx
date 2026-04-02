import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Rocket, Shield, Mail } from 'lucide-react';

const SideNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: Rocket, label: 'Projects' },
    { id: 'skills', icon: Shield, label: 'Skills' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="flex flex-col gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-card border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                <span className="text-sm font-medium">{section.label}</span>
              </div>

              {/* Icon container */}
              <div
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  transition-all duration-300
                  ${isActive 
                    ? 'bg-accent text-accent-foreground shadow-lg glow' 
                    : 'bg-card border border-border text-muted-foreground hover:border-accent hover:text-accent'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 border-2 border-accent rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default SideNavigation;
