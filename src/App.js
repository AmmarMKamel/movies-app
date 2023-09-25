{
    /* Import modules and components */
}
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import WatchList from "./pages/WatchList";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<WatchList />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
