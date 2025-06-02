import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ChatWidget from "./ChatWidget";

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const {
    setshowsearch,
    getCartCount,
    navigate,
    settoken,
    token,
    setcartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    settoken("");
    setcartItems({});
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="flex items-center justify-between py-5 font-medium relative z-10">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl">TRENDS</h1>
        </Link>

        {/* Nav Links */}
        <ul className="hidden sm:flex gap-5 text-lg text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
          </NavLink>
        </ul>

        {/* Icons: Search, Profile, Cart, Menu */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <img
            onClick={() => {
              setshowsearch(true);
              navigate("/collection");
            }}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />

          {/* Profile */}
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p onClick={() => navigate("/myprofile")} className="cursor-pointer hover:text-black">MY PROFILE</p>
                  <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">ORDERS</p>
                  <p onClick={logout} className="cursor-pointer hover:text-black">LOGOUT</p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Hamburger Menu */}
          <img
            onClick={() => setvisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          />
        </div>

        {/* Side Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setvisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setvisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
            <NavLink onClick={() => setvisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={() => setvisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setvisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
          </div>
        </div>
      </div>

      {/* Fixed ChatWidget */}
      <div className="fixed bottom-5 right-5 z-40">
        <ChatWidget />
      </div>
    </>
  );
};

export default Navbar;
