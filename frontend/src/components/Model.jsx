import React from "react";
import { FiChevronDown } from "react-icons/fi";

const Model = () => {
    return (
        <div className="relative">
            <div className="absolute inset-x-0 top-[15%] text-center">
                <h1 className="text-4xl font-bold text-white">Auction Auto</h1>
                <p className="text-gray-300 text-2xl">
                    Auction your modern enthusiast car — anything cool and exciting from the 1980s to the 2020s.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center text-sm lg:flex-row absolute inset-x-0 bottom-[10%]">
                <a href="https://www.tesla.com/model3/design">
                    <button className="rounded-md bg-gray-800 w-96 lg:w-64 h-10 lg:mx-4 mt-2 text-white hover:bg-gray-700">
                        Custom Order
                    </button>
                </a>
                <a href="https://www.tesla.com/model3/design">
                    <button className="rounded-md bg-gray-600 w-96 lg:w-64 h-10 lg:mx-4 mt-2 text-white hover:bg-gray-500">
                        Existing Inventory
                    </button>
                </a>
            </div>
            <div className="flex justify-center animate-bounce absolute inset-x-0 bottom-[3%]">
                <FiChevronDown size={24} className="text-white" />
            </div>
        </div>
    );
};

export default Model;
