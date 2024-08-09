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
                <label>Car Model</label>
                <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Make</label>
                <input
                    type="text"
                    value={carMake}
                    onChange={(e) => setCarMake(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Year</label>
                <input
                    type="text"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Color</label>
                <input
                    type="text"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Mileage</label>
                <input
                    type="number"
                    value={carMileage}
                    onChange={(e) => setCarMileage(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car VIN</label>
                <input
                    type="text"
                    value={carVin}
                    onChange={(e) => setCarVin(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                ></textarea>
                <label>Start Price</label>
                <input
                    type="number"
                    value={startPrice}
                    onChange={(e) => setStartPrice(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Reserve Price</label>
                <input
                    type="number"
                    value={reservePrice}
                    onChange={(e) => setReservePrice(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Start Time</label>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>End Time</label>
                <input
                    type="datetime-local"
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
