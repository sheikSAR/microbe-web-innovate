
import React from 'react';
import { Button } from '@/components/ui/button';
import DNAHelix from './DNAHelix';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-green-50 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <DNAHelix />
      </div>
      
      {/* Floating Microbial Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-8 h-8 bg-teal-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-200 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-10 h-10 bg-green-200 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-teal-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-teal-200 shadow-xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
            <div className="text-6xl text-teal-600">🧬</div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Dr. T. Seenivasa Moorthy
        </h1>
        
        <p className="text-xl md:text-2xl text-teal-700 mb-4 font-medium">
          Microbiologist & Biotechnology Researcher
        </p>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          "Empowering Agriculture through Microbial Innovation"
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
          >
            Explore My Research
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
