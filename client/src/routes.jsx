import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Spinner } from 'flowbite-react';

function ProtectedRoute() {
  const { loading, IsAuthenticated, user } = useAuth();
  if (loading)
    return (
      <div className="flex flex-wrap gap-2">
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  if (!loading && !IsAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
