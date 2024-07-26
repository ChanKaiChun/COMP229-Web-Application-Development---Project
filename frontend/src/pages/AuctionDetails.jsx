import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuctionDetails = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState({});
    const [bidAmount, setBidAmount] = useState('');
    const [bids, setBids] = useState([]);
    const [userBid, setUserBid] = useState(null);
    const [owner, setOwner] = useState({});

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        // Fetch auction details
        axios.get(`/api/auction/${auctionId}`)
            .then(response => {
                setAuction(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the auction details!", error);
            });


        // Fetch existing bids
        axios.get(`/api/bid/auction/${auctionId}`)
            .then(response => {
                setBids(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the bids!", error);
            });

        // Fetch user's bid on this auction
        axios.get(`/api/bid/me`)
            .then(response => {
                const userBids = response.data.filter(bid => bid.auctionId === auctionId);
                if (userBids.length > 0) {
                    setUserBid(userBids[0]);
                }
            })
            .catch(error => {
                console.error("There was an error fetching user's bids!", error);
            });

        // Fetch auction owner information
        axios.get(`/api/auction/owner/${auctionId}`)
            .then(response => {
                setOwner(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the auction owner information!", error);
            });

    }, [auctionId]);

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    };

    const handleBidSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/bid', { auctionId, amount: bidAmount })
            .then(response => {
                // Update bids list
                setBids(prevBids => [...prevBids, response.data]);
                setBidAmount('');
            })
            .catch(error => {
                console.error("There was an error submitting the bid!", error);
            });
    };

    const minBidAmount = auction.currentPrice ? auction.currentPrice + 1 : 0;

    return (
        <div className="p-8 mt-16 bg-black text-white">
            <div className="flex flex-col lg:flex-row">
                <img src={auction.imageUrl} alt={auction.title} className="w-full lg:w-1/2 h-80 object-cover" />
                <div className="p-4 lg:w-1/2 flex flex-col justify-between">
                    <h1 className="text-4xl font-bold mb-4 text-orange-500">{auction.title}</h1>
                    <p className="mb-4">{auction.description}</p>
                    <p className="text-lg font-semibold mb-4">Starting Price: CAD ${auction.startingPrice}</p>
                    <p className="mb-4">Current Highest Bid: CAD ${auction.currentPrice}</p>
                    <p className="mb-4">Location: {auction.location}</p>
                    <p className="mb-4">End Time: {new Date(auction.endTime).toLocaleString()}</p>

                    {/* Owner Information */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-2">Auction Owner</h2>
                        <p>Name: {owner.name}</p>
                        <p>Contact: {owner.contactInfo}</p>
                        {/* Add more owner details as needed */}
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-2">Place Your Bid</h2>
                        <form onSubmit={handleBidSubmit}>
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={handleBidChange}
                                min={minBidAmount} // Set the minimum bid amount
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                required
                            />
                            <button
                                type="submit"
                                className="mt-4 bg-orange-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-orange-600"
                            >
                                Place Bid
                            </button>
                        </form>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-2">Current Bids</h2>
                        <ul>
                            {bids.map(bid => (
                                <li key={bid.id} className="mb-2">
                                    <p>Bidder: {bid.bidderName}</p>
                                    <p>Amount: CAD ${bid.amount}</p>
                                    <p>Date: {new Date(bid.timestamp).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionDetails;
