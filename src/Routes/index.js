import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../pages/Home';
import Search from '../pages/Search';
import MovieDetails from '../pages/MovieDetails';
import WatchList from '../pages/WatchList';
import NotFound from '../pages/NotFound';


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}