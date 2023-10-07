import React from 'react'
import { getImageUrl } from "../../api/services/imageServices";
import translations from '../..//utils/translations';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import LinkIcon from "@mui/icons-material/Link";

export default function MovieDetailsCard(props) {
    return (
        <Grid
            container
            spacing={2}
            sx={{ pb: 5 }}
            style={{ borderBottom: "1px solid #CFCFCF" }}
        >
            <Grid item={true} xs={12} sm={6} md={4} lg={4}>
                {props.movie.poster_path ? (
                    <img
                        src={getImageUrl(props.movie.poster_path)}
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            height: "100%",
                        }}
                        alt={props.movie.original_title}
                    />
                ) : (
                    <img
                        src="https://placehold.co/800x1200"
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                        }}
                        alt={props.movie.original_title}
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
                                color: props.theme.palette.text.primary,
                            }}
                        >
                            {props.movie.original_title}
                        </Typography>
                        {props.movie.release_date && (
                            <Typography variant="subtitle1"
                                sx={{
                                    color: props.theme.palette.text.primary,
                                }}>
                                {new Date(props.movie.release_date).toLocaleDateString(
                                    props.language,
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
                        onClick={() => props.handelFavorite(props.movie.id)}
                    >
                        {props.isFavorite(props.movie.id) ?
                            <FavoriteIcon
                                fontSize="large"
                                sx={{ color: props.theme.palette.primary.main }}
                            /> :
                            <FavoriteBorderOutlinedIcon
                                fontSize="large"
                                sx={{ color: props.theme.palette.primary.main }}
                            />
                        }
                    </div>
                </div>
                {props.movie.vote_average && (
                    <Rating
                        value={props.language == "Ar" ? Math.floor(props.movie.vote_average / 2) : props.movie.vote_average / 2}
                        precision={0.5}
                        sx={{
                            mb: 4,
                            color: props.theme.palette.primary.main,
                        }}
                        readOnly
                    />
                )}

                {props.movie.overview && (
                    <p
                        style={{
                            marginBottom: "30px",
                            color: props.theme.palette.text.primary,
                        }}
                    >
                        {props.movie.overview}
                    </p>
                )}

                <ul className="genre-list">
                    {props.movie.genres &&
                        props.movie.genres.map((genre) => (
                            <li
                                key={genre.id}
                                className="genre"
                                style={{
                                    color: props.theme.palette.text.secondary,
                                }}
                            >
                                {genre.name}
                            </li>
                        ))}
                </ul>
                <div style={{ marginBottom: "20px" }}>
                    {props.movie.runtime !== 0 && (
                        <span
                            style={{
                                marginRight: "50px",
                                color: props.theme.palette.text.primary,
                            }}
                        >
                            <strong
                                style={{
                                    marginRight: "15px",
                                    color: props.theme.palette.text.primary,
                                }}
                            >
                                {translations[props.language].detailsPageDuration}
                            </strong>{" "}
                            {props.movie.runtime} {translations[props.language].detailsPageDurationMin}.
                        </span>
                    )}
                    {props.movie.spoken_languages &&
                        props.movie.spoken_languages.length !== 0 && (
                            <span>
                                <strong
                                    style={{
                                        marginRight: "15px",
                                        color: props.theme.palette.text
                                            .primary,
                                    }}
                                >
                                    {translations[props.language].detailsPageLanguages}
                                </strong>{" "}
                                {props.movie.spoken_languages.map(
                                    (language, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                color: props.theme.palette.text.primary,
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
                    {props.movie.production_companies &&
                        props.movie.production_companies.length !== 0 &&
                        props.movie.production_companies[0].logo_path ? (
                        <img
                            src={getImageUrl(
                                props.movie.production_companies[0].logo_path
                            )}
                            style={{
                                width: "10%",
                                backgroundColor:
                                    props.theme.palette.background.staticLight,
                            }}
                            alt={props.movie.original_title}
                        />
                    ) : (
                        <img
                            src="https://placehold.co/100x100"
                            style={{
                                width: "10%",
                                borderRadius: "10px",
                            }}
                            alt={props.movie.original_title}
                        />
                    )}
                </div>
                {props.movie.homepage && (
                    <Button
                        endIcon={<LinkIcon />}
                        style={{
                            border: `1px solid ${props.theme.palette.primary.main}`,
                            borderRadius: "25px",
                            color: props.theme.palette.text.primary,
                            padding: "8px 25px",
                        }}
                    >
                        <a
                            href={props.movie.homepage}
                            style={{
                                color: props.theme.palette.text.primary,
                            }}
                        >
                            {translations[props.language].detailsPageWebsite}
                        </a>
                    </Button>
                )}
            </Grid>
        </Grid>
    )
}
