import React from 'react';
import { Award, Globe, Lock, Users, Zap, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About ModernBank
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the digital transformation of banking with innovation, trust, and exceptional customer service since 1995.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <Award className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To democratize financial services by making banking accessible, secure, and intelligent for everyone, everywhere.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <Globe className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the world's most trusted and innovative digital bank, empowering individuals and businesses to achieve their financial goals.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Lock, text: 'Security First' },
                      { icon: Users, text: 'Customer Centric' },
                      { icon: Zap, text: 'Innovation Driven' },
                      { icon: CheckCircle, text: 'Transparency' }
                    ].map((value, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <value.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{value.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Journey</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            
            {[
              { year: '1995', title: 'Founded', desc: 'Started as a community bank with a vision for the future' },
              { year: '2005', title: 'Digital Innovation', desc: 'Launched first online banking platform' },
              { year: '2015', title: 'Mobile First', desc: 'Released award-winning mobile banking app' },
              { year: '2020', title: 'AI Integration', desc: 'Introduced AI-powered financial insights' },
              { year: '2025', title: 'Global Expansion', desc: 'Serving customers in 50+ countries' }
            ].map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:scale-105 transition-transform duration-300">
                    <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;