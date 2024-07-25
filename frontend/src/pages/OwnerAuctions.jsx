// src/pages/OwnerAuctions.jsx
import React, { useState, useEffect } from 'react';
import auctionService from '../services/auctionService.jsx';

const OwnerAuctions = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        auctionService.getOwnerAuctions()
            .then(response => {
                setAuctions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the owner auctions!', error);
            });
    }, []);

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">My Auctions</h1>
            <div className="grid grid-cols-1 gap-6">
                {auctions.map(auction => (
                    <div key={auction.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-orange-500">{auction.carModel}</h2>
                                <p className="mt-2 text-white">{auction.description}</p>
                                <p className="mt-2 text-lg font-semibold text-white">CAD ${auction.currentPrice}</p>
                            </div>
                            <button className="mt-4 bg-white font-semibold text-orange-500 py-2 px-4 rounded transition duration-300 hover:bg-orange-500 hover:text-white">
                                View Details
                            </button>
                        </div>
                        <img src={`path/to/car/images/${auction.carVin}.jpg`} alt={auction.carModel} className="w-1/2 h-80 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OwnerAuctions;
