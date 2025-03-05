"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  // Function to scroll to a section smoothly
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0f0f0f] text-white pt-28 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 border-b border-gray-600 pb-6">
        {/* Home Section */}
        <div>
          <h3 className="text-lg font-bold">Home</h3>
          <ul className="mt-2 text-gray-400 space-y-3">
            <li>
              <button
                onClick={() => scrollToSection("categories")}
                className="hover:underline"
              >
                Categories
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("devices")}
                className="hover:underline"
              >
                Devices
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("pricing")}
                className="hover:underline"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("faq")}
                className="hover:underline"
              >
                FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Movies Section */}
        <div>
          <h3 className="text-lg font-bold">Movies</h3>
          <ul className="mt-2 text-gray-400 space-y-3">
            <li>
              <button
                onClick={() => scrollToSection("genre")}
                className="hover:underline"
              >
                Genres
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("upcoming")}
                className="hover:underline"
              >
                Upcoming Bangers
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("latest")}
                className="hover:underline"
              >
                Latest
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("toprated")}
                className="hover:underline"
              >
                Top Rated
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("popular")}
                className="hover:underline"
              >
                Popular
              </button>
            </li>
          </ul>
        </div>

        {/* Shows Section */}
        <div>
          <h3 className="text-lg font-bold">Shows</h3>
          <ul className="mt-2 text-gray-400 space-y-3">
            <li>
              <button
                onClick={() => scrollToSection("show-genres")}
                className="hover:underline"
              >
                Genres
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("show-trending")}
                className="hover:underline"
              >
                Trending
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("new-release")}
                className="hover:underline"
              >
                New Release
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("show-popular")}
                className="hover:underline"
              >
                Popular
              </button>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-bold">Support</h3>
          <ul className="mt-2 text-gray-400 space-y-3">
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:underline"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div>
          <h3 className="text-lg font-bold">Subscription</h3>
          <ul className="mt-2 text-gray-400 space-y-3">
            <li>
              <button
                onClick={() => scrollToSection("plans")}
                className="hover:underline"
              >
                Plans
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="hover:underline"
              >
                Features
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-bold">Connect With Us</h3>
          <div className="flex space-x-3 mt-2">
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-lg hover:bg-gray-500 transition"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-lg hover:bg-gray-500 transition"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href="https://www.linkedin.com/company/utsavapp/posts/?feedView=all"
              target="blank"
              className="bg-gray-700 p-2 rounded-lg hover:bg-gray-500 transition"
            >
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-400 text-sm mt-6">
        <p>©2025 Utsav, All Rights Reserved</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
