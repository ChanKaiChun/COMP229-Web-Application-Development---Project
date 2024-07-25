// src/services/auctionService.jsx
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Define the methods to interact with auction-related API endpoints

const getLiveAuctions = () => {
    return axios.get(`${API_URL}/auction/live`);
};

const getFeaturedAuctions = () => {
    return axios.get(`${API_URL}/auction/featured`);
};

const getPassedAuctions = () => {
    return axios.get(`${API_URL}/auction/passed`);
};

const getAuctionById = (auctionId) => {
    return axios.get(`${API_URL}/auction/${auctionId}`);
};

const getOwnerAuctions = (auctionId) => {
    return axios.get(`${API_URL}/auction/owner/${auctionId}`);
};

const createAuction = (auctionData) => {
    return axios.post(`${API_URL}/auction`, auctionData);
};

const updateAuction = (auctionId, auctionData) => {
    return axios.put(`${API_URL}/auction/${auctionId}`, auctionData);
};

// Export all the methods
const auctionService = {
    getLiveAuctions,
    getFeaturedAuctions,
    getPassedAuctions,
    getAuctionById,
    getOwnerAuctions,
    createAuction,
    updateAuction,
};

export default auctionService;
