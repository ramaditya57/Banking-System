import React from 'react';
import { 
  PiggyBank,
  TrendingUp,
  CreditCard,
  CheckCircle,
  Smartphone,
  Globe,
  Calendar,
  Lock
} from 'lucide-react';

const SchemesPage = () => {
  const schemes = [
    {
      id: 1,
      title: 'Premium Savings',
      subtitle: 'High-yield savings account',
      rate: '4.5%',
      features: ['No minimum balance', '24/7 online banking', 'Free ATM withdrawals', 'Mobile app access'],
      color: 'from-blue-500 to-purple-600',
      icon: PiggyBank
    },
    {
      id: 2,
      title: 'Business Growth',
      subtitle: 'Accelerate your business',
      rate: '6.2%',
      features: ['Business loans', 'Credit lines', 'Merchant services', 'Cash management'],
      color: 'from-green-500 to-teal-600',
      icon: TrendingUp
    },
    {
      id: 3,
      title: 'Credit Elite',
      subtitle: 'Premium credit card',
      rate: '2x',
      features: ['Reward points', 'Travel benefits', 'Insurance coverage', 'Concierge service'],
      color: 'from-purple-500 to-pink-600',
      icon: CreditCard
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Banking Schemes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Discover our comprehensive range of banking products designed to meet your unique financial needs and goals.
          </p>
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {schemes.map((scheme, index) => (
              <div
                key={scheme.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${scheme.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${scheme.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <scheme.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{scheme.title}</h3>
                  <p className="text-gray-600 mb-6">{scheme.subtitle}</p>
                  
                  <div className="flex items-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">{scheme.rate}</span>
                    <span className="text-gray-600 ml-2">
                      {scheme.title === 'Credit Elite' ? 'rewards' : 'APY'}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {scheme.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${scheme.color} !text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 !mb-16">Additional Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Smartphone, title: 'Mobile Banking', desc: 'Full-featured mobile app' },
              { icon: Globe, title: 'Online Banking', desc: 'Secure web portal' },
              { icon: Calendar, title: 'Investment Planning', desc: 'Professional guidance' },
              { icon: Lock, title: 'Insurance Products', desc: 'Comprehensive coverage' }
            ].map((service, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchemesPage;