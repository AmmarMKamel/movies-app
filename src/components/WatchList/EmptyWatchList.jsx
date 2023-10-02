import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import noFavImg from '../../assets/noFavorite.png'

export default function EmptyWatchList() {
    const navigate = useNavigate();
	const theme = useTheme();

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
                alt="Empty Watch List"
            />

            <Typography
                variant="h4"
                color={theme.palette.secondary.main}
            >
                No Movies in watch list
            </Typography>

            <Typography
                color={theme.palette.text.primary}
            >
                Add the movies you are intersted in to appear here
            </Typography>

            <Button
                variant="contained"
                onClick={()=> navigate('/')}
                sx={{
                    m : 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "8px",
                    padding: "10px 40px",
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                    },
                }}
            >
                Home
            </Button>
        </Grid>
    )
}
