import { useNavigate } from "react-router-dom";

import error404Img from '../../assets/error_404.png'

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';

export default function Error404() {
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
                The page you are looking for is not avaible!
            </Typography>

            <Typography
                color={theme.palette.text.primary}
            >
                Looks like you're lost , let's go back Home
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
