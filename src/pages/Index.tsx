import React from 'react';
import HeroModern from '../components/HeroModern';
import About from '../components/About';
import Education from '../components/Education';
import Research from '../components/Research';
import NCBISequences from '../components/NCBISequences';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Awards from '../components/Awards';
import Contact from '../components/Contact';
import NavigationModern from '../components/NavigationModern';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationModern />
      <HeroModern />
      <About />
      <Education />
      <Research />
      <NCBISequences />
      <Experience />
      <Skills />
      <Awards />
      <Contact />
    </div>
  );
};

export default Index;
