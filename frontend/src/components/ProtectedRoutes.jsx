import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext.jsx";


const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/account" />;
    }

    return children;
};

export default ProtectedRoute;
