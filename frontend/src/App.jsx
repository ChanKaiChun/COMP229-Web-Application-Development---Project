import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BG1 from './assets/img/BG1.jpg';
import BG2 from './assets/img/BG2.jpg';
import BG3 from './assets/img/BG3.jpg';
import LiveAuction from './pages/LiveAuction.jsx';
import FeaturedAuctions from './pages/FeaturedAuctions.jsx';
import PassResult from './pages/PassResult.jsx';
import SellCar from './pages/SellCar.jsx';
import Community from './pages/Community.jsx';
import Account from './pages/Account.jsx';


function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/live-auction" element={<LiveAuction />} />
                    <Route path="/featured-auctions" element={<FeaturedAuctions />} />
                    <Route path="/pass-result" element={<PassResult />} />
                    <Route path="/sell-car" element={<SellCar />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/account" element={<Account />} /> {/* Add the Account route */}
                    <Route path="/" element={
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
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
