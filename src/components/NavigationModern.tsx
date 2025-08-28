import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const NavigationModern = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👨‍🔬' },
    { name: 'Education', href: '#education', icon: '🎓' },
    { name: 'Research', href: '#research', icon: '🔬' },
    { name: 'NCBI', href: '#ncbi', icon: '🧬' },
    { name: 'Experience', href: '#experience', icon: '💼' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Awards', href: '#awards', icon: '🏆' },
    { name: 'Contact', href: '#contact', icon: '📧' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (href: string, name: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(href.slice(1));
    setIsOpen(false);
  };
  
  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
    }
  };
  
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };
  
  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            variants={logoVariants}
          >
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavClick('#home', 'Home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl glass neon-glow flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(var(--primary) / 0.3)',
                    '0 0 30px hsl(var(--secondary) / 0.4)',
                    '0 0 20px hsl(var(--primary) / 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">🧬</span>
              </motion.div>
              <div>
                <h1 className="text-lg font-bold gradient-text">
                  Dr. T. Seenivasa Moorthy
                </h1>
                <p className="text-xs text-muted-foreground">
                  Microbiologist
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'glass neon-glow text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:glass'
                  }`}
                  onClick={() => handleNavClick(item.href, item.name)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                  custom={index}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Contact Button - Desktop */}
          <motion.div 
            className="hidden lg:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className="btn-modern bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 px-6 py-2 text-sm font-semibold backdrop-blur-md flex items-center space-x-2"
              onClick={() => handleNavClick('#contact', 'Contact')}
            >
              <span>Contact</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            className="lg:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="glass rounded-xl p-2 neon-glow"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden glass border-t border-white/10"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-3 ${
                    activeSection === item.href.slice(1)
                      ? 'glass neon-glow text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:glass'
                  }`}
                  onClick={() => handleNavClick(item.href, item.name)}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Mobile Contact Button */}
              <motion.button
                className="w-full mt-6 btn-modern bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 px-6 py-3 text-base font-semibold backdrop-blur-md flex items-center justify-center space-x-2"
                onClick={() => handleNavClick('#contact', 'Contact')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get In Touch</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
        style={{
          scaleX: scrolled ? 1 : 0,
          transformOrigin: '0%'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
};

export default NavigationModern;
