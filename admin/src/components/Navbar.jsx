import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ settoken }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <h1 className="text-3xl">TRENDS</h1>
      <button
        onClick={() => settoken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
