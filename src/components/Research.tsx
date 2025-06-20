
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Research = () => {
  const publications = [
    {
      title: "Actinomycetes in Agricultural Soil: Diversity and Applications",
      journal: "Journal of Applied Microbiology",
      year: "2024",
      doi: "10.1111/jam.15234",
      type: "Research Article",
      description: "Comprehensive study on actinomycetes diversity in agricultural soils and their potential applications."
    },
    {
      title: "16S rRNA Gene Sequencing for Microbial Identification",
      journal: "Microbial Biotechnology",
      year: "2023",
      doi: "10.1111/1751-7915.14123",
      type: "Research Article",
      description: "Advanced techniques in 16S rRNA gene sequencing for accurate microbial identification."
    },
    {
      title: "Sustainable Agriculture through Microbial Innovation",
      journal: "Agricultural Biotechnology Handbook",
      year: "2023",
      type: "Book Chapter",
      description: "Exploring the role of beneficial microorganisms in sustainable agricultural practices."
    }
  ];

  const projects = [
    {
      title: "DST-SEED Project on Microbial Diversity",
      duration: "2022 - Present",
      description: "Leading research on microbial diversity in agricultural ecosystems, funded by Department of Science and Technology.",
      status: "Ongoing"
    },
    {
      title: "Actinomycetes Isolation and Characterization",
      duration: "2021 - 2023",
      description: "Comprehensive project focusing on isolation, identification, and characterization of actinomycetes from soil samples.",
      status: "Completed"
    }
  ];

  return (
    <section id="research" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Research & Publications</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Contributing to scientific knowledge through rigorous research and peer-reviewed publications
          </p>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8">Publications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <Card key={index} className="bg-gray-700/80 border-gray-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-teal-600/20 text-teal-300 text-sm font-medium rounded-full border border-teal-500/30">
                      {pub.type}
                    </span>
                    <span className="text-sm text-gray-400">{pub.year}</span>
                  </div>
                  <CardTitle className="text-lg font-semibold text-white leading-tight">
                    {pub.title}
                  </CardTitle>
                  <p className="text-teal-400 font-medium">{pub.journal}</p>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {pub.description}
                  </p>
                  {pub.doi && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-teal-400 border-teal-500/50 hover:bg-teal-600/20 hover:text-teal-300"
                      onClick={() => window.open(`https://doi.org/${pub.doi}`, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View DOI
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Projects */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8">Research Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="bg-gray-700/80 border-gray-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal-500 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${
                      project.status === 'Ongoing' 
                        ? 'bg-green-600/20 text-green-300 border-green-500/30' 
                        : 'bg-blue-600/20 text-blue-300 border-blue-500/30'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-400">{project.duration}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
