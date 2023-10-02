import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { watchlistCount } from "../store/slices/watchlist";

import { fetchWatchlist, addOrRemoveFromWatchList } from "../api/services/watchlistService";

import WatchListCard from "../components/WatchList/WatchListCard";
import EmptyWatchList from "../components/WatchList/EmptyWatchList";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function WatchList() {
    const dispatch = useDispatch();

	const [movies, setMovies] = useState([]);
    dispatch(watchlistCount(movies.length));
    const [change, setChange] = useState(0);

    const isFavorite = (id) => {
        if (movies.find((movie) => movie.id == id)) {
            return true
        }
    }

    const handelFavorite = async (id) => {
        if (isFavorite(id)) {
            await addOrRemoveFromWatchList(id,false);
        }
        else {
            await addOrRemoveFromWatchList(id);
        }
        setChange(change+1);
    }
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchWatchlist()
			.then((data) => {
				setMovies(data.results);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [change]);
	console.log(movies);

	return (
		<>
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<Container fluid="true">
					<Typography variant="h4" sx={{ my: 3 }}>
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
									<WatchListCard
                            isFavorite={(id)=>isFavorite(id)} 
                            handelFavorite={(id)=>handelFavorite(id)}
                            movie={movie} 
                            />
								</Grid>
							))}
					</Grid>
				</Container>
			)}
		</>
	);
}
