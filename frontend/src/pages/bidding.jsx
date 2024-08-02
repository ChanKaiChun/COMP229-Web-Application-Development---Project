import React, { useState, useEffect } from "react";
import axios from "axios";

const Bidding = () => {
    const [auctionId, setAuctionId] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [userBids, setUserBids] = useState([]);
    const [auctionBids, setAuctionBids] = useState([]);
    const [message, setMessage] = useState(""); // To display success or error messages

    // Retrieve token from localStorage
    const authToken = localStorage.getItem('authToken');

    // Create axios instance with default headers
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL, // Ensure this is set correctly in your .env file
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });

    useEffect(() => {
        // Fetch user's bids
        axiosInstance.get(`/api/bid/my-bid`)
            .then(response => {
                setUserBids(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching user's bids!", error);
            });
    }, []);

    const handleAuctionIdChange = (e) => {
        setAuctionId(e.target.value);
    };

    const handleBidAmountChange = (e) => {
        setBidAmount(e.target.value);
    };

    const handleBidSubmit = (e) => {
        e.preventDefault();

        axiosInstance.post(`/api/bid`, { auctionId, amount: parseFloat(bidAmount) })
            .then(response => {
                setMessage("Bid placed successfully!");
                setBidAmount('');
                // Optionally, you can fetch auction bids again to update the list
                fetchAuctionBids(auctionId);
            })
            .catch(error => {
                console.error("There was an error submitting the bid!", error);
                setMessage("There was an error placing your bid. Please try again.");
            });
    };

    const fetchAuctionBids = (auctionId) => {
        axiosInstance.get(`/api/bid/auction/${auctionId}`)
            .then(response => {
                setAuctionBids(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the auction bids!", error);
            });
    };

    const handleFetchAuctionBids = (e) => {
        e.preventDefault();
        fetchAuctionBids(auctionId);
    };

    return (
        <div className="p-8 mt-16 bg-black text-white">
            <h1 className="text-4xl font-bold mb-4 text-orange-500">Bidding Page</h1>

            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-2">Place Your Bid</h2>
                <form onSubmit={handleBidSubmit}>
                    <input
                        type="text"
                        placeholder="Auction ID"
                        value={auctionId}
                        onChange={handleAuctionIdChange}
                        className="w-full p-2 border rounded bg-gray-700 text-white mb-4"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Bid Amount"
                        value={bidAmount}
                        onChange={handleBidAmountChange}
                        className="w-full p-2 border rounded bg-gray-700 text-white mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-orange-600"
                    >
                        Place Bid
                    </button>
                </form>
                {/* Display message here */}
                {message && (
                    <p className={`mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-2">Fetch Auction Bids</h2>
                <form onSubmit={handleFetchAuctionBids}>
                    <input
                        type="text"
                        placeholder="Auction ID"
                        value={auctionId}
                        onChange={handleAuctionIdChange}
                        className="w-full p-2 border rounded bg-gray-700 text-white mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-orange-600"
                    >
                        Fetch Bids
                    </button>
                </form>
                <ul className="mt-4">
                    {auctionBids.map(bid => (
                        <li key={bid.id} className="mb-2">
                            <p>Bidder: {bid.bidderId}</p>
                            <p>Amount: CAD ${bid.amount}</p>
                            <p>Date: {new Date(bid.bidTime).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-2">Your Bids</h2>
                <ul>
                    {userBids.map(bid => (
                        <li key={bid.id} className="mb-2">
                            <p>Auction ID: {bid.auctionId}</p>
                            <p>Amount: CAD ${bid.amount}</p>
                            <p>Date: {new Date(bid.bidTime).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Bidding;
