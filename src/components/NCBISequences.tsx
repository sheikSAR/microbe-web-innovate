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
    <section id="ncbi" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">NCBI Sequences</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            16S rRNA gene sequences submitted to NCBI GenBank database
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sequences.map((seq, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-600">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    16S rRNA
                  </Badge>
                  <span className="text-sm text-gray-500">{seq.submissionDate}</span>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {seq.strainName}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-mono text-teal-600 font-medium">{seq.accessionNumber}</span>
                  <span className="text-gray-500">{seq.length}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">{seq.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
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
          <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-teal-50 to-blue-50">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sequence Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{sequences.length}</div>
                  <div className="text-sm text-gray-600">Total Sequences</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1,443</div>
                  <div className="text-sm text-gray-600">Avg. Length (bp)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Soil Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2024</div>
                  <div className="text-sm text-gray-600">Year</div>
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
