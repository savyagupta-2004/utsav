# Movie Streaming Website

## Overview
This project is a movie streaming website built using **Next.js** and **React.js**. It provides a modern and responsive interface for browsing and discovering movies. The application consists of two primary pages:

1. **Landing Page** - Displays various categories of movies.
2. **Movie Details Page** - Provides comprehensive details about selected movies.

---

## Features
### Landing Page
- Includes five sections:
  - Our Genres
  - Upcoming Movies
  - Latest Movies
  - Top-rated Movies
  - Popular Movies
- Displays **10-20 movies per section**, featuring:
  - Movie poster, title, genres, and brief overview
  - Additional information such as popularity, ratings, and release date
- **Search Functionality**
  - Users can search for movies dynamically
  - Results replace the section view and allow navigation to the movie details page
- **Navigation Bar**
  - Contains links to different movie sections
  - Clicking on a section auto-scrolls to it
- **Pagination**
  - Allows users to browse through multiple pages of movie listings

### Movie Details Page
- Provides detailed information about a movie, including:
  - Language, title, overview, popularity, genres, release date, and country of origin
  - Budget, revenue, and a link to the movie’s official homepage
- **Reviews Section**
  - Displays the top five reviews with reviewer details
- **Similar Movies Section**
  - Lists related movies with their posters and descriptions

---

## Tech Stack
- **Frontend:** Next.js (React.js)
- **Styling:** Tailwind CSS
- **API:** [The Movie Database (TMDB)](https://developers.themoviedb.org/3/movies)
- **Icons:** React Icons

---



## API Integration
This project fetches movie data from **TMDB API**:
- Base URL: `https://api.themoviedb.org/3/`
- API Key: `db75be3f6da59e6c54d0b9f568d19d16`
- Image Base URL: `https://image.tmdb.org/t/p/w500/`



---




