import React from "react";
import car1 from "../assets/cars/car1.jpg";
import car2 from "../assets/cars/car2.jpg";
import car3 from "../assets/cars/car3.jpg";
import car4 from "../assets/cars/car4.jpg";
import car5 from "../assets/cars/car5.jpg";
import car6 from "../assets/cars/car6.jpg";
import car7 from "../assets/cars/car7.jpg";
import car8 from "../assets/cars/car8.jpg"; // Honda S2000
import car9 from "../assets/cars/car9.jpg";
import car10 from "../assets/cars/car10.jpg";

const FeaturedAuctions = () => {
    const auctions = [
        {
            id: 1,
            title: "2004 Subaru WRX STI",
            description: "A rally legend with a powerful turbocharged engine.",
            price: "CAD $35,000",
            image: car1,
            details: "7,242 km, 2 Owners, Fully Loaded, Mint Condition",
            location: "Toronto, ON",
        },
        {
            id: 2,
            title: "2006 Mitsubishi Lancer Evolution IX",
            description: "A performance icon known for its incredible handling.",
            price: "CAD $40,000",
            image: car2,
            details: "13,358 km, 1 Owner, Extensive Service History",
            location: "Vancouver, BC",
        },
        {
            id: 3,
            title: "1999 Nissan Skyline GT-R",
            description: "The legendary GT-R with its RB26DETT engine.",
            price: "CAD $75,000",
            image: car3,
            details: "19,312 km, Rare Model, Original Condition",
            location: "Calgary, AB",
        },
        {
            id: 4,
            title: "1991 Nissan Silvia S13",
            description: "A classic drift car, beloved by enthusiasts.",
            price: "CAD $22,000",
            image: car4,
            details: "88,514 km, Modified for Drifting, Great Condition",
            location: "Ottawa, ON",
        },
        {
            id: 5,
            title: "1997 Toyota Supra MK4",
            description: "An iconic JDM sports car known for its tuning potential.",
            price: "CAD $65,000",
            image: car5,
            details: "48,280 km, 1 Owner, Turbocharged, Well Maintained",
            location: "Montreal, QC",
        },
        {
            id: 6,
            title: "1998 Honda Civic Type R",
            description: "A lightweight and agile hatchback, perfect for enthusiasts.",
            price: "CAD $30,000",
            image: car6,
            details: "40,233 km, Rare Type R Edition, Excellent Condition",
            location: "Halifax, NS",
        },
        {
            id: 7,
            title: "2000 Mazda RX-7",
            description: "A lightweight sports car known for its rotary engine.",
            price: "CAD $40,000",
            image: car7,
            details: "35,405 km, 1 Owner, Completely Stock",
            location: "Victoria, BC",
        },
        {
            id: 8,
            title: "2005 Honda S2000",
            description: "A timeless roadster with a high-revving engine.",
            price: "CAD $25,000",
            image: car8,
            details: "28,968 km, 2 Owners, New Tires, Fresh Service",
            location: "Edmonton, AB",
        },
        {
            id: 9,
            title: "2003 Toyota MR2 Spyder",
            description: "A mid-engine roadster that offers an exhilarating drive.",
            price: "CAD $22,500",
            image: car9,
            details: "25,749 km, Manual Transmission, Immaculate Condition",
            location: "Winnipeg, MB",
        },
        {
            id: 10,
            title: "1999 Subaru Impreza 2.5RS",
            description: "A sporty coupe with rally heritage.",
            price: "CAD $18,000",
            image: car10,
            details: "64,374 km, Rally-inspired, Full Service History",
            location: "Saskatoon, SK",
        },
    ];

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">Featured Auctions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                    <div key={auction.id} className="border rounded-lg overflow-hidden shadow-lg bg-black">
                        <img src={auction.image} alt={auction.title} className="w-full h-52 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-orange-500">{auction.title}</h2>
                            <p className="mt-2 text-white">{auction.description}</p>
                            <p className="mt-2 text-lg font-semibold text-white">{auction.price}</p>
                            <p className="mt-2 text-sm text-white">{auction.details}</p>
                            <p className="mt-1 text-sm text-gray-400">{auction.location}</p>
                            <button className="mt-4 bg-white font-semibold text-orange-500 py-2 px-4 rounded transition duration-300 hover:bg-orange-500 hover:text-white">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedAuctions;
