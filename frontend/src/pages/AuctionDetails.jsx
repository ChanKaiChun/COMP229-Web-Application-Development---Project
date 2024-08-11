import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext.jsx';

const AuctionDetails = () => {
    const navigate = useNavigate();
    const { auctionId } = useParams();
    const [auction, setAuction] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');

    const { token } = useContext(AuthContext);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get(`/api/auction/${auctionId}`)
            .then(response => {
                setAuction(response.data);
                setIsLoading(false);
                setBidAmount(response.data.currentBid ? (response.data.currentBid.amount + 1).toString() : (response.data.startPrice + 1).toString());
                console.log(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the auction details!", error);
            });
    }, [auctionId]);

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    };

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const min = auction.currentBid ? (auction.currentBid.amount + 1) : (auction.startPrice + 1);
        const bidValue = parseFloat(bidAmount);
        console.log(bidValue);
        if (bidValue >= min) {
            axios.post('/api/bid', { auctionId, amount: bidValue }, config)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error("There was an error submitting the bid!", error);
                });
        } else {
            console.error("Bid amount is not greater than the minimum bid.");
        }
    };

    if (isLoading) {
        return <p>Loading</p>;
    }

    return (
        <div className="p-8 mt-16 bg-black text-white">
            <div className="flex flex-col lg:flex-row">
                <img src={auction.imageUrl} alt={auction.carModel} className="w-full lg:w-1/2 h-80 object-cover" />
                <div className="p-4 lg:w-1/2 flex flex-col justify-between">
                    <h1 className="text-4xl font-bold mb-4 text-orange-500">{auction.carModel} - {auction.carMake}</h1>
                    <p className="mb-4">{auction.description}</p>
                    <p className="text-lg font-semibold mb-4">Starting Price: CAD ${auction.startPrice}</p>
                    <p className="mb-4">Current Highest Bid: CAD ${auction.currentPrice}</p>
                    <p className="mb-4">Reserve Price: CAD ${auction.reservePrice}</p>
                    <p className="mb-4">Car Year: {auction.carYear}</p>
                    <p className="mb-4">Car Color: {auction.carColor}</p>
                    <p className="mb-4">Car Mileage: {auction.carMileage} km</p>
                    <p className="mb-4">Car VIN: {auction.carVin}</p>
                    <p className="mb-4">Start Time: {new Date(auction.startTime).toLocaleString()}</p>
                    <p className="mb-4">End Time: {new Date(auction.endTime).toLocaleString()}</p>

                    {/*Owner Information*/}
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-2">Auction Owner</h2>
                        <p>Name: {auction.owner.name}</p>
                        <p>Contact: {auction.owner.contact}</p>
                        {/* Add more owner details as needed */}
                    </div>

                    {token && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-2">Place Your Bid</h2>
                            <form onSubmit={handleBidSubmit}>
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={handleBidChange}
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
                    )}

                    {auction.currentBid ? (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-2">Current Bids</h2>
                            <ul>
                                <li key={auction.currentBid.id}>
                                    <p>Bidder: {auction.currentBid.bidder.name}</p>
                                    <p>Amount: {auction.currentBid.amount}</p>
                                    <p>Date: {new Date(auction.currentBid.bidTime).toLocaleString()}</p>
                                </li>
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AuctionDetails;
