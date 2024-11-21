import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../css/MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
