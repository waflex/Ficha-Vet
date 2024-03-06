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
    console.log(user);
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res);
      console.log(res);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
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
    async function CheckLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    CheckLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        regUser,
        logUser,
        IsAuthenticated,
        user,
        errors,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
