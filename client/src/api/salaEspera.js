import axios from './axios';

export const filtroDatos = async (filtro) => {
  try {
    const response = await axios.get({ params: { filtro } });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener datos de la API: filtro', error);
  }
};

export const obtenerDatos = async () => {
  try {
    const res = await axios.get('Consultas/');
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
export const obtenerDatosfiltrado = async () => {
  try {
    const res = await axios.get('Consultas/id');
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const getMascota = async (id) => {
  try {
    const res = await axios.get(`Consultas/getMascota/${id}`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
export const getTutor = async (id) => {
  try {
    const res = await axios.get(`Consultas/getTutor/${id}`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
