import axios from "axios";

const API = "http://localhost:3000/api";

export const registerRequest = (tutor) => axios.post(`${API}/consultas/crearConsulta`, tutor);
