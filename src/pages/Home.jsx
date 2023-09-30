
import { useEffect, useState } from "react";

import { fetchMovies } from "../api/services/moviesService";

import MoviesContainer from "../components/MoviesContainer/MoviesContainer";

export default function Home() {

    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1000);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage + 1);
    };

    useEffect(() => {
        fetchMovies(currentPage)
            .then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            })
            .catch((err) => console.log(err));
    }, [currentPage]);


    return (
        <MoviesContainer
            heading="Popular Movies"
            content={movies}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
        />
    );

}
