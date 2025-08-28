import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ParticleSystem from './3d/ParticleSystem';
import DNAHelix3D from './3d/DNAHelix3D';

const HeroModern = () => {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      // Parallax effect for floating elements
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const intensity = (index + 1) * 0.5;
        (element as HTMLElement).style.transform = 
          `translate(${xPercent * intensity}px, ${yPercent * intensity}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-cyber"
    >
      {/* 3D Background Layers */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem />
      </div>
      
      <div className="absolute inset-0 z-10 opacity-30">
        <DNAHelix3D />
      </div>
      
      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div 
          className="floating-element absolute top-20 left-10 w-12 h-12 rounded-lg glass neon-glow"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="floating-element absolute top-40 right-20 w-8 h-8 rounded-full glass"
          style={{ background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div 
          className="floating-element absolute bottom-40 left-20 w-16 h-4 rounded-full glass"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div 
          className="floating-element absolute bottom-20 right-10 w-6 h-6 rotate-45 glass neon-glow"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
      </div>
      
      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 z-15 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          {Array.from({ length: 50 }, (_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 1200}
              y1={Math.random() * 800}
              x2={Math.random() * 1200}
              y2={Math.random() * 800}
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>
      
      {/* Main Content */}
      <motion.div 
        className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Avatar with 3D Effect */}
        <motion.div 
          className="mb-12 perspective"
          variants={itemVariants}
        >
          <motion.div 
            className="w-64 h-64 mx-auto rounded-3xl overflow-hidden glass border-2 border-white/20 shadow-2xl preserve-3d"
            whileHover={{ 
              rotateY: 10, 
              rotateX: 5,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
              <motion.div 
                className="text-8xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🧬
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Name with Gradient Text */}
        <motion.h1 
          className="display-1 gradient-text mb-6 neon-text"
          variants={itemVariants}
        >
          Dr. T. Seenivasa Moorthy
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="heading-2 text-primary mb-4 font-light"
          variants={itemVariants}
        >
          Microbiologist & Biotechnology Researcher
        </motion.p>
        
        {/* Quote with Typewriter Effect */}
        <motion.div 
          className="body-large text-muted-foreground mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            "Empowering Agriculture through{' '}
            <span className="gradient-text font-semibold">Microbial Innovation</span>"
          </motion.p>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="btn-modern bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 px-10 py-6 text-lg font-semibold backdrop-blur-md"
              onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 }}
              >
                🔬 Explore My Research
              </motion.span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-modern bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/30 px-10 py-6 text-lg font-semibold backdrop-blur-md"
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 }}
              >
                💬 Get In Touch
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary/50 rounded-full p-1 cursor-pointer"
            animate={{ 
              borderColor: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--primary))']
            }}
            transition={{ duration: 3, repeat: Infinity }}
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
          >
            <motion.div
              className="w-1 h-2 bg-primary rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Ambient Light Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export default HeroModern;
