import { createSlice } from "@reduxjs/toolkit";


const savedTheme = localStorage.getItem('theme') || 'light';
// Initial state of the theme slice
const INITIAL_STATE = {
  defaultTheme: 'light',
  currentTheme: savedTheme,
  availableThemes: ['light', 'dark'],
};

// Theme slice of the Redux store
const themeSlice = createSlice({
  name: 'theme',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentTheme: (state, action) => {
      // Validate if the provided theme is available
      if (state.availableThemes.includes(action.payload)) {
        state.currentTheme = action.payload;
        
        localStorage.setItem('theme', action.payload);
      }
    },
  },
});

// Export actions from the slice
export const { setCurrentTheme } = themeSlice.actions;

// Export the reducer as the default export
export default themeSlice.reducer;
