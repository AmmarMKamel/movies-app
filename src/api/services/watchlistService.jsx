import apiInstance, { API_BASE_ACCOUNT_ENDPOINT } from "../config/apiConfig";

const endpoint = API_BASE_ACCOUNT_ENDPOINT;

/**
 * Adds or Removes a movie to/from the user's watchlist.
 * @param {string} movieId - The ID of the movie to add.
 * @param {boolean} addToWatchList - boolean indicates weither adding(true) or removing(false) from the watch list
 * @returns {Promise<Object>} A promise that resolves to the updated watchlist or relevant response.
 */
export const addOrRemoveFromWatchList = async (movieId, addToWatchList=true) => {
  const url = endpoint + "/watchlist";
  try {
    // Send a POST request to the appropriate endpoint with the movieId as a parameter or in the request body
    const response = await apiInstance.post(url, 
      {
        media_type: "movie",
        media_id: movieId,
        watchlist: addToWatchList,
      }
    );

    // Return the updated watchlist or any relevant data received from the API
    return response.data;
  } catch (error) {
    console.error(`Error ${addToWatchList? "adding": "removing"} movie ${movieId} ${addToWatchList? "to": "from"} watchlist:`, error);
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
