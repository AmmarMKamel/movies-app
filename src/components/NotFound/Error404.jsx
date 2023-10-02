import { useNavigate } from "react-router-dom";

import error404Img from '../../assets/error_404.png'

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';
import translations from '../../utils/translations';
import { useSelector } from "react-redux";


export default function Error404() {
    const language = useSelector((state) => state.languageSlice.currentLang);

    const theme = useTheme();
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
                zIndex: -1
            }}
            container
            direction="column"
        >
            <img

                style={{ width: "40%", marginBottom: '10px' }}
                src={error404Img}
                loading="lazy"
                alt="Not Found"
            />

            <Typography
                variant="h4"
                color={theme.palette.secondary.main}
            >
                {translations[language].notFoundText1}
            </Typography>

            <Typography
                color={theme.palette.text.primary}
            >
                {translations[language].notFoundText2}
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
