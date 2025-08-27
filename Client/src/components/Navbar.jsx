import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { auth, ui, credits } = useContext(AppContext);
  const { user, logout } = auth || {};
  const { setShowLogin } = ui || {};
  const credit = credits?.credit ?? 0; // fallback to 0 if undefined

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between py-4 px-4 sm:px-8">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Imagify logo"
          className="w-28 sm:w-32 lg:w-40"
        />
      </Link>

      {/* Right Section */}
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Credits Button */}
            <button
              type="button"
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300"
            >
              <img
                className="w-5"
                src={assets.credit_star}
                alt="Credit star icon"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits Left: {credit}
              </p>
            </button>

            {/* Greeting */}
            <p className="text-gray-600 hidden sm:block pl-4">
              Hi, {user?.name || "User"}
            </p>

            {/* Profile Dropdown */}
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow cursor-pointer"
                alt="User profile icon"
              />
              <div className="absolute hidden group-hover:block top-full right-0 z-10 mt-2">
                <ul className="bg-white rounded-md border text-sm shadow-md">
                  <li
                    onClick={logout}
                    className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            {/* Pricing Button */}
            <button
              type="button"
              onClick={() => navigate("/buy")}
              className="text-sm text-gray-700 hover:text-black"
            >
              Pricing
            </button>

            {/* Login Button */}
            <button
              type="button"
              onClick={() => setShowLogin?.(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full hover:bg-zinc-700 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
