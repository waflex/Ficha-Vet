import {
  obtenerControles,
  cancelarVariosControles,
  AgendarControl,
} from '../api/controles'; //
import { createContext, useState, useContext } from 'react';

export const ControlesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useControles = () => {
  const context = useContext(ControlesContext);
  if (!context) {
    throw new Error('Controles debe estar dentro de su Proveedor');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ControlesProvider = ({ children }) => {
  const [controles, setControles] = useState([]);

  const getControles = async () => {
    try {
      const res = await obtenerControles();
      setControles(res.data.controles);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelarControles = async (ids) => {
    try {
      const res = await cancelarVariosControles(ids);
      setControles(res.data.controles);
    } catch (error) {
      console.log(error);
    }
  };
  const agendarControl = async (cita) => {
    try {
      const res = await AgendarControl(cita);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ControlesContext.Provider
      value={{
        getControles,
        cancelarControles,
        agendarControl,
        controles,
      }}>
      {children}
    </ControlesContext.Provider>
  );
};
