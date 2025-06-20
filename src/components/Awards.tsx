import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Awards = () => {
  const awards = [
    {
      title: "Best Presentation Award",
      organization: "NABARD (National Bank for Agriculture and Rural Development)",
      year: "2024",
      type: "Award",
      description: "Recognized for outstanding presentation on 'Microbial Solutions for Sustainable Agriculture' at the national agricultural research symposium.",
      category: "Research Excellence"
    },
    {
      title: "Young Researcher Award",
      organization: "Indian Society of Microbiology",
      year: "2023",
      type: "Award",
      description: "Honored for significant contributions to actinomycetes research and agricultural microbiology.",
      category: "Research Excellence"
    },
    {
      title: "Outstanding Poster Presentation",
      organization: "International Conference on Biotechnology",
      year: "2023",
      type: "Presentation",
      description: "Poster titled 'Diversity of Actinomycetes in Agricultural Soils: A Molecular Approach' received recognition for innovative research methodology.",
      category: "Conference"
    },
    {
      title: "Best Oral Presentation",
      organization: "National Microbiology Conference",
      year: "2022",
      type: "Presentation",
      description: "Delivered compelling presentation on '16S rRNA Gene Sequencing for Microbial Taxonomy' to an audience of leading microbiologists.",
      category: "Conference"
    }
  ];

  const presentations = [
    {
      title: "Actinomycetes: Hidden Treasures in Agricultural Soils",
      event: "International Symposium on Soil Microbiology",
      type: "Oral Presentation",
      year: "2024",
      location: "Chennai, India"
    },
    {
      title: "Molecular Identification of Plant Growth Promoting Actinomycetes",
      event: "Biotechnology Research Summit",
      type: "Poster Presentation",
      year: "2023",
      location: "Bangalore, India"
    },
    {
      title: "16S rRNA Sequencing: A Gateway to Microbial Diversity",
      event: "Young Scientists Conference",
      type: "Keynote Presentation",
      year: "2023",
      location: "Delhi, India"
    }
  ];

  const getTypeColor = (type: string) => {
    const colorMap = {
      Award: "bg-yellow-900/50 text-yellow-300 border border-yellow-500/30",
      Presentation: "bg-blue-900/50 text-blue-300 border border-blue-500/30"
    };
    return colorMap[type as keyof typeof colorMap] || "bg-gray-800 text-gray-300";
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      "Research Excellence": "border-teal-500",
      "Conference": "border-blue-500"
    };
    return colorMap[category as keyof typeof colorMap] || "border-gray-500";
  };

  return (
    <section id="awards" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Awards & Presentations</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Recognition for outstanding contributions to microbiology research and scientific communication
          </p>
        </div>

        {/* Awards Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${getCategoryColor(award.category)} bg-gray-800/80 backdrop-blur-sm border-gray-600/50`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getTypeColor(award.type)}>
                      {award.type}
                    </Badge>
                    <span className="text-sm text-gray-400">{award.year}</span>
                  </div>
                  <CardTitle className="text-lg font-semibold text-white">
                    {award.title}
                  </CardTitle>
                  <div className="text-teal-400 font-medium">{award.organization}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Presentations Section */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8">Conference Presentations</h3>
          <div className="space-y-4">
            {presentations.map((presentation, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800/80 backdrop-blur-sm border-gray-600/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">{presentation.title}</h4>
                        <Badge variant="outline" className="text-blue-400 border-blue-500/50 bg-blue-900/30">
                          {presentation.type}
                        </Badge>
                      </div>
                      <div className="text-teal-400 font-medium mb-1">{presentation.event}</div>
                      <div className="text-sm text-gray-400">{presentation.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">{presentation.year}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="mt-12">
          <Card className="max-w-4xl mx-auto p-6 bg-gray-800/80 backdrop-blur-sm border-gray-600/50">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Achievement Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{awards.filter(a => a.type === 'Award').length}</div>
                  <div className="text-sm text-gray-400">Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{presentations.length}</div>
                  <div className="text-sm text-gray-400">Presentations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400">7</div>
                  <div className="text-sm text-gray-400">Conferences</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">3</div>
                  <div className="text-sm text-gray-400">Years Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Awards;
