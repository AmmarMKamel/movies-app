import apiInstance, { API_BASE_MOVIE_ENDPOINT } from '../config/apiConfig';

const endpoint = API_BASE_MOVIE_ENDPOINT;

/**
 * Fetches a list of movies.
 * @returns {Promise<Object>} A promise that resolves to the list of movies.
 * @param {int} currentPage - Get movies of specific page.
 */
export const fetchMovies = async (currentPage=1) => {
  const url = endpoint + 'popular';
  try {
    const response = await apiInstance.get(url, {
        params: {
            page: currentPage,
        },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

/**
 * Fetches details of a specific movie.
 * @param {string} movieId - The ID of the movie.
 * @returns {Promise<Object>} A promise that resolves to the movie details.
 */
export const fetchMovieDetails = async (movieId) => {
  const url = endpoint + movieId;
  try {
    const response = await apiInstance.get(url);

    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    throw error;
  }
};



/**
 * Fetches recommendations of a specific movie.
 * @param {string} movieId - The ID of the movie.
 * @returns {Promise<Object>} A promise that resolves to the movie recommendations.
 */
export const fetchMovieRecommendations = async (movieId) => {
  const url = endpoint + movieId + '/recommendations';
  try {
    const response = await apiInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recommendations for movie ${movieId}:`, error);
    throw error;
  }
};
