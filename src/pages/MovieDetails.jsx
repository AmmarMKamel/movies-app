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

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import LinkIcon from "@mui/icons-material/Link";

import "./../styles/MovieDetails.css";

export default function MovieDetails() {
    const dispatch = useDispatch();

    const [movie, setMovie] = useState({});
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const { id } = useParams();

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

    useEffect(() => {
        fetchMovieDetails(id)
            .then((data) => {
                setMovie(data);
                console.log(data);
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
            {movie && (
                <Container fluid="true" sx={{ pt: 5 }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{ pb: 5 }}
                        style={{ borderBottom: "1px solid #CFCFCF" }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <img
                                src={getImageUrl(movie.poster_path)}
                                style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    height: "100%",
                                }}
                                alt={movie.original_title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={8}>
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
                                    <Typography variant="subtitle1">
                                        {new Date(
                                            movie.release_date
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </Typography>
                                </div>
                                <div
                                    className="figure-hover"
                                    onClick={() => handelFavorite(movie.id)}
                                >
                                    {isFavorite(movie.id) ?
                                        <FavoriteIcon
                                            fontSize="large"
                                            sx={{ color: "var(--primary-color)" }}
                                        /> :
                                        <FavoriteBorderOutlinedIcon
                                            fontSize="large"
                                            sx={{ color: "var(--primary-color)" }}
                                        />
                                    }
                                </div>
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

                            <p style={{ marginBottom: "30px" }}>
                                {movie.overview}
                            </p>

                            <ul className="genre-list">
                                {movie.genres &&
                                    movie.genres.map((genre) => (
                                        <li key={genre.id} className="genre">
                                            {genre.name}
                                        </li>
                                    ))}
                            </ul>
                            <div style={{ marginBottom: "20px" }}>
                                <span style={{ marginRight: "50px" }}>
                                    <strong style={{ marginRight: "15px" }}>
                                        Duration:
                                    </strong>{" "}
                                    {movie.runtime} Min.
                                </span>
                                <span>
                                    <strong style={{ marginRight: "15px" }}>
                                        Languages:
                                    </strong>{" "}
                                    {movie.spoken_languages &&
                                        movie.spoken_languages[0].english_name}
                                </span>
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                {movie.production_companies && (
                                    <img
                                        src={getImageUrl(
                                            movie.production_companies[0]
                                                .logo_path
                                        )}
                                        style={{ width: "10%" }}
                                        alt={movie.original_title}
                                    />
                                )}
                            </div>
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
                    </Grid>
                </Container>
            )}
        </>
    );
}
