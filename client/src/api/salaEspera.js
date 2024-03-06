
import axios from 'axios';

const API = 'http://localhost:3000/api';

export const obtenerDatos = async (filtro) => {
  try {
    const response = await axios.get(API, { params: { filtro } });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener datos de la API:', error);
  }
};

// export default obtenerDatos;
