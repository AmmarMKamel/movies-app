import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { watchlistCount } from "../store/slices/watchlist";

import { fetchWatchlist, addOrRemoveFromWatchList } from "../api/services/watchlistService";

import {
	fetchMovieDetails,
	fetchMovieRecommendations,
} from "../api/services/moviesService";
import { getImageUrl } from "../api/services/imageServices";

import MovieCard from "../components/MovieCard/MovieCard";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import translations from '../utils/translations';


import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import LinkIcon from "@mui/icons-material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./../styles/MovieDetails.css";

export default function MovieDetails() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.languageSlice.currentLang);

  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const { id } = useParams();

  const [watchlistMovies, setWatchlistMovies] = useState([]);
  dispatch(watchlistCount(watchlistMovies.length));
  const [change, setChange] = useState(0);

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
    // setLoading(true);
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
        console.log(data);
      })
      .catch((err) => console.log(err));

    fetchWatchlist()
      .then((data) => {
        setWatchlistMovies(data.results);
      })
      .catch((err) => console.log(err));
  }, [id, change]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10
          }}>
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
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {movie.original_title}
                  </Typography>
                  {movie.release_date && (
                    <Typography variant="subtitle1"
                      sx={{
                        color: theme.palette.text.primary,
                      }}>
                      {new Date(movie.release_date).toLocaleDateString(
                        language,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </Typography>
                  )}
                </div>
                <div
                  className="figure-hover"
                  onClick={() => handelFavorite(movie.id)}
                >
                  {isFavorite(movie.id) ?
                    <FavoriteIcon
                      fontSize="large"
                      sx={{ color: theme.palette.primary.main }}
                    /> :
                    <FavoriteBorderOutlinedIcon
                      fontSize="large"
                      sx={{ color: theme.palette.primary.main }}
                    />
                  }
                </div>
              </div>
              {movie.vote_average && (
                <Rating
                  value={language == "Ar"? Math.floor(movie.vote_average / 2): movie.vote_average / 2}
                  precision={0.5}
                  sx={{
                    mb: 4,
                    color: theme.palette.primary.main,
                  }}
                  readOnly
                />
              )}

							{movie.overview && (
								<p
									style={{
										marginBottom: "30px",
										color: theme.palette.text.primary,
									}}
								>
									{movie.overview}
								</p>
							)}

							<ul className="genre-list">
								{movie.genres &&
									movie.genres.map((genre) => (
										<li
											key={genre.id}
											className="genre"
											style={{
												color: theme.palette.text.secondary,
											}}
										>
											{genre.name}
										</li>
									))}
							</ul>
							<div style={{ marginBottom: "20px" }}>
								{movie.runtime !== 0 && (
									<span
										style={{
											marginRight: "50px",
											color: theme.palette.text.primary,
										}}
									>
										<strong
											style={{
												marginRight: "15px",
												color: theme.palette.text.primary,
											}}
										>
											{translations[language].detailsPageDuration}
										</strong>{" "}
										{movie.runtime} {translations[language].detailsPageDurationMin}.
									</span>
								)}
								{movie.spoken_languages &&
									movie.spoken_languages.length !== 0 && (
										<span>
											<strong
												style={{
													marginRight: "15px",
													color: theme.palette.text
														.primary,
												}}
											>
												{translations[language].detailsPageLanguages}
											</strong>{" "}
											{movie.spoken_languages.map(
												(language, idx) => (
													<span
														key={idx}
														style={{
															color: theme.palette.text.primary,
														}}
													>
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
											movie.production_companies[0].logo_path
										)}
										style={{
											width: "10%",
											backgroundColor:
												theme.palette.background.staticLight,
										}}
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
										border: `1px solid ${theme.palette.primary.main}`,
										borderRadius: "25px",
										color: theme.palette.text.primary,
										padding: "8px 25px",
									}}
								>
									<a
										href={movie.homepage}
										style={{
											color: theme.palette.text.primary,
										}}
									>
										{translations[language].detailsPageWebsite}
									</a>
								</Button>
							)}
						</Grid>
					</Grid>
					{recommendedMovies?.length !== 0 && <Grid container spacing={2} sx={{ py: 5 }}>
						<Typography
							variant="h3"
							component="h3"
							sx={{
								fontWeight: "bold",
								color: theme.palette.text.primary,
								mb: 5,
							}}
						>
							{translations[language].detailsPageRecommendations}
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
										<MovieCard
                    movie={movie}
                    isFavorite={(id) => isFavorite(id)}
                    handelFavorite={(id) => handelFavorite(id)}
                    />
									</Grid>
								))}
						</Grid>
					</Grid>}
				</Container>
			)}
		</>
	);
}
