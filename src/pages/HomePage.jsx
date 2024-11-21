import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { getTrendingMovies } from '../api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrendingMovies()
      .then(setMovies)
      .catch(setError);
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {error && <p>Error: {error.message}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
