import axios from "axios";

const API = "http://localhost:3000/api";

export const registroUser = (user) => axios.post(`${API}/register`, user);
export const loginRequest = (usuario) => axios.post(`${API}/login`, usuario);
