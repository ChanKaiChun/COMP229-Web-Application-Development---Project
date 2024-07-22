import React, { useState, useContext } from "react";
import { TfiClose } from "react-icons/tfi";
import logo from "../assets/img/AA.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx"; // Import AuthContext

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { token } = useContext(AuthContext); // Access the token from AuthContext

  const handleNav = () => {
    setNav(!nav);
  };

  return (
      <div>
        <div className="fixed top-0 w-full bg-black bg-opacity-70 z-10">
          <div className="flex justify-between items-center font-bold px-12 p-4 text-sm">
            <div>
              <Link to="/">
                <img className="h-10 rounded-lg" src={logo} alt="Website logo" />
              </Link>
            </div>
            <div className="hidden lg:flex items-center">
              <ul className="flex justify-center hover:cursor-pointer">
                <li className="py-1 px-3 hover:rounded hover:bg-black/50">
                  <Link to="/live-auction">Live Auctions</Link>
                </li>
                <li className="py-1 px-3 hover:rounded hover:bg-black/50">
                  <Link to="/featured-auctions">Featured Auctions</Link>
                </li>
                <li className="py-1 px-3 hover:rounded hover:bg-black/50">
                  <Link to="/pass-result">Pass Result</Link>
                </li>
                <li className="py-1 px-3 hover:rounded hover:bg-black/50">
                  <Link to="/sell-car">Sell a Car</Link>
                </li>
                {token && ( // Conditionally render the button
                    <li className="py-1 px-3 hover:rounded hover:bg-black/50">
                      <Link to="/create-auction">Create Auction</Link>
                    </li>
                )}
              </ul>
            </div>
            <div className="hidden lg:inline">
              <ul className="flex justify-center hover:cursor-pointer">
                <li className="py-1 px-3 hover:rounded hover:bg-black/50">
                  <Link to="/account">Account</Link>
                </li>
                <li onClick={handleNav} className="py-1 px-3 hover:rounded hover:bg-black/50">
                  Menu
                </li>
              </ul>
            </div>
            <div className="lg:hidden">
              <button
                  onClick={handleNav}
                  className="inline-flex items-center rounded-md py-2 px-4 p-2 text-sm font-medium bg-black/50 text-white hover:bg-black/70"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
        <div
            className={
              nav
                  ? "fixed top-16 right-0 w-80 h-full z-20 bg-black bg-opacity-70"
                  : "fixed right-[-100%]"
            }
        >
          <div className="flex justify-end pr-8 pt-8">
            <TfiClose
                onClick={handleNav}
                className="rounded p-1 hover:bg-black/5 text-white"
                size={28}
            />
          </div>
          <div className="pt-8 px-6 h-full">
            <ul>
              <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                <Link to="/live-auction" onClick={handleNav}>Live Auctions</Link>
              </li>
              <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                <Link to="/featured-auctions" onClick={handleNav}>Featured Auctions</Link>
              </li>
              <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                <Link to="/pass-result" onClick={handleNav}>Pass Result</Link>
              </li>
              <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                <Link to="/sell-car" onClick={handleNav}>Sell a Car</Link>
              </li>
              <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                <Link to="/community" onClick={handleNav}>Community</Link>
              </li>
              <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                <Link to="/shop" onClick={handleNav}>Shop</Link>
              </li>
              <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                <Link to="/account" onClick={handleNav}>Account</Link>
              </li>
              {token && ( // Conditionally render the button in mobile menu
                  <li className="py-3 pl-3 hover:rounded hover:bg-black/50">
                    <Link to="/create-auction" onClick={handleNav}>Create Auction</Link>
                  </li>
              )}
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
