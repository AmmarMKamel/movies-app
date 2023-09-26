import { configureStore } from "@reduxjs/toolkit";
import watchlist from "./slices/watchlist";
import language from "./slices/language";
import theme from "./slices/theme";

export default configureStore({
    reducer: {
        watchlist,
        language,
        theme,
    },
});
