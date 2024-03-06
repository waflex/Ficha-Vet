import { createContext, useState, useContext, useEffect } from 'react';
import { registroUser, loginRequest } from '../api/auth';

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
  // const [IsAuthenticated, setIsAuthenticated] = useState(null);

  const regUser = async (user) => {
    try {
      const res = await registroUser(user);
      setUser(res.data);
      //setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const logUser = async (user) => {
    try {
      const res = await loginRequest(user);
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
  return (
    <AuthContext.Provider
      value={{
        regUser,
        logUser,
        // IsAuthenticated,
        user,
        errors,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
