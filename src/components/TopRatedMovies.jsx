"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated",
          {
            params: {
              api_key: "db75be3f6da59e6c54d0b9f568d19d16",
              language: "en-US",
              page: 1,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching Top Rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Top Rated Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 text-white p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href={`/${movie.id}`} passHref>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full h-auto"
              />
            </Link>
            <h3 className="text-lg mt-2">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedMovies;
