import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";

import SearchBar from "../components/Search/SearchBar";
import { fetchMovieDetailsByName } from "../api/services/searchService";

const SearchResult = () => {
  const location = useLocation();
  const searchString = location.state?.query;
  const [moviesList, setmoviesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1000);

  useEffect(() => {
    fetchMovieDetailsByName(searchString)
      .then((data) => {
        setmoviesList(data.results);
        setTotalPages(data.total_pages);
      })

  }, []);

  useEffect(() => {
    fetchMovieDetailsByName(searchString, currentPage)
      .then((data) => {
        setmoviesList(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((err) => console.log(err));
  }, [searchString, currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
  };

  return (
    <Container
      disableGutters
      maxWidth="xlg"
      sx={{
        width: "95%",
        padding: "30px 50px",
        marginTop: "25px",
        marginBottom: "50px",
        textAlign: "left",
        borderRadius: "2px",
      }}
    >
      <SearchBar hasBorders={true} />
      <Typography variant="body1" gutterBottom>
        <strong>Search Results for:</strong> {searchString}
      </Typography>

      <Grid container spacing={2}>
        {moviesList &&
          moviesList.map((movie) => (
            <Grid item="true" xs={12} sm={6} md={4} lg={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
      </Grid>
      <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
    </Container>
  );
};
export default SearchResult;
