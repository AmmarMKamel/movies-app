import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import WatchList from "./pages/WatchList";
import NotFound from "./pages/NotFound";

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
    const currentTheme = useSelector((state) => state.themeSlice.currentTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<WatchList />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;