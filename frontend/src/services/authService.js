import axios from 'axios';

const API_URL = 'http://localhost:8081/auth'; // Update the URL based on your backend configuration

const register = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

const login = (user) => {
    return axios.post(`${API_URL}/login`, user);
};

const authService = {
    register,
    login,
};

export default authService;
