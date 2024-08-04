import React, {createContext, useContext, useEffect, useState} from 'react';
import {useBlocker} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState(""); // State for user info

    useEffect(() => {
        const local_token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (local_token && user) {
            console.log(user);
            console.log(local_token)
            setToken(local_token);
            setCurrentUser(user);
        }
    });

    const login = (newToken, userInfo) => {
        console.log("Logging in with token:", newToken); // Log the token being set
        setToken(newToken);
        setCurrentUser(userInfo); // Set user info on login
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userInfo));
    };

    const logout = () => {
        console.log("Logging out..."); // Log when logging out
        setToken(null);
        setCurrentUser(null); // Clear user info on logout
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ token, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
