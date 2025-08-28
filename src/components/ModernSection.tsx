import React from 'react';
import { motion } from 'framer-motion';
import Interactive3DCard from './3d/Interactive3DCard';
import FloatingElements, { InteractiveBlob } from './3d/FloatingElements';
import { AnimatedSection, StaggerChildren } from './SmoothScroll';

interface ModernSectionProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  background?: 'default' | 'gradient' | 'mesh' | 'cyber';
  has3DElements?: boolean;
  hasBlob?: boolean;
  className?: string;
  containerClassName?: string;
}

const ModernSection: React.FC<ModernSectionProps> = ({
  children,
  id,
  title,
  subtitle,
  background = 'default',
  has3DElements = false,
  hasBlob = false,
  className = '',
  containerClassName = ''
}) => {
  const getBackgroundClass = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-cyber';
      case 'mesh':
        return 'bg-gradient-mesh';
      case 'cyber':
        return 'bg-gradient-to-br from-background via-primary/5 to-secondary/5';
      default:
        return 'bg-background';
    }
  };

  return (
    <section 
      id={id}
      className={`relative min-h-screen py-20 overflow-hidden ${getBackgroundClass()} ${className}`}
    >
      {/* 3D Background Elements */}
      {has3DElements && (
        <FloatingElements 
          count={6} 
          theme="biotech" 
          className="opacity-30 z-0" 
        />
      )}
      
      {/* Interactive Blob */}
      {hasBlob && (
        <InteractiveBlob 
          className="opacity-20 z-0" 
          color="hsl(var(--primary))" 
        />
      )}
      
      {/* Ambient Light Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-40" />
      
      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id={`neural-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          {Array.from({ length: 15 }, (_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1200}
              cy={Math.random() * 800}
              r="2"
              fill={`url(#neural-${id})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ 
                duration: 2, 
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3 
              }}
            />
          ))}
        </svg>
      </div>
      
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {/* Section Header */}
        {(title || subtitle) && (
          <AnimatedSection direction="up" className="text-center mb-16">
            {title && (
              <motion.h2 
                className="heading-1 gradient-text mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                className="body-large text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </AnimatedSection>
        )}
        
        {/* Main Content */}
        <div className="relative z-20">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ModernSection;

// Helper component for creating modern cards
interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
  glowEffect?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = '',
  hover3D = true,
  glowEffect = true
}) => {
  const cardContent = (
    <div 
      className={`
        glass rounded-2xl p-6 border border-white/10 backdrop-blur-xl
        ${glowEffect ? 'hover:neon-glow' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );

  if (hover3D) {
    return (
      <Interactive3DCard intensity={10} scale={1.02}>
        {cardContent}
      </Interactive3DCard>
    );
  }

  return cardContent;
};

// Helper component for creating modern grid layouts
interface ModernGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: number;
  className?: string;
  staggered?: boolean;
}

export const ModernGrid: React.FC<ModernGridProps> = ({
  children,
  columns = 3,
  gap = 6,
  className = '',
  staggered = true
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClass = `gap-${gap}`;

  const gridContent = (
    <div className={`grid ${gridCols[columns]} ${gapClass} ${className}`}>
      {children}
    </div>
  );

  if (staggered) {
    return (
      <StaggerChildren staggerDelay={0.15}>
        {gridContent}
      </StaggerChildren>
    );
  }

  return gridContent;
};
