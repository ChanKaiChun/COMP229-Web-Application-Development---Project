import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const MyAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const [timeLefts, setTimeLefts] = useState([]);
    const { token } = useContext(AuthContext);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get("/api/auction/my-auction", config)
            .then(response => {
                console.log("Auctions data:", response.data);
                setAuctions(response.data);

                // Initialize timeLefts with the calculated initial times
                const initialTimeLefts = response.data.map(auction => {
                    const endTime = new Date(auction.endTime).getTime();
                    const currentTime = new Date().getTime();
                    return (endTime - currentTime) / 1000;
                });
                setTimeLefts(initialTimeLefts);
            })
            .catch(error => {
                console.error("There was an error fetching the auctions!", error);
            });
    }, [token]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLefts(prevTimeLefts => prevTimeLefts.map(timeLeft => timeLeft - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${days}d ${hours}h ${minutes}m`;
    };

    const getBackgroundColor = (timeLeft) => {
        if (timeLeft < 10800) return "bg-red-500"; // Less than 3 hours
        if (timeLeft < 86400) return "bg-yellow-500"; // 3 to 24 hours
        return "bg-green-500"; // More than 24 hours
    };

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">My Auctions</h1>

            {/* Live Auctions */}
            <h2 className="text-2xl font-bold mb-4 text-green-500">Live Auctions</h2>
            <div className="grid grid-cols-1 gap-6 mb-8">
                {auctions.map((auction, index) => {
                    const now = new Date();
                    const startTime = new Date(auction.startTime);
                    const endTime = new Date(auction.endTime);
                    const timeLeft = (endTime - now) / 1000;

                    if (startTime <= now && endTime >= now) {
                        return (
                            <div key={auction.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-orange-500">{auction.carModel}</h2>
                                        <p className="mt-2 text-white">{auction.description}</p>
                                        <p className="mt-2 text-lg font-semibold text-white">CAD ${auction.currentPrice}</p>
                                        <div className={`mt-2 text-sm text-white ${getBackgroundColor(timeLeft)} p-2 rounded`}>
                                            Time Left: {formatTime(timeLeft)}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-400">{auction.location}</p>
                                    </div>
                                    <Link to={`/auction/${auction.id}`} className="mt-4 bg-white font-semibold text-orange-500 py-2 px-4 rounded transition duration-300 hover:bg-orange-500 hover:text-white">
                                        View Details
                                    </Link>
                                    <Link to={`/update-auction/${auction.id}`} className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 hover:bg-blue-700">
                                        Edit
                                    </Link>
                                </div>
                                <img src={`path/to/car/images/${auction.carVin}.jpg`} alt={auction.carModel} className="w-1/2 h-80 object-cover" />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Featured Auctions */}
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">Featured Auctions</h2>
            <div className="grid grid-cols-1 gap-6 mb-8">
                {auctions.map((auction) => {
                    const now = new Date();
                    const startTime = new Date(auction.startTime);

                    if (startTime > now) {
                        return (
                            <div key={auction.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-orange-500">{auction.carModel}</h2>
                                        <p className="mt-2 text-white">{auction.description}</p>
                                        <p className="mt-2 text-lg font-semibold text-white">CAD ${auction.currentPrice}</p>
                                        <div className="mt-2 text-sm text-white bg-yellow-500 p-2 rounded">
                                            Upcoming
                                        </div>
                                        <p className="mt-1 text-sm text-gray-400">{auction.location}</p>
                                    </div>
                                    <Link to={`/auction/${auction.id}`} className="mt-4 bg-white font-semibold text-orange-500 py-2 px-4 rounded transition duration-300 hover:bg-orange-500 hover:text-white">
                                        View Details
                                    </Link>
                                    <Link to={`/update-auction/${auction.id}`} className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 hover:bg-blue-700">
                                        Edit
                                    </Link>
                                </div>
                                <img src={`path/to/car/images/${auction.carVin}.jpg`} alt={auction.carModel} className="w-1/2 h-80 object-cover" />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Passed Auctions */}
            <h2 className="text-2xl font-bold mb-4 text-red-500">Passed Auctions</h2>
            <div className="grid grid-cols-1 gap-6">
                {auctions.map((auction) => {
                    const now = new Date();
                    const endTime = new Date(auction.endTime);

                    if (endTime < now) {
                        return (
                            <div key={auction.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-orange-500">{auction.carModel}</h2>
                                        <p className="mt-2 text-white">{auction.description}</p>
                                        <p className="mt-2 text-lg font-semibold text-white">CAD ${auction.currentPrice}</p>
                                        <div className="mt-2 text-sm text-white bg-red-500 p-2 rounded">
                                            Passed
                                        </div>
                                        <p className="mt-1 text-sm text-gray-400">{auction.location}</p>
                                    </div>
                                    <Link to={`/auction/${auction.id}`} className="mt-4 bg-white font-semibold text-orange-500 py-2 px-4 rounded transition duration-300 hover:bg-orange-500 hover:text-white">
                                        View Details
                                    </Link>
                                    <Link to={`/update-auction/${auction.id}`} className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 hover:bg-blue-700">
                                        Edit
                                    </Link>
                                </div>
                                <img src={`path/to/car/images/${auction.carVin}.jpg`} alt={auction.carModel} className="w-1/2 h-80 object-cover" />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default MyAuction;
