import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Dna, Beaker, Award, BookOpen, Users } from 'lucide-react';
import ModernSection, { ModernCard, ModernGrid } from './ModernSection';
import { StaggerChildren } from './SmoothScroll';

const AboutModern = () => {
  const stats = [
    { label: 'Years of Research', value: '15+', icon: Microscope },
    { label: 'Publications', value: '50+', icon: BookOpen },
    { label: 'Citations', value: '1200+', icon: Award },
    { label: 'Collaborations', value: '25+', icon: Users }
  ];

  const expertise = [
    {
      title: 'Microbial Biotechnology',
      description: 'Advanced research in microbial systems for sustainable agriculture and environmental applications.',
      icon: Dna,
      color: 'primary'
    },
    {
      title: 'Agricultural Innovation',
      description: 'Developing cutting-edge solutions for crop enhancement and soil health improvement.',
      icon: Beaker,
      color: 'secondary'
    },
    {
      title: 'Bioprocessing',
      description: 'Expertise in fermentation technology and bioprocess optimization for industrial applications.',
      icon: Microscope,
      color: 'accent'
    }
  ];

  return (
    <ModernSection
      id="about"
      title="About Dr. Moorthy"
      subtitle="A pioneering researcher dedicated to advancing microbial biotechnology for sustainable agricultural solutions."
      background="cyber"
      has3DElements={false}
      hasBlob={false}
    >
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="prose prose-lg max-w-none">
            <p className="body-large text-foreground leading-relaxed">
              Dr. T. Seenivasa Moorthy is a distinguished microbiologist and biotechnology researcher 
              with over <span className="gradient-text font-semibold">15 years of experience</span> in 
              advancing sustainable agricultural practices through innovative microbial solutions.
            </p>
            
            <p className="body-medium text-muted-foreground leading-relaxed">
              His groundbreaking research focuses on harnessing the power of beneficial microorganisms 
              to enhance crop productivity, improve soil health, and develop environmentally friendly 
              alternatives to chemical fertilizers and pesticides.
            </p>
            
            <p className="body-medium text-muted-foreground leading-relaxed">
              Dr. Moorthy's work bridges the gap between fundamental microbial research and practical 
              agricultural applications, contributing to food security and environmental sustainability 
              on a global scale.
            </p>
          </div>

          {/* Call to Action */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className="btn-modern bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 px-8 py-4 text-lg font-semibold backdrop-blur-md flex items-center space-x-3"
              onClick={() => document.getElementById('research')?.scrollIntoView({behavior: 'smooth'})}
            >
              <Microscope size={20} />
              <span>Explore Research</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <ModernCard hover3D={true} glowEffect={true} className="p-8">
            <div className="text-center space-y-6">
              <motion.div
                className="w-32 h-32 mx-auto rounded-3xl glass flex items-center justify-center text-6xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🧬
              </motion.div>
              
              <div>
                <h3 className="heading-2 gradient-text mb-2">Research Philosophy</h3>
                <p className="body-medium text-muted-foreground">
                  "Innovation through nature's wisdom"
                </p>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="mono text-sm text-primary">
                  Sustainable • Innovative • Impactful
                </p>
              </div>
            </div>
          </ModernCard>
        </motion.div>
      </div>

      {/* Statistics Section */}
      <StaggerChildren className="mb-20">
        <ModernGrid columns={4} className="mb-0">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <ModernCard key={index} hover3D={true} className="text-center">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl glass flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <IconComponent className="text-primary" size={24} />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold gradient-text mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </ModernCard>
            );
          })}
        </ModernGrid>
      </StaggerChildren>

      {/* Expertise Areas */}
      <div>
        <motion.h3 
          className="heading-2 text-center gradient-text mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Areas of Expertise
        </motion.h3>
        
        <ModernGrid columns={3} staggered={true}>
          {expertise.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <ModernCard key={index} hover3D={true} glowEffect={true}>
                <motion.div
                  className="text-center space-y-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    style={{ 
                      background: `linear-gradient(135deg, hsl(var(--${area.color}) / 0.2), hsl(var(--${area.color}) / 0.1))`,
                      border: `1px solid hsl(var(--${area.color}) / 0.3)`
                    }}
                  >
                    <IconComponent className={`text-${area.color}`} size={28} />
                  </motion.div>
                  
                  <h4 className="text-xl font-semibold text-foreground">
                    {area.title}
                  </h4>
                  
                  <p className="body-medium text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              </ModernCard>
            );
          })}
        </ModernGrid>
      </div>
    </ModernSection>
  );
};

export default AboutModern;
