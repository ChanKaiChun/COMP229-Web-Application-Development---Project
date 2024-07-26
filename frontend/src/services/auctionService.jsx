// src/services/auctionService.jsx
import axios from 'axios';

// Define the methods to interact with auction-related API endpoints

const getLiveAuctions = () => {
    return axios.get(`/api/auction/live`);
};

const getFeaturedAuctions = () => {
    return axios.get(`/api/auction/featured`);
};

const getPassedAuctions = () => {
    return axios.get(`/api/auction/passed`);
};

const getAuctionById = (auctionId) => {
    return axios.get(`/api/auction/${auctionId}`);
};

const getOwnerAuctions = (auctionId) => {
    return axios.get(`/api/auction/owner/${auctionId}`);
};

const createAuction = (auctionData) => {
    return axios.post(`/api/auction`, auctionData);
};

const updateAuctions = (auctionId, auctionData) => {
    return axios.put(`/api/auction/${auctionId}`, auctionData);
};

// Export all the methods
const auctionService = {
    getLiveAuctions,
    getFeaturedAuctions,
    getPassedAuctions,
    getAuctionById,
    getOwnerAuctions,
    createAuction,
    updateAuctions,
};

export default auctionService;
