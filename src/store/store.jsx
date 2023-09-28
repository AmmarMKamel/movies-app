import { configureStore } from "@reduxjs/toolkit";
import watchlist from "./slices/watchlist";

export default configureStore({
    reducer: {
        watchlist,
    },
});
