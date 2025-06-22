import { useState } from "react";
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200 text-[#1a1f36] font-kanit overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white shadow-inner rounded-t-2xl border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
