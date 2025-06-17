
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
    <section id="research" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Research & Publications</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contributing to scientific knowledge through rigorous research and peer-reviewed publications
          </p>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Publications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                      {pub.type}
                    </span>
                    <span className="text-sm text-gray-500">{pub.year}</span>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                    {pub.title}
                  </CardTitle>
                  <p className="text-teal-600 font-medium">{pub.journal}</p>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {pub.description}
                  </p>
                  {pub.doi && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-teal-600 border-teal-600 hover:bg-teal-50"
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
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Research Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal-600">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      project.status === 'Ongoing' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500">{project.duration}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
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
