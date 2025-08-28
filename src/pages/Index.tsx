import React from 'react';
import HeroModern from '../components/HeroModern';
import AboutModern from '../components/AboutModern';
import Education from '../components/Education';
import Research from '../components/Research';
import NCBISequences from '../components/NCBISequences';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Awards from '../components/Awards';
import Contact from '../components/Contact';
import NavigationModern from '../components/NavigationModern';
import { AnimatedSection, ParallaxElement } from '../components/SmoothScroll';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <NavigationModern />
      <HeroModern />

      <AboutModern />

      <ParallaxElement speed={0.3}>
        <AnimatedSection direction="left" delay={0.2}>
          <Education />
        </AnimatedSection>
      </ParallaxElement>

      <AnimatedSection direction="right" delay={0.1}>
        <Research />
      </AnimatedSection>

      <ParallaxElement speed={0.2}>
        <AnimatedSection direction="up" delay={0.3}>
          <NCBISequences />
        </AnimatedSection>
      </ParallaxElement>

      <AnimatedSection direction="left" delay={0.2}>
        <Experience />
      </AnimatedSection>

      <AnimatedSection direction="right" delay={0.1}>
        <Skills />
      </AnimatedSection>

      <ParallaxElement speed={0.4}>
        <AnimatedSection direction="up" delay={0.2}>
          <Awards />
        </AnimatedSection>
      </ParallaxElement>

      <AnimatedSection direction="up" delay={0.1}>
        <Contact />
      </AnimatedSection>
    </div>
  );
};

export default Index;
