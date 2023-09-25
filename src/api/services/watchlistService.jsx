import apiInstance, { API_BASE_ACCOUNT_ENDPOINT } from "../config/apiConfig";

const endpoint = API_BASE_ACCOUNT_ENDPOINT;

/**
 * Adds a movie to the user's watchlist.
 * @param {string} movieId - The ID of the movie to add.
 * @returns {Promise<Object>} A promise that resolves to the updated watchlist or relevant response.
 */
export const addToWatchlist = async (movieId) => {
  const url = endpoint + "/watchlist";
  try {
    // Send a POST request to the appropriate endpoint with the movieId as a parameter or in the request body
    const response = await apiInstance.post(url, {
      body: {
        media_type: "movie",
        media_id: movieId,
        watchlist: true,
      },
    });

    // Return the updated watchlist or any relevant data received from the API
    return response.data;
  } catch (error) {
    console.error(`Error adding movie ${movieId} to watchlist:`, error);

    // Throw the error so that it can be handled by the calling component or function
    throw error;
  }
};

/**
 * Fetches the user's watchlist.
 * @returns {Promise<Object>} A promise that resolves to the user's watchlist.
 */
export const fetchWatchlist = async () => {
  const url = endpoint + "/watchlist/movies";
  try {
    // Send a GET request to the appropriate endpoint to retrieve the user's watchlist
    const response = await apiInstance.get(url);

    // Return the user's watchlist or any relevant data received from the API
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);

    // Throw the error so that it can be handled by the calling component or function
    throw error;
  }
};
