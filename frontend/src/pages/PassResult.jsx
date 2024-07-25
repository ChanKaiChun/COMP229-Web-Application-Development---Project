import React, { useState, useEffect } from "react";
import axios from "axios";

const PassResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/auction/passed")
            .then(response => {
                console.log("Passed auctions data:", response.data);
                setResults(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the passed auctions!", error);
                setError("There was an error fetching the passed auctions.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-white">{error}</p>;
    }

    return (
        <div className="p-8 mt-16 bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">Pass Results</h1>
            <div className="grid grid-cols-1 gap-6">
                {results.length > 0 ? (
                    results.map((result) => (
                        <div key={result.id} className="border rounded-lg overflow-hidden shadow-lg bg-black flex">
                            {/* Adjust the fields according to the provided schema */}
                            <div className="p-4 w-full">
                                <h2 className="text-xl font-bold text-orange-500">{result.carModel} - {result.carMake}</h2>
                                <p className="mt-2 text-white">Year: {result.carYear}</p>
                                <p className="mt-2 text-white">Color: {result.carColor}</p>
                                <p className="mt-2 text-white">Mileage: {result.carMileage}</p>
                                <p className="mt-2 text-white">VIN: {result.carVin}</p>
                                <p className="mt-2 text-white">Description: {result.description}</p>
                                <p className="mt-2 text-white">Start Price: ${result.startPrice}</p>
                                <p className="mt-2 text-white">Reserve Price: ${result.reservePrice}</p>
                                <p className="mt-2 text-white">Current Price: ${result.currentPrice}</p>
                                <p className="mt-2 text-white">Start Time: {new Date(result.startTime).toLocaleString()}</p>
                                <p className="mt-2 text-white">End Time: {new Date(result.endTime).toLocaleString()}</p>
                                <p className="mt-2 text-white">Winner ID: {result.winnerId}</p>
                                <p className="mt-2 text-white">Created Date: {new Date(result.createdDate).toLocaleString()}</p>
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
