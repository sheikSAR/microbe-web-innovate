
import React from 'react';
import { Button } from '@/components/ui/button';
import ThreeDNAHelix from './ThreeDNAHelix';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D DNA Helix Background */}
      <ThreeDNAHelix />
      
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-blue-900/10 to-green-900/20"></div>
      
      {/* Glassmorphism Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/30 shadow-xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-6xl">🧬</div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Dr. T. Seenivasa Moorthy
          </h1>
          
          <p className="text-xl md:text-2xl text-teal-200 mb-4 font-medium">
            Microbiologist & Biotechnology Researcher
          </p>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            "Empowering Agriculture through Microbial Innovation"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
              onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
            >
              Explore My Research
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 bg-teal-400/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400/20 rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-10 h-10 bg-green-400/20 rounded-full blur-sm animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-teal-300/20 rounded-full blur-sm animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
    </section>
  );
};

export default Hero;
