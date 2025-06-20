
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Skills = () => {
  const skillCategories = [
    {
      category: "Laboratory Skills",
      color: "teal",
      skills: [
        { name: "Microbial Isolation & Culturing", level: 95 },
        { name: "16S rRNA Gene Sequencing", level: 90 },
        { name: "Molecular Biology Techniques", level: 85 },
        { name: "Microscopy & Staining", level: 88 },
        { name: "Biochemical Testing", level: 92 }
      ]
    },
    {
      category: "Computational Tools",
      color: "blue",
      skills: [
        { name: "Microsoft Office Suite", level: 90 },
        { name: "NCBI BLAST", level: 85 },
        { name: "Phylogenetic Analysis", level: 80 },
        { name: "Statistical Analysis", level: 75 },
        { name: "Database Management", level: 82 }
      ]
    },
    {
      category: "Research Skills",
      color: "green",
      skills: [
        { name: "Experimental Design", level: 88 },
        { name: "Data Analysis", level: 85 },
        { name: "Scientific Writing", level: 90 },
        { name: "Literature Review", level: 92 },
        { name: "Project Management", level: 80 }
      ]
    },
    {
      category: "Soft Skills",
      color: "purple",
      skills: [
        { name: "Communication", level: 90 },
        { name: "Team Collaboration", level: 88 },
        { name: "Problem Solving", level: 92 },
        { name: "Leadership", level: 85 },
        { name: "Adaptability", level: 87 }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      teal: "border-teal-500 bg-gray-700/80",
      blue: "border-blue-500 bg-gray-700/80",
      green: "border-green-500 bg-gray-700/80",
      purple: "border-purple-500 bg-gray-700/80"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      teal: "bg-teal-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive skill set spanning laboratory techniques, computational tools, and research methodologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className={`border-gray-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${getColorClasses(category.color)} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(category.color)}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-12">
          <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-700/80 to-gray-800/80 border-gray-600/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Additional Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-600/20 rounded-full flex items-center justify-center border border-teal-500/30">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Laboratory Management</h4>
                  <p className="text-sm text-gray-300">Equipment maintenance, safety protocols, and quality control</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Data Visualization</h4>
                  <p className="text-sm text-gray-300">Creating compelling presentations and scientific figures</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-600/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Field Research</h4>
                  <p className="text-sm text-gray-300">Sample collection, field testing, and environmental assessment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
