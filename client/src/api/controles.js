import axios from './axios';

export const obtenerControles = async () => {
  try {
    const res = await axios.get('/Consultas/getControles/');
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const crearControl = async (control) => {
  try {
    const res = await axios.post('/Consultas/crearControl/', control);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return error.response;
    }
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const cancelarVariosControles = async (ids) => {
  try {
    const res = await axios.put('/Consultas/cancelarControles/', ids);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo conectar a la API:', error);
  }
};

export const AgendarControl = async (cita) => {
  try {
    const res = await axios.post('/Consultas/agendarControl/', cita);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo conectar a la API:', error);
  }
};
