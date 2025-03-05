"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

const MovieSlider = ({ movies, title }) => {
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);

  useEffect(() => {
    if (sliderRef.current) {
      setMaxScroll(
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
      updateProgress();
    }
  }, [movies]);

  const updateProgress = () => {
    if (sliderRef.current) {
      const currentScroll = sliderRef.current.scrollLeft;
      setScrollProgress((currentScroll / maxScroll) * 100);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(updateProgress, 300);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(updateProgress, 300);
    }
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 bg-black rounded-lg flex justify-center items-center text-white border border-gray-600 hover:border-red-600 transition-all"
          >
            ◀
          </button>
          <div className="flex items-center space-x-1">
            {[0, 25, 50, 75].map((threshold, index) => (
              <div
                key={index}
                className={`h-1 w-6 rounded-full ${
                  scrollProgress >= threshold ? "bg-red-500" : "bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="w-12 h-12 bg-black rounded-lg flex justify-center items-center text-white border border-gray-600 hover:border-red-600 transition-all"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
          onScroll={updateProgress}
          style={{
            scrollBehavior: "smooth",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[180px] md:min-w-[220px] lg:min-w-[250px] bg-[#1a1a1a] p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <Link href={`/${movie.id}`} passHref>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg w-fit"
                />
                <h3 className="text-white text-lg mt-2">{movie.title}</h3>

                {/* Additional Info Based on Section */}
                {title === "Upcoming Bangers" ? (
                  // Show Duration & Views for "Upcoming Bangers"
                  <div className="flex justify-between items-center text-gray-400 text-sm mt-1">
                    <div className="flex items-center space-x-1">
                      <img
                        src="../Images/duration.png"
                        alt="Duration"
                        className="w-4 h-4"
                      />
                      <span>
                        {movie.runtime !== "N/A"
                          ? `${movie.runtime} min`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <img
                        src="../Images/views.png"
                        alt="Views"
                        className="w-4 h-4"
                      />
                      <span>{movie.vote_count?.toLocaleString() || "N/A"}</span>
                    </div>
                  </div>
                ) : title === "Popular Picks" || title === "Latest on Utsav" ? (
                  // Show "Released at" text for these sections
                  <div className="text-gray-400 text-sm mt-1 bg-black p-1 rounded-md text-center">
                    Released at {formatReleaseDate(movie.release_date)}
                  </div>
                ) : title === "Top Rated" ? (
                  <div className="flex flex-col text-gray-400 text-sm mt-1">
                    {/* Movie Duration */}
                    <div className="flex items-center space-x-1">
                      <img
                        src="../Images/duration.png"
                        alt="Duration"
                        className="w-4 h-4"
                      />
                      <span>
                        {movie.runtime !== "N/A"
                          ? `${movie.runtime} min`
                          : "N/A"}
                      </span>
                    </div>

                    {/* Star Rating System */}
                    {/* Movie Rating using Predefined Images */}
                    <div className="flex items-center space-x-1 mt-1">
                      <img
                        src={
                          movie.vote_average >= 4
                            ? "../Images/Rating/starts_medium.png"
                            : "../Images/Rating/starts_low.png"
                        }
                        alt="Rating"
                        className="w-20 h-4"
                      />
                      <span>{movie.vote_count?.toLocaleString() || "N/A"}</span>
                    </div>
                  </div>
                ) : null}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSlider;
