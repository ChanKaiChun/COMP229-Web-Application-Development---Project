import React, { createContext, useState } from 'react';

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // State for user info

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
