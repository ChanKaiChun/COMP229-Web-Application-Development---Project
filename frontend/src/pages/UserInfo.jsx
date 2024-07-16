import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

const UserInfo = () => {
    const { token, currentUser } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <div className="bg-gray-800 p-4 rounded shadow-md w-96">
                <p>
                    <strong>Email:</strong> {currentUser?.email || 'N/A'}
                </p>
                <p>
                    <strong>First Name:</strong> {currentUser?.firstName || 'N/A'}
                </p>
                <p>
                    <strong>Last Name:</strong> {currentUser?.lastName || 'N/A'}
                </p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
