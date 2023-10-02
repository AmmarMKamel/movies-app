import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  count: 0,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: INITIAL_STATE,
  reducers: {
    watchlistCount: (state, action) => {
      state.count = action.payload

      localStorage.setItem('watchlist', action.payload);
    }
  },
});

// Export actions from the slice
export const{ watchlistCount } = watchlistSlice.actions;

// Export the reducer as the default export
export default watchlistSlice.reducer;