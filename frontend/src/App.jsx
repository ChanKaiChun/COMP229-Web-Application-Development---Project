import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LiveAuction from './pages/LiveAuction.jsx';
import FeaturedAuctions from './pages/FeaturedAuctions.jsx';
import PassResult from './pages/PassResult.jsx';
import SellCar from './pages/SellCar.jsx';
import Community from './pages/Community.jsx';
import Account from './pages/Account.jsx';
import UserInfo from './pages/UserInfo.jsx';
import OwnerAuctions from './pages/OwnerAuctions.jsx';
import AuctionDetails from './pages/AuctionDetails.jsx';
import Home from './pages/Home.jsx';
import CreateAuction from './pages/CreateAuction.jsx';
import UpdateAuctions from './pages/UpdateAuctions.jsx'; // Import UpdateAuctions
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/live-auction" element={<LiveAuction />} />
                        <Route path="/featured-auctions" element={<FeaturedAuctions />} />
                        <Route path="/pass-result" element={<PassResult />} />
                        <Route path="/sell-car" element={<SellCar />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/user-info" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
                        <Route path="/owner-auctions" element={<OwnerAuctions />} />
                        <Route path="/auction/:auctionId" element={<AuctionDetails />} />
                        <Route path="/create-auction" element={<CreateAuction />} />
                        <Route path="/update-auction" element={<UpdateAuctions />} />

                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
