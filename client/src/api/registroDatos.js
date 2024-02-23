import axios from 'axios'

const API = 'http://localhost:4000/api'

export const registerRequest = (tutor) => axios.post(`${API}/register`, tutor);

