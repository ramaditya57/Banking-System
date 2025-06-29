import React, { useState } from "react";
import {
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";

// Sample data for each section item
const infoContent = {
  "Personal Banking": "Includes savings, checking, debit cards, and personalized financial services for individuals.",
  "Business Banking": "Tailored financial products like loans, merchant services, and payroll for businesses.",
  "Investment Services": "Investment portfolios, mutual funds, and retirement planning tools.",
  "Insurance Products": "Life, health, property, and travel insurance with competitive rates.",
  "Mobile Banking": "Manage accounts, pay bills, and transfer funds via our secure mobile app.",

  "Help Center": "Browse FAQs, get troubleshooting guides, and connect with our chatbot.",
  "Contact Us": "Reach out to our support team via phone, email, or in-branch support.",
  "Security Center": "Learn about our fraud detection systems and how we protect your data.",
  "Privacy Policy": "Read how we handle your data responsibly and securely.",
  "Terms of Service": "Detailed terms for using our digital and physical banking services."
};

const Footer = () => {
  const [modalData, setModalData] = useState(null);

  const openModal = (title) => {
    setModalData({ title, content: infoContent[title] });
  };

  const closeModal = () => setModalData(null);

  const renderList = (title, items) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-400">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => openModal(item)}
              className="text-left w-full hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ModernBank</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Leading the digital transformation of banking with innovation,
                trust, and exceptional customer service.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a
                    href="#"
                    key={idx}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services & Support */}
            {renderList("Services", [
              "Personal Banking",
              "Business Banking",
              "Investment Services",
              "Insurance Products",
              "Mobile Banking"
            ])}
            {renderList("Support", [
              "Help Center",
              "Contact Us",
              "Security Center",
              "Privacy Policy",
              "Terms of Service"
            ])}

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>1-800-BANK-NOW</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>support@modernbank.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>500+ Locations Nationwide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 ModernBank. All rights reserved.
            </p>
            <div className="flex items-center !space-x-6 text-gray-400">
              <button
                onClick={() => openModal("Privacy Policy")}
                className="hover:text-white"
              >
                Privacy
              </button>
              <button
                onClick={() => openModal("Terms of Service")}
                className="hover:text-white"
              >
                Terms
              </button>
              <button
                onClick={() => openModal("Security Center")}
                className="hover:text-white"
              >
                Security
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white max-w-md w-full rounded-xl p-6 shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {modalData.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {modalData.content}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
