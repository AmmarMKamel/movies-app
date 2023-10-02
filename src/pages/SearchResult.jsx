import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';

import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";

import SearchBar from "../components/Search/SearchBar";
import { fetchMovieDetailsByName } from "../api/services/searchService";

const SearchResult = () => {
	const theme = useTheme();
	const location = useLocation();
	const [searchString, setSearchString] = useState(location.state?.query);
	const [moviesList, setmoviesList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1000);
	const [loading, setLoading] = useState(true);

	const fetchData = (currentSearchString, currentPage=1) => {
		setSearchString(currentSearchString??"")
		setLoading(true);
		fetchMovieDetailsByName(currentSearchString, currentPage).then((data) => {
			setmoviesList(data.results);
			setTotalPages(data.total_pages);
			setLoading(false);
		}).catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData(searchString);
	}, []);

	useEffect(() => {
		fetchData(searchString, currentPage);
	}, [currentPage]);

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
			<SearchBar searchPage={true} fetchData={fetchData}/>
			<Typography variant="body1" gutterBottom sx={{
					color: theme.palette.text.primary,
					marginTop: "10px"
				}}>
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
					/>
				</>
			)}
		</Container>
	);
};
export default SearchResult;
