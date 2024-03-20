import { createContext, useContext, useState } from 'react';
import { obtenerDatos, obtenerDatosfiltradoM } from '../api/salaEspera';

// eslint-disable-next-line react-refresh/only-export-components
const DatosMContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDatosM = () => {
  const context = useContext(DatosMContext);
  if (!context) {
    throw new Error('DatosMedicos debe estar dentro de su Proveedor');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function DatosMProvider({ children }) {
  const [DatosM, setDatosM] = useState([]);
  const [DatosMFiltrados, setDatosMFiltrados] = useState([]);

  const obtenerDatosM = async () => {
    try {
      const res = await obtenerDatos();
      setDatosM(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerDatosFiltrados = async (id) => {
    try {
      const res = await obtenerDatosfiltradoM(id);
      setDatosMFiltrados(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DatosMContext.Provider
      value={{
        DatosM,
        DatosMFiltrados,
        obtenerDatosM,
        obtenerDatosFiltrados,
      }}>
      {children}
    </DatosMContext.Provider>
  );
}
