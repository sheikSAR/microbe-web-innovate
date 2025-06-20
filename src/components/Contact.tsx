
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, User, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const professionalLinks = [
    {
      name: "Email",
      url: "mailto:tseenivasa.moorthy@example.com",
      icon: Mail,
      description: "tseenivasa.moorthy@example.com"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/tseenivasamoorthy",
      icon: User,
      description: "Professional Network"
    },
    {
      name: "ORCiD",
      url: "https://orcid.org/0000-0000-0000-0000",
      icon: ExternalLink,
      description: "Research Profile"
    },
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=example",
      icon: ExternalLink,
      description: "Publications & Citations"
    },
    {
      name: "SciProfiles",
      url: "https://sciprofiles.com/profile/example",
      icon: ExternalLink,
      description: "Scientific Profile"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Me</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's collaborate on research, discuss opportunities, or share knowledge in microbiology and biotechnology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Research collaboration, questions, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[120px]"
                    placeholder="Your message here..."
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Professional Links & CV Download */}
          <div className="space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">Professional Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {professionalLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <link.icon size={20} className="text-teal-600" />
                        <div>
                          <div className="font-medium text-gray-900">{link.name}</div>
                          <div className="text-sm text-gray-600">{link.description}</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-teal-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">Download CV</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Download my complete curriculum vitae for detailed information about my academic background, research experience, and publications.
                </p>
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    // Simulate CV download
                    toast({
                      title: "CV Download",
                      description: "CV download feature will be available soon.",
                    });
                  }}
                >
                  Download Full CV (PDF)
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🧬</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Collaboration</h3>
                  <p className="text-sm text-gray-600">
                    Open to collaboration opportunities in actinomycetes research, agricultural microbiology, and biotechnology applications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
