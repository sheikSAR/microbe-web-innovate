
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-l-4 border-teal-600">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">My Research Journey</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As a dedicated microbiologist and biotechnology researcher, I am passionate about exploring the fascinating world of actinomycetes and their potential applications in agriculture. My Ph.D. research focuses on understanding these remarkable microorganisms and their role in sustainable agricultural practices.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Through my journey in microbiology and bioinformatics, I have developed a deep appreciation for the intricate relationships between microorganisms and their environments. My work bridges the gap between laboratory research and real-world agricultural applications.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  I am committed to contributing to the scientific community through rigorous research, publications, and knowledge sharing, with the ultimate goal of empowering agriculture through microbial innovation.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 shadow-lg bg-gradient-to-br from-teal-50 to-blue-50">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Research Focus Areas</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Actinomycetes Research</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Agricultural Microbiology</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-gray-700">Bioinformatics Applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">16S rRNA Gene Sequencing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Sustainable Agriculture</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6 shadow-lg bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Journey</h3>
                <p className="text-gray-600 leading-relaxed">
                  Currently pursuing Ph.D. research at Kalasalingam Academy of Research and Education (KARE), building upon a strong foundation from Ayya Nadar Janaki Ammal College. My academic journey reflects a commitment to advancing scientific knowledge in microbiology and biotechnology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
