import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import translations from '../utils/translations';
import { useSelector } from "react-redux";

import { watchlistCount } from "../store/slices/watchlist";

import { fetchWatchlist, addOrRemoveFromWatchList } from "../api/services/watchlistService";
import { fetchMovies } from "../api/services/moviesService";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import SearchWidget from "../components/Search/SearchWidget";

export default function Home() {
	const language = useSelector((state) => state.languageSlice.currentLang);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [movies, setMovies] = useState([]);
	const [totalPages, setTotalPages] = useState(1000);

	const [watchlistMovies, setWatchlistMovies] = useState([]);
	dispatch(watchlistCount(watchlistMovies.length));
	const [change, setChange] = useState(0);
	const [loading, setLoading] = useState(true);

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage + 1);
		setLoading(true);
	};

	const isFavorite = (id) => {
		if (watchlistMovies.find((movie) => movie.id === id)) {
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

	useEffect(() => {
		fetchMovies(currentPage)
			.then((data) => {
				setMovies(data.results);
				setTotalPages(data.total_pages);
				setLoading(false);
			})
			.catch((err) => console.log(err));

		fetchWatchlist()
			.then((data) => {
				setWatchlistMovies(data.results);
			})
			.catch((err) => console.log(err));
	}, [currentPage, change]);

	return (
		<>
			<SearchWidget />
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<MoviesContainer
					heading={translations[language].homeHeader}
					content={movies}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
					isFavorite={(id) => isFavorite(id)}
					handelFavorite={(id) => handelFavorite(id)}
					currentPage={currentPage}
				/>
			)}
		</>
	);
}
