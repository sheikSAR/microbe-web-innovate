
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Education = () => {
  const educationData = [
    {
      degree: "Ph.D. in Biotechnology",
      institution: "Kalasalingam Academy of Research and Education (KARE)",
      period: "Present",
      description: "Specialized research in actinomycetes and their applications in agriculture",
      color: "teal"
    },
    {
      degree: "Master's Degree",
      institution: "Ayya Nadar Janaki Ammal College",
      period: "Completed",
      description: "Advanced studies in microbiology and biotechnology",
      color: "blue"
    },
    {
      degree: "Bachelor's Degree",
      institution: "Ayya Nadar Janaki Ammal College",
      period: "Completed",
      description: "Foundation in biological sciences and research methodology",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      teal: "border-teal-500 bg-teal-50",
      blue: "border-blue-500 bg-blue-50",
      green: "border-green-500 bg-green-50"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section id="education" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A strong academic foundation in microbiology, biotechnology, and research methodology
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-teal-200 hidden md:block"></div>
          
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-600 rounded-full border-4 border-white shadow-lg hidden md:block z-10"></div>
                
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${getColorClasses(edu.color)}`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {edu.degree}
                      </CardTitle>
                      <div className="text-teal-600 font-medium">{edu.institution}</div>
                      <div className="text-sm text-gray-500">{edu.period}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{edu.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="hidden md:block w-2/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
