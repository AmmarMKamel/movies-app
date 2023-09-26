import axios from 'axios';

// Load API token from environment variables [CURRENTLY NOT USED]
// const API_KEY = process.env.REACT_APP_API_KEY;

// Load Access token from environment variables
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

// Load API user id from environment variables
const API_USER_ID = process.env.REACT_APP_ACCOUNT_ID;

// Load API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// Load poster path base URL
export const API_BASE_POSTER_PATH = process.env.REACT_APP_BASE_POSTER_PATH;

// Load API used endpoints
export const API_BASE_MOVIE_ENDPOINT = process.env.REACT_APP_MOVIE_ENDPOINT;
export const API_BASE_ACCOUNT_ENDPOINT = process.env.REACT_APP_ACCOUNT_ENDPOINT + API_USER_ID;
export const API_BASE_SEARCH_ENDPOINT = process.env.REACT_APP_SEARCH_ENDPOINT;


// Create an Axios instance with a timeout and base URL
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // in milliseconds
});

// Set up request interceptors to attach headers to every request
apiInstance.interceptors.request.use(
  (config) => {
    // Specify the accepted headers type
    config.headers.accept = 'application/json'

    // Attach authorization token to headers if available
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }

    // Attach the language parameter to every request
    const language =  'en' // getLanguage();
    config.params = {
      ...config.params,
      language,
    };

    // Attach additional headers here if needed
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);


// Set up response interceptors to handle API responses and errors globally
apiInstance.interceptors.response.use(
  (response) => {
    // Handle successful response here (e.g., transform data)
    return response;
  },
  (error) => {
    // Handle API errors here (e.g., log errors, transform error response)
    return Promise.reject(error);
  }
);

// Export the configured Axios instance for use throughout the application
export default apiInstance;
