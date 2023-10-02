import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/services/imageServices";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

import "./../../styles/MovieCard.css";

export default function MovieCard(props) {
	const navigate = useNavigate();

	const handleMovieDetails = (movieId) => {
		navigate(`/movies/${movieId}`);
	};

	return (
		<Card
			sx={{
				maxWidth: 345,
				position: "relative",
				boxShadow: "none",
				backgroundColor: "var(--bg-color)",
				"@media (max-width:600px)": {
					width: "auto",
					margin: "0 auto",
				},
			}}
		>
			<figure
				className="figure-hover"
				style={{ borderRadius: "10px" }}
				onClick={() => handleMovieDetails(props.movie.id)}
			>
				{props.movie.poster_path ? (
					<img
						src={getImageUrl(props.movie.poster_path)}
						style={{
							width: "100%",
							borderRadius: "10px",
							height: "290px",
						}}
						alt={props.movie.title}
					/>
				) : (
					<img
						src="https://placehold.co/700x1200"
						style={{
							width: "100%",
							borderRadius: "10px",
							height: "290px",
						}}
						alt={props.movie.title}
					/>
				)}
			</figure>
			<CardContent sx={{ position: "relative" }}>
				<CircularProgressWithLabel
					value={props.movie.vote_average * 10}
				/>
				<Typography
					gutterBottom
					variant="h6"
					component="h6"
					color="var(--text-color)"
					sx={{
						fontSize: "0.874rem",
						fontWeight: "bold",
						mt: 2,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{props.movie.original_title}
					{!props.movie.release_date && (
						<FavoriteBorderOutlinedIcon
							sx={{ color: "var(--primary-color)" }}
						/>
					)}
				</Typography>
				{props.movie.release_date && (
					<Typography
						variant="body2"
						color="var(--text-color)"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						{new Date(props.movie.release_date).toLocaleDateString(
							"en-US",
							{
								month: "short",
								day: "numeric",
								year: "numeric",
							}
						)}
						<FavoriteBorderOutlinedIcon
							sx={{ color: "var(--primary-color)" }}
						/>
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}
