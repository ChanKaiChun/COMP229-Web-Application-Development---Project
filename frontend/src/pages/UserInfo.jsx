import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const { token, currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
       if(token) {
           logout();
           navigate('/account');
       }
    };

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
                <button
                    onClick={handleLogout}
                    className="ml-4 mt-4 bg-red-600 text-white py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
