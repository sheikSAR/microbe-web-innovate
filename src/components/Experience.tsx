
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Experience = () => {
  const experiences = [
    {
      title: "Research Scholar",
      organization: "DST-SEED Project",
      period: "2022 - Present",
      type: "Research",
      description: "Leading research activities in microbial diversity and agricultural applications under the Department of Science and Technology SEED funding program.",
      achievements: [
        "Conducted extensive fieldwork across multiple agricultural sites",
        "Isolated and characterized over 100 actinomycete strains",
        "Developed protocols for microbial identification and screening"
      ]
    },
    {
      title: "Field Research Associate",
      organization: "Agricultural Extension Program",
      period: "2023 - Present",
      type: "Fieldwork",
      description: "Collaborative fieldwork with farmers and agricultural scientists to understand soil microbiology in real-world agricultural settings.",
      achievements: [
        "Collected soil samples from 50+ agricultural fields",
        "Conducted on-site microbial analysis workshops",
        "Established partnerships with local farming communities"
      ]
    },
    {
      title: "Workshop Facilitator",
      organization: "Various Academic Institutions",
      period: "2021 - Present",
      type: "Teaching",
      description: "Conducting workshops and training sessions on microbiology techniques, bioinformatics tools, and research methodology.",
      achievements: [
        "Facilitated 10+ workshops on microbiology techniques",
        "Trained over 200 students in laboratory protocols",
        "Developed comprehensive training materials"
      ]
    },
    {
      title: "Laboratory Assistant",
      organization: "Microbiology Department",
      period: "2020 - 2022",
      type: "Teaching",
      description: "Assisted in undergraduate and graduate laboratory courses, mentoring students in microbiology and biotechnology techniques.",
      achievements: [
        "Supervised laboratory experiments for 150+ students",
        "Maintained laboratory equipment and sterile conditions",
        "Assisted in curriculum development for practical courses"
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    const colorMap = {
      Research: "bg-teal-100 text-teal-800",
      Fieldwork: "bg-blue-100 text-blue-800",
      Teaching: "bg-green-100 text-green-800"
    };
    return colorMap[type as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Diverse experience in research, fieldwork, and education in microbiology and biotechnology
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal-600">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {exp.title}
                      </CardTitle>
                      <Badge className={getTypeColor(exp.type)}>
                        {exp.type}
                      </Badge>
                    </div>
                    <div className="text-teal-600 font-medium mb-1">{exp.organization}</div>
                    <div className="text-sm text-gray-500">{exp.period}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">{exp.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
