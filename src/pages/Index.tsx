
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Research from '../components/Research';
import NCBISequences from '../components/NCBISequences';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Awards from '../components/Awards';
import Contact from '../components/Contact';
import FloatingNavigation from '../components/FloatingNavigation';
import FloatingMicrobes from '../components/FloatingMicrobes';
import VirtualLabScene from '../components/VirtualLabScene';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Global 3D Background Elements */}
      <FloatingMicrobes />
      
      {/* Floating Navigation */}
      <FloatingNavigation />
      
      {/* Main Content */}
      <Hero />
      <About />
      <Education />
      
      {/* Enhanced Research Section with Virtual Lab */}
      <section className="py-20 bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Research />
          <div className="mt-16">
            <VirtualLabScene />
          </div>
        </div>
      </section>
      
      <NCBISequences />
      <Experience />
      <Skills />
      <Awards />
      <Contact />
    </div>
  );
};

export default Index;
