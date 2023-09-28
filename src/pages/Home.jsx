
import { useEffect, useState } from "react";

import { fetchMovies } from "../api/services/moviesService";

import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

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
        <Container fluid="true">
            <Typography variant="h4" sx={{ mb: 3 }}>
                Popular Movies
            </Typography>
            {/*<h1 >Popular Movies</h1>*/}
            <Grid container spacing={2}>
                {movies &&
                    movies.map((movie) => (
                        <Grid
                            item="true"
                            xs={12}
                            sm={6}
                            md={4}
                            lg={2}
                            key={movie.id}
                        >
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
            </Grid>
            <Pagination
                pageCount={totalPages}
                onPageChange={handlePageChange}
            />
        </Container>
    );

}
