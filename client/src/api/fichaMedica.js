import axios from "axios";

const API = "http://localhost:3000/api";

export const registerRequest = (ficha) => axios.post(`${API}/crearFicha`, ficha);
