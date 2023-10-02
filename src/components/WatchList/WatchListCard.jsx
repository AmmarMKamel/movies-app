import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";

import { getImageUrl } from "../../api/services/imageServices";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Grid from "@mui/material/Grid";

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
                height: 290,
                position: "relative",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: theme.palette.background.default,
                "@media (max-width:600px)": {
                    width: "auto",
                    height: "auto",
                    margin: "0 auto",
                },
            }}
        >
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={12} sm={6} md={4} lg={4}
                    className="figure-hover"
                    onClick={() => handleMovieDetails(props.movie.id)}
                >
                    {props.movie.poster_path ? (
                        <img
                            src={getImageUrl(props.movie.poster_path)}
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                            }}
                            alt={props.movie.title}
                        />
                    ) : (
                        <img
                            src="https://placehold.co/800x1200"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                            }}
                            alt={props.movie.title}
                        />
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={8}>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                component="h4"
                                sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.secondary.main
                                }}
                            >
                                {props.movie.original_title}
                            </Typography>
                            <Typography variant="subtitle1">
                                {new Date(
                                    props.movie.release_date
                                ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </Typography>
                        </Box>
                        <div
                            className="figure-hover"
                            onClick={() => props.handelFavorite(props.movie.id)}
                        >
                            {props.isFavorite(props.movie.id) ?
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
                    </Box>
                    {props.movie.vote_average && (
                        <Box sx={{
                            display: "flex",
                            justifyContent: "",
                            alignItems: "center",
                        }}>
                            <Rating
                                value={props.movie.vote_average / 2}
                                precision={0.5}
                                sx={{
                                    mb: 2,
                                    color: theme.palette.text.primary
                                }}
                                readOnly
                            />
                            <Typography
                                sx={{
                                    mb: 2,
                                    fontSize: "0.7rem"
                                }}
                            >
                                {props.movie.vote_count}
                            </Typography>
                        </Box>
                    )}

                    <Typography sx={{
                        marginBottom: "20px", 
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                    }}>
                        {props.movie.overview}
                    </Typography>
                </Grid>
            </Grid>

        </Card>
    );
}