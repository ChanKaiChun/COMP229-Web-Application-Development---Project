import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const CreateAuction = () => {
    // State for form fields
    const [carModel, setCarModel] = useState('');
    const [carMake, setCarMake] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carMileage, setCarMileage] = useState(0);
    const [carVin, setCarVin] = useState('');
    const [description, setDescription] = useState('');
    const [startPrice, setStartPrice] = useState(0);
    const [reservePrice, setReservePrice] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // API call to create auction
            const response = await axios.post('api/auction', {
                carModel,
                carMake,
                carYear,
                carColor,
                carMileage: Number(carMileage), // Ensure the value is a number
                carVin,
                description,
                startPrice: Number(startPrice), // Ensure the value is a number
                reservePrice: Number(reservePrice), // Ensure the value is a number
                startTime,
                endTime,
            });

            // Log response for debugging
            console.log('Response from server:', response.data);

            // Handle success with response data
            setMessage(`Auction created successfully! Response: ${response.data.message}`);

            // Clear the form
            setCarModel('');
            setCarMake('');
            setCarYear('');
            setCarColor('');
            setCarMileage(0);
            setCarVin('');
            setDescription('');
            setStartPrice(0);
            setReservePrice(0);
            setStartTime('');
            setEndTime('');
        } catch (err) {
            // Log error for debugging
            console.error('Error creating auction:', err);

            // Handle error
            setError('An error occurred while creating the auction. Please try again.');
            if (err.response) {
                console.error('Error response from server:', err.response.data);
            }
        }
    };

    return (
        <div className="p-8 mt-16 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-6">Create Auction</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="carModel" className="block text-sm font-medium mb-1">Car Model</label>
                    <input
                        type="text"
                        id="carModel"
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="carMake" className="block text-sm font-medium mb-1">Car Make</label>
                    <input
                        type="text"
                        id="carMake"
                        value={carMake}
                        onChange={(e) => setCarMake(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="carYear" className="block text-sm font-medium mb-1">Car Year</label>
                    <input
                        type="text"
                        id="carYear"
                        value={carYear}
                        onChange={(e) => setCarYear(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="carColor" className="block text-sm font-medium mb-1">Car Color</label>
                    <input
                        type="text"
                        id="carColor"
                        value={carColor}
                        onChange={(e) => setCarColor(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="carMileage" className="block text-sm font-medium mb-1">Car Mileage</label>
                    <input
                        type="number"
                        id="carMileage"
                        value={carMileage}
                        onChange={(e) => setCarMileage(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="carVin" className="block text-sm font-medium mb-1">Car VIN</label>
                    <input
                        type="text"
                        id="carVin"
                        value={carVin}
                        onChange={(e) => setCarVin(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startPrice" className="block text-sm font-medium mb-1">Start Price</label>
                    <input
                        type="number"
                        id="startPrice"
                        value={startPrice}
                        onChange={(e) => setStartPrice(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="reservePrice" className="block text-sm font-medium mb-1">Reserve Price</label>
                    <input
                        type="number"
                        id="reservePrice"
                        value={reservePrice}
                        onChange={(e) => setReservePrice(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startTime" className="block text-sm font-medium mb-1">Start Time</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endTime" className="block text-sm font-medium mb-1">End Time</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Create Auction
                </button>
                {message && <p className="mt-4 text-green-400">{message}</p>}
                {error && <p className="mt-4 text-red-400">{error}</p>}
            </form>
        </div>
    );
};

export default CreateAuction;
