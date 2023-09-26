import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    default_theme: "Dark",
    current_lang: "Light",
    available_lang: ["Dark", "Light"],
    
}

const theme = createSlice({
    name: "theme",
    initialState: INITIAL_STATE,
    reducers: {
        changeCurrentTheme: (state, action) => {
            state.current_theme = action.payload
        },
    }
})

export const { changeCurrentTheme } = theme.actions;

export default theme.reducer;