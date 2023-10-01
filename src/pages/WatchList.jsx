import { useEffect, useState } from "react";

import { fetchWatchlist } from "../api/services/watchlistService";

import WatchListCard from "../components/WatchList/WatchListCard";
import EmptyWatchList from "../components/WatchList/EmptyWatchList";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function WatchList() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchWatchlist()
			.then((data) => {
				setMovies(data.results);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	console.log(movies);

	return (
		<>
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<Container fluid="true">
					<Typography variant="h4" sx={{ mb: 3 }}>
						Watch List
					</Typography>
					{movies.length == 0 && <EmptyWatchList />}
					<Grid container spacing={2}>
						{movies &&
							movies.map((movie) => (
								<Grid
									item="true"
									xs={12}
									sm={6}
									md={6}
									lg={6}
									key={movie.id}
								>
									<WatchListCard movie={movie} />
								</Grid>
							))}
					</Grid>
				</Container>
			)}
		</>
	);
}
