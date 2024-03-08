import axios from './axios';

export const registroUser = (user) => axios.post(`/register`, user);
export const loginRequest = (usuario) => axios.post(`/login`, usuario);
export const verifyTokenRequest = () => axios.get('/Verify/');