import axios from 'axios';

const register = (user) => {
    return axios.post(`/api/auth/register`, user);
};

const login = (user) => {
    return axios.post(`/api/auth/login`, user);
};

const authService = {
    register,
    login,
};

export default authService;
