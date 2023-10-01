import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
	fetchMovieDetails,
	fetchMovieRecommendations,
} from "../api/services/moviesService";
import { getImageUrl } from "../api/services/imageServices";

import MovieCard from "../components/MovieCard/MovieCard";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Rating from "@mui/material/Rating";
import LinkIcon from "@mui/icons-material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./../styles/MovieDetails.css";

export default function MovieDetails() {
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState({});
	const [recommendedMovies, setRecommendedMovies] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		fetchMovieDetails(id)
			.then((data) => {
				setMovie(data);
				console.log(data);
				setLoading(false);
			})
			.catch((err) => console.log(err));

		fetchMovieRecommendations(id)
			.then((data) => {
				setRecommendedMovies(data.results);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [id]);

	return (
		<>
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<Container fluid="true" sx={{ pt: 5 }}>
					<Grid
						container
						spacing={2}
						sx={{ pb: 5 }}
						style={{ borderBottom: "1px solid #CFCFCF" }}
					>
						<Grid item={true} xs={12} sm={6} md={4} lg={4}>
							{movie.poster_path ? (
								<img
									src={getImageUrl(movie.poster_path)}
									style={{
										width: "100%",
										borderRadius: "10px",
										height: "100%",
									}}
									alt={movie.original_title}
								/>
							) : (
								<img
									src="https://placehold.co/800x1200"
									style={{
										width: "100%",
										borderRadius: "10px",
									}}
									alt={movie.original_title}
								/>
							)}
						</Grid>
						<Grid item={true} xs={12} sm={6} md={4} lg={8}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div>
									<Typography
										variant="h3"
										component="h3"
										sx={{
											fontWeight: "bold",
											color: "var(--text-color)",
										}}
									>
										{movie.original_title}
									</Typography>
									{movie.release_date && (
										<Typography variant="subtitle1">
											{new Date(
												movie.release_date
											).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
											})}
										</Typography>
									)}
								</div>
								<FavoriteBorderOutlinedIcon
									sx={{ color: "var(--primary-color)" }}
								/>
							</div>
							{movie.vote_average && (
								<Rating
									value={movie.vote_average / 2}
									precision={0.5}
									sx={{
										mb: 4,
										color: "var(--primary-color)",
									}}
									readOnly
								/>
							)}

							{movie.overview && (
								<p style={{ marginBottom: "30px" }}>
									{movie.overview}
								</p>
							)}

							<ul className="genre-list">
								{movie.genres &&
									movie.genres.map((genre) => (
										<li key={genre.id} className="genre">
											{genre.name}
										</li>
									))}
							</ul>
							<div style={{ marginBottom: "20px" }}>
								{movie.runtime !== 0 && (
									<span style={{ marginRight: "50px" }}>
										<strong style={{ marginRight: "15px" }}>
											Duration:
										</strong>{" "}
										{movie.runtime} Min.
									</span>
								)}
								{movie.spoken_languages.length !== 0 && (
									<span>
										<strong style={{ marginRight: "15px" }}>
											Languages:
										</strong>{" "}
										{movie.spoken_languages.map(
											(language, idx) => (
												<span key={idx}>
													{language.english_name}{" "}
												</span>
											)
										)}
									</span>
								)}
							</div>
							<div style={{ marginBottom: "20px" }}>
								{movie.production_companies &&
								movie.production_companies.length !== 0 &&
								movie.production_companies[0].logo_path ? (
									<img
										src={getImageUrl(
											movie.production_companies[0]
												.logo_path
										)}
										style={{ width: "10%" }}
										alt={movie.original_title}
									/>
								) : (
									<img
										src="https://placehold.co/100x100"
										style={{
											width: "10%",
											borderRadius: "10px",
										}}
										alt={movie.original_title}
									/>
								)}
							</div>
							{movie.homepage && (
								<Button
									endIcon={<LinkIcon />}
									style={{
										border: "1px solid var(--primary-color)",
										borderRadius: "25px",
										color: "var(--text-color)",
										padding: "8px 25px",
									}}
								>
									<a
										href={movie.homepage}
										style={{ color: "var(--text-color)" }}
									>
										Website
									</a>
								</Button>
							)}
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ py: 5 }}>
						<Typography
							variant="h3"
							component="h3"
							sx={{
								fontWeight: "bold",
								color: "var(--text-color)",
								mb: 5,
							}}
						>
							Recommendations
						</Typography>
						<Grid container spacing={2}>
							{recommendedMovies &&
								recommendedMovies.map((movie) => (
									<Grid
										item={true}
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
					</Grid>
				</Container>
			)}
		</>
	);
}
