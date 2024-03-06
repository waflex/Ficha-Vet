import axios from './axios';
export const registroConsulta = (tutor) =>
  axios.post(`/consultas/crearConsulta`, tutor);
