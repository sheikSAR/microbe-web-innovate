
import React, { useState, useEffect } from 'react';
import { Home, User, FlaskConical, Mail, Award, BookOpen, Microscope, Dna } from 'lucide-react';

const FloatingNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'from-teal-400 to-teal-600' },
    { id: 'about', icon: User, label: 'About', color: 'from-blue-400 to-blue-600' },
    { id: 'research', icon: FlaskConical, label: 'Research', color: 'from-green-400 to-green-600' },
    { id: 'ncbi', icon: Dna, label: 'NCBI', color: 'from-purple-400 to-purple-600' },
    { id: 'experience', icon: Microscope, label: 'Experience', color: 'from-indigo-400 to-indigo-600' },
    { id: 'awards', icon: Award, label: 'Awards', color: 'from-orange-400 to-orange-600' },
    { id: 'contact', icon: Mail, label: 'Contact', color: 'from-pink-400 to-pink-600' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative w-16 h-16 rounded-full backdrop-blur-md border border-white/20
                    flex items-center justify-center transition-all duration-300
                    hover:scale-110 hover:shadow-2xl
                    ${isActive 
                      ? `bg-gradient-to-br ${item.color} shadow-lg shadow-current/25` 
                      : 'bg-white/10 hover:bg-white/20'
                    }
                  `}
                  style={{
                    background: isActive 
                      ? `linear-gradient(135deg, ${item.color.includes('teal') ? '#14b8a6, #0d9488' : 
                          item.color.includes('blue') ? '#3b82f6, #2563eb' :
                          item.color.includes('green') ? '#10b981, #059669' :
                          item.color.includes('purple') ? '#8b5cf6, #7c3aed' :
                          item.color.includes('indigo') ? '#6366f1, #4f46e5' :
                          item.color.includes('orange') ? '#f59e0b, #d97706' :
                          '#ec4899, #db2777'})`
                      : undefined
                  }}
                >
                  <Icon 
                    size={24} 
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                  />
                  
                  {/* Pulsing effect for active */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
                  )}
                </button>
                
                {/* Tooltip */}
                <div className="absolute right-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                    {item.label}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-8 border-l-black/80 border-y-4 border-y-transparent"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Glassmorphism Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
          <div className="flex space-x-4">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-br ${item.color} shadow-lg` 
                      : 'hover:bg-white/20'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/70'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingNavigation;
