import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Spinner } from 'flowbite-react';

export function ProtectedRoute() {
  const { loading, IsAuthenticated } = useAuth();
  if (loading)
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  if (!loading && !IsAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

export function ProtectedAdminRoute() {
  const { loading, IsAuthenticated, user } = useAuth();
  if (loading)
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  if (!loading && !IsAuthenticated && user.TipoUsuario !== 1)
    return <Navigate to="/Home" replace />;

  return <Outlet />;
}
