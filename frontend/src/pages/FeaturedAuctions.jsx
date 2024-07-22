import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

const FeaturedAuctions = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        axios.get("/api/auction/featured")
            .then(response => {
                console.log("Featured auctions data:", response.data);
                setAuctions(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the featured auctions!", error);
            });
    }, []);

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">Featured Auctions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                    <div key={auction.id} className="border rounded-lg overflow-hidden shadow-lg bg-black">
                        <img
                            src={auction.imageUrl}
                            alt={auction.title}
                            className="w-full h-52 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-orange-500">{auction.title}</h2>
                            <p className="mt-2 text-white">{auction.description}</p>
                            <p className="mt-2 text-lg font-semibold text-white">{auction.price}</p>
                            <p className="mt-2 text-sm text-white">{auction.details}</p>
                            <p className="mt-1 text-sm text-gray-400">{auction.location}</p>
                            <Link to={`/auction/${auction.id}`}>
                                <button className="mt-4 bg-white font-semibold text-orange-500 py-2 px-4 rounded transition duration-300 hover:bg-orange-500 hover:text-white">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedAuctions;
