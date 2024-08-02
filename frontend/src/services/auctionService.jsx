// src/services/auctionService.jsx
import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: '/api', // Adjust this if your base URL is different
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Define the methods to interact with auction-related API endpoints

const getLiveAuctions = () => api.get('/auction/live');

const getFeaturedAuctions = () => api.get('/auction/featured');

const getPassedAuctions = () => api.get('/auction/passed');

const getAuctionById = (auctionId) => api.get(`/auction/${auctionId}`);

const getOwnerAuctions = (auctionId) => api.get(`/auction/owner/${auctionId}`);

const createAuction = (auctionData) => api.post('/auction', auctionData);

const updateAuctions = (auctionId, auctionData) => api.put(`/auction/${auctionId}`, auctionData);

const register = (user) => api.post('/auth/register', user);

const login = (user) => api.post('/auth/login', user);

// Bidding methods
const placeBid = (bidData) => api.post('/bid', bidData);

const getMyBids = () => api.get('/bid/my-bid');

const getAuctionBids = (auctionId) => api.get(`/bid/auction/${auctionId}`);

// Export all the methods
const auctionService = {
    getLiveAuctions,
    getFeaturedAuctions,
    getPassedAuctions,
    getAuctionById,
    getOwnerAuctions,
    createAuction,
    updateAuctions,
    register,
    login,
    placeBid,
    getMyBids,
    getAuctionBids,
};

export default auctionService;