"use client";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MoviesSection from "../components/MoviesSection";
import Footer from "@/components/Footer";
import { useState } from "react";
import Form from "@/components/Form";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#141413] text-white">
      {/* Navbar - Positioned Absolutely Over Hero Section */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar setSearchResults={setSearchResults} />
      </div>

      {/* Main Content Area */}
      <div className="relative w-full flex-grow">
        <HeroSection />
        <MoviesSection />
      </div>

      {/* Footer Always at Bottom */}
      <Form></Form>
      <Footer />
    </div>
  );
}
