"use client"; // Ensures it runs on the client side

import React, { useState } from "react";
import axios from "axios";

const API_KEY = "db75be3f6da59e6c54d0b9f568d19d16";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const Navbar = ({ setSearchResults = () => {} }) => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "New movie releases this week!",
    "Your watchlist has been updated!",
    "Special discounts on premium content!",
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await axios.get(SEARCH_URL, {
        params: { api_key: API_KEY, query },
      });

      if (typeof setSearchResults === "function") {
        setSearchResults(response.data.results);
      } else {
        console.warn("setSearchResults is not provided");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="../Images/logo.png"
          alt="Utsav Logo"
          className="h-[6rem] w-[6rem] cursor-pointer"
          onClick={() => handleScroll("home")}
        />
      </div>

      {/* Center: Navigation Menu (Perfectly Centered) */}
      <div className="flex items-center border-4 border-[#1a1a1a] bg-black bg-opacity-70 rounded-lg px-6 py-3 space-x-6 text-white font-medium absolute left-1/2 transform -translate-x-1/2">
        <a
          onClick={() => handleScroll("upcoming")}
          className="hover:text-gray-400 cursor-pointer"
        >
          Upcoming
        </a>
        <a
          onClick={() => handleScroll("latest")}
          className="hover:text-gray-400 cursor-pointer"
        >
          Latest
        </a>
        <a
          onClick={() => handleScroll("popular")}
          className="hover:text-gray-400 cursor-pointer"
        >
          Popular
        </a>
        <a
          onClick={() => handleScroll("toprated")}
          className="hover:text-gray-400 cursor-pointer"
        >
          Top Rated
        </a>
      </div>

      {/* Right: Search & Notifications */}
      <div className="flex items-center space-x-6">
        {/* Search Button */}
        <button onClick={() => setShowSearch(!showSearch)}>
          <img
            src="../Images/search.png"
            alt="Search"
            className="h-6 cursor-pointer"
          />
        </button>

        {/* Search Input (Only Shows When Search Button is Clicked) */}
        {showSearch && (
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="px-4 py-2 rounded-full bg-gray-800 text-white outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              🔍
            </button>
          </form>
        )}

        {/* Notification Button */}
        <button onClick={() => setShowNotifications(!showNotifications)}>
          <img
            src="../Images/noti.png"
            alt="Notifications"
            className="h-6 cursor-pointer"
          />
        </button>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 bg-opacity-90 text-white rounded-lg shadow-lg p-3">
            <h3 className="font-bold">Notifications</h3>
            <ul>
              {notifications.length > 0 ? (
                notifications.map((note, index) => (
                  <li key={index} className="border-b border-gray-700 py-2">
                    {note}
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No new notifications</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
