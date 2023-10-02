import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchMovieDetailsByName(searchString).then((data) => {
			setmoviesList(data.results);
			setTotalPages(data.total_pages);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchMovieDetailsByName(searchString, currentPage)
			.then((data) => {
				setmoviesList(data.results);
				setTotalPages(data.total_pages);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [searchString, currentPage]);

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage + 1);
	};

	return (
		<Container fluid="true" sx={{ py: 5 }}>
			<SearchBar hasBorders={true} />
			<Typography variant="body1" gutterBottom>
				<strong>Search Results for:</strong> {searchString}
			</Typography>
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<>
					<Grid container spacing={2}>
						{moviesList &&
							moviesList.map((movie) => (
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
						currentPage={currentPage}
					/>
				</>
			)}
		</Container>
	);
};
export default SearchResult;
