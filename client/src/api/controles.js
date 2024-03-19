import axios from './axios';

export const obtenerControles = async () => {
  try {
    const res = await axios.get('/Consultas/getControles/');
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
