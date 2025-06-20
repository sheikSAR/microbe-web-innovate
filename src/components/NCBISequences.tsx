
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const NCBISequences = () => {
  const sequences = [
    {
      strainName: "Streptomyces sp. TSM001",
      accessionNumber: "MW123456",
      description: "16S rRNA gene sequence from agricultural soil",
      length: "1,456 bp",
      submissionDate: "2024-01-15"
    },
    {
      strainName: "Streptomyces sp. TSM002",
      accessionNumber: "MW123457",
      description: "16S rRNA gene sequence from rhizosphere soil",
      length: "1,432 bp",
      submissionDate: "2024-02-20"
    },
    {
      strainName: "Actinomycete sp. TSM003",
      accessionNumber: "MW123458",
      description: "16S rRNA gene sequence from compost sample",
      length: "1,445 bp",
      submissionDate: "2024-03-10"
    },
    {
      strainName: "Streptomyces sp. TSM004",
      accessionNumber: "MW123459",
      description: "16S rRNA gene sequence from forest soil",
      length: "1,441 bp",
      submissionDate: "2024-04-05"
    }
  ];

  return (
    <section id="ncbi" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">NCBI Sequences</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            16S rRNA gene sequences submitted to NCBI GenBank database
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sequences.map((seq, index) => (
            <Card key={index} className="bg-gray-700/80 border-gray-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                    16S rRNA
                  </Badge>
                  <span className="text-sm text-gray-400">{seq.submissionDate}</span>
                </div>
                <CardTitle className="text-lg font-semibold text-white">
                  {seq.strainName}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-mono text-teal-400 font-medium">{seq.accessionNumber}</span>
                  <span className="text-gray-400">{seq.length}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">{seq.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-blue-400 border-blue-500/50 hover:bg-blue-600/20 hover:text-blue-300"
                  onClick={() => window.open(`https://www.ncbi.nlm.nih.gov/nuccore/${seq.accessionNumber}`, '_blank')}
                >
                  <ExternalLink size={16} className="mr-2" />
                  View in NCBI
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-gray-700/80 to-gray-800/80 border-gray-600/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-white mb-4">Sequence Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">{sequences.length}</div>
                  <div className="text-sm text-gray-400">Total Sequences</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">1,443</div>
                  <div className="text-sm text-gray-400">Avg. Length (bp)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">4</div>
                  <div className="text-sm text-gray-400">Soil Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">2024</div>
                  <div className="text-sm text-gray-400">Year</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NCBISequences;
