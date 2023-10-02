import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import noFavImg from '../../assets/noFavorite.png'

export default function EmptyWatchList() {
    const navigate = useNavigate();

    return (
        <Grid
            sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            container
            direction="column"
        >
            <img

                style={{ width: "40%" }}
                src={noFavImg}
                loading="lazy"
            />

            <Typography
                variant="h4"
                color="var(--secondary-color)"
            >
                No Movies in watch list
            </Typography>

            <Typography
                color="var(--text-color)"
            >
                Add the movies you are intersted in to appear here
            </Typography>

            <Button
                variant="contained"
                onClick={()=> navigate('/')}
                sx={{
                    m : 3,
                    backgroundColor: "var(--primary-color)",
                    borderRadius: "8px",
                    padding: "10px 40px",
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: "var(--primary-color)",
                    },
                }}
            >
                Home
            </Button>
        </Grid>
    )
}
