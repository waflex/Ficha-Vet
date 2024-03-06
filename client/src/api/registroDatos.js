import axios from './axios';
export const registroConsulta = (data) =>
  axios.post(`/consultas/crearConsulta`, data);
