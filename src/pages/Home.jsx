import { useEffect, useState } from "react";

import { fetchMovies } from "../api/services/moviesService";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import SearchWidget from "../components/Search/SearchWidget";

export default function Home() {
	const [currentPage, setCurrentPage] = useState(1);
	const [movies, setMovies] = useState([]);
	const [totalPages, setTotalPages] = useState(1000);
	const [loading, setLoading] = useState(true);

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage + 1);
	};

	useEffect(() => {
		setLoading(true);
		fetchMovies(currentPage)
			.then((data) => {
				setMovies(data.results);
				setTotalPages(data.total_pages);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [currentPage]);

	return (
		<>
			<SearchWidget />
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<MoviesContainer
					heading="Popular Movies"
					content={movies}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
					currentPage={currentPage}
				/>
			)}
		</>
	);
}
