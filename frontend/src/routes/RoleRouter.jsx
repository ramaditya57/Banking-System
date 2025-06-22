import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleRouter = () => {
  const { user } = useAuth(); // `user` should contain at least `{ role }`

  if (!user) return <Navigate to="/login" />;
  if (user.role === 'admin') return <Navigate to="/admin" />;
  if (user.role === 'official') return <Navigate to="/official" />;
  return <Navigate to="/customer" />;
};

export default RoleRouter;
