import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Common Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SchemesPage from './pages/SchemesPage';
import FAQsPage from './pages/FAQsPage';

// Auth Pages
import Login from './components/Login';
import Register from './components/Register';

// Role-based Dashboards
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import OfficialDashboard from './pages/OfficialDashboard';
import RoleRouter from './routes/RoleRouter';

// Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

const PublicLayout = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isScrolled={isScrolled}
      />
      <main className="transition-all duration-500 ease-in-out">
        {React.cloneElement(children, {
          expandedFaq,
          setExpandedFaq,
          setCurrentPage,
        })}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages wrapped in Layout */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />
          <Route
            path="/schemes"
            element={
              <PublicLayout>
                <SchemesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/faqs"
            element={
              <PublicLayout>
                <FAQsPage />
              </PublicLayout>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated Role Entry */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <RoleRouter />
              </PrivateRoute>
            }
          />

          {/* Specific Dashboards */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <PrivateRoute>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/official"
            element={
              <PrivateRoute>
                <OfficialDashboard />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}



// import React, { useState, useEffect } from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import SchemesPage from './pages/SchemesPage';
// import FAQsPage from './pages/FAQsPage';
// import './index.css';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [expandedFaq, setExpandedFaq] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home': return <HomePage />;
//       case 'about': return <AboutPage />;
//       case 'schemes': return <SchemesPage />;
//       case 'faqs': return <FAQsPage expandedFaq={expandedFaq} setExpandedFaq={setExpandedFaq} />;
//       default: return <HomePage />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Header 
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         isMenuOpen={isMenuOpen}
//         setIsMenuOpen={setIsMenuOpen}
//         isScrolled={isScrolled}
//       />
//       <main className="transition-all duration-500 ease-in-out">
//         {renderPage()}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;



// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import './index.css';
// // import Login from './components/Login';
// // import Register from './components/Register'; // 🆕 Import Register
// // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // import RoleRouter from './routes/RoleRouter';
// // import AdminDashboard from './pages/AdminDashboard';
// // import CustomerDashboard from './pages/CustomerDashboard';
// // import OfficialDashboard from './pages/OfficialDashboard';

// // function PrivateRoute({ children }) {
// //   const { token } = useAuth();
// //   return token ? children : <Navigate to="/login" />;
// // }

// // export default function App() {
// //   return (
// //     <AuthProvider>
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />

// //           {/* 🧠 Main dynamic role-based entry */}
// //           <Route
// //             path="/"
// //             element={
// //               <PrivateRoute>
// //                 <RoleRouter />
// //               </PrivateRoute>
// //             }
// //           />

// //           {/* 👤 Role-specific routes */}
// //           <Route
// //             path="/admin"
// //             element={
// //               <PrivateRoute>
// //                 <AdminDashboard />
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route
// //             path="/customer"
// //             element={
// //               <PrivateRoute>
// //                 <CustomerDashboard />
// //               </PrivateRoute>
// //             }
// //           />
// //           <Route
// //             path="/official"
// //             element={
// //               <PrivateRoute>
// //                 <OfficialDashboard />
// //               </PrivateRoute>
// //             }
// //           />
// //         </Routes>
// //       </BrowserRouter>
// //     </AuthProvider>
// //   );
// // }
