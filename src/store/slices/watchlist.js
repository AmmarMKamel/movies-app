import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    count: 0,
};

const watchlist = createSlice({
    name: "watchlist",
    initialState: initialState,
    reducers: {
        addToWatchlist: () => {},
        removeFromWatchlist: () => {},
    },
});
