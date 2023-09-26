import { API_BASE_POSTER_PATH } from "../config/apiConfig";

/**
 * Constructs the full URL for an image given its path.
 * @param {string} imagePath - The path of the image on the server.
 * @returns {string} The full URL of the image.
 */
export const getImageUrl = (imagePath) => {
  // Construct the full URL of the image
  const imageUrl = `${API_BASE_POSTER_PATH}${imagePath}`;
  return imageUrl;
};
