import axios from './axios';

export const obtenerMascotas = async () => {
  try {
    const res = await axios.get('/Mascotas/');
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const obtenerTutores = async () => {
  try {
    const res = await axios.get('/Mascotas/obtenerTutores');
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const obtenerFichas = async (id) => {
  try {
    const res = await axios.get(`/Mascotas/Fichas/${id}`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
