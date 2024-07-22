import React, { useState, useEffect } from "react";
import axios from "axios";

const PassResults = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get("/api/auction/passed")
            .then(response => {
                console.log("Passed auctions data:", response.data);
                setResults(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the passed auctions!", error);
            });
    }, []);

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">Pass Results</h1>
            <div className="grid grid-cols-1 gap-6">
                {results.length > 0 ? (
                    results.map((result) => (
                        <div key={result.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                            <img
                                src={result.imageUrl}
                                alt={result.title}
                                className="w-1/2 h-full object-cover"
                            />
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
                    ))
                ) : (
                    <p className="text-white">No results available.</p>
                )}
            </div>
        </div>
    );
};

export default PassResults;
