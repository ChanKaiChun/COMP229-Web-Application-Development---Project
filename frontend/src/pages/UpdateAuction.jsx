import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAuction = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams(); // Get auction ID from URL

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const [formData, setFormData] = useState({
        id: '',
        carModel: '',
        carMake: '',
        carYear: '',
        carColor: '',
        carMileage: '',
        carVin: '',
        description: '',
        ownerId: '',
        startPrice: '',
        reservePrice: '',
        currentPrice: '',
        startTime: '',
        endTime: '',
        winnerId: '',
        createdDate: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isFetching, setIsFetching] = useState(true); // Start as fetching

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const response = await axios.get(`/api/auction/${id}`, config);
                const auctionData = response.data;

                setFormData({
                    id: auctionData.id,
                    carModel: auctionData.carModel,
                    carMake: auctionData.carMake,
                    carYear: auctionData.carYear,
                    carColor: auctionData.carColor,
                    carMileage: auctionData.carMileage.toString(),
                    carVin: auctionData.carVin,
                    description: auctionData.description,
                    ownerId: auctionData.ownerId,
                    startPrice: auctionData.startPrice.toString(),
                    reservePrice: auctionData.reservePrice.toString(),
                    currentPrice: auctionData.currentPrice.toString(),
                    startTime: new Date(auctionData.startTime).toISOString().slice(0, 16),
                    endTime: new Date(auctionData.endTime).toISOString().slice(0, 16),
                    winnerId: auctionData.winnerId,
                    createdDate: new Date(auctionData.createdDate).toISOString().slice(0, 16),
                });

                setSuccessMessage('');
                setErrorMessage('');
            } catch (error) {
                setErrorMessage('Failed to fetch auction data');
                setSuccessMessage('');
                console.log(error)
            } finally {
                setIsFetching(false);
            }
        };

        fetchAuctionData();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
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

        const updatedAuction = {
            ...formData,
            carMileage: parseFloat(formData.carMileage),
            startPrice: parseFloat(formData.startPrice),
            reservePrice: parseFloat(formData.reservePrice),
            currentPrice: parseFloat(formData.currentPrice),
            startTime: formatDate(formData.startTime),
            endTime: formatDate(formData.endTime),
            createdDate: formatDate(formData.createdDate)
        };

        try {
            await axios.put(`/api/auction/${formData.id}`, updatedAuction, config);
            setSuccessMessage('Auction updated successfully!');
            setErrorMessage('');
            setTimeout(() => navigate('/my-auctions'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setErrorMessage('There was an error updating the auction!');
            setSuccessMessage('');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this auction?')) {
            try {
                await axios.delete(`/api/auction/${formData.id}`, config);
                setSuccessMessage('Auction deleted successfully!');
                setErrorMessage('');
                setTimeout(() => navigate('/my-auctions'), 2000); // Redirect after 2 seconds
            } catch (error) {
                setErrorMessage('There was an error deleting the auction!');
                setSuccessMessage('');
            }
        }
    };

    if (isFetching) return <p>Loading...</p>;

    return (
        <div className="p-8 mt-16 bg-black text-white">
            <h1 className="text-4xl font-bold mb-4 text-orange-500">Update Auction</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="carModel"
                    placeholder="Car Model"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="carMake"
                    placeholder="Car Make"
                    value={formData.carMake}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="carYear"
                    placeholder="Car Year"
                    value={formData.carYear}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="carColor"
                    placeholder="Car Color"
                    value={formData.carColor}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="number"
                    name="carMileage"
                    placeholder="Car Mileage"
                    value={formData.carMileage}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="carVin"
                    placeholder="Car VIN"
                    value={formData.carVin}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                ></textarea>
                <input
                    type="number"
                    name="startPrice"
                    placeholder="Start Price"
                    value={formData.startPrice}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="number"
                    name="reservePrice"
                    placeholder="Reserve Price"
                    value={formData.reservePrice}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="number"
                    name="currentPrice"
                    placeholder="Current Price"
                    value={formData.currentPrice}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="datetime-local"
                    name="startTime"
                    placeholder="Start Time"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="datetime-local"
                    name="endTime"
                    placeholder="End Time"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="winnerId"
                    placeholder="Winner ID"
                    value={formData.winnerId}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                />
                <input
                    type="datetime-local"
                    name="createdDate"
                    placeholder="Created Date"
                    value={formData.createdDate}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="mt-4 bg-orange-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-orange-600"
                    >
                        Update Auction
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-red-600"
                    >
                        Delete Auction
                    </button>
                </div>
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

export default UpdateAuction;
``
