import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    default_lang: "En",
    current_lang: "Ar",
    available_lang: ["En", "Ar"],
    
}

const language = createSlice({
    name: "language",
    initialState: INITIAL_STATE,
    reducers: {
        changeCurrentLang: (state, action) => {
            state.current_lang = action.payload
        },
    }
})

export const { changeCurrentLang } = language.actions;

export default language.reducer;