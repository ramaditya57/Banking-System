import React, { useState } from "react";
import { ChevronDown, Phone, Mail, MapPin, HelpCircle } from "lucide-react";
import './faq.css';

const FAQsPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I open a new account?",
      answer:
        'You can open a new account online in just 5 minutes. Simply click on "Open Account", fill out the application form, and verify your identity with a government-issued ID. Our team will review and activate your account within 24 hours.',
    },
    {
      question: "What are the minimum balance requirements?",
      answer:
        "Our Premium Savings account has no minimum balance requirement. For checking accounts, we maintain a $100 minimum balance to avoid monthly fees. Business accounts vary based on the type of services required.",
    },
    {
      question: "Is online banking secure?",
      answer:
        "Yes, we use bank-level 256-bit SSL encryption and multi-factor authentication to protect your data. We also monitor accounts 24/7 for suspicious activity and provide fraud protection guarantees.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Our customer support is available 24/7 through multiple channels: phone at 1-800-BANK-NOW, live chat on our website, email at support@modernbank.com, or visit any of our 500+ branch locations nationwide.",
    },
    {
      question: "What mobile banking features are available?",
      answer:
        "Our mobile app offers full banking functionality including account management, bill pay, mobile check deposit, fund transfers, ATM locator, spending insights, and budget tracking tools.",
    },
    {
      question: "How do I report a lost or stolen card?",
      answer:
        "Report lost or stolen cards immediately by calling our 24/7 hotline at 1-800-BANK-NOW, using our mobile app, or logging into online banking. We will instantly freeze your card and expedite a replacement to you within 1-2 business days.",
    },
    {
      question: "What are your ATM fees?",
      answer:
        "We offer unlimited free ATM withdrawals at our 10,000+ ATM network nationwide. For out-of-network ATMs, we charge $2.50 per transaction, but we reimburse up to $15 in ATM fees monthly for Premium account holders.",
    },
    {
      question: "How do I set up direct deposit?",
      answer:
        "Setting up direct deposit is easy! Provide your employer with our routing number (123456789) and your account number. You can find these details in your online banking account or mobile app under Account Details.",
    },
    {
      question: "What loan products do you offer?",
      answer:
        "We offer a comprehensive range of loan products including personal loans, auto loans, home mortgages, business loans, and student loans. Each comes with competitive rates and flexible terms tailored to your needs.",
    },
    {
      question: "How do I dispute a transaction?",
      answer:
        "You can dispute transactions through our mobile app, online banking, or by calling customer service. We will investigate within 10 business days and provide provisional credit for eligible disputes while we investigate.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our banking services and get
            the help you need.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 transition-transform duration-300 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  </div>
                </button>

                {expandedFaq === index && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {" 2 mins"}
              </div>
              <div className="text-gray-600">Average Response Time</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                99.9%
              </div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-r from-purple-600 to-pink-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-purple-100 text-xl mb-12 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to help you with any
            questions or concerns.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: "1-800-BANK-NOW",
                desc: "Speak with our experts",
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "support@modernbank.com",
                desc: "Get detailed responses",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "500+ Locations",
                desc: "Face-to-face assistance",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {contact.title}
                </h3>
                <p className="text-purple-100 font-semibold mb-1">
                  {contact.info}
                </p>
                <p className="text-purple-200 text-sm">{contact.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Contact Support Now
            </button>
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Other Ways We Can Help
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore additional resources and support options to make your
              banking experience seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Video Tutorials",
                desc: "Step-by-step guides for common banking tasks",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Live Chat",
                desc: "Instant messaging with support agents",
                color: "from-green-500 to-teal-500",
              },
              {
                title: "Help Center",
                desc: "Comprehensive documentation and guides",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Community Forum",
                desc: "Connect with other customers and experts",
                color: "from-orange-500 to-red-500",
              },
            ].map((help, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${help.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {help.title}
                </h3>
                <p className="text-gray-600 text-sm">{help.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </div>
  );
};

export default FAQsPage;
