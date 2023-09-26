import apiInstance, { API_BASE_SEARCH_ENDPOINT } from '../config/apiConfig';

const endpoint = API_BASE_SEARCH_ENDPOINT;


/**
 * Search for details of a specific movie by its name.
 * @param {string} movieName - The name to query
 * @returns {Promise<Object>} A promise that resolves to the movies that have the movieName included in its title .
 */
export const fetchMovieDetailsByName = async (movieName) => {
    try {
      const response = await apiInstance.get(endpoint, {
        params: {
            query: movieName
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for movie ${movieName}:`, error);
      throw error;
    }
};