import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme") || "light";
// Initial state of the theme slice
const INITIAL_STATE = {
  mode: savedTheme,
};

// Theme slice of the Redux store
const themeSlice = createSlice({
  name: "theme",
  initialState: INITIAL_STATE,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";

      localStorage.setItem("theme", state.mode);
    },
  },
});

// Export actions from the slice
export const { toggleTheme } = themeSlice.actions;
// Export the current theme
export const currentTheme = state => state.themeSlice.mode;
// Export the reducer as the default export
export default themeSlice.reducer;
