import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // State for user info

    useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem('user')){
            setToken(localStorage.getItem('token'));
            setCurrentUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [token]);

    const login = (newToken, userInfo) => {
        setToken(newToken);
        setCurrentUser(userInfo); // Set user info on login
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userInfo));
    };

    const logout = () => {
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
