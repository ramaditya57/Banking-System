import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign, Home, Info, Gift, HelpCircle, Menu, X, LogIn, LayoutDashboard
} from 'lucide-react';
import {jwtDecode} from 'jwt-decode'; // ✅ FIXED: Use default import

const Header = ({ isMenuOpen, setIsMenuOpen, isScrolled }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  // Decode JWT token and extract role
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role); // assuming token contains { role: "admin" | "official" | "customer" }
      } catch (err) {
        console.error("Invalid token");
        setUserRole(null);
      }
    }
  }, []);

  const navigation = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/schemes', label: 'Schemes', icon: Gift },
    { path: '/faqs', label: 'FAQs', icon: HelpCircle }
  ];

  const getDashboardPath = () => {
    if (userRole === 'admin') return '/admin';
    if (userRole === 'official') return '/official';
    if (userRole === 'customer') return '/customer';
    return '/';
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div onClick={() => navigate('./home')} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 !text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ModernBank
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}

            {/* Dashboard button (visible only if logged in) */}
            {userRole && (
              <button
                onClick={() => navigate(getDashboardPath())}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            )}

            {/* Login button (only if NOT logged in) */}
            {!userRole && (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t animate-in slide-in-from-top-2">
            <nav className="px-4 py-4 space-y-2">
              {navigation.map(({ path, label, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => {
                    navigate(path);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50"
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}

              {/* Dashboard in mobile */}
              {userRole && (
                <button
                  onClick={() => {
                    navigate(getDashboardPath());
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
              )}

              {/* Login in mobile */}
              {!userRole && (
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
