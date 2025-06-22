import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Info, Gift, HelpCircle, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const publicLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Schemes', path: '/schemes', icon: Gift },
    { label: 'FAQs', path: '/faqs', icon: HelpCircle },
  ];

  const dashboardLinks = {
    admin: [
      { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { label: 'Users', path: '/admin/users' },
      { label: 'Transactions', path: '/admin/transactions' },
      { label: 'Analytics', path: '/admin/analytics' },
    ],
    customer: [
      { label: 'Dashboard', path: '/customer', icon: LayoutDashboard },
      { label: 'Accounts', path: '/customer/accounts' },
      { label: 'Payments', path: '/customer/payments' },
      { label: 'Profile', path: '/customer/profile' },
    ],
    official: [
      { label: 'Dashboard', path: '/official', icon: LayoutDashboard },
      { label: 'Verify Accounts', path: '/official/verify' },
      { label: 'Reports', path: '/official/reports' },
    ],
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-gradient-to-b from-blue-900 to-purple-900 text-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 sm:translate-x-0 sm:static sm:shadow-none`}
    >
      <div className="p-6 flex flex-col h-full justify-between">
        <div>
          {/* Mobile Header */}
          <div className="flex justify-between items-center sm:hidden mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {role ? `${role.toUpperCase()} Panel` : 'ModernBank'}
            </h3>
            <button
              onClick={onClose}
              className="text-white text-xl p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Desktop Header */}
          <h3 className="text-2xl font-bold mb-6 hidden sm:block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {role ? `${role.toUpperCase()} Panel` : 'ModernBank'}
          </h3>

          {/* Public Navigation */}
          <div className="mb-6">
            <p className="text-sm uppercase text-blue-200 mb-2 font-semibold tracking-wide">
              Main Navigation
            </p>
            <ul className="space-y-2">
              {publicLinks.map(({ label, path, icon: Icon }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Role-specific Navigation */}
          {role && dashboardLinks[role] && (
            <div>
              <p className="text-sm uppercase text-blue-200 mb-2 font-semibold tracking-wide">
                {role} Dashboard
              </p>
              <ul className="space-y-2">
                {dashboardLinks[role].map(({ label, path, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
