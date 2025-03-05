"use client"; // Ensures it runs on the client side

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const API_KEY = "db75be3f6da59e6c54d0b9f568d19d16";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const Navbar = ({ setSearchResults = () => {} }) => {
  const router = useRouter();
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResultsLocal] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
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
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="../Images/logo.png"
          alt="Utsav Logo"
          className="lg:h-[9rem] lg:w-[9rem] md:h-[8rem] md:w-[8rem] sm:h-[6rem] sm:w-[6rem] w-[5rem] h-[5rem] cursor-pointer"
          onClick={() => handleScroll("home")}
        />
      </div>

      {/* Center: Navigation Menu (Perfectly Centered) */}
      <div className="hidden lg:flex items-center border-4 border-[#1a1a1a] bg-black bg-opacity-70 rounded-lg px-6 py-3 space-x-6 text-white font-medium absolute left-1/2 transform -translate-x-1/2">
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
        {/* Search Button (Visible on Large Screens) */}
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

        {/* Sidebar Toggle Button (Mobile Menu) */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          ☰
        </button>

        {/* Sidebar (Mobile Navigation) */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 text-white transform ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden p-6`}
        >
          <button
            className="text-white text-2xl mb-4"
            onClick={() => setShowSidebar(false)}
          >
            ✕
          </button>
          <nav className="flex flex-col space-y-4">
            <a
              onClick={() => handleScroll("upcoming")}
              className="cursor-pointer"
            >
              Upcoming
            </a>
            <a
              onClick={() => handleScroll("latest")}
              className="cursor-pointer"
            >
              Latest
            </a>
            <a
              onClick={() => handleScroll("popular")}
              className="cursor-pointer"
            >
              Popular
            </a>
            <a
              onClick={() => handleScroll("toprated")}
              className="cursor-pointer"
            >
              Top Rated
            </a>
          </nav>

          {/* Sidebar Search (Only for Mobile) */}
          <div className="mt-6">
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
          </div>

          {/* Sidebar Notifications (Only for Mobile) */}
          <div className="mt-6">
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
        </div>

        {/* Notifications Button (Visible on Large Screens) */}
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
