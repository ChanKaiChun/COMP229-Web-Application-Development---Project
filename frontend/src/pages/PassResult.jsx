import React from "react";
import car1 from "../assets/cars/car1.jpg";
import car2 from "../assets/cars/car2.jpg";
import car3 from "../assets/cars/car3.jpg";
import car4 from "../assets/cars/car4.jpg";
import car5 from "../assets/cars/car5.jpg";

const PassResults = () => {
    const results = [
        {
            id: 1,
            title: "2004 Subaru WRX STI",
            highestBid: "CAD $34,000",
            image: car1,
            comments: [
                "Amazing car, too bad I couldn't win!",
                "I was willing to go higher, but missed it.",
                "This was a steal at this price!",
                "I love the color on this one!",
                "Subaru enthusiasts will appreciate this!",
            ],
        },
        {
            id: 2,
            title: "2006 Mitsubishi Lancer Evolution IX",
            highestBid: "CAD $39,500",
            image: car2,
            comments: [
                "Great performance car, well worth the price.",
                "Regret not bidding higher!",
                "Congrats to the winner!",
                "This car is a legend in the making!",
                "Wish I had more time to save up!",
            ],
        },
        {
            id: 3,
            title: "1999 Nissan Skyline GT-R",
            highestBid: "CAD $74,000",
            image: car3,
            comments: [
                "Such a legendary car!",
                "I've always wanted one of these.",
                "Wish I had more funds to bid!",
                "The RB26 engine is a masterpiece!",
                "This will be a collector's item for sure!",
            ],
        },
        {
            id: 4,
            title: "1997 Toyota Supra MK4",
            highestBid: "CAD $60,000",
            image: car4,
            comments: [
                "The best JDM car ever!",
                "Why are these prices so high?",
                "Super clean example!",
                "This car defined a generation!",
                "So hard to find in this condition!",
            ],
        },
        {
            id: 5,
            title: "2005 Honda S2000",
            highestBid: "CAD $24,000",
            image: car5,
            comments: [
                "Perfect balance of power and handling.",
                "Missed my chance on this one.",
                "A classic that's hard to find!",
                "The driving experience is unmatched!",
                "Such a fun car to drive on the track!",
            ],
        },
    ];

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">Pass Results</h1>
            <div className="grid grid-cols-1 gap-6">
                {results.map((result) => (
                    <div key={result.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                        <img src={result.image} alt={result.title} className="w-1/2 h-full object-cover" />
                        <div className="p-4 w-1/2">
                            <h2 className="text-xl font-bold text-orange-500">{result.title}</h2>
                            <p className="mt-2 text-white text-2xl font-bold">Highest Bid: {result.highestBid}</p>
                            <h3 className="mt-4 text-lg font-semibold text-white">Comments:</h3>
                            <ul className="mt-2 text-gray-400">
                                {result.comments.map((comment, index) => (
                                    <li key={index} className="mt-1">- {comment}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PassResults;
