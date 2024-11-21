import axios from 'axios';

const API_KEY = '95d43e08f42b0802d805aaa921e77aab';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async query => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: 'en-US',
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    throw error;
  }
};

export const getMovieCredits = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${id}:`, error);
    throw error;
  }
};

export const getMovieReviews = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie reviews for ID ${id}:`, error);
    throw error;
  }
};
