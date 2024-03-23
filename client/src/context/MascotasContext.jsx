import { obtenerMascotas, obtenerTutores } from '../api/Mascotas';
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
  const [Tutores, setTutores] = useState([]);

  const getMascotas = async () => {
    try {
      const res = await obtenerMascotas();
      setMascotas(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTutores = async () => {
    try {
      const res = await obtenerTutores();
      setTutores(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const agendarCita = async (cita) => {
    try {
      const res = await crearCita(cita);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MascotasContext.Provider
      value={{
        Mascotas,
        getMascotas,
        Tutores,
        getTutores,
        agendarCita,
      }}>
      {children}
    </MascotasContext.Provider>
  );
};
