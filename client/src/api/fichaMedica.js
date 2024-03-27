import axios from './axios';

export const obtenerUsuario = async (id) => {
  try {
    const res = await axios.get(`Usuario/${id}`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const obtenerUsuarios = async () => {
  try {
    const res = await axios.get(`Usuario/`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};

