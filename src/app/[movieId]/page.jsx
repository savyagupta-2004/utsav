"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/NavbarMovies";
import Footer from "@/components/Footer";

const API_KEY = "db75be3f6da59e6c54d0b9f568d19d16";
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!movieId) {
      setError("Invalid Movie ID.");
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            append_to_response: "credits,videos",
          },
        });

        if (!response.data || response.data.success === false) {
          throw new Error("Movie not found in TMDB database.");
        }

        setMovie(response.data);
      } catch (err) {
        setError("Movie details not found.");
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${movieId}/reviews`, {
          params: { api_key: API_KEY, language: "en-US" },
        });

        setReviews(response.data.results.slice(0, 5)); // Get top 5 reviews
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchMovieDetails();
    fetchReviews();
  }, [movieId]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!movie) return <p className="text-center text-white">Loading...</p>;

  return (
    <>
      <div className="text-white">
        <Navbar />

        {/* Hero Section */}
        <div className="relative w-full h-[90vh]  flex items-end justify-center pb-20">
          <Image
            src={
              movie.backdrop_path
                ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
                : "/fallback-hero.jpg"
            }
            alt={movie.title}
            fill
            priority
            className="absolute object-cover"
            unoptimized
          />
          <div className="absolute flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold drop-shadow-lg">{movie.title}</h1>
            <p className="text-lg text-gray-300 max-w-2xl drop-shadow-md">
              {movie.overview}
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition">
                ▶ Play Now
              </button>
              <div className="flex space-x-3 text-gray-300 text-lg">
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>🎬 {movie.release_date?.split("-")[0]}</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* Movie Details Section */}
        <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Movie Info */}
          <div className="md:col-span-2">
            {/* Description */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Description</h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>

            {/* Cast Section */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg mt-6">
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              {movie.credits?.cast && movie.credits.cast.length > 0 ? (
                <div className="flex overflow-x-auto space-x-4">
                  {movie.credits.cast.slice(0, 10).map((actor) => (
                    <div key={actor.id} className="text-center">
                      <Image
                        src={
                          actor.profile_path
                            ? `${IMAGE_BASE_URL}${actor.profile_path}`
                            : "/fallback-profile.jpg"
                        }
                        alt={actor.name}
                        width={80}
                        height={80}
                        className="rounded-xl"
                        unoptimized
                      />
                      <p className="text-gray-300 text-sm mt-2">{actor.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No cast information available.</p>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg mt-6">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                <div className="relative">
                  <div
                    ref={sliderRef}
                    className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
                  >
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="min-w-[300px] bg-[#222] p-6  rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Image
                            src={
                              review.author_details.avatar_path
                                ? `${IMAGE_BASE_URL}${review.author_details.avatar_path}`
                                : "/fallback-profile.jpg"
                            }
                            alt={review.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                            unoptimized
                          />
                          <div>
                            <p className="text-gray-300 font-semibold">
                              {review.author}
                            </p>
                            <p className="text-yellow-400">
                              ⭐ {review.author_details.rating || "N/A"}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-400 mt-2 text-sm">
                          {review.content.slice(0, 150)}...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">No reviews available.</p>
              )}
            </div>
          </div>

          {/* Right Column: Metadata */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Movie Info</h2>

            {/* Released Year */}
            <p>
              <strong>Released Year:</strong>{" "}
              {movie.release_date?.split("-")[0]}
            </p>

            {/* Available Languages */}
            <p className="mt-2">
              <strong>Available Languages:</strong>{" "}
              {movie.spoken_languages
                ?.map((lang) => lang.english_name)
                .join(", ")}
            </p>

            {/* Ratings */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Ratings</h3>
              <p>IMDb ⭐ {movie.vote_average.toFixed(1)}</p>
              <p>StreamVibe ⭐⭐⭐⭐⭐</p>
            </div>

            {/* Genres */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Genres</h3>
              <p>{movie.genres?.map((g) => g.name).join(", ")}</p>
            </div>

            {/* Director Section */}
            <h3 className="text-xl font-bold text-white mt-6 mb-1">Director</h3>
            {movie.credits?.crew?.some(
              (member) => member.job === "Director"
            ) && (
              <div className="bg-[#141414] p-4 rounded-lg ">
                {movie.credits?.crew
                  ?.filter((member) => member.job === "Director")
                  .slice(0, 1)
                  .map((director) => (
                    <div
                      key={director.id}
                      className="flex items-center space-x-4 mt-3"
                    >
                      <Image
                        src={
                          director.profile_path
                            ? `${IMAGE_BASE_URL}${director.profile_path}`
                            : "/fallback-profile.jpg"
                        }
                        alt={director.name}
                        width={60}
                        height={60}
                        className="rounded-xs"
                        unoptimized
                      />
                      <div>
                        <p className="text-white text-lg font-semibold">
                          {director.name}
                        </p>
                        <p className="text-gray-400">
                          {director.known_for_department}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Music Composer Section */}
            <h3 className="text-xl font-bold text-white mt-6 mb-1">Music</h3>
            {movie.credits?.crew?.some(
              (member) => member.job === "Original Music Composer"
            ) && (
              <div className="bg-[#141414] p-4 rounded-lg">
                {movie.credits?.crew
                  ?.filter((member) => member.job === "Original Music Composer")
                  .slice(0, 1)
                  .map((composer) => (
                    <div
                      key={composer.id}
                      className="flex items-center space-x-4 mt-3"
                    >
                      <Image
                        src={
                          composer.profile_path
                            ? `${IMAGE_BASE_URL}${composer.profile_path}`
                            : "/fallback-profile.jpg"
                        }
                        alt={composer.name}
                        width={60}
                        height={60}
                        className="rounded-xs"
                        unoptimized
                      />
                      <div>
                        <p className="text-white text-lg font-semibold">
                          {composer.name}
                        </p>
                        <p className="text-gray-400">
                          {composer.known_for_department}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MovieDetails;
