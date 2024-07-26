import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config'; // Adjust the import path if needed

const UpdateAuctions = () => {
    const [auctionData, setAuctionData] = useState(null);
    const [error, setError] = useState(null);
    const [auctionId, setAuctionId] = useState('1'); // Define auctionId here (example value)

    // Log the API URL for debugging
    console.log('API_URL in UpdateAuctions:', API_URL);

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                // Construct the API URL for the request
                const url = `${API_URL}/api/auction/update/${auctionId}`; // Use auctionId here

                // Log the request URL for debugging
                console.log('Fetching data from URL:', url);

                const response = await axios.get(url);
                setAuctionData(response.data);
            } catch (err) {
                console.error('Error fetching auction data:', err);
                setError(err);
            }
        };

        fetchAuctionData();
    }, [auctionId]); // Add auctionId to dependencies array if it's updated dynamically

    return (
        <div className="relative">
            {/* Error message container */}
            {error && (
                <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-4 z-50">
                    <p>Error: {error.message}</p>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-4">Update Auctions</h1>
            {auctionData ? (
                <pre className="bg-gray-100 p-4 border rounded">{JSON.stringify(auctionData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateAuctions;
