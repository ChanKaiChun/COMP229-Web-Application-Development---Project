import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

console.log('API_URL:', API_URL); // This should log the correct URL
console.log(import.meta.env.VITE_API_URL);
const register = (user) => {
    return axios.post(`${API_URL}/auth/register`, user);
};

const login = (user) => {
    return axios.post(`${API_URL}/auth/login`, user);
};

const authService = {
    register,
    login,
};

export default authService;
