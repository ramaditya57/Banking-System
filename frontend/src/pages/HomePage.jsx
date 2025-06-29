import React from "react";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-spin slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Banking
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of banking with cutting-edge technology,
              unmatched security, and personalized financial solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => {
                  const section = document.getElementById("features");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className="group bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("./about")}
                className="border-2 border-white/30 !text-white px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 animate-float">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <Shield className="w-8 h-8 text-blue-400 mb-2" />
              <div className="text-white text-sm">Secure Banking</div>
            </div>
          </div>
          <div className="absolute top-1/3 right-10 animate-float delay-1000">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <Zap className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-white text-sm">Instant Transfers</div>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float delay-2000">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <Users className="w-8 h-8 text-pink-400 mb-2" />
              <div className="text-white text-sm">24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose ModernBank?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine innovative technology with traditional banking values
              to deliver exceptional financial services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description:
                  "Your money and data are protected by military-grade encryption and advanced fraud detection.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Instant transfers, real-time notifications, and lightning-fast mobile app performance.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Users,
                title: "24/7 Expert Support",
                description:
                  "Our dedicated team of banking professionals is always here to help you succeed.",
                color: "from-green-500 to-teal-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2M+", label: "Happy Customers" },
              { number: "$50B+", label: "Assets Managed" },
              { number: "500+", label: "Branch Locations" },
              { number: "99.9%", label: "Uptime Guarantee" },
            ].map((stat, index) => (
              <div key={index} className="!text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Data-Driven Decisions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access actionable insights and financial data to guide your
              growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Analytics",
                description:
                  "Monitor transactions, account balances, and investments with up-to-the-second accuracy.",
                icon: "📊",
              },
              {
                title: "Custom Reports",
                description:
                  "Generate personalized financial reports tailored to your goals and history.",
                icon: "📈",
              },
              {
                title: "Smart Alerts",
                description:
                  "Get instant notifications for budget limits, suspicious activity, and market changes.",
                icon: "🔔",
              },
            ].map((data, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 text-center"
              >
                <div className="text-4xl mb-4">{data.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {data.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
