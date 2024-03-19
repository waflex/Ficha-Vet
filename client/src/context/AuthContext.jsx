import { createContext, useState, useContext, useEffect } from 'react';
import { registroUser, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe estar dentro de AuthProvider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [IsAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const regUser = async (user) => {
    try {
      const res = await registroUser(user);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const logUser = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsAuthenticated(false);
  };
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const CheckLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    console.log(loading);
    CheckLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        regUser,
        logUser,
        IsAuthenticated,
        logout,
        user,
        loading,
        errors,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
