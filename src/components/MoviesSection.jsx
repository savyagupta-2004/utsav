"use client";
import React from "react";
import MovieSlider from "./MovieSlider";
import useFetchMovies from "../hooks/useFetchMovies";
import OurGenresSlider from "./OurGenresSlider";

const MoviesSection = () => {
  const { movies: upcomingMovies } = useFetchMovies("upcoming");
  const { movies: latestMovies } = useFetchMovies("now_playing");
  const { movies: topRatedMovies } = useFetchMovies("top_rated");
  const { movies: popularMovies } = useFetchMovies("popular");

  return (
    <>
      <div className="px-16">
        <div className="border-2 border-[#1a1a1a] bg-[#141413] mt-20 mb-20">
          <section id="genre">
            <OurGenresSlider />
          </section>
          {/* Upcoming Movies Section */}
          <section id="upcoming">
            <MovieSlider movies={upcomingMovies} title="Upcoming Bangers" />
          </section>

          {/* Latest Movies Section */}
          <section id="latest">
            <MovieSlider movies={latestMovies} title="Latest on Utsav" />
          </section>

          {/* Top Rated Movies Section */}
          <section id="toprated">
            <MovieSlider movies={topRatedMovies} title="Top Rated" />
          </section>

          {/* Popular Movies Section */}
          <section id="popular">
            <MovieSlider movies={popularMovies} title="Popular" />
          </section>
        </div>
      </div>
    </>
  );
};

export default MoviesSection;
