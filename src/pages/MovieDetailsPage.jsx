import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieReviews } from '../api';
import styles from '../css/MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);

        
        const castData = await getMovieCredits(movieId);
        setCast(castData.cast);

        
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        setError("Error loading movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

 
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500';

  return (
    <div>
      <button className={styles.buttonBack} onClick={() => navigate(-1)}>Back</button> 
      
     

<div className={styles.moviePostCard}>
      <img src={imageUrl} alt={movie.title} className={styles.movieImage} />
        <div className={styles.movieInfo}>
           <h1>{movie.title}</h1>
          <h2 className={styles.overview}>Overview:</h2>
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
      </div>
        </div>

      
<button onClick={() => setShowCast(!showCast)}>
  Cast
</button>


{showCast && (
  <div>
    <h3>Cast</h3>
    <ul>
      {cast.length > 0 ? (
        cast.map(actor => (
          <li key={actor.id}>
            <img 
              src={actor.profile_path 
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` 
                : 'https://via.placeholder.com/200'} 
              alt={actor.name} 
              style={{ width: '100px', borderRadius: '5px', marginRight: '10px' }}
            />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))
      ) : (
        <p>No cast data available</p>
      )}
    </ul>
  </div>
)}

      
      <button onClick={() => setShowReviews(!showReviews)}>
        Reviews
      </button>

      
      {showReviews && (
        <div>
          <h3>Reviews</h3>
          <ul>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review.id}>
                  <p><strong>{review.author}</strong></p>
                  <p>{review.content}</p>
                </li>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
