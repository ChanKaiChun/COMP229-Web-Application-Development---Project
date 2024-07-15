import React from 'react';

const SellCar = () => {
    return (
        <div className="p-8 mt-16"> {/* Add margin-top to push content below the navbar */}
            <h1 className="text-4xl font-bold mb-6">Sell on AUCTION AUTO!</h1>
            <p className="text-2xl mb-4">More money, fewer headaches.</p>
            <p className="text-2xl mb-4">9 out of 10 sellers strongly recommend!</p>
            <p className="text-2xl mb-4">Live support</p>
            <p className="text-lg mb-6">Live support from listing to post-sale</p>

            <h2 className="text-3xl font-bold mb-4">Faster</h2>
            <p className="mb-4">Sell your car faster and go from submission to auction in under a week.</p>

            <h2 className="text-3xl font-bold mb-4">Huge audience</h2>
            <p className="mb-4">Access our huge audience of engaged enthusiasts.</p>

            <h2 className="text-3xl font-bold mb-4">Sell for free</h2>
            <p className="mb-6">Sell for free and receive 100% of the sale price.</p>

            <h2 className="text-3xl font-bold mb-6">Our customers love us!</h2>
            <p>Apply in minutes and we’ll respond within a day.</p>

            <h2 className="text-3xl font-bold mt-8 mb-4">Why Auction Auto?</h2>
            <ul className="list-disc list-inside mb-6">
                <li>20,000+ Auctions completed</li>
                <li>83%+ Sell-through rate</li>
                <li>$460M+ Value of cars sold</li>
                <li>565k+ Registered members</li>
                <li>9 out of 10 Sellers strongly recommend Auction Auto</li>
                <li>1.1M+ Social media followers, and more from Doug DeMuro’s engaged audience</li>
            </ul>

            <h2 className="text-3xl font-bold mt-8 mb-4">Recent Sales</h2>
            <ul className="list-disc list-inside mb-6">
                <li>1988 Lamborghini Countach LP5000 Quattrovalvole Sold for $675,000</li>
                <li>2001 Audi RS4 Avant Sold for $86,500</li>
                <li>2023 Rivian R1S Launch Edition Sold for $103,001</li>
                <li>1989 Honda Acty SDX Sold for $28,000</li>
            </ul>

            <h2 className="text-3xl font-bold mt-8 mb-4">Our Auctions</h2>
            <p className="mb-4">Reserve Auction: A reserve auction has a secret minimum price that you’ll accept in order to sell your car. If your reserve isn't met, the car does not sell. We'll work with you to agree on a fair reserve price during the submission process.</p>
            <p className="mb-6">No Reserve Auction: An auction without a reserve means that the car will sell to the highest bidder at the end of the auction regardless of price. We've found that cars offered with no reserve get more bids, more interest, and more attention.</p>

            <h2 className="text-3xl font-bold mt-8 mb-4">How it works</h2>
            <ul className="list-disc list-inside mb-6">
                <li>You submit information about your vehicle.</li>
                <li>We’ll let you know if your car is accepted.</li>
                <li>If accepted, we’ll ask you for more information and photos of your car.</li>
                <li>We work with you to create a listing page that describes your vehicle.</li>
                <li>We’ll also ask for your scheduling preference.</li>
                <li>Your listing will be featured for a week.</li>
                <li>When your car sells, we’ll connect you with the high bidder so you can complete the transaction!</li>
            </ul>

            <p className="text-lg">Learn more about how selling works on Auction Auto.</p>
        </div>
    );
};

export default SellCar;
