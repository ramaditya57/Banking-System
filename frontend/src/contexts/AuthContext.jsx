import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null); // user = { role }

  // 🔑 Save token + role during login
  const login = (t, role) => {
    setToken(t);
    setUser({ role });
    localStorage.setItem('token', t);
    localStorage.setItem('role', role);
  };

  // 🚪 Clear on logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  // 🔁 Restore token + role on page reload
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (token && storedRole) {
      setUser({ role: storedRole });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
