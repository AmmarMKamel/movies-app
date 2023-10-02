import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";

import { getImageUrl } from "../../api/services/imageServices";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function WatchListCard(props) {
	const language = useSelector((state) => state.languageSlice.currentLang);

	const theme = useTheme();

	const navigate = useNavigate();

	const handleMovieDetails = (movieId) => {
		navigate(`/movies/${movieId}`);
	};

	return (
		<Card
			sx={{
				display: "flex",
				maxWidth: 600,
				position: "relative",
				borderRadius: "10px",
				padding: "10px",
				backgroundColor: theme.palette.background.default,
				"@media (max-width:600px)": {
					width: "auto",
					margin: "0 auto",
				},
			}}
		>
			<CardMedia
				onClick={() => handleMovieDetails(props.movie.id)}
				component="img"
				style={{
					width: "30%",
					borderRadius: "10px",
					marginRight: "10px",
				}}
				image={getImageUrl(props.movie.poster_path)}
			/>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent>
					<Typography
						variant="h3"
						component="div"
						color={theme.palette.secondary.main}
						sx={{
							fontWeight: "bold",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						{props.movie.original_title}
						<FavoriteIcon
							fontSize="large"
							sx={{ color: theme.palette.primary.main }}
						/>
					</Typography>

					<Typography
						gutterBottom
						variant="subtitle1"
						color={theme.palette.text.primary}
						sx={{
							fontSize: "0.874rem",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						{new Date(props.movie.release_date).toLocaleDateString(
							language,
							{
								month: "short",
								day: "numeric",
								year: "numeric",
							}
						)}
					</Typography>

					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
						}}
					>
						<Rating
							name="read-only"
							value={props.movie.vote_average / 2}
							readOnly
							style={{ color: theme.palette.text.primary }}
						/>

						<Typography sx={{ fontSize: "0.7rem" }}>
							{props.movie.vote_count}
						</Typography>
					</Box>

					<Typography
						// noWrap
						display="block"
						variant="subtitle2"
						component="div"
						color={theme.palette.text.primary}
					>
						{props.movie.overview}
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
}
