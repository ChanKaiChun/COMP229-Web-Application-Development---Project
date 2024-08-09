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

    const [formData, setFormData] = useState({});

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isFetching, setIsFetching] = useState(true); // Start as fetching

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const response = await axios.get(`/api/auction/${id}`, config);
                setFormData(response.data);

                setSuccessMessage('');
                setErrorMessage('');
            } catch (error) {
                setErrorMessage('Failed to fetch auction data');
                setSuccessMessage('');
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
            startTime: formatDate(formData.startTime),
            endTime: formatDate(formData.endTime)
        };

        try {
            await axios.put(`/api/auction`, updatedAuction, config);
            setSuccessMessage('Auction updated successfully!');
            setErrorMessage('');
            setTimeout(() => navigate('/my-auction'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setErrorMessage('There was an error updating the auction!');
            setSuccessMessage('');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this auction?')) {
            console.log("formData: " + JSON.stringify(formData));
            try {
                await axios.delete(`/api/auction/${formData.id}`, config);
                setSuccessMessage('Auction deleted successfully!');
                setErrorMessage('');
                setTimeout(() => navigate('/my-auction'), 2000); // Redirect after 2 seconds
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
                <label>Car Model</label>
                <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Make</label>
                <input
                    type="text"
                    name="carMake"
                    value={formData.carMake}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Year</label>
                <input
                    type="text"
                    name="carYear"
                    value={formData.carYear}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Color</label>
                <input
                    type="text"
                    name="carColor"
                    value={formData.carColor}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car Mileage</label>
                <input
                    type="number"
                    name="carMileage"
                    value={formData.carMileage}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Car VIN</label>
                <input
                    type="text"
                    name="carVin"
                    value={formData.carVin}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                ></textarea>
                <label>Start Price</label>
                <input
                    type="number"
                    name="startPrice"
                    value={formData.startPrice}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Reserve Price</label>
                <input
                    type="number"
                    name="reservePrice"
                    value={formData.reservePrice}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Current Price</label>
                <input
                    type="number"
                    name="currentPrice"
                    value={formData.currentBid?(formData.currentBid.amount):(formData.startPrice)}
                    disabled={true}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>Start Time</label>
                <input
                    type="datetime-local"
                    name="startTime"
                    value={new Date(formData.startTime).toISOString().slice(0, 16)}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                <label>End Time</label>
                <input
                    type="datetime-local"
                    name="endTime"
                    value={new Date(formData.endTime).toISOString().slice(0, 16)}
                    onChange={handleChange}
                    className="p-2 border rounded bg-gray-700 text-white"
                    required
                />
                {(() => {
                    if (formData.winner) {
                        return <><label>Winner Name</label>
                        <input
                            type="text"
                            name=""
                            value={formData.winner.name}
                            onChange={handleChange}
                            className="p-2 border rounded bg-gray-700 text-white"
                        />
                        <label>Winner Contact</label>
                        <input
                            type="text"
                            name=""
                            value={formData.winner.contact}
                            onChange={handleChange}
                            className="p-2 border rounded bg-gray-700 text-white"
                        /></>;
                    }
                })()}
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
