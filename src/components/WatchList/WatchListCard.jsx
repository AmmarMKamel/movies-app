import * as React from "react";

import { getImageUrl } from "../../api/services/imageServices";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function WatchListCard(props) {
    return (
        <Card
            sx={{
                display: 'flex',
                maxWidth: 600,
                position: "relative",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "var(--bg-color)",
                "@media (max-width:600px)": {
                    width: "auto",
                    margin: "0 auto",
                },
            }}
        >
            <CardMedia
                component="img"
                style={{ width: "30%", borderRadius: "10px", marginRight: "10px" }}
                image={getImageUrl(props.movie.poster_path)}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                    <Typography
                        variant="h3"
                        component="div"
                        color="var(--secondary-color)"
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
                            sx={{ color: "var(--primary-color)" }}
                        />
                    </Typography>

                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        color="var(--text-color)"
                        sx={{
                            fontSize: "0.874rem",
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
                        style={{ color: 'var(--text-color)' }}
                    />

                    <Typography
                        sx={{ fontSize: "0.7rem" }}
                    >
                        {props.movie.vote_count}
                    </Typography>
                    </Box>

                    <Typography
                        // noWrap
                        display="block"
                        variant="subtitle2"
                        component="div"
                        color="var(--text-color)"
                    >
                        {props.movie.overview}
                    </Typography>
                </CardContent>

            </Box>

        </Card>
    );
}
