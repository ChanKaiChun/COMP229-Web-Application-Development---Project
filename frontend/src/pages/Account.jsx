import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import authService from "../services/authService.js";

const Account = () => {
    // State variables
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);

    // Toggle between Login and Register form
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // Handle registration
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.register({ email, password, firstName, lastName });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login({ email, password });
            localStorage.setItem('token', response.data.token);
            login(response.data.token);
            setMessage('Login successful');
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border rounded bg-gray-700 text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border rounded bg-gray-700 text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-full p-2 border rounded bg-gray-700 text-white"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1" htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="w-full p-2 border rounded bg-gray-700 text-white"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                {message && <p className="mt-4 text-red-400">{message}</p>}
                <button onClick={toggleForm} className="w-full bg-gray-600 text-white py-2 mt-4 rounded">
                    {isLogin ? 'Switch to Register' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
};

export default Account;
