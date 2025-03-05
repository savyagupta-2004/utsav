"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_KEY = "db75be3f6da59e6c54d0b9f568d19d16";
const BASE_URL = "https://api.themoviedb.org/3";

const OurGenresSlider = () => {
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0); // Track index for small screens
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
          params: { api_key: API_KEY, language: "en-US" },
        });

        const fetchedGenres = response.data.genres.slice(0, 5); // Show only first 5 genres
        setGenres(fetchedGenres);

        // Fetch movies for each genre
        const moviePromises = fetchedGenres.map(async (genre) => {
          const moviesResponse = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
              api_key: API_KEY,
              language: "en-US",
              with_genres: genre.id,
              page: 1,
            },
          });
          return { [genre.id]: moviesResponse.data.results.slice(0, 4) }; // Only 4 movies per genre
        });

        const moviesByGenre = await Promise.all(moviePromises);
        setGenreMovies(Object.assign({}, ...moviesByGenre));
      } catch (error) {
        console.error("Error fetching genres or movies:", error);
      }
    };

    fetchGenres();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleSmallScreenLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSmallScreenRight = () => {
    if (currentIndex < genres.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-white">Our Genres</h2>
      </div>

      {/* Large Screen Layout */}
      <div className="relative hidden md:block ">
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth md:grid md:grid-cols-5"
          style={{
            scrollBehavior: "smooth",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="min-w-[100px] md:min-w-[150px] lg:min-w-[100px] bg-[#1a1a1a] p-10 rounded-lg relative"
            >
              {/* Movie Thumbnails */}
              <div className="grid grid-cols-2 gap-1">
                {genreMovies[genre.id]?.map((movie) => (
                  <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md"
                  />
                ))}
              </div>

              {/* Genre Name & Arrow */}
              <div
                className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center rounded-b-lg"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                }}
              >
                <h3 className="text-white text-lg">{genre.name}</h3>
                <span className="text-white text-xl">➜</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Small Screen Layout: Show One Genre at a Time */}
      <div className="md:hidden flex flex-col items-center">
        <div className="relative w-full max-w-xs overflow-hidden">
          {genres.map((genre, index) => (
            <div
              key={genre.id}
              className={`${
                index === currentIndex ? "block" : "hidden"
              } w-full bg-[#1a1a1a] p-2 rounded-lg relative`}
            >
              {/* Movie Thumbnails */}
              <div className="grid grid-cols-2 gap-1">
                {genreMovies[genre.id]?.map((movie) => (
                  <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md"
                  />
                ))}
              </div>

              {/* Genre Name & Arrow */}
              <div
                className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center rounded-b-lg"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                }}
              >
                <h3 className="text-white text-lg">{genre.name}</h3>
                <span className="text-white text-xl">➜</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons Below the Genre Box on Small Screens */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleSmallScreenLeft}
            disabled={currentIndex === 0}
            className={`w-10 h-10 bg-[#141414] rounded-full flex justify-center items-center text-white border border-gray-600 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-red-600"
            } transition-all`}
          >
            ◀
          </button>
          <button
            onClick={handleSmallScreenRight}
            disabled={currentIndex === genres.length - 1}
            className={`w-10 h-10 bg-[#141414] rounded-full flex justify-center items-center text-white border border-gray-600 ${
              currentIndex === genres.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-red-600"
            } transition-all`}
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurGenresSlider;
