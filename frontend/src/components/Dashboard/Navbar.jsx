import { useAuth } from "../../contexts/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar({ toggleSidebar }) {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  const getTitle = () => {
    switch (role) {
      case "admin":
        return "ADMIN DASHBOARD";
      case "customer":
        return "CUSTOMER DASHBOARD";
      case "official":
        return "OFFICIALS DASHBOARD";
      default:
        return "DASHBOARD";
    }
  };

  return (
    <nav className="h-[64px] bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shadow-md relative">
      {/* Left: Sidebar toggle (only visible on small screens) */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={toggleSidebar}
        >
          <RxHamburgerMenu className="text-2xl text-blue-900" />
        </button>
      </div>

      {/* Center: Role-based Dashboard Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h2 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
          {getTitle()}
        </h2>
      </div>

      {/* Right: User name */}
      {/* <div className="flex items-center gap-3">
        <span className="text-sm sm:text-base text-blue-900 font-semibold">
          {user?.name || "Loading..."}
        </span>
      </div> */}
    </nav>
  );
}
