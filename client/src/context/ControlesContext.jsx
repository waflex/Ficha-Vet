import React from 'react';
import { obtenerControles } from '../api/controles'; //
import { createContext, useState, useContext } from 'react';

export const ControlesContext = createContext();

export const useControles = () => {
  const context = useContext(ControlesContext);
  if (!context) {
    throw new Error('Controles debe estar dentro de su Proveedor');
  }
  return context;
}

export const ControlesProvider = ({ children }) => {
  const [controles, setControles] = useState([]);

  const getControles = async () => {
    try {
      const res = await obtenerControles();
      setControles(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ControlesContext.Provider
      value={{
        getControles,
        controles
      }}>
      {children}
    </ControlesContext.Provider>
  );
};

