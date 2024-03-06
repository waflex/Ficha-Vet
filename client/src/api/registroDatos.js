import axios from 'axios';

const API = 'http://localhost:3000/api';

export const registroConsulta = (data) =>
  axios.post(`${API}/consultas/crearConsulta`, data);
