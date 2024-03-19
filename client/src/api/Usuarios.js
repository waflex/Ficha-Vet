import axios from './axios';
export const obtenerUsuario = async (id) => {
  try {
    const res = await axios.get(`Usuarios/obtenerUsuario/${id}`);
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
export const actualizarUsuario = async (id, data) => {
  try {
    const res = await axios.put(`Usuarios/actualizarUsuario/${id}`, data);
    return res;
  } catch (error) {
    throw new Error('No se pudo conectar a la API:', error);
  }
};
