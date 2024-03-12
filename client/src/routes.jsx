import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute() {
  const { loading, IsAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !IsAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
