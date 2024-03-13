import axios from './axios';
export const obtenerUsuario = async (id) => {
  try {
    const res = await axios.get(`Usuarios/${id}`);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
export const obtenerUsuarios = async () => {
  try {
    const res = await axios.get('Usuarios/');
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
