// src/pages/Home.jsx
import React from 'react';
import BG1 from '../assets/img/BG1.jpg';
import BG2 from '../assets/img/BG2.jpg';
import BG3 from '../assets/img/BG3.jpg';

const Home = () => {
    return (
        <>
            <div
                className="bg-cover bg-center h-screen flex justify-center items-center text-white"
                style={{ backgroundImage: `url(${BG1})` }}
            >
                <div className="bg-black bg-opacity-50 p-4 rounded">
                    <p className="text-3xl whitespace-nowrap">Auction your modern enthusiast car — anything cool and exciting from the 1980s to the 2020s.</p>
                </div>
            </div>
            <div
                className="bg-cover bg-center h-screen flex justify-center items-center text-white"
                style={{ backgroundImage: `url(${BG2})` }}
            >
                <div className="bg-black bg-opacity-50 p-4 rounded">
                    <p className="text-3xl whitespace-nowrap">Buyers pay a 4.5% commission, capped at $4,500. Sellers list for free and receive 100% of the sale price.</p>
                </div>
            </div>
            <div
                className="bg-cover bg-center h-screen flex justify-center items-center text-white"
                style={{ backgroundImage: `url(${BG3})` }}
            >
                <div className="bg-black bg-opacity-50 p-4 rounded">
                    <p className="text-3xl whitespace-nowrap">We provide vehicle history reports for every vehicle listed on AUCTION AUTO — for free.</p>
                </div>
            </div>
        </>
    );
};

export default Home;
