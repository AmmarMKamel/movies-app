import { createSlice } from "@reduxjs/toolkit";

const savedLanguage = localStorage.getItem('language') || 'En';

const INITIAL_STATE = {
  defaultLang: "En",
  currentLang: savedLanguage,
  availableLang: ["En", "Ar"],
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