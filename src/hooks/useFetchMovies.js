"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "db75be3f6da59e6c54d0b9f568d19d16";
const BASE_URL = "https://api.themoviedb.org/3/movie/";

const useFetchMovies = (category) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        // Step 1: Fetch the initial list of movies
        const response = await axios.get(`${BASE_URL}${category}`, {
          params: { api_key: API_KEY, language: "en-US", page: 1 },
        });

        let movieList = response.data.results;

        // Step 2: Fetch runtime for each movie separately
        const movieDetailsPromises = movieList.map(async (movie) => {
          try {
            const detailsResponse = await axios.get(`${BASE_URL}${movie.id}`, {
              params: { api_key: API_KEY, language: "en-US" },
            });
            return { ...movie, runtime: detailsResponse.data.runtime || "N/A" };
          } catch (err) {
            console.error(`Error fetching runtime for movie ${movie.id}:`, err);
            return { ...movie, runtime: "N/A" }; // In case of an error, set "N/A"
          }
        });

        // Wait for all runtime requests to finish
        movieList = await Promise.all(movieDetailsPromises);

        if (isMounted) {
          setMovies(movieList);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, [category]);

  return { movies, error };
};

export default useFetchMovies;
