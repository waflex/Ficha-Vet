import { createContext, useState, useContext, useEffect } from 'react';
import {} from '../api/auth';
import { obtenerUsuario, obtenerUsuarios } from '../api/Usuarios';

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);

  const getUser = async (id) => {
    try {
      const res = await obtenerUsuario(id);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const res = await obtenerUsuarios();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        getUser,
        getUsers,
        user,
        users,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
