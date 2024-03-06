import axios from './axios';

export const registerRequest = (ficha) => axios.post(`/crearFicha`, ficha);
