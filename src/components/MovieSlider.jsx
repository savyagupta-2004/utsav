"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

const MovieSlider = ({ movies, title }) => {
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setMaxScroll(
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
      updateProgress();
    }

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile = <768px (sm screens)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [movies]);

  const updateProgress = () => {
    if (sliderRef.current) {
      const currentScroll = sliderRef.current.scrollLeft;
      setScrollProgress((currentScroll / maxScroll) * 100);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      if (isMobile) {
        if (currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
          sliderRef.current.scrollBy({
            left: -sliderRef.current.clientWidth,
            behavior: "smooth",
          });
        }
      } else {
        const scrollAmount =
          title === "Top Rated"
            ? sliderRef.current.firstElementChild.offsetWidth + 16
            : 300;
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
      setTimeout(updateProgress, 300);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      if (isMobile) {
        if (currentIndex < movies.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          sliderRef.current.scrollBy({
            left: sliderRef.current.clientWidth,
            behavior: "smooth",
          });
        }
      } else {
        const scrollAmount =
          title === "Top Rated"
            ? sliderRef.current.firstElementChild.offsetWidth + 16 // Use accurate width
            : 300;
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
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
    <section className="px-4 md:px-6 py-6">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        <div className="hidden md:flex items-center space-x-3 p-2 bg-black rounded-2xl">
          <button
            onClick={scrollLeft}
            className="w-10 md:w-12 h-10 md:h-12 bg-[#141414] border-2 border-[#1a1a1a] rounded-lg flex justify-center items-center text-white   hover:border-red-600 transition-all"
          >
            ◀
          </button>
          <div className="flex items-center space-x-1">
            {[0, 25, 50, 75].map((threshold, index) => (
              <div
                key={index}
                className={`h-1 w-5 md:w-6 rounded-full ${
                  scrollProgress >= threshold ? "bg-red-500" : "bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="w-10 md:w-12 h-10 md:h-12 border-2 border-[#1a1a1a] rounded-lg flex justify-center items-center text-white bg-[#141414]  hover:border-red-600 transition-all"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Small Screens: Show One Movie at a Time with Buttons Below */}
      <div className="md:hidden flex flex-col items-center">
        <div className="relative w-full max-w-xs overflow-hidden">
          <div
            ref={sliderRef}
            className="flex overflow-hidden"
            style={{
              scrollBehavior: "smooth",
              whiteSpace: "nowrap",
            }}
          >
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="w-full flex-shrink-0"
                style={{
                  width: "100%",
                  display: index === currentIndex ? "block" : "none",
                }}
              >
                <Link href={`/${movie.id}`} passHref>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg w-full"
                  />
                  {title === "Upcoming Bangers" ? (
                    // Show Duration & Views for "Upcoming Bangers"
                    <div className="flex justify-between items-center text-gray-400 text-xs md:text-sm mt-1">
                      <div className="border-[#262626] border-2 flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span>
                          {movie.runtime !== "N/A"
                            ? `${movie.runtime} min`
                            : "N/A"}
                        </span>
                      </div>
                      <div className="border-[#262626] border-2 flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5c-7.5 0-10 7.5-10 7.5s2.5 7.5 10 7.5 10-7.5 10-7.5-2.5-7.5-10-7.5zM12 15.5a3 3 0 110-6 3 3 0 010 6z"
                          />
                        </svg>

                        <span>
                          {movie.vote_count?.toLocaleString() || "N/A"}
                        </span>
                      </div>
                    </div>
                  ) : title === "Top Rated" ? (
                    // Show Duration & Star Rating for "Top Rated"
                    <div className="flex flex-col text-gray-400 text-xs md:text-sm mt-1">
                      <div className="border-[#262626] border-2 flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-3 h-3 md:w-4 md:h-4 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span>
                          {movie.runtime !== "N/A"
                            ? `${movie.runtime} min`
                            : "N/A"}
                        </span>
                      </div>
                      <div className="border-[#262626] border-2 flex items-center space-x-1 mt-1">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={
                                i < Math.round(movie.vote_average / 2)
                                  ? "red"
                                  : "gray"
                              }
                              className="w-3 h-3 md:w-4 md:h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 17.27l5.18 3.73-1.64-6.36 5.09-4.18-6.66-.58L12 3 9.03 9.88l-6.66.58 5.09 4.18-1.64 6.36L12 17.27z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>

                        <span>
                          {movie.vote_count?.toLocaleString() || "N/A"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Show "Released at" for Popular Picks & Latest on Utsav
                    <p className="text-gray-400 text-[9px] md:text-sm mt-1 bg-black p-1 rounded-md text-center">
                      Released at {formatReleaseDate(movie.release_date)}
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons Below the Movie for Small Screens */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className={`w-10 h-10 bg-black rounded-full flex justify-center items-center text-white border border-gray-600 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-red-600"
            } transition-all`}
          >
            ◀
          </button>
          <button
            onClick={scrollRight}
            disabled={currentIndex === movies.length - 1}
            className={`w-10 h-10 bg-black rounded-full flex justify-center items-center text-white border border-gray-600 ${
              currentIndex === movies.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-red-600"
            } transition-all`}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Medium & Larger Screens: Original Horizontal Slider */}
      <div className="relative hidden md:block">
        <div
          ref={sliderRef}
          className="flex space-x-3 md:space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
          onScroll={updateProgress}
          style={{
            scrollBehavior: "smooth",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`min-w-[160px] md:min-w-[200px] lg:min-w-[250px] bg-[#1a1a1a] py-6 px-6 rounded-lg cursor-pointer hover:scale-105 transition-transform border-1 border-[#262626]`}
              style={{
                display: title === "Top Rated" ? "inline-block" : "block",
              }}
            >
              <Link href={`/${movie.id}`} passHref>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg w-full mb-3"
                />
                {title === "Upcoming Bangers" ? (
                  // Show Duration & Views for "Upcoming Bangers"
                  <div className="flex  justify-between items-center text-gray-400 text-[8px] md:text-sm mt-1">
                    <div className="border-[#262626] border-2  flex items-center space-x-1  rounded-xl bg-black p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>
                        {movie.runtime !== "N/A"
                          ? `${movie.runtime} min`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex border-[#262626] border-2 items-center space-x-1  rounded-xl bg-black p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5c-7.5 0-10 7.5-10 7.5s2.5 7.5 10 7.5 10-7.5 10-7.5-2.5-7.5-10-7.5zM12 15.5a3 3 0 110-6 3 3 0 010 6z"
                        />
                      </svg>

                      <span>{movie.vote_count?.toLocaleString() || "N/A"}</span>
                    </div>
                  </div>
                ) : title === "Top Rated" ? (
                  // Show Duration & Star Rating for "Top Rated"
                  <div className="flex justify-between items-center text-gray-400 text-xs md:text-[10px] mt-1">
                    <div className="border-[#262626] border-2 flex items-center space-x-1  rounded-xl bg-black p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-3 h-3 md:w-4 md:h-4 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>
                        {movie.runtime !== "N/A"
                          ? `${movie.runtime} min`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1  rounded-xl bg-black p-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={
                              i < Math.round(movie.vote_average / 2)
                                ? "red"
                                : "gray"
                            }
                            className="w-3 h-3 md:w-4 md:h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 17.27l5.18 3.73-1.64-6.36 5.09-4.18-6.66-.58L12 3 9.03 9.88l-6.66.58 5.09 4.18-1.64 6.36L12 17.27z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>

                      <span>{movie.vote_count?.toLocaleString() || "N/A"}</span>
                    </div>
                  </div>
                ) : (
                  // Show "Released at" for Popular Picks & Latest on Utsav
                  <p className="border-[#262626] border-2 text-gray-400 text-[12px] mt-1 bg-black p-1 rounded-md text-center">
                    Released at {formatReleaseDate(movie.release_date)}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSlider;
