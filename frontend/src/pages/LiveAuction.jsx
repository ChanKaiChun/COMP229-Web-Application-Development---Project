import React, { useState, useEffect } from "react";
import car1 from "../assets/cars/car1.jpg";
import car2 from "../assets/cars/car2.jpg";
import car3 from "../assets/cars/car3.jpg";
import car4 from "../assets/cars/car4.jpg";
import car5 from "../assets/cars/car5.jpg";
import car6 from "../assets/cars/car6.jpg";

const LiveAuction = () => {
    const auctions = [
        {
            id: 1,
            title: "2004 Subaru WRX STI",
            description: "A rally legend with a powerful turbocharged engine.",
            price: "CAD $35,000",
            image: car1,
            countdown: 3600, // 1 hour
            location: "Toronto, ON",
        },
        {
            id: 2,
            title: "2006 Mitsubishi Lancer Evolution IX",
            description: "A performance icon known for its incredible handling.",
            price: "CAD $40,000",
            image: car2,
            countdown: 7200, // 2 hours
            location: "Vancouver, BC",
        },
        {
            id: 3,
            title: "1999 Nissan Skyline GT-R",
            description: "The legendary GT-R with its RB26DETT engine.",
            price: "CAD $75,000",
            image: car3,
            countdown: 54000, // 15 hours
            location: "Calgary, AB",
        },
        {
            id: 4,
            title: "1997 Toyota Supra MK4",
            description: "An iconic JDM sports car known for its tuning potential.",
            price: "CAD $65,000",
            image: car4,
            countdown: 180000, // 50 hours
            location: "Montreal, QC",
        },
        {
            id: 5,
            title: "McLaren P1",
            description: "A hybrid supercar that delivers breathtaking performance.",
            price: "CAD $2,000,000",
            image: car5,
            countdown: 1200, // 20 minutes
            location: "Toronto, ON",
        },
        {
            id: 6,
            title: "Ferrari 488 GTB",
            description: "A supercar that combines performance and luxury.",
            price: "CAD $300,000",
            image: car6,
            countdown: 300, // 5 minutes
            location: "Vancouver, BC",
        },
    ];

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">Live Auctions</h1>
            <div className="grid grid-cols-1 gap-6">
                {auctions.map((auction) => {
                    const [timeLeft, setTimeLeft] = useState(auction.countdown);

                    useEffect(() => {
                        if (timeLeft > 0) {
                            const timer = setInterval(() => {
                                setTimeLeft(prev => prev - 1);
                            }, 1000);
                            return () => clearInterval(timer);
                        }
                    }, [timeLeft]);

                    const formatTime = (seconds) => {
                        const days = Math.floor(seconds / 86400);
                        const hours = Math.floor((seconds % 86400) / 3600);
                        const minutes = Math.floor((seconds % 3600) / 60);
                        return `${days}d ${hours}h ${minutes}m`;
                    };

                    // Determine background color based on remaining time
                    const getBackgroundColor = () => {
                        if (timeLeft < 10800) return "bg-red-500"; // Less than 3 hours
                        if (timeLeft < 86400) return "bg-yellow-500"; // 3 to 24 hours
                        return "bg-green-500"; // More than 24 hours
                    };

                    return (
                        <div key={auction.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-orange-500">{auction.title}</h2>
                                    <p className="mt-2 text-white">{auction.description}</p>
                                    <p className="mt-2 text-lg font-semibold text-white">{auction.price}</p>
                                    <div className={`mt-2 text-sm text-white ${getBackgroundColor()} p-2 rounded`}>
                                        Time Left: {formatTime(timeLeft)}
                                    </div>
                                    <p className="mt-1 text-sm text-gray-400">{auction.location}</p>
                                </div>
                                <button className="mt-4 bg-white font-semibold text-orange-500 py-2 px-4 rounded transition duration-300 hover:bg-orange-500 hover:text-white">
                                    View Details
                                </button>
                            </div>
                            <img src={auction.image} alt={auction.title} className="w-1/2 h-80 object-cover" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LiveAuction;
