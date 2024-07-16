import React from 'react';

const TestEnv = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    return (
        <div>
            <p>API_URL: {API_URL}</p>
        </div>
    );
};

export default TestEnv;
