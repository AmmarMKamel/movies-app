import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { watchlistCount } from "../store/slices/watchlist";

import { fetchWatchlist, addOrRemoveFromWatchList } from "../api/services/watchlistService";
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
  	const dispatch = useDispatch();

	const location = useLocation();
	const [searchString, setSearchString] = useState(location.state?.query);
	const [moviesList, setmoviesList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1000);

  const [watchlistMovies, setWatchlistMovies] = useState([]);
  dispatch(watchlistCount(watchlistMovies.length));
  const [change, setChange] = useState(0);

  const isFavorite = (id) => {
    if (watchlistMovies.find((movie) => movie.id == id)) {
      return true
    }
  }

  const handelFavorite = async (id) => {
    if (isFavorite(id)) {
      await addOrRemoveFromWatchList(id, false);
    }
    else {
      await addOrRemoveFromWatchList(id);
    }
    setChange(change + 1);
  }
	const [loading, setLoading] = useState(true);

	const fetchData = (currentSearchString, currentPage=1) => {
		setSearchString(currentSearchString??"")
		// setLoading(true);
		fetchMovieDetailsByName(currentSearchString, currentPage).then((data) => {
			setmoviesList(data.results);
			setTotalPages(data.total_pages);
			setLoading(false);
		}).catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData(searchString, currentPage);

		fetchWatchlist()
		.then((data) => {
		  setWatchlistMovies(data.results);
		})
		.catch((err) => console.log(err));
	}, [currentPage, change]);

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage + 1);
		setLoading(true);
	};

	return (
		<Container fluid="true" sx={{ py: 5 }}>
			<SearchBar searchPage={true} fetchData={fetchData} />
			<Typography
				variant="body1"
				gutterBottom
				sx={{
					color: theme.palette.text.primary,
					marginTop: "10px",
				}}
			>
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
									<MovieCard 
									movie={movie}
									isFavorite={(id) => isFavorite(id)}
                					handelFavorite={(id) => handelFavorite(id)} 
									/>
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
