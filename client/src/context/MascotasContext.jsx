import { obtenerMascotas } from '../api/Mascotas';
import { createContext, useState, useContext } from 'react';

export const MascotasContext = createContext();

export const useMascotas = () => {
  const context = useContext(MascotasContext);
  if (!context) {
    throw new Error('Mascotas debe estar dentro de su Proveedor');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const MascotasProvider = ({ children }) => {
  const [Mascotas, setMascotas] = useState([]);

  const getMascotas = async () => {
    try {
      const res = await obtenerMascotas();
      setMascotas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MascotasContext.Provider
      value={{
        Mascotas,
        getMascotas,
      }}>
      {children}
    </MascotasContext.Provider>
  );
};
