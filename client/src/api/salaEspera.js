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

export const obtenerDatosfiltradoM = async (id) => {
  try {
    const res = await axios.get(`Consultas/getFicha/${id}`);
    return res;
  } catch (error) {
    console.log(error);
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

export const FinalizarFicha = async (data, ID) => {
  try {
    const res = await axios.post(`Consultas/FinalizarFicha/${ID}`, data);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const FichaAtender = async (id) => {
  try {
    const res = await axios.post(`Consultas/FichaAtender/${id}`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
export const FichaCancelar = async (id) => {
  try {
    const res = await axios.post(`Consultas/FichaCancelar/${id}`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
