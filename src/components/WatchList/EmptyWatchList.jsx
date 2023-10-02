import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import translations from '../../utils/translations';
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import noFavImg from '../../assets/noFavorite.png'

export default function EmptyWatchList() {
    const language = useSelector((state) => state.languageSlice.currentLang);
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
                zIndex: -1
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
                {translations[language].emptyWatchListText1}
            </Typography>

            <Typography
                color={theme.palette.text.primary}
            >
                {translations[language].emptyWatchListText1}
            </Typography>

            <Button
                variant="contained"
                onClick={()=> navigate('/')}
                sx={{
                    fontWeight: "bold",
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
                {translations[language].HomeButton}
            </Button>
        </Grid>
    )
}
