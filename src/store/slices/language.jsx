import { createSlice } from "@reduxjs/toolkit";

const savedLanguage = localStorage.getItem('language') || 'en';

const INITIAL_STATE = {
  defaultLang: "en",
  currentLang: savedLanguage,
  availableLang: ["en", "ar"],
};

const languageSlice = createSlice({
  name: "language",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentLang: (state, action) => {
      // Validate if the provided language is available
      if (state.availableLang.includes(action.payload)) {
        state.currentLang = action.payload;

        localStorage.setItem('language', action.payload);
      }
    },
  },
});

export const { setCurrentLang } = languageSlice.actions;

export default languageSlice.reducer;