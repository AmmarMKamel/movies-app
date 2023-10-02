import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/services/imageServices";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Grid from "@mui/material/Grid";

export default function WatchListCard(props) {
    const navigate = useNavigate();

    const handleMovieDetails = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <Card
            sx={{
                display: 'flex',
                position: "relative",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "var(--bg-color)",
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
                    <img
                        src={getImageUrl(props.movie.poster_path)}
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            height: "100%",
                        }}
                        alt={props.movie.original_title}
                    />
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
                                    color: "var(--text-color)",
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
                            sx={{ color: "var(--primary-color)" }}
                        /> : 
                        <FavoriteBorderOutlinedIcon
                            fontSize="large"
                            sx={{ color: "var(--primary-color)" }}
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
                                    color: "var(--primary-color)",
                                }}
                                readOnly
                            />
                            <Typography
                                sx={{ 
                                    mb: 2, 
                                    fontSize: "0.7rem" }}
                            >
                                {props.movie.vote_count}
                            </Typography>
                        </Box>
                    )}

                    <p style={{ marginBottom: "20px" }}>
                        {props.movie.overview}
                    </p>
                </Grid>
            </Grid>

        </Card>
    );
}
