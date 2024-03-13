import { createContext, useState, useContext } from 'react';
import { obtenerUsuario, obtenerUsuarios } from '../api/Usuarios';

export const UsersContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('DatosMedicos debe estar dentro de su Proveedor');
  }
  return context;
};
// eslint-disable-next-line react/prop-types
export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);

  const getUser = async (id) => {
    try {
      const res = await obtenerUsuario(id);
      console.log(res.data);
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
    <UsersContext.Provider
      value={{
        getUser,
        getUsers,
        user,
        users,
      }}>
      {children}
    </UsersContext.Provider>
  );
};
