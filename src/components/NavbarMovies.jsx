"use client"; // Ensures it runs on the client side

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_KEY = "db75be3f6da59e6c54d0b9f568d19d16";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const Navbar = ({ setSearchResults }) => {
  const router = useRouter();
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResultsLocal] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "New movie releases this week!",
    "Your watchlist has been updated!",
    "Special discounts on premium content!",
  ]);

  // Fetch search results
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await axios.get(SEARCH_URL, {
        params: { api_key: API_KEY, query },
      });
      setSearchResultsLocal(response.data.results);
      if (typeof setSearchResults === "function") {
        setSearchResults(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleMovieClick = (movieId) => {
    router.push(`/${movieId}`);
  };

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="../Images/logo.png"
          alt="Utsav Logo"
          className="h-[10rem] w-[10rem] cursor-pointer"
          onClick={() => handleScroll("home")}
        />
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="hidden lg:block"
        >
          <img
            src="../Images/search.png"
            alt="Search"
            className="h-6 cursor-pointer"
          />
        </button>
        {/* Search Input (Only Shows When Search Button is Clicked) */}
        {showSearch && (
          <div className="relative hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="px-4 py-2 rounded-full bg-[#141414] text-white outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                🔍
              </button>
            </form>
            {searchResults.length > 0 && (
              <div className="absolute bg-[#141414] text-white mt-2 w-full rounded-lg shadow-lg p-3 max-h-60 overflow-y-auto">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    {movie.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notification Button */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="hidden lg:block"
        >
          <img
            src="../Images/noti.png"
            alt="Notifications"
            className="h-6 cursor-pointer"
          />
        </button>

        {/* Notification Dropdown (For Large Screens) */}
        {showNotifications && (
          <div className="absolute right-0 mt-20 w-64 bg-[#141414] bg-opacity-90 text-white rounded-lg shadow-lg p-3 hidden lg:block">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-white text-xl"
              >
                ✕
              </button>
            </div>
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
