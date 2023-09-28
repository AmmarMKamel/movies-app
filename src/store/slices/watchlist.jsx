import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  movies: {}, // ex: {mov1_id: {}, mov2_id: {}} 'better and faster'
  count: 0,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: INITIAL_STATE,
  reducers: {
    addToWatchlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items[newItem.id];

      if(existingItem)
        state.items[newItem.id] = newItem;
    },
    removeFromWatchlist: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items[itemId];

      if (existingItem)
        delete state.items[itemId];
    },
  },
});
