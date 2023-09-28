import * as React from "react";
import { getImageUrl } from "../../api/services/imageServices";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

export default function MovieCard(props) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                position: "relative",
                boxShadow: "none",
                borderRadius: "10px",
                backgroundColor: "var(--bg-color)",
                "@media (max-width:600px)": {
                    width: "auto",
                    margin: "0 auto",
                },
            }}
        >
            <IconButton
                sx={{
                    position: "absolute",
                    top: "2%",
                    right: "5%",
                    backgroundColor: "#fff",
                    opacity: "0.5",
                    ":hover": {
                        backgroundColor: "#ddd",
                        opacity: "1",
                    },
                }}
            >
                <MoreHorizIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <figure>
                <img
                    src={getImageUrl(props.movie.poster_path)}
                    style={{ width: "100%", borderRadius: "10px" }}
                    alt={props.movie.title}
                />
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
                    sx={{ fontSize: "0.874rem", fontWeight: "bold", mt: 2 }}
                >
                    {props.movie.original_title}
                </Typography>
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
            </CardContent>
        </Card>
    );
}
