import axios from './axios';

export const obtenerControles = async () => {
    try {
      const res = await axios.get('Controles/');
      return res;
    } catch (error) {
      throw new Error('No se pudo conectar a la API:', error);
    }
  };
  