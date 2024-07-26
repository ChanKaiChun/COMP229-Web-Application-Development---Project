import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const CreateAuction = () => {
    const { token } = useContext(AuthContext);
    const [carModel, setCarModel] = useState('');
    const [carMake, setCarMake] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carMileage, setCarMileage] = useState('');
    const [carVin, setCarVin] = useState('');
    const [description, setDescription] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [reservePrice, setReservePrice] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString(); // Convert to ISO 8601 format
        };

        const newAuction = {
            carModel,
            carMake,
            carYear,
            carColor,
            carMileage: parseInt(carMileage, 10),
            carVin,
            description,
            startPrice: parseFloat(startPrice),
            reservePrice: parseFloat(reservePrice),
            startTime: formatDate(startTime),
            endTime: formatDate(endTime)
        };

        axios.post('/api/auction', newAuction, config)
            .then(response => {
                setSuccessMessage('Auction created successfully!');
                setErrorMessage(''); // Clear any previous error messages
                // Optionally redirect or clear form fields here
            })
            .catch(error => {
                setErrorMessage('There was an error creating the auction!');
                setSuccessMessage(''); // Clear any previous success messages
            });
    };

    return (
        <div className="p-8 mt-16 bg-black text-white">
            <h1 className="text-4xl font-bold mb-4 text-orange-500">Create Auction</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Car Model"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    placeholder="Car Make"
                    value={carMake}
                    onChange={(e) => setCarMake(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    placeholder="Car Year"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    placeholder="Car Color"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="number"
                    placeholder="Car Mileage"
                    value={carMileage}
                    onChange={(e) => setCarMileage(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    placeholder="Car VIN"
                    value={carVin}
                    onChange={(e) => setCarVin(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                ></textarea>
                <input
                    type="number"
                    placeholder="Start Price"
                    value={startPrice}
                    onChange={(e) => setStartPrice(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="number"
                    placeholder="Reserve Price"
                    value={reservePrice}
                    onChange={(e) => setReservePrice(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="datetime-local"
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="datetime-local"
                    placeholder="End Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <button
                    type="submit"
                    className="mt-4 bg-orange-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-orange-600"
                >
                    Create Auction
                </button>
                {successMessage && (
                    <p className="mt-4 text-green-500">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="mt-4 text-red-500">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default CreateAuction;
