import { configureStore } from "@reduxjs/toolkit";

import watchlistSlice from "./slices/watchlist";
import themeSlice from "./slices/theme";
import languageSlice from "./slices/language";


export default configureStore({
    reducer: {
        watchlistSlice,
        languageSlice,
        themeSlice,
    },
});