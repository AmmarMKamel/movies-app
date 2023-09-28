import { useState } from "react";

import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    // Perform any other actions, such as fetching data for the selected page.
  };

  return (
    <Container fluid>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Popular Movies
      </Typography>
      {/*<h1 >Popular Movies</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <MovieCard />
        </Grid>
      </Grid>
      <Pagination pageCount={10} onPageChange={handlePageChange} />
    </Container>
  );
}
