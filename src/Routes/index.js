import { Route, Routes } from 'react-router-dom'

import Home from '../pages/Home';
import SearchResult from '../pages/SearchResult';
import MovieDetails from '../pages/MovieDetails';
import WatchList from '../pages/WatchList';
import NotFound from '../pages/NotFound';


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SearchResult" element={<SearchResult />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}